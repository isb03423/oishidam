package com.oishidam.payment.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.order.entity.Order;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payment_confirmations")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class PaymentConfirmation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_confirmation_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Column(nullable = false, unique = true, length = 200)
    private String paymentKey;

    private LocalDateTime paidAt;

    public void markPaid(LocalDateTime time) {
        this.paidAt = time;
    }
}
