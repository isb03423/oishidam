package com.oishidam.product.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductSummaryResponse(
        Long productId,
        Long categoryId,
        String name,
        String brand,
        BigDecimal minimumPrice,
        ImageResponse primaryImage,
        LocalDateTime publishedAt
) {
    public record ImageResponse(
            String storageKey,
            String altText
    ) {
    }
}
