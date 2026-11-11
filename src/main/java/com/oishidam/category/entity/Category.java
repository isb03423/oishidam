package com.oishidam.category.entity;

import com.oishidam.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    public void update(Category parent, String name, int sortOrder, boolean isActive) {
        this.parent = parent;
        this.name = name;
        this.sortOrder = sortOrder;
        this.isActive = isActive;
    }

    public Category(Category parent, String name, int sortOrder, boolean isActive) {
        this.parent = parent;
        this.name = name;
        this.sortOrder = sortOrder;
        this.isActive = isActive;
    }
}
