package com.oishidam.wish.dto;

import java.math.BigDecimal;
import java.util.List;

public record WishResponse(
        Long productId,
        String name,
        BigDecimal minimumPrice,
        String imageUrl,
        String saleStatus,
        boolean soldOut,
        boolean available,
        List<Variant> variants
) {
    public record Variant(
            Long variantId,
            String name,
            BigDecimal price,
            int stockQuantity
    ) {
    }
}
