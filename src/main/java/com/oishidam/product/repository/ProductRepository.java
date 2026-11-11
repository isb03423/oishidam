package com.oishidam.product.repository;

import com.oishidam.product.entity.Product;
import com.oishidam.product.enums.SaleStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByIdAndDeletedAtIsNull(Long id);

    @EntityGraph(attributePaths = "category")
    Page<Product> findByDeletedAtIsNull(Pageable pageable);

    @EntityGraph(attributePaths = "category")
    Optional<Product> findByIdAndDeletedAtIsNull(Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Product p where p.id = :id and p.deletedAt is null")
    Optional<Product> findByIdForUpdate(@Param("id") Long id);

    @EntityGraph(attributePaths = "category")
    @Query("select p from Product p where p.saleStatus = :status and p.deletedAt is null" +
            " and p.publishedAt <= :now and p.category.id in :categoryIds")
    Page<Product> search(
            @Param("status") SaleStatus status,
            @Param("now") LocalDateTime now,
            @Param("categoryIds") Collection<Long> categoryIds,
            Pageable pageable
    );

    @EntityGraph(attributePaths = "category")
    @Query("select p from Product p where p.saleStatus = :status and p.deletedAt is null" +
            " and p.publishedAt <= :now and p.category.id in :categoryIds and (lower(p.name)" +
            " like lower(concat('%', :keyword, '%')) escape '\\' or lower(p.brand)" +
            " like lower(concat('%', :keyword, '%')) escape '\\')")
    Page<Product> searchByKeyword(
            @Param("status") SaleStatus status,
            @Param("now") LocalDateTime now,
            @Param("categoryIds") Collection<Long> categoryIds,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @EntityGraph(attributePaths = "category")
    Optional<Product> findByIdAndSaleStatusAndDeletedAtIsNullAndPublishedAtLessThanEqualAndCategoryIdIn(
            Long id,
            SaleStatus status,
            LocalDateTime now,
            Collection<Long> categoryIds
    );
}
