from fastapi import APIRouter, Depends, HTTPException, Query, Response
from pydantic import BaseModel, PositiveInt
from sqlalchemy.exc import SQLAlchemyError

from auth import CurrentMember, current_member
from services import product_recommendations

router = APIRouter(prefix="/api/ai/recommend", tags=["AI 추천"])


class RecommendationRequest(BaseModel):
    member_id: PositiveInt


@router.get("/products")
def personalized_products(
    response: Response,
    limit: int = Query(3, ge=1, le=100),
    member: CurrentMember = Depends(current_member),
):
    """로그인 회원의 추천 상품 목록 조회"""
    response.headers["Cache-Control"] = "private, no-store"

    try:
        result = product_recommendations.recommend_products(member.member_id, limit)
        products = product_recommendations.product_summaries(result["productIds"])
    except SQLAlchemyError:
        raise HTTPException(503, "추천 데이터를 불러올 수 없습니다.") from None

    return {
        "data": {
            "recommendationType": result["recommendationType"] if products else "DEFAULT",
            "products": products,
        }
    }


@router.post("/products")
def products(
    request: RecommendationRequest,
    limit: int = Query(3, ge=1, le=100),
    member: CurrentMember = Depends(current_member),
):
    """로그인 회원 본인의 추천 상품 ID 조회"""
    if request.member_id != member.member_id:
        raise HTTPException(status_code=403, detail="본인의 추천만 조회할 수 있습니다.")
    try:
        return product_recommendations.recommend_products(request.member_id, limit)
    except SQLAlchemyError:
        raise HTTPException(status_code=503, detail="추천 데이터를 불러올 수 없습니다.") from None

