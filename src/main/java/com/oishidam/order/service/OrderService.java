package com.oishidam.order.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.dto.OrderCreateRequest;
import com.oishidam.order.dto.OrderCreateResponse;
import com.oishidam.order.dto.OrderQuoteRequest;
import com.oishidam.order.dto.OrderQuoteResponse;
import com.oishidam.order.entity.Order;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.entity.OrderStatusHistory;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderRepository;
import com.oishidam.order.repository.OrderStatusHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final MemberRepository members;

    private final OrderRepository orders;

    private final OrderItemRepository items;

    private final OrderQuoteService quotes;

    private final OrderStatusHistoryRepository histories;

    /**
     * 주문 생성
     * 동일 회원의 같은 요청 키와 주문 내용은 기존 주문을 반환하며, 내용이 다르면 충돌 오류를 반환한다.
     */
    @Transactional
    public OrderCreateResponse create(Long memberId, OrderCreateRequest request) {
        Member member = members.findByIdForUpdate(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
        String hash = requestHash(request);

        // 1. 중복 요청 확인
        Order existing = orders.findByMemberIdAndRequestKey(memberId, request.requestKey().toString()).orElse(null);
        if (existing != null) {
            if (!existing.getRequestHash().equals(hash)) {
                throw new ApiException(HttpStatus.CONFLICT, "ORDER_REQUEST_CONFLICT", "이미 사용한 주문 요청 키입니다.");
            }
            return OrderCreateResponse.from(existing);
        }

        // 2. 주문 금액과 배송지 확인
        OrderQuoteResponse quote = quotes.quote(
                memberId,
                new OrderQuoteRequest(
                        request.cartItemIds(),
                        request.addressId()
                )
        );
        Order order = orders.save(
                Order.fromQuote(member, request.requestKey(), hash, request.deliveryMemo(), quote)
        );

        // 3. 초기 주문 상태와 상품 내역 저장
        histories.save(
                OrderStatusHistory.builder()
                        .order(order)
                        .previousStatus(null)
                        .newStatus(OrderStatus.PAYMENT_PENDING)
                        .build()
        );
        items.saveAll(
                quote.items().stream().map(item -> OrderItem.fromQuote(order, item)).toList()
        );
        return OrderCreateResponse.from(order);
    }

    // 중복 주문 요청 확인을 위한 해시 생성
    private String requestHash(OrderCreateRequest request) {
        String memo = request.deliveryMemo() == null ? "N" : "S" + request.deliveryMemo();
        String value = request.addressId() + ":" + request.cartItemIds().stream().sorted().toList() + ":" + memo;
        try {
            return HexFormat.of().formatHex(
                    MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8))
            );
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}
