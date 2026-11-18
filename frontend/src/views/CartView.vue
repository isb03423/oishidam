<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { shippingFee, startCheckout } from '../stores/checkout.js'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import { cartItems, cartLoading, cartBusy, cartError, loadCart, changeCartQuantity, removeCartItems } from '../stores/cart.js'

const previewCount = 2
const cartExpanded = ref(false)
const visibleCartItems = computed(() => cartExpanded.value ? cartItems.value : cartItems.value.slice(0, previewCount))
const remainingCount = computed(() => Math.max(0, cartItems.value.length - previewCount))
const selection = ref([])
const deleteDialog = ref(null)
const router = useRouter()
const selectedItems = computed(() => cartItems.value.filter((item) => selection.value.includes(item.product_id)))
const subtotal = computed(() => selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
const formatter = new Intl.NumberFormat('ko-KR')
const won = (value) => Number.isFinite(value) ? `${formatter.format(value)}원` : '가격 확인 필요'

async function checkoutSelected() {
  await loadCart()
  if (cartError.value || !selectedItems.value.length || selectedItems.value.some((item) => !item.available)) return
  startCheckout(selectedItems.value, true)
  router.push({ name: 'Checkout' })
}
const allSelected = computed(() =>
  cartItems.value.length > 0 && selection.value.length === cartItems.value.length,
)

watch(cartItems, (items) => {
  if (items.length <= previewCount) cartExpanded.value = false
  selection.value = selection.value.filter((id) => items.some((item) => item.product_id === id))
})
onMounted(loadCart)
async function changeQuantity(id, delta) {
  try { await changeCartQuantity(id, delta) } catch { /* 오류는 장바구니 상태에 표시됩니다. */ }
}
async function deleteItems(ids) {
  try { await removeCartItems(ids) } catch { /* 성공한 항목은 유지하고 실패한 항목을 표시합니다. */ }
}
</script>

<template>
  <MyPageLayout icon="cart" title="장바구니" description="담아둔 상품을 확인하고 주문해보세요.">
    <p v-if="cartLoading" role="status">장바구니를 불러오는 중이에요.</p>
    <div v-if="cartError" role="alert"><p>{{ cartError }}</p><button type="button" :disabled="cartBusy || cartLoading" @click="loadCart">다시 불러오기</button></div>
    <div class="cart-toolbar">
      <label class="cart-select-all">
        <input
          type="checkbox"
          :checked="allSelected"
          :disabled="!cartItems.length || cartLoading || cartBusy"
          :indeterminate="selection.length > 0 && !allSelected"
          @change="selection = $event.target.checked ? cartItems.map((item) => item.product_id) : []"
        />
        전체 선택 ({{ cartItems.length }})
      </label>
      <button type="button" :disabled="!selection.length || cartLoading || cartBusy" @click="deleteDialog.open(selection)">
        선택 상품 삭제
      </button>
    </div>

    <template v-if="cartItems.length">
      <ul id="cart-items" class="cart-items">
        <li v-for="item in visibleCartItems" :key="item.product_id" class="cart-row">
          <input v-model="selection" type="checkbox" :value="item.product_id" :disabled="cartLoading || cartBusy" :aria-label="`${item.name} 선택`" />
          <RouterLink
            class="cart-thumbnail product-thumbnail-zoom"
            :to="{ name: 'ProductDetail', params: { productId: item.product_id } }"
            :aria-label="item.name + ' 상품 상세보기'"
          >
            <img v-if="item.image" :src="item.image" alt="" loading="lazy" @error="$event.target.hidden = true" />
            <span v-else>이미지 준비 중</span>
          </RouterLink>
          <div class="cart-product">
            <strong>{{ item.name || item.product_id }}</strong>
            <b>{{ won(item.price) }}</b>
            <p v-if="!item.available" role="status">판매 상태 또는 재고를 확인해주세요.</p>
          </div>
          <div class="cart-quantity" :aria-label="`${item.name} 수량`">
            <button type="button" :disabled="item.quantity <= 1 || cartLoading || cartBusy" :aria-label="`${item.name} 수량 줄이기`" @click="changeQuantity(item.product_id, -1)">−</button>
            <span aria-live="polite">{{ item.quantity }}</span>
            <button type="button" :disabled="item.quantity >= (item.stock ?? 1) || cartLoading || cartBusy" :aria-label="`${item.name} 수량 늘리기`" @click="changeQuantity(item.product_id, 1)">+</button>
          </div>
          <strong class="cart-line-total">{{ won(item.price * item.quantity) }}</strong>
          <button class="cart-remove" type="button" :disabled="cartLoading || cartBusy" :aria-label="`${item.name} 삭제`" @click="deleteDialog.open([item.product_id])">×</button>
        </li>
      </ul>
      <button
        v-if="remainingCount"
        type="button"
        class="cart-toggle"
        aria-controls="cart-items"
        :aria-expanded="cartExpanded"
        @click="cartExpanded = !cartExpanded"
      >
        {{ cartExpanded ? '상품 접기' : '나머지 상품 ' + remainingCount + '개 더 보기' }}
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      <section class="cart-summary" aria-labelledby="cart-summary-title">
        <div class="cart-summary-content">
          <h2 id="cart-summary-title">주문 금액 안내</h2>
          <dl>
            <div><dt>선택 상품 금액</dt><dd>{{ won(subtotal) }}</dd></div>
            <div><dt>배송비</dt><dd>{{ won(shippingFee) }}</dd></div>
            <div class="cart-total"><dt>총 결제 예정 금액</dt><dd>{{ won(subtotal + shippingFee) }}</dd></div>
          </dl>
        </div>
        <button class="cart-checkout" type="button" :disabled="!selectedItems.length || selectedItems.some((item) => !item.available) || cartLoading || cartBusy || Boolean(cartError) || !Number.isFinite(subtotal)" @click="checkoutSelected">
          {{ selectedItems.length ? `${selectedItems.length}개 상품 주문하기` : '선택 상품 주문하기' }}
        </button>
      </section>
    </template>
    <p v-else-if="!cartLoading && !cartError" class="cart-empty" role="status">장바구니에 담긴 상품이 없어요.</p>
    <DeleteConfirmationDialog ref="deleteDialog" description="선택한 상품이 장바구니에서 삭제됩니다." @confirm="deleteItems" />
  </MyPageLayout>
</template>

<style scoped>
.cart-toolbar,
.cart-items,
.cart-empty {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  font-size: var(--font-size-table);
}

.cart-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.cart-toolbar button {
  min-height: 32px;
  padding: 0 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: #fff;
  color: inherit;
  font: inherit;
  font-size: var(--font-size-control);
}

.cart-toolbar button:enabled {
  cursor: pointer;
}

.cart-toolbar button:disabled {
  opacity: .5;
}

.cart-select-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
}

