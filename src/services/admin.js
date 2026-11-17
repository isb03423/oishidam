import { apiRequest } from './api.js'

const request = (path, options = {}) => apiRequest({ ...options, path: '/admin' + path, authenticated: true, mock: false })
const idPath = (section, id) => `/${section}/${encodeURIComponent(id)}`

export const getAdminOperations = (days, signal) => request('/dashboard/operations', { params: { days }, signal })
export const getAdminCategories = (signal) => request('/categories', { signal })
export const getAdminList = (section, params, signal) => request('/' + section, { params, signal })
export const getAdminDetail = (section, id, signal) => request(idPath(section, id), { signal })

export const createAdminProduct = (data) => request('/products', { method: 'POST', data })
export const updateAdminProduct = (id, data) => request(idPath('products', id), { method: 'PUT', data })
export const setAdminProductStatus = (id, saleStatus) => request(idPath('products', id) + '/status', { method: 'PATCH', data: { saleStatus } })
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
