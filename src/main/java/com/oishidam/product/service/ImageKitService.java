package com.oishidam.product.service;

import com.oishidam.common.exception.ApiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.UUID;

@Service
public class ImageKitService {
    private static final Logger log = LoggerFactory.getLogger(ImageKitService.class);
    private static final long MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    private final RestClient client;
    private final String privateKey;

    @Autowired
    public ImageKitService(@Value("${oishidam.imagekit.private-key:}") String privateKey) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(30));
        this.client = RestClient.builder().requestFactory(factory).build();
        this.privateKey = privateKey;
    }

    ImageKitService(RestClient client, String privateKey) {
        this.client = client;
        this.privateKey = privateKey;
    }

    public UploadedImage upload(MultipartFile file) {
        if (privateKey.isBlank()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "IMAGEKIT_NOT_CONFIGURED", "이미지 업로드 설정이 필요합니다.");
        }
        if (file.isEmpty() || file.getSize() > MAX_IMAGE_SIZE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_IMAGE", "이미지는 10MB 이하여야 합니다.");
        }
        byte[] bytes;
        try {
            bytes = file.getBytes();
        } catch (IOException e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_IMAGE", "이미지 파일을 읽을 수 없습니다.");
        }
        String extension = imageExtension(bytes);
        if (extension == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_IMAGE", "JPEG, PNG, GIF 또는 WebP 이미지만 업로드할 수 있습니다.");
        }
        String filename = UUID.randomUUID() + extension;
        ByteArrayResource resource = new ByteArrayResource(bytes) {
            @Override
            public String getFilename() {
                return filename;
            }
        };
        LinkedMultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
        parts.add("file", resource);
        parts.add("fileName", filename);
        parts.add("folder", "/products");
        parts.add("isPrivateFile", "false");
        try {
            UploadedImage image = client.post().uri("https://upload.imagekit.io/api/v1/files/upload")
                    .headers(headers -> headers.setBasicAuth(privateKey, ""))
                    .contentType(MediaType.MULTIPART_FORM_DATA).body(parts).retrieve().body(UploadedImage.class);
            if (image == null || image.fileId() == null || image.fileId().isBlank()
                    || !"image".equals(image.fileType()) || image.url() == null || image.url().length() > 500
                            || !isHttpsUrl(image.url())) {
                if (image != null && image.fileId() != null && !image.fileId().isBlank()) {
                    try {
                        delete(image.fileId());
                    } catch (RestClientException cleanupError) {
                        log.error("ImageKit 업로드 파일 정리 실패: {}", image.fileId(), cleanupError);
                    }
                }
                throw new ApiException(HttpStatus.BAD_GATEWAY, "IMAGEKIT_INVALID_RESPONSE", "이미지 업로드 응답을 확인할 수 없습니다.");
            }
            return image;
        } catch (RestClientException e) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "IMAGEKIT_UPLOAD_FAILED", "이미지 업로드에 실패했습니다.");
        }
    }

    public void delete(String fileId) {
        client.delete().uri("https://api.imagekit.io/v1/files/{fileId}", fileId)
                .headers(headers -> headers.setBasicAuth(privateKey, "")).retrieve().toBodilessEntity();
    }

    private boolean isHttpsUrl(String url) {
        try {
            URI uri = URI.create(url);
            return "https".equalsIgnoreCase(uri.getScheme()) && uri.getHost() != null && uri.getUserInfo() == null;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    private String imageExtension(byte[] bytes) {
        if (bytes.length >= 3 && (bytes[0] & 255) == 0xff && (bytes[1] & 255) == 0xd8 && (bytes[2] & 255) == 0xff) {
            return ".jpg";
        }
        if (bytes.length >= 8 && java.util.Arrays.equals(java.util.Arrays.copyOf(bytes, 8), new byte[]{(byte) 137, 80,
                78, 71, 13, 10, 26, 10})) {
            return ".png";
        }
        if (bytes.length >= 6 && (new String(bytes, 0, 6, StandardCharsets.US_ASCII).equals("GIF87a")
                || new String(bytes, 0, 6, StandardCharsets.US_ASCII).equals("GIF89a"))) {
            return ".gif";
        }
        if (bytes.length >= 12 && new String(bytes, 0, 4, StandardCharsets.US_ASCII).equals("RIFF") && new String(bytes,
                8, 4, StandardCharsets.US_ASCII).equals("WEBP")) {
            return ".webp";
        }
        return null;
    }

    public record UploadedImage(String fileId, String url, String fileType) {
    }
}
