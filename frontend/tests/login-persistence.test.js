import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as httpServer } from 'node:http'
import { createServer } from 'vite'

const memoryStorage = () => {
  const items = new Map()
  return { getItem: (key) => items.get(key) ?? null, setItem: (key, value) => items.set(key, String(value)), removeItem: (key) => items.delete(key), clear: () => items.clear() }
}
globalThis.window = { localStorage: memoryStorage(), sessionStorage: memoryStorage() }
const key = 'oishidam:api-session:v1'
const refreshes = new Map()
const access = new Map()
let serial = 0
let failRefresh = false
let refreshCount = 0
let delayed401
let hold401 = false
function pair(user) {
  const n = ++serial
  const tokens = { accessToken: `access-${n}`, refreshToken: `refresh-${n}` }
  access.set(tokens.accessToken, user)
  refreshes.set(tokens.refreshToken, user)
  return tokens
}
const backend = httpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const body = chunks.length ? JSON.parse(Buffer.concat(chunks)) : null
  const send = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)) }
  if (req.url === '/api/auth/login') return send(200, { data: { ...pair(1), member: { memberId: 1, name: '로그인 이름', role: '일반 회원', isActive: true } } })
  if (req.url === '/api/auth/refresh') {
    refreshCount++
    if (failRefresh) return send(503, { message: '서버 장애' })
    const user = refreshes.get(body.refreshToken)
    if (!user) return send(401, { message: '갱신 토큰 만료' })
    refreshes.delete(body.refreshToken)
    await new Promise((resolve) => setTimeout(resolve, 20))
    return send(200, { data: pair(user) })
  }
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (hold401) { delayed401 = () => send(401, { message: '만료' }); return }
  const user = access.get(token)
  if (!user) return send(401, { message: '인증 실패' })
  if (req.url === '/api/auth/logout') {
    assert.equal(refreshes.get(body.refreshToken), user)
    refreshes.delete(body.refreshToken)
    access.delete(token)
    return send(200, { data: null })
  }
  if (req.url === '/api/members/me') return send(200, { data: { memberId: user, name: '서버의 최신 이름', role: '관리자', isActive: true } })
  return send(200, { data: { user } })
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
process.env.VITE_MOCK_ENABLED = 'false'
const servers = []
after(async () => { await Promise.all(servers.map((server) => server.close())); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)); delete globalThis.window })
async function page() {
  const server = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
  servers.push(server)
  return { session: await server.ssrLoadModule('/src/stores/session.js'), auth: await server.ssrLoadModule('/src/services/auth.js'), api: await server.ssrLoadModule('/src/services/api.js') }
}
function reset() { window.localStorage.clear(); window.sessionStorage.clear(); failRefresh = false }

test('기본 로그인은 갱신 토큰만 탭에 저장하고 새로고침 시 서버 회원정보로 복원한다', async () => {
  reset()
  const first = await page()
  await first.auth.login({ email: 'user@example.com', password: 'test' })
  const saved = JSON.parse(window.sessionStorage.getItem(key))
  assert.deepEqual(Object.keys(saved), ['refreshToken'])
  assert.equal(window.localStorage.getItem(key), null)
  const second = await page()
  assert.equal(second.session.session.member, null)
  await second.auth.restoreSession()
  assert.equal(second.session.session.member.name, '서버의 최신 이름')
  assert.equal(second.session.session.member.role, 'ADMIN')
  assert.notEqual(JSON.parse(window.sessionStorage.getItem(key)).refreshToken, saved.refreshToken)
})

test('자동 로그인은 브라우저 저장소를 사용하고 로그아웃 시 모두 지운다', async () => {
  reset()
  const first = await page()
  await first.auth.login({ email: 'user@example.com', password: 'test', remember: true })
  assert.ok(window.localStorage.getItem(key))
  assert.equal(window.sessionStorage.getItem(key), null)
  window.sessionStorage.clear()
  const second = await page()
  await second.auth.restoreSession()
  assert.equal(second.session.session.member.member_id, 1)
  await second.auth.logout()
  assert.equal(second.session.session.member, null)
  assert.equal(window.localStorage.getItem(key), null)
  assert.equal(window.sessionStorage.getItem(key), null)
})

test('갱신 토큰이 거부되면 저장소와 세션을 정리한다', async () => {
  reset()
  window.sessionStorage.setItem(key, JSON.stringify({ refreshToken: 'expired' }))
  const current = await page()
  await current.auth.restoreSession()
  assert.equal(current.session.session.member, null)
  assert.equal(current.session.getAuthTokens(), null)
  assert.equal(window.sessionStorage.getItem(key), null)
})

test('일시적인 서버 장애는 저장된 갱신 토큰을 삭제하지 않는다', async () => {
  reset()
  const current = await page()
  await current.auth.login({ email: 'user@example.com', password: 'test' })
  const saved = window.sessionStorage.getItem(key)
  failRefresh = true
  const reloaded = await page()
  await reloaded.auth.restoreSession()
  assert.equal(reloaded.session.session.member, null)
  assert.ok(reloaded.session.session.restoreError)
  assert.equal(window.sessionStorage.getItem(key), saved)
  failRefresh = false
})

test('동시 인증 만료 요청은 한 번만 재발급한 뒤 재시도한다', async () => {
  reset()
  const current = await page()
  await current.auth.login({ email: 'user@example.com', password: 'test' })
  access.delete(current.session.getAuthTokens().accessToken)
  const before = refreshCount
  const result = await Promise.all([1, 2, 3].map(() => current.api.apiRequest({ path: '/protected', authenticated: true, mock: false })))
  assert.equal(refreshCount - before, 1)
  assert.deepEqual(result, [{ user: 1 }, { user: 1 }, { user: 1 }])
})

test('만료된 액세스 토큰으로 로그아웃해도 새 갱신 토큰까지 폐기한다', async () => {
  reset()
  const current = await page()
  await current.auth.login({ email: 'user@example.com', password: 'test' })
  access.delete(current.session.getAuthTokens().accessToken)
  await current.auth.logout()
  assert.equal(current.session.getAuthTokens(), null)
  assert.equal(window.sessionStorage.getItem(key), null)
})

test('이전 계정 요청의 늦은 401을 새 계정으로 재전송하지 않는다', async () => {
  reset()
  const current = await page()
  await current.auth.login({ email: 'user@example.com', password: 'test' })
  hold401 = true
  const request = current.api.apiRequest({ path: '/protected', authenticated: true, mock: false })
  const rejected = assert.rejects(request, /로그인 정보가 변경/)
  for (let i = 0; i < 100 && !delayed401; i++) await new Promise((resolve) => setTimeout(resolve, 5))
  assert.ok(delayed401)
  const tokens = pair(2)
  current.session.setSession({ member_id: 2, name: '다른 회원' }, { tokens })
  hold401 = false
  delayed401()
  await rejected
  assert.equal(current.session.session.member.member_id, 2)
  assert.equal(current.session.getAuthTokens().accessToken, tokens.accessToken)
})
