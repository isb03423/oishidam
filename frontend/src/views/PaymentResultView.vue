<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { confirmPayment } from '../services/orders.js'
import { session } from '../stores/session.js'
import { clearCheckout } from '../stores/checkout.js'

const route = useRoute()
const status = ref('loading')
const message = ref('결제 결과를 확인하고 있습니다.')
const orderId = ref(null)
let confirmation
async function confirm() {
  status.value = 'loading'
  try {
    const result = await confirmPayment(orderId.value, confirmation)
    if (!result.paidAt || ['취소 처리 중', '취소 완료', 'CANCEL_PENDING', 'CANCELLED'].includes(result.orderStatus)) throw new Error('현재 주문 상태를 확인해 주세요.')
    sessionStorage.removeItem('oishidam:payment:' + confirmation.orderNumber)
    history.replaceState(history.state, '', location.pathname)
    clearCheckout()
    status.value = 'success'
    message.value = '테스트 결제가 완료되었습니다.'
  } catch (error) {
    status.value = 'error'
    message.value = error.message || '결제 결과를 확인하지 못했습니다.'
  }
}
onMounted(() => {
  if (route.name === 'PaymentFail') {
    status.value = 'failed'
    message.value = typeof route.query.message === 'string' ? route.query.message : '결제가 완료되지 않았습니다.'
    return
  }
  try {
    const { orderId: orderNumber, paymentKey, amount } = route.query
    const saved = JSON.parse(sessionStorage.getItem('oishidam:payment:' + orderNumber))
    if (!saved || saved.memberId !== session.member?.member_id || saved.orderNumber !== orderNumber || Number(amount) !== saved.amount || typeof paymentKey !== 'string' || !paymentKey) throw new Error('결제 정보를 확인할 수 없습니다. 주문 내역을 확인해 주세요.')
    orderId.value = saved.orderId
    confirmation = { paymentRequestKey: saved.paymentRequestKey, paymentKey, orderNumber, amount: saved.amount }
    confirm()
  } catch (error) { status.value = 'failed'; message.value = error.message }
})
</script>

<template>
  <main class="site-container payment-result">
    <h1>결제 결과</h1>
    <p role="status">{{ message }}</p>
    <button v-if="status === 'error'" type="button" @click="confirm">다시 확인</button>
    <RouterLink :to="orderId ? { name: 'MyPageOrderDetail', params: { orderId } } : { name: 'MyPageOrders' }">주문 내역 확인</RouterLink>
  </main>
</template>

<style scoped>
.payment-result { padding-block: 4rem; text-align: center; }
h1 { font-size: var(--font-size-title); font-weight: 700; }
p { margin: 1rem 0; }
button, a { margin: .5rem; }
</style>
