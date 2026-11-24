import json
import logging
import re
from functools import lru_cache
from pathlib import Path
from threading import Lock, Thread

from sqlalchemy import text as sql_text

from database import engine, query_df

MODEL_ID = "tabularisai/multilingual-sentiment-analysis"
MODEL_REVISION = "eea032081f8d247b4303ef3565e7cec1b6f201c9"
_model_name = f"{MODEL_ID}@{MODEL_REVISION[:12]}"
_fallback_name = "knu-sentilex"
_load_lock = Lock()
_REVIEW_BATCH_SIZE = 16
_PENDING_REVIEWS = """
    FROM reviews r
    LEFT JOIN review_sentiments s ON s.review_id = r.review_id
    WHERE r.deleted_at IS NULL
      AND (s.review_id IS NULL OR (:upgrade AND s.model_name IS DISTINCT FROM :model_name))
"""
_reanalysis_lock = Lock()
# shortcut: 단일 AI 서비스 프로세스에서 상태를 관리한다. 다중 워커나 재시작 복구가 필요하면 DB로 옮긴다.
_reanalysis = {"status": "IDLE", "analyzed": 0}
logger = logging.getLogger(__name__)
SENTIMENT_LABELS = (
    "VERY_POSITIVE", "POSITIVE", "NEUTRAL", "NEGATIVE", "VERY_NEGATIVE"
)

with (Path(__file__).resolve().parents[1] / "data" / "SentiWord_info.json").open(
    encoding="utf-8-sig"
) as file:
    SENTIMENT_WORDS = {
        item["word"]: int(item["polarity"]) for item in json.load(file)
    }

POSITIVE_WORDS = [word for word, score in SENTIMENT_WORDS.items() if score > 0]
NEGATIVE_WORDS = [word for word, score in SENTIMENT_WORDS.items() if score < 0]
NEGATION = ["안", "않", "못"]

# 긴 구절을 먼저 매칭해 같은 위치의 단어를 중복 계산하지 않는다.
_word_pattern = re.compile(
    "|".join(re.escape(word) for word in sorted(SENTIMENT_WORDS, key=len, reverse=True))
)
_negation_pattern = re.compile(
    r"[가-힣]{0,3}\s*(?:" + "|".join(NEGATION) + ")"
)


def _rule_based(text: str) -> tuple[str, float]:
    """KNU 감성 점수의 평균으로 5단계를 분류하고 휴리스틱 신뢰도를 반환한다."""
    clean = re.sub(r"\s+", " ", text or "")
    scores = []
    # shortcut: 부분 문자열 비교는 활용형·문맥을 놓칠 수 있어, 정확도 개선 시 형태소 분석을 적용한다.
    for match in _word_pattern.finditer(clean):
        score = SENTIMENT_WORDS[match.group()]
        if score > 0 and _negation_pattern.match(clean, match.end()):
            score = -score
        if score:
            scores.append(score)

    if not scores:
        return "NEUTRAL", 0.50

    average = sum(scores) / len(scores)
    if average >= 1.5:
        sentiment = "VERY_POSITIVE"
    elif average > 0:
        sentiment = "POSITIVE"
    elif average <= -1.5:
        sentiment = "VERY_NEGATIVE"
    elif average < 0:
        sentiment = "NEGATIVE"
    else:
        return "NEUTRAL", 0.55

    # 기존 반환 형식 유지용 휴리스틱이며 모델이 계산한 확률이 아니다.
    confidence = min(0.55 + 0.12 * abs(sum(scores)), 0.98)
    return sentiment, confidence


@lru_cache(maxsize=1)
def _load_classifier():
    """고정 버전의 안전한 가중치를 한 번만 읽고 5단계 라벨을 검증한다."""
    import torch
    from transformers import AutoModelForSequenceClassification, AutoTokenizer

    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, revision=MODEL_REVISION, trust_remote_code=False)
    model = AutoModelForSequenceClassification.from_pretrained(
        MODEL_ID, revision=MODEL_REVISION, trust_remote_code=False, use_safetensors=True,
    )
    labels = [model.config.id2label[index].upper().replace(" ", "_") for index in range(model.config.num_labels)]
    if len(labels) != 5 or set(labels) != set(SENTIMENT_LABELS):
        raise ValueError("감정 모델은 서로 다른 5단계 라벨을 제공해야 합니다.")
    model.to("cuda" if torch.cuda.is_available() else "cpu").eval()
    return tokenizer, model, labels


def _get_classifier():
    """모델 로딩 실패 시 실제 사용 출처를 구분할 수 있도록 사전 분석으로 전환한다."""
    with _load_lock:
        try:
            return _load_classifier()
        except (ImportError, OSError, RuntimeError, ValueError):
            logger.warning("감정 모델 로딩 실패: KNU 사전으로 대체합니다.", exc_info=True)
            return None


