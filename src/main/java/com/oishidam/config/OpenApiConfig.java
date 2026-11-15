package com.oishidam.config;

import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Comparator;
import java.util.List;

@Configuration
public class OpenApiConfig {
    @Bean
    OpenApiCustomizer orderTags() {
        List<String> order = List.of(
                "인증",
                "회원",
                "배송지",
                "카테고리",
                "상품",
                "상품 추천",
                "찜",
                "장바구니",
                "주문",
                "결제",
                "리뷰",
                "관리자 - 카테고리",
                "관리자 - 상품",
                "관리자 - 주문",
                "관리자 - 리뷰"
        );
        return openApi -> {
            if (openApi.getTags() != null) {
                openApi.getTags().sort(Comparator.comparingInt(tag -> {
                    int index = order.indexOf(tag.getName());
                    return index < 0 ? order.size() : index;
                }));
            }
        };
    }
}
