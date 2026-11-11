package com.oishidam.config;

import com.oishidam.auth.dto.LoginResponse;
import com.oishidam.auth.service.SocialAuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Configuration
@ConditionalOnProperty(name = "oishidam.social.kakao.enabled", havingValue = "true")
public class KakaoOAuthConfig {
    @Bean
    ClientRegistrationRepository clientRegistrationRepository(
            @Value("${oishidam.social.kakao.client-id}") String clientId,
            @Value("${oishidam.social.kakao.client-secret}") String clientSecret) {
        ClientRegistration registration = ClientRegistration.withRegistrationId("kakao")
                .clientId(clientId)
                .clientSecret(clientSecret)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
                .authorizationUri("https://kauth.kakao.com/oauth/authorize")
                .tokenUri("https://kauth.kakao.com/oauth/token")
                .userInfoUri("https://kapi.kakao.com/v2/user/me")
                .userNameAttributeName("id")
                .clientName("Kakao")
                .build();

        return new InMemoryClientRegistrationRepository(registration);
    }

    @Bean
    @Order(1)
    SecurityFilterChain kakaoSecurityFilterChain(
            HttpSecurity http,
            SocialAuthService socialAuthService,
            @Value("${oishidam.cors.allowed-origins}") String frontendOrigin) throws Exception {
        http.securityMatcher("/oauth2/authorization/kakao", "/login/oauth2/code/kakao")
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .oauth2Login(oauth -> oauth
                        .successHandler((request, response, authentication) -> {
                            OAuth2User user = (OAuth2User) authentication.getPrincipal();
                            Map<String, Object> account = user.getAttribute("kakao_account");
                            Map<?, ?> profile = account != null && account.get("profile") instanceof Map<?, ?> map
                                    ? map : Map.of();
                            Object nickname = profile.get("nickname");
                            LoginResponse tokens = socialAuthService.login("KAKAO", user.getName(),
                                    nickname instanceof String name ? name : null);
                            String payload = "{\"type\":\"oishidam-oauth-success\",\"accessToken\":\""
                                    + tokens.accessToken()
                                    + "\",\"refreshToken\":\"" + tokens.refreshToken() + "\"}";
                            String encodedPayload = Base64.getEncoder()
                                    .encodeToString(payload.getBytes(StandardCharsets.UTF_8));
                            String encodedOrigin = Base64.getEncoder()
                                    .encodeToString(frontendOrigin.getBytes(StandardCharsets.UTF_8));
                            request.getSession(false).invalidate();
                            response.setHeader("Cache-Control", "no-store");
                            response.setContentType("text/html;charset=UTF-8");
                            response.getWriter().write("<!doctype html><meta charset=\"utf-8\"><title>로그인 완료</title>"
                                    + "<p>로그인이 완료되었습니다. 이 창을 닫아주세요.</p><script>"
                                    + "if(window.opener){window.opener.postMessage(JSON.parse(atob('" + encodedPayload
                                    + "')),atob('" + encodedOrigin + "'));window.close();}</script>");
                        })
                        .failureHandler((request, response, exception) -> {
                            if (request.getSession(false) != null) {
                                request.getSession(false).invalidate();
                            }
                            response.sendError(401, "소셜 로그인에 실패했습니다.");
                        }));

        return http.build();
    }
}
