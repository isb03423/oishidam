package com.oishidam.payment.service;

import com.oishidam.order.enums.OrderStatus;
import com.oishidam.payment.dto.PendingPayment;
import com.oishidam.payment.repository.PaymentConfirmationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentRecoveryJob {
    private final PaymentConfirmationRepository confirmations;

    private final PaymentConfirmationService service;

    private final TossConfirmationClient toss;

    private final TransactionTemplate transactions;

    private final Clock clock;

    // 승인 처리 중인 결제의 상태 복구
    @Scheduled(fixedDelay = 60000, initialDelay = 60000)
    public void recover() {
        LocalDateTime cutoff = LocalDateTime.now(clock).minusMinutes(1);
        long afterId = 0;
        while (true) {
            long cursor = afterId;
            List<PendingPayment> pending = transactions.execute(status -> confirmations
                    .findByOrderOrderStatusAndCreatedAtBeforeAndIdGreaterThanOrderByIdAsc(
                            OrderStatus.PAYMENT_CONFIRMING,
                            cutoff,
                            cursor,
                            PageRequest.of(
                                    0,
                                    20
                            )
                    )
                    .stream().map(payment -> new PendingPayment(
                            payment.getId(),
                            payment.getOrder().getMember().getId(),
                            payment.getOrder().getId(),
                            payment.getPaymentKey(),
                            payment.getOrder().getOrderNumber(),
                            payment.getOrder().getTotalAmount()
                    )).toList());
            if (pending == null || pending.isEmpty()) {
                return;
            }
            for (PendingPayment payment : pending) {
                try {
                    String result = toss.lookup(payment.paymentKey(), payment.orderNumber(), payment.amount());
                    service.reconcile(payment.memberId(), payment.orderId(), payment.paymentKey(), result);
                } catch (RuntimeException e) {
                    log.warn("결제 상태 확인 실패: orderId={}", payment.orderId());
                }
                afterId = payment.id();
            }
        }
    }

}
