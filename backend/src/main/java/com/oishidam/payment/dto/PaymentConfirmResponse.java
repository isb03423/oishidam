package com.oishidam.payment.dto;

import com.oishidam.order.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentConfirmResponse(
        Long orderId,
        OrderStatus orderStatus,
        LocalDateTime paidAt,
        BigDecimal totalAmount
) {
}
