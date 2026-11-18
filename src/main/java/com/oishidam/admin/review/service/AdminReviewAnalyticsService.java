package com.oishidam.admin.review.service;

import com.oishidam.admin.review.dto.ReviewSentimentCountResponse;
import com.oishidam.admin.review.dto.ReviewSentimentDashboardResponse;
import com.oishidam.admin.review.dto.ReviewSentimentProductResponse;
import com.oishidam.admin.review.repository.AdminReviewAnalyticsRepository;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminReviewAnalyticsService {
    private static final List<String> SENTIMENTS = List.of(
            "VERY_POSITIVE", "POSITIVE", "NEUTRAL", "NEGATIVE", "VERY_NEGATIVE"
    );

    private final AdminReviewAnalyticsRepository repository;

    // DB에 저장된 결과를 기준으로 미분석 후기를 구분해 대시보드를 구성한다.
    @Transactional(readOnly = true)
    public ReviewSentimentDashboardResponse dashboard() {
        Map<String, Long> counts = new LinkedHashMap<>();
        SENTIMENTS.forEach(sentiment -> counts.put(sentiment, 0L));
        long pending = 0, negativeUnanswered = 0;
        for (Tuple row : repository.distribution()) {
            String sentiment = row.get("sentiment", String.class);
            if (sentiment == null) pending += count(row, "amount");
            else counts.put(sentiment, count(row, "amount"));
            if ("NEGATIVE".equals(sentiment) || "VERY_NEGATIVE".equals(sentiment)) {
                negativeUnanswered += count(row, "unanswered");
            }
        }
        long analyzed = counts.values().stream().mapToLong(Long::longValue).sum();
        List<ReviewSentimentProductResponse> products = repository.products().stream().map(row -> {
            Map<String, Long> sentiments = new LinkedHashMap<>();
            SENTIMENTS.forEach(sentiment -> sentiments.put(sentiment, count(row, sentiment.toLowerCase(Locale.ROOT))));
            return new ReviewSentimentProductResponse(count(row, "product_id"), row.get("product_name", String.class),
                    count(row, "total"), count(row, "pending"), sentiments);
        }).toList();
        return new ReviewSentimentDashboardResponse(analyzed + pending, analyzed, pending, negativeUnanswered,
                counts.entrySet().stream().map(item -> new ReviewSentimentCountResponse(item.getKey(), item.getValue())).toList(),
                products);
    }

    // DB 집계 숫자를 long으로 변환한다.
    private long count(Tuple row, String alias) {
        return ((Number) row.get(alias)).longValue();
    }
}
