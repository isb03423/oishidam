import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'
import { nextTick } from 'vue'

const requests = []
let pauseLoad = false
let releaseLoad
let failDelete = false
let failAdd = false
const product = { product_id: '42', name: '상품', price: 5000 }
const rows = [42, 43].map((productId) => ({ productId, name: '상품', price: 5000, imageUrl: 'https://example.com/item.jpg', stockQuantity: 3, soldOut: false, available: true }))
const backend = createHttpServer(async (req, res) => {
  requests.push({ method: req.method, url: req.url, token: req.headers.authorization })
  if (req.method === 'GET' && pauseLoad) await new Promise((resolve) => { releaseLoad = resolve })
  const failed = (req.method === 'DELETE' && req.url.endsWith('/43') && failDelete) || (req.method === 'PUT' && failAdd)
  res.writeHead(failed ? 409 : 200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(failed ? { message: '처리하지 못했습니다.' } : { data: req.method === 'GET' ? rows : null }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { releaseLoad?.(); await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const wishes = await vite.ssrLoadModule('/src/stores/wishlist.js')
const login = (id, role = 'USER') => session.setSession({ member_id: id, name: '회원', role }, { tokens: { accessToken: `token-${id}` } })
async function waitFor(predicate) {
  for (let i = 0; i < 100; i++) {
    if (predicate()) return
    await new Promise((resolve) => setTimeout(resolve, 5))
  }
  assert.fail('요청 완료 시간 초과')
}

test('관리자로 로그인하면 회원 전용 찜 API와 오류 모달을 발생시키지 않는다', async () => {
  login(1, 'ADMIN')
  await nextTick()
  await wishes.loadWishes()
  await wishes.toggleWish(product)
  await wishes.removeWishes(['42'])
  assert.equal(requests.length, 0)
  assert.deepEqual(wishes.wishedProducts.value, [])
  assert.equal(wishes.wishError.value, '')
})

test('회원 찜은 서버 조회·추가·삭제하며 실패한 항목은 남긴다', async () => {
  login(2)
  await waitFor(() => !wishes.wishLoading.value)
  assert.deepEqual(wishes.wishedIds.value, ['42', '43'])
  assert.equal(wishes.wishedProducts.value[0].images[0].url, 'https://example.com/item.jpg')
  assert.equal(requests[0].token, 'Bearer token-2')
  failDelete = true
  assert.deepEqual(await wishes.removeWishes(['42', '43']), { removed: 1, failed: 1 })
  assert.deepEqual(wishes.wishedIds.value, ['43'])
  assert.ok(wishes.wishError.value)
  await wishes.toggleWish(product)
  assert.deepEqual(wishes.wishedIds.value, ['42', '43'])
  assert.equal(requests.at(-1).method, 'PUT')
  failAdd = true
  assert.equal(await wishes.toggleWish({ ...product, product_id: '44' }), false)
  assert.equal(wishes.wishedIds.value.includes('44'), false)
  failAdd = false
})

test('조회 중 로그아웃하거나 관리자로 전환하면 이전 회원 목록·오류를 복원하지 않는다', async () => {
  pauseLoad = true
  login(3)
  await waitFor(() => Boolean(releaseLoad))
  session.clearSession()
  login(4, 'ADMIN')
  releaseLoad()
  await new Promise((resolve) => setTimeout(resolve, 20))
  assert.deepEqual(wishes.wishedIds.value, [])
  assert.equal(wishes.wishError.value, '')
  assert.equal(wishes.wishLoading.value, false)
  pauseLoad = false
})
