package com.oishidam.review.service;

import com.oishidam.common.ai.AiServiceClient;
import com.oishidam.common.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.client.RestClientException;

@Service
@Slf4j
public class ReviewSentimentService {
    private final AiServiceClient client;

    private final TaskExecutor executor;

    public ReviewSentimentService(
            AiServiceClient client,
            @Qualifier("applicationTaskExecutor") TaskExecutor executor
    ) {
        this.client = client;
        this.executor = executor;
    }

    // 저장이 확정된 후기만 분석하고 AI 장애가 후기 저장을 실패시키지 않도록 한다.
    public void analyzeAfterCommit(Long reviewId) {
        String accessToken = client.accessToken();
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                try {
                    executor.execute(() -> analyze(reviewId, accessToken));
                } catch (TaskRejectedException error) {
                    log.warn("후기 감정분석 작업 등록 실패, 관리자 재분석 필요: reviewId={}", reviewId);
                }
            }
        });
    }

    // 백그라운드에서 작성자의 JWT로 요청하고 실패한 후기는 미분석 상태로 남긴다.
    private void analyze(Long reviewId, String accessToken) {
        try {
            // shortcut: 메모리 작업이므로 재시도·서버 재시작 복구가 필요해지면 영속 작업 큐로 전환한다.
            client.analyzeReview(reviewId, accessToken);
        } catch (RestClientException | ApiException error) {
            log.warn(
                    "후기 감정분석 실패, 관리자 재분석 필요: reviewId={}, error={}",
                    reviewId, error.getClass().getSimpleName()
            );
        }
    }
}
