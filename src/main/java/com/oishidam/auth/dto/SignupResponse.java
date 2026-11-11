package com.oishidam.auth.dto;

import com.oishidam.member.enums.MemberRole;

public record SignupResponse(
        Long memberId,
        String email,
        String name,
        MemberRole role
) {
}
