package com.oishidam.review.dto;

import jakarta.validation.constraints.*;
import tools.jackson.databind.annotation.JsonDeserialize;

public record ReviewCreateRequest(
        @NotBlank @Size(max = 5000) String content,
        @NotNull @Min(1) @Max(5) @JsonDeserialize(using = ReviewRatingDeserializer.class) Integer rating
) {
}
