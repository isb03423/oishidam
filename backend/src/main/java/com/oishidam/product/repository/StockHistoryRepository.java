package com.oishidam.product.repository;

import com.oishidam.product.entity.StockHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockHistoryRepository extends JpaRepository<StockHistory, Long> {
    Page<StockHistory> findByProductIdOrderByIdDesc(Long productId, Pageable pageable);
}
