package com.oishidam.product.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.product.dto.*;
import com.oishidam.product.service.AdminProductService;
import com.oishidam.product.service.ProductImageUploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {
    private final AdminProductService productService;
    private final ProductImageUploadService imageUploadService;

    @GetMapping
    public ApiResponse<Page<AdminProductResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<AdminProductResponse> result = productService.list(page, size);
        return ApiResponse.ok(result);
    }

    @GetMapping("/{productId}")
    public ApiResponse<AdminProductDetailResponse> detail(@PathVariable Long productId) {
        AdminProductDetailResponse result = productService.detail(productId);
        return ApiResponse.ok(result);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AdminProductDetailResponse>> create(
            @Valid @RequestBody AdminProductCreateRequest request
    ) {
        AdminProductDetailResponse result = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result));
    }

    @PutMapping("/{productId}")
    public ApiResponse<AdminProductResponse> update(
            @PathVariable Long productId,
            @Valid @RequestBody AdminProductRequest request
    ) {
        AdminProductResponse result = productService.update(productId, request);
        return ApiResponse.ok(result);
    }

    @PatchMapping("/{productId}/status")
    public ApiResponse<AdminProductResponse> changeStatus(
            @PathVariable Long productId,
            @Valid @RequestBody AdminProductStatusRequest request
    ) {
        AdminProductResponse result = productService.changeStatus(productId, request.saleStatus());
        return ApiResponse.ok(result);
    }

    @DeleteMapping("/{productId}")
    public ApiResponse<Void> delete(@PathVariable Long productId) {
        productService.delete(productId);
        return ApiResponse.ok(null);
    }

    @PostMapping("/{productId}/variants")
    public ResponseEntity<ApiResponse<AdminVariantResponse>> createVariant(
            @PathVariable Long productId,
            @Valid @RequestBody AdminVariantRequest request
    ) {
        AdminVariantResponse result = productService.createVariant(productId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result));
    }

    @PutMapping("/{productId}/variants/{variantId}")
    public ApiResponse<AdminVariantResponse> updateVariant(
            @PathVariable Long productId,
            @PathVariable Long variantId,
            @Valid @RequestBody AdminVariantRequest request
    ) {
        AdminVariantResponse result = productService.updateVariant(productId, variantId, request);
        return ApiResponse.ok(result);
    }

    @PostMapping(value = "/{productId}/images", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<AdminImageResponse>> createImage(
            @PathVariable Long productId,
            @Valid @RequestBody AdminImageRequest request
    ) {
        AdminImageResponse result = productService.createImage(productId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result));
    }

    @PostMapping(value = "/{productId}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<AdminImageResponse>> uploadImage(
            @PathVariable Long productId,
            @RequestPart("file") MultipartFile file,
            @Valid @ModelAttribute AdminImageUploadRequest request
    ) {
        AdminImageResponse result = imageUploadService.upload(productId, file, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result));
    }

    @PutMapping("/{productId}/images/{imageId}")
    public ApiResponse<AdminImageResponse> updateImage(
            @PathVariable Long productId,
            @PathVariable Long imageId,
            @Valid @RequestBody AdminImageRequest request
    ) {
        AdminImageResponse result = productService.updateImage(productId, imageId, request);
        return ApiResponse.ok(result);
    }

    @DeleteMapping("/{productId}/images/{imageId}")
    public ApiResponse<Void> deleteImage(
            @PathVariable Long productId,
            @PathVariable Long imageId
    ) {
        productService.deleteImage(productId, imageId);
        return ApiResponse.ok(null);
    }
}
