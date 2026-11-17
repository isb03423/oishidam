package com.oishidam.admin.member;

import com.oishidam.admin.member.dto.AdminMemberStatusResponse;
import com.oishidam.auth.repository.AuthRefreshTokenRepository;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminMemberService {
    private final MemberRepository members;

    private final AuthRefreshTokenRepository refreshTokens;

    private final Clock clock;

    // 상태가 바뀌면 이전 액세스 토큰과 리프레시 토큰을 무효화한다.
    @Transactional
    public AdminMemberStatusResponse changeStatus(Long memberId, boolean active) {
        var member = members.findByIdForUpdate(memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "MEMBER_NOT_FOUND", "회원을 찾을 수 없습니다."));
        if (member.changeActive(active)) {
            refreshTokens.revokeAllForMember(memberId, LocalDateTime.now(clock));
        }
        return new AdminMemberStatusResponse(memberId, active);
    }
}
