package com.oishidam.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemRequest(
        @NotNull Long variantId,
        @NotNull @Min(1) Integer quantity
) {
}
