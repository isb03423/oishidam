import { products } from './catalog.js'
import { getMockCustomerJoinDates } from './auth.js'
import { getExampleInquiries } from './inquiries.js'
import { getExampleOrders } from './orders.js'
import { productReviews } from './productDetails.js'

const customers = ['김지연', '박수빈', '이민서', '정하늘', '최유진']
const sampleRows = [
  ['0042', '20:16', '배송중', 16200],
  ['0041', '19:48', '배송준비중', 29700],
  ['0040', '18:27', '배송완료', 9900],
  ['0039', '17:55', '배송완료', 24500],
  ['0038', '16:20', '주문접수', 13800],
]

export function getAdminDashboard(today) {
  const sampleOrders = sampleRows.map(([serial, time, status, total], index) => {
    const day = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(today)
    const date = new Date(day + 'T' + time + ':00+09:00')
    return { id: 'ORD-251114-' + serial, date, status, total, customer: customers[index] }
  })
  const existingOrders = getExampleOrders(today).map((order) => ({ ...order, customer: '—' }))
  const stockAlerts = products.filter((product) => product.variants.some((variant) =>
    variant.is_active && variant.stock_quantity <= 5,
  )).map((product) => product.name)
  const pendingInquiries = getExampleInquiries('admin-dashboard').filter((inquiry) => !inquiry.answer)
  const unansweredReviews = Object.values(productReviews).flat().filter((review) => !review.reply)
  return { orders: [...sampleOrders, ...existingOrders], stockAlerts, pendingInquiries, unansweredReviews, customerJoinDates: getMockCustomerJoinDates() }
}
