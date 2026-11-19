package com.oishidam.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@Slf4j
class AiRecommendationClient {
    private final RestClient client;
    private final String token;

    AiRecommendationClient(
            @Value("${oishidam.ai.base-url}") String baseUrl,
            @Value("${AI_RECOMMENDATION_TOKEN:}") String token
    ) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(1));
        factory.setReadTimeout(Duration.ofSeconds(3));
        this.client = RestClient.builder().baseUrl(baseUrl).requestFactory(factory).build();
        this.token = token;
    }

    Optional<RankedProducts> rank(long memberId, int limit) {
        if (!token.isBlank()) {
            try {
                RankedProducts result = client.post()
                        .uri("/api/ai/recommend/products?limit={limit}", limit)
                        .header("X-Recommendation-Token", token)
                        .body(Map.of("member_id", memberId))
                        .retrieve()
                        .body(RankedProducts.class);
                if (result != null && result.productIds() != null && result.recommendationType() != null) {
                    return Optional.of(result);
                }
            } catch (RestClientException e) {
                log.warn("AI 상품 추천 요청 실패 ({})", e.getClass().getSimpleName());
            }
        }
        return Optional.empty();
    }

    record RankedProducts(String recommendationType, List<Long> productIds) {}
}
