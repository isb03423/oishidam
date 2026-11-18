from fastapi import APIRouter, Query

from services import customer_analytics

router = APIRouter(prefix="/api/ai/recommend", tags=["AI 추천"])

