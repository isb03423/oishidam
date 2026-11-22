package com.oishidam.order.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.dto.OrderDetailResponse;
import com.oishidam.order.dto.OrderSummaryResponse;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.entity.Order;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderRepository;
import com.oishidam.payment.repository.PaymentConfirmationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class OrderQueryService {
    private final MemberRepository members;

    private final OrderRepository orders;

    private final OrderItemRepository items;

    private final PaymentConfirmationRepository confirmations;

    // 주문 목록
    @Transactional(readOnly = true)
    public Page<OrderSummaryResponse> list(
            Long memberId,
            String status,
            LocalDate from,
            String keyword,
            boolean excludePending,
            boolean excludeCancelled,
            int page,
            int size
    ) {
        validateMember(memberId);
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        OrderStatus requestedStatus;
        try {
            requestedStatus = status == null ? null : OrderStatus.fromValue(status);
        } catch (IllegalArgumentException exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_ORDER_STATUS", "지원하지 않는 주문 상태입니다.");
        }

        // 정렬과 상태 조건을 적용해 주문 조회
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id")));
        String search = keyword == null ? "" : keyword.trim().toLowerCase(Locale.ROOT);
        if (search.length() > 200) throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_SEARCH", "검색어가 너무 깁니다.");
        Specification<Order> filters = (root, query, cb) -> {
            var predicates = new ArrayList<Predicate>();
            predicates.add(cb.equal(root.get("member").get("id"), memberId));
            if (requestedStatus != null) predicates.add(cb.equal(root.get("orderStatus"), requestedStatus));
            if (excludePending) predicates.add(cb.notEqual(root.get("orderStatus"), OrderStatus.PAYMENT_PENDING));
            if (excludeCancelled) predicates.add(cb.notEqual(root.get("orderStatus"), OrderStatus.CANCELLED));
            if (from != null) predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), from.atStartOfDay()));
            if (!search.isEmpty()) {
                String pattern = "%" + search.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") + "%";
                var subquery = query.subquery(Long.class);
                var item = subquery.from(OrderItem.class);
                subquery.select(item.get("id")).where(cb.equal(item.get("order"), root), cb.like(cb.lower(item.get("productName")), pattern, '\\'));
                predicates.add(cb.or(cb.like(cb.lower(root.get("orderNumber")), pattern, '\\'), cb.exists(subquery)));
            }
            return cb.and(predicates.toArray(Predicate[]::new));
        };
        var result = orders.findAll(filters, pageable);
        return result.map(OrderSummaryResponse::from);
    }

    // 주문 상세
    @Transactional(readOnly = true)
    public OrderDetailResponse detail(Long memberId, Long orderId) {
        validateMember(memberId);

        // 회원의 주문과 관련 정보 조회
        var order = orders.findByIdAndMemberId(orderId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", "주문을 찾을 수 없습니다."));
        return OrderDetailResponse.from(
                order,
                items.findByOrderIdOrderByProductIdAsc(orderId),
                confirmations.findByOrderId(orderId).orElse(null)
        );
    }

    // 활성 회원 여부 확인
    private void validateMember(Long memberId) {
        members.findById(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }
}
