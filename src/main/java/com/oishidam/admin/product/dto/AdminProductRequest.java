package com.oishidam.admin.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import java.math.BigDecimal;

public record AdminProductRequest(
        @NotNull Long categoryId,
        @NotBlank @Size(max = 200) String name,
        @NotBlank String description,
        @NotNull @DecimalMin("0") @Digits(integer = 14, fraction = 0) BigDecimal price,
        @NotNull @Min(0) Integer stockQuantity,
        @Min(0) Integer expectedStockQuantity
) {
}
