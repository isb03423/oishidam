package com.oishidam.product.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.product.dto.ProductDetailResponse;
import com.oishidam.product.dto.ProductSummaryResponse;
import com.oishidam.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@Tag(name = "상품", description = "상품 검색 및 조회")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @Operation(summary = "상품 검색 및 목록 조회")
    @GetMapping
    public ApiResponse<Page<ProductSummaryResponse>> search(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "latest") String sort
    ) {
        Page<ProductSummaryResponse> result = productService.search(categoryId, keyword, page, size, sort);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "상품 상세 조회")
    @GetMapping("/{productId}")
    public ApiResponse<ProductDetailResponse> detail(@PathVariable Long productId) {
        ProductDetailResponse result = productService.detail(productId);
        return ApiResponse.ok(result);
    }
}
