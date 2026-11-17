import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'
import { nextTick } from 'vue'

const requests = []
const carts = new Map()
let heldRead
let holdRead = false
let failDelete
const backend = createHttpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const data = chunks.length ? JSON.parse(Buffer.concat(chunks)) : null
  requests.push({ method: req.method, url: req.url, data, token: req.headers.authorization })
  const send = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)) }
  if (req.url.startsWith('/api/recommendations/products')) {
    const params = new URL(req.url, 'http://localhost').searchParams
    return send(200, { data: { products: [], recommendationType: params.get('type')?.toUpperCase() ?? 'BEST' } })
  }
  if (req.url.startsWith('/api/products')) {
    const product = { productId: 42, categoryId: 7, name: '서버 상품', price: 5000, stockQuantity: 5, isSoldOut: false, primaryImage: { imageUrl: 'https://example.com/product.png' } }
    send(200, { data: req.url.startsWith('/api/products?') ? { content: [product], totalElements: 41, number: 1, size: 20 } : product })
    return
  }
  const token = req.headers.authorization
  if (!token) return send(401, { message: '로그인 필요' })
  const cart = carts.get(token) ?? []
  carts.set(token, cart)
  if (req.method === 'GET') {
    if (holdRead) { heldRead = () => send(200, { data: cart }); return }
    return send(200, { data: cart })
  }
  if (req.method === 'POST') {
    const previous = cart.find((item) => item.productId === Number(data.productId))
    const quantity = (previous?.quantity ?? 0) + data.quantity
    if (quantity > 5) return send(400, { message: '재고가 부족합니다.', code: 'CART_ITEM_UNAVAILABLE' })
    const item = { cartItemId: Number(data.productId) + 1000, productId: Number(data.productId), productName: '서버 상품', price: 5000, stockQuantity: 5, quantity, available: true, primaryImageUrl: 'https://example.com/product.png' }
    if (previous) Object.assign(previous, item)
    else cart.push(item)
    return send(200, { data: item })
  }
  const id = Number(req.url.split('/').at(-1))
  const index = cart.findIndex((item) => item.cartItemId === id)
  if (index < 0) return send(404, { message: '항목 없음' })
  if (req.method === 'PATCH') {
    if (data.quantity > 5) return send(400, { message: '재고가 부족합니다.' })
    cart[index].quantity = data.quantity
    return send(200, { data: cart[index] })
  }
  if (failDelete === id) return send(503, { message: '삭제 실패' })
  cart.splice(index, 1)
  send(200, { data: null })
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
process.env.VITE_MOCK_ENABLED = 'false'
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const cart = await vite.ssrLoadModule('/src/stores/cart.js')
const catalog = await vite.ssrLoadModule('/src/services/catalog.js')
const product = { product_id: '42', name: '화면의 예전 상품', price: 1, stock_quantity: 100 }
async function settled() {
  await nextTick()
  for (let i = 0; i < 200 && cart.cartLoading.value; i++) await new Promise((resolve) => setTimeout(resolve, 5))
  assert.equal(cart.cartLoading.value, false)
}
async function login(id) {
  session.setSession({ member_id: id, name: '회원', role: 'USER' }, { tokens: { accessToken: `token-${id}` } })
  await settled()
}

test('상품 Page 응답과 상품별 가격·재고·대표 이미지를 화면에 맞춘다', async () => {
  const page = await catalog.getProducts({ page: 1 })
  assert.equal(page.total, 41)
  assert.equal(page.page, 1)
  assert.equal(page.items[0].min_price, 5000)
  assert.equal(page.items[0].images[0].url, 'https://example.com/product.png')
  const detail = await catalog.getProduct('42')
  assert.equal(detail.product_id, '42')
  assert.equal(detail.price, 5000)
  assert.equal(detail.stock_quantity, 5)
})

test('신상품·베스트 요청에 조회 유형과 최대 개수를 전달한다', async () => {
  for (const type of ['new', 'best']) {
    const result = await catalog.getRecommendations({ type, limit: 8 })
    assert.equal(result.source, type.toUpperCase())
    const url = new URL(requests.at(-1).url, 'http://localhost')
    assert.equal(url.searchParams.get('type'), type)
    assert.equal(url.searchParams.get('limit'), '8')
  }
})

test('로그인 장바구니를 서버에서 불러오고 서버 항목 ID로 변경·삭제한다', async () => {
  await assert.rejects(() => cart.addProductToCart(product, 1), /로그인/)
  await login(1)
  const item = await cart.addProductToCart(product, 2)
  assert.equal(item.cart_item_id, 1042)
  assert.equal(cart.cartItems.value[0].price, 5000)
  await cart.changeCartQuantity('42', 1)
  assert.equal(cart.cartItems.value[0].quantity, 3)
  assert.ok(requests.some((req) => req.method === 'PATCH' && req.url === '/api/cart/1042' && req.data.quantity === 3))
  await cart.loadCart()
  assert.equal(cart.cartItems.value[0].quantity, 3)
  await assert.rejects(() => cart.addProductToCart(product, 3), /재고/)
  assert.equal(cart.cartItems.value[0].quantity, 3)
  assert.equal(cart.cartBusy.value, false)
  await cart.removeCartItems(['42'])
  assert.equal(cart.cartCount.value, 0)
  assert.ok(requests.some((req) => req.method === 'DELETE' && req.url === '/api/cart/1042'))
})

test('일부 삭제 실패 시 성공한 항목만 제거하고 남은 항목을 유지한다', async () => {
  await cart.addProductToCart(product, 1)
  await cart.addProductToCart({ ...product, product_id: '43' }, 1)
  failDelete = 1042
  await assert.rejects(() => cart.removeCartItems(['42', '43']), /삭제 실패/)
  assert.deepEqual(cart.cartItems.value.map((item) => item.product_id), ['42'])
  failDelete = null
})

test('계정 전환·로그아웃 후 늦게 도착한 목록으로 이전 장바구니를 복원하지 않는다', async () => {
  holdRead = true
  const pending = cart.loadCart()
  for (let i = 0; i < 100 && !heldRead; i++) await new Promise((resolve) => setTimeout(resolve, 5))
  assert.ok(heldRead)
  session.clearSession()
  await nextTick()
  heldRead()
  await pending
  assert.equal(cart.cartItems.value.length, 0)
  assert.equal(cart.cartLoading.value, false)
  holdRead = false
  await login(2)
  assert.equal(cart.cartItems.value.length, 0)
  session.clearSession()
  await nextTick()
})
