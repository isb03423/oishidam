package com.oishidam.admin.product.controller;

import com.oishidam.admin.product.dto.*;
import com.oishidam.admin.product.service.AdminProductService;
import com.oishidam.admin.product.service.ProductImageUploadService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "관리자 - 상품", description = "관리자 상품, 옵션 및 이미지 관리")
@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {
    private final AdminProductService productService;

    private final ProductImageUploadService imageUploadService;

    @Operation(summary = "상품 목록 조회")
    @GetMapping
    public ApiResponse<Page<AdminProductResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<AdminProductResponse> result = productService.list(page, size);
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
            @Valid @RequestBody AdminProductCreateRequest request
    ) {
        AdminProductDetailResponse result = productService.create(request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 수정")
    @PutMapping("/{productId}")
    public ApiResponse<AdminProductResponse> update(
            @PathVariable Long productId,
            @Valid @RequestBody AdminProductRequest request
    ) {
        AdminProductResponse result = productService.update(productId, request);
        return ApiResponse.ok(result);
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

    @Operation(summary = "상품 옵션 등록")
    @PostMapping("/{productId}/variants")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminVariantResponse> createVariant(
            @PathVariable Long productId,
            @Valid @RequestBody AdminVariantRequest request
    ) {
        AdminVariantResponse result = productService.createVariant(productId, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 옵션 수정")
    @PutMapping("/{productId}/variants/{variantId}")
    public ApiResponse<AdminVariantResponse> updateVariant(
            @PathVariable Long productId,
            @PathVariable Long variantId,
            @Valid @RequestBody AdminVariantRequest request
    ) {
        AdminVariantResponse result = productService.updateVariant(productId, variantId, request);
        return ApiResponse.ok(result);
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
