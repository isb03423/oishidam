<script setup>
import { computed, nextTick, reactive, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import PhoneInput from '../components/common/PhoneInput.vue'
import AddressForm from '../components/common/AddressForm.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import { development } from '../config/development.js'
import { deleteAddress, getAddresses, saveAddress } from '../services/addresses.js'
import { formatPhone, phoneDigits } from '../services/phone.js'
import { loadPostcode } from '../services/postcode.js'
import { quoteOrder, createOrder, startPayment, getPaymentConfig } from '../services/orders.js'
import { checkout, clearCheckout, shippingFee, restoreCheckout, saveCheckoutInputs } from '../stores/checkout.js'
import { removeCartItems } from '../stores/cart.js'
import { session, shoppingOwner } from '../stores/session.js'

const form = reactive({ recipient: '', phone: '', postalCode: '', address: '', detail: '', customs: '', memo: '' })
const memoChoice = ref('')
const previousInputs = restoreCheckout()
const addresses = ref([])
const addressDialog = ref(null)
const deleteAddressDialog = ref(null)
const addressError = ref('')
const addressLoading = ref(false)
const addressBusy = ref(false)
const addressEditing = ref(false)
const editingAddressId = ref(null)
const orderedAddresses = computed(() => [...addresses.value].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)))
const postcodePanel = ref(null)
const detailInput = ref(null)
const showPostcode = ref(false)
const postcodeError = ref('')
const notice = ref('')
const completed = ref(false)
const preparing = ref(false)
const paymentReady = ref(false)
const paymentLoading = ref(false)
const paymentError = ref('')
let paymentRevision = 0
let mounted = false
const serverQuote = ref(null)
let attempt = null
let widget = null
let methodsUI = null
let agreementUI = null
const items = computed(() => checkout.value?.items ?? [])
const itemsExpanded = ref(false)
const visibleItems = computed(() => itemsExpanded.value ? items.value : items.value.slice(0, 1))
const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
const itemsAmount = computed(() => serverQuote.value?.itemsAmount ?? subtotal.value)
const deliveryFee = computed(() => serverQuote.value?.shippingFee ?? shippingFee)
const totalAmount = computed(() => serverQuote.value?.totalAmount ?? subtotal.value + shippingFee)
const formatter = new Intl.NumberFormat('ko-KR')
const won = (value) => formatter.format(value) + '원'
const customsHelp = 'https://www.customs.go.kr/kcs/ad/cntnts/cntntsView.do?cntntsId=10220&mi=10220'
const memoOptions = [
  { value: '', label: '요청사항 없음' },
  { value: '부재 시 문 앞에 놓아주세요', label: '부재 시 문 앞에 놓아주세요' },
  { value: '경비실에 맡겨주세요', label: '경비실에 맡겨주세요' },
  { value: 'custom', label: '직접 입력' },
]

watch(shoppingOwner, async (owner, _, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  addresses.value = []
  addressEditing.value = false
  addressBusy.value = false
  addressError.value = ''
  addressLoading.value = false
  if (!session.member || !checkout.value) return
  addressLoading.value = true
  try {
    const saved = session.source === 'api'
      ? await getAddresses(controller.signal)
      : JSON.parse(localStorage.getItem('oishidam:addresses:v1:' + owner) ?? '[]')
    if (controller.signal.aborted) return
    addresses.value = Array.isArray(saved) ? saved : []
    const preferred = addresses.value.find((item) => item.isDefault)
    if (!previousInputs && preferred && !form.recipient && !form.phone && !form.postalCode && !form.address && !form.detail) applyAddress(preferred)
  } catch {
    if (!controller.signal.aborted) addressError.value = '배송지 목록을 불러오지 못했어요. 직접 입력할 수 있어요.'
  } finally {
    if (!controller.signal.aborted) addressLoading.value = false
  }
}, { immediate: true })

function applyAddress(address) {
  for (const key of ['recipient', 'phone', 'postalCode', 'address', 'detail', 'customs']) form[key] = address[key] ?? ''
  addressDialog.value?.close()
}

