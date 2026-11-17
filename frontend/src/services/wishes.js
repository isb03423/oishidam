import { apiRequest } from './api.js'

export async function getWishes({ signal } = {}) {
  const result = await apiRequest({ path: '/wishes', authenticated: true, mock: false, signal })
  return result.map((item) => ({
    product_id: String(item.productId), name: item.name, price: item.price, min_price: item.price,
    images: item.imageUrl ? [{ url: item.imageUrl, is_primary: true }] : [],
    stock_quantity: item.stockQuantity, is_sold_out: item.soldOut, available: item.available, sale_status: item.saleStatus,
  }))
}

export function addWish(productId) {
  return apiRequest({ method: 'PUT', path: `/wishes/${encodeURIComponent(productId)}`, authenticated: true, mock: false })
}

export function deleteWish(productId) {
  return apiRequest({ method: 'DELETE', path: `/wishes/${encodeURIComponent(productId)}`, authenticated: true, mock: false })
}
