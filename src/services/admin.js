import { apiRequest } from './api.js'

const request = (path, options = {}) => apiRequest({ ...options, path: '/admin' + path, authenticated: true, mock: false })
const idPath = (section, id) => `/${section}/${encodeURIComponent(id)}`

export const getAdminOperations = (period, signal) => request('/dashboard/operations', { params: typeof period === 'number' ? { days: period } : period, signal })
export const getAdminStockAlerts = (params, signal) => request('/dashboard/stock-alerts', { params, signal })
export const getAdminCustomerAnalytics = (signal) => request('/analytics/customers', { params: { charts: true }, signal, timeout: 70000 })
export const getAdminReviewAnalytics = (signal) => request('/reviews/analytics', { signal })
export const getAdminCategories = (signal) => request('/categories', { signal })
export const getAdminList = (section, params, signal) => request('/' + section, { params, signal })
export const getAdminStockHistory = (id, params, signal) => request(idPath('products', id) + '/stock-history', { params, signal })
export const getAdminDetail = (section, id, signal) => request(idPath(section, id), { signal })

export const createAdminProduct = (data) => request('/products', { method: 'POST', data })
export const updateAdminProduct = (id, data) => request(idPath('products', id), { method: 'PUT', data })
export const setAdminProductStatus = (id, saleStatus) => request(idPath('products', id) + '/status', { method: 'PATCH', data: { saleStatus } })
export const setAdminProductStock = (id, stockQuantity, expectedStockQuantity) => request(idPath('products', id) + '/stock', { method: 'PATCH', data: { stockQuantity, expectedStockQuantity } })
export const deleteAdminProduct = (id) => request(idPath('products', id), { method: 'DELETE' })
export const createAdminCategory = (data) => request('/categories', { method: 'POST', data })
export const updateAdminCategory = (id, data) => request(idPath('categories', id), { method: 'PUT', data })
export const deleteAdminCategory = (id) => request(idPath('categories', id), { method: 'DELETE' })
export const setAdminOrderStatus = (id, orderStatus, note) => request(idPath('orders', id) + '/status', { method: 'PATCH', data: { orderStatus, note: note?.trim() || null } })
export const setAdminMemberStatus = (id, isActive) => request(idPath('members', id) + '/status', { method: 'PATCH', data: { isActive } })
export const replyAdminInquiry = (id, content) => request(idPath('inquiries', id) + '/messages', { method: 'POST', data: { content: content.trim() } })
export const replyAdminReview = (id, content) => request(idPath('reviews', id) + '/answer', { method: 'PUT', data: { content: content.trim() } })

export function saveAdminImage(productId, imageId, data) {
  const path = idPath('products', productId) + '/images'
  return request(imageId == null ? path : path + '/' + encodeURIComponent(imageId), { method: imageId == null ? 'POST' : 'PUT', data })
}

export function uploadAdminImage(productId, file, { altText, sortOrder, isPrimary }) {
  const data = new FormData()
  data.append('file', file)
  data.append('altText', altText || '')
  data.append('sortOrder', String(sortOrder))
  data.append('isPrimary', String(isPrimary))
  return request(idPath('products', productId) + '/images', { method: 'POST', data, timeout: 60000 })
}

export const deleteAdminImage = (productId, imageId) => request(idPath('products', productId) + '/images/' + encodeURIComponent(imageId), { method: 'DELETE' })
