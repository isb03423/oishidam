<script setup>
import { computed, ref, watch } from 'vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import { cartItems, changeCartQuantity, removeCartItems } from '../stores/cart.js'

const selection = ref([])
const checkoutMessage = ref('')
const selectedItems = computed(() => cartItems.value.filter((item) => selection.value.includes(item.variant_id)))
const subtotal = computed(() => selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
const shippingFee = 3000
const formatter = new Intl.NumberFormat('ko-KR')
const won = (value) => Number.isFinite(value) ? `${formatter.format(value)}원` : '가격 확인 필요'

watch(selectedItems, () => { checkoutMessage.value = '' })
const allSelected = computed(() =>
  cartItems.value.length > 0 && selection.value.length === cartItems.value.length,
)

watch(cartItems, (items) => {
  selection.value = selection.value.filter((id) => items.some((item) => item.variant_id === id))
})
</script>

<template>
  <MyPageLayout title="장바구니" description="담아둔 상품을 확인하고 주문해보세요.">
    <template #title-icon>
      <svg class="cart-title-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 4h2l2.2 10h10.6l2-7H7.2M9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    </template>
    <div class="cart-toolbar">
      <label class="cart-select-all">
        <input
          type="checkbox"
          :checked="allSelected"
          :disabled="!cartItems.length"
          :indeterminate="selection.length > 0 && !allSelected"
          @change="selection = $event.target.checked ? cartItems.map((item) => item.variant_id) : []"
        />
        전체 선택 ({{ cartItems.length }})
      </label>
      <button type="button" :disabled="!selection.length" @click="removeCartItems(selection)">
        선택 상품 삭제
      </button>
    </div>

    <template v-if="cartItems.length">
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.variant_id" class="cart-row">
          <input v-model="selection" type="checkbox" :value="item.variant_id" :aria-label="`${item.name} 선택`" />
          <div class="cart-thumbnail">
            <img v-if="item.image" :src="item.image" alt="" loading="lazy" @error="$event.target.hidden = true" />
            <span v-else>이미지 준비 중</span>
          </div>
          <div class="cart-product">
            <strong>{{ item.name || item.product_id }}</strong>
            <b>{{ won(item.price) }}</b>
          </div>
          <div class="cart-quantity" :aria-label="`${item.name} 수량`">
            <button type="button" :disabled="item.quantity <= 1" :aria-label="`${item.name} 수량 줄이기`" @click="changeCartQuantity(item.variant_id, -1)">−</button>
            <span aria-live="polite">{{ item.quantity }}</span>
            <button type="button" :disabled="item.quantity >= (item.stock ?? 1)" :aria-label="`${item.name} 수량 늘리기`" @click="changeCartQuantity(item.variant_id, 1)">+</button>
          </div>
          <strong class="cart-line-total">{{ won(item.price * item.quantity) }}</strong>
          <button class="cart-remove" type="button" :aria-label="`${item.name} 삭제`" @click="removeCartItems([item.variant_id])">×</button>
        </li>
      </ul>

      <section class="cart-summary" aria-labelledby="cart-summary-title">
        <div class="cart-summary-content">
          <h2 id="cart-summary-title">주문 금액 안내</h2>
          <dl>
            <div><dt>선택 상품 금액</dt><dd>{{ won(subtotal) }}</dd></div>
            <div><dt>배송비</dt><dd>{{ won(shippingFee) }}</dd></div>
            <div class="cart-total"><dt>총 결제 예정 금액</dt><dd>{{ won(subtotal + shippingFee) }}</dd></div>
          </dl>
        </div>
        <button class="cart-checkout" type="button" :disabled="!selectedItems.length || !Number.isFinite(subtotal)" @click="checkoutMessage = '주문 기능을 준비 중입니다.'">
          {{ selectedItems.length ? `${selectedItems.length}개 상품 주문하기` : '선택 상품 주문하기' }}
        </button>
        <p v-if="checkoutMessage" class="cart-checkout-message" role="status">{{ checkoutMessage }}</p>
      </section>
    </template>
    <p v-else class="cart-empty" role="status">장바구니에 담긴 상품이 없어요.</p>
  </MyPageLayout>
</template>

<style scoped>
.cart-title-icon {
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

.cart-toolbar,
.cart-items,
.cart-empty {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  font-size: 13px;
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
  font-size: 10px;
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
  width: 30px;
  height: 32px;
  border: 0;
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  font-size: 18px;
  cursor: pointer;
}

.cart-quantity button:first-child { border-right: 1px solid var(--color-border); }
.cart-quantity button:last-child { border-left: 1px solid var(--color-border); }
.cart-quantity button:disabled, .cart-checkout:disabled { opacity: .5; cursor: default; }
.cart-line-total { text-align: right; }

.cart-summary {
  margin-top: 16px;
  font-size: 13px;
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
  font-size: 15px;
  font-weight: 700;
}

.cart-summary dl { margin: 0; padding-left: 16px; border-left: 1px solid var(--color-border); }
.cart-summary dl > div { display: flex; justify-content: space-between; gap: 8px; padding: 4px 0; }
.cart-summary dd { margin: 0; text-align: right; font-weight: 700; }
.cart-summary .cart-total { margin-top: 4px; padding-top: 8px; border-top: 1px solid var(--color-border); font-weight: 700; }
.cart-total dd { font-size: 16px; }

.cart-checkout {
  width: 100%;
  min-height: 42px;
  margin-top: 14px;
  border: 0;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.cart-checkout-message { margin: 8px 0 0; text-align: center; font-size: 12px; }

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
