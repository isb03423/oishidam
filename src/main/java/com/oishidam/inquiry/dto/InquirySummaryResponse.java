package com.oishidam.inquiry.dto;

import java.time.LocalDateTime;

public record InquirySummaryResponse(
        Long inquiryId,
        String title,
        String status,
        Long memberId,
        LocalDateTime createdAt
) {
}
