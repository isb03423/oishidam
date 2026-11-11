package com.oishidam.category.service;

import com.oishidam.category.dto.CategoryResponse;
import com.oishidam.category.entity.Category;
import com.oishidam.category.repository.CategoryRepository;
import com.oishidam.common.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> list() {
        return visibleCategories().stream().map(CategoryResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<Long> categoryIds(Long categoryId) {
        List<Category> categories = visibleCategories();
        if (categoryId == null) {
            return categories.stream().map(Category::getId).toList();
        }
        Set<Long> ids = new HashSet<>();
        ids.add(categoryId);
        if (categories.stream().noneMatch(category -> category.getId().equals(categoryId))) {
            throw new ApiException(HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND", "카테고리를 찾을 수 없습니다.");
        }
        boolean changed;
        do {
            changed = false;
            for (Category category : categories) {
                if (category.getParent() != null && ids.contains(category.getParent().getId())) {
                    changed |= ids.add(category.getId());
                }
            }
        } while (changed);
        return new ArrayList<>(ids);
    }

    private List<Category> visibleCategories() {
        List<Category> categories = categoryRepository.findAllByIsActiveTrueOrderBySortOrderAscIdAsc();
        Map<Long, List<Category>> children = new HashMap<>();
        ArrayDeque<Category> queue = new ArrayDeque<>();
        for (Category category : categories) {
            if (category.getParent() == null) {
                queue.add(category);
            } else {
                children.computeIfAbsent(category.getParent().getId(), key -> new ArrayList<>()).add(category);
            }
        }
        Set<Long> visible = new HashSet<>();
        while (!queue.isEmpty()) {
            Category category = queue.removeFirst();
            if (visible.add(category.getId())) {
                queue.addAll(children.getOrDefault(category.getId(), List.of()));
            }
        }
        return categories.stream().filter(category -> visible.contains(category.getId())).toList();
    }
}
