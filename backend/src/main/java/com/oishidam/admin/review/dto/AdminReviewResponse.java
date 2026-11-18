package com.oishidam.admin.review.dto;

import com.oishidam.review.entity.Review;
import java.time.LocalDateTime;
import java.util.List;

public record AdminReviewResponse(
        Long reviewId,
        Long orderItemId,
        Long productId,
        String productName,
        Long memberId,
        String memberName,
        String content,
        List<String> imageUrls,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String answerContent,
        Long answeredBy,
        LocalDateTime answeredAt,
        LocalDateTime answerUpdatedAt,
        String sentiment
) {
    public static AdminReviewResponse from(Review review, Long productId, String sentiment) {
        return new AdminReviewResponse(
                review.getId(),
                review.getOrderItem().getId(),
                productId,
                review.getOrderItem().getProductName(),
                review.getMember().getId(),
                review.getMember().getName(),
                review.getContent(),
                List.copyOf(review.getImageUrls()),
                review.getCreatedAt(),
                review.getUpdatedAt(),
                review.getAnswerContent(),
                review.getAnsweredBy() == null ? null : review.getAnsweredBy().getId(),
                review.getAnsweredAt(),
                review.getAnswerUpdatedAt(),
                sentiment
        );
    }
}
