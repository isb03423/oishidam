package com.oishidam.order.repository;

import com.oishidam.order.entity.OrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @EntityGraph(attributePaths = "order")
    @Query("""
            SELECT i FROM OrderItem i
            JOIN i.order o
            JOIN OrderStatusHistory delivery ON delivery.order = o
                AND delivery.newStatus = com.oishidam.order.enums.OrderStatus.DELIVERED
            LEFT JOIN OrderStatusHistory earlierDelivery ON earlierDelivery.order = o
                AND earlierDelivery.newStatus = delivery.newStatus AND earlierDelivery.id < delivery.id
            LEFT JOIN Review review ON review.orderItem = i
            WHERE o.member.id = :memberId
                AND o.orderStatus = com.oishidam.order.enums.OrderStatus.DELIVERED
                AND delivery.createdAt > :cutoff
                AND earlierDelivery.id IS NULL
                AND review.id IS NULL
            ORDER BY o.createdAt DESC, i.id DESC
            """)
    Page<OrderItem> findEligibleForReview(@Param("memberId") Long memberId, @Param("cutoff") LocalDateTime cutoff, Pageable pageable);

    List<OrderItem> findByOrderIdOrderByProductIdAsc(Long orderId);

    Optional<OrderItem> findByIdAndOrderMemberId(Long id, Long memberId);
}
