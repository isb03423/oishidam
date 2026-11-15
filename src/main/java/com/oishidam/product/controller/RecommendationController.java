package com.oishidam.product.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.common.exception.ApiException;
import com.oishidam.product.dto.RecommendationResponse;
import com.oishidam.product.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "상품 추천", description = "추천 상품 조회")
@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {
    private final RecommendationService recommendationService;

    @Operation(summary = "추천 상품 조회")
    @GetMapping("/products")
    public ApiResponse<RecommendationResponse> products(
            @RequestParam(defaultValue = "best") String type,
            @RequestParam(defaultValue = "3") int limit,
            @AuthenticationPrincipal Jwt jwt
    ) {
        if ("personalized".equals(type) && jwt != null) {
            if (jwt.getClaimAsStringList("roles") == null || !jwt.getClaimAsStringList("roles").contains("USER")) {
                throw new ApiException(HttpStatus.FORBIDDEN, "CUSTOMER_REQUIRED", "고객만 이용할 수 있습니다.");
            }
        }
        return ApiResponse.ok(recommendationService.recommend(
                type,
                limit,
                jwt == null ? null : Long.valueOf(jwt.getSubject())
        ));
    }
}
