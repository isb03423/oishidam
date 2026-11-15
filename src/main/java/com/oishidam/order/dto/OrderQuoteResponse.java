package com.oishidam.order.dto;

import com.oishidam.member.dto.AddressResponse;
import java.math.BigDecimal;
import java.util.List;

public record OrderQuoteResponse(
        List<Item> items,
        BigDecimal itemsAmount,
        BigDecimal shippingFee,
        BigDecimal totalAmount,
        AddressResponse recipient
) {
    public record Item(
            Long cartItemId,
            Long productId,
            String productName,
            Long variantId,
            String variantName,
            int quantity,
            BigDecimal unitPrice,
            BigDecimal lineAmount
    ) {
    }
}
