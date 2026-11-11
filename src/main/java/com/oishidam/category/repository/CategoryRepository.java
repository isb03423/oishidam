package com.oishidam.category.repository;

import com.oishidam.category.entity.Category;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByIsActiveTrueOrderBySortOrderAscIdAsc();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select c from Category c order by c.id")
    List<Category> findAllForUpdate();
}
