package com.oishidam.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record OrderQuoteRequest(
        @Size(max = 100) List<@NotNull @Positive Long> cartItemIds,
        @Positive Long addressId,
        @Valid @Size(max = 100) List<@NotNull @Valid DirectOrderItem> directItems,
        @Valid OrderRecipient recipient
) {
}
