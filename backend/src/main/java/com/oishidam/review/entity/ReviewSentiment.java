package com.oishidam.review.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "review_sentiments")
@Immutable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewSentiment {
    @Id
    @Column(name = "review_id")
    private Long reviewId;

    @Column(nullable = false, length = 20)
    private String sentiment;
}
