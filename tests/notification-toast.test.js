import assert from 'node:assert/strict'
import { test, after } from 'node:test'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createRenderer, ssrContextKey } from 'vue'

const vite = await createServer({ configFile: false, plugins: [vue()], server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(() => vite.close())
const { useToasts } = await vite.ssrLoadModule('/src/composables/useToasts.js')
const Component = (await vite.ssrLoadModule('/src/components/common/NotificationToast.vue')).default
const renderer = createRenderer({ createComment: () => ({}), createText: () => ({}), createElement: () => ({}), insert() {}, remove() {}, setText() {}, setElementText() {}, patchProp() {}, parentNode: () => null, nextSibling: () => null })

function mount(component, props) {
  const app = renderer.createApp({ ...component, render: () => null }, props)
  app.provide(ssrContextKey, {})
  return { app, state: app.mount({}).$.setupState }
}

test('같은 메시지도 클릭마다 쌓이고 각 토스트가 생성된 지 3초 뒤 개별로 사라진다', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const { app, state } = mount({ setup: useToasts })
  try {
    const a = state.showToast('success', '같은 메시지')
    t.mock.timers.tick(1000)
    const b = state.showToast('success', '같은 메시지')
    t.mock.timers.tick(1000)
    const c = state.showToast('error', '실패 메시지')
    assert.deepEqual(state.toasts.map(item => item.id), [a, b, c])
    t.mock.timers.tick(999)
    assert.equal(state.toasts.length, 3)
    t.mock.timers.tick(1)
    assert.deepEqual(state.toasts.map(item => item.id), [b, c])
    t.mock.timers.tick(1000)
    assert.deepEqual(state.toasts.map(item => item.id), [c])
    t.mock.timers.tick(1000)
    assert.equal(state.toasts.length, 0)
  } finally { app.unmount(); t.mock.timers.reset() }
})

test('호버·포커스 동안 타이머를 멈추고 수동 닫기·화면 이탈은 다른 알림을 잘못 지우지 않는다', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const { app, state } = mount({ setup: useToasts })
  try {
    const a = state.showToast('success', '첫 알림')
    const b = state.showToast('warning', '둘째 알림')
    state.pauseToast(a)
    t.mock.timers.tick(3000)
    assert.deepEqual(state.toasts.map(item => item.id), [a])
    state.resumeToast(a)
    const c = state.showToast('info', '셋째 알림')
    state.dismissToast(c)
    assert.deepEqual(state.toasts.map(item => item.id), [a])
    t.mock.timers.tick(3000)
    assert.equal(state.toasts.length, 0)
    state.showToast('success', '이탈 전에 생긴 알림')
    state.clearToasts()
    t.mock.timers.tick(3000)
    assert.equal(state.toasts.length, 0)
    assert.notEqual(a, b)
  } finally { app.unmount(); t.mock.timers.reset() }
})

test('헤더 아래 8px에 배치하고 수동 팝오버로 표시한다', async () => {
  const originals = Object.fromEntries(['HTMLElement', 'document', 'window', 'innerWidth', 'getComputedStyle'].map(key => [key, globalThis[key]]))
  class Element {}
  Element.prototype.popover = ''
  globalThis.HTMLElement = Element
  globalThis.document = { ariaNotify() {} }
  globalThis.window = { addEventListener() {}, removeEventListener() {} }
  globalThis.innerWidth = 1280
  globalThis.getComputedStyle = () => ({ paddingInlineEnd: '24px' })
  const { app, state } = mount(Component, { items: [{ id: 1, type: 'success', message: '완료' }], anchor: { getBoundingClientRect: () => ({ bottom: 180, right: 1240 }) } })
  let open = false
  try {
    state.stack = { matches: () => open, showPopover() { open = true }, hidePopover() { open = false } }
    await state.sync()
    assert.equal(state.top, '188px')
    assert.equal(state.right, '64px')
    assert.equal(open, true)
  } finally {
    app.unmount()
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete globalThis[key]
      else globalThis[key] = value
    }
  }
})
