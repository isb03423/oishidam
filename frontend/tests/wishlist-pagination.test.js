import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createRenderer, nextTick, ssrContextKey } from 'vue'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'

const vite = await createServer({ plugins: [vue()], configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const wishes = await vite.ssrLoadModule('/src/stores/wishlist.js')
const { default: Wishlist } = await vite.ssrLoadModule('/src/views/WishlistView.vue')
const renderer = createRenderer({ createComment: () => ({}), insert() {}, remove() {} })
const app = renderer.createApp({ ...Wishlist, render: () => null })
app.provide(ssrContextKey, {})
app.mount({})
const view = app._instance.setupState
after(async () => { app.unmount(); session.clearSession(); await vite.close() })

test('12개씩 나누고 페이지 이동과 정렬 변경 시 선택을 초기화한다', async () => {
  session.setSession({ member_id: 1, name: '회원', status: 'ACTIVE' }, { mock: true })
  for (let id = 1; id <= 25; id++) {
    await wishes.toggleWish({ product_id: String(id), name: `상품 ${id}`, min_price: id * 100 })
  }
  await nextTick()
  assert.equal(view.pageCount, 3)
  assert.deepEqual(view.visibleProducts.map((product) => product.product_id), Array.from({ length: 12 }, (_, index) => String(25 - index)))
  view.selection = view.visibleProducts.map((product) => product.product_id)
  assert.equal(view.allSelected, true)
  view.page = 3
  await nextTick()
  assert.deepEqual(view.selection, [])
  assert.deepEqual(view.visibleProducts.map((product) => product.product_id), ['1'])
  view.selection = ['1']
  view.sort = 'price-asc'
  await nextTick()
  assert.equal(view.page, 1)
  assert.deepEqual(view.selection, [])
  assert.deepEqual(view.visibleProducts.map((product) => product.product_id), Array.from({ length: 12 }, (_, index) => String(index + 1)))
})

test('마지막 페이지의 상품 삭제 시 앞 페이지로 이동하고 빈 목록은 1페이지로 돌아간다', async () => {
  view.page = 3
  await nextTick()
  await wishes.removeWishes(['25'])
  await nextTick()
  assert.equal(view.page, 2)
  assert.equal(view.visibleProducts.length, 12)
  await wishes.removeWishes([...wishes.wishedIds.value])
  await nextTick()
  assert.equal(view.page, 1)
  assert.equal(view.pageCount, 0)
  assert.deepEqual(view.visibleProducts, [])
  assert.equal(view.allSelected, false)
})
