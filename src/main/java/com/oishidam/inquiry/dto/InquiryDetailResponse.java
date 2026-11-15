package com.oishidam.inquiry.dto;

import java.time.LocalDateTime;
import java.util.List;

public record InquiryDetailResponse(
        Long inquiryId,
        String title,
        String status,
        Long memberId,
        Long orderId,
        LocalDateTime createdAt,
        List<InquiryMessageResponse> messages
) {
}
