package com.oishidam.admin.product.dto;

public record UploadedImage(
        String fileId,
        String url,
        String fileType
) {
}
