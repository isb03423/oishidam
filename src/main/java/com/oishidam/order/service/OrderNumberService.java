package com.oishidam.order.service;

import com.oishidam.common.exception.ApiException;
import com.oishidam.order.repository.OrderNumberSequenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class OrderNumberService {
    private static final DateTimeFormatter PREFIX = DateTimeFormatter.ofPattern("yyyyMMdd", Locale.ROOT)
            .withZone(ZoneId.of("Asia/Seoul"));

    private final OrderNumberSequenceRepository sequences;

    private final Clock clock;

    // 한국 날짜와 DB에서 원자적으로 증가하는 일별 일련번호로 주문번호를 발급한다.
    @Transactional
    public String next() {
        String prefix = PREFIX.format(clock.instant());
        int serial = sequences.nextSerial(prefix).orElseThrow(() -> new ApiException(
                    HttpStatus.SERVICE_UNAVAILABLE, "ORDER_NUMBER_EXHAUSTED", "주문이 몰리고 있습니다. 잠시 후 다시 시도해 주세요."
            ));
        return prefix + String.format(Locale.ROOT, "%04d", serial);
    }
}
