package com.oishidam.review.repository;

import com.oishidam.review.entity.Review;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByOrderItemId(Long orderItemId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Review> findByIdAndMemberIdAndDeletedAtIsNull(Long id, Long memberId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Review> findByIdAndDeletedAtIsNull(Long id);

    @EntityGraph(attributePaths = {"orderItem"})
    @Query("SELECT r FROM Review r WHERE r.deletedAt IS NULL AND r.orderItem.variantId IN " +
            "(SELECT v.id FROM ProductVariant v WHERE v.product.id = :productId)")
    Page<Review> findPublicByProductId(@Param("productId") Long productId, Pageable pageable);

    @EntityGraph(attributePaths = {"orderItem", "member", "answeredBy"})
    @Query("SELECT r FROM Review r WHERE r.deletedAt IS NULL " +
            "AND (:productId IS NULL OR r.orderItem.variantId IN " +
            "(SELECT v.id FROM ProductVariant v WHERE v.product.id = :productId)) " +
            "AND LOWER(r.content) LIKE LOWER(CONCAT('%', :keyword, '%')) ESCAPE '\\'")
    Page<Review> findForAdmin(
            @Param("productId") Long productId,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
