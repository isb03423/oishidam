package com.oishidam.payment.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.entity.Order;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderRepository;
import com.oishidam.order.service.PendingOrderExpirationService;
import com.oishidam.payment.dto.PaymentStartRequest;
import com.oishidam.payment.dto.PaymentStartResponse;
import com.oishidam.payment.entity.PaymentRequest;
import com.oishidam.payment.repository.PaymentRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final MemberRepository members;

    private final OrderRepository orders;

    private final PaymentRequestRepository payments;

    private final PendingOrderExpirationService expiration;

    private final Clock clock;

    @Value("${oishidam.toss.test-client-key:}")
    private String clientKey;

    @Value("${oishidam.toss.test-secret-key:}")
    private String secretKey;

    // 결제 요청 생성
    @Transactional
    public PaymentStartResponse start(
            Long memberId,
            Long orderId,
            PaymentStartRequest request
    ) {
        members.findByIdForUpdate(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));

        // 회원의 결제 대기 주문 확인
        Order order = orders.findByIdAndMemberId(orderId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", "주문을 찾을 수 없습니다."));
        if (order.getOrderStatus() == OrderStatus.PAYMENT_FAILED) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_FAILED", "결제가 실패했거나 만료됐어요. 다시 결제해 주세요.");
        }
        if (order.getOrderStatus() != OrderStatus.PAYMENT_PENDING) {
            throw new ApiException(HttpStatus.CONFLICT, "ORDER_NOT_PENDING", "결제 대기 상태의 주문이 아닙니다.");
        }
        // 만료 여부와 기존 결제 요청 확인
        PaymentRequest payment = payments.findByOrderId(orderId).orElse(null);
        expiration.requireActive(order, payment);
        clientKey();
        if (payment == null) {
            payment = payments.save(
                    PaymentRequest.builder()
                            .order(order)
                            .requestKey(request.requestKey().toString())
                            .provider(request.provider().name())
                            .build()
            );
        } else if (!payment.getRequestKey().equals(request.requestKey().toString())
                || !payment.getProvider().equals(request.provider().name())) {
            throw new ApiException(HttpStatus.CONFLICT, "PAYMENT_REQUEST_CONFLICT", "이미 결제가 시작된 주문입니다.");
        } else {
            payments.recordRestart(payment.getId(), LocalDateTime.now(clock));
        }
        return new PaymentStartResponse(
                UUID.fromString(payment.getRequestKey()),
                PaymentStartRequest.Provider.fromValue(payment.getProvider()),
                order.getOrderNumber(),
                order.getTotalAmount(),
                clientKey
        );
    }

    // 결제 화면에서 사용할 공개 클라이언트 키를 확인한다.
    public String clientKey() {
        if (clientKey == null || !clientKey.startsWith("test_gck_")
                || secretKey == null || !secretKey.startsWith("test_gsk_")) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "TOSS_TEST_KEYS_REQUIRED", "토스 주문서형 테스트 키를 설정해 주세요.");
        }
        return clientKey;
    }
}
