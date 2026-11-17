package com.oishidam.auth.dto;

public record RefreshedTokens(
        String accessToken,
        String refreshToken
) {
}
