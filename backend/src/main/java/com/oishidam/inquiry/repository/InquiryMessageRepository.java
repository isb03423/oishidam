package com.oishidam.inquiry.repository;

import com.oishidam.inquiry.entity.InquiryMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface InquiryMessageRepository extends JpaRepository<InquiryMessage, Long> {
    List<InquiryMessage> findByInquiryIdOrderByIdAsc(Long inquiryId);

    @Query("""
            SELECT m FROM InquiryMessage m JOIN FETCH m.inquiry i JOIN FETCH i.member
            WHERE i.id IN :inquiryIds AND m.sender.id = i.member.id ORDER BY m.id
            """)
    List<InquiryMessage> findQuestionsByInquiryIdIn(@Param("inquiryIds") Collection<Long> inquiryIds);

    boolean existsByInquiryIdAndSenderIdNot(Long inquiryId, Long senderId);
}
