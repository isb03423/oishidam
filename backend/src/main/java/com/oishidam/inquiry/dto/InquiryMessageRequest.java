package com.oishidam.inquiry.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record InquiryMessageRequest(
        @NotBlank @Size(max = 5000) String content
) {
}
