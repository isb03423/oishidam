package com.oishidam.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    @Order(2)
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // JWT의 roles 값을 Spring Security 권한으로 변환
        // ["ADMIN"] → ROLE_ADMIN
        JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();
        authoritiesConverter.setAuthoritiesClaimName("roles");
        authoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);

        AuthenticationEntryPoint authenticationEntryPoint = (request, response, exception) -> {
            new BearerTokenAuthenticationEntryPoint().commence(request, response, exception);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"success\":false,\"message\":\"인증이 필요합니다.\",\"data\":null}");
        };

        AccessDeniedHandler accessDeniedHandler = (request, response, exception) -> {
            new BearerTokenAccessDeniedHandler().handle(request, response, exception);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"success\":false,\"message\":\"접근 권한이 없습니다.\",\"data\":null}");
        };

        http
                // 아래 CORS Bean 사용
                .cors(Customizer.withDefaults())

                // 쿠키 인증 없이 Bearer 헤더만 사용하는 API 기준
                .csrf(AbstractHttpConfigurer::disable)

                // 인증 정보를 HTTP 세션에 저장하지 않음
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 기본 폼 로그인·HTTP Basic·세션 로그아웃 사용 안 함
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        // 회원가입·로그인
                        .requestMatchers(HttpMethod.POST, "/api/auth/signup", "/api/auth/login", "/api/auth/refresh")
                        .permitAll()

                        // 상품·카테고리 조회
                        .requestMatchers(HttpMethod.GET,
                                "/api/products",
                                "/api/products/**",
                                "/api/categories",
                                "/api/categories/**"
                        ).permitAll()

                        // 관리자 전용
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        // 나머지는 로그인 필요
                        .anyRequest().authenticated()
                )

                // JwtConfig에 등록한 JwtDecoder로 토큰 검증
                .oauth2ResourceServer(oauth -> oauth
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(authenticationConverter))
                )

                // 인증 실패 401 / 권한 부족 403
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                );

        return http.build();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource(
            @Value("${oishidam.cors.allowed-origins}") String origin) {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(origin));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
