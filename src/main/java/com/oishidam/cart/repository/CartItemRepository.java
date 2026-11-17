package com.oishidam.cart.repository;

import com.oishidam.cart.entity.CartItem;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @EntityGraph(attributePaths = {"product", "product.category"})
    List<CartItem> findAllByMemberIdOrderByIdDesc(Long memberId);

    Optional<CartItem> findByMemberIdAndProductId(Long memberId, Long productId);

    Optional<CartItem> findByIdAndMemberId(Long id, Long memberId);
}
