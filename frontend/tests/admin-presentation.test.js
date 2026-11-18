import assert from 'node:assert/strict'
import { test } from 'node:test'
import { adminStatusTone } from '../src/utils/adminPresentation.js'

test('관리자 상태 색상은 표시 문구를 바꾸지 않고 숫자나 빈 셀도 처리한다', () => {
  for (const [label, tone] of [['판매 중', 'success'], ['결제 완료', 'success'], ['상품 준비 중', 'warning'], ['결제 실패', 'danger'], ['활성', 'success'], ['배송 완료', 'success'], ['답변 대기', 'warning'], ['비활성', 'danger'], ['해외 배송 중', 'info'], ['관리자', 'info'], ['일반 상품명', 'neutral'], [0, 'neutral'], [null, 'neutral']]) {
    assert.equal(adminStatusTone(label), tone)
  }
})
