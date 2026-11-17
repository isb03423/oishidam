import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'

const requests = []
const address = { addressId: 7, label: '집', recipientName: '회원', recipientPhone: '01012345678', postalCode: '12345', addressLine1: '주소', addressLine2: '상세', isDefault: true, customsCode: 'P123456789012' }
const backend = createHttpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  requests.push({ method: req.method, url: req.url, body: chunks.length ? JSON.parse(Buffer.concat(chunks)) : null })
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ data: req.method === 'GET' ? [address] : address }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const addresses = await vite.ssrLoadModule('/src/services/addresses.js')

test('배송지 등록과 수정은 기본 배송지 설정과 연락처를 서버에 전달한다', async () => {
  session.setSession({ member_id: '1', name: '회원', role: 'USER' }, { tokens: { accessToken: 'test-token' } })
  const [saved] = await addresses.getAddresses()
  assert.equal(saved.isDefault, true)
  assert.equal(saved.recipient, '회원')
  assert.equal(saved.customs, 'P123456789012')
  await addresses.saveAddress({ ...saved, phone: '010-1234-5678' })
  await addresses.saveAddress(saved, saved.id)
  assert.deepEqual(requests.map(({ method, url }) => [method, url]), [
    ['GET', '/api/members/me/addresses'],
    ['POST', '/api/members/me/addresses'],
    ['PATCH', '/api/members/me/addresses/7'],
  ])
  for (const request of requests.slice(1)) {
    assert.equal(request.body.isDefault, true)
    assert.equal(request.body.recipientPhone, '01012345678')
    assert.equal(request.body.customsCode, 'P123456789012')
  }
})
