package com.oishidam.category.service;

import com.oishidam.category.dto.AdminCategoryRequest;
import com.oishidam.category.dto.AdminCategoryResponse;
import com.oishidam.category.entity.Category;
import com.oishidam.category.repository.CategoryRepository;
import com.oishidam.common.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AdminCategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<AdminCategoryResponse> list() {
        return categoryRepository.findAll().stream().map(AdminCategoryResponse::from).toList();
    }

    @Transactional
    public AdminCategoryResponse create(AdminCategoryRequest request) {
        List<Category> categories = categoryRepository.findAllForUpdate();
        Category parent = findParent(categories, request.parentId());
        Category category = categoryRepository.save(new Category(parent, request.name().trim(), request.sortOrder(),
                request.isActive()));
        return AdminCategoryResponse.from(category);
    }

    @Transactional
    public AdminCategoryResponse update(Long categoryId, AdminCategoryRequest request) {
        List<Category> categories = categoryRepository.findAllForUpdate();
        Category category = findRequired(categories, categoryId);
        Category parent = findParent(categories, request.parentId());
        Set<Long> visited = new HashSet<>();
        for (Category current = parent; current != null; current = current.getParent()) {
            if (current.getId().equals(categoryId) || !visited.add(current.getId())) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "CATEGORY_CYCLE", "카테고리를 자신의 하위 카테고리로 이동할 수 없습니다.");
            }
        }
        category.update(parent, request.name().trim(), request.sortOrder(), request.isActive());
        return AdminCategoryResponse.from(category);
    }

    private Category findParent(List<Category> categories, Long parentId) {
        return parentId == null ? null : findRequired(categories, parentId);
    }

    private Category findRequired(List<Category> categories, Long categoryId) {
        return categories.stream().filter(category -> category.getId().equals(categoryId)).findFirst()
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND", "카테고리를 찾을 수 없습니다."));
    }
}
