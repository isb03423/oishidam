package com.oishidam.cart.controller;

import com.oishidam.cart.dto.CartItemRequest;
import com.oishidam.cart.dto.CartItemResponse;
import com.oishidam.cart.dto.CartQuantityRequest;
import com.oishidam.cart.service.CartService;
import com.oishidam.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart/items")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ApiResponse<List<CartItemResponse>> list(@AuthenticationPrincipal Jwt jwt) {
        Long memberId = Long.valueOf(jwt.getSubject());
        List<CartItemResponse> result = cartService.list(memberId);
        return ApiResponse.ok(result);
    }

    @PostMapping
    public ApiResponse<CartItemResponse> add(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody CartItemRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        CartItemResponse result = cartService.add(memberId, request);
        return ApiResponse.ok(result);
    }

    @PutMapping("/{itemId}")
    public ApiResponse<CartItemResponse> update(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long itemId,
            @Valid @RequestBody CartQuantityRequest request
    ) {
        Long memberId = Long.valueOf(jwt.getSubject());
        CartItemResponse result = cartService.update(memberId, itemId, request.quantity());
        return ApiResponse.ok(result);
    }

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
