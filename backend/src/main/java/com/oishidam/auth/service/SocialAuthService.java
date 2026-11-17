package com.oishidam.auth.service;

import com.oishidam.auth.dto.LoginResponse;
import com.oishidam.auth.entity.SocialAccount;
import com.oishidam.auth.repository.SocialAccountRepository;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SocialAuthService {
    private final SocialAccountRepository socialAccountRepository;

    private final MemberRepository memberRepository;

    private final JwtTokenService jwtTokenService;

    private final RefreshTokenService refreshTokenService;

    // 소셜 로그인
    @Transactional
    public LoginResponse login(
            String provider,
            String providerUserId,
            String nickname
    ) {
        if (provider == null || provider.isBlank() || providerUserId == null || providerUserId.isBlank()) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_SOCIAL_ACCOUNT", "소셜 계정 정보를 확인할 수 없습니다.");
        }

        // 소셜 계정 조회 또는 신규 회원 생성
        Member member = socialAccountRepository.findByProviderAndProviderUserId(provider, providerUserId)
                .map(SocialAccount::getMember)
                .orElseGet(() -> createMember(provider, providerUserId, nickname));

        // 회원 상태 확인
        member = memberRepository.findByIdForUpdate(member.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INACTIVE_MEMBER", "사용할 수 없는 회원 계정입니다."));
        if (!member.isActive()) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "INACTIVE_MEMBER", "사용할 수 없는 회원 계정입니다.");
        }

        // 로그인 토큰 발급
        String accessToken = jwtTokenService.issueAccessToken(
                member.getId(),
                member.getRole().name(),
                member.getTokenVersion()
        );
        String refreshToken = refreshTokenService.issueAndSave(member.getId()).token();
        LoginResponse.MemberInfo memberInfo = new LoginResponse.MemberInfo(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getRole()
        );

        return new LoginResponse(accessToken, memberInfo, refreshToken);
    }

    // 소셜 계정과 회원 생성
    private Member createMember(
            String provider,
            String providerUserId,
            String nickname
    ) {
        String name = nickname == null || nickname.isBlank() ? "소셜 회원" : nickname.trim();
        if (name.length() > 100) {
            name = name.substring(0, 100);
        }

        Member member = memberRepository.save(
                Member.builder()
                        .email(null)
                        .password(null)
                        .name(name)
                        .phone(null)
                        .birthYear(null)
                        .gender(null)
                        .build()
        );
        socialAccountRepository.save(
                SocialAccount.builder()
                        .member(member)
                        .provider(provider)
                        .providerUserId(providerUserId)
                        .build()
        );

        return member;
    }
}
