<script setup>
import { loadPostcode } from '../services/postcode.js'
import PhoneInput from '../components/common/PhoneInput.vue'
import { deleteAddress, getAddresses, saveAddress as saveRemoteAddress, setDefaultAddress } from '../services/addresses.js'
import { formatPhone, phoneDigits } from '../services/phone.js'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { session, shoppingOwner } from '../stores/session.js'

const router = useRouter()
const storageKey = computed(() => 'oishidam:addresses:v1:' + shoppingOwner.value)
const addresses = ref([])
const editingId = ref(null)
const showForm = ref(false)
const form = ref(null)
const error = ref('')
const busy = ref(false)
const live = computed(() => session.source === 'api')
let addressRequest
const postcodePanel = ref(null)
const postcodeButton = ref(null)
const detailInput = ref(null)
const showPostcode = ref(false)
const loadingPostcode = ref(false)
const postcodeError = ref('')
const fields = [
  { key: 'name', label: '배송지명', maxLength: 50, placeholder: '예: 우리집, 회사' },
  { key: 'recipient', label: '받는 사람', maxLength: 100, autocomplete: 'shipping name', placeholder: '이름을 입력하세요.' },
  { key: 'phone', label: '연락처', maxLength: 30, autocomplete: 'shipping tel', type: 'tel', placeholder: '010-1234-5678' },
  { key: 'postalCode', label: '우편번호', maxLength: 20, autocomplete: 'shipping postal-code' },
  { key: 'address', label: '기본 주소', maxLength: 255, autocomplete: 'shipping address-line1' },
  { key: 'detail', label: '상세 주소', maxLength: 255, autocomplete: 'shipping address-line2', optional: true },
]
const contactFields = fields.slice(0, 3)
const draft = reactive({ memo: '', isDefault: false })

watch(shoppingOwner, async (_, __, onCleanup) => {
  busy.value = false
  closeForm()
  addresses.value = []
  if (!session.member) {
    router.replace({ name: 'Login' })
    return
  }
  if (live.value) {
    const controller = new AbortController()
    addressRequest = controller
    onCleanup(() => controller.abort())
    await changeRemoteAddresses(async (signal) => {
      const saved = await getAddresses(signal)
      if (!signal.aborted) addresses.value = saved
    })
    return
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey.value) ?? '[]')
    if (Array.isArray(saved)) addresses.value = saved
  } catch {
    error.value = '저장된 배송지를 불러오지 못했습니다.'
  }
}, { immediate: true })

const orderedAddresses = computed(() => [...addresses.value].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)))

function persist(updated) {
  if (!session.member) return false
  try {
    const normalized = updated.map((address) => ({ ...address, phone: phoneDigits(address.phone) }))
    localStorage.setItem(storageKey.value, JSON.stringify(normalized))
    addresses.value = normalized
    error.value = ''
    return true
  } catch {
    error.value = '배송지 변경 사항을 저장하지 못했습니다.'
    return false
  }
}

async function openForm(address) {
  if (busy.value) return
  editingId.value = address?.id ?? null
  resetPostcode()
  for (const { key } of fields) draft[key] = address?.[key] ?? ''
  draft.memo = address?.memo ?? ''
  draft.isDefault = address?.isDefault ?? addresses.value.length === 0
  showForm.value = true
  error.value = ''
  await nextTick()
  form.value?.querySelector('input')?.focus()
}

function closeForm() {
  resetPostcode()
  showForm.value = false
  editingId.value = null
  error.value = ''
}

function resetPostcode() {
  showPostcode.value = false
  loadingPostcode.value = false
  postcodeError.value = ''
}

async function searchPostcode() {
  if (showPostcode.value) {
    resetPostcode()
    return
  }

  postcodeError.value = ''
  showPostcode.value = true
  loadingPostcode.value = true
  await nextTick()
  const panel = postcodePanel.value
  if (!panel) return

  try {
    await loadPostcode()
    if (!showPostcode.value || postcodePanel.value !== panel) return
    const colors = getComputedStyle(panel)
    new window.kakao.Postcode({
      width: '100%',
      height: '100%',
      theme: {
        searchBgColor: colors.getPropertyValue('--color-accent').trim(),
        queryTextColor: colors.getPropertyValue('--color-text').trim(),
      },
      onresize({ height }) {
        panel.style.height = height + 'px'
      },
      oncomplete(data) {
        if (!showPostcode.value || postcodePanel.value !== panel) return
        draft.postalCode = data.zonecode
        draft.address = data.roadAddress || data.jibunAddress || data.address
        resetPostcode()
        detailInput.value?.focus()
      },
    }).embed(panel)
    panel.querySelector('iframe')?.focus()
  } catch {
    if (!showPostcode.value || postcodePanel.value !== panel) return
    resetPostcode()
    postcodeError.value = '우편번호 검색을 불러오지 못했습니다. 다시 검색해주세요.'
    postcodeButton.value?.focus()
  } finally {
    if (postcodePanel.value === panel) loadingPostcode.value = false
  }
}

