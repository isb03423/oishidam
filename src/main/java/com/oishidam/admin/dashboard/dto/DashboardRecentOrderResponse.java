package com.oishidam.admin.dashboard.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DashboardRecentOrderResponse(
        Long orderId,
        String orderNumber,
        LocalDateTime createdAt,
        String customer,
        BigDecimal totalAmount,
        String orderStatus
) {
}