def _analyze_many(texts: list[str], classifier) -> list[dict]:
    """긴 후기도 겹치는 토큰 구간으로 모두 분석하고 구간별 확률을 평균한다."""
    if not texts:
        return []
    model_name = _model_name if classifier is not None else _fallback_name
    if classifier is None:
        predictions = [_rule_based(text) for text in texts]
    else:
        import torch

        tokenizer, model, labels = classifier
        inputs = tokenizer(texts, return_tensors="pt", padding=True, truncation=True,
                           max_length=512, stride=64, return_overflowing_tokens=True)
        mapping = inputs.pop("overflow_to_sample_mapping")
        sums = torch.zeros((len(texts), len(labels)))
        with torch.inference_mode():
            for start in range(0, len(mapping), 16):
                batch = {key: value[start:start + 16].to(model.device) for key, value in inputs.items()}
                probabilities = model(**batch).logits.softmax(dim=-1).cpu()
                sums.index_add_(0, mapping[start:start + 16], probabilities)
        averages = sums / torch.bincount(mapping, minlength=len(texts)).unsqueeze(1)
        predictions = [(labels[int(row.argmax())], float(row.max())) if text.strip() else ("NEUTRAL", 0.0)
                       for text, row in zip(texts, averages)]
    return [{"sentiment": label, "confidence": round(confidence, 4), "model": model_name, "text": text}
            for text, (label, confidence) in zip(texts, predictions)]


def analyze(text: str) -> dict:
    """문장 분류를 우선 사용하고 추론 실패 시 KNU 사전으로 대체한다."""
    classifier = _get_classifier()
    try:
        return _analyze_many([text], classifier)[0]
    except (OSError, RuntimeError, ValueError):
        if classifier is None:
            raise
        logger.warning("감정 모델 추론 실패: KNU 사전으로 대체합니다.", exc_info=True)
        return _analyze_many([text], None)[0]


def _save_results(connection, results: list[dict]) -> None:
    """단건·일괄 분석 결과를 후기 ID 기준으로 저장한다."""
    connection.execute(sql_text("""
        INSERT INTO review_sentiments
            (review_id, sentiment, confidence, model_name)
        VALUES
            (:review_id, :sentiment, :confidence, :model_name)
        ON CONFLICT (review_id) DO UPDATE SET
            sentiment = EXCLUDED.sentiment,
            confidence = EXCLUDED.confidence,
            model_name = EXCLUDED.model_name,
            analyzed_at = LOCALTIMESTAMP
    """), results)


def analyze_review(review_id: int, member_id: int) -> dict:
    """본인 후기 한 건을 잠가 최신 본문을 분석하고 같은 트랜잭션에서 저장한다."""
    if review_id < 1 or member_id < 1:
        raise ValueError("후기 ID와 회원 ID는 1 이상이어야 합니다.")
    with engine.begin() as connection:
        review = connection.execute(sql_text("""
            SELECT r.review_id, r.content, s.model_name
            FROM reviews r
            LEFT JOIN review_sentiments s ON s.review_id = r.review_id
            WHERE r.review_id = :review_id AND r.member_id = :member_id
              AND r.deleted_at IS NULL
            FOR UPDATE OF r
        """), {"review_id": review_id, "member_id": member_id}).mappings().one_or_none()
        if review is None:
            raise LookupError("본인 후기를 찾을 수 없습니다.")
        classifier = _get_classifier()
        model_name = _model_name if classifier is not None else _fallback_name
        # 모델 장애가 기존 문장 모델 결과를 사전 결과로 낮추지 않도록 보존한다.
        if review["model_name"] == model_name or (classifier is None and review["model_name"] is not None):
            return {"review_id": review_id, "analyzed": 0, "model": review["model_name"]}
        result = _analyze_many([review["content"]], classifier)[0]
        _save_results(connection, [{"review_id": review_id, "sentiment": result["sentiment"],
                                    "confidence": result["confidence"], "model_name": result["model"]}])
        return {"review_id": review_id, "analyzed": 1, "sentiment": result["sentiment"],
                "confidence": result["confidence"], "model": result["model"]}


def _analyze_batch(connection, reviews, classifier) -> None:
    predictions = _analyze_many([review["content"] for review in reviews], classifier)
    _save_results(connection, [
        {
            "review_id": review["review_id"],
            "sentiment": result["sentiment"],
            "confidence": result["confidence"],
            "model_name": result["model"],
        }
        for review, result in zip(reviews, predictions, strict=True)
    ])


