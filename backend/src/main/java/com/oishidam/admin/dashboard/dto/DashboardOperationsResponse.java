package com.oishidam.admin.dashboard.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record DashboardOperationsResponse(
        LocalDate from,
        LocalDate to,
        long orderCount,
        BigDecimal sales,
        long newCustomers,
        long pendingInquiryCount,
        long stockAlertCount,
        long unansweredReviewCount,
        List<DashboardDayResponse> daily,
        List<DashboardStatusResponse> statuses,
        List<DashboardRecentOrderResponse> recentOrders,
        List<DashboardAlertResponse> stockAlerts,
        List<DashboardAlertResponse> pendingInquiries,
        List<DashboardAlertResponse> unansweredReviews,
        DashboardSalesComparisonResponse previous,
        List<DashboardHourResponse> hourly,
        LocalDateTime asOf
) {
}
