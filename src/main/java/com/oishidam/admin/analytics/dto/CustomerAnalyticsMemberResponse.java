package com.oishidam.admin.analytics.dto;

import java.time.LocalDateTime;

public record CustomerAnalyticsMemberResponse(
        Long memberId,
        String name,
        Integer segment,
        String segmentName,
        LocalDateTime joinedAt,
        LocalDateTime lastOrderAt,
        Long frequency,
        Long monetary,
        Long avgOrderValue
) {
    public CustomerAnalyticsMemberResponse withName(String memberName) {
        return new CustomerAnalyticsMemberResponse(
                memberId, memberName, segment, segmentName, joinedAt, lastOrderAt, frequency, monetary, avgOrderValue
        );
    }
}
