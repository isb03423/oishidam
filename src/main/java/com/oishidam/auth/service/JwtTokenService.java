package com.oishidam.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.List;
import java.util.UUID;

@Service
public class JwtTokenService {
    private final JwtEncoder jwtEncoder;
    private final Clock clock;
    private final String issuer;
    private final String audience;
    private final long accessTokenValiditySeconds;
    private final long refreshTokenValiditySeconds;
    private final SecureRandom secureRandom = new SecureRandom();

    public JwtTokenService(
            JwtEncoder jwtEncoder,
            Clock clock,
            @Value("${oishidam.jwt.issuer}") String issuer,
            @Value("${oishidam.jwt.audience}") String audience,
            @Value("${oishidam.jwt.access-token-validity-seconds}") long accessTokenValiditySeconds,
            @Value("${oishidam.jwt.refresh-token-validity-seconds}") long refreshTokenValiditySeconds
    ) {
        this.jwtEncoder = jwtEncoder;
        this.clock = clock;
        this.issuer = issuer;
        this.audience = audience;
        this.accessTokenValiditySeconds = accessTokenValiditySeconds;
        this.refreshTokenValiditySeconds = refreshTokenValiditySeconds;
    }

    public String issueAccessToken(Long memberId, String role, long tokenVersion) {
        LocalDateTime now = LocalDateTime.now(clock);
        LocalDateTime expiresAt = now.plusSeconds(accessTokenValiditySeconds);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .audience(List.of(audience))
                .subject(memberId.toString())
                .id(UUID.randomUUID().toString())
                .claim("token_version", tokenVersion)
                .issuedAt(now.atZone(clock.getZone()).toInstant())
                .expiresAt(expiresAt.atZone(clock.getZone()).toInstant())
                .claim("roles", List.of(role))
                .build();

        JwsHeader jwsHeader = JwsHeader.with(MacAlgorithm.HS256).build();

        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    public GeneratedRefreshToken issueRefreshToken() {
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);

        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
        String tokenHash = hashRefreshToken(token);
        LocalDateTime expiresAt = LocalDateTime.now(clock).plusSeconds(refreshTokenValiditySeconds);

        return new GeneratedRefreshToken(token, tokenHash, expiresAt);
    }

    public String hashRefreshToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));

            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 알고리즘을 사용할 수 없습니다.", e);
        }
    }

    public record GeneratedRefreshToken(String token, String tokenHash, LocalDateTime expiresAt) {
    }
}
