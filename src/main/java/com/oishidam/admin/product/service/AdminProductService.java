package com.oishidam.admin.product.service;

import com.oishidam.admin.product.dto.*;
import com.oishidam.category.entity.Category;
import com.oishidam.category.repository.CategoryRepository;
import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.ProductImage;
import com.oishidam.product.enums.SaleStatus;
import com.oishidam.product.repository.ProductImageRepository;
import com.oishidam.product.repository.ProductRepository;
import com.oishidam.product.repository.StockHistoryRepository;
import com.oishidam.product.service.StockHistoryService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminProductService {
    private final ProductRepository productRepository;

    private final ProductImageRepository imageRepository;

    private final CategoryRepository categoryRepository;

    private final CategoryService categoryService;

    private final Clock clock;

    private final StockHistoryRepository stockHistories;

    private final StockHistoryService stockHistory;

    private final MemberRepository members;

    // 관리자: 상품 목록
    @Transactional(readOnly = true)
    public Page<AdminProductResponse> list(int page, int size, String keyword, SaleStatus saleStatus,
                                          Long categoryId, String stockComparison, Integer stockQuantity) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }

        // 페이징 정보
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        if (keyword != null && keyword.length() > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_KEYWORD", "검색어는 100자 이하여야 합니다.");
        }
        String search = keyword == null ? "" : keyword.trim().toLowerCase(java.util.Locale.ROOT)
                .replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
        if ((stockQuantity == null) != (stockComparison == null)
                || stockQuantity != null && (stockQuantity < 0 || !List.of("GT", "LT", "EQ").contains(stockComparison))) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_STOCK_FILTER", "재고 수량과 비교 조건을 함께 확인해 주세요.");
        }
        var categoryIds = categoryId == null ? null : adminCategoryIds(categoryId);
        Specification<Product> filter = (root, query, cb) -> {
            List<Predicate> conditions = new ArrayList<>();
            conditions.add(cb.isNull(root.get("deletedAt")));
            if (!search.isEmpty()) {
                conditions.add(cb.like(cb.lower(root.get("name")), "%" + search + "%", '\\'));
            }
            if (saleStatus != null) conditions.add(cb.equal(root.get("saleStatus"), saleStatus));
            if (categoryIds != null) conditions.add(root.get("category").get("id").in(categoryIds));
            if (stockQuantity != null) {
                conditions.add(switch (stockComparison) {
                    case "GT" -> cb.greaterThan(root.get("stockQuantity"), stockQuantity);
                    case "LT" -> cb.lessThan(root.get("stockQuantity"), stockQuantity);
                    default -> cb.equal(root.get("stockQuantity"), stockQuantity);
                });
            }
            return cb.and(conditions.toArray(Predicate[]::new));
        };
        return productRepository.findAll(filter, pageable).map(AdminProductResponse::from);
    }

    // 숨김 카테고리도 포함해 선택한 분류와 하위 분류를 조회한다.
    private List<Long> adminCategoryIds(Long categoryId) {
        var categories = categoryRepository.findAll();
        if (categories.stream().noneMatch(category -> category.getId().equals(categoryId))) {
            throw new ApiException(HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND", "카테고리를 찾을 수 없습니다.");
        }
        var ids = new HashSet<Long>();
        ids.add(categoryId);
        boolean changed;
        do {
            changed = false;
            for (var category : categories) {
                if (category.getParent() != null && ids.contains(category.getParent().getId())) {
                    changed |= ids.add(category.getId());
                }
            }
        } while (changed);
        return new ArrayList<>(ids);
    }

    // 관리자: 상품 상세
    @Transactional(readOnly = true)
    public AdminProductDetailResponse detail(Long productId) {
        // 상품 조회
        Product product = productRepository.findByIdAndDeletedAtIsNull(productId).orElseThrow(this::productNotFound);

        // 상품 이미지 조회
        List<AdminImageResponse> images = imageRepository.findByProductIdInOrderBySortOrderAscIdAsc(List.of(productId))
                .stream().map(AdminImageResponse::from).toList();

        return new AdminProductDetailResponse(AdminProductResponse.from(product), images);
    }

    // 관리자: 상품 등록
    @Transactional
    public AdminProductDetailResponse create(AdminProductRequest request, Long actorId) {
        // 카테고리 확인 및 상품 정보 준비
        AdminProductRequest info = request;
        Category category = findCategory(info.categoryId());

        Product product = productRepository.save(
                Product.builder()
                        .category(category)
                        .name(info.name().trim())
                        .description(info.description().trim())
                        .price(info.price())
                        .stockQuantity(info.stockQuantity())
                        .saleStatus(SaleStatus.DRAFT)
                        .build()
        );

        stockHistory.record(product, 0, "INITIAL", null, actorId);

        return new AdminProductDetailResponse(AdminProductResponse.from(product), List.of());
    }

    // 관리자: 상품 수정
    @Transactional
    public AdminProductResponse update(Long productId, AdminProductRequest request, Long actorId) {
        Product product = lockProduct(productId);
        Category category = findCategory(request.categoryId());

        // 판매 중인지 확인
        if (product.getSaleStatus() == SaleStatus.ON_SALE) {
            categoryService.categoryIds(category.getId());
        }

        int previous = product.getStockQuantity();
        if (request.expectedStockQuantity() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "EXPECTED_STOCK_REQUIRED", "변경 전 재고 수량이 필요합니다.");
        }
        validateStockVersion(previous, request.expectedStockQuantity());
        product.update(category, request.name().trim(), request.description(), request.price(), request.stockQuantity());
        if (previous != product.getStockQuantity()) {
            stockHistory.record(product, previous, "ADJUSTMENT", null, actorId);
        }
        return AdminProductResponse.from(product);
    }

    // 관리자: 상품별 재고 이력 조회
    @Transactional(readOnly = true)
    public Page<StockHistoryResponse> stockHistory(Long productId, int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        if (!productRepository.existsById(productId)) {
            throw productNotFound();
        }
        var result = stockHistories.findByProductIdOrderByIdDesc(productId, PageRequest.of(page, size));

        // 현재 페이지의 처리자 이름을 한 번에 조회한다.
        var actorIds = result.stream().map(history -> history.getActorId()).filter(Objects::nonNull).distinct().toList();
        var names = members.findAllById(actorIds).stream().collect(Collectors.toMap(Member::getId, Member::getName));
        return result.map(history -> StockHistoryResponse.from(history, names.get(history.getActorId())));
    }

    // 관리자: 상품 재고 수량 변경
    @Transactional
    public AdminProductResponse updateStock(Long productId, int quantity, int expectedQuantity, Long actorId) {
        Product product = lockProduct(productId);
        int previous = product.getStockQuantity();
        validateStockVersion(previous, expectedQuantity);
        product.changeStock(quantity);
        if (previous != quantity) {
            stockHistory.record(product, previous, "ADJUSTMENT", null, actorId);
        }
        return AdminProductResponse.from(product);
    }

    // 조회 후 재고가 변경됐으면 재확인을 요구한다.
    private void validateStockVersion(int current, int expected) {
        if (current != expected) {
            throw new ApiException(HttpStatus.CONFLICT, "STOCK_CHANGED", "재고가 변경되었습니다. 다시 확인해 주세요.");
        }
    }

    // 관리자: 상품 판매 상태 변경
    @Transactional
    public AdminProductResponse changeStatus(Long productId, SaleStatus status) {
        Product product = lockProduct(productId);

        // 판매 가능 조건 확인 및 최초 게시 시각 설정
        LocalDateTime publishedAt = product.getPublishedAt();
        if (status == SaleStatus.ON_SALE) {
            categoryService.categoryIds(product.getCategory().getId());
            if (publishedAt == null) {
                publishedAt = LocalDateTime.now(clock);
            }
        }
        product.changeStatus(status, publishedAt);
        return AdminProductResponse.from(product);
    }

    // 관리자: 상품 삭제
    @Transactional
    public void delete(Long productId) {
        lockProduct(productId).delete(LocalDateTime.now(clock));
    }

    // 관리자: 상품 이미지 등록
    @Transactional
    public AdminImageResponse createImage(Long productId, AdminImageRequest request) {
        Product product = lockProduct(productId);

        var existing = imageRepository.findByProductIdInOrderByIsPrimaryDescSortOrderAscIdAsc(List.of(productId));
        ProductImage image = existing.isEmpty()
                ? ProductImage.builder().product(product).sortOrder(0).isPrimary(true).build()
                : existing.getFirst();
        image.update(request.storageKey().trim(), request.altText() == null ? null : request.altText().trim(), 0, true);
        imageRepository.save(image);
        imageRepository.deleteAll(existing.stream().filter(item -> item != image).toList());

        return AdminImageResponse.from(image);
    }

    // 관리자: 상품 이미지 수정
    @Transactional
    public AdminImageResponse updateImage(
            Long productId,
            Long imageId,
            AdminImageRequest request
    ) {
        lockProduct(productId);
        ProductImage image = findImage(productId, imageId);
        var existing = imageRepository.findByProductIdInOrderBySortOrderAscIdAsc(List.of(productId));
        imageRepository.deleteAll(existing.stream().filter(item -> !item.getId().equals(imageId)).toList());
        imageRepository.flush();
        image.update(request.storageKey().trim(), request.altText(), 0, true);
        return AdminImageResponse.from(image);
    }

    // 관리자: 상품 이미지 삭제
    @Transactional
    public void deleteImage(Long productId, Long imageId) {
        lockProduct(productId);
        imageRepository.delete(findImage(productId, imageId));
    }

    // 상품의 이미지 조회
    private ProductImage findImage(Long productId, Long imageId) {
        return imageRepository.findByIdAndProductId(imageId, productId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "IMAGE_NOT_FOUND", "상품 이미지를 찾을 수 없습니다."));
    }

    // 상품 카테고리 조회
    private Category findCategory(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND", "카테고리를 찾을 수 없습니다."));
    }

    // 상품 조회 및 잠금
    private Product lockProduct(Long productId) {
        return productRepository.findByIdForUpdate(productId).orElseThrow(this::productNotFound);
    }

    // 상품을 찾을 수 없을 때 반환할 오류 생성
    private ApiException productNotFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.");
    }
}
