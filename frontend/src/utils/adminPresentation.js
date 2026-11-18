// 상태의 의미는 기존 표시 문구를 유지하고 관리자 화면의 색상만 결정한다.
export function adminStatusTone(label) {
  if (['결제 완료', '배송 완료', '배송완료', '판매 중', '사용', '활성', '답변 완료'].includes(label)) return 'success'
  if (['주문 접수', '주문접수', '배송 준비 중', '배송준비중', '상품 준비 중', '답변 대기', '결제 대기', '결제 승인 중', '취소 처리 중'].includes(label)) return 'warning'
  if (['판매 중지', '비활성', '품절', '주문 취소', '취소 완료', '결제 실패'].includes(label)) return 'danger'
  if ((typeof label === 'string' && label.includes('배송')) || label === '관리자') return 'info'
  return 'neutral'
}
