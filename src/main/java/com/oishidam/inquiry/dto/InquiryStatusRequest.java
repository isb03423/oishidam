package com.oishidam.inquiry.dto;

import jakarta.validation.constraints.NotNull;

public record InquiryStatusRequest(
        @NotNull String status
) {
}
