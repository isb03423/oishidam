package com.oishidam.payment.repository;

import com.oishidam.payment.entity.PaymentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRequestRepository extends JpaRepository<PaymentRequest, Long> {
    Optional<PaymentRequest> findByOrderId(Long orderId);
}
