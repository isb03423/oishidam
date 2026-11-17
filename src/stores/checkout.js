import { computed, shallowRef, watch } from 'vue'
import { shoppingOwner } from './session.js'

const draft = shallowRef(null)
const storageKey = 'oishidam:checkout:v1'
export const shippingFee = 3000
export const checkout = computed(() => draft.value?.owner === shoppingOwner.value ? draft.value : null)

export function startCheckout(items, fromCart = false) {
  draft.value = { owner: shoppingOwner.value, items: items.map((item) => ({ ...item })), fromCart }
  persist()
}

export function clearCheckout() {
  draft.value = null
  try { sessionStorage.removeItem(storageKey) } catch { /* 저장소 사용 불가 */ }
}

function persist() {
  try { sessionStorage.setItem(storageKey, JSON.stringify(draft.value)) } catch { /* 현재 탭의 메모리로 유지 */ }
}

export function saveCheckoutInputs(form, memoChoice) {
  if (!checkout.value) return
  const inputs = Object.fromEntries(['recipient', 'phone', 'postalCode', 'address', 'detail', 'memo', 'customs'].map((key) => [key, form[key] ?? '']))
  draft.value = { ...draft.value, inputs: { ...inputs, memoChoice } }
  persist()
}

export function restoreCheckout() {
  if (checkout.value || shoppingOwner.value === 'guest') return null
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null')
    if (saved?.owner !== shoppingOwner.value || !Array.isArray(saved.items) || !saved.items.length || saved.items.length > 100
        || saved.items.some((item) => !item?.product_id || !Number.isSafeInteger(item.quantity) || item.quantity < 1)) {
      clearCheckout()
      return null
    }
    draft.value = { owner: saved.owner, items: saved.items, fromCart: saved.fromCart === true }
    return saved.inputs ?? null
  } catch { clearCheckout(); return null }
}

watch(shoppingOwner, (_, previous) => {
  if (previous !== 'guest' && JSON.parse(previous)[0]) clearCheckout()
}, { flush: 'sync' })
