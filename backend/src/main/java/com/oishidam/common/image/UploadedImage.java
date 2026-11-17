package com.oishidam.common.image;

public record UploadedImage(
        String fileId,
        String url,
        String fileType
) {
}
