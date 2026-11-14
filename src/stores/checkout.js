import { computed, shallowRef } from 'vue'
import { shoppingOwner } from './session.js'

const draft = shallowRef(null)
export const shippingFee = 3000
export const checkout = computed(() => draft.value?.owner === shoppingOwner.value ? draft.value : null)

export function startCheckout(items, fromCart = false) {
  draft.value = { owner: shoppingOwner.value, items: items.map((item) => ({ ...item })), fromCart }
}

export function clearCheckout() {
  draft.value = null
}
