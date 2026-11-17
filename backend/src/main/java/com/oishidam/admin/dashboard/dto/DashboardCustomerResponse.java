package com.oishidam.admin.dashboard.dto;

import java.math.BigDecimal;

public record DashboardCustomerResponse(
        Long memberId,
        String name,
        BigDecimal purchaseAmount,
        long orderCount
) {
}
