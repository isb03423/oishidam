package com.oishidam.order.repository;

import com.oishidam.order.entity.OrderStatusHistory;
import com.oishidam.order.enums.OrderStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderStatusHistoryRepository extends JpaRepository<OrderStatusHistory, Long> {
    long countByOrderId(Long orderId);

    Optional<OrderStatusHistory> findFirstByOrderIdAndNewStatusOrderByIdAsc(Long orderId, OrderStatus newStatus);

    @EntityGraph(attributePaths = "changedBy")
    List<OrderStatusHistory> findByOrderIdOrderByIdAsc(Long orderId);
}
