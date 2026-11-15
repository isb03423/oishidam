package com.oishidam.inquiry.dto;

import java.time.LocalDateTime;

public record InquiryMessageResponse(
        Long messageId,
        Long inquiryId,
        Long senderMemberId,
        String content,
        LocalDateTime createdAt
) {
}