function isSelectedAddress(address) {
  return ['recipient', 'postalCode', 'address', 'detail'].every((key) => (form[key] ?? '') === (address[key] ?? ''))
    && phoneDigits(form.phone) === phoneDigits(address.phone)
}

function editAddress(address = null) {
  editingAddressId.value = address?.id ?? null
  addressError.value = ''
  addressEditing.value = true
}

async function saveDraftAddress(value) {
  if (addressBusy.value) return
  value = { ...value, phone: phoneDigits(value.phone) }
  const owner = shoppingOwner.value
  const previous = addresses.value.find((address) => address.id === editingAddressId.value)
  const wasSelected = previous && isSelectedAddress(previous)
  addressBusy.value = true
  addressError.value = ''
  try {
    const saved = session.source === 'api' ? await saveAddress(value, editingAddressId.value) : { ...value, id: editingAddressId.value ?? crypto.randomUUID() }
    if (owner !== shoppingOwner.value) return
    let updated = editingAddressId.value == null ? [...addresses.value, saved] : addresses.value.map((address) => address.id === saved.id ? saved : address)
    if (saved.isDefault) updated = updated.map((address) => ({ ...address, isDefault: address.id === saved.id }))
    if (session.source !== 'api') localStorage.setItem('oishidam:addresses:v1:' + owner, JSON.stringify(updated))
    addresses.value = updated
    if (wasSelected) for (const key of ['recipient', 'phone', 'postalCode', 'address', 'detail', 'customs']) form[key] = saved[key] ?? ''
    addressEditing.value = false
  } catch (error) { if (owner === shoppingOwner.value) addressError.value = error.message || '배송지를 저장하지 못했어요.' }
  finally { if (owner === shoppingOwner.value) addressBusy.value = false }
}

async function removeSavedAddress([addressId]) {
  if (addressBusy.value) return
  const address = addresses.value.find(({ id }) => id === addressId)
  if (!address) return
  const owner = shoppingOwner.value
  addressBusy.value = true
  addressError.value = ''
  try {
    if (session.source === 'api') await deleteAddress(address.id)
    if (owner !== shoppingOwner.value) return
    const updated = addresses.value.filter((item) => item.id !== address.id)
    if (session.source !== 'api') localStorage.setItem('oishidam:addresses:v1:' + owner, JSON.stringify(updated))
    addresses.value = updated
  } catch (error) { if (owner === shoppingOwner.value) addressError.value = error.message || '배송지를 삭제하지 못했어요.' }
  finally { if (owner === shoppingOwner.value) addressBusy.value = false }
}

async function searchPostcode() {
  showPostcode.value = !showPostcode.value
  postcodeError.value = ''
  if (!showPostcode.value) return
  await nextTick()
  const panel = postcodePanel.value
  try {
    await loadPostcode()
    if (!panel || postcodePanel.value !== panel) return
    new window.kakao.Postcode({
      width: '100%',
      height: '100%',
      onresize: ({ height }) => { panel.style.height = height + 'px' },
      oncomplete(data) {
        if (postcodePanel.value !== panel) return
        form.postalCode = data.zonecode
        form.address = data.roadAddress || data.jibunAddress || data.address
        form.detail = ''
        showPostcode.value = false
        detailInput.value?.focus()
      },
    }).embed(panel)
    panel.querySelector('iframe')?.focus()
  } catch {
    if (postcodePanel.value !== panel) return
    showPostcode.value = false
    postcodeError.value = '주소 검색을 불러오지 못했어요. 주소를 직접 입력해 주세요.'
  }
}

