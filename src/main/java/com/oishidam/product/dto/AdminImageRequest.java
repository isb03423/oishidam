package com.oishidam.product.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminImageRequest(
        @NotBlank @Size(max = 500) String storageKey,
        @Size(max = 255) String altText,
        @NotNull @Min(0) Integer sortOrder,
        @NotNull Boolean isPrimary
) {
}
