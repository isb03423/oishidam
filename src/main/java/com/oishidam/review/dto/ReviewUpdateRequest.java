package com.oishidam.review.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ReviewUpdateRequest(
        @NotBlank @Size(max = 5000) String content,
        @Size(max = 5) List<String> retainedImageUrls
) {
}
