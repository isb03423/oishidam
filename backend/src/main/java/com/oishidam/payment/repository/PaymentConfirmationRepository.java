package com.oishidam.payment.repository;

import com.oishidam.order.enums.OrderStatus;
import com.oishidam.payment.entity.PaymentConfirmation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PaymentConfirmationRepository extends JpaRepository<PaymentConfirmation, Long> {
    Optional<PaymentConfirmation> findByOrderId(Long orderId);

    boolean existsByPaymentKey(String paymentKey);

    @EntityGraph(attributePaths = {"order", "order.member"})
    List<PaymentConfirmation> findByOrderOrderStatusAndCreatedAtBeforeAndIdGreaterThanOrderByIdAsc(
            OrderStatus status,
            LocalDateTime cutoff,
            Long afterId,
            Pageable pageable
    );
}
