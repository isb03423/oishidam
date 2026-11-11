package com.oishidam.member.dto;

import com.oishidam.member.entity.Member;
import com.oishidam.member.enums.MemberGender;
import com.oishidam.member.enums.MemberRole;

public record MemberResponse(
        Long memberId,
        String email,
        String name,
        String phone,
        Integer birthYear,
        MemberGender gender,
        MemberRole role
) {
    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getPhone(),
                member.getBirthYear(),
                member.getGender(),
                member.getRole());
    }
}
