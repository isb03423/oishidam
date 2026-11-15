package com.oishidam.admin.review.dto;

import com.oishidam.review.entity.Review;
import java.time.LocalDateTime;

public record AdminReviewResponse(
        Long reviewId,
        Long orderItemId,
        Long productId,
        Long memberId,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String answerContent,
        Long answeredBy,
        LocalDateTime answeredAt,
        LocalDateTime answerUpdatedAt
) {
    public static AdminReviewResponse from(Review review, Long productId) {
        return new AdminReviewResponse(
                review.getId(),
                review.getOrderItem().getId(),
                productId,
                review.getMember().getId(),
                review.getContent(),
                review.getCreatedAt(),
                review.getUpdatedAt(),
                review.getAnswerContent(),
                review.getAnsweredBy() == null ? null : review.getAnsweredBy().getId(),
                review.getAnsweredAt(),
                review.getAnswerUpdatedAt()
        );
    }
}
