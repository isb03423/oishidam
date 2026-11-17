package com.oishidam.admin.order.controller;

import com.oishidam.admin.order.dto.AdminOrderDetailResponse;
import com.oishidam.admin.order.dto.AdminOrderStatusRequest;
import com.oishidam.admin.order.dto.AdminOrderSummaryResponse;
import com.oishidam.admin.order.service.AdminOrderService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Tag(name = "관리자 - 주문", description = "관리자 주문 조회 및 상태 관리")
@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {
    private final AdminOrderService service;

    @Operation(summary = "주문 목록 조회")
    @GetMapping
    public ApiResponse<Page<AdminOrderSummaryResponse>> list(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderStatus,
            @RequestParam(required = false) LocalDate from,
            @RequestParam(required = false) LocalDate to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.list(keyword, orderStatus, from, to, page, size));
    }

    @Operation(summary = "주문 상세 조회")
    @GetMapping("/{orderId}")
    public ApiResponse<AdminOrderDetailResponse> detail(@PathVariable Long orderId) {
        return ApiResponse.ok(service.detail(orderId));
    }

    @Operation(summary = "주문 상태 변경")
    @PatchMapping("/{orderId}/status")
    public ApiResponse<AdminOrderSummaryResponse> updateStatus(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long orderId,
            @Valid @RequestBody AdminOrderStatusRequest request
    ) {
        return ApiResponse.ok(service.updateStatus(Long.valueOf(jwt.getSubject()), orderId, request));
    }
}
