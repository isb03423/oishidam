package com.oishidam.admin.product.dto;

import com.oishidam.product.entity.StockHistory;

import java.time.LocalDateTime;

public record StockHistoryResponse(
        Long stockHistoryId,
        Long productId,
        Long orderId,
        Long actorId,
        String actorName,
        String reason,
        int previousQuantity,
        int newQuantity,
        LocalDateTime createdAt
) {
    public static StockHistoryResponse from(StockHistory history, String actorName) {
        return new StockHistoryResponse(
                history.getId(),
                history.getProductId(),
                history.getOrderId(),
                history.getActorId(),
                actorName,
                history.getReason(),
                history.getPreviousQuantity(),
                history.getNewQuantity(),
                history.getCreatedAt()
        );
    }
}
