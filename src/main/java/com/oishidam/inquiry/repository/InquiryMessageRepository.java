package com.oishidam.inquiry.repository;

import com.oishidam.inquiry.entity.InquiryMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryMessageRepository extends JpaRepository<InquiryMessage, Long> {
    List<InquiryMessage> findByInquiryIdOrderByIdAsc(Long inquiryId);
}
