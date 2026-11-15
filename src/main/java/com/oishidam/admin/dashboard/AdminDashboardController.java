package com.oishidam.admin.dashboard;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.common.exception.ApiException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "관리자 - 대시보드", description = "운영 현황 및 고객 구매 집계")
@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {
    private final JdbcTemplate jdbc;

    private final Clock clock;

    public record Day(
            LocalDate date,
            long orderCount,
            BigDecimal sales
    ) {
    }

    public record Status(
            String status,
            long count
    ) {
    }

    public record RecentOrder(
            Long orderId,
            String orderNumber,
            LocalDateTime createdAt,
            String customer,
            BigDecimal totalAmount,
            String orderStatus
    ) {
    }

    public record Alert(
            Long id,
            String text
    ) {
    }

    public record Operations(
            LocalDate from,
            LocalDate to,
            long orderCount,
            BigDecimal sales,
            long newCustomers,
            long pendingInquiryCount,
            long stockAlertCount,
            long unansweredReviewCount,
            List<Day> daily,
            List<Status> statuses,
            List<RecentOrder> recentOrders,
            List<Alert> stockAlerts,
            List<Alert> pendingInquiries,
            List<Alert> unansweredReviews
    ) {
    }

    public record Customer(
            Long memberId,
            String name,
            BigDecimal purchaseAmount,
            long orderCount
    ) {
    }

    public record Customers(
            LocalDate from,
            LocalDate to,
            int page,
            int size,
            long total,
            List<Customer> customers
    ) {
    }
    @Operation(summary = "운영 현황 조회")
    @GetMapping("/operations")
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public ApiResponse<Operations> operations(@RequestParam(defaultValue = "7") int days) {
        if (days != 7 && days != 14 && days != 30) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PERIOD", "조회 기간은 7, 14, 30일 중 하나여야 합니다.");
        }
        LocalDate end = LocalDate.now(clock);
        LocalDate start = end.minusDays(days - 1L);
        Timestamp from = Timestamp.valueOf(start.atStartOfDay());
        Timestamp until = Timestamp.valueOf(end.plusDays(1).atStartOfDay());
        Long orderCount = jdbc.queryForObject("SELECT count(*) FROM orders WHERE created_at >= ? AND created_at < ?", Long.class, from, until);
        BigDecimal sales = jdbc.queryForObject("SELECT coalesce(sum(o.total_amount),0) FROM payment_confirmations p JOIN orders o ON o.order_id=p.order_id WHERE p.paid_at >= ? AND p.paid_at < ? AND o.order_status IN ('PAID','PREPARING','INTERNATIONAL_SHIPPING','CUSTOMS_CLEARANCE','DOMESTIC_SHIPPING','DELIVERED')", BigDecimal.class, from, until);
        Long newCustomers = jdbc.queryForObject("SELECT count(*) FROM members WHERE role='USER' AND created_at >= ? AND created_at < ?", Long.class, from, until);
        List<Day> daily = jdbc.query(
                """
                        SELECT d.day::date AS day,
                            (SELECT count(*) FROM orders o WHERE o.created_at >= d.day AND o.created_at < d.day + interval '1 day') AS orders,
                            (SELECT coalesce(sum(o.total_amount),0) FROM payment_confirmations p JOIN orders o ON o.order_id=p.order_id
                             WHERE p.paid_at >= d.day AND p.paid_at < d.day + interval '1 day' AND o.order_status IN ('PAID','PREPARING','INTERNATIONAL_SHIPPING','CUSTOMS_CLEARANCE','DOMESTIC_SHIPPING','DELIVERED')) AS sales
                        FROM generate_series(?::timestamp, ?::timestamp - interval '1 day', interval '1 day') d(day) ORDER BY d.day
                        """, (rs, row) -> new Day(rs.getDate("day").toLocalDate(), rs.getLong("orders"), rs.getBigDecimal("sales")), from, until
        );
        List<Status> statuses = jdbc.query(
                "SELECT order_status, count(*) AS count FROM orders WHERE created_at >= ? AND created_at < ? GROUP BY order_status ORDER BY order_status",
                (rs, row) -> new Status(rs.getString("order_status"), rs.getLong("count")), from, until
        );
        List<RecentOrder> recent = jdbc.query(
                "SELECT o.order_id,o.order_number,o.created_at,m.name,o.total_amount,o.order_status FROM orders o JOIN members m ON m.member_id=o.member_id WHERE o.created_at >= ? AND o.created_at < ? ORDER BY o.created_at DESC,o.order_id DESC LIMIT 5",
                (rs, row) -> new RecentOrder(rs.getLong("order_id"), rs.getString("order_number"), rs.getTimestamp("created_at").toLocalDateTime(), rs.getString("name"), rs.getBigDecimal("total_amount"), rs.getString("order_status")), from, until
        );
        String stockWhere = " FROM products p WHERE p.deleted_at IS NULL AND p.sale_status='ON_SALE' AND EXISTS (SELECT 1 FROM product_variants v WHERE v.product_id=p.product_id AND v.is_active=true AND v.stock_quantity <= 5)";
        Long stockCount = jdbc.queryForObject("SELECT count(*)" + stockWhere, Long.class);
        List<Alert> stock = jdbc.query(
                "SELECT p.product_id,p.name" + stockWhere +
                        " ORDER BY p.product_id DESC LIMIT 10", (rs, row) -> new Alert(rs.getLong(1), rs.getString(2))
        );
        Long pendingCount = jdbc.queryForObject("SELECT count(*) FROM inquiries WHERE status='OPEN'", Long.class);
        List<Alert> pending = jdbc.query("SELECT inquiry_id,title FROM inquiries WHERE status='OPEN' ORDER BY inquiry_id DESC LIMIT 10", (rs, row) -> new Alert(rs.getLong(1), rs.getString(2)));
        Long reviewCount = jdbc.queryForObject("SELECT count(*) FROM reviews WHERE deleted_at IS NULL AND answer_content IS NULL", Long.class);
        List<Alert> reviews = jdbc.query("SELECT review_id,content FROM reviews WHERE deleted_at IS NULL AND answer_content IS NULL ORDER BY review_id DESC LIMIT 10", (rs, row) -> new Alert(rs.getLong(1), rs.getString(2)));
        return ApiResponse.ok(new Operations(start, end, orderCount, sales, newCustomers, pendingCount, stockCount, reviewCount, daily, statuses, recent, stock, pending, reviews));
    }
    @Operation(summary = "고객별 구매 금액 및 주문 횟수 조회")
    @GetMapping("/customers")
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public ApiResponse<Customers> customers(
            @RequestParam LocalDate from, @RequestParam LocalDate to,
            @RequestParam(required = false) Long memberId,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {
        if (from.isAfter(to) || page < 0 || size < 1 || size > 100 || (memberId != null && memberId < 1)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_FILTER", "조회 조건이 올바르지 않습니다.");
        }
        Timestamp start = Timestamp.valueOf(from.atStartOfDay());
        Timestamp end = Timestamp.valueOf(to.plusDays(1).atStartOfDay());
        String filter = " FROM payment_confirmations p JOIN orders o ON o.order_id=p.order_id JOIN members m ON m.member_id=o.member_id WHERE p.paid_at >= ? AND p.paid_at < ? AND o.order_status IN ('PAID','PREPARING','INTERNATIONAL_SHIPPING','CUSTOMS_CLEARANCE','DOMESTIC_SHIPPING','DELIVERED') AND m.member_id = coalesce(?::bigint,m.member_id)";
        Long total = jdbc.queryForObject(
                "SELECT count(DISTINCT m.member_id)" + filter, Long.class, start, end, memberId);
        List<Customer> rows = jdbc.query(
                "SELECT m.member_id,m.name,sum(o.total_amount) AS amount,count(*) AS orders" + filter +
                        " GROUP BY m.member_id,m.name ORDER BY amount DESC,m.member_id LIMIT ? OFFSET ?",
                (rs, row) -> new Customer(rs.getLong("member_id"), rs.getString("name"), rs.getBigDecimal("amount"), rs.getLong("orders")),
                start, end, memberId, size, (long) page * size
        );
        return ApiResponse.ok(new Customers(from, to, page, size, total, rows));
    }
}