async function changeRemoteAddresses(change) {
  if (busy.value || !addressRequest) return
  const { signal } = addressRequest
  busy.value = true
  error.value = ''
  try {
    await change(signal)
  } catch (failure) {
    if (!signal.aborted) error.value = failure.message
  } finally {
    if (!signal.aborted) busy.value = false
  }
}

function applyDefault(id) {
  addresses.value = addresses.value.map((address) => ({ ...address, isDefault: address.id === id }))
}

async function saveAddress() {
  if (busy.value) return
  const values = Object.fromEntries(fields.map(({ key }) => [key, draft[key].trim()]))
  if (!values.address || !values.postalCode) {
    postcodeError.value = '우편번호 검색에서 기본 주소를 선택해주세요.'
    postcodeButton.value?.focus()
    return
  }
  if (fields.some(({ key, optional }) => !optional && !values[key])) {
    error.value = '필수 항목을 입력해주세요.'
    return
  }

  const savedPhone = addresses.value.find(({ id }) => id === editingId.value)?.phone
  if (values.phone !== savedPhone && !/^\d{3}-\d{4}-\d{4}$/.test(values.phone)) {
    error.value = '연락처 11자리를 입력해주세요.'
    return
  }
  const tooLong = fields.find(({ key, maxLength }) => values[key].length > maxLength)
  if (tooLong) {
    error.value = `${tooLong.label} 항목은 ${tooLong.maxLength}자 이내로 입력해주세요.`
    return
  }

  if (live.value) {
    const id = editingId.value
    const isDefault = draft.isDefault
    await changeRemoteAddresses(async (signal) => {
      const saved = await saveRemoteAddress({ ...values, isDefault }, id, signal)
      if (signal.aborted) return
      if (id == null) addresses.value = [...addresses.value, saved]
      else addresses.value = addresses.value.map((address) => address.id === id ? saved : address)
      if (saved.isDefault) applyDefault(saved.id)
      else if (id != null && isDefault) {
        try {
          await setDefaultAddress(saved.id, signal)
          if (signal.aborted) return
          applyDefault(saved.id)
        } catch (failure) {
          if (!signal.aborted) throw new Error('배송지 정보는 저장했습니다. 기본 배송지를 설정하지 못했습니다. ' + failure.message)
          return
        }
      }
      closeForm()
    })
    return
  }

  const id = editingId.value ?? crypto.randomUUID()
  const entry = { ...values, id, memo: draft.memo.trim(), isDefault: draft.isDefault }
  const updated = editingId.value
    ? addresses.value.map((address) => address.id === id ? entry : address)
    : [...addresses.value, entry]

  if (entry.isDefault) {
    for (const [index, address] of updated.entries()) {
      if (address.id !== id && address.isDefault) updated[index] = { ...address, isDefault: false }
    }
  } else if (!updated.some((address) => address.isDefault)) {
    const index = updated.findIndex((address) => address.id !== id)
    const defaultIndex = index < 0 ? 0 : index
    updated[defaultIndex] = { ...updated[defaultIndex], isDefault: true }
  }

  if (persist(updated)) closeForm()
}

async function setDefault(id) {
  if (live.value) {
    await changeRemoteAddresses(async (signal) => {
      await setDefaultAddress(id, signal)
      if (!signal.aborted) applyDefault(id)
    })
    return
  }
  persist(addresses.value.map((address) => ({ ...address, isDefault: address.id === id })))
}

