package com.oishidam.auth.service;

import com.oishidam.auth.dto.LoginRequest;
import com.oishidam.auth.dto.LoginResponse;
import com.oishidam.auth.dto.SignupRequest;
import com.oishidam.auth.dto.SignupResponse;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final RefreshTokenService refreshTokenService;

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);

        if (!request.password().equals(request.passwordConfirm())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "PASSWORD_MISMATCH", "비밀번호가 일치하지 않습니다.");
        }

        if (request.password().getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PASSWORD", "비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.");
        }

        if (memberRepository.existsByEmail(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS", "이미 사용 중인 이메일입니다.");
        }

        Member member = new Member(email, passwordEncoder.encode(
                request.password()),
                request.name(),
                request.phone(),
                request.birthYear(),
                request.gender()
        );

        try {
            memberRepository.saveAndFlush(member);
        } catch (DataIntegrityViolationException e) {
            throw new ApiException(HttpStatus.CONFLICT, "DATA_CONFLICT", "회원 정보를 저장할 수 없습니다. 입력 정보를 확인해 주세요.");
        }

        return new SignupResponse(member.getId(), member.getEmail(), member.getName(), member.getRole());
    }

    @Transactional
    public LoginResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        Member member = memberRepository.findByEmailForUpdate(email)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS",
                        "이메일 또는 비밀번호가 올바르지 않습니다."));

        if (!member.isActive() || member.getPassword() == null
                || !passwordEncoder.matches(request.password(), member.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        String accessToken = jwtTokenService.issueAccessToken(
                member.getId(), member.getRole().name(), member.getTokenVersion());
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
