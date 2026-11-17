export const orderStatuses = [
  ['PAYMENT_PENDING', '결제 대기'], ['PAYMENT_CONFIRMING', '결제 승인 중'], ['PAYMENT_FAILED', '결제 실패'],
  ['PAID', '결제 완료'], ['PREPARING', '상품 준비 중'], ['INTERNATIONAL_SHIPPING', '해외 배송 중'],
  ['CUSTOMS_CLEARANCE', '통관 중'], ['DOMESTIC_SHIPPING', '국내 배송 중'], ['DELIVERED', '배송 완료'],
  ['CANCEL_PENDING', '취소 처리 중'], ['CANCELLED', '취소 완료'],
]
export const saleStatuses = [['DRAFT', '판매 준비'], ['ON_SALE', '판매 중'], ['STOPPED', '판매 중지']]
export const statusCode = (value, options) => options.find(([code, label]) => value === code || value === label)?.[0] ?? value
export const orderLabel = (value) => orderStatuses.find(([code, label]) => value === code || value === label)?.[1] ?? value

export function nextOrderStatus(value) {
  const sequence = ['PAID', 'PREPARING', 'INTERNATIONAL_SHIPPING', 'CUSTOMS_CLEARANCE', 'DOMESTIC_SHIPPING', 'DELIVERED']
  const index = sequence.indexOf(statusCode(value, orderStatuses))
  return index >= 0 ? sequence[index + 1] : undefined
}
