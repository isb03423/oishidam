package com.oishidam.admin.order.dto;

import com.oishidam.order.dto.OrderDetailResponse;
import com.oishidam.order.entity.Order;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.entity.OrderStatusHistory;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.payment.entity.PaymentConfirmation;

import java.time.LocalDateTime;
import java.util.List;

public record AdminOrderDetailResponse(
        Long memberId,
        String memberName,
        OrderDetailResponse order,
        List<History> statusHistories
) {
    public static AdminOrderDetailResponse from(
            Order order,
            List<OrderItem> items,
            PaymentConfirmation payment,
            List<OrderStatusHistory> histories
    ) {
        return new AdminOrderDetailResponse(
                order.getMember().getId(),
                order.getMember().getName(),
                OrderDetailResponse.from(order, items, payment),
                histories.stream().map(History::from).toList()
        );
    }

    public record History(
            Long historyId,
            OrderStatus previousStatus,
            OrderStatus newStatus,
            Long changedBy,
            String note,
            LocalDateTime createdAt
    ) {
        private static History from(OrderStatusHistory history) {
            return new History(
                    history.getId(),
                    history.getPreviousStatus(),
                    history.getNewStatus(),
                    history.getChangedBy() == null ? null : history.getChangedBy().getId(),
                    history.getNote(),
                    history.getCreatedAt()
            );
        }
    }
}
