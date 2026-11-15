package com.oishidam.member.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberGender {
    M("남성"),
    F("여성");

    @JsonValue
    private final String label;

    @JsonCreator
    public static MemberGender fromValue(String value) {
        for (MemberGender candidate : values()) {
            if (candidate.name().equals(value) || candidate.label.equals(value)) {
                return candidate;
            }
        }
        throw new IllegalArgumentException("지원하지 않는 성별입니다.");
    }
}