async function initializePayment() {
  const current = ++paymentRevision
  const owner = shoppingOwner.value
  paymentReady.value = false
  paymentLoading.value = false
  paymentError.value = ''
  widget = null
  if (development.mockEnabled || session.source !== 'api' || !items.value.length) return
  paymentLoading.value = true
  const active = () => current === paymentRevision && owner === shoppingOwner.value
  try {
    await Promise.all([methodsUI?.destroy(), agreementUI?.destroy()])
    methodsUI = null
    agreementUI = null
    const config = await getPaymentConfig()
    if (!active()) return
    if (!window.TossPayments) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://js.tosspayments.com/v2/standard'
        script.onload = resolve
        script.onerror = () => { script.remove(); reject(new Error('결제 화면을 불러오지 못했습니다.')) }
        document.head.appendChild(script)
      })
    }
    if (!active()) return
    const instance = window.TossPayments(config.clientKey).widgets({ customerKey: window.TossPayments.ANONYMOUS })
    await instance.setAmount({ currency: 'KRW', value: subtotal.value + shippingFee })
    if (!active()) return
    document.querySelector('#payment-methods').replaceChildren()
    document.querySelector('#payment-agreement').replaceChildren()
    const methods = await instance.renderPaymentMethods({ selector: '#payment-methods' })
    if (!active()) { await methods.destroy(); return }
    methodsUI = methods
    const agreement = await instance.renderAgreement({ selector: '#payment-agreement' })
    if (!active()) { await agreement.destroy(); return }
    agreementUI = agreement
    widget = instance
    paymentReady.value = true
  } catch (error) { if (active()) paymentError.value = error.message || '결제 수단을 불러오지 못했습니다.' }
  finally { if (active()) paymentLoading.value = false }
}

onMounted(() => {
  mounted = true
  if (previousInputs) {
    if (window.confirm('주문서가 새로고침되어 결제 정보가 초기화되었습니다.\n이전에 입력하신 배송지와 통관번호를 그대로 유지하시겠습니까?')) {
      for (const key of ['recipient', 'phone', 'postalCode', 'address', 'detail', 'memo', 'customs']) form[key] = typeof previousInputs[key] === 'string' ? previousInputs[key] : ''
      memoChoice.value = memoOptions.some((option) => option.value === previousInputs.memoChoice) ? previousInputs.memoChoice : ''
    }
    saveCheckoutInputs(form, memoChoice.value)
  }
  initializePayment()
})
watch([form, memoChoice], () => saveCheckoutInputs(form, memoChoice.value), { deep: true })
onBeforeUnmount(() => {
  mounted = false
  paymentRevision++
  Promise.all([methodsUI?.destroy(), agreementUI?.destroy()]).catch(() => {})
})
watch(shoppingOwner, () => { if (mounted) initializePayment() })

