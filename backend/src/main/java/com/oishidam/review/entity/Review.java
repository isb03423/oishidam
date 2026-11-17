package com.oishidam.review.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.member.entity.Member;
import com.oishidam.order.entity.OrderItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reviews")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Review extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_item_id", nullable = false, unique = true)
    private OrderItem orderItem;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @ElementCollection
    @CollectionTable(name = "review_images", joinColumns = @JoinColumn(name = "review_id"))
    @OrderColumn(name = "sort_order")
    @Column(name = "image_url", nullable = false, length = 500)
    @Builder.Default
    private List<String> imageUrls = new ArrayList<>();

    private LocalDateTime deletedAt;

    @Column(columnDefinition = "text")
    private String answerContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answered_by")
    private Member answeredBy;

    private LocalDateTime answeredAt;

    private LocalDateTime answerUpdatedAt;

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateImages(List<String> imageUrls) {
        this.imageUrls.clear();
        this.imageUrls.addAll(imageUrls);
    }

    public void delete(LocalDateTime now) {
        this.deletedAt = now;
    }

    public void answer(Member admin, String content, LocalDateTime now) {
        this.answerContent = content;
        this.answeredBy = admin;
        if (this.answeredAt == null) {
            this.answeredAt = now;
        }
        this.answerUpdatedAt = now;
    }
}
