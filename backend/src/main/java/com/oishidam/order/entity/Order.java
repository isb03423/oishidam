package com.oishidam.order.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.member.entity.Member;
import com.oishidam.order.dto.OrderQuoteResponse;
import com.oishidam.order.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "orders", uniqueConstraints = @UniqueConstraint(columnNames = {"member_id", "request_key"}))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false, unique = true, length = 36)
    private String orderNumber;

    @Column(nullable = false, length = 36)
    private String requestKey;

    @Column(nullable = false, length = 64)
    private String requestHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private OrderStatus orderStatus = OrderStatus.PAYMENT_PENDING;

    @Column(nullable = false, precision = 14, scale = 0)
    private BigDecimal itemsAmount;

    @Column(nullable = false, precision = 14, scale = 0)
    private BigDecimal shippingFee;

    @Column(nullable = false, precision = 14, scale = 0)
    private BigDecimal totalAmount;

    @Column(nullable = false, length = 100)
    private String recipientName;

    @Column(nullable = false, length = 30)
    private String recipientPhone;

    @Column(nullable = false, length = 20)
    private String postalCode;

    @Column(nullable = false, length = 255)
    private String addressLine1;

    @Column(length = 255)
    private String addressLine2;

    @Column(length = 255)
    private String deliveryMemo;

    @Column(length = 13)
    private String customsCode;

    public static Order fromQuote(
            Member member,
            String orderNumber,
            UUID requestKey,
            String requestHash,
            String deliveryMemo,
            String customsCode,
            OrderQuoteResponse quote
    ) {
        return Order.builder()
                .member(member)
                .orderNumber(orderNumber)
                .requestKey(requestKey.toString())
                .requestHash(requestHash)
                .deliveryMemo(deliveryMemo)
                .customsCode(customsCode)
                .itemsAmount(quote.itemsAmount())
                .shippingFee(quote.shippingFee())
                .totalAmount(quote.totalAmount())
                .recipientName(quote.recipient().recipientName())
                .recipientPhone(quote.recipient().recipientPhone())
                .postalCode(quote.recipient().postalCode())
                .addressLine1(quote.recipient().addressLine1())
                .addressLine2(quote.recipient().addressLine2())
                .build();
    }

    public boolean canCancel() {
        return orderStatus == OrderStatus.PAID || orderStatus == OrderStatus.PREPARING;
    }

    public void markCancellationPending() {
        this.orderStatus = OrderStatus.CANCEL_PENDING;
    }

    public void markCancelled() {
        this.orderStatus = OrderStatus.CANCELLED;
    }

    public void changeStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public void markPaymentFailed() {
        this.orderStatus = OrderStatus.PAYMENT_FAILED;
    }

    public void markPaid() {
        this.orderStatus = OrderStatus.PAID;
    }
}
