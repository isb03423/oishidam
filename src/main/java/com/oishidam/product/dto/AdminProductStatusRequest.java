package com.oishidam.product.dto;

import com.oishidam.product.enums.SaleStatus;
import jakarta.validation.constraints.NotNull;

public record AdminProductStatusRequest(
        @NotNull SaleStatus saleStatus
) {
}
