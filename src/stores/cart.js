import { computed, reactive, ref, watch } from 'vue'
import { session, shoppingOwner } from './session.js'
import { getCart, addCartItem, updateCartItem, deleteCartItem } from '../services/cart.js'

const carts = reactive(new Map())
export const cartLoading = ref(false)
export const cartBusy = ref(false)
export const cartError = ref('')
export const cartItems = computed(() => session.member ? carts.get(shoppingOwner.value) ?? [] : [])
export const cartCount = computed(() => cartItems.value.length)
let generation = 0

export function cartLine(product, quantity) {
  const image = product.images?.find((item) => item.is_primary) ?? product.images?.[0]
  return { product_id: String(product.product_id), name: product.name, price: product.price,
    stock: product.stock_quantity, image: image?.url, quantity, available: !product.is_sold_out && product.stock_quantity >= quantity }
}

export async function loadCart() {
  if (session.source !== 'api' || cartBusy.value || cartLoading.value) return
  const owner = shoppingOwner.value
  const version = ++generation
  cartLoading.value = true
  cartError.value = ''
  try {
    const items = await getCart()
    if (version === generation && owner === shoppingOwner.value) carts.set(owner, items)
  } catch (error) {
    if (version === generation && owner === shoppingOwner.value) cartError.value = error.message
  } finally {
    if (version === generation) cartLoading.value = false
  }
}

watch(shoppingOwner, () => {
  generation++
  carts.clear()
  cartError.value = ''
  cartLoading.value = false
  cartBusy.value = false
  loadCart()
}, { immediate: true })

async function mutate(action) {
  if (!session.member) throw new Error('로그인이 필요합니다.')
  if (cartBusy.value || cartLoading.value) throw new Error('장바구니를 처리 중입니다. 잠시 후 다시 시도해주세요.')
  const owner = shoppingOwner.value
  const version = ++generation
  cartBusy.value = true
  cartError.value = ''
  const active = () => version === generation && owner === shoppingOwner.value
  try {
    return await action(owner, active)
  } catch (error) {
    if (active()) cartError.value = error.message
    throw error
  } finally {
    if (active()) cartBusy.value = false
  }
}

export async function addProductToCart(product, quantity) {
  return mutate(async (owner, active) => {
    if (session.source === 'api') {
      const item = await addCartItem(product.product_id, quantity)
      if (!active()) throw new Error('로그인 정보가 변경되었습니다.')
      carts.set(owner, [item, ...cartItems.value.filter((line) => line.product_id !== item.product_id)])
      return item
    }
    if (!product || product.is_sold_out || !Number.isSafeInteger(quantity) || quantity < 1 || !Number.isFinite(product.price)) throw new Error('구매할 수 없는 상품입니다.')
    const next = [...cartItems.value]
    const index = next.findIndex((item) => item.product_id === String(product.product_id))
    const total = (next[index]?.quantity ?? 0) + quantity
    if (!(total <= product.stock_quantity)) throw new Error('재고 수량을 확인해주세요.')
    const item = cartLine(product, total)
    if (index < 0) next.push(item)
    else next[index] = item
    carts.set(owner, next)
    return item
  })
}

export async function addProductsToCart(products) {
  const result = { added: 0, existing: 0, unavailable: 0 }
  const owner = shoppingOwner.value
  for (const product of products) {
    if (owner !== shoppingOwner.value) break
    if (cartItems.value.some((item) => item.product_id === String(product.product_id))) result.existing++
    else {
      try { await addProductToCart(product, 1); result.added++ } catch { result.unavailable++ }
    }
  }
  return result
}

export async function removeCartItems(productIds) {
  return mutate(async (owner, active) => {
    const selected = cartItems.value.filter((item) => productIds.includes(item.product_id))
    for (const item of selected) {
      if (!active()) return
      if (session.source === 'api') await deleteCartItem(item.cart_item_id)
      if (active()) carts.set(owner, cartItems.value.filter((line) => line.product_id !== item.product_id))
    }
  })
}

export async function changeCartQuantity(productId, delta) {
  return mutate(async (owner, active) => {
    const item = cartItems.value.find((line) => line.product_id === productId)
    if (!item) throw new Error('장바구니 상품을 다시 확인해주세요.')
    const quantity = Math.max(1, item.quantity + delta)
    let updated
    if (session.source === 'api') updated = await updateCartItem(item.cart_item_id, quantity)
    else {
      if (quantity > item.stock) throw new Error('재고 수량을 확인해주세요.')
      updated = { ...item, quantity }
    }
    if (active()) carts.set(owner, cartItems.value.map((line) => line.product_id === productId ? updated : line))
  })
}
