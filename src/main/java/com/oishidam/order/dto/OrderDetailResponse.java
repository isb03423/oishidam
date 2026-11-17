package com.oishidam.order.dto;

import com.oishidam.order.entity.Order;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.payment.entity.PaymentConfirmation;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderDetailResponse(
        Long orderId,
        String orderNumber,
        OrderStatus orderStatus,
        BigDecimal itemsAmount,
        BigDecimal shippingFee,
        BigDecimal totalAmount,
        LocalDateTime createdAt,
        LocalDateTime paidAt,
        Recipient recipient,
        List<Item> items,
        boolean canCancel
) {
    public static OrderDetailResponse from(
            Order order,
            List<OrderItem> items,
            PaymentConfirmation payment
    ) {
        Recipient recipient = new Recipient(
                order.getRecipientName(),
                order.getRecipientPhone(),
                order.getPostalCode(),
                order.getAddressLine1(),
                order.getAddressLine2(),
                order.getDeliveryMemo(),
                order.getCustomsCode()
        );
        List<Item> itemResponses = items.stream().map(Item::from).toList();
        return new OrderDetailResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getOrderStatus(),
                order.getItemsAmount(),
                order.getShippingFee(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                payment == null ? null : payment.getPaidAt(),
                recipient,
                itemResponses,
                order.canCancel()
        );
    }

    public record Recipient(
            String recipientName,
            String recipientPhone,
            String postalCode,
            String addressLine1,
            String addressLine2,
            String deliveryMemo,
            String customsCode
    ) {
    }

    public record Item(
            Long orderItemId,
            Long productId,
            String productName,
            int quantity,
            BigDecimal unitPrice,
            BigDecimal lineAmount
    ) {
        private static Item from(OrderItem item) {
            return new Item(
                    item.getId(),
                    item.getProductId(),
                    item.getProductName(),
                    item.getQuantity(),
                    item.getUnitPrice(),
                    item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
            );
        }
    }
}