def analyze_pending_reviews(limit: int = 500) -> dict:
    """미분석·본문 수정·구버전 결과를 16건 단위 트랜잭션으로 분석·저장한다."""
    if not 1 <= limit <= 500:
        raise ValueError("limit은 1 이상 500 이하여야 합니다.")

    # 미분석·구버전 후기가 없으면 모델을 초기화하지 않는다.
    with engine.connect() as connection:
        pending = connection.execute(
            sql_text("SELECT 1 " + _PENDING_REVIEWS + " LIMIT 1"),
            {"upgrade": True, "model_name": _model_name},
        ).scalar_one_or_none()
    if pending is None:
        return {"analyzed": 0, "model": _model_name}

    classifier = _get_classifier()
    model_name = _model_name if classifier is not None else _fallback_name
    analyzed = 0
    while analyzed < limit:
        with engine.begin() as connection:
            # 분석 중 본문 변경을 막고, 다른 분석 요청이 처리 중인 리뷰는 건너뛴다.
            reviews = connection.execute(sql_text("SELECT r.review_id, r.content " + _PENDING_REVIEWS + """
                ORDER BY r.review_id
                LIMIT :limit
                FOR UPDATE OF r SKIP LOCKED
            """), {
                "limit": min(_REVIEW_BATCH_SIZE, limit - analyzed),
                "upgrade": classifier is not None,
                "model_name": model_name,
            }).mappings().all()

            if not reviews:
                break

            _analyze_batch(connection, reviews, classifier)
        analyzed += len(reviews)

    return {"analyzed": analyzed, "model": model_name}


def full_reanalysis_status() -> dict:
    with _reanalysis_lock:
        return _reanalysis.copy()


def start_full_reanalysis() -> dict:
    with _reanalysis_lock:
        if _reanalysis["status"] != "RUNNING":
            _reanalysis.update(status="RUNNING", analyzed=0)
            try:
                Thread(target=_reanalyze_all_reviews, daemon=True).start()
            except RuntimeError:
                logger.exception("전체 후기 재분석을 시작하지 못했습니다.")
                _reanalysis["status"] = "FAILED"
        return _reanalysis.copy()


def _reanalyze_all_reviews() -> None:
    try:
        with engine.connect() as connection:
            last_id = connection.execute(sql_text("""
                SELECT COALESCE(MAX(review_id), 0) FROM reviews WHERE deleted_at IS NULL
            """)).scalar_one()

        if last_id:
            classifier = _get_classifier()
            if classifier is None:
                raise RuntimeError("문장 모델을 사용할 수 없어 전체 재분석을 중단합니다.")

            after_id = 0
            while after_id < last_id:
                with engine.begin() as connection:
                    reviews = connection.execute(sql_text("""
                        SELECT review_id, content
                        FROM reviews
                        WHERE deleted_at IS NULL AND review_id > :after_id AND review_id <= :last_id
                        ORDER BY review_id
                        LIMIT :limit
                        FOR UPDATE
                    """), {
                        "after_id": after_id,
                        "last_id": last_id,
                        "limit": _REVIEW_BATCH_SIZE,
                    }).mappings().all()
                    if not reviews:
                        break
                    _analyze_batch(connection, reviews, classifier)

                after_id = reviews[-1]["review_id"]
                with _reanalysis_lock:
                    _reanalysis["analyzed"] += len(reviews)

        with _reanalysis_lock:
            _reanalysis["status"] = "COMPLETED"
    except Exception:
        logger.exception("전체 후기 재분석에 실패했습니다.")
        with _reanalysis_lock:
            _reanalysis["status"] = "FAILED"


def product_sentiment_summary(product_id: int | None = None) -> dict:
    """삭제되지 않은 리뷰의 최신 분석 결과를 상품별로 집계한다."""
    if product_id is not None and product_id < 1:
        raise ValueError("product_id는 1 이상이어야 합니다.")

    product_filter = "AND p.product_id = :product_id" if product_id is not None else ""
    data = query_df(f"""
        SELECT p.product_id, p.name AS product_name, s.sentiment, COUNT(*) AS cnt
        FROM review_sentiments s
        JOIN reviews r ON r.review_id = s.review_id
        JOIN order_items oi ON oi.order_item_id = r.order_item_id
        JOIN products p ON p.product_id = oi.product_id
        WHERE r.deleted_at IS NULL AND p.deleted_at IS NULL
          {product_filter}
        GROUP BY p.product_id, p.name, s.sentiment
        ORDER BY p.product_id
    """, {"product_id": product_id} if product_id is not None else {})

    products = {}
    overall = dict.fromkeys(SENTIMENT_LABELS, 0)
    for row in data.itertuples():
        product = products.setdefault(int(row.product_id), {
            "product_id": int(row.product_id),
            "product_name": row.product_name,
            **dict.fromkeys(SENTIMENT_LABELS, 0),
        })
        product[row.sentiment] = int(row.cnt)
        overall[row.sentiment] += int(row.cnt)

    for product in products.values():
        product["total"] = sum(product[label] for label in SENTIMENT_LABELS)
        product["positive_rate"] = round(
            (product["VERY_POSITIVE"] + product["POSITIVE"]) / product["total"] * 100, 1
        )

    return {
        "products": sorted(
            products.values(),
            key=lambda product: -(product["VERY_NEGATIVE"] + product["NEGATIVE"]),
        ),
        "overall": overall,
    }
