package com.oishidam.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Comparator;
import java.util.List;

@Configuration
public class OpenApiConfig implements WebMvcConfigurer {
    private static final String BEARER_AUTH = "bearerAuth";

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/docs", "/swagger-ui/index.html");
    }

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
            if (openApi.getComponents() == null) {
                openApi.setComponents(new Components());
            }
            openApi.getComponents().addSecuritySchemes(BEARER_AUTH, new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT"));
            if (openApi.getPaths() != null) {
                openApi.getPaths().forEach((path, pathItem) -> {
                    if (path.startsWith("/api/admin/")) {
                        pathItem.readOperations().forEach(operation ->
                                operation.addSecurityItem(new SecurityRequirement().addList(BEARER_AUTH)));
                    }
                });
            }

            if (openApi.getTags() != null) {
                openApi.getTags().sort(Comparator.comparingInt(tag -> {
                    int index = order.indexOf(tag.getName());
                    return index < 0 ? order.size() : index;
                }));
            }
        };
    }
}
