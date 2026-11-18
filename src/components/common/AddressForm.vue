<script setup>
import { nextTick, onMounted, reactive, ref, useId } from 'vue'
import PhoneInput from './PhoneInput.vue'
import { loadPostcode } from '../../services/postcode.js'
import { phoneDigits } from '../../services/phone.js'

const props = defineProps({ address: { type: Object, default: null }, first: Boolean, live: Boolean, busy: Boolean, error: { type: String, default: '' } })
const emit = defineEmits(['save', 'cancel'])
const id = useId()
const draft = reactive({ name: '', recipient: '', phone: '', postalCode: '', address: '', detail: '', memo: '', customs: '', isDefault: props.first, ...props.address })
const firstInput = ref(null)
const postcodePanel = ref(null)
const detailInput = ref(null)
const showPostcode = ref(false)
const postcodeError = ref('')
const validationError = ref('')
onMounted(() => firstInput.value?.focus())

async function searchPostcode() {
  showPostcode.value = !showPostcode.value
  postcodeError.value = ''
  if (!showPostcode.value) return
  await nextTick()
  const panel = postcodePanel.value
  try {
    await loadPostcode()
    if (!showPostcode.value || postcodePanel.value !== panel) return
    const colors = getComputedStyle(panel)
    new window.kakao.Postcode({
      width: '100%', height: '100%',
      theme: { searchBgColor: colors.getPropertyValue('--color-accent').trim(), queryTextColor: colors.getPropertyValue('--color-text').trim() },
      onresize: ({ height }) => { panel.style.height = height + 'px' },
      oncomplete(data) {
        if (!showPostcode.value || postcodePanel.value !== panel) return
        draft.postalCode = data.zonecode
        draft.address = data.roadAddress || data.jibunAddress || data.address
        draft.detail = ''
        showPostcode.value = false
        detailInput.value?.focus()
      },
    }).embed(panel)
    panel.querySelector('iframe')?.focus()
  } catch {
    if (postcodePanel.value !== panel) return
    showPostcode.value = false
    postcodeError.value = '우편번호 검색을 불러오지 못했습니다. 주소를 직접 입력해주세요.'
  }
}

function submit() {
  if (props.busy) return
  const values = Object.fromEntries(['name', 'recipient', 'phone', 'postalCode', 'address', 'detail', 'memo', 'customs'].map((key) => [key, (draft[key] ?? '').trim()]))
  values.customs = values.customs.toUpperCase()
  if (values.customs && !/^P\d{12}$/.test(values.customs)) {
    validationError.value = '개인통관고유부호는 P로 시작하는 13자리로 입력해주세요.'
    return
  }
  if (!values.name || !values.recipient || !values.address || !/^\d{5}$/.test(values.postalCode)) {
    validationError.value = '배송지명, 받는 사람, 우편번호와 주소를 확인해주세요.'
    return
  }
  if (phoneDigits(values.phone) !== phoneDigits(props.address?.phone) && !/^\d{11}$/.test(phoneDigits(values.phone))) {
    validationError.value = '연락처 11자리를 입력해주세요.'
    return
  }
  if (!phoneDigits(values.phone)) { validationError.value = '연락처를 입력해주세요.'; return }
  validationError.value = ''
  emit('save', { ...values, isDefault: draft.isDefault })
}
</script>

