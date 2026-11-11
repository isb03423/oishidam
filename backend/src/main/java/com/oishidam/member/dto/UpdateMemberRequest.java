package com.oishidam.member.dto;

import com.oishidam.member.enums.MemberGender;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateMemberRequest(
        @NotBlank @Size(max = 100) String name,
        @Size(max = 30) String phone,
        @Min(1900) @Max(2100) Integer birthYear,
        MemberGender gender
) {
}
