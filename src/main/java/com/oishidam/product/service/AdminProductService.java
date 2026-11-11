package com.oishidam.product.service;

import com.oishidam.category.entity.Category;
import com.oishidam.category.repository.CategoryRepository;
import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
import com.oishidam.product.dto.*;
import com.oishidam.product.entity.Product;
import com.oishidam.product.entity.ProductImage;
import com.oishidam.product.entity.ProductVariant;
import com.oishidam.product.enums.SaleStatus;
import com.oishidam.product.repository.ProductImageRepository;
import com.oishidam.product.repository.ProductRepository;
import com.oishidam.product.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminProductService {
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final ProductImageRepository imageRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final Clock clock;

    @Transactional(readOnly = true)
    public Page<AdminProductResponse> list(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        return productRepository.findByDeletedAtIsNull(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id")))
                .map(AdminProductResponse::from);
    }

    @Transactional(readOnly = true)
    public AdminProductDetailResponse detail(Long productId) {
        Product product = productRepository.findByIdAndDeletedAtIsNull(productId).orElseThrow(this::productNotFound);
        List<AdminVariantResponse> variants = variantRepository.findByProductIdOrderByIdAsc(productId).stream()
                .map(AdminVariantResponse::from)
                .toList();
        List<AdminImageResponse> images = imageRepository.findByProductIdInOrderBySortOrderAscIdAsc(List.of(productId))
                .stream()
                .map(AdminImageResponse::from)
                .toList();
        return new AdminProductDetailResponse(AdminProductResponse.from(product), variants, images);
    }

    @Transactional
    public AdminProductDetailResponse create(AdminProductCreateRequest request) {
        AdminProductRequest info = request.product();
        Category category = findCategory(info.categoryId());
        Product product = productRepository.save(new Product(
                category, info.name().trim(), info.description(), info.brand(), SaleStatus.DRAFT, null));
        ProductVariant variant = newVariant(product, request.variant());
        saveVariant(variant);
        return new AdminProductDetailResponse(
                AdminProductResponse.from(product), List.of(AdminVariantResponse.from(variant)), List.of());
    }

    @Transactional
    public AdminProductResponse update(Long productId, AdminProductRequest request) {
        Product product = lockProduct(productId);
        Category category = findCategory(request.categoryId());
        if (product.getSaleStatus() == SaleStatus.ON_SALE) {
            categoryService.categoryIds(category.getId());
        }
        product.update(category, request.name().trim(), request.description(), request.brand());
        return AdminProductResponse.from(product);
    }

    @Transactional
    public AdminProductResponse changeStatus(Long productId, SaleStatus status) {
        Product product = lockProduct(productId);
        LocalDateTime publishedAt = product.getPublishedAt();
        if (status == SaleStatus.ON_SALE) {
            categoryService.categoryIds(product.getCategory().getId());
            if (variantRepository.countByProductIdAndIsActiveTrue(productId) == 0) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "ACTIVE_VARIANT_REQUIRED", "판매하려면 활성 옵션이 하나 이상 필요합니다.");
            }
            if (publishedAt == null) {
                publishedAt = LocalDateTime.now(clock);
            }
        }
        product.changeStatus(status, publishedAt);
        return AdminProductResponse.from(product);
    }

    @Transactional
    public void delete(Long productId) {
        lockProduct(productId).delete(LocalDateTime.now(clock));
    }

    @Transactional
    public AdminVariantResponse createVariant(Long productId, AdminVariantRequest request) {
        Product product = lockProduct(productId);
        ProductVariant variant = newVariant(product, request);
        saveVariant(variant);
        return AdminVariantResponse.from(variant);
    }

    @Transactional
    public AdminVariantResponse updateVariant(Long productId, Long variantId, AdminVariantRequest request) {
        Product product = lockProduct(productId);
        ProductVariant variant = variantRepository.findByIdAndProductId(variantId, productId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "VARIANT_NOT_FOUND", "상품 옵션을 찾을 수 없습니다."));
        if (product.getSaleStatus() == SaleStatus.ON_SALE && variant.isActive() && !request.isActive()
                && variantRepository.countByProductIdAndIsActiveTrue(productId) <= 1) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "ACTIVE_VARIANT_REQUIRED", "판매 중인 상품에는 활성 옵션이 하나 이상 필요합니다.");
        }
        variant.update(request.skuCode().trim(), request.variantName().trim(), request.optionValues(), request.price(),
                request.stockQuantity(), request.isActive());
        saveVariant(variant);
        return AdminVariantResponse.from(variant);
    }

    @Transactional
    public AdminImageResponse createImage(Long productId, AdminImageRequest request) {
        Product product = lockProduct(productId);
        if (request.isPrimary()) {
            clearPrimary(productId);
        }
        ProductImage image = imageRepository.save(new ProductImage(
                product, request.storageKey().trim(), request.altText(), request.sortOrder(), request.isPrimary()));
        return AdminImageResponse.from(image);
    }

    @Transactional
    public AdminImageResponse updateImage(Long productId, Long imageId, AdminImageRequest request) {
        lockProduct(productId);
        ProductImage image = findImage(productId, imageId);
        if (request.isPrimary()) {
            clearPrimary(productId);
        }
        image.update(request.storageKey().trim(), request.altText(), request.sortOrder(), request.isPrimary());
        return AdminImageResponse.from(image);
    }

    @Transactional
    public void deleteImage(Long productId, Long imageId) {
        lockProduct(productId);
        imageRepository.delete(findImage(productId, imageId));
    }

    private void clearPrimary(Long productId) {
        imageRepository.findByProductIdAndIsPrimaryTrue(productId).ifPresent(image -> {
            image.clearPrimary();
            imageRepository.flush();
        });
    }

    private ProductImage findImage(Long productId, Long imageId) {
        return imageRepository.findByIdAndProductId(imageId, productId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "IMAGE_NOT_FOUND", "상품 이미지를 찾을 수 없습니다."));
    }

    private Category findCategory(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND", "카테고리를 찾을 수 없습니다."));
    }

    private Product lockProduct(Long productId) {
        return productRepository.findByIdForUpdate(productId).orElseThrow(this::productNotFound);
    }

    private ProductVariant newVariant(Product product, AdminVariantRequest request) {
        return new ProductVariant(
                product, request.skuCode().trim(), request.variantName().trim(), request.optionValues(),
                request.price(), request.stockQuantity(), request.isActive());
    }

    private void saveVariant(ProductVariant variant) {
        try {
            variantRepository.saveAndFlush(variant);
        } catch (DataIntegrityViolationException e) {
            throw new ApiException(HttpStatus.CONFLICT, "DUPLICATE_VARIANT", "이미 사용 중인 SKU 코드 또는 옵션명입니다.");
        }
    }

    private ApiException productNotFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.");
    }
}
