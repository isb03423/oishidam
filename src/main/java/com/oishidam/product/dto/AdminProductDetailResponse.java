package com.oishidam.product.dto;

import java.util.List;

public record AdminProductDetailResponse(
        AdminProductResponse product,
        List<AdminVariantResponse> variants,
        List<AdminImageResponse> images
) {
}
