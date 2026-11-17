<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { getExampleOrders } from '../mocks/orders.js'
import { session, shoppingOwner } from '../stores/session.js'
import { cancelOrder, getOrder } from '../services/orders.js'
import { getProduct } from '../services/catalog.js'
import { formatPhone } from '../services/phone.js'

const route = useRoute()
const isItemsExpanded = ref(false)
const cancellationDialog = ref(null)
const currency = new Intl.NumberFormat('ko-KR')
const orders = getExampleOrders(new Date())
const order = ref(null)
const error = ref('')
const cancelError = ref('')
const cancelReason = ref('')
const busy = ref(false)
let revision = 0
async function load() {
  const current = ++revision
  const id = route.params.orderId
  isItemsExpanded.value = false
  order.value = null
  error.value = ''
  if (session.source === 'mock') {
    order.value = orders.find((item) => item.id === id) ?? null
    if (!order.value) error.value = '주문을 찾을 수 없습니다.'
    return
  }
  try {
    const data = await getOrder(id)
    const images = await Promise.all(data.items.map(async (item) => {
      try { return (await getProduct(String(item.productId))).images?.find((image) => image.is_primary)?.url ?? null } catch { return null }
    }))
    if (current !== revision) return
    order.value = { ...data, id: data.orderNumber, status: data.orderStatus, total: data.totalAmount, displayDate: data.createdAt?.replace('T', ' ').slice(0, 16) ?? '—', items: data.items.map((item, index) => ({ product_id: String(item.productId), name: item.productName, quantity: item.quantity, price: item.unitPrice, imageUrl: images[index] })) }
  } catch (failure) { if (current === revision) error.value = failure.message }
}
watch([() => route.params.orderId, shoppingOwner], load, { immediate: true })
onBeforeUnmount(() => { revision++ })

async function confirmCancellation() {
  if (busy.value || !order.value) return
  busy.value = true
  cancelError.value = ''
  try {
    await cancelOrder(order.value.orderId, cancelReason.value.trim())
    cancellationDialog.value.close()
    await load()
  } catch (failure) { cancelError.value = failure.message } finally { busy.value = false }
}

const visibleItems = computed(() =>
  isItemsExpanded.value ? order.value?.items ?? [] : order.value?.items.slice(0, 1) ?? [],
)

const won = (price) => `${currency.format(price)}원`
</script>

