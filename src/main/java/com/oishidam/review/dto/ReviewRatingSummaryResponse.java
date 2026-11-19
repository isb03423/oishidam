package com.oishidam.review.dto;

public record ReviewRatingSummaryResponse(
        long reviewCount,
        long ratingCount,
        Double averageRating
) {
}
