package com.oishidam.admin.analytics.service;

import com.oishidam.common.ai.AiServiceClient;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminCustomerAnalyticsService {
    private final AiServiceClient client;
    private final MemberRepository members;

    // FastAPI의 고객 분석 결과를 관리자 인증 경로로 전달한다.
    public Map<String, Object> analyze(boolean charts) {
        try {
            Map<String, Object> result = client.customerAnalytics(charts);
            if (result == null || !(result.get("summary") instanceof Map)
                    || !(result.get("charts") instanceof Map)
                    || !(result.get("top_customers") instanceof List<?> topCustomers)
                    || !List.of("segments", "by_age_band", "retention").stream()
                    .allMatch(key -> result.get(key) instanceof List)) {
                throw invalidResponse();
            }
            Map<String, Object> response = new LinkedHashMap<>(result);
            response.put("top_customers", withMemberNames(topCustomers));
            return response;
        } catch (RestClientException e) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_UNAVAILABLE", "AI 고객 분석에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.");
        }
    }

    // 암호화된 회원 이름은 AI 서비스에 전달하지 않고 관리자 응답을 만들 때 조회한다.
    private List<Map<String, Object>> withMemberNames(List<?> topCustomers) {
        List<Long> memberIds = new ArrayList<>(topCustomers.size());
        List<Map<String, Object>> rows = new ArrayList<>(topCustomers.size());
        for (Object item : topCustomers) {
            if (!(item instanceof Map<?, ?> customer) || !(customer.get("member_id") instanceof Number memberId)) {
                throw invalidResponse();
            }
            memberIds.add(memberId.longValue());
            Map<String, Object> row = new LinkedHashMap<>();
            customer.forEach((key, value) -> row.put(String.valueOf(key), value));
            rows.add(row);
        }

        Map<Long, String> names = members.findAllById(memberIds).stream()
                .collect(Collectors.toMap(Member::getId, Member::getName));
        for (int index = 0; index < rows.size(); index++) {
            rows.get(index).put("name", names.get(memberIds.get(index)));
        }
        return rows;
    }

    // 분석 응답의 형식이 올바르지 않을 때 반환할 오류를 생성한다.
    private ApiException invalidResponse() {
        return new ApiException(HttpStatus.BAD_GATEWAY, "AI_INVALID_RESPONSE", "AI 고객 분석 응답을 확인할 수 없습니다.");
    }
}
