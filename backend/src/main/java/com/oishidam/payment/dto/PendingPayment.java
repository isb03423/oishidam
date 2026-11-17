package com.oishidam.payment.dto;

import java.math.BigDecimal;

public record PendingPayment(
        Long id,
        Long memberId,
        Long orderId,
        String paymentKey,
        String orderNumber,
        BigDecimal amount
) {
}
