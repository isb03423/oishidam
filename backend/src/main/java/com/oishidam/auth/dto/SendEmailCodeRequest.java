package com.oishidam.auth.dto;

import com.oishidam.auth.enums.EmailVerificationPurpose;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SendEmailCodeRequest(
        @NotBlank @Email @Size(max = 254) String email,
        @NotNull EmailVerificationPurpose purpose
) {
}
