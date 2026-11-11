package com.oishidam.member.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.member.enums.MemberGender;
import com.oishidam.member.enums.MemberRole;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "members")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "email", length = 254, unique = true)
    private String email;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "phone", length = 30)
    private String phone;

    @Column(name = "birth_year", length = 4)
    private Integer birthYear;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", length = 10)
    private MemberGender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private MemberRole role;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "token_version", nullable = false)
    private long tokenVersion;

    public void updateProfile(String name, String phone, Integer birthYear, MemberGender gender) {
        this.name = name;
        this.phone = phone;
        this.birthYear = birthYear;
        this.gender = gender;
    }

    public void changePassword(String password) {
        this.password = password;
        this.tokenVersion++;
    }

    public void deactivate() {
        this.isActive = false;
    }

    public Member(String email, String password, String name, String phone, Integer birthYear, MemberGender gender) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.birthYear = birthYear;
        this.gender = gender;
        this.role = MemberRole.USER;
        this.isActive = true;
    }
}
