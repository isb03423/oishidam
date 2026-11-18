package com.oishidam.admin.review.service;

import com.oishidam.admin.review.dto.AdminReviewResponse;
import com.oishidam.admin.review.enums.ReviewSentimentFilter;
import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.enums.MemberRole;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.review.dto.ReviewContentRequest;
import com.oishidam.review.entity.Review;
import com.oishidam.review.entity.ReviewSentiment;
import com.oishidam.review.repository.ReviewRepository;
import com.oishidam.review.repository.ReviewSentimentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminReviewService {
    private final ReviewRepository reviews;
    private final ReviewSentimentRepository sentiments;

    private final MemberRepository members;

    private final Clock clock;

    // 관리자: 리뷰 목록
    @Transactional(readOnly = true)
    public Page<AdminReviewResponse> adminList(
            Long productId,
            String productName,
            String keyword,
            Boolean answered,
            ReviewSentimentFilter sentiment,
            int page,
            int size
    ) {
        if (keyword != null && keyword.length() > 100 || productName != null && productName.length() > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_KEYWORD", "검색어는 100자 이하여야 합니다.");
        }
        String search = keyword == null || keyword.isBlank() ? "" : keyword.trim()
                .replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
        String name = productName == null ? "" : productName.trim()
                .replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");

        // 조건에 맞는 리뷰와 상품 정보 조회
        Page<Review> result = reviews.findForAdmin(productId, name, search, answered,
                sentiment == null ? null : sentiment.name(), pageable(page, size));
        Map<Long, String> results = result.isEmpty() ? Map.of() : sentiments.findCurrentByReviewIdIn(
                result.getContent().stream().map(Review::getId).toList()).stream()
                .collect(Collectors.toMap(ReviewSentiment::getReviewId, ReviewSentiment::getSentiment));
        return result.map(review -> AdminReviewResponse.from(review, review.getOrderItem().getProductId(), results.get(review.getId())));
    }

    // 관리자: 리뷰 상세
    @Transactional(readOnly = true)
    public AdminReviewResponse adminDetail(Long reviewId) {
        Review review = reviews.findById(reviewId).filter(value -> value.getDeletedAt() == null)
                .orElseThrow(this::notFound);
        return AdminReviewResponse.from(review, productId(review), sentiment(reviewId));
    }

    // 관리자: 리뷰 답변
    @Transactional
    public AdminReviewResponse answer(
            Long adminId,
            Long reviewId,
            ReviewContentRequest request
    ) {
        Member admin = activeMember(adminId);

        // 관리자 권한 확인
        if (admin.getRole() != MemberRole.ADMIN) {
            throw new ApiException(HttpStatus.FORBIDDEN, "ADMIN_REQUIRED", "관리자 권한이 필요합니다.");
        }
        Review review = reviews.findByIdAndDeletedAtIsNull(reviewId).orElseThrow(this::notFound);
        review.answer(admin, request.content().trim(), LocalDateTime.now(clock));
        return AdminReviewResponse.from(review, productId(review), sentiment(reviewId));
    }

    // 삭제되지 않은 리뷰의 최신 감정 분석 결과를 반환한다.
    private String sentiment(Long reviewId) {
        return sentiments.findCurrentByReviewIdIn(List.of(reviewId)).stream()
                .map(ReviewSentiment::getSentiment).findFirst().orElse(null);
    }

    // 리뷰의 상품 ID 조회
    private Long productId(Review review) {
        return review.getOrderItem().getProductId();
    }

    // 활성 회원 조회
    private Member activeMember(Long memberId) {
        return members.findById(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }

    // 페이지 요청 검증 및 정렬 설정
    private PageRequest pageable(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        return PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id")));
    }

    // 조회 대상이 없을 때 반환할 오류 생성
    private ApiException notFound() {
        return new ApiException(HttpStatus.NOT_FOUND, "REVIEW_NOT_FOUND", "리뷰를 찾을 수 없습니다.");
    }

}
