package com.oishidam.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

import java.util.List;
import java.util.UUID;

public record OrderCreateRequest(
        @NotNull UUID requestKey,
        @Size(max = 100) List<@NotNull @Positive Long> cartItemIds,
        @Positive Long addressId,
        @Size(max = 255) String deliveryMemo,
        @Valid @Size(max = 100) List<@NotNull @Valid DirectOrderItem> directItems,
        @Valid OrderRecipient recipient,
        @Pattern(regexp = "P[0-9]{12}") String customsCode
) {
}