async function placeOrder() {
  notice.value = ''
  if (!checkout.value || !items.value.length) return
  if (!form.recipient.trim() || !form.address.trim() || !/^\d{5}$/.test(form.postalCode.trim()) || !/^\d{9,11}$/.test(phoneDigits(form.phone))) {
    notice.value = '수령인, 연락처, 우편번호와 주소를 확인해주세요.'
    return
  }
  if (!/^P\d{12}$/.test(form.customs.trim().toUpperCase())) {
    notice.value = '개인통관고유부호는 P로 시작하는 13자리로 입력해주세요.'
    return
  }
  if (memoChoice.value === 'custom' && !form.memo.trim()) {
    notice.value = '배송 요청사항을 입력해주세요.'
    return
  }
  if (!development.mockEnabled) {
    if (preparing.value || !paymentReady.value || !widget) return
    preparing.value = true
    try {
      if (!attempt) {
        const recipient = { recipientName: form.recipient.trim(), recipientPhone: phoneDigits(form.phone), postalCode: form.postalCode.trim(), addressLine1: form.address.trim(), addressLine2: form.detail.trim() }
        const selection = checkout.value.fromCart
          ? { cartItemIds: items.value.map((item) => item.cart_item_id) }
          : { directItems: items.value.map((item) => ({ productId: Number(item.product_id), quantity: item.quantity })) }
        attempt = { owner: shoppingOwner.value, selection: { ...selection, recipient }, requestKey: crypto.randomUUID(), paymentKey: crypto.randomUUID(), memo: memoChoice.value === 'custom' ? form.memo.trim() : memoChoice.value, customs: form.customs.trim().toUpperCase() }
      }
      if (!serverQuote.value) {
        const quote = await quoteOrder(attempt.selection)
        if (shoppingOwner.value !== attempt.owner) throw new Error('로그인 정보가 변경되었습니다. 주문서를 다시 작성해 주세요.')
        serverQuote.value = quote
        await widget.setAmount({ currency: 'KRW', value: quote.totalAmount })
        if (quote.totalAmount !== subtotal.value + shippingFee) throw new Error('상품 금액이 변경되었습니다. 변경된 결제 금액을 확인한 뒤 다시 결제해 주세요.')
      }
      if (shoppingOwner.value !== attempt.owner) throw new Error('로그인 정보가 변경되었습니다. 주문서를 다시 작성해 주세요.')
      if (!attempt.order) attempt.order = await createOrder({ ...attempt.selection, requestKey: attempt.requestKey, deliveryMemo: attempt.memo, customsCode: attempt.customs })
      if (shoppingOwner.value !== attempt.owner) throw new Error('로그인 정보가 변경되었습니다. 주문서를 다시 작성해 주세요.')
      if (attempt.order.totalAmount !== serverQuote.value.totalAmount) throw new Error('주문 금액이 변경되었습니다. 주문서를 다시 작성해 주세요.')
      const payment = await startPayment(attempt.order.orderId, attempt.paymentKey)
      if (shoppingOwner.value !== attempt.owner) throw new Error('로그인 정보가 변경되었습니다. 주문서를 다시 작성해 주세요.')
      sessionStorage.setItem('oishidam:payment:' + payment.orderNumber, JSON.stringify({ orderId: attempt.order.orderId, orderNumber: payment.orderNumber, amount: payment.amount, paymentRequestKey: payment.paymentRequestKey, memberId: session.member.member_id }))
      await widget.setAmount({ currency: 'KRW', value: payment.amount })
      await requestPayment(payment.orderNumber)
    } catch (error) { notice.value = error.message || '결제 준비에 실패했습니다.' }
    finally { preparing.value = false }
    return
  }
  if (checkout.value.fromCart) {
    try { await removeCartItems(items.value.map((item) => item.product_id)) } catch (error) { notice.value = error.message; return }
  }
  for (const key of Object.keys(form)) form[key] = ''
  completed.value = true
  clearCheckout()
}

async function requestPayment(orderNumber) {
  if (!widget || !attempt?.order) return
  if (shoppingOwner.value !== attempt.owner) { notice.value = '로그인 정보가 변경되었습니다. 주문서를 다시 작성해 주세요.'; return }
  preparing.value = true
  notice.value = ''
  try {
    await widget.requestPayment({ orderId: orderNumber, orderName: items.value[0].name + (items.value.length > 1 ? ` 외 ${items.value.length - 1}건` : ''), successUrl: location.origin + '/payment/success', failUrl: location.origin + '/payment/fail' })
  } catch (error) { notice.value = error.message || '결제 요청에 실패했습니다.'; preparing.value = false }
}
</script>

