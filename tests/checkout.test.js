import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'

const saved = new Map()
globalThis.sessionStorage = { getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value), removeItem: (key) => saved.delete(key) }
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); delete globalThis.sessionStorage })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const store = await vite.ssrLoadModule('/src/stores/checkout.js')
const key = 'oishidam:checkout:v1'
const member = (id) => session.setSession({ member_id: id, name: '회원' })
const item = { product_id: '42', name: '상품', quantity: 2, price: 5000 }

test('새로고침 시 상품·배송지·통관번호를 복원한다', () => {
  member(1)
  store.startCheckout([item], true)
  store.saveCheckoutInputs({ recipient: '테스트', phone: '01012345678', address: '주소', customs: 'P123456789012' }, 'custom')
  const snapshot = saved.get(key)
  assert.equal(JSON.parse(snapshot).inputs.customs, 'P123456789012')
  store.clearCheckout()
  saved.set(key, snapshot)
  const inputs = store.restoreCheckout()
  assert.equal(inputs.recipient, '테스트')
  assert.equal(inputs.customs, 'P123456789012')
  assert.equal(inputs.memoChoice, 'custom')
  assert.equal(store.checkout.value.items[0].product_id, '42')
  assert.equal(store.checkout.value.fromCart, true)
  assert.equal(store.restoreCheckout(), null)
})

test('새 주문·계정 변경·로그아웃 때 이전 입력값이 남지 않는다', () => {
  store.startCheckout([item])
  assert.equal(JSON.parse(saved.get(key)).inputs, undefined)
  const snapshot = saved.get(key)
  member(2)
  assert.equal(store.checkout.value, null)
  assert.equal(saved.has(key), false)
  saved.set(key, snapshot)
  assert.equal(store.restoreCheckout(), null)
  assert.equal(store.checkout.value, null)
  store.startCheckout([item])
  session.clearSession()
  assert.equal(saved.has(key), false)
})
