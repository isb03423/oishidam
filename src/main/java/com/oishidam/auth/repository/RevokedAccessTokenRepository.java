package com.oishidam.auth.repository;

import com.oishidam.auth.entity.RevokedAccessToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface RevokedAccessTokenRepository extends JpaRepository<RevokedAccessToken, String> {
    @Modifying
    @Query("DELETE FROM RevokedAccessToken t WHERE t.expiresAt < :expiresAt")
    void deleteExpired(@Param("expiresAt") LocalDateTime expiresAt);

    @Modifying
    @Query(value = "INSERT INTO revoked_access_tokens (token_id, expires_at) VALUES (:tokenId, :expiresAt) ON CONFLICT (token_id) DO NOTHING", nativeQuery = true)
    void insertIfAbsent(@Param("tokenId") String tokenId, @Param("expiresAt") LocalDateTime expiresAt);
}
