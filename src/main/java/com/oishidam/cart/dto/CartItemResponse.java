package com.oishidam.cart.dto;

import com.oishidam.cart.entity.CartItem;
import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.ProductVariant;

import java.math.BigDecimal;
import java.util.Map;

public record CartItemResponse(
        Long cartItemId,
        Long productId,
        String productName,
        Long variantId,
        String variantName,
        Map<String, Object> optionValues,
        BigDecimal price,
        int quantity,
        int stockQuantity,
        boolean available
) {
    public static CartItemResponse from(CartItem item, boolean available) {
        ProductVariant variant = item.getVariant();
        Product product = variant.getProduct();
        return new CartItemResponse(
                item.getId(),
                product.getId(),
                product.getName(),
                variant.getId(),
                variant.getVariantName(),
                variant.getOptionValues(),
                variant.getPrice(),
                item.getQuantity(),
                variant.getStockQuantity(),
                available);
    }
}
