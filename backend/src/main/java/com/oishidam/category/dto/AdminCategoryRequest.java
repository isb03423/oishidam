package com.oishidam.category.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminCategoryRequest(
        Long parentId,
        @NotBlank @Size(max = 100) String name,
        @NotNull @Min(0) Integer sortOrder,
        @NotNull Boolean isActive
) {
}
