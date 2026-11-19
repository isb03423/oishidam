package com.oishidam.review.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.review.dto.*;
import com.oishidam.review.service.MyReviewService;
import com.oishidam.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "리뷰", description = "상품 리뷰 조회 및 관리")
@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService service;

    private final MyReviewService myReviews;

    @Operation(summary = "작성 가능한 리뷰 목록")
    @GetMapping("/api/reviews/eligible")
    public ApiResponse<Page<MyReviewItemResponse>> eligible(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.ok(myReviews.list(Long.valueOf(jwt.getSubject()), true, page, size));
    }

    @Operation(summary = "내 리뷰 목록")
    @GetMapping("/api/reviews/mine")
    public ApiResponse<Page<MyReviewItemResponse>> mine(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.ok(myReviews.list(Long.valueOf(jwt.getSubject()), false, page, size));
    }

    @Operation(summary = "상품 리뷰 목록 조회")
    @GetMapping("/api/products/{productId}/reviews")
    public ApiResponse<Page<PublicReviewResponse>> list(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.publicList(productId, page, size));
    }

    @Operation(summary = "상품 별점 집계", description = "삭제되지 않은 전체 후기 중 별점이 있는 후기의 평균과 평가 수를 조회합니다.")
    @GetMapping("/api/products/{productId}/reviews/summary")
    public ApiResponse<ReviewRatingSummaryResponse> ratingSummary(@PathVariable Long productId) {
        return ApiResponse.ok(service.ratingSummary(productId));
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
    @PostMapping(value = "/api/orders/items/{itemId}/review", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ReviewResponse> create(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long itemId,
            @Valid @RequestBody ReviewCreateRequest request
    ) {
        return ApiResponse.ok(service.create(Long.valueOf(jwt.getSubject()), itemId, request));
    }

    @Operation(summary = "사진과 함께 리뷰 작성")
    @PostMapping(value = "/api/orders/items/{itemId}/review", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ReviewResponse> createWithImages(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long itemId,
            @Valid @ModelAttribute ReviewCreateRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        return ApiResponse.ok(service.create(Long.valueOf(jwt.getSubject()), itemId, request, files));
    }

    @Operation(summary = "리뷰 수정")
    @PatchMapping(value = "/api/reviews/{reviewId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ReviewResponse> update(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewUpdateRequest request
    ) {
        return ApiResponse.ok(service.update(Long.valueOf(jwt.getSubject()), reviewId, request));
    }

    @Operation(summary = "사진과 함께 리뷰 수정")
    @PatchMapping(value = "/api/reviews/{reviewId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ReviewResponse> updateWithImages(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long reviewId,
            @Valid @RequestPart("request") ReviewUpdateRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        return ApiResponse.ok(service.updateWithImages(Long.valueOf(jwt.getSubject()), reviewId, request, files));
    }

    @Operation(summary = "리뷰 삭제")
    @DeleteMapping("/api/reviews/{reviewId}")
    public ApiResponse<Void> delete(@AuthenticationPrincipal Jwt jwt, @PathVariable Long reviewId) {
        service.delete(Long.valueOf(jwt.getSubject()), reviewId);
        return ApiResponse.ok(null);
    }
}
