<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { session } from '../../stores/session.js'
import { toggleWish, wishedIds, wishBusy, wishLoading } from '../../stores/wishlist.js'

const props = defineProps({
  product: { type: Object, required: true },
  badge: { type: String, default: '' },
  interactive: { type: Boolean, default: true },
})
const router = useRouter()
const wished = computed(() => Boolean(session.member) && wishedIds.value.includes(props.product.product_id))
const imageFailed = ref(false)
const image = computed(() => props.product.images?.find((item) => item.is_primary) || props.product.images?.[0])
const imageSource = computed(() => image.value?.url || '')
watch(imageSource, () => { imageFailed.value = false })
const price = computed(() => props.product.min_price)
const stockLabel = computed(() => {
  const product = props.product
  if (product.is_sold_out) return '품절'

  let remaining = product.stock_quantity
  if (!Number.isFinite(remaining)) {
    const activeVariants = product.variants?.filter((variant) => variant.is_active) ?? []
    remaining = activeVariants.reduce((total, variant) => total + (variant.stock_quantity ?? NaN), 0)
  }
  return remaining > 0 && remaining < 5 ? '품절 임박' : ''
})
const formatPrice = (value) => new Intl.NumberFormat('ko-KR').format(value)

function toggleProductWish() {
  if (!session.member) {
    router.push({ name: 'Login' })
    return
  }
  toggleWish(props.product)
}
</script>

<template>
  <article class="product-card">
    <RouterLink
      v-if="interactive"
      class="product-detail-link"
      :to="`/products/${encodeURIComponent(product.product_id)}`"
      :aria-label="`${product.name} 상품 상세보기`"
    />
    <div class="product-image-area">
      <span v-if="badge" class="product-badge">{{ badge }}</span>
      <img
        v-if="imageSource && !imageFailed"
        class="product-image"
        :src="imageSource"
        :alt="image.alt_text || product.name"
        loading="lazy"
        decoding="async"
        @error="imageFailed = true"
      />
      <div v-else class="product-image-placeholder" role="img" :aria-label="`${product.name} 이미지 준비 중`">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="8" y="8" width="32" height="32" rx="5" />
          <circle cx="18" cy="18" r="3" />
          <path d="m9 34 10-10 7 7 5-5 9 9" />
        </svg>
        <span>이미지 준비 중</span>
      </div>
      <button
        v-if="interactive"
        type="button"
        class="product-wish"
        :class="{ 'is-wished': wished }"
        :aria-label="`${product.name} ${wished ? '찜 해제' : '찜하기'}`"
        :aria-pressed="wished"
        :disabled="wishBusy || wishLoading"
        @click="toggleProductWish"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
      </button>
      <span v-if="stockLabel" class="product-stock-label" :class="{ 'is-low-stock': !product.is_sold_out }">{{ stockLabel }}</span>
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-prices">
        <strong class="product-price">{{ Number.isFinite(price) ? `${formatPrice(price)}원` : '가격 확인 중' }}</strong>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* 카드 전체 · 여러 상품 영역에서 공통 사용 */
.product-card {
  position: relative;
  isolation: isolate;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #eeeaec;
  border-radius: 9px;
  background: var(--color-white);
  color: var(--color-text);
}

/* 카드 전체 클릭 영역 · 찜 버튼은 링크 위에서 별도로 동작 */
.product-detail-link {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
}

.product-detail-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

/* 누끼 상품 이미지 · 회색 배경은 사진이 아닌 CSS로 통일 */
.product-image-area {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f4f2f2;
}

.product-image {
  display: block;
  width: 100%;
  height: 100%;
  padding: 18px;
  object-fit: contain;
}

.product-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #9b9297;
  font-size: var(--font-size-caption);
}

.product-image-placeholder svg {
  width: 38px;
  height: 38px;
  fill: none;
  stroke: #c4bcc0;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 우측 상단 찜 버튼 */
.product-wish {
  position: absolute;
  z-index: 2;
  top: 8px;
  right: 8px;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 7px;
  border: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 92%);
  color: var(--color-text);
  cursor: pointer;
}

.product-wish svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.product-wish:hover,
.product-wish.is-wished {
  color: var(--color-primary);
}

.product-wish.is-wished svg {
  fill: var(--color-accent);
}

.product-wish:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.product-badge {
  position: absolute;
  z-index: 1;
  inset: 8px auto auto 8px;
  padding: 3px 7px;
  border-radius: 4px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-caption);
  font-weight: 700;
  pointer-events: none;
}

.product-stock-label {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgb(57 44 50 / 80%);
  color: #fff;
  font-size: var(--font-size-caption);
}

.product-stock-label.is-low-stock {
  background: #8b354e;
  font-weight: 700;
}

/* 상품명과 가격 · 긴 이름은 두 줄까지 표시 */
.product-info {
  padding: 10px 9px 12px;
}

.product-name {
  display: -webkit-box;
  margin: 0 0 3px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: var(--font-size-label);
  font-weight: 500;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.product-prices {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 3px 6px;
  font-variant-numeric: tabular-nums;
}

.product-price {
  font-size: var(--font-size-body);
  font-weight: 700;
  white-space: nowrap;
}

/* 모바일 · 상품 사진의 여백 축소 */
@media (max-width: 600px) {
  .product-image {
    padding: 14px;
  }
}
</style>
