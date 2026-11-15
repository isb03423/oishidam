package com.oishidam.order.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.dto.CancellationData;
import com.oishidam.order.dto.OrderCancelRequest;
import com.oishidam.order.dto.OrderCancelResponse;
import com.oishidam.order.entity.Order;
import com.oishidam.order.entity.OrderCancellation;
import com.oishidam.order.entity.OrderStatusHistory;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderCancellationRepository;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderRepository;
import com.oishidam.order.repository.OrderStatusHistoryRepository;
import com.oishidam.payment.entity.PaymentConfirmation;
import com.oishidam.payment.repository.PaymentConfirmationRepository;
import com.oishidam.payment.service.TossConfirmationClient;
import com.oishidam.product.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderCancellationService {
    private final MemberRepository members;

    private final OrderRepository orders;

    private final OrderItemRepository items;

    private final OrderCancellationRepository cancellations;

    private final OrderStatusHistoryRepository histories;

    private final PaymentConfirmationRepository confirmations;

    private final ProductVariantRepository variants;

    private final TossConfirmationClient toss;

    private final TransactionTemplate transactions;

    private final Clock clock;

    // 주문 취소 요청
    public OrderCancelResponse cancel(
            Long memberId,
            Long orderId,
            OrderCancelRequest request
    ) {
        String reason = request.reason() == null || request.reason().isBlank() ? "고객 요청" : request.reason().trim();

        // 취소 가능 여부 확인 및 취소 준비
        CancellationData data = transactions.execute(status -> prepare(memberId, orderId, reason));
        if (data.completed() != null) {
            return data.completed();
        }
        return process(data);
    }

    // 결제 취소 및 주문 취소 처리
    public OrderCancelResponse process(CancellationData data) {
        // 결제사 상태 확인 후 취소 처리
        String result = toss.lookup(data.paymentKey(), data.orderNumber(), data.amount());
        if ("DONE".equals(result)) {
            toss.cancel(data.paymentKey(), data.orderNumber(), data.amount(), data.reason());
        } else if (!"CANCELED".equals(result)) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_CANCEL_UNCERTAIN", "결제 취소 상태를 확인할 수 없습니다.");
        }

        // 취소 결과 반영
        return transactions.execute(status -> complete(data.memberId(), data.orderId(), data.paymentKey()));
    }

    // 주문 취소 가능 여부 확인 및 취소 준비
    private CancellationData prepare(
            Long memberId,
            Long orderId,
            String reason
    ) {
        members.findByIdForUpdate(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
        Order order = findOrder(memberId, orderId);

        // 기존 취소 요청 또는 취소 가능 상태 확인
        OrderCancellation existing = cancellations.findByOrderId(orderId).orElse(null);
        if (existing != null) {
            if (!existing.getReason().equals(reason)) {
                throw new ApiException(HttpStatus.CONFLICT, "CANCELLATION_MISMATCH", "기존 취소 요청과 사유가 다릅니다.");
            }
            if (order.getOrderStatus() == OrderStatus.CANCELLED) {
                return new CancellationData(memberId, orderId, null, null, null, reason, response(order, existing));
            }
        } else {
            if (!order.canCancel()) {
                throw new ApiException(HttpStatus.CONFLICT, "ORDER_NOT_CANCELLABLE", "취소할 수 없는 주문입니다.");
            }
            PaymentConfirmation payment = confirmations.findByOrderId(orderId)
                    .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "PAYMENT_NOT_PAID", "승인된 결제가 없습니다."));
            histories.save(
                    OrderStatusHistory.builder()
                            .order(order)
                            .previousStatus(order.getOrderStatus())
                            .newStatus(OrderStatus.CANCEL_PENDING)
                            .build()
            );
            order.markCancellationPending();
            existing = cancellations.save(
                    OrderCancellation.builder()
                            .order(order)
                            .reason(reason)
                            .build()
            );
        }
        PaymentConfirmation payment = confirmations.findByOrderId(orderId)
                .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "PAYMENT_NOT_PAID", "승인된 결제가 없습니다."));
        return new CancellationData(
                memberId,
                orderId,
                payment.getPaymentKey(),
                order.getOrderNumber(),
                order.getTotalAmount(),
                existing.getReason(),
                null
        );
    }

    // 주문 취소 완료 및 재고 복구
    private OrderCancelResponse complete(
            Long memberId,
            Long orderId,
            String paymentKey
    ) {
        members.findByIdForUpdate(memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "MEMBER_NOT_FOUND", "회원을 찾을 수 없습니다."));
        Order order = findOrder(memberId, orderId);
        OrderCancellation cancellation = cancellations.findByOrderId(orderId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "CANCELLATION_NOT_FOUND", "취소 요청을 찾을 수 없습니다."));
        PaymentConfirmation payment = confirmations.findByOrderId(orderId)
                .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "PAYMENT_NOT_FOUND", "결제를 찾을 수 없습니다."));
        if (!payment.getPaymentKey().equals(paymentKey)) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_MISMATCH", "결제 정보가 일치하지 않습니다.");
        }
        if (order.getOrderStatus() == OrderStatus.CANCEL_PENDING) {
            if (cancellation.getCancelledAt() != null) {
                throw new ApiException(HttpStatus.CONFLICT, "ORDER_NOT_CANCELLABLE", "취소할 수 없는 주문 상태입니다.");
            }

            // 재고 복구 및 취소 상태 반영
            items.findByOrderIdOrderByVariantIdAsc(orderId).forEach(item -> variants
                    .findByIdForUpdate(item.getVariantId())
                    .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "VARIANT_NOT_FOUND", "주문 상품을 찾을 수 없습니다."))
                    .restoreStock(item.getQuantity()));
            histories.save(
                    OrderStatusHistory.builder()
                            .order(order)
                            .previousStatus(order.getOrderStatus())
                            .newStatus(OrderStatus.CANCELLED)
                            .build()
            );
            order.markCancelled();
            cancellation.complete(LocalDateTime.now(clock));
        }
        return response(order, cancellation);
    }

    // 회원의 주문 조회
    private Order findOrder(Long memberId, Long orderId) {
        return orders.findByIdAndMemberId(orderId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", "주문을 찾을 수 없습니다."));
    }

    // 주문 취소 결과 응답 생성
    private OrderCancelResponse response(Order order, OrderCancellation cancellation) {
        return new OrderCancelResponse(order.getId(), order.getOrderStatus(), cancellation.getCancelledAt());
    }

}
