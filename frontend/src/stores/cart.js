import { computed, reactive } from 'vue'
import { session, shoppingOwner } from './session.js'

const carts = reactive(new Map())
const items = computed(() => carts.get(shoppingOwner.value) ?? [])
export const cartCount = computed(() => (session.member?.cart_count ?? 0) + items.value.length)

export function addProductsToCart(products) {
  const nextItems = [...items.value]
  const result = { added: 0, existing: 0, unavailable: 0, needsOption: 0 }

  for (const product of products) {
    const variants = (product.variants ?? []).filter((variant) => variant.is_active && variant.stock_quantity > 0)
    if (product.is_sold_out || variants.length === 0) {
      result.unavailable++
    } else if (variants.length > 1) {
      result.needsOption++
    } else if (nextItems.some((item) => item.variant_id === variants[0].variant_id)) {
      result.existing++
    } else {
      nextItems.push({ product_id: product.product_id, variant_id: variants[0].variant_id, quantity: 1 })
      result.added++
    }
  }

  if (result.added) carts.set(shoppingOwner.value, nextItems)
  return result
}
