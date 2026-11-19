package com.oishidam.product.service;

import com.oishidam.product.dto.RecommendationResponse;
import com.oishidam.common.exception.ApiException;
import com.oishidam.product.dto.ProductSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final ProductService products;

    private final AiRecommendationClient ai;

    // 추천 유형에 따른 상품 조회
    public RecommendationResponse recommend(
            String type,
            int limit,
            Long memberId
    ) {
        if (limit < 1 || limit > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "상품 수는 1~100이어야 합니다.");
        }
        if ("new".equals(type)) {
            return new RecommendationResponse("NEW", products.search(null, null, 0, Math.min(limit, 8), "new").getContent());
        }
        if ("best".equals(type)) {
            return best(Math.min(limit, 8), "BEST");
        }
        if (!"personalized".equals(type)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_RECOMMENDATION_TYPE", "지원하지 않는 추천 유형입니다.");
        }
        if (memberId == null) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "AUTHENTICATION_REQUIRED", "로그인이 필요합니다.");
        }

        AiRecommendationClient.RankedProducts result = ai.rank(memberId, limit)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.SERVICE_UNAVAILABLE, "RECOMMENDATION_UNAVAILABLE",
                        "추천 상품을 불러올 수 없습니다. 잠시 후 다시 시도해주세요."
                ));
        List<ProductSummaryResponse> matches = products.availableSummaries(result.productIds());
        return new RecommendationResponse(matches.isEmpty() ? "DEFAULT" : result.recommendationType(), matches);
    }

    // 인기 상품 추천 결과 생성
    private RecommendationResponse best(int limit, String type) {
        return new RecommendationResponse(type, products.search(null, null, 0, limit, "popular").getContent());
    }

}
