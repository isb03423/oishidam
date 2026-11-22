package com.oishidam.auth.dto;

import java.time.Instant;

public record EmailVerificationWindow(String extensionToken, Instant expiresAt, Instant serverTime) {
}
