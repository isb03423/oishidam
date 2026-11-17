package com.oishidam.order.service;

import com.oishidam.cart.dto.CartItemResponse;
import com.oishidam.cart.service.CartService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.dto.AddressResponse;
import com.oishidam.member.repository.AddressRepository;
import com.oishidam.order.dto.OrderQuoteRequest;
import com.oishidam.order.dto.OrderQuoteResponse;
import com.oishidam.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderQuoteService {
    private static final BigDecimal SHIPPING_FEE = BigDecimal.valueOf(3000);

    private final CartService cartService;

    private final AddressRepository addressRepository;

    private final ProductService productService;

    /**
     * 주문 금액 및 배송지 확인
     * 선택한 장바구니 항목은 중복될 수 없으며, 배송지와 항목은 해당 회원의 것이어야 한다.
     */
    @Transactional(readOnly = true)
    public OrderQuoteResponse quote(Long memberId, OrderQuoteRequest request) {
        boolean fromCart = request.cartItemIds() != null && !request.cartItemIds().isEmpty();
        boolean direct = request.directItems() != null && !request.directItems().isEmpty();
        if (fromCart == direct || (request.addressId() == null) == (request.recipient() == null)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_ORDER", "주문 상품과 배송지를 확인해 주세요.");
        }
        if (fromCart && new HashSet<>(request.cartItemIds()).size() != request.cartItemIds().size()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "DUPLICATE_CART_ITEM", "중복된 장바구니 항목입니다.");
        }
        if (direct && request.directItems().stream().map(item -> item.productId()).distinct().count() != request.directItems().size()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "DUPLICATE_PRODUCT", "중복된 상품입니다.");
        }

        // 1. 장바구니와 배송지 조회
        Map<Long, CartItemResponse> cart = cartService.list(memberId).stream()
                .collect(Collectors.toMap(CartItemResponse::cartItemId, Function.identity()));
        AddressResponse recipient = request.recipient() != null
                ? new AddressResponse(null, null, request.recipient().recipientName(), request.recipient().recipientPhone(), request.recipient().postalCode(), request.recipient().addressLine1(), request.recipient().addressLine2(), false, null)
                : addressRepository.findByIdAndMemberId(request.addressId(), memberId)
                .map(AddressResponse::from)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ADDRESS_NOT_FOUND", "배송지를 찾을 수 없습니다."));

        // 2. 선택한 상품의 구매 가능 여부와 금액 확인
        List<OrderQuoteResponse.Item> items = fromCart ? request.cartItemIds().stream().map(id -> {
            CartItemResponse item = cart.get(id);
            if (item == null) {
                throw new ApiException(HttpStatus.NOT_FOUND, "CART_ITEM_NOT_FOUND", "장바구니 항목을 찾을 수 없습니다.");
            }
            if (!item.available()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "CART_ITEM_UNAVAILABLE", "구매할 수 없거나 재고가 부족한 상품입니다.");
            }
            BigDecimal lineAmount = item.price().multiply(BigDecimal.valueOf(item.quantity()));
            return new OrderQuoteResponse.Item(
                    item.cartItemId(),
                    item.productId(),
                    item.productName(),
                    item.quantity(),
                    item.price(),
                    lineAmount
            );
        }).toList() : request.directItems().stream().map(item -> {
            var product = productService.detail(item.productId());
            if (item.quantity() > product.stockQuantity()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "CART_ITEM_UNAVAILABLE", "구매할 수 없거나 재고가 부족한 상품입니다.");
            }
            return new OrderQuoteResponse.Item(null, product.productId(), product.name(), item.quantity(), product.price(), product.price().multiply(BigDecimal.valueOf(item.quantity())));
        }).toList();

        // 3. 상품 합계와 배송비 계산
        BigDecimal itemsAmount = items.stream().map(OrderQuoteResponse.Item::lineAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new OrderQuoteResponse(items, itemsAmount, SHIPPING_FEE, itemsAmount.add(SHIPPING_FEE), recipient);
    }
}
