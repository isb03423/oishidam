// 대시보드 화면 검토용 예시 데이터. 실제 주문이나 매출과 연결하지 않는다.
export const overviewPeriods = [
  { key: 'today', label: '오늘', range: '2026.11.17', compare: '전일 같은 시간', unit: '시간별 결제금액', labels: Array.from({ length: 15 }, (_, hour) => String(hour).padStart(2, '0') + '시'), current: [...Array(9).fill(0), 320000, 580000, 890000, 735000, 680000, 640000], previous: [...Array(9).fill(0), 290000, 460000, 710000, 680000, 590000, 690000], orders: 87, customers: 16, cancellations: 4 },
  { key: 'week', label: '최근 7일', range: '2026.11.11 – 11.17', compare: '이전 7일', unit: '일별 결제금액', labels: ['11.11', '11.12', '11.13', '11.14', '11.15', '11.16', '11.17'], current: [2540000, 3180000, 2820000, 4120000, 3650000, 4670000, 3845000], previous: [2310000, 2670000, 3110000, 2980000, 3240000, 3890000, 3420000], orders: 624, customers: 118, cancellations: 19 },
  { key: 'month', label: '최근 30일', range: '2026.10.19 – 11.17', compare: '이전 30일', unit: '일별 결제금액', labels: Array.from({ length: 30 }, (_, i) => i < 13 ? `10.${19 + i}` : `11.${String(i - 12).padStart(2, '0')}`), current: [214, 248, 196, 288, 340, 315, 246, 268, 321, 294, 367, 320, 279, 314, 358, 295, 346, 411, 380, 328, 387, 356, 371, 254, 318, 282, 412, 365, 467, 384.5].map(value => value * 10000), previous: [187, 215, 238, 221, 276, 284, 250, 231, 270, 248, 303, 290, 265, 280, 301, 272, 300, 351, 323, 298, 325, 310, 289, 231, 267, 311, 298, 324, 389, 342].map(value => value * 10000), orders: 2473, customers: 436, cancellations: 63 },
]

export const fulfillmentStages = [
  { key: 'PAID', label: '결제 완료', count: 18, hint: '상품 준비 대기' },
  { key: 'PREPARING', label: '상품 준비', count: 26, hint: '출고 확인 필요' },
  { key: 'INTERNATIONAL_SHIPPING', label: '해외 배송', count: 32, hint: '국내 도착 대기' },
  { key: 'CUSTOMS_CLEARANCE', label: '통관 진행', count: 9, hint: '통관 상태 확인' },
  { key: 'DOMESTIC_SHIPPING', label: '국내 배송', count: 17, hint: '고객 배송 중' },
]

export const priorityTasks = [
  { id: 'order-1', kind: 'orders', label: '주문', title: '출고 대기 주문을 확인해 주세요', reference: 'OD-261116-0082', name: '김민서', age: '1일 3시간', urgent: true, description: '결제 후 24시간이 지난 주문입니다. 입고 및 출고 가능 여부를 확인해 주세요.', detail: '부르봉 알포트 밀크 초콜릿 외 2개 상품', amount: 32400, quantity: 3, stage: 'PAID' },
  { id: 'inquiry-1', kind: 'inquiries', label: '고객 문의', title: '배송 예정일 문의', reference: '문의 #1024', name: '박서연', age: '3시간 전', urgent: true, description: '주문한 상품의 국내 도착 예정일과 배송 일정을 문의한 고객입니다.', detail: '주문번호 OD-261115-0058의 배송 일정을 알려주세요.' },
  { id: 'order-2', kind: 'orders', label: '주문', title: '상품 준비 중인 주문', reference: 'OD-261117-0017', name: '이지훈', age: '1시간 전', urgent: false, description: '포장과 출고 준비 상태를 확인할 주문입니다.', detail: '가루비 자가리코 샐러드 외 1개 상품', amount: 21800, quantity: 2, stage: 'PREPARING' },
  { id: 'inquiry-2', kind: 'inquiries', label: '고객 문의', title: '상품 유통기한 문의', reference: '문의 #1025', name: '최유진', age: '48분 전', urgent: false, description: '고객이 구매 전 상품의 유통기한을 문의했습니다.', detail: '로이스 감자칩 초콜릿의 유통기한을 알고 싶습니다.' },
  { id: 'review-1', kind: 'reviews', label: '후기', title: '포장 상태에 대한 후기 답변 대기', reference: '후기 #208', name: '이서진', age: '2시간 전', urgent: false, description: '고객이 남긴 포장 상태에 대한 후기를 확인하고 답변해 주세요.', detail: '메이지 마카다미아 초콜릿 / 포장은 잘 되어 있었는데 상자 한쪽이 찌그러져 있었습니다.' },
  { id: 'review-2', kind: 'reviews', label: '후기', title: '재구매 후기 답변 대기', reference: '후기 #209', name: '윤지우', age: '30분 전', urgent: false, description: '재구매 고객의 상품 후기를 확인하고 답변해 주세요.', detail: '부르봉 알포트 밀크 초콜릿 / 지난번에 맛있게 먹어서 다시 주문했습니다.' },
  { id: 'order-3', kind: 'orders', label: '주문', title: '통관 진행 상태 확인', reference: 'OD-261114-0039', name: '정하늘', age: '36분 전', urgent: false, description: '통관 중인 주문의 진행 상태를 확인해 주세요.', detail: '메이지 마카다미아 초콜릿 외 3개 상품', amount: 56700, quantity: 4, stage: 'CUSTOMS_CLEARANCE' },
  { id: 'order-4', kind: 'orders', label: '주문', title: '국내 배송 상태 확인', reference: 'OD-261113-0021', name: '한도윤', age: '12분 전', urgent: false, description: '국내 배송 중인 주문의 배송 현황을 확인할 수 있습니다.', detail: 'UHA 코로로 청포도 젤리 외 1개 상품', amount: 14200, quantity: 2, stage: 'DOMESTIC_SHIPPING' },
]

export const stockWatch = [
  { sku: 'SN-0118', name: '가루비 자가리코 치즈', category: '스낵·과자', quantity: 0 },
  { sku: 'RM-0204', name: '닛신 돈베이 키츠네 우동', category: '면·간편식', quantity: 2 },
  { sku: 'CH-0086', name: '메이지 마카다미아 초콜릿', category: '초콜릿', quantity: 4 },
]
