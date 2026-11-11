package com.oishidam.config;

import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.List;

@Configuration
public class JwtConfig {
    // Base64 문자열을 실제 서명키로 변환
    @Bean
    SecretKey jwtSecretKey(@Value("${oishidam.jwt.secret}") String secret) {
        byte[] keyBytes = Base64.getDecoder().decode(secret);

        if (keyBytes.length != 32) {
            throw new IllegalArgumentException("JWT_SECRET은 Base64 디코딩 후 최소 32바이트여야 합니다.");
        }

        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    // 토큰 발급에 사용
    @Bean
    JwtEncoder jwtEncoder(SecretKey jwtSecretKey) {
        return NimbusJwtEncoder.withSecretKey(jwtSecretKey)
                .algorithm(MacAlgorithm.HS256)
                .build();
    }

    // 요청으로 들어온 토큰 검증에 사용
    @Bean
    JwtDecoder jwtDecoder(
            SecretKey jwtSecretKey,
            MemberRepository memberRepository,
            JdbcTemplate jdbcTemplate,
            @Value("${oishidam.jwt.issuer}") String issuer,
            @Value("${oishidam.jwt.audience}") String audience) {

        NimbusJwtDecoder decoder = NimbusJwtDecoder
                .withSecretKey(jwtSecretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();

        OAuth2TokenValidator<Jwt> issuerAndTimeValidator = JwtValidators.createDefaultWithIssuer(issuer);
        JwtClaimValidator<List<String>> audienceValidator = new JwtClaimValidator<>(
                "aud",
                audiences -> audiences != null && audiences.contains(audience));

        OAuth2TokenValidator<Jwt> memberValidator = new OAuth2TokenValidator<>() {
            @Override
            public OAuth2TokenValidatorResult validate(Jwt jwt) {
                try {
                    Object version = jwt.getClaim("token_version");
                    String tokenId = jwt.getId();
                    boolean valid = version instanceof Number number && tokenId != null && jwt.getSubject() != null
                            && memberRepository.findById(Long.valueOf(jwt.getSubject()))
                            .filter(Member::isActive).filter(member -> member.getTokenVersion() == number.longValue())
                                    .isPresent()
                            && Boolean.FALSE.equals(jdbcTemplate.queryForObject(
                            "select exists(select 1 from revoked_access_tokens where token_id = ?)", Boolean.class,
                                    tokenId));
                    if (valid) {
                        return OAuth2TokenValidatorResult.success();
                    }
                } catch (NumberFormatException ignored) {
                }
                return OAuth2TokenValidatorResult.failure(
                        new OAuth2Error("invalid_token"));
            }
        };

        decoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(issuerAndTimeValidator, audienceValidator,
                memberValidator));

        return decoder;
    }
}
