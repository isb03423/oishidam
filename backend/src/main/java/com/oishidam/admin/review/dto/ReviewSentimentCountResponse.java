package com.oishidam.admin.review.dto;

public record ReviewSentimentCountResponse(
        String sentiment,
        long count
) {
}
