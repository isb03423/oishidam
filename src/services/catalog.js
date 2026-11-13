import { apiRequest } from './api.js'
import { development } from '../config/development.js'
import { getAuthTokens } from '../stores/session.js'

function productForView(product) {
  return {
    ...product,
    product_id: product.productId,
    category_id: product.categoryId,
    min_price: product.minPrice,
    is_sold_out: product.isSoldOut,
    images: product.images?.map((image) => ({
      ...image,
      url: image.imageUrl ?? image.url,
      alt_text: image.altText,
      is_primary: image.isPrimary,
    })) ?? (product.primaryImageUrl ? [{ url: product.primaryImageUrl, is_primary: true }] : []),
    variants: product.variants?.map((variant) => ({
      ...variant,
      variant_id: variant.variantId,
      variant_name: variant.variantName,
      stock_quantity: variant.stockQuantity,
      is_active: variant.isActive,
    })),
  }
}

export async function getCategories(options = {}) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const data = await apiRequest({ ...options, path: '/categories', mock })
  return mock ? data : { items: Array.isArray(data) ? data : data.categories }
}

export async function getRecommendations({ signal, limit } = {}) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const data = await apiRequest({
    path: '/recommendations/products',
    params: { limit },
    signal,
    mock,
    authenticated: Boolean(getAuthTokens()),
  })
  return mock ? data : { items: data.products.map(productForView), source: data.recommendationType }
}

export async function getProducts({ keyword, categoryId, sort, previewBest, page = 0, size = 20 } = {}, options = {}) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const result = await apiRequest({
    ...options,
    path: '/products',
    params: { keyword, categoryId, sort, page, size, ...(mock && previewBest && { previewBest }) },
    mock,
    paginated: true,
  })
  if (mock) return result
  const { data, page: metadata } = result
  return {
    items: (Array.isArray(data) ? data : data.products).map(productForView),
    total: metadata?.totalElements,
    page: metadata?.number ?? page,
    size: metadata?.size ?? size,
  }
}

export async function getProduct(productId, options = {}) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const data = await apiRequest({ ...options, path: '/products/' + encodeURIComponent(productId), mock })
  return mock ? data : productForView(data)
}
