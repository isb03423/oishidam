package com.oishidam.payment.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.payment.dto.PaymentConfirmRequest;
import com.oishidam.payment.dto.PaymentConfirmResponse;
import com.oishidam.payment.dto.PaymentStartRequest;
import com.oishidam.payment.dto.PaymentStartResponse;
import com.oishidam.payment.service.PaymentConfirmationService;
import com.oishidam.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@Tag(name = "결제", description = "주문 결제 요청 및 승인")
@RestController
@RequestMapping("/api/orders/{orderId}/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    private final PaymentConfirmationService confirmationService;

    @Operation(summary = "결제 승인")
    @PostMapping("/confirm")
    public ApiResponse<PaymentConfirmResponse> confirm(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long orderId,
            @Valid @RequestBody PaymentConfirmRequest request
    ) {
        return ApiResponse.ok(confirmationService.confirm(Long.valueOf(jwt.getSubject()), orderId, request));
    }

    @Operation(summary = "결제 요청 생성")
    @PostMapping
    public ApiResponse<PaymentStartResponse> start(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long orderId,
            @Valid @RequestBody PaymentStartRequest request
    ) {
        return ApiResponse.ok(paymentService.start(Long.valueOf(jwt.getSubject()), orderId, request));
    }
}
