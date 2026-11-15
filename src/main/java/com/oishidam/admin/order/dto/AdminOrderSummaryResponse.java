package com.oishidam.admin.order.dto;

import com.oishidam.order.entity.Order;
import com.oishidam.order.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AdminOrderSummaryResponse(
        Long orderId,
        String orderNumber,
        Long memberId,
        OrderStatus orderStatus,
        BigDecimal totalAmount,
        LocalDateTime createdAt
) {
    public static AdminOrderSummaryResponse from(Order order) {
        return new AdminOrderSummaryResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getMember().getId(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                order.getCreatedAt()
        );
    }
}
