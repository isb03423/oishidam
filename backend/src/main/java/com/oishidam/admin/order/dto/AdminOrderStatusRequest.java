package com.oishidam.admin.order.dto;

import com.oishidam.order.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminOrderStatusRequest(
        @NotNull OrderStatus orderStatus,
        @Size(max = 255) String note
) {
}