<template>
  <MyPageLayout icon="receipt" title="주문 상세보기" stretch-content>
    <template #description>
      <RouterLink class="back-to-orders" :to="{ name: 'MyPageOrders' }">
        <span aria-hidden="true">‹</span>
        주문/배송 조회로 돌아가기
      </RouterLink>
    </template>

    <p v-if="error" role="alert">{{ error }}</p>
    <p v-else-if="!order" role="status">주문을 불러오는 중이에요.</p>
    <article v-if="order" class="order-receipt" aria-label="주문 내역서">
      <header class="receipt-heading">
        <p>주문 내역서</p>
        <span>ORDER RECEIPT</span>
      </header>

      <section class="receipt-products" aria-labelledby="receipt-products-title">
        <div class="receipt-section-heading">
          <h2 id="receipt-products-title">주문상품 <span>총 {{ order.items.length }}개</span></h2>
          <span>{{ isItemsExpanded ? `전체 ${order.items.length}개 표시` : `${visibleItems.length}개 표시 중` }}</span>
        </div>

        <ul class="receipt-product-list">
          <li v-for="item in visibleItems" :key="item.name">
            <RouterLink
              class="receipt-product-mark product-thumbnail-zoom"
              :class="item.tone"
              :to="{ name: 'ProductDetail', params: { productId: item.product_id } }"
              :aria-label="item.name + ' 상품 상세보기'"
            >
              <img v-if="item.imageUrl" :src="item.imageUrl" alt="" loading="lazy" />
              <span v-else>{{ item.brand || '상품' }}</span>
            </RouterLink>
            <div>
              <strong>{{ item.name }}</strong>
              <span>수량 {{ item.quantity }}개</span>
            </div>
            <b>{{ won(item.price * item.quantity) }}</b>
          </li>
        </ul>

        <button
          v-if="order.items.length > 1"
          class="receipt-more-button"
          type="button"
          :aria-expanded="isItemsExpanded"
          @click="isItemsExpanded = !isItemsExpanded"
        >
          {{ isItemsExpanded ? '접기' : `나머지 상품 ${order.items.length - 1}개 더보기` }}
          <svg
            class="receipt-more-icon"
            :class="{ 'receipt-more-icon--expanded': isItemsExpanded }"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </section>

      <footer class="receipt-total">
        <div><span>상품금액</span><strong>{{ won(order.itemsAmount ?? order.total) }}</strong></div>
        <div><span>배송비</span><strong>{{ won(order.shippingFee ?? 0) }}</strong></div>
        <div class="receipt-final-total"><span>총 결제금액</span><strong>{{ won(order.total) }}</strong></div>
      </footer>
    </article>

    <dialog ref="cancellationDialog" class="order-cancel-dialog" aria-labelledby="cancel-dialog-title">
      <h2 id="cancel-dialog-title">주문 취소</h2>
      <p v-if="session.source === 'mock'">주문 취소 기능을 준비 중입니다.</p>
      <template v-else><p>주문을 취소하시겠어요?</p><label>취소 사유 <input v-model="cancelReason" maxlength="200" /></label><p v-if="cancelError" role="alert">{{ cancelError }}</p></template>
      <div><button class="order-cancel-button" type="button" :disabled="busy" @click="cancellationDialog.close()">닫기</button> <button v-if="session.source !== 'mock'" class="order-cancel-button" type="button" :disabled="busy" @click="confirmCancellation">주문 취소</button></div>
    </dialog>

    <template #side>
      <aside v-if="order" class="order-info-list" aria-label="주문 부가 정보">
        <section class="order-info-card">
          <h2>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l3 3v15H7zM15 3v4h4M10 12h5M10 16h5" /></svg>
            주문정보
            <button v-if="session.source === 'mock' || order.canCancel" class="order-cancel-button" type="button" @click="cancelError = ''; cancelReason = ''; cancellationDialog.showModal()">주문 취소</button>
          </h2>
          <dl>
            <div><dt>주문번호</dt><dd>{{ order.id }}</dd></div>
            <div><dt>주문일시</dt><dd>{{ order.displayDate }}<template v-if="session.source === 'mock'"> 14:32</template></dd></div>
            <div><dt>주문상태</dt><dd><span class="status-chip">{{ order.status }}</span></dd></div>
          </dl>
        </section>

        <section class="order-info-card">
          <h2>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.2 7-11A7 7 0 1 0 5 10c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.2" /></svg>
            배송정보
          </h2>
          <dl>
            <div><dt>받는사람</dt><dd>{{ order.recipient?.recipientName ?? (session.source === 'mock' ? '김오이' : '—') }}</dd></div>
            <div><dt>연락처</dt><dd>{{ order.recipient?.recipientPhone ? formatPhone(order.recipient.recipientPhone) : session.source === 'mock' ? '010-1234-5678' : '—' }}</dd></div>
            <div><dt>개인통관고유부호</dt><dd>{{ order.recipient?.customsCode || '등록 정보 없음' }}</dd></div>
            <div><dt>배송지</dt><dd>{{ order.recipient ? `${order.recipient.addressLine1} ${order.recipient.addressLine2 ?? ''} (${order.recipient.postalCode})` : session.source === 'mock' ? '서울특별시 강남구 테헤란로 123, 10층 (역삼동)' : '—' }}</dd></div>
            <div v-if="order.recipient?.deliveryMemo"><dt>배송 요청사항</dt><dd>{{ order.recipient.deliveryMemo }}</dd></div>
          </dl>
        </section>

        <section class="order-info-card">
          <h2>
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
            결제정보
          </h2>
          <dl>
            <div><dt>결제수단</dt><dd>{{ session.source === 'mock' ? '카드 결제 (삼성카드)' : '—' }}</dd></div>
            <div><dt>결제일시</dt><dd>{{ session.source === 'mock' ? order.displayDate + ' 14:32' : order.paidAt?.replace('T', ' ').slice(0, 16) ?? '—' }}</dd></div>
            <div><dt>결제금액</dt><dd>{{ won(order.total) }}</dd></div>
          </dl>
        </section>
      </aside>
    </template>
  </MyPageLayout>
</template>

<style scoped>
.order-cancel-button {
  flex-shrink: 0;
  height: 24px;
  margin-left: auto;
  padding: 0 10px;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
}

