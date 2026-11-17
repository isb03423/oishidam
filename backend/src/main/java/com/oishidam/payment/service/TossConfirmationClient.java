package com.oishidam.payment.service;

import com.oishidam.common.exception.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.Map;

@Component
public class TossConfirmationClient {
    private final RestClient client;

    private final String secretKey;

    @Autowired
    public TossConfirmationClient(@Value("${oishidam.toss.test-secret-key:}") String secretKey) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(30));
        this.client = RestClient.builder().requestFactory(factory).build();
        this.secretKey = secretKey;
    }

    TossConfirmationClient(RestClient client, String secretKey) {
        this.client = client;
        this.secretKey = secretKey;
    }

    // 토스 결제 상태 조회 및 주문 정보 검증
    public String lookup(
            String paymentKey,
            String orderNumber,
            BigDecimal amount
    ) {
        if (secretKey == null || !secretKey.startsWith("test_gsk_")) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "TOSS_TEST_KEYS_REQUIRED", "토스 테스트 키를 확인해 주세요.");
        }
        Map<String, Object> result;
        try {
            result = client.get().uri("https://api.tosspayments.com/v1/payments/{paymentKey}", paymentKey)
                    .headers(headers -> headers.setBasicAuth(secretKey, ""))
                    .retrieve().body(new ParameterizedTypeReference<Map<String, Object>>() {
                    });
            if (result == null || !paymentKey.equals(result.get("paymentKey"))
                    || !orderNumber.equals(result.get("orderId"))
                    || !(result.get("status") instanceof String)
                    || new BigDecimal(result.get("totalAmount").toString()).compareTo(amount) != 0) {
                throw new IllegalArgumentException();
            }
            return (String) result.get("status");
        } catch (RestClientException | IllegalArgumentException | NullPointerException e) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "PAYMENT_VERIFY_FAILED", "토스 결제 정보를 확인할 수 없습니다.");
        }
    }

    // 토스 결제 취소 및 응답 검증
    public void cancel(
            String paymentKey,
            String orderNumber,
            BigDecimal amount,
            String reason
    ) {
        if (secretKey == null || !secretKey.startsWith("test_gsk_")) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "TOSS_TEST_KEYS_REQUIRED", "토스 테스트 키를 확인해 주세요.");
        }
        try {
            Map<String, Object> result = client.post()
                    .uri("https://api.tosspayments.com/v1/payments/{paymentKey}/cancel", paymentKey)
                    .headers(headers -> {
                        headers.setBasicAuth(secretKey, "");
                        headers.set("Idempotency-Key", "cancel-" + orderNumber);
                    })
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("cancelReason", reason))
                    .retrieve().body(new ParameterizedTypeReference<Map<String, Object>>() {
                    });
            if (result == null || !paymentKey.equals(result.get("paymentKey"))
                    || !orderNumber.equals(result.get("orderId")) || !"CANCELED".equals(result.get("status"))
                    || new BigDecimal(result.get("totalAmount").toString()).compareTo(amount) != 0
                    || new BigDecimal(result.get("balanceAmount").toString()).signum() != 0) {
                throw new IllegalArgumentException();
            }
        } catch (RestClientException | IllegalArgumentException | NullPointerException e) {
            throw new ApiException(
                    HttpStatus.BAD_GATEWAY,
                    "PAYMENT_CANCEL_UNCERTAIN",
                    "결제 취소 결과를 확인할 수 없습니다. 같은 요청으로 다시 시도해 주세요."
            );
        }
    }

    // 토스 결제 승인 및 응답 검증
    public void confirm(
            String paymentKey,
            String orderNumber,
            BigDecimal amount
    ) {
        if (secretKey == null || !secretKey.startsWith("test_gsk_")) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "TOSS_TEST_KEYS_REQUIRED", "토스 테스트 키를 확인해 주세요.");
        }
        Map<String, Object> result;
        try {
            result = client.post().uri("https://api.tosspayments.com/v1/payments/confirm")
                    .headers(headers -> {
                        headers.setBasicAuth(secretKey, "");
                        headers.set("Idempotency-Key", "confirm-" + orderNumber);
                    })
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("paymentKey", paymentKey, "orderId", orderNumber, "amount", amount))
                    .retrieve().body(new ParameterizedTypeReference<Map<String, Object>>() {
                    });
        } catch (RestClientException e) {
            throw new ApiException(
                    HttpStatus.BAD_GATEWAY,
                    "PAYMENT_CONFIRM_UNCERTAIN",
                    "결제 결과를 확인할 수 없습니다. 같은 요청으로 다시 시도해 주세요."
            );
        }
        try {
            if (result == null || !paymentKey.equals(result.get("paymentKey"))
                    || !orderNumber.equals(result.get("orderId")) || !"DONE".equals(result.get("status"))
                    || new BigDecimal(result.get("totalAmount").toString()).compareTo(amount) != 0) {
                throw new IllegalArgumentException();
            }
        } catch (RuntimeException e) {
            throw new ApiException(
                    HttpStatus.BAD_GATEWAY,
                    "PAYMENT_CONFIRM_UNCERTAIN",
                    "결제 응답을 확인할 수 없습니다. 같은 요청으로 다시 시도해 주세요."
            );
        }
    }
}
