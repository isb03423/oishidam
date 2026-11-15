package com.oishidam.payment.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.order.entity.Order;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payment_requests")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class PaymentRequest extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_request_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Column(nullable = false, length = 36)
    private String requestKey;

    @Column(nullable = false, length = 20)
    private String provider;

}
