package com.oishidam.admin.review.repository;

import com.oishidam.admin.review.enums.ReviewSentimentFilter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Locale;

@Repository
@RequiredArgsConstructor
public class AdminReviewAnalyticsRepository {
    private final EntityManager entityManager;
    private static final String PRODUCT_COUNTS = """
            SELECT p.product_id, p.name AS product_name,
                   COUNT(r.review_id) AS total, COUNT(r.review_id) - COUNT(s.review_id) AS pending,
                   COUNT(CASE WHEN s.sentiment = 'VERY_POSITIVE' THEN 1 END) AS very_positive,
                   COUNT(CASE WHEN s.sentiment = 'POSITIVE' THEN 1 END) AS positive,
                   COUNT(CASE WHEN s.sentiment = 'NEUTRAL' THEN 1 END) AS neutral,
                   COUNT(CASE WHEN s.sentiment = 'NEGATIVE' THEN 1 END) AS negative,
                   COUNT(CASE WHEN s.sentiment = 'VERY_NEGATIVE' THEN 1 END) AS very_negative
            FROM products p
            LEFT JOIN order_items oi ON oi.product_id = p.product_id
            LEFT JOIN reviews r ON r.order_item_id = oi.order_item_id AND r.deleted_at IS NULL
            LEFT JOIN review_sentiments s ON s.review_id = r.review_id
            WHERE p.deleted_at IS NULL
            GROUP BY p.product_id, p.name
            """;

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

    // 전체 상품을 집계한 뒤 선택 감정이 있는 상품을 해당 감정 건수 순으로 페이징한다.
    public Page<Tuple> products(ReviewSentimentFilter sentiment, Pageable pageable) {
        // SQL 식별자는 검증된 enum에서만 선택한다.
        String selected = sentiment == null ? null : sentiment == ReviewSentimentFilter.UNANALYZED
                ? "pending" : sentiment.name().toLowerCase(Locale.ROOT);
        String source = " FROM (" + PRODUCT_COUNTS + ") counts";
        String filter = selected == null ? "" : " WHERE " + selected + " > 0";
        String order = selected == null ? "negative + very_negative" : selected;
        long total = ((Number) entityManager.createNativeQuery("SELECT COUNT(*)" + source + filter)
                .getSingleResult()).longValue();
        List<Tuple> content = entityManager.createNativeQuery("SELECT *" + source + filter
                        + " ORDER BY " + order + " DESC, total DESC, product_id", Tuple.class)
                .setFirstResult(Math.toIntExact(pageable.getOffset())).setMaxResults(pageable.getPageSize())
                .getResultList();
        return new PageImpl<>(content, pageable, total);
    }
}
