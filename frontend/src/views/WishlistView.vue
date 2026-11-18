<script setup>
import { computed, ref, watch } from 'vue'
import NotificationToast from '../components/common/NotificationToast.vue'
import { useToasts } from '../composables/useToasts.js'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import ProductCard from '../components/product/ProductCard.vue'
import Pagination from '../components/common/Pagination.vue'
import { getProduct } from '../services/catalog.js'
import { addProductsToCart } from '../stores/cart.js'
import { loadWishes, removeWishes, wishedIds, wishedProducts, wishLoading, wishBusy, wishError } from '../stores/wishlist.js'
import { getSessionRevision } from '../stores/session.js'

const selection = ref([])
const deleteDialog = ref(null)
const sort = ref('new')
const page = ref(1)
const pageSize = 12
const { toasts, showToast, dismissToast, pauseToast, resumeToast } = useToasts()

async function confirmDeletion(ids) {
  const revision = getSessionRevision()
  const { removed } = await removeWishes(ids)
  if (revision === getSessionRevision() && removed) showToast('success', `${removed}개 상품이 찜 목록에서 삭제되었습니다.`)
}

const allSelected = computed(() =>
  visibleProducts.value.length > 0 && visibleProducts.value.every((product) => selection.value.includes(product.product_id)),
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
const pageCount = computed(() => Math.ceil(products.value.length / pageSize))
const visibleProducts = computed(() => products.value.slice((page.value - 1) * pageSize, page.value * pageSize))

watch(sort, () => {
  page.value = 1
  selection.value = []
})

watch(page, () => { selection.value = [] })

watch(pageCount, (count) => {
  page.value = Math.min(page.value, Math.max(1, count))
})

watch(wishedIds, (ids) => {
  selection.value = selection.value.filter((id) => ids.includes(id))
})

async function addSelectionToCart() {
  const revision = getSessionRevision()
  const selected = wishedProducts.value.filter((product) => selection.value.includes(product.product_id))
  if (!selected.length) {
    showToast('warning', '상품을 먼저 선택해주세요.')
    return
  }

  const results = await Promise.allSettled(selected.map((product) => getProduct(product.product_id)))
  if (revision !== getSessionRevision()) return
  const current = results.filter((result) => result.status === 'fulfilled').map((result) => result.value)
  const { added, existing, unavailable } = await addProductsToCart(current)
  if (revision !== getSessionRevision()) return
  if (added) showToast('info', `${added}개 상품을 장바구니에 담았어요.`)
  if (existing) showToast('info', `이미 담긴 상품 ${existing}개`)
  if (unavailable + selected.length - current.length) showToast('warning', `담을 수 없는 상품 ${unavailable + selected.length - current.length}개`)
}
</script>

<template>
  <MyPageLayout icon="heart"
    class="wishlist-page"
    title="찜한 상품"
    description="관심 있는 상품을 저장하고, 언제든지 다시 확인해보세요."
  >
    <template #overlay>
      <NotificationToast :items="toasts" @dismiss="dismissToast" @pause="pauseToast" @resume="resumeToast" />
    </template>

    <p v-if="wishLoading" class="wishlist-empty" role="status">찜 목록을 불러오고 있어요.</p>
    <p v-if="wishError" class="wishlist-empty">목록을 다시 불러와 주세요. <button type="button" :disabled="wishLoading || wishBusy" @click="loadWishes">다시 시도</button></p>
    <template v-if="products.length">
      <div class="wishlist-toolbar">
        <label class="wishlist-select-all">
          <input
            type="checkbox"
            :checked="allSelected"
            :indeterminate="selection.length > 0 && !allSelected"
            @change="selection = $event.target.checked ? visibleProducts.map((product) => product.product_id) : []"
          />
          현재 페이지 전체 선택 ({{ visibleProducts.length }}) · 총 {{ products.length }}개
        </label>
        <select v-model="sort" aria-label="찜한 상품 정렬">
          <option value="new">최근 찜한 순</option>
          <option value="price-asc">낮은 가격순</option>
          <option value="price-desc">높은 가격순</option>
        </select>
      </div>

      <div class="wishlist-grid">
        <div v-for="product in visibleProducts" :key="product.product_id" class="wishlist-item">
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
          <button type="button" :disabled="!selection.length || wishBusy || wishLoading" @click="deleteDialog.open(selection)">
            선택 상품 삭제
          </button>
          <button class="wishlist-add-to-cart" type="button" @click="addSelectionToCart">
            선택 상품 장바구니 담기
          </button>
        </div>
      </div>
    </template>

    <div v-else-if="!wishLoading && !wishError" class="wishlist-empty">
      <p role="status">아직 찜한 상품이 없어요.</p>
      <p>상품 카드의 하트를 누르면 여기에 표시돼요.</p>
      <RouterLink :to="{ name: 'Home' }">상품 둘러보기</RouterLink>
    </div>
    <DeleteConfirmationDialog ref="deleteDialog" description="선택한 상품이 찜한 목록에서 삭제됩니다." @confirm="confirmDeletion" />
    <template v-if="pageCount > 1" #below>
      <Pagination v-model="page" :page-count="pageCount" label="찜한 상품 목록 페이지" />
    </template>
  </MyPageLayout>
</template>

<style scoped>
.wishlist-page {
  position: relative;
}

.wishlist-page :deep(.mypage-heading p) {
  transform: translateY(-2px);
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
  font-size: var(--font-size-table);
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
  font-size: var(--font-size-control);
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
  font-size: var(--font-size-body);
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
