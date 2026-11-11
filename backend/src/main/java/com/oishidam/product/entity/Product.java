package com.oishidam.product.entity;

import com.oishidam.category.entity.Category;
import com.oishidam.common.entity.BaseEntity;
import com.oishidam.product.enums.SaleStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "description", nullable = false, columnDefinition = "text")
    private String description;

    @Column(name = "brand", length = 100)
    private String brand;

    @Enumerated(EnumType.STRING)
    @Column(name = "sale_status", nullable = false, length = 20)
    private SaleStatus saleStatus;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public void update(Category category, String name, String description, String brand) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.brand = brand;
    }

    public void changeStatus(SaleStatus saleStatus, LocalDateTime publishedAt) {
        this.saleStatus = saleStatus;
        this.publishedAt = publishedAt;
    }

    public void delete(LocalDateTime now) {
        this.deletedAt = now;
        this.saleStatus = SaleStatus.STOPPED;
    }

    public Product(Category category, String name, String description, String brand, SaleStatus saleStatus,
            LocalDateTime publishedAt) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.saleStatus = saleStatus;
        this.publishedAt = publishedAt;
    }
}