async function removeAddress(address) {
  if (busy.value) return
  if (!window.confirm('‘' + address.name + '’ 배송지를 삭제할까요?')) return
  if (live.value) {
    await changeRemoteAddresses(async (signal) => {
      await deleteAddress(address.id, signal)
      if (signal.aborted) return
      addresses.value = addresses.value.filter(({ id }) => id !== address.id)
      if (editingId.value === address.id) closeForm()
    })
    return
  }
  const remaining = addresses.value.filter(({ id }) => id !== address.id)
  if (address.isDefault && remaining.length) remaining[0] = { ...remaining[0], isDefault: true }
  if (persist(remaining) && editingId.value === address.id) closeForm()
}
</script>

<template>
  <MyPageLayout icon="address" title="배송지 관리" description="자주 사용하는 배송지를 등록하고 관리해보세요.">
    <template #actions>
      <div class="account-card address-toolbar">
        <button class="account-primary" type="button" :disabled="busy" @click="openForm()">
          <span aria-hidden="true">＋</span> 배송지 추가
        </button>
      </div>
    </template>
    <div class="account-card address-panel">
      <p v-if="error" class="account-message" role="alert">{{ error }}</p>
      <p v-if="busy && !orderedAddresses.length && !showForm" role="status">배송지를 불러오는 중입니다.</p>
      <form v-if="showForm" ref="form" class="address-form" @submit.prevent="saveAddress">
        <header class="address-form-heading">
          <h2>{{ editingId ? '배송지 수정' : '배송지 추가' }}</h2>
        </header>
        <div class="address-fields">
          <template v-for="field in contactFields" :key="field.key">
            <label class="address-label" :for="'delivery-' + field.key">{{ field.label }} <span aria-hidden="true">*</span></label>
            <PhoneInput v-if="field.key === 'phone'" id="delivery-phone" v-model="draft.phone" label="연락처" required />
            <input
              v-else
              :id="'delivery-' + field.key"
              v-model="draft[field.key]"
              :type="field.type ?? 'text'"
              :autocomplete="field.autocomplete"
              :placeholder="field.placeholder"
              :maxlength="field.maxLength"
              required
            />
          </template>

          <div id="delivery-address-label" class="address-label">주소 <span aria-hidden="true">*</span></div>
          <div class="address-inputs" role="group" aria-labelledby="delivery-address-label">
            <div class="postcode-row">
              <input :value="draft.postalCode" class="address-autofill" aria-label="우편번호" placeholder="우편번호" disabled />
              <button ref="postcodeButton" type="button" :aria-expanded="showPostcode" @click="searchPostcode">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
                {{ showPostcode ? '검색 닫기' : '우편번호 검색' }}
              </button>
            </div>
            <div v-if="showPostcode">
              <p v-if="loadingPostcode" role="status">우편번호 검색을 불러오는 중입니다.</p>
              <div ref="postcodePanel" class="postcode-panel"></div>
            </div>
            <p v-if="postcodeError" class="account-message" role="alert">{{ postcodeError }}</p>
            <input :value="draft.address" class="address-autofill" aria-label="기본 주소" placeholder="기본 주소 (검색으로 자동 입력)" disabled />
            <input ref="detailInput" v-model="draft.detail" aria-label="상세 주소" placeholder="상세 주소를 입력하세요. (동, 호수 등)" autocomplete="shipping address-line2" :maxlength="fields[5].maxLength" />
          </div>

          <label v-if="!live" for="delivery-memo" class="address-label">배송 메모</label>
          <div v-if="!live" class="address-memo">
            <textarea id="delivery-memo" v-model="draft.memo" placeholder="배송 시 요청사항을 입력하세요. (선택)" maxlength="100"></textarea>
          </div>
          <div class="address-default-option">
            <label><input v-model="draft.isDefault" type="checkbox" :disabled="busy || (live && addresses.some((address) => address.id === editingId && address.isDefault))" /> 기본 배송지로 설정</label>
            <small>배송지 목록의 맨 위에 표시됩니다.</small>
          </div>
        </div>
        <div class="account-actions address-actions address-form-actions">
          <button type="button" :disabled="busy" @click="closeForm">취소</button>
          <button class="account-primary" type="submit" :disabled="busy">저장하기</button>
        </div>
      </form>
      <p v-if="!busy && !error && !orderedAddresses.length && !showForm" class="address-empty">등록된 배송지가 없습니다.</p>
      <article v-for="address in orderedAddresses" :key="address.id" class="address-card">
        <header class="address-card-heading">
          <h2>{{ address.name }}</h2>
          <span v-if="address.isDefault" class="address-default">기본 배송지</span>
        </header>
        <dl class="address-details">
          <div>
            <dt>받는 사람</dt>
            <dd>{{ address.recipient }}</dd>
          </div>
          <div>
            <dt>연락처</dt>
            <dd>{{ formatPhone(address.phone) }}</dd>
          </div>
          <div>
            <dt>주소</dt>
            <dd>
              <span class="address-main">{{ address.address }}</span>
              <span class="address-detail">{{ address.detail ? address.detail + ' ' : '' }}({{ address.postalCode }})</span>
            </dd>
          </div>
          <div v-if="address.memo">
            <dt>배송 메모</dt>
            <dd>{{ address.memo }}</dd>
          </div>
        </dl>
        <div class="account-actions address-actions">
          <button v-if="!address.isDefault" type="button" :disabled="busy" @click="setDefault(address.id)">기본 배송지 설정</button>
          <button type="button" :disabled="busy" @click="openForm(address)">수정</button>
          <button type="button" :disabled="busy" @click="removeAddress(address)">삭제</button>
        </div>
      </article>
    </div>
  </MyPageLayout>
