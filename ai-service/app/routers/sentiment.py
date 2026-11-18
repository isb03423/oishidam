from fastapi import APIRouter, Depends, HTTPException, Path, Query

from auth import CurrentMember, current_member

from services import sentiment

router = APIRouter(prefix="/api/ai/sentiment", tags=["AI 감정 분석"])


@router.post("/reviews/{review_id}/analyze")
def analyze_review(
    review_id: int = Path(ge=1),
    member: CurrentMember = Depends(current_member),
):
    """DB에 저장된 본인 후기 한 건만 분석하고 결과를 저장한다."""
    try:
        return sentiment.analyze_review(review_id, member.member_id)
    except LookupError:
        raise HTTPException(404, "본인이 작성한 후기를 찾을 수 없습니다.") from None


@router.post("/analyze-pending")
def analyze_pending_reviews(limit: int = Query(default=500, ge=1, le=500)):
    """미분석·본문 수정·구버전 모델의 리뷰를 분석해 DB에 저장한다."""
    return sentiment.analyze_pending_reviews(limit)


@router.get("/summary")
def product_sentiment_summary(product_id: int | None = Query(default=None, ge=1)):
    """전체 또는 특정 상품의 5단계 감성 분포를 조회한다."""
    return sentiment.product_sentiment_summary(product_id)

