package com.oishidam.common.privacy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Locale;

@Component
public class PersonalDataCrypto {
    static final String CIPHERTEXT_PREFIX = "enc:v1:";
    static final String EMAIL_LOOKUP_PREFIX = "hmac:v1:";
    private static final String CIPHER = "AES/GCM/NoPadding";
    private static final String MAC = "HmacSHA256";
    private static final int NONCE_BYTES = 12;
    private static final int TAG_BYTES = 16;

    private final SecureRandom random = new SecureRandom();
    private final SecretKeySpec dataKey;
    private final SecretKeySpec lookupKey;

    public PersonalDataCrypto(@Value("${PII_KEYS:}") String encodedKeys) {
        byte[] keys = decodeKeys(encodedKeys);
        try {
            dataKey = new SecretKeySpec(keys, 0, 32, "AES");
            lookupKey = new SecretKeySpec(keys, 32, 32, MAC);
        } finally {
            Arrays.fill(keys, (byte) 0);
        }
    }

    public String encrypt(String value) {
        if (value == null) return null;

        byte[] nonce = new byte[NONCE_BYTES];
        random.nextBytes(nonce);
        try {
            Cipher cipher = cipher(Cipher.ENCRYPT_MODE, nonce);
            byte[] ciphertext = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
            byte[] envelope = ByteBuffer.allocate(nonce.length + ciphertext.length).put(nonce).put(ciphertext).array();
            return CIPHERTEXT_PREFIX + Base64.getEncoder().encodeToString(envelope);
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException("개인정보를 암호화할 수 없습니다.", e);
        }
    }

    public String decrypt(String value) {
        if (value == null) return null;
        if (!value.startsWith(CIPHERTEXT_PREFIX)) {
            throw new IllegalStateException("개인정보 암호문 형식이 올바르지 않습니다.");
        }

        try {
            byte[] envelope = Base64.getDecoder().decode(value.substring(CIPHERTEXT_PREFIX.length()));
            if (envelope.length < NONCE_BYTES + TAG_BYTES) {
                throw new IllegalArgumentException();
            }
            byte[] nonce = Arrays.copyOf(envelope, NONCE_BYTES);
            Cipher cipher = cipher(Cipher.DECRYPT_MODE, nonce);
            byte[] plaintext = cipher.doFinal(envelope, NONCE_BYTES, envelope.length - NONCE_BYTES);
            return new String(plaintext, StandardCharsets.UTF_8);
        } catch (GeneralSecurityException | IllegalArgumentException e) {
            throw new IllegalStateException("개인정보 암호문을 복호화할 수 없습니다.");
        }
    }

    public String emailLookup(String email) {
        if (email == null) return null;
        try {
            Mac mac = Mac.getInstance(MAC);
            mac.init(lookupKey);
            byte[] normalizedEmail = email.trim().toLowerCase(Locale.ROOT).getBytes(StandardCharsets.UTF_8);
            return EMAIL_LOOKUP_PREFIX + HexFormat.of().formatHex(mac.doFinal(normalizedEmail));
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException("이메일 조회값을 생성할 수 없습니다.", e);
        }
    }

    private Cipher cipher(int mode, byte[] nonce) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance(CIPHER);
        cipher.init(mode, dataKey, new GCMParameterSpec(TAG_BYTES * Byte.SIZE, nonce));
        cipher.updateAAD(CIPHERTEXT_PREFIX.getBytes(StandardCharsets.US_ASCII));
        return cipher;
    }

    private static byte[] decodeKeys(String encodedKeys) {
        if (encodedKeys.isBlank()) {
            throw new IllegalStateException("PII_KEYS에 개인정보 키를 설정하세요.");
        }

        byte[] keys;
        try {
            keys = Base64.getDecoder().decode(encodedKeys.trim());
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("PII_KEYS의 Base64 형식이 올바르지 않습니다.");
        }
        if (keys.length != 64) {
            Arrays.fill(keys, (byte) 0);
            throw new IllegalStateException("PII_KEYS는 무작위 64바이트를 Base64로 인코딩한 값이어야 합니다.");
        }
        return keys;
    }
}
