import { apiRequest } from './api.js'
import { getExampleOrderProduct } from '../mocks/orders.js'
import { development } from '../config/development.js'
import { getAuthTokens } from '../stores/session.js'

function productForView(product) {
  return {
    ...product,
    product_id: String(product.productId),
    category_id: String(product.categoryId),
    min_price: product.price,
    price: product.price,
    is_sold_out: product.isSoldOut,
    stock_quantity: product.stockQuantity,
    images: product.images?.map((image) => ({
      ...image,
      url: image.imageUrl ?? image.url,
      alt_text: image.altText,
      is_primary: image.isPrimary,
    })) ?? (product.primaryImage?.imageUrl ? [{ url: product.primaryImage.imageUrl, is_primary: true }] : []),
  }
}

function mockProductForView(product) {
  const { variants, ...info } = product
  const base = variants?.find((item) => item.is_active) ?? variants?.[0]
  const price = product.price ?? base?.price ?? product.min_price
  const stock = product.stock_quantity ?? base?.stock_quantity ?? 0
  return { ...info, price, min_price: price, stock_quantity: stock, is_sold_out: stock <= 0 }
}

export async function getCategories(options = {}) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const data = await apiRequest({ ...options, path: '/categories', mock })
  return mock ? data : { items: Array.isArray(data) ? data : data.categories }
}

export async function getRecommendations({ signal, limit, type } = {}) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const data = await apiRequest({
    path: '/recommendations/products',
    params: { limit, type },
    signal,
    mock,
    authenticated: Boolean(getAuthTokens()),
  })
  return mock ? { ...data, items: data.items.map(mockProductForView) } : { items: data.products.map(productForView), source: data.recommendationType }
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
  if (mock) return { ...result, items: result.items.map(mockProductForView) }
  const { data, page: metadata } = result
  return {
    items: (Array.isArray(data) ? data : data.content).map(productForView),
    total: data.totalElements ?? metadata?.totalElements,
    page: data.number ?? metadata?.number ?? page,
    size: data.size ?? metadata?.size ?? size,
  }
}

export async function getProduct(productId, options = {}) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const example = mock && getExampleOrderProduct(productId)
  if (example) return mockProductForView(example)
  const data = await apiRequest({ ...options, path: '/products/' + encodeURIComponent(productId), mock })
  return mock ? mockProductForView(data) : productForView(data)
}
