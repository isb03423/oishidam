import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'

let rows = [
  { categoryId: 7, parentId: 5, name: '즉석국·스프', sortOrder: 2 },
  { categoryId: 5, parentId: null, name: '간편조리식품', sortOrder: 2 },
  { categoryId: 1, parentId: null, name: '편의점', sortOrder: 1 },
  { categoryId: 6, parentId: 5, name: '카레·짜장', sortOrder: 1 },
]
let failed = false
let releaseLoad
let pauseLoad = false
const requests = []
const backend = createHttpServer(async (req, res) => {
  requests.push(req.url)
  if (pauseLoad) await new Promise((resolve) => { releaseLoad = resolve })
  res.writeHead(failed ? 503 : 200, { 'Content-Type': 'application/json' })
  const data = req.url.startsWith('/api/products')
    ? { content: [{ productId: 100, categoryId: 6, name: '카레', price: 3000 }], totalElements: 1 }
    : rows
  res.end(JSON.stringify(failed ? { message: '조회 실패' } : { data }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
process.env.VITE_MOCK_ENABLED = 'false'
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { releaseLoad?.(); await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const store = await vite.ssrLoadModule('/src/stores/categories.js')
const catalog = await vite.ssrLoadModule('/src/services/catalog.js')
const development = await vite.ssrLoadModule('/src/config/development.js')
async function waitFor(predicate) {
  for (let i = 0; i < 200; i++) {
    if (predicate()) return
    await new Promise((resolve) => setTimeout(resolve, 5))
  }
  assert.fail('카테고리 조회 완료 시간 초과')
}

test('실제 API의 카테고리 번호로 메뉴·하위 분류를 정렬하고 상품을 조회한다', async () => {
  await waitFor(() => !store.categoryLoading.value)
  assert.deepEqual(store.categoryGroups.value.map((group) => group.category_id), ['1', '5'])
  const group = store.categoryGroups.value[1]
  assert.deepEqual(group.children.map((child) => child.category_id), ['6', '7'])
  assert.equal(store.categories.value.find((category) => category.category_id === '6').parent_id, '5')
  const products = await catalog.getProducts({ categoryId: group.category_id })
  assert.equal(new URL(requests.at(-1), 'http://localhost').searchParams.get('categoryId'), '5')
  assert.equal(products.items[0].category_id, '6')
  assert.equal(products.total, 1)
})

test('카테고리 조회 실패 시 과거 번호를 남기지 않고 재시도로 복구한다', async () => {
  failed = true
  await store.loadCategories()
  assert.deepEqual(store.categories.value, [])
  assert.deepEqual(store.categoryGroups.value, [])
  assert.ok(store.categoryError.value)
  failed = false
  await store.loadCategories()
  assert.equal(store.categoryError.value, '')
  assert.equal(store.categoryGroups.value[1].category_id, '5')
})

test('카테고리가 없는 응답도 빈 목록으로 처리한다', async () => {
  const previous = rows
  rows = []
  await store.loadCategories()
  assert.deepEqual(store.categoryGroups.value, [])
  assert.equal(store.categoryError.value, '')
  rows = previous
})

test('모의 모드 전환 후 늦게 도착한 실제 응답이 모의 카테고리를 덮어쓰지 않는다', async () => {
  pauseLoad = true
  const pending = store.loadCategories()
  await waitFor(() => Boolean(releaseLoad))
  development.setMockEnabled(true)
  await waitFor(() => !store.categoryLoading.value)
  assert.equal(store.categoryGroups.value[0].category_id, '64')
  releaseLoad()
  await pending
  assert.equal(store.categoryGroups.value[0].category_id, '64')
  pauseLoad = false
  development.setMockEnabled(false)
  await waitFor(() => !store.categoryLoading.value && store.categoryGroups.value[0]?.category_id === '1')
})
