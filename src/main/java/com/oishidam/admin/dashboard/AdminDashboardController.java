package com.oishidam.admin.dashboard;

import com.oishidam.admin.dashboard.dto.DashboardCustomersResponse;
import com.oishidam.admin.dashboard.dto.DashboardOperationsResponse;
import com.oishidam.admin.dashboard.dto.DashboardStockAlertsResponse;
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

    @Operation(summary = "운영 현황 조회", description = "days(1·7·14·30일, 기본 7일) 또는 from/to(양 끝 포함 최대 31일)를 지정합니다. 미래 날짜는 조회할 수 없으며 직전 동일 기간의 판매 비교를 함께 반환합니다. 오늘은 00시부터 조회 시각까지 시간별로 집계하고 어제 같은 시각과 비교합니다.")
    @GetMapping("/operations")
    public ApiResponse<DashboardOperationsResponse> operations(
            @RequestParam(required = false) Integer days,
            @RequestParam(required = false) LocalDate from, @RequestParam(required = false) LocalDate to
    ) {
        return ApiResponse.ok(service.operations(days, from, to));
    }

    @Operation(summary = "재고 알림 조회", description = "판매 중인 재고 5개 이하 상품을 재고 수량 오름차순으로 조회하고 전체 품절·재고 부족 건수를 반환합니다.")
    @GetMapping("/stock-alerts")
    public ApiResponse<DashboardStockAlertsResponse> stockAlerts(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "4") int size
    ) {
        return ApiResponse.ok(service.stockAlerts(page, size));
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
