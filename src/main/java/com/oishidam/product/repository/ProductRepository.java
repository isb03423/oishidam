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
    boolean existsByCategoryId(Long categoryId);
    boolean existsByIdAndDeletedAtIsNull(Long id);

    @EntityGraph(attributePaths = "category")
    Page<Product> findByDeletedAtIsNull(Pageable pageable);

    @EntityGraph(attributePaths = "category")
    @Query("SELECT p FROM Product p WHERE p.deletedAt IS NULL AND " +
            "(LOWER(p.name) LIKE CONCAT('%', :keyword, '%') ESCAPE '\\' " +
            "OR LOWER(COALESCE(p.brand, '')) LIKE CONCAT('%', :keyword, '%') ESCAPE '\\')")
    Page<Product> findForAdmin(@Param("keyword") String keyword, Pageable pageable);

    @EntityGraph(attributePaths = "category")
    Optional<Product> findByIdAndDeletedAtIsNull(Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.id = :id AND p.deletedAt IS NULL")
    Optional<Product> findByIdForUpdate(@Param("id") Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findAnyByIdForUpdate(@Param("id") Long id);

    @EntityGraph(attributePaths = "category")
    @Query("SELECT p FROM Product p WHERE p.saleStatus = :status AND p.deletedAt IS NULL" +
            " AND p.publishedAt <= :now AND p.category.id IN :categoryIds")
    Page<Product> search(
            @Param("status") SaleStatus status,
            @Param("now") LocalDateTime now,
            @Param("categoryIds") Collection<Long> categoryIds,
            Pageable pageable
    );

    @EntityGraph(attributePaths = "category")
    @Query("SELECT p FROM Product p WHERE p.saleStatus = :status AND p.deletedAt IS NULL" +
            " AND p.publishedAt <= :now AND p.createdAt BETWEEN :since AND :now AND p.category.id IN :categoryIds")
    Page<Product> findNew(@Param("status") SaleStatus status, @Param("now") LocalDateTime now,
                          @Param("since") LocalDateTime since, @Param("categoryIds") Collection<Long> categoryIds,
                          Pageable pageable);

    @Query(value = """
            SELECT p FROM Product p
            JOIN FETCH p.category c
            JOIN OrderItem i ON i.productId = p.id
            JOIN i.order o
            WHERE p.saleStatus = :status AND p.deletedAt IS NULL
                AND p.publishedAt <= :now AND c.id IN :categoryIds
                AND o.orderStatus NOT IN (
                    com.oishidam.order.enums.OrderStatus.PAYMENT_PENDING,
                    com.oishidam.order.enums.OrderStatus.PAYMENT_CONFIRMING,
                    com.oishidam.order.enums.OrderStatus.PAYMENT_FAILED,
                    com.oishidam.order.enums.OrderStatus.CANCELLED
                )
            GROUP BY p, c
            ORDER BY SUM(i.quantity) DESC, p.publishedAt DESC, p.id DESC
            """,
            countQuery = """
                    SELECT COUNT(DISTINCT p.id) FROM Product p
                    JOIN OrderItem i ON i.productId = p.id
                    JOIN i.order o
                    WHERE p.saleStatus = :status AND p.deletedAt IS NULL
                        AND p.publishedAt <= :now AND p.category.id IN :categoryIds
                        AND o.orderStatus NOT IN (
                            com.oishidam.order.enums.OrderStatus.PAYMENT_PENDING,
                            com.oishidam.order.enums.OrderStatus.PAYMENT_CONFIRMING,
                            com.oishidam.order.enums.OrderStatus.PAYMENT_FAILED,
                            com.oishidam.order.enums.OrderStatus.CANCELLED
                        )
                    """)
    Page<Product> findPopular(
            @Param("status") SaleStatus status,
            @Param("now") LocalDateTime now,
            @Param("categoryIds") Collection<Long> categoryIds,
            Pageable pageable
    );

    @EntityGraph(attributePaths = "category")
    @Query("SELECT p FROM Product p WHERE p.saleStatus = :status AND p.deletedAt IS NULL" +
            " AND p.publishedAt <= :now AND p.category.id IN :categoryIds AND (LOWER(p.name)" +
            " LIKE LOWER(CONCAT('%', :keyword, '%')) ESCAPE '\\' OR LOWER(p.brand)" +
            " LIKE LOWER(CONCAT('%', :keyword, '%')) ESCAPE '\\')")
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
