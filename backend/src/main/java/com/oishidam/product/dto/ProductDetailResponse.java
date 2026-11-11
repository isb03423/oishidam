package com.oishidam.product.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public record ProductDetailResponse(
        Long productId,
        Long categoryId,
        String name,
        String description,
        String brand,
        LocalDateTime publishedAt,
        List<ImageResponse> images,
        List<VariantResponse> variants
) {
    public record ImageResponse(
            Long imageId,
            String storageKey,
            String altText,
            int sortOrder,
            boolean isPrimary
    ) {
    }

    public record VariantResponse(
            Long variantId,
            String name,
            Map<String, Object> optionValues,
            BigDecimal price,
            int stockQuantity
    ) {
    }
}
