package com.oishidam.order.repository;

import com.oishidam.order.entity.OrderStatusHistory;
import com.oishidam.order.enums.OrderStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderStatusHistoryRepository extends JpaRepository<OrderStatusHistory, Long> {
    @Query("""
            SELECT delivery FROM OrderStatusHistory delivery
            LEFT JOIN OrderStatusHistory earlierDelivery ON earlierDelivery.order = delivery.order
                AND earlierDelivery.newStatus = delivery.newStatus AND earlierDelivery.id < delivery.id
            WHERE delivery.order.id IN :ids
                AND delivery.newStatus = com.oishidam.order.enums.OrderStatus.DELIVERED
                AND earlierDelivery.id IS NULL
            """)
    List<OrderStatusHistory> findFirstDeliveriesByOrderIdIn(@Param("ids") List<Long> ids);

    long countByOrderId(Long orderId);

    Optional<OrderStatusHistory> findFirstByOrderIdAndNewStatusOrderByIdAsc(Long orderId, OrderStatus newStatus);

    @EntityGraph(attributePaths = "changedBy")
    List<OrderStatusHistory> findByOrderIdOrderByIdAsc(Long orderId);
}
