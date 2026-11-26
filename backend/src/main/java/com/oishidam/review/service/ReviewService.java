package com.oishidam.review.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.common.image.ImageKitService;
import com.oishidam.common.image.UploadedImage;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.enums.OrderStatus;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderStatusHistoryRepository;
import com.oishidam.product.service.ProductService;
import com.oishidam.review.dto.*;
import com.oishidam.review.entity.Review;
import com.oishidam.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private final ReviewRepository reviews;

    private final OrderItemRepository items;

    private final OrderStatusHistoryRepository histories;

    private final MemberRepository members;

    private final ProductService products;

    private final Clock clock;

    private final ImageKitService imageKitService;

    private final ReviewSentimentService sentiments;

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

    // 상품 전체 후기의 평균 별점과 평가 수 조회
    @Transactional(readOnly = true)
    public ReviewRatingSummaryResponse ratingSummary(Long productId) {
        products.detail(productId);
        return reviews.ratingSummary(productId);
    }

    // 리뷰 작성
    @Transactional
    public ReviewResponse create(
            Long memberId,
            Long itemId,
            ReviewCreateRequest request
    ) {
        return create(memberId, itemId, request, List.of());
    }

    // 첨부 이미지를 업로드하고 리뷰와 함께 저장
    @Transactional
    public ReviewResponse create(Long memberId, Long itemId, ReviewCreateRequest request, List<MultipartFile> files) {
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
        List<String> urls = uploadImages(files, 0);
        Review review = reviews.saveAndFlush(
                Review.builder()
                        .orderItem(item)
                        .member(member)
                        .content(request.content().trim())
                        .rating(request.rating())
                        .imageUrls(new ArrayList<>(urls))
                        .build()
        );
        sentiments.analyzeAfterCommit(review.getId());
        return ReviewResponse.from(review);
    }

    // 리뷰 수정
    @Transactional
    public ReviewResponse update(
            Long memberId,
            Long reviewId,
            ReviewUpdateRequest request
    ) {
        lockMember(memberId);
        Review review = ownReview(reviewId, memberId);
        validateEditable(review);
        review.updateContent(request.content().trim());
        review.updateRating(request.rating());
        reviews.flush();
        sentiments.analyzeAfterCommit(review.getId());
        return ReviewResponse.from(review);
    }

    // 이미지 수를 검증하고 트랜잭션 실패 시 업로드한 파일을 정리한다.
    private List<String> uploadImages(List<MultipartFile> files, int retained) {
        if (files != null && files.size() + retained > 5) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "TOO_MANY_REVIEW_IMAGES", "리뷰 이미지는 최대 5장까지 첨부할 수 있습니다.");
        }
        List<UploadedImage> uploaded = new ArrayList<>();
        // shortcut: 서버가 중단되면 이미지가 남을 수 있으므로 업로드가 많아지면 정리 작업을 도입한다.
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if (status != STATUS_COMMITTED) {
                    for (UploadedImage image : uploaded) {
                        try {
                            imageKitService.delete(image.fileId());
                        } catch (RuntimeException e) {
                            log.error("ImageKit 업로드 파일 정리 실패: {}", image.fileId(), e);
                        }
                    }
                }
            }
        });
        if (files != null) {
            for (MultipartFile file : files) {
                uploaded.add(imageKitService.upload(file, "/reviews"));
            }
        }
        return uploaded.stream().map(UploadedImage::url).toList();
    }

    // 기존 사진의 소유권과 수정 기한을 확인한 뒤 내용과 첨부 사진을 갱신한다.
    @Transactional
    public ReviewResponse updateWithImages(Long memberId, Long reviewId, ReviewUpdateRequest request, List<MultipartFile> files) {
        lockMember(memberId);
        Review review = ownReview(reviewId, memberId);
        validateEditable(review);
        List<String> retained =
                request.retainedImageUrls() == null ? List.copyOf(review.getImageUrls()) : request.retainedImageUrls();
        if (retained.size() > 5 || retained.stream().distinct().count() != retained.size()
                || !review.getImageUrls().containsAll(retained)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_REVIEW_IMAGES", "기존 첨부 이미지를 확인해 주세요.");
        }
        List<String> urls = new ArrayList<>(retained);
        urls.addAll(uploadImages(files, retained.size()));
        review.updateContent(request.content().trim());
        review.updateRating(request.rating());
        review.updateImages(urls);
        reviews.flush();
        sentiments.analyzeAfterCommit(review.getId());
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
