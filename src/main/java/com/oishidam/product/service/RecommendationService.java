package com.oishidam.product.service;

import com.oishidam.product.dto.RecommendationResponse;
import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.product.dto.ProductSummaryResponse;
import com.oishidam.wish.entity.WishItem;
import com.oishidam.wish.repository.WishItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final ProductService products;

    private final WishItemRepository wishes;

    private final CategoryService categories;

    // 추천 유형에 따른 상품 조회
    @Transactional(readOnly = true)
    public RecommendationResponse recommend(
            String type,
            int limit,
            Long memberId
    ) {
        if (limit < 1 || limit > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "상품 수는 1~100이어야 합니다.");
        }
        if ("new".equals(type)) {
            return new RecommendationResponse("NEW", products.search(null, null, 0, limit, "latest").getContent());
        }
        if ("best".equals(type)) {
            return best(limit, "BEST");
        }
        if (!"personalized".equals(type)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_RECOMMENDATION_TYPE", "지원하지 않는 추천 유형입니다.");
        }
        if (memberId == null) {
            return best(limit, "DEFAULT");
        }

        List<WishItem> history = wishes.findByMemberIdAndProductDeletedAtIsNullOrderByIdDesc(memberId);
        Set<Long> wishedIds = history.stream().map(item -> item.getProduct().getId()).collect(Collectors.toSet());
        List<Long> visible = categories.categoryIds(null);

        // shortcut: FastAPI를 사용할 수 있을 때까지 최근 찜한 카테고리로 추천한다.
        for (Long categoryId : history.stream()
                .map(item -> item.getProduct().getCategory().getId()).distinct().toList()) {
            if (!visible.contains(categoryId)) {
                continue;
            }
            int page = 0;
            Page<ProductSummaryResponse> candidates;
            do {
                candidates = products.search(categoryId, null, page++, 100, "latest");
                List<ProductSummaryResponse> matches = candidates.getContent().stream()
                        .filter(product -> !wishedIds.contains(product.productId())).limit(limit).toList();
                if (!matches.isEmpty()) {
                    return new RecommendationResponse("PERSONALIZED", matches);
                }
            }
            while (candidates.hasNext());
        }
        return best(limit, "DEFAULT");
    }

    // 인기 상품 추천 결과 생성
    private RecommendationResponse best(int limit, String type) {
        return new RecommendationResponse(type, products.search(null, null, 0, limit, "popular").getContent());
    }

}
