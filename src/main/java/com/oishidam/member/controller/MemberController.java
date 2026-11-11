package com.oishidam.member.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.member.dto.ChangePasswordRequest;
import com.oishidam.member.dto.MemberResponse;
import com.oishidam.member.dto.UpdateMemberRequest;
import com.oishidam.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members/me")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ApiResponse<MemberResponse> getProfile(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(jwt.getSubject());
        MemberResponse result = memberService.getProfile(memberId);
        return ApiResponse.ok(result);
    }

    @PutMapping
    public ApiResponse<MemberResponse> updateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateMemberRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        MemberResponse result = memberService.updateProfile(memberId, request);
        return ApiResponse.ok(result);
    }

    @PutMapping("/password")
    public ApiResponse<Void> changePassword(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        memberService.changePassword(memberId, request);
        return ApiResponse.ok(null);
    }

    @DeleteMapping
    public ApiResponse<Void> withdraw(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(jwt.getSubject());
        memberService.withdraw(memberId);
        return ApiResponse.ok(null);
    }
}
