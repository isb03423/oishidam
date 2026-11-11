import { apiRequest } from './api.js'

export const getCategories = (options = {}) => import.meta.env.DEV
  ? apiRequest({ ...options, path: '/categories', mock: true })
  : Promise.resolve({ items: [] })
export const getRecommendations = (options = {}) => import.meta.env.DEV
  ? apiRequest({ ...options, path: '/recommendations', mock: true })
  : Promise.resolve({ items: [] })
export const getProducts = (params = {}, options = {}) => import.meta.env.DEV
  ? apiRequest({ ...options, path: '/products', params, mock: true })
  : Promise.resolve({ items: [], total: 0, page: params.page ?? 1, size: params.size ?? 12 })
export const getProduct = (productId, options = {}) => import.meta.env.DEV
  ? apiRequest({ ...options, path: `/products/${encodeURIComponent(productId)}`, mock: true })
  : Promise.reject(new Error('상품 상세 API는 준비 중입니다.'))
