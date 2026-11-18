import { categories, products } from './catalog.js'

const key = 'oishidam:product-workspace-demo:v1'
let overrides = {}, legacy = {}
try { overrides = JSON.parse(localStorage.getItem(key) || '{}'); legacy = JSON.parse(localStorage.getItem('oishidam:admin-demo:v1') || '{}').products || {} } catch {}
const initial = products.map(product => ({ productId: Number(product.product_id), categoryId: Number(product.category_id), name: product.name, description: product.description, price: product.variants[0]?.price || 0, stockQuantity: product.variants[0]?.stock_quantity || 0, saleStatus: product.sale_status, publishedAt: product.published_at, images: product.images.map(image => ({ imageId: Number(image.product_image_id), storageKey: image.url, altText: image.alt_text, isPrimary: image.is_primary, sortOrder: image.sort_order })), ...(legacy[product.product_id] ? { name: legacy[product.product_id].name || product.name, stockQuantity: legacy[product.product_id].stock_quantity ?? product.variants[0]?.stock_quantity ?? 0, categoryId: Number(legacy[product.product_id].category_id || product.category_id), saleStatus: legacy[product.product_id].sale_status || product.sale_status } : {}) }))
const all = () => [...initial.map(product => ({ ...product, ...overrides[product.productId] })), ...Object.values(overrides).filter(product => !initial.some(item => item.productId === product.productId))].filter(product => !product.deleted)
const clone = value => structuredClone(value)
function write(product) {
  const next = { ...overrides, [product.productId]: clone(product) }
  localStorage.setItem(key, JSON.stringify(next))
  overrides = next
  return clone(product)
}
function find(id) { const product = all().find(item => String(item.productId) === String(id)); if (!product) throw new Error('상품을 찾을 수 없습니다.'); return clone(product) }
export async function getAdminCategories() { return categories.map(item => ({ categoryId: Number(item.category_id), parentId: item.parent_id ? Number(item.parent_id) : null, name: item.name, isActive: item.is_active, sortOrder: item.sort_order })) }
export async function getAdminList(section, { page, size, keyword = '', saleStatus, categoryId, stockComparison, stockQuantity }) {
  const ids = new Set(categoryId ? [Number(categoryId)] : [])
  if (categoryId) { let added; do { added = false; for (const item of categories) if (ids.has(Number(item.parent_id)) && !ids.has(Number(item.category_id))) { ids.add(Number(item.category_id)); added = true } } while (added) }
  const rows = all().filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())
    && (!saleStatus || item.saleStatus === saleStatus)
    && (!categoryId || ids.has(item.categoryId))
    && (stockQuantity == null || (stockComparison === 'GT' ? item.stockQuantity > stockQuantity : stockComparison === 'LT' ? item.stockQuantity < stockQuantity : item.stockQuantity === stockQuantity)))
    .sort((a,b) => b.productId - a.productId)
  return { content: clone(rows.slice(page * size, (page + 1) * size)), totalElements: rows.length, totalPages: Math.ceil(rows.length / size) }
}
export async function getAdminDetail(section, id) { const product = find(id); return { product, images: product.images || [] } }
export async function createAdminProduct(data) { const product = write({ ...data, productId: Math.max(0, ...all().map(item => item.productId)) + 1, saleStatus: 'DRAFT', images: [] }); return { product, images: [] } }
export async function updateAdminProduct(id, data) {
  const current = find(id)
  if (current.stockQuantity !== data.expectedStockQuantity) { const error = new Error('재고가 변경되었습니다. 최신 수량을 확인해 주세요.'); error.code = 'STOCK_CHANGED'; throw error }
  return write({ ...current, ...data })
}
export async function setAdminProductStock(id, stockQuantity, expectedStockQuantity) {
  return updateAdminProduct(id, { stockQuantity, expectedStockQuantity })
}
export async function setAdminProductStatus(id, saleStatus) { return write({ ...find(id), saleStatus }) }
export async function deleteAdminProduct(id) { write({ ...find(id), deleted: true }) }
export async function getAdminStockHistory() { return { content: [], totalPages: 0 } }
export async function saveAdminImage(id, imageId, data) {
  const product = find(id), images = product.images || []
  const nextId = imageId ?? Math.max(0, ...images.map(item => item.imageId)) + 1
  product.images = [{ ...data, imageId: imageId ?? images[0]?.imageId ?? nextId, sortOrder: 0, isPrimary: true }]
  write(product)
}
export async function deleteAdminImage(id, imageId) { const product = find(id); product.images = product.images.filter(item => item.imageId !== imageId); write(product) }
export async function uploadAdminImage(id, file, data) {
  const storageKey = await new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file) })
  return saveAdminImage(id, null, { ...data, storageKey })
}
