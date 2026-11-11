<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  moreTo: { type: [String, Object], default: null },
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})
defineEmits(['retry'])
</script>

<template>
  <section class="product-section" :aria-labelledby="`${id}-heading`" :aria-busy="loading">
    <header class="product-section-heading">
      <div class="product-section-copy">
        <h2 :id="`${id}-heading`" class="product-section-title">
          <RouterLink v-if="moreTo" class="product-section-title-link" :to="moreTo">{{ title }}</RouterLink>
          <template v-else>{{ title }}</template>
        </h2>
        <p class="product-section-subtitle">{{ subtitle }}</p>
      </div>
      <RouterLink v-if="moreTo" class="product-section-more" :to="moreTo" :aria-label="`${title} 더보기`">
        더보기 <span aria-hidden="true">›</span>
      </RouterLink>
    </header>

    <div v-if="loading" class="product-grid" role="status" aria-label="상품 불러오는 중">
      <div v-for="index in 3" :key="index" class="product-skeleton" aria-hidden="true"></div>
    </div>
    <div v-else-if="error" class="product-state" role="status">
      <p>상품을 불러오지 못했어요.</p>
      <p class="product-error-detail">{{ error }}</p>
      <button class="product-retry" type="button" @click="$emit('retry')">다시 시도</button>
    </div>
    <div v-else-if="!products.length" class="product-state" role="status">아직 등록된 상품이 없어요.</div>
    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products.slice(0, 3)"
        :key="product.product_id"
        :product="product"
      />
    </div>
  </section>
</template>

<style scoped>
/* 제목 영역 · 왼쪽 제목과 설명, 오른쪽 더보기 */
.product-section {
  min-width: 0;
}

.product-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.product-section-copy {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  min-width: 0;
  gap: 6px 14px;
}

.product-section-title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(19px, 1.65vw, 25px);
  font-weight: 750;
  line-height: 1.3;
  letter-spacing: -.025em;
}

.product-section-subtitle {
  margin: 0;
  color: #82767c;
  font-size: 12px;
}

/* 제목도 더보기와 같은 화면으로 이동 */
.product-section-title-link,
.product-section-title-link:hover {
  color: inherit;
  text-decoration: none;
}

.product-section-title-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* 더보기 · 배경과 테두리 없이 텍스트 링크로 표시 */
.product-section-more {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  min-height: 32px;
  color: var(--color-text);
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}

.product-section-more span {
  font-size: 17px;
  line-height: 1;
}

.product-section-more:hover {
  color: var(--color-primary);
}

.product-section-more:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* 각 섹션은 상품 카드 세 개로 구성 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

/* 로딩 · 빈 목록 · 실패 상태 */
.product-skeleton {
  aspect-ratio: 1 / 1.42;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: linear-gradient(#f4f2f2 0 72%, #fff 72%);
}

.product-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 230px;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  color: #82767c;
  text-align: center;
  font-size: 13px;
}

.product-state p {
  margin: 0;
}

.product-error-detail {
  max-width: 100%;
  overflow-wrap: anywhere;
  font-size: 11px;
}

.product-retry {
  padding: 7px 14px;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  background: #fff;
  color: var(--color-primary);
  cursor: pointer;
}

/* 모바일 · 가로 스크롤로 카드 크기 유지 */
@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(155px, 1fr));
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .product-section-heading {
    margin-bottom: 14px;
  }
}
</style>
