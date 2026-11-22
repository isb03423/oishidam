package com.oishidam.auth.dto;

import com.oishidam.auth.enums.EmailVerificationPurpose;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ExtendEmailCodeRequest(
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(max = 128) String extensionToken,
        EmailVerificationPurpose purpose
) {
}
