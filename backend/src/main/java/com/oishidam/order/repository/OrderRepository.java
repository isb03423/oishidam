package com.oishidam.order.repository;

import com.oishidam.order.entity.Order;
import com.oishidam.order.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    @Override
    @EntityGraph(attributePaths = "member")
    Page<Order> findAll(Specification<Order> spec, Pageable pageable);

    @Query("SELECT o.member.id FROM Order o WHERE o.id = :orderId")
    Optional<Long> findMemberIdByOrderId(@Param("orderId") Long orderId);

    Page<Order> findAllByMemberId(Long memberId, Pageable pageable);

    Page<Order> findAllByMemberIdAndOrderStatus(Long memberId, OrderStatus orderStatus, Pageable pageable);

    Optional<Order> findByIdAndMemberId(Long orderId, Long memberId);

    Optional<Order> findByMemberIdAndRequestKey(Long memberId, String requestKey);
}
