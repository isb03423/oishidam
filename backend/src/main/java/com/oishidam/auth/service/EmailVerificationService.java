package com.oishidam.auth.service;

import com.oishidam.auth.dto.EmailVerificationResponse;
import com.oishidam.auth.dto.EmailVerificationWindow;
import com.oishidam.auth.dto.ExtendEmailCodeRequest;
import com.oishidam.auth.dto.SendEmailCodeRequest;
import com.oishidam.auth.dto.VerifyEmailCodeRequest;
import com.oishidam.auth.enums.EmailVerificationPurpose;
import com.oishidam.auth.repository.EmailVerificationRepository;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.task.TaskExecutor;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import java.util.Locale;
import java.util.concurrent.Semaphore;

@Service
@Slf4j
public class EmailVerificationService {
    private static final long CODE_VALIDITY_SECONDS = 300;

    private final EmailVerificationRepository verifications;
    private final MemberRepository members;
    private final JwtTokenService tokens;
    private final JavaMailSender mailSender;
    private final TransactionTemplate transactions;
    private final TaskExecutor executor;
    private final Clock clock;
    private final String sender;
    private final SecretKeySpec hashKey;
    private final SecureRandom random = new SecureRandom();
    private final Semaphore resetRequests = new Semaphore(32);

    public EmailVerificationService(
            EmailVerificationRepository verifications,
            MemberRepository members,
            JwtTokenService tokens,
            JavaMailSender mailSender,
            TransactionTemplate transactions,
            @Qualifier("applicationTaskExecutor") TaskExecutor executor,
            Clock clock,
            @Value("${SMTP_FROM:${spring.mail.username:}}") String sender,
            @Value("${oishidam.jwt.secret}") String secret
    ) {
        this.verifications = verifications;
        this.members = members;
        this.tokens = tokens;
        this.mailSender = mailSender;
        this.transactions = transactions;
        this.executor = executor;
        this.clock = clock;
        this.sender = sender;
        this.hashKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    // 가입 인증번호를 발송하고 비밀번호 찾기는 계정 존재 여부와 상관없이 같은 응답을 반환
    public EmailVerificationWindow sendCode(SendEmailCodeRequest request) {
        if (sender.isBlank()) throw mailUnavailable();
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        EmailVerificationPurpose purpose = request.purpose();
        if (purpose == EmailVerificationPurpose.SIGNUP) checkSignupEmail(email);

        var requestToken = tokens.issueRefreshToken();
        Instant expiresAt = clock.instant().truncatedTo(ChronoUnit.MILLIS).plusSeconds(CODE_VALIDITY_SECONDS);
        if (purpose == EmailVerificationPurpose.PASSWORD_RESET) {
            if (!resetRequests.tryAcquire()) throw mailUnavailable();
            try {
                executor.execute(() -> {
                    try {
                        sendResetCode(email, requestToken.tokenHash(), expiresAt);
                    } finally {
                        resetRequests.release();
                    }
                });
            } catch (TaskRejectedException e) {
                resetRequests.release();
                throw mailUnavailable();
            }
        } else {
            issueAndSend(email, purpose, null, requestToken.tokenHash(), expiresAt);
        }
        return new EmailVerificationWindow(windowToken(email, purpose, requestToken.token(), expiresAt, "extend"),
                expiresAt, clock.instant());
    }

    // 인증번호 요청 전에 가입 이메일이 사용 중인지 확인
    public void checkSignupEmail(String email) {
        if (members.existsByEmail(email.trim().toLowerCase(Locale.ROOT))) {
            throw new ApiException(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS", "이미 사용 중인 이메일입니다.");
        }
    }

    // 확인된 활성 이메일 회원에게만 백그라운드에서 재설정 번호 발송
    private void sendResetCode(String email, String requestHash, Instant expiresAt) {
        try {
            if (clock.instant().isBefore(expiresAt)) {
                members.findPasswordResetVersion(email)
                        .ifPresent(version -> issueAndSend(email, EmailVerificationPurpose.PASSWORD_RESET, version, requestHash, expiresAt));
            }
        } catch (ApiException e) {
            if (e.getStatus() != HttpStatus.TOO_MANY_REQUESTS) log.warn("비밀번호 재설정 이메일 발송 실패");
        }
    }

    // 재발송 간격·공용 발송량을 DB에서 제한하고 커밋 후 SMTP로 발송
    private void issueAndSend(String email, EmailVerificationPurpose purpose, Long version, String requestHash, Instant expiresAt) {
        String code = String.format(Locale.ROOT, "%06d", random.nextInt(1_000_000));
        transactions.executeWithoutResult(status -> {
            LocalDateTime now = LocalDateTime.now(clock);
            if (!verifications.reserveMailQuota(now)) {
                throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "EMAIL_QUOTA_EXCEEDED", "메일 발송 요청이 많습니다. 잠시 후 다시 시도해주세요.");
            }
            verifications.deleteExpired(now.minusHours(1));
            LocalDateTime deadline = LocalDateTime.ofInstant(expiresAt, clock.getZone());
            if (!verifications.issue(email, purpose, hashCode(email, purpose, code), version, now, deadline, requestHash)) {
                throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "EMAIL_RESEND_LIMIT", "1분 후 인증번호를 다시 요청해주세요.");
            }
        });

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(email);
        message.setSubject(purpose == EmailVerificationPurpose.SIGNUP ? "[오이시담] 회원가입 인증번호" : "[오이시담] 비밀번호 재설정 인증번호");
        message.setText("인증번호는 " + code + "입니다. 5분 이내에 입력해주세요.\n요청한 적 없다면 이 이메일을 무시하셔도 됩니다.");
        try {
            mailSender.send(message);
        } catch (MailException e) {
            log.warn("인증번호 SMTP 발송 실패 ({})", e.getClass().getSimpleName());
            throw mailUnavailable();
        }
    }

