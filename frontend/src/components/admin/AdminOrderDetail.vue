<script setup>
import { computed, ref, watch } from 'vue'
import Pagination from '../common/Pagination.vue'
import { orderLabel } from '../../utils/adminStatus.js'
import { adminStatusTone } from '../../utils/adminPresentation.js'

const props = defineProps({ detail: { type: Object, required: true }, nextStatus: String, busy: Boolean })
const note = defineModel('note', { type: String, default: '' })
defineEmits(['advance'])
const order = computed(() => props.detail.order)
const itemPage = ref(1)
const panel = ref('items')
const itemPages = computed(() => Math.ceil((order.value.items?.length || 0) / 3))
const visibleItems = computed(() => (order.value.items || []).slice((itemPage.value - 1) * 3, itemPage.value * 3))
watch(() => order.value.orderId, () => { itemPage.value = 1; panel.value = 'items' })
watch(itemPages, count => { itemPage.value = Math.min(itemPage.value, Math.max(1, count)) })
const recipient = computed(() => order.value.recipient || {})
const money = value => new Intl.NumberFormat('ko-KR').format(value ?? 0) + '원'
const stamp = value => value?.replace('T', ' ').slice(0, 16) || '—'
</script>

<template>
  <div class="order-detail">
    <section class="order-summary" aria-label="주문 요약"><div><span class="status-pill" :data-tone="adminStatusTone(orderLabel(order.orderStatus))">{{ orderLabel(order.orderStatus) }}</span><p>{{ detail.memberName || '이름 확인 중' }}<span>결제일 {{ stamp(order.paidAt) }}</span></p></div><div class="order-total"><span>결제 금액</span><strong>{{ money(order.totalAmount) }}</strong></div></section>
    <nav class="order-mobile-sections" aria-label="주문 상세 영역"><button v-for="[key, label] in [['items', '주문 상품'], ['shipping', '배송 정보'], ['processing', '주문 처리']]" :key="key" type="button" :aria-pressed="panel === key" @click="panel = key">{{ label }}</button></nav>
    <div class="order-columns">
      <div class="order-record">
        <section class="order-products" :class="{ 'is-active': panel === 'items' }"><h3>주문 상품 <small>{{ order.items?.length || 0 }}종</small></h3><div class="order-items"><table><thead><tr><th scope="col">상품</th><th scope="col" class="numeric">수량</th><th scope="col" class="numeric">단가</th><th scope="col" class="numeric">금액</th></tr></thead><tbody><tr v-for="item in visibleItems" :key="item.orderItemId"><td :title="item.productName">{{ item.productName }}</td><td class="numeric">{{ item.quantity }}</td><td class="numeric">{{ money(item.unitPrice) }}</td><td class="numeric">{{ money(item.unitPrice * item.quantity) }}</td></tr></tbody></table></div><Pagination v-model="itemPage" :page-count="itemPages" label="주문 상품 페이지" /><p v-if="!order.items?.length" class="order-empty">주문 상품 내역이 없습니다.</p></section>
        <section class="order-shipping" :class="{ 'is-active': panel === 'shipping' }"><h3>배송 정보</h3><dl><div><dt>수령인</dt><dd>{{ recipient.recipientName || '—' }}</dd></div><div><dt>연락처</dt><dd>{{ recipient.recipientPhone || '—' }}</dd></div><div class="full"><dt>배송지</dt><dd><span v-if="recipient.postalCode">({{ recipient.postalCode }}) </span>{{ recipient.addressLine1 || '—' }} {{ recipient.addressLine2 }}</dd></div><div><dt>개인통관고유부호</dt><dd>{{ recipient.customsCode || '—' }}</dd></div><div><dt>배송 요청</dt><dd>{{ recipient.deliveryMemo || '—' }}</dd></div></dl></section>
      </div>
      <aside class="order-processing" :class="{ 'is-active': panel === 'processing' }" aria-label="주문 처리">
        <form v-if="nextStatus" @submit.prevent="$emit('advance')"><h3>상태 변경</h3><p class="order-next">{{ orderLabel(order.orderStatus) }}<span aria-hidden="true">→</span><strong>{{ orderLabel(nextStatus) }}</strong></p><label for="order-processing-note">처리 메모 <small>선택</small></label><textarea id="order-processing-note" v-model="note" maxlength="255" rows="3" :disabled="busy" placeholder="처리 내용을 남겨 주세요"></textarea><button type="submit" :disabled="busy">{{ busy ? '변경 중…' : orderLabel(nextStatus) + '으로 변경' }}</button></form>
        <section class="order-history"><h3>처리 이력</h3><ol v-if="detail.statusHistories?.length" tabindex="0" role="region" aria-label="처리 이력 목록"><li v-for="history in detail.statusHistories" :key="history.historyId"><strong>{{ orderLabel(history.newStatus) }}</strong><time :datetime="history.createdAt">{{ stamp(history.createdAt) }}</time><p v-if="history.note">{{ history.note }}</p></li></ol><p v-else class="order-empty">변경 이력이 없습니다.</p></section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.order-detail { display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; padding: 18px 24px 22px; }
