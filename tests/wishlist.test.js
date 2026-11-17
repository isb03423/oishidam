import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'

const data = new Map()
const writes = []
globalThis.localStorage = {
  getItem: (key) => data.get(key) ?? null,
  setItem: (key, value) => { writes.push(key); data.set(key, value) },
  removeItem: (key) => data.delete(key),
}
const guestKey = 'oishidam:wishlist:v1:guest'
const memberKey = (id) => `oishidam:wishlist:v1:${JSON.stringify(['mock', id])}`
const product = { product_id: '42', name: '찜 상품' }
data.set(guestKey, JSON.stringify([product]))
data.set(memberKey(1), JSON.stringify([product]))
const server = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await server.close(); delete globalThis.localStorage })
const session = await server.ssrLoadModule('/src/stores/session.js')
const wishes = await server.ssrLoadModule('/src/stores/wishlist.js')

test('기존 게스트 키를 삭제하고 비회원에게 찜을 복원·저장하지 않는다', () => {
  assert.equal(data.has(guestKey), false)
  assert.deepEqual(wishes.wishedProducts.value, [])
  wishes.toggleWish(product)
  wishes.removeWishes([])
  assert.deepEqual(wishes.wishedIds.value, [])
  assert.equal(writes.includes(guestKey), false)
  assert.equal(data.has(guestKey), false)
  assert.equal(data.has(memberKey(1)), true)
})

test('회원 찜은 유지하며 로그아웃·계정 변경 시 노출하지 않는다', () => {
  session.setSession({ member_id: 1, name: '회원 1', status: 'ACTIVE' }, { mock: true })
  assert.deepEqual(wishes.wishedIds.value, ['42'])
  wishes.toggleWish({ product_id: '43', name: '새 상품' })
  assert.deepEqual(JSON.parse(data.get(memberKey(1))).map((p) => p.product_id), ['43', '42'])
  session.clearSession()
  assert.deepEqual(wishes.wishedProducts.value, [])
  wishes.toggleWish(product)
  wishes.removeWishes(['42'])
  assert.equal(data.has(guestKey), false)
  session.setSession({ member_id: 2, name: '회원 2', status: 'ACTIVE' }, { mock: true })
  assert.deepEqual(wishes.wishedIds.value, [])
  assert.deepEqual(JSON.parse(data.get(memberKey(1))).map((p) => p.product_id), ['43', '42'])
  session.clearSession()
})
