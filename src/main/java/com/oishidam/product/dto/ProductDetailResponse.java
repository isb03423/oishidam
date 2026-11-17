package com.oishidam.product.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ProductDetailResponse(
        Long productId,
        Long categoryId,
        String name,
        String description,
        String brand,
        LocalDateTime publishedAt,
        List<ImageResponse> images,
        BigDecimal price,
        int stockQuantity,
        boolean isSoldOut
) {
    public record ImageResponse(
            Long imageId,
            String storageKey,
            String altText,
            int sortOrder,
            boolean isPrimary,
            String imageUrl
    ) {
    }

}
