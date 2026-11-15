package com.oishidam.auth.service;

import com.oishidam.auth.dto.RefreshedTokens;
import com.oishidam.auth.entity.AuthRefreshToken;
import com.oishidam.auth.repository.AuthRefreshTokenRepository;
import com.oishidam.auth.repository.RevokedAccessTokenRepository;
import com.oishidam.auth.dto.GeneratedRefreshToken;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    private final RevokedAccessTokenRepository revokedAccessTokenRepository;

    // 로그아웃 및 토큰 폐기
    @Transactional
    public void revokeForMember(
            Long memberId,
            String token,
            Jwt accessToken
    ) {
        // 만료된 폐기 토큰 정리 및 액세스 토큰 폐기
        revokedAccessTokenRepository.deleteExpired(LocalDateTime.now(clock).minusSeconds(60));
        revokedAccessTokenRepository.insertIfAbsent(
                accessToken.getId(),
                LocalDateTime.ofInstant(accessToken.getExpiresAt(), clock.getZone())
        );

        // 회원의 리프레시 토큰 폐기
        refreshTokenRepository.findByTokenHash(jwtTokenService.hashRefreshToken(token))
                .filter(saved -> saved.getMemberId().equals(memberId))
                .ifPresent(saved -> saved.revoke(LocalDateTime.now(clock)));
    }

    // 토큰 재발급
    @Transactional
    public RefreshedTokens refresh(String token) {
        // 저장된 토큰과 회원 상태 확인
        String tokenHash = jwtTokenService.hashRefreshToken(token);
        Long memberId = refreshTokenRepository.findMemberIdByTokenHash(tokenHash)
                .orElseThrow(this::invalidRefreshToken);
        Member member = memberRepository.findByIdForUpdate(memberId)
                .filter(Member::isActive)
                .orElseThrow(this::invalidRefreshToken);
        AuthRefreshToken saved = refreshTokenRepository.findByTokenHash(tokenHash)
                .filter(found -> found.isUsable(LocalDateTime.now(clock)))
                .orElseThrow(this::invalidRefreshToken);

        // 기존 토큰 폐기 및 새 토큰 발급
        saved.revoke(LocalDateTime.now(clock));
        GeneratedRefreshToken refreshToken = issueAndSave(member.getId());
        String accessToken = jwtTokenService.issueAccessToken(
                member.getId(),
                member.getRole().name(),
                member.getTokenVersion()
        );

        return new RefreshedTokens(accessToken, refreshToken.token());
    }

    // 유효하지 않은 리프레시 토큰 오류 생성
    private ApiException invalidRefreshToken() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "유효하지 않은 리프레시 토큰입니다.");
    }

    // 리프레시 토큰 발급 및 저장
    @Transactional
    public GeneratedRefreshToken issueAndSave(Long memberId) {
        GeneratedRefreshToken generated = jwtTokenService.issueRefreshToken();

        AuthRefreshToken entity = AuthRefreshToken.builder()
                .memberId(memberId)
                .tokenHash(generated.tokenHash())
                .expiresAt(generated.expiresAt())
                .build();

        refreshTokenRepository.save(entity);

        return generated;
    }
}
