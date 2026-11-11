package com.oishidam.product.dto;

import com.oishidam.product.entity.ProductVariant;

import java.math.BigDecimal;
import java.util.Map;

public record AdminVariantResponse(
        Long variantId,
        String skuCode,
        String variantName,
        Map<String, Object> optionValues,
        BigDecimal price,
        int stockQuantity,
        boolean isActive
) {
    public static AdminVariantResponse from(ProductVariant variant) {
        return new AdminVariantResponse(
                variant.getId(),
                variant.getSkuCode(),
                variant.getVariantName(),
                variant.getOptionValues(),
                variant.getPrice(),
                variant.getStockQuantity(),
                variant.isActive());
    }
}
