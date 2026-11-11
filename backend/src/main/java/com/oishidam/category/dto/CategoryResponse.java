package com.oishidam.category.dto;

import com.oishidam.category.entity.Category;

public record CategoryResponse(
        Long categoryId,
        Long parentId,
        String name,
        int sortOrder
) {
    public static CategoryResponse from(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getParent() == null ? null : category.getParent().getId(),
                category.getName(),
                category.getSortOrder());
    }
}
