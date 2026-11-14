<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import PhoneInput from '../components/common/PhoneInput.vue'
import { development } from '../config/development.js'
import { getAddresses } from '../services/addresses.js'
import { phoneDigits } from '../services/phone.js'
import { loadPostcode } from '../services/postcode.js'
import { checkout, clearCheckout, shippingFee } from '../stores/checkout.js'
import { removeCartItems } from '../stores/cart.js'
import { session, shoppingOwner } from '../stores/session.js'

const form = reactive({ recipient: '', phone: '', postalCode: '', address: '', detail: '', customs: '', memo: '' })
const memoChoice = ref('')
const addresses = ref([])
const addressDialog = ref(null)
const addressError = ref('')
const addressLoading = ref(false)
const postcodePanel = ref(null)
const detailInput = ref(null)
const showPostcode = ref(false)
const postcodeError = ref('')
const notice = ref('')
const completed = ref(false)
const items = computed(() => checkout.value?.items ?? [])
const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
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
    if (preferred && !form.recipient && !form.phone && !form.postalCode && !form.address && !form.detail) applyAddress(preferred)
  } catch {
    if (!controller.signal.aborted) addressError.value = '배송지 목록을 불러오지 못했어요. 직접 입력할 수 있어요.'
  } finally {
    if (!controller.signal.aborted) addressLoading.value = false
  }
}, { immediate: true })

function applyAddress(address) {
  for (const key of ['recipient', 'phone', 'postalCode', 'address', 'detail']) form[key] = address[key] ?? ''
  addressDialog.value?.close()
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

function placeOrder() {
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
    notice.value = '실제 주문과 결제 기능을 준비 중이에요.'
    return
  }
  if (checkout.value.fromCart) removeCartItems(items.value.map((item) => item.variant_id))
  for (const key of Object.keys(form)) form[key] = ''
  completed.value = true
  clearCheckout()
}
</script>

<template>
  <div class="checkout-page">
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
            <dialog ref="addressDialog" class="checkout-card address-dialog" aria-labelledby="address-list-title">
              <header class="card-heading"><h2 id="address-list-title">배송지 목록</h2><button type="button" class="checkout-button" @click="addressDialog.close()">닫기</button></header>
              <p v-if="addressLoading" role="status">배송지를 불러오는 중이에요.</p>
              <p v-else-if="addressError" role="status">{{ addressError }}</p>
              <p v-else-if="!addresses.length">저장된 배송지가 없어요. 주문서에 직접 입력해 주세요.</p>
              <ul v-else class="address-list">
                <li v-for="address in addresses" :key="address.id">
                  <button type="button" class="checkout-button" @click="applyAddress(address)">
                    {{ address.name || address.recipient }} · {{ address.address }} {{ address.detail }}
                  </button>
                </li>
              </ul>
            </dialog>
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
            <header class="card-heading"><h2 id="items-heading">주문 상품 ({{ items.length }}건)</h2></header>
            <ul class="order-items">
              <li v-for="item in items" :key="item.variant_id">
                <div class="order-image"><img v-if="item.image" :src="item.image" alt="" @error="$event.target.hidden = true" /><span v-else>이미지 준비 중</span></div>
                <div><strong>{{ item.name }}</strong><p>{{ item.option || '기본' }} / 수량 {{ item.quantity }}</p></div>
                <strong class="line-price">{{ won(item.price * item.quantity) }}</strong>
              </li>
            </ul>
          </section>

          <section class="checkout-card" aria-labelledby="memo-heading">
            <header class="card-heading"><h2 id="memo-heading">배송 요청사항</h2></header>
            <div class="memo-options" role="group" aria-labelledby="memo-heading">
              <label v-for="option in memoOptions" :key="option.value"><input v-model="memoChoice" type="radio" name="delivery-memo" :value="option.value" />{{ option.label }}</label>
            </div>
            <textarea v-if="memoChoice === 'custom'" v-model="form.memo" required maxlength="255" rows="2" aria-label="배송 요청사항 직접 입력" placeholder="배송 요청사항을 입력해주세요." />
          </section>
        </div>

        <aside class="checkout-card checkout-summary" aria-labelledby="summary-heading">
          <header class="card-heading"><h2 id="summary-heading">주문 요약</h2></header>
          <dl>
            <div><dt>상품 금액 ({{ items.length }}건)</dt><dd>{{ won(subtotal) }}</dd></div>
            <div><dt>배송비</dt><dd>{{ won(shippingFee) }}</dd></div>
            <div class="total"><dt>결제 예정 금액</dt><dd>{{ won(subtotal + shippingFee) }}</dd></div>
          </dl>
          <p class="checkout-note">주문 상품, 배송지, 수령인 명의의 통관번호를 확인해 주세요.</p>
          <button class="checkout-button primary submit" type="submit">주문하기</button>
          <p v-if="notice" class="checkout-notice" role="alert">{{ notice }}</p>
        </aside>
      </form>
    </main>
  </div>
