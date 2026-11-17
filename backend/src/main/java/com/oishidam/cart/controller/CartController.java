package com.oishidam.cart.controller;

import com.oishidam.cart.dto.CartItemRequest;
import com.oishidam.cart.dto.CartItemResponse;
import com.oishidam.cart.dto.CartQuantityRequest;
import com.oishidam.cart.service.CartService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Tag(name = "장바구니", description = "장바구니 상품 조회 및 관리")
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @Operation(summary = "장바구니 목록 조회")
    @GetMapping
    public ApiResponse<List<CartItemResponse>> list(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(Objects.requireNonNull(jwt.getSubject()));
        List<CartItemResponse> result = cartService.list(memberId);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "장바구니 상품 추가")
    @PostMapping
    public ApiResponse<CartItemResponse> add(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody CartItemRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        CartItemResponse result = cartService.add(memberId, request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "장바구니 수량 변경")
    @PatchMapping("/{itemId}")
    public ApiResponse<CartItemResponse> update(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long itemId,
            @Valid @RequestBody CartQuantityRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        CartItemResponse result = cartService.update(memberId, itemId, request.quantity());
        return ApiResponse.ok(result);
    }

    @Operation(summary = "장바구니 상품 삭제")
    @DeleteMapping("/{itemId}")
    public ApiResponse<Void> delete(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long itemId
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        cartService.delete(memberId, itemId);
        return ApiResponse.ok(null);
    }
}
