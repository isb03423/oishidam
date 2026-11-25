package com.oishidam.product.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.product.dto.RecommendationResponse;
import com.oishidam.product.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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

    @Operation(summary = "신상품 및 베스트 상품 조회")
    @GetMapping("/products")
    public ApiResponse<RecommendationResponse> products(
            @RequestParam(defaultValue = "best") String type,
            @RequestParam(defaultValue = "3") int limit
    ) {
        return ApiResponse.ok(recommendationService.recommend(type, limit));
    }
}