<template>
  <div class="checkout-page">
    <AlertDialog :message="notice" @close="notice = ''" />
    <DeleteConfirmationDialog :key="shoppingOwner" ref="deleteAddressDialog" description="선택한 배송지를 삭제합니다." @confirm="removeSavedAddress" />
    <main class="site-container checkout-content">
      <header class="checkout-header">
        <div><h1>주문서</h1><p>주문 정보를 확인하고 주문을 완료해 주세요.</p></div>
      </header>

      <section v-if="completed" class="checkout-card checkout-state">
        <h2>모의 주문을 완료했어요</h2>
        <p>주문서 확인이 끝났어요.</p>
        <RouterLink class="checkout-button primary" :to="{ name: 'Products' }">상품 더 보기</RouterLink>
      </section>
      <section v-else-if="!items.length" class="checkout-card checkout-state">
        <h2>주문할 상품을 선택해주세요</h2>
        <p>장바구니에서 상품을 선택하거나 상품 상세에서 바로 구매할 수 있어요.</p>
        <RouterLink class="checkout-button primary" :to="{ name: 'MyPageCart' }">장바구니로 돌아가기</RouterLink>
      </section>

      <form v-else class="checkout-grid" @submit.prevent="placeOrder">
        <div class="checkout-fields">
        <fieldset class="checkout-fields" :disabled="Boolean(attempt) || preparing">
          <section class="checkout-card" aria-labelledby="shipping-heading">
            <header class="card-heading">
              <h2 id="shipping-heading">배송지 정보</h2>
              <button type="button" class="checkout-button address-list-button" aria-haspopup="dialog" @click="addressDialog.showModal()">배송지 목록</button>
            </header>
            <div class="form-fields">
              <label><span>수령인 <b>*</b></span><input v-model="form.recipient" required maxlength="100" autocomplete="shipping name" /></label>
              <div class="form-row"><label for="shipping-phone">연락처 <b>*</b></label><PhoneInput id="shipping-phone" v-model="form.phone" required autocomplete="shipping tel" /></div>
              <div class="form-row">
                <label for="shipping-postcode">우편번호 <b>*</b></label>
                <div class="postcode-field">
                  <input id="shipping-postcode" v-model.trim="form.postalCode" required inputmode="numeric" pattern="[0-9]{5}" maxlength="5" autocomplete="shipping postal-code" placeholder="우편번호 5자리" />
                  <button type="button" class="checkout-button" :aria-expanded="showPostcode" @click="searchPostcode">{{ showPostcode ? '검색 닫기' : '주소 찾기' }}</button>
                </div>
              </div>
              <div v-if="showPostcode" ref="postcodePanel" class="postcode-panel" />
              <p v-if="postcodeError" class="checkout-notice" role="status">{{ postcodeError }}</p>
              <label><span>주소 <b>*</b></span><input v-model="form.address" required maxlength="255" autocomplete="shipping address-line1" placeholder="기본 주소" /></label>
              <label><span>상세 주소</span><input ref="detailInput" v-model="form.detail" maxlength="255" autocomplete="shipping address-line2" placeholder="상세 주소" /></label>
            </div>
            <dialog ref="addressDialog" class="checkout-card address-dialog" aria-labelledby="address-list-title" @cancel="addressBusy && $event.preventDefault()" @close="addressEditing = false">
              <header class="address-dialog-heading"><h2 id="address-list-title">배송지 목록</h2><button type="button" class="address-close" aria-label="배송지 목록 닫기" :disabled="addressBusy" @click="addressDialog.close()">×</button></header>
              <AddressForm v-if="addressEditing" :key="editingAddressId ?? 'new'" :address="addresses.find((address) => address.id === editingAddressId) ?? null" :first="!addresses.length" :live="session.source === 'api'" :busy="addressBusy" :error="addressError" @save="saveDraftAddress" @cancel="addressEditing = false; addressError = ''" />
              <template v-else>
                <button type="button" class="address-add" :disabled="addressLoading" @click="editAddress()">＋ 배송지 신규 입력</button>
                <p v-if="addressLoading" class="address-message" role="status">배송지를 불러오는 중이에요.</p>
                <p v-if="addressError" class="address-message address-error" role="alert">{{ addressError }}</p>
                <p v-if="!addressLoading && !addressError && !addresses.length" class="address-message">저장된 배송지가 없어요. 배송지를 추가하거나 주문서에 직접 입력해 주세요.</p>
                <ul v-if="!addressLoading && addresses.length" class="address-list">
                  <li v-for="address in orderedAddresses" :key="address.id" class="address-item">
                    <div class="address-item-heading">
                      <div><strong :class="{ 'is-selected': isSelectedAddress(address) }">{{ address.recipient }}<template v-if="address.name"> ({{ address.name }})</template></strong> <span v-if="address.isDefault" class="address-badge">기본 배송지</span></div>
                      <span v-if="isSelectedAddress(address)" class="address-selected">✓ 선택됨</span>
                      <button v-else type="button" class="address-select" :disabled="addressBusy" @click="applyAddress(address)">선택</button>
                    </div>
                    <p class="address-phone">{{ formatPhone(address.phone) }}</p>
                    <p class="address-lines">{{ address.address }} {{ address.detail }} <span>({{ address.postalCode }})</span></p>
                    <div class="address-actions"><button type="button" :disabled="addressBusy" @click="editAddress(address)">수정</button><button type="button" :disabled="addressBusy" @click="deleteAddressDialog.open([address.id])">삭제</button></div>
                  </li>
                </ul>
              </template>
            </dialog>
          </section>

          <section class="checkout-card" aria-labelledby="memo-heading">
            <header class="card-heading"><h2 id="memo-heading">배송 요청사항</h2></header>
            <div class="memo-options" role="group" aria-labelledby="memo-heading">
              <label v-for="option in memoOptions" :key="option.value"><input v-model="memoChoice" type="radio" name="delivery-memo" :value="option.value" />{{ option.label }}</label>
            </div>
            <textarea v-if="memoChoice === 'custom'" v-model="form.memo" required maxlength="255" rows="2" aria-label="배송 요청사항 직접 입력" placeholder="배송 요청사항을 입력해주세요." />
          </section>

          <section class="checkout-card" aria-labelledby="customs-heading">
            <header class="card-heading">
              <h2 id="customs-heading">개인통관고유부호</h2>
              <a class="guide-link" :href="customsHelp" target="_blank" rel="noopener noreferrer">관세청 발급·조회</a>
            </header>
            <div class="form-fields">
              <label><span>통관번호 <b>*</b></span><input v-model.trim="form.customs" required maxlength="13" pattern="[Pp][0-9]{12}" autocomplete="off" spellcheck="false" placeholder="P로 시작하는 13자리" aria-describedby="customs-help" /></label>
            </div>
            <p id="customs-help" class="checkout-note">수령인 명의의 개인통관고유부호를 입력해 주세요.</p>
          </section>

          <section class="checkout-card" aria-labelledby="items-heading">
            <header class="card-heading"><h2 id="items-heading">주문상품 <span class="item-count">총 {{ items.length }}개</span></h2></header>
            <ul class="order-items">
              <li v-for="item in visibleItems" :key="item.product_id">
                <div class="order-image"><img v-if="item.image" :src="item.image" alt="" @error="$event.target.hidden = true" /><span v-else>이미지 준비 중</span></div>
                <div><strong>{{ item.name }}</strong><p>수량 {{ item.quantity }}</p></div>
                <strong class="line-price">{{ won(item.price * item.quantity) }}</strong>
              </li>
            </ul>
            <button v-if="items.length > 1" type="button" class="items-toggle" :aria-expanded="itemsExpanded" @click="itemsExpanded = !itemsExpanded">
              {{ itemsExpanded ? '접기' : `나머지 상품 ${items.length - 1}개 더보기` }}
              <svg viewBox="0 0 24 24" aria-hidden="true" :class="{ expanded: itemsExpanded }"><path d="m6 9 6 6 6-6" /></svg>
            </button>
          </section>

        </fieldset>

        <section v-if="!development.mockEnabled" class="checkout-card payment-card" aria-labelledby="payment-heading">
          <header class="card-heading"><h2 id="payment-heading">결제 수단</h2></header>
          <p v-if="paymentLoading" class="payment-help" role="status">결제 수단을 불러오는 중이에요.</p>
          <p v-if="paymentError" class="checkout-notice" role="alert">{{ paymentError }}</p>
          <button v-if="paymentError" class="checkout-button" type="button" @click="initializePayment">다시 시도</button>
          <div id="payment-methods"></div>
          <div id="payment-agreement"></div>
        </section>
        </div>

        <aside class="checkout-card checkout-summary" aria-labelledby="summary-heading">
          <header class="card-heading"><h2 id="summary-heading">주문 요약</h2></header>
          <dl>
            <div><dt>상품 금액 ({{ items.length }}건)</dt><dd>{{ won(itemsAmount) }}</dd></div>
            <div><dt>배송비</dt><dd>{{ won(deliveryFee) }}</dd></div>
            <div class="total"><dt>결제 예정 금액</dt><dd>{{ won(totalAmount) }}</dd></div>
          </dl>
          <p class="checkout-note">주문 상품, 배송지, 수령인 명의의 통관번호를 확인해 주세요.</p>
          <button v-if="development.mockEnabled" class="checkout-button primary submit" type="submit" :disabled="preparing">모의 주문하기</button>
          <button v-else class="checkout-button primary submit" type="submit" :disabled="!paymentReady || preparing">{{ preparing ? '결제 요청 중' : '결제하기' }}</button>
          <p v-if="!development.mockEnabled && !paymentReady" class="payment-help">결제 수단을 먼저 선택해 주세요.</p>
        </aside>
      </form>
    </main>
  </div>
