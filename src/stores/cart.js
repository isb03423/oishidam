import { computed, reactive } from 'vue'
import { session, shoppingOwner } from './session.js'

const carts = reactive(new Map())
export const cartItems = computed(() => carts.get(shoppingOwner.value) ?? [])
export const cartCount = computed(() => (session.member?.cart_count ?? 0) + cartItems.value.length)

export function cartLine(product, variant, quantity) {
  const image = product.images?.find((item) => item.is_primary) ?? product.images?.[0]
  return {
    product_id: product.product_id,
    name: product.name,
    variant_id: variant.variant_id,
    option: variant.variant_name,
    price: variant.price,
    stock: variant.stock_quantity,
    image: image?.url,
    quantity,
  }
}

export function addVariantToCart(product, variantId, quantity) {
  if (!product || product.is_sold_out || !Number.isSafeInteger(quantity) || quantity < 1) return false
  const variant = product.variants?.find((item) => item.variant_id === variantId && item.is_active)
  if (!variant || !Number.isFinite(variant.price) || !(variant.stock_quantity >= quantity)) return false

  const nextItems = [...cartItems.value]
  const index = nextItems.findIndex((item) => item.variant_id === variantId)
  const totalQuantity = (nextItems[index]?.quantity ?? 0) + quantity
  if (totalQuantity > variant.stock_quantity) return false

  const line = cartLine(product, variant, totalQuantity)
  if (index === -1) nextItems.push(line)
  else nextItems[index] = line
  carts.set(shoppingOwner.value, nextItems)
  return true
}

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
      nextItems.push(cartLine(product, variant, 1))
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
