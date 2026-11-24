package com.oishidam.admin.analytics.repository;

import com.oishidam.admin.analytics.entity.CustomerAnalyticsSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerAnalyticsSnapshotRepository extends JpaRepository<CustomerAnalyticsSnapshot, Integer> {
}
