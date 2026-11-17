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
import com.oishidam.product.enums.SaleStatus;
import com.oishidam.product.repository.ProductRepository;
import com.oishidam.product.repository.ProductImageRepository;
import com.oishidam.product.entity.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;

    private final MemberRepository memberRepository;

    private final ProductRepository productRepository;

    private final CategoryService categoryService;

    private final Clock clock;

    private final ProductImageRepository images;

    // 장바구니 목록
    @Transactional(readOnly = true)
    public List<CartItemResponse> list(Long memberId) {
        memberRepository.findById(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
        List<Long> categoryIds = categoryService.categoryIds(null);
        LocalDateTime now = LocalDateTime.now(clock);
        List<CartItem> items = cartItemRepository.findAllByMemberIdOrderByIdDesc(memberId);
        Map<Long, String> primaryImages = items.isEmpty() ? Map.of() : images
                .findByProductIdInOrderBySortOrderAscIdAsc(items.stream().map(item -> item.getProduct().getId()).toList())
                .stream().filter(ProductImage::isPrimary)
                .collect(Collectors.toMap(image -> image.getProduct().getId(), ProductImage::getStorageKey, (first, second) -> first));
        return items.stream()
                .map(item -> CartItemResponse.from(
                        item,
                        available(item.getProduct(), item.getQuantity(), categoryIds, now),
                        primaryImages.get(item.getProduct().getId())
                ))
                .toList();
    }

    // 장바구니 상품 추가
    @Transactional
    public CartItemResponse add(Long memberId, CartItemRequest request) {
        Member member = lockMember(memberId);

        // 1. 상품 조회
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다."));

        // 2. 기존 수량을 포함해 구매 가능 여부 확인
        CartItem item = cartItemRepository.findByMemberIdAndProductId(memberId, request.productId()).orElse(null);
        long quantity = (long) request.quantity() + (item == null ? 0 : item.getQuantity());
        validate(product, quantity);

        // 3. 장바구니에 새로 추가하거나 수량 변경
        if (item == null) {
            item = cartItemRepository.save(
                    CartItem.builder()
                            .member(member)
                            .product(product)
                            .quantity((int) quantity)
                            .build()
            );
        } else {
            item.updateQuantity((int) quantity);
        }
        return response(item);
    }

    // 장바구니 수량 변경
    @Transactional
    public CartItemResponse update(
            Long memberId,
            Long itemId,
            int quantity
    ) {
        lockMember(memberId);
        CartItem item = findItem(memberId, itemId);
        validate(item.getProduct(), quantity);
        item.updateQuantity(quantity);
        return response(item);
    }

    // 변경한 장바구니 항목에 대표 이미지를 포함한다.
    private CartItemResponse response(CartItem item) {
        String image = images.findByProductIdAndIsPrimaryTrue(item.getProduct().getId())
                .map(ProductImage::getStorageKey).orElse(null);
        return CartItemResponse.from(item, true, image);
    }

    // 장바구니 상품 삭제
    @Transactional
    public void delete(Long memberId, Long itemId) {
        lockMember(memberId);
        cartItemRepository.delete(findItem(memberId, itemId));
    }

    // 상품 구매 가능 여부 검증
    private void validate(Product product, long quantity) {
        if (!available(product, quantity, categoryService.categoryIds(null), LocalDateTime.now(clock))) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "CART_ITEM_UNAVAILABLE", "구매할 수 없거나 재고가 부족한 상품입니다.");
        }
    }

    // 상품 판매 상태와 재고 확인
    private boolean available(
            Product product,
            long quantity,
            List<Long> categoryIds,
            LocalDateTime now
    ) {
        return product.getSaleStatus() == SaleStatus.ON_SALE && product.getDeletedAt() == null
                && product.getPublishedAt() != null && !product.getPublishedAt().isAfter(now)
                && categoryIds.contains(product.getCategory().getId()) && quantity <= product.getStockQuantity();
    }

    // 활성 회원 조회 및 잠금
    private Member lockMember(Long memberId) {
        return memberRepository.findByIdForUpdate(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
    }

    // 회원의 장바구니 항목 조회
    private CartItem findItem(Long memberId, Long itemId) {
        return cartItemRepository.findByIdAndMemberId(itemId, memberId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND,
                        "CART_ITEM_NOT_FOUND",
                        "장바구니 항목을 찾을 수 없습니다."
                ));
    }

    // 사용할 수 없는 회원 오류 생성
    private ApiException invalidMember() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다.");
    }
}
