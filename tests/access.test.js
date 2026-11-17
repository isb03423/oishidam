import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createMemoryHistory, createRouter } from 'vue-router'
import { accessDeniedReason, accessRedirect } from '../src/router/access.js'

test('회원 전용 페이지는 로그인 여부를 확인한다', () => {
  for (const path of ['/mypage', '/mypage/reviews', '/mypage/profile/password']) {
    assert.equal(accessDeniedReason({ path }, null), 'login')
    assert.equal(accessDeniedReason({ path }, { role: 'USER' }), '')
  }
  assert.equal(accessDeniedReason({ name: 'Checkout', path: '/checkout' }, null), 'login')
  assert.equal(accessDeniedReason({ name: 'Home', path: '/' }, null), '')
})

test('관리자 페이지는 로그인과 관리자 권한을 확인한다', () => {
  const route = { name: 'AdminDashboard', path: '/admin' }
  assert.equal(accessDeniedReason(route, null), 'login')
  assert.equal(accessDeniedReason(route, { role: 'USER' }), 'admin')
  assert.equal(accessDeniedReason(route, { role: 'ADMIN' }), '')
})

test('존재하지 않는 마이페이지 주소는 로그인 안내 대신 404를 표시한다', () => {
  assert.equal(accessDeniedReason({ name: 'NotFound', path: '/mypage/unknown' }, null), '')
})

test('AI 추천은 회원만 볼 수 있고 일반 상품 및 추천 목록은 공개한다', () => {
  const route = { name: 'Products', path: '/products', query: { recommend: 'ai' } }
  assert.equal(accessDeniedReason(route, null), 'login')
  assert.equal(accessDeniedReason(route, { role: 'USER' }), '')
  assert.equal(accessDeniedReason({ ...route, query: {} }, null), '')
  assert.equal(accessDeniedReason({ ...route, query: { collection: 'recommended' } }, null), '')
})

function testRouter(member = null) {
  const component = {}
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'Home', component },
      { path: '/mypage', name: 'MyPage', component },
      { path: '/products', name: 'Products', component },
      { path: '/admin', name: 'AdminDashboard', component },
      { path: '/login', name: 'Login', component },
      { path: '/access-denied', name: 'AccessDenied', component },
    ],
  })
  router.beforeEach((to, from) => accessRedirect(to, from, member))
  return router
}

test('최초 URL 접근은 권한 안내로, 사이트 내부 이동은 로그인으로 보낸다', async () => {
  for (const path of ['/mypage', '/products?recommend=ai', '/admin']) {
    const direct = testRouter()
    await direct.push(path)
    assert.equal(direct.currentRoute.value.name, 'AccessDenied')
    assert.equal(direct.currentRoute.value.query.reason, 'login')

    const internal = testRouter()
    await internal.push('/')
    await internal.push(path)
    assert.equal(internal.currentRoute.value.name, 'Login')
  }
})

test('상품 목록에서 AI 추천으로 쿼리만 바뀌어도 로그인으로 보낸다', async () => {
  const router = testRouter()
  await router.push('/products')
  await router.push('/products?recommend=ai')
  assert.equal(router.currentRoute.value.name, 'Login')
})

test('로그인 회원은 회원 페이지를 열고 관리자 권한이 없으면 안내를 표시한다', async () => {
  const router = testRouter({ role: 'USER' })
  await router.push('/mypage')
  assert.equal(router.currentRoute.value.name, 'MyPage')
  await router.push('/products?recommend=ai')
  assert.equal(router.currentRoute.value.name, 'Products')
  await router.push('/admin')
  assert.equal(router.currentRoute.value.name, 'AccessDenied')
  assert.equal(router.currentRoute.value.query.reason, 'admin')
})
