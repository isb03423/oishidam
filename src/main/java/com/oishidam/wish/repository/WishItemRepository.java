package com.oishidam.wish.repository;

import com.oishidam.wish.entity.WishItem;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishItemRepository extends JpaRepository<WishItem, Long> {
    @EntityGraph(attributePaths = {"product", "product.category"})
    List<WishItem> findByMemberIdAndProductDeletedAtIsNullOrderByIdDesc(Long memberId);

    Optional<WishItem> findByMemberIdAndProductId(Long memberId, Long productId);
}
