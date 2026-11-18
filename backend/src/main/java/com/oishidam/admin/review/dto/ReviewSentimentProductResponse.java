package com.oishidam.admin.review.dto;

import java.util.Map;

public record ReviewSentimentProductResponse(
        long productId,
        String productName,
        long total,
        long pending,
        Map<String, Long> sentiments
) {
}
