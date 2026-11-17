import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'

const vite = await createServer({ plugins: [vue()], configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
const { default: Pagination } = await vite.ssrLoadModule('/src/components/common/Pagination.vue')
after(() => vite.close())
const render = (page, pageCount, extra = {}) => renderToString(createSSRApp(Pagination, { modelValue: page, pageCount, label: '목록 페이지', ...extra }))

test('처음·마지막 이동 버튼과 최대 다섯 번호를 표시하고 생략 버튼은 표시하지 않는다', async () => {
  const first = await render(1, 20)
  assert.match(first, /aria-label="첫 페이지" disabled/)
  assert.match(first, /aria-label="이전 페이지" disabled/)
  assert.match(first, /aria-current="page"[^>]*>1<\/span>/)
  const middle = await render(8, 20)
  assert.match(middle, /aria-label="6페이지"/)
  assert.match(middle, /aria-label="10페이지"/)
  assert.equal((middle.match(/<button/g) ?? []).length, 8)
  assert.doesNotMatch(middle, /생략|…|\.\.\./)
  const last = await render(20, 20)
  assert.match(last, /aria-label="다음 페이지" disabled/)
  assert.match(last, /aria-label="마지막 페이지" disabled/)
  assert.doesNotMatch(await render(1, 1), /<nav/)
  assert.doesNotMatch(await render(1, 0), /<nav/)
})

test('로딩 중에는 번호와 처음·이전·다음·마지막 버튼을 모두 비활성화한다', async () => {
  const html = await render(8, 20, { disabled: true, pageLink: (page) => `/products?page=${page}` })
  assert.equal((html.match(/ disabled/g) ?? []).length, 8)
  assert.doesNotMatch(html, /<a /)
})

test('상품 페이지 링크는 카테고리·검색 조건과 목적지 페이지를 유지한다', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/products', name: 'Products', component: { render: () => null } }] })
  await router.push('/products?categoryId=76&keyword=과자&page=8')
  const app = createSSRApp(Pagination, {
    modelValue: 8, pageCount: 20, label: '상품 목록 페이지',
    pageLink: (page) => ({ name: 'Products', query: { ...router.currentRoute.value.query, page: page === 1 ? undefined : String(page) } }),
  })
  app.use(router)
  const html = await renderToString(app)
  for (const page of [1, 7, 9, 20]) {
    const href = router.resolve({ name: 'Products', query: { categoryId: '76', keyword: '과자', page: page === 1 ? undefined : String(page) } }).href.replaceAll('&', '&amp;')
    assert.ok(html.includes(`href="${href}"`))
  }
  assert.doesNotMatch(html, /<a[^>]*aria-current="page"/)
})