.order-summary { display: flex; flex: none; justify-content: space-between; align-items: center; gap: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--admin-line); }
.order-summary p { margin-top: 8px; font-size: var(--font-size-table); }
.order-summary p > span { display: block; margin-top: 4px; color: var(--admin-muted); font-size: var(--font-size-label); }
.order-total { text-align: right; }.order-total > span { display: block; font-size: var(--font-size-label); color: var(--admin-muted); }.order-total strong { display: block; margin-top: 4px; font-size: 1.625rem; font-variant-numeric: tabular-nums; }
.order-columns { display: grid; grid-template-columns: minmax(0, 1fr) 260px; grid-template-rows: minmax(0,1fr); flex: 1; min-height: 0; gap: 24px; padding-top: 18px; }
.order-record { min-width: 0; min-height: 0; }.order-detail h3 { margin-bottom: 10px; font-size: var(--font-size-body); }.order-detail h3 small { margin-left: 6px; color: var(--admin-muted); font-size: var(--font-size-label); font-weight: 400; }
.order-items table { width: 100%; table-layout: fixed; }.order-items :is(th,td) { padding: 9px 10px; font-size: var(--font-size-table); }.order-items :is(th,td):first-child { width: 52%; }.order-items td:first-child { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }.order-items .numeric { white-space: nowrap; }
.order-products :deep(.list-pagination) { margin-top: 10px; padding: 0; border: 0; gap: 4px; }.order-products :deep(.list-pagination > *) { min-height: 28px; min-width: 28px; padding: 3px 6px; font-size: var(--font-size-label); }
.order-shipping { margin-top: 20px; }.order-shipping dl { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px 20px; }.order-shipping .full { grid-column: 1/-1; }.order-shipping dt { margin-bottom: 4px; color: var(--admin-muted); font-size: var(--font-size-label); }.order-shipping dd { font-size: var(--font-size-table); line-height: 1.6; overflow-wrap: anywhere; }
.order-processing { display: flex; flex-direction: column; min-width: 0; min-height: 0; border-left: 1px solid var(--admin-line); padding-left: 24px; }.order-processing form { display: grid; flex: none; gap: 8px; }.order-processing form h3 { margin-bottom: 0; }.order-processing label { font-size: var(--font-size-label); font-weight: 600; }.order-processing small { color: var(--admin-muted); font-weight: 400; margin-left: 4px; }.order-processing textarea { width: 100%; font-size: var(--font-size-control); min-height: 4.75rem; resize: none; }.order-next { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: var(--font-size-label); color: var(--admin-muted); padding-block: 2px 6px; }.order-next strong { color: var(--admin-brand); }
.order-history { display: flex; flex-direction: column; flex: 1; min-height: 0; margin-top: 18px; }.order-history h3 { flex: none; }.order-history ol { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--admin-strong-line) var(--admin-subtle); padding-right: 8px; }.order-history li { padding: 10px 0; border-bottom: 1px solid var(--admin-line); }.order-history li:first-child { padding-top: 0; }.order-history li strong { display: block; font-size: var(--font-size-label); }.order-history time { color: var(--admin-muted); font-size: var(--font-size-caption); }.order-history li p { margin-top: 6px; font-size: var(--font-size-label); overflow-wrap: anywhere; }.order-empty { font-size: var(--font-size-label); color: var(--admin-muted); padding-block: 12px; }
.order-mobile-sections { display: none; }
@media (min-width:761px) and (max-height:740px) {
  .order-detail { padding: 12px 20px; }.order-summary { padding-bottom: 10px; }.order-summary p { display: inline; margin-left: 10px; }.order-summary p > span { margin-top: 6px; }.order-total strong { font-size: 1.375rem; }.order-columns { padding-top: 12px; gap: 20px; }.order-detail h3 { margin-bottom: 7px; }.order-items :is(th,td) { padding: 7px 8px; }.order-shipping { margin-top: 14px; }.order-shipping dl { gap: 9px 16px; }.order-shipping dt { margin-bottom: 2px; }.order-processing { padding-left: 18px; }.order-processing textarea { min-height: 3.5rem; }.order-history { margin-top: 12px; }
}
@media(max-width:760px) {
  .order-detail { padding: 12px 16px; }.order-summary { padding-bottom: 12px; gap: 12px; }.order-total strong { font-size: 1.375rem; }.order-mobile-sections { display: flex; flex: none; gap: 6px; border-bottom: 1px solid var(--admin-line); padding-block: 10px; }.order-mobile-sections button { flex: 1; min-width: 0; font-size: var(--font-size-control); padding-inline: 6px; }.order-mobile-sections button[aria-pressed='true'] { color: var(--admin-brand); border-color: var(--admin-brand); background: var(--admin-brand-soft); }
  .order-columns { display: flex; flex-direction: column; gap: 0; padding-top: 14px; }.order-record { display: contents; }.order-products,.order-shipping,.order-processing { display: none; }.order-products.is-active,.order-shipping.is-active { display: block; }.order-processing.is-active { display: flex; flex: 1; }.order-shipping { margin-top: 0; }.order-processing { padding: 0; border: 0; }.order-items :is(th,td) { padding-inline: 4px; font-size: var(--font-size-table); }.order-items :is(th,td):first-child { width: 43%; }.order-shipping dl { gap: 16px; }
}
@media(max-height:500px), (max-width:760px) and (max-height:650px) { .order-summary p { display: inline; margin-left: 8px; }.order-summary p > span { display: none; }.order-summary { padding-bottom: 8px; }.order-total { display: flex; align-items: baseline; gap: 8px; }.order-total strong { font-size: 1.25rem; }.order-summary p { margin-top: 4px; }.order-processing form { grid-template-columns: 1fr 1fr; gap: 6px 12px; }.order-processing form h3 { grid-column: 1; grid-row: 1; }.order-next { grid-column: 2; grid-row: 1; padding: 0; }.order-processing label { align-self: end; }.order-processing textarea { grid-column: 1; grid-row: 2; min-height: 3.125rem; }.order-processing label { display: none; }.order-processing form button { grid-column: 2; grid-row: 2; align-self: end; font-size: var(--font-size-control); padding-inline: 6px; } }
</style>
