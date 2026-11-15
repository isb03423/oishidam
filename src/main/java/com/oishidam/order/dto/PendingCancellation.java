package com.oishidam.order.dto;

public record PendingCancellation(
        Long id,
        Long orderId,
        CancellationData data
) {
}
