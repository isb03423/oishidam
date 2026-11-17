export function orderDeliveryStep(status) {
  return {
    PAID: 0, '결제 완료': 0,
    PREPARING: 1, '상품 준비 중': 1,
    INTERNATIONAL_SHIPPING: 2, '해외 배송 중': 2,
    CUSTOMS_CLEARANCE: 2, '통관 중': 2,
    DOMESTIC_SHIPPING: 2, '국내 배송 중': 2, 배송중: 2,
    DELIVERED: 3, '배송 완료': 3, 배송완료: 3,
  }[status] ?? -1
}
