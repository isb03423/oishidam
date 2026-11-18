import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'

const requests = []
const backend = createHttpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks)
  let data = null
  if (req.headers['content-type']?.startsWith('multipart/')) {
    const form = await new Response(raw, { headers: { 'Content-Type': req.headers['content-type'] } }).formData()
    data = {
      content: form.get('content'), rating: form.get('rating'), request: form.get('request') ? JSON.parse(await form.get('request').text()) : null,
      files: form.getAll('files').map((file) => ({ name: file.name, type: file.type, size: file.size })),
    }
  } else if (raw.length) data = JSON.parse(raw)
  requests.push({ method: req.method, url: req.url, token: req.headers.authorization, data })
  const item = { orderItemId: 7, productId: 42, productName: '주문 당시 상품', imageUrl: 'https://example.com/item.jpg', orderedAt: '2026-11-01T12:00:00', deliveredAt: '2026-11-10T12:00:00', writeDeadline: '2026-12-10T12:00:00', editable: true,
    review: req.url.includes('/mine') ? { reviewId: 8, content: '후기', rating: 4, imageUrls: ['https://example.com/old.jpg'], editableUntil: '2026-11-17T12:00:00' } : null }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ data: req.method === 'GET' ? { content: [item], totalElements: 11, totalPages: 2 } : { reviewId: 8 } }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const reviews = await vite.ssrLoadModule('/src/services/reviews.js')

test('마이페이지 후기 목록과 서버 기한·상품 스냅샷을 사용한다', async () => {
  session.setSession({ member_id: '1', name: '회원', role: 'USER' }, { tokens: { accessToken: 'review-token' } })
  const eligible = await reviews.getMyReviews('eligible', 1)
  assert.equal(eligible.content[0].orderItemId, 7)
  assert.equal(eligible.content[0].deadline, '2026-12-10 12:00')
  assert.equal(eligible.totalElements, 11)
  const written = await reviews.getMyReviews('written')
  assert.equal(written.content[0].id, '8')
  assert.equal(written.content[0].rating, 4)
  assert.equal(written.content[0].name, '주문 당시 상품')
  assert.equal(written.content[0].images[0].url, 'https://example.com/old.jpg')
  assert.equal(requests[0].url, '/api/reviews/eligible?page=1&size=10')
  assert.equal(requests[1].url, '/api/reviews/mine?page=0&size=10')
  assert.ok(requests.every((item) => item.token === 'Bearer review-token'))
})

test('후기 작성·사진 유지/제거/추가 수정·삭제를 실제 메서드와 multipart 형식으로 전달한다', async () => {
  requests.length = 0
  const file = new File(['image'], 'new.png', { type: 'image/png' })
  await reviews.createReview(7, ' 후기 ', [], 5)
  await reviews.createReview(7, ' 사진 후기 ', [{ file }], 4)
  await reviews.updateReview(8, ' 수정 ', [{ url: 'https://example.com/old.jpg' }, { file }], 3)
  await reviews.updateReview(8, ' 사진 제거 ', [])
  await reviews.deleteReview(8)
  assert.deepEqual(requests.map((request) => [request.method, request.url]), [
    ['POST', '/api/orders/items/7/review'], ['POST', '/api/orders/items/7/review'],
    ['PATCH', '/api/reviews/8'], ['PATCH', '/api/reviews/8'], ['DELETE', '/api/reviews/8'],
  ])
  assert.deepEqual(requests[0].data, { content: '후기', rating: 5 })
  assert.equal(requests[1].data.content, '사진 후기')
  assert.equal(requests[1].data.rating, '4')
  assert.deepEqual(requests[2].data.request, { content: '수정', rating: 3, retainedImageUrls: ['https://example.com/old.jpg'] })
  assert.deepEqual(requests[2].data.files, [{ name: 'new.png', type: 'image/png', size: 5 }])
  assert.deepEqual(requests[3].data.request.retainedImageUrls, [])
})
