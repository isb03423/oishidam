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

@Service
@RequiredArgsConstructor
public class InquiryService {
    private final InquiryRepository inquiries;

    private final InquiryMessageRepository messages;

    private final MemberRepository members;

    private final OrderRepository orders;

    // 공개 문의 목록은 제목만 반환한다.
    @Transactional(readOnly = true)
    public Page<InquiryPublicResponse> publicList(int page, int size) {
        return inquiries.findAll(pageable(page, size)).map(i -> new InquiryPublicResponse(i.getId(), i.getTitle()));
    }

    // 로그인 고객의 문의 목록
    @Transactional(readOnly = true)
    public Page<InquirySummaryResponse> myList(Long memberId, int page, int size) {
        activeMember(memberId);
        return inquiries.findAll((root, query, cb) -> cb.equal(root.get("member").get("id"), memberId), pageable(page, size)).map(this::summary);
    }

    // 관리자 문의 검색 및 상태별 조회
    @Transactional(readOnly = true)
    public Page<InquirySummaryResponse> adminList(String keyword, String status, int page, int size) {
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
        return inquiries.findAll(filter, pageable(page, size)).map(this::summary);
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

    // 작성자 또는 관리자만 문의 대화를 조회한다.
    @Transactional(readOnly = true)
    public InquiryDetailResponse detail(Long inquiryId, Long memberId, boolean admin) {
        Inquiry inquiry = inquiries.findById(inquiryId).orElseThrow(this::notFound);
        if (!admin && !inquiry.getMember().getId().equals(memberId)) {
            throw notFound();
        }
        List<InquiryMessageResponse> items = messages.findByInquiryIdOrderByIdAsc(inquiryId).stream().map(this::message).toList();
        return new InquiryDetailResponse(
                inquiry.getId(), inquiry.getTitle(), inquiry.getStatus(), inquiry.getMember().getId(),
                inquiry.getOrder() == null ? null : inquiry.getOrder().getId(), inquiry.getCreatedAt(), items
        );
    }

    // 답변 시 처리 완료, 고객의 후속 문의 시 답변 대기로 변경한다.
    @Transactional
    public InquiryMessageResponse addMessage(Long inquiryId, Long memberId, boolean admin, InquiryMessageRequest request) {
        Inquiry inquiry = inquiries.findByIdForUpdate(inquiryId).orElseThrow(this::notFound);
        if (!admin && !inquiry.getMember().getId().equals(memberId)) {
            throw notFound();
        }
        Member sender = activeMember(memberId);
        inquiry.changeStatus(admin ? "ANSWERED" : "OPEN");
        return message(saveMessage(inquiry, sender, request.content()));
    }

    // 관리자 문의 상태 변경
    @Transactional
    public InquirySummaryResponse changeStatus(Long inquiryId, String status) {
        validateStatus(status);
        Inquiry inquiry = inquiries.findByIdForUpdate(inquiryId).orElseThrow(this::notFound);
        inquiry.changeStatus(status);
        return summary(inquiry);
    }

    // 문의 대화 메시지 저장
    private InquiryMessage saveMessage(Inquiry inquiry, Member sender, String content) {
        return messages.save(InquiryMessage.builder().inquiry(inquiry).sender(sender).content(content.trim()).build());
    }

    // 문의 목록 응답 변환
    private InquirySummaryResponse summary(Inquiry i) {
        return new InquirySummaryResponse(i.getId(), i.getTitle(), i.getStatus(), i.getMember().getId(), i.getCreatedAt());
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