</template>

<style scoped>
.checkout-page { background: var(--color-background); color: var(--color-text); }
.checkout-content { padding-block: 32px 56px; }
.checkout-header { margin-bottom: 25px; }
h1 { font-size: clamp(1.35rem, 3vw, 1.65rem); font-weight: 800; }
.checkout-header p { margin-top: 4px; color: var(--color-secondary); }
.checkout-grid { display: grid; grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr); gap: 16px; align-items: start; }
.checkout-fields { display: grid; gap: 14px; }
.checkout-card { min-width: 0; padding: 18px 20px; border: 1px solid var(--color-border); border-radius: 14px; background: var(--color-white); }
.card-heading { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; padding-bottom: 12px; margin-bottom: 14px; border-bottom: 1px solid var(--color-border); }
h2 { color: var(--color-text); font-size: 1.15rem; font-weight: 800; }
.checkout-button { display: inline-flex; align-items: center; justify-content: center; padding: 7px 12px; border: 1px solid var(--color-primary); border-radius: 8px; color: var(--color-primary); background: var(--color-white); font: inherit; font-weight: 700; cursor: pointer; }
.address-list-button { padding: 5px 10px; font-size: .875rem; }
.checkout-button.primary { color: var(--color-white); background: var(--color-primary); }
.form-fields { display: grid; gap: 10px; }
.form-fields > label, .form-row { display: grid; grid-template-columns: 92px minmax(0, 1fr); gap: 10px; align-items: center; font-size: .9rem; }
.form-fields b { color: var(--color-primary); }
.postcode-field { display: flex; align-items: stretch; gap: 8px; }
.postcode-field input { max-width: 160px; }
.postcode-field button { white-space: nowrap; }
.postcode-panel { min-height: 360px; }
.form-fields :deep(input), textarea { width: 100%; min-width: 0; padding: 8px 10px; border: 1px solid var(--color-border); border-radius: 8px; color: inherit; background: var(--color-white); font: inherit; }
.guide-link { color: var(--color-primary); text-decoration: underline; font-size: .82rem; }
.checkout-note { margin-top: 12px; padding: 12px; border-radius: 8px; background: var(--color-background); color: var(--color-secondary); font-size: .88rem; }
.order-items li { display: grid; grid-template-columns: 58px minmax(0, 1fr) auto; align-items: center; gap: 10px; padding-block: 10px; }
.order-items li + li { border-top: 1px solid var(--color-border); }
.order-items p { color: var(--color-secondary); font-size: .84rem; }
.order-image { display: grid; place-items: center; width: 58px; aspect-ratio: 1; overflow: hidden; border-radius: 8px; background: var(--color-background); color: var(--color-secondary); text-align: center; font-size: .65rem; }
.order-image img { width: 100%; height: 100%; object-fit: contain; }
.line-price { white-space: nowrap; }
.memo-options { display: flex; flex-wrap: wrap; gap: 10px 16px; font-size: .86rem; }
.memo-options label { display: flex; align-items: center; gap: 4px; }
.memo-options input { accent-color: var(--color-primary); }
textarea { margin-top: 12px; }
.checkout-summary dl > div { display: flex; justify-content: space-between; gap: 10px; padding: 7px 0; }
.checkout-summary dl .total { align-items: baseline; margin-top: 8px; padding-top: 14px; border-top: 1px solid var(--color-border); font-weight: 800; }
.total dd { color: var(--color-primary); font-size: 1.45rem; white-space: nowrap; }
.submit { width: 100%; min-height: 44px; margin-top: 14px; }
.checkout-notice { margin-top: 10px; color: var(--color-primary); }
.address-dialog { position: fixed; inset: 0; width: min(480px, calc(100% - 32px)); max-height: 80vh; margin: auto; overflow: auto; }
.address-dialog::backdrop { background: rgb(57 44 50 / 45%); }
.address-list { display: grid; gap: 8px; }
.checkout-state { text-align: center; padding-block: 48px; }
.checkout-state p { margin: 8px 0 18px; }
@media (max-width: 740px) { .checkout-grid { grid-template-columns: 1fr; } }
@media (max-width: 440px) {
  .form-fields > label, .form-row { grid-template-columns: 1fr; gap: 4px; }
  .checkout-card { padding-inline: 14px; }
}
</style>
