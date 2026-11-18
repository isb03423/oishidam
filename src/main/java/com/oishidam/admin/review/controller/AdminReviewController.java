package com.oishidam.admin.review.controller;

import com.oishidam.admin.review.dto.AdminReviewResponse;
import com.oishidam.admin.review.dto.ReviewSentimentDashboardResponse;
import com.oishidam.admin.review.service.AdminReviewAnalyticsService;
import com.oishidam.admin.review.service.AdminReviewService;
import com.oishidam.common.dto.ApiResponse;
import com.oishidam.review.dto.ReviewContentRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@Tag(name = "관리자 - 리뷰", description = "관리자 리뷰 조회 및 답변 관리")
@RestController
@RequestMapping("/api/admin/reviews")
@RequiredArgsConstructor
public class AdminReviewController {
    private final AdminReviewService service;
    private final AdminReviewAnalyticsService analytics;

    @Operation(summary = "후기 감정분석 대시보드", description = "저장된 5단계 감정 분포, 미분석·미답변 현황과 상품별 집계를 조회합니다.")
    @GetMapping("/analytics")
    public ApiResponse<ReviewSentimentDashboardResponse> analytics() {
        return ApiResponse.ok(analytics.dashboard());
    }

    @Operation(summary = "리뷰 목록 조회", description = "상품 ID 또는 주문 당시 상품명과 후기 내용, 답변 여부로 조회합니다.")
    @GetMapping
    public ApiResponse<Page<AdminReviewResponse>> list(
            @RequestParam(required = false) Long productId,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean answered,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.adminList(productId, productName, keyword, answered, page, size));
    }

    @Operation(summary = "리뷰 상세 조회")
    @GetMapping("/{reviewId}")
    public ApiResponse<AdminReviewResponse> detail(@PathVariable Long reviewId) {
        return ApiResponse.ok(service.adminDetail(reviewId));
    }

    @Operation(summary = "리뷰 답변 등록 및 수정")
    @PutMapping("/{reviewId}/answer")
    public ApiResponse<AdminReviewResponse> answer(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewContentRequest request
    ) {
        return ApiResponse.ok(service.answer(Long.valueOf(jwt.getSubject()), reviewId, request));
    }
}
