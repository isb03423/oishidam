package com.oishidam.product.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.Map;

public record AdminVariantRequest(
        @NotBlank @Size(max = 80) String skuCode,
        @NotBlank @Size(max = 200) String variantName,
        @NotNull Map<String, Object> optionValues,
        @NotNull @DecimalMin("0") @Digits(integer = 14, fraction = 0) BigDecimal price,
        @NotNull @Min(0) Integer stockQuantity,
        @NotNull Boolean isActive
) {
}
