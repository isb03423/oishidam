package com.oishidam.review.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ReviewContentRequest(
        @NotBlank @Size(max = 5000) String content
) {
}
