package com.oishidam.product.service;

import com.oishidam.product.dto.RecommendationResponse;
import com.oishidam.common.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final ProductService products;

    // 신상품과 베스트 상품 조회
    public RecommendationResponse recommend(String type, int limit) {
        if (limit < 1 || limit > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "상품 수는 1~100이어야 합니다.");
        }
        if ("new".equals(type)) {
            return new RecommendationResponse("NEW", products.search(null, null, 0, Math.min(limit, 8), "new").getContent());
        }
        if ("best".equals(type)) {
            return new RecommendationResponse("BEST", products.search(null, null, 0, Math.min(limit, 8), "popular").getContent());
        }
        throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_RECOMMENDATION_TYPE", "지원하지 않는 추천 유형입니다.");
    }
}
