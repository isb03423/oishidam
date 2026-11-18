import os

from functools import lru_cache
from dotenv import load_dotenv
from sqlalchemy.engine import URL

load_dotenv()

class Setting:
    # 데이터베이스 정보
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: str = os.getenv("DB_PORT", "5432")
    DB_NAME: str = os.getenv("DB_NAME", "oishidam")
    DB_USER: str = os.getenv("DB_USER", "postgres")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")

    # 차트 저장 경로
    CHART_DIR: str = os.getenv("CHART_DIR", "./charts")

    @property
    def database_url(self) -> URL:
        return URL.create(
            drivername="postgresql+psycopg2",
            host=self.DB_HOST,
            port=self.DB_PORT,
            database=self.DB_NAME,
            username=self.DB_USER,
            password=self.DB_PASSWORD,
        )

@lru_cache
def get_settings() -> Setting:
    return Setting()