package com.oishidam.admin.review.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AdminReviewAnalyticsRepository {
    private final EntityManager entityManager;

    // 삭제되지 않은 후기의 감정 분포와 미답변 건수를 함께 집계한다.
    public List<Tuple> distribution() {
        return entityManager.createNativeQuery("""
                SELECT s.sentiment, COUNT(*) AS amount,
                       COUNT(CASE WHEN r.answered_at IS NULL THEN 1 END) AS unanswered
                FROM reviews r LEFT JOIN review_sentiments s ON s.review_id = r.review_id
                WHERE r.deleted_at IS NULL
                GROUP BY s.sentiment
                """, Tuple.class).getResultList();
    }

    // 부정 후기 건수, 전체 후기 건수 순으로 상품 10개를 조회한다.
    public List<Tuple> products() {
        return entityManager.createNativeQuery("""
                SELECT oi.product_id, COALESCE(p.name, MAX(oi.product_name)) AS product_name,
                       COUNT(*) AS total, COUNT(*) - COUNT(s.review_id) AS pending,
                       COUNT(CASE WHEN s.sentiment = 'VERY_POSITIVE' THEN 1 END) AS very_positive,
                       COUNT(CASE WHEN s.sentiment = 'POSITIVE' THEN 1 END) AS positive,
                       COUNT(CASE WHEN s.sentiment = 'NEUTRAL' THEN 1 END) AS neutral,
                       COUNT(CASE WHEN s.sentiment = 'NEGATIVE' THEN 1 END) AS negative,
                       COUNT(CASE WHEN s.sentiment = 'VERY_NEGATIVE' THEN 1 END) AS very_negative
                FROM reviews r
                JOIN order_items oi ON oi.order_item_id = r.order_item_id
                LEFT JOIN products p ON p.product_id = oi.product_id
                LEFT JOIN review_sentiments s ON s.review_id = r.review_id
                WHERE r.deleted_at IS NULL
                GROUP BY oi.product_id, p.name
                ORDER BY COUNT(CASE WHEN s.sentiment IN ('NEGATIVE', 'VERY_NEGATIVE') THEN 1 END) DESC,
                         COUNT(*) DESC, oi.product_id
                """, Tuple.class).setMaxResults(10).getResultList();
    }
}
