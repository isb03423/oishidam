import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createRenderer, nextTick, ssrContextKey } from 'vue'

const requests = []
let failSummary = false
const backend = createHttpServer((req, res) => {
  requests.push({ url: req.url, token: req.headers.authorization })
  const path = new URL(req.url, 'http://localhost').pathname
  const failed = path.endsWith('/summary') && failSummary
  const data = path === '/api/categories' ? []
    : path.endsWith('/summary') ? { reviewCount: 5, ratingCount: 4, averageRating: 4.75 }
      : path.endsWith('/reviews') ? { content: [{ reviewId: 1, content: '후기', rating: 1 }], totalElements: 5, totalPages: 1 }
        : { productId: 26, categoryId: 1, name: '상품', price: 3800, stockQuantity: 10 }
  res.writeHead(failed ? 500 : 200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(failed ? { message: '집계 오류' } : { data }))
})
await new Promise(resolve => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
process.env.VITE_MOCK_ENABLED = 'false'
const vite = await createServer({ configFile: false, plugins: [vue()], server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise(resolve => backend.close(resolve)) })
const { createRouter, createMemoryHistory } = await vite.ssrLoadModule('vue-router')
const Component = (await vite.ssrLoadModule('/src/views/ProductDetailView.vue')).default
const renderer = createRenderer({ createComment: () => ({}), createText: () => ({}), createElement: () => ({}), insert() {}, remove() {}, setText() {}, setElementText() {}, patchProp() {}, parentNode: () => null, nextSibling: () => null })
async function mount() {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/products/:productId', component: { render: () => null } }] })
  await router.push('/products/26')
  await router.isReady()
  const app = renderer.createApp({ ...Component, render: () => null })
  app.provide(ssrContextKey, {})
  app.use(router)
  return { app, state: app.mount({}).$.setupState }
}
async function until(predicate) {
  for (let i = 0; i < 100; i++) {
    await nextTick()
    if (predicate()) return
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  assert.fail('상품 조회 완료 시간 초과')
}

test('탭을 누르기 전 상품 상세정보 화면에서 후기 수를 공개 조회한다', async () => {
  const { app, state } = await mount()
  try {
    await until(() => state.status === 'ready' && state.reviewCount === 5)
    assert.equal(state.tab, 'details')
    assert.equal(state.tabs.find(tab => tab.id === 'reviews').label, '상품 후기')
    assert.equal(requests.some(request => request.url.includes('/reviews?')), false)
    assert.equal(requests.find(request => request.url.endsWith('/summary')).token, undefined)
    state.tab = 'reviews'
    await until(() => !state.reviewLoading && state.serverReviews.length === 1)
    assert.equal(state.reviewCount, 5)
    assert.equal(state.averageRating, '4.8')
  } finally { app.unmount() }
})

test('후기 집계가 실패해도 상품 정보는 열리고 후기 수를 0으로 만들지 않는다', async () => {
  failSummary = true
  const { app, state } = await mount()
  try {
    await until(() => state.status === 'ready')
    assert.equal(state.product.name, '상품')
    assert.equal(state.reviewCount, null)
  } finally { app.unmount(); failSummary = false }
})
