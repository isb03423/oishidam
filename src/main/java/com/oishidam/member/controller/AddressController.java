package com.oishidam.member.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.member.dto.AddressRequest;
import com.oishidam.member.dto.AddressResponse;
import com.oishidam.member.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members/me/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @GetMapping
    public ApiResponse<List<AddressResponse>> list(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(jwt.getSubject());
        List<AddressResponse> result = addressService.list(memberId);
        return ApiResponse.ok(result);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AddressResponse>> create(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody AddressRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        AddressResponse result = addressService.create(memberId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result));
    }

    @PutMapping("/{addressId}")
    public ApiResponse<AddressResponse> update(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long addressId,
            @Valid @RequestBody AddressRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        AddressResponse result = addressService.update(memberId, addressId, request);
        return ApiResponse.ok(result);
    }

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
