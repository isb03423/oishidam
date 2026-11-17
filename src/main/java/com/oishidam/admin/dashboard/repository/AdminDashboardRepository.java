package com.oishidam.admin.dashboard.repository;

import com.oishidam.admin.dashboard.dto.DashboardAlertResponse;
import com.oishidam.admin.dashboard.dto.DashboardCustomerResponse;
import com.oishidam.admin.dashboard.dto.DashboardRecentOrderResponse;
import com.oishidam.admin.dashboard.dto.DashboardStatusResponse;
import com.oishidam.order.entity.Order;
import com.oishidam.order.enums.OrderStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class AdminDashboardRepository {
    private static final List<OrderStatus> APPROVED = List.of(
            OrderStatus.PAID, OrderStatus.PREPARING, OrderStatus.INTERNATIONAL_SHIPPING,
            OrderStatus.CUSTOMS_CLEARANCE, OrderStatus.DOMESTIC_SHIPPING, OrderStatus.DELIVERED
    );

    private final EntityManager entityManager;

    // 생성일 기준 기간 내 전체 주문 건수를 집계한다.
    public long countOrders(LocalDateTime from, LocalDateTime until) {
        return entityManager.createQuery("SELECT COUNT(o) FROM Order o WHERE o.createdAt >= :from AND o.createdAt < :until", Long.class)
                .setParameter("from", from).setParameter("until", until).getSingleResult();
    }

    // 승인된 주문의 결제일 기준 매출을 집계한다.
    public BigDecimal sales(LocalDateTime from, LocalDateTime until) {
        return entityManager.createQuery("""
                SELECT COALESCE(SUM(p.order.totalAmount), 0) FROM PaymentConfirmation p
                WHERE p.paidAt >= :from AND p.paidAt < :until AND p.order.orderStatus IN :approved
                """, BigDecimal.class).setParameter("from", from).setParameter("until", until)
                .setParameter("approved", APPROVED).getSingleResult();
    }

    // 기간 내 가입한 일반 회원 수를 집계한다.
    public long countNewCustomers(LocalDateTime from, LocalDateTime until) {
        return entityManager.createQuery("""
                SELECT COUNT(m) FROM Member m WHERE m.role = com.oishidam.member.enums.MemberRole.USER
                AND m.createdAt >= :from AND m.createdAt < :until
                """, Long.class).setParameter("from", from).setParameter("until", until).getSingleResult();
    }

    // 주문 생성일별 건수를 조회한다.
    public Map<LocalDate, Long> ordersByDay(LocalDateTime from, LocalDateTime until) {
        return entityManager.createQuery("""
                SELECT CAST(o.createdAt AS LocalDate), COUNT(o) FROM Order o
                WHERE o.createdAt >= :from AND o.createdAt < :until GROUP BY CAST(o.createdAt AS LocalDate)
                """, Tuple.class).setParameter("from", from).setParameter("until", until).getResultList().stream()
                .collect(Collectors.toMap(row -> row.get(0, LocalDate.class), row -> row.get(1, Long.class)));
    }

    // 승인된 주문의 결제일별 매출을 조회한다.
    public Map<LocalDate, BigDecimal> salesByDay(LocalDateTime from, LocalDateTime until) {
        return entityManager.createQuery("""
                SELECT CAST(p.paidAt AS LocalDate), SUM(p.order.totalAmount) FROM PaymentConfirmation p
                WHERE p.paidAt >= :from AND p.paidAt < :until AND p.order.orderStatus IN :approved
                GROUP BY CAST(p.paidAt AS LocalDate)
                """, Tuple.class).setParameter("from", from).setParameter("until", until)
                .setParameter("approved", APPROVED).getResultList().stream()
                .collect(Collectors.toMap(row -> row.get(0, LocalDate.class), row -> row.get(1, BigDecimal.class)));
    }

    // 기간 내 주문의 상태별 건수를 조회한다.
    public List<DashboardStatusResponse> statuses(LocalDateTime from, LocalDateTime until) {
        return entityManager.createQuery("""
                SELECT o.orderStatus, COUNT(o) FROM Order o WHERE o.createdAt >= :from AND o.createdAt < :until
                GROUP BY o.orderStatus ORDER BY o.orderStatus
                """, Tuple.class).setParameter("from", from).setParameter("until", until).getResultList().stream()
                .map(row -> new DashboardStatusResponse(row.get(0, OrderStatus.class).name(), row.get(1, Long.class))).toList();
    }

    // 최근 주문 5건과 주문자 이름을 함께 조회한다.
    public List<DashboardRecentOrderResponse> recentOrders(LocalDateTime from, LocalDateTime until) {
        return entityManager.createQuery("""
                SELECT o FROM Order o JOIN FETCH o.member WHERE o.createdAt >= :from AND o.createdAt < :until
                ORDER BY o.createdAt DESC, o.id DESC
                """, Order.class).setParameter("from", from).setParameter("until", until).setMaxResults(5).getResultList().stream()
                .map(order -> new DashboardRecentOrderResponse(order.getId(), order.getOrderNumber(), order.getCreatedAt(),
                        order.getMember().getName(), order.getTotalAmount(), order.getOrderStatus().name())).toList();
    }

    // 판매 중이며 삭제되지 않은 재고 5개 이하 상품 수를 집계한다.
    public long countStockAlerts() {
        return entityManager.createQuery("""
                SELECT COUNT(p) FROM Product p WHERE p.deletedAt IS NULL
                AND p.saleStatus = com.oishidam.product.enums.SaleStatus.ON_SALE AND p.stockQuantity <= 5
                """, Long.class).getSingleResult();
    }

    // 재고 확인 상품 중 최근 등록된 10건을 조회한다.
    public List<DashboardAlertResponse> stockAlerts() {
        return entityManager.createQuery("""
                SELECT NEW com.oishidam.admin.dashboard.dto.DashboardAlertResponse(p.id, p.name) FROM Product p
                WHERE p.deletedAt IS NULL AND p.saleStatus = com.oishidam.product.enums.SaleStatus.ON_SALE
                AND p.stockQuantity <= 5 ORDER BY p.id DESC
                """, DashboardAlertResponse.class).setMaxResults(10).getResultList();
    }

    // 답변 대기 문의 수를 집계한다.
    public long countPendingInquiries() {
        return entityManager.createQuery("SELECT COUNT(i) FROM Inquiry i WHERE i.status = 'OPEN'", Long.class).getSingleResult();
    }

    // 답변 대기 문의 중 최근 등록된 10건을 조회한다.
    public List<DashboardAlertResponse> pendingInquiries() {
        return entityManager.createQuery("""
                SELECT NEW com.oishidam.admin.dashboard.dto.DashboardAlertResponse(i.id, i.title)
                FROM Inquiry i WHERE i.status = 'OPEN' ORDER BY i.id DESC
                """, DashboardAlertResponse.class).setMaxResults(10).getResultList();
    }

    // 삭제되지 않은 미답변 후기 수를 집계한다.
    public long countUnansweredReviews() {
        return entityManager.createQuery("SELECT COUNT(r) FROM Review r WHERE r.deletedAt IS NULL AND r.answerContent IS NULL", Long.class)
                .getSingleResult();
    }

    // 미답변 후기 중 최근 등록된 10건을 조회한다.
    public List<DashboardAlertResponse> unansweredReviews() {
        return entityManager.createQuery("""
                SELECT NEW com.oishidam.admin.dashboard.dto.DashboardAlertResponse(r.id, r.content)
                FROM Review r WHERE r.deletedAt IS NULL AND r.answerContent IS NULL ORDER BY r.id DESC
                """, DashboardAlertResponse.class).setMaxResults(10).getResultList();
    }

    // 승인된 결제가 있는 고객 수를 조회한다.
    public long countCustomers(LocalDateTime from, LocalDateTime until, Long memberId) {
        return entityManager.createQuery("""
                SELECT COUNT(DISTINCT p.order.member.id) FROM PaymentConfirmation p
                WHERE p.paidAt >= :from AND p.paidAt < :until AND p.order.orderStatus IN :approved
                AND (:memberId IS NULL OR p.order.member.id = :memberId)
                """, Long.class).setParameter("from", from).setParameter("until", until)
                .setParameter("approved", APPROVED).setParameter("memberId", memberId).getSingleResult();
    }

    // 고객별 승인 구매액과 주문 횟수를 구매액 내림차순으로 조회한다.
    public List<DashboardCustomerResponse> customers(LocalDateTime from, LocalDateTime until, Long memberId, int offset, int size) {
        return entityManager.createQuery("""
                SELECT NEW com.oishidam.admin.dashboard.dto.DashboardCustomerResponse(m.id, m.name, SUM(o.totalAmount), COUNT(o))
                FROM PaymentConfirmation p JOIN p.order o JOIN o.member m
                WHERE p.paidAt >= :from AND p.paidAt < :until AND o.orderStatus IN :approved
                AND (:memberId IS NULL OR m.id = :memberId)
                GROUP BY m.id, m.name ORDER BY SUM(o.totalAmount) DESC, m.id
                """, DashboardCustomerResponse.class).setParameter("from", from).setParameter("until", until)
                .setParameter("approved", APPROVED).setParameter("memberId", memberId)
                .setFirstResult(offset).setMaxResults(size).getResultList();
    }
}
