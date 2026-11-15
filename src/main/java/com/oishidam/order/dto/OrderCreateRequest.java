package com.oishidam.order.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record OrderCreateRequest(
        @NotNull UUID requestKey,
        @NotEmpty @Size(max = 100) List<@NotNull @Positive Long> cartItemIds,
        @NotNull @Positive Long addressId,
        @Size(max = 255) String deliveryMemo
) {
}
