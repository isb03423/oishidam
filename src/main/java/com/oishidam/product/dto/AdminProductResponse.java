package com.oishidam.product.dto;

import com.oishidam.product.entity.Product;
import com.oishidam.product.enums.SaleStatus;

import java.time.LocalDateTime;

public record AdminProductResponse(
        Long productId,
        Long categoryId,
        String name,
        String description,
        String brand,
        SaleStatus saleStatus,
        LocalDateTime publishedAt
) {
    public static AdminProductResponse from(Product product) {
        return new AdminProductResponse(
                product.getId(),
                product.getCategory().getId(),
                product.getName(),
                product.getDescription(),
                product.getBrand(),
                product.getSaleStatus(),
                product.getPublishedAt());
    }
}
