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

@Tag(name = "문의", description = "문의 제목 조회 및 비공개 문의·답변")
@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {
    private final InquiryService service;

    @Operation(summary = "공개 문의 제목 목록")
    @GetMapping
    public ApiResponse<Page<InquiryPublicResponse>> list(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(service.publicList(page, size));
    }

    @Operation(summary = "내 문의 목록")
    @GetMapping("/mine")
    public ApiResponse<Page<InquirySummaryResponse>> mine(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.myList(Long.valueOf(jwt.getSubject()), status, page, size));
    }

    @Operation(summary = "문의 작성")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<InquirySummaryResponse> create(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody InquiryCreateRequest request) {
        return ApiResponse.ok(service.create(Long.valueOf(jwt.getSubject()), request));
    }

    @Operation(summary = "내 문의 상세 조회")
    @GetMapping("/{inquiryId}")
    public ApiResponse<InquiryDetailResponse> detail(@AuthenticationPrincipal Jwt jwt, @PathVariable Long inquiryId) {
        return ApiResponse.ok(service.detail(inquiryId, Long.valueOf(jwt.getSubject()), false));
    }

    @Operation(summary = "내 문의 삭제", description = "관리자 답변이 없는 문의만 삭제할 수 있습니다.")
    @DeleteMapping("/{inquiryId}")
    public ApiResponse<Void> delete(@AuthenticationPrincipal Jwt jwt, @PathVariable Long inquiryId) {
        service.delete(inquiryId, Long.valueOf(jwt.getSubject()));
        return ApiResponse.ok(null);
    }

}
