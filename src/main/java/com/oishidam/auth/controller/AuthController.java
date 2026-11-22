package com.oishidam.auth.controller;

import com.oishidam.auth.dto.RefreshedTokens;
import com.oishidam.auth.dto.*;
import com.oishidam.auth.service.AuthService;
import com.oishidam.auth.service.EmailVerificationService;
import com.oishidam.auth.service.RefreshTokenService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@Tag(name = "인증", description = "회원가입, 로그인 및 토큰 관리")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final RefreshTokenService refreshTokenService;

    private final EmailVerificationService emailVerificationService;

    @Operation(summary = "가입 이메일 중복 확인")
    @PostMapping("/signup/email-availability")
    public ApiResponse<Void> checkSignupEmail(@Valid @RequestBody CheckSignupEmailRequest request) {
        emailVerificationService.checkSignupEmail(request.email());
        return ApiResponse.ok(null);
    }

    @Operation(summary = "이메일 인증번호 발송 요청")
    @PostMapping("/email-verifications")
    public ApiResponse<EmailVerificationWindow> sendEmailCode(@Valid @RequestBody SendEmailCodeRequest request) {
        return ApiResponse.ok(emailVerificationService.sendCode(request));
    }

    @Operation(summary = "비밀번호 재설정 인증번호 유효 시간 연장")
    @PostMapping("/email-verifications/extend")
    public ApiResponse<EmailVerificationWindow> extendEmailCode(@Valid @RequestBody ExtendEmailCodeRequest request) {
        return ApiResponse.ok(emailVerificationService.extendCode(request));
    }

    @Operation(summary = "이메일 인증번호 확인")
    @PostMapping("/email-verifications/confirm")
    public ApiResponse<EmailVerificationResponse> verifyEmailCode(@Valid @RequestBody VerifyEmailCodeRequest request) {
        return ApiResponse.ok(emailVerificationService.verifyCode(request));
    }

    @Operation(summary = "이메일 인증 후 비밀번호 재설정")
    @PostMapping("/password-reset")
    public ApiResponse<Void> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        authService.resetPassword(request);
        return ApiResponse.ok(null);
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        SignupResponse result = authService.signup(request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse result = authService.login(request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "토큰 재발급")
    @PostMapping("/refresh")
    public ApiResponse<RefreshResponse> refresh(@Valid @RequestBody RefreshRequest request) {
        RefreshedTokens tokens = refreshTokenService.refresh(request.refreshToken());

        RefreshResponse result = new RefreshResponse(tokens.accessToken(), tokens.refreshToken());
        return ApiResponse.ok(result);
    }

    @Operation(summary = "로그아웃")
    @PostMapping("/logout")
    public ApiResponse<Void> logout(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody LogoutRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        refreshTokenService.revokeForMember(memberId, request.refreshToken(), jwt);
        return ApiResponse.ok(null);
    }
}
