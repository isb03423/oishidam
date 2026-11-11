<script setup>
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { getExampleOrders } from '../mocks/orders.js'

const today = new Date()
const orders = getExampleOrders(today)
const pageSize = 3
const months = ref(3)
const search = ref('')
const keyword = ref('')
const page = ref(1)
const dialog = ref(null)
const selectedOrder = ref(null)
const isRepurchase = ref(false)
const router = useRouter()
const currency = new Intl.NumberFormat('ko-KR')
const won = (price) => `${currency.format(price)}원`

const filteredOrders = computed(() => {
  const start = new Date(today)
  start.setMonth(start.getMonth() - months.value, 1)
  const monthEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
  start.setDate(Math.min(today.getDate(), monthEnd))

  return orders.filter((order) =>
    order.date >= start &&
    (order.id.toLowerCase().includes(keyword.value) ||
      order.items.some((item) => item.name.toLowerCase().includes(keyword.value))),
  )
})

const pageCount = computed(() => Math.ceil(filteredOrders.value.length / pageSize))
const visibleOrders = computed(() =>
  filteredOrders.value.slice((page.value - 1) * pageSize, page.value * pageSize),
)

function applySearch() {
  keyword.value = search.value.trim().toLowerCase()
  page.value = 1
}

async function showOrder(order, repurchase = false) {
  selectedOrder.value = order
  isRepurchase.value = repurchase
  await nextTick()
  dialog.value.showModal()
}
</script>

<template>
  <MyPageLayout
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
      <article v-for="order in visibleOrders" :key="order.id" class="order-card">
        <header class="order-meta">
          <span><strong>주문일</strong> {{ order.displayDate }}</span>
          <span><strong>주문번호</strong> {{ order.id }}</span>
        </header>
        <div class="order-body">
          <div class="order-product">
            <div class="order-thumbnails" aria-hidden="true">
              <span v-for="item in order.items.slice(0, 2)" :key="item.name" :class="item.tone">{{ item.brand }}</span>
            </div>
            <div>
              <h2>{{ order.items[0].name }}<template v-if="order.items.length > 1"> 외 {{ order.items.length - 1 }}건</template></h2>
              <p>총 {{ order.quantity }}개 <span>{{ won(order.total) }}</span></p>
            </div>
          </div>
          <div class="order-actions">
            <span class="order-status">
              <svg v-if="order.status === '배송중'" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h12v11H8m-4 0H3V6m12 4h3l3 4v3h-2m-4 0h-3" /><circle cx="6" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>
              {{ order.status }}
            </span>
            <button type="button" @click="showOrder(order, true)">바로 구매하기</button>
            <button type="button" @click="router.push({ name: 'MyPageOrderDetail', params: { orderId: order.id } })">
              주문 상세보기
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </article>
      <p v-if="!visibleOrders.length" class="empty-orders" role="status">조건에 맞는 주문이 없습니다.</p>
    </div>

    <template v-if="pageCount > 1" #below>
      <nav class="order-pagination" aria-label="주문 목록 페이지">
        <button type="button" aria-label="이전 페이지" :disabled="page === 1" @click="page--">‹</button>
        <button
          v-for="number in pageCount"
          :key="number"
          type="button"
          :aria-current="page === number ? 'page' : undefined"
          :aria-label="`${number}페이지`"
          @click="page = number"
        >{{ number }}</button>
        <button type="button" aria-label="다음 페이지" :disabled="page === pageCount" @click="page++">›</button>
      </nav>
    </template>

    <dialog ref="dialog" class="order-dialog" aria-labelledby="order-dialog-title">
      <template v-if="selectedOrder">
        <h2 id="order-dialog-title">{{ isRepurchase ? '재구매 상품 확인' : '주문 상세보기' }}</h2>
        <p v-if="isRepurchase">예시 주문입니다. 실제 결제는 준비 중입니다.</p>
        <p v-else>{{ selectedOrder.id }} · {{ selectedOrder.status }}</p>
        <ul>
          <li v-for="item in selectedOrder.items" :key="item.name">
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <strong>{{ won(item.price * item.quantity) }}</strong>
          </li>
        </ul>
        <p>{{ isRepurchase ? '이전 주문 금액' : '주문 금액' }} <strong>{{ won(selectedOrder.total) }}</strong></p>
        <form method="dialog">
          <button class="primary-button" autofocus>닫기</button>
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

.primary-button, .order-pagination [aria-current='page'] {
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

.order-thumbnails {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 84px;
  flex: 0 0 84px;
}

.order-thumbnails span {
  display: grid;
  place-items: center;
  width: 39px;
  height: 45px;
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

.order-pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 14px;
}

.order-pagination button {
  min-width: 28px;
  min-height: 28px;
  padding: 0 6px;
  border-radius: 5px;
  font-size: 12px;
}

.empty-orders {
  margin: 0;
  padding: 36px 12px;
  text-align: center;
}

.order-dialog {
  width: min(400px, calc(100% - 32px));
  box-sizing: border-box;
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  color: var(--color-text);
}

.order-dialog::backdrop {
  background: rgb(57 44 50 / 45%);
}

.order-dialog h2 {
  margin: 0;
  font-size: 19px;
}

.order-dialog ul {
  padding: 0;
  list-style: none;
}

.order-dialog li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid var(--color-border);
}

.order-dialog form {
  text-align: right;
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
