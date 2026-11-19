package com.oishidam.review.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import tools.jackson.databind.annotation.JsonDeserialize;

import java.util.List;

public record ReviewUpdateRequest(
        @NotBlank @Size(max = 5000) String content,
        @Min(1) @Max(5) @JsonDeserialize(using = ReviewRatingDeserializer.class) Integer rating,
        @Size(max = 5) List<String> retainedImageUrls
) {
}
