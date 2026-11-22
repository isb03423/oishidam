package com.oishidam.common.privacy;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Converter
@Component
@RequiredArgsConstructor
public class PersonalDataConverter implements AttributeConverter<String, String> {
    private final PersonalDataCrypto crypto;

    @Override
    public String convertToDatabaseColumn(String value) {
        return crypto.encrypt(value);
    }

    @Override
    public String convertToEntityAttribute(String value) {
        return crypto.decrypt(value);
    }
}
