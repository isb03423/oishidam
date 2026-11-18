package com.oishidam.admin.dashboard.dto;

import java.util.List;

public record DashboardStockAlertsResponse(
        long totalElements,
        int totalPages,
        long soldOutCount,
        long lowStockCount,
        List<DashboardStockAlertResponse> content
) {
}
