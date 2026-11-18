from fastapi import APIRouter, Query

from services import customer_analytics

router = APIRouter(prefix="/api/ai/sentiment", tags=["AI 감정 분석"])