</template>

<style scoped>
.checkout-page { background: var(--color-background); color: var(--color-text); }
.checkout-content { padding-block: 32px 56px; }
.checkout-header { margin-bottom: 25px; }
h1 { font-size: clamp(1.5rem, 3vw, 1.75rem); font-weight: 800; }
.checkout-header p { margin-top: 4px; color: var(--color-secondary); }
.checkout-grid { display: grid; grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr); gap: 16px; align-items: start; }
.checkout-fields { display: grid; gap: 14px; }
fieldset.checkout-fields { min-width: 0; margin: 0; padding: 0; border: 0; }
.payment-card { scroll-margin-top: 16px; }
.payment-help { margin: 10px 0; color: var(--color-secondary); font-size: var(--font-size-body); }
.checkout-card { min-width: 0; padding: 18px 20px; border: 1px solid var(--color-border); border-radius: 14px; background: var(--color-white); }
.card-heading { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; padding-bottom: 12px; margin-bottom: 14px; border-bottom: 1px solid var(--color-border); }
h2 { color: var(--color-text); font-size: var(--font-size-section); font-weight: 800; }
.checkout-button { display: inline-flex; align-items: center; justify-content: center; padding: 7px 12px; border: 1px solid var(--color-primary); border-radius: 8px; color: var(--color-primary); background: var(--color-white); font: inherit; font-size: var(--font-size-control); font-weight: 700; cursor: pointer; }
.address-list-button { padding: 5px 10px; font-size: var(--font-size-control); }
.checkout-button.primary { color: var(--color-white); background: var(--color-primary); }
.form-fields { display: grid; gap: 10px; }
.form-fields > label, .form-row { display: grid; grid-template-columns: 92px minmax(0, 1fr); gap: 10px; align-items: center; font-size: var(--font-size-body); }
.form-fields b { color: var(--color-primary); }
.postcode-field { display: flex; align-items: stretch; gap: 8px; }
.postcode-field input { max-width: 160px; }
.postcode-field button { white-space: nowrap; }
.postcode-panel { min-height: 360px; }
.form-fields :deep(input), textarea { width: 100%; min-width: 0; padding: 8px 10px; border: 1px solid var(--color-border); border-radius: 8px; color: inherit; background: var(--color-white); font: inherit; font-size: var(--font-size-control); }
.guide-link { color: var(--color-primary); text-decoration: underline; font-size: var(--font-size-body); }
.checkout-note { margin-top: 12px; padding: 12px; border-radius: 8px; background: var(--color-background); color: var(--color-secondary); font-size: var(--font-size-label); }
.order-items li { display: grid; grid-template-columns: 58px minmax(0, 1fr) auto; align-items: center; gap: 10px; padding-block: 10px; }
.order-items li + li { border-top: 1px solid var(--color-border); }
.order-items p { color: var(--color-secondary); font-size: var(--font-size-body); }
.order-image { display: grid; place-items: center; width: 58px; aspect-ratio: 1; overflow: hidden; border-radius: 8px; background: var(--color-background); color: var(--color-secondary); text-align: center; font-size: var(--font-size-caption); }
.order-image img { width: 100%; height: 100%; object-fit: contain; }
.line-price { white-space: nowrap; }
.item-count { margin-left: 4px; color: var(--color-secondary); font-size: var(--font-size-label); font-weight: 400; }
.items-toggle { display: flex; justify-content: center; align-items: center; gap: 8px; width: 100%; margin-top: 16px; padding: 11px 16px; border: 1px solid var(--color-primary); border-radius: 999px; background: var(--color-white); color: var(--color-primary); font: inherit; font-size: var(--font-size-body); font-weight: 700; cursor: pointer; }
.items-toggle svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.7; }
.items-toggle svg.expanded { transform: rotate(180deg); }
.memo-options { display: flex; flex-wrap: wrap; gap: 10px 16px; font-size: var(--font-size-body); }
.memo-options label { display: flex; align-items: center; gap: 4px; }
.memo-options input { accent-color: var(--color-primary); }
textarea { margin-top: 12px; }
.checkout-summary dl > div { display: flex; justify-content: space-between; gap: 10px; padding: 7px 0; }
.checkout-summary dl .total { align-items: baseline; margin-top: 8px; padding-top: 14px; border-top: 1px solid var(--color-border); font-weight: 800; }
.total dd { color: var(--color-primary); font-size: 1.45rem; white-space: nowrap; }
.submit { width: 100%; min-height: 44px; margin-top: 14px; }
.checkout-notice { margin-top: 10px; color: var(--color-primary); }
.address-dialog { position: fixed; inset: 0; width: min(520px, calc(100% - 32px)); max-height: min(80vh, 760px); margin: auto; padding: 24px; overflow: auto; }
.address-dialog::backdrop { background: rgb(57 44 50 / 45%); }
.address-dialog-heading { position: relative; display: flex; justify-content: center; align-items: center; margin-bottom: 22px; }
.address-close { position: absolute; right: 0; border: 0; background: transparent; color: var(--color-secondary); font-size: 1.75rem; line-height: 1; cursor: pointer; }
.address-add { width: 100%; padding: 13px; border: 1px solid var(--color-border); border-radius: 8px; background: #fff; color: var(--color-text); font: inherit; font-size: var(--font-size-control); cursor: pointer; }
.address-list { margin-top: 14px; }
.address-item { padding: 17px 0; border-top: 1px solid var(--color-border); }
.address-item-heading { display: flex; justify-content: space-between; align-items: start; gap: 12px; }
.address-item-heading strong { color: var(--color-text); font-weight: 800; }
.address-item-heading strong.is-selected, .address-selected { color: var(--color-primary); }
.address-badge { display: inline-block; padding: 2px 6px; border-radius: 4px; background: var(--color-background); color: var(--color-secondary); font-size: var(--font-size-label); }
.address-selected { flex-shrink: 0; font-weight: 700; font-size: var(--font-size-body); }
.address-select { flex-shrink: 0; padding: 5px 11px; border: 0; border-radius: 6px; background: var(--color-accent); color: var(--color-primary); font: inherit; font-size: var(--font-size-control); font-weight: 700; cursor: pointer; }
.address-phone { margin-top: 4px; color: var(--color-secondary); }
.address-lines { margin-top: 10px; overflow-wrap: anywhere; }
.address-actions { display: flex; gap: 8px; margin-top: 12px; }
.address-actions > button:not(.checkout-button) { padding: 5px 10px; border: 1px solid var(--color-border); border-radius: 6px; background: #fff; color: var(--color-text); font: inherit; font-size: var(--font-size-control); cursor: pointer; }
.address-message { padding: 20px 0 4px; color: var(--color-secondary); }
.address-error { color: var(--color-primary); }
.checkout-state { text-align: center; padding-block: 48px; }
.checkout-state p { margin: 8px 0 18px; }
@media (min-width: 741px) {
  .checkout-summary { position: sticky; top: 16px; max-height: calc(100vh - 32px); overflow-y: auto; }
}
@media (max-width: 740px) { .checkout-grid { grid-template-columns: 1fr; } }
@media (max-width: 440px) {
  .form-fields > label, .form-row { grid-template-columns: 1fr; gap: 4px; }
  .checkout-card { padding-inline: 14px; }
}
</style>
