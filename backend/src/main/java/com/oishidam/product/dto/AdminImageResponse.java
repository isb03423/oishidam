package com.oishidam.product.dto;

import com.oishidam.product.entity.ProductImage;

public record AdminImageResponse(
        Long imageId,
        String storageKey,
        String altText,
        int sortOrder,
        boolean isPrimary
) {
    public static AdminImageResponse from(ProductImage image) {
        return new AdminImageResponse(
                image.getId(),
                image.getStorageKey(),
                image.getAltText(),
                image.getSortOrder(),
                image.isPrimary()
        );
    }
}
