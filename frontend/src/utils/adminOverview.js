import { orderLabel, statusCode, orderStatuses } from './adminStatus.js'

// ISO 날짜는 UTC로만 계산해 브라우저의 시간대·서머타임에 따른 날짜 이동을 막는다.
export function dateOffset(date, days) {
  return new Date(Date.parse(date) + days * 86400000).toISOString().slice(0, 10)
}

export function dateRangeError(from, to, today) {
  const valid = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && dateOffset(value, 0) === value
  if (!valid(from) || !valid(to)) return '시작일과 종료일을 선택해 주세요.'
  if (from > to) return '종료일은 시작일 이후로 선택해 주세요.'
  if (to > today) return '오늘까지의 날짜만 조회할 수 있습니다.'
  if (Date.parse(to) - Date.parse(from) > 30 * 86400000) return '조회 기간은 시작일과 종료일을 포함해 최대 31일입니다.'
  return ''
}

export function overviewSales(report) {
  const hourly = Boolean(report.hourly?.length)
  const series = hourly ? report.hourly : report.daily
  const previous = (hourly ? report.previous?.hourly : report.previous?.daily) ?? []
  const date = point => hourly ? point.time.replace('T', ' ').slice(0, 16) : point.date
  return {
    range: hourly ? `${report.from} · 00:00–${report.asOf.slice(11, 16)} 기준` : `${report.from} – ${report.to}`,
    labels: series.map(day => hourly ? day.time.slice(11, 13) + '시' : day.date.slice(5).replace('-', '.')),
    dates: series.map(date),
    current: series.map(day => Number(day.sales)),
    previous: previous.map(day => Number(day.sales)),
    previousDates: previous.map(date),
    previousSales: report.previous ? Number(report.previous.sales) : 0,
    compare: hourly ? '어제 같은 시각' : '직전 동일 기간',
    dailyOrders: series.map(day => day.orderCount),
    orders: report.orderCount,
    customers: report.newCustomers,
    sales: Number(report.sales),
    cancellations: report.statuses.filter(item => statusCode(item.status, orderStatuses) === 'CANCELLED').reduce((sum, item) => sum + item.count, 0),
    unit: hourly ? '시간별 판매액' : '일별 판매액',
    hourly,
  }
}

export function overviewTasks(report, orderLists, replyLists = {}) {
  return [
    ...Object.values(orderLists).flatMap(list => list.content.map(order => ({
      id: `order-${order.orderId}`, itemId: order.orderId, kind: 'orders', label: '주문',
      title: `${orderLabel(order.orderStatus)} 주문`, reference: order.orderNumber, state: orderLabel(order.orderStatus), customer: order.memberName || '—',
      name: order.memberName || '주문자 정보 없음', age: order.createdAt?.replace('T', ' ').slice(0, 16) || '',
      description: '주문 상세에서 상품과 배송 정보를 확인하고 다음 단계를 처리하세요.',
      detail: order.orderNumber, amount: order.totalAmount, quantity: order.totalQuantity, stage: statusCode(order.orderStatus, orderStatuses),
    }))),
    ...(replyLists.inquiries?.content ?? report?.pendingInquiries ?? []).map(item => ({ id: `inquiry-${item.inquiryId ?? item.id}`, itemId: item.inquiryId ?? item.id, kind: 'inquiries', label: '고객 문의', title: item.title ?? item.text, reference: String(item.inquiryId ?? item.id), customer: item.memberName || '—', age: item.createdAt?.replace('T', ' ').slice(0, 16), state: '답변 대기', name: '답변 대기', description: item.title ?? item.text, detail: '문의 내용을 확인하고 답변을 작성하세요.' })),
    ...(replyLists.reviews?.content ?? report?.unansweredReviews ?? []).map(item => ({ id: `review-${item.reviewId ?? item.id}`, itemId: item.reviewId ?? item.id, kind: 'reviews', label: '후기', sentiment: item.sentiment ?? null, title: item.content ?? item.text, reference: String(item.reviewId ?? item.id), customer: item.memberName || '—', age: item.createdAt?.replace('T', ' ').slice(0, 16), state: '답변 대기', name: '답변 대기', description: item.content ?? item.text, detail: '상품 후기를 확인하고 답변을 작성하세요.' })),
  ]
}

export function chartIndex(clientX, left, width, count) {
  if (count < 1 || width <= 0) return null
  return Math.max(0, Math.min(count - 1, Math.round((clientX - left) / width * (count - 1))))
}
