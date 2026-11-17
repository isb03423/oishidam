package com.oishidam.member.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.member.dto.ChangePasswordRequest;
import com.oishidam.member.dto.MemberResponse;
import com.oishidam.member.dto.UpdateMemberRequest;
import com.oishidam.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@Tag(name = "회원", description = "회원 정보 및 계정 관리")
@RestController
@RequestMapping("/api/members/me")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @Operation(summary = "회원 정보 조회")
    @GetMapping
    public ApiResponse<MemberResponse> getProfile(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(jwt.getSubject());
        MemberResponse result = memberService.getProfile(memberId);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "회원 정보 수정")
    @PatchMapping
    public ApiResponse<MemberResponse> updateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateMemberRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        MemberResponse result = memberService.updateProfile(memberId, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "비밀번호 변경")
    @PutMapping("/password")
    public ApiResponse<Void> changePassword(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        memberService.changePassword(memberId, request);
        return ApiResponse.ok(null);
    }

    @Operation(summary = "회원 탈퇴")
    @DeleteMapping
    public ApiResponse<Void> withdraw(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(jwt.getSubject());
        memberService.withdraw(memberId);
        return ApiResponse.ok(null);
    }
}
