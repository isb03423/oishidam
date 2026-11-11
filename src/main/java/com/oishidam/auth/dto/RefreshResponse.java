package com.oishidam.auth.dto;

public record RefreshResponse(
        String accessToken,
        String refreshToken
) {
}
