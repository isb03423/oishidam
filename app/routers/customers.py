from fastapi import APIRouter, Query

from services import customer_analytics

router = APIRouter(prefix="/api/ai/analytics", tags=["AI 고객 분석"])

@router.get("/customers")
def customers(charts: bool = True):
    """AI 고객 분석 — RFM, 세그먼트, 재구매율, 리텐션"""
    return customer_analytics.analyze(charts)
