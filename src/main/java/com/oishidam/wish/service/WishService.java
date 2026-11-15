package com.oishidam.wish.service;

import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.ProductImage;
import com.oishidam.product.entity.ProductVariant;
import com.oishidam.product.enums.SaleStatus;
import com.oishidam.product.repository.ProductImageRepository;
import com.oishidam.product.repository.ProductRepository;
import com.oishidam.product.repository.ProductVariantRepository;
import com.oishidam.wish.dto.WishResponse;
import com.oishidam.wish.entity.WishItem;
import com.oishidam.wish.repository.WishItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishService {
    private final WishItemRepository wishes;

    private final MemberRepository members;

    private final ProductRepository products;

    private final ProductVariantRepository variants;

    private final ProductImageRepository images;

    private final CategoryService categories;

    private final Clock clock;

    // 찜 목록과 상품별 구매 가능 상태 조회
    @Transactional(readOnly = true)
    public List<WishResponse> list(Long memberId) {
        activeMember(memberId, false);
        List<Long> categoryIds = categories.categoryIds(null);
        LocalDateTime now = LocalDateTime.now(clock);
        return wishes.findByMemberIdAndProductDeletedAtIsNullOrderByIdDesc(memberId).stream().map(item -> {
            Product product = item.getProduct();
            List<ProductVariant> active = variants
                    .findByProductIdInAndIsActiveTrueOrderByIdAsc(List.of(product.getId()));
            boolean soldOut = active.stream().noneMatch(variant -> variant.getStockQuantity() > 0);
            boolean available = product.getSaleStatus() == SaleStatus.ON_SALE && product.getPublishedAt() != null
                    && !product.getPublishedAt().isAfter(now) && categoryIds.contains(product.getCategory().getId())
                    && !soldOut;
            String image = images.findByProductIdAndIsPrimaryTrue(product.getId()).map(ProductImage::getStorageKey)
                    .orElse(null);
            return new WishResponse(
                    product.getId(),
                    product.getName(),
                    active.stream().map(ProductVariant::getPrice).min(java.math.BigDecimal::compareTo).orElse(null),
                    image,
                    product.getSaleStatus().name(),
                    soldOut,
                    available,
                    active.stream().map(variant -> new WishResponse.Variant(
                            variant.getId(),
                            variant.getVariantName(),
                            variant.getPrice(),
                            variant.getStockQuantity()
                    )).toList()
            );
        }).toList();
    }

    /**
     * 상품 추가
     * 이미 찜한 상품을 다시 추가해도 중복 저장하지 않는다.
     */
    @Transactional
    public void add(Long memberId, Long productId) {
        Member member = activeMember(memberId, true);
        Product product = products.findByIdForUpdate(productId).orElseThrow(() ->
                new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다."));
        if (wishes.findByMemberIdAndProductId(memberId, productId).isEmpty()) {
            wishes.save(
                    WishItem.builder()
                            .member(member)
                            .product(product)
                            .build()
            );
        }
    }

    // 찜 상품 삭제
    @Transactional
    public void remove(Long memberId, Long productId) {
        activeMember(memberId, true);
        wishes.findByMemberIdAndProductId(memberId, productId).ifPresent(wishes::delete);
    }

    // 활성 회원 조회 및 필요 시 잠금
    private Member activeMember(Long id, boolean lock) {
        return (lock ? members.findByIdForUpdate(id) : members.findById(id)).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }
}
