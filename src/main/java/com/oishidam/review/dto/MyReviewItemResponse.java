package com.oishidam.review.dto;

import java.time.LocalDateTime;

public record MyReviewItemResponse(
        Long orderItemId,
        Long productId,
        String productName,
        String imageUrl,
        LocalDateTime orderedAt,
        LocalDateTime deliveredAt,
        LocalDateTime writeDeadline,
        boolean editable,
        ReviewResponse review
) {
}