.cart-items,
.cart-empty {
  margin: 12px 0 0;
}

.cart-items {
  list-style: none;
}

.cart-items li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
}

.cart-empty {
  padding: 28px 12px;
  text-align: center;
}
.cart-items .cart-row {
  display: grid;
  grid-template-columns: auto 80px minmax(0, 1fr) auto minmax(76px, auto) auto;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.cart-row + .cart-row { border-top: 1px solid var(--color-border); }

.cart-thumbnail {
  display: grid;
  place-items: center;
  height: 68px;
  border-radius: 9px;
  background: var(--color-background);
  color: #71666b;
  font-size: var(--font-size-caption);
}

.cart-thumbnail img { width: 100%; height: 68px; object-fit: contain; }
.cart-product { display: grid; gap: 3px; overflow-wrap: anywhere; }
.cart-product b, .cart-total dd { color: var(--color-primary); }

.cart-quantity {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.cart-quantity span { min-width: 30px; text-align: center; }
.cart-quantity button, .cart-remove {
  width: 1.875rem;
  min-height: 2rem;
  border: 0;
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  font-size: var(--font-size-section);
  cursor: pointer;
}

.cart-quantity button:first-child { border-right: 1px solid var(--color-border); }
.cart-quantity button:last-child { border-left: 1px solid var(--color-border); }
.cart-quantity button:disabled, .cart-checkout:disabled { opacity: .5; cursor: default; }
.cart-line-total { text-align: right; }

.cart-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  min-height: 40px;
  margin-top: 8px;
  padding: 5px 12px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.cart-toggle:hover { background: var(--color-background); }
.cart-toggle svg { width: 16px; height: 16px; }
.cart-toggle[aria-expanded='true'] svg { transform: rotate(180deg); }

.cart-summary {
  margin-top: 16px;
  font-size: var(--font-size-table);
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.cart-summary-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 20px;
}

.cart-summary h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: var(--font-size-section);
  font-weight: 700;
}

.cart-summary dl { margin: 0; padding-left: 16px; border-left: 1px solid var(--color-border); }
.cart-summary dl > div { display: flex; justify-content: space-between; gap: 8px; padding: 4px 0; }
.cart-summary dd { margin: 0; text-align: right; font-weight: 700; }
.cart-summary .cart-total { margin-top: 4px; padding-top: 8px; border-top: 1px solid var(--color-border); font-weight: 700; }
.cart-total dd { font-size: var(--font-size-body); }

.cart-checkout {
  width: 100%;
  min-height: 42px;
  margin-top: 14px;
  border: 0;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font: inherit;
  font-size: var(--font-size-control);
  font-weight: 700;
  cursor: pointer;
}


@media (max-width: 1000px) {
  .cart-items .cart-row { grid-template-columns: auto 60px minmax(0, 1fr) auto; gap: 8px; }
  .cart-quantity { grid-column: 3; grid-row: 2; justify-self: start; }
  .cart-line-total { grid-column: 4; grid-row: 2; }
  .cart-remove { grid-column: 4; grid-row: 1; justify-self: end; }
}

@media (max-width: 540px) {
  .cart-summary-content { grid-template-columns: 1fr; gap: 8px; }
  .cart-summary dl { padding-left: 0; border-left: 0; }
}
</style>
