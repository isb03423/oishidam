package com.oishidam.admin.analytics.dto;

import java.util.List;

public record CustomerAnalyticsMembersResponse(
        boolean available,
        List<CustomerAnalyticsMemberResponse> content,
        long totalElements,
        int totalPages
) {
}
