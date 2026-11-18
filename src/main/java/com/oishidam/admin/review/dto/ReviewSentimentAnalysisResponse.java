package com.oishidam.admin.review.dto;

public record ReviewSentimentAnalysisResponse(
        int analyzed,
        String model
) {
}
