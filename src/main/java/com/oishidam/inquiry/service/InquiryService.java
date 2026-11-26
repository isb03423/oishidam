package com.oishidam.inquiry.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.inquiry.dto.*;
import com.oishidam.inquiry.entity.Inquiry;
import com.oishidam.inquiry.entity.InquiryMessage;
import com.oishidam.inquiry.repository.InquiryMessageRepository;
import com.oishidam.inquiry.repository.InquiryRepository;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryService {
    private final InquiryRepository inquiries;

    private final InquiryMessageRepository messages;

    private final MemberRepository members;

    private final OrderRepository orders;

    // 로그인 고객의 문의 목록
    @Transactional(readOnly = true)
    public Page<InquirySummaryResponse> myList(Long memberId, String status, int page, int size) {
        activeMember(memberId);
        if (status != null && !status.isBlank()) {
            validateStatus(status);
        }
        return inquiries.findAll((root, query, cb) -> cb.and(
                cb.equal(root.get("member").get("id"), memberId),
                status == null || status.isBlank() ? cb.conjunction() : cb.equal(root.get("status"), status)
        ), pageable(page, size)).map(this::summary);
    }

    // 관리자 문의 검색 및 상태별 조회
    @Transactional(readOnly = true)
    public Page<AdminInquirySummaryResponse> adminList(String keyword, String status, int page, int size) {
        if (status != null && !status.isBlank()) {
            validateStatus(status);
        }
        Specification<Inquiry> filter = (root, query, cb) -> cb.and(
                keyword == null || keyword.isBlank() ? cb.conjunction() : cb.like(
                        cb.lower(root.get("title")), "%" +
                                keyword.trim().toLowerCase().replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") +
                                "%", '\\'
                ),
                status == null || status.isBlank() ? cb.conjunction() : cb.equal(root.get("status"), status)
        );
        Page<Inquiry> result = inquiries.findAll(filter, pageable(page, size));
        // 현재 페이지의 고객 메시지를 함께 조회하고 과거 추가 문의가 있으면 최초 본문을 사용한다.
        Map<Long, String> contents = result.isEmpty() ? Map.of() : messages.findQuestionsByInquiryIdIn(
                result.getContent().stream().map(Inquiry::getId).toList()).stream()
                .collect(Collectors.toMap(message -> message.getInquiry().getId(), InquiryMessage::getContent, (first, next) -> first));
        return result.map(inquiry -> new AdminInquirySummaryResponse(
                inquiry.getId(), inquiry.getTitle(), inquiry.getStatus(), inquiry.getMember().getId(),
                inquiry.getMember().getName(), inquiry.getCreatedAt(), contents.get(inquiry.getId())));
    }

    // 본인 주문 확인 후 문의와 첫 메시지를 함께 저장한다.
    @Transactional
    public InquirySummaryResponse create(Long memberId, InquiryCreateRequest request) {
        Member member = activeMember(memberId);
        var order = request.orderId() == null ? null : orders.findByIdAndMemberId(request.orderId(), memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", "주문을 찾을 수 없습니다."));
        Inquiry inquiry = inquiries.save(Inquiry.builder().member(member).order(order).title(request.title().trim()).status("OPEN").build());
        saveMessage(inquiry, member, request.content());
        return summary(inquiry);
    }

    // 작성자 또는 관리자만 최초 문의와 답변을 조회한다.
    @Transactional(readOnly = true)
    public InquiryDetailResponse detail(Long inquiryId, Long memberId, boolean admin) {
        Inquiry inquiry = inquiries.findById(inquiryId).orElseThrow(this::notFound);
        if (!admin && !inquiry.getMember().getId().equals(memberId)) {
            throw notFound();
        }
        List<InquiryMessage> history = messages.findByInquiryIdOrderByIdAsc(inquiryId);
        var question = history.stream().filter(item -> item.getSender().getId().equals(inquiry.getMember().getId())).findFirst();
        var answer = history.stream().filter(item -> !item.getSender().getId().equals(inquiry.getMember().getId())).findFirst();
        List<InquiryMessageResponse> items = java.util.stream.Stream.concat(question.stream(), answer.stream())
                .map(this::message).toList();
        return new InquiryDetailResponse(
                inquiry.getId(), inquiry.getTitle(), inquiry.getStatus(), inquiry.getMember().getId(), inquiry.getMember().getName(),
                inquiry.getOrder() == null ? null : inquiry.getOrder().getId(), inquiry.getCreatedAt(), items
        );
    }

    // 관리자 답변이 없는 본인 문의와 고객 메시지를 함께 삭제한다.
    @Transactional
    public void delete(Long inquiryId, Long memberId) {
        Inquiry inquiry = inquiries.findByIdForUpdate(inquiryId).orElseThrow(this::notFound);
        if (!inquiry.getMember().getId().equals(memberId)) {
            throw notFound();
        }
        List<InquiryMessage> items = messages.findByInquiryIdOrderByIdAsc(inquiryId);
        if (items.stream().anyMatch(item -> !item.getSender().getId().equals(memberId))) {
            throw new ApiException(HttpStatus.CONFLICT, "INQUIRY_ALREADY_ANSWERED", "관리자 답변이 있는 문의는 삭제할 수 없습니다.");
        }
        messages.deleteAll(items);
        messages.flush();
        inquiries.delete(inquiry);
    }

    // 문의를 잠근 뒤 게시글당 관리자 답변 하나만 등록한다.
    @Transactional
    public InquiryMessageResponse answer(Long inquiryId, Long memberId, InquiryMessageRequest request) {
        Inquiry inquiry = inquiries.findByIdForUpdate(inquiryId).orElseThrow(this::notFound);
        Member sender = activeMember(memberId);
        if (sender.getRole() != com.oishidam.member.enums.MemberRole.ADMIN) {
            throw new ApiException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "관리자만 답변할 수 있습니다.");
        }
        if ("ANSWERED".equals(inquiry.getStatus()) || messages.existsByInquiryIdAndSenderIdNot(inquiryId, inquiry.getMember().getId())) {
            throw new ApiException(HttpStatus.CONFLICT, "INQUIRY_ALREADY_ANSWERED", "이미 답변이 등록된 문의입니다.");
        }
        inquiry.changeStatus("ANSWERED");
        return message(saveMessage(inquiry, sender, request.content()));
    }

    // 문의 본문 또는 최초 답변을 저장한다.
    private InquiryMessage saveMessage(Inquiry inquiry, Member sender, String content) {
        return messages.save(InquiryMessage.builder().inquiry(inquiry).sender(sender).content(content.trim()).build());
    }

    // 문의 목록 응답 변환
    private InquirySummaryResponse summary(Inquiry i) {
        return new InquirySummaryResponse(i.getId(), i.getTitle(), i.getStatus(), i.getMember().getId(), i.getMember().getName(), i.getCreatedAt());
    }

    // 문의 메시지 응답 변환
    private InquiryMessageResponse message(InquiryMessage m) {
        return new InquiryMessageResponse(m.getId(), m.getInquiry().getId(), m.getSender().getId(), m.getContent(), m.getCreatedAt());
    }

    // 이용 가능한 회원 조회
    private Member activeMember(Long id) {
        return members.findById(id).filter(Member::isActive).orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }

    // 문의 처리 상태 검증
    private void validateStatus(String status) {
        if (!List.of("OPEN", "ANSWERED").contains(status)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_STATUS", "문의 상태가 올바르지 않습니다.");
        }
    }

    // 문의 목록 페이지 조건 검증
    private Pageable pageable(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        return PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    }

    // 다른 고객의 문의도 존재하지 않는 것처럼 처리한다.
    private ApiException notFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "INQUIRY_NOT_FOUND", "문의를 찾을 수 없습니다.");
    }
}
