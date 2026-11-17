package com.oishidam.review.dto;

import com.oishidam.review.entity.Review;
import java.time.LocalDateTime;
import java.util.List;

public record PublicReviewResponse(
        Long reviewId,
        String content,
        List<String> imageUrls,
        LocalDateTime createdAt,
        String answerContent,
        LocalDateTime answeredAt,
        LocalDateTime answerUpdatedAt
) {
    public static PublicReviewResponse from(Review review) {
        return new PublicReviewResponse(
                review.getId(),
                review.getContent(),
                List.copyOf(review.getImageUrls()),
                review.getCreatedAt(),
                review.getAnswerContent(),
                review.getAnsweredAt(),
                review.getAnswerUpdatedAt()
        );
    }
}
