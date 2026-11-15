package com.oishidam.review.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.review.dto.PublicReviewResponse;
import com.oishidam.review.dto.ReviewContentRequest;
import com.oishidam.review.dto.ReviewEligibilityResponse;
import com.oishidam.review.dto.ReviewResponse;
import com.oishidam.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@Tag(name = "리뷰", description = "상품 리뷰 조회 및 관리")
@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService service;

    @Operation(summary = "상품 리뷰 목록 조회")
    @GetMapping("/api/products/{productId}/reviews")
    public ApiResponse<Page<PublicReviewResponse>> list(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.publicList(productId, page, size));
    }

    @Operation(summary = "리뷰 작성 가능 여부 조회")
    @GetMapping("/api/orders/items/{itemId}/review")
    public ApiResponse<ReviewEligibilityResponse> eligibility(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long itemId
    ) {
        return ApiResponse.ok(service.eligibility(Long.valueOf(jwt.getSubject()), itemId));
    }

    @Operation(summary = "리뷰 작성")
    @PostMapping("/api/orders/items/{itemId}/review")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ReviewResponse> create(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long itemId,
            @Valid @RequestBody ReviewContentRequest request
    ) {
        return ApiResponse.ok(service.create(Long.valueOf(jwt.getSubject()), itemId, request));
    }

    @Operation(summary = "리뷰 수정")
    @PatchMapping("/api/reviews/{reviewId}")
    public ApiResponse<ReviewResponse> update(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewContentRequest request
    ) {
        return ApiResponse.ok(service.update(Long.valueOf(jwt.getSubject()), reviewId, request));
    }

    @Operation(summary = "리뷰 삭제")
    @DeleteMapping("/api/reviews/{reviewId}")
    public ApiResponse<Void> delete(@AuthenticationPrincipal Jwt jwt, @PathVariable Long reviewId) {
        service.delete(Long.valueOf(jwt.getSubject()), reviewId);
        return ApiResponse.ok(null);
    }
}
