package com.oishidam.order.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.order.dto.*;
import com.oishidam.order.service.OrderCancellationService;
import com.oishidam.order.service.OrderQueryService;
import com.oishidam.order.service.OrderQuoteService;
import com.oishidam.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

@Tag(name = "주문", description = "주문 조회, 생성 및 취소")
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderQuoteService orderQuoteService;

    private final OrderService orderService;

    private final OrderQueryService orderQueryService;

    private final OrderCancellationService cancellationService;

    @Operation(summary = "주문 취소")
    @PostMapping("/{orderId}/cancel")
    public ApiResponse<OrderCancelResponse> cancel(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long orderId,
            @Valid @RequestBody OrderCancelRequest request
    ) {
        return ApiResponse.ok(cancellationService.cancel(Long.valueOf(jwt.getSubject()), orderId, request));
    }

    @Operation(summary = "주문 목록 조회")
    @GetMapping
    public ApiResponse<Page<OrderSummaryResponse>> list(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "false") boolean excludePending,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(orderQueryService.list(Long.valueOf(jwt.getSubject()), status, from, keyword, excludePending, page, size));
    }

    @Operation(summary = "주문 상세 조회")
    @GetMapping("/{orderId}")
    public ApiResponse<OrderDetailResponse> detail(@AuthenticationPrincipal Jwt jwt, @PathVariable Long orderId) {
        return ApiResponse.ok(orderQueryService.detail(Long.valueOf(jwt.getSubject()), orderId));
    }

    @Operation(summary = "주문 생성")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrderCreateResponse> create(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody OrderCreateRequest request
    ) {
        return ApiResponse.ok(orderService.create(Long.valueOf(jwt.getSubject()), request));
    }

    @Operation(summary = "주문 예상 금액 조회")
    @PostMapping("/quote")
    public ApiResponse<OrderQuoteResponse> quote(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody OrderQuoteRequest request
    ) {
        return ApiResponse.ok(orderQuoteService.quote(Long.valueOf(jwt.getSubject()), request));
    }
}
