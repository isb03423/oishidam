package com.oishidam.admin.analytics.controller;

import com.oishidam.admin.analytics.enums.CustomerAnalyticsRunStatus;
import com.oishidam.admin.analytics.service.AdminCustomerAnalyticsService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "관리자 - AI 고객 분석")
@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AdminCustomerAnalyticsController {
    private final AdminCustomerAnalyticsService service;

    @Operation(summary = "마지막 AI 고객 분석 결과 조회", description = "DB에 저장된 마지막 분석 결과와 완료 시각을 조회합니다.")
    @GetMapping("/customers")
    public ApiResponse<Map<String, Object>> customers(@RequestParam(defaultValue = "true") boolean charts) {
        return ApiResponse.ok(service.latest(charts));
    }

    @Operation(summary = "AI 고객 분석 실행", description = "최신 데이터를 백그라운드에서 분석해 결과를 저장합니다.")
    @PostMapping("/customers/reanalyze")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ApiResponse<CustomerAnalyticsRunStatus> startAnalysis() {
        return ApiResponse.ok(service.startAnalysis());
    }

    @Operation(summary = "AI 고객 분석 실행 상태 조회")
    @GetMapping("/customers/reanalyze")
    public ApiResponse<CustomerAnalyticsRunStatus> analysisStatus() {
        return ApiResponse.ok(service.status());
    }
}
