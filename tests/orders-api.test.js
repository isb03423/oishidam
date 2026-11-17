import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'

const requests = []
const backend = createHttpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  requests.push({ method: req.method, url: req.url, token: req.headers.authorization, body: chunks.length ? JSON.parse(Buffer.concat(chunks)) : null })
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ data: req.url.startsWith('/api/orders?') ? { content: [{ orderId: 7 }], totalPages: 1 } : { orderId: 7, canCancel: true } }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const orders = await vite.ssrLoadModule('/src/services/orders.js')

test('주문 목록, 상세, 취소를 인증된 요청으로 호출한다', async () => {
  session.setSession({ member_id: '1', name: '회원', role: 'USER' }, { tokens: { accessToken: 'test-token' } })
  assert.equal((await orders.getOrders(1)).content[0].orderId, 7)
  assert.equal((await orders.getOrder(7)).canCancel, true)
  await orders.cancelOrder(7, '변심')
  assert.deepEqual(requests.map(({ method, url, token }) => ({ method, url, token })), [
    { method: 'GET', url: '/api/orders?page=1&size=10', token: 'Bearer test-token' },
    { method: 'GET', url: '/api/orders/7', token: 'Bearer test-token' },
    { method: 'POST', url: '/api/orders/7/cancel', token: 'Bearer test-token' },
  ])
  assert.deepEqual(requests[2].body, { reason: '변심' })
})

test('주문 견적과 생성, 결제 요청과 승인 정보를 서버에 전달한다', async () => {
  requests.length = 0
  const selection = { directItems: [{ productId: 42, quantity: 2 }], recipient: { recipientName: '회원' } }
  await orders.quoteOrder(selection)
  await orders.createOrder({ ...selection, requestKey: 'request', customsCode: 'P123456789012' })
  await orders.startPayment(7, 'payment-request')
  await orders.confirmPayment(7, { paymentRequestKey: 'payment-request', paymentKey: 'key', orderNumber: 'order', amount: 13000 })
  assert.deepEqual(requests.map(({ method, url }) => [method, url]), [
    ['POST', '/api/orders/quote'], ['POST', '/api/orders'],
    ['POST', '/api/orders/7/payments'], ['POST', '/api/orders/7/payments/confirm'],
  ])
  assert.deepEqual(requests[0].body, selection)
  assert.equal(requests[1].body.customsCode, 'P123456789012')
  assert.deepEqual(requests[2].body, { requestKey: 'payment-request', provider: 'TOSS' })
  assert.equal(requests[3].body.amount, 13000)
})

test('주문 상태, 기간, 검색어와 결제 대기 제외 조건을 목록 요청에 전달한다', async () => {
  requests.length = 0
  await orders.getOrders(0, { size: 3, from: '2026-08-16', keyword: '과자', status: 'DOMESTIC_SHIPPING', excludePending: true })
  const url = new URL(requests[0].url, 'http://localhost')
  assert.equal(url.searchParams.get('size'), '3')
  assert.equal(url.searchParams.get('from'), '2026-08-16')
  assert.equal(url.searchParams.get('keyword'), '과자')
  assert.equal(url.searchParams.get('status'), 'DOMESTIC_SHIPPING')
  assert.equal(url.searchParams.get('excludePending'), 'true')
})

test('주문 없이 결제 화면 설정을 인증된 GET 요청으로 조회한다', async () => {
  requests.length = 0
  await orders.getPaymentConfig()
  assert.equal(requests.length, 1)
  assert.equal(requests[0].method, 'GET')
  assert.equal(requests[0].url, '/api/payments/config')
  assert.equal(requests[0].token, 'Bearer test-token')
})
