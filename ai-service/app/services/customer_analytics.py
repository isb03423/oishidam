import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from charts import save_and_encode
from database import query_df

SEGMENT_LABELS = {
    0: "신규 고객",
    1: "일반 고객",
    2: "우수 고객",
    3: "저활동 고객",
    4: "이탈 위험 고객",
}


def load_rfm() -> pd.DataFrame:
    df = query_df("""
        SELECT m.member_id
             , m.name
             , COALESCE(m.gender, 'n') AS gender
             , m.birth_year AS birth_year
             , COUNT(o.order_id) AS frequency
             , COALESCE(SUM(o.total_amount), 0)::float AS monetary
             , m.created_at as joined_at
             , MAX(o.created_at) AS last_order_at
             , MIN(o.created_at) AS first_order_at
          FROM members m
          LEFT JOIN orders o
            ON m.member_id = o.member_id
           AND o.order_status NOT IN ('PAYMENT_PENDING', 'PAYMENT_FAILED', 'CANCEL_PENDING', 'CANCELLED')
         WHERE m.role = 'USER'
         GROUP BY m.member_id, m.name, m.gender, m.birth_year, m.created_at
        """)
    if df.empty:
        return df
    now = pd.Timestamp.now(tz="UTC")
    df["joined_at"] = pd.to_datetime(df["joined_at"], utc=True)
    df["joined_days"] = (now - df["joined_at"]).dt.days.fillna(9999).clip(lower=0).astype(int)
    df["last_order_at"] = pd.to_datetime(df["last_order_at"], utc=True)
    df["first_order_at"] = pd.to_datetime(df["first_order_at"], utc=True)
    df["recency_days"] = (now - df["last_order_at"]).dt.days.fillna(999).clip(lower=0).astype(int)
    df["avg_order_value"] = (df["monetary"].div(df["frequency"].replace(0, np.nan)).fillna(0).round(0))
    
    # 출생 연도가 없는 고객은 임의의 연령을 부여하지 않음
    birth_year = pd.to_numeric(df["birth_year"], errors="coerce")
    valid_birth = birth_year.between(1900, now.year)
    df["age"] = (now.year - birth_year).where(valid_birth)
    df["age_band"] = "미상"
    df.loc[valid_birth, "age_band"] = (
        (df.loc[valid_birth, "age"] // 10 * 10).astype(int).astype(str) + "대"
    )
    return df


def segment(df: pd.DataFrame, k: int = 2) -> pd.DataFrame:
    """RFM 기반 고객 세그먼트 분류"""
    if k != 2:
        raise ValueError("KMeans 클러스터 수는 2로 설정해야 합니다.")

    df = df.copy()
    df["cluster"] = -1
    df["segment"] = 1

    if df.empty:
        df["segment_name"] = df["segment"].map(SEGMENT_LABELS)
        return df

    # 1. 신규 고객: 가입 후 30일 이내
    new_mask = df["joined_days"] <= 30

    # 2. 이탈 위험 고객: 구매 이력 존재 + 마지막 구매 90일 초과
    risk_mask = (~new_mask & (df["frequency"] > 0) & (df["recency_days"] > 90))

    # 3. 저활동 고객: 가입 30일 초과 + 구매 0~1회
    low_mask = (~new_mask & ~risk_mask & (df["frequency"] <= 1))

    # 4. 조건 기반 고객 분류
    df.loc[new_mask, "segment"] = 0
    df.loc[low_mask, "segment"] = 3
    df.loc[risk_mask, "segment"] = 4

    # 5. 나머지 고객을 KMeans로 일반/우수 고객 분류
    target_mask = ~(new_mask | low_mask | risk_mask)

    features = df.loc[
        target_mask,
        ["recency_days", "frequency", "monetary"]
    ].astype(float)

    # 분석 가능한 데이터가 충분한 경우에만 실행
    if len(features) >= k and len(features.drop_duplicates()) >= k:

        # RFM 데이터 표준화
        scaled = StandardScaler().fit_transform(features)

        # KMeans 클러스터링
        km = KMeans(
            n_clusters=k,
            n_init=10,
            random_state=42
        )

        df.loc[target_mask, "cluster"] = km.fit_predict(scaled)

        # 클러스터별 RFM 평균 계산
        stats = df.loc[target_mask].groupby("cluster").agg(
            avg_recency=("recency_days", "mean"),
            avg_frequency=("frequency", "mean"),
            avg_monetary=("monetary", "mean")
        )

        # 고객 가치 점수 계산
        # 구매 빈도↑, 구매 금액↑, 마지막 구매 경과 일수↓
        stats["score"] = (
            stats["avg_frequency"].rank(pct=True)
            + stats["avg_monetary"].rank(pct=True)
            - stats["avg_recency"].rank(pct=True)
        )

        # 가장 가치가 높은 클러스터를 우수 고객으로 분류
        best_cluster = stats["score"].idxmax()

        df.loc[
            target_mask & (df["cluster"] == best_cluster),
            "segment"
        ] = 2

    # 6. 고객 유형명 지정
    df["segment_name"] = df["segment"].map(SEGMENT_LABELS)

    return df


def repurchase_metrics(df: pd.DataFrame) -> dict:
    """구매 고객 기준 재구매 및 최근 활동 지표"""
    buyers = df[df["frequency"] > 0]
    repeat = buyers[buyers["frequency"] >= 2]
    active = buyers[buyers["recency_days"] <= 90]
    count = len(buyers)

    avg_monetary = round(float(buyers["monetary"].mean()), 0) if count else 0.0
    return {
        "total_members": int(len(df)),
        "buyers": int(count),
        "repeat_buyers": int(len(repeat)),
        "repurchase_rate": round(len(repeat) / count * 100, 1) if count else 0.0,
        # 기존 응답 키 유지: 코호트 유지율이 아니라 최근 90일 내 구매한 고객 비율
        "retention_rate_90d": round(len(active) / count * 100, 1) if count else 0.0,
        "avg_frequency": round(float(buyers["frequency"].mean()), 2) if count else 0.0,
        "avg_monetary": avg_monetary,
        # 기존 응답 키 유지: 미래 LTV 예측치가 아닌 구매 고객의 평균 누적 구매 금액
        "ltv_estimate": avg_monetary,
    }


def cohort_retention() -> pd.DataFrame:
    """첫 구매 월 기준 코호트 리텐션 분석"""
    df = query_df("""
        SELECT o.member_id
             , DATE_TRUNC('month', MIN(o.created_at) OVER (PARTITION BY o.member_id)) AS cohort_month
             , DATE_TRUNC('month', o.created_at) AS order_month
          FROM orders o
          JOIN members m
            ON o.member_id = m.member_id
         WHERE m.role = 'USER'
           AND o.order_status NOT IN ('PAYMENT_PENDING', 'PAYMENT_FAILED', 'CANCEL_PENDING', 'CANCELLED')
    """)

    if df.empty:
        return pd.DataFrame()

    # 날짜 변환
    df["cohort_month"] = pd.to_datetime(df["cohort_month"], utc=True)
    df["order_month"] = pd.to_datetime(df["order_month"], utc=True)

    # 첫 구매 이후 경과 개월 계산
    df["period"] = (
        (df["order_month"].dt.year - df["cohort_month"].dt.year) * 12
        + df["order_month"].dt.month
        - df["cohort_month"].dt.month
    )

    # 코호트별 구매 고객 수
    pivot = (
        df.groupby(["cohort_month", "period"])["member_id"]
        .nunique()
        .unstack("period")
        .sort_index()
    )

    # 구매가 없는 경과 월도 컬럼에 포함
    max_period = int(df["period"].max())
    pivot = pivot.reindex(columns=range(max_period + 1))

    # 첫 구매 월 고객 수를 기준으로 유지율 계산
    retention = pivot.div(pivot[0], axis=0) * 100

    # 아직 도래하지 않은 월은 NaN으로 유지
    # 이미 지난 월에 구매가 없으면 0% 처리
    now = pd.Timestamp.now(tz="UTC")
    elapsed = (
        (now.year - retention.index.year) * 12
        + now.month - retention.index.month
    )

    for period in retention.columns:
        observable = elapsed >= period
        retention.loc[observable, period] = (
            retention.loc[observable, period].fillna(0)
        )

    retention = retention.round(1)
    retention.index = retention.index.strftime("%Y-%m")
    retention.index.name = "cohort_month"

    return retention


def build_charts(df: pd.DataFrame, retention: pd.DataFrame) -> dict:
    """고객 분석 차트 생성"""
    charts = {}

    if df.empty:
        return charts

    segment_codes = list(SEGMENT_LABELS.keys())
    segment_names = list(SEGMENT_LABELS.values())

    # 세그먼트별 색상 고정
    palette = dict(zip(
        segment_names,
        sns.color_palette("Set2", len(segment_names))
    ))

    # 1. 고객 세그먼트 산점도
    fig, ax = plt.subplots(figsize=(9, 5))

    sns.scatterplot(
        data=df,
        x="frequency",
        y="monetary",
        hue="segment_name",
        hue_order=segment_names,
        size="avg_order_value",
        sizes=(30, 250),
        palette=palette,
        ax=ax
    )

    ax.set_title("고객 세그먼트 (구매 빈도 × 구매 금액)")
    ax.set_xlabel("구매 빈도(건)")
    ax.set_ylabel("구매 금액(원)")

    fig.tight_layout()
    charts["segments"] = save_and_encode(
        fig, "customer_segments.png"
    )
    plt.close(fig)

    # 2. 세그먼트별 평균 구매 금액
    seg = (
        df.groupby("segment")["monetary"]
        .mean()
        .reindex(segment_codes)
        .fillna(0)
        .reset_index()
    )

    seg["segment_name"] = seg["segment"].map(SEGMENT_LABELS)

    fig, ax = plt.subplots(figsize=(9, 4.5))

    sns.barplot(
        data=seg,
        x="segment_name",
        y="monetary",
        hue="segment_name",
        order=segment_names,
        palette=palette,
        legend=False,
        ax=ax
    )

    ax.set_title("세그먼트별 평균 구매 금액")
    ax.set_xlabel("고객 유형")
    ax.set_ylabel("평균 구매 금액(원)")

    fig.tight_layout()
    charts["segment_value"] = save_and_encode(
        fig, "customer_segment_value.png"
    )
    plt.close(fig)

    # 3. 코호트 리텐션 히트맵
    if not retention.empty:
        fig, ax = plt.subplots(figsize=(9, 4.5))

        sns.heatmap(
            retention.iloc[:, :7],
            annot=True,
            fmt=".0f",
            cmap="Blues",
            vmin=0,
            vmax=100,
            ax=ax
        )

        ax.set_title("코호트 리텐션 (%)")
        ax.set_xlabel("첫 구매 후 경과 개월")
        ax.set_ylabel("첫 구매 월")

        fig.tight_layout()
        charts["retention"] = save_and_encode(
            fig, "customer_retention.png"
        )
        plt.close(fig)

    return charts


def analyze(with_charts: bool = True) -> dict:
    """고객 분석 통합 실행"""

    df = segment(load_rfm())

    if df.empty:
        return {
            "feature": "D. 고객 분석",
            "summary": {},
            "segments": [],
            "top_customers": [],
            "by_age_band": [],
            "by_region": [],
            "retention": [],
            "charts": {}
        }

    # 1. 코호트 리텐션 분석
    retention = cohort_retention()

    # 2. 고객 세그먼트별 통계
    seg_stats = (
        df.groupby("segment")
        .agg(
            members=("member_id", "size"),
            avg_frequency=("frequency", "mean"),
            avg_monetary=("monetary", "mean"),
            avg_recency=("recency_days", "mean")
        )
        .reindex(list(SEGMENT_LABELS.keys()))
        .round(1)
    )

    seg_stats["members"] = (
        seg_stats["members"].fillna(0).astype(int)
    )

    seg_stats["segment_name"] = (
        seg_stats.index.map(SEGMENT_LABELS)
    )

    seg_stats = seg_stats.reset_index()

    # 고객이 없는 세그먼트의 평균값은 null
    seg_stats = seg_stats.astype(object).where(
        pd.notna(seg_stats), None
    )

    # 3. 구매 금액 상위 고객 10명
    top = (
        df[df["frequency"] > 0]
        .sort_values("monetary", ascending=False)
        .head(10)
    )

    # 4. 연령대별 통계
    age_stats = (
        df.groupby("age_band")
        .agg(
            members=("member_id", "size"),
            monetary=("monetary", "mean")
        )
        .round(0)
        .reset_index()
    )

    # 5. 코호트 결과 변환
    retention_records = []

    if not retention.empty:
        retention_df = retention.reset_index()

        # 미래 기간의 NaN을 JSON null로 변환
        retention_df = retention_df.astype(object).where(
            pd.notna(retention_df), None
        )

        retention_records = retention_df.to_dict(
            orient="records"
        )

    # 6. 분석 결과 반환
    return {
        "feature": "D. 고객 분석",
        "summary": repurchase_metrics(df),
        "segments": seg_stats.to_dict(orient="records"),
        "top_customers": top[
            [
                "member_id",
                "name",
                "frequency",
                "monetary",
                "avg_order_value",
                "segment_name"
            ]
        ].to_dict(orient="records"),
        "by_age_band": age_stats.to_dict(orient="records"),
        "by_region": [],  # 회원 지역 정보가 없으므로 빈 목록 반환
        "retention": retention_records,
        "charts": (
            build_charts(df, retention)
            if with_charts else {}
        )
    }
