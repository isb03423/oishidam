import pandas as pd

from sqlalchemy import create_engine, text

from config import get_settings

# DB 엔진 생성
setting = get_settings()
engine = create_engine(
    setting.database_url,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

def query_df(sql: str, params: dict | None = None) -> pd.DataFrame:
    """SQL 조회 결과를 DataFrame으로 변환"""
    with engine.connect() as conn:
        return pd.read_sql(text(sql), conn, params=params or {})

def execute(sql: str, params: dict | None = None) -> None:
    """SQL 실행 (INSERT, UPDATE, DELETE)"""
    with engine.begin() as conn:
        conn.execute(text(sql), params or {})

def execute_many(sql: str, rows: list[dict]) -> None:
    """여러 데이터 일괄 실행"""
    if not rows:
        return

    with engine.begin() as conn:
        conn.execute(text(sql), rows)