.order-cancel-button:hover,
.order-cancel-button:focus-visible {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.order-cancel-dialog {
  width: min(340px, calc(100% - 32px));
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
}

.order-cancel-dialog::backdrop {
  background: rgb(57 44 50 / 40%);
}

.order-cancel-dialog h2 {
  font-size: 18px;
}

.order-cancel-dialog p {
  margin: 12px 0;
  font-size: 14px;
}

.order-cancel-dialog form {
  text-align: right;
}

.back-to-orders {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #71666b;
  font-size: 15px;
}

.back-to-orders span {
  font-size: 19px;
  line-height: 1;
}

.back-to-orders:hover {
  color: var(--color-primary);
}

/* 주문 상세 왼쪽의 영수증 카드 */
.order-receipt {
  position: relative;
  margin-top: 4px;
  padding: 30px 20px 34px;
  box-sizing: border-box;
  background: #fffdfd;
  border-inline: 1px solid #d9bec6;
  filter: drop-shadow(0 10px 16px rgb(57 44 50 / 14%));
}

.order-receipt::before, .order-receipt::after {
  content: '';
  position: absolute;
  left: -1px;
  right: -1px;
  height: 10px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='10' viewBox='0 0 24 10'%3E%3Cpath d='M0 10 Q6 -8 12 10 Q18 -8 24 10' fill='%23fffdfd' stroke='%23d9bec6'/%3E%3C/svg%3E") repeat-x left bottom / 24px 10px;
  pointer-events: none;
}
.order-receipt::before { top: -9px; }
.order-receipt::after { bottom: -9px; transform: rotate(180deg); }

.order-receipt > * {
  position: relative;
  z-index: 1;
}

.receipt-heading {
  padding-bottom: 18px;
  border-bottom: 1px dashed #d9c5cb;
  text-align: center;
}

.receipt-heading p {
  margin: 0 0 4px;
  color: var(--color-text);
  font-family: Georgia, serif;
  font-size: 25px;
  letter-spacing: .05em;
}

.receipt-heading span {
  color: var(--color-secondary);
  font-family: Georgia, serif;
  font-size: 10px;
  letter-spacing: .19em;
}

.receipt-products {
  padding: 0 0 17px;
}

.receipt-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 44px;
  margin: 0;
}

.receipt-section-heading h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 600;
}

.receipt-section-heading h2 span,
.receipt-section-heading > span {
  color: #71666b;
  font-size: 12px;
  font-weight: 400;
}

.receipt-product-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.receipt-product-list li {
  display: grid;
  grid-template-columns: 45px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  min-height: 57px;
  border-top: 1px solid #eee5e8;
}

.receipt-product-list li:last-child {
  border-bottom: 1px solid #eee5e8;
}

.receipt-product-mark {
  display: grid;
  place-items: center;
  width: 45px;
  height: 40px;
  border-radius: 5px;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
}

.receipt-product-list li > div {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.receipt-product-list strong {
  overflow: hidden;
  color: var(--color-text);
  font-size: 13px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.receipt-product-list li > div span {
  color: #71666b;
  font-size: 11px;
}

.receipt-product-list b {
  color: var(--color-text);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.receipt-more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 38px;
  margin-top: 17px;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.receipt-more-icon {
  width: 16px;
  height: 16px;
  margin-left: 7px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
  transition: transform .18s ease;
}

.receipt-more-icon--expanded {
  transform: rotate(180deg);
}

.receipt-more-button:hover {
  background: var(--color-background);
}

.receipt-total {
  padding-top: 18px;
  border-top: 1px dashed #d9c5cb;
}

.receipt-total > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 9px;
  color: #53464c;
  font-size: 13px;
}

.receipt-total strong {
  font-weight: 500;
}

.receipt-total .receipt-final-total {
  margin: 14px 0 0;
  padding: 11px 10px;
  border-radius: 7px;
  background: var(--color-accent);
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
}

.receipt-final-total strong {
  color: var(--color-primary);
  font-size: 19px;
  font-weight: 700;
}

.berry { background: #b85d73; }
.matcha { background: #6d8261; }
.potato { background: #bd7546; }
.cocoa { background: #80606a; }

@media (min-width: 861px) {
  .order-receipt {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px 20px 20px;
  }

  .receipt-total {
    margin-top: auto;
  }

  .order-info-list {
    grid-column: 3;
    grid-row: 1;
  }
}

.order-info-list {
  display: grid;
  gap: 12px;
}

.order-info-card {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 12px rgb(57 44 50 / 5%);
}

.order-info-card h2 {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 12px 14px 4px;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
}

.order-info-card h2 svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
  color: var(--color-primary);
}

.order-info-card dl {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 5px 14px 14px;
}

.order-info-card dl > div {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr);
  gap: 8px;
  align-items: start;
}

.order-info-card dt,
.order-info-card dd {
  margin: 0;
  color: var(--color-text);
  font-size: 12px;
  line-height: 1.45;
}

.order-info-card dt {
  font-weight: 600;
}

.order-info-card dd {
  overflow-wrap: anywhere;
  font-weight: 400;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  min-height: 21px;
  padding: 1px 10px;
  border-radius: 999px;
  background: #f6e8df;
  color: #80503c;
  font-size: 11px;
  font-weight: 600;
}

</style>
