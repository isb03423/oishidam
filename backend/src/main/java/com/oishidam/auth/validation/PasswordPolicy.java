package com.oishidam.auth.validation;

import com.oishidam.common.exception.ApiException;
import org.springframework.http.HttpStatus;

import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

public class PasswordPolicy {
    private static final Pattern LETTER = Pattern.compile("[A-Za-z]");

    private static final Pattern DIGIT = Pattern.compile("[0-9]");

    private static final Pattern SPECIAL = Pattern.compile("[\\p{Punct}]");

    private static final Pattern OTHER_SPECIAL = Pattern.compile("[\\p{P}\\p{S}&&[^\\x00-\\x7F]]");

    public static void validate(String password) {
        if (password == null || password.codePointCount(0, password.length()) < 8
                || !LETTER.matcher(password).find() || !DIGIT.matcher(password).find()
                || !SPECIAL.matcher(password).find()) {
            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "INVALID_PASSWORD",
                    "비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함하여 8자 이상이어야 합니다."
            );
        }
        if (OTHER_SPECIAL.matcher(password).find()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PASSWORD", "허용되지 않는 특수문자가 포함되어 있습니다.");
        }
        if (password.getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PASSWORD", "비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.");
        }
    }
}
