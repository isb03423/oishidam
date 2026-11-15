package com.oishidam.order.dto;

import com.oishidam.order.enums.OrderStatus;

import java.time.LocalDateTime;

public record OrderCancelResponse(
        Long orderId,
        OrderStatus orderStatus,
        LocalDateTime cancelledAt
) {
}
