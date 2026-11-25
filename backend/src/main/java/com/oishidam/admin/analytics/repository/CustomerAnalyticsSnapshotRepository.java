package com.oishidam.admin.analytics.repository;

import com.oishidam.admin.analytics.entity.CustomerAnalyticsSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerAnalyticsSnapshotRepository extends JpaRepository<CustomerAnalyticsSnapshot, Integer> {
    @Query(value = """
            SELECT CAST(jsonb_extract_path(report, 'customers') AS text)
            FROM customer_analytics_snapshot
            WHERE snapshot_id = :id
            """, nativeQuery = true)
    Optional<String> findCustomerRows(int id);
}
