package com.oishidam.product.entity;

import com.oishidam.category.entity.Category;
import com.oishidam.common.entity.BaseEntity;
import com.oishidam.product.enums.SaleStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@SecondaryTable(name = "product_stock", pkJoinColumns = @PrimaryKeyJoinColumn(name = "product_id"))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
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

    @Column(nullable = false, precision = 14, scale = 0)
    private BigDecimal price;

    @Column(table = "product_stock", name = "stock_quantity", nullable = false)
    private int stockQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "sale_status", nullable = false, length = 20)
    private SaleStatus saleStatus;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public void update(Category category, String name, String description, BigDecimal price, int stockQuantity) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    public void restoreStock(int quantity) { stockQuantity = Math.addExact(stockQuantity, quantity); }

    public void deductStock(int quantity) { stockQuantity -= quantity; }

    public void changeStock(int quantity) { stockQuantity = quantity; }

    public void changeStatus(SaleStatus saleStatus, LocalDateTime publishedAt) {
        this.saleStatus = saleStatus;
        this.publishedAt = publishedAt;
    }

    public void delete(LocalDateTime now) {
        this.deletedAt = now;
        this.saleStatus = SaleStatus.STOPPED;
    }
}
