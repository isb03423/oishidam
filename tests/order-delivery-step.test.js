import assert from 'node:assert/strict'
import { test } from 'node:test'
import { orderDeliveryStep } from '../src/utils/orderDeliveryStep.js'

test('결제·준비·배송·완료 상태에 따라 배송 단계를 표시한다', () => {
  for (const [code, label, step] of [
    ['PAID', '결제 완료', 0], ['PREPARING', '상품 준비 중', 1],
    ['INTERNATIONAL_SHIPPING', '해외 배송 중', 2], ['CUSTOMS_CLEARANCE', '통관 중', 2],
    ['DOMESTIC_SHIPPING', '국내 배송 중', 2], ['DELIVERED', '배송 완료', 3],
  ]) {
    assert.equal(orderDeliveryStep(code), step)
    assert.equal(orderDeliveryStep(label), step)
  }
  for (const status of ['PAYMENT_FAILED', '취소 완료', '취소 처리 중', undefined]) assert.equal(orderDeliveryStep(status), -1)
})
