package com.oishidam.review.dto;

import com.oishidam.review.entity.Review;
import java.time.LocalDateTime;

public record ReviewResponse(
        Long reviewId,
        Long orderItemId,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime editableUntil,
        String answerContent,
        LocalDateTime answeredAt,
        LocalDateTime answerUpdatedAt
) {
    public static ReviewResponse from(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getOrderItem().getId(),
                review.getContent(),
                review.getCreatedAt(),
                review.getUpdatedAt(),
                review.getCreatedAt().plusHours(24),
                review.getAnswerContent(),
                review.getAnsweredAt(),
                review.getAnswerUpdatedAt()
        );
    }
}
