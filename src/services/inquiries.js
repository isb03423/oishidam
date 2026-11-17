import { apiRequest } from './api.js'

export function getMyInquiries(page = 0, { size = 10, status, signal } = {}) {
  return apiRequest({ path: '/inquiries/mine', params: { page, size, status }, signal, authenticated: true, mock: false })
}

export function getInquiry(id, { signal } = {}) {
  return apiRequest({ path: `/inquiries/${encodeURIComponent(id)}`, signal, authenticated: true, mock: false })
}

export function createInquiry({ title, content }) {
  return apiRequest({ method: 'POST', path: '/inquiries', data: { title: title.trim(), content: content.trim() }, authenticated: true, mock: false })
}

export function deleteInquiry(id) {
  return apiRequest({ method: 'DELETE', path: `/inquiries/${encodeURIComponent(id)}`, authenticated: true, mock: false })
}
