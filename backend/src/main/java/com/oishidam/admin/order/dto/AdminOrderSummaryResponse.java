package com.oishidam.admin.order.dto;

import com.oishidam.order.entity.Order;
import com.oishidam.order.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AdminOrderSummaryResponse(
        Long orderId,
        String orderNumber,
        Long memberId,
        String memberName,
        OrderStatus orderStatus,
        BigDecimal totalAmount,
        long totalQuantity,
        LocalDateTime createdAt
) {
    public static AdminOrderSummaryResponse from(Order order, long totalQuantity) {
        return new AdminOrderSummaryResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getMember().getId(),
                order.getMember().getName(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                totalQuantity,
                order.getCreatedAt()
        );
    }
}
