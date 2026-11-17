package com.oishidam.payment.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record PaymentStartResponse(
        UUID paymentRequestKey,
        PaymentStartRequest.Provider provider,
        String orderNumber,
        BigDecimal amount,
        String clientKey
) {
}