    // 계정 조회 없이 같은 요청에 대해 한 번만 유효 시간을 늘릴 수 있는 증명을 발급
    public EmailVerificationWindow extendCode(ExtendEmailCodeRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        EmailVerificationPurpose purpose = request.purpose() == null ? EmailVerificationPurpose.PASSWORD_RESET : request.purpose();
        VerificationWindow window = readWindow(email, purpose, request.extensionToken(), "extend");
        Instant now = clock.instant();
        if (!now.isBefore(window.expiresAt())) throw invalidWindow();

        Instant expiresAt = window.expiresAt().plusSeconds(CODE_VALIDITY_SECONDS);
        return new EmailVerificationWindow(windowToken(email, purpose, window.requestId(), expiresAt, "verify"), expiresAt, now);
    }

    // 인증번호를 한 번만 확인하고 용도별 인증 토큰 발급
    public EmailVerificationResponse verifyCode(VerifyEmailCodeRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        String requestHash = null;
        LocalDateTime extendedUntil = null;
        if (request.extensionToken() != null) {
            VerificationWindow window = readWindow(email, request.purpose(), request.extensionToken(), "verify");
            requestHash = tokens.hashRefreshToken(window.requestId());
            extendedUntil = LocalDateTime.ofInstant(window.expiresAt(), clock.getZone());
        }

        var token = tokens.issueRefreshToken();
        if (!verifications.verify(email, request.purpose(), hashCode(email, request.purpose(), request.code()),
                token.tokenHash(), LocalDateTime.now(clock), requestHash, extendedUntil)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_EMAIL_CODE", "인증번호가 올바르지 않거나 만료되었습니다. 다시 확인하거나 새 번호를 받아주세요.");
        }
        return new EmailVerificationResponse(token.token());
    }

    // 가입 또는 재설정 트랜잭션 안에서 인증 토큰을 한 번만 소비
    public void consume(String email, EmailVerificationPurpose purpose, String token, Long accountVersion) {
        if (!verifications.consume(email, purpose, tokens.hashRefreshToken(token), accountVersion, LocalDateTime.now(clock))) {
            throw invalidVerification();
        }
    }

    // 만료되거나 현재 계정에 사용할 수 없는 인증 안내
    ApiException invalidVerification() {
        return new ApiException(HttpStatus.BAD_REQUEST, "INVALID_EMAIL_VERIFICATION", "이메일 인증이 만료되었거나 유효하지 않습니다. 다시 인증해주세요.");
    }

    // 짧은 인증번호를 이메일 및 용도에 결합해 키 기반 해시로 저장
    private String hashCode(String email, EmailVerificationPurpose purpose, String code) {
        return sign("email-verification\n" + purpose + "\n" + email + "\n" + code);
    }

    // 발급 요청과 만료 시각을 이메일 및 토큰 용도에 결합
    private String windowToken(String email, EmailVerificationPurpose purpose, String requestId, Instant expiresAt, String scope) {
        String value = requestId + "." + expiresAt.toEpochMilli();
        // 기존 재설정 연장 증명은 같은 서명으로 검증한다.
        String signingScope = purpose == EmailVerificationPurpose.SIGNUP ? "signup-" + scope : scope;
        return value + "." + sign("email-window\n" + signingScope + "\n" + email + "\n" + value);
    }

    // 서명과 이메일이 일치하는 유효 시간 증명만 읽음
    private VerificationWindow readWindow(String email, EmailVerificationPurpose purpose, String token, String scope) {
        String[] parts = token.split("\\.", -1);
        if (parts.length != 3 || !parts[0].matches("[A-Za-z0-9_-]{43}") || !parts[1].matches("[0-9]{1,15}")) {
            throw invalidWindow();
        }
        Instant expiresAt = Instant.ofEpochMilli(Long.parseLong(parts[1]));
        String expected = windowToken(email, purpose, parts[0], expiresAt, scope);
        if (!MessageDigest.isEqual(expected.getBytes(StandardCharsets.UTF_8), token.getBytes(StandardCharsets.UTF_8))) {
            throw invalidWindow();
        }
        return new VerificationWindow(parts[0], expiresAt);
    }

    // 인증번호 해시와 유효 시간 증명의 서명을 계산
    private String sign(String value) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(hashKey);
            return HexFormat.of().formatHex(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException("인증번호 해시를 계산할 수 없습니다.", e);
        }
    }

    // 연장할 수 없는 요청 안내
    private ApiException invalidWindow() {
        return new ApiException(HttpStatus.BAD_REQUEST, "INVALID_EMAIL_WINDOW", "인증 시간을 연장할 수 없습니다. 인증번호를 다시 요청해주세요.");
    }

    // SMTP 비활성 또는 발송 장애 안내
    private ApiException mailUnavailable() {
        return new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "EMAIL_UNAVAILABLE", "인증 메일을 발송할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }

    private record VerificationWindow(String requestId, Instant expiresAt) {
    }
}
