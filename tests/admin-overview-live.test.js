import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chartIndex, dateOffset, dateRangeError, overviewSales, overviewTasks } from '../src/utils/adminOverview.js'

test('실제 실적은 서버 집계값을 보존하고 없는 비교 기간이나 환불금액을 만들지 않는다', () => {
  const result = overviewSales({ from: '2026-11-11', to: '2026-11-17', sales: '35000', orderCount: 12, newCustomers: 4, daily: [{ date: '2026-11-11', sales: '35000', orderCount: 12 }], statuses: [{ status: 'CANCELLED', count: 2 }, { status: '취소 완료', count: 1 }, { status: 'CANCEL_PENDING', count: 4 }] })
  assert.equal(result.sales, 35000)
  assert.equal(result.cancellations, 3)
  assert.deepEqual(result.previous, [])
  assert.deepEqual(result.current, [35000])
  assert.deepEqual(result.dates, ['2026-11-11'])
  assert.deepEqual(result.dailyOrders, [12])
})

test('직전 기간의 실제 날짜·판매액을 회색 비교선과 증감률에 사용한다', () => {
  const result = overviewSales({ from: '2026-11-17', to: '2026-11-17', sales: '35000', orderCount: 2, newCustomers: 0, daily: [{ date: '2026-11-17', sales: '35000', orderCount: 2 }], statuses: [], previous: { from: '2026-11-16', to: '2026-11-16', sales: '20000', daily: [{ date: '2026-11-16', sales: '20000', orderCount: 1 }] } })
  assert.equal(result.previousSales, 20000)
  assert.deepEqual(result.previous, [20000])
  assert.deepEqual(result.previousDates, ['2026-11-16'])
})

test('오늘은 일별 대신 자정부터 현재 시각까지의 시간별 집계와 전일 동시각 비교를 표시한다', () => {
  const result = overviewSales({ from: '2026-11-17', to: '2026-11-17', asOf: '2026-11-17T01:42:00', sales: '30000', orderCount: 2, newCustomers: 0, daily: [], hourly: [{time: '2026-11-17T00:00:00', sales: 0, orderCount: 0}, {time: '2026-11-17T01:00:00', sales: 30000, orderCount: 2}], statuses: [], previous: { sales: 20000, hourly: [{time: '2026-11-16T00:00:00', sales: 0, orderCount: 0}, {time: '2026-11-16T01:00:00', sales: 20000, orderCount: 1}] } })
  assert.deepEqual(result.labels, ['00시', '01시'])
  assert.deepEqual(result.current, [0, 30000])
  assert.deepEqual(result.previous, [0, 20000])
  assert.deepEqual(result.previousDates, ['2026-11-16 00:00', '2026-11-16 01:00'])
  assert.ok(result.range.includes('00:00–01:42'))
  assert.equal(result.compare, '어제 같은 시각')
})

test('직접 선택 기간은 양 끝 포함 31일까지이며 날짜 순서·미래·잘못된 날짜를 검사한다', () => {
  assert.equal(dateRangeError('2026-10-18', '2026-11-17', '2026-11-17'), '')
  assert.equal(dateRangeError('2026-11-17', '2026-11-17', '2026-11-17'), '')
  for (const [from, to] of [['2026-10-17', '2026-11-17'], ['2026-11-17', '2026-11-16'], ['', '2026-11-17'], ['2026-02-30', '2026-03-01'], ['2026-11-17', '2026-11-18']]) assert.ok(dateRangeError(from, to, '2026-11-17'))
  assert.equal(dateOffset('2024-03-01', -1), '2024-02-29')
  assert.equal(dateOffset('2026-01-01', -1), '2025-12-31')
})

test('주문과 미답변 업무는 실제 ID와 상태를 유지하며 상품 업무와 가짜 긴급 표시를 만들지 않는다', () => {
  const items = overviewTasks({ pendingInquiries: [{ id: 5, text: '배송 문의' }], unansweredReviews: [{ id: 8, text: '상품 후기' }] }, { PAID: { content: [{ orderId: 1, orderNumber: 'ORD-1', orderStatus: '결제 완료', totalAmount: 30000, createdAt: '2026-11-17T12:00:00' }] } })
  assert.deepEqual(items.map(item => [item.kind, item.itemId]), [['orders', 1], ['inquiries', 5], ['reviews', 8]])
  assert.equal(items[0].stage, 'PAID')
  assert.ok(items.every(item => !item.urgent))
  assert.deepEqual(overviewTasks(null, {}), [])
})

test('툴팁은 가까운 데이터 위치를 선택하고 양 끝과 데이터 0·1개를 처리한다', () => {
  assert.equal(chartIndex(100, 100, 600, 7), 0)
  assert.equal(chartIndex(400, 100, 600, 7), 3)
  assert.equal(chartIndex(900, 100, 600, 7), 6)
  assert.equal(chartIndex(-10, 100, 600, 7), 0)
  assert.equal(chartIndex(400, 100, 600, 1), 0)
  assert.equal(chartIndex(400, 100, 600, 0), null)
  assert.equal(chartIndex(400, 100, 0, 7), null)
})


test('업무 그리드는 주문 상태·주문자와 문의·후기 작성자·등록일을 실제 목록에서 분리한다', () => {
  const tasks = overviewTasks({ pendingInquiries: [{id:99,text:'old'}] }, { PAID: { content: [{orderId:1,orderNumber:'202611171117000001',orderStatus:'PAID',memberName:'주문 고객',createdAt:'2026-11-17T11:17:00'}] } }, { inquiries: {content:[{inquiryId:2,title:'배송 문의',memberName:'문의 고객',createdAt:'2026-11-17T10:20:00'}]}, reviews: {content:[{reviewId:3,content:'긴 상품 후기',memberName:'후기 고객',createdAt:'2026-11-17T09:15:00'}]} })
  assert.deepEqual(tasks.map(({itemId,reference,state,customer,age})=>[itemId,reference,state,customer,age]), [[1,'202611171117000001','결제 완료','주문 고객','2026-11-17 11:17'],[2,'2','답변 대기','문의 고객','2026-11-17 10:20'],[3,'3','답변 대기','후기 고객','2026-11-17 09:15']])
  assert.deepEqual(overviewTasks(null, {}, {inquiries:{content:[]},reviews:{content:[]}}), [])
})


test('주문 수량은 상품 종류 수가 아닌 서버 총수량이고 결제금액 0도 보존한다', () => {
  const tasks = overviewTasks(null, { PAID: { content: [
    { orderId: 1, orderStatus: 'PAID', totalQuantity: 7, totalAmount: 32000 },
    { orderId: 2, orderStatus: 'PAID', totalQuantity: 0, totalAmount: 0 },
    { orderId: 3, orderStatus: 'PAID' },
  ] } })
  assert.deepEqual(tasks.map(({ quantity, amount }) => [quantity, amount]), [[7, 32000], [0, 0], [undefined, undefined]])
})
