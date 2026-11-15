package com.oishidam.auth.service;

import com.oishidam.auth.dto.LoginRequest;
import com.oishidam.auth.dto.LoginResponse;
import com.oishidam.auth.dto.SignupRequest;
import com.oishidam.auth.dto.SignupResponse;
import com.oishidam.auth.validation.PasswordPolicy;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenService jwtTokenService;

    private final RefreshTokenService refreshTokenService;

    // 회원 가입
    @Transactional
    public SignupResponse signup(SignupRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);

        // 1. 비밀번호 확인 및 정책 검증
        if (!request.password().equals(request.passwordConfirm())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "PASSWORD_MISMATCH", "비밀번호가 일치하지 않습니다.");
        }

        PasswordPolicy.validate(request.password());

        // 2. 이메일 중복 확인
        if (memberRepository.existsByEmail(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS", "이미 사용 중인 이메일입니다.");
        }

        // 3. 회원 생성 및 저장
        Member member = Member.builder()
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .name(request.name())
                .phone(request.phone())
                .birthYear(request.birthYear())
                .gender(request.gender())
                .build();

        try {
            memberRepository.saveAndFlush(member);
        } catch (DataIntegrityViolationException e) {
            throw new ApiException(HttpStatus.CONFLICT, "DATA_CONFLICT", "회원 정보를 저장할 수 없습니다. 입력 정보를 확인해 주세요.");
        }

        return new SignupResponse(member.getId(), member.getEmail(), member.getName(), member.getRole());
    }

    // 로그인
    @Transactional
    public LoginResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);

        // 1. 이메일로 회원 조회
        Member member = memberRepository.findByEmailForUpdate(email)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.UNAUTHORIZED,
                        "INVALID_CREDENTIALS",
                        "이메일 또는 비밀번호가 올바르지 않습니다."
                ));

        // 2. 계정 상태와 비밀번호 확인
        if (!member.isActive() || member.getPassword() == null
                || !passwordEncoder.matches(request.password(), member.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // 3. 로그인 토큰 발급
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
}
