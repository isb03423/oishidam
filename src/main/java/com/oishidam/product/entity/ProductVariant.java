package com.oishidam.product.entity;

import com.oishidam.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.Map;

@Entity
@Table(name = "product_variants", uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "variant_name"}))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductVariant extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "variant_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "sku_code", nullable = false, unique = true, length = 80)
    private String skuCode;

    @Column(name = "variant_name", nullable = false, length = 200)
    private String variantName;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "option_values", nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> optionValues;

    @Column(name = "price", nullable = false, precision = 14, scale = 0)
    private BigDecimal price;

    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    public ProductVariant(Product product, String skuCode, String variantName, Map<String, Object> optionValues,
                          BigDecimal price, int stockQuantity, boolean isActive) {
        this.product = product;
        this.skuCode = skuCode;
        this.variantName = variantName;
        this.optionValues = optionValues;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.isActive = isActive;
    }

    public void update(String skuCode, String variantName, Map<String, Object> optionValues,
                       BigDecimal price, int stockQuantity, boolean isActive) {
        this.skuCode = skuCode;
        this.variantName = variantName;
        this.optionValues = optionValues;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.isActive = isActive;
    }
}
