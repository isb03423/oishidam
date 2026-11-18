package com.oishidam.product.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductSummaryResponse(
        Long productId,
        Long categoryId,
        String name,
        BigDecimal price,
        int stockQuantity,
        ImageResponse primaryImage,
        LocalDateTime publishedAt,
        boolean isSoldOut
) {
    public record ImageResponse(
            String storageKey,
            String altText,
            String imageUrl
    ) {
    }
}
