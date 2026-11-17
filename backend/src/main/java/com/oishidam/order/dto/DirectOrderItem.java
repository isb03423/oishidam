package com.oishidam.order.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DirectOrderItem(
        @NotNull @Positive Long productId,
        @Positive int quantity
) {
}
