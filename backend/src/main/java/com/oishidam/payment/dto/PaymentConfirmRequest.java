package com.oishidam.payment.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.UUID;

public record PaymentConfirmRequest(
        @NotNull UUID paymentRequestKey,
        @NotBlank @Size(max = 200) String paymentKey,
        @NotBlank @Size(max = 64) String orderNumber,
        @NotNull @DecimalMin("0") @Digits(integer = 14, fraction = 0) BigDecimal amount
) {
}
