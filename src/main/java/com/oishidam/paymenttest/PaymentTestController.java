package com.oishidam.paymenttest;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.common.exception.ApiException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@Profile("payment-test")
@RequestMapping("/payment-test")
@RequiredArgsConstructor
public class PaymentTestController {
    private static final int TEST_AMOUNT = 5000;
    private final PaymentTestConfig.PaymentTestKeys keys;
    private final PaymentTestClient client;

    @GetMapping(value = {"", "/", "/success", "/fail"}, produces = MediaType.TEXT_HTML_VALUE)
    public ClassPathResource page() {
        return new ClassPathResource("payment-test/index.html");
    }

    @GetMapping("/config")
    public ApiResponse<Map<String, Object>> config() {
        checkKeys();
        return ApiResponse.ok(Map.of("clientKey", keys.clientKey(), "amount", TEST_AMOUNT));
    }

    @PostMapping("/order")
    public ApiResponse<Map<String, Object>> order(HttpSession session) {
        checkKeys();
        String orderId = UUID.randomUUID().toString();
        session.setAttribute("paymentTestOrderId", orderId);
        return ApiResponse.ok(Map.of("orderId", orderId, "amount", TEST_AMOUNT));
    }

    @PostMapping("/confirm")
    public ApiResponse<Map<String, Object>> confirm(@Valid @RequestBody ConfirmRequest request, HttpSession session) {
        checkKeys();
        // shortcut: 세션에 테스트 주문 한 건만 보관하므로 실제 주문 기능에서는 DB 검증으로 교체한다.
        if (!request.orderId().equals(session.getAttribute("paymentTestOrderId")) || request.amount() != TEST_AMOUNT) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_TEST_ORDER", "테스트 주문번호 또는 결제 금액이 일치하지 않습니다.");
        }
        Map<String, Object> result = client.confirm(request.paymentKey(), request.orderId(), TEST_AMOUNT);
        session.removeAttribute("paymentTestOrderId");
        return ApiResponse.ok(result);
    }

    private void checkKeys() {
        if (!keys.valid()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "TOSS_TEST_KEYS_REQUIRED",
                    "토스 주문서형 테스트 키를 설정해 주세요.");
        }
    }

    public record ConfirmRequest(
            @NotBlank @Size(max = 200) String paymentKey,
            @NotBlank @Pattern(regexp = "[A-Za-z0-9_=-]{6,64}") String orderId,
            @NotNull @Min(1) Integer amount
    ) {
    }
}
