<script setup>
import { inject, ref, watch } from 'vue'
import Pagination from '../common/Pagination.vue'
import { getAdminStockHistory } from '../../services/admin.js'
import { getSessionRevision, shoppingOwner } from '../../stores/session.js'

const productApi = inject('adminProductApi', null)
const props = defineProps({ productId: { type: [Number, String], required: true }, stockQuantity: { type: Number, required: true } })
const page = ref(0)
const history = ref(null)
const loading = ref(false)
const error = ref('')
const reload = ref(0)
const reasons = { BASELINE: '이관 기준', INITIAL: '상품 등록', ADJUSTMENT: '관리자 조정', ORDER_RESERVED: '주문 차감', PAYMENT_FAILED_RESTORED: '결제 실패 복구', ORDER_CANCELLED_RESTORED: '주문 취소 복구' }
watch([() => props.productId, () => props.stockQuantity, shoppingOwner], () => { page.value = 0 })
watch([() => props.productId, () => props.stockQuantity, shoppingOwner, page, reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  loading.value = true
  error.value = ''
  history.value = null
  try {
    const result = await (productApi?.value?.getAdminStockHistory || getAdminStockHistory)(props.productId, { page: page.value, size: 10 }, controller.signal)
    if (!controller.signal.aborted && revision === getSessionRevision()) history.value = result
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) error.value = failure.message
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })
</script>

<template>
  <section class="stock-history" aria-label="재고 변경 이력">
    <h3>재고 변경 이력</h3>
    <p v-if="loading" role="status">이력을 불러오는 중이에요.</p>
    <p v-else-if="error" role="alert">{{ error }} <button type="button" @click="reload++">다시 시도</button></p>
    <div v-else-if="history?.content.length" class="scroll" tabindex="-1" role="region" aria-label="재고 변경 이력 표">
      <table class="data-table"><thead><tr><th scope="col">일시</th><th scope="col">사유</th><th scope="col">변경 전</th><th scope="col">변경 후</th><th scope="col">주문 ID</th><th scope="col">처리자</th></tr></thead>
        <tbody><tr v-for="item in history.content" :key="item.stockHistoryId"><td data-label="일시" class="nowrap">{{ item.createdAt?.replace('T', ' ').slice(0, 16) }}</td><td data-label="사유">{{ reasons[item.reason] ?? item.reason }}</td><td data-label="변경 전">{{ item.previousQuantity }}</td><td data-label="변경 후">{{ item.newQuantity }}</td><td data-label="주문 ID">{{ item.orderId ?? '—' }}</td><td data-label="처리자">{{ item.actorName || (item.actorId == null ? '시스템' : '이름 확인 중') }}</td></tr></tbody>
      </table>
    </div>
    <p v-else-if="history" class="empty">재고 변경 이력이 없습니다.</p>
    <Pagination v-if="history" :model-value="page + 1" :page-count="history.totalPages" :disabled="loading" label="재고 이력 페이지" @update:model-value="page = $event - 1" />
  </section>
</template>

<style scoped>
.stock-history { min-width: 0; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--color-border); }
.stock-history h3 { margin-bottom: 16px; font-size: var(--font-size-body); }
</style>
