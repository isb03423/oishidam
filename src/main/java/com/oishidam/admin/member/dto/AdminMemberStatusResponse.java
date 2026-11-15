package com.oishidam.admin.member.dto;

public record AdminMemberStatusResponse(
        Long memberId,
        boolean isActive
) {
}
