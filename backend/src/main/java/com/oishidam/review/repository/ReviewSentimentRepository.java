package com.oishidam.review.repository;

import com.oishidam.review.entity.ReviewSentiment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface ReviewSentimentRepository extends JpaRepository<ReviewSentiment, Long> {
    @Query("""
            SELECT s FROM ReviewSentiment s JOIN Review r ON r.id = s.reviewId
            WHERE s.reviewId IN :reviewIds AND r.deletedAt IS NULL
            """)
    List<ReviewSentiment> findCurrentByReviewIdIn(@Param("reviewIds") Collection<Long> reviewIds);
}
