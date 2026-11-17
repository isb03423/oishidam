package com.oishidam.admin.dashboard.dto;

import java.time.LocalDate;
import java.util.List;

public record DashboardCustomersResponse(
        LocalDate from,
        LocalDate to,
        int page,
        int size,
        long total,
        List<DashboardCustomerResponse> customers
) {
}
