package com.oishidam.admin.dashboard;

import com.oishidam.admin.dashboard.dto.DashboardCustomersResponse;
import com.oishidam.admin.dashboard.dto.DashboardOperationsResponse;
import com.oishidam.admin.dashboard.service.AdminDashboardService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@Tag(name = "관리자 - 대시보드", description = "운영 현황 및 고객 구매 집계")
@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {
    private final AdminDashboardService service;

    @Operation(summary = "운영 현황 조회")
    @GetMapping("/operations")
    public ApiResponse<DashboardOperationsResponse> operations(@RequestParam(defaultValue = "7") int days) {
        return ApiResponse.ok(service.operations(days));
    }

    @Operation(summary = "고객별 구매 금액 및 주문 횟수 조회")
    @GetMapping("/customers")
    public ApiResponse<DashboardCustomersResponse> customers(
            @RequestParam LocalDate from, @RequestParam LocalDate to,
            @RequestParam(required = false) Long memberId,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.customers(from, to, memberId, page, size));
    }
}
