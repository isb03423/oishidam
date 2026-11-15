package com.oishidam.review.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.member.entity.Member;
import com.oishidam.order.entity.OrderItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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
