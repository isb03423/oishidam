package com.oishidam.category.dto;

import com.oishidam.category.entity.Category;

public record AdminCategoryResponse(
        Long categoryId,
        Long parentId,
        String name,
        int sortOrder,
        boolean isActive
) {
    public static AdminCategoryResponse from(Category category) {
        return new AdminCategoryResponse(
                category.getId(),
                category.getParent() == null ? null : category.getParent().getId(),
                category.getName(),
                category.getSortOrder(),
                category.isActive());
    }
}
