package com.oishidam.product.service;

import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.product.dto.ProductDetailResponse;
import com.oishidam.product.dto.ProductSummaryResponse;
import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.ProductImage;
import com.oishidam.product.entity.ProductVariant;
import com.oishidam.product.enums.SaleStatus;
import com.oishidam.product.repository.ProductImageRepository;
import com.oishidam.product.repository.ProductRepository;
import com.oishidam.product.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    private final ProductImageRepository imageRepository;

    private final ProductVariantRepository variantRepository;

    private final CategoryService categoryService;

    private final Clock clock;

    // 상품 검색 및 목록
    @Transactional(readOnly = true)
    public Page<ProductSummaryResponse> search(
            Long categoryId,
            String keyword,
            int page,
            int size,
            String sort
    ) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }

        // 정렬 및 페이징 설정
        Sort ordering = switch (sort) {
            case "latest" -> Sort.by(Sort.Order.desc("publishedAt"), Sort.Order.desc("id"));
            case "name" -> Sort.by(Sort.Order.asc("name"), Sort.Order.asc("id"));
            case "popular" -> Sort.unsorted();
            default -> throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_SORT", "지원하지 않는 정렬 방식입니다.");
        };
        Pageable pageable = PageRequest.of(page, size, ordering);
        List<Long> categoryIds = categoryService.categoryIds(categoryId);
        if (categoryIds.isEmpty()) {
            return Page.empty(pageable);
        }

        // 검색 조건에 맞는 판매 상품 조회
        String search = keyword == null || keyword.isBlank() ? null : escapeKeyword(keyword.trim());
        if (sort.equals("popular") && search != null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_SORT", "인기순 검색은 지원하지 않습니다.");
        }
        LocalDateTime now = LocalDateTime.now(clock);
        Page<Product> products = sort.equals("popular") && search == null
                ? productRepository.findPopular(SaleStatus.ON_SALE, now, categoryIds, pageable)
                : search == null
                ? productRepository.search(SaleStatus.ON_SALE, now, categoryIds, pageable)
                : productRepository.searchByKeyword(SaleStatus.ON_SALE, now, categoryIds, search, pageable);
        List<Long> productIds = products.getContent().stream().map(Product::getId).toList();
        if (productIds.isEmpty()) {
            return products.map(product -> toSummary(product, Map.of(), Map.of()));
        }

        // 대표 이미지와 옵션 최저가 조회
        Map<Long, ProductImage> images = imageRepository.findByProductIdInOrderBySortOrderAscIdAsc(productIds).stream()
                .filter(ProductImage::isPrimary)
                .collect(Collectors.toMap(
                        image -> image.getProduct().getId(),
                        Function.identity(),
                        (first, second) -> first
                ));
        Map<Long, BigDecimal> prices = variantRepository.findByProductIdInAndIsActiveTrueOrderByIdAsc(productIds)
                .stream()
                .collect(Collectors.toMap(
                        variant -> variant.getProduct().getId(),
                        ProductVariant::getPrice,
                        BigDecimal::min
                ));
        return products.map(product -> toSummary(product, images, prices));
    }

    // 상품 상세
    @Transactional(readOnly = true)
    public ProductDetailResponse detail(Long productId) {
        List<Long> categoryIds = categoryService.categoryIds(null);
        if (categoryIds.isEmpty()) {
            throw productNotFound();
        }

        // 판매 중인 상품 조회
        Product product = productRepository
                .findByIdAndSaleStatusAndDeletedAtIsNullAndPublishedAtLessThanEqualAndCategoryIdIn(
                        productId,
                        SaleStatus.ON_SALE,
                        LocalDateTime.now(clock),
                        categoryIds
                )
                .orElseThrow(this::productNotFound);

        // 상품 이미지와 활성 옵션 조회
        List<ProductDetailResponse.ImageResponse> images = imageRepository
                .findByProductIdInOrderBySortOrderAscIdAsc(List.of(productId)).stream()
                .map(image -> new ProductDetailResponse.ImageResponse(
                        image.getId(),
                        image.getStorageKey(),
                        image.getAltText(),
                        image.getSortOrder(),
                        image.isPrimary()
                ))
                .toList();
        List<ProductDetailResponse.VariantResponse> variants = variantRepository
                .findByProductIdInAndIsActiveTrueOrderByIdAsc(List.of(productId)).stream()
                .map(variant -> new ProductDetailResponse.VariantResponse(
                        variant.getId(),
                        variant.getVariantName(),
                        variant.getOptionValues(),
                        variant.getPrice(),
                        variant.getStockQuantity()
                ))
                .toList();
        return new ProductDetailResponse(
                product.getId(),
                product.getCategory().getId(),
                product.getName(),
                product.getDescription(),
                product.getBrand(),
                product.getPublishedAt(),
                images,
                variants
        );
    }

    // 상품 목록 응답 생성
    private ProductSummaryResponse toSummary(
            Product product,
            Map<Long, ProductImage> images,
            Map<Long, BigDecimal> prices
    ) {
        ProductImage image = images.get(product.getId());
        ProductSummaryResponse.ImageResponse primaryImage = image == null ? null
                : new ProductSummaryResponse.ImageResponse(image.getStorageKey(), image.getAltText());
        return new ProductSummaryResponse(
                product.getId(),
                product.getCategory().getId(),
                product.getName(),
                product.getBrand(),
                prices.get(product.getId()),
                primaryImage,
                product.getPublishedAt()
        );
    }

    // 검색어의 LIKE 특수문자 이스케이프
    private String escapeKeyword(String keyword) {
        return keyword.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
    }

    // 상품을 찾을 수 없을 때 반환할 오류 생성
    private ApiException productNotFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.");
    }
}
