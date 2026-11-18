package com.oishidam.admin.order.service;

import com.oishidam.admin.order.dto.AdminOrderDetailResponse;
import com.oishidam.admin.order.dto.AdminOrderStatusRequest;
import com.oishidam.admin.order.dto.AdminOrderSummaryResponse;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.enums.MemberRole;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.dto.OrderQuantityResponse;
import com.oishidam.order.entity.Order;
import com.oishidam.order.entity.OrderStatusHistory;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderRepository;
import com.oishidam.order.repository.OrderStatusHistoryRepository;
import com.oishidam.payment.repository.PaymentConfirmationRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOrderService {
    private static final Map<OrderStatus, OrderStatus> NEXT = Map.of(
            OrderStatus.PAID, OrderStatus.PREPARING,
            OrderStatus.PREPARING, OrderStatus.INTERNATIONAL_SHIPPING,
            OrderStatus.INTERNATIONAL_SHIPPING, OrderStatus.CUSTOMS_CLEARANCE,
            OrderStatus.CUSTOMS_CLEARANCE, OrderStatus.DOMESTIC_SHIPPING,
            OrderStatus.DOMESTIC_SHIPPING, OrderStatus.DELIVERED
    );

    private final OrderRepository orders;

    private final OrderItemRepository items;

    private final OrderStatusHistoryRepository histories;

    private final PaymentConfirmationRepository payments;

    private final MemberRepository members;

    // 관리자: 주문 목록
    @Transactional(readOnly = true)
    public Page<AdminOrderSummaryResponse> list(
            String keyword,
            String orderStatus,
            LocalDate from,
            LocalDate to,
            int page,
            int size
    ) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        OrderStatus requestedStatus;
        try {
            requestedStatus = orderStatus == null ? null : OrderStatus.fromValue(orderStatus);
        } catch (IllegalArgumentException exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_STATUS", "지원하지 않는 주문 또는 배송 상태입니다.");
        }
        if (from != null && to != null && from.isAfter(to) || to != null && to.equals(LocalDate.MAX)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_DATE_RANGE", "조회 기간이 올바르지 않습니다.");
        }
        if (keyword != null && keyword.length() > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_KEYWORD", "검색어는 100자 이하여야 합니다.");
        }
        String search = keyword == null ? "" : keyword.trim().toLowerCase(java.util.Locale.ROOT)
                .replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");

        // 검색 조건 구성
        Specification<Order> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (!search.isEmpty()) {
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("orderNumber")), "%" + search + "%", '\\'),
                        cb.like(cb.lower(root.get("recipientName")), "%" + search + "%", '\\')
                ));
            }
            if (requestedStatus != null) {
                predicates.add(cb.equal(root.get("orderStatus"), requestedStatus));
            }
            if (from != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), from.atStartOfDay()));
            }
            if (to != null) {
                predicates.add(cb.lessThan(root.get("createdAt"), to.plusDays(1).atStartOfDay()));
            }
            return cb.and(predicates.toArray(Predicate[]::new));
        };
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id")));
        Page<Order> result = orders.findAll(spec, pageable);
        Map<Long, Long> quantities = result.isEmpty() ? Map.of() : items.findQuantitiesByOrderIds(
                result.getContent().stream().map(Order::getId).toList()
        ).stream().collect(Collectors.toMap(OrderQuantityResponse::orderId, OrderQuantityResponse::quantity));
        return result.map(order -> AdminOrderSummaryResponse.from(order, quantities.getOrDefault(order.getId(), 0L)));
    }

    // 관리자: 주문 상세
    @Transactional(readOnly = true)
    public AdminOrderDetailResponse detail(Long orderId) {
        Order order = orders.findById(orderId).orElseThrow(this::notFound);
        return AdminOrderDetailResponse.from(
                order,
                items.findByOrderIdOrderByProductIdAsc(orderId),
                payments.findByOrderId(orderId).orElse(null),
                histories.findByOrderIdOrderByIdAsc(orderId)
        );
    }

    // 관리자: 주문 상태 변경
    @Transactional
    public AdminOrderSummaryResponse updateStatus(
            Long adminId,
            Long orderId,
            AdminOrderStatusRequest request
    ) {
        // 관리자 권한과 주문 회원 확인
        Member admin = members.findById(adminId).filter(Member::isActive)
                .filter(member -> member.getRole() == MemberRole.ADMIN)
                .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "ADMIN_REQUIRED", "관리자 권한이 필요합니다."));
        Long memberId = orders.findMemberIdByOrderId(orderId).orElseThrow(this::notFound);
        members.findByIdForUpdate(memberId).orElseThrow(this::notFound);
        Order order = orders.findById(orderId).orElseThrow(this::notFound);

        // 허용된 상태 변경인지 확인
        OrderStatus current = order.getOrderStatus();
        OrderStatus target = request.orderStatus();
        if (current == target) {
            return summary(order);
        }
        if (target == null || target != NEXT.get(current)) {
            throw new ApiException(HttpStatus.CONFLICT, "INVALID_STATUS_TRANSITION", "허용되지 않는 주문 또는 배송 상태 변경입니다.");
        }

        // 상태 변경 이력 저장 및 주문 상태 변경
        histories.save(
                OrderStatusHistory.builder()
                        .order(order)
                        .previousStatus(current)
                        .newStatus(target)
                        .changedBy(admin)
                        .note(request.note())
                        .build()
        );
        order.changeStatus(target);
        return summary(order);
    }

    // 상태 변경 응답에 주문 상품의 총수량 포함
    private AdminOrderSummaryResponse summary(Order order) {
        long quantity = items.findQuantitiesByOrderIds(List.of(order.getId())).stream()
                .mapToLong(OrderQuantityResponse::quantity).sum();
        return AdminOrderSummaryResponse.from(order, quantity);
    }

    // 조회 대상이 없을 때 반환할 오류 생성
    private ApiException notFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", "주문을 찾을 수 없습니다.");
    }

}
