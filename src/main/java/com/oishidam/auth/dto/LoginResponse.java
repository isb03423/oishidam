package com.oishidam.auth.dto;

import com.oishidam.member.enums.MemberRole;

public record LoginResponse(
        String accessToken,
        MemberInfo member,
        String refreshToken
) {
    public record MemberInfo(
            Long memberId,
            String email,
            String name,
            MemberRole role
    ) {
    }
}
