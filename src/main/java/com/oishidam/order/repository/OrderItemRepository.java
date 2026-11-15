package com.oishidam.order.repository;

import com.oishidam.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderIdOrderByVariantIdAsc(Long orderId);

    Optional<OrderItem> findByIdAndOrderMemberId(Long id, Long memberId);
}
