package com.oishidam.order.service;

import com.oishidam.order.dto.CancellationData;
import com.oishidam.order.dto.PendingCancellation;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderCancellationRepository;
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
public class OrderCancellationRecoveryJob {
    private final OrderCancellationRepository cancellations;

    private final PaymentConfirmationRepository confirmations;

    private final OrderCancellationService service;

    private final TransactionTemplate transactions;

    private final Clock clock;

    // 처리 중인 주문 취소 상태 복구
    @Scheduled(fixedDelay = 60000, initialDelay = 60000)
    public void recover() {
        LocalDateTime cutoff = LocalDateTime.now(clock).minusMinutes(1);
        long afterId = 0;
        while (true) {
            long cursor = afterId;
            List<PendingCancellation> batch = transactions.execute(status -> cancellations
                    .findByOrderOrderStatusAndCreatedAtBeforeAndIdGreaterThanOrderByIdAsc(
                            OrderStatus.CANCEL_PENDING,
                            cutoff,
                            cursor,
                            PageRequest.of(0, 20)
                    )
                    .stream().map(cancellation -> {
                        var order = cancellation.getOrder();
                        var payment = confirmations.findByOrderId(order.getId()).orElse(null);
                        var data = payment == null ? null : new CancellationData(
                                order.getMember().getId(),
                                order.getId(),
                                payment.getPaymentKey(),
                                order.getOrderNumber(),
                                order.getTotalAmount(),
                                cancellation.getReason(),
                                null
                        );
                        return new PendingCancellation(cancellation.getId(), order.getId(), data);
                    }).toList());
            if (batch == null || batch.isEmpty()) {
                return;
            }
            for (PendingCancellation pending : batch) {
                try {
                    if (pending.data() == null) {
                        log.warn("취소 복구 중 결제를 찾을 수 없음: orderId={}", pending.orderId());
                    } else {
                        service.process(pending.data());
                    }
                } catch (RuntimeException e) {
                    log.warn("주문 취소 결과 확인 실패: orderId={}", pending.orderId());
                }
                afterId = pending.id();
            }
        }
    }

}
