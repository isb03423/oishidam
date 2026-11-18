package com.oishidam.admin.dashboard.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record DashboardSalesComparisonResponse(
        LocalDate from,
        LocalDate to,
        BigDecimal sales,
        List<DashboardDayResponse> daily,
        List<DashboardHourResponse> hourly
) {
}
