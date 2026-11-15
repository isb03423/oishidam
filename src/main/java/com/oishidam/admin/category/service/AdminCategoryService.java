package com.oishidam.admin.category.service;

import com.oishidam.admin.category.dto.AdminCategoryRequest;
import com.oishidam.admin.category.dto.AdminCategoryResponse;
import com.oishidam.category.entity.Category;
import com.oishidam.category.repository.CategoryRepository;
import com.oishidam.common.exception.ApiException;
import com.oishidam.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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
    private final ProductRepository productRepository;

    // 관리자: 카테고리 목록
    @Transactional(readOnly = true)
    public List<AdminCategoryResponse> list() {
        return categoryRepository.findAll().stream().map(AdminCategoryResponse::from).toList();
    }

    // 관리자: 카테고리 등록
    @Transactional
    public AdminCategoryResponse create(AdminCategoryRequest request) {
        List<Category> categories = categoryRepository.findAllForUpdate();
        Category parent = findParent(categories, request.parentId());
        Category category = categoryRepository.save(
                Category.builder()
                        .parent(parent)
                        .name(request.name().trim())
                        .sortOrder(request.sortOrder())
                        .isActive(request.isActive())
                        .build()
        );
        return AdminCategoryResponse.from(category);
    }

    // 관리자: 카테고리 수정
    @Transactional
    public AdminCategoryResponse update(Long categoryId, AdminCategoryRequest request) {
        List<Category> categories = categoryRepository.findAllForUpdate();
        Category category = findRequired(categories, categoryId);
        Category parent = findParent(categories, request.parentId());

        // 상위 카테고리 변경 시 순환 참조 확인
        Set<Long> visited = new HashSet<>();
        for (Category current = parent; current != null; current = current.getParent()) {
            if (current.getId().equals(categoryId) || !visited.add(current.getId())) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "CATEGORY_CYCLE", "카테고리를 자신의 하위 카테고리로 이동할 수 없습니다.");
            }
        }
        category.update(parent, request.name().trim(), request.sortOrder(), request.isActive());
        return AdminCategoryResponse.from(category);
    }

    // 하위 분류나 연결된 상품이 없는 카테고리만 삭제한다.
    @Transactional
    public void delete(Long categoryId) {
        List<Category> categories = categoryRepository.findAllForUpdate();
        Category category = findRequired(categories, categoryId);
        if (categories.stream().anyMatch(c -> c.getParent() != null && c.getParent().getId().equals(categoryId))
                || productRepository.existsByCategoryId(categoryId)) {
            throw new ApiException(HttpStatus.CONFLICT, "CATEGORY_IN_USE", "하위 카테고리 또는 연결된 상품이 있습니다.");
        }
        try {
            categoryRepository.delete(category);
            categoryRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new ApiException(HttpStatus.CONFLICT, "CATEGORY_IN_USE", "하위 카테고리 또는 연결된 상품이 있습니다.");
        }
    }

    // 상위 카테고리 조회
    private Category findParent(List<Category> categories, Long parentId) {
        return parentId == null ? null : findRequired(categories, parentId);
    }

    // 필수 카테고리 조회
    private Category findRequired(List<Category> categories, Long categoryId) {
        return categories.stream().filter(category -> category.getId().equals(categoryId)).findFirst()
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND", "카테고리를 찾을 수 없습니다."));
    }
}
