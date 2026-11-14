// 화면 개발용 가상 데이터. DB의 상품 / SKU 구분을 유지한다.
export { categories } from '../data/categories.js'

export const products = [
  { product_id: '101', category_id: '79', name: '말차 웨하스', brand: '오이시담 샘플', summary: '말차의 은은한 쌉쌀함과 바삭한 웨하스를 함께 즐겨보세요.', description: '얇게 겹친 웨하스 사이에 말차 크림을 넣어 바삭한 식감과 은은한 차 향이 어우러집니다. 따뜻한 우유나 차에 곁들이기 좋은 간식입니다.', sale_status: 'ON_SALE', published_at: '2026-11-01T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1001', sku_code: 'DEMO-MATCHA-10', variant_name: '말차 / 10개입', option_values: { 맛: '말차', 수량: '10개입' }, price: 4500, stock_quantity: 20, is_active: true },
    { variant_id: '1002', sku_code: 'DEMO-MATCHA-20', variant_name: '말차 / 20개입', option_values: { 맛: '말차', 수량: '20개입' }, price: 8000, stock_quantity: 0, is_active: true },
  ] },
  { product_id: '102', category_id: '89', name: '딸기 초콜릿', brand: '오이시담 샘플', summary: '딸기 향이 은은하게 퍼지는 한입 초콜릿입니다.', description: '한입 크기의 초콜릿에 딸기의 달콤하고 산뜻한 맛을 더했습니다. 커피를 마실 때 가볍게 곁들이기 좋습니다.', sale_status: 'ON_SALE', published_at: '2026-11-02T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1003', sku_code: 'DEMO-STRAWBERRY', variant_name: '기본', option_values: {}, price: 3800, stock_quantity: 0, is_active: true },
  ] },
  { product_id: '103', category_id: '81', name: '복숭아 탄산음료', brand: '오이시담 샘플', summary: '복숭아 향과 톡 쏘는 탄산을 담았어요.', description: '복숭아의 달콤한 향 뒤로 탄산의 청량감이 느껴집니다. 차갑게 보관했다가 마시거나 얼음을 채운 잔에 따라 즐겨보세요.', sale_status: 'ON_SALE', published_at: '2026-11-03T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1004', sku_code: 'DEMO-PEACH', variant_name: '기본', option_values: {}, price: 2500, stock_quantity: 35, is_active: true },
  ] },
  { product_id: '104', category_id: '80', name: '버터 쿠키 12개입', brand: '오이시담 샘플', summary: '고소한 버터 향을 담은 바삭한 쿠키예요.', description: '바삭하게 구운 버터 쿠키가 12개 들어 있습니다. 담백하고 고소한 맛이라 커피나 홍차와 잘 어울립니다.', sale_status: 'ON_SALE', published_at: '2026-11-04T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1005', sku_code: 'DEMO-BUTTER', variant_name: '기본', option_values: {}, price: 6200, stock_quantity: 18, is_active: true },
  ] },
  { product_id: '105', category_id: '89', name: '호지차 크림 초콜릿', brand: '오이시담 샘플', summary: '구운 차의 고소한 향을 담은 크림 초콜릿입니다.', description: '부드러운 초콜릿과 호지차 크림을 함께 맛볼 수 있습니다. 볶은 차의 향이 은은하게 남아 따뜻한 차에 곁들이기 좋습니다.', sale_status: 'ON_SALE', published_at: '2026-11-05T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1006', sku_code: 'DEMO-HOJICHA', variant_name: '기본', option_values: {}, price: 5400, stock_quantity: 22, is_active: true },
  ] },
  { product_id: '106', category_id: '79', name: '단팥 도라야키 5개입', brand: '오이시담 샘플', summary: '폭신한 빵 사이에 달콤한 단팥을 채웠어요.', description: '부드럽게 구운 빵 사이에 단팥을 넣은 일본식 간식입니다. 한 팩에 5개가 들어 있어 나누어 먹기 좋고, 따뜻한 녹차와 잘 어울립니다.', sale_status: 'ON_SALE', published_at: '2026-11-06T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1007', sku_code: 'DEMO-DORAYAKI', variant_name: '기본', option_values: {}, price: 8900, stock_quantity: 15, is_active: true },
  ] },
]

// AI 연동 전의 기본 추천 순서. 실제 개인화 추천으로 표시하지 않는다.
export const recommendedProductIds = ['101', '102', '103']
