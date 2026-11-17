package com.oishidam.inquiry.entity;

import com.oishidam.common.entity.BaseEntity;
import com.oishidam.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inquiry_messages")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class InquiryMessage extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_message_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "inquiry_id", nullable = false)
    private Inquiry inquiry;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_member_id", nullable = false)
    private Member sender;

    @Column(nullable = false, columnDefinition = "text")
    private String content;
}
