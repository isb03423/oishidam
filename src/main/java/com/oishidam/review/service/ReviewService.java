package com.oishidam.review.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderStatusHistoryRepository;
import com.oishidam.product.service.ProductService;
import com.oishidam.review.dto.PublicReviewResponse;
import com.oishidam.review.dto.ReviewContentRequest;
import com.oishidam.review.dto.ReviewEligibilityResponse;
import com.oishidam.review.dto.ReviewResponse;
import com.oishidam.review.entity.Review;
import com.oishidam.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviews;

    private final OrderItemRepository items;

    private final OrderStatusHistoryRepository histories;

    private final MemberRepository members;

    private final ProductService products;

    private final Clock clock;

    // 상품 리뷰 목록
    @Transactional(readOnly = true)
    public Page<PublicReviewResponse> publicList(
            Long productId,
            int page,
            int size
    ) {
        var pageable = pageable(page, size);
        products.detail(productId);
        return reviews.findPublicByProductId(productId, pageable).map(PublicReviewResponse::from);
    }

    // 리뷰 작성 가능 여부
    @Transactional(readOnly = true)
    public ReviewEligibilityResponse eligibility(Long memberId, Long itemId) {
        activeMember(memberId);
        OrderItem item = item(itemId, memberId);
        Review review = reviews.findByOrderItemId(itemId).orElse(null);

        // 배송 완료 여부와 리뷰 작성 기한 확인
        LocalDateTime deadline = writeDeadline(item);
        boolean eligible = review == null && deadline != null && LocalDateTime.now(clock).isBefore(deadline);
        ReviewResponse response = review == null || review.getDeletedAt() != null ? null : ReviewResponse.from(review);
        return new ReviewEligibilityResponse(
                eligible,
                deadline,
                response == null ? null : response.editableUntil(),
                response
        );
    }

    // 리뷰 작성
    @Transactional
    public ReviewResponse create(
            Long memberId,
            Long itemId,
            ReviewContentRequest request
    ) {
        Member member = lockMember(memberId);
        OrderItem item = item(itemId, memberId);
        LocalDateTime deadline = writeDeadline(item);
        if (deadline == null || !LocalDateTime.now(clock).isBefore(deadline)) {
            throw new ApiException(HttpStatus.CONFLICT, "REVIEW_NOT_ELIGIBLE", "리뷰 작성 기간이 아니거나 배송이 완료되지 않았습니다.");
        }

        // 기존 리뷰 중복 확인
        if (reviews.findByOrderItemId(itemId).isPresent()) {
            throw new ApiException(HttpStatus.CONFLICT, "REVIEW_ALREADY_EXISTS", "이미 리뷰를 작성한 주문 상품입니다.");
        }
        return ReviewResponse.from(
                reviews.saveAndFlush(
                        Review.builder()
                                .orderItem(item)
                                .member(member)
                                .content(request.content().trim())
                                .build()
                )
        );
    }

    // 리뷰 수정
    @Transactional
    public ReviewResponse update(
            Long memberId,
            Long reviewId,
            ReviewContentRequest request
    ) {
        lockMember(memberId);
        Review review = ownReview(reviewId, memberId);
        validateEditable(review);
        review.updateContent(request.content().trim());
        reviews.flush();
        return ReviewResponse.from(review);
    }

    // 리뷰 삭제
    @Transactional
    public void delete(Long memberId, Long reviewId) {
        lockMember(memberId);
        Review review = ownReview(reviewId, memberId);
        validateEditable(review);
        review.delete(LocalDateTime.now(clock));
    }

    // 배송 완료일 기준 리뷰 작성 기한 조회
    private LocalDateTime writeDeadline(OrderItem item) {
        if (item.getOrder().getOrderStatus() != OrderStatus.DELIVERED) {
            return null;
        }
        return histories.findFirstByOrderIdAndNewStatusOrderByIdAsc(item.getOrder().getId(), OrderStatus.DELIVERED)
                .map(history -> history.getCreatedAt().plusDays(30)).orElse(null);
    }

    // 리뷰 수정·삭제 가능 시간 확인
    private void validateEditable(Review review) {
        if (!LocalDateTime.now(clock).isBefore(review.getCreatedAt().plusHours(24))) {
            throw new ApiException(HttpStatus.CONFLICT, "REVIEW_EDIT_EXPIRED", "리뷰 수정·삭제 가능 시간이 지났습니다.");
        }
    }

    // 회원의 주문 상품 조회
    private OrderItem item(Long itemId, Long memberId) {
        return items.findByIdAndOrderMemberId(itemId, memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "ORDER_ITEM_NOT_FOUND", "주문 상품을 찾을 수 없습니다."));
    }

    // 회원이 작성한 리뷰 조회
    private Review ownReview(Long reviewId, Long memberId) {
        return reviews.findByIdAndMemberIdAndDeletedAtIsNull(reviewId, memberId).orElseThrow(this::notFound);
    }

    // 활성 회원 조회
    private Member activeMember(Long memberId) {
        return members.findById(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
    }

    // 활성 회원 조회 및 잠금
    private Member lockMember(Long memberId) {
        return members.findByIdForUpdate(memberId).filter(Member::isActive)
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
