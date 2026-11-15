package com.oishidam.payment.service;

import com.oishidam.cart.repository.CartItemRepository;
import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.entity.Order;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.entity.OrderStatusHistory;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderRepository;
import com.oishidam.order.repository.OrderStatusHistoryRepository;
import com.oishidam.payment.dto.PaymentConfirmRequest;
import com.oishidam.payment.dto.PaymentConfirmResponse;
import com.oishidam.payment.entity.PaymentConfirmation;
import com.oishidam.payment.repository.PaymentConfirmationRepository;
import com.oishidam.payment.repository.PaymentRequestRepository;
import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.ProductVariant;
import com.oishidam.product.enums.SaleStatus;
import com.oishidam.product.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentConfirmationService {
    private final MemberRepository members;

    private final OrderRepository orders;

    private final OrderItemRepository items;

    private final ProductVariantRepository variants;

    private final CategoryService categories;

    private final CartItemRepository cart;

    private final PaymentRequestRepository requests;

    private final PaymentConfirmationRepository confirmations;

    private final TossConfirmationClient toss;

    private final TransactionTemplate transactions;

    private final Clock clock;

    private final OrderStatusHistoryRepository histories;

    // 결제 승인
    public PaymentConfirmResponse confirm(
            Long memberId,
            Long orderId,
            PaymentConfirmRequest request
    ) {
        // 1. 기존 승인 결과와 요청 정보 확인
        PaymentConfirmResponse previous = transactions.execute(status -> preflight(memberId, orderId, request));
        if (previous != null) {
            return previous;
        }

        // 2. 결제사 상태 조회
        String providerStatus = toss.lookup(request.paymentKey(), request.orderNumber(), request.amount());
        if ("ABORTED".equals(providerStatus) || "EXPIRED".equals(providerStatus)) {
            PaymentConfirmResponse recovered = transactions.execute(status -> fail(
                    memberId,
                    orderId,
                    request.paymentKey()
            ));
            if (recovered != null) {
                return recovered;
            }
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_FAILED", "결제가 실패했거나 만료되었습니다. 새 주문을 생성해 주세요.");
        }
        if (!"IN_PROGRESS".equals(providerStatus) && !"DONE".equals(providerStatus)) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_STATUS_UNSUPPORTED", "지원하지 않는 결제 상태입니다.");
        }

        // 3. 재고 차감과 승인 준비
        PaymentConfirmResponse existing = transactions.execute(status -> prepare(memberId, orderId, request));
        if (existing.orderStatus() != OrderStatus.PAYMENT_CONFIRMING) {
            return existing;
        }
        if ("IN_PROGRESS".equals(providerStatus)) {
            toss.confirm(request.paymentKey(), request.orderNumber(), existing.totalAmount());
        }

        // 4. 결제 완료 반영
        return transactions.execute(status -> complete(memberId, orderId, request.paymentKey()));
    }

    // 결제 요청 정보와 기존 승인 내역 확인
    private PaymentConfirmResponse preflight(
            Long memberId,
            Long orderId,
            PaymentConfirmRequest request
    ) {
        lockMember(memberId);
        Order order = findOrder(memberId, orderId);
        var paymentRequest = requests.findByOrderId(orderId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PAYMENT_REQUEST_NOT_FOUND", "결제 시작 요청을 찾을 수 없습니다."));
        if (!paymentRequest.getRequestKey().equals(request.paymentRequestKey().toString())
                || !order.getOrderNumber().equals(request.orderNumber())
                || order.getTotalAmount().compareTo(request.amount()) != 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "PAYMENT_MISMATCH", "결제 요청 정보가 주문과 일치하지 않습니다.");
        }
        PaymentConfirmation confirmation = confirmations.findByOrderId(orderId).orElse(null);
        if (confirmation != null && !confirmation.getPaymentKey().equals(request.paymentKey())) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_KEY_MISMATCH", "기존 결제 요청과 일치하지 않습니다.");
        }
        return confirmation != null &&
                order.getOrderStatus() != OrderStatus.PAYMENT_CONFIRMING ? response(order, confirmation) : null;
    }

    // 결제 승인 준비 및 재고 차감
    private PaymentConfirmResponse prepare(
            Long memberId,
            Long orderId,
            PaymentConfirmRequest request
    ) {
        lockMember(memberId);
        Order order = findOrder(memberId, orderId);
        var paymentRequest = requests.findByOrderId(orderId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PAYMENT_REQUEST_NOT_FOUND", "결제 시작 요청을 찾을 수 없습니다."));
        if (!paymentRequest.getRequestKey().equals(request.paymentRequestKey().toString())
                || !order.getOrderNumber().equals(request.orderNumber())
                || order.getTotalAmount().compareTo(request.amount()) != 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "PAYMENT_MISMATCH", "결제 요청 정보가 주문과 일치하지 않습니다.");
        }
        PaymentConfirmation confirmation = confirmations.findByOrderId(orderId).orElse(null);
        if (confirmation != null) {
            if (!confirmation.getPaymentKey().equals(request.paymentKey())) {
                throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_KEY_MISMATCH", "기존 결제 요청과 일치하지 않습니다.");
            }
            return response(order, confirmation);
        }
        if (order.getOrderStatus() != OrderStatus.PAYMENT_PENDING) {
            throw new ApiException(HttpStatus.CONFLICT, "ORDER_NOT_PENDING", "결제 대기 상태의 주문이 아닙니다.");
        }
        if (confirmations.existsByPaymentKey(request.paymentKey())) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_KEY_IN_USE", "이미 사용된 결제 정보입니다.");
        }

        // 주문 상품의 판매 상태와 재고 확인
        List<OrderItem> orderItems = items.findByOrderIdOrderByVariantIdAsc(orderId);
        if (orderItems.isEmpty()) {
            throw new ApiException(HttpStatus.CONFLICT, "ORDER_ITEMS_MISSING", "주문 상품을 찾을 수 없습니다.");
        }
        List<Long> visibleCategories = categories.categoryIds(null);
        LocalDateTime now = LocalDateTime.now(clock);
        for (OrderItem item : orderItems) {
            ProductVariant variant = variants.findByIdForUpdate(item.getVariantId())
                    .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "ORDER_ITEM_UNAVAILABLE", "주문 상품을 구매할 수 없습니다."));
            Product product = variant.getProduct();
            if (!variant.isActive() || product.getDeletedAt() != null || product.getSaleStatus() != SaleStatus.ON_SALE
                    || product.getPublishedAt() == null || product.getPublishedAt().isAfter(now)
                    || !visibleCategories.contains(product.getCategory().getId())
                    || variant.getPrice().compareTo(item.getUnitPrice()) != 0
                    || variant.getStockQuantity() < item.getQuantity()) {
                throw new ApiException(HttpStatus.CONFLICT, "ORDER_ITEM_UNAVAILABLE", "상품의 가격 또는 판매 상태, 재고가 변경되었습니다.");
            }

            // 결제 승인 중 재고 차감
            variant.deductStock(item.getQuantity());
        }
        histories.save(
                OrderStatusHistory.builder()
                        .order(order)
                        .previousStatus(order.getOrderStatus())
                        .newStatus(OrderStatus.PAYMENT_CONFIRMING)
                        .build()
        );
        order.changeStatus(OrderStatus.PAYMENT_CONFIRMING);
        confirmation = confirmations.save(
                PaymentConfirmation.builder()
                        .order(order)
                        .paymentKey(request.paymentKey())
                        .build()
        );
        return response(order, confirmation);
    }

    // 결제사 조회 결과를 바탕으로 승인 상태 복구
    PaymentConfirmResponse reconcile(
            Long memberId,
            Long orderId,
            String paymentKey,
            String providerStatus
    ) {
        if ("DONE".equals(providerStatus)) {
            return transactions.execute(status -> complete(memberId, orderId, paymentKey));
        }
        if ("ABORTED".equals(providerStatus) || "EXPIRED".equals(providerStatus)) {
            return transactions.execute(status -> fail(memberId, orderId, paymentKey));
        }
        return null;
    }

    // 결제 완료 반영 및 주문한 장바구니 항목 정리
    private PaymentConfirmResponse complete(
            Long memberId,
            Long orderId,
            String paymentKey
    ) {
        lockMemberForRecovery(memberId);
        Order order = findOrder(memberId, orderId);
        PaymentConfirmation confirmation = confirmations.findByOrderId(orderId)
                .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "PAYMENT_NOT_PREPARED", "결제 준비 내역을 찾을 수 없습니다."));
        if (!confirmation.getPaymentKey().equals(paymentKey)) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_KEY_MISMATCH", "기존 결제 요청과 일치하지 않습니다.");
        }

        // 결제 완료 상태와 이력 반영
        if (order.getOrderStatus() == OrderStatus.PAYMENT_CONFIRMING) {
            histories.save(
                    OrderStatusHistory.builder()
                            .order(order)
                            .previousStatus(order.getOrderStatus())
                            .newStatus(OrderStatus.PAID)
                            .build()
            );
            order.markPaid();
            confirmation.markPaid(LocalDateTime.now(clock));

            // 주문 후 변경되지 않은 장바구니 항목 삭제
            for (OrderItem item : items.findByOrderIdOrderByVariantIdAsc(orderId)) {
                if (item.getCartItemId() != null) {
                    cart.findByIdAndMemberId(item.getCartItemId(), memberId)
                            .filter(cartItem -> cartItem.getQuantity() == item.getQuantity()
                                    && cartItem.getVariant().getId().equals(item.getVariantId()))
                            .ifPresent(cart::delete);
                }
            }
        }
        return response(order, confirmation);
    }

    // 결제 실패 상태 반영 및 재고 복구
    private PaymentConfirmResponse fail(
            Long memberId,
            Long orderId,
            String paymentKey
    ) {
        lockMemberForRecovery(memberId);
        Order order = findOrder(memberId, orderId);
        PaymentConfirmation confirmation = confirmations.findByOrderId(orderId).orElse(null);
        if (confirmation == null) {
            if (order.getOrderStatus() == OrderStatus.PAYMENT_PENDING) {
                histories.save(
                        OrderStatusHistory.builder()
                                .order(order)
                                .previousStatus(order.getOrderStatus())
                                .newStatus(OrderStatus.PAYMENT_FAILED)
                                .build()
                );
                order.markPaymentFailed();
            }
            return null;
        }
        if (!confirmation.getPaymentKey().equals(paymentKey)) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_KEY_MISMATCH", "기존 결제 요청과 일치하지 않습니다.");
        }
        if (order.getOrderStatus() == OrderStatus.PAYMENT_CONFIRMING) {
            for (OrderItem item : items.findByOrderIdOrderByVariantIdAsc(orderId)) {
                ProductVariant variant = variants.findByIdForUpdate(item.getVariantId())
                        .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "ORDER_ITEM_UNAVAILABLE", "주문 상품을 찾을 수 없습니다."));
                variant.restoreStock(item.getQuantity());
            }
            histories.save(
                    OrderStatusHistory.builder()
                            .order(order)
                            .previousStatus(order.getOrderStatus())
                            .newStatus(OrderStatus.PAYMENT_FAILED)
                            .build()
            );
            order.markPaymentFailed();
        }
        return response(order, confirmation);
    }

    // 복구 처리를 위한 회원 조회 및 잠금
    private void lockMemberForRecovery(Long memberId) {
        members.findByIdForUpdate(memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "MEMBER_NOT_FOUND", "회원을 찾을 수 없습니다."));
    }

    // 활성 회원 조회 및 잠금
    private void lockMember(Long memberId) {
        members.findByIdForUpdate(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }

    // 회원의 주문 조회
    private Order findOrder(Long memberId, Long orderId) {
        return orders.findByIdAndMemberId(orderId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", "주문을 찾을 수 없습니다."));
    }

    // 결제 승인 결과 응답 생성
    private PaymentConfirmResponse response(Order order, PaymentConfirmation confirmation) {
        return new PaymentConfirmResponse(
                order.getId(),
                order.getOrderStatus(),
                confirmation.getPaidAt(),
                order.getTotalAmount()
        );
    }

}
