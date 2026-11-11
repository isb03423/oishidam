package com.oishidam.category.controller;

import com.oishidam.category.dto.AdminCategoryRequest;
import com.oishidam.category.dto.AdminCategoryResponse;
import com.oishidam.category.service.AdminCategoryService;
import com.oishidam.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class AdminCategoryController {
    private final AdminCategoryService categoryService;

    @GetMapping
    public ApiResponse<List<AdminCategoryResponse>> list() {
        List<AdminCategoryResponse> result = categoryService.list();
        return ApiResponse.ok(result);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AdminCategoryResponse>> create(@Valid @RequestBody AdminCategoryRequest request) {
        AdminCategoryResponse result = categoryService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result));
    }

    @PutMapping("/{categoryId}")
    public ApiResponse<AdminCategoryResponse> update(
            @PathVariable Long categoryId,
            @Valid @RequestBody AdminCategoryRequest request
    ) {
        AdminCategoryResponse result = categoryService.update(categoryId, request);
        return ApiResponse.ok(result);
    }
}
