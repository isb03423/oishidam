package com.oishidam.admin.product.service;

import com.oishidam.admin.product.dto.*;
import com.oishidam.category.entity.Category;
import com.oishidam.category.repository.CategoryRepository;
import com.oishidam.category.service.CategoryService;
import com.oishidam.common.exception.ApiException;
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
import org.springframework.data.domain.Pageable;
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

    // 관리자: 상품 목록
    @Transactional(readOnly = true)
    public Page<AdminProductResponse> list(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }

        // 페이징 정보
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        return productRepository.findByDeletedAtIsNull(pageable).map(AdminProductResponse::from);
    }

    // 관리자: 상품 상세
    @Transactional(readOnly = true)
    public AdminProductDetailResponse detail(Long productId) {
        // 상품 조회
        Product product = productRepository.findByIdAndDeletedAtIsNull(productId).orElseThrow(this::productNotFound);

        // 옵션 목록 조회
        List<AdminVariantResponse> variants = variantRepository.findByProductIdOrderByIdAsc(productId)
                .stream().map(AdminVariantResponse::from).toList();

        // 상품 이미지 조회
        List<AdminImageResponse> images = imageRepository.findByProductIdInOrderBySortOrderAscIdAsc(List.of(productId))
                .stream().map(AdminImageResponse::from).toList();

        return new AdminProductDetailResponse(AdminProductResponse.from(product), variants, images);
    }

    // 관리자: 상품 등록
    @Transactional
    public AdminProductDetailResponse create(AdminProductCreateRequest request) {
        // 카테고리 확인 및 상품 정보 준비
        AdminProductRequest info = request.product();
        Category category = findCategory(info.categoryId());

        Product product = productRepository.save(
                Product.builder()
                        .category(category)
                        .name(info.name().trim())
                        .description(info.description().trim())
                        .brand(info.brand())
                        .saleStatus(SaleStatus.DRAFT)
                        .build()
        );

        // 상품 옵션 생성 및 저장
        ProductVariant variant = newVariant(product, request.variant());
        saveVariant(variant);
        return new AdminProductDetailResponse(
                AdminProductResponse.from(product),
                List.of(AdminVariantResponse.from(variant)),
                List.of()
        );
    }

    // 관리자: 상품 수정
    @Transactional
    public AdminProductResponse update(Long productId, AdminProductRequest request) {
        Product product = lockProduct(productId);
        Category category = findCategory(request.categoryId());

        // 판매 중인지 확인
        if (product.getSaleStatus() == SaleStatus.ON_SALE) {
            categoryService.categoryIds(category.getId());
        }

        product.update(category, request.name().trim(), request.description(), request.brand());
        return AdminProductResponse.from(product);
    }

    // 관리자: 상품 판매 상태 변경
    @Transactional
    public AdminProductResponse changeStatus(Long productId, SaleStatus status) {
        Product product = lockProduct(productId);

        // 판매 가능 조건 확인 및 최초 게시 시각 설정
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

    // 관리자: 상품 삭제
    @Transactional
    public void delete(Long productId) {
        lockProduct(productId).delete(LocalDateTime.now(clock));
    }

    // 관리자: 상품 옵션 등록
    @Transactional
    public AdminVariantResponse createVariant(Long productId, AdminVariantRequest request) {
        Product product = lockProduct(productId);
        ProductVariant variant = newVariant(product, request);
        saveVariant(variant);
        return AdminVariantResponse.from(variant);
    }

    // 관리자: 상품 옵션 수정
    @Transactional
    public AdminVariantResponse updateVariant(
            Long productId,
            Long variantId,
            AdminVariantRequest request
    ) {
        Product product = lockProduct(productId);
        ProductVariant variant = variantRepository.findByIdAndProductId(variantId, productId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "VARIANT_NOT_FOUND", "상품 옵션을 찾을 수 없습니다."));
        if (product.getSaleStatus() == SaleStatus.ON_SALE && variant.isActive() && !request.isActive()
                && variantRepository.countByProductIdAndIsActiveTrue(productId) <= 1) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "ACTIVE_VARIANT_REQUIRED", "판매 중인 상품에는 활성 옵션이 하나 이상 필요합니다.");
        }
        variant.update(
                request.skuCode().trim(),
                request.variantName().trim(),
                request.optionValues(),
                request.price(),
                request.stockQuantity(),
                request.isActive()
        );
        saveVariant(variant);
        return AdminVariantResponse.from(variant);
    }

    // 관리자: 상품 이미지 등록
    @Transactional
    public AdminImageResponse createImage(Long productId, AdminImageRequest request) {
        Product product = lockProduct(productId);

        // 기존 대표 이미지 해제
        if (request.isPrimary()) {
            clearPrimary(productId);
        }

        ProductImage image = imageRepository.save(
                ProductImage.builder()
                        .product(product)
                        .storageKey(request.storageKey().trim())
                        .altText(request.altText() == null ? null : request.altText().trim())
                        .sortOrder(request.sortOrder())
                        .isPrimary(request.isPrimary())
                        .build()
        );

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
        if (request.isPrimary()) {
            clearPrimary(productId);
        }
        image.update(request.storageKey().trim(), request.altText(), request.sortOrder(), request.isPrimary());
        return AdminImageResponse.from(image);
    }

    // 관리자: 상품 이미지 삭제
    @Transactional
    public void deleteImage(Long productId, Long imageId) {
        lockProduct(productId);
        imageRepository.delete(findImage(productId, imageId));
    }

    // 기존 대표 이미지 해제 및 반영
    private void clearPrimary(Long productId) {
        imageRepository.findByProductIdAndIsPrimaryTrue(productId).ifPresent(image -> {
            image.clearPrimary();
            imageRepository.flush();
        });
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

    // 요청 정보로 상품 옵션 생성
    private ProductVariant newVariant(Product product, AdminVariantRequest request) {
        return ProductVariant.builder()
                .product(product)
                .skuCode(request.skuCode().trim())
                .variantName(request.variantName().trim())
                .optionValues(request.optionValues())
                .price(request.price())
                .stockQuantity(request.stockQuantity())
                .isActive(request.isActive())
                .build();
    }

    // 상품 옵션 저장 및 중복 오류 처리
    private void saveVariant(ProductVariant variant) {
        try {
            variantRepository.saveAndFlush(variant);
        } catch (DataIntegrityViolationException e) {
            throw new ApiException(HttpStatus.CONFLICT, "DUPLICATE_VARIANT", "이미 사용 중인 SKU 코드 또는 옵션명입니다.");
        }
    }

    // 상품을 찾을 수 없을 때 반환할 오류 생성
    private ApiException productNotFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.");
    }
}
