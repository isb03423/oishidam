package com.oishidam.admin.product.service;

import com.oishidam.admin.product.dto.UploadedImage;
import com.oishidam.admin.product.dto.AdminImageRequest;
import com.oishidam.admin.product.dto.AdminImageResponse;
import com.oishidam.admin.product.dto.AdminImageUploadRequest;
import com.oishidam.common.exception.ApiException;
import com.oishidam.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductImageUploadService {
    private final ProductRepository productRepository;

    private final AdminProductService productService;

    private final ImageKitService imageKitService;

    // 관리자: 상품 이미지 업로드
    public AdminImageResponse upload(Long productId, MultipartFile file, AdminImageUploadRequest request) {
        if (!productRepository.existsByIdAndDeletedAtIsNull(productId)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.");
        }

        // 이미지 업로드 후 상품에 등록
        UploadedImage image = imageKitService.upload(file);
        try {
            return productService.createImage(
                    productId,
                    new AdminImageRequest(
                            image.url(),
                            request.altText(),
                            request.sortOrder(),
                            request.isPrimary()
                    )
            );
        } catch (RuntimeException e) {
            // shortcut: 서버 중단 시 원본이 남을 수 있으므로 업로드가 많아지면 정리 작업을 도입한다.
            try {
                imageKitService.delete(image.fileId());
            } catch (RuntimeException cleanupError) {
                log.error("ImageKit 업로드 파일 정리 실패: {}", image.fileId(), cleanupError);
            }
            throw e;
        }
    }
}
