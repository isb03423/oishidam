package com.oishidam.order.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    PAYMENT_PENDING("결제 대기"),
    PAYMENT_FAILED("결제 실패"),
    PAID("결제 완료"),
    PREPARING("상품 준비 중"),
    PAYMENT_CONFIRMING("결제 승인 중"),
    INTERNATIONAL_SHIPPING("해외 배송 중"),
    CUSTOMS_CLEARANCE("통관 중"),
    DOMESTIC_SHIPPING("국내 배송 중"),
    DELIVERED("배송 완료"),
    CANCEL_PENDING("취소 처리 중"),
    CANCELLED("취소 완료");

    @JsonValue
    private final String label;

    @JsonCreator
    public static OrderStatus fromValue(String value) {
        for (OrderStatus candidate : values()) {
            if (candidate.name().equals(value) || candidate.label.equals(value)) {
                return candidate;
            }
        }
        throw new IllegalArgumentException("지원하지 않는 주문 상태입니다.");
    }
}
