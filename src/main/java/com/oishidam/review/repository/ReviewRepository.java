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

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @EntityGraph(attributePaths = {"orderItem", "orderItem.order"})
    @Query("""
            SELECT r FROM Review r WHERE r.member.id = :memberId AND r.orderItem.order.member.id = :memberId
            AND r.deletedAt IS NULL ORDER BY r.createdAt DESC, r.id DESC
            """)
    Page<Review> findWrittenByMemberId(@Param("memberId") Long memberId, Pageable pageable);

    @Query("SELECT DISTINCT r FROM Review r LEFT JOIN FETCH r.imageUrls WHERE r.id IN :ids")
    List<Review> findWithImagesByIdIn(@Param("ids") Collection<Long> ids);

    Optional<Review> findByOrderItemId(Long orderItemId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Review> findByIdAndMemberIdAndDeletedAtIsNull(Long id, Long memberId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Review> findByIdAndDeletedAtIsNull(Long id);

    @EntityGraph(attributePaths = {"orderItem"})
    @Query("SELECT r FROM Review r WHERE r.deletedAt IS NULL AND r.orderItem.productId = :productId")
    Page<Review> findPublicByProductId(@Param("productId") Long productId, Pageable pageable);

    @EntityGraph(attributePaths = {"orderItem", "member", "answeredBy"})
    @Query("SELECT r FROM Review r WHERE r.deletedAt IS NULL " +
            "AND (:productId IS NULL OR r.orderItem.productId = :productId) " +
            "AND LOWER(r.orderItem.productName) LIKE LOWER(CONCAT('%', :productName, '%')) ESCAPE '\\' " +
            "AND (:answered IS NULL OR (:answered = TRUE AND r.answerContent IS NOT NULL) OR (:answered = FALSE AND r.answerContent IS NULL)) " +
            "AND LOWER(r.content) LIKE LOWER(CONCAT('%', :keyword, '%')) ESCAPE '\\'")
    Page<Review> findForAdmin(
            @Param("productId") Long productId,
            @Param("productName") String productName,
            @Param("keyword") String keyword,
            @Param("answered") Boolean answered,
            Pageable pageable
    );
}
