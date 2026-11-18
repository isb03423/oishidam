package com.oishidam.admin.dashboard.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DashboardHourResponse(
        LocalDateTime time,
        long orderCount,
        BigDecimal sales
) {
}
