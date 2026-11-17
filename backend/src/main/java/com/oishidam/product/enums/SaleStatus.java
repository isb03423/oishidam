package com.oishidam.product.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SaleStatus {
    DRAFT("판매 준비"),
    ON_SALE("판매 중"),
    STOPPED("판매 중지");

    @JsonValue
    private final String label;

    @JsonCreator
    public static SaleStatus fromValue(String value) {
        for (SaleStatus candidate : values()) {
            if (candidate.name().equals(value) || candidate.label.equals(value)) {
                return candidate;
            }
        }
        throw new IllegalArgumentException("지원하지 않는 판매 상태입니다.");
    }
}
