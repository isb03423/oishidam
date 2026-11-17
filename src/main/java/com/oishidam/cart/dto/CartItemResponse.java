package com.oishidam.cart.dto;

import com.oishidam.cart.entity.CartItem;
import com.oishidam.product.entity.Product;

import java.math.BigDecimal;

public record CartItemResponse(
        Long cartItemId,
        Long productId,
        String productName,
        BigDecimal price,
        int quantity,
        int stockQuantity,
        boolean available,
        String primaryImageUrl
) {
    public static CartItemResponse from(CartItem item, boolean available, String primaryImageUrl) {
        Product product = item.getProduct();
        return new CartItemResponse(
                item.getId(),
                product.getId(),
                product.getName(),
                product.getPrice(),
                item.getQuantity(),
                product.getStockQuantity(),
                available, primaryImageUrl
        );
    }
}
