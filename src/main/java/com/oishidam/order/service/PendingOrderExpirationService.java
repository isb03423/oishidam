package com.oishidam.order.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.entity.Order;
import com.oishidam.order.repository.PendingOrderRepository;
import com.oishidam.payment.entity.PaymentRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PendingOrderExpirationService {
    private static final int ORDER_EXPIRATION_MINUTES = 15;
    private static final int PAYMENT_EXPIRATION_MINUTES = 45;
    private static final int BATCH_SIZE = 100;

    private final PendingOrderRepository pendingOrders;
    private final MemberRepository members;
    private final TransactionTemplate transactions;
    private final Clock clock;

    // 만료된 주문에서 새 결제창을 열지 못하게 한다.
    public void requireActive(Order order, PaymentRequest payment) {
        LocalDateTime expiresAt = payment == null
                ? order.getCreatedAt().plusMinutes(ORDER_EXPIRATION_MINUTES)
                : payment.getUpdatedAt().plusMinutes(PAYMENT_EXPIRATION_MINUTES);
        if (!expiresAt.isAfter(LocalDateTime.now(clock))) {
            throw new ApiException(HttpStatus.CONFLICT, "ORDER_EXPIRED", "결제 대기 시간이 지나 주문이 만료됐어요. 다시 결제해 주세요.");
        }
    }

    // 결제 시작·승인과 같은 회원 잠금을 사용해 오래된 결제 대기 주문을 정리한다.
    @Scheduled(fixedDelay = 60_000, initialDelay = 60_000)
    public void expirePendingOrders() {
        LocalDateTime now = LocalDateTime.now(clock);
        LocalDateTime orderCutoff = now.minusMinutes(ORDER_EXPIRATION_MINUTES);
        LocalDateTime paymentCutoff = now.minusMinutes(PAYMENT_EXPIRATION_MINUTES);
        long afterId = 0;
        while (true) {
            var candidates = pendingOrders.findExpired(orderCutoff, paymentCutoff, afterId, BATCH_SIZE);
            for (var candidate : candidates) {
                try {
                    transactions.executeWithoutResult(status -> {
                        if (members.findByIdForUpdate(candidate.memberId()).isPresent()) {
                            pendingOrders.expireIfPending(candidate.orderId(), orderCutoff, paymentCutoff, now);
                        }
                    });
                } catch (RuntimeException e) {
                    log.warn("만료 주문 정리 실패: orderId={}", candidate.orderId(), e);
                }
                afterId = candidate.orderId();
            }
            if (candidates.size() < BATCH_SIZE) return;
        }
    }
}
