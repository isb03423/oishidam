package com.oishidam.admin.product.dto;

import com.oishidam.product.entity.Product;
import com.oishidam.product.enums.SaleStatus;

import java.time.LocalDateTime;
import java.math.BigDecimal;

public record AdminProductResponse(
        Long productId,
        Long categoryId,
        String name,
        String description,
        String brand,
        BigDecimal price,
        int stockQuantity,
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
                product.getPrice(),
                product.getStockQuantity(),
                product.getSaleStatus(),
                product.getPublishedAt()
        );
    }
}
