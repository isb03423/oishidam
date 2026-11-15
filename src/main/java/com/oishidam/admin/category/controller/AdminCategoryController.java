package com.oishidam.admin.category.controller;

import com.oishidam.admin.category.dto.AdminCategoryRequest;
import com.oishidam.admin.category.dto.AdminCategoryResponse;
import com.oishidam.admin.category.service.AdminCategoryService;
import com.oishidam.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "관리자 - 카테고리", description = "관리자 카테고리 관리")
@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class AdminCategoryController {
    private final AdminCategoryService categoryService;

    @Operation(summary = "카테고리 목록 조회")
    @GetMapping
    public ApiResponse<List<AdminCategoryResponse>> list() {
        List<AdminCategoryResponse> result = categoryService.list();
        return ApiResponse.ok(result);
    }

    @Operation(summary = "카테고리 등록")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminCategoryResponse> create(@Valid @RequestBody AdminCategoryRequest request) {
        AdminCategoryResponse result = categoryService.create(request);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "카테고리 수정")
    @PutMapping("/{categoryId}")
    public ApiResponse<AdminCategoryResponse> update(
            @PathVariable Long categoryId,
            @Valid @RequestBody AdminCategoryRequest request
    ) {
        AdminCategoryResponse result = categoryService.update(categoryId, request);
        return ApiResponse.ok(result);
    }
    @Operation(summary = "카테고리 삭제")
    @DeleteMapping("/{categoryId}")
    public ApiResponse<Void> delete(@PathVariable Long categoryId) {
        categoryService.delete(categoryId);
        return ApiResponse.ok(null);
    }
}
