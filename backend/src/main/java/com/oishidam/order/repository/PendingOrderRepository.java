package com.oishidam.order.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PendingOrderRepository {
    private static final String PAYMENT_REQUEST_JOIN =
            " FROM orders o LEFT JOIN payment_requests p ON p.order_id = o.order_id WHERE ";
    private static final String EXPIRED = """
            o.order_status = 'PAYMENT_PENDING'
            AND ((p.order_id IS NULL AND o.created_at <= ?) OR p.updated_at <= ?)
            AND NOT EXISTS (SELECT 1 FROM payment_confirmations c WHERE c.order_id = o.order_id)
            AND NOT EXISTS (SELECT 1 FROM order_cancellations c WHERE c.order_id = o.order_id)
            AND NOT EXISTS (SELECT 1 FROM stock_histories s WHERE s.order_id = o.order_id)
            AND NOT EXISTS (
                SELECT 1 FROM order_items i JOIN reviews r ON r.order_item_id = i.order_item_id
                WHERE i.order_id = o.order_id
            )
            """;

    private final JdbcTemplate jdbc;

    public List<Candidate> findExpired(LocalDateTime orderCutoff, LocalDateTime paymentCutoff, long afterId, int limit) {
        return jdbc.query("SELECT o.order_id, o.member_id" + PAYMENT_REQUEST_JOIN + EXPIRED
                        + " AND o.order_id > ? ORDER BY o.order_id LIMIT ?",
                (rs, row) -> new Candidate(rs.getLong("order_id"), rs.getLong("member_id")),
                orderCutoff, paymentCutoff, afterId, limit);
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void expireIfPending(
            long orderId, LocalDateTime orderCutoff, LocalDateTime paymentCutoff, LocalDateTime now
    ) {
        List<Boolean> paymentStarted = jdbc.queryForList(
                "SELECT p.order_id IS NOT NULL" + PAYMENT_REQUEST_JOIN + EXPIRED + " AND o.order_id = ? FOR UPDATE OF o",
                Boolean.class, orderCutoff, paymentCutoff, orderId);
        if (paymentStarted.isEmpty()) return;

        if (paymentStarted.getFirst()) {
            jdbc.update("UPDATE orders SET order_status = 'PAYMENT_FAILED', updated_at = ? WHERE order_id = ?",
                    now, orderId);
            jdbc.update("""
                    INSERT INTO order_status_histories (order_id, previous_status, new_status, note, created_at, updated_at)
                    VALUES (?, 'PAYMENT_PENDING', 'PAYMENT_FAILED', '결제 시간 만료', ?, ?)
                    """, orderId, now, now);
            return;
        }

        jdbc.update("UPDATE inquiries SET order_id = NULL WHERE order_id = ?", orderId);
        jdbc.update("DELETE FROM order_status_histories WHERE order_id = ?", orderId);
        jdbc.update("DELETE FROM order_items WHERE order_id = ?", orderId);
        jdbc.update("DELETE FROM orders WHERE order_id = ?", orderId);
    }

    public record Candidate(long orderId, long memberId) {}
}
