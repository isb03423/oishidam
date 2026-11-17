package com.oishidam.member.service;

import com.oishidam.auth.repository.AuthRefreshTokenRepository;
import com.oishidam.auth.validation.PasswordPolicy;
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

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final AuthRefreshTokenRepository refreshTokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final Clock clock;

    // 회원 정보 조회
    @Transactional(readOnly = true)
    public MemberResponse getProfile(Long memberId) {
        return MemberResponse.from(activeMember(memberId));
    }

    /**
     * 회원 정보 수정
     * 요청에서 생략한 항목은 유지하며, 선택 항목에 명시한 null은 해당 값을 지운다.
     */
    @Transactional
    public MemberResponse updateProfile(Long memberId, UpdateMemberRequest request) {
        Member member = activeMember(memberId);
        member.updateProfile(
                request.isNamePresent() ? request.getName().trim() : member.getName(),
                request.isPhonePresent() ? request.getPhone() : member.getPhone(),
                request.isBirthYearPresent() ? request.getBirthYear() : member.getBirthYear(),
                request.isGenderPresent() ? request.getGender() : member.getGender()
        );
        return MemberResponse.from(member);
    }

    // 비밀번호 변경
    @Transactional
    public void changePassword(Long memberId, ChangePasswordRequest request) {
        Member member = memberRepository.findByIdForUpdate(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));

        // 현재 비밀번호 확인
        if (member.getPassword() == null || !passwordEncoder.matches(request.currentPassword(), member.getPassword())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PASSWORD", "현재 비밀번호가 올바르지 않습니다.");
        }

        // 새 비밀번호 검증 및 기존 토큰 폐기
        PasswordPolicy.validate(request.newPassword());
        member.changePassword(passwordEncoder.encode(request.newPassword()));
        refreshTokenRepository.revokeAllForMember(memberId, LocalDateTime.now(clock));
    }

    // 회원 탈퇴
    @Transactional
    public void withdraw(Long memberId) {
        Member member = activeMember(memberId);
        member.deactivate();
        refreshTokenRepository.revokeAllForMember(memberId, LocalDateTime.now(clock));
    }

    // 활성 회원 조회
    private Member activeMember(Long memberId) {
        return memberRepository.findById(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }
}
