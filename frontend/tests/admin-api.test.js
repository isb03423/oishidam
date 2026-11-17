import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'

const requests = []
const backend = createHttpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks)
  let data = raw.length ? raw.toString() : null
  if (req.headers['content-type']?.startsWith('multipart/')) {
    const form = await new Response(raw, { headers: { 'Content-Type': req.headers['content-type'] } }).formData()
    data = { altText: form.get('altText'), sortOrder: form.get('sortOrder'), isPrimary: form.get('isPrimary'), filename: form.get('file').name }
  } else if (raw.length) data = JSON.parse(raw)
  requests.push({ method: req.method, url: req.url, token: req.headers.authorization, data })
  const failed = req.url === '/api/admin/categories/999'
  res.writeHead(failed ? 409 : 200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(failed ? { code: 'CATEGORY_IN_USE', message: '하위 카테고리 또는 연결된 상품이 있습니다.' } : { data: { content: [], totalElements: 0, totalPages: 0 } }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const api = await vite.ssrLoadModule('/src/services/admin.js')
const statuses = await vite.ssrLoadModule('/src/utils/adminStatus.js')

test('관리자 목록·상세·대시보드를 인증과 서버 검색 조건으로 조회한다', async () => {
  session.setSession({ member_id: 1, name: '관리자', role: 'ADMIN' }, { tokens: { accessToken: 'admin-token' } })
  await api.getAdminOperations(14)
  await api.getAdminCategories()
  for (const section of ['products', 'orders', 'members', 'inquiries', 'reviews']) {
    await api.getAdminList(section, { page: 1, size: 20, keyword: '검색' })
    await api.getAdminDetail(section, 7)
  }
  assert.equal(requests[0].url, '/api/admin/dashboard/operations?days=14')
  assert.equal(requests[1].url, '/api/admin/categories')
  assert.ok(requests.every((item) => item.token === 'Bearer admin-token'))
  assert.equal(requests.filter((item) => item.url.includes('page=1&size=20&keyword=')).length, 5)
  await api.getAdminList('orders', { orderStatus: 'PAID', from: '2026-11-01', to: '2026-11-16' })
  assert.equal(requests.at(-1).url, '/api/admin/orders?orderStatus=PAID&from=2026-11-01&to=2026-11-16')
  await api.getAdminList('members', { isActive: false })
  assert.equal(requests.at(-1).url, '/api/admin/members?isActive=false')
})

test('상품·카테고리 저장·삭제 및 상태·답변 변경을 서버 메서드와 필드에 맞춘다', async () => {
  requests.length = 0
  const product = { categoryId: 2, name: '상품', description: '설명', brand: null, price: 5000, stockQuantity: 3, expectedStockQuantity: 5 }
  const category = { parentId: null, name: '분류', sortOrder: 0, isActive: false }
  await api.createAdminProduct(product)
  await api.updateAdminProduct(7, product)
  await api.setAdminProductStatus(7, 'ON_SALE')
  await api.deleteAdminProduct(7)
  await api.createAdminCategory(category)
  await api.updateAdminCategory(2, category)
  await api.deleteAdminCategory(2)
  await api.setAdminOrderStatus(8, 'PREPARING', ' 준비 시작 ')
  await api.setAdminMemberStatus(9, false)
  await api.replyAdminInquiry(10, ' 답변 ')
  await api.replyAdminReview(11, ' 리뷰 답변 ')
  assert.deepEqual(requests.map(({ method, url }) => [method, url]), [
    ['POST', '/api/admin/products'], ['PUT', '/api/admin/products/7'], ['PATCH', '/api/admin/products/7/status'], ['DELETE', '/api/admin/products/7'],
    ['POST', '/api/admin/categories'], ['PUT', '/api/admin/categories/2'], ['DELETE', '/api/admin/categories/2'],
    ['PATCH', '/api/admin/orders/8/status'], ['PATCH', '/api/admin/members/9/status'],
    ['POST', '/api/admin/inquiries/10/messages'], ['PUT', '/api/admin/reviews/11/answer'],
  ])
  assert.deepEqual(requests[1].data, product)
  assert.deepEqual(requests[7].data, { orderStatus: 'PREPARING', note: '준비 시작' })
  assert.deepEqual(requests[8].data, { isActive: false })
  assert.deepEqual(requests[9].data, { content: '답변' })
  assert.deepEqual(requests[10].data, { content: '리뷰 답변' })
  await assert.rejects(api.deleteAdminCategory(999), (error) => error.code === 'CATEGORY_IN_USE')
})

test('상품 이미지는 URL 등록·수정·파일 업로드·삭제를 지원한다', async () => {
  requests.length = 0
  const image = { storageKey: 'https://example.com/item.jpg', altText: '상품 사진', sortOrder: 2, isPrimary: true }
  await api.saveAdminImage(7, null, image)
  await api.saveAdminImage(7, 3, image)
  await api.uploadAdminImage(7, new File(['image'], 'photo.png', { type: 'image/png' }), image)
  await api.deleteAdminImage(7, 3)
  assert.deepEqual(requests.map(({ method, url }) => [method, url]), [
    ['POST', '/api/admin/products/7/images'], ['PUT', '/api/admin/products/7/images/3'], ['POST', '/api/admin/products/7/images'], ['DELETE', '/api/admin/products/7/images/3'],
  ])
  assert.deepEqual(requests[2].data, { altText: '상품 사진', sortOrder: '2', isPrimary: 'true', filename: 'photo.png' })
})

test('주문 상태는 서버의 배송 순서를 지키고 결제·취소 상태를 임의로 변경하지 않는다', () => {
  for (const [current, expected] of [['PAID', 'PREPARING'], ['상품 준비 중', 'INTERNATIONAL_SHIPPING'], ['해외 배송 중', 'CUSTOMS_CLEARANCE'], ['CUSTOMS_CLEARANCE', 'DOMESTIC_SHIPPING'], ['국내 배송 중', 'DELIVERED']]) {
    assert.equal(statuses.nextOrderStatus(current), expected)
  }
  for (const status of ['PAYMENT_PENDING', 'PAYMENT_FAILED', 'CANCELLED', 'DELIVERED']) assert.equal(statuses.nextOrderStatus(status), undefined)
})
