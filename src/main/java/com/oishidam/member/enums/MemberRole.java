package com.oishidam.member.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberRole {
    ADMIN("관리자"),
    USER("일반 회원");

    @JsonValue
    private final String label;

    @JsonCreator
    public static MemberRole fromValue(String value) {
        for (MemberRole candidate : values()) {
            if (candidate.name().equals(value) || candidate.label.equals(value)) {
                return candidate;
            }
        }
        throw new IllegalArgumentException("지원하지 않는 회원 권한입니다.");
    }
}
