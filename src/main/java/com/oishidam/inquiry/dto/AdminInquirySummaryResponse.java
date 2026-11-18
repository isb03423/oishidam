package com.oishidam.inquiry.dto;

import java.time.LocalDateTime;

public record AdminInquirySummaryResponse(
        Long inquiryId,
        String title,
        String status,
        Long memberId,
        String memberName,
        LocalDateTime createdAt,
        String content
) {
}
