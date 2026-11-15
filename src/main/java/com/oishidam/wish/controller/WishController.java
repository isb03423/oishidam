package com.oishidam.wish.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.wish.dto.WishResponse;
import com.oishidam.wish.service.WishService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "찜", description = "찜 목록 조회 및 관리")
@RestController
@RequestMapping("/api/wishes")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class WishController {
    private final WishService wishService;

    @Operation(summary = "찜 목록 조회")
    @GetMapping
    public ApiResponse<List<WishResponse>> list(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(wishService.list(Long.valueOf(jwt.getSubject())));
    }

    @Operation(summary = "찜 추가")
    @PutMapping("/{productId}")
    public ApiResponse<Void> add(@AuthenticationPrincipal Jwt jwt, @PathVariable Long productId) {
        wishService.add(Long.valueOf(jwt.getSubject()), productId);
        return ApiResponse.ok(null);
    }

    @Operation(summary = "찜 삭제")
    @DeleteMapping("/{productId}")
    public ApiResponse<Void> remove(@AuthenticationPrincipal Jwt jwt, @PathVariable Long productId) {
        wishService.remove(Long.valueOf(jwt.getSubject()), productId);
        return ApiResponse.ok(null);
    }
}
