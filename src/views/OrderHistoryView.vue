<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { getExampleOrders } from '../mocks/orders.js'
import { session, shoppingOwner } from '../stores/session.js'
import { getOrder, getOrders } from '../services/orders.js'
import { getProduct } from '../services/catalog.js'
import { cartLine } from '../stores/cart.js'
import { startCheckout } from '../stores/checkout.js'
import Pagination from '../components/common/Pagination.vue'

const today = new Date()
const orders = ref([])
const totalPages = ref(0)
const loading = ref(false)
const error = ref('')
const purchaseError = ref('')
const purchasing = ref(false)
let revision = 0
const pageSize = 3
const months = ref(3)
const search = ref('')
const keyword = ref('')
const page = ref(1)
const dialog = ref(null)
const selectedOrder = ref(null)
const repurchaseItemsExpanded = ref(false)
const visibleRepurchaseItems = computed(() => {
  const items = selectedOrder.value?.items ?? []
  return repurchaseItemsExpanded.value ? items : items.slice(0, 1)
})
const router = useRouter()
const currency = new Intl.NumberFormat('ko-KR')
const won = (price) => `${currency.format(price)}원`

watch([shoppingOwner, page, months, keyword], async () => {
  const current = ++revision
  error.value = ''
  if (session.source === 'mock') { orders.value = getExampleOrders(new Date()); loading.value = false; return }
  if (session.source !== 'api') { orders.value = []; return }
  loading.value = true
  orders.value = []
  try {
    const start = new Date()
    start.setMonth(start.getMonth() - months.value, 1)
    start.setDate(Math.min(new Date().getDate(), new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()))
    const from = [start.getFullYear(), String(start.getMonth() + 1).padStart(2, '0'), String(start.getDate()).padStart(2, '0')].join('-')
    const result = await getOrders(page.value - 1, { size: pageSize, from, keyword: keyword.value || undefined, excludePending: true })
    const details = await Promise.all(result.content.map((summary) => getOrder(summary.orderId)))
    const mapped = await Promise.all(details.map(async (data) => {
      const items = await Promise.all(data.items.map(async (item) => {
        let product
        try { product = await getProduct(String(item.productId)) } catch { /* 주문 당시 상품은 계속 표시 */ }
        return { product_id: String(item.productId), name: item.productName, quantity: item.quantity, price: item.unitPrice, imageUrl: product?.images?.find((image) => image.is_primary)?.url ?? product?.images?.[0]?.url }
      }))
      return { id: data.orderNumber, orderId: data.orderId, date: new Date(data.createdAt), displayDate: data.createdAt?.slice(0, 10).replaceAll('-', '.'), status: data.orderStatus, total: data.totalAmount, items, quantity: items.reduce((sum, item) => sum + item.quantity, 0) }
    }))
    if (current === revision) { orders.value = mapped; totalPages.value = result.totalPages }
  } catch (failure) { if (current === revision) error.value = failure.message }
  finally { if (current === revision) loading.value = false }
}, { immediate: true })
onBeforeUnmount(() => { revision++ })

const filteredOrders = computed(() => {
  const start = new Date(today)
  start.setMonth(start.getMonth() - months.value, 1)
  const monthEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
  start.setDate(Math.min(today.getDate(), monthEnd))

  return orders.value.filter((order) =>
    order.date >= start &&
    (order.id.toLowerCase().includes(keyword.value) ||
      order.items.some((item) => item.name.toLowerCase().includes(keyword.value))),
  )
})

const pageCount = computed(() => session.source === 'mock' ? Math.ceil(filteredOrders.value.length / pageSize) : totalPages.value)
const visibleOrders = computed(() =>
  session.source === 'mock' ? filteredOrders.value.slice((page.value - 1) * pageSize, page.value * pageSize) : orders.value,
)

function applySearch() {
  keyword.value = search.value.trim().toLowerCase()
  page.value = 1
}

async function showRepurchase(order) {
  selectedOrder.value = order
  repurchaseItemsExpanded.value = false
  purchaseError.value = ''
  await nextTick()
  dialog.value.showModal()
}

