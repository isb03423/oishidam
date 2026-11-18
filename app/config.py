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

    # 추천 요청 인증에 사용하는 서버 설정
    SPRING_API_URL: str = os.getenv("SPRING_API_URL", "http://127.0.0.1:8080/api").rstrip("/")
    AI_RECOMMENDATION_TOKEN: str = os.getenv("AI_RECOMMENDATION_TOKEN", "")

    FRONTEND_ORIGINS: list[str] = [
        origin.strip() for origin in os.getenv(
            "FRONTEND_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173,http://localhost:1573",
        ).split(",") if origin.strip()
    ]

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
