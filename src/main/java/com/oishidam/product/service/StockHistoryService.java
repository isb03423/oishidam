package com.oishidam.product.service;

import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.StockHistory;
import com.oishidam.product.repository.StockHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StockHistoryService {
    private final StockHistoryRepository histories;
    private final Clock clock;

    // 재고 변경과 같은 트랜잭션에 이력을 저장한다.
    @Transactional(propagation = Propagation.MANDATORY)
    public void record(Product product, int previous, String reason, Long orderId, Long actorId) {
        histories.save(StockHistory.builder()
                .productId(product.getId())
                .orderId(orderId)
                .actorId(actorId)
                .reason(reason)
                .previousQuantity(previous)
                .newQuantity(product.getStockQuantity())
                .createdAt(LocalDateTime.now(clock))
                .build());
    }
}
