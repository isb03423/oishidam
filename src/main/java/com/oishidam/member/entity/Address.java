package com.oishidam.member.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.member.dto.AddressRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "addresses")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "label", nullable = false, length = 50)
    private String label;

    @Column(name = "recipient_name", nullable = false, length = 100)
    private String recipientName;

    @Column(name = "recipient_phone", nullable = false, length = 30)
    private String recipientPhone;

    @Column(name = "postal_code", nullable = false, length = 20)
    private String postalCode;

    @Column(name = "address_line1", nullable = false, length = 255)
    private String addressLine1;

    @Column(name = "address_line2", length = 255)
    private String addressLine2;

    @Column(name = "is_default", nullable = false)
    private boolean isDefault;

    public Address(Member member, AddressRequest request) {
        this.member = member;
        update(request);
    }

    public void update(AddressRequest request) {
        this.label = request.label().trim();
        this.recipientName = request.recipientName().trim();
        this.recipientPhone = request.recipientPhone().trim();
        this.postalCode = request.postalCode().trim();
        this.addressLine1 = request.addressLine1().trim();
        this.addressLine2 = request.addressLine2();
        this.isDefault = request.isDefault();
    }

    public void clearDefault() {
        this.isDefault = false;
    }
}
