package com.oishidam.member.dto;

import com.oishidam.member.entity.Address;

public record AddressResponse(
        Long addressId,
        String label,
        String recipientName,
        String recipientPhone,
        String postalCode,
        String addressLine1,
        String addressLine2,
        boolean isDefault
) {
    public static AddressResponse from(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getLabel(),
                address.getRecipientName(),
                address.getRecipientPhone(),
                address.getPostalCode(),
                address.getAddressLine1(),
                address.getAddressLine2(),
                address.isDefault()
        );
    }
}
