package com.oishidam.common.privacy;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Converter
@Component
@RequiredArgsConstructor
public class EmailLookupConverter implements AttributeConverter<String, String> {
    private final PersonalDataCrypto crypto;

    @Override
    public String convertToDatabaseColumn(String email) {
        return crypto.emailLookup(email);
    }

    @Override
    public String convertToEntityAttribute(String lookup) {
        return lookup;
    }
}
