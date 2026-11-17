<script setup>
import AddressForm from '../components/common/AddressForm.vue'
import { deleteAddress, getAddresses, saveAddress as saveRemoteAddress, setDefaultAddress } from '../services/addresses.js'
import { formatPhone, phoneDigits } from '../services/phone.js'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { session, shoppingOwner } from '../stores/session.js'

const router = useRouter()
const storageKey = computed(() => 'oishidam:addresses:v1:' + shoppingOwner.value)
const addresses = ref([])
const editingId = ref(null)
const showForm = ref(false)
const error = ref('')
const busy = ref(false)
const live = computed(() => session.source === 'api')
let addressRequest

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

function openForm(address) {
  if (busy.value) return
  editingId.value = address?.id ?? null
  showForm.value = true
  error.value = ''
}

function closeForm() {
  showForm.value = false
  editingId.value = null
  error.value = ''
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

async function saveAddress(values) {
  if (busy.value) return
  if (live.value) {
    const id = editingId.value
    const isDefault = values.isDefault
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
  const entry = { ...values, id, memo: values.memo, isDefault: values.isDefault }
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
      <p v-if="error && !showForm" class="account-message" role="alert">{{ error }}</p>
      <p v-if="busy && !orderedAddresses.length && !showForm" role="status">배송지를 불러오는 중입니다.</p>
      <AddressForm v-if="showForm" :key="editingId ?? 'new'" :address="addresses.find((address) => address.id === editingId) ?? null" :first="!addresses.length" :live="live" :busy="busy" :error="error" @save="saveAddress" @cancel="closeForm" />
      <p v-if="!busy && !error && !orderedAddresses.length && !showForm" class="address-empty">등록된 배송지가 없습니다.</p>
      <article v-for="address in orderedAddresses" :key="address.id" class="address-card">
        <header class="address-card-heading">
          <div class="address-card-title">
            <h2>{{ address.name }}</h2>
            <span v-if="address.isDefault" class="address-default">기본 배송지</span>
          </div>
          <div class="account-actions address-actions">
            <button v-if="!address.isDefault" type="button" :disabled="busy" @click="setDefault(address.id)">기본 배송지 설정</button>
            <button type="button" :disabled="busy" @click="openForm(address)">수정</button>
            <button type="button" :disabled="busy" @click="removeAddress(address)">삭제</button>
          </div>
        </header>
        <dl class="address-details">
          <div v-if="address.customs"><dt>통관번호</dt><dd>{{ address.customs.slice(0, 1) }}********{{ address.customs.slice(-4) }}</dd></div>
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
      </article>
    </div>
  </MyPageLayout>
</template>

<style scoped src="../styles/account.css"></style>
<style scoped>
.address-toolbar { margin-inline-start: auto; padding: 0; border: 0; }
.address-toolbar button { padding-inline: 10px; white-space: nowrap; }

.address-panel { display: grid; gap: 14px; padding: 16px; }
.address-card { min-width: 0; padding: 16px; border: 1px solid var(--color-border); border-radius: 12px; }

.address-card-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.address-card-title { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; min-width: 0; }
.address-card-title h2 { margin: 0; font-size: 16px; font-weight: 600; overflow-wrap: anywhere; }
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
  margin: 12px 0 0;
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

.address-actions { margin-inline-start: auto; justify-content: flex-end; flex-wrap: wrap; gap: 8px; padding: 0; border: 0; }
.address-actions button { min-width: 0; padding-inline: 12px; }

</style>
