package com.oishidam.payment.repository;

import com.oishidam.payment.entity.PaymentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PaymentRequestRepository extends JpaRepository<PaymentRequest, Long> {
    Optional<PaymentRequest> findByOrderId(Long orderId);

    @Modifying
    @Query("UPDATE PaymentRequest p SET p.updatedAt = :now WHERE p.id = :id")
    void recordRestart(@Param("id") Long id, @Param("now") LocalDateTime now);
}