<template>
  <div class="address-form" role="group" :aria-labelledby="id + '-heading'" @keydown.enter="$event.target.tagName === 'INPUT' && ($event.preventDefault(), submit())">
    <header class="address-form-heading"><h2 :id="id + '-heading'">{{ address ? '배송지 수정' : '배송지 추가' }}</h2></header>
    <div class="address-fields">
      <label class="address-label" :for="id + '-name'">배송지명 <span>*</span></label>
      <input :id="id + '-name'" ref="firstInput" v-model="draft.name" maxlength="50" placeholder="예: 우리집, 회사" />
      <label class="address-label" :for="id + '-recipient'">받는 사람 <span>*</span></label>
      <input :id="id + '-recipient'" v-model="draft.recipient" maxlength="100" autocomplete="shipping name" placeholder="이름을 입력하세요." />
      <label class="address-label" :for="id + '-phone'">연락처 <span>*</span></label>
      <PhoneInput :id="id + '-phone'" v-model="draft.phone" label="연락처" />
      <div :id="id + '-address-label'" class="address-label">주소 <span>*</span></div>
      <div class="address-inputs" role="group" :aria-labelledby="id + '-address-label'">
        <div class="postcode-row"><input v-model="draft.postalCode" aria-label="우편번호" inputmode="numeric" maxlength="5" placeholder="우편번호" autocomplete="shipping postal-code" /><button type="button" :aria-expanded="showPostcode" @click="searchPostcode">{{ showPostcode ? '검색 닫기' : '우편번호 검색' }}</button></div>
        <div v-if="showPostcode" ref="postcodePanel" class="postcode-panel" />
        <p v-if="postcodeError" class="message" role="alert">{{ postcodeError }}</p>
        <input v-model="draft.address" aria-label="기본 주소" placeholder="기본 주소 (검색으로 자동 입력)" maxlength="255" autocomplete="shipping address-line1" />
        <input ref="detailInput" v-model="draft.detail" aria-label="상세 주소" placeholder="상세 주소를 입력하세요. (동, 호수 등)" maxlength="255" autocomplete="shipping address-line2" />
      </div>
      <label class="address-label" :for="id + '-customs'">개인통관고유부호</label>
      <div class="address-inputs"><input :id="id + '-customs'" v-model="draft.customs" maxlength="13" placeholder="P로 시작하는 13자리 (선택)" autocomplete="off" spellcheck="false" /><small>받는 사람 명의의 통관번호를 입력해주세요.</small></div>
      <label v-if="!live" class="address-label" :for="id + '-memo'">배송 메모</label>
      <textarea v-if="!live" :id="id + '-memo'" v-model="draft.memo" placeholder="배송 시 요청사항을 입력하세요. (선택)" maxlength="100" />
      <div class="address-default-option"><label><input v-model="draft.isDefault" type="checkbox" :disabled="busy || (live && address?.isDefault)" /> 기본 배송지로 설정</label><small>배송지 목록의 맨 위에 표시됩니다.</small></div>
      <p v-if="validationError || error" class="message form-error" role="alert">{{ validationError || error }}</p>
    </div>
    <div class="address-form-actions"><button type="button" :disabled="busy" @click="emit('cancel')">취소</button><button type="button" class="primary" :disabled="busy" @click="submit">저장하기</button></div>
  </div>
</template>

<style scoped>
.address-form { min-width: 0; overflow: hidden; border: 1px solid var(--color-border); border-radius: 12px; background: #fff; color: var(--color-text); font-size: var(--font-size-body); }
.address-form-heading { padding: 15px 20px; background: var(--color-accent); color: var(--color-primary); }
.address-form-heading h2 { margin: 0; font-size: var(--font-size-section); font-weight: 600; }
.address-fields { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 14px 16px; padding: 18px 20px; }
.address-label { align-self: start; padding-top: 8px; font-weight: 600; }
.address-label span, .message { color: var(--color-primary); }
.address-form input:not([type='checkbox']), .address-form textarea { width: 100%; min-width: 0; box-sizing: border-box; min-height: 36px; padding: 7px 10px; border: 1px solid var(--color-border); border-radius: 7px; color: inherit; background: #fff; font: inherit; font-size: var(--font-size-control); }
.address-inputs { display: grid; gap: 8px; min-width: 0; }
.address-inputs p { margin: 0; }
.postcode-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }
.postcode-row button { white-space: nowrap; }
.postcode-panel { min-width: 0; min-height: 360px; overflow: hidden; border-radius: 8px; }
.address-form textarea { min-height: 60px; resize: vertical; }
.address-default-option { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; }
.address-default-option label { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
.address-default-option input { width: 16px; height: 16px; margin: 0; accent-color: var(--color-primary); }
.address-default-option small { color: #71666b; }
.form-error { grid-column: 1 / -1; margin: 0; }
.address-form-actions { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 20px; border-top: 1px solid var(--color-border); }
.address-form button { min-height: 34px; padding: 5px 12px; border: 1px solid var(--color-primary); border-radius: 7px; background: #fff; color: var(--color-primary); font: inherit; font-size: var(--font-size-control); cursor: pointer; }
.address-form button:disabled { opacity: .55; cursor: default; }
.address-form button.primary { background: var(--color-primary); color: #fff; }
@media (max-width: 600px) { .address-fields { grid-template-columns: minmax(0, 1fr); gap: 8px; } .address-label { padding-top: 4px; } }
</style>
