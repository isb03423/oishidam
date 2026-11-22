package com.oishidam.member.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.common.privacy.PersonalDataConverter;
import com.oishidam.member.dto.AddressRequest;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Address extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Convert(converter = PersonalDataConverter.class)
    @Column(name = "label", nullable = false)
    private String label;

    @Convert(converter = PersonalDataConverter.class)
    @Column(name = "recipient_name", nullable = false)
    private String recipientName;

    @Convert(converter = PersonalDataConverter.class)
    @Column(name = "recipient_phone", nullable = false)
    private String recipientPhone;

    @Convert(converter = PersonalDataConverter.class)
    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Convert(converter = PersonalDataConverter.class)
    @Column(name = "address_line1", nullable = false)
    private String addressLine1;

    @Convert(converter = PersonalDataConverter.class)
    @Column(name = "address_line2")
    private String addressLine2;

    @Convert(converter = PersonalDataConverter.class)
    @Column(name = "customs_code")
    private String customsCode;

    @Column(name = "is_default", nullable = false)
    private boolean isDefault;

    public void update(AddressRequest request) {
        this.label = request.label().trim();
        this.recipientName = request.recipientName().trim();
        this.recipientPhone = request.recipientPhone().trim();
        this.postalCode = request.postalCode().trim();
        this.addressLine1 = request.addressLine1().trim();
        this.addressLine2 = request.addressLine2();
        this.customsCode = request.customsCode();
        this.isDefault = request.isDefault();
    }

    public void clearDefault() {
        this.isDefault = false;
    }

    public void setDefault() {
        this.isDefault = true;
    }
}
