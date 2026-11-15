package com.oishidam.member.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oishidam.member.enums.MemberGender;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UpdateMemberRequest {
    @Size(max = 100)
    private String name;

    @Size(max = 30)
    private String phone;

    @Min(1900)
    @Max(2100)
    private Integer birthYear;

    private MemberGender gender;

    @JsonIgnore
    private boolean namePresent;

    @JsonIgnore
    private boolean phonePresent;

    @JsonIgnore
    private boolean birthYearPresent;

    @JsonIgnore
    private boolean genderPresent;

    public void setName(String name) {
        this.name = name;
        this.namePresent = true;
    }

    public void setPhone(String phone) {
        this.phone = phone;
        this.phonePresent = true;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
        this.birthYearPresent = true;
    }

    public void setGender(MemberGender gender) {
        this.gender = gender;
        this.genderPresent = true;
    }

    @AssertTrue(message = "이름은 비워둘 수 없습니다.")
    public boolean isNameValid() {
        return !namePresent || (name != null && !name.isBlank());
    }
}
