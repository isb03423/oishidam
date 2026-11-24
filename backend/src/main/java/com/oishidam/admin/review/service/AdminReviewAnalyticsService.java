package com.oishidam.admin.review.service;

import com.oishidam.admin.review.dto.ReviewSentimentAnalysisResponse;
import com.oishidam.admin.review.dto.ReviewSentimentCountResponse;
import com.oishidam.admin.review.dto.ReviewSentimentDashboardResponse;
import com.oishidam.admin.review.dto.ReviewSentimentProductResponse;
import com.oishidam.admin.review.dto.ReviewSentimentReanalysisResponse;
import com.oishidam.admin.review.enums.ReviewSentimentFilter;
import com.oishidam.admin.review.repository.AdminReviewAnalyticsRepository;
import com.oishidam.common.ai.AiServiceClient;
import com.oishidam.common.exception.ApiException;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;

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

    private final AiServiceClient ai;

    // 관리자 요청으로 최대 500건을 분석하고 처리 건수와 실제 모델을 반환한다.
    public ReviewSentimentAnalysisResponse analyzePending(int limit) {
        if (limit < 1 || limit > 500) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_ANALYSIS_LIMIT", "분석 건수는 1~500이어야 합니다.");
        }
        try {
            Map<String, Object> result = ai.analyzePendingReviews(limit);
            if (result == null || !(result.get("analyzed") instanceof Integer analyzed)
                    || analyzed < 0 || analyzed > limit || !(result.get("model") instanceof String model)
                    || model.isBlank()) {
                throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_INVALID_RESPONSE", "후기 분석 응답을 확인할 수 없습니다.");
            }
            return new ReviewSentimentAnalysisResponse(analyzed, model);
        } catch (RestClientException error) {
            throw new ApiException(
                    HttpStatus.BAD_GATEWAY, "AI_UNAVAILABLE",
                    "후기 분석 요청을 완료하지 못했습니다. 일부 후기가 처리되었을 수 있으니 현황을 확인한 뒤 다시 시도해 주세요."
            );
        }
    }

    // AI 서비스에서 전체 후기 재분석을 시작하거나 진행 상태를 읽는다.
    public ReviewSentimentReanalysisResponse fullReanalysis(HttpMethod method) {
        try {
            Map<String, Object> result = ai.fullReviewReanalysis(method);
            if (result == null || !(result.get("status") instanceof String status)
                    || !List.of("IDLE", "RUNNING", "COMPLETED", "FAILED").contains(status)
                    || !(result.get("analyzed") instanceof Integer analyzed) || analyzed < 0) {
                throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_INVALID_RESPONSE", "전체 후기 재분석 상태를 확인할 수 없습니다.");
            }
            return new ReviewSentimentReanalysisResponse(status, analyzed);
        } catch (RestClientException error) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_UNAVAILABLE", "전체 후기 재분석 서비스에 연결하지 못했습니다.");
        }
    }

    // DB에 저장된 결과를 기준으로 미분석 후기를 구분해 대시보드를 구성한다.
    @Transactional(readOnly = true)
    public ReviewSentimentDashboardResponse dashboard() {
        Map<String, Long> counts = new LinkedHashMap<>();
        SENTIMENTS.forEach(sentiment -> counts.put(sentiment, 0L));
        long pending = 0, negativeUnanswered = 0;
        for (Tuple row : repository.distribution()) {
            String sentiment = row.get("sentiment", String.class);
            if (sentiment == null) {
                pending += count(row, "amount");
            } else {
                counts.put(sentiment, count(row, "amount"));
            }
            if ("NEGATIVE".equals(sentiment) || "VERY_NEGATIVE".equals(sentiment)) {
                negativeUnanswered += count(row, "unanswered");
            }
        }
        long analyzed = counts.values().stream().mapToLong(Long::longValue).sum();
        return new ReviewSentimentDashboardResponse(
                analyzed + pending, analyzed, pending, negativeUnanswered,
                counts.entrySet().stream().map(item -> new ReviewSentimentCountResponse(item.getKey(), item.getValue())).toList()
        );
    }

    // 감정 조건에 맞는 모든 상품을 페이지 단위로 조회한다.
    @Transactional(readOnly = true)
    public Page<ReviewSentimentProductResponse> products(ReviewSentimentFilter sentiment, int page, int size) {
        if (page < 0 || size < 1 || size > 100 || (long) page * size > Integer.MAX_VALUE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        return repository.products(sentiment, PageRequest.of(page, size)).map(row -> {
            Map<String, Long> sentiments = new LinkedHashMap<>();
            SENTIMENTS.forEach(code -> sentiments.put(code, count(row, code.toLowerCase(Locale.ROOT))));
            return new ReviewSentimentProductResponse(
                    count(row, "product_id"), row.get("product_name", String.class),
                    count(row, "total"), count(row, "pending"), sentiments
            );
        });
    }

    // DB 집계 숫자를 long으로 변환한다.
    private long count(Tuple row, String alias) {
        return ((Number) row.get(alias)).longValue();
    }
}
