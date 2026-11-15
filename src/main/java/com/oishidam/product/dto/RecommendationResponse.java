package com.oishidam.product.dto;

import java.util.List;

public record RecommendationResponse(
        String recommendationType,
        List<ProductSummaryResponse> products
) {
}
