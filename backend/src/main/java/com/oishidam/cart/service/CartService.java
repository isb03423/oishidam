package com.oishidam.cart.service;

import com.oishidam.cart.dto.CartItemRequest;
import com.oishidam.cart.dto.CartItemResponse;
import com.oishidam.cart.entity.CartItem;
import com.oishidam.cart.repository.CartItemRepository;
import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.ProductVariant;
import com.oishidam.product.enums.SaleStatus;
import com.oishidam.product.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final MemberRepository memberRepository;
    private final ProductVariantRepository variantRepository;
    private final CategoryService categoryService;
    private final Clock clock;

    @Transactional(readOnly = true)
    public List<CartItemResponse> list(Long memberId) {
        memberRepository.findById(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
        List<Long> categoryIds = categoryService.categoryIds(null);
        LocalDateTime now = LocalDateTime.now(clock);
        return cartItemRepository.findAllByMemberIdOrderByIdDesc(memberId).stream()
                .map(item -> CartItemResponse.from(item, available(item.getVariant(), item.getQuantity(), categoryIds,
                        now)))
                .toList();
    }

    @Transactional
    public CartItemResponse add(Long memberId, CartItemRequest request) {
        Member member = lockMember(memberId);
        ProductVariant variant = variantRepository.findById(request.variantId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "VARIANT_NOT_FOUND", "상품 옵션을 찾을 수 없습니다."));
        CartItem item = cartItemRepository.findByMemberIdAndVariantId(memberId, request.variantId()).orElse(null);
        long quantity = (long) request.quantity() + (item == null ? 0 : item.getQuantity());
        validate(variant, quantity);
        if (item == null) {
            item = cartItemRepository.save(new CartItem(member, variant, (int) quantity));
        } else {
            item.updateQuantity((int) quantity);
        }
        return CartItemResponse.from(item, true);
    }

    @Transactional
    public CartItemResponse update(Long memberId, Long itemId, int quantity) {
        lockMember(memberId);
        CartItem item = findItem(memberId, itemId);
        validate(item.getVariant(), quantity);
        item.updateQuantity(quantity);
        return CartItemResponse.from(item, true);
    }

    @Transactional
    public void delete(Long memberId, Long itemId) {
        lockMember(memberId);
        cartItemRepository.delete(findItem(memberId, itemId));
    }

    private void validate(ProductVariant variant, long quantity) {
        if (!available(variant, quantity, categoryService.categoryIds(null), LocalDateTime.now(clock))) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "CART_ITEM_UNAVAILABLE", "구매할 수 없거나 재고가 부족한 상품입니다.");
        }
    }

    private boolean available(ProductVariant variant, long quantity, List<Long> categoryIds, LocalDateTime now) {
        Product product = variant.getProduct();
        return variant.isActive() && product.getSaleStatus() == SaleStatus.ON_SALE && product.getDeletedAt() == null
                && product.getPublishedAt() != null && !product.getPublishedAt().isAfter(now)
                && categoryIds.contains(product.getCategory().getId()) && quantity <= variant.getStockQuantity();
    }

    private Member lockMember(Long memberId) {
        return memberRepository.findByIdForUpdate(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
    }

    private CartItem findItem(Long memberId, Long itemId) {
        return cartItemRepository.findByIdAndMemberId(itemId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "CART_ITEM_NOT_FOUND",
                        "장바구니 항목을 찾을 수 없습니다."));
    }

    private ApiException invalidMember() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다.");
    }
}
