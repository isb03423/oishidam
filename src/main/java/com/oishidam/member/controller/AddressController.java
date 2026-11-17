package com.oishidam.member.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.member.dto.AddressRequest;
import com.oishidam.member.dto.AddressResponse;
import com.oishidam.member.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "배송지", description = "회원 배송지 관리")
@RestController
@RequestMapping("/api/members/me/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @Operation(summary = "배송지 목록 조회")
    @GetMapping
    public ApiResponse<List<AddressResponse>> list(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(jwt.getSubject());
        List<AddressResponse> result = addressService.list(memberId);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "배송지 상세 조회")
    @GetMapping("/{addressId}")
    public ApiResponse<AddressResponse> detail(@AuthenticationPrincipal Jwt jwt, @PathVariable Long addressId) {
        Long memberId = Long.valueOf(jwt.getSubject());
        return ApiResponse.ok(addressService.detail(memberId, addressId));
    }

    @Operation(summary = "기본 배송지 설정")
    @PatchMapping("/{addressId}/default")
    public ApiResponse<AddressResponse> setDefault(@AuthenticationPrincipal Jwt jwt, @PathVariable Long addressId) {
        Long memberId = Long.valueOf(jwt.getSubject());
        return ApiResponse.ok(addressService.setDefault(memberId, addressId));
    }

    @Operation(summary = "배송지 등록")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AddressResponse> create(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody AddressRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        AddressResponse result = addressService.create(memberId, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "배송지 수정")
    @PatchMapping("/{addressId}")
    public ApiResponse<AddressResponse> update(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long addressId,
            @Valid @RequestBody AddressRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        AddressResponse result = addressService.update(memberId, addressId, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "배송지 삭제")
    @DeleteMapping("/{addressId}")
    public ApiResponse<Void> delete(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long addressId
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        addressService.delete(memberId, addressId);
        return ApiResponse.ok(null);
    }
}
