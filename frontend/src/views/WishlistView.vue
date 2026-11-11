<script setup>
import { computed, ref, watch } from 'vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import ProductCard from '../components/product/ProductCard.vue'
import { addProductsToCart } from '../stores/cart.js'
import { removeWishes, wishedIds, wishedProducts } from '../stores/wishlist.js'

const selection = ref([])
const sort = ref('new')
const cartMessage = ref('')
const allSelected = computed(() =>
  wishedIds.value.length > 0 && selection.value.length === wishedIds.value.length,
)
const products = computed(() => {
  if (sort.value === 'new') return wishedProducts.value
  const direction = sort.value === 'price-asc' ? 1 : -1
  return [...wishedProducts.value].sort((a, b) => {
    if (!Number.isFinite(a.min_price)) return Number.isFinite(b.min_price) ? 1 : 0
    if (!Number.isFinite(b.min_price)) return -1
    return (a.min_price - b.min_price) * direction
  })
})

watch(wishedIds, (ids) => {
  selection.value = selection.value.filter((id) => ids.includes(id))
  cartMessage.value = ''
})

function addSelectionToCart() {
  const selected = wishedProducts.value.filter((product) => selection.value.includes(product.product_id))
  const { added, existing, unavailable, needsOption } = addProductsToCart(selected)
  cartMessage.value = [
    added && `${added}개 상품을 장바구니에 담았어요.`,
    existing && `이미 담긴 상품 ${existing}개`,
    unavailable && `담을 수 없는 상품 ${unavailable}개`,
    needsOption && `옵션 선택이 필요한 상품 ${needsOption}개`,
  ].filter(Boolean).join(' · ')
}
</script>

<template>
  <MyPageLayout
    class="wishlist-page"
    title="찜한 상품"
    description="관심 있는 상품을 저장하고, 언제든지 다시 확인해보세요."
  >
    <template #title-icon>
      <svg class="wishlist-title-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    </template>

    <template v-if="products.length">
      <div class="wishlist-toolbar">
        <label class="wishlist-select-all">
          <input
            type="checkbox"
            :checked="allSelected"
            :indeterminate="selection.length > 0 && !allSelected"
            @change="selection = $event.target.checked ? [...wishedIds] : []"
          />
          전체 선택 ({{ products.length }})
        </label>
        <select v-model="sort" aria-label="찜한 상품 정렬">
          <option value="new">최근 찜한 순</option>
          <option value="price-asc">낮은 가격순</option>
          <option value="price-desc">높은 가격순</option>
        </select>
      </div>

      <div class="wishlist-grid">
        <div v-for="product in products" :key="product.product_id" class="wishlist-item">
          <input
            v-model="selection"
            class="wishlist-item-select"
            type="checkbox"
            :value="product.product_id"
            :aria-label="`${product.name} 선택`"
          />
          <ProductCard :product="product" />
        </div>
      </div>

      <div class="wishlist-selection">
        <span aria-live="polite">선택된 상품 <strong>{{ selection.length }}개</strong></span>
        <div class="wishlist-selection-actions">
          <button type="button" :disabled="!selection.length" @click="removeWishes(selection)">
            선택 상품 삭제
          </button>
          <button class="wishlist-add-to-cart" type="button" :disabled="!selection.length" @click="addSelectionToCart">
            선택 상품 장바구니 담기
          </button>
        </div>
      </div>
      <p class="wishlist-cart-message" role="status">{{ cartMessage }}</p>
    </template>

    <div v-else class="wishlist-empty">
      <p role="status">아직 찜한 상품이 없어요.</p>
      <p>상품 카드의 하트를 누르면 여기에 표시돼요.</p>
      <RouterLink :to="{ name: 'Home' }">상품 둘러보기</RouterLink>
    </div>
  </MyPageLayout>
</template>

<style scoped>
.wishlist-page :deep(.mypage-heading p) {
  transform: translateY(-2px);
}

.wishlist-title-icon {
  align-self: flex-end;
  transform: translateY(2px);
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wishlist-toolbar,
.wishlist-selection {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  font-size: 13px;
}

.wishlist-select-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.wishlist-toolbar select,
.wishlist-selection button {
  min-height: 32px;
  padding: 0 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: #fff;
  color: inherit;
  font: inherit;
}

.wishlist-selection button:enabled {
  border-color: var(--color-primary);
  color: var(--color-primary);
  cursor: pointer;
}

.wishlist-selection button:disabled {
  opacity: .5;
}

.wishlist-selection-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.wishlist-selection .wishlist-add-to-cart {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}

.wishlist-selection .wishlist-add-to-cart:enabled {
  color: #fff;
}

.wishlist-cart-message {
  margin: 0;
  font-size: 13px;
}

.wishlist-cart-message:not(:empty) {
  margin-top: 8px;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 12px 0;
}

.wishlist-item {
  position: relative;
}

.wishlist-item-select {
  position: absolute;
  z-index: 1;
  top: 12px;
  left: 12px;
  margin: 0;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
}

.wishlist-selection strong,
.wishlist-empty a {
  color: var(--color-primary);
}

.wishlist-empty {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 40px 12px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  font-size: 14px;
}

.wishlist-empty p {
  margin: 0;
}

@media (max-width: 600px) {
  .wishlist-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
}
</style>
