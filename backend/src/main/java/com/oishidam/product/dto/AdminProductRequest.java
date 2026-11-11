package com.oishidam.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminProductRequest(
        @NotNull Long categoryId,
        @NotBlank @Size(max = 200) String name,
        @NotBlank String description,
        @Size(max = 100) String brand
) {
}
