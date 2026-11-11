package com.oishidam.auth.dto;

import com.oishidam.member.enums.MemberGender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank String password,
        @NotBlank String passwordConfirm,
        @NotBlank @Size(max = 100) String name,
        @Size(max = 30) String phone,
        Integer birthYear,
        MemberGender gender
) {
}