</template>

<style scoped src="../styles/account.css"></style>
<style scoped>
.address-toolbar { margin-inline-start: auto; padding: 0; border: 0; }
.address-toolbar button { padding-inline: 10px; white-space: nowrap; }

.address-panel { display: grid; gap: 14px; padding: 16px; }
.address-card,
.address-form { min-width: 0; padding: 16px; border: 1px solid var(--color-border); border-radius: 12px; }

.address-card-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.address-card-heading h2,
.address-form h2 { margin: 0; font-size: 16px; font-weight: 600; overflow-wrap: anywhere; }
.address-default {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
}

.address-details {
  display: grid;
  gap: 8px;
  margin: 12px 0 16px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}
.address-details > div {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 8px;
}
.address-details dt { color: #71666b; font-size: 14px; font-weight: 600; }
.address-details dd { margin: 0; overflow-wrap: anywhere; }
.address-main { display: block; font-weight: 600; }
.address-detail { display: block; margin-top: 2px; font-size: 14px; }
.address-panel > p { margin: 0; }
.address-detail,
.address-empty { color: #71666b; }
.address-empty { padding: 24px 8px; text-align: center; }

.address-actions { justify-content: flex-end; flex-wrap: wrap; gap: 8px; padding: 0; border: 0; }
.address-actions button { min-width: 0; padding-inline: 12px; }

.address-form {
  padding: 0;
  overflow: hidden;
}
.address-form-heading {
  padding: 15px 20px;
  background: var(--color-accent);
  color: var(--color-primary);
}
.address-fields {
  display: grid;
  grid-template-columns: 108px minmax(0, 1fr);
  gap: 14px 16px;
  padding: 18px 20px;
}
.address-label {
  align-self: start;
  padding-block-start: 8px;
  font-weight: 600;
}
.address-label span { color: var(--color-primary); }
.address-inputs { display: grid; gap: 8px; }
.address-inputs p { margin: 0 0 4px; }
.postcode-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }
.postcode-row button { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.postcode-row svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; }
.postcode-panel {
  min-width: 0;
  overflow: hidden;
  border-radius: 8px;
}
.postcode-panel:not(:empty) {
  height: 400px;
  outline: 1px solid var(--color-border);
}
.address-inputs .address-autofill {
  background: #f7f3f4;
  cursor: default;
  opacity: 1;
}
.address-memo {
  display: grid;
  gap: 4px;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 7px;
}
.address-memo:focus-within { outline: 1px solid var(--color-primary); }
.address-memo textarea {
  min-width: 0;
  min-height: 60px;
  padding: 0;
  border: 0;
  outline: 0;
  resize: none;
  font: inherit;
  color: inherit;
}
.address-default-option {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
}
.address-default-option label { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
.address-default-option input {
  width: 16px;
  height: 16px;
  min-height: 0;
  margin: 0;
  accent-color: var(--color-primary);
}
.address-default-option small { color: #71666b; }
.address-form-actions { padding: 12px 20px; border-top: 1px solid var(--color-border); }
.address-form-actions button { min-width: 90px; }
@media (max-width: 600px) {
  .address-fields { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .address-label { padding-block-start: 4px; }
}
</style>