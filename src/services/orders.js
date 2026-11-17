import { apiRequest } from './api.js'

export function getPaymentConfig() {
  return apiRequest({ path: '/payments/config', authenticated: true, mock: false })
}

export function quoteOrder(data) {
  return apiRequest({ method: 'POST', path: '/orders/quote', data, authenticated: true, mock: false })
}

export function createOrder(data) {
  return apiRequest({ method: 'POST', path: '/orders', data, authenticated: true, mock: false })
}

export function startPayment(id, requestKey) {
  return apiRequest({ method: 'POST', path: `/orders/${encodeURIComponent(id)}/payments`, data: { requestKey, provider: 'TOSS' }, authenticated: true, mock: false })
}

export function confirmPayment(id, data) {
  return apiRequest({ method: 'POST', path: `/orders/${encodeURIComponent(id)}/payments/confirm`, data, authenticated: true, mock: false })
}

export function getOrders(page = 0, options = {}) {
  return apiRequest({ path: '/orders', params: { page, size: options.size ?? 10, from: options.from, keyword: options.keyword, excludePending: options.excludePending }, authenticated: true, mock: false })
}

export function getOrder(id) {
  return apiRequest({ path: `/orders/${encodeURIComponent(id)}`, authenticated: true, mock: false })
}

export function cancelOrder(id, reason) {
  return apiRequest({ method: 'POST', path: `/orders/${encodeURIComponent(id)}/cancel`, data: { reason }, authenticated: true, mock: false })
}
