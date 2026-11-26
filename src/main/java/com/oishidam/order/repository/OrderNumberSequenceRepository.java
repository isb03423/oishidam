package com.oishidam.order.repository;

import com.oishidam.order.entity.OrderNumberSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrderNumberSequenceRepository extends JpaRepository<OrderNumberSequence, String> {
    // 날짜별 일련번호의 생성과 증가를 한 문장으로 처리해 중복 발급을 막는다.
    @Query(value = """
            INSERT INTO order_number_sequences (time_prefix, last_value) VALUES (:prefix, 1)
            ON CONFLICT (time_prefix) DO UPDATE
            SET last_value = order_number_sequences.last_value + 1
            WHERE order_number_sequences.last_value < 9999
            RETURNING last_value
            """, nativeQuery = true)
    Optional<Integer> nextSerial(@Param("prefix") String prefix);
}
