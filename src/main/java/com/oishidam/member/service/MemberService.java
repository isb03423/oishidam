package com.oishidam.member.service;

import com.oishidam.auth.repository.AuthRefreshTokenRepository;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.dto.ChangePasswordRequest;
import com.oishidam.member.dto.MemberResponse;
import com.oishidam.member.dto.UpdateMemberRequest;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final AuthRefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final Clock clock;

    @Transactional(readOnly = true)
    public MemberResponse getProfile(Long memberId) {
        return MemberResponse.from(activeMember(memberId));
    }

    @Transactional
    public MemberResponse updateProfile(Long memberId, UpdateMemberRequest request) {
        Member member = activeMember(memberId);
        member.updateProfile(request.name().trim(), request.phone(), request.birthYear(), request.gender());
        return MemberResponse.from(member);
    }

    @Transactional
    public void changePassword(Long memberId, ChangePasswordRequest request) {
        Member member = memberRepository.findByIdForUpdate(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
        if (member.getPassword() == null || !passwordEncoder.matches(request.currentPassword(), member.getPassword())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PASSWORD", "현재 비밀번호가 올바르지 않습니다.");
        }
        if (request.newPassword().getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PASSWORD", "비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.");
        }
        member.changePassword(passwordEncoder.encode(request.newPassword()));
        refreshTokenRepository.revokeAllForMember(memberId, LocalDateTime.now(clock));
    }

    @Transactional
    public void withdraw(Long memberId) {
        Member member = activeMember(memberId);
        member.deactivate();
        refreshTokenRepository.revokeAllForMember(memberId, LocalDateTime.now(clock));
    }

    private Member activeMember(Long memberId) {
        return memberRepository.findById(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }
}
