package com.oishidam.product.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.product.dto.AdminImageRequest;
import com.oishidam.product.dto.AdminImageResponse;
import com.oishidam.product.dto.AdminImageUploadRequest;
import com.oishidam.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProductImageUploadService {
    private static final Logger log = LoggerFactory.getLogger(ProductImageUploadService.class);
    private final ProductRepository productRepository;
    private final AdminProductService productService;
    private final ImageKitService imageKitService;

    public AdminImageResponse upload(Long productId, MultipartFile file, AdminImageUploadRequest request) {
        if (!productRepository.existsByIdAndDeletedAtIsNull(productId)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.");
        }
        ImageKitService.UploadedImage image = imageKitService.upload(file);
        try {
            return productService.createImage(productId, new AdminImageRequest(
                    image.url(), request.altText(), request.sortOrder(), request.isPrimary()));
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
