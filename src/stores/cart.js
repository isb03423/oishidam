import { computed, reactive } from 'vue'
import { session, shoppingOwner } from './session.js'

const carts = reactive(new Map())
export const cartItems = computed(() => carts.get(shoppingOwner.value) ?? [])
export const cartCount = computed(() => (session.member?.cart_count ?? 0) + cartItems.value.length)

export function addProductsToCart(products) {
  const nextItems = [...cartItems.value]
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
      const [variant] = variants
      const image = product.images?.find((item) => item.is_primary) ?? product.images?.[0]
      nextItems.push({
        product_id: product.product_id,
        name: product.name,
        variant_id: variant.variant_id,
        option: variant.variant_name,
        price: variant.price,
        stock: variant.stock_quantity,
        image: image?.url,
        quantity: 1,
      })
      result.added++
    }
  }

  if (result.added) carts.set(shoppingOwner.value, nextItems)
  return result
}

export function removeCartItems(variantIds) {
  carts.set(shoppingOwner.value, cartItems.value.filter((item) => !variantIds.includes(item.variant_id)))
}

export function changeCartQuantity(variantId, delta) {
  const updated = cartItems.value.map((item) => {
    if (item.variant_id !== variantId) return item
    const quantity = Math.min(item.stock ?? 1, Math.max(1, item.quantity + delta))
    return { ...item, quantity }
  })
  carts.set(shoppingOwner.value, updated)
}
