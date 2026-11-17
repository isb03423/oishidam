package com.oishidam.admin.dashboard.service;

import com.oishidam.admin.dashboard.dto.DashboardCustomersResponse;
import com.oishidam.admin.dashboard.dto.DashboardDayResponse;
import com.oishidam.admin.dashboard.dto.DashboardOperationsResponse;
import com.oishidam.admin.dashboard.repository.AdminDashboardRepository;
import com.oishidam.common.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {
    private final AdminDashboardRepository repository;
    private final Clock clock;

    // 같은 조회 시점의 운영 집계를 반환하고 거래가 없는 날짜도 포함한다.
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public DashboardOperationsResponse operations(int days) {
        if (days != 7 && days != 14 && days != 30) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PERIOD", "조회 기간은 7, 14, 30일 중 하나여야 합니다.");
        }
        LocalDate end = LocalDate.now(clock);
        LocalDate start = end.minusDays(days - 1L);
        var from = start.atStartOfDay();
        var until = end.plusDays(1).atStartOfDay();
        Map<LocalDate, Long> orders = repository.ordersByDay(from, until);
        Map<LocalDate, BigDecimal> sales = repository.salesByDay(from, until);
        var daily = start.datesUntil(end.plusDays(1))
                .map(date -> new DashboardDayResponse(date, orders.getOrDefault(date, 0L), sales.getOrDefault(date, BigDecimal.ZERO)))
                .toList();
        return new DashboardOperationsResponse(start, end, repository.countOrders(from, until), repository.sales(from, until),
                repository.countNewCustomers(from, until), repository.countPendingInquiries(), repository.countStockAlerts(),
                repository.countUnansweredReviews(), daily, repository.statuses(from, until), repository.recentOrders(from, until),
                repository.stockAlerts(), repository.pendingInquiries(), repository.unansweredReviews());
    }

    // 결제일 기준 고객별 구매 집계를 조회한다.
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public DashboardCustomersResponse customers(LocalDate from, LocalDate to, Long memberId, int page, int size) {
        if (from.isAfter(to) || to.equals(LocalDate.MAX) || page < 0 || size < 1 || size > 100
                || (long) page * size > Integer.MAX_VALUE || (memberId != null && memberId < 1)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_FILTER", "조회 조건이 올바르지 않습니다.");
        }
        var start = from.atStartOfDay();
        var until = to.plusDays(1).atStartOfDay();
        return new DashboardCustomersResponse(from, to, page, size, repository.countCustomers(start, until, memberId),
                repository.customers(start, until, memberId, page * size, size));
    }
}
