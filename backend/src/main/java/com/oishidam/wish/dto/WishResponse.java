package com.oishidam.wish.dto;

import java.math.BigDecimal;

public record WishResponse(
        Long productId,
        String name,
        BigDecimal price,
        String imageUrl,
        String saleStatus,
        boolean soldOut,
        boolean available,
        int stockQuantity
) {
}
