package com.oishidam.category.controller;

import com.oishidam.category.dto.CategoryResponse;
import com.oishidam.category.service.CategoryService;
import com.oishidam.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> list() {
        List<CategoryResponse> result = categoryService.list();
        return ApiResponse.ok(result);
    }
}
