package com.oishidam.review.dto;

import com.oishidam.review.entity.Review;
import java.time.LocalDateTime;

public record PublicReviewResponse(
        Long reviewId,
        String content,
        LocalDateTime createdAt,
        String answerContent,
        LocalDateTime answeredAt,
        LocalDateTime answerUpdatedAt
) {
    public static PublicReviewResponse from(Review review) {
        return new PublicReviewResponse(
                review.getId(),
                review.getContent(),
                review.getCreatedAt(),
                review.getAnswerContent(),
                review.getAnsweredAt(),
                review.getAnswerUpdatedAt()
        );
    }
}
