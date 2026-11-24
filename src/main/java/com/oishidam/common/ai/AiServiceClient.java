package com.oishidam.common.ai;

import com.oishidam.common.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.Map;

@Service
public class AiServiceClient {
    private final RestClient client;

    public AiServiceClient(
            @Value("${oishidam.ai.base-url}") String baseUrl,
            @Value("${oishidam.ai.timeout-seconds:60}") int timeoutSeconds
    ) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(timeoutSeconds));
        client = RestClient.builder().baseUrl(baseUrl).requestFactory(factory)
                .defaultStatusHandler(
                        status -> status.value() == 401 || status.value() == 403,
                        (request, response) -> {
                            throw new ApiException(
                                    HttpStatus.valueOf(response.getStatusCode().value()),
                                    "AI_AUTHENTICATION_FAILED", "AI 서비스 인증 또는 권한을 확인해 주세요."
                            );
                        }
                )
                .build();
    }

    // 현재 요청에서 검증된 JWT를 가져온다.
    public String accessToken() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || !(authentication.getPrincipal() instanceof Jwt jwt)) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "AUTHENTICATION_REQUIRED", "로그인이 필요합니다.");
        }
        return jwt.getTokenValue();
    }

    // 요청에서 검증한 관리자 JWT로 백그라운드 고객 분석을 호출한다.
    public Map<String, Object> customerAnalytics(boolean charts, String accessToken) {
        return client.get()
                .uri(uri -> uri.path("/api/ai/analytics/customers").queryParam("charts", charts).build())
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve().body(new ParameterizedTypeReference<Map<String, Object>>() {
                });
    }

    // 작성자의 JWT와 후기 ID로 저장된 후기 한 건의 분석을 요청한다.
    public void analyzeReview(Long reviewId, String accessToken) {
        client.post().uri("/api/ai/sentiment/reviews/{reviewId}/analyze", reviewId)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve().toBodilessEntity();
    }

    // 관리자 JWT로 전체 후기 재분석을 시작하거나 상태를 조회한다.
    public Map<String, Object> fullReviewReanalysis(HttpMethod method) {
        return client.method(method)
                .uri("/api/ai/sentiment/reanalyze-all")
                .headers(headers -> headers.setBearerAuth(accessToken()))
                .retrieve().body(new ParameterizedTypeReference<Map<String, Object>>() {
                });
    }

    // 관리자 JWT를 전달해 미분석·본문 수정·구버전 후기를 일괄 분석한다.
    public Map<String, Object> analyzePendingReviews(int limit) {
        return client.post()
                .uri(uri -> uri.path("/api/ai/sentiment/analyze-pending").queryParam("limit", limit).build())
                .headers(headers -> headers.setBearerAuth(accessToken()))
                .retrieve().body(new ParameterizedTypeReference<Map<String, Object>>() {
                });
    }
}
