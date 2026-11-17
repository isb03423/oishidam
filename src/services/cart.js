import { apiRequest } from './api.js'

function forView(item) {
  return {
    cart_item_id: item.cartItemId,
    product_id: String(item.productId),
    name: item.productName,
    price: item.price,
    stock: item.stockQuantity,
    quantity: item.quantity,
    available: item.available,
    image: item.primaryImageUrl,
  }
}

export async function getCart() {
  const data = await apiRequest({ path: '/cart', authenticated: true, mock: false })
  if (!Array.isArray(data)) throw new Error('장바구니 응답 형식을 확인해주세요.')
  return data.map(forView)
}

export async function addCartItem(productId, quantity) {
  return forView(await apiRequest({ method: 'POST', path: '/cart', data: { productId, quantity }, authenticated: true, mock: false }))
}

export async function updateCartItem(itemId, quantity) {
  return forView(await apiRequest({ method: 'PATCH', path: `/cart/${encodeURIComponent(itemId)}`, data: { quantity }, authenticated: true, mock: false }))
}

export function deleteCartItem(itemId) {
  return apiRequest({ method: 'DELETE', path: `/cart/${encodeURIComponent(itemId)}`, authenticated: true, mock: false })
}
