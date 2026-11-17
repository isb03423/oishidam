package com.oishidam.admin.dashboard.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DashboardDayResponse(
        LocalDate date,
        long orderCount,
        BigDecimal sales
) {
}
