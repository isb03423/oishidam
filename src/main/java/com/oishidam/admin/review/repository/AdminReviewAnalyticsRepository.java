package com.oishidam.admin.review.repository;

import com.oishidam.admin.review.enums.ReviewSentimentFilter;
import com.oishidam.admin.review.enums.ReviewSentimentProductSort;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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
              AND (:keyword = '' OR STRPOS(LOWER(p.name), LOWER(:keyword)) > 0)
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

    // 상품명을 먼저 검색하고 집계 결과에 감정·후기 조건을 적용해 페이징한다.
    public Page<Tuple> products(
            ReviewSentimentFilter sentiment, String keyword, Boolean reviewed, ReviewSentimentProductSort sort, Pageable pageable
    ) {
        // SQL 식별자는 검증된 enum에서만 선택한다.
        String selected = sentiment == null ? null : sentiment == ReviewSentimentFilter.UNANALYZED
                ? "pending" : sentiment.name().toLowerCase(Locale.ROOT);
        List<String> conditions = new ArrayList<>();
        if (selected != null) {
            conditions.add(selected + " > 0");
        }
        if (reviewed != null) {
            conditions.add(reviewed ? "total > 0" : "total = 0");
        }
        String source = " FROM (" + PRODUCT_COUNTS + ") counts"
                + (conditions.isEmpty() ? "" : " WHERE " + String.join(" AND ", conditions));
        String sentimentOrder = selected == null ? "negative + very_negative" : selected;
        String order = switch (sort) {
            case SENTIMENT -> sentimentOrder + " DESC, total DESC";
            case TOTAL -> "total DESC";
            case NAME -> "LOWER(product_name)";
        };
        long total = ((Number) entityManager.createNativeQuery("SELECT COUNT(*)" + source)
                .setParameter("keyword", keyword)
                .getSingleResult()).longValue();
        List<Tuple> content = entityManager.createNativeQuery("SELECT *" + source + " ORDER BY " + order + ", product_id", Tuple.class)
                .setParameter("keyword", keyword)
                .setFirstResult(Math.toIntExact(pageable.getOffset())).setMaxResults(pageable.getPageSize())
                .getResultList();
        return new PageImpl<>(content, pageable, total);
    }
}
