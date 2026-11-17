package com.oishidam.auth.repository;

import com.oishidam.auth.entity.AuthRefreshToken;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AuthRefreshTokenRepository extends JpaRepository<AuthRefreshToken, Long> {
    @Query("SELECT t.memberId FROM AuthRefreshToken t WHERE t.tokenHash = :tokenHash")
    Optional<Long> findMemberIdByTokenHash(@Param("tokenHash") String tokenHash);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<AuthRefreshToken> findByTokenHash(String tokenHash);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE AuthRefreshToken t SET t.revokedAt = :now WHERE t.memberId = :memberId AND t.revokedAt IS NULL")
    int revokeAllForMember(@Param("memberId") Long memberId, @Param("now") LocalDateTime now);
}

