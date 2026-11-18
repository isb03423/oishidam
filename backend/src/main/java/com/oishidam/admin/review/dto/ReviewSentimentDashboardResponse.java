package com.oishidam.admin.review.dto;

import java.util.List;

public record ReviewSentimentDashboardResponse(
        long total,
        long analyzed,
        long pending,
        long negativeUnanswered,
        List<ReviewSentimentCountResponse> distribution
) {
}
