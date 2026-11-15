package com.oishidam.review.dto;

import java.time.LocalDateTime;

public record ReviewEligibilityResponse(
        boolean eligible,
        LocalDateTime writeDeadline,
        LocalDateTime editableUntil,
        ReviewResponse review
) {
}
