const examples = [
  { id: 'Q-261112-0034', title: '주문한 상품의 배송 일정이 궁금합니다.', date: '2026.11.12 10:20', content: '주문한 상품은 언제 발송되나요?' },
  { id: 'Q-261109-0021', title: '상품 옵션 변경이 가능한가요?', date: '2026.11.09 15:40', content: '주문 상품의 옵션을 변경하고 싶어요.', answer: '출고 상태에 따라 변경 가능 여부가 달라집니다.' },
  { id: 'Q-261105-0019', title: '상품 재입고 일정 문의드립니다.', date: '2026.11.05 11:18', content: '품절 상품의 입고 일정이 궁금합니다.', answer: '재입고 일정이 확정되면 상품 페이지에서 확인하실 수 있습니다.' },
  { id: 'Q-261103-0008', title: '배송지를 변경하고 싶어요.', date: '2026.11.03 13:35', content: '발송 전 배송지를 변경할 수 있나요?', answer: '상품이 발송되기 전이라면 배송지 변경 가능 여부를 확인해 드릴 수 있습니다.' },
]

const inquiriesByOwner = new Map()

export function getExampleInquiries(owner) {
  if (!inquiriesByOwner.has(owner)) {
    inquiriesByOwner.set(owner, examples.map((item) => ({ ...item })))
  }
  return inquiriesByOwner.get(owner)
}
