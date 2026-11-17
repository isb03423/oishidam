package com.oishidam.admin.product.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record StockUpdateRequest(
        @NotNull @Min(0) Integer stockQuantity,
        @NotNull @Min(0) Integer expectedStockQuantity
) {
}
