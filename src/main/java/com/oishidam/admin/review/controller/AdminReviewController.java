package com.oishidam.admin.review.controller;

import com.oishidam.admin.review.dto.AdminReviewResponse;
import com.oishidam.admin.review.dto.ReviewSentimentAnalysisResponse;
import com.oishidam.admin.review.dto.ReviewSentimentDashboardResponse;
import com.oishidam.admin.review.dto.ReviewSentimentProductResponse;
import com.oishidam.admin.review.dto.ReviewSentimentReanalysisResponse;
import com.oishidam.admin.review.enums.ReviewSentimentFilter;
import com.oishidam.admin.review.enums.ReviewSentimentProductSort;
import com.oishidam.admin.review.service.AdminReviewAnalyticsService;
import com.oishidam.admin.review.service.AdminReviewService;
import com.oishidam.common.dto.ApiResponse;
import com.oishidam.review.dto.ReviewContentRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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

    @Operation(summary = "미분석 후기 분석", description = "미분석·본문 수정·구버전 모델의 후기를 최대 500건 분석해 저장합니다.")
    @PostMapping("/analytics/analyze-pending")
    public ApiResponse<ReviewSentimentAnalysisResponse> analyzePending(
            @RequestParam(defaultValue = "500") int limit
    ) {
        return ApiResponse.ok(analytics.analyzePending(limit));
    }

    @Operation(summary = "전체 후기 재분석 시작", description = "삭제되지 않은 후기를 기존 분석 결과와 관계없이 다시 분석합니다.")
    @PostMapping("/analytics/reanalyze-all")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ApiResponse<ReviewSentimentReanalysisResponse> startFullReanalysis() {
        return ApiResponse.ok(analytics.fullReanalysis(HttpMethod.POST));
    }

    @Operation(summary = "전체 후기 재분석 상태 조회")
    @GetMapping("/analytics/reanalyze-all")
    public ApiResponse<ReviewSentimentReanalysisResponse> fullReanalysisStatus() {
        return ApiResponse.ok(analytics.fullReanalysis(HttpMethod.GET));
    }

    @Operation(summary = "상품별 감정 현황 조회", description = "상품명, 감정, 후기 유무에 맞는 상품을 정렬해 페이지 단위로 조회합니다.")
    @GetMapping("/analytics/products")
    public ApiResponse<Page<ReviewSentimentProductResponse>> sentimentProducts(
            @RequestParam(required = false) ReviewSentimentFilter sentiment,
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(required = false) Boolean reviewed,
            @RequestParam(defaultValue = "SENTIMENT") ReviewSentimentProductSort sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.ok(analytics.products(sentiment, keyword, reviewed, sort, page, size));
    }

    @Operation(summary = "리뷰 목록 조회", description = "상품 ID 또는 주문 당시 상품명과 후기 내용, 답변 여부, 감정 단계로 조회합니다.")
    @GetMapping
    public ApiResponse<Page<AdminReviewResponse>> list(
            @RequestParam(required = false) Long productId,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean answered,
            @RequestParam(required = false) ReviewSentimentFilter sentiment,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.adminList(productId, productName, keyword, answered, sentiment, page, size));
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
