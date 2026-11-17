package com.oishidam.payment.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.payment.dto.PaymentConfigResponse;
import com.oishidam.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "결제")
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentConfigController {
    private final PaymentService paymentService;

    @Operation(summary = "결제 화면 설정 조회")
    @GetMapping("/config")
    public ApiResponse<PaymentConfigResponse> config() {
        return ApiResponse.ok(new PaymentConfigResponse(paymentService.clientKey()));
    }
}
