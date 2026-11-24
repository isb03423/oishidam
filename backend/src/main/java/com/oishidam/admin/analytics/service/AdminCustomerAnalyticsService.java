package com.oishidam.admin.analytics.service;

import com.oishidam.admin.analytics.entity.CustomerAnalyticsSnapshot;
import com.oishidam.admin.analytics.enums.CustomerAnalyticsRunStatus;
import com.oishidam.admin.analytics.repository.CustomerAnalyticsSnapshotRepository;
import com.oishidam.common.ai.AiServiceClient;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminCustomerAnalyticsService {
    private static final int SNAPSHOT_ID = 1;

    private final AiServiceClient client;
    private final MemberRepository members;
    private final CustomerAnalyticsSnapshotRepository snapshots;

    // shortcut: 단일 백엔드에서 실행 상태를 관리한다. 다중 인스턴스 운영 시 작업 상태를 공유한다.
    private final AtomicReference<CustomerAnalyticsRunStatus> runStatus = new AtomicReference<>(CustomerAnalyticsRunStatus.IDLE);

    // 마지막으로 저장한 결과에 관리자 화면용 이름과 분석 완료 시각을 붙인다.
    public Map<String, Object> latest(boolean charts) {
        return snapshots.findById(SNAPSHOT_ID).map(snapshot -> {
            Map<String, Object> report = new LinkedHashMap<>(snapshot.getReport());
            List<Map<String, Object>> customers = customerRows(report.get("top_customers"));
            Map<Long, String> names = members.findAllById(customers.stream()
                            .map(row -> ((Number) row.get("member_id")).longValue()).toList()).stream()
                    .collect(Collectors.toMap(Member::getId, Member::getName));
            customers.forEach(row -> row.put("name", names.get(((Number) row.get("member_id")).longValue())));
            report.put("top_customers", customers);
            report.put("analyzed_at", snapshot.getAnalyzedAt().toString());
            if (!charts) report.put("charts", Map.of());
            return report;
        }).orElse(null);
    }

    // 관리자가 요청할 때만 백그라운드 분석을 시작하고 실행 중인 요청은 합친다.
    public CustomerAnalyticsRunStatus startAnalysis() {
        String token = client.accessToken();
        if (runStatus.getAndSet(CustomerAnalyticsRunStatus.RUNNING) != CustomerAnalyticsRunStatus.RUNNING) {
            try {
                Thread.startVirtualThread(() -> saveAnalysis(token));
            } catch (RuntimeException error) {
                runStatus.set(CustomerAnalyticsRunStatus.FAILED);
                throw error;
            }
        }
        return runStatus.get();
    }

    // 실행 상태를 조회하면서 기존 분석 결과는 그대로 유지한다.
    public CustomerAnalyticsRunStatus status() {
        return runStatus.get();
    }

    // FastAPI의 전체 응답을 확인하고 성공한 결과만 기존 DB 스냅샷과 교체한다.
    private void saveAnalysis(String token) {
        CustomerAnalyticsRunStatus outcome = CustomerAnalyticsRunStatus.FAILED;
        try {
            Map<String, Object> result = client.customerAnalytics(true, token);
            if (result == null || !(result.get("summary") instanceof Map)
                    || !(result.get("charts") instanceof Map)
                    || !List.of("segments", "by_age_band", "retention").stream()
                    .allMatch(key -> result.get(key) instanceof List)) {
                throw invalidResponse();
            }
            Map<String, Object> report = new LinkedHashMap<>(result);
            report.put("top_customers", customerRows(result.get("top_customers")));
            snapshots.save(CustomerAnalyticsSnapshot.builder()
                    .id(SNAPSHOT_ID)
                    .report(report)
                    .analyzedAt(Instant.now())
                    .build());
            outcome = CustomerAnalyticsRunStatus.COMPLETED;
        } catch (RuntimeException error) {
            log.warn("고객 분석 결과를 갱신하지 못했습니다.", error);
        } finally {
            runStatus.set(outcome);
        }
    }

    // 우수 고객의 ID를 확인하고 회원 이름은 분석 스냅샷에서 제거한다.
    private List<Map<String, Object>> customerRows(Object value) {
        if (!(value instanceof List<?> customers)) throw invalidResponse();
        List<Map<String, Object>> rows = new ArrayList<>(customers.size());
        for (Object item : customers) {
            if (!(item instanceof Map<?, ?> customer) || !(customer.get("member_id") instanceof Number)) {
                throw invalidResponse();
            }
            Map<String, Object> row = new LinkedHashMap<>();
            customer.forEach((key, entry) -> row.put(String.valueOf(key), entry));
            row.remove("name");
            rows.add(row);
        }
        return rows;
    }

    // 분석 응답의 형식이 올바르지 않을 때 반환할 오류를 생성한다.
    private ApiException invalidResponse() {
        return new ApiException(HttpStatus.BAD_GATEWAY, "AI_INVALID_RESPONSE", "AI 고객 분석 응답을 확인할 수 없습니다.");
    }
}
