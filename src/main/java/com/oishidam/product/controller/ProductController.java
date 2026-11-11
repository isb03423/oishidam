package com.oishidam.product.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.product.dto.ProductDetailResponse;
import com.oishidam.product.dto.ProductSummaryResponse;
import com.oishidam.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

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

    @GetMapping("/{productId}")
    public ApiResponse<ProductDetailResponse> detail(@PathVariable Long productId) {
        ProductDetailResponse result = productService.detail(productId);
        return ApiResponse.ok(result);
    }
}
