package com.oishidam.member.repository;

import com.oishidam.member.entity.Member;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, JpaSpecificationExecutor<Member> {
    interface SearchFields {
        Long getId();
        String getName();
        String getEmail();
    }

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT m FROM Member m WHERE m.emailLookup = :email")
    Optional<Member> findByEmailForUpdate(@Param("email") String email);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT m FROM Member m WHERE m.id = :id")
    Optional<Member> findByIdForUpdate(@Param("id") Long id);

    @Query("""
            SELECT m.tokenVersion FROM Member m
            WHERE m.emailLookup = :email AND m.isActive = true
              AND m.emailVerifiedAt IS NOT NULL AND m.password IS NOT NULL
            """)
    Optional<Long> findPasswordResetVersion(@Param("email") String email);

    @Query("SELECT (COUNT(m) > 0) FROM Member m WHERE m.emailLookup = :email")
    boolean existsByEmail(@Param("email") String email);
}
