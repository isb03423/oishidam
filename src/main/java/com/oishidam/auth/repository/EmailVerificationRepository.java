package com.oishidam.auth.repository;

import com.oishidam.auth.enums.EmailVerificationPurpose;
import com.oishidam.common.privacy.PersonalDataCrypto;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
@RequiredArgsConstructor
public class EmailVerificationRepository {
    private final JdbcTemplate jdbc;
    private final PersonalDataCrypto crypto;

    public boolean reserveMailQuota(LocalDateTime now) {
        return jdbc.update("""
                INSERT INTO email_verification_mail_quota (id, window_started_at, sent_count)
                VALUES (1, ?, 1)
                ON CONFLICT (id) DO UPDATE SET
                    window_started_at = CASE WHEN email_verification_mail_quota.window_started_at <= ?
                                             THEN EXCLUDED.window_started_at ELSE email_verification_mail_quota.window_started_at END,
                    sent_count = CASE WHEN email_verification_mail_quota.window_started_at <= ?
                                      THEN 1 ELSE email_verification_mail_quota.sent_count + 1 END
                WHERE email_verification_mail_quota.window_started_at <= ? OR email_verification_mail_quota.sent_count < 50
                """, now, now.minusHours(1), now.minusHours(1), now.minusHours(1)) == 1;
    }

    public void deleteExpired(LocalDateTime cutoff) {
        jdbc.update("DELETE FROM email_verifications WHERE expires_at < ?", cutoff);
    }

    public boolean issue(String email, EmailVerificationPurpose purpose, String codeHash, Long accountVersion,
                         LocalDateTime now, LocalDateTime expiresAt, String requestHash) {
        return jdbc.update("""
                INSERT INTO email_verifications (email, purpose, code_hash, account_version, sent_at, expires_at, request_hash)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT (email, purpose) DO UPDATE SET
                    code_hash = EXCLUDED.code_hash, account_version = EXCLUDED.account_version,
                    sent_at = EXCLUDED.sent_at, expires_at = EXCLUDED.expires_at,
                    request_hash = EXCLUDED.request_hash, attempts = 0, token_hash = NULL
                WHERE email_verifications.sent_at <= ?
                """, crypto.emailLookup(email), purpose.name(), codeHash, accountVersion, now, expiresAt, requestHash, now.minusMinutes(1)) == 1;
    }

    public boolean verify(String email, EmailVerificationPurpose purpose, String codeHash, String tokenHash, LocalDateTime now,
                          String requestHash, LocalDateTime extendedUntil) {
        return jdbc.queryForList("""
                UPDATE email_verifications SET
                    attempts = attempts + 1,
                    token_hash = CASE WHEN code_hash = ? THEN ? ELSE NULL END,
                    expires_at = CASE WHEN code_hash = ? THEN ? ELSE expires_at END
                WHERE email = ? AND purpose = ? AND attempts < 5 AND token_hash IS NULL
                  AND (expires_at > ? OR (request_hash = ? AND CAST(? AS TIMESTAMP) > ?))
                RETURNING token_hash
                """, String.class, codeHash, tokenHash, codeHash, now.plusMinutes(15), crypto.emailLookup(email), purpose.name(),
                now, requestHash, extendedUntil, now)
                .contains(tokenHash);
    }

    public boolean consume(String email, EmailVerificationPurpose purpose, String tokenHash, Long accountVersion, LocalDateTime now) {
        return jdbc.update("""
                UPDATE email_verifications SET token_hash = NULL, attempts = 5
                WHERE email = ? AND purpose = ? AND token_hash = ? AND expires_at > ?
                  AND account_version IS NOT DISTINCT FROM CAST(? AS BIGINT)
                """, crypto.emailLookup(email), purpose.name(), tokenHash, now, accountVersion) == 1;
    }
}
