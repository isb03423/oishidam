package com.oishidam.review.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import com.oishidam.order.entity.OrderItem;
import com.oishidam.order.repository.OrderItemRepository;
import com.oishidam.order.repository.OrderStatusHistoryRepository;
import com.oishidam.product.repository.ProductImageRepository;
import com.oishidam.review.dto.MyReviewItemResponse;
import com.oishidam.review.dto.ReviewResponse;
import com.oishidam.review.entity.Review;
import com.oishidam.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MyReviewService {
    private final OrderItemRepository orderItems;
    private final ReviewRepository reviews;
    private final OrderStatusHistoryRepository histories;
    private final ProductImageRepository images;
    private final MemberRepository members;
    private final Clock clock;

    // 본인의 작성 가능 상품과 작성한 후기를 페이지 단위로 조회한다.
    @Transactional(readOnly = true)
    public Page<MyReviewItemResponse> list(Long memberId, boolean eligible, int page, int size) {
        members.findById(memberId).filter(Member::isActive)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_MEMBER", "사용할 수 없는 회원 계정입니다."));
        if (page < 0 || size < 1 || size > 100 || (long) page * size > Integer.MAX_VALUE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        LocalDateTime now = LocalDateTime.now(clock);
        var pageable = PageRequest.of(page, size);
        Map<Long, Review> written = new HashMap<>();
        Page<OrderItem> items;
        if (eligible) {
            items = orderItems.findEligibleForReview(memberId, now.minusDays(30), pageable);
        } else {
            Page<Review> result = reviews.findWrittenByMemberId(memberId, pageable);
            if (result.hasContent()) {
                reviews.findWithImagesByIdIn(result.stream().map(Review::getId).toList())
                        .forEach(review -> written.put(review.getOrderItem().getId(), review));
            }
            items = result.map(Review::getOrderItem);
        }
        Map<Long, LocalDateTime> delivered = new HashMap<>();
        Map<Long, String> thumbnails = new HashMap<>();
        if (items.hasContent()) {
            histories.findFirstDeliveriesByOrderIdIn(items.stream().map(item -> item.getOrder().getId()).distinct().toList())
                    .forEach(history -> delivered.put(history.getOrder().getId(), history.getCreatedAt()));
            images.findByProductIdInOrderByIsPrimaryDescSortOrderAscIdAsc(items.stream().map(OrderItem::getProductId).distinct().toList())
                    .forEach(image -> thumbnails.putIfAbsent(image.getProduct().getId(), image.getStorageKey()));
        }
        return items.map(item -> {
            LocalDateTime delivery = delivered.get(item.getOrder().getId());
            Review review = written.get(item.getId());
            return new MyReviewItemResponse(item.getId(), item.getProductId(), item.getProductName(), thumbnails.get(item.getProductId()),
                    item.getOrder().getCreatedAt(), delivery, delivery == null ? null : delivery.plusDays(30),
                    review != null && now.isBefore(review.getCreatedAt().plusHours(24)), review == null ? null : ReviewResponse.from(review));
        });
    }
}
