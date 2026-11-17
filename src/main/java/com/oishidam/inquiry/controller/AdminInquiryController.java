package com.oishidam.inquiry.controller;

import com.oishidam.common.dto.ApiResponse;
import com.oishidam.inquiry.dto.*;
import com.oishidam.inquiry.service.InquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@Tag(name = "관리자 - 문의", description = "문의 조회 및 비공개 답변 관리")
@RestController
@RequestMapping("/api/admin/inquiries")
@RequiredArgsConstructor
public class AdminInquiryController {
    private final InquiryService service;

    @Operation(summary = "문의 목록 조회")
    @GetMapping
    public ApiResponse<Page<InquirySummaryResponse>> list(
            @RequestParam(required = false) String keyword, @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.adminList(keyword, status, page, size));
    }

    @Operation(summary = "문의 상세 조회")
    @GetMapping("/{inquiryId}")
    public ApiResponse<InquiryDetailResponse> detail(@PathVariable Long inquiryId) {
        return ApiResponse.ok(service.detail(inquiryId, null, true));
    }

    @Operation(summary = "문의 답변 작성")
    @PostMapping("/{inquiryId}/messages")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<InquiryMessageResponse> message(@AuthenticationPrincipal Jwt jwt, @PathVariable Long inquiryId, @Valid @RequestBody InquiryMessageRequest request) {
        return ApiResponse.ok(service.answer(inquiryId, Long.valueOf(jwt.getSubject()), request));
    }

}
