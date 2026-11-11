package com.oishidam.paymenttest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@Profile("payment-test")
public class PaymentTestConfig {
    @Bean
    @Order(0)
    SecurityFilterChain paymentTestSecurity(HttpSecurity http) throws Exception {
        return http.securityMatcher("/payment-test", "/payment-test/**")
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    PaymentTestKeys paymentTestKeys(
            @Value("${oishidam.toss.test-client-key:}") String clientKey,
            @Value("${oishidam.toss.test-secret-key:}") String secretKey
    ) {
        return new PaymentTestKeys(clientKey, secretKey);
    }

    record PaymentTestKeys(String clientKey, String secretKey) {
        boolean valid() {
            return !clientKey.isBlank() && !secretKey.isBlank();
        }
    }
}
