package com.oishidam.order.repository;

import com.oishidam.order.entity.OrderCancellation;
import com.oishidam.order.enums.OrderStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderCancellationRepository extends JpaRepository<OrderCancellation, Long> {
    Optional<OrderCancellation> findByOrderId(Long orderId);

    @EntityGraph(attributePaths = {"order", "order.member"})
    List<OrderCancellation> findByOrderOrderStatusAndCreatedAtBeforeAndIdGreaterThanOrderByIdAsc(
            OrderStatus status,
            LocalDateTime cutoff,
            Long afterId,
            Pageable pageable
    );
}
