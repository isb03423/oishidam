package com.oishidam.payment.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

public record PaymentStartRequest(
        @NotNull UUID requestKey,
        @NotNull Provider provider
) {
    @Getter
    @RequiredArgsConstructor
    public enum Provider {
        TOSS("토스페이먼츠");

        @JsonValue
        private final String label;

        @JsonCreator
        public static Provider fromValue(String value) {
            for (Provider candidate : values()) {
                if (candidate.name().equals(value) || candidate.label.equals(value)) {
                    return candidate;
                }
            }
            throw new IllegalArgumentException("지원하지 않는 결제사입니다.");
        }
    }
}
