// 화면 개발용 가상 데이터. DB의 상품 / SKU 구분을 유지한다.
export { categories } from '../data/categories.js'

export const products = [
  { product_id: '101', category_id: '79', name: '말차 웨하스', brand: '오이시담 샘플', description: '화면 개발용 가상 상품입니다.', sale_status: 'ON_SALE', published_at: '2026-11-01T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1001', sku_code: 'DEMO-MATCHA-10', variant_name: '말차 / 10개입', option_values: { 맛: '말차', 수량: '10개입' }, price: 4500, stock_quantity: 20, is_active: true },
    { variant_id: '1002', sku_code: 'DEMO-MATCHA-20', variant_name: '말차 / 20개입', option_values: { 맛: '말차', 수량: '20개입' }, price: 8000, stock_quantity: 0, is_active: true },
  ] },
  { product_id: '102', category_id: '89', name: '딸기 초콜릿', brand: '오이시담 샘플', description: '품절 표시를 확인하는 가상 상품입니다.', sale_status: 'ON_SALE', published_at: '2026-11-02T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1003', sku_code: 'DEMO-STRAWBERRY', variant_name: '기본', option_values: {}, price: 3800, stock_quantity: 0, is_active: true },
  ] },
  { product_id: '103', category_id: '81', name: '복숭아 탄산음료', brand: '오이시담 샘플', description: '화면 개발용 가상 상품입니다.', sale_status: 'ON_SALE', published_at: '2026-11-03T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1004', sku_code: 'DEMO-PEACH', variant_name: '기본', option_values: {}, price: 2500, stock_quantity: 35, is_active: true },
  ] },
  { product_id: '104', category_id: '80', name: '버터 쿠키 12개입', brand: '오이시담 샘플', description: '화면 개발용 가상 상품입니다.', sale_status: 'ON_SALE', published_at: '2026-11-04T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1005', sku_code: 'DEMO-BUTTER', variant_name: '기본', option_values: {}, price: 6200, stock_quantity: 18, is_active: true },
  ] },
  { product_id: '105', category_id: '89', name: '호지차 크림 초콜릿', brand: '오이시담 샘플', description: '화면 개발용 가상 상품입니다.', sale_status: 'ON_SALE', published_at: '2026-11-05T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1006', sku_code: 'DEMO-HOJICHA', variant_name: '기본', option_values: {}, price: 5400, stock_quantity: 22, is_active: true },
  ] },
  { product_id: '106', category_id: '79', name: '단팥 도라야키 5개입', brand: '오이시담 샘플', description: '화면 개발용 가상 상품입니다.', sale_status: 'ON_SALE', published_at: '2026-11-06T03:00:00Z', deleted_at: null, images: [], variants: [
    { variant_id: '1007', sku_code: 'DEMO-DORAYAKI', variant_name: '기본', option_values: {}, price: 8900, stock_quantity: 15, is_active: true },
  ] },
]

// AI 연동 전의 기본 추천 순서. 실제 개인화 추천으로 표시하지 않는다.
export const recommendedProductIds = ['101', '102', '103']
