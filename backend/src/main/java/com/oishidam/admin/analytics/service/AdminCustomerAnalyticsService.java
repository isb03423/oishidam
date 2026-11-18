package com.oishidam.admin.analytics.service;

import com.oishidam.common.ai.AiServiceClient;
import com.oishidam.common.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminCustomerAnalyticsService {
    private final AiServiceClient client;

    // FastAPI의 고객 분석 결과를 관리자 인증 경로로 전달한다.
    public Map<String, Object> analyze(boolean charts) {
        try {
            Map<String, Object> result = client.customerAnalytics(charts);
            if (result == null || !(result.get("summary") instanceof Map)
                    || !(result.get("charts") instanceof Map)
                    || !List.of("segments", "top_customers", "by_age_band", "retention").stream()
                    .allMatch(key -> result.get(key) instanceof List)) {
                throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_INVALID_RESPONSE", "AI 고객 분석 응답을 확인할 수 없습니다.");
            }
            return result;
        } catch (RestClientException e) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_UNAVAILABLE", "AI 고객 분석에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.");
        }
    }
}
