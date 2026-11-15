package com.oishidam.admin.product.dto;

import java.util.List;

public record AdminProductDetailResponse(
        AdminProductResponse product,
        List<AdminVariantResponse> variants,
        List<AdminImageResponse> images
) {
}
