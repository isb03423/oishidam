import assert from 'node:assert/strict'
import { test } from 'node:test'
import { openKakaoLogin } from '../src/services/kakao.js'

function setup(t, { blocked = false } = {}) {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] })
  const listeners = new Set()
  const popup = {
    closed: false,
    location: { replace(url) { popup.url = url } },
    close() { popup.closed = true },
  }
  const originalWindow = globalThis.window
  globalThis.window = {
    location: { origin: 'http://localhost:5173' },
    open: () => blocked ? null : popup,
    addEventListener: (type, listener) => listeners.add(listener),
    removeEventListener: (type, listener) => listeners.delete(listener),
  }
  t.after(() => {
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
  })
  const message = (data, origin = 'http://localhost:8080', source = popup) => {
    for (const listener of listeners) listener({ data, origin, source })
  }
  return { popup, listeners, message }
}

const tokens = { accessToken: 'access', refreshToken: 'refresh' }
const success = { type: 'oishidam-oauth-success', ...tokens }

test('백엔드 인증 URL을 열고 해당 팝업의 토큰만 수신한다', async (t) => {
  const { popup, listeners, message } = setup(t)
  const result = openKakaoLogin('http://localhost:8080/api/')
  assert.equal(popup.url, 'http://localhost:8080/oauth2/authorization/kakao')
  message(success, 'https://untrusted.example')
  message(success, 'http://localhost:8080', {})
  message({ type: 'other' })
  assert.equal(listeners.size, 1)
  assert.equal(popup.closed, false)
  message(success)
  assert.deepEqual(await result, tokens)
  assert.equal(listeners.size, 0)
  assert.equal(popup.closed, true)
})

test('API 접두사가 없는 주소와 서버의 경로 접두사도 지원한다', async (t) => {
  const { popup, message } = setup(t)
  const result = openKakaoLogin('https://shop.example/backend/api?unused=true#unused')
  assert.equal(popup.url, 'https://shop.example/backend/oauth2/authorization/kakao')
  message(success, 'https://shop.example')
  await result
})

test('팝업 차단 안내', async (t) => {
  setup(t, { blocked: true })
  await assert.rejects(openKakaoLogin('http://localhost:8080'), /팝업이 차단/)
})

test('인증 실패 메시지를 받으면 즉시 종료한다', async (t) => {
  const { message, listeners, popup } = setup(t)
  const result = openKakaoLogin('http://localhost:8080/api')
  message({ type: 'oishidam-oauth-error' })
  await assert.rejects(result, /로그인에 실패/)
  assert.equal(listeners.size, 0)
  assert.equal(popup.closed, true)
})

test('잘못된 토큰 응답은 저장하지 않는다', async (t) => {
  const { message } = setup(t)
  const result = openKakaoLogin('http://localhost:8080/api')
  message({ ...success, refreshToken: ' ' })
  await assert.rejects(result, /인증 토큰이 없습니다/)
})

test('화면 이동이나 모드 전환으로 취소하면 팝업과 수신기를 정리한다', async (t) => {
  const { popup, listeners } = setup(t)
  const controller = new AbortController()
  const result = openKakaoLogin('http://localhost:8080/api', { signal: controller.signal })
  controller.abort()
  await assert.rejects(result, { name: 'AbortError' })
  assert.equal(popup.closed, true)
  assert.equal(listeners.size, 0)
})

test('사용자가 팝업을 닫으면 다시 시도할 수 있도록 종료한다', async (t) => {
  const { popup, listeners } = setup(t)
  const result = openKakaoLogin('http://localhost:8080/api')
  popup.closed = true
  t.mock.timers.tick(500)
  await assert.rejects(result, /창이 닫혔습니다/)
  assert.equal(listeners.size, 0)
})

test('3분 안에 인증이 완료되지 않으면 종료한다', async (t) => {
  const { popup } = setup(t)
  const result = openKakaoLogin('http://localhost:8080/api')
  t.mock.timers.tick(180000)
  await assert.rejects(result, /시간이 초과/)
  assert.equal(popup.closed, true)
})

test('이미 취소된 요청과 API 주소 누락은 팝업을 열지 않는다', async () => {
  await assert.rejects(openKakaoLogin('', { signal: AbortSignal.abort() }), { name: 'AbortError' })
  await assert.rejects(openKakaoLogin(''), /백엔드 주소/)
})
