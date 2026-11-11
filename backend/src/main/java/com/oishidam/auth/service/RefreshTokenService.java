package com.oishidam.auth.service;

import com.oishidam.auth.entity.AuthRefreshToken;
import com.oishidam.auth.repository.AuthRefreshTokenRepository;
import com.oishidam.auth.service.JwtTokenService.GeneratedRefreshToken;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final JwtTokenService jwtTokenService;
    private final AuthRefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final Clock clock;
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void revokeForMember(Long memberId, String token, Jwt accessToken) {
        jdbcTemplate.update("delete from revoked_access_tokens where expires_at < ?", LocalDateTime.now(clock)
                .minusSeconds(60));
        jdbcTemplate.update(
                "insert into revoked_access_tokens (token_id, expires_at) values (?, ?) "
                        + "on conflict (token_id) do nothing",
                accessToken.getId(), LocalDateTime.ofInstant(accessToken.getExpiresAt(), clock.getZone()));
        refreshTokenRepository.findByTokenHash(jwtTokenService.hashRefreshToken(token))
                .filter(saved -> saved.getMemberId().equals(memberId))
                .ifPresent(saved -> saved.revoke(LocalDateTime.now(clock)));
    }

    @Transactional
    public RefreshedTokens refresh(String token) {
        String tokenHash = jwtTokenService.hashRefreshToken(token);
        Long memberId = refreshTokenRepository.findMemberIdByTokenHash(tokenHash)
                .orElseThrow(this::invalidRefreshToken);
        Member member = memberRepository.findByIdForUpdate(memberId)
                .filter(Member::isActive)
                .orElseThrow(this::invalidRefreshToken);
        AuthRefreshToken saved = refreshTokenRepository.findByTokenHash(tokenHash)
                .filter(found -> found.isUsable(LocalDateTime.now(clock)))
                .orElseThrow(this::invalidRefreshToken);

        saved.revoke(LocalDateTime.now(clock));
        GeneratedRefreshToken refreshToken = issueAndSave(member.getId());
        String accessToken = jwtTokenService.issueAccessToken(
                member.getId(), member.getRole().name(), member.getTokenVersion());

        return new RefreshedTokens(accessToken, refreshToken.token());
    }

    private ApiException invalidRefreshToken() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "유효하지 않은 리프레시 토큰입니다.");
    }

    public record RefreshedTokens(String accessToken, String refreshToken) {
    }

    @Transactional
    public GeneratedRefreshToken issueAndSave(Long memberId) {
        GeneratedRefreshToken generated = jwtTokenService.issueRefreshToken();

        AuthRefreshToken entity = new AuthRefreshToken(memberId, generated.tokenHash(), generated.expiresAt());

        refreshTokenRepository.save(entity);

        return generated;
    }
}
