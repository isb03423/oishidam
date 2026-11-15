package com.oishidam.order.dto;

import com.oishidam.order.entity.Order;
import com.oishidam.order.enums.OrderStatus;

import java.math.BigDecimal;

public record OrderCreateResponse(
        Long orderId,
        String orderNumber,
        OrderStatus orderStatus,
        BigDecimal totalAmount
) {
    public static OrderCreateResponse from(Order order) {
        return new OrderCreateResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getOrderStatus(),
                order.getTotalAmount()
        );
    }
}
