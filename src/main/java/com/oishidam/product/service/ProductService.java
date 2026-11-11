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

    @Transactional(readOnly = true)
    public Page<ProductSummaryResponse> search(Long categoryId, String keyword, int page, int size, String sort) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        Sort ordering = switch (sort) {
            case "latest" -> Sort.by(Sort.Order.desc("publishedAt"), Sort.Order.desc("id"));
            case "name" -> Sort.by(Sort.Order.asc("name"), Sort.Order.asc("id"));
            default -> throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_SORT", "지원하지 않는 정렬 방식입니다.");
        };
        Pageable pageable = PageRequest.of(page, size, ordering);
        List<Long> categoryIds = categoryService.categoryIds(categoryId);
        if (categoryIds.isEmpty()) {
            return Page.empty(pageable);
        }
        String search = keyword == null || keyword.isBlank() ? null : escapeKeyword(keyword.trim());
        LocalDateTime now = LocalDateTime.now(clock);
        Page<Product> products = search == null
                ? productRepository.search(SaleStatus.ON_SALE, now, categoryIds, pageable)
                : productRepository.searchByKeyword(SaleStatus.ON_SALE, now, categoryIds, search, pageable);
        List<Long> productIds = products.getContent().stream().map(Product::getId).toList();
        if (productIds.isEmpty()) {
            return products.map(product -> toSummary(product, Map.of(), Map.of()));
        }
        Map<Long, ProductImage> images = imageRepository.findByProductIdInOrderBySortOrderAscIdAsc(productIds).stream()
                .filter(ProductImage::isPrimary)
                .collect(Collectors.toMap(
                        image -> image.getProduct().getId(), Function.identity(), (first, second) -> first));
        Map<Long, BigDecimal> prices = variantRepository.findByProductIdInAndIsActiveTrueOrderByIdAsc(productIds)
                .stream()
                .collect(Collectors.toMap(variant -> variant.getProduct().getId(), ProductVariant::getPrice,
                        BigDecimal::min));
        return products.map(product -> toSummary(product, images, prices));
    }

    @Transactional(readOnly = true)
    public ProductDetailResponse detail(Long productId) {
        List<Long> categoryIds = categoryService.categoryIds(null);
        if (categoryIds.isEmpty()) {
            throw productNotFound();
        }
        Product product = productRepository
                .findByIdAndSaleStatusAndDeletedAtIsNullAndPublishedAtLessThanEqualAndCategoryIdIn(
                        productId, SaleStatus.ON_SALE, LocalDateTime.now(clock), categoryIds)
                .orElseThrow(this::productNotFound);
        List<ProductDetailResponse.ImageResponse> images = imageRepository
                .findByProductIdInOrderBySortOrderAscIdAsc(List.of(productId)).stream()
                .map(image -> new ProductDetailResponse.ImageResponse(
                        image.getId(), image.getStorageKey(), image.getAltText(),
                        image.getSortOrder(), image.isPrimary()))
                .toList();
        List<ProductDetailResponse.VariantResponse> variants = variantRepository
                .findByProductIdInAndIsActiveTrueOrderByIdAsc(List.of(productId)).stream()
                .map(variant -> new ProductDetailResponse.VariantResponse(variant.getId(), variant.getVariantName(),
                        variant.getOptionValues(), variant.getPrice(), variant.getStockQuantity()))
                .toList();
        return new ProductDetailResponse(
                product.getId(), product.getCategory().getId(), product.getName(), product.getDescription(),
                product.getBrand(), product.getPublishedAt(), images, variants);
    }

    private ProductSummaryResponse toSummary(
            Product product, Map<Long, ProductImage> images, Map<Long, BigDecimal> prices) {
        ProductImage image = images.get(product.getId());
        ProductSummaryResponse.ImageResponse primaryImage = image == null ? null
                : new ProductSummaryResponse.ImageResponse(image.getStorageKey(), image.getAltText());
        return new ProductSummaryResponse(
                product.getId(), product.getCategory().getId(), product.getName(), product.getBrand(),
                prices.get(product.getId()), primaryImage, product.getPublishedAt());
    }

    private String escapeKeyword(String keyword) {
        return keyword.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
    }

    private ApiException productNotFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.");
    }
}
