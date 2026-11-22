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

export function restoreCheckout() {
  if (checkout.value) return
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null')
    if (shoppingOwner.value === 'guest' || saved?.owner !== shoppingOwner.value || !Array.isArray(saved.items) || !saved.items.length || saved.items.length > 100
        || saved.items.some((item) => !item?.product_id || !Number.isSafeInteger(item.quantity) || item.quantity < 1)) {
      clearCheckout()
      return
    }
    draft.value = { owner: saved.owner, items: saved.items, fromCart: saved.fromCart === true }
    persist()
  } catch { clearCheckout() }
}

watch(shoppingOwner, (_, previous) => {
  if (previous !== 'guest' && JSON.parse(previous)[0]) clearCheckout()
}, { flush: 'sync' })
