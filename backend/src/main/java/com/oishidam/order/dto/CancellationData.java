package com.oishidam.order.dto;

import java.math.BigDecimal;

public record CancellationData(
        Long memberId,
        Long orderId,
        String paymentKey,
        String orderNumber,
        BigDecimal amount,
        String reason,
        OrderCancelResponse completed
) {
}
