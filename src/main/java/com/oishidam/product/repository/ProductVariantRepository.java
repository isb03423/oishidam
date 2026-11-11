package com.oishidam.product.repository;

import com.oishidam.product.entity.ProductVariant;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    List<ProductVariant> findByProductIdInAndIsActiveTrueOrderByIdAsc(Collection<Long> productIds);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<ProductVariant> findByIdAndProductId(Long id, Long productId);

    long countByProductIdAndIsActiveTrue(Long productId);

    List<ProductVariant> findByProductIdOrderByIdAsc(Long productId);
}
