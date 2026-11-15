package com.oishidam.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "revoked_access_tokens")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RevokedAccessToken {
    @Id
    @Column(name = "token_id", length = 36)
    private String tokenId;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;
}
