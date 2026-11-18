package com.oishidam.admin.dashboard.service;

import com.oishidam.admin.dashboard.dto.DashboardCustomersResponse;
import com.oishidam.admin.dashboard.dto.DashboardDayResponse;
import com.oishidam.admin.dashboard.dto.DashboardOperationsResponse;
import com.oishidam.admin.dashboard.dto.DashboardSalesComparisonResponse;
import com.oishidam.admin.dashboard.dto.DashboardHourResponse;
import com.oishidam.admin.dashboard.dto.DashboardStockAlertsResponse;
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
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {
    private final AdminDashboardRepository repository;
    private final Clock clock;

    // 기존 일수 조회를 유지하면서 오늘 조회를 지원한다.
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public DashboardOperationsResponse operations(int days) {
        if (days != 1 && days != 7 && days != 14 && days != 30) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PERIOD", "조회 기간은 1, 7, 14, 30일 중 하나여야 합니다.");
        }
        LocalDate end = LocalDate.now(clock);
        LocalDate start = end.minusDays(days - 1L);
        return operationsBetween(start, end);
    }

    // 일수와 직접 선택 기간의 중복을 막고 최대 31일의 과거·오늘 날짜를 조회한다.
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public DashboardOperationsResponse operations(Integer days, LocalDate start, LocalDate end) {
        if (start == null && end == null) {
            return operations(days == null ? 7 : days);
        }
        if (days != null || start == null || end == null || start.isAfter(end)
                || end.isAfter(LocalDate.now(clock)) || start.isBefore(LocalDate.MIN.plusDays(31))
                || ChronoUnit.DAYS.between(start, end) > 30) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PERIOD", "시작일과 종료일을 오늘까지 최대 31일로 선택해 주세요. days와 날짜 조건은 함께 사용할 수 없습니다.");
        }
        return operationsBetween(start, end);
    }

    // 같은 조회 시점의 운영 집계를 반환하고 거래가 없는 날짜도 포함한다.
    private DashboardOperationsResponse operationsBetween(LocalDate start, LocalDate end) {
        var asOf = LocalDateTime.now(clock);
        boolean hourly = start.equals(end) && end.equals(asOf.toLocalDate());
        var from = start.atStartOfDay();
        var until = hourly ? asOf : end.plusDays(1).atStartOfDay();
        LocalDate previousStart = start.minusDays(ChronoUnit.DAYS.between(start, end) + 1);
        var previousUntil = hourly ? asOf.minusDays(1) : from;
        var previous = new DashboardSalesComparisonResponse(previousStart, start.minusDays(1),
                repository.sales(previousStart.atStartOfDay(), previousUntil), dailyBetween(previousStart, start.minusDays(1), previousUntil),
                hourly ? hourlyBetween(previousStart, previousUntil) : List.of());
        return new DashboardOperationsResponse(start, end, repository.countOrders(from, until), repository.sales(from, until),
                repository.countNewCustomers(from, until), repository.countPendingInquiries(), repository.countStockAlerts(),
                repository.countUnansweredReviews(), dailyBetween(start, end, until), repository.statuses(from, until), repository.recentOrders(from, until),
                repository.stockAlerts(), repository.pendingInquiries(), repository.unansweredReviews(), previous,
                hourly ? hourlyBetween(start, until) : List.of(), asOf);
    }

    // 비교 기간도 같은 일수로 채워 같은 순서의 날짜별 수치를 비교할 수 있게 한다.
    private List<DashboardDayResponse> dailyBetween(LocalDate start, LocalDate end, LocalDateTime until) {
        var from = start.atStartOfDay();
        Map<LocalDate, Long> orders = repository.ordersByDay(from, until);
        Map<LocalDate, BigDecimal> sales = repository.salesByDay(from, until);
        return start.datesUntil(end.plusDays(1))
                .map(date -> new DashboardDayResponse(date, orders.getOrDefault(date, 0L), sales.getOrDefault(date, BigDecimal.ZERO)))
                .toList();
    }

    // 자정부터 현재 시간대까지 채우고 마지막 시간대는 같은 조회 시각까지만 집계한다.
    private List<DashboardHourResponse> hourlyBetween(LocalDate date, LocalDateTime until) {
        var orders = repository.ordersByHour(date.atStartOfDay(), until);
        var sales = repository.salesByHour(date.atStartOfDay(), until);
        return IntStream.rangeClosed(0, until.getHour())
                .mapToObj(hour -> new DashboardHourResponse(date.atTime(hour, 0), orders.getOrDefault(hour, 0L), sales.getOrDefault(hour, BigDecimal.ZERO)))
                .toList();
    }

    // 재고 알림의 페이지와 전체 품절·부족 집계를 같은 시점으로 조회한다.
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public DashboardStockAlertsResponse stockAlerts(int page, int size) {
        if (page < 0 || size < 1 || size > 100 || (long) page * size > Integer.MAX_VALUE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        long total = repository.countStockAlerts();
        long soldOut = repository.countSoldOutAlerts();
        return new DashboardStockAlertsResponse(total, (int) Math.ceilDiv(total, size), soldOut, total - soldOut,
                repository.stockAlerts(page * size, size));
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
