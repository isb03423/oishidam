package com.oishidam.member.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.dto.AddressRequest;
import com.oishidam.member.dto.AddressResponse;
import com.oishidam.member.entity.Address;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.AddressRepository;
import com.oishidam.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;

    private final MemberRepository memberRepository;

    // 배송지 목록
    @Transactional(readOnly = true)
    public List<AddressResponse> list(Long memberId) {
        memberRepository.findById(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
        return addressRepository.findAllByMemberIdOrderByIdDesc(memberId).stream().map(AddressResponse::from).toList();
    }

    // 배송지 상세 조회
    @Transactional(readOnly = true)
    public AddressResponse detail(Long memberId, Long addressId) {
        memberRepository.findById(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
        return AddressResponse.from(findAddress(memberId, addressId));
    }

    // 기본 배송지 설정
    @Transactional
    public AddressResponse setDefault(Long memberId, Long addressId) {
        lockMember(memberId);
        Address address = findAddress(memberId, addressId);
        if (!address.isDefault()) {
            clearDefault(memberId);
            address.setDefault();
        }
        return AddressResponse.from(address);
    }

    // 배송지 등록
    @Transactional
    public AddressResponse create(Long memberId, AddressRequest request) {
        Member member = lockMember(memberId);

        // 기본 배송지로 지정할 경우 기존 설정 해제
        if (request.isDefault()) {
            clearDefault(memberId);
        }
        Address address = Address.builder().member(member).build();
        address.update(request);
        return AddressResponse.from(addressRepository.save(address));
    }

    // 배송지 수정
    @Transactional
    public AddressResponse update(Long memberId, Long addressId, AddressRequest request) {
        lockMember(memberId);
        Address address = findAddress(memberId, addressId);
        if (request.isDefault()) {
            clearDefault(memberId);
        }
        address.update(request);
        return AddressResponse.from(address);
    }

    // 배송지 삭제
    @Transactional
    public void delete(Long memberId, Long addressId) {
        lockMember(memberId);
        addressRepository.delete(findAddress(memberId, addressId));
    }

    // 활성 회원 조회 및 잠금
    private Member lockMember(Long memberId) {
        return memberRepository.findByIdForUpdate(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
    }

    // 회원의 배송지 조회
    private Address findAddress(Long memberId, Long addressId) {
        return addressRepository.findByIdAndMemberId(addressId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ADDRESS_NOT_FOUND", "배송지를 찾을 수 없습니다."));
    }

    // 기존 기본 배송지 해제
    private void clearDefault(Long memberId) {
        addressRepository.findByMemberIdAndIsDefaultTrue(memberId).ifPresent(address -> {
            address.clearDefault();
            addressRepository.flush();
        });
    }

    // 사용할 수 없는 회원 오류 생성
    private ApiException invalidMember() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다.");
    }
}
