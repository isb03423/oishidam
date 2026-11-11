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

    @Transactional(readOnly = true)
    public List<AddressResponse> list(Long memberId) {
        memberRepository.findById(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
        return addressRepository.findAllByMemberIdOrderByIdDesc(memberId).stream().map(AddressResponse::from).toList();
    }

    @Transactional
    public AddressResponse create(Long memberId, AddressRequest request) {
        Member member = lockMember(memberId);
        if (request.isDefault()) {
            clearDefault(memberId);
        }
        return AddressResponse.from(addressRepository.save(new Address(member, request)));
    }

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

    @Transactional
    public void delete(Long memberId, Long addressId) {
        lockMember(memberId);
        addressRepository.delete(findAddress(memberId, addressId));
    }

    private Member lockMember(Long memberId) {
        return memberRepository.findByIdForUpdate(memberId).filter(Member::isActive).orElseThrow(this::invalidMember);
    }

    private Address findAddress(Long memberId, Long addressId) {
        return addressRepository.findByIdAndMemberId(addressId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ADDRESS_NOT_FOUND", "배송지를 찾을 수 없습니다."));
    }

    private void clearDefault(Long memberId) {
        addressRepository.findByMemberIdAndIsDefaultTrue(memberId).ifPresent(address -> {
            address.clearDefault();
            addressRepository.flush();
        });
    }

    private ApiException invalidMember() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다.");
    }
}
