package com.oishidam.paymenttest;

import com.oishidam.common.exception.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.time.Duration;
import java.util.Map;

@Component
@Profile("payment-test")
public class PaymentTestClient {
    private final RestClient client;
    private final PaymentTestConfig.PaymentTestKeys keys;

    @Autowired
    public PaymentTestClient(PaymentTestConfig.PaymentTestKeys keys) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(30));
        this.client = RestClient.builder().requestFactory(factory).build();
        this.keys = keys;
    }

    PaymentTestClient(RestClient client, PaymentTestConfig.PaymentTestKeys keys) {
        this.client = client;
        this.keys = keys;
    }

    public Map<String, Object> confirm(String paymentKey, String orderId, int amount) {
        if (!keys.valid()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "TOSS_TEST_KEYS_REQUIRED",
                    "토스 주문서형 테스트 키를 설정해 주세요.");
        }
        try {
            Map<String, Object> result = client.post().uri("https://api.tosspayments.com/v1/payments/confirm")
                    .headers(headers -> headers.setBasicAuth(keys.secretKey(), ""))
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("paymentKey", paymentKey, "orderId", orderId, "amount", amount))
                    .retrieve().body(new ParameterizedTypeReference<Map<String, Object>>() {});
            if (result == null) {
                throw new ApiException(HttpStatus.BAD_GATEWAY, "TOSS_EMPTY_RESPONSE", "토스 결제 승인 응답을 받지 못했습니다.");
            }
            return result;
        } catch (RestClientException e) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "TOSS_CONFIRM_FAILED",
                    "결제 승인 요청에 실패했습니다. 토스 테스트 내역을 확인하세요.");
        }
    }
}
