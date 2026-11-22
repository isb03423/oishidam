package com.oishidam.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PasswordResetRequest(
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Pattern(regexp = "[A-Za-z0-9_-]{43}") String verificationToken,
        @NotBlank String newPassword,
        @NotBlank String passwordConfirm
) {
}