async function repurchase() {
  if (purchasing.value) return
  purchasing.value = true
  purchaseError.value = ''
  const owner = shoppingOwner.value
  try {
    const products = await Promise.all(selectedOrder.value.items.map((item) => getProduct(item.product_id)))
    if (owner !== shoppingOwner.value) return
    const lines = products.map((product, index) => cartLine(product, selectedOrder.value.items[index].quantity))
    if (lines.some((item) => !item.available)) throw new Error('판매가 종료되었거나 재고가 부족한 상품이 있습니다.')
    startCheckout(lines)
    dialog.value.close()
    await router.push({ name: 'Checkout' })
  } catch (failure) { purchaseError.value = failure.message || '상품을 확인하지 못했습니다.' }
  finally { purchasing.value = false }
}
</script>

<template>
  <MyPageLayout icon="delivery"
    title="주문/배송 조회"
    description="주문한 상품의 배송 현황을 확인할 수 있습니다."
    stretch-content
  >
    <form class="order-filter" role="search" aria-label="주문 검색" @submit.prevent="applySearch">
      <select v-model.number="months" aria-label="주문 조회 기간" @change="page = 1">
        <option :value="1">최근 1개월</option>
        <option :value="3">최근 3개월</option>
        <option :value="6">최근 6개월</option>
        <option :value="12">최근 1년</option>
      </select>
      <div class="search-field">
        <input v-model="search" type="search" aria-label="주문번호 또는 상품명" placeholder="주문번호 또는 상품명으로 검색" />
        <button class="primary-button search-button" type="submit" aria-label="검색">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
        </button>
      </div>
    </form>

    <div class="order-list" aria-label="주문 목록">
      <p v-if="loading" class="empty-orders" role="status">주문을 불러오는 중이에요.</p>
      <p v-else-if="error" class="empty-orders" role="alert">{{ error }}</p>
      <article v-for="order in visibleOrders" v-else :key="order.id" class="order-card">
        <header class="order-meta">
          <span><strong>주문일</strong> {{ order.displayDate }}</span>
          <span><strong>주문번호</strong> {{ order.id }}</span>
        </header>
        <div class="order-body">
          <div class="order-product">
            <RouterLink
              v-if="order.items.length" class="order-thumbnail product-thumbnail-zoom"
              :class="order.items[0].tone"
              :to="{ name: 'ProductDetail', params: { productId: order.items[0].product_id } }"
              :aria-label="order.items[0].name + ' 상품 상세보기'"
            >
              <img v-if="order.items[0].imageUrl" :src="order.items[0].imageUrl" alt="" loading="lazy" />
              <span v-else>{{ order.items[0].brand || '상품' }}</span>
            </RouterLink>
            <div>
              <h2>{{ order.items[0]?.name ?? '상품 정보 없음' }}<template v-if="order.items.length > 1"> 외 {{ order.items.length - 1 }}건</template></h2>
              <p>총 {{ order.quantity }}개 <span>{{ won(order.total) }}</span></p>
            </div>
          </div>
          <div class="order-actions">
            <span class="order-status">
              <svg v-if="order.status === '배송중'" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h12v11H8m-4 0H3V6m12 4h3l3 4v3h-2m-4 0h-3" /><circle cx="6" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>
              {{ order.status }}
            </span>
            <button type="button" :disabled="!order.items.length" @click="showRepurchase(order)">바로 구매하기</button>
            <button type="button" @click="router.push({ name: 'MyPageOrderDetail', params: { orderId: order.orderId ?? order.id } })">
              주문 상세보기
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </article>
      <p v-if="!loading && !error && !visibleOrders.length" class="empty-orders" role="status">조건에 맞는 주문이 없습니다.</p>
    </div>

    <template v-if="pageCount > 1" #below>
      <Pagination v-model="page" :page-count="pageCount" label="주문 목록 페이지" />
    </template>

    <dialog
      ref="dialog"
      class="order-dialog"
      aria-labelledby="order-dialog-title"
      aria-describedby="order-dialog-description"
      @cancel="purchasing && $event.preventDefault()"
    >
      <template v-if="selectedOrder">
        <header class="repurchase-header">
          <h2 id="order-dialog-title">상품을 다시 구매하시겠어요?</h2>
          <button
            class="repurchase-close"
            type="button"
            aria-label="닫기"
            :disabled="purchasing"
            @click="dialog.close()"
          >×</button>
        </header>
        <p id="order-dialog-description" class="repurchase-description">
          {{ session.source === 'mock' ? '예시 주문입니다. 실제 결제는 준비 중입니다.' : '현재 판매 정보로 주문서를 준비합니다.' }}
        </p>
        <ul id="repurchase-items" class="repurchase-items">
          <li v-for="item in visibleRepurchaseItems" :key="item.product_id" class="repurchase-item">
            <div class="repurchase-thumbnail" :class="item.tone" aria-hidden="true">
              <img v-if="item.imageUrl" :src="item.imageUrl" alt="" />
              <span v-else>{{ item.brand || '상품' }}</span>
            </div>
            <div class="repurchase-item-details">
              <p>{{ item.name }}</p>
              <span>수량 {{ item.quantity }}개</span>
              <strong>{{ won(item.price * item.quantity) }}</strong>
            </div>
          </li>
        </ul>
        <button
          v-if="selectedOrder.items.length > 1"
          type="button"
          class="repurchase-toggle"
          :aria-expanded="repurchaseItemsExpanded"
          aria-controls="repurchase-items"
          @click="repurchaseItemsExpanded = !repurchaseItemsExpanded"
        >
          {{ repurchaseItemsExpanded ? '상품 접기' : `나머지 상품 ${selectedOrder.items.length - 1}개 더 보기` }}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>
        <dl class="repurchase-total">
          <dt>이전 주문 금액</dt>
          <dd>{{ won(selectedOrder.total) }}</dd>
        </dl>
        <p class="repurchase-note">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <circle cx="10" cy="10" r="7.2" />
            <path d="M10 9v5" />
            <circle cx="10" cy="6.7" r=".8" fill="currentColor" stroke="none" />
          </svg>
          <span>상품 가격 및 재고는 현재 판매 기준으로 적용되며, 주문서에서 최종 확인할 수 있습니다.</span>
        </p>
        <p v-if="purchaseError" class="repurchase-error" role="alert">{{ purchaseError }}</p>
        <form method="dialog" class="repurchase-actions">
          <button autofocus :disabled="purchasing">취소</button>
          <button
            v-if="session.source !== 'mock'"
            class="primary-button"
            type="button"
            :disabled="purchasing"
            @click="repurchase"
          >{{ purchasing ? '상품 확인 중…' : '주문서로 이동' }}</button>
        </form>
      </template>
    </dialog>
  </MyPageLayout>
