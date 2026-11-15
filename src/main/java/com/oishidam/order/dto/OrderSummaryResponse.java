package com.oishidam.order.dto;

import com.oishidam.order.entity.Order;
import com.oishidam.order.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderSummaryResponse(
        Long orderId,
        String orderNumber,
        OrderStatus orderStatus,
        BigDecimal totalAmount,
        LocalDateTime createdAt
) {
    public static OrderSummaryResponse from(Order order) {
        return new OrderSummaryResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                order.getCreatedAt()
        );
    }
}
