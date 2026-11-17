package com.oishidam.admin.product.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record AdminImageRequest(
        @NotBlank @Size(max = 500) @URL(protocol = "https")
        @Pattern(regexp = "(?i)^https://[^/@\\s]+(?:[/?#][^\\s]*)?$") String storageKey,
        @Size(max = 255) String altText,
        @NotNull @Min(0) Integer sortOrder,
        @NotNull Boolean isPrimary
) {
}
