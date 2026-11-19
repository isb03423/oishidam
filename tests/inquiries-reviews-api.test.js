import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'

const requests = []
let reviewRating
const backend = createHttpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  requests.push({ method: req.method, url: req.url, token: req.headers.authorization, body: chunks.length ? JSON.parse(Buffer.concat(chunks)) : null })
  res.writeHead(req.url === '/api/inquiries/99' ? 404 : 200, { 'Content-Type': 'application/json' })
  const data = req.url.endsWith('/reviews/summary') ? { reviewCount: 21, ratingCount: 12, averageRating: 4.25 } : req.url.includes('/reviews?')
    ? { content: [{ reviewId: 4, content: '구매 후기', rating: reviewRating, imageUrls: ['https://example.com/review.jpg'], createdAt: '2026-11-16T12:00:00', answerContent: '감사합니다.' }], totalElements: 21, totalPages: 3 }
    : req.url.includes('/mine?') ? { content: [{ inquiryId: 7, status: 'OPEN' }], totalElements: 11, totalPages: 2 }
      : { inquiryId: 7, messages: [{ messageId: 1, senderMemberId: 1, content: '문의 내용' }] }
  res.end(JSON.stringify(req.url === '/api/inquiries/99' ? { code: 'INQUIRY_NOT_FOUND', message: '문의를 찾을 수 없습니다.' } : { data }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const session = await vite.ssrLoadModule('/src/stores/session.js')
const inquiries = await vite.ssrLoadModule('/src/services/inquiries.js')
const reviews = await vite.ssrLoadModule('/src/services/reviews.js')

test('내 문의는 회원 인증과 상태·페이지 조건으로 조회하고 작성·삭제를 서버에 요청한다', async () => {
  session.setSession({ member_id: '1', name: '회원', role: 'USER' }, { tokens: { accessToken: 'test-token' } })
  assert.equal((await inquiries.getMyInquiries(1, { status: 'OPEN' })).totalElements, 11)
  assert.equal((await inquiries.getInquiry(7)).messages[0].content, '문의 내용')
  await inquiries.createInquiry({ title: ' 배송 문의 ', content: ' 문의 내용 ' })
  await inquiries.deleteInquiry(7)
  assert.deepEqual(requests.map(({ method, url, token }) => [method, url, token]), [
    ['GET', '/api/inquiries/mine?page=1&size=10&status=OPEN', 'Bearer test-token'],
    ['GET', '/api/inquiries/7', 'Bearer test-token'],
    ['POST', '/api/inquiries', 'Bearer test-token'],
    ['DELETE', '/api/inquiries/7', 'Bearer test-token'],
  ])
  assert.deepEqual(requests[2].body, { title: '배송 문의', content: '문의 내용' })
  await assert.rejects(inquiries.getInquiry(99), (error) => error.status === 404 && error.code === 'INQUIRY_NOT_FOUND')
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(inquiries.getInquiry(7, { signal: controller.signal }))
})

test('상품 리뷰는 비로그인 상태에서도 페이지·사진·관리자 답변을 조회하며 없는 별점을 만들지 않는다', async () => {
  session.clearSession()
  const result = await reviews.getProductReviews(42, 1)
  assert.equal(result.totalElements, 21)
  assert.equal(result.totalPages, 3)
  assert.deepEqual(result.content[0], {
    id: '4', content: '구매 후기', date: '2026-11-16', images: [{ url: 'https://example.com/review.jpg' }], reply: '감사합니다.',
  })
  assert.equal(Object.hasOwn(result.content[0], 'rating'), false)
  assert.equal(requests.at(-1).url, '/api/products/42/reviews?page=1&size=10')
  assert.equal(requests.at(-1).token, undefined)
})

test('상품 별점과 전체 평균·평가 수를 공개 API에서 받아 미평가와 구분한다', async () => {
  reviewRating = 3
  assert.equal((await reviews.getProductReviews(42)).content[0].rating, 3)
  const summary = await reviews.getProductReviewSummary(42)
  assert.deepEqual(summary, { reviewCount: 21, ratingCount: 12, averageRating: 4.25 })
  assert.equal(requests.at(-1).url, '/api/products/42/reviews/summary')
  assert.equal(requests.at(-1).token, undefined)
  reviewRating = null
  assert.equal(Object.hasOwn((await reviews.getProductReviews(42)).content[0], 'rating'), false)
})
