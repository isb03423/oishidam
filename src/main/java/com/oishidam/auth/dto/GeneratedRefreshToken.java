package com.oishidam.auth.dto;

import java.time.LocalDateTime;

public record GeneratedRefreshToken(
        String token,
        String tokenHash,
        LocalDateTime expiresAt
) {
}
