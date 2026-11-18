import json
from secrets import compare_digest
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Response
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, PositiveInt
from sqlalchemy.exc import SQLAlchemyError

from config import get_settings
from services import product_recommendations

router = APIRouter(prefix="/api/ai/recommend", tags=["AI 추천"])
bearer = HTTPBearer(auto_error=False)


class RecommendationRequest(BaseModel):
    member_id: PositiveInt


def current_customer(credentials: HTTPAuthorizationCredentials | None = Depends(bearer)) -> int:
    """Spring Boot에서 로그인 토큰과 고객 권한 확인"""
    if credentials is None:
        raise HTTPException(401, "로그인이 필요합니다.", headers={"WWW-Authenticate": "Bearer"})

    request = Request(
        get_settings().SPRING_API_URL + "/members/me",
        headers={"Authorization": "Bearer " + credentials.credentials},
    )
    try:
        with urlopen(request, timeout=3) as response:
            member = json.load(response)["data"]
            member_id = member["memberId"]
            role = member["role"]
    except HTTPError as error:
        if error.code == 401:
            raise HTTPException(401, "다시 로그인해주세요.", headers={"WWW-Authenticate": "Bearer"}) from None
        if error.code == 403:
            raise HTTPException(403, "추천을 이용할 권한이 없습니다.") from None
        raise HTTPException(503, "로그인 정보를 확인할 수 없습니다.") from None
    except (URLError, TimeoutError, ValueError, KeyError, TypeError):
        raise HTTPException(503, "로그인 정보를 확인할 수 없습니다.") from None

    if role not in ("USER", "일반 회원"):
        raise HTTPException(403, "고객만 이용할 수 있습니다.")
    if type(member_id) is not int or member_id < 1:
        raise HTTPException(503, "로그인 정보를 확인할 수 없습니다.")
    return member_id


@router.get("/products")
def personalized_products(
    response: Response,
    limit: int = Query(3, ge=1, le=100),
    member_id: int = Depends(current_customer),
):
    """로그인 고객의 추천 상품 목록 조회"""
    response.headers["Cache-Control"] = "private, no-store"

    try:
        result = product_recommendations.recommend_products(member_id, limit)
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
    x_recommendation_token: str = Header(""),
):
    """서버 간 요청에 사용할 추천 상품 ID 조회"""
    token = get_settings().AI_RECOMMENDATION_TOKEN
    if not token or not compare_digest(token.encode(), x_recommendation_token.encode()):
        raise HTTPException(status_code=403, detail="추천 서비스 인증에 실패했습니다.")
    try:
        return product_recommendations.recommend_products(request.member_id, limit)
    except SQLAlchemyError:
        raise HTTPException(status_code=503, detail="추천 데이터를 불러올 수 없습니다.") from None

