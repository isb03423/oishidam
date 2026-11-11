package com.oishidam.member.repository;

import com.oishidam.member.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByMemberIdOrderByIdDesc(Long memberId);

    Optional<Address> findByIdAndMemberId(Long id, Long memberId);

    Optional<Address> findByMemberIdAndIsDefaultTrue(Long memberId);
}
