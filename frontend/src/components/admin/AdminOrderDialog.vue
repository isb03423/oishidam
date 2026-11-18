<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useRoute } from 'vue-router'
import AdminIcon from './AdminIcon.vue'
import AdminOrderDetail from './AdminOrderDetail.vue'
import { getAdminDetail, setAdminOrderStatus } from '../../services/admin.js'
import { nextOrderStatus } from '../../utils/adminStatus.js'
import { getSessionRevision, session, shoppingOwner } from '../../stores/session.js'

const emit = defineEmits(['saved'])
const route = useRoute(), id = useId(), dialog = ref(null)
const detail = ref(null), selectedId = ref(null), note = ref(''), loading = ref(false), busy = ref(false), error = ref('')
const nextStatus = computed(() => nextOrderStatus(detail.value?.order?.orderStatus))
let controller, version = 0, disposed = false
async function load() {
  controller?.abort()
  const request = controller = new AbortController(), current = ++version, revision = getSessionRevision()
  loading.value = true; error.value = ''
  try {
    const result = await getAdminDetail('orders', selectedId.value, request.signal)
    if (!request.signal.aborted && current === version && revision === getSessionRevision()) detail.value = result
  } catch (failure) { if (!request.signal.aborted && current === version && revision === getSessionRevision()) error.value = failure.message }
  finally { if (!request.signal.aborted && current === version && revision === getSessionRevision()) loading.value = false }
}
async function open(orderId) {
  if (busy.value || session.source !== 'api' || session.member?.role !== 'ADMIN') return
  selectedId.value = orderId; detail.value = null; note.value = error.value = ''
  await nextTick()
  if (disposed) return
  if (!dialog.value.open) dialog.value.showModal()
  load()
}
function close(force = false) {
  if (busy.value && !force) return
  controller?.abort(); version++; dialog.value?.close()
  detail.value = null; selectedId.value = null; loading.value = busy.value = false
}
async function advance() {
  if (busy.value || !nextStatus.value || !detail.value) return
  const current = version, revision = getSessionRevision(), orderId = selectedId.value, status = nextStatus.value
  const valid = () => !disposed && current === version && revision === getSessionRevision()
  busy.value = true; error.value = ''
  try {
    await setAdminOrderStatus(orderId, status, note.value)
    if (!valid()) return
    note.value = ''; detail.value.order.orderStatus = status; emit('saved', '주문 상태를 변경했습니다.')
    const result = await getAdminDetail('orders', orderId)
    if (valid()) detail.value = result
  } catch (failure) { if (valid()) error.value = failure.message }
  finally { if (valid()) busy.value = false }
}
watch([shoppingOwner, () => route.fullPath], () => close(true))
onBeforeUnmount(() => { disposed = true; controller?.abort(); version++ })
defineExpose({ open })
</script>
<template>
  <dialog ref="dialog" class="admin-order-dialog" :aria-labelledby="id + '-heading'" @cancel.prevent="close()">
    <header class="order-dialog-heading"><div><h2 :id="id + '-heading'">주문 상세</h2><p v-if="detail">{{ detail.order.orderNumber }}</p></div><button type="button" autofocus :disabled="busy" @click="close()"><AdminIcon name="close" />닫기</button></header>
    <p v-if="loading" class="order-dialog-feedback" role="status">주문 정보를 불러오는 중입니다.</p>
    <div v-if="error" class="order-dialog-feedback is-error" role="alert">{{ error }}<button v-if="!detail" type="button" @click="load">다시 조회</button></div>
    <AdminOrderDetail v-if="detail" :detail="detail" :next-status="nextStatus" :busy="busy" v-model:note="note" @advance="advance" />
  </dialog>
</template>
<style scoped>
.admin-order-dialog { position: fixed; inset: 0; width: min(1060px, calc(100% - 48px)); height: min(820px, calc(100dvh - 24px)); max-width: calc(100% - 16px); max-height: calc(100dvh - 24px); margin: auto; padding: 0; overflow: hidden; overscroll-behavior: contain; border: 1px solid var(--admin-line); border-radius: 8px; background: var(--admin-surface); color: var(--admin-ink); }.admin-order-dialog[open] { display: flex; flex-direction: column; }.admin-order-dialog::backdrop { background: rgb(30 23 31 / 42%); overflow: hidden; overscroll-behavior: contain; }.order-dialog-heading { display: flex; align-items: center; justify-content: space-between; flex: none; gap: 16px; padding: 18px 24px; border-bottom: 1px solid var(--admin-line); }.order-dialog-heading p { margin-top: 6px; color: var(--admin-muted); font-size: var(--font-size-label); }.order-dialog-feedback { display: flex; align-items: center; flex: none; gap: 12px; padding: 8px 24px; font-size: var(--font-size-label); color: var(--admin-success); background: var(--admin-success-soft); }.order-dialog-feedback.is-error { color: var(--admin-danger); background: var(--admin-danger-soft); }
@media(min-width:761px) and (max-height:740px) { .order-dialog-heading { padding: 12px 20px; } }
@media(max-width:760px) { .admin-order-dialog { width: calc(100% - 16px); height: calc(100dvh - 24px); }.order-dialog-heading { padding: 16px; } }
@media(max-height:500px), (max-width:760px) and (max-height:650px) { .order-dialog-heading { padding: 8px 16px; }.order-dialog-heading h2 { font-size: var(--font-size-section); }.order-dialog-heading p { margin-top: 2px; font-size: var(--font-size-caption); } }
</style>
