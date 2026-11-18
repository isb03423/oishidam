package com.oishidam.admin.product.controller;

import com.oishidam.admin.product.dto.*;
import com.oishidam.admin.product.service.AdminProductService;
import com.oishidam.admin.product.service.ProductImageUploadService;
import com.oishidam.common.dto.ApiResponse;
import com.oishidam.product.enums.SaleStatus;
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

@Tag(name = "관리자 - 상품", description = "관리자 상품 및 이미지 관리")
@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {
    private final AdminProductService productService;

    private final ProductImageUploadService imageUploadService;

    @Operation(summary = "상품 목록 조회", description = "상품명, 판매 상태, 카테고리(하위 포함), 재고 조건으로 조회합니다. 재고 비교는 GT(초과), LT(미만), EQ(같음)입니다.")
    @GetMapping
    public ApiResponse<Page<AdminProductResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) SaleStatus saleStatus,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String stockComparison,
            @RequestParam(required = false) Integer stockQuantity
    ) {
        Page<AdminProductResponse> result = productService.list(page, size, keyword, saleStatus, categoryId, stockComparison, stockQuantity);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 상세 조회")
    @GetMapping("/{productId}")
    public ApiResponse<AdminProductDetailResponse> detail(@PathVariable Long productId) {
        AdminProductDetailResponse result = productService.detail(productId);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 등록")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminProductDetailResponse> create(
            @Valid @RequestBody AdminProductRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        AdminProductDetailResponse result = productService.create(request, Long.valueOf(jwt.getSubject()));
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 수정")
    @PutMapping("/{productId}")
    public ApiResponse<AdminProductResponse> update(
            @PathVariable Long productId,
            @Valid @RequestBody AdminProductRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        AdminProductResponse result = productService.update(productId, request, Long.valueOf(jwt.getSubject()));
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 재고 이력 조회")
    @GetMapping("/{productId}/stock-history")
    public ApiResponse<Page<StockHistoryResponse>> stockHistory(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(productService.stockHistory(productId, page, size));
    }

    @Operation(summary = "상품 재고 수량 변경")
    @PatchMapping("/{productId}/stock")
    public ApiResponse<AdminProductResponse> updateStock(
            @PathVariable Long productId,
            @Valid @RequestBody StockUpdateRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ApiResponse.ok(productService.updateStock(productId, request.stockQuantity(), request.expectedStockQuantity(), Long.valueOf(jwt.getSubject())));
    }

    @Operation(summary = "상품 판매 상태 변경")
    @PatchMapping("/{productId}/status")
    public ApiResponse<AdminProductResponse> changeStatus(
            @PathVariable Long productId,
            @Valid @RequestBody AdminProductStatusRequest request
    ) {
        AdminProductResponse result = productService.changeStatus(productId, request.saleStatus());
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 삭제")
    @DeleteMapping("/{productId}")
    public ApiResponse<Void> delete(@PathVariable Long productId) {
        productService.delete(productId);
        return ApiResponse.ok(null);
    }

    @Operation(summary = "상품 이미지 등록")
    @PostMapping(value = "/{productId}/images", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminImageResponse> createImage(
            @PathVariable Long productId,
            @Valid @RequestBody AdminImageRequest request
    ) {
        AdminImageResponse result = productService.createImage(productId, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 이미지 업로드")
    @PostMapping(value = "/{productId}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminImageResponse> uploadImage(
            @PathVariable Long productId,
            @RequestPart("file") MultipartFile file,
            @Valid @ModelAttribute AdminImageUploadRequest request
    ) {
        AdminImageResponse result = imageUploadService.upload(productId, file, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 이미지 수정")
    @PutMapping("/{productId}/images/{imageId}")
    public ApiResponse<AdminImageResponse> updateImage(
            @PathVariable Long productId,
            @PathVariable Long imageId,
            @Valid @RequestBody AdminImageRequest request
    ) {
        AdminImageResponse result = productService.updateImage(productId, imageId, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 이미지 삭제")
    @DeleteMapping("/{productId}/images/{imageId}")
    public ApiResponse<Void> deleteImage(
            @PathVariable Long productId,
            @PathVariable Long imageId
    ) {
        productService.deleteImage(productId, imageId);
        return ApiResponse.ok(null);
    }
}
