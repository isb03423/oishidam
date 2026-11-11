package com.oishidam.product.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record AdminProductCreateRequest(
        @Valid @NotNull AdminProductRequest product,
        @Valid @NotNull AdminVariantRequest variant
) {
}
