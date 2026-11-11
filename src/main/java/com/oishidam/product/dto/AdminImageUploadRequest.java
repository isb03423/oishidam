package com.oishidam.product.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminImageUploadRequest(
        @Size(max = 255) String altText,
        @NotNull @Min(0) Integer sortOrder,
        @NotNull Boolean isPrimary
) {
}