</template>

<style scoped>
.order-filter, .order-card, .empty-orders {
  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.order-filter {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  margin-bottom: 14px;
  background: #fdfafb;
}

select, input, button {
  min-height: 36px;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 7px;
  background: #fff;
  color: var(--color-text);
  font: inherit;
  font-size: 13px;
}

select, input {
  padding: 0 10px;
}

button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 9px;
  cursor: pointer;
  white-space: nowrap;
}

button:hover:not(:disabled) {
  border-color: var(--color-primary);
}

button:disabled {
  opacity: .45;
  cursor: default;
}

.primary-button {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}

.primary-button:hover {
  background: #864152;
}

.search-field {
  display: flex;
  flex: 1;
  min-width: 0;
}

.search-field input {
  min-width: 0;
  flex: 1;
  border-radius: 7px 0 0 7px;
}

.search-button {
  width: 42px;
  border-radius: 0 7px 7px 0;
}

svg {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.order-list {
  display: grid;
  gap: 10px;
}

.order-card {
  overflow: hidden;
}

.order-meta, .order-body, .order-product, .order-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-meta, .order-body {
  padding: 10px 14px;
}

.order-meta {
  flex-wrap: wrap;
  gap: 4px 18px;
  background: #f8f3f5;
  font-size: 12px;
}

.order-meta strong {
  margin-right: 5px;
}

.order-body {
  justify-content: space-between;
  min-height: 72px;
  box-sizing: border-box;
}

.order-product {
  min-width: 0;
}

.order-product h2 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.order-product p {
  margin: 0;
  color: #71666b;
  font-size: 13px;
}

.order-product p span {
  margin-left: 6px;
  padding-left: 8px;
  border-left: 1px solid var(--color-border);
  color: var(--color-text);
  font-weight: 700;
}

.order-thumbnail {
  display: grid;
  place-items: center;
  flex: 0 0 47px;
  height: 53px;
  border-radius: 4px;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
}

.berry { background: #a64a65; }
.matcha { background: #42683a; }
.potato { background: #9b4d12; }
.cocoa { background: #683e31; }

.order-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 9px;
  border-radius: 999px;
  background: #f7e7eb;
  color: #794153;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.empty-orders {
  margin: 0;
  padding: 36px 12px;
  text-align: center;
}

.order-dialog {
  width: min(525px, calc(100% - 32px));
  max-height: calc(100dvh - 32px);
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #d8d8d8;
  border-radius: 24px;
  background: #f2f2f2;
  color: #171717;
}

.order-dialog::backdrop {
  background: rgb(57 44 50 / 45%);
}

.repurchase-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.repurchase-header h2 {
  margin: 0;
  font-size: clamp(20px, 5vw, 24px);
  font-weight: 700;
  line-height: 1.5;
}

.repurchase-close {
  flex: 0 0 28px;
  min-height: 32px;
  padding: 0;
  border-color: transparent;
  background: transparent;
  color: #5d5d5d;
  font-size: 24px;
  line-height: 1;
}

.repurchase-description {
  margin: 12px 0 14px;
  color: #616161;
  font-size: 18px;
  line-height: 1.5;
}

.repurchase-items {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.repurchase-item {
  display: grid;
  grid-template-columns: clamp(60px, 19vw, 100px) minmax(0, 1fr);
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 16px;
  background: #fafafa;
}

.repurchase-thumbnail {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid #e9e9e9;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
}

.repurchase-thumbnail img {
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
  background: #fff;
}

.repurchase-thumbnail span {
  padding: 4px;
  text-align: center;
}

.repurchase-thumbnail:is(.berry, .matcha, .potato, .cocoa) {
  color: #fff;
}

.repurchase-item-details {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.repurchase-item-details p {
  margin: 0;
  font-size: 18px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.repurchase-item-details span {
  color: #616161;
  font-size: 15px;
}

.repurchase-item-details strong {
  color: inherit;
  font-size: 20px;
  font-weight: 700;
}

.repurchase-toggle {
  width: 100%;
  margin-top: 8px;
  gap: 6px;
  border-color: #d8d8d8;
  border-radius: 10px;
  background: transparent;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
}

.repurchase-toggle svg {
  width: 16px;
  height: 16px;
}

.repurchase-toggle[aria-expanded='true'] svg {
  transform: rotate(180deg);
}

.repurchase-total {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 17px 0 27px;
  border-bottom: 1px solid #e1e1e1;
  font-size: 18px;
}

.repurchase-total dt {
  color: #616161;
}

.repurchase-total dd {
  margin: 0;
  white-space: nowrap;
}

.repurchase-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 24px 0 16px;
  color: #616161;
  font-size: 15px;
  line-height: 1.4;
}

.repurchase-note svg {
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
}

.repurchase-error {
  margin: 0 0 12px;
  color: #9b2944;
  font-size: 15px;
}

.repurchase-actions {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 10px;
}

.repurchase-actions button {
  min-height: 44px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
}

.repurchase-actions button:not(.primary-button) {
  border-color: #d8d8d8;
  background: transparent;
  color: inherit;
}

.repurchase-actions button:not(.primary-button):hover:not(:disabled) {
  border-color: #999;
}

@media (min-width: 861px) {
  .order-list:has(.order-card:nth-child(3)) {
    flex: 1;
  }

  .order-list:has(.order-card:nth-child(3)) .order-card {
    display: flex;
    flex-direction: column;
  }

  .order-list:has(.order-card:nth-child(3)) .order-body {
    flex: 1;
  }
}

@media (max-width: 1000px) {
  .order-body {
    flex-wrap: wrap;
  }

  .order-actions {
    margin-left: auto;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .order-filter {
    gap: 6px;
    padding: 10px;
  }

  .order-actions {
    margin-left: 0;
    gap: 5px;
  }

  .order-actions button, .order-status {
    font-size: 12px;
  }
}
</style>
