import { productDetails, productReviews } from './productDetails.js'
import { categories, products, recommendedProductIds } from './catalog.js'
import { handleAuthRequest } from './auth.js'

function fail(status, code, message) {
  const error = new Error(message)
  error.status = status
  error.code = code
  throw error
}
function summarize(product) {
  const active = product.variants.filter((variant) => variant.is_active)
  return {
    ...product,
    min_price: active.length ? Math.min(...active.map((variant) => variant.price)) : null,
    is_sold_out: !active.some((variant) => variant.stock_quantity > 0),
  }
}
export function handleMockRequest({ method = 'GET', path, params = {}, data, scenario = 'normal' }) {
  if (scenario === 'error') fail(503, 'MOCK_UNAVAILABLE', '테스트용 서버 오류입니다.')
  if (method.toUpperCase() === 'POST' && ['/auth/login', '/auth/kakao', '/auth/logout', '/auth/signup'].includes(path)) {
    return handleAuthRequest(path, data)
  }
  if (method.toUpperCase() !== 'GET') fail(501, 'MOCK_NOT_IMPLEMENTED', '아직 구현하지 않은 mock API입니다.')
  if (path === '/categories') return { items: scenario === 'empty' ? [] : structuredClone(categories) }
  if (path === '/recommendations/products') {
    const items = recommendedProductIds
      .map((id) => products.find((product) => product.product_id === id))
      .filter((product) => product && !product.deleted_at && product.sale_status === 'ON_SALE')
      .map(summarize)
    return structuredClone({ items: scenario === 'empty' ? [] : items, source: 'DEFAULT' })
  }
  if (path === '/products') {
    const keyword = String(params.keyword ?? '').trim().toLocaleLowerCase('ko-KR')
    const categoryId = String(params.categoryId ?? '')
    const categoryIds = [categoryId, ...categories
      .filter((category) => category.parent_id === categoryId)
      .map((category) => category.category_id)]
    let items = products.filter((product) => !product.deleted_at && product.sale_status === 'ON_SALE')
      .filter((product) => !categoryId || categoryIds.includes(product.category_id))
      .filter((product) => `${product.name} ${product.brand} ${product.description}`.toLocaleLowerCase('ko-KR').includes(keyword))
      .map(summarize)
    if (scenario === 'empty') items = []
    const sort = params.sort ?? 'new'
    const bestRanks = params.previewBest
      ? Object.fromEntries(recommendedProductIds.map((id, index) => [id, index + 1]))
      : null
    if (bestRanks) items = items.filter((product) => Object.hasOwn(bestRanks, product.product_id))
    if (!['new', 'price_asc', 'price_desc'].includes(sort)) fail(400, 'INVALID_SORT', '지원하지 않는 정렬입니다. 지원 정렬 값을 확인해주세요.')
    items.sort(sort === 'new' ? (a, b) => b.published_at.localeCompare(a.published_at) : sort === 'price_asc' ? (a, b) => a.min_price - b.min_price : (a, b) => b.min_price - a.min_price)
    if (bestRanks && sort === 'new') {
      items.sort((a, b) => bestRanks[a.product_id] - bestRanks[b.product_id])
    }
    const page = Number(params.page ?? 0)
    const size = Number(params.size ?? 12)
    if (!Number.isSafeInteger(page) || page < 0 || !Number.isSafeInteger(size) || size < 1 || size > 100) fail(400, 'INVALID_PAGINATION', '페이지는 0 이상, 크기는 1~100이어야 합니다.')
    return structuredClone({ items: items.slice(page * size, (page + 1) * size), total: items.length, page, size, ...(bestRanks && { bestRanks }) })
  }
  const match = path.match(/^\/products\/([^/]+)$/)
  if (match) {
    const product = products.find((item) => item.product_id === match[1] && !item.deleted_at && item.sale_status === 'ON_SALE')
    if (!product) fail(404, 'PRODUCT_NOT_FOUND', '상품을 찾을 수 없습니다.')
    return structuredClone({ ...summarize(product), ...productDetails[product.product_id], reviews: productReviews[product.product_id] ?? [] })
  }
  fail(501, 'MOCK_NOT_IMPLEMENTED', `아직 구현하지 않은 mock API입니다: ${method} ${path}`)
}
