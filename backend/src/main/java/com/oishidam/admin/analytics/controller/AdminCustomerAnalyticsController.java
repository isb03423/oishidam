package com.oishidam.admin.analytics.controller;

import com.oishidam.admin.analytics.service.AdminCustomerAnalyticsService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "관리자 - AI 고객 분석")
@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AdminCustomerAnalyticsController {
    private final AdminCustomerAnalyticsService service;

    @Operation(summary = "AI 고객 분석 조회", description = "FastAPI의 RFM 세그먼트, 재구매율, 최근 활동률과 코호트 리텐션을 조회합니다.")
    @GetMapping("/customers")
    public ApiResponse<Map<String, Object>> customers(@RequestParam(defaultValue = "true") boolean charts) {
        return ApiResponse.ok(service.analyze(charts));
    }
}
