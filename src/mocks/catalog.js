// oishidam-full-20261113-184521.sql의 상품, 상품 이미지, 상품 옵션 스냅샷.
export { categories } from '../data/categories.js'

// 품절 임박 테스트용으로 상품 2728, 2729, 2730의 mock 재고를 조정했다.
export const products = [
  {
    "product_id": "1382", "category_id": "88", "name": "★인기★ 오리히로 곤약젤리 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:02.591074", "deleted_at": null,
    images: [{"product_image_id": "1366", "url": "https://ik.imagekit.io/oishidam/products/80ed29ac-f179-4ae8-9b01-f50d46e9bac8_UA6zro17L.webp", "alt_text": "★인기★ 오리히로 곤약젤리 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1368", "sku_code": "NPPIP-DEMO-1669691489", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1383", "category_id": "87", "name": "아사히 민티아 사탕 50정 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:09.963536", "deleted_at": null,
    images: [{"product_image_id": "1368", "url": "https://ik.imagekit.io/oishidam/products/b92472de-8df9-4d8b-b5f3-46fc262f4cac_p9iI7T-rO.webp", "alt_text": "아사히 민티아 사탕 50정 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1369", "sku_code": "NPPIP-DEMO-1658975496", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1384", "category_id": "79", "name": "가루비 자가리코 쟈가리코 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:10.199606", "deleted_at": null,
    images: [{"product_image_id": "1370", "url": "https://ik.imagekit.io/oishidam/products/a902ae64-b820-48d5-8994-c2f904426003_SSW5gd723.webp", "alt_text": "가루비 자가리코 쟈가리코 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1370", "sku_code": "NPPIP-DEMO-1747977924", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1385", "category_id": "93", "name": "마루미야 노리타마 후리카케 뉴팩 15종 모음", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:09.744757", "deleted_at": null,
    images: [{"product_image_id": "1367", "url": "https://ik.imagekit.io/oishidam/products/f9b96cf3-235c-4ad7-954b-4b13db83b3fc_sirvwgfm0.webp", "alt_text": "마루미야 노리타마 후리카케 뉴팩 15종 모음", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1371", "sku_code": "NPPIP-DEMO-1656061114", "variant_name": "기본", "option_values": {}, "price": 1800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1386", "category_id": "72", "name": "닛신 돈베이 키츠네우동 돈베이 우동 95g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:10.164437", "deleted_at": null,
    images: [{"product_image_id": "1369", "url": "https://ik.imagekit.io/oishidam/products/55c11c9c-4114-48c2-a11a-8bd627af4ed4_Il52ZR_-J.webp", "alt_text": "닛신 돈베이 키츠네우동 돈베이 우동 95g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1372", "sku_code": "NPPIP-DEMO-1602745321", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1387", "category_id": "87", "name": "고바야시 브레스케어 모음 24종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:11.699061", "deleted_at": null,
    images: [{"product_image_id": "1371", "url": "https://ik.imagekit.io/oishidam/products/d9412407-bcf3-49a8-9cde-33c3c6a64c86_gYyhvOiRc.webp", "alt_text": "고바야시 브레스케어 모음 24종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1373", "sku_code": "NPPIP-DEMO-1689817527", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1388", "category_id": "89", "name": "부르봉 알포트 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:11.920629", "deleted_at": null,
    images: [{"product_image_id": "1372", "url": "https://ik.imagekit.io/oishidam/products/55f7244d-a2d5-490e-b0bd-767fd19777b7_PSWmqnZvt.webp", "alt_text": "부르봉 알포트 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1374", "sku_code": "NPPIP-DEMO-1711350350", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1389", "category_id": "66", "name": "세븐일레븐 바삭한 이카후라이 오징어튀김 안주 과자 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:12.279751", "deleted_at": null,
    images: [{"product_image_id": "1374", "url": "https://ik.imagekit.io/oishidam/products/023131f9-faf9-4d4c-aa91-fbeeb0995ba0_60vQsscer.webp", "alt_text": "세븐일레븐 바삭한 이카후라이 오징어튀김 안주 과자 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1375", "sku_code": "NPPIP-DEMO-1634782555", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1390", "category_id": "91", "name": "글리코 한 입 크기 푸칭푸딩 카스터드맛 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:12.159253", "deleted_at": null,
    images: [{"product_image_id": "1373", "url": "https://ik.imagekit.io/oishidam/products/c9f9da85-6bf3-4e07-8807-b72345b0d524_Ka88W7Ibw.webp", "alt_text": "글리코 한 입 크기 푸칭푸딩 카스터드맛 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1376", "sku_code": "NPPIP-DEMO-1655451056", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1391", "category_id": "87", "name": "아사히 민티아 브리즈 30정 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:13.398766", "deleted_at": null,
    images: [{"product_image_id": "1375", "url": "https://ik.imagekit.io/oishidam/products/05082bbc-acfe-49e9-b197-4bdeb4ebc3b6_S1A5kdrAu.webp", "alt_text": "아사히 민티아 브리즈 30정 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1377", "sku_code": "NPPIP-DEMO-1649900304", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1392", "category_id": "89", "name": "메이지 나마노토키 촉촉한 밀크 초콜릿 4개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:13.892265", "deleted_at": null,
    images: [{"product_image_id": "1376", "url": "https://ik.imagekit.io/oishidam/products/14adc4d2-fda8-41fa-8d90-449bd093ce04_d46b3Q7Dn.webp", "alt_text": "메이지 나마노토키 촉촉한 밀크 초콜릿 4개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1378", "sku_code": "NPPIP-DEMO-1768455759", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1393", "category_id": "72", "name": "닛신 돈베이 라면 모음전 - 돈베이 3개 세트(맛 선택)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:14.106545", "deleted_at": null,
    images: [{"product_image_id": "1378", "url": "https://ik.imagekit.io/oishidam/products/0c5aab90-04df-4850-ab81-4305d41664ef_fJq9f49Pp.webp", "alt_text": "닛신 돈베이 라면 모음전 - 돈베이 3개 세트(맛 선택)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1379", "sku_code": "NPPIP-DEMO-1647844248", "variant_name": "기본", "option_values": {}, "price": 8900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1394", "category_id": "89", "name": "롯데 샤샤 초콜릿 69g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:14.011988", "deleted_at": null,
    images: [{"product_image_id": "1377", "url": "https://ik.imagekit.io/oishidam/products/44176a3c-34be-4a61-8d2e-ec7ce07ab34a___Z2q9wOTK.webp", "alt_text": "롯데 샤샤 초콜릿 69g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1380", "sku_code": "NPPIP-DEMO-1625733512", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1395", "category_id": "82", "name": "AGF blendy 블랜디 블렌디 액상 포션 커피 모음", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:15.41166", "deleted_at": null,
    images: [{"product_image_id": "1379", "url": "https://ik.imagekit.io/oishidam/products/e93e97e9-1405-4691-a825-a30f15e4f973_4KxiEtJ_D.webp", "alt_text": "AGF blendy 블랜디 블렌디 액상 포션 커피 모음", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1381", "sku_code": "NPPIP-DEMO-1655451901", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1396", "category_id": "93", "name": "★인기★ 나가타니엔 오차즈케 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:15.77712", "deleted_at": null,
    images: [{"product_image_id": "1380", "url": "https://ik.imagekit.io/oishidam/products/e0061d35-f012-41d9-9093-a18775108c07_9b56meSf1.webp", "alt_text": "★인기★ 나가타니엔 오차즈케 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1382", "sku_code": "NPPIP-DEMO-1656925809", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1397", "category_id": "94", "name": "모모야 라유 고추기름 4종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:15.865946", "deleted_at": null,
    images: [{"product_image_id": "1381", "url": "https://ik.imagekit.io/oishidam/products/a4207b97-3e72-49a2-9509-91b461b70ac2_hb1pGSqgs.webp", "alt_text": "모모야 라유 고추기름 4종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1383", "sku_code": "NPPIP-DEMO-1745471038", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1398", "category_id": "79", "name": "훈와리메이진 쌀과자 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:16.023223", "deleted_at": null,
    images: [{"product_image_id": "1382", "url": "https://ik.imagekit.io/oishidam/products/dffcba23-4122-4cff-b546-3de5bd8c689e_9khsRZpYo-.webp", "alt_text": "훈와리메이진 쌀과자 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1384", "sku_code": "NPPIP-DEMO-1649900355", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1399", "category_id": "87", "name": "모리나가 하이츄 소프트 츄잉 캔디 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:17.171546", "deleted_at": null,
    images: [{"product_image_id": "1383", "url": "https://ik.imagekit.io/oishidam/products/73301c15-1008-4504-98e9-6eee7d63e928_gHB6QllGU.webp", "alt_text": "모리나가 하이츄 소프트 츄잉 캔디 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1385", "sku_code": "NPPIP-DEMO-1747378379", "variant_name": "기본", "option_values": {}, "price": 2250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1400", "category_id": "72", "name": "ISDG 중화방 매콤한 컵 마라탕 88g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:17.698441", "deleted_at": null,
    images: [{"product_image_id": "1384", "url": "https://ik.imagekit.io/oishidam/products/bca01dee-2070-44df-862a-d356125f3334_4CWsY0cN1.webp", "alt_text": "ISDG 중화방 매콤한 컵 마라탕 88g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1386", "sku_code": "NPPIP-DEMO-1766107193", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1401", "category_id": "66", "name": "세븐일레븐 몽고탄멘 나카모토 매운맛 된장 컵라면122g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:17.793021", "deleted_at": null,
    images: [{"product_image_id": "1385", "url": "https://ik.imagekit.io/oishidam/products/c7309629-c320-477e-b9d9-a68ec03fa9dd_0hDYD2FnDd.webp", "alt_text": "세븐일레븐 몽고탄멘 나카모토 매운맛 된장 컵라면122g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1387", "sku_code": "NPPIP-DEMO-1622787471", "variant_name": "기본", "option_values": {}, "price": 4350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1402", "category_id": "79", "name": "부르봉 파키라 초코 과자 6봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:17.882062", "deleted_at": null,
    images: [{"product_image_id": "1386", "url": "https://ik.imagekit.io/oishidam/products/fc883058-cd52-4929-8449-a024a35e29f5_gQ_ivH-IJ.webp", "alt_text": "부르봉 파키라 초코 과자 6봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1388", "sku_code": "NPPIP-DEMO-1742256690", "variant_name": "기본", "option_values": {}, "price": 2850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1403", "category_id": "94", "name": "쿠라콘 시오콘부 염장다시마 (130g/500g)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:19.051114", "deleted_at": null,
    images: [{"product_image_id": "1387", "url": "https://ik.imagekit.io/oishidam/products/2daa0bb4-4de9-4162-8830-9e8a046dfb4e_qL6W1F4KG.webp", "alt_text": "쿠라콘 시오콘부 염장다시마 (130g/500g)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1389", "sku_code": "NPPIP-DEMO-1748224850", "variant_name": "기본", "option_values": {}, "price": 8800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1404", "category_id": "72", "name": "닛신 야끼소바 UFO 128g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:19.668148", "deleted_at": null,
    images: [{"product_image_id": "1388", "url": "https://ik.imagekit.io/oishidam/products/b9cbd680-f128-4638-a23c-e5f51c4cf656_oWHYr6x1A.webp", "alt_text": "닛신 야끼소바 UFO 128g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1390", "sku_code": "NPPIP-DEMO-1564119638", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1405", "category_id": "79", "name": "가루비 갓파에비센 77g 일본 새우깡과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:19.718984", "deleted_at": null,
    images: [{"product_image_id": "1389", "url": "https://ik.imagekit.io/oishidam/products/e33eeaa9-5b14-4478-ad0c-0c7b90b30247_fsycLmnVs.webp", "alt_text": "가루비 갓파에비센 77g 일본 새우깡과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1391", "sku_code": "NPPIP-DEMO-1550198728", "variant_name": "기본", "option_values": {}, "price": 2200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1406", "category_id": "88", "name": "UHA미각당 코로로젤리 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:19.797557", "deleted_at": null,
    images: [{"product_image_id": "1390", "url": "https://ik.imagekit.io/oishidam/products/74034318-ad76-4965-b313-62f07b15f8b7_RpTAbgHzE.webp", "alt_text": "UHA미각당 코로로젤리 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1392", "sku_code": "NPPIP-DEMO-1678333741", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1407", "category_id": "72", "name": "닛신 라오 라왕 된장 라멘 118g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:20.901228", "deleted_at": null,
    images: [{"product_image_id": "1391", "url": "https://ik.imagekit.io/oishidam/products/5fa865ad-3adf-4744-b47c-8e7d53b0cbe1_B1M28wIRz.webp", "alt_text": "닛신 라오 라왕 된장 라멘 118g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1393", "sku_code": "NPPIP-DEMO-1564120777", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1408", "category_id": "79", "name": "야오킨 우마이봉 30개입 10종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:21.621198", "deleted_at": null,
    images: [{"product_image_id": "1392", "url": "https://ik.imagekit.io/oishidam/products/5438fbdc-c585-4224-8bb4-84fd981d5adf_3VuDIlhow.webp", "alt_text": "야오킨 우마이봉 30개입 10종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1394", "sku_code": "NPPIP-DEMO-1656465493", "variant_name": "기본", "option_values": {}, "price": 7300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1409", "category_id": "79", "name": "모리나가 베이크 크리미 치즈 10개입 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:21.651964", "deleted_at": null,
    images: [{"product_image_id": "1393", "url": "https://ik.imagekit.io/oishidam/products/9c49da86-9180-4f34-8faf-f5245cb185c9_KYavizuYu.webp", "alt_text": "모리나가 베이크 크리미 치즈 10개입 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1395", "sku_code": "NPPIP-DEMO-1774927757", "variant_name": "기본", "option_values": {}, "price": 5550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1410", "category_id": "87", "name": "아메타니 제과 링고아메 사과 사탕 110g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:21.946123", "deleted_at": null,
    images: [{"product_image_id": "1394", "url": "https://ik.imagekit.io/oishidam/products/4862ea3f-1542-4ade-a048-6ea43a655e63_-Ys2B0iF8.webp", "alt_text": "아메타니 제과 링고아메 사과 사탕 110g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1396", "sku_code": "NPPIP-DEMO-1779344749", "variant_name": "기본", "option_values": {}, "price": 6800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1411", "category_id": "72", "name": "닛신 컵누들 빅사이즈 시푸드 104g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:22.542641", "deleted_at": null,
    images: [{"product_image_id": "1395", "url": "https://ik.imagekit.io/oishidam/products/60a8e106-0d39-4ff5-9492-46982a495bc6_LEOfGLFcj.webp", "alt_text": "닛신 컵누들 빅사이즈 시푸드 104g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1397", "sku_code": "NPPIP-DEMO-1564119979", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1412", "category_id": "67", "name": "패밀리마트 초코 마시멜로", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:23.530247", "deleted_at": null,
    images: [{"product_image_id": "1396", "url": "https://ik.imagekit.io/oishidam/products/c3be37d4-8c40-4033-8270-9a407231cb85_i08Bkkr1T.webp", "alt_text": "패밀리마트 초코 마시멜로", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1398", "sku_code": "NPPIP-DEMO-1623377302", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1413", "category_id": "87", "name": "아사히 민티아 메가 시리즈 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:23.639475", "deleted_at": null,
    images: [{"product_image_id": "1397", "url": "https://ik.imagekit.io/oishidam/products/1e080001-2b15-45d4-9f29-1ef6c51cd9ec_n3qkz2Tdsl.webp", "alt_text": "아사히 민티아 메가 시리즈 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1399", "sku_code": "NPPIP-DEMO-1649900330", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1414", "category_id": "88", "name": "노벨 키라후와 그레이프 별모양 젤리 구미 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:23.903001", "deleted_at": null,
    images: [{"product_image_id": "1398", "url": "https://ik.imagekit.io/oishidam/products/a49c3d82-c592-4a66-8b32-7efa923dd1ae_wRrT9zwIA.webp", "alt_text": "노벨 키라후와 그레이프 별모양 젤리 구미 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1400", "sku_code": "NPPIP-DEMO-1740449691", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1415", "category_id": "79", "name": "부르봉 로안느 바닐라 12매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:24.51007", "deleted_at": null,
    images: [{"product_image_id": "1399", "url": "https://ik.imagekit.io/oishidam/products/9155d3e7-8b34-4d63-9635-a80730e167c1_-7nPrEcyg.webp", "alt_text": "부르봉 로안느 바닐라 12매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1401", "sku_code": "NPPIP-DEMO-1660286096", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1416", "category_id": "80", "name": "롯데 코알라노마치 초코 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:25.223292", "deleted_at": null,
    images: [{"product_image_id": "1400", "url": "https://ik.imagekit.io/oishidam/products/e79dfdb5-0b2d-4b27-bcfa-54f4974f7df2_dL3EM98S0.webp", "alt_text": "롯데 코알라노마치 초코 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1402", "sku_code": "NPPIP-DEMO-1625731995", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1417", "category_id": "87", "name": "용각산 목캔디 파우치 88g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:25.301874", "deleted_at": null,
    images: [{"product_image_id": "1401", "url": "https://ik.imagekit.io/oishidam/products/d8560bfb-8958-4d2d-8d92-958baed87f63_TFdWpTm_K.webp", "alt_text": "용각산 목캔디 파우치 88g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1403", "sku_code": "NPPIP-DEMO-1550407092", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1418", "category_id": "89", "name": "메이지 쁘띠 아소토 모둠 50g 5가지 초콜릿 모음", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:26.033524", "deleted_at": null,
    images: [{"product_image_id": "1402", "url": "https://ik.imagekit.io/oishidam/products/adef93c1-638b-429d-8a56-934b90738bf4_KTGtuwLSH.webp", "alt_text": "메이지 쁘띠 아소토 모둠 50g 5가지 초콜릿 모음", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1404", "sku_code": "NPPIP-DEMO-1624524277", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1419", "category_id": "65", "name": "로손 구운 오징어 매콤한 간장맛 1개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:26.405377", "deleted_at": null,
    images: [{"product_image_id": "1403", "url": "https://ik.imagekit.io/oishidam/products/a4c1b2fb-b2a0-4acf-a74a-76e47051a61c_lJ6AOY6Oh.webp", "alt_text": "로손 구운 오징어 매콤한 간장맛 1개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1405", "sku_code": "NPPIP-DEMO-1619751410", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1420", "category_id": "79", "name": "카키노타네 6봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:27.135856", "deleted_at": null,
    images: [{"product_image_id": "1405", "url": "https://ik.imagekit.io/oishidam/products/2a65e6b8-eaf7-44a5-9514-746e1cea10ed_FkCChtKcS.webp", "alt_text": "카키노타네 6봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1406", "sku_code": "NPPIP-DEMO-1550113545", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1421", "category_id": "87", "name": "카토제과 시오토마토아메 소금 토마토 사탕 58g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:26.889434", "deleted_at": null,
    images: [{"product_image_id": "1404", "url": "https://ik.imagekit.io/oishidam/products/f7caa1bf-2d7c-4767-aa1a-abcae11bf2ae_-ALDDSgiMC.webp", "alt_text": "카토제과 시오토마토아메 소금 토마토 사탕 58g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1407", "sku_code": "NPPIP-DEMO-1742268699", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1422", "category_id": "72", "name": "닛신 컵누들 빅사이즈 카레맛 120g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:27.896314", "deleted_at": null,
    images: [{"product_image_id": "1406", "url": "https://ik.imagekit.io/oishidam/products/60d36ead-7f82-4ec1-ba43-0bc1ceb1e7da_E8FQjALDm.webp", "alt_text": "닛신 컵누들 빅사이즈 카레맛 120g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1408", "sku_code": "NPPIP-DEMO-1564120309", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1423", "category_id": "87", "name": "모리나가 하이츄 미니 파우치 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:28.424049", "deleted_at": null,
    images: [{"product_image_id": "1407", "url": "https://ik.imagekit.io/oishidam/products/96b3cb13-6447-427d-b82b-6ac32c63ce4a_eH_gLpcOv9.webp", "alt_text": "모리나가 하이츄 미니 파우치 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1409", "sku_code": "NPPIP-DEMO-1635152554", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1424", "category_id": "87", "name": "UHA미각당 쟈바라 자바라 사라후쓰 목캔디 감귤 믹스 72g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:28.576966", "deleted_at": null,
    images: [{"product_image_id": "1408", "url": "https://ik.imagekit.io/oishidam/products/fd91a940-4c67-4c34-b4e2-03c5c3ddf133_MoxTHNhtX.webp", "alt_text": "UHA미각당 쟈바라 자바라 사라후쓰 목캔디 감귤 믹스 72g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1410", "sku_code": "NPPIP-DEMO-1625019851", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1425", "category_id": "72", "name": "닛신 돈베이 카키아게 튀김우동 97g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:29.035334", "deleted_at": null,
    images: [{"product_image_id": "1409", "url": "https://ik.imagekit.io/oishidam/products/50f6211b-d123-49ba-a023-2d968e8a3876_ICe-yCV32m.webp", "alt_text": "닛신 돈베이 카키아게 튀김우동 97g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1411", "sku_code": "NPPIP-DEMO-1666315910", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1426", "category_id": "67", "name": "패밀리마트 7종의 해물믹스", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:29.80241", "deleted_at": null,
    images: [{"product_image_id": "1410", "url": "https://ik.imagekit.io/oishidam/products/4f2b2835-995b-4051-82c1-a49a0b3b1945_oEMwmRL6m.webp", "alt_text": "패밀리마트 7종의 해물믹스", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1412", "sku_code": "NPPIP-DEMO-1623387959", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1427", "category_id": "72", "name": "닛신 라오 라왕 간장 라멘 113g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:30.404147", "deleted_at": null,
    images: [{"product_image_id": "1411", "url": "https://ik.imagekit.io/oishidam/products/e9bf7cdc-a140-4ee3-8ac7-1beb1d82c680_KN7RLWJJi.webp", "alt_text": "닛신 라오 라왕 간장 라멘 113g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1413", "sku_code": "NPPIP-DEMO-1564120472", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1428", "category_id": "89", "name": "메이지 죽순마을 타케노코노사토 63g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:30.464843", "deleted_at": null,
    images: [{"product_image_id": "1412", "url": "https://ik.imagekit.io/oishidam/products/d7c56a2a-0f07-45d3-8975-4365a644f5d9_YH18KZsPKx.webp", "alt_text": "메이지 죽순마을 타케노코노사토 63g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1414", "sku_code": "NPPIP-DEMO-1550126456", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1429", "category_id": "72", "name": "닛신 컵누들 카레 87g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:30.783487", "deleted_at": null,
    images: [{"product_image_id": "1413", "url": "https://ik.imagekit.io/oishidam/products/59009b59-1783-427e-83d2-1343bcc92554_z7nGxp7DV.webp", "alt_text": "닛신 컵누들 카레 87g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1415", "sku_code": "NPPIP-DEMO-1564048482", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1430", "category_id": "77", "name": "나토리 치타라 치즈포 3종 어육 대구포 치즈 와인 안주", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:31.736707", "deleted_at": null,
    images: [{"product_image_id": "1414", "url": "https://ik.imagekit.io/oishidam/products/c0ebd0d5-50d4-4e73-bfb3-c9228059971b_hxNaiJ40T.webp", "alt_text": "나토리 치타라 치즈포 3종 어육 대구포 치즈 와인 안주", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1416", "sku_code": "NPPIP-DEMO-1755055285", "variant_name": "기본", "option_values": {}, "price": 6550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1431", "category_id": "88", "name": "오리히로 곤약젤리 얼려먹는 아이스시리즈 프리미엄 바닐라 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:32.341485", "deleted_at": null,
    images: [{"product_image_id": "1415", "url": "https://ik.imagekit.io/oishidam/products/f539b954-3399-45eb-81ea-a7048ac5da43_K7FcxN0Cq.webp", "alt_text": "오리히로 곤약젤리 얼려먹는 아이스시리즈 프리미엄 바닐라 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1417", "sku_code": "NPPIP-DEMO-17739019227", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1432", "category_id": "66", "name": "세븐일레븐 시즈닝 타타키 큐리 오이 무침 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:32.39647", "deleted_at": null,
    images: [{"product_image_id": "1416", "url": "https://ik.imagekit.io/oishidam/products/f86e29c5-7a70-42d0-86b6-2c66dfdeb2a2_fvnLoWyaI.webp", "alt_text": "세븐일레븐 시즈닝 타타키 큐리 오이 무침 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1418", "sku_code": "NPPIP-DEMO-1739932231", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1433", "category_id": "88", "name": "오리히로 곤약젤리 얼려먹는 아이스시리즈 소다+콜라 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:32.744861", "deleted_at": null,
    images: [{"product_image_id": "1417", "url": "https://ik.imagekit.io/oishidam/products/0788842c-c114-4f05-919d-490cbc85723e_soYpsL-Ka.webp", "alt_text": "오리히로 곤약젤리 얼려먹는 아이스시리즈 소다+콜라 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1419", "sku_code": "NPPIP-DEMO-177390192410", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1434", "category_id": "66", "name": "세븐일레븐 고소한 시리얼 슈가 버터 샌드 트리 3개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:33.627037", "deleted_at": null,
    images: [{"product_image_id": "1418", "url": "https://ik.imagekit.io/oishidam/products/61333a9a-cf64-4239-b22f-5859ab29014c_n2v8E3xsU.webp", "alt_text": "세븐일레븐 고소한 시리얼 슈가 버터 샌드 트리 3개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1420", "sku_code": "NPPIP-DEMO-1634780297", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1435", "category_id": "87", "name": "용각산 파우치 목캔디 저당 카시스&블루베리 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:34.232038", "deleted_at": null,
    images: [{"product_image_id": "1419", "url": "https://ik.imagekit.io/oishidam/products/5af87e44-1f38-4f96-8686-fb3ac3f6c299_EsCM_1f1e.webp", "alt_text": "용각산 파우치 목캔디 저당 카시스&블루베리 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1421", "sku_code": "NPPIP-DEMO-1749784480", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1436", "category_id": "72", "name": "[명성]잇페이짱 야시장의 야키소바", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:34.514092", "deleted_at": null,
    images: [{"product_image_id": "1420", "url": "https://ik.imagekit.io/oishidam/products/36e233c8-50f6-4201-8bac-a2e8a39058c2_OQoeW4ZRY.webp", "alt_text": "[명성]잇페이짱 야시장의 야키소바", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1422", "sku_code": "NPPIP-DEMO-1638955780", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1437", "category_id": "88", "name": "메이지 과즙 구미 3종 (포도/귤/머스캣)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:34.60719", "deleted_at": null,
    images: [{"product_image_id": "1421", "url": "https://ik.imagekit.io/oishidam/products/0ae7e326-085c-406a-93dd-4927e2675c76_DBOE7JiLM.webp", "alt_text": "메이지 과즙 구미 3종 (포도/귤/머스캣)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1423", "sku_code": "NPPIP-DEMO-1656480656", "variant_name": "기본", "option_values": {}, "price": 1500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1438", "category_id": "66", "name": "세븐일레븐 랑드샤 화이트 초코 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:35.479422", "deleted_at": null,
    images: [{"product_image_id": "1422", "url": "https://ik.imagekit.io/oishidam/products/bab16c77-54a8-4e02-9a64-fb0ce1028d86_BglI5ml00q.webp", "alt_text": "세븐일레븐 랑드샤 화이트 초코 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1424", "sku_code": "NPPIP-DEMO-1622690961", "variant_name": "기본", "option_values": {}, "price": 3100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1439", "category_id": "93", "name": "반다이 캬라후루 도시락 캐릭터 어묵칩 8종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:36.480609", "deleted_at": null,
    images: [{"product_image_id": "1424", "url": "https://ik.imagekit.io/oishidam/products/c3b9503a-50dd-4315-a725-425e67e6f515_DZ9JCbQdz.webp", "alt_text": "반다이 캬라후루 도시락 캐릭터 어묵칩 8종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1425", "sku_code": "NPPIP-DEMO-1656927464", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1440", "category_id": "79", "name": "[가루비]미노 완두콩 소금맛 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:36.254191", "deleted_at": null,
    images: [{"product_image_id": "1423", "url": "https://ik.imagekit.io/oishidam/products/c578b5f5-d7cd-4739-bed5-010900e44054_jang5252U.webp", "alt_text": "[가루비]미노 완두콩 소금맛 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1426", "sku_code": "NPPIP-DEMO-1617345867", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1441", "category_id": "66", "name": "세븐일레븐 껍질 있는 감자 튀김 맛있는 소금 맛 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:36.769658", "deleted_at": null,
    images: [{"product_image_id": "1425", "url": "https://ik.imagekit.io/oishidam/products/064cd779-3c39-4db4-88f4-9870775b205c_DOA5Oqlui.webp", "alt_text": "세븐일레븐 껍질 있는 감자 튀김 맛있는 소금 맛 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1427", "sku_code": "NPPIP-DEMO-1622690471", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1442", "category_id": "65", "name": "로손 체다 치즈 대구포 맥주 안주 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:37.36866", "deleted_at": null,
    images: [{"product_image_id": "1426", "url": "https://ik.imagekit.io/oishidam/products/48240b1e-13ed-4745-984a-7c4303c39f6b_Rt4Y7vFHF.webp", "alt_text": "로손 체다 치즈 대구포 맥주 안주 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1428", "sku_code": "NPPIP-DEMO-1619751018", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1443", "category_id": "72", "name": "닛신 야끼소바 UFO 빅 167g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:38.188273", "deleted_at": null,
    images: [{"product_image_id": "1428", "url": "https://ik.imagekit.io/oishidam/products/4133db6b-614e-4b4c-b675-3ff937230a6a_Uq8nbRl9j.webp", "alt_text": "닛신 야끼소바 UFO 빅 167g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1429", "sku_code": "NPPIP-DEMO-1564119751", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1444", "category_id": "72", "name": "닛신 컵누들 칠리토마토 76g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:38.173665", "deleted_at": null,
    images: [{"product_image_id": "1427", "url": "https://ik.imagekit.io/oishidam/products/2a7b67fd-b36f-4c9b-9617-83e3b9454cb7_mN6PkAkME.webp", "alt_text": "닛신 컵누들 칠리토마토 76g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1430", "sku_code": "NPPIP-DEMO-1564109429", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1445", "category_id": "82", "name": "메이지 커피비트 일본 초콜릿 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:38.389849", "deleted_at": null,
    images: [{"product_image_id": "1429", "url": "https://ik.imagekit.io/oishidam/products/833b3d92-c9e8-4e2e-988b-5f62c9c1e8f3_rb1NmbyS2.webp", "alt_text": "메이지 커피비트 일본 초콜릿 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1431", "sku_code": "NPPIP-DEMO-1739323453", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1446", "category_id": "90", "name": "모리나가 소금 캬라멜 봉지 일본 카라멜 83g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:39.277008", "deleted_at": null,
    images: [{"product_image_id": "1430", "url": "https://ik.imagekit.io/oishidam/products/c43c86de-cae2-49e4-bbc2-4afb58eba68d_7C9Yd1xx_.webp", "alt_text": "모리나가 소금 캬라멜 봉지 일본 카라멜 83g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1432", "sku_code": "NPPIP-DEMO-1635151390", "variant_name": "기본", "option_values": {}, "price": 3150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1447", "category_id": "80", "name": "후지야 컨트리맘 마이스타즈 뉴욕 치즈케이크 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:40.055834", "deleted_at": null,
    images: [{"product_image_id": "1431", "url": "https://ik.imagekit.io/oishidam/products/dd0ee6a0-e91f-47fa-bafb-ec6d5b0e8747_AOPFiZMmF.webp", "alt_text": "후지야 컨트리맘 마이스타즈 뉴욕 치즈케이크 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1433", "sku_code": "NPPIP-DEMO-1736404873", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1448", "category_id": "79", "name": "부르봉 루만도 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:40.062833", "deleted_at": null,
    images: [{"product_image_id": "1432", "url": "https://ik.imagekit.io/oishidam/products/7bd56175-15b5-4d14-8a29-3485124902fa_BnLcQ4TZP.webp", "alt_text": "부르봉 루만도 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1434", "sku_code": "NPPIP-DEMO-1735521274", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1449", "category_id": "73", "name": "치킨라멘 85g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:40.180717", "deleted_at": null,
    images: [{"product_image_id": "1433", "url": "https://ik.imagekit.io/oishidam/products/c3735fb0-ee5a-4ffa-8e43-c47522086195_Vvz4SDAJ1.webp", "alt_text": "치킨라멘 85g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1435", "sku_code": "NPPIP-DEMO-1564117616", "variant_name": "기본", "option_values": {}, "price": 2300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1450", "category_id": "66", "name": "세븐일레븐 탄탄멘 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:41.286294", "deleted_at": null,
    images: [{"product_image_id": "1434", "url": "https://ik.imagekit.io/oishidam/products/4240c969-2a7f-48d7-a103-9d144829738f_nbZpo49dp.webp", "alt_text": "세븐일레븐 탄탄멘 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1436", "sku_code": "NPPIP-DEMO-1622786919", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1451", "category_id": "79", "name": "홋카이도 요시미 oh 구운 옥수수 과자 36g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:42.001682", "deleted_at": null,
    images: [{"product_image_id": "1435", "url": "https://ik.imagekit.io/oishidam/products/6e251641-fc4a-4131-86d5-e0acbd21aab0_lFN97Hy9C.webp", "alt_text": "홋카이도 요시미 oh 구운 옥수수 과자 36g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1437", "sku_code": "NPPIP-DEMO-1783062816", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1452", "category_id": "79", "name": "UHA 오사츠도키 고구마칩 소금 버터 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:42.140527", "deleted_at": null,
    images: [{"product_image_id": "1437", "url": "https://ik.imagekit.io/oishidam/products/39d4ae03-562f-4817-a8b8-0115cac65d6c_cnnNvX4Ya.webp", "alt_text": "UHA 오사츠도키 고구마칩 소금 버터 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1438", "sku_code": "NPPIP-DEMO-1719450435", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1453", "category_id": "79", "name": "가루비 자가리코 명란 치즈 몬자맛 L사이즈 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:42.077463", "deleted_at": null,
    images: [{"product_image_id": "1436", "url": "https://ik.imagekit.io/oishidam/products/77ba9066-df18-4dac-8b76-51e6cac1823c_7OjdlFo5te.webp", "alt_text": "가루비 자가리코 명란 치즈 몬자맛 L사이즈 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1439", "sku_code": "NPPIP-DEMO-1747287931", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1454", "category_id": "79", "name": "[부르봉]초코앙팡 44g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:42.982912", "deleted_at": null,
    images: [{"product_image_id": "1438", "url": "https://ik.imagekit.io/oishidam/products/bd87bbc2-cd54-460b-83b5-f7fde149829a_WOSKE6Dn1.webp", "alt_text": "[부르봉]초코앙팡 44g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1440", "sku_code": "NPPIP-DEMO-1624874704", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1455", "category_id": "67", "name": "패밀리마트 땅콩을 진하게 볶은 땅콩 초코", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1441", "url": "https://ik.imagekit.io/oishidam/products/6e74e049-9e80-4f0d-acd6-22bf2c6b1eda_39cbI3vAu.webp", "alt_text": "패밀리마트 땅콩을 진하게 볶은 땅콩 초코", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1441", "sku_code": "NPPIP-DEMO-1623381864", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1456", "category_id": "88", "name": "UHA미각당 푸쵸 스틱 4종 소프트 츄잉 캔디", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:43.939326", "deleted_at": null,
    images: [{"product_image_id": "1439", "url": "https://ik.imagekit.io/oishidam/products/857c620c-20ab-4aec-b90c-842ccc41bf8f_OiHb1kEqd.webp", "alt_text": "UHA미각당 푸쵸 스틱 4종 소프트 츄잉 캔디", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1442", "sku_code": "NPPIP-DEMO-1747384169", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1457", "category_id": "77", "name": "나토리 치타라 치즈포 피자포테토맛 50g 맥주 와인 안주 대구포", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:44.040573", "deleted_at": null,
    images: [{"product_image_id": "1440", "url": "https://ik.imagekit.io/oishidam/products/1b615a08-0da3-4aab-8f8e-e3eeb71de533_7vpG-uMqnE.webp", "alt_text": "나토리 치타라 치즈포 피자포테토맛 50g 맥주 와인 안주 대구포", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1443", "sku_code": "NPPIP-DEMO-1775205527", "variant_name": "기본", "option_values": {}, "price": 5550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1458", "category_id": "66", "name": "세븐일레븐 잇푸도 아카마루신미 하카타 돈코츠", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:44.992151", "deleted_at": null,
    images: [{"product_image_id": "1442", "url": "https://ik.imagekit.io/oishidam/products/8fbc44b4-8e70-4de3-a050-833828715c01_1fnqzfKjN.webp", "alt_text": "세븐일레븐 잇푸도 아카마루신미 하카타 돈코츠", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1444", "sku_code": "NPPIP-DEMO-1706776550", "variant_name": "기본", "option_values": {}, "price": 5800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1459", "category_id": "67", "name": "패밀리마트 천연 새우를 듬뿍 사용한 리치 갓파에비센 64g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:45.863389", "deleted_at": null,
    images: [{"product_image_id": "1443", "url": "https://ik.imagekit.io/oishidam/products/bf6d09cd-3075-4101-85b2-511d68887179_zrl--720u.webp", "alt_text": "패밀리마트 천연 새우를 듬뿍 사용한 리치 갓파에비센 64g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1445", "sku_code": "NPPIP-DEMO-1623222328", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1460", "category_id": "72", "name": "닛신 면장인 라면 장인 간장 라멘 89g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:45.990021", "deleted_at": null,
    images: [{"product_image_id": "1444", "url": "https://ik.imagekit.io/oishidam/products/a5c6916a-40b8-4fb3-b5f9-f3d9cd9146f5_eLepcwhj3.webp", "alt_text": "닛신 면장인 라면 장인 간장 라멘 89g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1446", "sku_code": "NPPIP-DEMO-1564118933", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1461", "category_id": "65", "name": "로손 오징어 소면 22g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:46.176846", "deleted_at": null,
    images: [{"product_image_id": "1445", "url": "https://ik.imagekit.io/oishidam/products/444f81ff-7639-48b3-8792-037c4cb9ee3d_IbnnajJiS.webp", "alt_text": "로손 오징어 소면 22g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1447", "sku_code": "NPPIP-DEMO-1619751341", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1462", "category_id": "79", "name": "부르봉 싯토리 소프트 밀크 쿠키 166g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:46.690332", "deleted_at": null,
    images: [{"product_image_id": "1446", "url": "https://ik.imagekit.io/oishidam/products/a9f77d73-f935-4f8b-a9a0-486bc7d67966_Ul2RNyTzi.webp", "alt_text": "부르봉 싯토리 소프트 밀크 쿠키 166g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1448", "sku_code": "NPPIP-DEMO-1736901553", "variant_name": "기본", "option_values": {}, "price": 4900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1463", "category_id": "87", "name": "모리나가 하이츄 미니 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:47.625731", "deleted_at": null,
    images: [{"product_image_id": "1447", "url": "https://ik.imagekit.io/oishidam/products/db92fb4b-011a-45c6-ae78-603b9b2c37e4_bDSggmyqg.webp", "alt_text": "모리나가 하이츄 미니 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1449", "sku_code": "NPPIP-DEMO-1747383817", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1464", "category_id": "88", "name": "오리히로 곤약젤리 얼려먹는 아이스시리즈 프리미엄 카페오레 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:47.844144", "deleted_at": null,
    images: [{"product_image_id": "1448", "url": "https://ik.imagekit.io/oishidam/products/49711226-464a-40cb-8170-f1d4a7467fe0_hDQ6vnBk9.webp", "alt_text": "오리히로 곤약젤리 얼려먹는 아이스시리즈 프리미엄 카페오레 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1450", "sku_code": "NPPIP-DEMO-17739019238", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1465", "category_id": "65", "name": "로손 삿포로 에비소바 이치겐 새우미소라멘 닛신 일본 컵라면 112g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:48.023478", "deleted_at": null,
    images: [{"product_image_id": "1449", "url": "https://ik.imagekit.io/oishidam/products/f6e5ac89-060c-4aca-bed9-8b3d81b1e705_KPpMJ4Vbm.webp", "alt_text": "로손 삿포로 에비소바 이치겐 새우미소라멘 닛신 일본 컵라면 112g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1451", "sku_code": "NPPIP-DEMO-1741065990", "variant_name": "기본", "option_values": {}, "price": 4750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1466", "category_id": "79", "name": "가루비 피자포테토 60g 치즈 포테이토칩 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:48.398825", "deleted_at": null,
    images: [{"product_image_id": "1450", "url": "https://ik.imagekit.io/oishidam/products/e029f6b8-f65b-46c9-afce-bd606512e1d8_LAVb_P33J.webp", "alt_text": "가루비 피자포테토 60g 치즈 포테이토칩 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1452", "sku_code": "NPPIP-DEMO-1660286258", "variant_name": "기본", "option_values": {}, "price": 2850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1467", "category_id": "69", "name": "일본 한정 삼양 불닭 카레 150g 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:49.629866", "deleted_at": null,
    images: [{"product_image_id": "1451", "url": "https://ik.imagekit.io/oishidam/products/c3f143ef-2018-4044-905f-c377104eebea_AwSpiU_f0.webp", "alt_text": "일본 한정 삼양 불닭 카레 150g 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1453", "sku_code": "NPPIP-DEMO-1775027262", "variant_name": "기본", "option_values": {}, "price": 5000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1468", "category_id": "72", "name": "[페양구]소스 야끼소바 Big", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:49.783558", "deleted_at": null,
    images: [{"product_image_id": "1452", "url": "https://ik.imagekit.io/oishidam/products/8e4838b8-b555-4fee-ba55-4926606a6b5a_kv03VOati.webp", "alt_text": "[페양구]소스 야끼소바 Big", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1454", "sku_code": "NPPIP-DEMO-1650008395", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1469", "category_id": "79", "name": "카메다제과 해피탄 하피탄 쌀과자 96g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:49.92368", "deleted_at": null,
    images: [{"product_image_id": "1453", "url": "https://ik.imagekit.io/oishidam/products/4898dd27-8a2a-4079-9432-808773f9dd0f_BSxnWuDX4.webp", "alt_text": "카메다제과 해피탄 하피탄 쌀과자 96g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1455", "sku_code": "NPPIP-DEMO-1550114697", "variant_name": "기본", "option_values": {}, "price": 3150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1470", "category_id": "93", "name": "캐릭터 후리카케 미니팩 모음전 랜덤 스티커 포함", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:50.438977", "deleted_at": null,
    images: [{"product_image_id": "1454", "url": "https://ik.imagekit.io/oishidam/products/32316e6a-d003-4471-94cf-aafbc4a78105_gipUmSfes.webp", "alt_text": "캐릭터 후리카케 미니팩 모음전 랜덤 스티커 포함", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1456", "sku_code": "NPPIP-DEMO-1650512517", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1471", "category_id": "88", "name": "[UHA미각당]코로로 젤리 시미즈 백도 복숭아맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:51.360677", "deleted_at": null,
    images: [{"product_image_id": "1455", "url": "https://ik.imagekit.io/oishidam/products/0cd7a30c-bac6-481b-9f25-315905652aed_PrAUQdwsg.webp", "alt_text": "[UHA미각당]코로로 젤리 시미즈 백도 복숭아맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1457", "sku_code": "NPPIP-DEMO-1729475894", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1472", "category_id": "80", "name": "부르봉 루베라 랑그드샤 일본 쿠키 과자 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:51.637739", "deleted_at": null,
    images: [{"product_image_id": "1456", "url": "https://ik.imagekit.io/oishidam/products/5c7209d3-d641-41db-aac1-4f6529dd5595_oDiPAHRpM.webp", "alt_text": "부르봉 루베라 랑그드샤 일본 쿠키 과자 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1458", "sku_code": "NPPIP-DEMO-1770787106", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1473", "category_id": "79", "name": "토하토 짱구 초코비 스티커 포함 초코맛 25g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:51.777835", "deleted_at": null,
    images: [{"product_image_id": "1457", "url": "https://ik.imagekit.io/oishidam/products/5d9977ea-3933-438a-89a3-9a4096e724a5_s1FViQaaOo.webp", "alt_text": "토하토 짱구 초코비 스티커 포함 초코맛 25g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1459", "sku_code": "NPPIP-DEMO-1660097226", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1474", "category_id": "89", "name": "메이지 밀크 초콜릿 BOX (26매)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:52.368136", "deleted_at": null,
    images: [{"product_image_id": "1458", "url": "https://ik.imagekit.io/oishidam/products/5ad4d8c0-06da-4abc-bfe4-26e210b72da3_wMyhiKZeJ8.webp", "alt_text": "메이지 밀크 초콜릿 BOX (26매)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1460", "sku_code": "NPPIP-DEMO-1624848330", "variant_name": "기본", "option_values": {}, "price": 6000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1475", "category_id": "79", "name": "아지고노미 패밀리 과자 92g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:53.267654", "deleted_at": null,
    images: [{"product_image_id": "1459", "url": "https://ik.imagekit.io/oishidam/products/c3445a95-4153-45a3-b5ec-f2d198516bfa_FEefBT1HQ.webp", "alt_text": "아지고노미 패밀리 과자 92g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1461", "sku_code": "NPPIP-DEMO-1549958609", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1476", "category_id": "87", "name": "크라시에 프리스크 민트 사탕 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:53.458833", "deleted_at": null,
    images: [{"product_image_id": "1460", "url": "https://ik.imagekit.io/oishidam/products/bc66626c-a8a4-498b-8a14-913ee2dbea7a_N2D00ZwZw.webp", "alt_text": "크라시에 프리스크 민트 사탕 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1462", "sku_code": "NPPIP-DEMO-1718849083", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1477", "category_id": "77", "name": "호테이 숯불 닭꼬치 야키토리 통조림 3종 (타레/갈릭페퍼/소금)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:53.719085", "deleted_at": null,
    images: [{"product_image_id": "1461", "url": "https://ik.imagekit.io/oishidam/products/58165a6e-d082-4167-a930-928f92625214_rq174A8md.webp", "alt_text": "호테이 숯불 닭꼬치 야키토리 통조림 3종 (타레/갈릭페퍼/소금)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1463", "sku_code": "NPPIP-DEMO-1742971603", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1478", "category_id": "89", "name": "네슬레 킷캣 킷켓 미니 초콜릿 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:54.175633", "deleted_at": null,
    images: [{"product_image_id": "1462", "url": "https://ik.imagekit.io/oishidam/products/8ce83704-c165-42d4-bcd9-0fe62dccfaf5_4FrStO3l0z.webp", "alt_text": "네슬레 킷캣 킷켓 미니 초콜릿 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1464", "sku_code": "NPPIP-DEMO-1770176086", "variant_name": "기본", "option_values": {}, "price": 5900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1479", "category_id": "72", "name": "[산요식품]유명한 가게의 맛 천하일품 교토 진한 닭 백탕", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:54.970731", "deleted_at": null,
    images: [{"product_image_id": "1463", "url": "https://ik.imagekit.io/oishidam/products/7bf8ef5f-c520-40c1-a842-329364323756_JAfcIFYkK.webp", "alt_text": "[산요식품]유명한 가게의 맛 천하일품 교토 진한 닭 백탕", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1465", "sku_code": "NPPIP-DEMO-1637805254", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1480", "category_id": "67", "name": "패밀리마트 연유 꿀 도넛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:55.340603", "deleted_at": null,
    images: [{"product_image_id": "1464", "url": "https://ik.imagekit.io/oishidam/products/16c3a1e0-d19d-44c7-9211-eb875c3cb231_BxJBse60am.webp", "alt_text": "패밀리마트 연유 꿀 도넛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1466", "sku_code": "NPPIP-DEMO-1623387168", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1481", "category_id": "79", "name": "푸쿠푸쿠 메이토 붕어빵 어린이 간식1개입 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:55.574358", "deleted_at": null,
    images: [{"product_image_id": "1465", "url": "https://ik.imagekit.io/oishidam/products/58367615-12e0-4bd4-a2d7-4420f7e302a1_NTokUM3Am.webp", "alt_text": "푸쿠푸쿠 메이토 붕어빵 어린이 간식1개입 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1467", "sku_code": "NPPIP-DEMO-1666321376", "variant_name": "기본", "option_values": {}, "price": 1000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1482", "category_id": "72", "name": "에이스쿡 일본 미소 버터 라멘 컵라면 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:56.025637", "deleted_at": null,
    images: [{"product_image_id": "1466", "url": "https://ik.imagekit.io/oishidam/products/c17a6caf-5e6e-457f-b26b-d4c88481a363_p7MVpVbVW.webp", "alt_text": "에이스쿡 일본 미소 버터 라멘 컵라면 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1468", "sku_code": "NPPIP-DEMO-1743641945", "variant_name": "기본", "option_values": {}, "price": 2980, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1483", "category_id": "72", "name": "닛신 컵누들 빅사이즈 오리지널 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:57.044778", "deleted_at": null,
    images: [{"product_image_id": "1467", "url": "https://ik.imagekit.io/oishidam/products/3456c36c-e6d4-4371-a587-27af2ae7eb14_8YACj-I9Z.webp", "alt_text": "닛신 컵누들 빅사이즈 오리지널 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1469", "sku_code": "NPPIP-DEMO-1564119863", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1484", "category_id": "75", "name": "S&B 에스앤비 조미료 튜브 6종 모음", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:57.356252", "deleted_at": null,
    images: [{"product_image_id": "1468", "url": "https://ik.imagekit.io/oishidam/products/1ce37f24-711f-48ff-89b0-ecaef7499253_R0SmVTLI2R.webp", "alt_text": "S&B 에스앤비 조미료 튜브 6종 모음", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1470", "sku_code": "NPPIP-DEMO-1664255793", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1485", "category_id": "72", "name": "닛신 돈베이 튀김소바 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:57.544058", "deleted_at": null,
    images: [{"product_image_id": "1469", "url": "https://ik.imagekit.io/oishidam/products/df8aefca-c817-4de5-8f22-6d03e247dd29_pPzjjH312.webp", "alt_text": "닛신 돈베이 튀김소바 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1471", "sku_code": "NPPIP-DEMO-1640835273", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1486", "category_id": "87", "name": "노벨 오레노밀크 캔디 북해도 멜론맛 메로나맛 사탕 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:57.968021", "deleted_at": null,
    images: [{"product_image_id": "1470", "url": "https://ik.imagekit.io/oishidam/products/9b8e3d67-5c3d-4b06-b01f-2ed6dc19de15__BBapcbT3.webp", "alt_text": "노벨 오레노밀크 캔디 북해도 멜론맛 메로나맛 사탕 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1472", "sku_code": "NPPIP-DEMO-1719544052", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1487", "category_id": "92", "name": "s&b 에스비 일본 오뎅 육수 분말 스프 국물 만들기 조미료 4봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:58.991485", "deleted_at": null,
    images: [{"product_image_id": "1471", "url": "https://ik.imagekit.io/oishidam/products/fb467abf-327c-4e09-adcb-2713a7faa570_7mFvTWdNN.webp", "alt_text": "s&b 에스비 일본 오뎅 육수 분말 스프 국물 만들기 조미료 4봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1473", "sku_code": "NPPIP-DEMO-1637304260", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1488", "category_id": "72", "name": "닛신 라면 모음전 - UFO 야끼소바 3개 세트 (용량 선택)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:59.246137", "deleted_at": null,
    images: [{"product_image_id": "1472", "url": "https://ik.imagekit.io/oishidam/products/4bc47f15-84ed-4df1-87f7-ebbe9f1dc9cc_adE-4jmWe.webp", "alt_text": "닛신 라면 모음전 - UFO 야끼소바 3개 세트 (용량 선택)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1474", "sku_code": "NPPIP-DEMO-1647567538", "variant_name": "기본", "option_values": {}, "price": 10400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1489", "category_id": "79", "name": "부르봉 프리미엄 루만도 9개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:11:59.467244", "deleted_at": null,
    images: [{"product_image_id": "1473", "url": "https://ik.imagekit.io/oishidam/products/ab19f137-6e20-40f5-b2a8-f5d938621f16_XDdV231bT9.webp", "alt_text": "부르봉 프리미엄 루만도 9개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1475", "sku_code": "NPPIP-DEMO-1737006896", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1490", "category_id": "73", "name": "일본 라면(라멘) 마루타이 지역명물 봉지라면 홋카이도 카고시마/구마모토/나가사키", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:00.10555", "deleted_at": null,
    images: [{"product_image_id": "1474", "url": "https://ik.imagekit.io/oishidam/products/40c1d96d-ed5f-4763-b206-d6576c7156b1_uNjxM1R7g.webp", "alt_text": "일본 라면(라멘) 마루타이 지역명물 봉지라면 홋카이도 카고시마/구마모토/나가사키", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1476", "sku_code": "NPPIP-DEMO-1660286121", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1491", "category_id": "67", "name": "패밀리마트 진한 새우의 풍미 튀김 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:00.958724", "deleted_at": null,
    images: [{"product_image_id": "1475", "url": "https://ik.imagekit.io/oishidam/products/a8808314-01cd-4aa5-bce7-a4d9a5486cb1_bY3LjKVhE.webp", "alt_text": "패밀리마트 진한 새우의 풍미 튀김 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1477", "sku_code": "NPPIP-DEMO-1623379807", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1492", "category_id": "88", "name": "오리히로 곤약젤리 기간한정 레몬스쿼시+메론소다 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:01.164753", "deleted_at": null,
    images: [{"product_image_id": "1476", "url": "https://ik.imagekit.io/oishidam/products/250cd44f-ad27-4ec3-97a2-20b113f11500_-hm0aB2Wj.webp", "alt_text": "오리히로 곤약젤리 기간한정 레몬스쿼시+메론소다 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1478", "sku_code": "NPPIP-DEMO-17739019214", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1493", "category_id": "67", "name": "패밀리마트 소재의 단맛 고구마스틱 이모켄삐 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:01.413738", "deleted_at": null,
    images: [{"product_image_id": "1477", "url": "https://ik.imagekit.io/oishidam/products/48ccd74e-5859-4d41-b73d-fac883cd12d2_WGkYE7-c6.webp", "alt_text": "패밀리마트 소재의 단맛 고구마스틱 이모켄삐 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1479", "sku_code": "NPPIP-DEMO-1770251763", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1494", "category_id": "72", "name": "닛신 면장인 라면 장인 탄탄멘 96g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:02.00684", "deleted_at": null,
    images: [{"product_image_id": "1478", "url": "https://ik.imagekit.io/oishidam/products/1586f817-1dc0-44d6-8ecd-ef9ff1145791_3i66iEe6e.webp", "alt_text": "닛신 면장인 라면 장인 탄탄멘 96g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1480", "sku_code": "NPPIP-DEMO-1564119499", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1495", "category_id": "70", "name": "마루코메 요정의 맛 미소시루 24식 2종 (일반/저염)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:02.920326", "deleted_at": null,
    images: [{"product_image_id": "1479", "url": "https://ik.imagekit.io/oishidam/products/4de5b4c7-59de-4ef6-822f-f764674daae6_ZhMzBLyfk.webp", "alt_text": "마루코메 요정의 맛 미소시루 24식 2종 (일반/저염)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1481", "sku_code": "NPPIP-DEMO-1656550820", "variant_name": "기본", "option_values": {}, "price": 7600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1496", "category_id": "79", "name": "가루비 카타아게 포테이토 연한 소금맛 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:03.074897", "deleted_at": null,
    images: [{"product_image_id": "1480", "url": "https://ik.imagekit.io/oishidam/products/2e960129-54fc-4252-954f-47e270b5919d_Wtf4aYYk3.webp", "alt_text": "가루비 카타아게 포테이토 연한 소금맛 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1482", "sku_code": "NPPIP-DEMO-1550198240", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1497", "category_id": "72", "name": "이치란 돈코츠 라멘 138g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:03.29235", "deleted_at": null,
    images: [{"product_image_id": "1481", "url": "https://ik.imagekit.io/oishidam/products/cc34251b-bf20-4212-a0cb-f23438e22bd7_-yIN1moD9.webp", "alt_text": "이치란 돈코츠 라멘 138g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1483", "sku_code": "NPPIP-DEMO-1767678000", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1498", "category_id": "89", "name": "글리코 포키 아몬드 크래시 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:03.709788", "deleted_at": null,
    images: [{"product_image_id": "1482", "url": "https://ik.imagekit.io/oishidam/products/7427fb46-4183-48c5-ab86-08c30f5b5272_LhEC2pSfA.webp", "alt_text": "글리코 포키 아몬드 크래시 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1484", "sku_code": "NPPIP-DEMO-1659344306", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1499", "category_id": "88", "name": "노벨 키라후와 소다맛 별모양 일본 젤리 구미 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:05.772108", "deleted_at": null,
    images: [{"product_image_id": "1486", "url": "https://ik.imagekit.io/oishidam/products/d3b88fd2-fc00-4737-9506-97d749ea73a4_xxSKSyrAu.webp", "alt_text": "노벨 키라후와 소다맛 별모양 일본 젤리 구미 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1485", "sku_code": "NPPIP-DEMO-1766726063", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1500", "category_id": "89", "name": "롯데 파이노미 파이의 열매 73g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:05.038621", "deleted_at": null,
    images: [{"product_image_id": "1483", "url": "https://ik.imagekit.io/oishidam/products/df871617-c25b-4b83-b299-57c526b8c1f1_mQKSEENzL.webp", "alt_text": "롯데 파이노미 파이의 열매 73g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1486", "sku_code": "NPPIP-DEMO-1625731637", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1501", "category_id": "79", "name": "메이지 죽순마을 타케노코노사토 딸기쇼콜라 61g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:05.179421", "deleted_at": null,
    images: [{"product_image_id": "1484", "url": "https://ik.imagekit.io/oishidam/products/a94bf6eb-ff8c-4c0e-8565-3cb7eabd8530_VfoNWr6In.webp", "alt_text": "메이지 죽순마을 타케노코노사토 딸기쇼콜라 61g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1487", "sku_code": "NPPIP-DEMO-1624845905", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1502", "category_id": "79", "name": "gie 돈키호테 쵸콧토야끼이모 군고구마 스낵 175g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:05.649807", "deleted_at": null,
    images: [{"product_image_id": "1485", "url": "https://ik.imagekit.io/oishidam/products/a13bc91e-7666-449e-bef9-5fb04b610f19_VfOJpfD39F.webp", "alt_text": "gie 돈키호테 쵸콧토야끼이모 군고구마 스낵 175g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1488", "sku_code": "NPPIP-DEMO-1784871714", "variant_name": "기본", "option_values": {}, "price": 9400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1503", "category_id": "67", "name": "패밀리마트 안주 오징어튀김", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:07.175536", "deleted_at": null,
    images: [{"product_image_id": "1488", "url": "https://ik.imagekit.io/oishidam/products/8535f693-64bb-4492-9632-bec0341ed504_2scReZ3Lq.webp", "alt_text": "패밀리마트 안주 오징어튀김", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1489", "sku_code": "NPPIP-DEMO-1623386935", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1504", "category_id": "88", "name": "오리히로 곤약젤리 기간한정 여름귤+골든 파인애플 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:07.03184", "deleted_at": null,
    images: [{"product_image_id": "1487", "url": "https://ik.imagekit.io/oishidam/products/92257522-73e7-4377-ba8f-a4810fbf18a7_uLZqJj4qo.webp", "alt_text": "오리히로 곤약젤리 기간한정 여름귤+골든 파인애플 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1490", "sku_code": "NPPIP-DEMO-17739019213", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1505", "category_id": "75", "name": "일본 솥밥 밀키트 야마모리 카마메시 3회분 5종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:07.548264", "deleted_at": null,
    images: [{"product_image_id": "1489", "url": "https://ik.imagekit.io/oishidam/products/e053c0ff-4290-4fe8-a28b-b369d20e030b_0udYd3piK.webp", "alt_text": "일본 솥밥 밀키트 야마모리 카마메시 3회분 5종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1491", "sku_code": "NPPIP-DEMO-1740441771", "variant_name": "기본", "option_values": {}, "price": 5100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1506", "category_id": "88", "name": "부르봉 페투치네 구미 젤리 2종 (포도/콜라)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:07.738786", "deleted_at": null,
    images: [{"product_image_id": "1490", "url": "https://ik.imagekit.io/oishidam/products/e61339c3-414d-471a-949d-7b8184823c22_FMCRx6KbM.webp", "alt_text": "부르봉 페투치네 구미 젤리 2종 (포도/콜라)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1492", "sku_code": "NPPIP-DEMO-1739254150", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1507", "category_id": "84", "name": "베르데 토스트 스프레드 12종 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:08.918466", "deleted_at": null,
    images: [{"product_image_id": "1491", "url": "https://ik.imagekit.io/oishidam/products/adfc5ea1-e145-460a-8697-0d7911a1bc3a_ZMYNRDfz2.webp", "alt_text": "베르데 토스트 스프레드 12종 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1493", "sku_code": "NPPIP-DEMO-1710905018", "variant_name": "기본", "option_values": {}, "price": 4700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1508", "category_id": "87", "name": "리본 생 유자 목캔디 사탕 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:08.965169", "deleted_at": null,
    images: [{"product_image_id": "1492", "url": "https://ik.imagekit.io/oishidam/products/df674a17-c30f-44c9-8c0d-0000aae8fbc4_rPnMoLVzM.webp", "alt_text": "리본 생 유자 목캔디 사탕 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1494", "sku_code": "NPPIP-DEMO-1768442324", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1509", "category_id": "88", "name": "UHA미각당 사케루구미 찢어먹는 젤리 사워 레몬맛 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:09.448262", "deleted_at": null,
    images: [{"product_image_id": "1493", "url": "https://ik.imagekit.io/oishidam/products/0ebf9ecb-7820-4a78-b2d9-0c378cd1c2f0_m-Ex_0oWW.webp", "alt_text": "UHA미각당 사케루구미 찢어먹는 젤리 사워 레몬맛 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1495", "sku_code": "NPPIP-DEMO-1742968509", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1510", "category_id": "79", "name": "카메노 마가리 센베이 16개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:09.635745", "deleted_at": null,
    images: [{"product_image_id": "1494", "url": "https://ik.imagekit.io/oishidam/products/345a83a2-1246-44e8-9e7d-eb5db6f57ca3_qesMw1R9y.webp", "alt_text": "카메노 마가리 센베이 16개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1496", "sku_code": "NPPIP-DEMO-1550112413", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1511", "category_id": "72", "name": "닛신 컵누들 유럽풍 치즈 카레 85g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:10.828815", "deleted_at": null,
    images: [{"product_image_id": "1496", "url": "https://ik.imagekit.io/oishidam/products/f18ed699-eb04-4f8f-b99c-8ffb55fc6abc_xU8UGB-vE.webp", "alt_text": "닛신 컵누들 유럽풍 치즈 카레 85g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1497", "sku_code": "NPPIP-DEMO-1564105818", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1512", "category_id": "69", "name": "Q1 골든카레 198g 중간매운맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:10.783412", "deleted_at": null,
    images: [{"product_image_id": "1495", "url": "https://ik.imagekit.io/oishidam/products/fa807fa9-d87d-4980-ad40-d65c230f33ef_3PDnBZE9A.webp", "alt_text": "Q1 골든카레 198g 중간매운맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1498", "sku_code": "NPPIP-DEMO-1572950636", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1513", "category_id": "79", "name": "산코제과 치즈 아몬드 센베이 15개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:11.088098", "deleted_at": null,
    images: [{"product_image_id": "1497", "url": "https://ik.imagekit.io/oishidam/products/b33718cc-111e-4279-91b5-5bb0475f6f61_2usi-wdOj.webp", "alt_text": "산코제과 치즈 아몬드 센베이 15개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1499", "sku_code": "NPPIP-DEMO-1742284810", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1514", "category_id": "89", "name": "유라쿠제과 블랙썬더 미니바 대용량 오리지널", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:11.627091", "deleted_at": null,
    images: [{"product_image_id": "1498", "url": "https://ik.imagekit.io/oishidam/products/ff796b07-4483-4c70-a290-cdeece59878c_CbSEuoVF3.webp", "alt_text": "유라쿠제과 블랙썬더 미니바 대용량 오리지널", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1500", "sku_code": "NPPIP-DEMO-1739505278", "variant_name": "기본", "option_values": {}, "price": 4900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1515", "category_id": "87", "name": "용각산 목캔디 스틱 캔디 120max 10정", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:12.658837", "deleted_at": null,
    images: [{"product_image_id": "1499", "url": "https://ik.imagekit.io/oishidam/products/f431265c-f011-487d-b8fc-4cb458e62eda_6ZCZiOtdX.webp", "alt_text": "용각산 목캔디 스틱 캔디 120max 10정", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1501", "sku_code": "NPPIP-DEMO-1614909218", "variant_name": "기본", "option_values": {}, "price": 2200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1516", "category_id": "72", "name": "닛신 컵누들 똠양꿍 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:13.021888", "deleted_at": null,
    images: [{"product_image_id": "1501", "url": "https://ik.imagekit.io/oishidam/products/4fe52e43-35e8-4b01-9c01-0f65a1b28abf_NMbUDJD0y.webp", "alt_text": "닛신 컵누들 똠양꿍 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1502", "sku_code": "NPPIP-DEMO-1564109727", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1517", "category_id": "72", "name": "스가키야 카라카라우오 신신어 매운 일본 컵라면 136g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:12.943231", "deleted_at": null,
    images: [{"product_image_id": "1500", "url": "https://ik.imagekit.io/oishidam/products/f957419d-f780-4a8b-ba38-688739cf19e5_s_g9yuqqf.webp", "alt_text": "스가키야 카라카라우오 신신어 매운 일본 컵라면 136g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1503", "sku_code": "NPPIP-DEMO-1648783134", "variant_name": "기본", "option_values": {}, "price": 4900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1518", "category_id": "88", "name": "만난라이프 곤약젤리 크러쉬타입 2종 (사과/포도)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:13.585413", "deleted_at": null,
    images: [{"product_image_id": "1502", "url": "https://ik.imagekit.io/oishidam/products/e40aca15-4ec1-4e54-8174-6e5f450f631f_pOB4UxWRdp.webp", "alt_text": "만난라이프 곤약젤리 크러쉬타입 2종 (사과/포도)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1504", "sku_code": "NPPIP-DEMO-1743120995", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1519", "category_id": "87", "name": "[후지야]페코 밀키 우유맛 봉지 사탕 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:14.427827", "deleted_at": null,
    images: [{"product_image_id": "1503", "url": "https://ik.imagekit.io/oishidam/products/db8c9ffa-2648-45ee-8626-46f94ebaa71f_-HUzvO6C0.webp", "alt_text": "[후지야]페코 밀키 우유맛 봉지 사탕 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1505", "sku_code": "NPPIP-DEMO-1639468107", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1520", "category_id": "87", "name": "모리나가 하이츄 프리미엄 신 레몬맛 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:14.878125", "deleted_at": null,
    images: [{"product_image_id": "1504", "url": "https://ik.imagekit.io/oishidam/products/9ed79d27-05e2-45ec-855c-64addbecb61f_hMpoTqcX8.webp", "alt_text": "모리나가 하이츄 프리미엄 신 레몬맛 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1506", "sku_code": "NPPIP-DEMO-1771468382", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1521", "category_id": "66", "name": "세븐일레븐 바나나칩 초코 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:14.9398", "deleted_at": null,
    images: [{"product_image_id": "1505", "url": "https://ik.imagekit.io/oishidam/products/33d8d46a-4232-4ab5-8af0-5b6249893021_Z3zHId13Q.webp", "alt_text": "세븐일레븐 바나나칩 초코 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1507", "sku_code": "NPPIP-DEMO-1622777306", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1522", "category_id": "72", "name": "닛신 돈베이 돈베이 고기우동 미니 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:15.453727", "deleted_at": null,
    images: [{"product_image_id": "1506", "url": "https://ik.imagekit.io/oishidam/products/3cf14525-542a-4caf-ac3d-7e138b1fb819_3WcutTl2n.webp", "alt_text": "닛신 돈베이 돈베이 고기우동 미니 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1508", "sku_code": "NPPIP-DEMO-1639981968", "variant_name": "기본", "option_values": {}, "price": 1650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1523", "category_id": "75", "name": "쿠바라 우마타레 소스 3종 (양배추/토마토/오이)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:16.04461", "deleted_at": null,
    images: [{"product_image_id": "1507", "url": "https://ik.imagekit.io/oishidam/products/0f95ad61-453a-443f-8cf0-37c210d862fa_ex0c_W1Hc.webp", "alt_text": "쿠바라 우마타레 소스 3종 (양배추/토마토/오이)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1509", "sku_code": "NPPIP-DEMO-1750118926", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1524", "category_id": "73", "name": "ISDG 중화방 매콤한 봉지 마라탕 88g 3봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:16.717852", "deleted_at": null,
    images: [{"product_image_id": "1508", "url": "https://ik.imagekit.io/oishidam/products/4bdeff6d-c4ab-47b4-b5bf-f4fc713365ac_-zCYADziV.webp", "alt_text": "ISDG 중화방 매콤한 봉지 마라탕 88g 3봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1510", "sku_code": "NPPIP-DEMO-1776669040", "variant_name": "기본", "option_values": {}, "price": 8400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1525", "category_id": "87", "name": "노벨 오레노밀크 고농축 우유 캔디 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:16.841775", "deleted_at": null,
    images: [{"product_image_id": "1509", "url": "https://ik.imagekit.io/oishidam/products/d7d847e0-fae4-46ec-8bc0-a0fc91a32004_W9lsxdh52.webp", "alt_text": "노벨 오레노밀크 고농축 우유 캔디 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1511", "sku_code": "NPPIP-DEMO-1719540764", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1526", "category_id": "86", "name": "자일리톨 껌 포도", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:17.306341", "deleted_at": null,
    images: [{"product_image_id": "1510", "url": "https://ik.imagekit.io/oishidam/products/1aa8089d-7718-4652-a547-9fd3ca24ecb1_TW22OaP2mz.webp", "alt_text": "자일리톨 껌 포도", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1512", "sku_code": "NPPIP-DEMO-1625723033", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1527", "category_id": "70", "name": "아지노모토 크노르컵 스프 DELI 연어와 시금치 크림스프 파스타 39g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:17.927681", "deleted_at": null,
    images: [{"product_image_id": "1511", "url": "https://ik.imagekit.io/oishidam/products/9268264d-df84-4548-996f-63650d68b964_HvrPb0HlH.webp", "alt_text": "아지노모토 크노르컵 스프 DELI 연어와 시금치 크림스프 파스타 39g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1513", "sku_code": "NPPIP-DEMO-1664255795", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1528", "category_id": "89", "name": "롯데 샤샤 초콜릿 방순 말차맛 69g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:18.607589", "deleted_at": null,
    images: [{"product_image_id": "1512", "url": "https://ik.imagekit.io/oishidam/products/621a2bd4-1940-4ccc-a235-ddf0a9d3c448_g9aOIo_Kry.webp", "alt_text": "롯데 샤샤 초콜릿 방순 말차맛 69g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1514", "sku_code": "NPPIP-DEMO-1776828149", "variant_name": "기본", "option_values": {}, "price": 4550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1529", "category_id": "80", "name": "롯데 코알라노마치 딸기 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:18.809169", "deleted_at": null,
    images: [{"product_image_id": "1513", "url": "https://ik.imagekit.io/oishidam/products/cfe8e5b8-d043-480c-a47a-6a3007109d72_9yF4-lxfD.webp", "alt_text": "롯데 코알라노마치 딸기 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1515", "sku_code": "NPPIP-DEMO-1625732144", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1530", "category_id": "72", "name": "닛신 컵누들 담백한 맛 오리지널 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:19.13421", "deleted_at": null,
    images: [{"product_image_id": "1514", "url": "https://ik.imagekit.io/oishidam/products/3e702d31-2b84-4395-91d7-88fc8b334b6e_uQMTAiOob.webp", "alt_text": "닛신 컵누들 담백한 맛 오리지널 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1516", "sku_code": "NPPIP-DEMO-1564046816", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1531", "category_id": "89", "name": "롯데 샤샤 초콜릿 딸기맛 69g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:19.820173", "deleted_at": null,
    images: [{"product_image_id": "1515", "url": "https://ik.imagekit.io/oishidam/products/c5047dc9-b288-45d7-bbb8-3ad7e4627743_G2oEzr8PO.webp", "alt_text": "롯데 샤샤 초콜릿 딸기맛 69g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1517", "sku_code": "NPPIP-DEMO-1786519999", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1532", "category_id": "72", "name": "[명성]잇페이짱 야시장의 야키소바 곱빼기", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:20.599186", "deleted_at": null,
    images: [{"product_image_id": "1517", "url": "https://ik.imagekit.io/oishidam/products/4716fddd-77e3-4949-8885-f806d8b15a82_vWzLWmy02T.webp", "alt_text": "[명성]잇페이짱 야시장의 야키소바 곱빼기", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1518", "sku_code": "NPPIP-DEMO-1638956220", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1533", "category_id": "72", "name": "닛신 호빵맨 우동 부드러운 국물 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:20.551836", "deleted_at": null,
    images: [{"product_image_id": "1516", "url": "https://ik.imagekit.io/oishidam/products/19d5b585-c3a2-4f8b-9f1d-a22f2104875e_C97ygQGfj.webp", "alt_text": "닛신 호빵맨 우동 부드러운 국물 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1519", "sku_code": "NPPIP-DEMO-1624522489", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1534", "category_id": "87", "name": "아사히 민티아 플러스 보이스 레몬 진저", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:20.800701", "deleted_at": null,
    images: [{"product_image_id": "1518", "url": "https://ik.imagekit.io/oishidam/products/ba234a3a-e62d-4cca-a0d0-3e634b43111a_eUOPtvCvM.webp", "alt_text": "아사히 민티아 플러스 보이스 레몬 진저", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1520", "sku_code": "NPPIP-DEMO-178236569224", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1535", "category_id": "65", "name": "로손 치즈를 좋아하는 맛있는 치즈 대구 ® 64g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:21.765482", "deleted_at": null,
    images: [{"product_image_id": "1519", "url": "https://ik.imagekit.io/oishidam/products/fc282210-e435-44a4-9b06-0a809745797b_O0fRdoIXT.webp", "alt_text": "로손 치즈를 좋아하는 맛있는 치즈 대구 ® 64g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1521", "sku_code": "NPPIP-DEMO-1619749784", "variant_name": "기본", "option_values": {}, "price": 6450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1536", "category_id": "87", "name": "모리나가 하이츄 스파이더맨 콜라보 아소토 사워 스윙 믹스 68g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:22.544001", "deleted_at": null,
    images: [{"product_image_id": "1520", "url": "https://ik.imagekit.io/oishidam/products/cd5aa5e5-28aa-4180-8084-b9f839fe7b29_KNPLF7AMm.webp", "alt_text": "모리나가 하이츄 스파이더맨 콜라보 아소토 사워 스윙 믹스 68g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1522", "sku_code": "NPPIP-DEMO-17853978094", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1537", "category_id": "82", "name": "일본 도토루 포션 커피 블랙 무당 40개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:22.543004", "deleted_at": null,
    images: [{"product_image_id": "1521", "url": "https://ik.imagekit.io/oishidam/products/f00c40c4-034a-4032-a429-60c308dd9e3c_Bigs7q6gR.webp", "alt_text": "일본 도토루 포션 커피 블랙 무당 40개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1523", "sku_code": "NPPIP-DEMO-1754640742", "variant_name": "기본", "option_values": {}, "price": 20500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1538", "category_id": "79", "name": "부르봉 초코 리에르 리엘 초코 과자 14개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:22.75228", "deleted_at": null,
    images: [{"product_image_id": "1522", "url": "https://ik.imagekit.io/oishidam/products/efe3f509-b83d-4ef9-bede-512d3eb52be3_rSjWTrIoY.webp", "alt_text": "부르봉 초코 리에르 리엘 초코 과자 14개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1524", "sku_code": "NPPIP-DEMO-1742372528", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1539", "category_id": "75", "name": "소미 시오타레 시오다래 양배추 소스 320g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:23.413315", "deleted_at": null,
    images: [{"product_image_id": "1523", "url": "https://ik.imagekit.io/oishidam/products/a2c89357-0b09-4292-b01a-31850a2e5c3c_SdugkPiEF.webp", "alt_text": "소미 시오타레 시오다래 양배추 소스 320g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1525", "sku_code": "NPPIP-DEMO-1737591124", "variant_name": "기본", "option_values": {}, "price": 6950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1540", "category_id": "79", "name": "야마와키 제과 극상 땅콩 카린토우 117g 일본 맛동산 땅콩과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:24.425189", "deleted_at": null,
    images: [{"product_image_id": "1526", "url": "https://ik.imagekit.io/oishidam/products/81c43622-ca37-42ad-93a3-d836ee261d42_R83OKOPAq.webp", "alt_text": "야마와키 제과 극상 땅콩 카린토우 117g 일본 맛동산 땅콩과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1526", "sku_code": "NPPIP-DEMO-1754555075", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1541", "category_id": "72", "name": "일본 한정 삼양재팬 불닭볶음면 신상 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:24.442059", "deleted_at": null,
    images: [{"product_image_id": "1525", "url": "https://ik.imagekit.io/oishidam/products/1f1cae75-0089-4b5d-b396-f6dc008ddb2f_9UPvviOHt.webp", "alt_text": "일본 한정 삼양재팬 불닭볶음면 신상 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1527", "sku_code": "NPPIP-DEMO-1736923676", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1542", "category_id": "79", "name": "가루비 감자칩 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:24.442059", "deleted_at": null,
    images: [{"product_image_id": "1524", "url": "https://ik.imagekit.io/oishidam/products/1d1b9322-ccb0-4e8c-86d1-70baaa494e81_aLobbdtKy.webp", "alt_text": "가루비 감자칩 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1528", "sku_code": "NPPIP-DEMO-1703725089", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1543", "category_id": "88", "name": "★세트 할인★ 오리히로 곤약젤리 파우치 온주 귤맛 6개입 6개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:25.141297", "deleted_at": null,
    images: [{"product_image_id": "1527", "url": "https://ik.imagekit.io/oishidam/products/64ccf45d-fca1-4a2d-b738-2225a52d99d8_ieCPjeUfd_.webp", "alt_text": "★세트 할인★ 오리히로 곤약젤리 파우치 온주 귤맛 6개입 6개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1529", "sku_code": "NPPIP-DEMO-1764297502", "variant_name": "기본", "option_values": {}, "price": 8000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1544", "category_id": "79", "name": "카키노타네 와사비맛 6봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:26.355846", "deleted_at": null,
    images: [{"product_image_id": "1529", "url": "https://ik.imagekit.io/oishidam/products/80c2e52b-f8f0-4fdb-aa0a-e12b4c277e2c_65hcewxReD.webp", "alt_text": "카키노타네 와사비맛 6봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1530", "sku_code": "NPPIP-DEMO-1550114299", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1545", "category_id": "80", "name": "이토우제과 랭글리 초콜릿 과자 쿠키", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:26.121536", "deleted_at": null,
    images: [{"product_image_id": "1528", "url": "https://ik.imagekit.io/oishidam/products/0c462803-17df-47fc-9ba1-6b996812abb9_at_DWZEOB.webp", "alt_text": "이토우제과 랭글리 초콜릿 과자 쿠키", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1531", "sku_code": "NPPIP-DEMO-1658977945", "variant_name": "기본", "option_values": {}, "price": 3100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1546", "category_id": "66", "name": "세븐일레븐 세븐일레븐 싯토리초코 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:26.58222", "deleted_at": null,
    images: [{"product_image_id": "1530", "url": "https://ik.imagekit.io/oishidam/products/015b3997-071d-465c-9c87-7e1756e5819f_BHaZlWRwmy.webp", "alt_text": "세븐일레븐 세븐일레븐 싯토리초코 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1532", "sku_code": "NPPIP-DEMO-1622684645", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1547", "category_id": "72", "name": "닛신 컵누들 미니 카레 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:26.902553", "deleted_at": null,
    images: [{"product_image_id": "1531", "url": "https://ik.imagekit.io/oishidam/products/d4059f31-f270-43ce-a99d-7c43e5594d4d_s0XOtiVfC.webp", "alt_text": "닛신 컵누들 미니 카레 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1533", "sku_code": "NPPIP-DEMO-1564046611", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1548", "category_id": "89", "name": "메이지 pucca 푸카 소금 밀크 일본 초콜릿 과자 39g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:28.0656", "deleted_at": null,
    images: [{"product_image_id": "1532", "url": "https://ik.imagekit.io/oishidam/products/559a80ac-c513-47aa-9c0d-acb1e82a2453_-EQrantum.webp", "alt_text": "메이지 pucca 푸카 소금 밀크 일본 초콜릿 과자 39g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1534", "sku_code": "NPPIP-DEMO-1782785302", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1549", "category_id": "79", "name": "스즈노야 키나코봉 일본 콩가루봉 과자 스틱 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:28.284708", "deleted_at": null,
    images: [{"product_image_id": "1533", "url": "https://ik.imagekit.io/oishidam/products/c704d7f9-aec8-436a-95f7-60f027904850_OcfqcxHNv.webp", "alt_text": "스즈노야 키나코봉 일본 콩가루봉 과자 스틱 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1535", "sku_code": "NPPIP-DEMO-1781586768", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1550", "category_id": "72", "name": "닛신 돈베이 카레 우동 87g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:28.534826", "deleted_at": null,
    images: [{"product_image_id": "1534", "url": "https://ik.imagekit.io/oishidam/products/766454b5-b0fc-4e20-a98c-507ba6404b1f__cKK25Qe_t.webp", "alt_text": "닛신 돈베이 카레 우동 87g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1536", "sku_code": "NPPIP-DEMO-1639981669", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1551", "category_id": "89", "name": "메이지 아몬드 초콜릿 88g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:28.816675", "deleted_at": null,
    images: [{"product_image_id": "1535", "url": "https://ik.imagekit.io/oishidam/products/b8cd9520-0aff-424d-9938-296c186bd9cb_iJ7ySCEag.webp", "alt_text": "메이지 아몬드 초콜릿 88g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1537", "sku_code": "NPPIP-DEMO-1624846147", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1552", "category_id": "66", "name": "세븐일레븐 오징어 센베이 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:29.939651", "deleted_at": null,
    images: [{"product_image_id": "1536", "url": "https://ik.imagekit.io/oishidam/products/4eaa8938-683f-44f9-94c3-08ea9299c1ef_APfIHstxi.webp", "alt_text": "세븐일레븐 오징어 센베이 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1538", "sku_code": "NPPIP-DEMO-1622685754", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1553", "category_id": "72", "name": "닛신 컵누들 담백한 맛 카레 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:30.049048", "deleted_at": null,
    images: [{"product_image_id": "1537", "url": "https://ik.imagekit.io/oishidam/products/039b9967-d3d9-4257-83e7-12876d62ac57_3zfm6Ueql.webp", "alt_text": "닛신 컵누들 담백한 맛 카레 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1539", "sku_code": "NPPIP-DEMO-1564047413", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1554", "category_id": "79", "name": "가루비 자가리코 감자버터맛 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:30.407339", "deleted_at": null,
    images: [{"product_image_id": "1538", "url": "https://ik.imagekit.io/oishidam/products/6a23266a-9437-4d13-9b18-f3dd602a2906_uuIygm20j.webp", "alt_text": "가루비 자가리코 감자버터맛 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1540", "sku_code": "NPPIP-DEMO-1550133847", "variant_name": "기본", "option_values": {}, "price": 2200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1555", "category_id": "75", "name": "닛신 마마 케차피 나폴리탄 파스타 케찹 스파게티 소스 300g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:30.4547", "deleted_at": null,
    images: [{"product_image_id": "1539", "url": "https://ik.imagekit.io/oishidam/products/b32636c7-e547-4476-a25f-3202235e3be8__oqVKxFdr.webp", "alt_text": "닛신 마마 케차피 나폴리탄 파스타 케찹 스파게티 소스 300g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1541", "sku_code": "NPPIP-DEMO-1735548297", "variant_name": "기본", "option_values": {}, "price": 6200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1556", "category_id": "72", "name": "닛신 돈베이 담백한 국물 키자미아게우동 68g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:31.774032", "deleted_at": null,
    images: [{"product_image_id": "1540", "url": "https://ik.imagekit.io/oishidam/products/82f9c2d3-178f-4c7b-856d-e092bde4258c_eyKxK7pWd.webp", "alt_text": "닛신 돈베이 담백한 국물 키자미아게우동 68g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1542", "sku_code": "NPPIP-DEMO-1658991390", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1557", "category_id": "87", "name": "아사히 바야리스 행복의 과실 목캔디 103g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:31.924098", "deleted_at": null,
    images: [{"product_image_id": "1541", "url": "https://ik.imagekit.io/oishidam/products/53a8f465-5e11-443f-968d-5675e1782529_fQhL6wmzG.webp", "alt_text": "아사히 바야리스 행복의 과실 목캔디 103g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1543", "sku_code": "NPPIP-DEMO-1782712231", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1558", "category_id": "87", "name": "다이마루혼포 키나코 아메 콩가루 사탕 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:32.260527", "deleted_at": null,
    images: [{"product_image_id": "1542", "url": "https://ik.imagekit.io/oishidam/products/39f5a2fd-f4f0-4a2f-93f2-41d9d60aa306_wywI8MZAM.webp", "alt_text": "다이마루혼포 키나코 아메 콩가루 사탕 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1544", "sku_code": "NPPIP-DEMO-1744080418", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1559", "category_id": "75", "name": "S&B 토우가라시 시치미 일본 매운맛 조미료", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:32.281738", "deleted_at": null,
    images: [{"product_image_id": "1543", "url": "https://ik.imagekit.io/oishidam/products/270c9af3-bae4-4bca-9b52-0418158a8329_bSeY8IjCR.webp", "alt_text": "S&B 토우가라시 시치미 일본 매운맛 조미료", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1545", "sku_code": "NPPIP-DEMO-1772162920", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1560", "category_id": "69", "name": "하우스 홋카이도 스튜 크림 180g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:33.748063", "deleted_at": null,
    images: [{"product_image_id": "1544", "url": "https://ik.imagekit.io/oishidam/products/b799b68e-5f79-451a-8862-3ff5cb79aacf_4_1p2Sy7J.webp", "alt_text": "하우스 홋카이도 스튜 크림 180g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1546", "sku_code": "NPPIP-DEMO-1660286232", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1561", "category_id": "66", "name": "세븐일레븐 랑드샤 초코 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:33.839458", "deleted_at": null,
    images: [{"product_image_id": "1545", "url": "https://ik.imagekit.io/oishidam/products/8006901f-1a39-4257-bf26-59bf3de0cfc0_CHDnhFwPX.webp", "alt_text": "세븐일레븐 랑드샤 초코 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1547", "sku_code": "NPPIP-DEMO-1622691010", "variant_name": "기본", "option_values": {}, "price": 3100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1562", "category_id": "88", "name": "오리히로 푸룬토 곤약젤리 스탠딩 칼로리 제로 꿀 사과 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:33.918612", "deleted_at": null,
    images: [{"product_image_id": "1546", "url": "https://ik.imagekit.io/oishidam/products/7311ca07-1034-4539-9469-1887c3f59722_B5vPy_ad6.webp", "alt_text": "오리히로 푸룬토 곤약젤리 스탠딩 칼로리 제로 꿀 사과 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1548", "sku_code": "NPPIP-DEMO-1612950878", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1563", "category_id": "87", "name": "용각산 목캔디 파우치 120max 88g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:34.246168", "deleted_at": null,
    images: [{"product_image_id": "1547", "url": "https://ik.imagekit.io/oishidam/products/c2af7120-6c9a-4309-8246-e1f0a7b3db7b_sFX7SKXtJ.webp", "alt_text": "용각산 목캔디 파우치 120max 88g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1549", "sku_code": "NPPIP-DEMO-1747798723", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1564", "category_id": "87", "name": "칸로 킨노밀크 금의 밀크 초농축 캔디 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:35.526252", "deleted_at": null,
    images: [{"product_image_id": "1548", "url": "https://ik.imagekit.io/oishidam/products/872be1d6-f1ec-4a08-b2ba-e5a4a7cc42a8_055H-IRj-.webp", "alt_text": "칸로 킨노밀크 금의 밀크 초농축 캔디 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1550", "sku_code": "NPPIP-DEMO-1719544489", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1565", "category_id": "88", "name": "페투치네 구미 소다맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:35.709023", "deleted_at": null,
    images: [{"product_image_id": "1550", "url": "https://ik.imagekit.io/oishidam/products/1d15ad2a-b0c1-4783-9138-e2a73ccdca98_O5xRprYoP.webp", "alt_text": "페투치네 구미 소다맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1551", "sku_code": "NPPIP-DEMO-1548655027", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1566", "category_id": "72", "name": "닛신 컵누들 오리지널 77g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:35.582785", "deleted_at": null,
    images: [{"product_image_id": "1549", "url": "https://ik.imagekit.io/oishidam/products/9e3154f3-a962-473c-8943-78a5ea649035_NaXFfMUDoT.webp", "alt_text": "닛신 컵누들 오리지널 77g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1552", "sku_code": "NPPIP-DEMO-1564047786", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1567", "category_id": "69", "name": "마루미야 캐릭터 카레 포크앤콘 순한맛 랜덤 스티커 포함 6종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:36.078994", "deleted_at": null,
    images: [{"product_image_id": "1551", "url": "https://ik.imagekit.io/oishidam/products/bc35a1ac-4386-4718-a6b8-3b343261690c_5cMr6gC1lK.webp", "alt_text": "마루미야 캐릭터 카레 포크앤콘 순한맛 랜덤 스티커 포함 6종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1553", "sku_code": "NPPIP-DEMO-1739864524", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1568", "category_id": "66", "name": "세븐일레븐 완두콩 칩스 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:37.403915", "deleted_at": null,
    images: [{"product_image_id": "1553", "url": "https://ik.imagekit.io/oishidam/products/8eb103c9-4687-4111-a5b8-261d5e25cc8a_K3CCNBmLK.webp", "alt_text": "세븐일레븐 완두콩 칩스 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1554", "sku_code": "NPPIP-DEMO-1622684772", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1569", "category_id": "91", "name": "하우스 푸딩 믹스 74g (4인분)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:37.292625", "deleted_at": null,
    images: [{"product_image_id": "1552", "url": "https://ik.imagekit.io/oishidam/products/2b27f23b-f3ae-4e0e-9185-45233518e3b4_jpdQgH-hP.webp", "alt_text": "하우스 푸딩 믹스 74g (4인분)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1555", "sku_code": "NPPIP-DEMO-1616745023", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1570", "category_id": "89", "name": "글리코 빼빼로 겨울의 쿠치토케 포키 코코아맛 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:37.604825", "deleted_at": null,
    images: [{"product_image_id": "1554", "url": "https://ik.imagekit.io/oishidam/products/4c754dd2-df7a-4ee7-8af3-77233efebb8c_BpfVYHum1.webp", "alt_text": "글리코 빼빼로 겨울의 쿠치토케 포키 코코아맛 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1556", "sku_code": "NPPIP-DEMO-1791266802", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1571", "category_id": "88", "name": "라이온 소노만마 레몬/유자/여름감귤", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:37.792675", "deleted_at": null,
    images: [{"product_image_id": "1555", "url": "https://ik.imagekit.io/oishidam/products/c5be8811-2b73-4fbe-81d3-1872673357db_jf0EJZ_cF.webp", "alt_text": "라이온 소노만마 레몬/유자/여름감귤", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1557", "sku_code": "NPPIP-DEMO-1739145737", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1572", "category_id": "79", "name": "가루비 카타아게 포테이토 김맛 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:39.195797", "deleted_at": null,
    images: [{"product_image_id": "1556", "url": "https://ik.imagekit.io/oishidam/products/77a806f7-3dcb-406d-9187-b47269060ce8_Gk4vKnLD8.webp", "alt_text": "가루비 카타아게 포테이토 김맛 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1558", "sku_code": "NPPIP-DEMO-1566881120", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1573", "category_id": "88", "name": "오리히로 곤약젤리 얼려먹는 아이스시리즈 귤+포도 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:39.539174", "deleted_at": null,
    images: [{"product_image_id": "1557", "url": "https://ik.imagekit.io/oishidam/products/28410e2a-3a68-4606-b997-920b396dde34_lXfoGz6zO.webp", "alt_text": "오리히로 곤약젤리 얼려먹는 아이스시리즈 귤+포도 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1559", "sku_code": "NPPIP-DEMO-17739019249", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1574", "category_id": "73", "name": "마루타이 쿠마모토 쿠로마유 돈코츠라멘 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:39.723531", "deleted_at": null,
    images: [{"product_image_id": "1558", "url": "https://ik.imagekit.io/oishidam/products/fbdcfe6b-8248-4c8b-8459-9aac2a5afd7a_nDx5HZKbP.webp", "alt_text": "마루타이 쿠마모토 쿠로마유 돈코츠라멘 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1560", "sku_code": "NPPIP-DEMO-1660286220", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1575", "category_id": "72", "name": "닛신 돈베이 고기우동 95g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:39.707386", "deleted_at": null,
    images: [{"product_image_id": "1559", "url": "https://ik.imagekit.io/oishidam/products/ecb07452-eeca-4cc8-a35f-c8c067d67313_XHZKrZVgU.webp", "alt_text": "닛신 돈베이 고기우동 95g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1561", "sku_code": "NPPIP-DEMO-1658970609", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1576", "category_id": "87", "name": "UHA미각당 특농 밀크 캔디 8.2 88g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:41.055609", "deleted_at": null,
    images: [{"product_image_id": "1560", "url": "https://ik.imagekit.io/oishidam/products/9cf1e777-bcf6-4fbb-b338-25f9174aeaa9_E8X9Tk7Qg.webp", "alt_text": "UHA미각당 특농 밀크 캔디 8.2 88g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1562", "sku_code": "NPPIP-DEMO-1624881039", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1577", "category_id": "72", "name": "닛신 면장인 라면 장인 된장 라멘 96g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:41.400069", "deleted_at": null,
    images: [{"product_image_id": "1562", "url": "https://ik.imagekit.io/oishidam/products/65e93e4d-efc3-4dff-a6cb-30ead4cfda4a_GsR75UEyB.webp", "alt_text": "닛신 면장인 라면 장인 된장 라멘 96g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1563", "sku_code": "NPPIP-DEMO-1564119221", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1578", "category_id": "89", "name": "메이지 블랙 초콜릿 BOX (26매)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:41.664562", "deleted_at": null,
    images: [{"product_image_id": "1563", "url": "https://ik.imagekit.io/oishidam/products/0023f29e-7fc7-4580-8359-f61b9a1aad58_eXYQAgUbj.webp", "alt_text": "메이지 블랙 초콜릿 BOX (26매)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1564", "sku_code": "NPPIP-DEMO-1624848470", "variant_name": "기본", "option_values": {}, "price": 6000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1579", "category_id": "79", "name": "부르봉 훈와리 오믈렛 방순 바나나맛 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:41.384409", "deleted_at": null,
    images: [{"product_image_id": "1561", "url": "https://ik.imagekit.io/oishidam/products/45a7aa22-669d-457c-95f3-9bddb89daa19_zVOObh9uw.webp", "alt_text": "부르봉 훈와리 오믈렛 방순 바나나맛 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1565", "sku_code": "NPPIP-DEMO-1775695458", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1580", "category_id": "79", "name": "포타포타야키 센베이 20개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:43.057936", "deleted_at": null,
    images: [{"product_image_id": "1564", "url": "https://ik.imagekit.io/oishidam/products/6e17a519-0f14-4388-9a23-39e08e927daf_Yr-Vm6fxT.webp", "alt_text": "포타포타야키 센베이 20개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1566", "sku_code": "NPPIP-DEMO-1550114498", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1581", "category_id": "79", "name": "카라무쵸 포테이토칩 핫칠리맛 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:43.183059", "deleted_at": null,
    images: [{"product_image_id": "1565", "url": "https://ik.imagekit.io/oishidam/products/bffce813-9924-4c1d-9f06-3d3d67fa45a8_SioNgKftV.webp", "alt_text": "카라무쵸 포테이토칩 핫칠리맛 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1567", "sku_code": "NPPIP-DEMO-1550046501", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1582", "category_id": "69", "name": "글리코 ZEPPIN 제핀 카레 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:43.285192", "deleted_at": null,
    images: [{"product_image_id": "1566", "url": "https://ik.imagekit.io/oishidam/products/318d0b3d-7f9a-45bb-9740-0b7d80321aa8_OuqQlqLQ-.webp", "alt_text": "글리코 ZEPPIN 제핀 카레 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1568", "sku_code": "NPPIP-DEMO-1771898947", "variant_name": "기본", "option_values": {}, "price": 6300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1583", "category_id": "67", "name": "패밀리마트 소재의 풍미를 살린 구운 오징어 소면 14g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:43.487389", "deleted_at": null,
    images: [{"product_image_id": "1567", "url": "https://ik.imagekit.io/oishidam/products/20521ab6-a6bf-402b-8a96-0e3d663c0d3b_8uaRCX_xP.webp", "alt_text": "패밀리마트 소재의 풍미를 살린 구운 오징어 소면 14g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1569", "sku_code": "NPPIP-DEMO-1770279859", "variant_name": "기본", "option_values": {}, "price": 4650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1584", "category_id": "73", "name": "마루짱 즈반 ZUBAAAN! 봉지 라멘 3봉입 6종 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:45.031189", "deleted_at": null,
    images: [{"product_image_id": "1568", "url": "https://ik.imagekit.io/oishidam/products/78bafc9d-8528-4f1b-9fbe-6404836cd4d7_pgQ_e6xiB.webp", "alt_text": "마루짱 즈반 ZUBAAAN! 봉지 라멘 3봉입 6종 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1570", "sku_code": "NPPIP-DEMO-1739151732", "variant_name": "기본", "option_values": {}, "price": 7000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1585", "category_id": "80", "name": "후지야 컨트리맘 초코마미레48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:45.091836", "deleted_at": null,
    images: [{"product_image_id": "1569", "url": "https://ik.imagekit.io/oishidam/products/bff57ffb-6305-4f98-a9b8-d5cd02a77a65_wmAOxIDa7.webp", "alt_text": "후지야 컨트리맘 초코마미레48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1571", "sku_code": "NPPIP-DEMO-1736401403", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1586", "category_id": "72", "name": "닛신 돈베이 담백한 국물 고기 육수 우동 72g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:45.296154", "deleted_at": null,
    images: [{"product_image_id": "1570", "url": "https://ik.imagekit.io/oishidam/products/9ae639bd-c8d3-42b1-9aea-386ff3448446_VdHcWvFp7.webp", "alt_text": "닛신 돈베이 담백한 국물 고기 육수 우동 72g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1572", "sku_code": "NPPIP-DEMO-1658991521", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1587", "category_id": "75", "name": "에스앤비 섞기만 하면 되는 스파게티 소스 생맛 매콤 명란젓", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:45.373404", "deleted_at": null,
    images: [{"product_image_id": "1571", "url": "https://ik.imagekit.io/oishidam/products/984c0332-3291-4526-bb2f-14be5f437f99_bbtJn470Z.webp", "alt_text": "에스앤비 섞기만 하면 되는 스파게티 소스 생맛 매콤 명란젓", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1573", "sku_code": "NPPIP-DEMO-1637221175", "variant_name": "기본", "option_values": {}, "price": 2960, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1588", "category_id": "79", "name": "UHA미각당 오사츠도키 포켓몬스터 초콜릿맛 고구마칩 37g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1572", "url": "https://ik.imagekit.io/oishidam/products/3b17767e-99bb-4835-aa54-1720387ae73b_0rUVS7NPL.webp", "alt_text": "UHA미각당 오사츠도키 포켓몬스터 초콜릿맛 고구마칩 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1574", "sku_code": "NPPIP-DEMO-1778226377", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1589", "category_id": "94", "name": "나가타니엔 볶음밥 3종 (돼지구이/야채)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:47.116681", "deleted_at": null,
    images: [{"product_image_id": "1573", "url": "https://ik.imagekit.io/oishidam/products/de4e8118-870f-4ace-9579-c26bc739f5ce_0CvooFMHD.webp", "alt_text": "나가타니엔 볶음밥 3종 (돼지구이/야채)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1575", "sku_code": "NPPIP-DEMO-1660286123", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1590", "category_id": "86", "name": "이에 잘 붙지 않는 매실 껌", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:47.147389", "deleted_at": null,
    images: [{"product_image_id": "1574", "url": "https://ik.imagekit.io/oishidam/products/6419b332-ed90-451b-af7b-c7eb03daeddc_qpFrAWQzm.webp", "alt_text": "이에 잘 붙지 않는 매실 껌", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1576", "sku_code": "NPPIP-DEMO-1625727828", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1591", "category_id": "88", "name": "UHA미각당 시게킥쿠스 신맛의 소다 젤리 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:47.269946", "deleted_at": null,
    images: [{"product_image_id": "1575", "url": "https://ik.imagekit.io/oishidam/products/ce3ba72e-c67c-41d8-b027-3a7e82a8ce8e_8wLHSYkp9.webp", "alt_text": "UHA미각당 시게킥쿠스 신맛의 소다 젤리 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1577", "sku_code": "NPPIP-DEMO-1750304660", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1592", "category_id": "80", "name": "닛신 코코넛 사브레 16개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:48.798117", "deleted_at": null,
    images: [{"product_image_id": "1577", "url": "https://ik.imagekit.io/oishidam/products/b672d1c2-40da-47d4-8e4c-350cb567150d_SESW73P8b.webp", "alt_text": "닛신 코코넛 사브레 16개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1578", "sku_code": "NPPIP-DEMO-1660286110", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1593", "category_id": "83", "name": "이토엔 건강 미네랄 무기차 보리차 파우더 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:48.94865", "deleted_at": null,
    images: [{"product_image_id": "1578", "url": "https://ik.imagekit.io/oishidam/products/b00909fc-99e5-423a-8a91-a32a1ca0e333_J2UayxmLO.webp", "alt_text": "이토엔 건강 미네랄 무기차 보리차 파우더 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1579", "sku_code": "NPPIP-DEMO-1635839089", "variant_name": "기본", "option_values": {}, "price": 7450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1594", "category_id": "72", "name": "닛신 컵누들 미니 오리지널 36g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:48.768528", "deleted_at": null,
    images: [{"product_image_id": "1576", "url": "https://ik.imagekit.io/oishidam/products/cf014f04-2548-4e5a-b914-b3a3d0942b54_tE_Fp_lrT.webp", "alt_text": "닛신 컵누들 미니 오리지널 36g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1580", "sku_code": "NPPIP-DEMO-1564045768", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1595", "category_id": "87", "name": "모리나가 하이츄 아소토 연유 바나나 딸기맛 68g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:49.189747", "deleted_at": null,
    images: [{"product_image_id": "1579", "url": "https://ik.imagekit.io/oishidam/products/d587b8e9-3e74-4a7d-9377-c8c60ac557a1_s2HehV3WN.webp", "alt_text": "모리나가 하이츄 아소토 연유 바나나 딸기맛 68g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1581", "sku_code": "NPPIP-DEMO-1781681411", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1596", "category_id": "72", "name": "ISDG 중화방 마라탕 매콤한 컵 당면 빅컵 대용량 103g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:50.867449", "deleted_at": null,
    images: [{"product_image_id": "1580", "url": "https://ik.imagekit.io/oishidam/products/ddba8c31-072a-422f-b1cd-7d1b72f7bfc1_blnnXaept.webp", "alt_text": "ISDG 중화방 마라탕 매콤한 컵 당면 빅컵 대용량 103g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1582", "sku_code": "NPPIP-DEMO-1784005847", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1597", "category_id": "79", "name": "메이지 미니 버섯산과 죽순마을 딸기 쇼콜라맛 8봉지입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:50.91445", "deleted_at": null,
    images: [{"product_image_id": "1582", "url": "https://ik.imagekit.io/oishidam/products/f56295e4-7095-4b5b-916e-874e212f9d28_cnk5HinrS.webp", "alt_text": "메이지 미니 버섯산과 죽순마을 딸기 쇼콜라맛 8봉지입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1583", "sku_code": "NPPIP-DEMO-1764307811", "variant_name": "기본", "option_values": {}, "price": 5750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1598", "category_id": "93", "name": "일본 캐릭터 오차즈케 랜덤 스티커 포함", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:50.846283", "deleted_at": null,
    images: [{"product_image_id": "1581", "url": "https://ik.imagekit.io/oishidam/products/6254b68c-b6f0-435d-b75d-8aac9a3a5dee_EB8PfcKyj.webp", "alt_text": "일본 캐릭터 오차즈케 랜덤 스티커 포함", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1584", "sku_code": "NPPIP-DEMO-1741241778", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1599", "category_id": "67", "name": "패밀리마트 감자칩 일품 소금맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:51.116802", "deleted_at": null,
    images: [{"product_image_id": "1583", "url": "https://ik.imagekit.io/oishidam/products/8b406646-5884-4e4e-b77d-a4fa425a2db5_-FLjghSql.webp", "alt_text": "패밀리마트 감자칩 일품 소금맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1585", "sku_code": "NPPIP-DEMO-1623222118", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1600", "category_id": "88", "name": "부르봉 샤리모니 구미 젤리3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:52.687383", "deleted_at": null,
    images: [{"product_image_id": "1586", "url": "https://ik.imagekit.io/oishidam/products/aae90c6c-bfad-425c-842d-b7c1093daa78_Y-zV3EAfM.webp", "alt_text": "부르봉 샤리모니 구미 젤리3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1586", "sku_code": "NPPIP-DEMO-1744161450", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1601", "category_id": "89", "name": "글리코 포키 츠부츠부 딸기맛 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:52.565356", "deleted_at": null,
    images: [{"product_image_id": "1585", "url": "https://ik.imagekit.io/oishidam/products/30eb1c54-b30f-4d6f-af4d-83d7fffe7718_JQ9Gn1Y7N.webp", "alt_text": "글리코 포키 츠부츠부 딸기맛 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1587", "sku_code": "NPPIP-DEMO-1656552708", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1602", "category_id": "83", "name": "이토엔 오이오차 에코 티백 녹차 20봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:52.532469", "deleted_at": null,
    images: [{"product_image_id": "1584", "url": "https://ik.imagekit.io/oishidam/products/256ba440-6046-41e1-ba80-a2d38ebf3cba_JyOe7fUCXK.webp", "alt_text": "이토엔 오이오차 에코 티백 녹차 20봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1588", "sku_code": "NPPIP-DEMO-1635837263", "variant_name": "기본", "option_values": {}, "price": 5700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1603", "category_id": "72", "name": "닛신 라면 모음전 - 컵누들 6개 세트 (맛 선택)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:53.062564", "deleted_at": null,
    images: [{"product_image_id": "1587", "url": "https://ik.imagekit.io/oishidam/products/fd9813a4-09b6-465a-b9a2-b6a73bbe2544_Qr6WGzZRM.webp", "alt_text": "닛신 라면 모음전 - 컵누들 6개 세트 (맛 선택)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1589", "sku_code": "NPPIP-DEMO-1647565123", "variant_name": "기본", "option_values": {}, "price": 19000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1604", "category_id": "80", "name": "메이지 키노코타케노코 아소토 쿠키 바닐라맛 8봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:54.542463", "deleted_at": null,
    images: [{"product_image_id": "1589", "url": "https://ik.imagekit.io/oishidam/products/951c8238-4c14-4782-aef8-5f7903c3b389_0oKREyg7z.webp", "alt_text": "메이지 키노코타케노코 아소토 쿠키 바닐라맛 8봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1590", "sku_code": "NPPIP-DEMO-1780559935", "variant_name": "기본", "option_values": {}, "price": 5250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1605", "category_id": "89", "name": "퓨아레 오리지널 티라미수 아몬드 초콜릿 대용량 405g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:54.418317", "deleted_at": null,
    images: [{"product_image_id": "1588", "url": "https://ik.imagekit.io/oishidam/products/74075374-b416-481f-a321-ed23ff39607e_MQAM4BeZ1.webp", "alt_text": "퓨아레 오리지널 티라미수 아몬드 초콜릿 대용량 405g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1591", "sku_code": "NPPIP-DEMO-17727762323", "variant_name": "기본", "option_values": {}, "price": 25000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1606", "category_id": "79", "name": "가루비 자가리코 감자버터맛 L사이즈 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:54.744455", "deleted_at": null,
    images: [{"product_image_id": "1590", "url": "https://ik.imagekit.io/oishidam/products/eacceb3d-6342-4d6a-9922-f72b2674be8d_sr2BKJVAl.webp", "alt_text": "가루비 자가리코 감자버터맛 L사이즈 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1592", "sku_code": "NPPIP-DEMO-1758693556", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1607", "category_id": "87", "name": "용각산 스틱 블루 10개입 10개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:54.870453", "deleted_at": null,
    images: [{"product_image_id": "1591", "url": "https://ik.imagekit.io/oishidam/products/4dd26a9b-d501-4272-91f8-85e282e4bcba_abhO2O-9G.webp", "alt_text": "용각산 스틱 블루 10개입 10개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1593", "sku_code": "NPPIP-DEMO-1747796338", "variant_name": "기본", "option_values": {}, "price": 15000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1608", "category_id": "87", "name": "센자쿠 바다의 소다 사탕 캔디 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:56.346199", "deleted_at": null,
    images: [{"product_image_id": "1592", "url": "https://ik.imagekit.io/oishidam/products/3dada503-7366-4338-8f9f-e53d8c75d4ce_mTz72oWMy.webp", "alt_text": "센자쿠 바다의 소다 사탕 캔디 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1594", "sku_code": "NPPIP-DEMO-1739502414", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1609", "category_id": "66", "name": "세븐일레븐 몽고탄멘 나카모토 매운 된장맛 두부 스프 18g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:56.476082", "deleted_at": null,
    images: [{"product_image_id": "1594", "url": "https://ik.imagekit.io/oishidam/products/e7fa9085-b9ef-428f-bb8c-ec551f2aadb8_U0Vlo3tuM.webp", "alt_text": "세븐일레븐 몽고탄멘 나카모토 매운 된장맛 두부 스프 18g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1595", "sku_code": "NPPIP-DEMO-1634787584", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1610", "category_id": "87", "name": "아사히 기능성 영양 캔디 진한 과일맛 사탕 5종 (블루베리/귤/딸기/망고/사과)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:56.424599", "deleted_at": null,
    images: [{"product_image_id": "1593", "url": "https://ik.imagekit.io/oishidam/products/e66209d5-9ac0-4149-89ac-69488f8733e5_i8OlPYj91.webp", "alt_text": "아사히 기능성 영양 캔디 진한 과일맛 사탕 5종 (블루베리/귤/딸기/망고/사과)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1596", "sku_code": "NPPIP-DEMO-1739340023", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1611", "category_id": "88", "name": "UHA미각당 푸쵸 스틱 수박맛 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:56.768118", "deleted_at": null,
    images: [{"product_image_id": "1595", "url": "https://ik.imagekit.io/oishidam/products/66fe761f-7d97-4548-a57d-ac2957e49c07_pGus9yDlU7.webp", "alt_text": "UHA미각당 푸쵸 스틱 수박맛 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1597", "sku_code": "NPPIP-DEMO-1784872578", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1612", "category_id": "79", "name": "파스토재팬 야끼 호시이모 슬라이스 75g 구워 말린 일본 고구마 말랭이", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:57.998516", "deleted_at": null,
    images: [{"product_image_id": "1596", "url": "https://ik.imagekit.io/oishidam/products/b9ded4cb-1f6a-406c-8615-bdcc854ba6a9_xGcrAb-yq.webp", "alt_text": "파스토재팬 야끼 호시이모 슬라이스 75g 구워 말린 일본 고구마 말랭이", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1598", "sku_code": "NPPIP-DEMO-1784013430", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1613", "category_id": "72", "name": "동양수산 마루짱 완탕 간장맛 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:58.059549", "deleted_at": null,
    images: [{"product_image_id": "1597", "url": "https://ik.imagekit.io/oishidam/products/0520a531-8aab-4546-ad52-f4737340b432_W7ilhbrCA.webp", "alt_text": "동양수산 마루짱 완탕 간장맛 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1599", "sku_code": "NPPIP-DEMO-1721606483", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1614", "category_id": "88", "name": "칸로 퓨레구미 청포도 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:58.1384", "deleted_at": null,
    images: [{"product_image_id": "1598", "url": "https://ik.imagekit.io/oishidam/products/48841096-065b-4682-8832-ef6e667e1637_ptPVI5AED.webp", "alt_text": "칸로 퓨레구미 청포도 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1600", "sku_code": "NPPIP-DEMO-1548384286", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1615", "category_id": "72", "name": "닛신 컵누들 씨푸드 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:58.514311", "deleted_at": null,
    images: [{"product_image_id": "1599", "url": "https://ik.imagekit.io/oishidam/products/de83eb44-f83d-47e3-aa2d-c4448c0a907d_fqT4FR7oQ.webp", "alt_text": "닛신 컵누들 씨푸드 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1601", "sku_code": "NPPIP-DEMO-1564047939", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1616", "category_id": "87", "name": "모리나가 하이츄 아소토 세가지 과일맛 94g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:59.808349", "deleted_at": null,
    images: [{"product_image_id": "1601", "url": "https://ik.imagekit.io/oishidam/products/d591419e-4e69-48c0-859c-10591612e499_V9UEvLo5j.webp", "alt_text": "모리나가 하이츄 아소토 세가지 과일맛 94g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1602", "sku_code": "NPPIP-DEMO-1747383582", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1617", "category_id": "79", "name": "부르봉 엘리제 홋카이도 밀크 크림 웨하스 16개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:12:59.713715", "deleted_at": null,
    images: [{"product_image_id": "1600", "url": "https://ik.imagekit.io/oishidam/products/735939d4-185e-4f34-bc1d-c0809218e53f_uZX5yqzCh.webp", "alt_text": "부르봉 엘리제 홋카이도 밀크 크림 웨하스 16개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1603", "sku_code": "NPPIP-DEMO-1741921637", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1618", "category_id": "93", "name": "마루미야 후리카케 노리타마 대형 52g 3개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:00.013251", "deleted_at": null,
    images: [{"product_image_id": "1602", "url": "https://ik.imagekit.io/oishidam/products/7d2f9f20-2f7a-4d54-8a55-c398059cb932_fkmgxyxHW.webp", "alt_text": "마루미야 후리카케 노리타마 대형 52g 3개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1604", "sku_code": "NPPIP-DEMO-1721176727", "variant_name": "기본", "option_values": {}, "price": 9900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1619", "category_id": "67", "name": "패밀리마트 2종의 간장 누레 오카키 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:00.426205", "deleted_at": null,
    images: [{"product_image_id": "1603", "url": "https://ik.imagekit.io/oishidam/products/8354e59d-9616-4a6d-9263-f9479b8cf6cb_r7BRVeI9OL.webp", "alt_text": "패밀리마트 2종의 간장 누레 오카키 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1605", "sku_code": "NPPIP-DEMO-1780898647", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1620", "category_id": "91", "name": "하우스 쁘띠 푸딩 믹스 39g (2인분)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:01.643748", "deleted_at": null,
    images: [{"product_image_id": "1604", "url": "https://ik.imagekit.io/oishidam/products/b8aaae03-6436-484e-b066-e246ee106cfa_xh3MzxeE_.webp", "alt_text": "하우스 쁘띠 푸딩 믹스 39g (2인분)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1606", "sku_code": "NPPIP-DEMO-1616745244", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1621", "category_id": "87", "name": "아사히 미츠야 사이다 네가지 과일맛 탄산 사탕 112g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:01.788025", "deleted_at": null,
    images: [{"product_image_id": "1605", "url": "https://ik.imagekit.io/oishidam/products/f08a468e-3ccd-4c2b-b41a-8925746aff2a_RU6zBYNiB.webp", "alt_text": "아사히 미츠야 사이다 네가지 과일맛 탄산 사탕 112g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1607", "sku_code": "NPPIP-DEMO-1647235426", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1622", "category_id": "72", "name": "isdg 중화방 마라탕 토마토맛 컵 당면 일본 컵누들 라면 87g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:01.91388", "deleted_at": null,
    images: [{"product_image_id": "1606", "url": "https://ik.imagekit.io/oishidam/products/39539374-a0f2-48cf-b6e8-ddba0eecafc3_YnFGHIpD_g.webp", "alt_text": "isdg 중화방 마라탕 토마토맛 컵 당면 일본 컵누들 라면 87g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1608", "sku_code": "NPPIP-DEMO-1780038351", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1623", "category_id": "87", "name": "칸로 통째로 짜낸 과일 일본 사탕 목캔디 3가지맛 아소토 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:02.288487", "deleted_at": null,
    images: [{"product_image_id": "1607", "url": "https://ik.imagekit.io/oishidam/products/7c33eff3-4c0d-4648-ad53-5c06f82c4106_U16hD1uVb.webp", "alt_text": "칸로 통째로 짜낸 과일 일본 사탕 목캔디 3가지맛 아소토 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1609", "sku_code": "NPPIP-DEMO-1773990882", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1624", "category_id": "89", "name": "글리코 GABA 가바 포 슬립 멘탈 밸런스 초콜릿 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:03.59423", "deleted_at": null,
    images: [{"product_image_id": "1608", "url": "https://ik.imagekit.io/oishidam/products/d9354db3-628c-4d2b-a02e-b337db1174f9_7C0mg58Pd.webp", "alt_text": "글리코 GABA 가바 포 슬립 멘탈 밸런스 초콜릿 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1610", "sku_code": "NPPIP-DEMO-1772682606", "variant_name": "기본", "option_values": {}, "price": 5300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1625", "category_id": "79", "name": "부르봉 에브리버거 햄버거 모양 초코과자 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:03.67377", "deleted_at": null,
    images: [{"product_image_id": "1609", "url": "https://ik.imagekit.io/oishidam/products/04ebedae-34e6-493c-88b1-342cbad0c48e_kLVYSgdaR.webp", "alt_text": "부르봉 에브리버거 햄버거 모양 초코과자 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1611", "sku_code": "NPPIP-DEMO-1743645694", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1626", "category_id": "87", "name": "노벨 VC-3000 목캔디 핑크자몽맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:03.829292", "deleted_at": null,
    images: [{"product_image_id": "1610", "url": "https://ik.imagekit.io/oishidam/products/a9f6adf8-9afd-4135-9245-3c6fa0791c2d_kvhDzb_XT.webp", "alt_text": "노벨 VC-3000 목캔디 핑크자몽맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1612", "sku_code": "NPPIP-DEMO-1775800217", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1627", "category_id": "94", "name": "가반 GABAN 후추 가루 100g 2종 (그라운드/아라비키)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:04.214222", "deleted_at": null,
    images: [{"product_image_id": "1611", "url": "https://ik.imagekit.io/oishidam/products/82d4f104-6d43-47c2-9c19-d221b9dc122e_FbYeJkNs_u.webp", "alt_text": "가반 GABAN 후추 가루 100g 2종 (그라운드/아라비키)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1613", "sku_code": "NPPIP-DEMO-1741590410", "variant_name": "기본", "option_values": {}, "price": 8000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1628", "category_id": "67", "name": "패밀리마트 구운 오징어 매콤한 간장맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:05.857871", "deleted_at": null,
    images: [{"product_image_id": "1614", "url": "https://ik.imagekit.io/oishidam/products/f05d6fef-b1cc-4966-915e-98dd0494e888_eVab_NEPn.webp", "alt_text": "패밀리마트 구운 오징어 매콤한 간장맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1614", "sku_code": "NPPIP-DEMO-1623386701", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1629", "category_id": "79", "name": "가루비 카타아게 포테토 네기시오다레 파소금양념맛 감자칩 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:05.600982", "deleted_at": null,
    images: [{"product_image_id": "1612", "url": "https://ik.imagekit.io/oishidam/products/f9f5d3d4-6fe7-4021-8412-2b6064d82d6d_vfe78tmS_.webp", "alt_text": "가루비 카타아게 포테토 네기시오다레 파소금양념맛 감자칩 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1615", "sku_code": "NPPIP-DEMO-1782718009", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1630", "category_id": "67", "name": "패밀리마트 포슬포슬 식감 완두콩 스낵 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:05.817705", "deleted_at": null,
    images: [{"product_image_id": "1613", "url": "https://ik.imagekit.io/oishidam/products/ef72d4f7-36dc-4016-aa2d-355f4e8032b6_xrZlSR8fu.webp", "alt_text": "패밀리마트 포슬포슬 식감 완두콩 스낵 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1616", "sku_code": "NPPIP-DEMO-1770251238", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1631", "category_id": "89", "name": "메이지 스트로베리 초콜릿 BOX (26매)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:06.095973", "deleted_at": null,
    images: [{"product_image_id": "1615", "url": "https://ik.imagekit.io/oishidam/products/859360f2-2548-4b7f-bf5f-2215ca3117eb_YCDdAsNoB.webp", "alt_text": "메이지 스트로베리 초콜릿 BOX (26매)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1617", "sku_code": "NPPIP-DEMO-1624848686", "variant_name": "기본", "option_values": {}, "price": 6000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1632", "category_id": "79", "name": "가루비 포테토칩스 콘소메 펀치 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:07.200498", "deleted_at": null,
    images: [{"product_image_id": "1616", "url": "https://ik.imagekit.io/oishidam/products/e12331e9-92c4-4bde-9a49-8db18802a194_5Y-xg-1fx.webp", "alt_text": "가루비 포테토칩스 콘소메 펀치 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1618", "sku_code": "NPPIP-DEMO-1550200427", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1633", "category_id": "87", "name": "아사히 민티아 포커스 클리어 라무네", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:07.51699", "deleted_at": null,
    images: [{"product_image_id": "1617", "url": "https://ik.imagekit.io/oishidam/products/0c5865ee-49e6-41d7-ac06-1f5edaa5e9cd_-Nlga8KD7.webp", "alt_text": "아사히 민티아 포커스 클리어 라무네", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1619", "sku_code": "NPPIP-DEMO-178236569226", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1634", "category_id": "79", "name": "본치 매콤한 명란 센베이 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:07.762002", "deleted_at": null,
    images: [{"product_image_id": "1618", "url": "https://ik.imagekit.io/oishidam/products/18760d19-3975-4d54-884a-f833c156a11d_sjM2CM8Hx.webp", "alt_text": "본치 매콤한 명란 센베이 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1620", "sku_code": "NPPIP-DEMO-1711347126", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1635", "category_id": "87", "name": "[UHA미각당]푸쵸 4종 아소토 88g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:07.98041", "deleted_at": null,
    images: [{"product_image_id": "1619", "url": "https://ik.imagekit.io/oishidam/products/38f333f8-0564-487f-954c-06efb4223b13_MXOUDQEu1.webp", "alt_text": "[UHA미각당]푸쵸 4종 아소토 88g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1621", "sku_code": "NPPIP-DEMO-1625018314", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1636", "category_id": "67", "name": "패밀리마트 감자칩 진한 콘소메맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:09.349942", "deleted_at": null,
    images: [{"product_image_id": "1620", "url": "https://ik.imagekit.io/oishidam/products/d38e4373-1ac9-4f26-9a3b-fd482c4e6d8e__O6LNC8aT.webp", "alt_text": "패밀리마트 감자칩 진한 콘소메맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1622", "sku_code": "NPPIP-DEMO-1623220500", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1637", "category_id": "67", "name": "패밀리마트 드라이 미캉 반건조 말린 귤 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:09.614584", "deleted_at": null,
    images: [{"product_image_id": "1621", "url": "https://ik.imagekit.io/oishidam/products/08185104-f6ce-4e8b-8777-dcc7252cd9d5_Sya4dsUR6.webp", "alt_text": "패밀리마트 드라이 미캉 반건조 말린 귤 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1623", "sku_code": "NPPIP-DEMO-1783040608", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1638", "category_id": "75", "name": "훈도킨 유즈코쇼 청 유자 고추 소스 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:09.676161", "deleted_at": null,
    images: [{"product_image_id": "1622", "url": "https://ik.imagekit.io/oishidam/products/0a3387b2-695e-4d8f-bb9a-34df75dafc30_KWGlxCH2T.webp", "alt_text": "훈도킨 유즈코쇼 청 유자 고추 소스 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1624", "sku_code": "NPPIP-DEMO-1745890612", "variant_name": "기본", "option_values": {}, "price": 6000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1639", "category_id": "87", "name": "노벨 오레노밀크 캔디 북해도 팥맛 비비빅맛 80g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1623", "url": "https://ik.imagekit.io/oishidam/products/0f1235f0-3303-4122-bb98-109064934fea_Wdu7Lnr_F.webp", "alt_text": "노벨 오레노밀크 캔디 북해도 팥맛 비비빅맛 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1625", "sku_code": "NPPIP-DEMO-1719544197", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1640", "category_id": "79", "name": "가루비 자가리코 샐러드맛 57g 6개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:11.41638", "deleted_at": null,
    images: [{"product_image_id": "1624", "url": "https://ik.imagekit.io/oishidam/products/eeb178cc-30ac-4b5f-90c0-420a0c5ae76f_Uvp65llxh.webp", "alt_text": "가루비 자가리코 샐러드맛 57g 6개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1626", "sku_code": "NPPIP-DEMO-1660816569", "variant_name": "기본", "option_values": {}, "price": 12600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1641", "category_id": "72", "name": "산요 삿포로 이치방 포켓몬 이브이 누들 시푸드맛 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:11.696823", "deleted_at": null,
    images: [{"product_image_id": "1625", "url": "https://ik.imagekit.io/oishidam/products/8448a655-b703-44bb-afa9-020984341343_Bopg5sn0K.webp", "alt_text": "산요 삿포로 이치방 포켓몬 이브이 누들 시푸드맛 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1627", "sku_code": "NPPIP-DEMO-1637804991", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1642", "category_id": "89", "name": "치로루 초코 스위트포테토 고구마맛 초콜릿 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:11.696823", "deleted_at": null,
    images: [{"product_image_id": "1626", "url": "https://ik.imagekit.io/oishidam/products/b6b8198a-692f-4f16-aff2-cced342c6f84_X8uWlDiQ_.webp", "alt_text": "치로루 초코 스위트포테토 고구마맛 초콜릿 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1628", "sku_code": "NPPIP-DEMO-1785980719", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1643", "category_id": "79", "name": "산리츠 겐지파이 20매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:11.931068", "deleted_at": null,
    images: [{"product_image_id": "1627", "url": "https://ik.imagekit.io/oishidam/products/746a0a4a-1ca5-4b69-9edf-b14948d28ff9_I7a3QU00S.webp", "alt_text": "산리츠 겐지파이 20매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1629", "sku_code": "NPPIP-DEMO-1737446744", "variant_name": "기본", "option_values": {}, "price": 4850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1644", "category_id": "72", "name": "[페양구]소스 야끼소바 왕곱배기", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:13.386052", "deleted_at": null,
    images: [{"product_image_id": "1628", "url": "https://ik.imagekit.io/oishidam/products/bf75e554-acd3-42b1-9efb-de429e60712e_nv3KsC3k6.webp", "alt_text": "[페양구]소스 야끼소바 왕곱배기", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1630", "sku_code": "NPPIP-DEMO-1650008398", "variant_name": "기본", "option_values": {}, "price": 4900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1645", "category_id": "89", "name": "글리코 포키 빼빼로 두겹 진한 말차맛 2봉입", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1630", "url": "https://ik.imagekit.io/oishidam/products/46dad20a-de85-4bf9-8b50-7ee3b438c389_ZJn2xQ3FeY.webp", "alt_text": "글리코 포키 빼빼로 두겹 진한 말차맛 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1631", "sku_code": "NPPIP-DEMO-1773215229", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1646", "category_id": "82", "name": "네슬레 네스카페 우지말차 라떼 포션 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:13.40212", "deleted_at": null,
    images: [{"product_image_id": "1629", "url": "https://ik.imagekit.io/oishidam/products/a262a094-3419-4c3d-91a7-0ee08ffa2fc8_rZckYq9WU.webp", "alt_text": "네슬레 네스카페 우지말차 라떼 포션 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1632", "sku_code": "NPPIP-DEMO-1774936804", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1647", "category_id": "83", "name": "이토엔 오이오차 프리미엄 티백 50개입 3종(녹차/현미차/호지차)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:13.650472", "deleted_at": null,
    images: [{"product_image_id": "1631", "url": "https://ik.imagekit.io/oishidam/products/4dbe0235-fd6a-40c2-b959-8b68e3af6f13_thh9xvSom.webp", "alt_text": "이토엔 오이오차 프리미엄 티백 50개입 3종(녹차/현미차/호지차)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1633", "sku_code": "NPPIP-DEMO-1746751566", "variant_name": "기본", "option_values": {}, "price": 15000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1648", "category_id": "79", "name": "가루비 자가리코 치즈맛 55g (11+1) 12개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:15.319243", "deleted_at": null,
    images: [{"product_image_id": "1633", "url": "https://ik.imagekit.io/oishidam/products/7a1f0ee1-1692-40d5-8e3f-ae3088e073a3_C7DjLqU7c.webp", "alt_text": "가루비 자가리코 치즈맛 55g (11+1) 12개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1634", "sku_code": "NPPIP-DEMO-1616740718", "variant_name": "기본", "option_values": {}, "price": 23500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1649", "category_id": "88", "name": "오리히로 곤약젤리 기간한정 메론소다 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:15.333896", "deleted_at": null,
    images: [{"product_image_id": "1634", "url": "https://ik.imagekit.io/oishidam/products/fcab8aef-5738-4223-8b1e-998ce8e46cd9_65kyg4-XB.webp", "alt_text": "오리히로 곤약젤리 기간한정 메론소다 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1635", "sku_code": "NPPIP-DEMO-17739019225", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1650", "category_id": "94", "name": "나가타니엔 생된장 타입 미소시루 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:15.426873", "deleted_at": null,
    images: [{"product_image_id": "1635", "url": "https://ik.imagekit.io/oishidam/products/ec7c416e-d0b4-460f-bede-ff78bc31295a_jBcjzWZaKu.webp", "alt_text": "나가타니엔 생된장 타입 미소시루 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1636", "sku_code": "NPPIP-DEMO-1737007736", "variant_name": "기본", "option_values": {}, "price": 5000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1651", "category_id": "83", "name": "이토엔 건강 미네랄 무기차 보리차 티백 30봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:15.258342", "deleted_at": null,
    images: [{"product_image_id": "1632", "url": "https://ik.imagekit.io/oishidam/products/9ee43830-2d2f-4e1c-942a-8e76945f26d3_scuPjOS0T.webp", "alt_text": "이토엔 건강 미네랄 무기차 보리차 티백 30봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1637", "sku_code": "NPPIP-DEMO-1635838980", "variant_name": "기본", "option_values": {}, "price": 5700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1652", "category_id": "73", "name": "닛신 호빵맨 우동 부드러운 국물 3봉입 봉지라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:17.185512", "deleted_at": null,
    images: [{"product_image_id": "1637", "url": "https://ik.imagekit.io/oishidam/products/ef11a5ec-f5c5-4263-a95b-c6a5a580c6ab_PUVnaqvYp.webp", "alt_text": "닛신 호빵맨 우동 부드러운 국물 3봉입 봉지라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1638", "sku_code": "NPPIP-DEMO-1624522769", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1653", "category_id": "67", "name": "패밀리마트 치즈의 풍미가 가득한 치즈 대구포 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:17.247531", "deleted_at": null,
    images: [{"product_image_id": "1638", "url": "https://ik.imagekit.io/oishidam/products/e27f37e1-eec1-4fdf-bf2b-7a2fc3984cc9__gq5EGgrN.webp", "alt_text": "패밀리마트 치즈의 풍미가 가득한 치즈 대구포 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1639", "sku_code": "NPPIP-DEMO-1623387089", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1654", "category_id": "72", "name": "닛신 돈베이 키츠네우동 돈베이 미니 우동 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:17.263357", "deleted_at": null,
    images: [{"product_image_id": "1639", "url": "https://ik.imagekit.io/oishidam/products/100436ce-f052-4fa5-a431-52ec6f8d7c66_N7fnoQslr.webp", "alt_text": "닛신 돈베이 키츠네우동 돈베이 미니 우동 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1640", "sku_code": "NPPIP-DEMO-1787802963", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1655", "category_id": "88", "name": "오리히로 곤약젤리 제로칼로리 백도+거봉 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:17.077972", "deleted_at": null,
    images: [{"product_image_id": "1636", "url": "https://ik.imagekit.io/oishidam/products/b76a2c1b-d37b-4103-a80e-376fe9d5eccd_p0koLWYRI.webp", "alt_text": "오리히로 곤약젤리 제로칼로리 백도+거봉 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1641", "sku_code": "NPPIP-DEMO-177390584510", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1656", "category_id": "67", "name": "패밀리마트 바삭하고 고소한 무기 초콜릿 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:19.098168", "deleted_at": null,
    images: [{"product_image_id": "1640", "url": "https://ik.imagekit.io/oishidam/products/61071fab-b200-46f3-a25c-174b0d144684_4-c6TVYZ6.webp", "alt_text": "패밀리마트 바삭하고 고소한 무기 초콜릿 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1642", "sku_code": "NPPIP-DEMO-1770781946", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1657", "category_id": "89", "name": "[브루봉]알포트 9개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:19.13706", "deleted_at": null,
    images: [{"product_image_id": "1641", "url": "https://ik.imagekit.io/oishidam/products/70c7d936-b5dd-4220-b396-ec26d0159954_3BkgVzw9m.webp", "alt_text": "[브루봉]알포트 9개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1643", "sku_code": "NPPIP-DEMO-1640309129", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1658", "category_id": "79", "name": "사야엔도 완두콩 스낵 콩과자 소금맛 61g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:19.268209", "deleted_at": null,
    images: [{"product_image_id": "1643", "url": "https://ik.imagekit.io/oishidam/products/48813e7b-f93d-4e63-bc87-198020ebf37f_EAWJ-_DI-Q.webp", "alt_text": "사야엔도 완두콩 스낵 콩과자 소금맛 61g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1644", "sku_code": "NPPIP-DEMO-1550128092", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1659", "category_id": "79", "name": "UHA미각당 오사츠도키 소금버터맛 스탠드팩 고구마칩 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:19.184556", "deleted_at": null,
    images: [{"product_image_id": "1642", "url": "https://ik.imagekit.io/oishidam/products/3062421f-a546-4a58-a310-46c8c557aaa8_437Vdzx0B.webp", "alt_text": "UHA미각당 오사츠도키 소금버터맛 스탠드팩 고구마칩 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1645", "sku_code": "NPPIP-DEMO-1787030318", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1660", "category_id": "86", "name": "롯데 입에 붙지 않는 껌 기억력 유지 타입 쌉싸름한 민트맛 14개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:21.282309", "deleted_at": null,
    images: [{"product_image_id": "1647", "url": "https://ik.imagekit.io/oishidam/products/791012bb-437a-4c68-9eb7-e00d417f9665_g3et-uW9h.webp", "alt_text": "롯데 입에 붙지 않는 껌 기억력 유지 타입 쌉싸름한 민트맛 14개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1646", "sku_code": "NPPIP-DEMO-1782356603", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1661", "category_id": "88", "name": "부르봉 페투치네 구미 프리미엄 오이타현 마린 레몬맛 젤리 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:21.100894", "deleted_at": null,
    images: [{"product_image_id": "1645", "url": "https://ik.imagekit.io/oishidam/products/233a95cc-66d4-40ae-8dc0-7bad28004564_3gb53-w4m.webp", "alt_text": "부르봉 페투치네 구미 프리미엄 오이타현 마린 레몬맛 젤리 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1647", "sku_code": "NPPIP-DEMO-1779851257", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1662", "category_id": "79", "name": "부르봉 미니 루만도 캬라멜 111g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:21.100894", "deleted_at": null,
    images: [{"product_image_id": "1644", "url": "https://ik.imagekit.io/oishidam/products/c974e7f4-6f06-4625-af56-03dbd72d9a77_DxncNBrYN.webp", "alt_text": "부르봉 미니 루만도 캬라멜 111g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1648", "sku_code": "NPPIP-DEMO-1737006241", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1663", "category_id": "93", "name": "마루미야 소프트 후리카케 마늘 라유 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:21.229338", "deleted_at": null,
    images: [{"product_image_id": "1646", "url": "https://ik.imagekit.io/oishidam/products/b0bf4a05-a0df-42c8-be43-aa2ee94aaa71_u2iHwAuLeD.webp", "alt_text": "마루미야 소프트 후리카케 마늘 라유 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1649", "sku_code": "NPPIP-DEMO-1765441464", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1664", "category_id": "72", "name": "마루짱 시로이 치카라 모찌 우동 109g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:22.772442", "deleted_at": null,
    images: [{"product_image_id": "1648", "url": "https://ik.imagekit.io/oishidam/products/b4f96139-bd49-4c8c-bed2-1a420414a37c_nNeXqpONa.webp", "alt_text": "마루짱 시로이 치카라 모찌 우동 109g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1650", "sku_code": "NPPIP-DEMO-1782971964", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1665", "category_id": "72", "name": "닛신 컵누들 미소된장 82g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:23.023035", "deleted_at": null,
    images: [{"product_image_id": "1650", "url": "https://ik.imagekit.io/oishidam/products/39fc1180-b6df-4f93-9aeb-addeaafcaa3f_c9bPm4uIq.webp", "alt_text": "닛신 컵누들 미소된장 82g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1651", "sku_code": "NPPIP-DEMO-1711590246", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1666", "category_id": "89", "name": "모리나가 코에다 잔가지 밀크 11봉입 일본 초콜릿", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:22.870858", "deleted_at": null,
    images: [{"product_image_id": "1649", "url": "https://ik.imagekit.io/oishidam/products/9a05ed59-ce5d-4261-9e65-328af5bbe5f7_dYpLzDGFi.webp", "alt_text": "모리나가 코에다 잔가지 밀크 11봉입 일본 초콜릿", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1652", "sku_code": "NPPIP-DEMO-1776215628", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1667", "category_id": "87", "name": "센쟈쿠 하치미츠 꿀 100% 캔디 일본 사탕 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:23.193456", "deleted_at": null,
    images: [{"product_image_id": "1651", "url": "https://ik.imagekit.io/oishidam/products/fecd2ded-6080-4fa7-9bbb-b820d77e0820_2kwScuGpe.webp", "alt_text": "센쟈쿠 하치미츠 꿀 100% 캔디 일본 사탕 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1653", "sku_code": "NPPIP-DEMO-1743756463", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1668", "category_id": "75", "name": "칸피 일본 당고 팬케이크 아이스크림 시럽 200g 2종 (미타라시/흑당)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:24.736372", "deleted_at": null,
    images: [{"product_image_id": "1653", "url": "https://ik.imagekit.io/oishidam/products/96410d34-38d7-4965-9ff8-d7e01cff0a83_M-kcWNZx6.webp", "alt_text": "칸피 일본 당고 팬케이크 아이스크림 시럽 200g 2종 (미타라시/흑당)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1654", "sku_code": "NPPIP-DEMO-1739923231", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1669", "category_id": "88", "name": "타후 구미 젤리 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:24.691228", "deleted_at": null,
    images: [{"product_image_id": "1652", "url": "https://ik.imagekit.io/oishidam/products/58ff7ee5-49c9-4e7f-9047-024d0ab47511_2v5LgkP8T3.webp", "alt_text": "타후 구미 젤리 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1655", "sku_code": "NPPIP-DEMO-1548378925", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1670", "category_id": "88", "name": "메이지 과즙구미 다크 체리 믹스맛 47g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:25.00801", "deleted_at": null,
    images: [{"product_image_id": "1655", "url": "https://ik.imagekit.io/oishidam/products/64dbec08-812f-4a8d-bc1e-b5a0321fe73a_nkzhADFp8.webp", "alt_text": "메이지 과즙구미 다크 체리 믹스맛 47g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1656", "sku_code": "NPPIP-DEMO-1779852934", "variant_name": "기본", "option_values": {}, "price": 2550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1671", "category_id": "88", "name": "메이지 라무네업 일본 하드 젤리 딱딱한 소다맛 구미 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:24.843896", "deleted_at": null,
    images: [{"product_image_id": "1654", "url": "https://ik.imagekit.io/oishidam/products/21ddbbf5-91f0-42b3-8424-91f57b5df519_ciUiRwMFr.webp", "alt_text": "메이지 라무네업 일본 하드 젤리 딱딱한 소다맛 구미 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1657", "sku_code": "NPPIP-DEMO-1741160370", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1672", "category_id": "88", "name": "칸로 퓨레구미 포도 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:26.585735", "deleted_at": null,
    images: [{"product_image_id": "1656", "url": "https://ik.imagekit.io/oishidam/products/e18bbe41-0838-4145-8c23-e1a205cc342e_fumRZ3ITF.webp", "alt_text": "칸로 퓨레구미 포도 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1658", "sku_code": "NPPIP-DEMO-1548382577", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1673", "category_id": "87", "name": "다이마루 사쿳토 말차 키나코 검은깨 3종 캔디 사탕 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:26.677987", "deleted_at": null,
    images: [{"product_image_id": "1657", "url": "https://ik.imagekit.io/oishidam/products/f90e1692-36dc-46a9-ab3d-42a0e118307e_KcQsr1cW3.webp", "alt_text": "다이마루 사쿳토 말차 키나코 검은깨 3종 캔디 사탕 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1659", "sku_code": "NPPIP-DEMO-1785821102", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1674", "category_id": "87", "name": "UHA미각당 e-ma 목캔디 컬러풀 과일 체인지 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:26.677987", "deleted_at": null,
    images: [{"product_image_id": "1658", "url": "https://ik.imagekit.io/oishidam/products/dac89c39-65e5-466e-8900-e306559defaf_-PtFW4Rd-.webp", "alt_text": "UHA미각당 e-ma 목캔디 컬러풀 과일 체인지 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1660", "sku_code": "NPPIP-DEMO-1778140027", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1675", "category_id": "79", "name": "부르봉 진한 미니 초코 브라우니 아포가토맛 106g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:26.833349", "deleted_at": null,
    images: [{"product_image_id": "1659", "url": "https://ik.imagekit.io/oishidam/products/cc29f131-89ad-4fb1-9ade-1edc803e58bf_12W92GTIU.webp", "alt_text": "부르봉 진한 미니 초코 브라우니 아포가토맛 106g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1661", "sku_code": "NPPIP-DEMO-17742472686", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1676", "category_id": "79", "name": "이와츠카 키나코 모찌 19매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:28.584182", "deleted_at": null,
    images: [{"product_image_id": "1662", "url": "https://ik.imagekit.io/oishidam/products/89668af7-848f-4e3f-8613-314d2d2ff64c_Iamew41Li.webp", "alt_text": "이와츠카 키나코 모찌 19매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1662", "sku_code": "NPPIP-DEMO-1736494958", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1677", "category_id": "88", "name": "[UHA미각당]푸쵸 구미 소다", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:28.370045", "deleted_at": null,
    images: [{"product_image_id": "1660", "url": "https://ik.imagekit.io/oishidam/products/fc085faf-a9a8-4727-b958-8feb25b5034a_OqfI8pN3z.webp", "alt_text": "[UHA미각당]푸쵸 구미 소다", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1663", "sku_code": "NPPIP-DEMO-1625017987", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1678", "category_id": "88", "name": "반다이 치이카와 캐릭터 모양 젤리 4연팩", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:28.496705", "deleted_at": null,
    images: [{"product_image_id": "1661", "url": "https://ik.imagekit.io/oishidam/products/69388f5b-a907-4ae6-be36-e30d5e126d25_dSllYfrAg.webp", "alt_text": "반다이 치이카와 캐릭터 모양 젤리 4연팩", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1664", "sku_code": "NPPIP-DEMO-1721112121", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1679", "category_id": "84", "name": "이무라야 빙수 시럽 3종 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:28.725882", "deleted_at": null,
    images: [{"product_image_id": "1663", "url": "https://ik.imagekit.io/oishidam/products/e46dd441-b82e-4527-b775-0be778c79003_0iOOcVBOG.webp", "alt_text": "이무라야 빙수 시럽 3종 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1665", "sku_code": "NPPIP-DEMO-1713938555", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1680", "category_id": "88", "name": "오리히로 곤약젤리 사과+포도 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:30.125715", "deleted_at": null,
    images: [{"product_image_id": "1664", "url": "https://ik.imagekit.io/oishidam/products/af52fc6c-8da6-4658-b5cf-6cbfed245b84_X_Up-vc7r.webp", "alt_text": "오리히로 곤약젤리 사과+포도 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1666", "sku_code": "NPPIP-DEMO-17739058459", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1681", "category_id": "88", "name": "카바야 퓨어럴 퓨아라루 구미 사과맛 58g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:30.236677", "deleted_at": null,
    images: [{"product_image_id": "1665", "url": "https://ik.imagekit.io/oishidam/products/8302c1c0-7cf7-4a61-a1cb-caa7e91cc1e1_dzb3i1-rM.webp", "alt_text": "카바야 퓨어럴 퓨아라루 구미 사과맛 58g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1667", "sku_code": "NPPIP-DEMO-1769670232", "variant_name": "기본", "option_values": {}, "price": 2300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1682", "category_id": "65", "name": "로손 아타리메 부드러운 오징어 16g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:30.467366", "deleted_at": null,
    images: [{"product_image_id": "1666", "url": "https://ik.imagekit.io/oishidam/products/0316279f-edaa-4906-82e0-98f758ea82b7_amgM4WBYGu.webp", "alt_text": "로손 아타리메 부드러운 오징어 16g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1668", "sku_code": "NPPIP-DEMO-1619749496", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1683", "category_id": "89", "name": "후지야 베스킨라빈스 베라 민트 초콜릿 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:30.608373", "deleted_at": null,
    images: [{"product_image_id": "1667", "url": "https://ik.imagekit.io/oishidam/products/c6a8930a-a0e3-4467-8c02-b8be6aa34baf_KC0tTsc3c.webp", "alt_text": "후지야 베스킨라빈스 베라 민트 초콜릿 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1669", "sku_code": "NPPIP-DEMO-1778721189", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1684", "category_id": "89", "name": "후루타 초코에그 명탐정 코난 6 랜덤 미니 피규어", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:32.040408", "deleted_at": null,
    images: [{"product_image_id": "1668", "url": "https://ik.imagekit.io/oishidam/products/57047f8b-520f-48bd-8314-41a4bb2160ed_4ZO5na1FF.webp", "alt_text": "후루타 초코에그 명탐정 코난 6 랜덤 미니 피규어", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1670", "sku_code": "NPPIP-DEMO-1777269793", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1685", "category_id": "65", "name": "로손 초코슈 일본 홈런볼 과자 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:32.10466", "deleted_at": null,
    images: [{"product_image_id": "1669", "url": "https://ik.imagekit.io/oishidam/products/84d51d3b-668e-4b47-aa96-45520e32d2c0_AFy6YVi-H.webp", "alt_text": "로손 초코슈 일본 홈런볼 과자 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1671", "sku_code": "NPPIP-DEMO-177691269057", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1686", "category_id": "65", "name": "로손 포테이토링 스낵 나게와 소금맛 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:32.365418", "deleted_at": null,
    images: [{"product_image_id": "1671", "url": "https://ik.imagekit.io/oishidam/products/8f21bfe0-be4b-4541-8364-3f17edd3f14c_3A8AWAT6K.webp", "alt_text": "로손 포테이토링 스낵 나게와 소금맛 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1672", "sku_code": "NPPIP-DEMO-177691268418", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1687", "category_id": "66", "name": "세븐일레븐 마카다미아 초콜릿 33g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:32.289433", "deleted_at": null,
    images: [{"product_image_id": "1670", "url": "https://ik.imagekit.io/oishidam/products/0a18cf4a-de79-4643-bf9f-158aac8c9591_qOHfYXo687.webp", "alt_text": "세븐일레븐 마카다미아 초콜릿 33g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1673", "sku_code": "NPPIP-DEMO-177329836350", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1688", "category_id": "87", "name": "미츠비시 카무카무 레몬 30g 일본 사탕", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:33.932529", "deleted_at": null,
    images: [{"product_image_id": "1672", "url": "https://ik.imagekit.io/oishidam/products/3df21dfc-df75-48c0-a510-3c165d021570_j72QQ_lfC.webp", "alt_text": "미츠비시 카무카무 레몬 30g 일본 사탕", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1674", "sku_code": "NPPIP-DEMO-1772692269", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1689", "category_id": "65", "name": "로손 노릇노릇 러스크 슈가맛 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:33.978066", "deleted_at": null,
    images: [{"product_image_id": "1673", "url": "https://ik.imagekit.io/oishidam/products/5f184629-5ef5-48fe-8d58-66a7c79a4fd3_qRtbI1wVl.webp", "alt_text": "로손 노릇노릇 러스크 슈가맛 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1675", "sku_code": "NPPIP-DEMO-1619686097", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1690", "category_id": "88", "name": "칸로 퓨레구미 레몬 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:34.006472", "deleted_at": null,
    images: [{"product_image_id": "1674", "url": "https://ik.imagekit.io/oishidam/products/765b19f0-ff3e-4cc1-b1dc-f6ca799713b4_4zrVdh5WY.webp", "alt_text": "칸로 퓨레구미 레몬 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1676", "sku_code": "NPPIP-DEMO-1548380989", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1691", "category_id": "91", "name": "글리코 조그만 푸칭푸딩 밀크쇼콜라 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:34.277082", "deleted_at": null,
    images: [{"product_image_id": "1675", "url": "https://ik.imagekit.io/oishidam/products/014a57b3-5680-4d15-8e95-a556591778f0_wLVJxMkPY.webp", "alt_text": "글리코 조그만 푸칭푸딩 밀크쇼콜라 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1677", "sku_code": "NPPIP-DEMO-1785900235", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1692", "category_id": "75", "name": "[S&B] 닌니쿠 세아부라 110g 일본 컵라면 마늘기름 양념장", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:35.856832", "deleted_at": null,
    images: [{"product_image_id": "1676", "url": "https://ik.imagekit.io/oishidam/products/a908f707-4f8b-427b-9a14-f7c2475670fa_HSfKLd1wT.webp", "alt_text": "[S&B] 닌니쿠 세아부라 110g 일본 컵라면 마늘기름 양념장", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1678", "sku_code": "NPPIP-DEMO-1745890097", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1693", "category_id": "83", "name": "이토엔 건강 미네랄 무기차 보리차 스틱형 100개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:35.866383", "deleted_at": null,
    images: [{"product_image_id": "1677", "url": "https://ik.imagekit.io/oishidam/products/8de651c1-160b-47de-b5f8-5a073d098ba4_K_GJAaoGy.webp", "alt_text": "이토엔 건강 미네랄 무기차 보리차 스틱형 100개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1679", "sku_code": "NPPIP-DEMO-1742193406", "variant_name": "기본", "option_values": {}, "price": 22500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1694", "category_id": "94", "name": "오오모리야 일본 조미 김 식탁용김 아치츠케노리 70매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:36.151691", "deleted_at": null,
    images: [{"product_image_id": "1678", "url": "https://ik.imagekit.io/oishidam/products/1b8b0e69-0a02-46d4-9bc1-107b33a83aac_0ccZrg-ZE.webp", "alt_text": "오오모리야 일본 조미 김 식탁용김 아치츠케노리 70매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1680", "sku_code": "NPPIP-DEMO-1739151424", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1695", "category_id": "73", "name": "마루타이 사가 소고기 시오 라멘 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:36.400817", "deleted_at": null,
    images: [{"product_image_id": "1679", "url": "https://ik.imagekit.io/oishidam/products/c5de17e6-a8e4-49af-a0df-83e0008221de_tfhGv_O_nL.webp", "alt_text": "마루타이 사가 소고기 시오 라멘 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1681", "sku_code": "NPPIP-DEMO-1660286224", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1696", "category_id": "80", "name": "후지야 컨트리맘 마이스타즈 버터 휘낭시에 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:37.531654", "deleted_at": null,
    images: [{"product_image_id": "1680", "url": "https://ik.imagekit.io/oishidam/products/178e9277-db15-4a8d-b54f-be3e98d873eb_20iEMi3wd.webp", "alt_text": "후지야 컨트리맘 마이스타즈 버터 휘낭시에 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1682", "sku_code": "NPPIP-DEMO-1785469342", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1697", "category_id": "88", "name": "크라시에 포핀쿠킨 가루쿡 즐거운 축제 가게", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:37.680366", "deleted_at": null,
    images: [{"product_image_id": "1681", "url": "https://ik.imagekit.io/oishidam/products/e25c0332-d388-4aea-b9c5-9b113c3f71c1_KQ8fFtkWy.webp", "alt_text": "크라시에 포핀쿠킨 가루쿡 즐거운 축제 가게", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1683", "sku_code": "NPPIP-DEMO-1618197114", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1698", "category_id": "75", "name": "S&B 에스비 타타키큐리 시즈닝 한국식 오이무침 양념 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:38.058514", "deleted_at": null,
    images: [{"product_image_id": "1682", "url": "https://ik.imagekit.io/oishidam/products/c36dde65-065e-46d3-9352-e169a8ca102d_l9NJwOWIo.webp", "alt_text": "S&B 에스비 타타키큐리 시즈닝 한국식 오이무침 양념 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1684", "sku_code": "NPPIP-DEMO-1743992305", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1699", "category_id": "80", "name": "코가시 브라운 버터 와플 쿠키 4종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:38.305753", "deleted_at": null,
    images: [{"product_image_id": "1683", "url": "https://ik.imagekit.io/oishidam/products/ab22c5c2-1554-42dc-b089-34d81636357e_bI8Og-OUz.webp", "alt_text": "코가시 브라운 버터 와플 쿠키 4종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1685", "sku_code": "NPPIP-DEMO-1739261403", "variant_name": "기본", "option_values": {}, "price": 5950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1700", "category_id": "79", "name": "가루비 자가리코 명란버터맛(52g) 6개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:39.50555", "deleted_at": null,
    images: [{"product_image_id": "1685", "url": "https://ik.imagekit.io/oishidam/products/638eb206-2228-4edb-b5e3-a900b9dc3d70_euf5bPOzi.webp", "alt_text": "가루비 자가리코 명란버터맛(52g) 6개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1686", "sku_code": "NPPIP-DEMO-1660814811", "variant_name": "기본", "option_values": {}, "price": 12600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1701", "category_id": "81", "name": "[AGF]블랜디®스틱 호지차오레 6입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:39.381749", "deleted_at": null,
    images: [{"product_image_id": "1684", "url": "https://ik.imagekit.io/oishidam/products/ee895caa-5edd-4c46-b151-cd7885b991fe_IcQfo0EmB.webp", "alt_text": "[AGF]블랜디®스틱 호지차오레 6입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1687", "sku_code": "NPPIP-DEMO-1617852124", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1702", "category_id": "88", "name": "노벨 페타구 젤리 구미 파인애플맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:39.730493", "deleted_at": null,
    images: [{"product_image_id": "1686", "url": "https://ik.imagekit.io/oishidam/products/2e36b5e4-b3b2-46f4-9a94-2c66d63abfa1_VTjEgszBa.webp", "alt_text": "노벨 페타구 젤리 구미 파인애플맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1688", "sku_code": "NPPIP-DEMO-1733726412", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1703", "category_id": "87", "name": "모리나가 하이츄 프리미엄 거봉맛 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:40.208152", "deleted_at": null,
    images: [{"product_image_id": "1687", "url": "https://ik.imagekit.io/oishidam/products/d02af002-9db3-48af-b669-a7f014f2886b_Amb77LNwG.webp", "alt_text": "모리나가 하이츄 프리미엄 거봉맛 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1689", "sku_code": "NPPIP-DEMO-17853978105", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1704", "category_id": "88", "name": "사쿠마 폰쥬스 귤맛 구미 일본 젤리 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:41.339075", "deleted_at": null,
    images: [{"product_image_id": "1688", "url": "https://ik.imagekit.io/oishidam/products/83859775-6f71-41c9-9526-e870afa490c0_Jg-Ely-wN.webp", "alt_text": "사쿠마 폰쥬스 귤맛 구미 일본 젤리 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1690", "sku_code": "NPPIP-DEMO-1775806743", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1705", "category_id": "79", "name": "아마노야 가부키아게 일본 쌀과자 센베 11개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:41.465408", "deleted_at": null,
    images: [{"product_image_id": "1689", "url": "https://ik.imagekit.io/oishidam/products/896ed173-6423-4677-a35d-08a513d1a599_6k5mYPS-cy.webp", "alt_text": "아마노야 가부키아게 일본 쌀과자 센베 11개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1691", "sku_code": "NPPIP-DEMO-1747297312", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1706", "category_id": "72", "name": "동양수산 빨간 키츠네 우동 간사이풍 미니 41g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:41.590245", "deleted_at": null,
    images: [{"product_image_id": "1690", "url": "https://ik.imagekit.io/oishidam/products/7b69a084-6ac5-4c1e-a9fa-90592c1ed001_lAx_Xno0X.webp", "alt_text": "동양수산 빨간 키츠네 우동 간사이풍 미니 41g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1692", "sku_code": "NPPIP-DEMO-1736844395", "variant_name": "기본", "option_values": {}, "price": 2200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1707", "category_id": "72", "name": "동양수산 마루짱 완탕 돈코츠 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:41.872057", "deleted_at": null,
    images: [{"product_image_id": "1691", "url": "https://ik.imagekit.io/oishidam/products/2ca1f814-2175-453f-9c22-43c6f341769b_3WFPSCNLb.webp", "alt_text": "동양수산 마루짱 완탕 돈코츠 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1693", "sku_code": "NPPIP-DEMO-1721606696", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1708", "category_id": "88", "name": "노벨 페타구 젤리 구미 포도맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:43.025345", "deleted_at": null,
    images: [{"product_image_id": "1692", "url": "https://ik.imagekit.io/oishidam/products/7f879346-811c-463a-a447-b1b8ced62166_dDzt3QjOR.webp", "alt_text": "노벨 페타구 젤리 구미 포도맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1694", "sku_code": "NPPIP-DEMO-1733725557", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1709", "category_id": "73", "name": "이치란 스트레이트면 돈코츠 라멘 2인분 258g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:43.663932", "deleted_at": null,
    images: [{"product_image_id": "1694", "url": "https://ik.imagekit.io/oishidam/products/731418c9-57dd-4358-9c14-97bea129afa6_QN8AvG931.webp", "alt_text": "이치란 스트레이트면 돈코츠 라멘 2인분 258g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1695", "sku_code": "NPPIP-DEMO-1767678200", "variant_name": "기본", "option_values": {}, "price": 13500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1710", "category_id": "80", "name": "롯데 더 버터 쿠키 3개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:43.44461", "deleted_at": null,
    images: [{"product_image_id": "1693", "url": "https://ik.imagekit.io/oishidam/products/acebd0cb-1831-4a17-9607-800f9db1808d__MffnosDn.webp", "alt_text": "롯데 더 버터 쿠키 3개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1696", "sku_code": "NPPIP-DEMO-1784702635", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1711", "category_id": "79", "name": "하고로모 샤킷토 바타콘 옥수수 콘버터 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:43.694161", "deleted_at": null,
    images: [{"product_image_id": "1695", "url": "https://ik.imagekit.io/oishidam/products/a3a6eaa1-2547-4df7-94cc-bcbe2e185c50_e7PW0Kwif.webp", "alt_text": "하고로모 샤킷토 바타콘 옥수수 콘버터 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1697", "sku_code": "NPPIP-DEMO-1782111329", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1712", "category_id": "79", "name": "부르봉 미니 농후한 초코 브라우니 114g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:44.923817", "deleted_at": null,
    images: [{"product_image_id": "1696", "url": "https://ik.imagekit.io/oishidam/products/73cafc2a-66fa-4d7d-9c48-0fc98d74d6a6_vwxE2em6z.webp", "alt_text": "부르봉 미니 농후한 초코 브라우니 114g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1698", "sku_code": "NPPIP-DEMO-1781510537", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1713", "category_id": "89", "name": "후지야 베스킨라빈스 베라 쿠키앤크림맛 초콜릿 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:45.328769", "deleted_at": null,
    images: [{"product_image_id": "1697", "url": "https://ik.imagekit.io/oishidam/products/8f2bf4ca-d052-41d1-932f-ad2dcb018f0f_fEMGpw_vM.webp", "alt_text": "후지야 베스킨라빈스 베라 쿠키앤크림맛 초콜릿 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1699", "sku_code": "NPPIP-DEMO-1781069605", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1714", "category_id": "88", "name": "오리히로 곤약젤리 온주 귤 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:45.343075", "deleted_at": null,
    images: [{"product_image_id": "1698", "url": "https://ik.imagekit.io/oishidam/products/d2c2b95d-ea5d-4742-9bed-cb59585b2af2_x0zLQ89ma5.webp", "alt_text": "오리히로 곤약젤리 온주 귤 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1700", "sku_code": "NPPIP-DEMO-17739058424", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1715", "category_id": "75", "name": "소미 야끼니꾸 야키니쿠 고기 타레 소스 320g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:45.593543", "deleted_at": null,
    images: [{"product_image_id": "1699", "url": "https://ik.imagekit.io/oishidam/products/2cbf71f2-98c6-41a7-adb2-f92502990055_FzChcnBlQt.webp", "alt_text": "소미 야끼니꾸 야키니쿠 고기 타레 소스 320g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1701", "sku_code": "NPPIP-DEMO-1737591396", "variant_name": "기본", "option_values": {}, "price": 7950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1716", "category_id": "72", "name": "닛신 돈베이  오리 육수 107g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:46.851808", "deleted_at": null,
    images: [{"product_image_id": "1700", "url": "https://ik.imagekit.io/oishidam/products/3d7e716a-a851-490f-ba9d-3413b673dd09_11lmiSKT_.webp", "alt_text": "닛신 돈베이  오리 육수 107g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1702", "sku_code": "NPPIP-DEMO-1658989234", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1717", "category_id": "86", "name": "자일리톨 껌 7종 모둠 보틀", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:46.975657", "deleted_at": null,
    images: [{"product_image_id": "1701", "url": "https://ik.imagekit.io/oishidam/products/55198922-d340-466b-8b31-a814bc13cfbf_rt4FspFmZ.webp", "alt_text": "자일리톨 껌 7종 모둠 보틀", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1703", "sku_code": "NPPIP-DEMO-1625724130", "variant_name": "기본", "option_values": {}, "price": 11500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1718", "category_id": "88", "name": "코로로 과일 젤리 포도맛 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:47.258322", "deleted_at": null,
    images: [{"product_image_id": "1702", "url": "https://ik.imagekit.io/oishidam/products/e1d8aff5-621a-42ec-8673-dd360d662875_QdMP0j4Rp.webp", "alt_text": "코로로 과일 젤리 포도맛 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1704", "sku_code": "NPPIP-DEMO-1548403842", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1719", "category_id": "82", "name": "오리히로 곤약젤리 프리미엄카페 커피맛 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:47.475979", "deleted_at": null,
    images: [{"product_image_id": "1703", "url": "https://ik.imagekit.io/oishidam/products/a88eab56-ba63-4b8d-bf33-1c9b481c5f9c_bBLfwNnxtc.webp", "alt_text": "오리히로 곤약젤리 프리미엄카페 커피맛 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1705", "sku_code": "NPPIP-DEMO-17739058448", "variant_name": "기본", "option_values": {}, "price": 3100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1720", "category_id": "94", "name": "S&B 에스비 산초 파우더 가루 8g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:48.619399", "deleted_at": null,
    images: [{"product_image_id": "1704", "url": "https://ik.imagekit.io/oishidam/products/9b16fa01-cd0f-4a8f-814d-15b210b2d670_37VAzQqN4.webp", "alt_text": "S&B 에스비 산초 파우더 가루 8g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1706", "sku_code": "NPPIP-DEMO-1745299669", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1721", "category_id": "69", "name": "마루미야 일본식 솥밥 밀키트 2종 (고모쿠메시/토리가마메시)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:48.905411", "deleted_at": null,
    images: [{"product_image_id": "1705", "url": "https://ik.imagekit.io/oishidam/products/b3fb8605-05b3-4843-bfbd-c4f761fa6c97_qFyFI_z6Y.webp", "alt_text": "마루미야 일본식 솥밥 밀키트 2종 (고모쿠메시/토리가마메시)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1707", "sku_code": "NPPIP-DEMO-1744964656", "variant_name": "기본", "option_values": {}, "price": 5100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1722", "category_id": "79", "name": "YBC 야마자키 칩스타 S 45g 감자칩 4종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:49.092737", "deleted_at": null,
    images: [{"product_image_id": "1706", "url": "https://ik.imagekit.io/oishidam/products/01b1ace2-134b-4528-a4f5-cc553eb6cc6d_UCNKVave8.webp", "alt_text": "YBC 야마자키 칩스타 S 45g 감자칩 4종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1708", "sku_code": "NPPIP-DEMO-1744678071", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1723", "category_id": "79", "name": "가루비 자가리코 치즈맛 55g 6개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:49.403008", "deleted_at": null,
    images: [{"product_image_id": "1707", "url": "https://ik.imagekit.io/oishidam/products/9c8b0644-29d0-479e-8585-11d33ed0e018_lyRPZnzb0i.webp", "alt_text": "가루비 자가리코 치즈맛 55g 6개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1709", "sku_code": "NPPIP-DEMO-1661499504", "variant_name": "기본", "option_values": {}, "price": 12600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1724", "category_id": "91", "name": "하우스 푸딩 엘 60g (4인분)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:50.262029", "deleted_at": null,
    images: [{"product_image_id": "1708", "url": "https://ik.imagekit.io/oishidam/products/56e9370c-1430-45ec-85e5-5cda71ff77b5_SRFGEaw5e.webp", "alt_text": "하우스 푸딩 엘 60g (4인분)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1710", "sku_code": "NPPIP-DEMO-1616745166", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1725", "category_id": "88", "name": "부르봉 페투치네 구미 아사이볼맛 젤리 47g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:50.835993", "deleted_at": null,
    images: [{"product_image_id": "1709", "url": "https://ik.imagekit.io/oishidam/products/3a78c357-6799-4e07-aafe-5a50265ebc1b_F3oTaQELa.webp", "alt_text": "부르봉 페투치네 구미 아사이볼맛 젤리 47g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1711", "sku_code": "NPPIP-DEMO-17742472698", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1726", "category_id": "88", "name": "크라시에 포핀쿠킨 가루쿡 구미츠레타 포도&소다맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:50.96213", "deleted_at": null,
    images: [{"product_image_id": "1710", "url": "https://ik.imagekit.io/oishidam/products/01026593-c8af-430f-8fe9-6733c3e6a92b_jFcHYSRip.webp", "alt_text": "크라시에 포핀쿠킨 가루쿡 구미츠레타 포도&소다맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1712", "sku_code": "NPPIP-DEMO-1745300672", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1727", "category_id": "70", "name": "아지노모토 크노르 동결건조 스프 4종 (계란/시금치/중화/해물)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:51.332871", "deleted_at": null,
    images: [{"product_image_id": "1711", "url": "https://ik.imagekit.io/oishidam/products/c587e4ca-a4f6-4dc9-8502-e3015f40ee7f_xfMMBQXqp.webp", "alt_text": "아지노모토 크노르 동결건조 스프 4종 (계란/시금치/중화/해물)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1713", "sku_code": "NPPIP-DEMO-1743564443", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1728", "category_id": "91", "name": "이무라야 일본 한손으로 짜먹는 양갱 7개입 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:51.962149", "deleted_at": null,
    images: [{"product_image_id": "1712", "url": "https://ik.imagekit.io/oishidam/products/41c257c0-7a60-464f-9d26-24b8def39bcd_GDk73qA7A.webp", "alt_text": "이무라야 일본 한손으로 짜먹는 양갱 7개입 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1714", "sku_code": "NPPIP-DEMO-1739411762", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1729", "category_id": "87", "name": "칸로 킨노밀크 금의 밀크 카페라떼 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:52.656938", "deleted_at": null,
    images: [{"product_image_id": "1713", "url": "https://ik.imagekit.io/oishidam/products/f13391eb-cd38-4a16-b25f-79537d36bd33_mnCVLMea-.webp", "alt_text": "칸로 킨노밀크 금의 밀크 카페라떼 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1715", "sku_code": "NPPIP-DEMO-1719544974", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1730", "category_id": "73", "name": "닛신 호빵맨 라면 담백 간장맛 3봉입 봉지라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:52.842081", "deleted_at": null,
    images: [{"product_image_id": "1714", "url": "https://ik.imagekit.io/oishidam/products/9c8bf411-e78d-471e-9236-8d5365a23c75_wHYbWelgN.webp", "alt_text": "닛신 호빵맨 라면 담백 간장맛 3봉입 봉지라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1716", "sku_code": "NPPIP-DEMO-1624522581", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1731", "category_id": "72", "name": "에이스쿡 슈퍼컵 MAX 돈코츠 라멘 119g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:53.291917", "deleted_at": null,
    images: [{"product_image_id": "1715", "url": "https://ik.imagekit.io/oishidam/products/41405570-0ff7-4ce5-85b0-980accd83337_ob_Ch5P5fy.webp", "alt_text": "에이스쿡 슈퍼컵 MAX 돈코츠 라멘 119g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1717", "sku_code": "NPPIP-DEMO-1564021692", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1732", "category_id": "72", "name": "묘조 잇페이짱 야끼소바 간사이풍 오코노미야끼소스맛 122g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:53.91672", "deleted_at": null,
    images: [{"product_image_id": "1716", "url": "https://ik.imagekit.io/oishidam/products/9503b11a-0bdf-4f49-a7e4-57613b3e6096_n2X3hFACd.webp", "alt_text": "묘조 잇페이짱 야끼소바 간사이풍 오코노미야끼소스맛 122g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1718", "sku_code": "NPPIP-DEMO-1780631306", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1733", "category_id": "79", "name": "카메다 파우더 250% 해피탄 쌀과자 53g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:54.704999", "deleted_at": null,
    images: [{"product_image_id": "1718", "url": "https://ik.imagekit.io/oishidam/products/2a76dec9-a898-4fea-b917-00050e10bf2b_Ox7zFc-mG.webp", "alt_text": "카메다 파우더 250% 해피탄 쌀과자 53g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1719", "sku_code": "NPPIP-DEMO-1771893265", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1734", "category_id": "79", "name": "카스카이 이카피나 원조 오징어땅콩 과자 89g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:54.689724", "deleted_at": null,
    images: [{"product_image_id": "1717", "url": "https://ik.imagekit.io/oishidam/products/ac8887c6-3f60-48a1-bac0-be2def0a2e21_p9tIeTPGF.webp", "alt_text": "카스카이 이카피나 원조 오징어땅콩 과자 89g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1720", "sku_code": "NPPIP-DEMO-1770603448", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1735", "category_id": "79", "name": "가루비 자가비 Jagabee 버터 간장 맛 듬뿍 팩 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:55.205701", "deleted_at": null,
    images: [{"product_image_id": "1719", "url": "https://ik.imagekit.io/oishidam/products/b9e07e1c-7d84-4474-bf28-3a27014ac9c7_TVDLlf4bJ.webp", "alt_text": "가루비 자가비 Jagabee 버터 간장 맛 듬뿍 팩 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1721", "sku_code": "NPPIP-DEMO-1660286163", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1736", "category_id": "81", "name": "[AGF]블랜디®스틱 카페오레 무당 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:55.563326", "deleted_at": null,
    images: [{"product_image_id": "1720", "url": "https://ik.imagekit.io/oishidam/products/410340e7-7f7f-4898-a1e9-79887773129f_FPpd7ezTx.webp", "alt_text": "[AGF]블랜디®스틱 카페오레 무당 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1722", "sku_code": "NPPIP-DEMO-1617851525", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1737", "category_id": "79", "name": "가루비 자가리코 고기된장맛 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:56.5283", "deleted_at": null,
    images: [{"product_image_id": "1721", "url": "https://ik.imagekit.io/oishidam/products/de21edc8-838e-4c1d-90a8-9e57ee5f5a55_aZ0Tgj9bu.webp", "alt_text": "가루비 자가리코 고기된장맛 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1723", "sku_code": "NPPIP-DEMO-1782719157", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1738", "category_id": "86", "name": "롯데 입에 붙지 않는 껌 기억력 유지 타입 부드러운 민트맛 14개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:56.730339", "deleted_at": null,
    images: [{"product_image_id": "1722", "url": "https://ik.imagekit.io/oishidam/products/253a1e99-e7bf-4164-bcd6-f1cfb0b3fd9c_OQ8P4zk8L.webp", "alt_text": "롯데 입에 붙지 않는 껌 기억력 유지 타입 부드러운 민트맛 14개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1724", "sku_code": "NPPIP-DEMO-1782356711", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1739", "category_id": "79", "name": "부르봉 엘리제 레자루 슈가버터맛 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:56.88545", "deleted_at": null,
    images: [{"product_image_id": "1723", "url": "https://ik.imagekit.io/oishidam/products/2f4a734b-8f25-4e06-8b26-3ca74939feef_-D_gJc6o-.webp", "alt_text": "부르봉 엘리제 레자루 슈가버터맛 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1725", "sku_code": "NPPIP-DEMO-17742472687", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1740", "category_id": "80", "name": "부르봉 세브레 버터 쿠키 14개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:57.246254", "deleted_at": null,
    images: [{"product_image_id": "1724", "url": "https://ik.imagekit.io/oishidam/products/38da1e63-0725-4b10-9fe6-6024d9dc5f75_aMAWhFK5rV.webp", "alt_text": "부르봉 세브레 버터 쿠키 14개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1726", "sku_code": "NPPIP-DEMO-1744357873", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1741", "category_id": "89", "name": "브루봉 알포트 미니초콜릿 쇼콜라 사브레 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:58.478465", "deleted_at": null,
    images: [{"product_image_id": "1725", "url": "https://ik.imagekit.io/oishidam/products/1365c49a-97e1-4b95-b3d9-c11ff2b1d475_a28hIOigq.webp", "alt_text": "브루봉 알포트 미니초콜릿 쇼콜라 사브레 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1727", "sku_code": "NPPIP-DEMO-1743645002", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1742", "category_id": "79", "name": "카메다제과 무겐에비 무한 새우 센베이 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:58.664663", "deleted_at": null,
    images: [{"product_image_id": "1726", "url": "https://ik.imagekit.io/oishidam/products/964f4cc8-c16b-40ee-9c31-e836ac0b903a_kzwyvUIPp.webp", "alt_text": "카메다제과 무겐에비 무한 새우 센베이 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1728", "sku_code": "NPPIP-DEMO-1742973692", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1743", "category_id": "88", "name": "크라시에 포핀쿠킨 가루쿡 네루네루네루네 포도맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:58.78853", "deleted_at": null,
    images: [{"product_image_id": "1727", "url": "https://ik.imagekit.io/oishidam/products/12dc6242-faf8-4153-81b8-4f05b7a4608f_BneiQFmjp.webp", "alt_text": "크라시에 포핀쿠킨 가루쿡 네루네루네루네 포도맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1729", "sku_code": "NPPIP-DEMO-1618197528", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1744", "category_id": "87", "name": "UHA미각당 시오노하나 소금 꽃 코가시 밀크맛 초콜릿 사탕 71g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:13:59.164611", "deleted_at": null,
    images: [{"product_image_id": "1728", "url": "https://ik.imagekit.io/oishidam/products/7f86fb71-0e89-49d5-9da2-663cc87fd566_RCxvZ4k3Z.webp", "alt_text": "UHA미각당 시오노하나 소금 꽃 코가시 밀크맛 초콜릿 사탕 71g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1730", "sku_code": "NPPIP-DEMO-1778132478", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1745", "category_id": "72", "name": "[페양구]불야끼소바", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:00.117834", "deleted_at": null,
    images: [{"product_image_id": "1729", "url": "https://ik.imagekit.io/oishidam/products/0f2daa5b-7c56-4a0e-8072-9981bc907356_Q0fuVO3SJ4.webp", "alt_text": "[페양구]불야끼소바", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1731", "sku_code": "NPPIP-DEMO-1650010436", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1746", "category_id": "80", "name": "롯데 더 카라멜 쿠키 3개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:00.472767", "deleted_at": null,
    images: [{"product_image_id": "1730", "url": "https://ik.imagekit.io/oishidam/products/68b8cfcc-ecf9-485a-a76f-e7fa11910fd6_S6wV3DtRJ.webp", "alt_text": "롯데 더 카라멜 쿠키 3개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1732", "sku_code": "NPPIP-DEMO-1784703132", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1747", "category_id": "69", "name": "하우스 완숙 토마토 하야시 라이스 소스 10접시분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:00.67672", "deleted_at": null,
    images: [{"product_image_id": "1731", "url": "https://ik.imagekit.io/oishidam/products/68ed650f-b992-4367-8899-529596876d11_T7nIwi71W.webp", "alt_text": "하우스 완숙 토마토 하야시 라이스 소스 10접시분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1733", "sku_code": "NPPIP-DEMO-1742199673", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1748", "category_id": "72", "name": "[페양구]소스 야끼소바", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:01.087591", "deleted_at": null,
    images: [{"product_image_id": "1732", "url": "https://ik.imagekit.io/oishidam/products/f0dcdd67-6129-4ccf-a36a-9684588d644f_mm880OIHK.webp", "alt_text": "[페양구]소스 야끼소바", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1734", "sku_code": "NPPIP-DEMO-1650008430", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1749", "category_id": "72", "name": "[닛신]돈베 가키아게 튀김 우동", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:01.994261", "deleted_at": null,
    images: [{"product_image_id": "1733", "url": "https://ik.imagekit.io/oishidam/products/229b701f-d026-41a8-84ee-f0f00bdbdc1d_49RkP5gGM.webp", "alt_text": "[닛신]돈베 가키아게 튀김 우동", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1735", "sku_code": "NPPIP-DEMO-1638176150", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1750", "category_id": "79", "name": "가루비 자가리코 샐러드맛 57g (11+1) 12개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:02.37966", "deleted_at": null,
    images: [{"product_image_id": "1734", "url": "https://ik.imagekit.io/oishidam/products/41fdc3a9-18e6-4190-b237-2dc6fa07fabe_9OuhMeh4D.webp", "alt_text": "가루비 자가리코 샐러드맛 57g (11+1) 12개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1736", "sku_code": "NPPIP-DEMO-1616740709", "variant_name": "기본", "option_values": {}, "price": 23500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1751", "category_id": "79", "name": "부르봉 오모치노 히토토키 고구마맛 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:02.802688", "deleted_at": null,
    images: [{"product_image_id": "1736", "url": "https://ik.imagekit.io/oishidam/products/9e52b08c-5c3e-4b9d-a1cf-312cbbaa6856_B5w1tF8Jj.webp", "alt_text": "부르봉 오모치노 히토토키 고구마맛 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1737", "sku_code": "NPPIP-DEMO-1786520113", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1752", "category_id": "86", "name": "롯데 도라에몽 풍선껌 츄잉껌 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:02.793894", "deleted_at": null,
    images: [{"product_image_id": "1735", "url": "https://ik.imagekit.io/oishidam/products/e6f01360-c6f9-49a1-9a40-01d5c971df76_ELP2TknIU.webp", "alt_text": "롯데 도라에몽 풍선껌 츄잉껌 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1738", "sku_code": "NPPIP-DEMO-1785999468", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1753", "category_id": "86", "name": "롯데 체지방 케어 껌 스피아민트맛 14개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:03.999451", "deleted_at": null,
    images: [{"product_image_id": "1737", "url": "https://ik.imagekit.io/oishidam/products/b55e595a-2c3f-4900-bbb0-f6f5053ca070__n9EWlqr7.webp", "alt_text": "롯데 체지방 케어 껌 스피아민트맛 14개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1739", "sku_code": "NPPIP-DEMO-1784525611", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1754", "category_id": "79", "name": "부르봉 히토쿠치 루만도 소금 캬라멜 아이스크림맛 47g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:04.350514", "deleted_at": null,
    images: [{"product_image_id": "1738", "url": "https://ik.imagekit.io/oishidam/products/91a92a8f-1bbb-476f-b4c0-233830895828_490mQn7HCh.webp", "alt_text": "부르봉 히토쿠치 루만도 소금 캬라멜 아이스크림맛 47g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1740", "sku_code": "NPPIP-DEMO-1782718237", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1755", "category_id": "83", "name": "일동홍차 파우더 스틱 티 3종", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1740", "url": "https://ik.imagekit.io/oishidam/products/78189c07-007a-4126-879e-84c15f181717__Lo1krNaY.webp", "alt_text": "일동홍차 파우더 스틱 티 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1741", "sku_code": "NPPIP-DEMO-1744940148", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1756", "category_id": "72", "name": "[닛신]돈베 곱빼기 가키아게 튀김 우동", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:04.676216", "deleted_at": null,
    images: [{"product_image_id": "1739", "url": "https://ik.imagekit.io/oishidam/products/5e7c19fc-afb6-4ec7-aead-f70a2de8ed0f_sVArd7t7r.webp", "alt_text": "[닛신]돈베 곱빼기 가키아게 튀김 우동", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1742", "sku_code": "NPPIP-DEMO-1638177560", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1757", "category_id": "65", "name": "로손 이모켄삐 이모켄피 고구마 스틱 스낵 61g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:05.88247", "deleted_at": null,
    images: [{"product_image_id": "1741", "url": "https://ik.imagekit.io/oishidam/products/c71b8a82-b02e-448b-83f8-bc20ec1309d1_TNPfHtG-g.webp", "alt_text": "로손 이모켄삐 이모켄피 고구마 스틱 스낵 61g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1743", "sku_code": "NPPIP-DEMO-1784706683", "variant_name": "기본", "option_values": {}, "price": 3150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1758", "category_id": "82", "name": "라칸토 칼로리 제로 캔디 무설탕 사탕 60g 3종 (딸기/커피/말차)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:06.026857", "deleted_at": null,
    images: [{"product_image_id": "1742", "url": "https://ik.imagekit.io/oishidam/products/bfab3671-f855-4064-a98e-849fbaff8b11_u7gkbbRXS.webp", "alt_text": "라칸토 칼로리 제로 캔디 무설탕 사탕 60g 3종 (딸기/커피/말차)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1744", "sku_code": "NPPIP-DEMO-1758763656", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1759", "category_id": "88", "name": "칸로 퓨레구미 프리미엄 샤인머스캣 스파클링 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:06.546407", "deleted_at": null,
    images: [{"product_image_id": "1743", "url": "https://ik.imagekit.io/oishidam/products/5d952a72-1017-462e-8729-41d9f74ea97f_RWvMcnZa9.webp", "alt_text": "칸로 퓨레구미 프리미엄 샤인머스캣 스파클링 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1745", "sku_code": "NPPIP-DEMO-1752646702", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1760", "category_id": "79", "name": "가루비 자가리코 감자버터맛 55g 6개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:06.639109", "deleted_at": null,
    images: [{"product_image_id": "1744", "url": "https://ik.imagekit.io/oishidam/products/59ef0010-31c4-4e5f-9a3d-c9968534d4d7_HGTOc0-lU.webp", "alt_text": "가루비 자가리코 감자버터맛 55g 6개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1746", "sku_code": "NPPIP-DEMO-1660813776", "variant_name": "기본", "option_values": {}, "price": 12600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1761", "category_id": "93", "name": "시라코 오차즈케 메구리 5종 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:07.880771", "deleted_at": null,
    images: [{"product_image_id": "1745", "url": "https://ik.imagekit.io/oishidam/products/17c85159-8ec6-41ee-9a26-83ce5834c72d_m4pIBNFEf.webp", "alt_text": "시라코 오차즈케 메구리 5종 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1747", "sku_code": "NPPIP-DEMO-1660286218", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1762", "category_id": "87", "name": "아사히 민티아 드라이 하드 10개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:07.946783", "deleted_at": null,
    images: [{"product_image_id": "1746", "url": "https://ik.imagekit.io/oishidam/products/83a1c7cb-e569-4e9f-8e96-ad39153ade92_rR5B-eFSQ.webp", "alt_text": "아사히 민티아 드라이 하드 10개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1748", "sku_code": "NPPIP-DEMO-1616640204", "variant_name": "기본", "option_values": {}, "price": 15000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1763", "category_id": "93", "name": "마루미야 노리타마 후리카케 미니팩 20봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:08.479623", "deleted_at": null,
    images: [{"product_image_id": "1748", "url": "https://ik.imagekit.io/oishidam/products/a17f0e88-ad13-4c19-a634-7e19f8383dc8_YvabT7GPDf.webp", "alt_text": "마루미야 노리타마 후리카케 미니팩 20봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1749", "sku_code": "NPPIP-DEMO-17811399535", "variant_name": "기본", "option_values": {}, "price": 3550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1764", "category_id": "88", "name": "오리히로 곤약젤리 프리미엄카페 안닌맛 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:08.300733", "deleted_at": null,
    images: [{"product_image_id": "1747", "url": "https://ik.imagekit.io/oishidam/products/c9ad27ae-8b66-47b2-a873-db8ea502b95c_tsh9oyJNL.webp", "alt_text": "오리히로 곤약젤리 프리미엄카페 안닌맛 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1750", "sku_code": "NPPIP-DEMO-17739058447", "variant_name": "기본", "option_values": {}, "price": 3100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1765", "category_id": "80", "name": "긴비스 타벳코 동물 수족관 초코맛 쿠키 비스킷 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:09.795978", "deleted_at": null,
    images: [{"product_image_id": "1750", "url": "https://ik.imagekit.io/oishidam/products/69b6b46e-6f58-4e1e-80d1-f67df5cb99c9_yNwnXNIFv.webp", "alt_text": "긴비스 타벳코 동물 수족관 초코맛 쿠키 비스킷 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1751", "sku_code": "NPPIP-DEMO-1756368680", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1766", "category_id": "83", "name": "이토엔 원포트 우롱차 티백 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:09.748161", "deleted_at": null,
    images: [{"product_image_id": "1749", "url": "https://ik.imagekit.io/oishidam/products/ae2027f5-b0f5-4a7d-987c-d0de862f033b_gOFyRc3qeg.webp", "alt_text": "이토엔 원포트 우롱차 티백 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1752", "sku_code": "NPPIP-DEMO-1743484341", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1767", "category_id": "94", "name": "아지노모토 만능 닭 육수 감칠맛 토리가라 스프 분말타입 조미료 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:10.205037", "deleted_at": null,
    images: [{"product_image_id": "1752", "url": "https://ik.imagekit.io/oishidam/products/0bb0360a-182a-4d2c-8987-0d3f5c1dc8b3_EY0AKBDoD.webp", "alt_text": "아지노모토 만능 닭 육수 감칠맛 토리가라 스프 분말타입 조미료 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1753", "sku_code": "NPPIP-DEMO-1740038094", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1768", "category_id": "79", "name": "프리츠 일본식 육수향 가리비 간장맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:10.172192", "deleted_at": null,
    images: [{"product_image_id": "1751", "url": "https://ik.imagekit.io/oishidam/products/4e1e7d93-cc23-4e47-94b5-b405d43db84c_D9BXm_KPn.webp", "alt_text": "프리츠 일본식 육수향 가리비 간장맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1754", "sku_code": "NPPIP-DEMO-1659345711", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1769", "category_id": "79", "name": "부르봉 미니 루만도 밤 몽블랑맛 121g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1753", "url": "https://ik.imagekit.io/oishidam/products/38753652-937c-423a-9efb-675f196d9c7c_T_51fvalI.webp", "alt_text": "부르봉 미니 루만도 밤 몽블랑맛 121g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1755", "sku_code": "NPPIP-DEMO-17859829396", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1770", "category_id": "87", "name": "UHA미각당 시오아즈키 소금 팥 사탕 109g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:11.640999", "deleted_at": null,
    images: [{"product_image_id": "1754", "url": "https://ik.imagekit.io/oishidam/products/a7df4988-ae73-4df2-b862-296a358bb5c2_ifrQDhDey.webp", "alt_text": "UHA미각당 시오아즈키 소금 팥 사탕 109g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1756", "sku_code": "NPPIP-DEMO-1780975475", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1771", "category_id": "65", "name": "로손 한입 소스 카츠 튀김 안주 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:12.10983", "deleted_at": null,
    images: [{"product_image_id": "1756", "url": "https://ik.imagekit.io/oishidam/products/c9521bde-c36e-431c-a4f4-3b745d0bec3b_tVHivryY6.webp", "alt_text": "로손 한입 소스 카츠 튀김 안주 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1757", "sku_code": "NPPIP-DEMO-177691269486", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1772", "category_id": "65", "name": "로손 바삭바삭 크레페 초코맛 과자 16봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:12.063881", "deleted_at": null,
    images: [{"product_image_id": "1755", "url": "https://ik.imagekit.io/oishidam/products/50fea110-3fd7-4bfb-8676-7cd1c4a4a594_BPao-gAKd.webp", "alt_text": "로손 바삭바삭 크레페 초코맛 과자 16봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1758", "sku_code": "NPPIP-DEMO-177691269062", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1773", "category_id": "88", "name": "오리히로 곤약젤리 백도 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:13.299805", "deleted_at": null,
    images: [{"product_image_id": "1757", "url": "https://ik.imagekit.io/oishidam/products/c0d313f9-1c30-4d4b-8c77-4bd675d7e6d7_P77HhGjGT.webp", "alt_text": "오리히로 곤약젤리 백도 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1759", "sku_code": "NPPIP-DEMO-17739058413", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1774", "category_id": "72", "name": "산요 삿포로 이치방 포켓몬 피카츄 누들 간장맛 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:13.571492", "deleted_at": null,
    images: [{"product_image_id": "1758", "url": "https://ik.imagekit.io/oishidam/products/c0d503f7-6386-4bec-a8e0-096fcdc3880a_K_JgvZhnd.webp", "alt_text": "산요 삿포로 이치방 포켓몬 피카츄 누들 간장맛 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1760", "sku_code": "NPPIP-DEMO-1637804881", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1775", "category_id": "79", "name": "버섯 산딸기 & 쇼콜라 64g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:13.942932", "deleted_at": null,
    images: [{"product_image_id": "1759", "url": "https://ik.imagekit.io/oishidam/products/7646af8a-d1ea-4a17-8c54-54f503fed2b9_JBJX7SzhB.webp", "alt_text": "버섯 산딸기 & 쇼콜라 64g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1761", "sku_code": "NPPIP-DEMO-1624845363", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1776", "category_id": "94", "name": "모모야 후라이드 닝니쿠 마늘 후레이크 버터맛 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:13.988878", "deleted_at": null,
    images: [{"product_image_id": "1760", "url": "https://ik.imagekit.io/oishidam/products/0449a5e6-d82a-4b8b-87b5-1e3513881c64_wfYVnsefHZ.webp", "alt_text": "모모야 후라이드 닝니쿠 마늘 후레이크 버터맛 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1762", "sku_code": "NPPIP-DEMO-1778216787", "variant_name": "기본", "option_values": {}, "price": 6000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1777", "category_id": "79", "name": "긴비스 긴자 러스크 유혹의 쇼콜라 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:15.244239", "deleted_at": null,
    images: [{"product_image_id": "1761", "url": "https://ik.imagekit.io/oishidam/products/472ed5f5-c6ba-42e9-9e23-074a388023d7_OuB3KLq6m.webp", "alt_text": "긴비스 긴자 러스크 유혹의 쇼콜라 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1763", "sku_code": "NPPIP-DEMO-1776914676", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1778", "category_id": "87", "name": "사쿠마 츠미부카이 복숭아 캔디 54g 일본 사탕", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:15.283362", "deleted_at": null,
    images: [{"product_image_id": "1762", "url": "https://ik.imagekit.io/oishidam/products/be9720a7-ee2c-4fbc-9f51-71504987c303_Nu-12xBfU.webp", "alt_text": "사쿠마 츠미부카이 복숭아 캔디 54g 일본 사탕", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1764", "sku_code": "NPPIP-DEMO-1774850023", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1779", "category_id": "67", "name": "패밀리마트 매운 시치미 센베이 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:15.926379", "deleted_at": null,
    images: [{"product_image_id": "1764", "url": "https://ik.imagekit.io/oishidam/products/99783b86-ef34-4e49-bab5-e442870cb92d_wiynJnq4A.webp", "alt_text": "패밀리마트 매운 시치미 센베이 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1765", "sku_code": "NPPIP-DEMO-1770251412", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1780", "category_id": "80", "name": "부르봉 크로와파이 7매입 일본 쿠키 과자", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1763", "url": "https://ik.imagekit.io/oishidam/products/81504919-2200-4f0f-9de8-ff47a255bf2a_TW8uK4Ucx.webp", "alt_text": "부르봉 크로와파이 7매입 일본 쿠키 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1766", "sku_code": "NPPIP-DEMO-1741758597", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1781", "category_id": "94", "name": "오오모리야 일본 조미 김 식탁용김 3종 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:17.187236", "deleted_at": null,
    images: [{"product_image_id": "1766", "url": "https://ik.imagekit.io/oishidam/products/cc9c5c9a-1fde-4c91-93b4-0d2ecd2e3b93_MdR1asJu5.webp", "alt_text": "오오모리야 일본 조미 김 식탁용김 3종 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1767", "sku_code": "NPPIP-DEMO-1739152341", "variant_name": "기본", "option_values": {}, "price": 6600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1782", "category_id": "83", "name": "이토엔 오이오차 체지방을 줄여주는 진한 녹차 파우더 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:16.958917", "deleted_at": null,
    images: [{"product_image_id": "1765", "url": "https://ik.imagekit.io/oishidam/products/e63b3fe9-011b-4f8b-b115-6b1c6ccee266_uwPe4EyRHk.webp", "alt_text": "이토엔 오이오차 체지방을 줄여주는 진한 녹차 파우더 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1768", "sku_code": "NPPIP-DEMO-1635837754", "variant_name": "기본", "option_values": {}, "price": 11400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1783", "category_id": "67", "name": "패밀리마트 미림의 감칠맛 진한 새우 대형 구이", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:18.137311", "deleted_at": null,
    images: [{"product_image_id": "1768", "url": "https://ik.imagekit.io/oishidam/products/a78c2fc2-3775-4a7e-8c04-0efc090490f9_ciKyrK5O-.webp", "alt_text": "패밀리마트 미림의 감칠맛 진한 새우 대형 구이", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1769", "sku_code": "NPPIP-DEMO-1623223452", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1784", "category_id": "93", "name": "마루미야 치이카와 후리카케 미니팩 20개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:17.670089", "deleted_at": null,
    images: [{"product_image_id": "1767", "url": "https://ik.imagekit.io/oishidam/products/dcb0c2f0-91b6-4325-a48a-652600efdc54_2GY-FCG7I.webp", "alt_text": "마루미야 치이카와 후리카케 미니팩 20개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1770", "sku_code": "NPPIP-DEMO-178113996021", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1785", "category_id": "79", "name": "부르봉 자가초코 감자칩 37g 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:18.6503", "deleted_at": null,
    images: [{"product_image_id": "1769", "url": "https://ik.imagekit.io/oishidam/products/82c480f1-1d94-4625-8ca7-fdacb1d3f6d4_Yl99VJMmS.webp", "alt_text": "부르봉 자가초코 감자칩 37g 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1771", "sku_code": "NPPIP-DEMO-1775007643", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1786", "category_id": "79", "name": "마스야 오니기리 센베이 쇼유 간장맛 65g 일본 쌀과자 스낵", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:19.152612", "deleted_at": null,
    images: [{"product_image_id": "1770", "url": "https://ik.imagekit.io/oishidam/products/d81b7281-0b1f-4b06-aa86-bbb4de30eae7_3iRpwin6P.webp", "alt_text": "마스야 오니기리 센베이 쇼유 간장맛 65g 일본 쌀과자 스낵", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1772", "sku_code": "NPPIP-DEMO-1767837738", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1787", "category_id": "94", "name": "칼디 모헤지 유즈코쇼 오이타현산 유자 60g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1771", "url": "https://ik.imagekit.io/oishidam/products/cf3ff6c3-b654-44d2-be72-fdb280ac90a1_WbkjsapR9.webp", "alt_text": "칼디 모헤지 유즈코쇼 오이타현산 유자 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1773", "sku_code": "NPPIP-DEMO-1764232666", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1788", "category_id": "88", "name": "노벨 소르베 복숭아 구미 젤리 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:19.767344", "deleted_at": null,
    images: [{"product_image_id": "1772", "url": "https://ik.imagekit.io/oishidam/products/f9143be4-e2e3-4d65-a129-85c650c3cbbf_ObX00zdO7.webp", "alt_text": "노벨 소르베 복숭아 구미 젤리 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1774", "sku_code": "NPPIP-DEMO-1744696614", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1789", "category_id": "79", "name": "카메다제과 카레센 카레 센베이 쌀과자 15개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:20.521152", "deleted_at": null,
    images: [{"product_image_id": "1773", "url": "https://ik.imagekit.io/oishidam/products/9a3b403b-23d9-42c0-b565-b2e44c51abc4_ugeRIDtwG.webp", "alt_text": "카메다제과 카레센 카레 센베이 쌀과자 15개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1775", "sku_code": "NPPIP-DEMO-1743493409", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1790", "category_id": "82", "name": "빈즈 타베루코히 먹는 커피 태블릿 사탕 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:21.097843", "deleted_at": null,
    images: [{"product_image_id": "1774", "url": "https://ik.imagekit.io/oishidam/products/d45aa73f-d9f6-4052-85e8-e5f39326ca5d_puQCgAbWC.webp", "alt_text": "빈즈 타베루코히 먹는 커피 태블릿 사탕 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1776", "sku_code": "NPPIP-DEMO-1739497689", "variant_name": "기본", "option_values": {}, "price": 7900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1791", "category_id": "73", "name": "마루타이 쇼유 돈코츠 라멘 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:21.905045", "deleted_at": null,
    images: [{"product_image_id": "1776", "url": "https://ik.imagekit.io/oishidam/products/50487ecf-3790-4cae-a4f3-56b74bb7bf75_lN4NpssfU.webp", "alt_text": "마루타이 쇼유 돈코츠 라멘 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1777", "sku_code": "NPPIP-DEMO-1660286228", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1792", "category_id": "79", "name": "에자키 글리코 비스코 보존캔 30매", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:21.407573", "deleted_at": null,
    images: [{"product_image_id": "1775", "url": "https://ik.imagekit.io/oishidam/products/88226914-4743-4f67-8f8b-1b403a317bf5_nvg5OPn77.webp", "alt_text": "에자키 글리코 비스코 보존캔 30매", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1778", "sku_code": "NPPIP-DEMO-1656378426", "variant_name": "기본", "option_values": {}, "price": 7000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1793", "category_id": "89", "name": "[모리나가]초코볼 카라멜 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:22.288387", "deleted_at": null,
    images: [{"product_image_id": "1777", "url": "https://ik.imagekit.io/oishidam/products/df5086cb-4b05-432e-8375-77af2bb0a0d4_E8Gyxly7Y.webp", "alt_text": "[모리나가]초코볼 카라멜 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1779", "sku_code": "NPPIP-DEMO-1635140409", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1794", "category_id": "79", "name": "[부르봉] 초코앙팡 44g 5개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:23.158095", "deleted_at": null,
    images: [{"product_image_id": "1779", "url": "https://ik.imagekit.io/oishidam/products/3aa9ecbb-d51b-48b9-9550-04134ea9f6cf_uDXHB7ZbE.webp", "alt_text": "[부르봉] 초코앙팡 44g 5개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1780", "sku_code": "NPPIP-DEMO-1624877829", "variant_name": "기본", "option_values": {}, "price": 9000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1795", "category_id": "93", "name": "니치후리 후리카케 진한 버터 간장 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:23.034033", "deleted_at": null,
    images: [{"product_image_id": "1778", "url": "https://ik.imagekit.io/oishidam/products/95a29980-7915-4f84-a3e3-0fd525c19242_D2jXcRo2W.webp", "alt_text": "니치후리 후리카케 진한 버터 간장 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1781", "sku_code": "NPPIP-DEMO-178113997048", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1796", "category_id": "93", "name": "마루미야 소프트 후리카케 연어 명란 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:23.839152", "deleted_at": null,
    images: [{"product_image_id": "1780", "url": "https://ik.imagekit.io/oishidam/products/7bc17fea-f51c-496e-a1b8-4e80f8ebc43f_SrXr0tnkQ.webp", "alt_text": "마루미야 소프트 후리카케 연어 명란 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1782", "sku_code": "NPPIP-DEMO-178113995714", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1797", "category_id": "88", "name": "카바야 터프 구미 하드 젤리 아소토 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:24.039516", "deleted_at": null,
    images: [{"product_image_id": "1781", "url": "https://ik.imagekit.io/oishidam/products/4743326f-c26e-4f17-86f6-ba9fd0dc3dd7_j9rvKPUWt.webp", "alt_text": "카바야 터프 구미 하드 젤리 아소토 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1783", "sku_code": "NPPIP-DEMO-1754269376", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1798", "category_id": "82", "name": "사쿠마 코메다커피 카페 커피 사탕 캔디 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:24.956036", "deleted_at": null,
    images: [{"product_image_id": "1782", "url": "https://ik.imagekit.io/oishidam/products/b1c1c983-9556-4c59-b920-1cd3a56e74ad_UfMIIZqL2.webp", "alt_text": "사쿠마 코메다커피 카페 커피 사탕 캔디 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1784", "sku_code": "NPPIP-DEMO-1739929445", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1799", "category_id": "87", "name": "센자쿠 진한 토마토맛 캔디 76g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:25.065945", "deleted_at": null,
    images: [{"product_image_id": "1783", "url": "https://ik.imagekit.io/oishidam/products/b62cc66f-34f5-416f-a477-5fe514d065c6_RjcB-a47h.webp", "alt_text": "센자쿠 진한 토마토맛 캔디 76g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1785", "sku_code": "NPPIP-DEMO-1739502540", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1800", "category_id": "75", "name": "[S&B]마늘 기름장 110g 라면 조미료", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:25.704283", "deleted_at": null,
    images: [{"product_image_id": "1784", "url": "https://ik.imagekit.io/oishidam/products/0c12b597-9659-4664-bc2d-9ec0f17a5028_QojnvTYp_.webp", "alt_text": "[S&B]마늘 기름장 110g 라면 조미료", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1786", "sku_code": "NPPIP-DEMO-1634181975", "variant_name": "기본", "option_values": {}, "price": 6800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1801", "category_id": "88", "name": "크라시에 포핀쿠킨 가루쿡 잡을 수 있다! 신기한 구슬 (포도맛 & 소다맛)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:27.804527", "deleted_at": null,
    images: [{"product_image_id": "1788", "url": "https://ik.imagekit.io/oishidam/products/6e2e497a-a9fb-4d77-a294-3018af8f747c_FRfBxCQ_s.webp", "alt_text": "크라시에 포핀쿠킨 가루쿡 잡을 수 있다! 신기한 구슬 (포도맛 & 소다맛)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1787", "sku_code": "NPPIP-DEMO-1618197992", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1802", "category_id": "88", "name": "코로로 과일 젤리 청포도맛 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:26.941971", "deleted_at": null,
    images: [{"product_image_id": "1786", "url": "https://ik.imagekit.io/oishidam/products/e1bee2dd-056f-4972-ab64-ccd205806255_zuSpBsJco.webp", "alt_text": "코로로 과일 젤리 청포도맛 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1788", "sku_code": "NPPIP-DEMO-1548402484", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1803", "category_id": "80", "name": "롯데 코알라노마치 판타지 소다맛 46g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:26.905189", "deleted_at": null,
    images: [{"product_image_id": "1785", "url": "https://ik.imagekit.io/oishidam/products/16bf98e3-0056-4e9b-9053-425cf07175be_abXSKi395.webp", "alt_text": "롯데 코알라노마치 판타지 소다맛 46g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1789", "sku_code": "NPPIP-DEMO-1783489846", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1804", "category_id": "66", "name": "세븐일레븐 말차 랑그드샤 쿠키 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:27.602374", "deleted_at": null,
    images: [{"product_image_id": "1787", "url": "https://ik.imagekit.io/oishidam/products/663ebfee-f081-4507-83ed-0b6bd79fd478_5-3W2cKFC.webp", "alt_text": "세븐일레븐 말차 랑그드샤 쿠키 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1790", "sku_code": "NPPIP-DEMO-1781759873", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1805", "category_id": "72", "name": "닛신 UFO 야끼소바 쁘띠 63g 야키소바 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:28.828285", "deleted_at": null,
    images: [{"product_image_id": "1790", "url": "https://ik.imagekit.io/oishidam/products/eb5c04be-cadc-49e0-8e5f-5304f2ecac00_n_GTOMCMK.webp", "alt_text": "닛신 UFO 야끼소바 쁘띠 63g 야키소바 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1791", "sku_code": "NPPIP-DEMO-1774488268", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1806", "category_id": "79", "name": "프링글스 홋카이도 한정 포테토칩 가리비 버터 간장맛 3캔", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:28.819286", "deleted_at": null,
    images: [{"product_image_id": "1789", "url": "https://ik.imagekit.io/oishidam/products/e147efaa-a1a5-4305-80ed-c41b06ffb408_B0iZlfPnQ.webp", "alt_text": "프링글스 홋카이도 한정 포테토칩 가리비 버터 간장맛 3캔", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1792", "sku_code": "NPPIP-DEMO-1773731671", "variant_name": "기본", "option_values": {}, "price": 12000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1807", "category_id": "75", "name": "훈도다이 투명 간장 100ml", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:29.532671", "deleted_at": null,
    images: [{"product_image_id": "1791", "url": "https://ik.imagekit.io/oishidam/products/3e74b740-f8c0-4243-9832-2f5004060b76_PFAmkGtaw.webp", "alt_text": "훈도다이 투명 간장 100ml", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1793", "sku_code": "NPPIP-DEMO-1739935693", "variant_name": "기본", "option_values": {}, "price": 8000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1808", "category_id": "72", "name": "[페양구]초대형 야끼소바 반반 매운맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:29.732419", "deleted_at": null,
    images: [{"product_image_id": "1792", "url": "https://ik.imagekit.io/oishidam/products/63f5cf99-8ccd-440a-8aae-7d1acf3a50c9_L2KWbUc5i.webp", "alt_text": "[페양구]초대형 야끼소바 반반 매운맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1794", "sku_code": "NPPIP-DEMO-1650008389", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1809", "category_id": "67", "name": "패밀리마트 숯불 야키토리 세토우치 소금맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:30.789059", "deleted_at": null,
    images: [{"product_image_id": "1794", "url": "https://ik.imagekit.io/oishidam/products/52d64f28-50ad-4b77-9141-7f68ac468257_SLZuciUvV.webp", "alt_text": "패밀리마트 숯불 야키토리 세토우치 소금맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1795", "sku_code": "NPPIP-DEMO-1623389472", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1810", "category_id": "67", "name": "패밀리마트 6종의 고추맛 폭군 하바네로", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:30.693993", "deleted_at": null,
    images: [{"product_image_id": "1793", "url": "https://ik.imagekit.io/oishidam/products/7fdd9897-2ebb-4833-ac4f-c8ec5702962f_4AxtgiO6T.webp", "alt_text": "패밀리마트 6종의 고추맛 폭군 하바네로", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1796", "sku_code": "NPPIP-DEMO-1623221268", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1811", "category_id": "88", "name": "크라시에 포핀쿠킨 가루쿡 햄버거 만들기", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:31.454895", "deleted_at": null,
    images: [{"product_image_id": "1796", "url": "https://ik.imagekit.io/oishidam/products/e517a76d-cadb-405c-b057-61dce3f0922d_OBeAhrA_1.webp", "alt_text": "크라시에 포핀쿠킨 가루쿡 햄버거 만들기", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1797", "sku_code": "NPPIP-DEMO-1618196756", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1812", "category_id": "87", "name": "기간 한정 아사히 민티아 마루데 파인애플", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:31.378784", "deleted_at": null,
    images: [{"product_image_id": "1795", "url": "https://ik.imagekit.io/oishidam/products/6ee4b06e-2486-4d4a-bc59-8d55cb1583d4_X0SWIRwG6.webp", "alt_text": "기간 한정 아사히 민티아 마루데 파인애플", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1798", "sku_code": "NPPIP-DEMO-178236568615", "variant_name": "기본", "option_values": {}, "price": 2300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1813", "category_id": "93", "name": "마루미야 휴대용 후리카케 치이카와 연어맛 20g 디자인 랜덤", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:32.403337", "deleted_at": null,
    images: [{"product_image_id": "1797", "url": "https://ik.imagekit.io/oishidam/products/d4677006-d8ba-44de-8952-a552b3b0afe5_x_5RRK1fw.webp", "alt_text": "마루미야 휴대용 후리카케 치이카와 연어맛 20g 디자인 랜덤", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1799", "sku_code": "NPPIP-DEMO-178113996636", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1814", "category_id": "89", "name": "롯데 프리미엄 가나 사브레쇼콜라 깊은 우지말차맛 초콜릿 49g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:32.512377", "deleted_at": null,
    images: [{"product_image_id": "1798", "url": "https://ik.imagekit.io/oishidam/products/d40969ef-8644-43fb-973e-662ab018a816_Q1s14Xt3R.webp", "alt_text": "롯데 프리미엄 가나 사브레쇼콜라 깊은 우지말차맛 초콜릿 49g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1800", "sku_code": "NPPIP-DEMO-1775694545", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1815", "category_id": "79", "name": "코이케야 스콘 스낵 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:33.301479", "deleted_at": null,
    images: [{"product_image_id": "1799", "url": "https://ik.imagekit.io/oishidam/products/e3181f8a-3369-4187-a669-76b9dd324ffa_3XOn3PiSp.webp", "alt_text": "코이케야 스콘 스낵 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1801", "sku_code": "NPPIP-DEMO-1741744795", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1816", "category_id": "79", "name": "이와테야 마메고로우 땅콩 센베이 6매입 일본 피넛 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:33.411369", "deleted_at": null,
    images: [{"product_image_id": "1800", "url": "https://ik.imagekit.io/oishidam/products/7fdb97d4-d921-41d2-9a39-5a52178e7f03_PEvVI4YrZ.webp", "alt_text": "이와테야 마메고로우 땅콩 센베이 6매입 일본 피넛 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1802", "sku_code": "NPPIP-DEMO-1737098928", "variant_name": "기본", "option_values": {}, "price": 11000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1817", "category_id": "80", "name": "후지야 컨트리맘 숙성 고구마맛 쿠키 12매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:34.314969", "deleted_at": null,
    images: [{"product_image_id": "1802", "url": "https://ik.imagekit.io/oishidam/products/b623d500-70c8-4ffa-a286-0e45d0265d30_goHYaP-Y1.webp", "alt_text": "후지야 컨트리맘 숙성 고구마맛 쿠키 12매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1803", "sku_code": "NPPIP-DEMO-1785978292", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1818", "category_id": "79", "name": "파스토재팬 야끼 호시이모 스틱 75g 구워 말린 일본 고구마 말랭이", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:34.140303", "deleted_at": null,
    images: [{"product_image_id": "1801", "url": "https://ik.imagekit.io/oishidam/products/b558c4ce-6316-49bb-872b-ced5c678211f_q2PcwY78V.webp", "alt_text": "파스토재팬 야끼 호시이모 스틱 75g 구워 말린 일본 고구마 말랭이", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1804", "sku_code": "NPPIP-DEMO-1784013641", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1819", "category_id": "87", "name": "카바야 염분 보충 타블렛 일본 사탕 레몬맛 81g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:35.229835", "deleted_at": null,
    images: [{"product_image_id": "1803", "url": "https://ik.imagekit.io/oishidam/products/0d3cc538-f407-4d7c-b1fb-91eecc9eee31_c4Nf_XKWj.webp", "alt_text": "카바야 염분 보충 타블렛 일본 사탕 레몬맛 81g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1805", "sku_code": "NPPIP-DEMO-1778634174", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1820", "category_id": "65", "name": "로손 홋카이도산 우유 사용 스즈 카스테라 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:35.386187", "deleted_at": null,
    images: [{"product_image_id": "1804", "url": "https://ik.imagekit.io/oishidam/products/2b089502-eb51-4246-846a-9046e9dbfeb2_Hn6wZrvkH.webp", "alt_text": "로손 홋카이도산 우유 사용 스즈 카스테라 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1806", "sku_code": "NPPIP-DEMO-177691269168", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1821", "category_id": "66", "name": "세븐일레븐 아몬드 볼 발효 버터 쿠키 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:35.760131", "deleted_at": null,
    images: [{"product_image_id": "1805", "url": "https://ik.imagekit.io/oishidam/products/b63e5e9f-f75d-4af0-8af8-537b5ddfc871_l2-au6-gl.webp", "alt_text": "세븐일레븐 아몬드 볼 발효 버터 쿠키 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1807", "sku_code": "NPPIP-DEMO-1750302075", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1822", "category_id": "82", "name": "네슬레 네스카페 골드블렌드 액상 포션 카라멜 마키아토 커피 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:36.093643", "deleted_at": null,
    images: [{"product_image_id": "1806", "url": "https://ik.imagekit.io/oishidam/products/993a0a7b-7526-4328-8a7c-9fc4ab25b080_f3qb7x-w-.webp", "alt_text": "네슬레 네스카페 골드블렌드 액상 포션 카라멜 마키아토 커피 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1808", "sku_code": "NPPIP-DEMO-1749793954", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1823", "category_id": "79", "name": "코이케야 PRIDE POTATO 가미노리 소금 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:37.138775", "deleted_at": null,
    images: [{"product_image_id": "1807", "url": "https://ik.imagekit.io/oishidam/products/95dde52b-ead1-4751-aa7b-787ea9befd76_Xc6ePDBj0.webp", "alt_text": "코이케야 PRIDE POTATO 가미노리 소금 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1809", "sku_code": "NPPIP-DEMO-1660286130", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1824", "category_id": "87", "name": "용각산 목캔디 깔끔한 녹차 허브맛 10g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:37.279655", "deleted_at": null,
    images: [{"product_image_id": "1808", "url": "https://ik.imagekit.io/oishidam/products/fec9cb7e-d9d0-4f40-aa99-4feeb90552f8_MFRPZCdtm.webp", "alt_text": "용각산 목캔디 깔끔한 녹차 허브맛 10g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1810", "sku_code": "NPPIP-DEMO-1614908985", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1825", "category_id": "88", "name": "부르봉 페투치네 구미 레드키위맛 젤리 47g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:37.700847", "deleted_at": null,
    images: [{"product_image_id": "1809", "url": "https://ik.imagekit.io/oishidam/products/c2613a92-b888-4f7a-a2f4-6feb309749c3_VkgO1MNE-.webp", "alt_text": "부르봉 페투치네 구미 레드키위맛 젤리 47g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1811", "sku_code": "NPPIP-DEMO-17905730565", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1826", "category_id": "88", "name": "오리히로 곤약젤리 프리미엄 카페 고구마 양갱 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:37.981864", "deleted_at": null,
    images: [{"product_image_id": "1810", "url": "https://ik.imagekit.io/oishidam/products/38d53fb3-1995-427c-9a62-59571585b18e_UV0DdlesY.webp", "alt_text": "오리히로 곤약젤리 프리미엄 카페 고구마 양갱 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1812", "sku_code": "NPPIP-DEMO-17882434618", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1827", "category_id": "79", "name": "가루비 포테이토팜 자가포쿠루 일본 과자 4종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:38.79253", "deleted_at": null,
    images: [{"product_image_id": "1811", "url": "https://ik.imagekit.io/oishidam/products/af28e24b-dfcd-48e2-bf3c-8456ea379a92_WDaym1buC.webp", "alt_text": "가루비 포테이토팜 자가포쿠루 일본 과자 4종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1813", "sku_code": "NPPIP-DEMO-1774598939", "variant_name": "기본", "option_values": {}, "price": 17000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1828", "category_id": "89", "name": "메이지 트윙클 일본 초콜릿 초코볼 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:38.95798", "deleted_at": null,
    images: [{"product_image_id": "1812", "url": "https://ik.imagekit.io/oishidam/products/a22900ac-68fa-46dc-b2b7-049cafaddd4a_uhcFRKaQq.webp", "alt_text": "메이지 트윙클 일본 초콜릿 초코볼 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1814", "sku_code": "NPPIP-DEMO-1773712537", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1829", "category_id": "89", "name": "모리나가 다스 초콜릿 프리미엄 방순딸기 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:39.349197", "deleted_at": null,
    images: [{"product_image_id": "1813", "url": "https://ik.imagekit.io/oishidam/products/7e050999-adc5-4597-bef5-c605a26287ae_MSuVhJ8vJO.webp", "alt_text": "모리나가 다스 초콜릿 프리미엄 방순딸기 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1815", "sku_code": "NPPIP-DEMO-1758094125", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1830", "category_id": "67", "name": "패밀리마트 입에서 녹는 캐러멜 콘스낵", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:39.890721", "deleted_at": null,
    images: [{"product_image_id": "1814", "url": "https://ik.imagekit.io/oishidam/products/695c1d02-3230-456b-a3dc-11860648cba4_9lARXjPgQ.webp", "alt_text": "패밀리마트 입에서 녹는 캐러멜 콘스낵", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1816", "sku_code": "NPPIP-DEMO-1623220097", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1831", "category_id": "88", "name": "크라시에 포핀쿠킨 가루쿡 오에가키 그림그리기 포핀쿠키", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:40.70474", "deleted_at": null,
    images: [{"product_image_id": "1815", "url": "https://ik.imagekit.io/oishidam/products/7b05fe05-0223-4a8b-ab29-56131224cd24_zwau0VlGe.webp", "alt_text": "크라시에 포핀쿠킨 가루쿡 오에가키 그림그리기 포핀쿠키", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1817", "sku_code": "NPPIP-DEMO-1618198105", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1832", "category_id": "79", "name": "카메다제과 카키노타네 더블 콘소메맛 6봉입", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1816", "url": "https://ik.imagekit.io/oishidam/products/c3cd7c75-3c6e-4930-8b6f-4968e25f3865_p7Adj-WLw.webp", "alt_text": "카메다제과 카키노타네 더블 콘소메맛 6봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1818", "sku_code": "NPPIP-DEMO-1785742322", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1833", "category_id": "79", "name": "부르봉 자가초코 그란데 미니 다크 초콜릿 비터맛 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:41.154645", "deleted_at": null,
    images: [{"product_image_id": "1817", "url": "https://ik.imagekit.io/oishidam/products/4fa2b7b9-2d6f-4f27-930d-b9903bfaf9ba_tNt5ukrGp.webp", "alt_text": "부르봉 자가초코 그란데 미니 다크 초콜릿 비터맛 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1819", "sku_code": "NPPIP-DEMO-1779852092", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1834", "category_id": "80", "name": "후지야 컨트리맘 초코마미레 더 월드 스위스편 화이트 초콜릿 9개입", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1818", "url": "https://ik.imagekit.io/oishidam/products/140b622b-c732-42b6-9505-38be24153c82_wI-hPfNaU.webp", "alt_text": "후지야 컨트리맘 초코마미레 더 월드 스위스편 화이트 초콜릿 9개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1820", "sku_code": "NPPIP-DEMO-1778719359", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1835", "category_id": "89", "name": "롯데 톳포 toppo 엄선한 말차맛 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:42.428582", "deleted_at": null,
    images: [{"product_image_id": "1819", "url": "https://ik.imagekit.io/oishidam/products/5c7e1dab-6220-4350-a63e-efeadc1c25d4_A1mTF6Io1.webp", "alt_text": "롯데 톳포 toppo 엄선한 말차맛 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1821", "sku_code": "NPPIP-DEMO-1771468262", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1836", "category_id": "67", "name": "패밀리마트 우유와 코코아의 미니 쿠키 120g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:42.863446", "deleted_at": null,
    images: [{"product_image_id": "1820", "url": "https://ik.imagekit.io/oishidam/products/650f61a1-095e-43cf-8141-76b8e1562167_aksgTgK2j.webp", "alt_text": "패밀리마트 우유와 코코아의 미니 쿠키 120g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1822", "sku_code": "NPPIP-DEMO-1770259352", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1837", "category_id": "75", "name": "일본교자 만두소스 미즈칸 교자 간장 타레 다래 150ml 2개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:42.925569", "deleted_at": null,
    images: [{"product_image_id": "1821", "url": "https://ik.imagekit.io/oishidam/products/06cd4727-d207-41f2-bbf1-b1c825a1f7ff_wEJMpGKfJ.webp", "alt_text": "일본교자 만두소스 미즈칸 교자 간장 타레 다래 150ml 2개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1823", "sku_code": "NPPIP-DEMO-1737689018", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1838", "category_id": "75", "name": "아지노모토 쿡두 향미 페이스트 중화요리 소스 120g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:43.712743", "deleted_at": null,
    images: [{"product_image_id": "1822", "url": "https://ik.imagekit.io/oishidam/products/c62104e6-d210-4787-b9c1-1fbf056f649d_Wj1lof7My.webp", "alt_text": "아지노모토 쿡두 향미 페이스트 중화요리 소스 120g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1824", "sku_code": "NPPIP-DEMO-1737439806", "variant_name": "기본", "option_values": {}, "price": 5950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1839", "category_id": "73", "name": "마루타이 쿠루메 농후 돈코츠 라멘 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:44.30279", "deleted_at": null,
    images: [{"product_image_id": "1823", "url": "https://ik.imagekit.io/oishidam/products/93f6af95-eda0-44c9-a516-1081f86dff64_f9yy6_Dio.webp", "alt_text": "마루타이 쿠루메 농후 돈코츠 라멘 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1825", "sku_code": "NPPIP-DEMO-1660286225", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1840", "category_id": "82", "name": "[AGF]블랜디® 포션 커피 무가당 6개입 6개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:44.805842", "deleted_at": null,
    images: [{"product_image_id": "1824", "url": "https://ik.imagekit.io/oishidam/products/f4a9d5d8-8057-4e14-ae4d-e0ed96e04d4a_0CM_7KY8j.webp", "alt_text": "[AGF]블랜디® 포션 커피 무가당 6개입 6개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1826", "sku_code": "NPPIP-DEMO-1618212122", "variant_name": "기본", "option_values": {}, "price": 19900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1841", "category_id": "80", "name": "후지야 컨트리맘 마이스타즈 초코 브라우니 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:44.836511", "deleted_at": null,
    images: [{"product_image_id": "1825", "url": "https://ik.imagekit.io/oishidam/products/7333d047-1ccd-43ad-bfd3-8c30b3eac2ef_NeyZqy52U.webp", "alt_text": "후지야 컨트리맘 마이스타즈 초코 브라우니 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1827", "sku_code": "NPPIP-DEMO-1785469212", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1842", "category_id": "79", "name": "닛신 시스코 크리스피 초코 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:45.840836", "deleted_at": null,
    images: [{"product_image_id": "1826", "url": "https://ik.imagekit.io/oishidam/products/b63f2e0c-512a-43bb-bdf2-a641343d4a50_fOwY8VfPwE.webp", "alt_text": "닛신 시스코 크리스피 초코 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1828", "sku_code": "NPPIP-DEMO-1784870849", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1843", "category_id": "80", "name": "후지야 컨트리맘 바닐라 코코아맛 쿠키 18매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:46.154329", "deleted_at": null,
    images: [{"product_image_id": "1827", "url": "https://ik.imagekit.io/oishidam/products/c4e03982-18c6-45f7-ab90-8e5b9291184f_mcD6ArIPd.webp", "alt_text": "후지야 컨트리맘 바닐라 코코아맛 쿠키 18매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1829", "sku_code": "NPPIP-DEMO-1782697891", "variant_name": "기본", "option_values": {}, "price": 4150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1844", "category_id": "93", "name": "니치후리 후리카케 마츠야 규동 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:46.674207", "deleted_at": null,
    images: [{"product_image_id": "1828", "url": "https://ik.imagekit.io/oishidam/products/78041fa2-3188-4671-b9c0-b9168ea6bc9a_ODcCq7dMV.webp", "alt_text": "니치후리 후리카케 마츠야 규동 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1830", "sku_code": "NPPIP-DEMO-178113996843", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1845", "category_id": "79", "name": "도쿄 야채 카린토 90g 일본 추억의 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:46.760369", "deleted_at": null,
    images: [{"product_image_id": "1829", "url": "https://ik.imagekit.io/oishidam/products/bf0b3d99-145c-4a71-84b7-3b525f128ce8__ALeKAAJ7V.webp", "alt_text": "도쿄 야채 카린토 90g 일본 추억의 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1831", "sku_code": "NPPIP-DEMO-1754555214", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1846", "category_id": "88", "name": "UHA미각당 시게킥쿠스 신맛의 포도 젤리 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:47.69762", "deleted_at": null,
    images: [{"product_image_id": "1830", "url": "https://ik.imagekit.io/oishidam/products/5b1ae84a-383a-45d2-88df-5949a812d0c3_NYNrP8nkx.webp", "alt_text": "UHA미각당 시게킥쿠스 신맛의 포도 젤리 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1832", "sku_code": "NPPIP-DEMO-1750304794", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1847", "category_id": "72", "name": "동양수산 고츠모리 소스 야끼소바 야키소바 171g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:48.101626", "deleted_at": null,
    images: [{"product_image_id": "1831", "url": "https://ik.imagekit.io/oishidam/products/d98dfd67-5fd9-4467-964e-844afc6f7e6d_ggYHu0p8nX.webp", "alt_text": "동양수산 고츠모리 소스 야끼소바 야키소바 171g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1833", "sku_code": "NPPIP-DEMO-1750136872", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1848", "category_id": "79", "name": "긴비스 아스파라거스 135g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:48.600086", "deleted_at": null,
    images: [{"product_image_id": "1833", "url": "https://ik.imagekit.io/oishidam/products/e19417cd-2310-4f4f-9b4d-bf5cee08641e_keyP3h8Pq.webp", "alt_text": "긴비스 아스파라거스 135g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1834", "sku_code": "NPPIP-DEMO-1745473869", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1849", "category_id": "90", "name": "모리나가 카라멜 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:48.428664", "deleted_at": null,
    images: [{"product_image_id": "1832", "url": "https://ik.imagekit.io/oishidam/products/bc8a4963-f010-4ec4-a7b6-935915a0025e_yrqgOVLU8.webp", "alt_text": "모리나가 카라멜 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1835", "sku_code": "NPPIP-DEMO-1656379134", "variant_name": "기본", "option_values": {}, "price": 1600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1850", "category_id": "83", "name": "이토엔 오이오차 프리미엄 우지 녹차 티백 20봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:49.379908", "deleted_at": null,
    images: [{"product_image_id": "1834", "url": "https://ik.imagekit.io/oishidam/products/ad883d82-4870-41b1-afd3-a858952b3869_rKPe4PROH.webp", "alt_text": "이토엔 오이오차 프리미엄 우지 녹차 티백 20봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1836", "sku_code": "NPPIP-DEMO-1635836988", "variant_name": "기본", "option_values": {}, "price": 6900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1851", "category_id": "89", "name": "메이지 아폴로 딸기 초콜릿 46g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:50.082088", "deleted_at": null,
    images: [{"product_image_id": "1835", "url": "https://ik.imagekit.io/oishidam/products/3562c591-9a4f-4ce2-a1de-8292be9b1ac1_2aXvELrEA.jpg", "alt_text": "메이지 아폴로 딸기 초콜릿 46g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1837", "sku_code": "NPPIP-DEMO-1624523445", "variant_name": "기본", "option_values": {}, "price": 2200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1852", "category_id": "88", "name": "크라시에 포핀쿠킨 가루쿡 네루네루네루네 소다맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:50.250885", "deleted_at": null,
    images: [{"product_image_id": "1836", "url": "https://ik.imagekit.io/oishidam/products/e7f8c618-27c9-468b-b85a-8309a35f1b6d_gOqBxo77Y.webp", "alt_text": "크라시에 포핀쿠킨 가루쿡 네루네루네루네 소다맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1838", "sku_code": "NPPIP-DEMO-1618197651", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1853", "category_id": "93", "name": "마루미야 소프트 후리카케 마늘 라유 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:50.531451", "deleted_at": null,
    images: [{"product_image_id": "1837", "url": "https://ik.imagekit.io/oishidam/products/f5785b34-fed6-486f-8c1e-fd18b9528c42_OC6Hcqpus.webp", "alt_text": "마루미야 소프트 후리카케 마늘 라유 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1839", "sku_code": "NPPIP-DEMO-178113995510", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1854", "category_id": "93", "name": "마루미야 마제코미 후리카케 와카메 타카나 29g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:51.182919", "deleted_at": null,
    images: [{"product_image_id": "1838", "url": "https://ik.imagekit.io/oishidam/products/f8fd2a7c-00f8-4975-97ce-60aa514752f4_R3aIYdegU.webp", "alt_text": "마루미야 마제코미 후리카케 와카메 타카나 29g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1840", "sku_code": "NPPIP-DEMO-17811399559", "variant_name": "기본", "option_values": {}, "price": 2150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1855", "category_id": "80", "name": "아사히 크림 현미 블랑 쿠키 에너지바 블루베리 4매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:51.944957", "deleted_at": null,
    images: [{"product_image_id": "1839", "url": "https://ik.imagekit.io/oishidam/products/d7e67e9c-3bee-4f42-a248-a28ccedf4864_J-RG5u8hf.webp", "alt_text": "아사히 크림 현미 블랑 쿠키 에너지바 블루베리 4매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1841", "sku_code": "NPPIP-DEMO-17798462023", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1856", "category_id": "66", "name": "세븐일레븐 쿠로마유 돈코츠 라멘 96g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:52.104254", "deleted_at": null,
    images: [{"product_image_id": "1840", "url": "https://ik.imagekit.io/oishidam/products/452d2cd9-79a8-4778-99dc-8ac6acdbc1fc_Od_uZw8Yh.webp", "alt_text": "세븐일레븐 쿠로마유 돈코츠 라멘 96g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1842", "sku_code": "NPPIP-DEMO-1777355168", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1857", "category_id": "79", "name": "메이지 타케노코노사토 죽순마을 니시오말차 61g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:52.412872", "deleted_at": null,
    images: [{"product_image_id": "1841", "url": "https://ik.imagekit.io/oishidam/products/b0697d83-d40d-40c0-bd83-1457787e3d4e_pfKBlBhAb.webp", "alt_text": "메이지 타케노코노사토 죽순마을 니시오말차 61g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1843", "sku_code": "NPPIP-DEMO-1776671358", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1858", "category_id": "88", "name": "페투치네 구미 이탈리안 레몬맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:52.929379", "deleted_at": null,
    images: [{"product_image_id": "1842", "url": "https://ik.imagekit.io/oishidam/products/b1cf7353-5b81-4fbc-99d9-023f0810510c_WpmEoe_7x.webp", "alt_text": "페투치네 구미 이탈리안 레몬맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1844", "sku_code": "NPPIP-DEMO-1770623548", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1859", "category_id": "67", "name": "패밀리마트 두껍게 썬 포테이토칩 진한 사워크림 양파맛 72g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:54.050128", "deleted_at": null,
    images: [{"product_image_id": "1843", "url": "https://ik.imagekit.io/oishidam/products/dc78094f-0242-4a85-a0a3-139b16b31a1b_eERxQfIDQ.webp", "alt_text": "패밀리마트 두껍게 썬 포테이토칩 진한 사워크림 양파맛 72g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1845", "sku_code": "NPPIP-DEMO-1749609466", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1860", "category_id": "87", "name": "메이지 레트로 사탕 타블렛 3종 (요구르트/레몬/콜라)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:54.045128", "deleted_at": null,
    images: [{"product_image_id": "1844", "url": "https://ik.imagekit.io/oishidam/products/95d1e9d6-d29f-4cfa-ba72-2f0a2511bf57_H4R6hrWnA.webp", "alt_text": "메이지 레트로 사탕 타블렛 3종 (요구르트/레몬/콜라)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1846", "sku_code": "NPPIP-DEMO-1748248463", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1861", "category_id": "79", "name": "이와츠카 니가타 누레 센베이 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:54.28149", "deleted_at": null,
    images: [{"product_image_id": "1845", "url": "https://ik.imagekit.io/oishidam/products/9f7c5042-b22b-4040-8670-4d97838c355a_HUtw0Ms1e.webp", "alt_text": "이와츠카 니가타 누레 센베이 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1847", "sku_code": "NPPIP-DEMO-1742794285", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1862", "category_id": "89", "name": "롯데 파이노미 파이의 열매 쉐어 팩 133g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:54.870546", "deleted_at": null,
    images: [{"product_image_id": "1846", "url": "https://ik.imagekit.io/oishidam/products/454340c9-6454-485e-9ff6-0c6fef54235e_7zltwIMQD.webp", "alt_text": "롯데 파이노미 파이의 열매 쉐어 팩 133g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1848", "sku_code": "NPPIP-DEMO-1625731861", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1863", "category_id": "88", "name": "반다이 치이카와 츠리구미 젤리 포도&소다맛 14g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:55.768044", "deleted_at": null,
    images: [{"product_image_id": "1847", "url": "https://ik.imagekit.io/oishidam/products/b5997ae7-8ee7-4c09-bdd6-48f7c6caa069_1CI36Ft9r.webp", "alt_text": "반다이 치이카와 츠리구미 젤리 포도&소다맛 14g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1849", "sku_code": "NPPIP-DEMO-1780299431", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1864", "category_id": "87", "name": "카바야 염분 보충 타블렛 일본 사탕 드링크맛 81g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:55.972034", "deleted_at": null,
    images: [{"product_image_id": "1848", "url": "https://ik.imagekit.io/oishidam/products/1307c289-4318-4548-ae65-03854c4946a6_oIWbiPZKJ.webp", "alt_text": "카바야 염분 보충 타블렛 일본 사탕 드링크맛 81g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1850", "sku_code": "NPPIP-DEMO-1778634117", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1865", "category_id": "65", "name": "로손 베니쇼가 홍생강 튀김 안주 25g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:56.000866", "deleted_at": null,
    images: [{"product_image_id": "1849", "url": "https://ik.imagekit.io/oishidam/products/ed652429-a1a4-4ab4-8dfa-ea6fb2450eb5_KfXW4kZkl.webp", "alt_text": "로손 베니쇼가 홍생강 튀김 안주 25g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1851", "sku_code": "NPPIP-DEMO-177691269485", "variant_name": "기본", "option_values": {}, "price": 5000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1866", "category_id": "87", "name": "사쿠마 드롭스 귀멸의 칼날 깡통 사탕 캔디 10개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:56.56376", "deleted_at": null,
    images: [{"product_image_id": "1850", "url": "https://ik.imagekit.io/oishidam/products/b1339db2-701b-4189-a96a-77b6d1b72122_EAEkBNLYC.webp", "alt_text": "사쿠마 드롭스 귀멸의 칼날 깡통 사탕 캔디 10개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1852", "sku_code": "NPPIP-DEMO-1739929844", "variant_name": "기본", "option_values": {}, "price": 29900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1867", "category_id": "72", "name": "닛신 컵누들 담백한 맛 시푸드 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:57.712953", "deleted_at": null,
    images: [{"product_image_id": "1852", "url": "https://ik.imagekit.io/oishidam/products/7dd3dea6-ade6-48b5-be83-f3c5d3884db8_KL9j3GGZ_.webp", "alt_text": "닛신 컵누들 담백한 맛 시푸드 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1853", "sku_code": "NPPIP-DEMO-1564047216", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1868", "category_id": "87", "name": "모리나가 라무네 캔디29g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:57.606265", "deleted_at": null,
    images: [{"product_image_id": "1851", "url": "https://ik.imagekit.io/oishidam/products/0974c83f-116e-4afa-904b-677fde5964ba_n-LUc0H4u.webp", "alt_text": "모리나가 라무네 캔디29g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1854", "sku_code": "NPPIP-DEMO-1645519986", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1869", "category_id": "79", "name": "가루비 자가리코 명란버터맛 52g (11+1) 12개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:57.93575", "deleted_at": null,
    images: [{"product_image_id": "1853", "url": "https://ik.imagekit.io/oishidam/products/385a0814-d1c6-44a1-b7b4-515b1917e5bf_uw6Il9Ta9.webp", "alt_text": "가루비 자가리코 명란버터맛 52g (11+1) 12개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1855", "sku_code": "NPPIP-DEMO-1616740725", "variant_name": "기본", "option_values": {}, "price": 23500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1870", "category_id": "79", "name": "글리코 CRATZ 크래츠 프레첼 블랙페퍼 치킨맛 42g 맥주 안주 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:58.303619", "deleted_at": null,
    images: [{"product_image_id": "1854", "url": "https://ik.imagekit.io/oishidam/products/9b25fe00-10fa-4247-9e11-a60759ca9c0e_OFoHCbRoxj.webp", "alt_text": "글리코 CRATZ 크래츠 프레첼 블랙페퍼 치킨맛 42g 맥주 안주 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1856", "sku_code": "NPPIP-DEMO-17815082324", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1871", "category_id": "65", "name": "로손 바삭바삭 크레페 딸기맛 과자 16봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:59.239301", "deleted_at": null,
    images: [{"product_image_id": "1855", "url": "https://ik.imagekit.io/oishidam/products/5b6918ed-6d94-4fc7-84e5-6d4392890d44_rMo0K2QHh.webp", "alt_text": "로손 바삭바삭 크레페 딸기맛 과자 16봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1857", "sku_code": "NPPIP-DEMO-177691269163", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1872", "category_id": "84", "name": "마루와유지 데키시 크림 브륄레 스프레드 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:59.629384", "deleted_at": null,
    images: [{"product_image_id": "1856", "url": "https://ik.imagekit.io/oishidam/products/c720ae69-5437-4013-b7e0-ae74f1f35d9f_Fr7ivMTYr.webp", "alt_text": "마루와유지 데키시 크림 브륄레 스프레드 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1858", "sku_code": "NPPIP-DEMO-1775193809", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1873", "category_id": "89", "name": "퓨아레 말차 티라미수 아몬드 초콜릿 대용량 405g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:14:59.799785", "deleted_at": null,
    images: [{"product_image_id": "1857", "url": "https://ik.imagekit.io/oishidam/products/4adbf05b-531e-4ddd-8f9d-8683c4108e49_YH6Rn-JgR.webp", "alt_text": "퓨아레 말차 티라미수 아몬드 초콜릿 대용량 405g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1859", "sku_code": "NPPIP-DEMO-17727762324", "variant_name": "기본", "option_values": {}, "price": 27000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1874", "category_id": "67", "name": "패밀리마트 유기농 톈진 맛밤 대용량 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:00.311734", "deleted_at": null,
    images: [{"product_image_id": "1858", "url": "https://ik.imagekit.io/oishidam/products/d1ef673a-60f7-4ced-8a14-e309e8489448_9pKFU6FPc.webp", "alt_text": "패밀리마트 유기농 톈진 맛밤 대용량 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1860", "sku_code": "NPPIP-DEMO-1770279171", "variant_name": "기본", "option_values": {}, "price": 6800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1875", "category_id": "75", "name": "큐피 섞어먹는 파스타소스 2봉입 6종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:01.2614", "deleted_at": null,
    images: [{"product_image_id": "1859", "url": "https://ik.imagekit.io/oishidam/products/5878baa6-00fd-46c5-872d-e9741e1b430f_7bQevHWRe.webp", "alt_text": "큐피 섞어먹는 파스타소스 2봉입 6종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1861", "sku_code": "NPPIP-DEMO-1744876186", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1876", "category_id": "94", "name": "글리코 치킨라이스 볶음밥 양념 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:01.605333", "deleted_at": null,
    images: [{"product_image_id": "1861", "url": "https://ik.imagekit.io/oishidam/products/013df145-137e-4d6f-8cf4-6341b1537110_mO_RjcW4A.webp", "alt_text": "글리코 치킨라이스 볶음밥 양념 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1862", "sku_code": "NPPIP-DEMO-1721102050", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1877", "category_id": "83", "name": "이토엔 오이오차 프리미엄 현미차 티백 20봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:01.589715", "deleted_at": null,
    images: [{"product_image_id": "1860", "url": "https://ik.imagekit.io/oishidam/products/a79a163c-51ab-422a-ae72-7b22d086c13d_oB8IeAj5B.webp", "alt_text": "이토엔 오이오차 프리미엄 현미차 티백 20봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1863", "sku_code": "NPPIP-DEMO-1635837063", "variant_name": "기본", "option_values": {}, "price": 6900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1878", "category_id": "80", "name": "[ISHIYA]시로이코이비토 화이트 9개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:03.495515", "deleted_at": null,
    images: [{"product_image_id": "1864", "url": "https://ik.imagekit.io/oishidam/products/dc017e2f-8055-4300-947b-a989c31c72e9_2k5U7_fbu.png", "alt_text": "[ISHIYA]시로이코이비토 화이트 9개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1864", "sku_code": "NPPIP-DEMO-1626329796", "variant_name": "기본", "option_values": {}, "price": 14000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1879", "category_id": "79", "name": "가루비 자가리코 제노베제 피자맛 L사이즈 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:03.214038", "deleted_at": null,
    images: [{"product_image_id": "1862", "url": "https://ik.imagekit.io/oishidam/products/58f7ad4d-100f-424e-94b3-5ee5e84709ef_J_49oDj57.webp", "alt_text": "가루비 자가리코 제노베제 피자맛 L사이즈 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1865", "sku_code": "NPPIP-DEMO-1784092844", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1880", "category_id": "87", "name": "기간 한정 아사히 민티아 마루데 방순 복숭아", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:03.391051", "deleted_at": null,
    images: [{"product_image_id": "1863", "url": "https://ik.imagekit.io/oishidam/products/a45d66fe-f900-41dc-ade8-e485002a6b1c_lBbg8WRDC.webp", "alt_text": "기간 한정 아사히 민티아 마루데 방순 복숭아", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1866", "sku_code": "NPPIP-DEMO-178236568514", "variant_name": "기본", "option_values": {}, "price": 2300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1881", "category_id": "83", "name": "AGF 블렌디 마이보틀스틱 쟈스민티 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:03.538584", "deleted_at": null,
    images: [{"product_image_id": "1865", "url": "https://ik.imagekit.io/oishidam/products/7bf8315d-c37d-4db4-aef5-d224e6a6dc14_h-cr25--Z.webp", "alt_text": "AGF 블렌디 마이보틀스틱 쟈스민티 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1867", "sku_code": "NPPIP-DEMO-17815710066", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1882", "category_id": "88", "name": "오리히로 곤약젤리 포도 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:04.902766", "deleted_at": null,
    images: [{"product_image_id": "1866", "url": "https://ik.imagekit.io/oishidam/products/9f2d41e2-57ec-4466-80c8-537fa09985b1_zD7wyEPuf.webp", "alt_text": "오리히로 곤약젤리 포도 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1868", "sku_code": "NPPIP-DEMO-17739058436", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1883", "category_id": "66", "name": "세븐일레븐 우라 구미마루 샤리푸니 샤인머스캣맛 젤리 31g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:05.046926", "deleted_at": null,
    images: [{"product_image_id": "1867", "url": "https://ik.imagekit.io/oishidam/products/ef6713d4-f3de-4ec4-808d-9de8f8de670c_SzR9YCVBc.webp", "alt_text": "세븐일레븐 우라 구미마루 샤리푸니 샤인머스캣맛 젤리 31g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1869", "sku_code": "NPPIP-DEMO-177329835842", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1884", "category_id": "75", "name": "S&B 에스비 에비시오큐리 시즈닝 새우소금 오이무침 양념 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:05.367832", "deleted_at": null,
    images: [{"product_image_id": "1868", "url": "https://ik.imagekit.io/oishidam/products/eb644760-eb24-4eaa-b4b4-13847025be05__yA_wvtMz6.webp", "alt_text": "S&B 에스비 에비시오큐리 시즈닝 새우소금 오이무침 양념 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1870", "sku_code": "NPPIP-DEMO-1743991726", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1885", "category_id": "70", "name": "히가시마루 간편 죽 만들기 3종 (닭/게살/연어)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:05.482087", "deleted_at": null,
    images: [{"product_image_id": "1869", "url": "https://ik.imagekit.io/oishidam/products/dff951a5-d6cb-4a6b-a759-6745ab281247_H2y3ji06d1.webp", "alt_text": "히가시마루 간편 죽 만들기 3종 (닭/게살/연어)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1871", "sku_code": "NPPIP-DEMO-1743490077", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1886", "category_id": "79", "name": "가루비  자가비 Jagabee 버터 간장 맛 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:06.602811", "deleted_at": null,
    images: [{"product_image_id": "1870", "url": "https://ik.imagekit.io/oishidam/products/cca7656d-fb1e-4ea9-ba58-5356b37b90b0_Jdij0dHXX.webp", "alt_text": "가루비  자가비 Jagabee 버터 간장 맛 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1872", "sku_code": "NPPIP-DEMO-1660286160", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1887", "category_id": "80", "name": "[ISHIYA]시로이코이비토 화이트 18개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:07.55273", "deleted_at": null,
    images: [{"product_image_id": "1873", "url": "https://ik.imagekit.io/oishidam/products/5f1242f4-6e63-463a-be7f-1c8c4eca4afb_F4F7GL2ul.png", "alt_text": "[ISHIYA]시로이코이비토 화이트 18개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1873", "sku_code": "NPPIP-DEMO-1618191991", "variant_name": "기본", "option_values": {}, "price": 23000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1888", "category_id": "94", "name": "이치란 특제 비밀 고추가루 14g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:07.0871", "deleted_at": null,
    images: [{"product_image_id": "1871", "url": "https://ik.imagekit.io/oishidam/products/b2a9d8ff-15ba-4ca2-82d9-e9e7ef227149_zCu8s_3648.webp", "alt_text": "이치란 특제 비밀 고추가루 14g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1874", "sku_code": "NPPIP-DEMO-1767678917", "variant_name": "기본", "option_values": {}, "price": 12500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1889", "category_id": "79", "name": "가루비 자가리코 감자버터맛 55g (11+1) 12개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:07.425194", "deleted_at": null,
    images: [{"product_image_id": "1872", "url": "https://ik.imagekit.io/oishidam/products/93c87f5b-0c10-41af-84e7-e1b72119695e_qMkNx1eXU.webp", "alt_text": "가루비 자가리코 감자버터맛 55g (11+1) 12개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1875", "sku_code": "NPPIP-DEMO-1616740732", "variant_name": "기본", "option_values": {}, "price": 23500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1890", "category_id": "93", "name": "미시마 코코이찌방야 카레 후리카케 23g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:08.209107", "deleted_at": null,
    images: [{"product_image_id": "1874", "url": "https://ik.imagekit.io/oishidam/products/a26aed23-568a-42fd-966b-926bdbbed05e_yxl_1oQCx.webp", "alt_text": "미시마 코코이찌방야 카레 후리카케 23g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1876", "sku_code": "NPPIP-DEMO-178113998159", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1891", "category_id": "67", "name": "패밀리마트 포테토칩 고쿠우마포테토 소금맛 감자 과자 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:09.027811", "deleted_at": null,
    images: [{"product_image_id": "1875", "url": "https://ik.imagekit.io/oishidam/products/bdcf0d72-d819-4c82-ba76-e9ba0572eaa6_lmxThk_fr.webp", "alt_text": "패밀리마트 포테토칩 고쿠우마포테토 소금맛 감자 과자 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1877", "sku_code": "NPPIP-DEMO-1770255806", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1892", "category_id": "82", "name": "일본 도토루 인스턴트 스틱 커피 카페오레 24개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:09.509952", "deleted_at": null,
    images: [{"product_image_id": "1876", "url": "https://ik.imagekit.io/oishidam/products/61a59666-9005-4d86-8abb-0dae06d96338_NmRYhy1ac.webp", "alt_text": "일본 도토루 인스턴트 스틱 커피 카페오레 24개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1878", "sku_code": "NPPIP-DEMO-1754640245", "variant_name": "기본", "option_values": {}, "price": 9000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1893", "category_id": "67", "name": "패밀리마트 콘비니 라인 삭스", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:09.865531", "deleted_at": null,
    images: [{"product_image_id": "1877", "url": "https://ik.imagekit.io/oishidam/products/32f124f7-880c-4fb3-8853-63d706516780_X9et5FYxQ.webp", "alt_text": "패밀리마트 콘비니 라인 삭스", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1879", "sku_code": "NPPIP-DEMO-1749516409", "variant_name": "기본", "option_values": {}, "price": 7000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1894", "category_id": "69", "name": "마루미야 마파가지 양념 3~4인분 2종 (진한미소/깔끔한미소)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:10.330602", "deleted_at": null,
    images: [{"product_image_id": "1878", "url": "https://ik.imagekit.io/oishidam/products/28b01bfa-718f-4a0c-9fb4-84cbbfa66dea_3CM2t__m1.webp", "alt_text": "마루미야 마파가지 양념 3~4인분 2종 (진한미소/깔끔한미소)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1880", "sku_code": "NPPIP-DEMO-1744617699", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1895", "category_id": "73", "name": "마루타이 하카타 돈코츠 라멘 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:10.873714", "deleted_at": null,
    images: [{"product_image_id": "1879", "url": "https://ik.imagekit.io/oishidam/products/f6e2b761-62a8-4f1e-b225-ae0f91eb0e8c_86z-5qGy-.webp", "alt_text": "마루타이 하카타 돈코츠 라멘 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1881", "sku_code": "NPPIP-DEMO-1660286222", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1896", "category_id": "93", "name": "마루미야 후리카케 감칠맛 연어 대용량 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:11.344252", "deleted_at": null,
    images: [{"product_image_id": "1880", "url": "https://ik.imagekit.io/oishidam/products/46698c09-f653-40a1-b22a-80c8d4fc2127_9QWXnwWq_.webp", "alt_text": "마루미야 후리카케 감칠맛 연어 대용량 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1882", "sku_code": "NPPIP-DEMO-178113996124", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1897", "category_id": "88", "name": "오리히로 곤약젤리 기간한정 소금 매실+레몬 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:11.532039", "deleted_at": null,
    images: [{"product_image_id": "1881", "url": "https://ik.imagekit.io/oishidam/products/2c35fdfa-6721-4b40-a5de-1feff8105261_JpwbLFGRE.webp", "alt_text": "오리히로 곤약젤리 기간한정 소금 매실+레몬 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1883", "sku_code": "NPPIP-DEMO-1775626324", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1898", "category_id": "66", "name": "세븐일레븐 오코메칩스 김맛 쌀과자 29g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:12.013173", "deleted_at": null,
    images: [{"product_image_id": "1882", "url": "https://ik.imagekit.io/oishidam/products/4f1aa0d6-4fc2-47f7-924c-6923112c301b_8v-D0Ev03.webp", "alt_text": "세븐일레븐 오코메칩스 김맛 쌀과자 29g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1884", "sku_code": "NPPIP-DEMO-177329835018", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1899", "category_id": "67", "name": "패밀리마트 새우 보름달 센베이 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:12.803073", "deleted_at": null,
    images: [{"product_image_id": "1883", "url": "https://ik.imagekit.io/oishidam/products/ff1ee278-835a-4473-bbf0-27e3221304a7_0XJdgA63G.webp", "alt_text": "패밀리마트 새우 보름달 센베이 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1885", "sku_code": "NPPIP-DEMO-1770251560", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1900", "category_id": "88", "name": "노벨 구미에그 달걀모양 과일 소다맛 젤리 구미 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:13.305637", "deleted_at": null,
    images: [{"product_image_id": "1884", "url": "https://ik.imagekit.io/oishidam/products/9be1dad2-e5dd-4293-b632-58e357855060_y7HfmcX--.webp", "alt_text": "노벨 구미에그 달걀모양 과일 소다맛 젤리 구미 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1886", "sku_code": "NPPIP-DEMO-1740449949", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1901", "category_id": "89", "name": "글리코 빼빼로 겨울의 키라메키 포키 소금 캬라멜맛 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:13.488052", "deleted_at": null,
    images: [{"product_image_id": "1885", "url": "https://ik.imagekit.io/oishidam/products/070f4c3b-011d-4c68-b4fb-093edb7ae993_OCDLdsOPV.webp", "alt_text": "글리코 빼빼로 겨울의 키라메키 포키 소금 캬라멜맛 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1887", "sku_code": "NPPIP-DEMO-1791266921", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1902", "category_id": "88", "name": "메이지 과즙구미 서양배맛 젤리 47g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:13.905275", "deleted_at": null,
    images: [{"product_image_id": "1886", "url": "https://ik.imagekit.io/oishidam/products/8b8bdc70-af3a-4f28-a201-a15f0054fd6a_QrA8_OAms.webp", "alt_text": "메이지 과즙구미 서양배맛 젤리 47g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1888", "sku_code": "NPPIP-DEMO-1787018949", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1903", "category_id": "80", "name": "닛신 시스코 코코넛 사브레 메론빵맛 16개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:14.671909", "deleted_at": null,
    images: [{"product_image_id": "1887", "url": "https://ik.imagekit.io/oishidam/products/7a310435-7a25-4b3f-8c04-e01eb5fee3c5_3pnmyOCAd.webp", "alt_text": "닛신 시스코 코코넛 사브레 메론빵맛 16개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1889", "sku_code": "NPPIP-DEMO-1783567228", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1904", "category_id": "89", "name": "롯데 파이노미 파이의 열매 딥 쇼콜라맛 69g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:15.27019", "deleted_at": null,
    images: [{"product_image_id": "1888", "url": "https://ik.imagekit.io/oishidam/products/8e3b2381-1196-4f02-9718-80a9d7d59d69_Y7n9sF-MG4.webp", "alt_text": "롯데 파이노미 파이의 열매 딥 쇼콜라맛 69g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1890", "sku_code": "NPPIP-DEMO-1782115075", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1905", "category_id": "93", "name": "마루미야 후리카케 노리타마 대용량 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:15.473342", "deleted_at": null,
    images: [{"product_image_id": "1889", "url": "https://ik.imagekit.io/oishidam/products/5fe45b91-7ca1-4e4c-a43c-44c7c319c31d_R2-rzxOwT.webp", "alt_text": "마루미야 후리카케 노리타마 대용량 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1891", "sku_code": "NPPIP-DEMO-178113996226", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1906", "category_id": "69", "name": "하우스 식품 프로퀄리티 일본 카레 170g 4봉입 중간매운맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:16.067167", "deleted_at": null,
    images: [{"product_image_id": "1890", "url": "https://ik.imagekit.io/oishidam/products/5faa6459-e421-4f8f-87d1-71baee158f4f_PKcr1Y5p4.webp", "alt_text": "하우스 식품 프로퀄리티 일본 카레 170g 4봉입 중간매운맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1892", "sku_code": "NPPIP-DEMO-1777335414", "variant_name": "기본", "option_values": {}, "price": 11000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1907", "category_id": "80", "name": "후루타 스티커 쿠키 사카모토 데이즈", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:16.564139", "deleted_at": null,
    images: [{"product_image_id": "1891", "url": "https://ik.imagekit.io/oishidam/products/5d59015f-8752-44dd-9aa6-c6777c29ba25_jKlxohfObg.webp", "alt_text": "후루타 스티커 쿠키 사카모토 데이즈", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1893", "sku_code": "NPPIP-DEMO-1776225525", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1908", "category_id": "70", "name": "미스즈 코우야 일본식 건두부 160g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:17.159689", "deleted_at": null,
    images: [{"product_image_id": "1892", "url": "https://ik.imagekit.io/oishidam/products/06bc8f08-b152-4620-b3dc-30a891ce537c_k-oHpOG16.webp", "alt_text": "미스즈 코우야 일본식 건두부 160g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1894", "sku_code": "NPPIP-DEMO-1772178600", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1909", "category_id": "67", "name": "패밀리마트 우유의 감칠맛이 퍼지는 미니 초콜릿 81g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:17.3744", "deleted_at": null,
    images: [{"product_image_id": "1893", "url": "https://ik.imagekit.io/oishidam/products/e8f8805a-3777-44e4-b3dc-f672362ef6dc_DDDEG_LQn.webp", "alt_text": "패밀리마트 우유의 감칠맛이 퍼지는 미니 초콜릿 81g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1895", "sku_code": "NPPIP-DEMO-1770789171", "variant_name": "기본", "option_values": {}, "price": 4850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1910", "category_id": "67", "name": "패밀리마트 중독되는 매운맛의 마라맛 땅콩 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:18.166732", "deleted_at": null,
    images: [{"product_image_id": "1894", "url": "https://ik.imagekit.io/oishidam/products/a68d1680-ac1f-4323-bf62-265a9c032c2e_hIBqsQZvJ.webp", "alt_text": "패밀리마트 중독되는 매운맛의 마라맛 땅콩 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1896", "sku_code": "NPPIP-DEMO-1770188311", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1911", "category_id": "79", "name": "코이케야 포린키 일본과자 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:18.622435", "deleted_at": null,
    images: [{"product_image_id": "1895", "url": "https://ik.imagekit.io/oishidam/products/87b31638-293a-4e4f-8f3d-83a17183a4c5_pQuVpfHvZ.webp", "alt_text": "코이케야 포린키 일본과자 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1897", "sku_code": "NPPIP-DEMO-1742282917", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1912", "category_id": "82", "name": "UCC 장인의 커피 블렌드 드립커피 모음전", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:18.872176", "deleted_at": null,
    images: [{"product_image_id": "1896", "url": "https://ik.imagekit.io/oishidam/products/e8094788-6b89-4570-8fcd-038b56cebc5c_IMfjU4mj2.webp", "alt_text": "UCC 장인의 커피 블렌드 드립커피 모음전", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1898", "sku_code": "NPPIP-DEMO-1736827061", "variant_name": "기본", "option_values": {}, "price": 8900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1913", "category_id": "69", "name": "S&B 스파이시 매운 카레 파우더 분말 대용량 400g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:19.043468", "deleted_at": null,
    images: [{"product_image_id": "1897", "url": "https://ik.imagekit.io/oishidam/products/dbf86b5d-4e4f-45f1-8404-828a90a896b9_2vGwkOvMr.webp", "alt_text": "S&B 스파이시 매운 카레 파우더 분말 대용량 400g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1899", "sku_code": "NPPIP-DEMO-1736240087", "variant_name": "기본", "option_values": {}, "price": 19500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1914", "category_id": "69", "name": "클레어 할머니 스튜 2종 (크림/비프)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:20.062783", "deleted_at": null,
    images: [{"product_image_id": "1898", "url": "https://ik.imagekit.io/oishidam/products/b73cae2d-f38c-4616-940f-4b919cd3ca27_qjBBIiLNT.webp", "alt_text": "클레어 할머니 스튜 2종 (크림/비프)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1900", "sku_code": "NPPIP-DEMO-1656062553", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1915", "category_id": "81", "name": "[AGF]블랜디®스틱 녹차오레 6입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:20.5005", "deleted_at": null,
    images: [{"product_image_id": "1899", "url": "https://ik.imagekit.io/oishidam/products/fbdda757-91b9-414b-bd86-81227375cb9f_gdS9j39kR.webp", "alt_text": "[AGF]블랜디®스틱 녹차오레 6입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1901", "sku_code": "NPPIP-DEMO-1617852122", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1916", "category_id": "80", "name": "부르봉 마론브란 몽블랑맛 미니 케이크 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:20.748037", "deleted_at": null,
    images: [{"product_image_id": "1901", "url": "https://ik.imagekit.io/oishidam/products/b5ce0c52-5051-48e9-9d6d-dc7c3a0dca51_RUMS6bJtU.webp", "alt_text": "부르봉 마론브란 몽블랑맛 미니 케이크 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1902", "sku_code": "NPPIP-DEMO-17859829383", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1917", "category_id": "83", "name": "무인양품 물에 잘 녹는 마이보틀 스틱 복숭아 그린티 파우더 10개입", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1900", "url": "https://ik.imagekit.io/oishidam/products/155512e2-525a-4cf5-841d-992f7a7cd2a9_ZJsZ6mLND.webp", "alt_text": "무인양품 물에 잘 녹는 마이보틀 스틱 복숭아 그린티 파우더 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1903", "sku_code": "NPPIP-DEMO-17858939627", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1918", "category_id": "87", "name": "아사히 시오레몬 소금레몬 캔디 사탕 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:21.939943", "deleted_at": null,
    images: [{"product_image_id": "1902", "url": "https://ik.imagekit.io/oishidam/products/00926939-e2b5-413f-831d-f1ea5a41a125_p92Qi1IPZ.webp", "alt_text": "아사히 시오레몬 소금레몬 캔디 사탕 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1904", "sku_code": "NPPIP-DEMO-1782787994", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1919", "category_id": "87", "name": "아사히 민티아 브리즈 울트라블랙", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:22.157593", "deleted_at": null,
    images: [{"product_image_id": "1903", "url": "https://ik.imagekit.io/oishidam/products/e8c5bb70-a7ac-483e-b975-cad5a3b2ceb4_dbXrmfb7l.webp", "alt_text": "아사히 민티아 브리즈 울트라블랙", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1905", "sku_code": "NPPIP-DEMO-178236568616", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1920", "category_id": "93", "name": "마루미야 후리카케 다마고치 캐릭터 미니팩 20개입 스티커 포함", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:22.467737", "deleted_at": null,
    images: [{"product_image_id": "1905", "url": "https://ik.imagekit.io/oishidam/products/f626cf73-92ea-4f01-9a22-525ed4534581_QErwbEVL7i.webp", "alt_text": "마루미야 후리카케 다마고치 캐릭터 미니팩 20개입 스티커 포함", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1906", "sku_code": "NPPIP-DEMO-178113996227", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1921", "category_id": "65", "name": "로손 홋카이도산 옥수수 파우더 사용 콘포타주 센 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:22.33227", "deleted_at": null,
    images: [{"product_image_id": "1904", "url": "https://ik.imagekit.io/oishidam/products/b52498cd-4331-4477-a466-1de0a3673a51_LptI4sYH8.webp", "alt_text": "로손 홋카이도산 옥수수 파우더 사용 콘포타주 센 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1907", "sku_code": "NPPIP-DEMO-177691268843", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1922", "category_id": "65", "name": "로손 게키카라 폭군 하바네로 매운맛 과자 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:23.585107", "deleted_at": null,
    images: [{"product_image_id": "1906", "url": "https://ik.imagekit.io/oishidam/products/d62d0dea-1882-431a-858f-4857c44625db_UFVKNd2la.webp", "alt_text": "로손 게키카라 폭군 하바네로 매운맛 과자 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1908", "sku_code": "NPPIP-DEMO-177691268524", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1923", "category_id": "72", "name": "닛신 라오 라왕 토로마로 시오 라멘 시오돈코츠맛 112g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:24.065864", "deleted_at": null,
    images: [{"product_image_id": "1907", "url": "https://ik.imagekit.io/oishidam/products/52d8b19d-9044-4cfa-9dcc-aac44186e65a_coARUjn9w.webp", "alt_text": "닛신 라오 라왕 토로마로 시오 라멘 시오돈코츠맛 112g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1909", "sku_code": "NPPIP-DEMO-1774849918", "variant_name": "기본", "option_values": {}, "price": 4550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1924", "category_id": "67", "name": "패밀리마트 3가지맛 센베이 믹스 120g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:24.236022", "deleted_at": null,
    images: [{"product_image_id": "1909", "url": "https://ik.imagekit.io/oishidam/products/c2019d38-b2a6-4494-9bb9-fe46ff637c3c_t_F4sPlFl.webp", "alt_text": "패밀리마트 3가지맛 센베이 믹스 120g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1910", "sku_code": "NPPIP-DEMO-1770253367", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1925", "category_id": "88", "name": "카바야 샤리 in 구미 젤리 52g 소다맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:24.173865", "deleted_at": null,
    images: [{"product_image_id": "1908", "url": "https://ik.imagekit.io/oishidam/products/f6589808-d040-4ac6-b646-7adf4015f631_JIrxJug8G.webp", "alt_text": "카바야 샤리 in 구미 젤리 52g 소다맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1911", "sku_code": "NPPIP-DEMO-1747900142", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1926", "category_id": "84", "name": "아오하타 베르데 딸기잼 버터 크림 4개입 휴대용 토스트 스프레드", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:25.282037", "deleted_at": null,
    images: [{"product_image_id": "1910", "url": "https://ik.imagekit.io/oishidam/products/0327024b-cc92-4da7-a86d-ab11d85460da_5uZ1yOLGW.webp", "alt_text": "아오하타 베르데 딸기잼 버터 크림 4개입 휴대용 토스트 스프레드", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1912", "sku_code": "NPPIP-DEMO-1737335825", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1927", "category_id": "88", "name": "오리히로 푸룬토 곤약젤리 스탠딩 칼로리 제로 거봉 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:25.938741", "deleted_at": null,
    images: [{"product_image_id": "1912", "url": "https://ik.imagekit.io/oishidam/products/15556d06-074a-4fff-9ff3-e4148ba938b5_Mv2RhPhfG.webp", "alt_text": "오리히로 푸룬토 곤약젤리 스탠딩 칼로리 제로 거봉 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1913", "sku_code": "NPPIP-DEMO-1612950724", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1928", "category_id": "88", "name": "오리히로 푸룬토 곤약젤리 스탠딩 포도 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:25.860355", "deleted_at": null,
    images: [{"product_image_id": "1911", "url": "https://ik.imagekit.io/oishidam/products/6eeceb4c-b98f-46d1-85cc-d1f0231f0479_ij-0NN-Dh.webp", "alt_text": "오리히로 푸룬토 곤약젤리 스탠딩 포도 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1914", "sku_code": "NPPIP-DEMO-1612950022", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1929", "category_id": "87", "name": "아사히 민티아 브리즈 리프레쉬 블루 5개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:26.201599", "deleted_at": null,
    images: [{"product_image_id": "1913", "url": "https://ik.imagekit.io/oishidam/products/7324c5da-d54c-4afc-8733-4d4502eaf31f_2l6zSit7v.webp", "alt_text": "아사히 민티아 브리즈 리프레쉬 블루 5개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1915", "sku_code": "NPPIP-DEMO-1616640884", "variant_name": "기본", "option_values": {}, "price": 14000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1930", "category_id": "87", "name": "아사히 민티아 칼피스", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:27.123523", "deleted_at": null,
    images: [{"product_image_id": "1914", "url": "https://ik.imagekit.io/oishidam/products/13efdff6-0797-4458-ae5c-e22256b040f2_GcbpMD_ZX.webp", "alt_text": "아사히 민티아 칼피스", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1916", "sku_code": "NPPIP-DEMO-17823656827", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1931", "category_id": "72", "name": "닛신 데카우마 야끼소바 더블 W마요 소스 153g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:27.751018", "deleted_at": null,
    images: [{"product_image_id": "1916", "url": "https://ik.imagekit.io/oishidam/products/c8519241-18ea-43b1-9726-361ab5ba2492_a965ySGkv.webp", "alt_text": "닛신 데카우마 야끼소바 더블 W마요 소스 153g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1917", "sku_code": "NPPIP-DEMO-1778825208", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1932", "category_id": "66", "name": "세븐일레븐 바삭한 농후 에비아게센 새우맛 얇은 센베이 33g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:27.648959", "deleted_at": null,
    images: [{"product_image_id": "1915", "url": "https://ik.imagekit.io/oishidam/products/b6dd9a6f-35ff-4ca3-a9a6-7f7b15f0e5b5_GbKcFitpMT.webp", "alt_text": "세븐일레븐 바삭한 농후 에비아게센 새우맛 얇은 센베이 33g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1918", "sku_code": "NPPIP-DEMO-177329835224", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1933", "category_id": "79", "name": "컨트리멈 호화초코 12개", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:28.11307", "deleted_at": null,
    images: [{"product_image_id": "1917", "url": "https://ik.imagekit.io/oishidam/products/c1898539-242a-4d59-9f07-5e7ba3cef0ef_78xvLgs-Q.webp", "alt_text": "컨트리멈 호화초코 12개", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1919", "sku_code": "NPPIP-DEMO-1660286114", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1934", "category_id": "65", "name": "로손 구운 오징어 게소 매콤한맛 14g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:29.143311", "deleted_at": null,
    images: [{"product_image_id": "1918", "url": "https://ik.imagekit.io/oishidam/products/579ce0f4-1d9b-46ad-a7db-7b152d831f7f_o-Y2tD5G5.webp", "alt_text": "로손 구운 오징어 게소 매콤한맛 14g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1920", "sku_code": "NPPIP-DEMO-1619751470", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1935", "category_id": "88", "name": "오리히로 푸룬토 곤약젤리 스탠딩 복숭아 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:29.594526", "deleted_at": null,
    images: [{"product_image_id": "1920", "url": "https://ik.imagekit.io/oishidam/products/76c7a91b-049a-4961-af1e-8594bee686f1_wNNfi74Bn.webp", "alt_text": "오리히로 푸룬토 곤약젤리 스탠딩 복숭아 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1921", "sku_code": "NPPIP-DEMO-1612950323", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1936", "category_id": "87", "name": "아사히 민티아 카테킨 민트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:29.485631", "deleted_at": null,
    images: [{"product_image_id": "1919", "url": "https://ik.imagekit.io/oishidam/products/a3abdce3-beda-4564-a568-0542f081df91_vNVBDxvcd.webp", "alt_text": "아사히 민티아 카테킨 민트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1922", "sku_code": "NPPIP-DEMO-17823656826", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1937", "category_id": "72", "name": "산요 삿포로이치방 하카타 신신 감수 돈코츠 라멘 99g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:30.075085", "deleted_at": null,
    images: [{"product_image_id": "1921", "url": "https://ik.imagekit.io/oishidam/products/9b7243dc-4a17-4f5e-a565-19b7ba3b8b45_KmNHLaFgb.webp", "alt_text": "산요 삿포로이치방 하카타 신신 감수 돈코츠 라멘 99g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1923", "sku_code": "NPPIP-DEMO-1777440561", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1938", "category_id": "65", "name": "로손 오샤부리 오징어 스틱 21g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:30.817081", "deleted_at": null,
    images: [{"product_image_id": "1922", "url": "https://ik.imagekit.io/oishidam/products/cc829ac5-20ef-42af-a0fc-d906e8456fb6_R6eq-cDli.webp", "alt_text": "로손 오샤부리 오징어 스틱 21g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1924", "sku_code": "NPPIP-DEMO-177691269376", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1939", "category_id": "88", "name": "포카삿포로 킬레이트 레몬 무쿠미 구연산 2700 젤리 165g 6개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:31.516716", "deleted_at": null,
    images: [{"product_image_id": "1924", "url": "https://ik.imagekit.io/oishidam/products/86137bab-8ccb-42c7-9689-df99af1e35d8_gLD89XUGB.webp", "alt_text": "포카삿포로 킬레이트 레몬 무쿠미 구연산 2700 젤리 165g 6개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1925", "sku_code": "NPPIP-DEMO-1776128371", "variant_name": "기본", "option_values": {}, "price": 20000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1940", "category_id": "66", "name": "세븐일레븐 참깨 스틱 120g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:31.362019", "deleted_at": null,
    images: [{"product_image_id": "1923", "url": "https://ik.imagekit.io/oishidam/products/b281a39a-7829-4017-9386-b9005817a694_GlYu8C8IEG.webp", "alt_text": "세븐일레븐 참깨 스틱 120g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1926", "sku_code": "NPPIP-DEMO-177329835737", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1941", "category_id": "66", "name": "세븐일레븐 씨없이 말린 꿀절임 우메보시 매실 25g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:31.829374", "deleted_at": null,
    images: [{"product_image_id": "1925", "url": "https://ik.imagekit.io/oishidam/products/63aaea2d-8818-4b61-ab10-16324d65499f_TFp8IHCqb.webp", "alt_text": "세븐일레븐 씨없이 말린 꿀절임 우메보시 매실 25g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1927", "sku_code": "NPPIP-DEMO-17732983445", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1942", "category_id": "67", "name": "패밀리마트 콘 초콜릿 46g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:32.71684", "deleted_at": null,
    images: [{"product_image_id": "1926", "url": "https://ik.imagekit.io/oishidam/products/35b3ed46-811f-45bc-aa88-f56f45ed8c9d_xS06Pf4-m.webp", "alt_text": "패밀리마트 콘 초콜릿 46g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1928", "sku_code": "NPPIP-DEMO-1770787498", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1943", "category_id": "67", "name": "패밀리마트 바삭하고 고소한 버터 피넛 땅콩 78g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:33.323194", "deleted_at": null,
    images: [{"product_image_id": "1927", "url": "https://ik.imagekit.io/oishidam/products/159138d7-f1e8-474f-a0b6-1df9f1abf043_ZjCl1jV8-y.webp", "alt_text": "패밀리마트 바삭하고 고소한 버터 피넛 땅콩 78g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1929", "sku_code": "NPPIP-DEMO-1770706036", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1944", "category_id": "87", "name": "노벨 대만스타일 흑당 우롱 밀크티 캔디 사탕 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:33.448925", "deleted_at": null,
    images: [{"product_image_id": "1928", "url": "https://ik.imagekit.io/oishidam/products/444ab056-7edd-4e96-978e-78e7a134ff36_ruu45rEjJ.webp", "alt_text": "노벨 대만스타일 흑당 우롱 밀크티 캔디 사탕 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1930", "sku_code": "NPPIP-DEMO-1767854587", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1945", "category_id": "79", "name": "가루비 뜨거운 물만 넣어 만드는 매쉬 포테이토 150g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:33.822622", "deleted_at": null,
    images: [{"product_image_id": "1929", "url": "https://ik.imagekit.io/oishidam/products/b4d7fd3d-1e83-496c-9fdc-21c4eec47afc_jF4gG-hF4.webp", "alt_text": "가루비 뜨거운 물만 넣어 만드는 매쉬 포테이토 150g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1931", "sku_code": "NPPIP-DEMO-1720762013", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1946", "category_id": "79", "name": "UHA 오사츠도키 고구마칩 플레인 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:34.628264", "deleted_at": null,
    images: [{"product_image_id": "1930", "url": "https://ik.imagekit.io/oishidam/products/af3ee027-8877-40e6-b4f0-cb80fc0b4b17_iuftrPptg.webp", "alt_text": "UHA 오사츠도키 고구마칩 플레인 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1932", "sku_code": "NPPIP-DEMO-1719450090", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1947", "category_id": "93", "name": "나카타니엔 오모리야 이키 오차즈케 쇼쿠닌 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:35.316123", "deleted_at": null,
    images: [{"product_image_id": "1931", "url": "https://ik.imagekit.io/oishidam/products/a2014b3f-3790-416c-a438-3243a9a98e4c_FwbQur9_N.webp", "alt_text": "나카타니엔 오모리야 이키 오차즈케 쇼쿠닌 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1933", "sku_code": "NPPIP-DEMO-1660286209", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1948", "category_id": "69", "name": "하우스 홋카이도 스튜 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:35.377745", "deleted_at": null,
    images: [{"product_image_id": "1932", "url": "https://ik.imagekit.io/oishidam/products/f5d086e3-0019-41c8-b961-c2a9c1e484ab_Mq6ZCdVzx.webp", "alt_text": "하우스 홋카이도 스튜 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1934", "sku_code": "NPPIP-DEMO-1660286122", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1949", "category_id": "80", "name": "일본한정 고디바 쿠키 어소트먼트 8매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:35.860234", "deleted_at": null,
    images: [{"product_image_id": "1933", "url": "https://ik.imagekit.io/oishidam/products/0cb3da0a-cce5-488e-adff-68bd3fffa7e9_3WOrjVF98.jpg", "alt_text": "일본한정 고디바 쿠키 어소트먼트 8매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1935", "sku_code": "NPPIP-DEMO-1655690751", "variant_name": "기본", "option_values": {}, "price": 19500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1950", "category_id": "89", "name": "★세트 할인★ 메이지 나마노토키 촉촉한 밀크 초콜릿 12개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:36.563741", "deleted_at": null,
    images: [{"product_image_id": "1934", "url": "https://ik.imagekit.io/oishidam/products/77518867-6a9a-42e2-b7e0-c237753c9c01_MfkWyLUhJ.webp", "alt_text": "★세트 할인★ 메이지 나마노토키 촉촉한 밀크 초콜릿 12개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1936", "sku_code": "NPPIP-DEMO-1778549457", "variant_name": "기본", "option_values": {}, "price": 45000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1951", "category_id": "89", "name": "롯데 프리미엄 가나 농후 생초콜릿 풍부한 밀크맛 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:37.333364", "deleted_at": null,
    images: [{"product_image_id": "1936", "url": "https://ik.imagekit.io/oishidam/products/4939343c-3bb0-40d8-bebe-11c1d1b8ae62_OuNDPy5M-.webp", "alt_text": "롯데 프리미엄 가나 농후 생초콜릿 풍부한 밀크맛 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1937", "sku_code": "NPPIP-DEMO-1790746341", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1952", "category_id": "79", "name": "부르봉 소금 캬라멜 쿠키 9매입 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:37.305846", "deleted_at": null,
    images: [{"product_image_id": "1935", "url": "https://ik.imagekit.io/oishidam/products/62467afd-35d4-4b39-be9d-b3caf0a0c1c8_6aOHr6jrmO.webp", "alt_text": "부르봉 소금 캬라멜 쿠키 9매입 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1938", "sku_code": "NPPIP-DEMO-1788510380", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1953", "category_id": "79", "name": "코이케야 프라이드 포테토 100% 우니 성게알 간장맛 52g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1937", "url": "https://ik.imagekit.io/oishidam/products/0c09c6b5-7f05-4edc-a9be-714351760153_I_nb1OF_2.webp", "alt_text": "코이케야 프라이드 포테토 100% 우니 성게알 간장맛 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1939", "sku_code": "NPPIP-DEMO-1788502192", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1954", "category_id": "75", "name": "에바라 야키토리 닭꼬치구이 소스 230g 일본 소스", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:38.298054", "deleted_at": null,
    images: [{"product_image_id": "1938", "url": "https://ik.imagekit.io/oishidam/products/26565df8-dd4c-4cc2-8a45-972da3dc9f4d_UG7xYGXW5.webp", "alt_text": "에바라 야키토리 닭꼬치구이 소스 230g 일본 소스", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1940", "sku_code": "NPPIP-DEMO-1787643954", "variant_name": "기본", "option_values": {}, "price": 3580, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1955", "category_id": "79", "name": "부르봉 알포트 미니 초콜릿 밤 몽블랑맛 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:39.264216", "deleted_at": null,
    images: [{"product_image_id": "1940", "url": "https://ik.imagekit.io/oishidam/products/4f96340a-a5af-44d0-aee0-4bab32f8634c_fkM2sJNgo.webp", "alt_text": "부르봉 알포트 미니 초콜릿 밤 몽블랑맛 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1941", "sku_code": "NPPIP-DEMO-1785919057", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1956", "category_id": "79", "name": "카메다제과 무겐노리 무한김 과자 일본 센베이 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:39.253712", "deleted_at": null,
    images: [{"product_image_id": "1939", "url": "https://ik.imagekit.io/oishidam/products/c9793994-bf5c-4a95-843a-22a00091d46a_79TlVPNJ5.webp", "alt_text": "카메다제과 무겐노리 무한김 과자 일본 센베이 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1942", "sku_code": "NPPIP-DEMO-1785383167", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1957", "category_id": "66", "name": "세븐일레븐 버터스틱 쿠키 3개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:39.593591", "deleted_at": null,
    images: [{"product_image_id": "1941", "url": "https://ik.imagekit.io/oishidam/products/70994d5c-b1ae-4a9e-acd6-20355360bb39_mJtvfJ0P5.webp", "alt_text": "세븐일레븐 버터스틱 쿠키 3개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1943", "sku_code": "NPPIP-DEMO-1785227407", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1958", "category_id": "94", "name": "모모야 고항데스요 김조림 180g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:40.261002", "deleted_at": null,
    images: [{"product_image_id": "1942", "url": "https://ik.imagekit.io/oishidam/products/7339ef87-72af-4485-bec0-b4ead24c4ba8_alEIc3qLG.webp", "alt_text": "모모야 고항데스요 김조림 180g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1944", "sku_code": "NPPIP-DEMO-1784622913", "variant_name": "기본", "option_values": {}, "price": 5950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1959", "category_id": "93", "name": "니치후리 후리카케 낫또 27g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:41.441185", "deleted_at": null,
    images: [{"product_image_id": "1943", "url": "https://ik.imagekit.io/oishidam/products/6a5dd414-ffd6-46e7-b5b9-46af0dc268e2_LJPbCfCma.webp", "alt_text": "니치후리 후리카케 낫또 27g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1945", "sku_code": "NPPIP-DEMO-178113996740", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1960", "category_id": "93", "name": "니치후리 후리카케 마츠야 비프 카레 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:41.480584", "deleted_at": null,
    images: [{"product_image_id": "1944", "url": "https://ik.imagekit.io/oishidam/products/d5759c84-59aa-4c60-8d4d-80a3cbfa9e12_c9iM4ywcI.webp", "alt_text": "니치후리 후리카케 마츠야 비프 카레 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1946", "sku_code": "NPPIP-DEMO-178113996944", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1961", "category_id": "80", "name": "아사히 크림 현미 블랑 쿠키 에너지바 메이플 4매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:41.542925", "deleted_at": null,
    images: [{"product_image_id": "1945", "url": "https://ik.imagekit.io/oishidam/products/b471fe29-2178-405f-a0e5-77207f6bdf2a_V7u-kGuyf.webp", "alt_text": "아사히 크림 현미 블랑 쿠키 에너지바 메이플 4매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1947", "sku_code": "NPPIP-DEMO-17798462025", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1962", "category_id": "65", "name": "로손 야마다 양봉장 꿀을 사용한 네리우메 매실 33g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:41.899764", "deleted_at": null,
    images: [{"product_image_id": "1946", "url": "https://ik.imagekit.io/oishidam/products/d3688f30-3151-43d8-a748-9be91143ed3f_S9n9gT4N2.webp", "alt_text": "로손 야마다 양봉장 꿀을 사용한 네리우메 매실 33g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1948", "sku_code": "NPPIP-DEMO-177691269487", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1963", "category_id": "65", "name": "로손 6종류의 서양 과자 아소토 134g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:43.223085", "deleted_at": null,
    images: [{"product_image_id": "1948", "url": "https://ik.imagekit.io/oishidam/products/1ea7d650-bf72-492f-8149-683365f0b028_UrlRN3CkQI.webp", "alt_text": "로손 6종류의 서양 과자 아소토 134g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1949", "sku_code": "NPPIP-DEMO-177691269165", "variant_name": "기본", "option_values": {}, "price": 5800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1964", "category_id": "82", "name": "네슬레 네스카페 바닐라 라떼 커피 포션 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:43.207198", "deleted_at": null,
    images: [{"product_image_id": "1947", "url": "https://ik.imagekit.io/oishidam/products/bdd7016b-e82b-4d9f-a065-c0d985b72d10_ieFZWH9KQ.webp", "alt_text": "네슬레 네스카페 바닐라 라떼 커피 포션 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1950", "sku_code": "NPPIP-DEMO-1774936636", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1965", "category_id": "67", "name": "패밀리마트 검은깨 가득 미니 아스파라거스 과자 77g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:43.504816", "deleted_at": null,
    images: [{"product_image_id": "1949", "url": "https://ik.imagekit.io/oishidam/products/c66eaf57-995e-4d63-9fe3-89a7f96ae474_P-41k4FFt.webp", "alt_text": "패밀리마트 검은깨 가득 미니 아스파라거스 과자 77g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1951", "sku_code": "NPPIP-DEMO-1770194802", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1966", "category_id": "90", "name": "[모리나가]밀크 카라멜 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:43.56373", "deleted_at": null,
    images: [{"product_image_id": "1950", "url": "https://ik.imagekit.io/oishidam/products/3d36f35c-1a52-42ef-a413-bdb782460f57_N1kxk-i7k.webp", "alt_text": "[모리나가]밀크 카라멜 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1952", "sku_code": "NPPIP-DEMO-1623815799", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1967", "category_id": "65", "name": "로손 아타리메 부드러운 오징어 33g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:45.136387", "deleted_at": null,
    images: [{"product_image_id": "1952", "url": "https://ik.imagekit.io/oishidam/products/d0d00178-9be0-466e-ad21-8908e8d39364_YboTIq8KB.webp", "alt_text": "로손 아타리메 부드러운 오징어 33g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1953", "sku_code": "NPPIP-DEMO-1619749592", "variant_name": "기본", "option_values": {}, "price": 7650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1968", "category_id": "83", "name": "AGF Blendy 카페라토리 스틱 진한 말차라떼 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:44.920782", "deleted_at": null,
    images: [{"product_image_id": "1951", "url": "https://ik.imagekit.io/oishidam/products/87d46894-4ef6-4527-9a60-83799e182b97_u1CHe0V_u.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 말차라떼 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1954", "sku_code": "NPPIP-DEMO-1617861767", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1969", "category_id": "89", "name": "글리코 카프리코 미니 초콜릿 3가지맛 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:45.351744", "deleted_at": null,
    images: [{"product_image_id": "1953", "url": "https://ik.imagekit.io/oishidam/products/88f2e25f-a0c6-4672-89e3-4605142f6e96_rau_Ie0hz7.webp", "alt_text": "글리코 카프리코 미니 초콜릿 3가지맛 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1955", "sku_code": "NPPIP-DEMO-1722414240", "variant_name": "기본", "option_values": {}, "price": 6350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1970", "category_id": "79", "name": "가루비 북해도산 키타아카리 포테이토칩 홋카이도 구운 버터맛 34g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:45.52033", "deleted_at": null,
    images: [{"product_image_id": "1954", "url": "https://ik.imagekit.io/oishidam/products/a59d42ae-a7dc-4ef1-a89f-69889515f799_fqDaoJE0c.webp", "alt_text": "가루비 북해도산 키타아카리 포테이토칩 홋카이도 구운 버터맛 34g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1956", "sku_code": "NPPIP-DEMO-1789451199", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1971", "category_id": "87", "name": "칸로 프리미엄 스카치 캔디 요구리치 진한 요구르트맛 사탕 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:46.938599", "deleted_at": null,
    images: [{"product_image_id": "1956", "url": "https://ik.imagekit.io/oishidam/products/0c9950cd-7ecf-4970-a683-e87a7105ab6f_Vbxg5scTb.webp", "alt_text": "칸로 프리미엄 스카치 캔디 요구리치 진한 요구르트맛 사탕 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1957", "sku_code": "NPPIP-DEMO-1785741020", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1972", "category_id": "67", "name": "패밀리마트 닛신 아지센모토텐 감수 타이완 라멘 111g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:46.81228", "deleted_at": null,
    images: [{"product_image_id": "1955", "url": "https://ik.imagekit.io/oishidam/products/9b1072c7-0f7e-4dac-9ad4-8b2828f597e9_6a-gKGknA.webp", "alt_text": "패밀리마트 닛신 아지센모토텐 감수 타이완 라멘 111g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1958", "sku_code": "NPPIP-DEMO-1781572866", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1973", "category_id": "93", "name": "나가타니엔 어른 오토나노 후리카케 멘타이코 4봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:47.251259", "deleted_at": null,
    images: [{"product_image_id": "1957", "url": "https://ik.imagekit.io/oishidam/products/318f5f8b-bf0a-4b51-9cac-733735fc28bd_W_AqeP7Xsj.webp", "alt_text": "나가타니엔 어른 오토나노 후리카케 멘타이코 4봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1959", "sku_code": "NPPIP-DEMO-178113997453", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1974", "category_id": "93", "name": "니치후리 후리카케 장어구이 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:47.421542", "deleted_at": null,
    images: [{"product_image_id": "1958", "url": "https://ik.imagekit.io/oishidam/products/3baf9ff1-67cd-407f-a824-c1c287c20dd1_C_boad-Jp.webp", "alt_text": "니치후리 후리카케 장어구이 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1960", "sku_code": "NPPIP-DEMO-178113997047", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1975", "category_id": "93", "name": "마루미야 놋케루 후리카케 소고기 우엉 조림 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:48.847455", "deleted_at": null,
    images: [{"product_image_id": "1960", "url": "https://ik.imagekit.io/oishidam/products/4b605067-5957-4ce6-b79b-3217de7a8189_0dM3hlSzX.webp", "alt_text": "마루미야 놋케루 후리카케 소고기 우엉 조림 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1961", "sku_code": "NPPIP-DEMO-17811399547", "variant_name": "기본", "option_values": {}, "price": 4900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1976", "category_id": "77", "name": "[엔핍 종합 선물 세트] 일본 베스트 안주 패키지", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:48.816308", "deleted_at": null,
    images: [{"product_image_id": "1959", "url": "https://ik.imagekit.io/oishidam/products/00efbb1f-f673-40ac-b1be-7e29d755ea4d_0kaowYBo4.webp", "alt_text": "[엔핍 종합 선물 세트] 일본 베스트 안주 패키지", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1962", "sku_code": "NPPIP-DEMO-1778136649", "variant_name": "기본", "option_values": {}, "price": 49000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1977", "category_id": "65", "name": "로손 바삭한 식감의 버터 피넛 대용량 일본 안주 116g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:49.031838", "deleted_at": null,
    images: [{"product_image_id": "1961", "url": "https://ik.imagekit.io/oishidam/products/a9220268-6d90-4d82-a077-dcb9f0534b4d_wheJNWfpY.webp", "alt_text": "로손 바삭한 식감의 버터 피넛 대용량 일본 안주 116g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1963", "sku_code": "NPPIP-DEMO-1776912697103", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1978", "category_id": "65", "name": "로손 도콘부 식초 다시마 간식 22g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:49.154525", "deleted_at": null,
    images: [{"product_image_id": "1962", "url": "https://ik.imagekit.io/oishidam/products/34af8abd-f831-486f-9ce4-60f7042c94c4_BjF9YVhau4.webp", "alt_text": "로손 도콘부 식초 다시마 간식 22g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1964", "sku_code": "NPPIP-DEMO-177691269592", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1979", "category_id": "65", "name": "로손 슷파이만 씨 없는 건조 매실 12g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:50.560076", "deleted_at": null,
    images: [{"product_image_id": "1963", "url": "https://ik.imagekit.io/oishidam/products/a56868f3-aac3-45e7-8099-e60995113a1c_RZcEERQZ8.webp", "alt_text": "로손 슷파이만 씨 없는 건조 매실 12g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1965", "sku_code": "NPPIP-DEMO-177691269590", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1980", "category_id": "82", "name": "네슬레 네스카페 아이스 블렌드 무당 포션 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:50.553089", "deleted_at": null,
    images: [{"product_image_id": "1964", "url": "https://ik.imagekit.io/oishidam/products/35254c5a-943d-4913-bf9b-534eb52263f7_xvBjC3Tco.webp", "alt_text": "네슬레 네스카페 아이스 블렌드 무당 포션 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1966", "sku_code": "NPPIP-DEMO-1774936979", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1981", "category_id": "79", "name": "카메다 카키노타네 저염 스낵 일본 쌀과자 안주 6봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:50.964156", "deleted_at": null,
    images: [{"product_image_id": "1966", "url": "https://ik.imagekit.io/oishidam/products/08236214-3c95-4bd0-968d-4b41e62a1caa_m4niPfXAs.webp", "alt_text": "카메다 카키노타네 저염 스낵 일본 쌀과자 안주 6봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1967", "sku_code": "NPPIP-DEMO-1773632052", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1982", "category_id": "66", "name": "세븐일레븐 농후 우니 아게센 성게맛 센베이 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:50.809434", "deleted_at": null,
    images: [{"product_image_id": "1965", "url": "https://ik.imagekit.io/oishidam/products/89b1cea6-2973-454c-8c89-bad4cde23776_3cit1oc6p.webp", "alt_text": "세븐일레븐 농후 우니 아게센 성게맛 센베이 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1968", "sku_code": "NPPIP-DEMO-177329835327", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1983", "category_id": "88", "name": "[UHA미각당]푸쵸 구미 포도", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:52.269732", "deleted_at": null,
    images: [{"product_image_id": "1967", "url": "https://ik.imagekit.io/oishidam/products/3e8c0426-c22e-483c-b3c7-8ba1901787bc_nCNlmkc36.webp", "alt_text": "[UHA미각당]푸쵸 구미 포도", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1969", "sku_code": "NPPIP-DEMO-1625018073", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1984", "category_id": "94", "name": "모리나가 후와후와 팬케이크 믹스 170g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:52.505966", "deleted_at": null,
    images: [{"product_image_id": "1969", "url": "https://ik.imagekit.io/oishidam/products/54a5a0f0-aa2d-40d6-8854-11685e553be1_6pWIfQNod.webp", "alt_text": "모리나가 후와후와 팬케이크 믹스 170g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1970", "sku_code": "NPPIP-DEMO-1737340435", "variant_name": "기본", "option_values": {}, "price": 6900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1985", "category_id": "88", "name": "오리히로 푸룬토 곤약젤리 스탠딩 청포도 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:52.504959", "deleted_at": null,
    images: [{"product_image_id": "1968", "url": "https://ik.imagekit.io/oishidam/products/6e9af8ef-9d05-4a5a-8a70-ba5a94f03d2b_ChO3y4hYu.webp", "alt_text": "오리히로 푸룬토 곤약젤리 스탠딩 청포도 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1971", "sku_code": "NPPIP-DEMO-1612950418", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1986", "category_id": "88", "name": "노벨 치비 사우어 드링크맛 젤리 구미 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:52.595786", "deleted_at": null,
    images: [{"product_image_id": "1970", "url": "https://ik.imagekit.io/oishidam/products/a03b3020-fbf5-49f1-a44c-7eb3a781c332_mUp3JtFPv.webp", "alt_text": "노벨 치비 사우어 드링크맛 젤리 구미 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1972", "sku_code": "NPPIP-DEMO-1744084746", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1987", "category_id": "80", "name": "메이지 진한 초코 말차 샌드 6매입 일본 쿠키 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:54.145623", "deleted_at": null,
    images: [{"product_image_id": "1971", "url": "https://ik.imagekit.io/oishidam/products/b2ac2784-15c1-4bdd-be72-72f8e0d10d63_4qWUtxQLI.webp", "alt_text": "메이지 진한 초코 말차 샌드 6매입 일본 쿠키 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1973", "sku_code": "NPPIP-DEMO-1789695412", "variant_name": "기본", "option_values": {}, "price": 4700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1988", "category_id": "93", "name": "마루미야 소프트 후리카케 연어 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:54.345075", "deleted_at": null,
    images: [{"product_image_id": "1972", "url": "https://ik.imagekit.io/oishidam/products/489006a0-6e41-433a-8b4e-c51ce67bf5fe_mIwcvHD2c.webp", "alt_text": "마루미야 소프트 후리카케 연어 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1974", "sku_code": "NPPIP-DEMO-178113995613", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1989", "category_id": "79", "name": "부르봉 로안느 고구마 스위트포테토맛 8봉입", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1974", "url": "https://ik.imagekit.io/oishidam/products/24b00b7b-699c-419f-8fc6-c1214a2b6ed4_2ffO9KiFs.webp", "alt_text": "부르봉 로안느 고구마 스위트포테토맛 8봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1975", "sku_code": "NPPIP-DEMO-17859829407", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "1990", "category_id": "89", "name": "모리나가 초코볼 솔티 레몬맛 초콜릿 9봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:54.551805", "deleted_at": null,
    images: [{"product_image_id": "1973", "url": "https://ik.imagekit.io/oishidam/products/339e81eb-78e5-4408-a645-a82d51a2dc47_n0EOMh6sj.webp", "alt_text": "모리나가 초코볼 솔티 레몬맛 초콜릿 9봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1976", "sku_code": "NPPIP-DEMO-1778651196", "variant_name": "기본", "option_values": {}, "price": 5250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1991", "category_id": "65", "name": "내츄럴 로손 곤약칩스 김소금맛 일본 과자 스낵 15g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:56.039879", "deleted_at": null,
    images: [{"product_image_id": "1975", "url": "https://ik.imagekit.io/oishidam/products/b0d024d1-3532-4bfa-8784-4032454a0e0f_x3OLwuxWl.webp", "alt_text": "내츄럴 로손 곤약칩스 김소금맛 일본 과자 스낵 15g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1977", "sku_code": "NPPIP-DEMO-1776912700131", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1992", "category_id": "87", "name": "UHA미각당 극상의 꿀홍차 캔디 허니 밀크티 딸기맛 아소토 사탕 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:56.24669", "deleted_at": null,
    images: [{"product_image_id": "1976", "url": "https://ik.imagekit.io/oishidam/products/2221b812-e429-4949-8e54-e07177b9ecd6_OZGp1TRzf0.webp", "alt_text": "UHA미각당 극상의 꿀홍차 캔디 허니 밀크티 딸기맛 아소토 사탕 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1978", "sku_code": "NPPIP-DEMO-1773810138", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1993", "category_id": "82", "name": "퓨아레 커피 티라미수 초콜릿 대용량 405g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:56.509126", "deleted_at": null,
    images: [{"product_image_id": "1977", "url": "https://ik.imagekit.io/oishidam/products/aac3fc56-2021-4064-a41a-99ac399d2521_7WPaRq-mA.webp", "alt_text": "퓨아레 커피 티라미수 초콜릿 대용량 405g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1979", "sku_code": "NPPIP-DEMO-17727762336", "variant_name": "기본", "option_values": {}, "price": 27000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1994", "category_id": "67", "name": "패밀리마트 향기로운 얼그레이 홍차 쿠키 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:56.619569", "deleted_at": null,
    images: [{"product_image_id": "1978", "url": "https://ik.imagekit.io/oishidam/products/c866a492-e13b-4583-bf15-cc937c34b3ad_LA_qTfgAdH.webp", "alt_text": "패밀리마트 향기로운 얼그레이 홍차 쿠키 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1980", "sku_code": "NPPIP-DEMO-1770254960", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1995", "category_id": "67", "name": "패밀리마트 포린키 진한 명란맛 과자 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:57.894753", "deleted_at": null,
    images: [{"product_image_id": "1980", "url": "https://ik.imagekit.io/oishidam/products/1b2cb8d5-c996-4f09-924c-b4b6c349d7e3_j3xoIKcHp.webp", "alt_text": "패밀리마트 포린키 진한 명란맛 과자 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1981", "sku_code": "NPPIP-DEMO-1770254878", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1996", "category_id": "87", "name": "후지야 레몬 스쿼시 캔디 사탕 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:57.917776", "deleted_at": null,
    images: [{"product_image_id": "1979", "url": "https://ik.imagekit.io/oishidam/products/d2da477c-9843-4504-9b8d-32d1c29b03a7_SCpARnSvd.webp", "alt_text": "후지야 레몬 스쿼시 캔디 사탕 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1982", "sku_code": "NPPIP-DEMO-1757321451", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1997", "category_id": "89", "name": "메이지 바나나초코 초콜릿 37g 일본 초코", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:58.422547", "deleted_at": null,
    images: [{"product_image_id": "1981", "url": "https://ik.imagekit.io/oishidam/products/e12a5dbe-88cc-4113-b01b-f46a27c48d6d_vNl05nFBr.webp", "alt_text": "메이지 바나나초코 초콜릿 37g 일본 초코", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1983", "sku_code": "NPPIP-DEMO-1742191346", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1998", "category_id": "69", "name": "마루미야 일본 마파두부 소스 3인분 2회분 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:58.481164", "deleted_at": null,
    images: [{"product_image_id": "1982", "url": "https://ik.imagekit.io/oishidam/products/ae2db614-005c-458f-9480-f183e21fc8b5_TGmPH5ngRi.webp", "alt_text": "마루미야 일본 마파두부 소스 3인분 2회분 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1984", "sku_code": "NPPIP-DEMO-1740018996", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "1999", "category_id": "87", "name": "칸로 킨노밀크 금의 밀크 말차라떼 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:59.694414", "deleted_at": null,
    images: [{"product_image_id": "1983", "url": "https://ik.imagekit.io/oishidam/products/284c9e01-1c96-4fde-9d55-f3658f46aefe_9opDSgXAI.webp", "alt_text": "칸로 킨노밀크 금의 밀크 말차라떼 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1985", "sku_code": "NPPIP-DEMO-1719544733", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2000", "category_id": "69", "name": "[S&B]퐁드보 디너 크림스튜", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:15:59.727671", "deleted_at": null,
    images: [{"product_image_id": "1984", "url": "https://ik.imagekit.io/oishidam/products/1c60504c-28b2-4b84-b836-3fea4b5a5eb2_uRyCJbM9jH.webp", "alt_text": "[S&B]퐁드보 디너 크림스튜", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1986", "sku_code": "NPPIP-DEMO-1637212423", "variant_name": "기본", "option_values": {}, "price": 5900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2001", "category_id": "80", "name": "이시야 시로이코이비토 화이트&블랙 24개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:00.178586", "deleted_at": null,
    images: [{"product_image_id": "1985", "url": "https://ik.imagekit.io/oishidam/products/817a6a79-4418-421a-a348-d3c00b2ff8a8__gyiS9nRd.webp", "alt_text": "이시야 시로이코이비토 화이트&블랙 24개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1987", "sku_code": "NPPIP-DEMO-1626330338", "variant_name": "기본", "option_values": {}, "price": 29000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2002", "category_id": "88", "name": "UHA미각당 구미서플리 철 20일분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:00.208434", "deleted_at": null,
    images: [{"product_image_id": "1986", "url": "https://ik.imagekit.io/oishidam/products/daeab632-0a73-4e27-ab39-1d404ec4675b_6zSnqyZKLY.webp", "alt_text": "UHA미각당 구미서플리 철 20일분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1988", "sku_code": "NPPIP-DEMO-1620106967", "variant_name": "기본", "option_values": {}, "price": 10900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2003", "category_id": "88", "name": "칸로 칸데미나 구미 센터 스플래시 쿨 레몬 소다맛 젤리 60g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "1988", "url": "https://ik.imagekit.io/oishidam/products/5b4f6b84-9411-4acd-b89f-e5c6769f84ed_Rdvh62vcg2.webp", "alt_text": "칸로 칸데미나 구미 센터 스플래시 쿨 레몬 소다맛 젤리 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1989", "sku_code": "NPPIP-DEMO-1787288634", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2004", "category_id": "79", "name": "메이지 키노코노야마 버섯산 고구마맛 96g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:01.672368", "deleted_at": null,
    images: [{"product_image_id": "1987", "url": "https://ik.imagekit.io/oishidam/products/44fe2306-a8c0-47af-96ab-ff255933a9c7_XCZyqRKmoz.webp", "alt_text": "메이지 키노코노야마 버섯산 고구마맛 96g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1990", "sku_code": "NPPIP-DEMO-1785919146", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2005", "category_id": "83", "name": "무인양품 물에 잘 녹는 마이보틀 스틱 논카페인 머스캣 그린 루이보스티 파우더 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:01.904758", "deleted_at": null,
    images: [{"product_image_id": "1989", "url": "https://ik.imagekit.io/oishidam/products/146594ee-8fd6-4cd1-996c-8ce941d15887_Orl24nnmW.webp", "alt_text": "무인양품 물에 잘 녹는 마이보틀 스틱 논카페인 머스캣 그린 루이보스티 파우더 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1991", "sku_code": "NPPIP-DEMO-17858939628", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2006", "category_id": "89", "name": "글리코 포키 빼빼로 카카오 60프로 2봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:02.059914", "deleted_at": null,
    images: [{"product_image_id": "1990", "url": "https://ik.imagekit.io/oishidam/products/16aa90aa-dbb8-4107-9754-07226f9d8af2_KAb7f6eFI.webp", "alt_text": "글리코 포키 빼빼로 카카오 60프로 2봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1992", "sku_code": "NPPIP-DEMO-1782702899", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2007", "category_id": "93", "name": "나가타니엔 어른 오토나노 후리카케 연어 4봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:03.564375", "deleted_at": null,
    images: [{"product_image_id": "1991", "url": "https://ik.imagekit.io/oishidam/products/58ad51f3-d81d-40b0-b09a-9f63c298f2b6_NCnGHn_-3.webp", "alt_text": "나가타니엔 어른 오토나노 후리카케 연어 4봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1993", "sku_code": "NPPIP-DEMO-178113997954", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2008", "category_id": "93", "name": "마루미야 후리카케 명란 뉴팩  25g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:03.564375", "deleted_at": null,
    images: [{"product_image_id": "1992", "url": "https://ik.imagekit.io/oishidam/products/e69ed0c0-d46a-41a4-bca4-006430ead225_eRIZV_d0i.webp", "alt_text": "마루미야 후리카케 명란 뉴팩  25g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1994", "sku_code": "NPPIP-DEMO-178113996329", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2009", "category_id": "93", "name": "마루미야 소프트 후리카케 스키야키 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:03.784195", "deleted_at": null,
    images: [{"product_image_id": "1993", "url": "https://ik.imagekit.io/oishidam/products/98f8d0a3-2195-482a-8005-d5440d39870f_VFiS6sZyY.webp", "alt_text": "마루미야 소프트 후리카케 스키야키 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1995", "sku_code": "NPPIP-DEMO-178113995612", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2010", "category_id": "93", "name": "마루미야 놋케루 후리카케 네기 시오 부타 소보로 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:04.003926", "deleted_at": null,
    images: [{"product_image_id": "1994", "url": "https://ik.imagekit.io/oishidam/products/c24cc5b3-0c70-41d0-915b-18ef8d974638_jaAJ0xIn3.webp", "alt_text": "마루미야 놋케루 후리카케 네기 시오 부타 소보로 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1996", "sku_code": "NPPIP-DEMO-17811399546", "variant_name": "기본", "option_values": {}, "price": 4900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2011", "category_id": "94", "name": "모모야 다진 마늘 양념 대용량 125g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:05.543607", "deleted_at": null,
    images: [{"product_image_id": "1996", "url": "https://ik.imagekit.io/oishidam/products/5f9d1fbc-674a-4c77-bfe8-f73628ff703c_FDq8FvV5I.webp", "alt_text": "모모야 다진 마늘 양념 대용량 125g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1997", "sku_code": "NPPIP-DEMO-1778475818", "variant_name": "기본", "option_values": {}, "price": 6900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2012", "category_id": "94", "name": "히가시마루 우동 스프 일본 즉석우동 18매 144g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:05.570364", "deleted_at": null,
    images: [{"product_image_id": "1997", "url": "https://ik.imagekit.io/oishidam/products/04a6b3a0-69ec-4dd8-87c0-ae3dd2246841_rU9NK8Det.webp", "alt_text": "히가시마루 우동 스프 일본 즉석우동 18매 144g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1998", "sku_code": "NPPIP-DEMO-1781067608", "variant_name": "기본", "option_values": {}, "price": 7300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2013", "category_id": "89", "name": "글리코 가바 멘탈 밸런스 초콜릿 스탠드 파우치 다크 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:05.513517", "deleted_at": null,
    images: [{"product_image_id": "1995", "url": "https://ik.imagekit.io/oishidam/products/ed61044e-a722-4441-ad41-786729417906_U7IGh2xBn.webp", "alt_text": "글리코 가바 멘탈 밸런스 초콜릿 스탠드 파우치 다크 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "1999", "sku_code": "NPPIP-DEMO-1778224483", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2014", "category_id": "65", "name": "내츄럴 내츄럴 로손 4가지 향신료의 향기 스페키루스 일본 과자 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:06.13484", "deleted_at": null,
    images: [{"product_image_id": "1998", "url": "https://ik.imagekit.io/oishidam/products/d728e837-4108-4b77-a595-3d6fa5d2faff_JDbjmv_9X.webp", "alt_text": "내츄럴 내츄럴 로손 4가지 향신료의 향기 스페키루스 일본 과자 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2000", "sku_code": "NPPIP-DEMO-1776912699121", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2015", "category_id": "65", "name": "로손 촉촉하고 부드러운 꿀 건조 매실 18g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:07.322052", "deleted_at": null,
    images: [{"product_image_id": "2000", "url": "https://ik.imagekit.io/oishidam/products/90158c3f-df7a-48c9-b4ef-592ebdfd6468_23VzU2tFG.webp", "alt_text": "로손 촉촉하고 부드러운 꿀 건조 매실 18g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2001", "sku_code": "NPPIP-DEMO-177691269589", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2016", "category_id": "65", "name": "로손 우메 호시 시트 건조 매실 16g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:07.316324", "deleted_at": null,
    images: [{"product_image_id": "1999", "url": "https://ik.imagekit.io/oishidam/products/a0ea5c11-cff0-4eda-97cb-9435b705cfb9_GCOKkHw1M.webp", "alt_text": "로손 우메 호시 시트 건조 매실 16g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2002", "sku_code": "NPPIP-DEMO-177691269588", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2017", "category_id": "88", "name": "UHA미각당 구미다마 딸기맛 젤리 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:07.597956", "deleted_at": null,
    images: [{"product_image_id": "2001", "url": "https://ik.imagekit.io/oishidam/products/09d25938-db93-4ba7-b0af-9ab766f9c2ff_19TCrFMfi.webp", "alt_text": "UHA미각당 구미다마 딸기맛 젤리 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2003", "sku_code": "NPPIP-DEMO-1775694318", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2018", "category_id": "82", "name": "네슬레 네스카페 아이스 블렌드 저당 포션 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:07.908335", "deleted_at": null,
    images: [{"product_image_id": "2002", "url": "https://ik.imagekit.io/oishidam/products/d7751410-3dd6-4b0f-914e-4d10efd2fd1e_LTchV9XsZ.webp", "alt_text": "네슬레 네스카페 아이스 블렌드 저당 포션 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2004", "sku_code": "NPPIP-DEMO-1774936901", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2019", "category_id": "66", "name": "세븐일레븐 다섯가지 너트 초콜릿 아소토 135g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:09.026985", "deleted_at": null,
    images: [{"product_image_id": "2003", "url": "https://ik.imagekit.io/oishidam/products/1c91d4fc-5e30-41e0-b233-076701755987_XjjzKRWXc.webp", "alt_text": "세븐일레븐 다섯가지 너트 초콜릿 아소토 135g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2005", "sku_code": "NPPIP-DEMO-177329836865", "variant_name": "기본", "option_values": {}, "price": 6950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2020", "category_id": "67", "name": "패밀리마트 과일젤리 구미 쇼콜라 포도 화이트 초콜릿 젤리 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:09.30578", "deleted_at": null,
    images: [{"product_image_id": "2004", "url": "https://ik.imagekit.io/oishidam/products/63e8c7da-f3cf-4718-bc29-b90c14b46200_du7dnwaow.webp", "alt_text": "패밀리마트 과일젤리 구미 쇼콜라 포도 화이트 초콜릿 젤리 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2006", "sku_code": "NPPIP-DEMO-1770777868", "variant_name": "기본", "option_values": {}, "price": 4400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2021", "category_id": "67", "name": "패밀리마트 프리미엄 버터 쿠키 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:09.32535", "deleted_at": null,
    images: [{"product_image_id": "2005", "url": "https://ik.imagekit.io/oishidam/products/b5056a82-f037-490a-89cb-03fa5b4f8682_7ZCNLKl45.webp", "alt_text": "패밀리마트 프리미엄 버터 쿠키 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2007", "sku_code": "NPPIP-DEMO-1770252492", "variant_name": "기본", "option_values": {}, "price": 6450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2022", "category_id": "84", "name": "이무라야 일본 앙버터 스프레드 튜브 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:09.55155", "deleted_at": null,
    images: [{"product_image_id": "2006", "url": "https://ik.imagekit.io/oishidam/products/24309a32-80a1-434e-ae2f-f2c51feba0e7_BCM_S0KlS.webp", "alt_text": "이무라야 일본 앙버터 스프레드 튜브 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2008", "sku_code": "NPPIP-DEMO-1739405118", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2023", "category_id": "69", "name": "하우스 감칫말 호화 스튜 크림 140g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:10.91987", "deleted_at": null,
    images: [{"product_image_id": "2007", "url": "https://ik.imagekit.io/oishidam/products/157db4fc-3377-474c-8af7-19f7ea1c0dc5_rq-lMwCVD.webp", "alt_text": "하우스 감칫말 호화 스튜 크림 140g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2009", "sku_code": "NPPIP-DEMO-1660286233", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2024", "category_id": "81", "name": "[AGF]블랜디®스틱 카라멜 카페오레 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:11.233975", "deleted_at": null,
    images: [{"product_image_id": "2009", "url": "https://ik.imagekit.io/oishidam/products/432f053b-e12f-48fb-ba28-cb8945d120ec_cpuhoX4kC.webp", "alt_text": "[AGF]블랜디®스틱 카라멜 카페오레 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2010", "sku_code": "NPPIP-DEMO-1617851530", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2025", "category_id": "72", "name": "닛신 컵누들 미니 씨푸드 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:10.966096", "deleted_at": null,
    images: [{"product_image_id": "2008", "url": "https://ik.imagekit.io/oishidam/products/ff592d09-1d7f-4a46-8248-2b07da5947f6_i7Z3XGRHIk.webp", "alt_text": "닛신 컵누들 미니 씨푸드 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2011", "sku_code": "NPPIP-DEMO-1564046175", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2026", "category_id": "89", "name": "메이지 나마노토키 촉촉한 초콜릿 말차맛 4개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:11.437182", "deleted_at": null,
    images: [{"product_image_id": "2010", "url": "https://ik.imagekit.io/oishidam/products/78f1efa3-19d6-42d8-a8e0-0ae656086928_hNy1D1O9ve.webp", "alt_text": "메이지 나마노토키 촉촉한 초콜릿 말차맛 4개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2012", "sku_code": "NPPIP-DEMO-17912721075", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2027", "category_id": "72", "name": "닛신 면장인 장인의 유자소금 논프라이면 라멘 76g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:12.845236", "deleted_at": null,
    images: [{"product_image_id": "2011", "url": "https://ik.imagekit.io/oishidam/products/20e71546-70dd-4d6d-a967-666bf9655d6c_aY5HXyPys.webp", "alt_text": "닛신 면장인 장인의 유자소금 논프라이면 라멘 76g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2013", "sku_code": "NPPIP-DEMO-1788506095", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2028", "category_id": "79", "name": "부르봉 알포트 초콜릿 쿠키 고구마 스위트포테토맛 126g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:13.016287", "deleted_at": null,
    images: [{"product_image_id": "2012", "url": "https://ik.imagekit.io/oishidam/products/628cfbe3-6973-440c-8793-5e9a935cae30_L_e-EFWgZ.webp", "alt_text": "부르봉 알포트 초콜릿 쿠키 고구마 스위트포테토맛 126g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2014", "sku_code": "NPPIP-DEMO-1785919173", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2029", "category_id": "80", "name": "부르봉 크림 앙팡 오사츠버터 고구마맛 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:13.118502", "deleted_at": null,
    images: [{"product_image_id": "2013", "url": "https://ik.imagekit.io/oishidam/products/2b166fcf-88e8-4173-bac2-39ac64fe1590_bE8qfZF6E.webp", "alt_text": "부르봉 크림 앙팡 오사츠버터 고구마맛 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2015", "sku_code": "NPPIP-DEMO-1785914855", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2030", "category_id": "80", "name": "후루타 산리오 캐릭터즈 스티커 쿠키", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:13.371247", "deleted_at": null,
    images: [{"product_image_id": "2014", "url": "https://ik.imagekit.io/oishidam/products/df7b7046-fdc5-4240-9a13-c2de6e803a99_yJANCs-Gl.webp", "alt_text": "후루타 산리오 캐릭터즈 스티커 쿠키", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2016", "sku_code": "NPPIP-DEMO-1782720113", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2031", "category_id": "80", "name": "후지야 홈파이 일본 대용량 버터 쿠키38매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:14.782335", "deleted_at": null,
    images: [{"product_image_id": "2015", "url": "https://ik.imagekit.io/oishidam/products/95160cc5-9bbe-4c48-bbf0-aebbae03f82c_ycxVlu1tJ.webp", "alt_text": "후지야 홈파이 일본 대용량 버터 쿠키38매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2017", "sku_code": "NPPIP-DEMO-1782697113", "variant_name": "기본", "option_values": {}, "price": 4150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2032", "category_id": "93", "name": "마루미야 소프트 후리카케 토리 타마고 소보로 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:14.862052", "deleted_at": null,
    images: [{"product_image_id": "2017", "url": "https://ik.imagekit.io/oishidam/products/9a491718-050a-40b0-9d4f-d3cc6dba0d5d_1RzeYmXOY.webp", "alt_text": "마루미야 소프트 후리카케 토리 타마고 소보로 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2018", "sku_code": "NPPIP-DEMO-178113995817", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2033", "category_id": "65", "name": "내츄럴 로손 하루 분량의 철분 섭취 구운 치즈케이크 쇼콜라 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:14.80201", "deleted_at": null,
    images: [{"product_image_id": "2016", "url": "https://ik.imagekit.io/oishidam/products/02a10cdf-383a-477f-8d63-c36e1d2f86f3_G0eN_YIe_.webp", "alt_text": "내츄럴 로손 하루 분량의 철분 섭취 구운 치즈케이크 쇼콜라 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2019", "sku_code": "NPPIP-DEMO-1776912700130", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2034", "category_id": "65", "name": "로손 자쿠우마 콘스낵 진한 콘소메맛 58g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:15.080438", "deleted_at": null,
    images: [{"product_image_id": "2018", "url": "https://ik.imagekit.io/oishidam/products/61e2c05f-142a-48cd-887e-f34e2d871bad_ENFqaVxmKC.webp", "alt_text": "로손 자쿠우마 콘스낵 진한 콘소메맛 58g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2020", "sku_code": "NPPIP-DEMO-177691268629", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2035", "category_id": "88", "name": "오리히로 곤약젤리 청포도+오렌지 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:16.476424", "deleted_at": null,
    images: [{"product_image_id": "2020", "url": "https://ik.imagekit.io/oishidam/products/3f59842b-523e-44a0-95bb-c49b70dd078f_tnKjs1SjF.webp", "alt_text": "오리히로 곤약젤리 청포도+오렌지 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2021", "sku_code": "NPPIP-DEMO-177390584712", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2036", "category_id": "66", "name": "세븐일레븐 맛있게 매운 미소에비센 양념 새우 센베이 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:16.476424", "deleted_at": null,
    images: [{"product_image_id": "2019", "url": "https://ik.imagekit.io/oishidam/products/9a2f3edc-85f3-460c-9131-d9bceddc688a_6HGl3kXfj.webp", "alt_text": "세븐일레븐 맛있게 매운 미소에비센 양념 새우 센베이 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2022", "sku_code": "NPPIP-DEMO-177329835225", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2037", "category_id": "66", "name": "세븐일레븐 포테이토칩스 맛있게 매운 감자칩 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:16.81958", "deleted_at": null,
    images: [{"product_image_id": "2022", "url": "https://ik.imagekit.io/oishidam/products/f32d7a99-851f-46fe-ac3b-52638e43c121_7UV8Gti2TJ.webp", "alt_text": "세븐일레븐 포테이토칩스 맛있게 매운 감자칩 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2023", "sku_code": "NPPIP-DEMO-17732983468", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2038", "category_id": "66", "name": "세븐일레븐 씨없이 말린 달콤한 우메보시 매실 12g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:16.774933", "deleted_at": null,
    images: [{"product_image_id": "2021", "url": "https://ik.imagekit.io/oishidam/products/b248104b-5dba-4703-b99e-c903ffdb7051_U9nmhlEfa.webp", "alt_text": "세븐일레븐 씨없이 말린 달콤한 우메보시 매실 12g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2024", "sku_code": "NPPIP-DEMO-17732983444", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2039", "category_id": "67", "name": "패밀리마트 바닐라 크림 샌드 크래커 14개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:18.190751", "deleted_at": null,
    images: [{"product_image_id": "2023", "url": "https://ik.imagekit.io/oishidam/products/4959bff9-89a7-43ab-b5de-7222d418b34c_KXQobDTwI.webp", "alt_text": "패밀리마트 바닐라 크림 샌드 크래커 14개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2025", "sku_code": "NPPIP-DEMO-1770256470", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2040", "category_id": "67", "name": "패밀리마트 베이비스타 넓은 라면 과자 치킨맛 74g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:18.667673", "deleted_at": null,
    images: [{"product_image_id": "2025", "url": "https://ik.imagekit.io/oishidam/products/4052aa65-64dd-421f-a5fb-c4e63fb18fa2_tUC95Etpq.webp", "alt_text": "패밀리마트 베이비스타 넓은 라면 과자 치킨맛 74g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2026", "sku_code": "NPPIP-DEMO-1770257444", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2041", "category_id": "67", "name": "패밀리마트 트위스트 과자 맛있는 소금맛 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:18.714897", "deleted_at": null,
    images: [{"product_image_id": "2026", "url": "https://ik.imagekit.io/oishidam/products/b33c5ec7-974e-4efb-9da7-aa11cecdf5c7_-gLsOweRR.webp", "alt_text": "패밀리마트 트위스트 과자 맛있는 소금맛 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2027", "sku_code": "NPPIP-DEMO-1770251985", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2042", "category_id": "87", "name": "아사히 칼피스 라무네 캔디 41g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:18.653034", "deleted_at": null,
    images: [{"product_image_id": "2024", "url": "https://ik.imagekit.io/oishidam/products/d659e3b0-2b08-48c2-badc-e4dd79154fb4_BKGBnA2t_.webp", "alt_text": "아사히 칼피스 라무네 캔디 41g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2028", "sku_code": "NPPIP-DEMO-1742371308", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2043", "category_id": "79", "name": "코이케야 스틱 카라무쵸 핫칠리맛 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:20.210595", "deleted_at": null,
    images: [{"product_image_id": "2027", "url": "https://ik.imagekit.io/oishidam/products/cae35bd2-3322-4f88-8143-b8f3c93431e4_d4kET4gxo.webp", "alt_text": "코이케야 스틱 카라무쵸 핫칠리맛 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2029", "sku_code": "NPPIP-DEMO-1740387345", "variant_name": "기본", "option_values": {}, "price": 3150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2044", "category_id": "80", "name": "[모리나가]마리 21개입 113g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:20.643243", "deleted_at": null,
    images: [{"product_image_id": "2028", "url": "https://ik.imagekit.io/oishidam/products/df2d9274-15c2-47d7-86ed-04174a9fb4aa_8i5yWGMhg.webp", "alt_text": "[모리나가]마리 21개입 113g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2030", "sku_code": "NPPIP-DEMO-1635146281", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2045", "category_id": "88", "name": "노벨 치비 사우어 거북이 과일맛 젤리 구미 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:20.751539", "deleted_at": null,
    images: [{"product_image_id": "2029", "url": "https://ik.imagekit.io/oishidam/products/28cd6a83-c379-4d50-906d-5573f00658a2_Umsy7_Q48z.webp", "alt_text": "노벨 치비 사우어 거북이 과일맛 젤리 구미 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2031", "sku_code": "NPPIP-DEMO-1740449808", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2046", "category_id": "89", "name": "후지야 베스킨라빈스31 팝핑밀키맛 초콜릿 15개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:20.830867", "deleted_at": null,
    images: [{"product_image_id": "2030", "url": "https://ik.imagekit.io/oishidam/products/cfca8ab0-af36-4a8f-b10a-e53d37497f7a_lVfnJCKJR.webp", "alt_text": "후지야 베스킨라빈스31 팝핑밀키맛 초콜릿 15개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2032", "sku_code": "NPPIP-DEMO-17905730588", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2047", "category_id": "79", "name": "코이케야 프라이드 포테토 100% 유자 시치미 야키토리맛 52g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2031", "url": "https://ik.imagekit.io/oishidam/products/7a726759-434f-4ce9-912f-f3da15dbf772_1o5NDhL6n.webp", "alt_text": "코이케야 프라이드 포테토 100% 유자 시치미 야키토리맛 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2033", "sku_code": "NPPIP-DEMO-1788502061", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2048", "category_id": "94", "name": "오마이 전설의 가라아게 튀김가루 오리지널 간장맛 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:22.55126", "deleted_at": null,
    images: [{"product_image_id": "2032", "url": "https://ik.imagekit.io/oishidam/products/62596fc8-18ff-4678-8e1b-c10ef567ce09_Ypste9hkb.webp", "alt_text": "오마이 전설의 가라아게 튀김가루 오리지널 간장맛 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2034", "sku_code": "NPPIP-DEMO-1785744987", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2049", "category_id": "94", "name": "닛푼 전설의 가라아게 튀김가루 마늘 풍미 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:22.689108", "deleted_at": null,
    images: [{"product_image_id": "2033", "url": "https://ik.imagekit.io/oishidam/products/2acee10e-ee36-4eb5-85b1-0553a3084983_4ArIs9gve.webp", "alt_text": "닛푼 전설의 가라아게 튀김가루 마늘 풍미 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2035", "sku_code": "NPPIP-DEMO-1785744893", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2050", "category_id": "89", "name": "모리나가 초코볼 립톤 밀크티맛 95g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:22.830871", "deleted_at": null,
    images: [{"product_image_id": "2034", "url": "https://ik.imagekit.io/oishidam/products/e186082e-a608-431e-81c5-bebd1c91636d_jbnueCBD9.webp", "alt_text": "모리나가 초코볼 립톤 밀크티맛 95g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2036", "sku_code": "NPPIP-DEMO-1784093887", "variant_name": "기본", "option_values": {}, "price": 5250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2051", "category_id": "87", "name": "아사히 민티아 브리즈 후레쉬 포도", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:23.984124", "deleted_at": null,
    images: [{"product_image_id": "2035", "url": "https://ik.imagekit.io/oishidam/products/b4908f00-34cc-4e62-9468-bd9176f2a4e6_RiMQuRD7K.webp", "alt_text": "아사히 민티아 브리즈 후레쉬 포도", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2037", "sku_code": "NPPIP-DEMO-178236569121", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2052", "category_id": "66", "name": "세븐일레븐 포테이토칩스 두껍게 썬 이시가키 소금맛 감자칩 대용량 150g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:24.481992", "deleted_at": null,
    images: [{"product_image_id": "2036", "url": "https://ik.imagekit.io/oishidam/products/90357ca8-73de-47c6-8a8b-c3ed30967a27_xqDan1HrT.webp", "alt_text": "세븐일레븐 포테이토칩스 두껍게 썬 이시가키 소금맛 감자칩 대용량 150g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2038", "sku_code": "NPPIP-DEMO-1781750086", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2053", "category_id": "93", "name": "나가타니엔 후리카케 유자 후추 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:24.652138", "deleted_at": null,
    images: [{"product_image_id": "2038", "url": "https://ik.imagekit.io/oishidam/products/f92a4b19-9266-4cbc-a63e-48b66732b71c_Ealn4iwh32.webp", "alt_text": "나가타니엔 후리카케 유자 후추 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2039", "sku_code": "NPPIP-DEMO-178113998058", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2054", "category_id": "93", "name": "마루미야 소프트 후리카케 소고기 조림 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:24.558997", "deleted_at": null,
    images: [{"product_image_id": "2037", "url": "https://ik.imagekit.io/oishidam/products/7649ee29-3b84-4d9d-8049-44217526c79e_O4qfuNv6h.webp", "alt_text": "마루미야 소프트 후리카케 소고기 조림 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2040", "sku_code": "NPPIP-DEMO-178113995611", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2055", "category_id": "88", "name": "요코오데일리푸드 스밋코구라시 곤약젤리 샤인머스캣맛 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:25.712724", "deleted_at": null,
    images: [{"product_image_id": "2039", "url": "https://ik.imagekit.io/oishidam/products/64bff398-65b6-418e-8e4d-740322d9954c_7PNW9VxPD.webp", "alt_text": "요코오데일리푸드 스밋코구라시 곤약젤리 샤인머스캣맛 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2041", "sku_code": "NPPIP-DEMO-1781053099", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2056", "category_id": "65", "name": "내츄럴 로손 캐나다산 메이플 향이 나는 믹스넛 33g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:26.194013", "deleted_at": null,
    images: [{"product_image_id": "2040", "url": "https://ik.imagekit.io/oishidam/products/e5e5e16d-7bb2-48d8-934c-ed445b2dc30e_Y_J6Dl4N-.webp", "alt_text": "내츄럴 로손 캐나다산 메이플 향이 나는 믹스넛 33g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2042", "sku_code": "NPPIP-DEMO-1776912698112", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2057", "category_id": "65", "name": "로손 새우 미림 구이 바삭한 과자 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:26.316102", "deleted_at": null,
    images: [{"product_image_id": "2042", "url": "https://ik.imagekit.io/oishidam/products/dbdfb102-9f8c-4867-bf5e-04c1f6922e97_FAGuQWXum.webp", "alt_text": "로손 새우 미림 구이 바삭한 과자 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2043", "sku_code": "NPPIP-DEMO-177691268846", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2058", "category_id": "65", "name": "로손 잣토리데카이 대용량 카라멜 콘 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:26.2848", "deleted_at": null,
    images: [{"product_image_id": "2041", "url": "https://ik.imagekit.io/oishidam/products/d6263f9f-a241-4adb-97c9-11a704304403_-jwMB5TCG.webp", "alt_text": "로손 잣토리데카이 대용량 카라멜 콘 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2044", "sku_code": "NPPIP-DEMO-177691268631", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2059", "category_id": "67", "name": "패밀리마트 바삭한 크런치 초콜릿 58g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:27.576572", "deleted_at": null,
    images: [{"product_image_id": "2043", "url": "https://ik.imagekit.io/oishidam/products/65ae0d0b-8328-4ea9-9042-fff13adc5fd9_3tTtQdf-g.webp", "alt_text": "패밀리마트 바삭한 크런치 초콜릿 58g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2045", "sku_code": "NPPIP-DEMO-1770786075", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2060", "category_id": "67", "name": "패밀리마트 6종의 초콜릿 과자 아소토 버라이어티 115g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:28.059318", "deleted_at": null,
    images: [{"product_image_id": "2044", "url": "https://ik.imagekit.io/oishidam/products/a8e9584f-d767-45ce-a526-7652d7851499_RgA0ZCkX3.webp", "alt_text": "패밀리마트 6종의 초콜릿 과자 아소토 버라이어티 115g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2046", "sku_code": "NPPIP-DEMO-1770782089", "variant_name": "기본", "option_values": {}, "price": 7100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2061", "category_id": "67", "name": "패밀리마트 바카우케 진한 4가지 치즈맛 센베이 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:28.137192", "deleted_at": null,
    images: [{"product_image_id": "2045", "url": "https://ik.imagekit.io/oishidam/products/c143584f-28ca-4fd8-8861-68c12e19731f_nXA3AuHx_t.webp", "alt_text": "패밀리마트 바카우케 진한 4가지 치즈맛 센베이 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2047", "sku_code": "NPPIP-DEMO-1770257162", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2062", "category_id": "67", "name": "패밀리마트 스틱 포테토 매운 칠리페퍼맛 감자칩 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:28.276286", "deleted_at": null,
    images: [{"product_image_id": "2046", "url": "https://ik.imagekit.io/oishidam/products/db8acc00-119a-496a-9c2c-bf3db66c978e_zIjFretLo.webp", "alt_text": "패밀리마트 스틱 포테토 매운 칠리페퍼맛 감자칩 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2048", "sku_code": "NPPIP-DEMO-1770253107", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2063", "category_id": "67", "name": "패밀리마트 삿포로포테토 바비큐맛 과자 64g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:29.483106", "deleted_at": null,
    images: [{"product_image_id": "2047", "url": "https://ik.imagekit.io/oishidam/products/d3cab0e6-3f3b-4a61-b2b1-fee6d214dc0a_pFpIdCLbC.webp", "alt_text": "패밀리마트 삿포로포테토 바비큐맛 과자 64g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2049", "sku_code": "NPPIP-DEMO-1770252247", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2064", "category_id": "88", "name": "카바야 터프 구미 하드 젤리 아소토 메가사이즈 203g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:29.991023", "deleted_at": null,
    images: [{"product_image_id": "2048", "url": "https://ik.imagekit.io/oishidam/products/b31386bf-4c10-45b9-af16-d8213069ff04_17DM0adOG.webp", "alt_text": "카바야 터프 구미 하드 젤리 아소토 메가사이즈 203g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2050", "sku_code": "NPPIP-DEMO-1754269528", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2065", "category_id": "79", "name": "가루비 타코야끼테이 일본 타코야키 과자 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:30.042419", "deleted_at": null,
    images: [{"product_image_id": "2049", "url": "https://ik.imagekit.io/oishidam/products/66e1040b-39af-40d3-9bf8-c27fdb50c882_TF3OiUkzD.webp", "alt_text": "가루비 타코야끼테이 일본 타코야키 과자 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2051", "sku_code": "NPPIP-DEMO-1742972243", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2066", "category_id": "79", "name": "카메다제과 김과자 땅콩 전병 쌀과자 4봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:30.130384", "deleted_at": null,
    images: [{"product_image_id": "2050", "url": "https://ik.imagekit.io/oishidam/products/2b7cbad6-6bd6-448b-9b74-cf42dfcb5f5e_A4ATt1fbG.webp", "alt_text": "카메다제과 김과자 땅콩 전병 쌀과자 4봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2052", "sku_code": "NPPIP-DEMO-1742970307", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2067", "category_id": "87", "name": "사쿠마 이치고 밀크 딸기 우유 사탕 캔디 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:31.344016", "deleted_at": null,
    images: [{"product_image_id": "2051", "url": "https://ik.imagekit.io/oishidam/products/8940db07-cc85-46e1-9c8f-3f28e8e00387_453wRPoEp.webp", "alt_text": "사쿠마 이치고 밀크 딸기 우유 사탕 캔디 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2053", "sku_code": "NPPIP-DEMO-1740449577", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2068", "category_id": "69", "name": "하우스 홋카이도 스튜 옥수수 크림 180g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:31.982961", "deleted_at": null,
    images: [{"product_image_id": "2053", "url": "https://ik.imagekit.io/oishidam/products/00093374-7c36-4c32-924d-1aa89766e59c_ziQn2EyaK.webp", "alt_text": "하우스 홋카이도 스튜 옥수수 크림 180g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2054", "sku_code": "NPPIP-DEMO-1660286234", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2069", "category_id": "83", "name": "이토엔 오이오차 프리미엄 호지차 티백 20봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:31.770375", "deleted_at": null,
    images: [{"product_image_id": "2052", "url": "https://ik.imagekit.io/oishidam/products/3a1c7eec-1477-4cb9-b6f1-cf41117a9067_GGQllAoH1.webp", "alt_text": "이토엔 오이오차 프리미엄 호지차 티백 20봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2055", "sku_code": "NPPIP-DEMO-1635837128", "variant_name": "기본", "option_values": {}, "price": 6900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2070", "category_id": "80", "name": "[ISHIYA]시로이코이비토 화이트 24개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:32.586433", "deleted_at": null,
    images: [{"product_image_id": "2054", "url": "https://ik.imagekit.io/oishidam/products/1c486d83-12e3-4214-ad03-aeb6775f6281_ee2yQ-y6L.png", "alt_text": "[ISHIYA]시로이코이비토 화이트 24개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2056", "sku_code": "NPPIP-DEMO-1626330090", "variant_name": "기본", "option_values": {}, "price": 29000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2071", "category_id": "79", "name": "카스타드 케이크 파티 팩 9개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:33.264767", "deleted_at": null,
    images: [{"product_image_id": "2055", "url": "https://ik.imagekit.io/oishidam/products/171f4eee-da3b-41ce-89fd-5c433731e2ba_ir6AUfYF9.webp", "alt_text": "카스타드 케이크 파티 팩 9개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2057", "sku_code": "NPPIP-DEMO-1626057811", "variant_name": "기본", "option_values": {}, "price": 5800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2072", "category_id": "87", "name": "모리나가 하이츄 우마이츄 아소트 과일맛 68g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:33.700582", "deleted_at": null,
    images: [{"product_image_id": "2056", "url": "https://ik.imagekit.io/oishidam/products/9b3b1448-5b4d-4a6c-bf1e-ddc5b05363c9_BH4rI838i.webp", "alt_text": "모리나가 하이츄 우마이츄 아소트 과일맛 68g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2058", "sku_code": "NPPIP-DEMO-17907501244", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2073", "category_id": "87", "name": "후지야 밀키 베스킨라빈스31 밀키쇼트케이크맛 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:33.946739", "deleted_at": null,
    images: [{"product_image_id": "2057", "url": "https://ik.imagekit.io/oishidam/products/2105870b-fde5-472d-a749-d052032fc3d1_p_kbL9FCE.webp", "alt_text": "후지야 밀키 베스킨라빈스31 밀키쇼트케이크맛 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2059", "sku_code": "NPPIP-DEMO-1790558203", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2074", "category_id": "72", "name": "야마다이 뉴터치 오사카 카스 우동 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:34.582223", "deleted_at": null,
    images: [{"product_image_id": "2058", "url": "https://ik.imagekit.io/oishidam/products/9b7df608-11af-4be5-8ad6-ffaac9096f43_dtD0INZ_OQ.webp", "alt_text": "야마다이 뉴터치 오사카 카스 우동 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2060", "sku_code": "NPPIP-DEMO-1790046549", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2075", "category_id": "75", "name": "리켄 논오일 청시소 드레싱 소스 190ml", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:35.236649", "deleted_at": null,
    images: [{"product_image_id": "2059", "url": "https://ik.imagekit.io/oishidam/products/64a5bfa7-93b2-47b5-8a12-d3fab58562ce_xRn-_F86m.webp", "alt_text": "리켄 논오일 청시소 드레싱 소스 190ml", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2061", "sku_code": "NPPIP-DEMO-1786074743", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2076", "category_id": "87", "name": "반다이 피크민 솔티 소금 라무네 태블릿 사탕 라이치맛 39g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:35.424324", "deleted_at": null,
    images: [{"product_image_id": "2060", "url": "https://ik.imagekit.io/oishidam/products/035c2f39-db84-4cf7-be46-13b5c2e395bc_1L4PQ7sWC.webp", "alt_text": "반다이 피크민 솔티 소금 라무네 태블릿 사탕 라이치맛 39g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2062", "sku_code": "NPPIP-DEMO-1785225255", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2077", "category_id": "79", "name": "부르봉 파키라 초코 과자 6봉입 10개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:35.93542", "deleted_at": null,
    images: [{"product_image_id": "2061", "url": "https://ik.imagekit.io/oishidam/products/681c04ae-6670-46ee-bbde-9012a19a880a_dvtZqT2XF.webp", "alt_text": "부르봉 파키라 초코 과자 6봉입 10개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2063", "sku_code": "NPPIP-DEMO-1784699955", "variant_name": "기본", "option_values": {}, "price": 23000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2078", "category_id": "69", "name": "닛신 하야시라이스 데미그라스 86g 일본 컵밥 즉석식품", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:36.340396", "deleted_at": null,
    images: [{"product_image_id": "2062", "url": "https://ik.imagekit.io/oishidam/products/d81e0646-6faf-427a-8d1b-73909d047250_Yf7zTrF3S.webp", "alt_text": "닛신 하야시라이스 데미그라스 86g 일본 컵밥 즉석식품", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2064", "sku_code": "NPPIP-DEMO-1784679602", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2079", "category_id": "94", "name": "S&B 에스비 매직 솔트 오리지널 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:37.104566", "deleted_at": null,
    images: [{"product_image_id": "2063", "url": "https://ik.imagekit.io/oishidam/products/074a56cd-e66b-4c53-afa6-f42a7b641b24_ViUrkJPyT.webp", "alt_text": "S&B 에스비 매직 솔트 오리지널 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2065", "sku_code": "NPPIP-DEMO-17845306303", "variant_name": "기본", "option_values": {}, "price": 9500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2080", "category_id": "90", "name": "모리나가 밀크 캬라멜 립톤 밀트티맛 69g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:37.337554", "deleted_at": null,
    images: [{"product_image_id": "2064", "url": "https://ik.imagekit.io/oishidam/products/c4c72c81-1cba-4e72-800b-30e3cece6658_Dt5pWTw1l.webp", "alt_text": "모리나가 밀크 캬라멜 립톤 밀트티맛 69g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2066", "sku_code": "NPPIP-DEMO-1784093155", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2081", "category_id": "72", "name": "묘조 챠루메라 미아자키 매운 쇼유 라멘 96g 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:37.852705", "deleted_at": null,
    images: [{"product_image_id": "2065", "url": "https://ik.imagekit.io/oishidam/products/3c38ba6c-aaca-4be8-92e0-be53d4dee059_sONcc2jcd.webp", "alt_text": "묘조 챠루메라 미아자키 매운 쇼유 라멘 96g 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2067", "sku_code": "NPPIP-DEMO-1783920278", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2082", "category_id": "74", "name": "묘조 중화삼매 국물 없는 스촨 마라 볶음면 117g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2066", "url": "https://ik.imagekit.io/oishidam/products/b212dad6-c019-4865-9069-7213a1cfce97_XEy4fdRoz.webp", "alt_text": "묘조 중화삼매 국물 없는 스촨 마라 볶음면 117g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2068", "sku_code": "NPPIP-DEMO-1782798266", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2083", "category_id": "88", "name": "노벨 소르베 거봉맛 구미 젤리 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:38.86415", "deleted_at": null,
    images: [{"product_image_id": "2067", "url": "https://ik.imagekit.io/oishidam/products/a7dc4bcc-770b-481b-b1bf-857350d270a5_rtfSWX6_B.webp", "alt_text": "노벨 소르베 거봉맛 구미 젤리 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2069", "sku_code": "NPPIP-DEMO-1782695998", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2084", "category_id": "87", "name": "아사히 민티아 메가 콜드", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:39.471215", "deleted_at": null,
    images: [{"product_image_id": "2068", "url": "https://ik.imagekit.io/oishidam/products/683aeb40-463d-46a4-b49b-3622050e8025_bZ8BjhYh-g.webp", "alt_text": "아사히 민티아 메가 콜드", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2070", "sku_code": "NPPIP-DEMO-178236569328", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2085", "category_id": "87", "name": "아사히 민티아 메가 하드", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:39.594629", "deleted_at": null,
    images: [{"product_image_id": "2069", "url": "https://ik.imagekit.io/oishidam/products/33446b9e-e0ed-4309-bbe6-b8958842ce7f_9EqrBriVf.webp", "alt_text": "아사히 민티아 메가 하드", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2071", "sku_code": "NPPIP-DEMO-178236569327", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2086", "category_id": "87", "name": "아사히 민티아 브리즈 후레쉬 복숭아", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:40.146209", "deleted_at": null,
    images: [{"product_image_id": "2070", "url": "https://ik.imagekit.io/oishidam/products/97151315-e7b1-439e-9f1c-cb7c2e8ee59b_FEWlLOX96.webp", "alt_text": "아사히 민티아 브리즈 후레쉬 복숭아", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2072", "sku_code": "NPPIP-DEMO-178236569020", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2087", "category_id": "87", "name": "아사히 민티아 와일드&쿨", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:40.545554", "deleted_at": null,
    images: [{"product_image_id": "2071", "url": "https://ik.imagekit.io/oishidam/products/85a2e057-d697-45dc-9b08-fee1e189f91b_n0JeXXaxl.webp", "alt_text": "아사히 민티아 와일드&쿨", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2073", "sku_code": "NPPIP-DEMO-17823656825", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2088", "category_id": "90", "name": "모리나가 밀크 캬라멜 연유맛 69g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:41.441591", "deleted_at": null,
    images: [{"product_image_id": "2072", "url": "https://ik.imagekit.io/oishidam/products/97c03c9d-9c61-4115-bea2-317ec59bd953_BLLE_iNIY.webp", "alt_text": "모리나가 밀크 캬라멜 연유맛 69g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2074", "sku_code": "NPPIP-DEMO-1781681298", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2089", "category_id": "93", "name": "마루미야 포켓몬 후리카케 미니팩 20봉지 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:41.47664", "deleted_at": null,
    images: [{"product_image_id": "2073", "url": "https://ik.imagekit.io/oishidam/products/6b900318-45c5-4b01-a64b-159c9bc3063e_17i9c2tVi.webp", "alt_text": "마루미야 포켓몬 후리카케 미니팩 20봉지 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2075", "sku_code": "NPPIP-DEMO-178113996022", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2090", "category_id": "89", "name": "후지야 홈파이 초코다라케 오키나와편 흑당 초콜릿 쿠키 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:42.175578", "deleted_at": null,
    images: [{"product_image_id": "2074", "url": "https://ik.imagekit.io/oishidam/products/e54f06f1-5861-494a-87df-00c31dde5e92_sFlnVsK7e.webp", "alt_text": "후지야 홈파이 초코다라케 오키나와편 흑당 초콜릿 쿠키 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2076", "sku_code": "NPPIP-DEMO-1781069719", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2091", "category_id": "65", "name": "로손 과일과 견과류를 넣은 과일&넛츠 일본 안주 41g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:42.28412", "deleted_at": null,
    images: [{"product_image_id": "2075", "url": "https://ik.imagekit.io/oishidam/products/ccfc5110-6810-48d4-9b16-43e28be5ea7f_f4YQuSm9CT.webp", "alt_text": "로손 과일과 견과류를 넣은 과일&넛츠 일본 안주 41g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2077", "sku_code": "NPPIP-DEMO-1776912697105", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2092", "category_id": "65", "name": "로손 츠부모치 피넛츠 일본 안주 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:43.07679", "deleted_at": null,
    images: [{"product_image_id": "2076", "url": "https://ik.imagekit.io/oishidam/products/9f5e1fc6-f1e5-42c7-a1d2-f2a22aadf50f_S7qw0Zjsv.webp", "alt_text": "로손 츠부모치 피넛츠 일본 안주 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2078", "sku_code": "NPPIP-DEMO-1776912696100", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2093", "category_id": "65", "name": "로손 미니 세토시오 새우 소금맛 과자 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:43.139303", "deleted_at": null,
    images: [{"product_image_id": "2077", "url": "https://ik.imagekit.io/oishidam/products/9dc8c287-e1d0-4868-9a8c-04f555216e6c_6Hf6xBpRQ.webp", "alt_text": "로손 미니 세토시오 새우 소금맛 과자 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2079", "sku_code": "NPPIP-DEMO-177691268735", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2094", "category_id": "79", "name": "오사카마에다제과 5연 미니 타마고 보로 16g 5팩 일본과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:43.981951", "deleted_at": null,
    images: [{"product_image_id": "2078", "url": "https://ik.imagekit.io/oishidam/products/6cf32d1c-961d-423d-88f9-27907ef5ac9b_NO5qRl4sF.webp", "alt_text": "오사카마에다제과 5연 미니 타마고 보로 16g 5팩 일본과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2080", "sku_code": "NPPIP-DEMO-1776754217", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2095", "category_id": "79", "name": "가루비 후루그라볼 딸기우유맛 그래놀라 26g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:44.198478", "deleted_at": null,
    images: [{"product_image_id": "2079", "url": "https://ik.imagekit.io/oishidam/products/e9f9a79f-b7b3-459d-be15-78a905234cec_niVlf-ln0.webp", "alt_text": "가루비 후루그라볼 딸기우유맛 그래놀라 26g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2081", "sku_code": "NPPIP-DEMO-1776229716", "variant_name": "기본", "option_values": {}, "price": 2550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2096", "category_id": "89", "name": "부르봉 알포트 미니 초콜릿 오리지널 패밀리사이즈 147g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:44.991128", "deleted_at": null,
    images: [{"product_image_id": "2081", "url": "https://ik.imagekit.io/oishidam/products/b7b8a532-3477-4071-ae60-b6415f5a6399_e3IRX47P6.webp", "alt_text": "부르봉 알포트 미니 초콜릿 오리지널 패밀리사이즈 147g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2082", "sku_code": "NPPIP-DEMO-17742472674", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2097", "category_id": "66", "name": "세븐일레븐 오곡 초콜릿 스낵 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:44.802998", "deleted_at": null,
    images: [{"product_image_id": "2080", "url": "https://ik.imagekit.io/oishidam/products/f2ba9221-9ec3-4cf1-ad7d-70eebde9352b_7Q5-5j4R3.webp", "alt_text": "세븐일레븐 오곡 초콜릿 스낵 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2083", "sku_code": "NPPIP-DEMO-177329836455", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2098", "category_id": "66", "name": "세븐일레븐 피너츠 아게 땅콩 쌀과자 63g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:45.629265", "deleted_at": null,
    images: [{"product_image_id": "2082", "url": "https://ik.imagekit.io/oishidam/products/d6c67ce2-6443-41e1-ac65-5a02183f552b_dOmk1pLKR.webp", "alt_text": "세븐일레븐 피너츠 아게 땅콩 쌀과자 63g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2084", "sku_code": "NPPIP-DEMO-177329834916", "variant_name": "기본", "option_values": {}, "price": 3050, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2099", "category_id": "66", "name": "세븐일레븐 씨없이 말린 시큼한 우메보시 매실 12g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:45.863119", "deleted_at": null,
    images: [{"product_image_id": "2083", "url": "https://ik.imagekit.io/oishidam/products/c3cc2476-cfa2-4fc8-ad37-89a9a6b18af8_bMkC4kARO.webp", "alt_text": "세븐일레븐 씨없이 말린 시큼한 우메보시 매실 12g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2085", "sku_code": "NPPIP-DEMO-17732983423", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2100", "category_id": "67", "name": "패밀리마트 소재의 맛 그대로 세토우치 레몬 필 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:46.875624", "deleted_at": null,
    images: [{"product_image_id": "2084", "url": "https://ik.imagekit.io/oishidam/products/bffa5bda-d4f5-4c48-b9ca-96f8defcf92f_a-8YIJSdy.webp", "alt_text": "패밀리마트 소재의 맛 그대로 세토우치 레몬 필 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2086", "sku_code": "NPPIP-DEMO-1770777641", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2101", "category_id": "67", "name": "패밀리마트 두꺼운 소금 센베이 53g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:47.074395", "deleted_at": null,
    images: [{"product_image_id": "2085", "url": "https://ik.imagekit.io/oishidam/products/a100763f-3e51-4689-87a3-f34d62f0404d_zGcRMem5Z.webp", "alt_text": "패밀리마트 두꺼운 소금 센베이 53g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2087", "sku_code": "NPPIP-DEMO-1770251638", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2102", "category_id": "79", "name": "토하토 캬라멜리치 초코메리제 쿠키 비스킷 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:47.678294", "deleted_at": null,
    images: [{"product_image_id": "2086", "url": "https://ik.imagekit.io/oishidam/products/b6e89b4b-fa2a-4df3-8eec-f152d2ba8ad6_gVHxchpEy.webp", "alt_text": "토하토 캬라멜리치 초코메리제 쿠키 비스킷 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2088", "sku_code": "NPPIP-DEMO-1742968303", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2103", "category_id": "75", "name": "불독 참깨 돈까스 소스 300ml", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:47.678294", "deleted_at": null,
    images: [{"product_image_id": "2087", "url": "https://ik.imagekit.io/oishidam/products/0222604c-acb9-48a2-bdc4-9ee1c576117f_2BP6OJea_.webp", "alt_text": "불독 참깨 돈까스 소스 300ml", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2089", "sku_code": "NPPIP-DEMO-1734660185", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2104", "category_id": "79", "name": "가루비 자가비  Jagabee 살짝 짠맛 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:49.110703", "deleted_at": null,
    images: [{"product_image_id": "2089", "url": "https://ik.imagekit.io/oishidam/products/77f02e3d-11db-4fb8-ab0f-e43b1060a05d_UPM3N7ZhA.webp", "alt_text": "가루비 자가비  Jagabee 살짝 짠맛 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2090", "sku_code": "NPPIP-DEMO-1660286159", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2105", "category_id": "79", "name": "가루비  자가비 Jagabee 살짝 짠맛 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:48.840092", "deleted_at": null,
    images: [{"product_image_id": "2088", "url": "https://ik.imagekit.io/oishidam/products/1b8b5fc6-9833-4d2d-a79f-841aa7ad16b2_I3R-teXiG.webp", "alt_text": "가루비  자가비 Jagabee 살짝 짠맛 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2091", "sku_code": "NPPIP-DEMO-1660286157", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2106", "category_id": "87", "name": "UHA미각당 특농 밀크 캔디 8.2 88g 6개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:49.61516", "deleted_at": null,
    images: [{"product_image_id": "2091", "url": "https://ik.imagekit.io/oishidam/products/4e678dcf-194b-4e35-a7a6-92fc5591c011_FOSqD5Sovy.webp", "alt_text": "UHA미각당 특농 밀크 캔디 8.2 88g 6개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2092", "sku_code": "NPPIP-DEMO-1624879991", "variant_name": "기본", "option_values": {}, "price": 15900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2107", "category_id": "81", "name": "[AGF]블랜디®스틱 녹는 밀크 카페오레 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:49.320311", "deleted_at": null,
    images: [{"product_image_id": "2090", "url": "https://ik.imagekit.io/oishidam/products/4f6439e5-6790-4d79-9d70-8a8e7a3128ce_i1W_0qN8z3.webp", "alt_text": "[AGF]블랜디®스틱 녹는 밀크 카페오레 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2093", "sku_code": "NPPIP-DEMO-1617851527", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2108", "category_id": "75", "name": "스가키야 카라카라우오 신신어 나베 쯔유 매운 전골 소스 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:50.895487", "deleted_at": null,
    images: [{"product_image_id": "2092", "url": "https://ik.imagekit.io/oishidam/products/b599c8a2-76bc-4229-aa11-e0a0ed06c8d9_Q60B6pB0a.webp", "alt_text": "스가키야 카라카라우오 신신어 나베 쯔유 매운 전골 소스 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2094", "sku_code": "NPPIP-DEMO-1770607533", "variant_name": "기본", "option_values": {}, "price": 5350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2109", "category_id": "94", "name": "오타후쿠 스시스 단촛물 초밥 촛물 300ml", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:51.00285", "deleted_at": null,
    images: [{"product_image_id": "2093", "url": "https://ik.imagekit.io/oishidam/products/160ce9be-1398-456b-a81d-d15d8562dfbc_KUl6_ft6C.webp", "alt_text": "오타후쿠 스시스 단촛물 초밥 촛물 300ml", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2095", "sku_code": "NPPIP-DEMO-1719820889", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2110", "category_id": "73", "name": "이치란 꼬불면 치지레멘 돈코츠 라멘 5인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:51.332181", "deleted_at": null,
    images: [{"product_image_id": "2094", "url": "https://ik.imagekit.io/oishidam/products/7437f7bc-3017-4acc-9569-e2a29facb920_dXmqfry-oV.webp", "alt_text": "이치란 꼬불면 치지레멘 돈코츠 라멘 5인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2096", "sku_code": "NPPIP-DEMO-1767678622", "variant_name": "기본", "option_values": {}, "price": 29900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2111", "category_id": "73", "name": "이치란 스트레이트면 돈코츠 라멘 5인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:51.517408", "deleted_at": null,
    images: [{"product_image_id": "2095", "url": "https://ik.imagekit.io/oishidam/products/1c5feafc-b05b-4e7a-95f2-b12cd88be136_cYaTnn-8b.webp", "alt_text": "이치란 스트레이트면 돈코츠 라멘 5인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2097", "sku_code": "NPPIP-DEMO-1767678397", "variant_name": "기본", "option_values": {}, "price": 27000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2112", "category_id": "82", "name": "[AGF]블랜디® 포션 커피 저당 6개입 6개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:53.027024", "deleted_at": null,
    images: [{"product_image_id": "2097", "url": "https://ik.imagekit.io/oishidam/products/b291c11e-03cc-4010-81f6-b4dd746524ff_x9fP5wNkF.webp", "alt_text": "[AGF]블랜디® 포션 커피 저당 6개입 6개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2098", "sku_code": "NPPIP-DEMO-1618212135", "variant_name": "기본", "option_values": {}, "price": 29000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2113", "category_id": "80", "name": "후루타 포켓몬스터 쿠키 126g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:52.918291", "deleted_at": null,
    images: [{"product_image_id": "2096", "url": "https://ik.imagekit.io/oishidam/products/e6d12e26-afa6-4f4a-9606-7dba5e3cbf03_hciOAg4Gt.webp", "alt_text": "후루타 포켓몬스터 쿠키 126g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2099", "sku_code": "NPPIP-DEMO-17936874577", "variant_name": "기본", "option_values": {}, "price": 4550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2114", "category_id": "80", "name": "후루타 산리오 캐릭터즈 초코칩 쿠키 147g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:53.289453", "deleted_at": null,
    images: [{"product_image_id": "2098", "url": "https://ik.imagekit.io/oishidam/products/e8064539-0160-442f-84f5-9d5c96fa88f7_k0c2CHqDP0.webp", "alt_text": "후루타 산리오 캐릭터즈 초코칩 쿠키 147g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2100", "sku_code": "NPPIP-DEMO-17936874576", "variant_name": "기본", "option_values": {}, "price": 4550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2115", "category_id": "79", "name": "토하토 초코비 딸기맛 스낵 18g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:53.398211", "deleted_at": null,
    images: [{"product_image_id": "2099", "url": "https://ik.imagekit.io/oishidam/products/68f0a62c-382d-4aff-904d-c0f9e6f8ea38_QuNLfzGZn.webp", "alt_text": "토하토 초코비 딸기맛 스낵 18g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2101", "sku_code": "NPPIP-DEMO-17936874575", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2116", "category_id": "79", "name": "토하토 캬라멜콘 아마오우 딸기맛 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:55.00158", "deleted_at": null,
    images: [{"product_image_id": "2100", "url": "https://ik.imagekit.io/oishidam/products/450b534f-18f7-4eae-8942-deba0d6d978c_BeVgeXEeH.webp", "alt_text": "토하토 캬라멜콘 아마오우 딸기맛 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2102", "sku_code": "NPPIP-DEMO-17936874574", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2117", "category_id": "89", "name": "후지야 룩 look 초콜릿 딸기 이치고메구리 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:55.004576", "deleted_at": null,
    images: [{"product_image_id": "2101", "url": "https://ik.imagekit.io/oishidam/products/66399a15-8271-494c-a3b2-449b560b7f07_EMrzYXzwpG.webp", "alt_text": "후지야 룩 look 초콜릿 딸기 이치고메구리 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2103", "sku_code": "NPPIP-DEMO-17936874573", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2118", "category_id": "88", "name": "오리히로 곤약젤리 프리미엄 카페 초콜릿 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:55.1575", "deleted_at": null,
    images: [{"product_image_id": "2102", "url": "https://ik.imagekit.io/oishidam/products/e22648d3-9a84-4d16-a253-800e9e1b536a_gqGPuNmdh.webp", "alt_text": "오리히로 곤약젤리 프리미엄 카페 초콜릿 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2104", "sku_code": "NPPIP-DEMO-1793683401", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2119", "category_id": "88", "name": "오리히로 기간 한정 곤약젤리 파우치 딸기 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:55.216281", "deleted_at": null,
    images: [{"product_image_id": "2103", "url": "https://ik.imagekit.io/oishidam/products/ae08711e-058f-4f6d-b50f-83ec3536e369_pLYiVqQaG.webp", "alt_text": "오리히로 기간 한정 곤약젤리 파우치 딸기 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2105", "sku_code": "NPPIP-DEMO-1793683254", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2120", "category_id": "79", "name": "가루비 피자 포테토 치즈 감자칩 포테이토칩 일본 과자 제노베제 바질맛 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:56.715047", "deleted_at": null,
    images: [{"product_image_id": "2104", "url": "https://ik.imagekit.io/oishidam/products/5922f6f5-e960-47d5-bf25-b1b335d5c9ca_VM_f9Dpbf.webp", "alt_text": "가루비 피자 포테토 치즈 감자칩 포테이토칩 일본 과자 제노베제 바질맛 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2106", "sku_code": "NPPIP-DEMO-1793682643", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2121", "category_id": "88", "name": "오리히로 기간 한정 곤약젤리 파우치 포도+딸기 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:57.16295", "deleted_at": null,
    images: [{"product_image_id": "2107", "url": "https://ik.imagekit.io/oishidam/products/8e3882f5-fdbd-4e4b-afee-2e35bd82c4eb_Ivej5yZKs.webp", "alt_text": "오리히로 기간 한정 곤약젤리 파우치 포도+딸기 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2107", "sku_code": "NPPIP-DEMO-1793682727", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2122", "category_id": "88", "name": "메이지 과즙구미 사과 유자맛 믹스 젤리 47g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:56.994113", "deleted_at": null,
    images: [{"product_image_id": "2105", "url": "https://ik.imagekit.io/oishidam/products/7ac16731-4444-4bcf-8a83-2579c1707dfd_7czIquchv.webp", "alt_text": "메이지 과즙구미 사과 유자맛 믹스 젤리 47g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2108", "sku_code": "NPPIP-DEMO-1793682289", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2123", "category_id": "93", "name": "미시마 유카리 후리카케 20g 일본 조미료", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:57.056075", "deleted_at": null,
    images: [{"product_image_id": "2106", "url": "https://ik.imagekit.io/oishidam/products/c3ef4425-7ea7-4f69-a923-593ab970dc00_hCwhD3tFJ.webp", "alt_text": "미시마 유카리 후리카케 20g 일본 조미료", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2109", "sku_code": "NPPIP-DEMO-1793668864", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2124", "category_id": "70", "name": "닛푼 오마이 일식 파스타 갓 타카나 참기름맛 소스 2개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:58.848009", "deleted_at": null,
    images: [{"product_image_id": "2108", "url": "https://ik.imagekit.io/oishidam/products/df7a3a5a-39d6-4884-a545-c1a57218acd6_7qKYWHma4.webp", "alt_text": "닛푼 오마이 일식 파스타 갓 타카나 참기름맛 소스 2개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2110", "sku_code": "NPPIP-DEMO-1793607925", "variant_name": "기본", "option_values": {}, "price": 4600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2125", "category_id": "89", "name": "치로루 초코 금의 나마모찌 키나코맛 초콜릿 30개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:58.872469", "deleted_at": null,
    images: [{"product_image_id": "2109", "url": "https://ik.imagekit.io/oishidam/products/ab0ed450-0250-4d21-a5da-4943d1032e30_dZum491ul.webp", "alt_text": "치로루 초코 금의 나마모찌 키나코맛 초콜릿 30개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2111", "sku_code": "NPPIP-DEMO-1793591302", "variant_name": "기본", "option_values": {}, "price": 17500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2126", "category_id": "89", "name": "치로루 초코 별의 커비 초콜릿 박스 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:58.952725", "deleted_at": null,
    images: [{"product_image_id": "2110", "url": "https://ik.imagekit.io/oishidam/products/ac9f7a20-e2d8-47d7-a5e9-beea1a59846c_Fy2ktj58S.webp", "alt_text": "치로루 초코 별의 커비 초콜릿 박스 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2112", "sku_code": "NPPIP-DEMO-1793591301", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2127", "category_id": "92", "name": "닛신 토로미 죠즈 100g 물에 풀지않고 그대로 사용하는 전분가루", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:16:59.148735", "deleted_at": null,
    images: [{"product_image_id": "2111", "url": "https://ik.imagekit.io/oishidam/products/cde235ed-a408-43de-bd95-b97129dd0556_0JocXBNJG.webp", "alt_text": "닛신 토로미 죠즈 100g 물에 풀지않고 그대로 사용하는 전분가루", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2113", "sku_code": "NPPIP-DEMO-1793588062", "variant_name": "기본", "option_values": {}, "price": 5950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2128", "category_id": "80", "name": "돈키호테 죠네츠 바나나 칩 샌드 과자 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:00.650403", "deleted_at": null,
    images: [{"product_image_id": "2112", "url": "https://ik.imagekit.io/oishidam/products/3a925bbf-468f-400c-8bc9-fbb43024649c_1UMiiv5Mt.webp", "alt_text": "돈키호테 죠네츠 바나나 칩 샌드 과자 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2114", "sku_code": "NPPIP-DEMO-1793254557", "variant_name": "기본", "option_values": {}, "price": 10500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2129", "category_id": "80", "name": "나가토야 치이카와 먼작귀 레몬 쿠키 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:00.913619", "deleted_at": null,
    images: [{"product_image_id": "2114", "url": "https://ik.imagekit.io/oishidam/products/3e2c0fc1-299a-401c-af4b-e6e10c14a066_me1xYYUBL.webp", "alt_text": "나가토야 치이카와 먼작귀 레몬 쿠키 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2115", "sku_code": "NPPIP-DEMO-1793253802", "variant_name": "기본", "option_values": {}, "price": 15000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2130", "category_id": "80", "name": "일본 돈키호테 간장계란밥 소스 타마고카케후 고항노타레 한국풍 간장 타레 112g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:00.913619", "deleted_at": null,
    images: [{"product_image_id": "2113", "url": "https://ik.imagekit.io/oishidam/products/eb5d8bf6-eb37-473e-84ed-3b50c431fe6a_fnEAWMh0w.webp", "alt_text": "일본 돈키호테 간장계란밥 소스 타마고카케후 고항노타레 한국풍 간장 타레 112g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2116", "sku_code": "NPPIP-DEMO-1793252842", "variant_name": "기본", "option_values": {}, "price": 11000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2131", "category_id": "80", "name": "닛신 코코넛 사브레 트리플 넛츠맛 16매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:01.006471", "deleted_at": null,
    images: [{"product_image_id": "2115", "url": "https://ik.imagekit.io/oishidam/products/89d81ddf-139e-4bdb-883d-ab37e12e8ac3_CIZee3JNF.webp", "alt_text": "닛신 코코넛 사브레 트리플 넛츠맛 16매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2117", "sku_code": "NPPIP-DEMO-1793252643", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2132", "category_id": "79", "name": "글리코 프리츠 오사츠 고구마맛 스낵 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:02.482848", "deleted_at": null,
    images: [{"product_image_id": "2116", "url": "https://ik.imagekit.io/oishidam/products/a94e6deb-5242-4f96-b0fd-b50cf5da27c0_4tq4Uq2S4.webp", "alt_text": "글리코 프리츠 오사츠 고구마맛 스낵 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2118", "sku_code": "NPPIP-DEMO-1793252427", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2133", "category_id": "79", "name": "토하토 두꺼운 아미쟈가 소고기 고로케맛 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:02.796307", "deleted_at": null,
    images: [{"product_image_id": "2118", "url": "https://ik.imagekit.io/oishidam/products/009c634f-240f-45ab-b799-7fc3a21a7de0_tM2lBK-Z2.webp", "alt_text": "토하토 두꺼운 아미쟈가 소고기 고로케맛 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2119", "sku_code": "NPPIP-DEMO-17932413635", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2134", "category_id": "89", "name": "후루타 초코에그 별의 커비 제2탄 피규어 포함", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:02.796307", "deleted_at": null,
    images: [{"product_image_id": "2117", "url": "https://ik.imagekit.io/oishidam/products/bc4d179c-2f35-4d75-bbef-c590ddea51a8_3PEB1v0mX.webp", "alt_text": "후루타 초코에그 별의 커비 제2탄 피규어 포함", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2120", "sku_code": "NPPIP-DEMO-17932413636", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2135", "category_id": "89", "name": "모리나가 반숙 다스 스트로베리 쇼콜라 초콜릿 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:02.858132", "deleted_at": null,
    images: [{"product_image_id": "2119", "url": "https://ik.imagekit.io/oishidam/products/7cc42ba8-0628-411b-bab8-50e19c5da43f_gJgXHNvPP.webp", "alt_text": "모리나가 반숙 다스 스트로베리 쇼콜라 초콜릿 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2121", "sku_code": "NPPIP-DEMO-17932413634", "variant_name": "기본", "option_values": {}, "price": 4550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2136", "category_id": "89", "name": "모리나가 반숙 다스 밀크 쇼콜라 초콜릿 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:04.366099", "deleted_at": null,
    images: [{"product_image_id": "2120", "url": "https://ik.imagekit.io/oishidam/products/81d032c1-f8a6-4ebb-bcb5-6dbd840fd116_v6xKM_tyx.webp", "alt_text": "모리나가 반숙 다스 밀크 쇼콜라 초콜릿 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2122", "sku_code": "NPPIP-DEMO-17932413633", "variant_name": "기본", "option_values": {}, "price": 4550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2137", "category_id": "79", "name": "가루비 베지타베루 샐러드맛 미니 4연팩", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:04.74148", "deleted_at": null,
    images: [{"product_image_id": "2121", "url": "https://ik.imagekit.io/oishidam/products/eed8e31e-9171-485a-9338-e071502d7221_C8_44DU9N.webp", "alt_text": "가루비 베지타베루 샐러드맛 미니 4연팩", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2123", "sku_code": "NPPIP-DEMO-1793234956", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2138", "category_id": "80", "name": "긴비스 타베코도부츠 초코비스킷 4개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:04.819642", "deleted_at": null,
    images: [{"product_image_id": "2123", "url": "https://ik.imagekit.io/oishidam/products/38933ab7-a493-4341-ba19-157ab9c76288_AD_vb_fJR.webp", "alt_text": "긴비스 타베코도부츠 초코비스킷 4개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2124", "sku_code": "NPPIP-DEMO-1793235028", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2139", "category_id": "79", "name": "카메다제과 해피탄 미니 스파이스 4연팩 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:04.74148", "deleted_at": null,
    images: [{"product_image_id": "2122", "url": "https://ik.imagekit.io/oishidam/products/647d3ace-0f5f-4941-ac99-0e2cfd451538_tZeaekEapb.webp", "alt_text": "카메다제과 해피탄 미니 스파이스 4연팩 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2125", "sku_code": "NPPIP-DEMO-1793234820", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2140", "category_id": "79", "name": "카메다제과 해피탄 미니 4연팩 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:06.332374", "deleted_at": null,
    images: [{"product_image_id": "2124", "url": "https://ik.imagekit.io/oishidam/products/3434ad38-d516-4ded-b216-825d9f8e9667_ttYVXDcHS.webp", "alt_text": "카메다제과 해피탄 미니 4연팩 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2126", "sku_code": "NPPIP-DEMO-1793234736", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2141", "category_id": "72", "name": "닛신 컵누들 블랙페퍼 클럽 싱가폴 명물 게요리맛 78g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:06.622333", "deleted_at": null,
    images: [{"product_image_id": "2126", "url": "https://ik.imagekit.io/oishidam/products/f86f25d0-7096-44b6-829e-c6adeab22d55_LfoBIw5M4.webp", "alt_text": "닛신 컵누들 블랙페퍼 클럽 싱가폴 명물 게요리맛 78g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2127", "sku_code": "NPPIP-DEMO-1793159295", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2142", "category_id": "72", "name": "산요 삿포로이치방 지역특산 원조 뉴 탄탄멘 본점 감수 탄탄멘 일본 컵라면 94g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:06.626333", "deleted_at": null,
    images: [{"product_image_id": "2125", "url": "https://ik.imagekit.io/oishidam/products/4fa51ef3-bb59-413b-a201-9dea4d9ae131_RZXUp4J3s-.webp", "alt_text": "산요 삿포로이치방 지역특산 원조 뉴 탄탄멘 본점 감수 탄탄멘 일본 컵라면 94g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2128", "sku_code": "NPPIP-DEMO-1793159518", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2143", "category_id": "88", "name": "UHA미각당 모츄 사쿠란보 체리맛 젤리 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:06.717707", "deleted_at": null,
    images: [{"product_image_id": "2127", "url": "https://ik.imagekit.io/oishidam/products/584f478b-4771-4f50-acad-8f47b6573011_WgDguQ2eX.webp", "alt_text": "UHA미각당 모츄 사쿠란보 체리맛 젤리 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2129", "sku_code": "NPPIP-DEMO-1793159036", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2144", "category_id": "87", "name": "UHA 미각당 푸쵸 소프트 캔디 곰돌이 푸 허니유자맛 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:08.232698", "deleted_at": null,
    images: [{"product_image_id": "2128", "url": "https://ik.imagekit.io/oishidam/products/f88700ff-eb56-4e4d-9773-74629a218098_P7c6jprqy.webp", "alt_text": "UHA 미각당 푸쵸 소프트 캔디 곰돌이 푸 허니유자맛 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2130", "sku_code": "NPPIP-DEMO-1793158599", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2145", "category_id": "75", "name": "마루미야 치이카와 오므라이스 소스 녹는 식감 계란 포함 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:08.574923", "deleted_at": null,
    images: [{"product_image_id": "2130", "url": "https://ik.imagekit.io/oishidam/products/e93a1496-6a2c-487b-b94c-d2bbffc53b0f_E6bveDwzJ.webp", "alt_text": "마루미야 치이카와 오므라이스 소스 녹는 식감 계란 포함 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2131", "sku_code": "NPPIP-DEMO-1793068580", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2146", "category_id": "88", "name": "UHA미각당 푸니캬라 구미 치이카와 샤인머스캣 젤리 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:08.46637", "deleted_at": null,
    images: [{"product_image_id": "2129", "url": "https://ik.imagekit.io/oishidam/products/c1fdae6a-3e94-4a02-8b75-5e2f325aaf0f_YU9SMwXWg.webp", "alt_text": "UHA미각당 푸니캬라 구미 치이카와 샤인머스캣 젤리 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2132", "sku_code": "NPPIP-DEMO-1793070013", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2147", "category_id": "74", "name": "이보노이토 수타 소면 상급품 300g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:08.664668", "deleted_at": null,
    images: [{"product_image_id": "2131", "url": "https://ik.imagekit.io/oishidam/products/9b209a2e-0056-4662-883e-7606b575b0b9_8gkoBoIYXb.webp", "alt_text": "이보노이토 수타 소면 상급품 300g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2133", "sku_code": "NPPIP-DEMO-17930677763", "variant_name": "기본", "option_values": {}, "price": 5900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2148", "category_id": "68", "name": "반다이 치이카와 도시락픽 데코픽 캐릭터 도시락 꾸미기 6개입", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다. 식품이 아닌 도시락 꾸미기 소품으로, 카테고리 확인이 필요합니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2132", "url": "https://ik.imagekit.io/oishidam/products/702f1e5c-6ab7-4112-a3f3-2b8b43c1a444_azhr3rvF5.webp", "alt_text": "반다이 치이카와 도시락픽 데코픽 캐릭터 도시락 꾸미기 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2134", "sku_code": "NPPIP-DEMO-1793067250", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2149", "category_id": "79", "name": "토하토 아미쟈가 스모크 치즈맛 감자칩 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:10.377261", "deleted_at": null,
    images: [{"product_image_id": "2133", "url": "https://ik.imagekit.io/oishidam/products/7ffbf78c-eed4-49ac-9490-8082a35e58c2_1RrHslh2f.webp", "alt_text": "토하토 아미쟈가 스모크 치즈맛 감자칩 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2135", "sku_code": "NPPIP-DEMO-17929998776", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2150", "category_id": "79", "name": "가루비 갓파에비센 갈릭 버터맛 새우 과자 64g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:10.636377", "deleted_at": null,
    images: [{"product_image_id": "2135", "url": "https://ik.imagekit.io/oishidam/products/6cd97134-5006-4a23-9dda-2b57f4dd5f63_8qgMh-G-5j.webp", "alt_text": "가루비 갓파에비센 갈릭 버터맛 새우 과자 64g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2136", "sku_code": "NPPIP-DEMO-17929998775", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2151", "category_id": "80", "name": "후지야 홈파이 초코다라케 일본 여행 시로네편 초콜릿 쿠키 86g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:10.62637", "deleted_at": null,
    images: [{"product_image_id": "2134", "url": "https://ik.imagekit.io/oishidam/products/0684b904-1b86-4321-87bd-7206b9d4d9d1_KrU8-iNNn.webp", "alt_text": "후지야 홈파이 초코다라케 일본 여행 시로네편 초콜릿 쿠키 86g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2137", "sku_code": "NPPIP-DEMO-17929998774", "variant_name": "기본", "option_values": {}, "price": 4850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2152", "category_id": "90", "name": "모리나가 소금 캬라멜 버터맛 69g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:11.98062", "deleted_at": null,
    images: [{"product_image_id": "2136", "url": "https://ik.imagekit.io/oishidam/products/5fae4d04-8823-4e50-b4a1-93a796303dbe_CgaXaaPhC.webp", "alt_text": "모리나가 소금 캬라멜 버터맛 69g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2138", "sku_code": "NPPIP-DEMO-17929998773", "variant_name": "기본", "option_values": {}, "price": 3350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2153", "category_id": "88", "name": "부르봉 바운시 구미 샤인머스캣 하드 젤리 82g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:12.251284", "deleted_at": null,
    images: [{"product_image_id": "2137", "url": "https://ik.imagekit.io/oishidam/products/10c0320f-c25e-4a14-a9ec-1dcaa938b229_Th4YQOiZR.webp", "alt_text": "부르봉 바운시 구미 샤인머스캣 하드 젤리 82g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2139", "sku_code": "NPPIP-DEMO-1792992591", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2154", "category_id": "80", "name": "후지야 곰돌이 푸 컨트리맘 쿠키 바닐라 꿀버터맛 16개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:12.649185", "deleted_at": null,
    images: [{"product_image_id": "2139", "url": "https://ik.imagekit.io/oishidam/products/ce53fdce-eeba-4f39-aee7-09e0a8b02bdd_-tcX4Amd5.webp", "alt_text": "후지야 곰돌이 푸 컨트리맘 쿠키 바닐라 꿀버터맛 16개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2140", "sku_code": "NPPIP-DEMO-1792985553", "variant_name": "기본", "option_values": {}, "price": 5350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2155", "category_id": "80", "name": "후지야 곰돌이 푸 홈파이 쿠키 버터 꿀버터맛 26개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:12.52645", "deleted_at": null,
    images: [{"product_image_id": "2138", "url": "https://ik.imagekit.io/oishidam/products/c2a9f875-b9b1-464b-8dfc-f9afda793681_hHU8qM8o0.webp", "alt_text": "후지야 곰돌이 푸 홈파이 쿠키 버터 꿀버터맛 26개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2141", "sku_code": "NPPIP-DEMO-1792985442", "variant_name": "기본", "option_values": {}, "price": 5350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2156", "category_id": "89", "name": "후지야 곰돌이 푸 밀키 소프트 캔디 꿀 버터맛 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:13.680169", "deleted_at": null,
    images: [{"product_image_id": "2140", "url": "https://ik.imagekit.io/oishidam/products/185e2c8f-fd9b-487d-a611-b17d3bb709dd_SbLgNzm7r.webp", "alt_text": "후지야 곰돌이 푸 밀키 소프트 캔디 꿀 버터맛 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2142", "sku_code": "NPPIP-DEMO-1792985311", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2157", "category_id": "74", "name": "후야토우 수제 타마후 일본 모찌 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:14.01873", "deleted_at": null,
    images: [{"product_image_id": "2141", "url": "https://ik.imagekit.io/oishidam/products/2463431a-786a-4f43-bb79-9e9448387551_RF2C5yi7S.webp", "alt_text": "후야토우 수제 타마후 일본 모찌 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2143", "sku_code": "NPPIP-DEMO-17927216013", "variant_name": "기본", "option_values": {}, "price": 18000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2158", "category_id": "72", "name": "에이스쿡 슈퍼컵 곱빼기 초오오모리 농후 돈코츠 간장 라멘 177g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:14.490707", "deleted_at": null,
    images: [{"product_image_id": "2142", "url": "https://ik.imagekit.io/oishidam/products/1b8384fe-6621-436f-9dd1-8003fb3c1f4f_izjCZctMZ.webp", "alt_text": "에이스쿡 슈퍼컵 곱빼기 초오오모리 농후 돈코츠 간장 라멘 177g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2144", "sku_code": "NPPIP-DEMO-17926508385", "variant_name": "기본", "option_values": {}, "price": 4350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2159", "category_id": "72", "name": "에이스쿡 슈퍼컵 1.5배 진한 돈코츠 라멘 109g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:14.722417", "deleted_at": null,
    images: [{"product_image_id": "2143", "url": "https://ik.imagekit.io/oishidam/products/05398c2a-08e7-45fd-91d1-7eb2fc0e1b08_S6mR5xYZu.webp", "alt_text": "에이스쿡 슈퍼컵 1.5배 진한 돈코츠 라멘 109g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2145", "sku_code": "NPPIP-DEMO-17926508384", "variant_name": "기본", "option_values": {}, "price": 4150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2160", "category_id": "72", "name": "에이스쿡 하루사메 스프 당면 낙곱새맛 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:15.500819", "deleted_at": null,
    images: [{"product_image_id": "2144", "url": "https://ik.imagekit.io/oishidam/products/eb3f84e1-8db1-48c0-a688-3fc1a01d394b_p127II-XR.webp", "alt_text": "에이스쿡 하루사메 스프 당면 낙곱새맛 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2146", "sku_code": "NPPIP-DEMO-17926508383", "variant_name": "기본", "option_values": {}, "price": 3150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2161", "category_id": "87", "name": "돈키호테 모리나가 하이츄 복숭아 가득 아소토 77g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:15.997979", "deleted_at": null,
    images: [{"product_image_id": "2145", "url": "https://ik.imagekit.io/oishidam/products/7ac49fa2-9317-4965-9f01-70bab7a944c3_skJW65QzG.webp", "alt_text": "돈키호테 모리나가 하이츄 복숭아 가득 아소토 77g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2147", "sku_code": "NPPIP-DEMO-1792649501", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2162", "category_id": "89", "name": "돈키호테 유우카 티라미수 초콜릿 말차맛 150g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:16.618583", "deleted_at": null,
    images: [{"product_image_id": "2146", "url": "https://ik.imagekit.io/oishidam/products/44dcee9b-6dbc-42e4-a47d-6693d65aa6d9_afajBKCI3.webp", "alt_text": "돈키호테 유우카 티라미수 초콜릿 말차맛 150g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2148", "sku_code": "NPPIP-DEMO-1792647487", "variant_name": "기본", "option_values": {}, "price": 18400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2163", "category_id": "72", "name": "에이스쿡 타테가타 노미호스잇빠이 흑초탄탄멘 컵라멘 일본 컵라면 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:16.759837", "deleted_at": null,
    images: [{"product_image_id": "2147", "url": "https://ik.imagekit.io/oishidam/products/933968b7-fb52-4f13-b789-3627008b0a22_J4bjY7__q.webp", "alt_text": "에이스쿡 타테가타 노미호스잇빠이 흑초탄탄멘 컵라멘 일본 컵라면 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2149", "sku_code": "NPPIP-DEMO-1792639576", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2164", "category_id": "72", "name": "에이스쿡 타테가타 노미호스잇빠이 마라탄탄멘 컵라멘 일본 컵라면 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:17.443633", "deleted_at": null,
    images: [{"product_image_id": "2148", "url": "https://ik.imagekit.io/oishidam/products/65745f3c-2a80-44ae-a58b-38769ff6dca6_aFnDeHRK-.webp", "alt_text": "에이스쿡 타테가타 노미호스잇빠이 마라탄탄멘 컵라멘 일본 컵라면 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2150", "sku_code": "NPPIP-DEMO-1792639478", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2165", "category_id": "72", "name": "에이스쿡 후쿠후쿠사이사이 마라탕 하루사메 당면 일본 컵라면 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:17.906846", "deleted_at": null,
    images: [{"product_image_id": "2149", "url": "https://ik.imagekit.io/oishidam/products/406e508f-7d20-40fe-924d-97cdaf428c3e_01cH7ikzD.webp", "alt_text": "에이스쿡 후쿠후쿠사이사이 마라탕 하루사메 당면 일본 컵라면 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2151", "sku_code": "NPPIP-DEMO-1792639383", "variant_name": "기본", "option_values": {}, "price": 3350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2166", "category_id": "72", "name": "에이스쿡 1.5배 니지산지 콜라보 김치찌개 미소라멘 컵라멘 일본 컵라면 106g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:18.653795", "deleted_at": null,
    images: [{"product_image_id": "2151", "url": "https://ik.imagekit.io/oishidam/products/518145b4-1410-4c98-a07a-98d3aec9d6c1_ZjgNUwMip.webp", "alt_text": "에이스쿡 1.5배 니지산지 콜라보 김치찌개 미소라멘 컵라멘 일본 컵라면 106g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2152", "sku_code": "NPPIP-DEMO-1792639263", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2167", "category_id": "79", "name": "가루비 자가리코 베이컨 저먼 포테이토맛 일본 과자 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:18.39313", "deleted_at": null,
    images: [{"product_image_id": "2150", "url": "https://ik.imagekit.io/oishidam/products/4cfaf06e-7171-408a-9a38-bfe5f28eccec_os1CxA3w4.webp", "alt_text": "가루비 자가리코 베이컨 저먼 포테이토맛 일본 과자 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2153", "sku_code": "NPPIP-DEMO-1792631348", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2168", "category_id": "92", "name": "히가시마루 타마고야키 달걀 계란말이 명인 다시 분말 조미료 4봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:19.570353", "deleted_at": null,
    images: [{"product_image_id": "2152", "url": "https://ik.imagekit.io/oishidam/products/fef51655-b27e-4c7d-bfad-5c5072eeccd7_tIR841ZUu.webp", "alt_text": "히가시마루 타마고야키 달걀 계란말이 명인 다시 분말 조미료 4봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2154", "sku_code": "NPPIP-DEMO-1792552441", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2169", "category_id": "79", "name": "닛신 시스콘 사쿠사쿠링 딸기밀크맛 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:19.740676", "deleted_at": null,
    images: [{"product_image_id": "2153", "url": "https://ik.imagekit.io/oishidam/products/9458a240-e1e0-4b13-8ade-df6d85429ffd_DTGSfw8og.webp", "alt_text": "닛신 시스콘 사쿠사쿠링 딸기밀크맛 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2155", "sku_code": "NPPIP-DEMO-17925509848", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2170", "category_id": "79", "name": "닛신 시스콘 사쿠사쿠링 초코밀크맛 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:20.246967", "deleted_at": null,
    images: [{"product_image_id": "2154", "url": "https://ik.imagekit.io/oishidam/products/00255de1-11cb-468c-b6c3-eac312dda7b2_0JqDa7zmL.webp", "alt_text": "닛신 시스콘 사쿠사쿠링 초코밀크맛 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2156", "sku_code": "NPPIP-DEMO-17925509847", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2171", "category_id": "79", "name": "닛신 시스코 크리스피 초코 후레이크 캬라멜맛 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:20.62784", "deleted_at": null,
    images: [{"product_image_id": "2155", "url": "https://ik.imagekit.io/oishidam/products/2c6a5600-138b-490e-ba83-1592ae761cd9_pqUuICSSO.webp", "alt_text": "닛신 시스코 크리스피 초코 후레이크 캬라멜맛 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2157", "sku_code": "NPPIP-DEMO-17925509846", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2172", "category_id": "79", "name": "닛신 시스코 초코 후레이크 밀크 대용량 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:21.608184", "deleted_at": null,
    images: [{"product_image_id": "2156", "url": "https://ik.imagekit.io/oishidam/products/1a4c664d-8add-4b72-a69f-b2d7d5a029e0_4tbN-zOEA.webp", "alt_text": "닛신 시스코 초코 후레이크 밀크 대용량 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2158", "sku_code": "NPPIP-DEMO-17925509845", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2173", "category_id": "79", "name": "닛신 시스코 초코 후레이크 소금밀크맛 대용량 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:21.700558", "deleted_at": null,
    images: [{"product_image_id": "2157", "url": "https://ik.imagekit.io/oishidam/products/25ae4070-b019-4362-939d-958951b015f7_Hsg9nLuBv.webp", "alt_text": "닛신 시스코 초코 후레이크 소금밀크맛 대용량 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2159", "sku_code": "NPPIP-DEMO-17925509844", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2174", "category_id": "79", "name": "UHA미각당 오사츠도키 특농 밀크맛 40g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2158", "url": "https://ik.imagekit.io/oishidam/products/6c3f3bcd-06f2-4815-98e7-5bfb4d32e8f4_AOYF1JbrK.webp", "alt_text": "UHA미각당 오사츠도키 특농 밀크맛 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2160", "sku_code": "NPPIP-DEMO-17925509843", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2175", "category_id": "70", "name": "나카타니엔 송이버섯 맑은 장국 오스이모노 4개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:22.546029", "deleted_at": null,
    images: [{"product_image_id": "2159", "url": "https://ik.imagekit.io/oishidam/products/305bd8f1-e576-4540-badf-8c9b1588b7b1_nFWLjqzE0S.webp", "alt_text": "나카타니엔 송이버섯 맑은 장국 오스이모노 4개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2161", "sku_code": "NPPIP-DEMO-1792474647", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2176", "category_id": "79", "name": "토하토 포테코 우마시오 소금맛 과자 70g 일본 스낵", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:23.324023", "deleted_at": null,
    images: [{"product_image_id": "2160", "url": "https://ik.imagekit.io/oishidam/products/da6dc9ba-e769-4178-9f3b-b4cbb19a76af_hi34wKSYA.webp", "alt_text": "토하토 포테코 우마시오 소금맛 과자 70g 일본 스낵", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2162", "sku_code": "NPPIP-DEMO-1792474444", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2177", "category_id": "72", "name": "묘조 챠루메라 쇼유 간장 라멘 일본 봉지 라면 5봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:23.681483", "deleted_at": null,
    images: [{"product_image_id": "2161", "url": "https://ik.imagekit.io/oishidam/products/8d585086-b52d-4b7d-af66-bafb6feb20c3_C-SBPqUQX.webp", "alt_text": "묘조 챠루메라 쇼유 간장 라멘 일본 봉지 라면 5봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2163", "sku_code": "NPPIP-DEMO-1792459126", "variant_name": "기본", "option_values": {}, "price": 7900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2178", "category_id": "89", "name": "모리나가 백화의 코에다 잔가지 화이트 초콜릿 11봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:23.836399", "deleted_at": null,
    images: [{"product_image_id": "2162", "url": "https://ik.imagekit.io/oishidam/products/b5084e5d-0636-4639-9374-34d418c0ec05_dmhOeiw5u.webp", "alt_text": "모리나가 백화의 코에다 잔가지 화이트 초콜릿 11봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2164", "sku_code": "NPPIP-DEMO-17923992906", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2179", "category_id": "89", "name": "롯데 포케푸니 셰어팩 포켓몬스터 젤리 112g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:24.287576", "deleted_at": null,
    images: [{"product_image_id": "2163", "url": "https://ik.imagekit.io/oishidam/products/57c527f0-de2b-4fc8-8134-3d9401cd2d36_XC9KSTR2d.webp", "alt_text": "롯데 포케푸니 셰어팩 포켓몬스터 젤리 112g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2165", "sku_code": "NPPIP-DEMO-17923992905", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2180", "category_id": "89", "name": "롯데 프리미엄 가나 티쇼콜라 방순 얼그레이 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:25.221319", "deleted_at": null,
    images: [{"product_image_id": "2164", "url": "https://ik.imagekit.io/oishidam/products/e7378549-3701-4d4e-9560-4daceef0c7a1_TyuDLcvO3.webp", "alt_text": "롯데 프리미엄 가나 티쇼콜라 방순 얼그레이 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2166", "sku_code": "NPPIP-DEMO-17923992904", "variant_name": "기본", "option_values": {}, "price": 5250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2181", "category_id": "89", "name": "롯데 프리미엄 가나 후르츠 쇼콜라 농숙 블러드 오렌지 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:25.548084", "deleted_at": null,
    images: [{"product_image_id": "2165", "url": "https://ik.imagekit.io/oishidam/products/cd8b7b8e-98d9-4f63-9d13-08b88651d9b6_Pnt2EdF4O.webp", "alt_text": "롯데 프리미엄 가나 후르츠 쇼콜라 농숙 블러드 오렌지 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2167", "sku_code": "NPPIP-DEMO-17923992903", "variant_name": "기본", "option_values": {}, "price": 5250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2182", "category_id": "77", "name": "로손 아마즈 이카 오징어 난코츠 안주 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:25.779962", "deleted_at": null,
    images: [{"product_image_id": "2166", "url": "https://ik.imagekit.io/oishidam/products/a8ec195a-4776-4934-ae23-5b0c0b7a19e7_cOnnjJwma.webp", "alt_text": "로손 아마즈 이카 오징어 난코츠 안주 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2168", "sku_code": "NPPIP-DEMO-1792387252", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2183", "category_id": "88", "name": "후지야 쿠로미 페코 콜라보 소다젤리 딸기맛 포도맛 구미 11개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:26.108067", "deleted_at": null,
    images: [{"product_image_id": "2167", "url": "https://ik.imagekit.io/oishidam/products/e04cebb3-1d3e-4b22-b881-54b0524bba0c_Ph3dOw9f5.webp", "alt_text": "후지야 쿠로미 페코 콜라보 소다젤리 딸기맛 포도맛 구미 11개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2169", "sku_code": "NPPIP-DEMO-1792381275", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2184", "category_id": "79", "name": "부르봉 미니 농후 초코 브라우니 쇼콜라 캬라멜맛 106g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:27.149893", "deleted_at": null,
    images: [{"product_image_id": "2168", "url": "https://ik.imagekit.io/oishidam/products/11f755c4-57e9-4cf4-92f5-14f86539d1d8_klqQ31aUH.webp", "alt_text": "부르봉 미니 농후 초코 브라우니 쇼콜라 캬라멜맛 106g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2170", "sku_code": "NPPIP-DEMO-1792381156", "variant_name": "기본", "option_values": {}, "price": 5350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2185", "category_id": "89", "name": "메이지 멜티키스 깊은 캬라멜맛 초콜릿 53g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:27.442277", "deleted_at": null,
    images: [{"product_image_id": "2169", "url": "https://ik.imagekit.io/oishidam/products/70fc2a05-8630-434a-b315-2ef5c747af07_xKl4XWcD4.webp", "alt_text": "메이지 멜티키스 깊은 캬라멜맛 초콜릿 53g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2171", "sku_code": "NPPIP-DEMO-1792381050", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2186", "category_id": "89", "name": "메이지 멜티키스 플루티 진한 딸기맛 초콜릿 53g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:27.690468", "deleted_at": null,
    images: [{"product_image_id": "2170", "url": "https://ik.imagekit.io/oishidam/products/90bff43a-8f68-4db5-8b98-71a67c8a1585_H-ta5oJW-.webp", "alt_text": "메이지 멜티키스 플루티 진한 딸기맛 초콜릿 53g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2172", "sku_code": "NPPIP-DEMO-1792380979", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2187", "category_id": "89", "name": "메이지 멜티키스 프리미엄 쇼콜라 초콜릿 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:28.031154", "deleted_at": null,
    images: [{"product_image_id": "2171", "url": "https://ik.imagekit.io/oishidam/products/c22adeb8-f64d-4091-997c-5ce9cd68edfc_55AlT6mRC.webp", "alt_text": "메이지 멜티키스 프리미엄 쇼콜라 초콜릿 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2173", "sku_code": "NPPIP-DEMO-1792380886", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2188", "category_id": "75", "name": "불독 츠키시마 아고다시맛 몬자야끼 만들기 재료 60g 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:29.101598", "deleted_at": null,
    images: [{"product_image_id": "2172", "url": "https://ik.imagekit.io/oishidam/products/1ee7ddc4-f95d-4ac0-b348-63074fa31d42_0aVJ4VNqI.webp", "alt_text": "불독 츠키시마 아고다시맛 몬자야끼 만들기 재료 60g 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2174", "sku_code": "NPPIP-DEMO-1792047684", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2189", "category_id": "75", "name": "불독 츠키시마 모찌 명란 몬자야끼 소스맛 만들기 재료 106g 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:29.335543", "deleted_at": null,
    images: [{"product_image_id": "2173", "url": "https://ik.imagekit.io/oishidam/products/2a871a77-4f56-4936-b1c8-586546cb3af7_CLgARx9mi.webp", "alt_text": "불독 츠키시마 모찌 명란 몬자야끼 소스맛 만들기 재료 106g 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2175", "sku_code": "NPPIP-DEMO-1792047608", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2190", "category_id": "75", "name": "불독 츠키시마 몬자야키 소스맛 몬자야끼 만들기 재료 81.3g 2인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:29.572052", "deleted_at": null,
    images: [{"product_image_id": "2174", "url": "https://ik.imagekit.io/oishidam/products/0518605e-19b3-47fc-86d5-40de1821606d_73g7bCoKj.webp", "alt_text": "불독 츠키시마 몬자야키 소스맛 몬자야끼 만들기 재료 81.3g 2인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2176", "sku_code": "NPPIP-DEMO-1792047376", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2191", "category_id": "79", "name": "산코제와 유키노야도 밀크볼 캬라멜 애플맛 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:29.990564", "deleted_at": null,
    images: [{"product_image_id": "2175", "url": "https://ik.imagekit.io/oishidam/products/80d032b7-1df5-4542-a9b6-e9bb8bbb15f7_zqVQ6ri3H.webp", "alt_text": "산코제와 유키노야도 밀크볼 캬라멜 애플맛 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2177", "sku_code": "NPPIP-DEMO-1792028226", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2192", "category_id": "89", "name": "부르봉 알포트 바닐라 화이트 초코맛 126g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:31.060838", "deleted_at": null,
    images: [{"product_image_id": "2177", "url": "https://ik.imagekit.io/oishidam/products/9be1b4b0-5757-4de0-9666-61605c6856af_fzEJgRGsM.webp", "alt_text": "부르봉 알포트 바닐라 화이트 초코맛 126g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2178", "sku_code": "NPPIP-DEMO-17919656386", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2193", "category_id": "89", "name": "후지야 컨트리맘 시로지와루 초코쿠키 82g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:30.999069", "deleted_at": null,
    images: [{"product_image_id": "2176", "url": "https://ik.imagekit.io/oishidam/products/7d557e25-be65-41d0-835e-cd7667621a20_kY5UtSF7U.webp", "alt_text": "후지야 컨트리맘 시로지와루 초코쿠키 82g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2179", "sku_code": "NPPIP-DEMO-17919656375", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2194", "category_id": "79", "name": "부르봉 프리미엄 루만도 북해도 밀크맛 9개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:31.498524", "deleted_at": null,
    images: [{"product_image_id": "2178", "url": "https://ik.imagekit.io/oishidam/products/40403a67-dd69-42ef-b3f6-bbf58354dd5d_6taA9X3Zq.webp", "alt_text": "부르봉 프리미엄 루만도 북해도 밀크맛 9개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2180", "sku_code": "NPPIP-DEMO-17919656374", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2195", "category_id": "79", "name": "메이지 키노코노야마 타케노코노사토 모두의 블랙 2종 어소트 92g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:31.901761", "deleted_at": null,
    images: [{"product_image_id": "2179", "url": "https://ik.imagekit.io/oishidam/products/45568e79-0439-435c-a3fa-6f1d2f45bca0_fltoOlCFx.webp", "alt_text": "메이지 키노코노야마 타케노코노사토 모두의 블랙 2종 어소트 92g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2181", "sku_code": "NPPIP-DEMO-17919656373", "variant_name": "기본", "option_values": {}, "price": 4750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2196", "category_id": "79", "name": "가루비 카타아게 포테토 유즈코쇼맛 감자칩 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:33.073992", "deleted_at": null,
    images: [{"product_image_id": "2181", "url": "https://ik.imagekit.io/oishidam/products/1b3cb1cb-a199-43bf-895c-d08bd4a6694a_weWeYo1bz.webp", "alt_text": "가루비 카타아게 포테토 유즈코쇼맛 감자칩 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2182", "sku_code": "NPPIP-DEMO-1791959373", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2197", "category_id": "79", "name": "가루비 미노 밤맛 스낵 일본 과자 26g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:32.795355", "deleted_at": null,
    images: [{"product_image_id": "2180", "url": "https://ik.imagekit.io/oishidam/products/b3b8ab52-88ec-4056-81f3-9f7dc6cd150e_4CHfunDthx.webp", "alt_text": "가루비 미노 밤맛 스낵 일본 과자 26g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2183", "sku_code": "NPPIP-DEMO-1791959299", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2198", "category_id": "79", "name": "가루비 미노 사츠마이모 고구마맛 스낵 일본 과자 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:33.256057", "deleted_at": null,
    images: [{"product_image_id": "2182", "url": "https://ik.imagekit.io/oishidam/products/97170a97-8544-4bf8-8440-8dac979e5707_6oRPcSW_v.webp", "alt_text": "가루비 미노 사츠마이모 고구마맛 스낵 일본 과자 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2184", "sku_code": "NPPIP-DEMO-1791959208", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2199", "category_id": "88", "name": "후지야 마루데링고 사과 퓨레 젤리 44g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:33.754049", "deleted_at": null,
    images: [{"product_image_id": "2183", "url": "https://ik.imagekit.io/oishidam/products/177e81ce-3d36-4d58-a32f-3fb79cfcf282_b5zH8mqGP.webp", "alt_text": "후지야 마루데링고 사과 퓨레 젤리 44g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2185", "sku_code": "NPPIP-DEMO-1791958996", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2200", "category_id": "79", "name": "오시도리 밀크케이크 밀크맛 우유 과자 8개입 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:34.503315", "deleted_at": null,
    images: [{"product_image_id": "2184", "url": "https://ik.imagekit.io/oishidam/products/ecd1a63f-4d6f-43d3-90e1-96b30bdb04c6_r-RTQRvYA.webp", "alt_text": "오시도리 밀크케이크 밀크맛 우유 과자 8개입 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2186", "sku_code": "NPPIP-DEMO-1791940242", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2201", "category_id": "87", "name": "[엔핍 종합 선물 세트]일본 베스트 사탕 패키지", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:35.047829", "deleted_at": null,
    images: [{"product_image_id": "2185", "url": "https://ik.imagekit.io/oishidam/products/49ce15be-54de-483a-8c5c-9e26882ee208_wFyycatMK.webp", "alt_text": "[엔핍 종합 선물 세트]일본 베스트 사탕 패키지", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2187", "sku_code": "NPPIP-DEMO-1791872361", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2202", "category_id": "79", "name": "가루비 패밀리마트 포테이토칩 파미치키 화미치키맛 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:35.155911", "deleted_at": null,
    images: [{"product_image_id": "2186", "url": "https://ik.imagekit.io/oishidam/products/e00bdb94-226e-493c-bf9b-841ae6e9cdb4_I0db3RV3d7.webp", "alt_text": "가루비 패밀리마트 포테이토칩 파미치키 화미치키맛 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2188", "sku_code": "NPPIP-DEMO-1791859575", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2203", "category_id": "72", "name": "닛신 돈베이 튀김소바 나의 히어로 아카데미아 패키지 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:35.599914", "deleted_at": null,
    images: [{"product_image_id": "2187", "url": "https://ik.imagekit.io/oishidam/products/4310d157-3a50-4772-b994-09921b6126fd_YjSaO7jgV.webp", "alt_text": "닛신 돈베이 튀김소바 나의 히어로 아카데미아 패키지 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2189", "sku_code": "NPPIP-DEMO-17917837905", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2204", "category_id": "72", "name": "닛신 돈베이 카키아게 우동 나의 히어로 아카데미아 패키지 96g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:36.400209", "deleted_at": null,
    images: [{"product_image_id": "2188", "url": "https://ik.imagekit.io/oishidam/products/168f64c4-bdd8-46ea-95de-138210369efb_iXC7b2B8Z.webp", "alt_text": "닛신 돈베이 카키아게 우동 나의 히어로 아카데미아 패키지 96g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2190", "sku_code": "NPPIP-DEMO-17917837904", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2205", "category_id": "72", "name": "닛신 돈베이 키츠네 우동 나의 히어로 아카데미아 패키지 95g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:36.961969", "deleted_at": null,
    images: [{"product_image_id": "2189", "url": "https://ik.imagekit.io/oishidam/products/514aab36-3e85-4851-8d91-1ec1bea56d3f_9xpZkyNxu.webp", "alt_text": "닛신 돈베이 키츠네 우동 나의 히어로 아카데미아 패키지 95g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2191", "sku_code": "NPPIP-DEMO-17917837893", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2206", "category_id": "80", "name": "부르봉 브란츄르 랑드샤 쿠키 화이트 초코 16개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:37.05203", "deleted_at": null,
    images: [{"product_image_id": "2190", "url": "https://ik.imagekit.io/oishidam/products/b65648b9-45ce-4baf-94b5-c82cb144ca65_o-y-ZLfdb.webp", "alt_text": "부르봉 브란츄르 랑드샤 쿠키 화이트 초코 16개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2192", "sku_code": "NPPIP-DEMO-1791776873", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2207", "category_id": "72", "name": "묘조 잇페이짱 야점의 야키소바 불향 마늘 간장맛 라멘 110g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:37.521674", "deleted_at": null,
    images: [{"product_image_id": "2191", "url": "https://ik.imagekit.io/oishidam/products/ddca904d-be01-444b-82fa-a83daf1514ee_tuFRSgdHY.webp", "alt_text": "묘조 잇페이짱 야점의 야키소바 불향 마늘 간장맛 라멘 110g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2193", "sku_code": "NPPIP-DEMO-1791773409", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2208", "category_id": "72", "name": "닛신 불닭까르보나라 야끼소바 나의 히어로 아카데미아 패키지 101g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:38.287137", "deleted_at": null,
    images: [{"product_image_id": "2192", "url": "https://ik.imagekit.io/oishidam/products/ff88f7b8-c28c-4147-8d6d-44710d489789_x0OGg2xF4.webp", "alt_text": "닛신 불닭까르보나라 야끼소바 나의 히어로 아카데미아 패키지 101g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2194", "sku_code": "NPPIP-DEMO-1791773152", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2209", "category_id": "72", "name": "닛신 ufo 야끼소바 나의 히어로 아카데미아 패키지 128g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:38.894288", "deleted_at": null,
    images: [{"product_image_id": "2194", "url": "https://ik.imagekit.io/oishidam/products/f1056493-2ea7-462a-a33e-7a7fee61af83_ItGxl2qzW.webp", "alt_text": "닛신 ufo 야끼소바 나의 히어로 아카데미아 패키지 128g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2195", "sku_code": "NPPIP-DEMO-1791773062", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2210", "category_id": "72", "name": "닛신 돈베이 고기 우동 나의 히어로 아카데미아 패키지 86g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:38.86292", "deleted_at": null,
    images: [{"product_image_id": "2193", "url": "https://ik.imagekit.io/oishidam/products/a542db3f-4df6-4b43-a39d-19f97593d51a_bMAWWGYrf.webp", "alt_text": "닛신 돈베이 고기 우동 나의 히어로 아카데미아 패키지 86g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2196", "sku_code": "NPPIP-DEMO-1791772945", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2211", "category_id": "79", "name": "베프코 호시타베요 센베이 일본 쌀과자 소금맛 20매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:39.1734", "deleted_at": null,
    images: [{"product_image_id": "2195", "url": "https://ik.imagekit.io/oishidam/products/2dfd1c98-db36-431d-b156-c11a60c0af72_gR-IL0W-A.webp", "alt_text": "베프코 호시타베요 센베이 일본 쌀과자 소금맛 20매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2197", "sku_code": "NPPIP-DEMO-1791438079", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2212", "category_id": "89", "name": "후지야 룩 LOOK 초콜릿 밀크 퍼레이드 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:40.211944", "deleted_at": null,
    images: [{"product_image_id": "2196", "url": "https://ik.imagekit.io/oishidam/products/42a5beb6-9391-4e87-9d91-133b4a8e83bb_QF2v0vQUU.webp", "alt_text": "후지야 룩 LOOK 초콜릿 밀크 퍼레이드 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2198", "sku_code": "NPPIP-DEMO-1791343248", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2213", "category_id": "72", "name": "ISDG 중화방 산라탕 컵누들 컵라면 76g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:40.816104", "deleted_at": null,
    images: [{"product_image_id": "2198", "url": "https://ik.imagekit.io/oishidam/products/592bd546-47cd-4e0e-8276-f0edac47921c_mpDxCK9s_.webp", "alt_text": "ISDG 중화방 산라탕 컵누들 컵라면 76g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2199", "sku_code": "NPPIP-DEMO-1791341624", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2214", "category_id": "79", "name": "가루비 포테이토칩 간사이 아지츠케 김맛 감자칩 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:40.817473", "deleted_at": null,
    images: [{"product_image_id": "2197", "url": "https://ik.imagekit.io/oishidam/products/80a6a9e2-7431-4856-817e-8875b09c5fa0_r5xDLNd8d.webp", "alt_text": "가루비 포테이토칩 간사이 아지츠케 김맛 감자칩 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2200", "sku_code": "NPPIP-DEMO-17912721097", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2215", "category_id": "79", "name": "가루비 포테이토칩 간사이 가쓰오 다시마 다시 소금맛 감자칩 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:41.14509", "deleted_at": null,
    images: [{"product_image_id": "2199", "url": "https://ik.imagekit.io/oishidam/products/2615d28b-89af-46b4-8bea-b3d315103440_AMIiEZUzt.webp", "alt_text": "가루비 포테이토칩 간사이 가쓰오 다시마 다시 소금맛 감자칩 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2201", "sku_code": "NPPIP-DEMO-17912721076", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2216", "category_id": "79", "name": "토하토 우마이몽 나게와 하카타 멘타이코 명란맛 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:42.091254", "deleted_at": null,
    images: [{"product_image_id": "2200", "url": "https://ik.imagekit.io/oishidam/products/1ef9b2a7-e8da-4ebe-b8ff-31fca48de8bc_LcUccTYnd.webp", "alt_text": "토하토 우마이몽 나게와 하카타 멘타이코 명란맛 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2202", "sku_code": "NPPIP-DEMO-17912721064", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2217", "category_id": "83", "name": "무인양품 금목서 우롱차 티백 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:42.32419", "deleted_at": null,
    images: [{"product_image_id": "2201", "url": "https://ik.imagekit.io/oishidam/products/6f10de7f-6df5-4caf-8677-190166c7da56_6xSPv5hPS.webp", "alt_text": "무인양품 금목서 우롱차 티백 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2204", "sku_code": "NPPIP-DEMO-1791258529", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2218", "category_id": "79", "name": "토하토 우마이몽 나게와 도쿄 몬쟈맛 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:42.999999", "deleted_at": null,
    images: [{"product_image_id": "2203", "url": "https://ik.imagekit.io/oishidam/products/ebfce9b3-ebd9-43f4-806d-25d390fcb567_rUXoHnMyH.webp", "alt_text": "토하토 우마이몽 나게와 도쿄 몬쟈맛 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2203", "sku_code": "NPPIP-DEMO-17912721063", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2219", "category_id": "88", "name": "칸로 퓨레 구미 믹스 베리 젤리 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:42.897591", "deleted_at": null,
    images: [{"product_image_id": "2202", "url": "https://ik.imagekit.io/oishidam/products/c1dd3ae4-4943-4cfc-8b02-7b9fce4c44ea_dgcoQZzdJ.webp", "alt_text": "칸로 퓨레 구미 믹스 베리 젤리 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2205", "sku_code": "NPPIP-DEMO-1790923426", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2220", "category_id": "72", "name": "닛신 컵누들 카라톤 매운 돈코츠 라멘 83g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:43.970624", "deleted_at": null,
    images: [{"product_image_id": "2204", "url": "https://ik.imagekit.io/oishidam/products/39501bdb-1b17-4062-bf90-852f88b97e84_iJ3mnPuXL.webp", "alt_text": "닛신 컵누들 카라톤 매운 돈코츠 라멘 83g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2206", "sku_code": "NPPIP-DEMO-1790918834", "variant_name": "기본", "option_values": {}, "price": 3550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2221", "category_id": "88", "name": "오리히로 곤약젤리 프리미엄 카페 타피오카 밀크티 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:44.218229", "deleted_at": null,
    images: [{"product_image_id": "2205", "url": "https://ik.imagekit.io/oishidam/products/4905de52-d4ca-4faf-a6ec-ea73095b22f0_ccD4SW6k8.webp", "alt_text": "오리히로 곤약젤리 프리미엄 카페 타피오카 밀크티 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2207", "sku_code": "NPPIP-DEMO-1790910110", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2222", "category_id": "88", "name": "오리히로 곤약젤리 프리미엄 카페 푸딩 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:44.575391", "deleted_at": null,
    images: [{"product_image_id": "2206", "url": "https://ik.imagekit.io/oishidam/products/c30ae36c-e950-4ee8-af9a-f7da80f8b79c_vKuVeWM5P.webp", "alt_text": "오리히로 곤약젤리 프리미엄 카페 푸딩 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2208", "sku_code": "NPPIP-DEMO-1790909939", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2223", "category_id": "79", "name": "산코제과 니가타시코미 소금맛 센베이 30매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:44.917588", "deleted_at": null,
    images: [{"product_image_id": "2207", "url": "https://ik.imagekit.io/oishidam/products/48d9192b-0398-4b5e-9977-aa9ed4bf6a98_9j2V73Z_IL.webp", "alt_text": "산코제과 니가타시코미 소금맛 센베이 30매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2209", "sku_code": "NPPIP-DEMO-1790907944", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2224", "category_id": "66", "name": "세븐일레븐 슈가 버터 트리 샌드 야키링고 브륄레 3개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:45.658349", "deleted_at": null,
    images: [{"product_image_id": "2208", "url": "https://ik.imagekit.io/oishidam/products/5e3d6511-0a62-497e-97bf-916ea232a864_HrsokFfOC.webp", "alt_text": "세븐일레븐 슈가 버터 트리 샌드 야키링고 브륄레 3개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2210", "sku_code": "NPPIP-DEMO-1790901173", "variant_name": "기본", "option_values": {}, "price": 4700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2225", "category_id": "79", "name": "가루비 자가리코 불고기맛 52g 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:46.090991", "deleted_at": null,
    images: [{"product_image_id": "2209", "url": "https://ik.imagekit.io/oishidam/products/a9a95013-cee8-4f05-abcc-ad5ce3e67358_werSFKJtX.webp", "alt_text": "가루비 자가리코 불고기맛 52g 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2211", "sku_code": "NPPIP-DEMO-1790843182", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2226", "category_id": "79", "name": "아지겐 모스버거 콜라보 어이언 포테이토 스낵 우스아지맛 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:46.508467", "deleted_at": null,
    images: [{"product_image_id": "2210", "url": "https://ik.imagekit.io/oishidam/products/91eec420-56a5-400d-a77e-4a62e5b4992f_LKxjM5kUF.webp", "alt_text": "아지겐 모스버거 콜라보 어이언 포테이토 스낵 우스아지맛 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2212", "sku_code": "NPPIP-DEMO-1790825292", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2227", "category_id": "87", "name": "모리나가 하이츄 샤리샤리 과일믹스맛 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:47.007773", "deleted_at": null,
    images: [{"product_image_id": "2211", "url": "https://ik.imagekit.io/oishidam/products/016ef246-058a-4061-b012-17ec33acd740_mUDjlgAQ5.webp", "alt_text": "모리나가 하이츄 샤리샤리 과일믹스맛 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2213", "sku_code": "NPPIP-DEMO-17907501255", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2228", "category_id": "87", "name": "모리나가 하이츄 프리미엄 서양배맛 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:47.611548", "deleted_at": null,
    images: [{"product_image_id": "2212", "url": "https://ik.imagekit.io/oishidam/products/6e61ac46-3e86-4937-b31c-3f23fdf2c5b3_oPwiufxT-.webp", "alt_text": "모리나가 하이츄 프리미엄 서양배맛 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2214", "sku_code": "NPPIP-DEMO-17907501233", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2229", "category_id": "79", "name": "토하토 산리오 캐릭터즈 소금캬라멜맛 스낵 랜덤 스티커 포함 17g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:47.735803", "deleted_at": null,
    images: [{"product_image_id": "2213", "url": "https://ik.imagekit.io/oishidam/products/ff2eda34-4a5c-4417-b722-40c17efb895b_G_H-d-tFE.webp", "alt_text": "토하토 산리오 캐릭터즈 소금캬라멜맛 스낵 랜덤 스티커 포함 17g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2215", "sku_code": "NPPIP-DEMO-1790746725", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2230", "category_id": "80", "name": "롯데 반숙 카스타드 케이크 3개입 85g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:48.483083", "deleted_at": null,
    images: [{"product_image_id": "2214", "url": "https://ik.imagekit.io/oishidam/products/8b111682-91ec-4051-982c-ff14e724188b_FRaIGheCY.webp", "alt_text": "롯데 반숙 카스타드 케이크 3개입 85g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2216", "sku_code": "NPPIP-DEMO-1790746509", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2231", "category_id": "89", "name": "롯데 프리미엄 가나 농후 생초콜릿 풍부한 카카오 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:48.962891", "deleted_at": null,
    images: [{"product_image_id": "2215", "url": "https://ik.imagekit.io/oishidam/products/ad84cb3b-0a40-4705-ac1d-e26dd0fb3d49_ZJ8eeJHsa.webp", "alt_text": "롯데 프리미엄 가나 농후 생초콜릿 풍부한 카카오 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2217", "sku_code": "NPPIP-DEMO-1790746456", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2232", "category_id": "89", "name": "치로루 초코 초코모찌 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:49.555281", "deleted_at": null,
    images: [{"product_image_id": "2216", "url": "https://ik.imagekit.io/oishidam/products/39a22ced-8bf8-49a7-8d08-1c3f06195752_72H3E4wlR.webp", "alt_text": "치로루 초코 초코모찌 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2218", "sku_code": "NPPIP-DEMO-17906715498", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2233", "category_id": "89", "name": "치로루 초코 키나코모찌 인절미맛 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:49.678383", "deleted_at": null,
    images: [{"product_image_id": "2217", "url": "https://ik.imagekit.io/oishidam/products/b0fa4dd2-98ac-4edd-8fe1-8858751b051e_eyfxl5WGn.webp", "alt_text": "치로루 초코 키나코모찌 인절미맛 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2219", "sku_code": "NPPIP-DEMO-17906715477", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2234", "category_id": "87", "name": "아사히 민티아 캔디 마루데 망고맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:50.377005", "deleted_at": null,
    images: [{"product_image_id": "2218", "url": "https://ik.imagekit.io/oishidam/products/9e1223fb-4faf-4119-a5db-65fe7a4bb01d_9K_lha1vO.webp", "alt_text": "아사히 민티아 캔디 마루데 망고맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2220", "sku_code": "NPPIP-DEMO-17906715466", "variant_name": "기본", "option_values": {}, "price": 2300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2235", "category_id": "87", "name": "아사히 민티아 캔디 마루데 서양배맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:50.919162", "deleted_at": null,
    images: [{"product_image_id": "2219", "url": "https://ik.imagekit.io/oishidam/products/46b96a10-9605-45e0-bfbb-13e2c2be154b_Ak3dUkb7o.webp", "alt_text": "아사히 민티아 캔디 마루데 서양배맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2221", "sku_code": "NPPIP-DEMO-17906715455", "variant_name": "기본", "option_values": {}, "price": 2300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2236", "category_id": "88", "name": "UHA미각당 구미다마 샤인머스캣 젤리 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:51.449174", "deleted_at": null,
    images: [{"product_image_id": "2220", "url": "https://ik.imagekit.io/oishidam/products/c63354ca-6f18-49e2-8a35-73c50c4e66a9_zI6mK9HIDw.webp", "alt_text": "UHA미각당 구미다마 샤인머스캣 젤리 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2222", "sku_code": "NPPIP-DEMO-17906715444", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2237", "category_id": "88", "name": "UHA미각당 닌자메시 다이아몬드 머스캣 젤리 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:51.573753", "deleted_at": null,
    images: [{"product_image_id": "2221", "url": "https://ik.imagekit.io/oishidam/products/85e29778-8414-4a62-8b93-53a9bf1fd969_jC_KCgVWU.webp", "alt_text": "UHA미각당 닌자메시 다이아몬드 머스캣 젤리 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2223", "sku_code": "NPPIP-DEMO-17906715443", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2238", "category_id": "72", "name": "ISDG 중화방 수면 화초 소금맛 컵라면 77g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:52.251011", "deleted_at": null,
    images: [{"product_image_id": "2222", "url": "https://ik.imagekit.io/oishidam/products/57aeb64b-4080-4d31-a48e-5d9bae34a2fb_iUDtCch7h.webp", "alt_text": "ISDG 중화방 수면 화초 소금맛 컵라면 77g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2224", "sku_code": "NPPIP-DEMO-1790665024", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2239", "category_id": "72", "name": "ISDG 중화방 수면 담백한 간장맛 컵라면 92g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:52.867308", "deleted_at": null,
    images: [{"product_image_id": "2223", "url": "https://ik.imagekit.io/oishidam/products/8e0688fc-5de8-4a4a-ba17-e1905f56222d_G13-5fCW3.webp", "alt_text": "ISDG 중화방 수면 담백한 간장맛 컵라면 92g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2225", "sku_code": "NPPIP-DEMO-1790664909", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2240", "category_id": "77", "name": "우에노진미 껍질 있는 오징어 진미채 안주 12g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:53.413271", "deleted_at": null,
    images: [{"product_image_id": "2225", "url": "https://ik.imagekit.io/oishidam/products/38343d6e-db8c-4c70-8ec9-5aed22e830f8_zecxrV1Xc.webp", "alt_text": "우에노진미 껍질 있는 오징어 진미채 안주 12g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2226", "sku_code": "NPPIP-DEMO-1790581308", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2241", "category_id": "88", "name": "노벨 키라후와 별모양 구미 일본 별젤리 화이트소다맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:53.259207", "deleted_at": null,
    images: [{"product_image_id": "2224", "url": "https://ik.imagekit.io/oishidam/products/f3ad238b-9e94-4eeb-be1c-b84619fa4ec1_1_JOaB1mT.webp", "alt_text": "노벨 키라후와 별모양 구미 일본 별젤리 화이트소다맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2227", "sku_code": "NPPIP-DEMO-1790576093", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2242", "category_id": "88", "name": "크라시에 포핀쿠키 즐거운 빵가게 만들기", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:54.172212", "deleted_at": null,
    images: [{"product_image_id": "2226", "url": "https://ik.imagekit.io/oishidam/products/8371edba-ac44-4c93-9c80-8eeb1bb13651_EZ4ZwSbTh.webp", "alt_text": "크라시에 포핀쿠키 즐거운 빵가게 만들기", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2228", "sku_code": "NPPIP-DEMO-1790573490", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2243", "category_id": "89", "name": "모리나가 다스 프리미엄 화이트 바닐라 초콜릿 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:54.484344", "deleted_at": null,
    images: [{"product_image_id": "2227", "url": "https://ik.imagekit.io/oishidam/products/54524c93-141e-478e-af7f-f3b120c4e6d8_VPjMx1av1.webp", "alt_text": "모리나가 다스 프리미엄 화이트 바닐라 초콜릿 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2229", "sku_code": "NPPIP-DEMO-17905730577", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2244", "category_id": "89", "name": "모리나가 다스 프리미엄 프랄리네 아몬드 초콜릿 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:55.215539", "deleted_at": null,
    images: [{"product_image_id": "2228", "url": "https://ik.imagekit.io/oishidam/products/903a9c62-f607-4362-bdb0-17b9b50e82d4_8WNqgxi6p.webp", "alt_text": "모리나가 다스 프리미엄 프랄리네 아몬드 초콜릿 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2230", "sku_code": "NPPIP-DEMO-17905730566", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2245", "category_id": "89", "name": "부르봉 알포트 미니 초콜릿 유자말차맛 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:55.338187", "deleted_at": null,
    images: [{"product_image_id": "2229", "url": "https://ik.imagekit.io/oishidam/products/aab78256-2a3e-4fad-9a88-ef64efc8c8f9_E0rW8p_-Z.webp", "alt_text": "부르봉 알포트 미니 초콜릿 유자말차맛 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2231", "sku_code": "NPPIP-DEMO-17905730564", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2246", "category_id": "79", "name": "가루비 카라이네 매운 칠리맛 감자칩 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:56.067384", "deleted_at": null,
    images: [{"product_image_id": "2230", "url": "https://ik.imagekit.io/oishidam/products/5ea2dae7-51dc-4fb3-95be-892dc907c1f8_qDuLdFJDh.webp", "alt_text": "가루비 카라이네 매운 칠리맛 감자칩 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2232", "sku_code": "NPPIP-DEMO-17905730553", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2247", "category_id": "89", "name": "후지야 컨트리맘 초코마미레 더월드 알래스카편 초콜릿 92g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:56.395108", "deleted_at": null,
    images: [{"product_image_id": "2231", "url": "https://ik.imagekit.io/oishidam/products/132ca942-9171-4caa-86fb-f3cf76558f3f_S7MF9AikD.webp", "alt_text": "후지야 컨트리맘 초코마미레 더월드 알래스카편 초콜릿 92g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2233", "sku_code": "NPPIP-DEMO-1790572131", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2248", "category_id": "89", "name": "후지야 치이카와 페로페로 초콜릿 색 랜덤", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:57.112853", "deleted_at": null,
    images: [{"product_image_id": "2233", "url": "https://ik.imagekit.io/oishidam/products/6a7b45c5-1f9f-4d16-9422-03555642d6a0_A2_DccwSQ.webp", "alt_text": "후지야 치이카와 페로페로 초콜릿 색 랜덤", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2234", "sku_code": "NPPIP-DEMO-1790567032", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2249", "category_id": "88", "name": "후지야 폼폼푸린 젤리 사과맛 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:57.004356", "deleted_at": null,
    images: [{"product_image_id": "2232", "url": "https://ik.imagekit.io/oishidam/products/631fca0b-0094-44f3-9e66-8b789a600b67_fPne6lxoK.webp", "alt_text": "후지야 폼폼푸린 젤리 사과맛 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2235", "sku_code": "NPPIP-DEMO-1790565649", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2250", "category_id": "66", "name": "세븐일레븐 두껍게 자른 포테이토칩 참기름맛 135g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:57.93792", "deleted_at": null,
    images: [{"product_image_id": "2234", "url": "https://ik.imagekit.io/oishidam/products/dac6a3a9-2ab3-4142-b632-8bf75b753988_lAIfXFM0N.webp", "alt_text": "세븐일레븐 두껍게 자른 포테이토칩 참기름맛 135g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2236", "sku_code": "NPPIP-DEMO-1790564051", "variant_name": "기본", "option_values": {}, "price": 4650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2251", "category_id": "88", "name": "세븐일레븐 카바야 스파구미 방과후 아오하루 학원 콜라보 레몬 젤리 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:58.084099", "deleted_at": null,
    images: [{"product_image_id": "2235", "url": "https://ik.imagekit.io/oishidam/products/9499fca9-ae9b-455f-83c3-d6a1a889087a_pfaOTPYOiF.webp", "alt_text": "세븐일레븐 카바야 스파구미 방과후 아오하루 학원 콜라보 레몬 젤리 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2237", "sku_code": "NPPIP-DEMO-1790559766", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2252", "category_id": "80", "name": "후지야 폼폼푸린 컨트리맘 푸딩맛 쿠키 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:58.938011", "deleted_at": null,
    images: [{"product_image_id": "2236", "url": "https://ik.imagekit.io/oishidam/products/250fe8df-daa7-4ffc-aab0-5bb76334cb68_pTJtFRS6L.webp", "alt_text": "후지야 폼폼푸린 컨트리맘 푸딩맛 쿠키 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2238", "sku_code": "NPPIP-DEMO-1790559436", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2253", "category_id": "69", "name": "s&b 아지와이 일본 카레 단맛 170g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:58.95201", "deleted_at": null,
    images: [{"product_image_id": "2237", "url": "https://ik.imagekit.io/oishidam/products/255b84f6-adee-46af-a71a-009264eb99ae_mqQEWXCobu.webp", "alt_text": "s&b 아지와이 일본 카레 단맛 170g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2239", "sku_code": "NPPIP-DEMO-1790048217", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2254", "category_id": "72", "name": "야마다이 뉴터치 건면 나가사키 짬뽕 121g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:59.808064", "deleted_at": null,
    images: [{"product_image_id": "2238", "url": "https://ik.imagekit.io/oishidam/products/91fcb5f3-3823-4902-9fbb-5ffd76e991db_jb4jrtzeU.webp", "alt_text": "야마다이 뉴터치 건면 나가사키 짬뽕 121g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2240", "sku_code": "NPPIP-DEMO-1790046609", "variant_name": "기본", "option_values": {}, "price": 4850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2255", "category_id": "72", "name": "야마다이 뉴터치 건면 교토 세아부라 쇼유 간장 라멘 114g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:17:59.932294", "deleted_at": null,
    images: [{"product_image_id": "2239", "url": "https://ik.imagekit.io/oishidam/products/1fe34b8c-8d79-41ce-96e2-48f826b367f1_o6IPDjEUj.webp", "alt_text": "야마다이 뉴터치 건면 교토 세아부라 쇼유 간장 라멘 114g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2241", "sku_code": "NPPIP-DEMO-1790046465", "variant_name": "기본", "option_values": {}, "price": 4850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2256", "category_id": "72", "name": "에이스쿡 로컬 하코다테 소금 라멘 60g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:00.813521", "deleted_at": null,
    images: [{"product_image_id": "2241", "url": "https://ik.imagekit.io/oishidam/products/dbaeea4a-d614-4c1c-a5a1-06a3c7d763ca_4MZFvlVix.webp", "alt_text": "에이스쿡 로컬 하코다테 소금 라멘 60g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2243", "sku_code": "NPPIP-DEMO-1789960126", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2257", "category_id": "72", "name": "야마다이 뉴터치 나라텐리 스태미너 라멘 일본 컵라면 112g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:00.813521", "deleted_at": null,
    images: [{"product_image_id": "2240", "url": "https://ik.imagekit.io/oishidam/products/37ac66c0-3383-4a40-a0d4-1063d341e169_LZDEgsBPH.webp", "alt_text": "야마다이 뉴터치 나라텐리 스태미너 라멘 일본 컵라면 112g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2242", "sku_code": "NPPIP-DEMO-1790043117", "variant_name": "기본", "option_values": {}, "price": 4850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2258", "category_id": "72", "name": "에이스쿡 로컬 센다이 매운 된장 라멘 62g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:01.773554", "deleted_at": null,
    images: [{"product_image_id": "2242", "url": "https://ik.imagekit.io/oishidam/products/8ec56050-b9e0-41eb-9c1c-6c8de1ef1b6b_aw8S-hbif.webp", "alt_text": "에이스쿡 로컬 센다이 매운 된장 라멘 62g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2244", "sku_code": "NPPIP-DEMO-1789960002", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2259", "category_id": "72", "name": "에이스쿡 로컬 요코하마 돈코츠 간장 라멘 63g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:01.85092", "deleted_at": null,
    images: [{"product_image_id": "2243", "url": "https://ik.imagekit.io/oishidam/products/4f74b70a-e7c9-439d-89a4-3471abdf80e4_rP71M0xjvk.webp", "alt_text": "에이스쿡 로컬 요코하마 돈코츠 간장 라멘 63g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2245", "sku_code": "NPPIP-DEMO-1789959920", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2260", "category_id": "80", "name": "메이지 진한 초코 딸기 샌드 6매입 일본 쿠키 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:02.495657", "deleted_at": null,
    images: [{"product_image_id": "2244", "url": "https://ik.imagekit.io/oishidam/products/eea2576c-2515-4a88-99d5-8612833644cc_zsGrbfq_l.webp", "alt_text": "메이지 진한 초코 딸기 샌드 6매입 일본 쿠키 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2246", "sku_code": "NPPIP-DEMO-1789695504", "variant_name": "기본", "option_values": {}, "price": 4700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2261", "category_id": "72", "name": "산요 삿포로이치방 컵스타 매운 돈코츠 간장 라멘 70g 일본 컵라면", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2245", "url": "https://ik.imagekit.io/oishidam/products/bcab4c98-e494-4629-8080-6fc2e905d2ed_9-3nhzN_N.webp", "alt_text": "산요 삿포로이치방 컵스타 매운 돈코츠 간장 라멘 70g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2247", "sku_code": "NPPIP-DEMO-1789701939", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2262", "category_id": "79", "name": "베프코 호빵맨 센베이 쌀과자 27g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:03.377686", "deleted_at": null,
    images: [{"product_image_id": "2246", "url": "https://ik.imagekit.io/oishidam/products/93d5375a-2226-4956-85d2-f005c192832b_aB_ehCwku.webp", "alt_text": "베프코 호빵맨 센베이 쌀과자 27g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2248", "sku_code": "NPPIP-DEMO-1789617092", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2263", "category_id": "66", "name": "일본 세븐일레븐 초코슈 62g 편의점 간식", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:03.828613", "deleted_at": null,
    images: [{"product_image_id": "2247", "url": "https://ik.imagekit.io/oishidam/products/812e898f-3a89-4ec7-a373-15025dabd544_slL0XZ619.webp", "alt_text": "일본 세븐일레븐 초코슈 62g 편의점 간식", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2249", "sku_code": "NPPIP-DEMO-1789616395", "variant_name": "기본", "option_values": {}, "price": 3100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2264", "category_id": "94", "name": "토리젠푸드 하카타 카미토리 감수 10종의 극 스파이스 소금 조미료 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:04.437797", "deleted_at": null,
    images: [{"product_image_id": "2248", "url": "https://ik.imagekit.io/oishidam/products/fb551903-1092-4fd0-925c-7eda83f6492e__Plh1s6-h.webp", "alt_text": "토리젠푸드 하카타 카미토리 감수 10종의 극 스파이스 소금 조미료 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2250", "sku_code": "NPPIP-DEMO-1789529176", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2265", "category_id": "79", "name": "토하토 반다이 어른의 초코비 초코 쇼콜라맛 41g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:04.701056", "deleted_at": null,
    images: [{"product_image_id": "2249", "url": "https://ik.imagekit.io/oishidam/products/d3ec6e08-aa74-4622-872e-4866a0421a02_qkkWzEQbk.webp", "alt_text": "토하토 반다이 어른의 초코비 초코 쇼콜라맛 41g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2251", "sku_code": "NPPIP-DEMO-1789453780", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2266", "category_id": "66", "name": "세븐일레븐 미역 듬뿍 바지락 다시 소금 라멘 65g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:05.114075", "deleted_at": null,
    images: [{"product_image_id": "2250", "url": "https://ik.imagekit.io/oishidam/products/7a3d3c4a-4cd3-4593-a459-c0c6bb072830_S4W-nmPZj.webp", "alt_text": "세븐일레븐 미역 듬뿍 바지락 다시 소금 라멘 65g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2252", "sku_code": "NPPIP-DEMO-1789450188", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2267", "category_id": "72", "name": "묘조 한류신면 매콤 농후 까르보 라멘 94g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:05.806101", "deleted_at": null,
    images: [{"product_image_id": "2251", "url": "https://ik.imagekit.io/oishidam/products/a09e6757-fa69-4562-95e4-7e26ded5b634_dk6uJZgR0.webp", "alt_text": "묘조 한류신면 매콤 농후 까르보 라멘 94g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2253", "sku_code": "NPPIP-DEMO-1789356391", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2268", "category_id": "72", "name": "묘조 한류신면 매콤 소고기 찌개 라멘 97g 일본 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:06.353229", "deleted_at": null,
    images: [{"product_image_id": "2252", "url": "https://ik.imagekit.io/oishidam/products/bd8b464e-e7c3-4560-bae0-99fbfee78e7b_ziDRg-IVA.webp", "alt_text": "묘조 한류신면 매콤 소고기 찌개 라멘 97g 일본 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2254", "sku_code": "NPPIP-DEMO-1789356225", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2269", "category_id": "89", "name": "치로루 초코 메론빵 풍미 초콜릿 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:06.616088", "deleted_at": null,
    images: [{"product_image_id": "2253", "url": "https://ik.imagekit.io/oishidam/products/d9f66e8c-7262-45c3-b1c4-ffb098318326_zc4Eluhdc.webp", "alt_text": "치로루 초코 메론빵 풍미 초콜릿 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2255", "sku_code": "NPPIP-DEMO-1789348982", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2270", "category_id": "79", "name": "산코제과 유키노야도 밀크 카린토 63g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:07.112126", "deleted_at": null,
    images: [{"product_image_id": "2254", "url": "https://ik.imagekit.io/oishidam/products/42e63679-c634-4683-bf7a-0457c6d6e261_QH_vfh2dj.webp", "alt_text": "산코제과 유키노야도 밀크 카린토 63g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2256", "sku_code": "NPPIP-DEMO-1789097829", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2271", "category_id": "87", "name": "롯데 하치미츠 카린 목캔디 꿀모과맛 사탕 11개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:07.743077", "deleted_at": null,
    images: [{"product_image_id": "2255", "url": "https://ik.imagekit.io/oishidam/products/d679f57c-a22a-480d-a7a2-5d1250a4a5df_jxQ54tAXx.webp", "alt_text": "롯데 하치미츠 카린 목캔디 꿀모과맛 사탕 11개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2257", "sku_code": "NPPIP-DEMO-1789091910", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2272", "category_id": "79", "name": "산코제과 치즈노 이타즈라 일본 센베이 과자 15매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:08.463147", "deleted_at": null,
    images: [{"product_image_id": "2256", "url": "https://ik.imagekit.io/oishidam/products/2ba7575f-554d-4533-8a4b-ae3736fbf383_044kmh1oU.webp", "alt_text": "산코제과 치즈노 이타즈라 일본 센베이 과자 15매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2258", "sku_code": "NPPIP-DEMO-1789017090", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2273", "category_id": "72", "name": "ISDG 중화방 멘피 비빔 마라맛 컵라면 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:08.550799", "deleted_at": null,
    images: [{"product_image_id": "2257", "url": "https://ik.imagekit.io/oishidam/products/9ba0367d-9a27-43db-b8fe-11f18cd3f90b_W0elWPDHf.webp", "alt_text": "ISDG 중화방 멘피 비빔 마라맛 컵라면 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2259", "sku_code": "NPPIP-DEMO-1789002979", "variant_name": "기본", "option_values": {}, "price": 4350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2274", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 딸기 320g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:09.006298", "deleted_at": null,
    images: [{"product_image_id": "2258", "url": "https://ik.imagekit.io/oishidam/products/4d5fe56e-ea98-4089-8ccc-b7d690724dd0_Y582Fs5jf.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 딸기 320g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2260", "sku_code": "NPPIP-DEMO-178892071512", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2275", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 키나코 대두 320g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:09.677524", "deleted_at": null,
    images: [{"product_image_id": "2259", "url": "https://ik.imagekit.io/oishidam/products/80766da5-b3cd-4a91-89a5-26b2adf0e0e9_Mw1LnayLb.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 키나코 대두 320g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2261", "sku_code": "NPPIP-DEMO-178892071411", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2276", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 프리미엄 과일 280g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:10.424589", "deleted_at": null,
    images: [{"product_image_id": "2261", "url": "https://ik.imagekit.io/oishidam/products/68292df6-c675-4e5c-af3c-296d6fc61772_rGUT7rjhN.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 프리미엄 과일 280g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2262", "sku_code": "NPPIP-DEMO-17889207149", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2277", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 초코넛츠 280g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:10.361343", "deleted_at": null,
    images: [{"product_image_id": "2260", "url": "https://ik.imagekit.io/oishidam/products/d5066175-b9fc-4102-b99d-35a5dbb09c83_H1OrCH1GU.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 초코넛츠 280g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2263", "sku_code": "NPPIP-DEMO-178892071410", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2278", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 얼그레이 280g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:10.921147", "deleted_at": null,
    images: [{"product_image_id": "2262", "url": "https://ik.imagekit.io/oishidam/products/c4348493-0b9c-4ce4-9245-e532f8ee64cf_BBB3zyC8_.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 얼그레이 280g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2264", "sku_code": "NPPIP-DEMO-17889207138", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2279", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 당질 60% 오프 키나코 대두 300g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:11.58992", "deleted_at": null,
    images: [{"product_image_id": "2263", "url": "https://ik.imagekit.io/oishidam/products/583df9ff-2e8d-425a-81a3-d68c293ed7d0_eMzTuFVei.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 당질 60% 오프 키나코 대두 300g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2265", "sku_code": "NPPIP-DEMO-17889207137", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2280", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 당질 60% 오프 초코넛츠 300g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:12.263718", "deleted_at": null,
    images: [{"product_image_id": "2264", "url": "https://ik.imagekit.io/oishidam/products/9bf9c331-e232-4788-b9f3-feaf0b0bf6a7_vfUY118tt.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 당질 60% 오프 초코넛츠 300g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2266", "sku_code": "NPPIP-DEMO-17889207126", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2281", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 당질 50% 오프 프리미엄 과일 300g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:12.358033", "deleted_at": null,
    images: [{"product_image_id": "2265", "url": "https://ik.imagekit.io/oishidam/products/76d5f8f9-c6e4-4144-a253-5a25414b9be7_F9CFQ49fVo.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 당질 50% 오프 프리미엄 과일 300g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2267", "sku_code": "NPPIP-DEMO-17889207125", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2282", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 고구마 280g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:12.837705", "deleted_at": null,
    images: [{"product_image_id": "2266", "url": "https://ik.imagekit.io/oishidam/products/5866c9b5-244b-441f-aec6-b406205113ae_RS8A--wEp.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 고구마 280g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2268", "sku_code": "NPPIP-DEMO-17889207114", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2283", "category_id": "78", "name": "닛신 고로그라 그래놀라 시리얼 피스타치오 280g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:13.460797", "deleted_at": null,
    images: [{"product_image_id": "2267", "url": "https://ik.imagekit.io/oishidam/products/29401016-039f-4db7-9e9f-20f2c3254ed1_mO10NvQZ5d.webp", "alt_text": "닛신 고로그라 그래놀라 시리얼 피스타치오 280g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2269", "sku_code": "NPPIP-DEMO-17889207113", "variant_name": "기본", "option_values": {}, "price": 8500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2284", "category_id": "69", "name": "S&B 스파이시 매운 카레 파우더 분말 84g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:14.159435", "deleted_at": null,
    images: [{"product_image_id": "2268", "url": "https://ik.imagekit.io/oishidam/products/62501944-ab96-4d98-b415-905f39890120_qPKoWpK2A.webp", "alt_text": "S&B 스파이시 매운 카레 파우더 분말 84g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2270", "sku_code": "NPPIP-DEMO-1788767723", "variant_name": "기본", "option_values": {}, "price": 7450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2285", "category_id": "75", "name": "키타노시호 성게알 우니 간장 150ml", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:14.236301", "deleted_at": null,
    images: [{"product_image_id": "2269", "url": "https://ik.imagekit.io/oishidam/products/a0d7bdf2-16bf-4dee-8a27-31f1bb3ffd42_eHc8zCnSp1.webp", "alt_text": "키타노시호 성게알 우니 간장 150ml", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2271", "sku_code": "NPPIP-DEMO-1788745734", "variant_name": "기본", "option_values": {}, "price": 18900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2286", "category_id": "72", "name": "닛신 면장인 장인의 카모다시 논프라이면 간장 중화소바 83g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:14.754478", "deleted_at": null,
    images: [{"product_image_id": "2270", "url": "https://ik.imagekit.io/oishidam/products/d1139845-3be1-46d9-a323-2ec9b4111746_ogr6taH8B.webp", "alt_text": "닛신 면장인 장인의 카모다시 논프라이면 간장 중화소바 83g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2272", "sku_code": "NPPIP-DEMO-1788505981", "variant_name": "기본", "option_values": {}, "price": 3400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2287", "category_id": "67", "name": "(수량 한정) 패밀리마트 메쉬 파우치 블루그레이", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:15.247301", "deleted_at": null,
    images: [{"product_image_id": "2271", "url": "https://ik.imagekit.io/oishidam/products/2955f243-15c1-4992-994b-3f0b150c4d34_fB7PEt4_CI.webp", "alt_text": "(수량 한정) 패밀리마트 메쉬 파우치 블루그레이", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2273", "sku_code": "NPPIP-DEMO-1788406668", "variant_name": "기본", "option_values": {}, "price": 10900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2288", "category_id": "69", "name": "하우스 양파 카레 어니언커리 부용 육수 풍미 150g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:16.055272", "deleted_at": null,
    images: [{"product_image_id": "2272", "url": "https://ik.imagekit.io/oishidam/products/d2ce4db2-c73c-4aaf-bd74-9ef5e02468c1_HQQeqpua3.webp", "alt_text": "하우스 양파 카레 어니언커리 부용 육수 풍미 150g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2274", "sku_code": "NPPIP-DEMO-1788332166", "variant_name": "기본", "option_values": {}, "price": 4400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2289", "category_id": "69", "name": "하우스 양파 카레 어니언커리 생크림 풍미 150g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:16.36488", "deleted_at": null,
    images: [{"product_image_id": "2273", "url": "https://ik.imagekit.io/oishidam/products/da56488f-1820-4316-b8cd-37d7c44e0752_DefwrEg8_.webp", "alt_text": "하우스 양파 카레 어니언커리 생크림 풍미 150g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2275", "sku_code": "NPPIP-DEMO-1788332069", "variant_name": "기본", "option_values": {}, "price": 4400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2290", "category_id": "72", "name": "닛신 UFO 불닭까르보나라 야끼소바 101g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:16.672264", "deleted_at": null,
    images: [{"product_image_id": "2274", "url": "https://ik.imagekit.io/oishidam/products/852124b5-70c3-42ec-a0f2-1f024f70a096_S8_suCQbU.webp", "alt_text": "닛신 UFO 불닭까르보나라 야끼소바 101g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2276", "sku_code": "NPPIP-DEMO-1788321438", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2291", "category_id": "70", "name": "웰나 청의동굴 페페론치노 파스타 소스 2개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:17.09145", "deleted_at": null,
    images: [{"product_image_id": "2275", "url": "https://ik.imagekit.io/oishidam/products/15c46f09-b4fe-4c84-acc3-43ccc928d33d_chR9x1nKz.webp", "alt_text": "웰나 청의동굴 페페론치노 파스타 소스 2개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2277", "sku_code": "NPPIP-DEMO-1788318070", "variant_name": "기본", "option_values": {}, "price": 5800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2292", "category_id": "82", "name": "AGF Blendy 블랜디 카페라토리 농후 비터 카페라떼 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:17.795442", "deleted_at": null,
    images: [{"product_image_id": "2276", "url": "https://ik.imagekit.io/oishidam/products/b8a53a5e-7dad-4e17-9aad-6c1fba084c81_pNOwPo94-.webp", "alt_text": "AGF Blendy 블랜디 카페라토리 농후 비터 카페라떼 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2278", "sku_code": "NPPIP-DEMO-1788312934", "variant_name": "기본", "option_values": {}, "price": 4900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2293", "category_id": "87", "name": "후지야 밀키 팝캔디 20개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:18.336098", "deleted_at": null,
    images: [{"product_image_id": "2277", "url": "https://ik.imagekit.io/oishidam/products/c4df8cf8-15d1-4f60-84ad-e74b832a999d_5lcceX_jh.webp", "alt_text": "후지야 밀키 팝캔디 20개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2279", "sku_code": "NPPIP-DEMO-1788250522", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2294", "category_id": "88", "name": "오리히로 기간 한정 곤약젤리 파우치 포도당 라무네 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:18.522654", "deleted_at": null,
    images: [{"product_image_id": "2278", "url": "https://ik.imagekit.io/oishidam/products/e45e7fb4-de1e-48ac-9e9c-2b250e88d642_pYodhSUuY.webp", "alt_text": "오리히로 기간 한정 곤약젤리 파우치 포도당 라무네 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2280", "sku_code": "NPPIP-DEMO-17882434617", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2295", "category_id": "88", "name": "오리히로 기간 한정 곤약젤리 파우치 거봉+배 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:19.157062", "deleted_at": null,
    images: [{"product_image_id": "2279", "url": "https://ik.imagekit.io/oishidam/products/ced929f7-f4e4-48d7-b438-9f75905f4c41_h5PTqGx-0.webp", "alt_text": "오리히로 기간 한정 곤약젤리 파우치 거봉+배 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2281", "sku_code": "NPPIP-DEMO-17882434606", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2296", "category_id": "88", "name": "오리히로 기간 한정 곤약젤리 파우치 딸기+온주귤 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:19.732798", "deleted_at": null,
    images: [{"product_image_id": "2280", "url": "https://ik.imagekit.io/oishidam/products/aaf5aa72-9332-4204-9d10-d978cdcb787a_dx_KgNKR_.webp", "alt_text": "오리히로 기간 한정 곤약젤리 파우치 딸기+온주귤 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2282", "sku_code": "NPPIP-DEMO-17882434585", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2297", "category_id": "88", "name": "오리히로 곤약젤리 파우치 포도+복숭아+오렌지 24개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:20.276859", "deleted_at": null,
    images: [{"product_image_id": "2281", "url": "https://ik.imagekit.io/oishidam/products/8cb24db4-1de6-4c13-af3f-d832a0a3598d_8PTwftToMM.webp", "alt_text": "오리히로 곤약젤리 파우치 포도+복숭아+오렌지 24개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2283", "sku_code": "NPPIP-DEMO-17882434584", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2298", "category_id": "88", "name": "오리히로 기간 한정 곤약젤리 파우치 배 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:20.550019", "deleted_at": null,
    images: [{"product_image_id": "2282", "url": "https://ik.imagekit.io/oishidam/products/da8cf128-0716-4a74-960d-2911625542e5_oDP5Qc8mV.webp", "alt_text": "오리히로 기간 한정 곤약젤리 파우치 배 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2284", "sku_code": "NPPIP-DEMO-17882434573", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2299", "category_id": "79", "name": "무인양품 소재를 살린 꿀 바른 옥수수 스낵 대용량 200g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:20.868599", "deleted_at": null,
    images: [{"product_image_id": "2283", "url": "https://ik.imagekit.io/oishidam/products/2bf070b2-ec13-477b-9484-132d3625eb8b_U9RgOi2Hu.webp", "alt_text": "무인양품 소재를 살린 꿀 바른 옥수수 스낵 대용량 200g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2285", "sku_code": "NPPIP-DEMO-1788166522", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2300", "category_id": "88", "name": "세븐일레븐 칸로 칸데미나 창과 방패 애플소다 화이트소다맛 젤리 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:21.666466", "deleted_at": null,
    images: [{"product_image_id": "2284", "url": "https://ik.imagekit.io/oishidam/products/01c3ba4c-7183-4c9f-aa5e-13531dcb7df0_ACVStqeJN.webp", "alt_text": "세븐일레븐 칸로 칸데미나 창과 방패 애플소다 화이트소다맛 젤리 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2286", "sku_code": "NPPIP-DEMO-1788158639", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2301", "category_id": "88", "name": "세븐일레븐 후지야 마루데 루비 자몽 젤리 44g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:22.179444", "deleted_at": null,
    images: [{"product_image_id": "2285", "url": "https://ik.imagekit.io/oishidam/products/77cb740b-8952-4607-81e5-83ec27c48a54_z9fb4bhZi.webp", "alt_text": "세븐일레븐 후지야 마루데 루비 자몽 젤리 44g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2287", "sku_code": "NPPIP-DEMO-1788158509", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2302", "category_id": "64", "name": "세븐일레븐 크로마라이프 자쿠라메 구미 미니 콜라맛 젤리 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:22.350879", "deleted_at": null,
    images: [{"product_image_id": "2286", "url": "https://ik.imagekit.io/oishidam/products/17ef9270-aaa5-4cd0-847b-a5259ea73867_4V4nP4rMj.webp", "alt_text": "세븐일레븐 크로마라이프 자쿠라메 구미 미니 콜라맛 젤리 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2288", "sku_code": "NPPIP-DEMO-1788158194", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2303", "category_id": "74", "name": "산요 삿포로이치방 명점의 맛 히로시마식 국물없는 탄탄멘 103g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2287", "url": "https://ik.imagekit.io/oishidam/products/bab37350-051a-4f9a-91e9-71fdf383e8f5_eqkpWLlOC.webp", "alt_text": "산요 삿포로이치방 명점의 맛 히로시마식 국물없는 탄탄멘 103g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2289", "sku_code": "NPPIP-DEMO-1788157038", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2304", "category_id": "72", "name": "닛신 돈베이 특대 와풍 스파이스 카레 키츠네 우동 120g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:23.567346", "deleted_at": null,
    images: [{"product_image_id": "2288", "url": "https://ik.imagekit.io/oishidam/products/f161320a-b209-4e12-821b-8da09ca4c62a_9UVSOfAiwx.webp", "alt_text": "닛신 돈베이 특대 와풍 스파이스 카레 키츠네 우동 120g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2290", "sku_code": "NPPIP-DEMO-1788156779", "variant_name": "기본", "option_values": {}, "price": 4350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2305", "category_id": "72", "name": "닛신 컵누들 빅컵 히지카라 스태미너 매콤한 마라 마늘 간장맛 102g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:24.129823", "deleted_at": null,
    images: [{"product_image_id": "2289", "url": "https://ik.imagekit.io/oishidam/products/f8b13493-abf7-44e6-9e14-39f4aeb948eb_bMryAHLeg.webp", "alt_text": "닛신 컵누들 빅컵 히지카라 스태미너 매콤한 마라 마늘 간장맛 102g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2291", "sku_code": "NPPIP-DEMO-1788156668", "variant_name": "기본", "option_values": {}, "price": 4350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2306", "category_id": "79", "name": "이와츠카 시골 오카키 자라메 쌀과자 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:24.203254", "deleted_at": null,
    images: [{"product_image_id": "2290", "url": "https://ik.imagekit.io/oishidam/products/c9c2de24-64d7-432e-a851-d78992b63093_oRW9Tdpxi8.webp", "alt_text": "이와츠카 시골 오카키 자라메 쌀과자 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2292", "sku_code": "NPPIP-DEMO-1787882055", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2307", "category_id": "88", "name": "카스가이 쯔부구미 프리미엄 농후 포도맛 젤리 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:24.600415", "deleted_at": null,
    images: [{"product_image_id": "2291", "url": "https://ik.imagekit.io/oishidam/products/54a99042-48a8-40c5-8608-eb20af96350e_988tA4JWB.webp", "alt_text": "카스가이 쯔부구미 프리미엄 농후 포도맛 젤리 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2293", "sku_code": "NPPIP-DEMO-1787879460", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2308", "category_id": "79", "name": "토하토 올오사츠 고구마 쿠키 12매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:25.486373", "deleted_at": null,
    images: [{"product_image_id": "2292", "url": "https://ik.imagekit.io/oishidam/products/a2d56f6c-19df-40a3-acde-ef4124197acc_XtR8jFOo7.webp", "alt_text": "토하토 올오사츠 고구마 쿠키 12매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2294", "sku_code": "NPPIP-DEMO-1787721114", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2309", "category_id": "79", "name": "토하토 캬라멜콘 밤맛 62g 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:26.062944", "deleted_at": null,
    images: [{"product_image_id": "2293", "url": "https://ik.imagekit.io/oishidam/products/26fa0d63-03a4-4d64-ba5a-03abfa116339_HKtW1aypJ.webp", "alt_text": "토하토 캬라멜콘 밤맛 62g 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2295", "sku_code": "NPPIP-DEMO-1787714266", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2310", "category_id": "77", "name": "올슨 오르손 홋카이도 까망베르 치즈 샌드 92g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:26.139539", "deleted_at": null,
    images: [{"product_image_id": "2294", "url": "https://ik.imagekit.io/oishidam/products/5b3c106a-3e2e-4901-bb97-3dfc1a6f4fdd_i8pN7pLiP.webp", "alt_text": "올슨 오르손 홋카이도 까망베르 치즈 샌드 92g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2296", "sku_code": "NPPIP-DEMO-1787647673", "variant_name": "기본", "option_values": {}, "price": 10800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2311", "category_id": "88", "name": "노벨 부드러운 과일 젤리 후르츠 어소트 230g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:26.482202", "deleted_at": null,
    images: [{"product_image_id": "2295", "url": "https://ik.imagekit.io/oishidam/products/6d7a3a09-bb58-49eb-9978-40c5a0f33297_PQ2ZdI04xW.webp", "alt_text": "노벨 부드러운 과일 젤리 후르츠 어소트 230g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2297", "sku_code": "NPPIP-DEMO-1787643243", "variant_name": "기본", "option_values": {}, "price": 6400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2312", "category_id": "79", "name": "텐로쿠 포리피 스위트 소금카라멜맛 땅콩과자 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:27.368305", "deleted_at": null,
    images: [{"product_image_id": "2296", "url": "https://ik.imagekit.io/oishidam/products/63c42773-3ac5-43e9-a2b7-de3bbfbd6207_ES7oEenKO.webp", "alt_text": "텐로쿠 포리피 스위트 소금카라멜맛 땅콩과자 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2298", "sku_code": "NPPIP-DEMO-1787558431", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2313", "category_id": "88", "name": "칸로 퓨레구미 프리미엄 배맛 젤리 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:27.77186", "deleted_at": null,
    images: [{"product_image_id": "2297", "url": "https://ik.imagekit.io/oishidam/products/e9e411fb-b01b-4e60-8837-246564a33215_DP9iA8MG4.webp", "alt_text": "칸로 퓨레구미 프리미엄 배맛 젤리 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2299", "sku_code": "NPPIP-DEMO-1787553032", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2314", "category_id": "89", "name": "모리나가 코에다 잔가지 몽블랑 타르트맛 11봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:28.051506", "deleted_at": null,
    images: [{"product_image_id": "2298", "url": "https://ik.imagekit.io/oishidam/products/c76e148e-9747-49a1-afd2-b40a0a31b566_fZJ9DcfYd.webp", "alt_text": "모리나가 코에다 잔가지 몽블랑 타르트맛 11봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2300", "sku_code": "NPPIP-DEMO-1787109537", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2315", "category_id": "79", "name": "가루비 카타아게 포테토칩 오니우마 블랙페퍼맛 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:28.616501", "deleted_at": null,
    images: [{"product_image_id": "2299", "url": "https://ik.imagekit.io/oishidam/products/ecb7ed43-02e5-4c78-b7d3-5746e7d932c7_FSYIBR0ru.webp", "alt_text": "가루비 카타아게 포테토칩 오니우마 블랙페퍼맛 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2301", "sku_code": "NPPIP-DEMO-1787015833", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2316", "category_id": "79", "name": "산코제과 마루다이즈 센베이 에다마메 소금맛 10매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:29.261433", "deleted_at": null,
    images: [{"product_image_id": "2300", "url": "https://ik.imagekit.io/oishidam/products/242e4df1-76fe-4ebc-9f2b-c0c8581b06c9_LzoGi0WEW.webp", "alt_text": "산코제과 마루다이즈 센베이 에다마메 소금맛 10매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2302", "sku_code": "NPPIP-DEMO-1786678122", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2317", "category_id": "67", "name": "패밀리마트 도쿄아부라구미 총본점 아부라소바 컵라면 151g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:29.636726", "deleted_at": null,
    images: [{"product_image_id": "2301", "url": "https://ik.imagekit.io/oishidam/products/b247a439-de87-4801-af1e-9aa9ed7b6f15_YCkVDAzWm.webp", "alt_text": "패밀리마트 도쿄아부라구미 총본점 아부라소바 컵라면 151g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2303", "sku_code": "NPPIP-DEMO-1786609683", "variant_name": "기본", "option_values": {}, "price": 5600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2318", "category_id": "72", "name": "닛신 그릇으로 먹는 컵누들 3봉입 된장맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:29.931695", "deleted_at": null,
    images: [{"product_image_id": "2302", "url": "https://ik.imagekit.io/oishidam/products/6edfed61-0c25-4540-af97-fd5cde399009_0BoSzc4jj.webp", "alt_text": "닛신 그릇으로 먹는 컵누들 3봉입 된장맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2304", "sku_code": "NPPIP-DEMO-1786585157", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2319", "category_id": "72", "name": "닛신 그릇으로 먹는 컵누들 3봉입 매운맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:30.473754", "deleted_at": null,
    images: [{"product_image_id": "2303", "url": "https://ik.imagekit.io/oishidam/products/925fd2c6-61d1-45fb-9da4-45df8170ad66_ir4mgzR9np.webp", "alt_text": "닛신 그릇으로 먹는 컵누들 3봉입 매운맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2305", "sku_code": "NPPIP-DEMO-1786585040", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2320", "category_id": "72", "name": "닛신 그릇으로 먹는 컵누들 3봉입 오리지널맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:31.156375", "deleted_at": null,
    images: [{"product_image_id": "2304", "url": "https://ik.imagekit.io/oishidam/products/b6f9c2d4-52f1-4f8a-87d8-07cd2168fc48_vFLoCt-G7.webp", "alt_text": "닛신 그릇으로 먹는 컵누들 3봉입 오리지널맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2306", "sku_code": "NPPIP-DEMO-1786584903", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2321", "category_id": "72", "name": "닛신 그릇으로 먹는 컵누들 3봉입 시푸드맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:31.528194", "deleted_at": null,
    images: [{"product_image_id": "2305", "url": "https://ik.imagekit.io/oishidam/products/56bc2ab2-fc35-493d-a2ec-194e099ecd2f_y3E4CBVUo.webp", "alt_text": "닛신 그릇으로 먹는 컵누들 3봉입 시푸드맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2307", "sku_code": "NPPIP-DEMO-1786584830", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2322", "category_id": "72", "name": "닛신 그릇으로 먹는 컵누들 3봉입 유자우동맛", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:31.870183", "deleted_at": null,
    images: [{"product_image_id": "2306", "url": "https://ik.imagekit.io/oishidam/products/cdce7f75-a764-4a33-b54f-5a4365f0d747_xindNa8UH.webp", "alt_text": "닛신 그릇으로 먹는 컵누들 3봉입 유자우동맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2308", "sku_code": "NPPIP-DEMO-1786584697", "variant_name": "기본", "option_values": {}, "price": 5200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2323", "category_id": "88", "name": "카바야 스이카 구미 수박맛 젤리 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:32.147119", "deleted_at": null,
    images: [{"product_image_id": "2307", "url": "https://ik.imagekit.io/oishidam/products/354ec62b-a1dc-4440-a773-e5b1d5c1de17_NHSBH1CqW.webp", "alt_text": "카바야 스이카 구미 수박맛 젤리 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2309", "sku_code": "NPPIP-DEMO-1786415745", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2324", "category_id": "94", "name": "s&b 키자미 유즈 유자 튜브형 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:33.067035", "deleted_at": null,
    images: [{"product_image_id": "2308", "url": "https://ik.imagekit.io/oishidam/products/036a6cb2-852d-442d-bf95-2528b5a0efbc_W35AGWwjR.webp", "alt_text": "s&b 키자미 유즈 유자 튜브형 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2310", "sku_code": "NPPIP-DEMO-1786331239", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2325", "category_id": "94", "name": "에스비 s&b 키자미 청시소 다진 차조기 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:33.451466", "deleted_at": null,
    images: [{"product_image_id": "2309", "url": "https://ik.imagekit.io/oishidam/products/2b75c166-be11-4e47-882f-4f19cfbcd384_3qHTpxu0eV.webp", "alt_text": "에스비 s&b 키자미 청시소 다진 차조기 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2311", "sku_code": "NPPIP-DEMO-1786080485", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2326", "category_id": "86", "name": "롯데 도라에몽 풍선껌 츄잉껌 5개입 20개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:33.53161", "deleted_at": null,
    images: [{"product_image_id": "2310", "url": "https://ik.imagekit.io/oishidam/products/7588c9b9-5a04-4775-a67f-09cd1d8a69a3_w_0nmFWVy.webp", "alt_text": "롯데 도라에몽 풍선껌 츄잉껌 5개입 20개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2312", "sku_code": "NPPIP-DEMO-1785999596", "variant_name": "기본", "option_values": {}, "price": 30000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2327", "category_id": "89", "name": "후지야 LOOK 룩 초콜릿 고구마 스위트포테토 밤 몽블랑맛 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:34.074331", "deleted_at": null,
    images: [{"product_image_id": "2311", "url": "https://ik.imagekit.io/oishidam/products/7f798bff-40d4-4844-959d-2df711b9426d_B9gY8a5NP.webp", "alt_text": "후지야 LOOK 룩 초콜릿 고구마 스위트포테토 밤 몽블랑맛 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2313", "sku_code": "NPPIP-DEMO-1785977198", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2328", "category_id": "79", "name": "가루비 얇은 자가비 사워크림 어니언맛 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:34.806878", "deleted_at": null,
    images: [{"product_image_id": "2312", "url": "https://ik.imagekit.io/oishidam/products/b36b9e78-1b53-4482-b68a-57d1596d2a5a_PmvFDI9au.webp", "alt_text": "가루비 얇은 자가비 사워크림 어니언맛 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2314", "sku_code": "NPPIP-DEMO-1785913569", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2329", "category_id": "83", "name": "무인양품 물에 잘 녹는 마이보틀 스틱 얼그레이티 파우더 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:34.915784", "deleted_at": null,
    images: [{"product_image_id": "2313", "url": "https://ik.imagekit.io/oishidam/products/935b3ce9-b858-408b-96e3-6a30427d18fd_5zgaY070w.webp", "alt_text": "무인양품 물에 잘 녹는 마이보틀 스틱 얼그레이티 파우더 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2315", "sku_code": "NPPIP-DEMO-17858939615", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2330", "category_id": "83", "name": "무인양품 물에 잘 녹는 마이보틀 스틱 논카페인 검은콩차 파우더 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:35.194721", "deleted_at": null,
    images: [{"product_image_id": "2314", "url": "https://ik.imagekit.io/oishidam/products/e6e657c3-a7e2-4c75-b54a-e7bc2375f23f_m21QEPNM1.webp", "alt_text": "무인양품 물에 잘 녹는 마이보틀 스틱 논카페인 검은콩차 파우더 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2316", "sku_code": "NPPIP-DEMO-17858939614", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2331", "category_id": "83", "name": "무인양품 물에 잘 녹는 마이보틀 스틱 논카페인 루이보스티 파우더 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:35.766747", "deleted_at": null,
    images: [{"product_image_id": "2315", "url": "https://ik.imagekit.io/oishidam/products/c5f8a979-6a28-4743-b5a8-7f5fb0db69c1_LrCK7XYJV.webp", "alt_text": "무인양품 물에 잘 녹는 마이보틀 스틱 논카페인 루이보스티 파우더 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2317", "sku_code": "NPPIP-DEMO-17858939593", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2332", "category_id": "71", "name": "닛신 매운 돈베이 소고기 육수 소바 94g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2316", "url": "https://ik.imagekit.io/oishidam/products/556d7626-6c0a-4209-abd9-a4fa9a26c699_Y-FVJYwQl.webp", "alt_text": "닛신 매운 돈베이 소고기 육수 소바 94g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2318", "sku_code": "NPPIP-DEMO-17858310376", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2333", "category_id": "88", "name": "칸로 칸데미나 구미 젤리 W임팩트 에너지소다맛 72g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:36.994734", "deleted_at": null,
    images: [{"product_image_id": "2318", "url": "https://ik.imagekit.io/oishidam/products/21e9ee39-059d-4447-8a45-66dabfe57bf0_OIj-RyVJd.webp", "alt_text": "칸로 칸데미나 구미 젤리 W임팩트 에너지소다맛 72g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2319", "sku_code": "NPPIP-DEMO-1785825745", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2334", "category_id": "82", "name": "AGF Blendy 카페라토리 스틱 진한 스트로베리 화이트 쇼콜라 라떼 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:36.885782", "deleted_at": null,
    images: [{"product_image_id": "2317", "url": "https://ik.imagekit.io/oishidam/products/5f68f986-2165-4bb9-85a6-4ad092537aca_mxFY6g6Y5.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 스트로베리 화이트 쇼콜라 라떼 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2320", "sku_code": "NPPIP-DEMO-17858027129", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2335", "category_id": "82", "name": "AGF Blendy 카페라토리 스틱 진한 티라미수 쇼콜라 라떼 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:37.63311", "deleted_at": null,
    images: [{"product_image_id": "2319", "url": "https://ik.imagekit.io/oishidam/products/1e123b82-98e0-4e87-b2c0-b10d5175fc90_6o8280dgg.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 티라미수 쇼콜라 라떼 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2321", "sku_code": "NPPIP-DEMO-17858027118", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2336", "category_id": "82", "name": "AGF Blendy 카페라토리 스틱 진한 피스타치오 화이트 쇼콜라 라떼 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:38.406669", "deleted_at": null,
    images: [{"product_image_id": "2320", "url": "https://ik.imagekit.io/oishidam/products/6b2c4728-f105-4233-8a8d-f0177be5bb68_wrD11RIXs.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 피스타치오 화이트 쇼콜라 라떼 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2322", "sku_code": "NPPIP-DEMO-17858027117", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2337", "category_id": "82", "name": "AGF Blendy 카페라토리 스틱 진한 메이플 헤이즐넛 라떼 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:38.749682", "deleted_at": null,
    images: [{"product_image_id": "2322", "url": "https://ik.imagekit.io/oishidam/products/e83cc44f-4ea7-4e75-bb9b-20b42cc7d995_r8qo4BPrb.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 메이플 헤이즐넛 라떼 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2323", "sku_code": "NPPIP-DEMO-17858027116", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2338", "category_id": "83", "name": "AGF Blendy 카페라토리 스틱 진한 밀크티 라떼 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:38.703015", "deleted_at": null,
    images: [{"product_image_id": "2321", "url": "https://ik.imagekit.io/oishidam/products/4bc44bc8-ed5a-4d26-9ee8-9965a0f5e1a9_0MC-XFkKcd.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 밀크티 라떼 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2324", "sku_code": "NPPIP-DEMO-17858027115", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2339", "category_id": "82", "name": "AGF Blendy 카페라토리 스틱 진한 크리미 디카페인 카페라떼 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:39.507467", "deleted_at": null,
    images: [{"product_image_id": "2323", "url": "https://ik.imagekit.io/oishidam/products/b29079a5-5051-4a80-beb3-98d850fca220_3iNVEPX2Ad.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 크리미 디카페인 카페라떼 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2325", "sku_code": "NPPIP-DEMO-17858027104", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2340", "category_id": "82", "name": "AGF Blendy 카페라토리 스틱 진한 캬라멜라떼 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:40.547856", "deleted_at": null,
    images: [{"product_image_id": "2325", "url": "https://ik.imagekit.io/oishidam/products/480f9ca0-8994-4de7-adf4-6a0daa1094ca_5Ev_wty1w.webp", "alt_text": "AGF Blendy 카페라토리 스틱 진한 캬라멜라떼 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2326", "sku_code": "NPPIP-DEMO-17858027103", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2341", "category_id": "87", "name": "칸로 넛츠본 땅콩 캬라멜맛 크런치 캔디 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:40.422484", "deleted_at": null,
    images: [{"product_image_id": "2324", "url": "https://ik.imagekit.io/oishidam/products/2fa10d78-d1ea-4e60-89fb-7b8d88b1dba8_pNxVNNxTl.webp", "alt_text": "칸로 넛츠본 땅콩 캬라멜맛 크런치 캔디 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2327", "sku_code": "NPPIP-DEMO-1785742992", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2342", "category_id": "65", "name": "로손 얇게 구운 매운맛 센베이 35g 편의점 과자 안주", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:40.609979", "deleted_at": null,
    images: [{"product_image_id": "2326", "url": "https://ik.imagekit.io/oishidam/products/32816f98-e9bd-41bf-bc59-4fe0ec6df2df_mx3BxIK2R.webp", "alt_text": "로손 얇게 구운 매운맛 센베이 35g 편의점 과자 안주", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2328", "sku_code": "NPPIP-DEMO-1785122246", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2343", "category_id": "65", "name": "로손 프레첼 바나나초콜릿 40g 편의점 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:41.793349", "deleted_at": null,
    images: [{"product_image_id": "2327", "url": "https://ik.imagekit.io/oishidam/products/9cb1139f-d3bf-4986-90e5-0b64c5ceb17a_lxex8T3m_.webp", "alt_text": "로손 프레첼 바나나초콜릿 40g 편의점 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2329", "sku_code": "NPPIP-DEMO-1785122161", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2344", "category_id": "94", "name": "하우스식품 유자 시치미 14g 일본 조미료", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:42.353463", "deleted_at": null,
    images: [{"product_image_id": "2328", "url": "https://ik.imagekit.io/oishidam/products/c8725495-d259-4957-9c05-cbbefa611352_n11IXzii8.webp", "alt_text": "하우스식품 유자 시치미 14g 일본 조미료", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2330", "sku_code": "NPPIP-DEMO-1785115471", "variant_name": "기본", "option_values": {}, "price": 5300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2345", "category_id": "83", "name": "이토엔 북해도 홋카이도 옥수수차 티백 14개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:42.446435", "deleted_at": null,
    images: [{"product_image_id": "2330", "url": "https://ik.imagekit.io/oishidam/products/c8b27f3f-a783-4372-ae9b-07048605c918_040LljQDl.webp", "alt_text": "이토엔 북해도 홋카이도 옥수수차 티백 14개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2331", "sku_code": "NPPIP-DEMO-1784790053", "variant_name": "기본", "option_values": {}, "price": 8950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2346", "category_id": "88", "name": "오리히로 곤약젤리 프리미엄 카페 흑당 와라비모찌 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:42.421596", "deleted_at": null,
    images: [{"product_image_id": "2329", "url": "https://ik.imagekit.io/oishidam/products/922e1bea-15e2-42a5-aec9-86e6b9bb476c_Qjhb7VoBK.webp", "alt_text": "오리히로 곤약젤리 프리미엄 카페 흑당 와라비모찌 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2332", "sku_code": "NPPIP-DEMO-1784771336", "variant_name": "기본", "option_values": {}, "price": 3100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2347", "category_id": "88", "name": "칸로 어느날 꿈에 본 구름 젤리 화이트소다맛 46g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:43.630991", "deleted_at": null,
    images: [{"product_image_id": "2331", "url": "https://ik.imagekit.io/oishidam/products/51c85c9d-1529-45fd-ac2a-4415b3a42ab7_eKdonpF5U.webp", "alt_text": "칸로 어느날 꿈에 본 구름 젤리 화이트소다맛 46g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2333", "sku_code": "NPPIP-DEMO-1784770477", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2348", "category_id": "94", "name": "S&B 에스비 매직 솔트 바베큐 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:44.301256", "deleted_at": null,
    images: [{"product_image_id": "2332", "url": "https://ik.imagekit.io/oishidam/products/a608acf1-9c52-4ec0-88ca-71935c0e601a_zO7mkLEyY.webp", "alt_text": "S&B 에스비 매직 솔트 바베큐 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2334", "sku_code": "NPPIP-DEMO-17845306316", "variant_name": "기본", "option_values": {}, "price": 9500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2349", "category_id": "94", "name": "S&B 에스비 매직 솔트 유자 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:44.408817", "deleted_at": null,
    images: [{"product_image_id": "2333", "url": "https://ik.imagekit.io/oishidam/products/af6dad9b-1c80-4430-9f7e-25f10b079b2d_A6w-NiSKQ.webp", "alt_text": "S&B 에스비 매직 솔트 유자 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2335", "sku_code": "NPPIP-DEMO-17845306305", "variant_name": "기본", "option_values": {}, "price": 9500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2350", "category_id": "94", "name": "S&B 에스비 매직 솔트 갈릭 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:44.392634", "deleted_at": null,
    images: [{"product_image_id": "2334", "url": "https://ik.imagekit.io/oishidam/products/2e092ff9-3251-463b-a073-a8b5c47d2108_j8sgAlfPg.webp", "alt_text": "S&B 에스비 매직 솔트 갈릭 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2336", "sku_code": "NPPIP-DEMO-17845306304", "variant_name": "기본", "option_values": {}, "price": 9500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2351", "category_id": "86", "name": "롯데 체지방 케어 껌 스피아민트맛 14개입 20개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:45.302311", "deleted_at": null,
    images: [{"product_image_id": "2335", "url": "https://ik.imagekit.io/oishidam/products/a23befe7-1179-4336-a63b-9bfc1292bdfc_1Eo2A2XIu.webp", "alt_text": "롯데 체지방 케어 껌 스피아민트맛 14개입 20개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2337", "sku_code": "NPPIP-DEMO-1784525696", "variant_name": "기본", "option_values": {}, "price": 45000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2352", "category_id": "80", "name": "모리나가 가렛 샌드 쿠키 립톤 밀크티맛 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:46.181698", "deleted_at": null,
    images: [{"product_image_id": "2336", "url": "https://ik.imagekit.io/oishidam/products/3e7366d0-b0e0-41c6-934f-c0a5aa7caf8d_XirGVUHXZ.webp", "alt_text": "모리나가 가렛 샌드 쿠키 립톤 밀크티맛 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2338", "sku_code": "NPPIP-DEMO-1784093324", "variant_name": "기본", "option_values": {}, "price": 4750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2353", "category_id": "79", "name": "야오킨 우마이링 멘타이코맛 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:46.266346", "deleted_at": null,
    images: [{"product_image_id": "2338", "url": "https://ik.imagekit.io/oishidam/products/f401c1f4-2151-41f3-b638-04e17f7d2a64_L4R4ybfg6.webp", "alt_text": "야오킨 우마이링 멘타이코맛 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2339", "sku_code": "NPPIP-DEMO-17840826036", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2354", "category_id": "79", "name": "야오킨 우마이링 타코야끼맛 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:46.1837", "deleted_at": null,
    images: [{"product_image_id": "2337", "url": "https://ik.imagekit.io/oishidam/products/8f027d63-f36b-4599-9c23-68eebc0ee7a4_szNTWiETZ.webp", "alt_text": "야오킨 우마이링 타코야끼맛 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2340", "sku_code": "NPPIP-DEMO-17840826035", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2355", "category_id": "79", "name": "야오킨 우마이링 치즈맛 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:47.192362", "deleted_at": null,
    images: [{"product_image_id": "2339", "url": "https://ik.imagekit.io/oishidam/products/2745d056-29fd-419f-bb08-56bd44b1c387_ScZSSucXC.webp", "alt_text": "야오킨 우마이링 치즈맛 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2341", "sku_code": "NPPIP-DEMO-17840826034", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2356", "category_id": "79", "name": "야오킨 우마이링 샐러드맛 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:48.078391", "deleted_at": null,
    images: [{"product_image_id": "2340", "url": "https://ik.imagekit.io/oishidam/products/cc7108dd-2b91-4b46-a5ba-b762437ab196_l8RLy--Xh.webp", "alt_text": "야오킨 우마이링 샐러드맛 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2342", "sku_code": "NPPIP-DEMO-17840826033", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2357", "category_id": "79", "name": "글리코 프리츠 샐러드맛 대용량 8봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:48.124094", "deleted_at": null,
    images: [{"product_image_id": "2341", "url": "https://ik.imagekit.io/oishidam/products/2a1716ca-e24a-439e-a363-c4e29415af8c_sqd_ENDn6.webp", "alt_text": "글리코 프리츠 샐러드맛 대용량 8봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2343", "sku_code": "NPPIP-DEMO-1783488600", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2358", "category_id": "87", "name": "롯데 코우메 매실맛 캔디 일본 사탕 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:48.19235", "deleted_at": null,
    images: [{"product_image_id": "2342", "url": "https://ik.imagekit.io/oishidam/products/b869f26f-d7fb-4700-8300-4065c03068a0_EusE4Q03D.webp", "alt_text": "롯데 코우메 매실맛 캔디 일본 사탕 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2344", "sku_code": "NPPIP-DEMO-1783321502", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2359", "category_id": "90", "name": "글리코 아몬드 캐러멜 캬라멜 카라멜 18개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:49.04312", "deleted_at": null,
    images: [{"product_image_id": "2343", "url": "https://ik.imagekit.io/oishidam/products/04235253-e2ea-45d9-9270-8cfefc07a642_1JTn4oA1i.webp", "alt_text": "글리코 아몬드 캐러멜 캬라멜 카라멜 18개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2345", "sku_code": "NPPIP-DEMO-1783306212", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2360", "category_id": "67", "name": "패밀리마트 드라이 모모 반건조 말린 복숭아 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:49.988586", "deleted_at": null,
    images: [{"product_image_id": "2345", "url": "https://ik.imagekit.io/oishidam/products/56f1f348-5327-45b6-8cc1-feb917fe9a73_D-lCvSVDn.webp", "alt_text": "패밀리마트 드라이 모모 반건조 말린 복숭아 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2346", "sku_code": "NPPIP-DEMO-1783040813", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2361", "category_id": "67", "name": "패밀리마트 드라이 링고 반건조 말린 사과 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:50.230478", "deleted_at": null,
    images: [{"product_image_id": "2346", "url": "https://ik.imagekit.io/oishidam/products/beb1fe5f-25d3-4d03-b1e7-1d9057da336e_hCTR5ZrNB.webp", "alt_text": "패밀리마트 드라이 링고 반건조 말린 사과 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2347", "sku_code": "NPPIP-DEMO-1783040429", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2362", "category_id": "87", "name": "아사히 민티아 브리즈 칼피스", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:49.895011", "deleted_at": null,
    images: [{"product_image_id": "2344", "url": "https://ik.imagekit.io/oishidam/products/e4d09b2e-1e5d-4d38-89fb-b348fd84e910_oViKJ31JN.webp", "alt_text": "아사히 민티아 브리즈 칼피스", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2348", "sku_code": "NPPIP-DEMO-178236569225", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2363", "category_id": "87", "name": "아사히 민티아 브리즈 진한 딸기", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:50.862946", "deleted_at": null,
    images: [{"product_image_id": "2347", "url": "https://ik.imagekit.io/oishidam/products/a7455879-60e2-4e08-b611-9e4596430192_kAoQEyyoG.webp", "alt_text": "아사히 민티아 브리즈 진한 딸기", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2349", "sku_code": "NPPIP-DEMO-178236569123", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2364", "category_id": "87", "name": "아사히 민티아 브리즈 샤이니 핑크", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:51.65082", "deleted_at": null,
    images: [{"product_image_id": "2348", "url": "https://ik.imagekit.io/oishidam/products/0a739666-045f-4781-991e-a49f3b8f4b70_RjwcQYNg_.webp", "alt_text": "아사히 민티아 브리즈 샤이니 핑크", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2350", "sku_code": "NPPIP-DEMO-178236569122", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2365", "category_id": "87", "name": "아사히 민티아 브리즈 후레쉬 레몬", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:51.713081", "deleted_at": null,
    images: [{"product_image_id": "2349", "url": "https://ik.imagekit.io/oishidam/products/70251828-e8ba-4e72-a572-05e11f0a5ca7_YN-dH6BKx.webp", "alt_text": "아사히 민티아 브리즈 후레쉬 레몬", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2351", "sku_code": "NPPIP-DEMO-178236569019", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2366", "category_id": "87", "name": "아사히 민티아 브리즈 크리스탈 실버", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:52.00779", "deleted_at": null,
    images: [{"product_image_id": "2350", "url": "https://ik.imagekit.io/oishidam/products/b35bbcfd-081c-49d2-a1de-24779af1c0a8_8etkG2jln.webp", "alt_text": "아사히 민티아 브리즈 크리스탈 실버", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2352", "sku_code": "NPPIP-DEMO-178236568718", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2367", "category_id": "87", "name": "아사히 민티아 브리즈 리프레쉬 블루", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:52.662567", "deleted_at": null,
    images: [{"product_image_id": "2351", "url": "https://ik.imagekit.io/oishidam/products/e6675bad-3713-46f2-8369-edff3a9bb32a_0gv5i2XoY.webp", "alt_text": "아사히 민티아 브리즈 리프레쉬 블루", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2353", "sku_code": "NPPIP-DEMO-178236568617", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2368", "category_id": "87", "name": "아사히 민티아 브리즈 샤인머스캣", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:53.331058", "deleted_at": null,
    images: [{"product_image_id": "2352", "url": "https://ik.imagekit.io/oishidam/products/2c5d5b28-6eeb-4436-863c-c5965f05f258_CHwIU0r66.webp", "alt_text": "아사히 민티아 브리즈 샤인머스캣", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2354", "sku_code": "NPPIP-DEMO-178236568413", "variant_name": "기본", "option_values": {}, "price": 2300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2369", "category_id": "87", "name": "아사히 민티아 클리어플러스 페퍼민트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:53.454756", "deleted_at": null,
    images: [{"product_image_id": "2353", "url": "https://ik.imagekit.io/oishidam/products/2e0869e0-a09b-42b6-a91c-ab923d8429e0_7p_2ib1Ch.webp", "alt_text": "아사히 민티아 클리어플러스 페퍼민트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2355", "sku_code": "NPPIP-DEMO-178236568310", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2370", "category_id": "87", "name": "아사히 민티아 포도", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:53.844124", "deleted_at": null,
    images: [{"product_image_id": "2354", "url": "https://ik.imagekit.io/oishidam/products/65502ea4-e653-42cc-a9c8-4ea63d547acd_L7CbWx5cy.webp", "alt_text": "아사히 민티아 포도", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2356", "sku_code": "NPPIP-DEMO-17823656839", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2371", "category_id": "87", "name": "아사히 민티아 콜드 스매시", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:54.420488", "deleted_at": null,
    images: [{"product_image_id": "2355", "url": "https://ik.imagekit.io/oishidam/products/b18e2941-3fab-4864-8ab4-4b8c92ccbb7d_qAwiFzZGx.webp", "alt_text": "아사히 민티아 콜드 스매시", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2357", "sku_code": "NPPIP-DEMO-17823656838", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2372", "category_id": "87", "name": "아사히 민티아 아쿠아 스파크", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:54.988263", "deleted_at": null,
    images: [{"product_image_id": "2356", "url": "https://ik.imagekit.io/oishidam/products/b796e79e-06f0-4e9f-a44b-35bf62b18d7d_2xvD9b1kJ.webp", "alt_text": "아사히 민티아 아쿠아 스파크", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2358", "sku_code": "NPPIP-DEMO-17823656814", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2373", "category_id": "87", "name": "아사히 민티아 드라이 하드", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:55.399321", "deleted_at": null,
    images: [{"product_image_id": "2357", "url": "https://ik.imagekit.io/oishidam/products/928039e9-d6b1-43c0-b751-3d6759cdcec2_6k1cDm75q.webp", "alt_text": "아사히 민티아 드라이 하드", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2359", "sku_code": "NPPIP-DEMO-17823656803", "variant_name": "기본", "option_values": {}, "price": 1900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2374", "category_id": "86", "name": "롯데 입에 붙지 않는 껌 기억력 유지 타입 부드러운 민트맛 14개입 15개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:55.973239", "deleted_at": null,
    images: [{"product_image_id": "2358", "url": "https://ik.imagekit.io/oishidam/products/498b04e9-997f-489c-8e02-4c950606de7e_2Iopf1zBN.webp", "alt_text": "롯데 입에 붙지 않는 껌 기억력 유지 타입 부드러운 민트맛 14개입 15개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2360", "sku_code": "NPPIP-DEMO-1782357772", "variant_name": "기본", "option_values": {}, "price": 34000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2375", "category_id": "86", "name": "롯데 입에 붙지 않는 껌 기억력 유지 타입 쌉싸름한 민트맛 14개입 20개세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:56.826224", "deleted_at": null,
    images: [{"product_image_id": "2359", "url": "https://ik.imagekit.io/oishidam/products/cbf15772-a75f-402a-acee-458f67a01096_R_alOTk1w.webp", "alt_text": "롯데 입에 붙지 않는 껌 기억력 유지 타입 쌉싸름한 민트맛 14개입 20개세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2361", "sku_code": "NPPIP-DEMO-1782357593", "variant_name": "기본", "option_values": {}, "price": 45000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2376", "category_id": "79", "name": "닛신 시스콘 사쿠사쿠 링 마일드초코맛 시리얼 200g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:57.059404", "deleted_at": null,
    images: [{"product_image_id": "2360", "url": "https://ik.imagekit.io/oishidam/products/5020d68c-e541-43a7-8f50-41d4f3280992_ZJQduIvwV.webp", "alt_text": "닛신 시스콘 사쿠사쿠 링 마일드초코맛 시리얼 200g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2362", "sku_code": "NPPIP-DEMO-1782113456", "variant_name": "기본", "option_values": {}, "price": 6300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2377", "category_id": "79", "name": "닛신 시스콘 사쿠사쿠 링 초코맛 시리얼 150g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:57.570933", "deleted_at": null,
    images: [{"product_image_id": "2361", "url": "https://ik.imagekit.io/oishidam/products/884d657d-50e3-4dd8-81fa-c13afc02271c_Uux9lWQ1Q.webp", "alt_text": "닛신 시스콘 사쿠사쿠 링 초코맛 시리얼 150g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2363", "sku_code": "NPPIP-DEMO-1782113270", "variant_name": "기본", "option_values": {}, "price": 6300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2378", "category_id": "72", "name": "동양수산 마루짱 야끼소바 벤또 컵라면 132g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:58.210636", "deleted_at": null,
    images: [{"product_image_id": "2362", "url": "https://ik.imagekit.io/oishidam/products/efe6758a-b0cd-4257-bbfe-fa3506f9e1f3_M8_4P5FC6.webp", "alt_text": "동양수산 마루짱 야끼소바 벤또 컵라면 132g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2364", "sku_code": "NPPIP-DEMO-1781763221", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2379", "category_id": "79", "name": "부르봉 히토구치 랑그레이스 초코볼 47g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:58.862617", "deleted_at": null,
    images: [{"product_image_id": "2363", "url": "https://ik.imagekit.io/oishidam/products/f4eff53d-eced-4aa2-86c2-bcca3ab60df2_Pm-92pe6J.webp", "alt_text": "부르봉 히토구치 랑그레이스 초코볼 47g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2365", "sku_code": "NPPIP-DEMO-1781597357", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2380", "category_id": "83", "name": "AGF 블렌디 마이보틀스틱 피치 루이보스티 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:59.075663", "deleted_at": null,
    images: [{"product_image_id": "2364", "url": "https://ik.imagekit.io/oishidam/products/ec1be5da-3208-42bd-86c3-6ad80e44bf4a_4pDeaAwwE.webp", "alt_text": "AGF 블렌디 마이보틀스틱 피치 루이보스티 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2366", "sku_code": "NPPIP-DEMO-17815710067", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2381", "category_id": "83", "name": "AGF 블렌디 마이보틀스틱 머스캣 루이보스티 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:18:59.485478", "deleted_at": null,
    images: [{"product_image_id": "2365", "url": "https://ik.imagekit.io/oishidam/products/990e9e7a-a1f9-417f-978f-94642e18c005_PIExLrUXI.webp", "alt_text": "AGF 블렌디 마이보틀스틱 머스캣 루이보스티 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2367", "sku_code": "NPPIP-DEMO-17815710055", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2382", "category_id": "83", "name": "AGF 블렌디 마이보틀스틱 4종의 블렌드 티 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:00.450331", "deleted_at": null,
    images: [{"product_image_id": "2366", "url": "https://ik.imagekit.io/oishidam/products/21c9b69d-300e-4bab-8950-7f18018b37ed_5L1nud_7A.webp", "alt_text": "AGF 블렌디 마이보틀스틱 4종의 블렌드 티 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2368", "sku_code": "NPPIP-DEMO-17815710054", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2383", "category_id": "83", "name": "AGF 블렌디 마이보틀스틱 녹차 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:01.001497", "deleted_at": null,
    images: [{"product_image_id": "2367", "url": "https://ik.imagekit.io/oishidam/products/ab8050eb-1fd8-44e5-ac05-a8eb5009e1bc_IxeRPp1OT.webp", "alt_text": "AGF 블렌디 마이보틀스틱 녹차 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2369", "sku_code": "NPPIP-DEMO-17815710053", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2384", "category_id": "88", "name": "[엔핍 종합 선물 세트] 일본 베스트 젤리 패키지", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:01.025312", "deleted_at": null,
    images: [{"product_image_id": "2368", "url": "https://ik.imagekit.io/oishidam/products/89bdd2c1-bdd8-425e-a553-db8ccc43663a_-RnFKACtZc.webp", "alt_text": "[엔핍 종합 선물 세트] 일본 베스트 젤리 패키지", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2370", "sku_code": "NPPIP-DEMO-1781513704", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2385", "category_id": "79", "name": "글리코 CRATZ 크래츠 프레첼 페퍼베이컨 42g 맥주 안주 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:01.260258", "deleted_at": null,
    images: [{"product_image_id": "2369", "url": "https://ik.imagekit.io/oishidam/products/f793d89c-2420-4038-bd52-047e99cde802_g7IPVWfmT.webp", "alt_text": "글리코 CRATZ 크래츠 프레첼 페퍼베이컨 42g 맥주 안주 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2371", "sku_code": "NPPIP-DEMO-17815082325", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2386", "category_id": "79", "name": "글리코 CRATZ 크래츠 프레첼 에다마메 완두콩맛 42g 맥주 안주 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:02.284713", "deleted_at": null,
    images: [{"product_image_id": "2370", "url": "https://ik.imagekit.io/oishidam/products/504d438a-7d15-4123-b701-adc2a4c7b028_ZnLRXkovT.webp", "alt_text": "글리코 CRATZ 크래츠 프레첼 에다마메 완두콩맛 42g 맥주 안주 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2372", "sku_code": "NPPIP-DEMO-17815082313", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2387", "category_id": "82", "name": "일본 스타벅스 프리미엄 믹스 말차 라떼 4개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:02.800464", "deleted_at": null,
    images: [{"product_image_id": "2371", "url": "https://ik.imagekit.io/oishidam/products/ad2a76ea-807e-4eaf-b603-05a7c7b200dc_13QzjG4x9.webp", "alt_text": "일본 스타벅스 프리미엄 믹스 말차 라떼 4개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2373", "sku_code": "NPPIP-DEMO-1781251063", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2388", "category_id": "88", "name": "칸로 퓨레 구미 프리미엄 야마나시산 백도 복숭아맛 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:03.017712", "deleted_at": null,
    images: [{"product_image_id": "2373", "url": "https://ik.imagekit.io/oishidam/products/a326e8c0-7c38-4b04-b442-14adcada65d3_Z1LSd9cAv.webp", "alt_text": "칸로 퓨레 구미 프리미엄 야마나시산 백도 복숭아맛 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2374", "sku_code": "NPPIP-DEMO-1781166281", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2389", "category_id": "88", "name": "오리히로 곤약젤리 얼려먹는 아이스 스탠딩 귤맛 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:03.002176", "deleted_at": null,
    images: [{"product_image_id": "2372", "url": "https://ik.imagekit.io/oishidam/products/04151dfd-09ec-4b10-b39e-502c9cd592df_3rs1ZmRpy.webp", "alt_text": "오리히로 곤약젤리 얼려먹는 아이스 스탠딩 귤맛 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2375", "sku_code": "NPPIP-DEMO-178115832011", "variant_name": "기본", "option_values": {}, "price": 44000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2390", "category_id": "88", "name": "오리히로 곤약젤리 얼려먹는 아이스 스탠딩 포도맛 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:04.01351", "deleted_at": null,
    images: [{"product_image_id": "2374", "url": "https://ik.imagekit.io/oishidam/products/3fe111a1-1f76-4f53-ba80-643fb6316e55_tv7B3fmYV.webp", "alt_text": "오리히로 곤약젤리 얼려먹는 아이스 스탠딩 포도맛 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2376", "sku_code": "NPPIP-DEMO-178115832010", "variant_name": "기본", "option_values": {}, "price": 44000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2391", "category_id": "88", "name": "오리히로 곤약젤리 스탠딩 청포도 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:04.509679", "deleted_at": null,
    images: [{"product_image_id": "2375", "url": "https://ik.imagekit.io/oishidam/products/d9f5d54b-f692-4321-b740-447f1e6d1b42_2krV73AY0.webp", "alt_text": "오리히로 곤약젤리 스탠딩 청포도 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2377", "sku_code": "NPPIP-DEMO-17811583199", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2392", "category_id": "88", "name": "오리히로 곤약젤리 스탠딩 포도 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:04.711395", "deleted_at": null,
    images: [{"product_image_id": "2376", "url": "https://ik.imagekit.io/oishidam/products/cb23152c-361b-4544-b83d-ea8c547ed86b_Ao3gKEgH1.webp", "alt_text": "오리히로 곤약젤리 스탠딩 포도 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2378", "sku_code": "NPPIP-DEMO-17811583198", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2393", "category_id": "88", "name": "오리히로 곤약젤리 스탠딩 칼로리 제로 거봉 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:04.835498", "deleted_at": null,
    images: [{"product_image_id": "2377", "url": "https://ik.imagekit.io/oishidam/products/902ff061-5e32-4411-b4ab-59fc060e73c5_Quyf_WO6F.webp", "alt_text": "오리히로 곤약젤리 스탠딩 칼로리 제로 거봉 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2379", "sku_code": "NPPIP-DEMO-17811583197", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2394", "category_id": "88", "name": "오리히로 곤약젤리 스탠딩 칼로리 제로 꿀사과 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:05.827147", "deleted_at": null,
    images: [{"product_image_id": "2378", "url": "https://ik.imagekit.io/oishidam/products/e45f431e-55a6-4ad6-89b4-61619fa1a0b2_QGWRbkFzU.webp", "alt_text": "오리히로 곤약젤리 스탠딩 칼로리 제로 꿀사과 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2380", "sku_code": "NPPIP-DEMO-17811583186", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2395", "category_id": "88", "name": "오리히로 곤약젤리 스탠딩 복숭아 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:06.185153", "deleted_at": null,
    images: [{"product_image_id": "2379", "url": "https://ik.imagekit.io/oishidam/products/c43d5820-1be4-46ba-8164-5f32ace1e3d5__MK7DUdnRE.webp", "alt_text": "오리히로 곤약젤리 스탠딩 복숭아 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2381", "sku_code": "NPPIP-DEMO-17811583185", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2396", "category_id": "88", "name": "오리히로 곤약 젤리 스탠딩 제로칼로리 샤인머스캣 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:06.389189", "deleted_at": null,
    images: [{"product_image_id": "2380", "url": "https://ik.imagekit.io/oishidam/products/a4505318-5c61-48e8-b352-9eb73c4912a0_Adqfh9UTU.webp", "alt_text": "오리히로 곤약 젤리 스탠딩 제로칼로리 샤인머스캣 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2382", "sku_code": "NPPIP-DEMO-17811583184", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2397", "category_id": "88", "name": "오리히로 곤약젤리 스탠딩 오렌지 130g 24개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:06.528324", "deleted_at": null,
    images: [{"product_image_id": "2381", "url": "https://ik.imagekit.io/oishidam/products/62379a0e-1b5c-45a5-b69d-710e0619b030_Fhly_gyNs.webp", "alt_text": "오리히로 곤약젤리 스탠딩 오렌지 130g 24개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2383", "sku_code": "NPPIP-DEMO-17811583173", "variant_name": "기본", "option_values": {}, "price": 40000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2398", "category_id": "93", "name": "하마오토메 칼슘이 풍부한 킨고마 가다랑어 후리카케 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:07.787727", "deleted_at": null,
    images: [{"product_image_id": "2382", "url": "https://ik.imagekit.io/oishidam/products/fe839788-eed3-4ce8-a045-32444a248954_Ln7S3P8Kr.webp", "alt_text": "하마오토메 칼슘이 풍부한 킨고마 가다랑어 후리카케 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2384", "sku_code": "NPPIP-DEMO-178113998262", "variant_name": "기본", "option_values": {}, "price": 2850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2399", "category_id": "93", "name": "하마오토메 철분이 풍부한 히지키 후리카케 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:08.19037", "deleted_at": null,
    images: [{"product_image_id": "2383", "url": "https://ik.imagekit.io/oishidam/products/07f23f8d-5cb9-4873-932d-c719529004fe_G_aYtyQkr.webp", "alt_text": "하마오토메 철분이 풍부한 히지키 후리카케 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2385", "sku_code": "NPPIP-DEMO-178113998161", "variant_name": "기본", "option_values": {}, "price": 2850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2400", "category_id": "93", "name": "하마오토메 야채 후리카케 대용량 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:08.298159", "deleted_at": null,
    images: [{"product_image_id": "2384", "url": "https://ik.imagekit.io/oishidam/products/beced8a4-166e-49d9-b161-6ef7bf31aff3_acWQ70Mkby.webp", "alt_text": "하마오토메 야채 후리카케 대용량 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2386", "sku_code": "NPPIP-DEMO-178113998160", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2401", "category_id": "93", "name": "나가타니엔 후리카케 시치미 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:08.453381", "deleted_at": null,
    images: [{"product_image_id": "2385", "url": "https://ik.imagekit.io/oishidam/products/7be1ed32-b719-426d-86d6-67a8296ef121_nOrYqh8gv.webp", "alt_text": "나가타니엔 후리카케 시치미 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2387", "sku_code": "NPPIP-DEMO-178113998057", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2402", "category_id": "93", "name": "나가타니엔 어른 오토나노 후리카케 혼가츠오 4봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:09.680891", "deleted_at": null,
    images: [{"product_image_id": "2386", "url": "https://ik.imagekit.io/oishidam/products/3eeb8e6f-a260-4091-b311-83d094647206_NgojrC81G.webp", "alt_text": "나가타니엔 어른 오토나노 후리카케 혼가츠오 4봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2388", "sku_code": "NPPIP-DEMO-178113998056", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2403", "category_id": "93", "name": "나가타니엔 어른 오토나노 후리카케 와사비 4봉", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:10.100274", "deleted_at": null,
    images: [{"product_image_id": "2387", "url": "https://ik.imagekit.io/oishidam/products/9bfd4101-4165-4804-afab-2bad279a62bc_w5Ee0fGOV.webp", "alt_text": "나가타니엔 어른 오토나노 후리카케 와사비 4봉", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2389", "sku_code": "NPPIP-DEMO-178113997955", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2404", "category_id": "93", "name": "나가타니엔 후리카케 호빵맨 20개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:10.2084", "deleted_at": null,
    images: [{"product_image_id": "2388", "url": "https://ik.imagekit.io/oishidam/products/4b930d0a-5a98-4085-ada6-525e491fc3a3_WLTTNzdzuX.webp", "alt_text": "나가타니엔 후리카케 호빵맨 20개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2390", "sku_code": "NPPIP-DEMO-178113997452", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2405", "category_id": "93", "name": "니치후리 후리카케의 기점 와사비 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:10.471962", "deleted_at": null,
    images: [{"product_image_id": "2389", "url": "https://ik.imagekit.io/oishidam/products/459bbb58-bd9e-45ac-88be-d4cab688be1b_o0o0AfYKI.webp", "alt_text": "니치후리 후리카케의 기점 와사비 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2391", "sku_code": "NPPIP-DEMO-178113997351", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2406", "category_id": "93", "name": "니치후리 후리카케 포테토칩스 노리시오 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:11.614874", "deleted_at": null,
    images: [{"product_image_id": "2390", "url": "https://ik.imagekit.io/oishidam/products/da8b0685-dfc8-4660-b3fa-4f6b9d29d0cf_9WGWkpvof.webp", "alt_text": "니치후리 후리카케 포테토칩스 노리시오 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2392", "sku_code": "NPPIP-DEMO-178113997150", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2407", "category_id": "93", "name": "니치후리 후리카케 타마고 계란맛 24g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:12.017952", "deleted_at": null,
    images: [{"product_image_id": "2391", "url": "https://ik.imagekit.io/oishidam/products/33aeae11-c60e-491f-8604-d5209be0d9c6_7McQkD7k1.webp", "alt_text": "니치후리 후리카케 타마고 계란맛 24g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2393", "sku_code": "NPPIP-DEMO-178113997149", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2408", "category_id": "93", "name": "니치후리 후리카케 스테미너 돈부리풍 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:12.173793", "deleted_at": null,
    images: [{"product_image_id": "2392", "url": "https://ik.imagekit.io/oishidam/products/0846ff15-c0a6-42d8-be4e-5ff86a04e7ee_so-sABFws.webp", "alt_text": "니치후리 후리카케 스테미너 돈부리풍 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2394", "sku_code": "NPPIP-DEMO-178113996946", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2409", "category_id": "93", "name": "니치후리 후리카케 버터 간장 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:12.361383", "deleted_at": null,
    images: [{"product_image_id": "2393", "url": "https://ik.imagekit.io/oishidam/products/aef4d16f-606b-4433-9698-085c1b878be8_e7MjKA6di.webp", "alt_text": "니치후리 후리카케 버터 간장 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2395", "sku_code": "NPPIP-DEMO-178113996945", "variant_name": "기본", "option_values": {}, "price": 1950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2410", "category_id": "93", "name": "니치후리 후리카케 도라에몽 영화 패키지 20봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:13.542837", "deleted_at": null,
    images: [{"product_image_id": "2394", "url": "https://ik.imagekit.io/oishidam/products/3f2475b8-e6e8-4434-a1f2-1132a939aa32_Ncz8-YaPc.webp", "alt_text": "니치후리 후리카케 도라에몽 영화 패키지 20봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2396", "sku_code": "NPPIP-DEMO-178113996742", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2411", "category_id": "93", "name": "니치후리 후리카케 도라에몽 8봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:14.068013", "deleted_at": null,
    images: [{"product_image_id": "2395", "url": "https://ik.imagekit.io/oishidam/products/97614dd1-6b1b-46c1-9b8d-f8db0a625e9d_RDgh-BVUk.webp", "alt_text": "니치후리 후리카케 도라에몽 8봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2397", "sku_code": "NPPIP-DEMO-178113996741", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2412", "category_id": "93", "name": "니치후리 좋은 소재로 만든 후리카케 20봉입 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:14.163308", "deleted_at": null,
    images: [{"product_image_id": "2396", "url": "https://ik.imagekit.io/oishidam/products/a681261f-1998-4da7-b928-8028dd8123f4_JcDuuNnF3.webp", "alt_text": "니치후리 좋은 소재로 만든 후리카케 20봉입 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2398", "sku_code": "NPPIP-DEMO-178113996639", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2413", "category_id": "93", "name": "마루미야 휴대용 후리카케 피카츄 연어계란맛 20g 디자인 랜덤", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:14.168534", "deleted_at": null,
    images: [{"product_image_id": "2397", "url": "https://ik.imagekit.io/oishidam/products/14d19d2f-a9ca-44af-8368-7a060ff11502_w1Mvvtdip.webp", "alt_text": "마루미야 휴대용 후리카케 피카츄 연어계란맛 20g 디자인 랜덤", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2399", "sku_code": "NPPIP-DEMO-178113996638", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2414", "category_id": "93", "name": "마루미야 휴대용 후리카케 테노리타마 김계란맛 20g 디자인 랜덤", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:15.252397", "deleted_at": null,
    images: [{"product_image_id": "2398", "url": "https://ik.imagekit.io/oishidam/products/7fed57c7-9299-4325-aeef-abfbcadd2d37_gNXRxl_KX.webp", "alt_text": "마루미야 휴대용 후리카케 테노리타마 김계란맛 20g 디자인 랜덤", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2400", "sku_code": "NPPIP-DEMO-178113996637", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2415", "category_id": "93", "name": "마루미야 후리카케 혼가쯔오 뉴팩 18g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:15.874201", "deleted_at": null,
    images: [{"product_image_id": "2399", "url": "https://ik.imagekit.io/oishidam/products/14fac795-c2ba-4f40-a071-80f0495e6a4e_8Wfz93nEP.webp", "alt_text": "마루미야 후리카케 혼가쯔오 뉴팩 18g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2401", "sku_code": "NPPIP-DEMO-178113996534", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2416", "category_id": "93", "name": "마루미야 후리카케 스키야키 대용량 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:16.028533", "deleted_at": null,
    images: [{"product_image_id": "2400", "url": "https://ik.imagekit.io/oishidam/products/85cdef7d-6c36-42de-a544-ed1466f24bbf_vhWF5m8DV.webp", "alt_text": "마루미야 후리카케 스키야키 대용량 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2402", "sku_code": "NPPIP-DEMO-178113996432", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2417", "category_id": "93", "name": "마루미야 후리카케 칩트리오 14g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:16.059192", "deleted_at": null,
    images: [{"product_image_id": "2401", "url": "https://ik.imagekit.io/oishidam/products/30647eac-7794-4264-874a-afb00e7170b4_IQ7D7d-C9.webp", "alt_text": "마루미야 후리카케 칩트리오 14g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2403", "sku_code": "NPPIP-DEMO-178113996433", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2418", "category_id": "93", "name": "마루미야 후리카케 스키야키 뉴팩  34g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:17.143915", "deleted_at": null,
    images: [{"product_image_id": "2402", "url": "https://ik.imagekit.io/oishidam/products/3499c880-2300-472e-ac21-9221b630d80c_5uXBFak9k.webp", "alt_text": "마루미야 후리카케 스키야키 뉴팩  34g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2404", "sku_code": "NPPIP-DEMO-178113996431", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2419", "category_id": "93", "name": "마루미야 후리카케 명란 대용량 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:17.78307", "deleted_at": null,
    images: [{"product_image_id": "2403", "url": "https://ik.imagekit.io/oishidam/products/d7dabb3a-0613-4eae-a028-327cfeb36519_uNw71Ubfh.webp", "alt_text": "마루미야 후리카케 명란 대용량 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2405", "sku_code": "NPPIP-DEMO-178113996330", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2420", "category_id": "93", "name": "마루미야 후리카케 맛도락 대용량 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:17.860768", "deleted_at": null,
    images: [{"product_image_id": "2404", "url": "https://ik.imagekit.io/oishidam/products/c445e7a0-6537-406d-95da-78f24960e56e_vIgt3FjQB.webp", "alt_text": "마루미야 후리카케 맛도락 대용량 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2406", "sku_code": "NPPIP-DEMO-178113996328", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2421", "category_id": "93", "name": "마루미야 후리카케 감칠맛 연어 뉴팩 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:17.984859", "deleted_at": null,
    images: [{"product_image_id": "2405", "url": "https://ik.imagekit.io/oishidam/products/7fc31069-b527-4699-83f1-1b11595ab673_he8YjXDzo.webp", "alt_text": "마루미야 후리카케 감칠맛 연어 뉴팩 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2407", "sku_code": "NPPIP-DEMO-178113996023", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2422", "category_id": "93", "name": "마루미야 오빤쮸우사기 후리카케 미니팩 6봉입 스티커 포함", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:18.793603", "deleted_at": null,
    images: [{"product_image_id": "2406", "url": "https://ik.imagekit.io/oishidam/products/dd541043-b05d-4b37-aca2-9ef59c5b16cd_U2IxXZrvD.webp", "alt_text": "마루미야 오빤쮸우사기 후리카케 미니팩 6봉입 스티커 포함", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2408", "sku_code": "NPPIP-DEMO-178113995920", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2423", "category_id": "93", "name": "마루미야 야끼니쿠 후리카케 대용량 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:19.684683", "deleted_at": null,
    images: [{"product_image_id": "2407", "url": "https://ik.imagekit.io/oishidam/products/a8bcf52f-30fd-4fbd-b530-f4a3038d1ae1_oAzZamy3z.webp", "alt_text": "마루미야 야끼니쿠 후리카케 대용량 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2409", "sku_code": "NPPIP-DEMO-178113995919", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2424", "category_id": "93", "name": "마루미야 야끼니쿠 후리카케 뉴팩 25g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:19.822336", "deleted_at": null,
    images: [{"product_image_id": "2408", "url": "https://ik.imagekit.io/oishidam/products/93ca4afc-0722-47bc-b363-fc0e56033545_7cEakwk_C.webp", "alt_text": "마루미야 야끼니쿠 후리카케 뉴팩 25g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2410", "sku_code": "NPPIP-DEMO-178113995918", "variant_name": "기본", "option_values": {}, "price": 2000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2425", "category_id": "93", "name": "마루미야 소프트 후리카케 타라코 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:19.915143", "deleted_at": null,
    images: [{"product_image_id": "2409", "url": "https://ik.imagekit.io/oishidam/products/abd010be-39d3-42ad-a21f-b89cfe4216fc_QtUp5aGVYj.webp", "alt_text": "마루미야 소프트 후리카케 타라코 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2411", "sku_code": "NPPIP-DEMO-178113995716", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2426", "category_id": "93", "name": "마루미야 마인크래프트 후리카케 미니팩 20봉입 스티커 포함", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:20.722129", "deleted_at": null,
    images: [{"product_image_id": "2410", "url": "https://ik.imagekit.io/oishidam/products/9aeeb5c7-0c41-44f3-9ef0-d989a0d294f4_jQiiLR7B1.webp", "alt_text": "마루미야 마인크래프트 후리카케 미니팩 20봉입 스티커 포함", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2412", "sku_code": "NPPIP-DEMO-17811399548", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2427", "category_id": "93", "name": "마루미야 노리타마 버라이어티 후리카케 미니팩 20봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:21.607409", "deleted_at": null,
    images: [{"product_image_id": "2412", "url": "https://ik.imagekit.io/oishidam/products/467ba30d-d2b4-40a1-a47a-128021fed513_G0efCQUwK.webp", "alt_text": "마루미야 노리타마 버라이어티 후리카케 미니팩 20봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2413", "sku_code": "NPPIP-DEMO-17811399534", "variant_name": "기본", "option_values": {}, "price": 3550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2428", "category_id": "93", "name": "마루미야 노리타마 버라이어티 후리카케 10봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:21.484367", "deleted_at": null,
    images: [{"product_image_id": "2411", "url": "https://ik.imagekit.io/oishidam/products/07e9d8b4-06df-4c8b-a668-fa47a7417466_hP0H-3qIC.webp", "alt_text": "마루미야 노리타마 버라이어티 후리카케 10봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2414", "sku_code": "NPPIP-DEMO-17811399523", "variant_name": "기본", "option_values": {}, "price": 2150, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2429", "category_id": "94", "name": "마법의 향신료 마키시마무 오리지널 스파이스 140g 바베큐 스테이크 시즈닝", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:21.886426", "deleted_at": null,
    images: [{"product_image_id": "2413", "url": "https://ik.imagekit.io/oishidam/products/7bd25595-c305-44ea-86f2-c3ac37983fd6_mvM1nGiaC.webp", "alt_text": "마법의 향신료 마키시마무 오리지널 스파이스 140g 바베큐 스테이크 시즈닝", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2415", "sku_code": "NPPIP-DEMO-1781078781", "variant_name": "기본", "option_values": {}, "price": 9800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2430", "category_id": "87", "name": "UHA미각당 특농 밀크 캔디 8.2 소금 우유맛 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:22.399176", "deleted_at": null,
    images: [{"product_image_id": "2414", "url": "https://ik.imagekit.io/oishidam/products/f88852a6-7261-4092-a3b3-bd7d9b7b40ce_0zyQNvDf5y.webp", "alt_text": "UHA미각당 특농 밀크 캔디 8.2 소금 우유맛 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2416", "sku_code": "NPPIP-DEMO-1781075768", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2431", "category_id": "66", "name": "세븐일레븐 아이스크림 같은 초콜릿 베리베리 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:23.271252", "deleted_at": null,
    images: [{"product_image_id": "2415", "url": "https://ik.imagekit.io/oishidam/products/0b9969ba-395b-42d5-b163-8813a0051d6e_Cm7meCiWT.webp", "alt_text": "세븐일레븐 아이스크림 같은 초콜릿 베리베리 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2417", "sku_code": "NPPIP-DEMO-1781063818", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2432", "category_id": "87", "name": "에치고세이카 훈와리메이진 인절미 모찌 쌀과자 75g 12개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:23.610685", "deleted_at": null,
    images: [{"product_image_id": "2416", "url": "https://ik.imagekit.io/oishidam/products/e56a0002-6a2c-44cb-a928-cd6843e27808_6HjwXIoxP.webp", "alt_text": "에치고세이카 훈와리메이진 인절미 모찌 쌀과자 75g 12개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2418", "sku_code": "NPPIP-DEMO-1781056367", "variant_name": "기본", "option_values": {}, "price": 39000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2433", "category_id": "88", "name": "요코오데일리푸드 치이카와 곤약젤리 포도맛 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:23.825561", "deleted_at": null,
    images: [{"product_image_id": "2417", "url": "https://ik.imagekit.io/oishidam/products/9d98fa20-a38a-4fd4-b6f6-fcd8e788f34c_pB1QvMmLf.webp", "alt_text": "요코오데일리푸드 치이카와 곤약젤리 포도맛 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2419", "sku_code": "NPPIP-DEMO-1781053249", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2434", "category_id": "70", "name": "일본 미소시루 나가타니엔 발효 아사게 10개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:24.260063", "deleted_at": null,
    images: [{"product_image_id": "2418", "url": "https://ik.imagekit.io/oishidam/products/15d49fa6-2f8d-431b-9709-ce84acfb142b_-iEb7VoPE.webp", "alt_text": "일본 미소시루 나가타니엔 발효 아사게 10개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2420", "sku_code": "NPPIP-DEMO-1780381569", "variant_name": "기본", "option_values": {}, "price": 8350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2435", "category_id": "79", "name": "베프코 호빵맨 센베이 쌀과자 아소토 36개입", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2419", "url": "https://ik.imagekit.io/oishidam/products/652f0a94-4014-4ad4-8166-48c4673d25b3_UTZQPX8r4.webp", "alt_text": "베프코 호빵맨 센베이 쌀과자 아소토 36개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2421", "sku_code": "NPPIP-DEMO-1780015083", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2436", "category_id": "88", "name": "왕왕재팬 마지데 슷파이 대작전 젤리 구미 청레몬 아세로라맛 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:25.266354", "deleted_at": null,
    images: [{"product_image_id": "2420", "url": "https://ik.imagekit.io/oishidam/products/118a5e3f-83b2-4f2a-967d-00f5285dfbb1_gBm8altRV.webp", "alt_text": "왕왕재팬 마지데 슷파이 대작전 젤리 구미 청레몬 아세로라맛 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2422", "sku_code": "NPPIP-DEMO-1780014232", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2437", "category_id": "80", "name": "아사히 크림 현미 블랑 쿠키 저칼로리바 80kcal 비터초코 3매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:25.782489", "deleted_at": null,
    images: [{"product_image_id": "2421", "url": "https://ik.imagekit.io/oishidam/products/eb9ce429-35a6-4a3a-a65f-8b3bf74f282f_qW3nY_M9M.webp", "alt_text": "아사히 크림 현미 블랑 쿠키 저칼로리바 80kcal 비터초코 3매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2423", "sku_code": "NPPIP-DEMO-17798462039", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2438", "category_id": "80", "name": "아사히 크림 현미 블랑 플러스 쿠키 에너지바 두유 커스타드 4매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:26.297096", "deleted_at": null,
    images: [{"product_image_id": "2422", "url": "https://ik.imagekit.io/oishidam/products/7702433a-4f3e-47b2-873d-1e5d1fc8d930_aykz1iEp2.webp", "alt_text": "아사히 크림 현미 블랑 플러스 쿠키 에너지바 두유 커스타드 4매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2424", "sku_code": "NPPIP-DEMO-17798462037", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2439", "category_id": "80", "name": "아사히 크림 현미 블랑 쿠키 에너지바 요구르트 4매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:26.978808", "deleted_at": null,
    images: [{"product_image_id": "2423", "url": "https://ik.imagekit.io/oishidam/products/90f22caa-b426-4f3b-b0fe-2f5f51d6af45_y5Yudwtwy.webp", "alt_text": "아사히 크림 현미 블랑 쿠키 에너지바 요구르트 4매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2425", "sku_code": "NPPIP-DEMO-17798462036", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2440", "category_id": "80", "name": "아사히 크림 현미 블랑 쿠키 에너지바 카카오 4매입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:27.178972", "deleted_at": null,
    images: [{"product_image_id": "2424", "url": "https://ik.imagekit.io/oishidam/products/05680bb4-0180-49a8-b2f0-356b3ad3b665_Kkkvd4foEs.webp", "alt_text": "아사히 크림 현미 블랑 쿠키 에너지바 카카오 4매입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2426", "sku_code": "NPPIP-DEMO-17798462024", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2441", "category_id": "88", "name": "UHA미각당 코구미 프리미엄 DOLE 과일믹스맛 젤리 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:27.720611", "deleted_at": null,
    images: [{"product_image_id": "2425", "url": "https://ik.imagekit.io/oishidam/products/bc2262fa-e50f-438c-9640-2d9d95bdd30c_nIeYzr9Kg.webp", "alt_text": "UHA미각당 코구미 프리미엄 DOLE 과일믹스맛 젤리 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2427", "sku_code": "NPPIP-DEMO-1779778302", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2442", "category_id": "87", "name": "토키와 남천 목캔디 난텐노도아메 54정", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:27.909816", "deleted_at": null,
    images: [{"product_image_id": "2426", "url": "https://ik.imagekit.io/oishidam/products/bf7b7b31-1fbf-404f-a259-e0d2850a9fbe_l15FIvxro.webp", "alt_text": "토키와 남천 목캔디 난텐노도아메 54정", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2428", "sku_code": "NPPIP-DEMO-1779432368", "variant_name": "기본", "option_values": {}, "price": 10500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2443", "category_id": "72", "name": "페양구 지옥의 매운맛 야끼소바 컵라면 118g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:29.039725", "deleted_at": null,
    images: [{"product_image_id": "2428", "url": "https://ik.imagekit.io/oishidam/products/2df38600-587d-4211-8e78-3afda5c76a5a_BLmhE1N46.webp", "alt_text": "페양구 지옥의 매운맛 야끼소바 컵라면 118g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2429", "sku_code": "NPPIP-DEMO-1779342817", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2444", "category_id": "89", "name": "롯데 가나 초콜릿 민트맛 36g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:28.791499", "deleted_at": null,
    images: [{"product_image_id": "2427", "url": "https://ik.imagekit.io/oishidam/products/1dfae70b-74bc-4711-8732-c0d7fe46edbc_xkowniZIf.webp", "alt_text": "롯데 가나 초콜릿 민트맛 36g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2430", "sku_code": "NPPIP-DEMO-1779327411", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2445", "category_id": "88", "name": "오리히로 얼려먹는 아이스 스탠딩 곤약젤리 귤맛 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:29.648145", "deleted_at": null,
    images: [{"product_image_id": "2429", "url": "https://ik.imagekit.io/oishidam/products/f286028c-7710-4e74-9d00-6dea77223e14_-NSXA1DhsB.webp", "alt_text": "오리히로 얼려먹는 아이스 스탠딩 곤약젤리 귤맛 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2431", "sku_code": "NPPIP-DEMO-1779259552", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2446", "category_id": "88", "name": "오리히로 얼려먹는 아이스 스탠딩 곤약젤리 포도맛 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:29.803057", "deleted_at": null,
    images: [{"product_image_id": "2430", "url": "https://ik.imagekit.io/oishidam/products/a201fa8f-438b-48d0-890f-c2f8c83d401c_K0p0sy6gU.webp", "alt_text": "오리히로 얼려먹는 아이스 스탠딩 곤약젤리 포도맛 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2432", "sku_code": "NPPIP-DEMO-1779259047", "variant_name": "기본", "option_values": {}, "price": 2650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2447", "category_id": "87", "name": "카바야 염분 보충 타블렛 일본 사탕 매실맛 81g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:30.653908", "deleted_at": null,
    images: [{"product_image_id": "2431", "url": "https://ik.imagekit.io/oishidam/products/d0f44150-ccf3-4522-ac4b-348bfdac678a_mJvkEF_Q_.webp", "alt_text": "카바야 염분 보충 타블렛 일본 사탕 매실맛 81g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2433", "sku_code": "NPPIP-DEMO-1778634021", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2448", "category_id": "89", "name": "글리코 가바 멘탈 밸런스 초콜릿 스탠드 파우치 밀크 51g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:30.715501", "deleted_at": null,
    images: [{"product_image_id": "2432", "url": "https://ik.imagekit.io/oishidam/products/65c87b9c-0ec2-47d4-b2dc-92a48b351ef9_QzjSUFNKT.webp", "alt_text": "글리코 가바 멘탈 밸런스 초콜릿 스탠드 파우치 밀크 51g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2434", "sku_code": "NPPIP-DEMO-1778224322", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2449", "category_id": "79", "name": "[엔핍 종합 선물 세트] 일본 베스트 라면 과자 패키지", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:31.555431", "deleted_at": null,
    images: [{"product_image_id": "2433", "url": "https://ik.imagekit.io/oishidam/products/eedb25ea-36c9-4541-92e0-77a668f4c6d8_tOdaM36vc.webp", "alt_text": "[엔핍 종합 선물 세트] 일본 베스트 라면 과자 패키지", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2435", "sku_code": "NPPIP-DEMO-1778137983", "variant_name": "기본", "option_values": {}, "price": 99000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2450", "category_id": "79", "name": "[엔핍 종합 선물 세트] 말차 간식 패키지", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:31.913459", "deleted_at": null,
    images: [{"product_image_id": "2434", "url": "https://ik.imagekit.io/oishidam/products/4516ff3e-a3fc-41c4-a6bf-e5be39bc04b4_TEDXoajo4.webp", "alt_text": "[엔핍 종합 선물 세트] 말차 간식 패키지", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2436", "sku_code": "NPPIP-DEMO-1778136545", "variant_name": "기본", "option_values": {}, "price": 52000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2451", "category_id": "72", "name": "[엔핍 종합 선물 세트] 일본 베스트 라면 패키지", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:32.582486", "deleted_at": null,
    images: [{"product_image_id": "2436", "url": "https://ik.imagekit.io/oishidam/products/4397e811-d0e5-4554-b38d-6d2783c77c82_4b5MHNxyh.webp", "alt_text": "[엔핍 종합 선물 세트] 일본 베스트 라면 패키지", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2437", "sku_code": "NPPIP-DEMO-1778136031", "variant_name": "기본", "option_values": {}, "price": 46000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2452", "category_id": "88", "name": "오리히로 곤약젤리 스탠딩 오렌지 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:32.565618", "deleted_at": null,
    images: [{"product_image_id": "2435", "url": "https://ik.imagekit.io/oishidam/products/c6032288-5ace-4eed-91f7-9cf18cc32dc9_FSjRfxpTXJ.webp", "alt_text": "오리히로 곤약젤리 스탠딩 오렌지 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2438", "sku_code": "NPPIP-DEMO-1778124585", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2453", "category_id": "88", "name": "오리히로 곤약 젤리 스탠딩 제로칼로리 샤인머스캣 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:33.173118", "deleted_at": null,
    images: [{"product_image_id": "2437", "url": "https://ik.imagekit.io/oishidam/products/3bb939bc-084f-4ff9-b132-b7a0488a082d_PFA4Pw-1d.webp", "alt_text": "오리히로 곤약 젤리 스탠딩 제로칼로리 샤인머스캣 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2439", "sku_code": "NPPIP-DEMO-1778124266", "variant_name": "기본", "option_values": {}, "price": 2450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2454", "category_id": "79", "name": "부르봉 나무꾼의 그루터기 초코 비스킷 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:33.81316", "deleted_at": null,
    images: [{"product_image_id": "2438", "url": "https://ik.imagekit.io/oishidam/products/6f70d035-48ee-4cd2-9b5e-4ac417bec905_BYh5l_LGW.webp", "alt_text": "부르봉 나무꾼의 그루터기 초코 비스킷 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2440", "sku_code": "NPPIP-DEMO-1778028449", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2455", "category_id": "82", "name": "agf 블랜디 매일의 장활동 인스턴트 블랙 커피 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:34.510837", "deleted_at": null,
    images: [{"product_image_id": "2439", "url": "https://ik.imagekit.io/oishidam/products/03c3bec8-e973-41d1-9ddb-75389530e648_WENmppl_2f.webp", "alt_text": "agf 블랜디 매일의 장활동 인스턴트 블랙 커피 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2441", "sku_code": "NPPIP-DEMO-1777011073", "variant_name": "기본", "option_values": {}, "price": 13000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2456", "category_id": "88", "name": "칸로 칸데미나 구미 슈퍼 베스트 젤리 72g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:34.52967", "deleted_at": null,
    images: [{"product_image_id": "2440", "url": "https://ik.imagekit.io/oishidam/products/5a2ed61a-8756-44ba-9eaa-7691b9ac6bfd_PSC1sEk7v.webp", "alt_text": "칸로 칸데미나 구미 슈퍼 베스트 젤리 72g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2442", "sku_code": "NPPIP-DEMO-1776933233", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2457", "category_id": "66", "name": "세븐일레븐 김말이 간장 센베이 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:35.121349", "deleted_at": null,
    images: [{"product_image_id": "2441", "url": "https://ik.imagekit.io/oishidam/products/3bb97a5f-64f8-4bdf-8e7f-0412e6d38a06_0nWlP04lk.webp", "alt_text": "세븐일레븐 김말이 간장 센베이 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2443", "sku_code": "NPPIP-DEMO-17769318389", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2458", "category_id": "66", "name": "세븐일레븐 초콜릿 마카다미아 너트 쿠키 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:35.775944", "deleted_at": null,
    images: [{"product_image_id": "2442", "url": "https://ik.imagekit.io/oishidam/products/8261ba49-95b1-4c2a-9144-4281fde66973_BYRrG3BYw.webp", "alt_text": "세븐일레븐 초콜릿 마카다미아 너트 쿠키 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2444", "sku_code": "NPPIP-DEMO-17769318387", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2459", "category_id": "66", "name": "세븐일레븐 사쿠사쿠 초콜릿 콘프레이크 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:36.290268", "deleted_at": null,
    images: [{"product_image_id": "2444", "url": "https://ik.imagekit.io/oishidam/products/2a9bd2dd-5ae7-4cd1-907b-ea99d093cf07_FSwVXni-nA.webp", "alt_text": "세븐일레븐 사쿠사쿠 초콜릿 콘프레이크 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2445", "sku_code": "NPPIP-DEMO-17769318373", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2460", "category_id": "65", "name": "내츄럴 로손 오키나와 현산 사탕수수로 만든 흑당 맛 고구마 칩 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:36.243572", "deleted_at": null,
    images: [{"product_image_id": "2443", "url": "https://ik.imagekit.io/oishidam/products/75c0b8fe-8866-43f6-b0ea-7bd0846ae765_n2xRwWduu.webp", "alt_text": "내츄럴 로손 오키나와 현산 사탕수수로 만든 흑당 맛 고구마 칩 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2446", "sku_code": "NPPIP-DEMO-1776912700133", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2461", "category_id": "65", "name": "내츄럴 로손 오트밀칩스 메이플슈가 맛 일본 과자 스낵 15g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:36.818661", "deleted_at": null,
    images: [{"product_image_id": "2445", "url": "https://ik.imagekit.io/oishidam/products/a91cd3d8-548e-48ad-8d9d-37b8ee9b604e_wXoAZjUVl.webp", "alt_text": "내츄럴 로손 오트밀칩스 메이플슈가 맛 일본 과자 스낵 15g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2447", "sku_code": "NPPIP-DEMO-1776912700132", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2462", "category_id": "65", "name": "내츄럴 로손 하루 분량의 철분 섭취 크런치 초콜릿 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:37.535076", "deleted_at": null,
    images: [{"product_image_id": "2446", "url": "https://ik.imagekit.io/oishidam/products/e21dcdca-a56d-4647-a840-6c137346f434_RYo1nkuo0.webp", "alt_text": "내츄럴 로손 하루 분량의 철분 섭취 크런치 초콜릿 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2448", "sku_code": "NPPIP-DEMO-1776912700129", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2463", "category_id": "65", "name": "내츄럴 로손 마카다미아 넛 초콜릿 이눌린 사용 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:37.923055", "deleted_at": null,
    images: [{"product_image_id": "2447", "url": "https://ik.imagekit.io/oishidam/products/26616f68-3419-448d-9420-43d88b52d1df_ZSZYADUKL.webp", "alt_text": "내츄럴 로손 마카다미아 넛 초콜릿 이눌린 사용 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2449", "sku_code": "NPPIP-DEMO-1776912700128", "variant_name": "기본", "option_values": {}, "price": 5000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2464", "category_id": "65", "name": "내츄럴 로손 아몬드 초콜릿 이눌린 사용 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:37.919054", "deleted_at": null,
    images: [{"product_image_id": "2448", "url": "https://ik.imagekit.io/oishidam/products/7e90f6fb-ab29-44e8-bbc9-9ced8b7dd48e_XwmFx0vBp2.webp", "alt_text": "내츄럴 로손 아몬드 초콜릿 이눌린 사용 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2450", "sku_code": "NPPIP-DEMO-1776912699127", "variant_name": "기본", "option_values": {}, "price": 5000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2465", "category_id": "65", "name": "내츄럴 로손 멀티비타민을 섭취할 수 있는 미니 올레즌", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:38.684722", "deleted_at": null,
    images: [{"product_image_id": "2449", "url": "https://ik.imagekit.io/oishidam/products/21aafde2-a44a-4e71-96a6-356d5a39be76_mSMJtEwVo.webp", "alt_text": "내츄럴 로손 멀티비타민을 섭취할 수 있는 미니 올레즌", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2451", "sku_code": "NPPIP-DEMO-1776912699126", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2466", "category_id": "65", "name": "내츄럴 로손 바삭한 식감의 브란 크림 샌드 쿠키 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:39.135082", "deleted_at": null,
    images: [{"product_image_id": "2450", "url": "https://ik.imagekit.io/oishidam/products/9e6090fe-7361-4673-91ee-a936d3487da9_RFFOw3Eet.webp", "alt_text": "내츄럴 로손 바삭한 식감의 브란 크림 샌드 쿠키 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2452", "sku_code": "NPPIP-DEMO-1776912699125", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2467", "category_id": "65", "name": "내츄럴 로손 하루 분량의 철분 섭취아사이와 바나나 비스킷 스낵 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:39.616657", "deleted_at": null,
    images: [{"product_image_id": "2451", "url": "https://ik.imagekit.io/oishidam/products/21a635e0-d7c2-4536-91c1-d8e0ff00a871_M3nBdRhtP.webp", "alt_text": "내츄럴 로손 하루 분량의 철분 섭취아사이와 바나나 비스킷 스낵 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2453", "sku_code": "NPPIP-DEMO-1776912699123", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2468", "category_id": "65", "name": "내츄럴 로손 업사이클 원료 사용 당근 스낵 36g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:39.618978", "deleted_at": null,
    images: [{"product_image_id": "2452", "url": "https://ik.imagekit.io/oishidam/products/81a9a1cc-7f7b-4474-8ca9-7b2426e04b57_I6lMTibgk.webp", "alt_text": "내츄럴 로손 업사이클 원료 사용 당근 스낵 36g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2454", "sku_code": "NPPIP-DEMO-1776912699124", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2469", "category_id": "65", "name": "내츄럴 로손 얼그레이 밀크티 포르보론 스낵 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:40.361459", "deleted_at": null,
    images: [{"product_image_id": "2453", "url": "https://ik.imagekit.io/oishidam/products/cdd543dc-8ea9-414d-b9c8-19b0bf2af551_wAnUgpc4OJ.webp", "alt_text": "내츄럴 로손 얼그레이 밀크티 포르보론 스낵 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2455", "sku_code": "NPPIP-DEMO-1776912699122", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2470", "category_id": "65", "name": "내츄럴 로손 1/3일분의 녹황색 채소 섭취 10가지 채소 크래커 58g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:40.841671", "deleted_at": null,
    images: [{"product_image_id": "2454", "url": "https://ik.imagekit.io/oishidam/products/6053afcf-2ffa-4f70-9143-486590c2041f_4UdeVKKjJ.webp", "alt_text": "내츄럴 로손 1/3일분의 녹황색 채소 섭취 10가지 채소 크래커 58g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2456", "sku_code": "NPPIP-DEMO-1776912699120", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2471", "category_id": "65", "name": "내츄럴 로손 단백질이 풍부한 완두콩 스낵 버터 간장맛 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:41.643896", "deleted_at": null,
    images: [{"product_image_id": "2456", "url": "https://ik.imagekit.io/oishidam/products/f45029a6-91f4-4133-b721-b53124b5b6e4_5X58UyQKg.webp", "alt_text": "내츄럴 로손 단백질이 풍부한 완두콩 스낵 버터 간장맛 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2457", "sku_code": "NPPIP-DEMO-1776912698118", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2472", "category_id": "65", "name": "내츄럴 로손 바삭한 식감의 완두콩 칩 스낵 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:41.320777", "deleted_at": null,
    images: [{"product_image_id": "2455", "url": "https://ik.imagekit.io/oishidam/products/971b1dbf-2112-4eb1-a7eb-5ac2f4a74462_yw44YxRUN8.webp", "alt_text": "내츄럴 로손 바삭한 식감의 완두콩 칩 스낵 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2458", "sku_code": "NPPIP-DEMO-1776912698117", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2473", "category_id": "65", "name": "내츄럴 로손 오트 귀리 바삭 구운 옷토토 논프라이 스낵 치즈맛 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:42.422087", "deleted_at": null,
    images: [{"product_image_id": "2457", "url": "https://ik.imagekit.io/oishidam/products/be52eacd-c110-4c2f-86e7-296ee151d055_4BXGUT9yk.webp", "alt_text": "내츄럴 로손 오트 귀리 바삭 구운 옷토토 논프라이 스낵 치즈맛 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2459", "sku_code": "NPPIP-DEMO-1776912698116", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2474", "category_id": "65", "name": "내츄럴 로손 유기 재배된 말린 건조 고구마 조각 95g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:42.468756", "deleted_at": null,
    images: [{"product_image_id": "2458", "url": "https://ik.imagekit.io/oishidam/products/ea7986f9-29f1-4e4b-a5a8-6af9632425cb_K5i2wLhqJ.webp", "alt_text": "내츄럴 로손 유기 재배된 말린 건조 고구마 조각 95g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2460", "sku_code": "NPPIP-DEMO-1776912698115", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2475", "category_id": "65", "name": "내츄럴 로손 유기 재배 말린 건조 고구마 스틱 64g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:42.941641", "deleted_at": null,
    images: [{"product_image_id": "2459", "url": "https://ik.imagekit.io/oishidam/products/ce5e0b8a-a267-450b-a1a2-851d3e5aba3c_5o5jaKm3g.webp", "alt_text": "내츄럴 로손 유기 재배 말린 건조 고구마 스틱 64g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2461", "sku_code": "NPPIP-DEMO-1776912698114", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2476", "category_id": "65", "name": "내츄럴 로손 GABA를 섭취할 수 있는 허니버터 믹스넛 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:43.411272", "deleted_at": null,
    images: [{"product_image_id": "2460", "url": "https://ik.imagekit.io/oishidam/products/ba9842a4-4cef-45e3-be4b-9b8978faea1d_r99wTVkPr.webp", "alt_text": "내츄럴 로손 GABA를 섭취할 수 있는 허니버터 믹스넛 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2462", "sku_code": "NPPIP-DEMO-1776912698113", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2477", "category_id": "65", "name": "내츄럴 로손 교비키 콩가루 믹스넛 견과류 안주 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:44.03193", "deleted_at": null,
    images: [{"product_image_id": "2461", "url": "https://ik.imagekit.io/oishidam/products/89f18816-77b0-49ad-bab7-2c3814a26216_z8ZKyqVQw.webp", "alt_text": "내츄럴 로손 교비키 콩가루 믹스넛 견과류 안주 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2463", "sku_code": "NPPIP-DEMO-1776912698110", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2478", "category_id": "65", "name": "내츄럴 로손 구운 믹스넛 일본 견과류 안주 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:44.171517", "deleted_at": null,
    images: [{"product_image_id": "2462", "url": "https://ik.imagekit.io/oishidam/products/ca7a7e5f-b6aa-4b58-88d9-9ba03c467642_2VwXldbAj.webp", "alt_text": "내츄럴 로손 구운 믹스넛 일본 견과류 안주 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2464", "sku_code": "NPPIP-DEMO-1776912698109", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2479", "category_id": "65", "name": "내츄럴 로손 호두와 코코넛 캐러멜라이즈 구운 아몬드 함유 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:44.838029", "deleted_at": null,
    images: [{"product_image_id": "2463", "url": "https://ik.imagekit.io/oishidam/products/f812f36e-105a-4435-bf46-999c1533e4f8_pSOhqpK2p.webp", "alt_text": "내츄럴 로손 호두와 코코넛 캐러멜라이즈 구운 아몬드 함유 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2465", "sku_code": "NPPIP-DEMO-1776912697108", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2480", "category_id": "65", "name": "내츄럴 로손 오키나와 순흑당을 사용한 아몬드와 호두 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:45.414711", "deleted_at": null,
    images: [{"product_image_id": "2464", "url": "https://ik.imagekit.io/oishidam/products/04a14f22-3300-4421-b53f-c2de6078eda8_MQV78ZVcZ.webp", "alt_text": "내츄럴 로손 오키나와 순흑당을 사용한 아몬드와 호두 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2466", "sku_code": "NPPIP-DEMO-1776912697107", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2481", "category_id": "65", "name": "내츄럴 로손 구운 아몬드 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:45.649868", "deleted_at": null,
    images: [{"product_image_id": "2465", "url": "https://ik.imagekit.io/oishidam/products/d0d67391-b181-4d4c-bd98-b6b252d849ef_KuFCr22Xj.webp", "alt_text": "내츄럴 로손 구운 아몬드 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2467", "sku_code": "NPPIP-DEMO-1776912697106", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2482", "category_id": "65", "name": "로손 아몬드와 멸치 안주 26g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:45.771395", "deleted_at": null,
    images: [{"product_image_id": "2466", "url": "https://ik.imagekit.io/oishidam/products/32351e73-924b-4e07-a71e-c0df4b36a1b7_6BQzGwW8E.webp", "alt_text": "로손 아몬드와 멸치 안주 26g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2468", "sku_code": "NPPIP-DEMO-1776912697104", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2483", "category_id": "65", "name": "로손 바삭하고 고소한 버터 피넛 일본 안주 85g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:46.531769", "deleted_at": null,
    images: [{"product_image_id": "2467", "url": "https://ik.imagekit.io/oishidam/products/6c166d6e-dc90-484a-b911-bc257f39cca7_hYK3ocZuq.webp", "alt_text": "로손 바삭하고 고소한 버터 피넛 일본 안주 85g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2469", "sku_code": "NPPIP-DEMO-1776912697102", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2484", "category_id": "65", "name": "로손 8가지 취향 오코노미 믹스 일본 안주 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:47.120484", "deleted_at": null,
    images: [{"product_image_id": "2468", "url": "https://ik.imagekit.io/oishidam/products/3dc00fcb-b1de-4d01-ba31-540e039cb759_GloHHkw0F.webp", "alt_text": "로손 8가지 취향 오코노미 믹스 일본 안주 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2470", "sku_code": "NPPIP-DEMO-1776912697101", "variant_name": "기본", "option_values": {}, "price": 3350, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2485", "category_id": "65", "name": "로손 카키노타네 매실 시소&땅콩 85g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:47.259997", "deleted_at": null,
    images: [{"product_image_id": "2469", "url": "https://ik.imagekit.io/oishidam/products/7395ed3d-287c-4252-81de-80782a6f17df_0L9AIJbaup.webp", "alt_text": "로손 카키노타네 매실 시소&땅콩 85g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2471", "sku_code": "NPPIP-DEMO-177691269699", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2486", "category_id": "65", "name": "로손 바삭한 식감의 카키노타네와 땅콩 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:47.522559", "deleted_at": null,
    images: [{"product_image_id": "2470", "url": "https://ik.imagekit.io/oishidam/products/d640dfb8-69c5-4941-927d-f5190e9f78c5_wJYgyOUaU.webp", "alt_text": "로손 바삭한 식감의 카키노타네와 땅콩 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2472", "sku_code": "NPPIP-DEMO-177691269698", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2487", "category_id": "65", "name": "로손 4종류의 디럭스 믹스넛 86g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:48.252601", "deleted_at": null,
    images: [{"product_image_id": "2471", "url": "https://ik.imagekit.io/oishidam/products/9861ef12-b8c9-4704-a3c2-4b2a20e05bcf_zz3Zdd3k0.webp", "alt_text": "로손 4종류의 디럭스 믹스넛 86g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2473", "sku_code": "NPPIP-DEMO-177691269697", "variant_name": "기본", "option_values": {}, "price": 7600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2488", "category_id": "65", "name": "로손 고소한 피스타치오 36g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:48.749758", "deleted_at": null,
    images: [{"product_image_id": "2472", "url": "https://ik.imagekit.io/oishidam/products/402d9482-ea3a-4b30-8174-32793da50a1d_Cu2XsvWCO.webp", "alt_text": "로손 고소한 피스타치오 36g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2474", "sku_code": "NPPIP-DEMO-177691269696", "variant_name": "기본", "option_values": {}, "price": 4700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2489", "category_id": "65", "name": "로손 스모크 아몬드와 부드러운 캐슈넛 안주 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:48.866488", "deleted_at": null,
    images: [{"product_image_id": "2473", "url": "https://ik.imagekit.io/oishidam/products/181839e2-d1b9-4d6d-b115-f7995fb2ea88_dBI_XEAK7Z.webp", "alt_text": "로손 스모크 아몬드와 부드러운 캐슈넛 안주 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2475", "sku_code": "NPPIP-DEMO-177691269695", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2490", "category_id": "65", "name": "로손 캐슈넛 일본 안주 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:49.243993", "deleted_at": null,
    images: [{"product_image_id": "2474", "url": "https://ik.imagekit.io/oishidam/products/c4a4c21c-c987-4780-b581-1dfe8b32cf9b_q8UlSvmNU.webp", "alt_text": "로손 캐슈넛 일본 안주 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2476", "sku_code": "NPPIP-DEMO-177691269694", "variant_name": "기본", "option_values": {}, "price": 5800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2491", "category_id": "65", "name": "로손 줄기 와카메 미역 간식 우메시소맛 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:49.960504", "deleted_at": null,
    images: [{"product_image_id": "2475", "url": "https://ik.imagekit.io/oishidam/products/dacef41b-3483-4692-bf92-20eaca54d962_vOqGDoETO.webp", "alt_text": "로손 줄기 와카메 미역 간식 우메시소맛 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2477", "sku_code": "NPPIP-DEMO-177691269593", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2492", "category_id": "65", "name": "로손 오샤부리 다시마매실 부각 12g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:50.39623", "deleted_at": null,
    images: [{"product_image_id": "2476", "url": "https://ik.imagekit.io/oishidam/products/825ea8fe-040c-4397-9009-b10d7f236ef3_cZxVH-92h.webp", "alt_text": "로손 오샤부리 다시마매실 부각 12g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2478", "sku_code": "NPPIP-DEMO-177691269591", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2493", "category_id": "65", "name": "로손 가지 튀김 안주 25g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:50.689074", "deleted_at": null,
    images: [{"product_image_id": "2477", "url": "https://ik.imagekit.io/oishidam/products/00aa30eb-bcd5-4f32-8bd7-07e5ca533254_bs0aE68ec.webp", "alt_text": "로손 가지 튀김 안주 25g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2479", "sku_code": "NPPIP-DEMO-177691269484", "variant_name": "기본", "option_values": {}, "price": 5000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2494", "category_id": "65", "name": "로손 바삭하고 맛있는 오징어 튀김과 김 튀김 핫칠리맛 23g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:51.000003", "deleted_at": null,
    images: [{"product_image_id": "2478", "url": "https://ik.imagekit.io/oishidam/products/1800dca9-1ce7-4bc5-bf6e-c1db3e69d455_HiayXqzs3N.webp", "alt_text": "로손 바삭하고 맛있는 오징어 튀김과 김 튀김 핫칠리맛 23g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2480", "sku_code": "NPPIP-DEMO-177691269483", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2495", "category_id": "65", "name": "로손 바삭하고 맛있는 오징어 튀김과 김 튀김 안주 26g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:51.637869", "deleted_at": null,
    images: [{"product_image_id": "2479", "url": "https://ik.imagekit.io/oishidam/products/f5226767-add1-4363-9913-695c4cb1021b_Hqp0F5Tgn.webp", "alt_text": "로손 바삭하고 맛있는 오징어 튀김과 김 튀김 안주 26g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2481", "sku_code": "NPPIP-DEMO-177691269482", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2496", "category_id": "65", "name": "로손 사키이카 오징어 튀김 안주 23g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:52.104259", "deleted_at": null,
    images: [{"product_image_id": "2480", "url": "https://ik.imagekit.io/oishidam/products/7c23d8c5-ef66-4dd9-9753-360975a932fe_uoFdIEqUZ.webp", "alt_text": "로손 사키이카 오징어 튀김 안주 23g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2482", "sku_code": "NPPIP-DEMO-177691269481", "variant_name": "기본", "option_values": {}, "price": 3750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2497", "category_id": "65", "name": "로손 바삭바삭 식감 우마이카 이카후라이 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:52.336811", "deleted_at": null,
    images: [{"product_image_id": "2481", "url": "https://ik.imagekit.io/oishidam/products/3e27e74d-c95f-4ca0-8c53-adefdffed752_cSSQLQEb5D.webp", "alt_text": "로손 바삭바삭 식감 우마이카 이카후라이 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2483", "sku_code": "NPPIP-DEMO-177691269380", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2498", "category_id": "65", "name": "로손 쫄깃한 새콤달콤 오징어 안주 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:52.663868", "deleted_at": null,
    images: [{"product_image_id": "2482", "url": "https://ik.imagekit.io/oishidam/products/c3f8636b-fae2-419e-a70a-1d7b13aeca50_HRya4Fm_e.webp", "alt_text": "로손 쫄깃한 새콤달콤 오징어 안주 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2484", "sku_code": "NPPIP-DEMO-177691269379", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2499", "category_id": "65", "name": "로손 맛있는 매운 오징어 레드칠리맛 안주 20g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:53.300983", "deleted_at": null,
    images: [{"product_image_id": "2483", "url": "https://ik.imagekit.io/oishidam/products/1ae776b8-1d47-4358-b6c7-bce4176c0582_KBrOn9akN.webp", "alt_text": "로손 맛있는 매운 오징어 레드칠리맛 안주 20g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2485", "sku_code": "NPPIP-DEMO-177691269378", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2500", "category_id": "65", "name": "로손 이카군 오징어 안주 29g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:53.81303", "deleted_at": null,
    images: [{"product_image_id": "2484", "url": "https://ik.imagekit.io/oishidam/products/539d106b-87b0-4fe6-82fb-cf6a633575c3_yO1Jov6Rp.webp", "alt_text": "로손 이카군 오징어 안주 29g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2486", "sku_code": "NPPIP-DEMO-177691269377", "variant_name": "기본", "option_values": {}, "price": 4200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2501", "category_id": "65", "name": "로손 매콤한 구운 가마보코 안주 29g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:54.031732", "deleted_at": null,
    images: [{"product_image_id": "2485", "url": "https://ik.imagekit.io/oishidam/products/244e9371-8f48-4096-af4d-03add9f5c0bb_kACy0aPvd.webp", "alt_text": "로손 매콤한 구운 가마보코 안주 29g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2487", "sku_code": "NPPIP-DEMO-177691269274", "variant_name": "기본", "option_values": {}, "price": 2750, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2502", "category_id": "65", "name": "로손 이부리갓코 훈제 단무지 치즈 안주 32g 일본 간식", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:54.387388", "deleted_at": null,
    images: [{"product_image_id": "2486", "url": "https://ik.imagekit.io/oishidam/products/891fde19-aa58-45d8-8c42-4caffb155c96_ApwACtFrm.webp", "alt_text": "로손 이부리갓코 훈제 단무지 치즈 안주 32g 일본 간식", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2488", "sku_code": "NPPIP-DEMO-177691269273", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2503", "category_id": "65", "name": "로손 치즈 대구 매운맛 치즈포 안주 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:54.978111", "deleted_at": null,
    images: [{"product_image_id": "2487", "url": "https://ik.imagekit.io/oishidam/products/5187a0f1-5956-421a-82a6-163c4ca78119_L7kook7KBb.webp", "alt_text": "로손 치즈 대구 매운맛 치즈포 안주 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2489", "sku_code": "NPPIP-DEMO-177691269272", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2504", "category_id": "65", "name": "로손 바삭한 연어 껍질 칩 안주 10g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:55.508708", "deleted_at": null,
    images: [{"product_image_id": "2488", "url": "https://ik.imagekit.io/oishidam/products/480d82ca-77f5-467f-9ca3-409f8f2a327f_UIKfwi-Oe.webp", "alt_text": "로손 바삭한 연어 껍질 칩 안주 10g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2490", "sku_code": "NPPIP-DEMO-177691269270", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2505", "category_id": "65", "name": "로손 달걀의 부드러운맛 동물 카스테라 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:55.712676", "deleted_at": null,
    images: [{"product_image_id": "2489", "url": "https://ik.imagekit.io/oishidam/products/5c5f95c6-ea2f-4361-b59c-ab9289871f73_DYg-lA-Ts.webp", "alt_text": "로손 달걀의 부드러운맛 동물 카스테라 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2491", "sku_code": "NPPIP-DEMO-177691269167", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2506", "category_id": "65", "name": "로손 달걀과 우유 도너츠 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:56.072665", "deleted_at": null,
    images: [{"product_image_id": "2490", "url": "https://ik.imagekit.io/oishidam/products/572eb32b-35a2-4e01-a34b-40671a456392_Yk88IYbJqr.webp", "alt_text": "로손 달걀과 우유 도너츠 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2492", "sku_code": "NPPIP-DEMO-177691269166", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2507", "category_id": "65", "name": "로손 미니 초코칩 쿠키 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:56.785571", "deleted_at": null,
    images: [{"product_image_id": "2491", "url": "https://ik.imagekit.io/oishidam/products/0c152f00-ddcd-4972-8962-0f643f51b604_rToAz46YD.webp", "alt_text": "로손 미니 초코칩 쿠키 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2493", "sku_code": "NPPIP-DEMO-177691269061", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2508", "category_id": "65", "name": "로손 미니 버터 쿠키 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:57.297197", "deleted_at": null,
    images: [{"product_image_id": "2492", "url": "https://ik.imagekit.io/oishidam/products/0fac8452-cb2f-4b18-8ca6-4e5a0fa920e7_4pVpjrNXY.webp", "alt_text": "로손 미니 버터 쿠키 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2494", "sku_code": "NPPIP-DEMO-177691269060", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2509", "category_id": "65", "name": "로손 검은깨 미니 아스파라거스 과자 71g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:57.529922", "deleted_at": null,
    images: [{"product_image_id": "2493", "url": "https://ik.imagekit.io/oishidam/products/3d23ddef-7223-4f8a-9d4c-50f9af883019_-FlSPgXre.webp", "alt_text": "로손 검은깨 미니 아스파라거스 과자 71g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2495", "sku_code": "NPPIP-DEMO-177691269059", "variant_name": "기본", "option_values": {}, "price": 2400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2510", "category_id": "65", "name": "로손 BIG 시미 초코콘 초코맛 과자 115g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:57.732201", "deleted_at": null,
    images: [{"product_image_id": "2494", "url": "https://ik.imagekit.io/oishidam/products/fbaeb27c-4cfa-478f-ab63-f716f7c0f32b_dOMwljQ39.webp", "alt_text": "로손 BIG 시미 초코콘 초코맛 과자 115g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2496", "sku_code": "NPPIP-DEMO-177691269056", "variant_name": "기본", "option_values": {}, "price": 4600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2511", "category_id": "65", "name": "로손 시미 초코콘 초코맛 과자 58g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:58.849633", "deleted_at": null,
    images: [{"product_image_id": "2495", "url": "https://ik.imagekit.io/oishidam/products/613ad813-80d9-4b91-a340-25561c5a69c9_vxKWE01G3.webp", "alt_text": "로손 시미 초코콘 초코맛 과자 58g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2497", "sku_code": "NPPIP-DEMO-177691268955", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2512", "category_id": "65", "name": "로손 초코크림 바 과자 5봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:59.207863", "deleted_at": null,
    images: [{"product_image_id": "2496", "url": "https://ik.imagekit.io/oishidam/products/fd918bbf-fc5f-4904-a6ed-c77c6757853f_YlCKKlkHY.webp", "alt_text": "로손 초코크림 바 과자 5봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2498", "sku_code": "NPPIP-DEMO-177691268954", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2513", "category_id": "65", "name": "로손 바삭바삭 크런치 초콜릿 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:59.409374", "deleted_at": null,
    images: [{"product_image_id": "2497", "url": "https://ik.imagekit.io/oishidam/products/f452dc67-2cd0-485f-9655-f91e78a77f6c_vfiAtk-iX.webp", "alt_text": "로손 바삭바삭 크런치 초콜릿 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2499", "sku_code": "NPPIP-DEMO-177691268953", "variant_name": "기본", "option_values": {}, "price": 3600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2514", "category_id": "65", "name": "로손 바삭바삭 콘 초콜릿 49g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:19:59.829046", "deleted_at": null,
    images: [{"product_image_id": "2498", "url": "https://ik.imagekit.io/oishidam/products/35b28565-bc87-4327-84fb-3b2e3b0633f7_wZjy4CiVm.webp", "alt_text": "로손 바삭바삭 콘 초콜릿 49g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2500", "sku_code": "NPPIP-DEMO-177691268952", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2515", "category_id": "65", "name": "로손 보리 초콜릿 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:00.810563", "deleted_at": null,
    images: [{"product_image_id": "2499", "url": "https://ik.imagekit.io/oishidam/products/a3c5ac04-4260-4c30-ae4b-599df78d61b2_Do0gMq4HO.webp", "alt_text": "로손 보리 초콜릿 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2501", "sku_code": "NPPIP-DEMO-177691268951", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2516", "category_id": "65", "name": "로손 고소한 피넛 초콜릿 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:01.073979", "deleted_at": null,
    images: [{"product_image_id": "2500", "url": "https://ik.imagekit.io/oishidam/products/7f95deab-78cd-484e-99e3-657e3aa7f376_fEj99YiuU.webp", "alt_text": "로손 고소한 피넛 초콜릿 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2502", "sku_code": "NPPIP-DEMO-177691268950", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2517", "category_id": "65", "name": "로손 부드러운 초콜릿 146g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:01.307238", "deleted_at": null,
    images: [{"product_image_id": "2501", "url": "https://ik.imagekit.io/oishidam/products/5407e188-5ba4-4c2c-bdb3-d897d7fc6e38_RfODNZhr7.webp", "alt_text": "로손 부드러운 초콜릿 146g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2503", "sku_code": "NPPIP-DEMO-177691268849", "variant_name": "기본", "option_values": {}, "price": 6200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2518", "category_id": "65", "name": "로손 풍미 가득한 해산물 믹스 과자 54g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:01.399787", "deleted_at": null,
    images: [{"product_image_id": "2502", "url": "https://ik.imagekit.io/oishidam/products/780387e2-c4cd-476c-9f91-3db737c4ef5e_aKWwAEWNA.webp", "alt_text": "로손 풍미 가득한 해산물 믹스 과자 54g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2504", "sku_code": "NPPIP-DEMO-177691268848", "variant_name": "기본", "option_values": {}, "price": 3200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2519", "category_id": "65", "name": "로손 오징어 미림 고소한 간장맛 과자 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:02.679569", "deleted_at": null,
    images: [{"product_image_id": "2503", "url": "https://ik.imagekit.io/oishidam/products/00dbaeff-1e32-45b7-a549-d5181b8381d9_ZCwZxMui7.webp", "alt_text": "로손 오징어 미림 고소한 간장맛 과자 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2505", "sku_code": "NPPIP-DEMO-177691268847", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2520", "category_id": "65", "name": "로손 바삭하고 고소한 새우의 풍미 과자 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:02.703521", "deleted_at": null,
    images: [{"product_image_id": "2504", "url": "https://ik.imagekit.io/oishidam/products/e322b947-1b9d-4769-887d-2b07f0c97242_NWQOuECNW.webp", "alt_text": "로손 바삭하고 고소한 새우의 풍미 과자 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2506", "sku_code": "NPPIP-DEMO-177691268845", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2521", "category_id": "65", "name": "로손 후조로이 땅콩 튀김 피넛츠 아게 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:03.066919", "deleted_at": null,
    images: [{"product_image_id": "2506", "url": "https://ik.imagekit.io/oishidam/products/e8e633b1-f169-4b09-80b2-1af6aabeade4_HXLhMMTsP-.webp", "alt_text": "로손 후조로이 땅콩 튀김 피넛츠 아게 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2507", "sku_code": "NPPIP-DEMO-177691268844", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2522", "category_id": "65", "name": "로손 폰스케 김맛 센베이 95g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:03.005748", "deleted_at": null,
    images: [{"product_image_id": "2505", "url": "https://ik.imagekit.io/oishidam/products/e8030db2-49ea-48ba-9dac-33abf16f1791_yhW3VwqlQ.webp", "alt_text": "로손 폰스케 김맛 센베이 95g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2508", "sku_code": "NPPIP-DEMO-177691268842", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2523", "category_id": "65", "name": "로손 소금 새우 아라레 센베이 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:04.394761", "deleted_at": null,
    images: [{"product_image_id": "2508", "url": "https://ik.imagekit.io/oishidam/products/61596ffd-a529-4a0e-9c72-a2d2ce3865d0_9j1XZaH5U.webp", "alt_text": "로손 소금 새우 아라레 센베이 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2509", "sku_code": "NPPIP-DEMO-177691268741", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2524", "category_id": "65", "name": "로손 김말이 아라레 센베이 22g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:04.346819", "deleted_at": null,
    images: [{"product_image_id": "2507", "url": "https://ik.imagekit.io/oishidam/products/0a552523-ae07-4e95-999b-ecbe36337382_oWBbf-hoHJ.webp", "alt_text": "로손 김말이 아라레 센베이 22g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2510", "sku_code": "NPPIP-DEMO-177691268740", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2525", "category_id": "65", "name": "로손 4종류의 센베이 믹스", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:04.681386", "deleted_at": null,
    images: [{"product_image_id": "2509", "url": "https://ik.imagekit.io/oishidam/products/211db246-1edb-45cd-82f0-b761df4db21c_mO1S4LD3r.webp", "alt_text": "로손 4종류의 센베이 믹스", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2511", "sku_code": "NPPIP-DEMO-177691268739", "variant_name": "기본", "option_values": {}, "price": 6200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2526", "category_id": "65", "name": "로손 3가지 간장을 사용한 검은깨 센베이 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:04.681386", "deleted_at": null,
    images: [{"product_image_id": "2510", "url": "https://ik.imagekit.io/oishidam/products/5b06e96e-c4a2-4c24-9472-938591c5a04d__-qohoEw9.webp", "alt_text": "로손 3가지 간장을 사용한 검은깨 센베이 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2512", "sku_code": "NPPIP-DEMO-177691268738", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2527", "category_id": "65", "name": "로손 아카호 소금을 사용한 얇게 구운 센베이 소금맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:06.26166", "deleted_at": null,
    images: [{"product_image_id": "2512", "url": "https://ik.imagekit.io/oishidam/products/87122d4f-b918-4789-866c-d9acb3299ed5_LxAMAtBa4.webp", "alt_text": "로손 아카호 소금을 사용한 얇게 구운 센베이 소금맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2513", "sku_code": "NPPIP-DEMO-177691268737", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2528", "category_id": "65", "name": "로손 아카호 소금을 사용한 튀긴 모찌 소금맛 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:06.137608", "deleted_at": null,
    images: [{"product_image_id": "2511", "url": "https://ik.imagekit.io/oishidam/products/eeeb422f-aa8a-46d0-bc3f-39245a8e29d0_wvwRQUqJ_.webp", "alt_text": "로손 아카호 소금을 사용한 튀긴 모찌 소금맛 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2514", "sku_code": "NPPIP-DEMO-177691268736", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2529", "category_id": "65", "name": "로손 미니 가부키 튀김 과자 77g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:06.74775", "deleted_at": null,
    images: [{"product_image_id": "2514", "url": "https://ik.imagekit.io/oishidam/products/51fab9ea-36ee-4208-a589-eefcd3c5f186_MeNNAO80o.webp", "alt_text": "로손 미니 가부키 튀김 과자 77g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2515", "sku_code": "NPPIP-DEMO-177691268634", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2530", "category_id": "65", "name": "로손 바삭한 식감의 츠나아게 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:06.402931", "deleted_at": null,
    images: [{"product_image_id": "2513", "url": "https://ik.imagekit.io/oishidam/products/82e184be-cdfe-4285-aabc-322ea907d2b0_S3DbMUb1Oa.webp", "alt_text": "로손 바삭한 식감의 츠나아게 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2516", "sku_code": "NPPIP-DEMO-177691268633", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2531", "category_id": "65", "name": "로손 크루아상 스낵 트러플 버터맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:07.896745", "deleted_at": null,
    images: [{"product_image_id": "2515", "url": "https://ik.imagekit.io/oishidam/products/7d59917e-e75d-4097-aef2-8ea008da4da4_xCCuUPJ5a.webp", "alt_text": "로손 크루아상 스낵 트러플 버터맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2517", "sku_code": "NPPIP-DEMO-177691268632", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2532", "category_id": "65", "name": "로손 또띠아칩스 칠리타코스맛 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:07.894741", "deleted_at": null,
    images: [{"product_image_id": "2516", "url": "https://ik.imagekit.io/oishidam/products/951bfd04-9112-44ac-bf87-36685319f352_Tk1dP7jMP.webp", "alt_text": "로손 또띠아칩스 칠리타코스맛 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2518", "sku_code": "NPPIP-DEMO-177691268630", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2533", "category_id": "65", "name": "로손 스콘 야미츠키 바베큐맛 과자 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:08.288965", "deleted_at": null,
    images: [{"product_image_id": "2517", "url": "https://ik.imagekit.io/oishidam/products/e7acd2d6-4f90-487f-8dcc-e755db6b9573_w-u55DBVW.webp", "alt_text": "로손 스콘 야미츠키 바베큐맛 과자 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2519", "sku_code": "NPPIP-DEMO-177691268528", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2534", "category_id": "65", "name": "로손 스콘 절품 구운 옥수수맛 과자 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:08.40753", "deleted_at": null,
    images: [{"product_image_id": "2518", "url": "https://ik.imagekit.io/oishidam/products/16b15cd3-febd-4128-a9b0-6ae55120c844_2tGVVoEZQ.webp", "alt_text": "로손 스콘 절품 구운 옥수수맛 과자 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2520", "sku_code": "NPPIP-DEMO-177691268527", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2535", "category_id": "65", "name": "로손 치즈&페퍼 스낵 스틱 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:09.498538", "deleted_at": null,
    images: [{"product_image_id": "2519", "url": "https://ik.imagekit.io/oishidam/products/8eefb550-9f58-49fd-8246-c7af409cf5d7_LF0pr9QGs.webp", "alt_text": "로손 치즈&페퍼 스낵 스틱 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2521", "sku_code": "NPPIP-DEMO-177691268526", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2536", "category_id": "65", "name": "로손 베비스타 도데카이 라멘 진한 매운 스파이시 치킨맛 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:09.530109", "deleted_at": null,
    images: [{"product_image_id": "2520", "url": "https://ik.imagekit.io/oishidam/products/e9536b3d-8434-4c87-bdf0-f67182ec21d6_jTtoonaLd.webp", "alt_text": "로손 베비스타 도데카이 라멘 진한 매운 스파이시 치킨맛 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2522", "sku_code": "NPPIP-DEMO-177691268523", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2537", "category_id": "65", "name": "로손 베비스타 라멘마루 치킨맛 과자 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:10.026408", "deleted_at": null,
    images: [{"product_image_id": "2521", "url": "https://ik.imagekit.io/oishidam/products/0e99c029-ac07-452b-98ca-98e13a8d6424_qVeolwWlB.webp", "alt_text": "로손 베비스타 라멘마루 치킨맛 과자 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2523", "sku_code": "NPPIP-DEMO-177691268522", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2538", "category_id": "65", "name": "로손 BIG 에어리얼 우마시오맛 96g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:10.042437", "deleted_at": null,
    images: [{"product_image_id": "2522", "url": "https://ik.imagekit.io/oishidam/products/c7bc0628-e2e7-4a41-88e0-29ff4c67fa40_lXkySNZ4s.webp", "alt_text": "로손 BIG 에어리얼 우마시오맛 96g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2524", "sku_code": "NPPIP-DEMO-177691268421", "variant_name": "기본", "option_values": {}, "price": 3700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2539", "category_id": "65", "name": "로손 바삭한 식감 비노 우마소금후추맛 콩과자 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:11.364848", "deleted_at": null,
    images: [{"product_image_id": "2524", "url": "https://ik.imagekit.io/oishidam/products/f63627c4-2cb1-4b0d-8983-c86949cde615_oH3WE7tpb.webp", "alt_text": "로손 바삭한 식감 비노 우마소금후추맛 콩과자 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2525", "sku_code": "NPPIP-DEMO-177691268420", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2540", "category_id": "65", "name": "로손 절품 캇파에비센 나루토 소금과 가리비맛 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:11.288242", "deleted_at": null,
    images: [{"product_image_id": "2523", "url": "https://ik.imagekit.io/oishidam/products/ca4c600c-873a-4aa0-8e6e-ad78f1bdf545_-NRZdD_h6.webp", "alt_text": "로손 절품 캇파에비센 나루토 소금과 가리비맛 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2526", "sku_code": "NPPIP-DEMO-177691268419", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2541", "category_id": "65", "name": "로손 삿포로 포테이토 츠부츠부 베지터블 감자스틱 63g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:11.70758", "deleted_at": null,
    images: [{"product_image_id": "2525", "url": "https://ik.imagekit.io/oishidam/products/c50d5815-ce29-4ab5-9a42-f5481fbda652_bd3w2iAYx.webp", "alt_text": "로손 삿포로 포테이토 츠부츠부 베지터블 감자스틱 63g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2527", "sku_code": "NPPIP-DEMO-177691268417", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2542", "category_id": "65", "name": "로손 삿포로 포테이토 바비큐맛 감자칩 63g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:11.910546", "deleted_at": null,
    images: [{"product_image_id": "2526", "url": "https://ik.imagekit.io/oishidam/products/1532524f-6e6a-44ae-b874-4779e01c770d_N3RMaYjN-.webp", "alt_text": "로손 삿포로 포테이토 바비큐맛 감자칩 63g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2528", "sku_code": "NPPIP-DEMO-177691268416", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2543", "category_id": "65", "name": "로손 오잭 진한 김소금맛 감자칩 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:12.967273", "deleted_at": null,
    images: [{"product_image_id": "2527", "url": "https://ik.imagekit.io/oishidam/products/6cc97947-a0fb-4151-ac7d-6aa9fd34b905_ee1GlCILq.webp", "alt_text": "로손 오잭 진한 김소금맛 감자칩 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2529", "sku_code": "NPPIP-DEMO-177691268415", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2544", "category_id": "65", "name": "로손 오잭 담백한 소금맛 감자칩 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:13.029069", "deleted_at": null,
    images: [{"product_image_id": "2528", "url": "https://ik.imagekit.io/oishidam/products/847570be-f620-48fc-9b38-82a71277b655_vUGqWUIBS.webp", "alt_text": "로손 오잭 담백한 소금맛 감자칩 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2530", "sku_code": "NPPIP-DEMO-177691268314", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2545", "category_id": "65", "name": "로손 바삭한 감자, 진한 김소금맛 감자칩 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:13.353639", "deleted_at": null,
    images: [{"product_image_id": "2529", "url": "https://ik.imagekit.io/oishidam/products/51efb536-0ea2-49bd-98b4-e7982b5cf9d4_H2JOWqfDn7.webp", "alt_text": "로손 바삭한 감자, 진한 김소금맛 감자칩 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2531", "sku_code": "NPPIP-DEMO-17769126839", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2546", "category_id": "65", "name": "로손 슷마무쵸칩 상큼한 매실맛 감자칩 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:13.603107", "deleted_at": null,
    images: [{"product_image_id": "2530", "url": "https://ik.imagekit.io/oishidam/products/1f5ab768-70f6-4463-a98b-4cd6f6a78eb5_Fugy5mntC.webp", "alt_text": "로손 슷마무쵸칩 상큼한 매실맛 감자칩 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2532", "sku_code": "NPPIP-DEMO-177691268313", "variant_name": "기본", "option_values": {}, "price": 2346, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2547", "category_id": "65", "name": "로손 두껍게 자른 감자칩 사워 크림 양파맛 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:14.583235", "deleted_at": null,
    images: [{"product_image_id": "2531", "url": "https://ik.imagekit.io/oishidam/products/c0ccc2a7-7396-4535-a025-9546e8dbc2c0_68m8DJJGM.webp", "alt_text": "로손 두껍게 자른 감자칩 사워 크림 양파맛 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2533", "sku_code": "NPPIP-DEMO-177691268312", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2548", "category_id": "65", "name": "로손 일본산 감자 100% 포테이토칩 감자와 콘소메맛 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:14.644811", "deleted_at": null,
    images: [{"product_image_id": "2532", "url": "https://ik.imagekit.io/oishidam/products/73a39895-6734-4bb1-81bc-393570563f51_IMjpLDFCaf.webp", "alt_text": "로손 일본산 감자 100% 포테이토칩 감자와 콘소메맛 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2534", "sku_code": "NPPIP-DEMO-177691268311", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2549", "category_id": "65", "name": "로손 일본산 감자 100% 포테이토칩 감자와 소금맛 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:14.986606", "deleted_at": null,
    images: [{"product_image_id": "2533", "url": "https://ik.imagekit.io/oishidam/products/cef52bd8-4bb5-414c-aeff-a31e9f368c84_BFfF8Y1k8.webp", "alt_text": "로손 일본산 감자 100% 포테이토칩 감자와 소금맛 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2535", "sku_code": "NPPIP-DEMO-177691268310", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2550", "category_id": "65", "name": "로손 BIG 사쿳토포테토 감칠맛 콘소메맛 감자칩120g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:15.234138", "deleted_at": null,
    images: [{"product_image_id": "2534", "url": "https://ik.imagekit.io/oishidam/products/a24b3bda-3d9c-4667-b5f9-f794339de745_FgOmE0QbW.webp", "alt_text": "로손 BIG 사쿳토포테토 감칠맛 콘소메맛 감자칩120g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2536", "sku_code": "NPPIP-DEMO-17769126828", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2551", "category_id": "65", "name": "로손 BIG 사쿳토포테토 코다와리 소금맛 감자칩 130g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:16.255241", "deleted_at": null,
    images: [{"product_image_id": "2535", "url": "https://ik.imagekit.io/oishidam/products/b7585fd8-47c0-4d93-bc44-8ed291f4969b_3kj2fISG4.webp", "alt_text": "로손 BIG 사쿳토포테토 코다와리 소금맛 감자칩 130g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2537", "sku_code": "NPPIP-DEMO-17769126827", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2552", "category_id": "65", "name": "로손 사쿳토포테토 감자 통째로 이세 새우맛 감자칩 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:16.381395", "deleted_at": null,
    images: [{"product_image_id": "2536", "url": "https://ik.imagekit.io/oishidam/products/3785d536-5115-49c7-bcdf-75acf77fe353_gLctLaoTT.webp", "alt_text": "로손 사쿳토포테토 감자 통째로 이세 새우맛 감자칩 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2538", "sku_code": "NPPIP-DEMO-17769126826", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2553", "category_id": "65", "name": "로손 사쿳토포테토 풍부한 트러플 소금맛 감자칩 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:16.669202", "deleted_at": null,
    images: [{"product_image_id": "2537", "url": "https://ik.imagekit.io/oishidam/products/2f09c5b7-a7be-460e-ab43-395cba27a967_W8PrVDP50.webp", "alt_text": "로손 사쿳토포테토 풍부한 트러플 소금맛 감자칩 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2539", "sku_code": "NPPIP-DEMO-17769126825", "variant_name": "기본", "option_values": {}, "price": 2800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2554", "category_id": "65", "name": "로손 사쿳토포테토 감칠맛 콘소메맛 감자칩 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:17.162784", "deleted_at": null,
    images: [{"product_image_id": "2538", "url": "https://ik.imagekit.io/oishidam/products/2011db6d-033c-4da3-8cdd-64d1770745ad_FKsGX8fFW.webp", "alt_text": "로손 사쿳토포테토 감칠맛 콘소메맛 감자칩 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2540", "sku_code": "NPPIP-DEMO-17769126824", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2555", "category_id": "65", "name": "로손 사쿳토포테토 코다와리 소금맛 감자칩 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:18.016902", "deleted_at": null,
    images: [{"product_image_id": "2539", "url": "https://ik.imagekit.io/oishidam/products/031caf66-e34a-411e-8726-2d0e730ab38e_mbyUHmB2R.webp", "alt_text": "로손 사쿳토포테토 코다와리 소금맛 감자칩 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2541", "sku_code": "NPPIP-DEMO-17769126823", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2556", "category_id": "82", "name": "퓨아레 커피 아몬드 티라미수 초콜릿 대용량 405g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:18.29678", "deleted_at": null,
    images: [{"product_image_id": "2540", "url": "https://ik.imagekit.io/oishidam/products/add9cb04-c5a1-4dd8-adea-ecaff2dbd296_h_kSkk19W.webp", "alt_text": "퓨아레 커피 아몬드 티라미수 초콜릿 대용량 405g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2542", "sku_code": "NPPIP-DEMO-1776305568", "variant_name": "기본", "option_values": {}, "price": 27000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2557", "category_id": "79", "name": "야오킨 리스카 싯토리 초코 촉촉한 초코과자 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:18.622484", "deleted_at": null,
    images: [{"product_image_id": "2541", "url": "https://ik.imagekit.io/oishidam/products/a2e001f9-571b-449c-9e21-42d7fc9858b6_vLB1WeyGMm.webp", "alt_text": "야오킨 리스카 싯토리 초코 촉촉한 초코과자 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2543", "sku_code": "NPPIP-DEMO-1775809071", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2558", "category_id": "88", "name": "센자쿠 호화스러운 구미 야마가타 체리 젤리 34g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:19.103655", "deleted_at": null,
    images: [{"product_image_id": "2542", "url": "https://ik.imagekit.io/oishidam/products/c55271aa-d7d4-4bfa-b1de-03222f551d41_mNr8zgG5M.webp", "alt_text": "센자쿠 호화스러운 구미 야마가타 체리 젤리 34g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2544", "sku_code": "NPPIP-DEMO-1775802675", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2559", "category_id": "88", "name": "오리히로 곤약젤리 기간한정 소금 레몬 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:19.790839", "deleted_at": null,
    images: [{"product_image_id": "2543", "url": "https://ik.imagekit.io/oishidam/products/a42d65af-869b-43d2-b7e7-b4e70c4edc10_WZIrUpg2f.webp", "alt_text": "오리히로 곤약젤리 기간한정 소금 레몬 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2545", "sku_code": "NPPIP-DEMO-1775626489", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2560", "category_id": "87", "name": "칸로 노도아메 건강의 목캔디 황금복숭아 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:20.247468", "deleted_at": null,
    images: [{"product_image_id": "2544", "url": "https://ik.imagekit.io/oishidam/products/a86ec628-73ea-4602-ba3e-a480fafc1ef6_5qY-mejJA.webp", "alt_text": "칸로 노도아메 건강의 목캔디 황금복숭아 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2546", "sku_code": "NPPIP-DEMO-1775203463", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2561", "category_id": "88", "name": "후루타 폼폼푸린 푸딩맛 일본 젤리 구미 28g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:20.539931", "deleted_at": null,
    images: [{"product_image_id": "2545", "url": "https://ik.imagekit.io/oishidam/products/54013b47-24cc-4c11-b96a-502f47f9f986_GAhXiNCpA.webp", "alt_text": "후루타 폼폼푸린 푸딩맛 일본 젤리 구미 28g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2547", "sku_code": "NPPIP-DEMO-1775100988", "variant_name": "기본", "option_values": {}, "price": 3900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2562", "category_id": "82", "name": "네슬레 네스카페 얼그레이 저당 포션 7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:20.771414", "deleted_at": null,
    images: [{"product_image_id": "2546", "url": "https://ik.imagekit.io/oishidam/products/240d2355-dec8-47b5-9526-2758bfb1fe8a_51RayVZCM.webp", "alt_text": "네슬레 네스카페 얼그레이 저당 포션 7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2548", "sku_code": "NPPIP-DEMO-1774936720", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2563", "category_id": "82", "name": "네슬레 네스카페 포션 피치티 라떼 액상 복숭아라떼 포션7개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:21.49905", "deleted_at": null,
    images: [{"product_image_id": "2547", "url": "https://ik.imagekit.io/oishidam/products/68998934-bdf4-4195-a352-f7da1fa573a7_bTfFLug40.webp", "alt_text": "네슬레 네스카페 포션 피치티 라떼 액상 복숭아라떼 포션7개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2549", "sku_code": "NPPIP-DEMO-1774936204", "variant_name": "기본", "option_values": {}, "price": 5500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2564", "category_id": "87", "name": "사쿠마 츠미부카이 머스캣 캔디 54g 일본 사탕", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:21.933664", "deleted_at": null,
    images: [{"product_image_id": "2548", "url": "https://ik.imagekit.io/oishidam/products/2c94a1ac-611b-483d-a178-04c1b3a8c9eb_fQ1N3hAhv.webp", "alt_text": "사쿠마 츠미부카이 머스캣 캔디 54g 일본 사탕", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2550", "sku_code": "NPPIP-DEMO-1774851408", "variant_name": "기본", "option_values": {}, "price": 4450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2565", "category_id": "66", "name": "세븐일레븐 가리가리콘 콘소메맛 65g 일본 과자 스낵", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:22.196862", "deleted_at": null,
    images: [{"product_image_id": "2549", "url": "https://ik.imagekit.io/oishidam/products/67e67fd7-2088-4725-bba1-181e5ddde780_1wyWkdR0y.webp", "alt_text": "세븐일레븐 가리가리콘 콘소메맛 65g 일본 과자 스낵", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2551", "sku_code": "NPPIP-DEMO-1774324044", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2566", "category_id": "82", "name": "부르봉 루만도 프리미엄 에티오피아 모카 커피맛 9개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:22.662963", "deleted_at": null,
    images: [{"product_image_id": "2550", "url": "https://ik.imagekit.io/oishidam/products/bf47b5c2-925c-4cd0-be0e-ae859e5a6f40_yZB3IO4-s.webp", "alt_text": "부르봉 루만도 프리미엄 에티오피아 모카 커피맛 9개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2552", "sku_code": "NPPIP-DEMO-17742472663", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2567", "category_id": "88", "name": "오리히로 곤약젤리 복숭아+망고+포도 24개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:23.270128", "deleted_at": null,
    images: [{"product_image_id": "2551", "url": "https://ik.imagekit.io/oishidam/products/be8d42f7-5c5f-417c-a0dd-fa6f128f0a9c_LrogsY5tc.webp", "alt_text": "오리히로 곤약젤리 복숭아+망고+포도 24개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2553", "sku_code": "NPPIP-DEMO-177390585214", "variant_name": "기본", "option_values": {}, "price": 6100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2568", "category_id": "88", "name": "오리히로 곤약젤리 거봉+청포도+망고 24개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:23.831107", "deleted_at": null,
    images: [{"product_image_id": "2552", "url": "https://ik.imagekit.io/oishidam/products/a29abf22-65aa-430b-8483-af4823ec94c7__oXedzfvq.webp", "alt_text": "오리히로 곤약젤리 거봉+청포도+망고 24개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2554", "sku_code": "NPPIP-DEMO-177390585113", "variant_name": "기본", "option_values": {}, "price": 6100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2569", "category_id": "88", "name": "오리히로 곤약젤리 망고+백도 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:23.93845", "deleted_at": null,
    images: [{"product_image_id": "2553", "url": "https://ik.imagekit.io/oishidam/products/0d5d9a5b-4756-440b-941e-e31be39672fc_r4-5MJkvCc.webp", "alt_text": "오리히로 곤약젤리 망고+백도 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2555", "sku_code": "NPPIP-DEMO-177390584611", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2570", "category_id": "88", "name": "오리히로 곤약젤리 샤인머스캣 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:24.387232", "deleted_at": null,
    images: [{"product_image_id": "2554", "url": "https://ik.imagekit.io/oishidam/products/502d4727-eda1-4551-941a-13ba19dfbf56_5s35uT8Vf2.webp", "alt_text": "오리히로 곤약젤리 샤인머스캣 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2556", "sku_code": "NPPIP-DEMO-17739058435", "variant_name": "기본", "option_values": {}, "price": 2700, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2571", "category_id": "88", "name": "오리히로 곤약젤리 기간한정 골든 파인애플 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:25.227951", "deleted_at": null,
    images: [{"product_image_id": "2555", "url": "https://ik.imagekit.io/oishidam/products/3e35e184-2daa-4ce8-b8b5-005d5d4f75ad_10Vlf2lSv.webp", "alt_text": "오리히로 곤약젤리 기간한정 골든 파인애플 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2557", "sku_code": "NPPIP-DEMO-17739019226", "variant_name": "기본", "option_values": {}, "price": 2900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2572", "category_id": "66", "name": "세븐일레븐 크런치 초코쿠키 믹스 아소토 151g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:25.800158", "deleted_at": null,
    images: [{"product_image_id": "2557", "url": "https://ik.imagekit.io/oishidam/products/09bb8bbc-b6d3-4ae2-8af8-09c7c3a6aa81_mrK4aBlPC.webp", "alt_text": "세븐일레븐 크런치 초코쿠키 믹스 아소토 151g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2558", "sku_code": "NPPIP-DEMO-177329836866", "variant_name": "기본", "option_values": {}, "price": 6950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2573", "category_id": "66", "name": "세븐일레븐 땅콩 아몬드 더블 너트 초콜릿 108g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:25.623553", "deleted_at": null,
    images: [{"product_image_id": "2556", "url": "https://ik.imagekit.io/oishidam/products/966cf4b3-663b-4498-a135-626bdd7635b9_zMsUzhGLGV.webp", "alt_text": "세븐일레븐 땅콩 아몬드 더블 너트 초콜릿 108g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2559", "sku_code": "NPPIP-DEMO-177329836864", "variant_name": "기본", "option_values": {}, "price": 5650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2574", "category_id": "66", "name": "세븐일레븐 초콜릿 캬라멜콘 스낵 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:26.066559", "deleted_at": null,
    images: [{"product_image_id": "2558", "url": "https://ik.imagekit.io/oishidam/products/558f245b-b50a-455e-a99f-df766114f693_dfZEXCqnR1.webp", "alt_text": "세븐일레븐 초콜릿 캬라멜콘 스낵 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2560", "sku_code": "NPPIP-DEMO-177329836763", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2575", "category_id": "66", "name": "세븐일레븐 사쿠사쿠 초콜릿 콘프레이크 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:26.969513", "deleted_at": null,
    images: [{"product_image_id": "2559", "url": "https://ik.imagekit.io/oishidam/products/a0fc9672-d79b-4d45-a1b1-57fba9725ef5_RaL1voTgh.webp", "alt_text": "세븐일레븐 사쿠사쿠 초콜릿 콘프레이크 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2561", "sku_code": "NPPIP-DEMO-177329836762", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2576", "category_id": "66", "name": "세븐일레븐 무기초코 초콜릿 스낵 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:27.608107", "deleted_at": null,
    images: [{"product_image_id": "2561", "url": "https://ik.imagekit.io/oishidam/products/7532a4af-bcc7-4673-8e78-5ac9b78c5c69_ot9z8ioOU.webp", "alt_text": "세븐일레븐 무기초코 초콜릿 스낵 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2562", "sku_code": "NPPIP-DEMO-177329836659", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2577", "category_id": "66", "name": "세븐일레븐 사쿠사쿠 콘초코 초콜릿 스낵 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:27.485088", "deleted_at": null,
    images: [{"product_image_id": "2560", "url": "https://ik.imagekit.io/oishidam/products/03a4a6ea-cb57-48ff-a1fd-02b7a0bcb6cd_IVBzSW_8X.webp", "alt_text": "세븐일레븐 사쿠사쿠 콘초코 초콜릿 스낵 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2563", "sku_code": "NPPIP-DEMO-177329836558", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2578", "category_id": "66", "name": "세븐일레븐 밀크 초콜릿 107g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:27.716203", "deleted_at": null,
    images: [{"product_image_id": "2562", "url": "https://ik.imagekit.io/oishidam/products/a2bc3bff-386c-49ac-a2a5-3421b7c7856d_7HUGpUg_X.webp", "alt_text": "세븐일레븐 밀크 초콜릿 107g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2564", "sku_code": "NPPIP-DEMO-177329836557", "variant_name": "기본", "option_values": {}, "price": 6950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2579", "category_id": "66", "name": "세븐일레븐 땅콩 초콜릿 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:28.635564", "deleted_at": null,
    images: [{"product_image_id": "2563", "url": "https://ik.imagekit.io/oishidam/products/f9295cac-ab9a-44d3-85d1-48584ad0dc26_Oo0pi_qe1.webp", "alt_text": "세븐일레븐 땅콩 초콜릿 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2565", "sku_code": "NPPIP-DEMO-177329836556", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2580", "category_id": "66", "name": "세븐일레븐 싯토리초코 딸기맛 초콜릿 쿠키 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:29.167404", "deleted_at": null,
    images: [{"product_image_id": "2564", "url": "https://ik.imagekit.io/oishidam/products/21af4527-e2a6-4d29-9084-6a5d67d66e7e_-EXmM-CgW.webp", "alt_text": "세븐일레븐 싯토리초코 딸기맛 초콜릿 쿠키 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2566", "sku_code": "NPPIP-DEMO-177329836454", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2581", "category_id": "66", "name": "세븐일레븐 사쿠초코 땅콩 초콜릿 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:29.614747", "deleted_at": null,
    images: [{"product_image_id": "2566", "url": "https://ik.imagekit.io/oishidam/products/2035efe5-2093-4aef-91ad-152046f378ab_5veBopkRRx.webp", "alt_text": "세븐일레븐 사쿠초코 땅콩 초콜릿 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2567", "sku_code": "NPPIP-DEMO-177329836452", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2582", "category_id": "66", "name": "세븐일레븐 헤이즐넛 초콜릿 34g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:29.415949", "deleted_at": null,
    images: [{"product_image_id": "2565", "url": "https://ik.imagekit.io/oishidam/products/61b2c179-ab77-4798-86c5-0667c1adc0a2_i5jlVTHyP.webp", "alt_text": "세븐일레븐 헤이즐넛 초콜릿 34g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2568", "sku_code": "NPPIP-DEMO-177329836351", "variant_name": "기본", "option_values": {}, "price": 6200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2583", "category_id": "66", "name": "세븐일레븐 아몬드 초콜릿 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:30.329544", "deleted_at": null,
    images: [{"product_image_id": "2567", "url": "https://ik.imagekit.io/oishidam/products/786e8592-31df-4a07-97cd-a0c2a8453dd3_nwNWf6i6R.webp", "alt_text": "세븐일레븐 아몬드 초콜릿 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2569", "sku_code": "NPPIP-DEMO-177329836149", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2584", "category_id": "66", "name": "세븐일레븐 한 입 사이즈 초콜릿 커버 비스킷 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:30.857786", "deleted_at": null,
    images: [{"product_image_id": "2568", "url": "https://ik.imagekit.io/oishidam/products/07a86ffb-9acb-41cf-8884-35efe7e0d86d_tTzK3prGm.webp", "alt_text": "세븐일레븐 한 입 사이즈 초콜릿 커버 비스킷 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2570", "sku_code": "NPPIP-DEMO-177329836148", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2585", "category_id": "66", "name": "세븐일레븐 사각 크런치 초콜릿 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:31.076352", "deleted_at": null,
    images: [{"product_image_id": "2569", "url": "https://ik.imagekit.io/oishidam/products/29450021-a865-4124-a7eb-5e796d450a55__qBAYKUzI.webp", "alt_text": "세븐일레븐 사각 크런치 초콜릿 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2571", "sku_code": "NPPIP-DEMO-177329836047", "variant_name": "기본", "option_values": {}, "price": 4650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2586", "category_id": "66", "name": "세븐일레븐 미니 웨하스 초콜릿맛 34g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:31.294563", "deleted_at": null,
    images: [{"product_image_id": "2570", "url": "https://ik.imagekit.io/oishidam/products/ca1b5ca9-ce12-4fe5-bff7-c9b07bfcc18d_4UeIVfAlS.webp", "alt_text": "세븐일레븐 미니 웨하스 초콜릿맛 34g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2572", "sku_code": "NPPIP-DEMO-177329836046", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2587", "category_id": "66", "name": "세븐일레븐 시미코미 초콜릿 러스크 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:32.239843", "deleted_at": null,
    images: [{"product_image_id": "2571", "url": "https://ik.imagekit.io/oishidam/products/e723b0c7-7d35-4eb0-b4a7-25853c7fcd8f_x0DurUMpu.webp", "alt_text": "세븐일레븐 시미코미 초콜릿 러스크 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2573", "sku_code": "NPPIP-DEMO-177329836045", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2588", "category_id": "66", "name": "세븐일레븐 바삭한 초콜릿 러스크 6개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:32.870327", "deleted_at": null,
    images: [{"product_image_id": "2573", "url": "https://ik.imagekit.io/oishidam/products/6356915a-122b-461c-baf5-817632e8522a_xD_-A42Kb.webp", "alt_text": "세븐일레븐 바삭한 초콜릿 러스크 6개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2574", "sku_code": "NPPIP-DEMO-177329835944", "variant_name": "기본", "option_values": {}, "price": 5650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2589", "category_id": "66", "name": "세븐일레븐 쿠키 비스킷 믹스 아소토 125g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:32.715466", "deleted_at": null,
    images: [{"product_image_id": "2572", "url": "https://ik.imagekit.io/oishidam/products/113c8f40-3fac-4b38-853b-c6d9bc32e3a8_1e8m-bVI6.webp", "alt_text": "세븐일레븐 쿠키 비스킷 믹스 아소토 125g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2575", "sku_code": "NPPIP-DEMO-177329835840", "variant_name": "기본", "option_values": {}, "price": 6950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2590", "category_id": "66", "name": "세븐일레븐 발효버터 레이즌 샌드 쿠키 3개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:32.961037", "deleted_at": null,
    images: [{"product_image_id": "2574", "url": "https://ik.imagekit.io/oishidam/products/34f0630a-e669-49f5-955e-8da010a5edd1_f4S1BQVK9.webp", "alt_text": "세븐일레븐 발효버터 레이즌 샌드 쿠키 3개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2576", "sku_code": "NPPIP-DEMO-177329835839", "variant_name": "기본", "option_values": {}, "price": 6950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2591", "category_id": "66", "name": "세븐일레븐 마카다미아 너트 쿠키 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:33.954897", "deleted_at": null,
    images: [{"product_image_id": "2575", "url": "https://ik.imagekit.io/oishidam/products/8c8fb190-f9a4-4475-af7a-c76c0b371a6b_mRz-SJWCM.webp", "alt_text": "세븐일레븐 마카다미아 너트 쿠키 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2577", "sku_code": "NPPIP-DEMO-177329835636", "variant_name": "기본", "option_values": {}, "price": 4400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2592", "category_id": "66", "name": "세븐일레븐 부드러운 누레센베이 간장맛 4개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:34.51873", "deleted_at": null,
    images: [{"product_image_id": "2576", "url": "https://ik.imagekit.io/oishidam/products/a46e63df-059c-4e13-bcd1-e55a637b7f54_mC_nXEKWL.webp", "alt_text": "세븐일레븐 부드러운 누레센베이 간장맛 4개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2578", "sku_code": "NPPIP-DEMO-177329835635", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2593", "category_id": "66", "name": "세븐일레븐 한 입 사이즈 구운 캬라멜맛 쌀과자 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:34.581201", "deleted_at": null,
    images: [{"product_image_id": "2577", "url": "https://ik.imagekit.io/oishidam/products/844af6b6-99e7-494a-93c7-f7e369317716_9In15oBx9.webp", "alt_text": "세븐일레븐 한 입 사이즈 구운 캬라멜맛 쌀과자 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2579", "sku_code": "NPPIP-DEMO-177329835634", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2594", "category_id": "66", "name": "세븐일레븐 여섯가지 종류의 오카키 센베이 아소토 125g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:34.781053", "deleted_at": null,
    images: [{"product_image_id": "2578", "url": "https://ik.imagekit.io/oishidam/products/bb3a5262-c6eb-4cb9-bde4-7810c9b50dfd_SBGQRlzLL.webp", "alt_text": "세븐일레븐 여섯가지 종류의 오카키 센베이 아소토 125g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2580", "sku_code": "NPPIP-DEMO-177329835533", "variant_name": "기본", "option_values": {}, "price": 6300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2595", "category_id": "66", "name": "세븐일레븐 겐코츠 한 입 사이즈 소금맛 센베이 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:35.732239", "deleted_at": null,
    images: [{"product_image_id": "2579", "url": "https://ik.imagekit.io/oishidam/products/67f14827-3b3f-4739-8d64-62d792c729d9_lsyJ7nuOM.webp", "alt_text": "세븐일레븐 겐코츠 한 입 사이즈 소금맛 센베이 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2581", "sku_code": "NPPIP-DEMO-177329835431", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2596", "category_id": "66", "name": "세븐일레븐 간장맛 센베이 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:36.369199", "deleted_at": null,
    images: [{"product_image_id": "2580", "url": "https://ik.imagekit.io/oishidam/products/e898f2ae-5201-4978-ab2b-404cae63be6d_kPD00YEDt.webp", "alt_text": "세븐일레븐 간장맛 센베이 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2582", "sku_code": "NPPIP-DEMO-177329835430", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2597", "category_id": "66", "name": "세븐일레븐 모찌무기 오코게센 찰보리 센베이 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:36.540977", "deleted_at": null,
    images: [{"product_image_id": "2582", "url": "https://ik.imagekit.io/oishidam/products/b2ab6116-8027-4cdc-9bb1-76beee3ffdf0_vduaftkDG.webp", "alt_text": "세븐일레븐 모찌무기 오코게센 찰보리 센베이 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2583", "sku_code": "NPPIP-DEMO-177329835429", "variant_name": "기본", "option_values": {}, "price": 3050, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2598", "category_id": "66", "name": "세븐일레븐 아게모찌 찹쌀과자 간장맛 센베이 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:36.463468", "deleted_at": null,
    images: [{"product_image_id": "2581", "url": "https://ik.imagekit.io/oishidam/products/1a708a96-9e67-448e-b703-ce7a4477fa8e_PBN4KKrCO.webp", "alt_text": "세븐일레븐 아게모찌 찹쌀과자 간장맛 센베이 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2584", "sku_code": "NPPIP-DEMO-177329835328", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2599", "category_id": "66", "name": "세븐일레븐 바삭하게 구운 김맛 센베이 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:37.4927", "deleted_at": null,
    images: [{"product_image_id": "2583", "url": "https://ik.imagekit.io/oishidam/products/d8df273a-9a60-4550-a50e-e5e2ee103962_MRUn4GIAK.webp", "alt_text": "세븐일레븐 바삭하게 구운 김맛 센베이 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2585", "sku_code": "NPPIP-DEMO-177329835223", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2600", "category_id": "66", "name": "세븐일레븐 바삭하게 구운 소금맛 센베이 59g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:38.02304", "deleted_at": null,
    images: [{"product_image_id": "2584", "url": "https://ik.imagekit.io/oishidam/products/b6b72f54-8cf7-435f-8659-980c925e709b_hTriQxXsG.webp", "alt_text": "세븐일레븐 바삭하게 구운 소금맛 센베이 59g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2586", "sku_code": "NPPIP-DEMO-177329835122", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2601", "category_id": "66", "name": "세븐일레븐 해물다시 소금 센베이 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:38.149547", "deleted_at": null,
    images: [{"product_image_id": "2585", "url": "https://ik.imagekit.io/oishidam/products/5528c631-ab9b-4ffa-a6e6-08ce13fede60_8yScojsOmu.webp", "alt_text": "세븐일레븐 해물다시 소금 센베이 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2587", "sku_code": "NPPIP-DEMO-177329835121", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2602", "category_id": "66", "name": "세븐일레븐 한 입 사이즈 검은깨 센베이 66g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:38.303007", "deleted_at": null,
    images: [{"product_image_id": "2586", "url": "https://ik.imagekit.io/oishidam/products/cdfbcfee-7d58-493b-a8cb-0ef4d945f234_ScabpdRyh.webp", "alt_text": "세븐일레븐 한 입 사이즈 검은깨 센베이 66g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2588", "sku_code": "NPPIP-DEMO-177329835020", "variant_name": "기본", "option_values": {}, "price": 3450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2603", "category_id": "66", "name": "세븐일레븐 아게모찌 찹쌀과자 소금맛 센베이 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:39.205507", "deleted_at": null,
    images: [{"product_image_id": "2587", "url": "https://ik.imagekit.io/oishidam/products/eeeffbfe-9681-4760-a344-4f2eface81f2_Ldev7fjy1.webp", "alt_text": "세븐일레븐 아게모찌 찹쌀과자 소금맛 센베이 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2589", "sku_code": "NPPIP-DEMO-177329835019", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2604", "category_id": "66", "name": "세븐일레븐 오코메칩스 새우맛 쌀과자 29g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:39.721001", "deleted_at": null,
    images: [{"product_image_id": "2588", "url": "https://ik.imagekit.io/oishidam/products/13f1384a-33b5-4754-81c5-043ad9ac71cf_ZfkFZJaQ2.webp", "alt_text": "세븐일레븐 오코메칩스 새우맛 쌀과자 29g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2590", "sku_code": "NPPIP-DEMO-177329835017", "variant_name": "기본", "option_values": {}, "price": 2950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2605", "category_id": "66", "name": "세븐일레븐 한 입 사이즈 가부키아게 센베이 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:39.877046", "deleted_at": null,
    images: [{"product_image_id": "2589", "url": "https://ik.imagekit.io/oishidam/products/3b1c3a64-684e-4470-b5f4-68b3369d63d2_w-AXO2_6h.webp", "alt_text": "세븐일레븐 한 입 사이즈 가부키아게 센베이 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2591", "sku_code": "NPPIP-DEMO-177329834915", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2606", "category_id": "66", "name": "세븐일레븐 포테이토칩스 코이포테 두껍게 썬 진한 소금버터맛 감자칩 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:40.21831", "deleted_at": null,
    images: [{"product_image_id": "2590", "url": "https://ik.imagekit.io/oishidam/products/be0a999c-a90e-4d2e-8c93-9437b898afca_sFOECXeMuB.webp", "alt_text": "세븐일레븐 포테이토칩스 코이포테 두껍게 썬 진한 소금버터맛 감자칩 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2592", "sku_code": "NPPIP-DEMO-177329834814", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2607", "category_id": "66", "name": "세븐일레븐 포테이토칩스 두껍게 썬 진한 사워크림 어니언맛 감자칩 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:41.160299", "deleted_at": null,
    images: [{"product_image_id": "2591", "url": "https://ik.imagekit.io/oishidam/products/5e16ce80-7f4d-4fe6-8a0c-9dde39150dc5_gcQlQQ41Y.webp", "alt_text": "세븐일레븐 포테이토칩스 두껍게 썬 진한 사워크림 어니언맛 감자칩 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2593", "sku_code": "NPPIP-DEMO-177329834813", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2608", "category_id": "66", "name": "세븐일레븐 포테이토칩스 두껍게 썬 프리미엄 김소금맛 감자칩 대용량 150g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:41.667602", "deleted_at": null,
    images: [{"product_image_id": "2592", "url": "https://ik.imagekit.io/oishidam/products/5a9e212b-e4c0-448a-8830-631e2088f048_2R6Rc3r-J.webp", "alt_text": "세븐일레븐 포테이토칩스 두껍게 썬 프리미엄 김소금맛 감자칩 대용량 150g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2594", "sku_code": "NPPIP-DEMO-17732983469", "variant_name": "기본", "option_values": {}, "price": 5050, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2609", "category_id": "66", "name": "세븐일레븐 포테이토칩스 카타아게 사워크림 어니언맛 감자칩 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:41.75557", "deleted_at": null,
    images: [{"product_image_id": "2593", "url": "https://ik.imagekit.io/oishidam/products/bab0a72d-258f-431d-84bf-d5ad5be7545a_fNpE9Nzjf.webp", "alt_text": "세븐일레븐 포테이토칩스 카타아게 사워크림 어니언맛 감자칩 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2595", "sku_code": "NPPIP-DEMO-177329834610", "variant_name": "기본", "option_values": {}, "price": 3250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2610", "category_id": "66", "name": "세븐일레븐 포테이토칩스 진한 콘소메맛 감자칩 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:42.098694", "deleted_at": null,
    images: [{"product_image_id": "2594", "url": "https://ik.imagekit.io/oishidam/products/eea300dc-6911-4b32-8d0a-8d575976f20f_VyNpvcSsgN.webp", "alt_text": "세븐일레븐 포테이토칩스 진한 콘소메맛 감자칩 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2596", "sku_code": "NPPIP-DEMO-17732983457", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2611", "category_id": "66", "name": "세븐일레븐 기슈 매실식초 미역 줄기 간식 32g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:43.090636", "deleted_at": null,
    images: [{"product_image_id": "2595", "url": "https://ik.imagekit.io/oishidam/products/ecfe6fbf-30c1-4a46-9b58-105d6ea318f7_kvNS_ePhN.webp", "alt_text": "세븐일레븐 기슈 매실식초 미역 줄기 간식 32g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2597", "sku_code": "NPPIP-DEMO-17732983456", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2612", "category_id": "84", "name": "코메다 오구라 팥 앙금 스프레드 팥잼 300g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:43.66413", "deleted_at": null,
    images: [{"product_image_id": "2596", "url": "https://ik.imagekit.io/oishidam/products/06b1f018-fbed-4625-9ed3-d9d06e5e5188_jwjzclj6N.webp", "alt_text": "코메다 오구라 팥 앙금 스프레드 팥잼 300g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2598", "sku_code": "NPPIP-DEMO-1773286929", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2613", "category_id": "89", "name": "퓨아레 딸기 티라미수 아몬드 초콜릿 대용량 405g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:43.774055", "deleted_at": null,
    images: [{"product_image_id": "2597", "url": "https://ik.imagekit.io/oishidam/products/a5441c94-3e83-46f7-8ada-890bf558b171_l-wUgPNcX.webp", "alt_text": "퓨아레 딸기 티라미수 아몬드 초콜릿 대용량 405g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2599", "sku_code": "NPPIP-DEMO-17727762335", "variant_name": "기본", "option_values": {}, "price": 27000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2614", "category_id": "83", "name": "카타오카 츠지리 일본 우지 말차 밀크 파우더 150g 진한맛", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2598", "url": "https://ik.imagekit.io/oishidam/products/0f051fb5-6cd5-4b2f-98ec-31d611a07e4b_3NjtCb9tbE.webp", "alt_text": "카타오카 츠지리 일본 우지 말차 밀크 파우더 150g 진한맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2600", "sku_code": "NPPIP-DEMO-1772075153", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2615", "category_id": "83", "name": "카타오카 츠지리 일본 우지 말차 밀크 파우더 170g 부드러운맛", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2599", "url": "https://ik.imagekit.io/oishidam/products/dbe9e84e-a68a-47f1-85c7-26801be02117_c-LJCNw9E.webp", "alt_text": "카타오카 츠지리 일본 우지 말차 밀크 파우더 170g 부드러운맛", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2601", "sku_code": "NPPIP-DEMO-1772075006", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2616", "category_id": "83", "name": "카타오카 츠지리 우유로 만드는 우지 말차 라떼 파우더 80g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2600", "url": "https://ik.imagekit.io/oishidam/products/c63db26b-7091-4457-8f16-91ec9ecbd182_kICXz5C2p.webp", "alt_text": "카타오카 츠지리 우유로 만드는 우지 말차 라떼 파우더 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2602", "sku_code": "NPPIP-DEMO-1772074820", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2617", "category_id": "83", "name": "카타오카 츠지리 우유로 만드는 우지 말차 차이 라떼 파우더 80g", "description": "현재 원본 상품을 확인할 수 없어 이름을 기준으로 분류한 개발용 더미 상품입니다.", "sale_status": "DRAFT", "published_at": null, "deleted_at": null,
    images: [{"product_image_id": "2601", "url": "https://ik.imagekit.io/oishidam/products/5398ef47-97af-43ca-82f1-60deed5a2eac_EZHlWD-1X.webp", "alt_text": "카타오카 츠지리 우유로 만드는 우지 말차 차이 라떼 파우더 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2603", "sku_code": "NPPIP-DEMO-1772074748", "variant_name": "기본", "option_values": {}, "price": 0, "stock_quantity": 0, "is_active": true}],
  },
  {
    "product_id": "2618", "category_id": "89", "name": "롬앤 일본 한정 한올 픽스 마스카라 L04 플럼 브라운", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:45.717001", "deleted_at": null,
    images: [{"product_image_id": "2602", "url": "https://ik.imagekit.io/oishidam/products/0d987393-e094-4305-918e-8de41939734d_60p2FEjJup.webp", "alt_text": "롬앤 일본 한정 한올 픽스 마스카라 L04 플럼 브라운", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2604", "sku_code": "NPPIP-DEMO-1772071206", "variant_name": "기본", "option_values": {}, "price": 16300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2619", "category_id": "65", "name": "로손 앤드바이롬앤 컴포트 루스 파우더 CL01 클리어", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:46.679135", "deleted_at": null,
    images: [{"product_image_id": "2603", "url": "https://ik.imagekit.io/oishidam/products/3af41b61-8570-46da-8d6c-0d6b0a90be7e_TTuj5G2J-.webp", "alt_text": "로손 앤드바이롬앤 컴포트 루스 파우더 CL01 클리어", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2605", "sku_code": "NPPIP-DEMO-1772067886", "variant_name": "기본", "option_values": {}, "price": 11900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2620", "category_id": "65", "name": "로손 앤드바이롬앤 멜로우 아이팔레트 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:47.167324", "deleted_at": null,
    images: [{"product_image_id": "2605", "url": "https://ik.imagekit.io/oishidam/products/72cee418-12ec-4718-a85f-7190c4fac3ae_9l63QFvtw.webp", "alt_text": "로손 앤드바이롬앤 멜로우 아이팔레트 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2606", "sku_code": "NPPIP-DEMO-1772064295", "variant_name": "기본", "option_values": {}, "price": 15500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2621", "category_id": "65", "name": "로손 앤드바이롬앤 글래시 밀키 톤업 BE01 밀키 아이보리", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:47.073001", "deleted_at": null,
    images: [{"product_image_id": "2604", "url": "https://ik.imagekit.io/oishidam/products/21360483-b49e-4428-b420-adb32d05dbc0_fFjOMbt9H.webp", "alt_text": "로손 앤드바이롬앤 글래시 밀키 톤업 BE01 밀키 아이보리", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2607", "sku_code": "NPPIP-DEMO-1771998916", "variant_name": "기본", "option_values": {}, "price": 11900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2622", "category_id": "70", "name": "히카리 미소시루 된장국 부드러운 감칠맛 대파향", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:47.554849", "deleted_at": null,
    images: [{"product_image_id": "2606", "url": "https://ik.imagekit.io/oishidam/products/f72c392c-83f5-477b-b322-6f835529fff6_ijEhxls4W.webp", "alt_text": "히카리 미소시루 된장국 부드러운 감칠맛 대파향", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2608", "sku_code": "NPPIP-DEMO-1771910776", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2623", "category_id": "79", "name": "아이리스 산리오 생 키리모찌 구워먹는 떡 250g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:48.379416", "deleted_at": null,
    images: [{"product_image_id": "2607", "url": "https://ik.imagekit.io/oishidam/products/bb2794e8-5639-40f1-a74e-b30d1643fdf1_6EaiJfsrk.webp", "alt_text": "아이리스 산리오 생 키리모찌 구워먹는 떡 250g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2609", "sku_code": "NPPIP-DEMO-1771825040", "variant_name": "기본", "option_values": {}, "price": 12000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2624", "category_id": "89", "name": "후지야 산리오 딸기 파티 초콜릿 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:48.908509", "deleted_at": null,
    images: [{"product_image_id": "2608", "url": "https://ik.imagekit.io/oishidam/products/8f63a87d-1974-48db-bcac-315a117203ed_3zhad8HP3.webp", "alt_text": "후지야 산리오 딸기 파티 초콜릿 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2610", "sku_code": "NPPIP-DEMO-1771484463", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2625", "category_id": "67", "name": "패밀리마트 바삭한 바나나칩 초콜릿 46g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:49.022307", "deleted_at": null,
    images: [{"product_image_id": "2609", "url": "https://ik.imagekit.io/oishidam/products/6dbd133f-e0ca-47b0-8e69-07318acd2101_rEZfcSBPq.webp", "alt_text": "패밀리마트 바삭한 바나나칩 초콜릿 46g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2611", "sku_code": "NPPIP-DEMO-1770789034", "variant_name": "기본", "option_values": {}, "price": 4400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2626", "category_id": "67", "name": "패밀리마트 촉촉한 식감의 가토쇼콜라 초콜릿 57g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:49.454989", "deleted_at": null,
    images: [{"product_image_id": "2610", "url": "https://ik.imagekit.io/oishidam/products/e2a9d972-734a-41eb-bbdc-2e910adc5af4_gZm4ZOXq9.webp", "alt_text": "패밀리마트 촉촉한 식감의 가토쇼콜라 초콜릿 57g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2612", "sku_code": "NPPIP-DEMO-1770781775", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2627", "category_id": "67", "name": "패밀리마트 프리미엄 리치 초코 프레첼 49g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:50.047139", "deleted_at": null,
    images: [{"product_image_id": "2611", "url": "https://ik.imagekit.io/oishidam/products/f45c14fd-accf-442c-9f48-8b079cba02b5_U14tiysKw.webp", "alt_text": "패밀리마트 프리미엄 리치 초코 프레첼 49g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2613", "sku_code": "NPPIP-DEMO-1770779955", "variant_name": "기본", "option_values": {}, "price": 5900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2628", "category_id": "82", "name": "ucc 볶은 콩 스페셜 원두 블렌드 230g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:50.823896", "deleted_at": null,
    images: [{"product_image_id": "2612", "url": "https://ik.imagekit.io/oishidam/products/c4b081c2-ab05-4f76-8981-39a65b2939d5_bXqgfdGXk.webp", "alt_text": "ucc 볶은 콩 스페셜 원두 블렌드 230g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2614", "sku_code": "NPPIP-DEMO-1770777637", "variant_name": "기본", "option_values": {}, "price": 16000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2629", "category_id": "67", "name": "패밀리마트 드라이 반건조 말린 파인애플 38g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:50.868889", "deleted_at": null,
    images: [{"product_image_id": "2613", "url": "https://ik.imagekit.io/oishidam/products/b3202b44-eaf2-4271-860e-6a2567e24099_BWJfP89mx.webp", "alt_text": "패밀리마트 드라이 반건조 말린 파인애플 38g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2615", "sku_code": "NPPIP-DEMO-1770776999", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2630", "category_id": "67", "name": "패밀리마트 드라이 건망고 반건조 말린 망고 36g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:51.444416", "deleted_at": null,
    images: [{"product_image_id": "2614", "url": "https://ik.imagekit.io/oishidam/products/324f79b7-a83e-4f6a-b23d-4386025da0e3_Yi11L8GzE.webp", "alt_text": "패밀리마트 드라이 건망고 반건조 말린 망고 36g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2616", "sku_code": "NPPIP-DEMO-1770776746", "variant_name": "기본", "option_values": {}, "price": 5400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2631", "category_id": "67", "name": "패밀리마트 5가지 넛후르츠 말린 과일과 견과류 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:51.937168", "deleted_at": null,
    images: [{"product_image_id": "2615", "url": "https://ik.imagekit.io/oishidam/products/5c0622a2-1d13-4303-9b63-cc066174ab1e_oWGcLkmwh.webp", "alt_text": "패밀리마트 5가지 넛후르츠 말린 과일과 견과류 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2617", "sku_code": "NPPIP-DEMO-1770776401", "variant_name": "기본", "option_values": {}, "price": 4850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2632", "category_id": "67", "name": "패밀리마트 중독되는 씨를 빼서 말린 우메보시 매실 11g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:52.812575", "deleted_at": null,
    images: [{"product_image_id": "2617", "url": "https://ik.imagekit.io/oishidam/products/512168dd-8ca8-4286-9f55-439820256ba6_YN91530cS.webp", "alt_text": "패밀리마트 중독되는 씨를 빼서 말린 우메보시 매실 11g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2618", "sku_code": "NPPIP-DEMO-1770280378", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2633", "category_id": "67", "name": "패밀리마트 4가지 치즈 치카마 어육 소시지 5개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:52.79733", "deleted_at": null,
    images: [{"product_image_id": "2616", "url": "https://ik.imagekit.io/oishidam/products/f575c39b-eda9-4d87-917d-13a0fcf1fe81_fKGczz98G.webp", "alt_text": "패밀리마트 4가지 치즈 치카마 어육 소시지 5개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2619", "sku_code": "NPPIP-DEMO-1770279665", "variant_name": "기본", "option_values": {}, "price": 7100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2634", "category_id": "67", "name": "패밀리마트 씹을수록 감칠맛 나는 오징어 다리 10g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:53.450979", "deleted_at": null,
    images: [{"product_image_id": "2618", "url": "https://ik.imagekit.io/oishidam/products/b1942c4f-e042-40ea-9fec-43eca06a3a02_eugAmTWyfS.webp", "alt_text": "패밀리마트 씹을수록 감칠맛 나는 오징어 다리 10g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2620", "sku_code": "NPPIP-DEMO-1770279482", "variant_name": "기본", "option_values": {}, "price": 4650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2635", "category_id": "67", "name": "패밀리마트 3가지 메이플 카라멜리제 믹스넛 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:53.88699", "deleted_at": null,
    images: [{"product_image_id": "2619", "url": "https://ik.imagekit.io/oishidam/products/0e8cfc31-8172-4987-a4e2-cf7a967c16ff_pxUzJpq_X.webp", "alt_text": "패밀리마트 3가지 메이플 카라멜리제 믹스넛 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2621", "sku_code": "NPPIP-DEMO-1770278924", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2636", "category_id": "67", "name": "패밀리마트 베이비스타 동그란 라면 과자 치킨맛 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:54.72813", "deleted_at": null,
    images: [{"product_image_id": "2620", "url": "https://ik.imagekit.io/oishidam/products/22206ff7-5d9f-4d8b-9c2f-49a5992a5639_U54tdRq9u.webp", "alt_text": "패밀리마트 베이비스타 동그란 라면 과자 치킨맛 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2622", "sku_code": "NPPIP-DEMO-1770260967", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2637", "category_id": "67", "name": "패밀리마트 기슈 난코우메 매실 식초 미역 줄기 26g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:54.7877", "deleted_at": null,
    images: [{"product_image_id": "2621", "url": "https://ik.imagekit.io/oishidam/products/55461fbc-e09f-481b-8683-01145ce22cce_0dIEdhfM-.webp", "alt_text": "패밀리마트 기슈 난코우메 매실 식초 미역 줄기 26g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2623", "sku_code": "NPPIP-DEMO-1770278522", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2638", "category_id": "67", "name": "패밀리마트 비노 재료의 맛 그대로 완두콩 스낵 과자 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:55.39673", "deleted_at": null,
    images: [{"product_image_id": "2622", "url": "https://ik.imagekit.io/oishidam/products/67412613-d2bd-4d67-8f83-c148a833e5e0_298deemGs.webp", "alt_text": "패밀리마트 비노 재료의 맛 그대로 완두콩 스낵 과자 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2624", "sku_code": "NPPIP-DEMO-1770260535", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2639", "category_id": "67", "name": "패밀리마트 한 입 사이즈 노아루 미니 쿠키앤크림 68g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:55.768478", "deleted_at": null,
    images: [{"product_image_id": "2623", "url": "https://ik.imagekit.io/oishidam/products/03bda222-fa2f-4e4d-b553-6b2c7cc375d2_Sy4exaYxN.webp", "alt_text": "패밀리마트 한 입 사이즈 노아루 미니 쿠키앤크림 68g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2625", "sku_code": "NPPIP-DEMO-1770258423", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2640", "category_id": "67", "name": "패밀리마트 중독되는 라유 에비 센베이 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:56.700137", "deleted_at": null,
    images: [{"product_image_id": "2624", "url": "https://ik.imagekit.io/oishidam/products/0f939c40-ea3c-4d72-b24e-a7b7496e0fba_VhBMudczRE.webp", "alt_text": "패밀리마트 중독되는 라유 에비 센베이 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2626", "sku_code": "NPPIP-DEMO-1770256907", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2641", "category_id": "67", "name": "패밀리마트 한 입 사이즈 진한 가부키아게 81g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:56.904535", "deleted_at": null,
    images: [{"product_image_id": "2625", "url": "https://ik.imagekit.io/oishidam/products/aed9e123-e8c5-4346-ae6f-496e862ed462_MMFhUxKyg.webp", "alt_text": "패밀리마트 한 입 사이즈 진한 가부키아게 81g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2627", "sku_code": "NPPIP-DEMO-1770256161", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2642", "category_id": "67", "name": "패밀리마트 껍질째 먹을 수 있는 튀긴 소라마메 콩스낵 45g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:57.30717", "deleted_at": null,
    images: [{"product_image_id": "2626", "url": "https://ik.imagekit.io/oishidam/products/1698668a-b7cd-4ce0-8e43-b98353c9e703_NEB_gUfCI.webp", "alt_text": "패밀리마트 껍질째 먹을 수 있는 튀긴 소라마메 콩스낵 45g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2628", "sku_code": "NPPIP-DEMO-1770255489", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2643", "category_id": "67", "name": "패밀리마트 소금 아라레 센베이 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:57.725611", "deleted_at": null,
    images: [{"product_image_id": "2627", "url": "https://ik.imagekit.io/oishidam/products/7395cd37-a396-4702-88d7-dd8bfc7ba46f_SWU0yuIcU.webp", "alt_text": "패밀리마트 소금 아라레 센베이 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2629", "sku_code": "NPPIP-DEMO-1770255186", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2644", "category_id": "67", "name": "패밀리마트 하루치 철분 올레이즌 쿠키 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:58.613865", "deleted_at": null,
    images: [{"product_image_id": "2628", "url": "https://ik.imagekit.io/oishidam/products/5b27ea62-211a-4afb-be1e-4829a610f5cc_RKfjYrZ5s.webp", "alt_text": "패밀리마트 하루치 철분 올레이즌 쿠키 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2630", "sku_code": "NPPIP-DEMO-1770255087", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2645", "category_id": "67", "name": "패밀리마트 촉촉한 밀크 초코 쿠키 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:58.738105", "deleted_at": null,
    images: [{"product_image_id": "2629", "url": "https://ik.imagekit.io/oishidam/products/4a722275-05ee-4351-bc55-a6c307860dc7_DukyonhxF.webp", "alt_text": "패밀리마트 촉촉한 밀크 초코 쿠키 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2631", "sku_code": "NPPIP-DEMO-1770254810", "variant_name": "기본", "option_values": {}, "price": 4400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2646", "category_id": "67", "name": "패밀리마트 포테토칩 사워크림 양파맛 감자칩 대용량 126g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:59.209682", "deleted_at": null,
    images: [{"product_image_id": "2630", "url": "https://ik.imagekit.io/oishidam/products/ac47a3ae-1ecd-478a-80cb-9138504b4793_Vba4o62wO.webp", "alt_text": "패밀리마트 포테토칩 사워크림 양파맛 감자칩 대용량 126g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2632", "sku_code": "NPPIP-DEMO-1770254693", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2647", "category_id": "67", "name": "패밀리마트 스콘 중독되는 바비큐맛 과자 67g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:20:59.607908", "deleted_at": null,
    images: [{"product_image_id": "2631", "url": "https://ik.imagekit.io/oishidam/products/855cda66-e00f-4d9d-9d43-e0d79cd31242_33w4obJKQ.webp", "alt_text": "패밀리마트 스콘 중독되는 바비큐맛 과자 67g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2633", "sku_code": "NPPIP-DEMO-1770254332", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2648", "category_id": "67", "name": "패밀리마트 3가지 맛의 가부키아게 아소보 버라이어티 108g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:00.512727", "deleted_at": null,
    images: [{"product_image_id": "2632", "url": "https://ik.imagekit.io/oishidam/products/b9978d9d-54b4-424e-8888-d66048a27522_httjODu1v.webp", "alt_text": "패밀리마트 3가지 맛의 가부키아게 아소보 버라이어티 108g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2634", "sku_code": "NPPIP-DEMO-1770253940", "variant_name": "기본", "option_values": {}, "price": 5900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2649", "category_id": "67", "name": "패밀리마트 바삭하고 고소한 미니 루만도 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:00.588638", "deleted_at": null,
    images: [{"product_image_id": "2633", "url": "https://ik.imagekit.io/oishidam/products/85bbdeac-42da-4488-9070-3ec5827471db_GvLdvlIly.webp", "alt_text": "패밀리마트 바삭하고 고소한 미니 루만도 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2635", "sku_code": "NPPIP-DEMO-1770253817", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2650", "category_id": "67", "name": "패밀리마트 간장 아라레 센베이 52g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:01.223545", "deleted_at": null,
    images: [{"product_image_id": "2634", "url": "https://ik.imagekit.io/oishidam/products/4fe936a0-ef93-4f89-8ec6-6fe4e2e88725_U0Pd1qZ65.webp", "alt_text": "패밀리마트 간장 아라레 센베이 52g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2636", "sku_code": "NPPIP-DEMO-1770253615", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2651", "category_id": "67", "name": "패밀리마트 한 입 사이즈 진한 매실 간장 센베이 33g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:01.599407", "deleted_at": null,
    images: [{"product_image_id": "2635", "url": "https://ik.imagekit.io/oishidam/products/2fe443dd-e338-49b7-9a01-f628ef48df0a_G23yoVtxH.webp", "alt_text": "패밀리마트 한 입 사이즈 진한 매실 간장 센베이 33g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2637", "sku_code": "NPPIP-DEMO-1770253441", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2652", "category_id": "67", "name": "패밀리마트 크림 샌드 크래커 시칠리아 레몬맛 48g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:02.518449", "deleted_at": null,
    images: [{"product_image_id": "2636", "url": "https://ik.imagekit.io/oishidam/products/d685b9e3-8ffb-421c-9264-3957dd32e8f3_YQs4LogKr.webp", "alt_text": "패밀리마트 크림 샌드 크래커 시칠리아 레몬맛 48g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2638", "sku_code": "NPPIP-DEMO-1770253269", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2653", "category_id": "67", "name": "패밀리마트 포테토칩 시큼한 우메보시맛 감자칩 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:02.523659", "deleted_at": null,
    images: [{"product_image_id": "2637", "url": "https://ik.imagekit.io/oishidam/products/7d467eab-495e-47cc-8502-5a50c7e11585_zQxpWzUjc.webp", "alt_text": "패밀리마트 포테토칩 시큼한 우메보시맛 감자칩 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2639", "sku_code": "NPPIP-DEMO-1770253190", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2654", "category_id": "67", "name": "패밀리마트 부드러운 초코 비스킷 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:03.184461", "deleted_at": null,
    images: [{"product_image_id": "2638", "url": "https://ik.imagekit.io/oishidam/products/47f928c7-a954-4fe7-b283-82d7aaf33f27_t9N-kQT3w.webp", "alt_text": "패밀리마트 부드러운 초코 비스킷 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2640", "sku_code": "NPPIP-DEMO-1770252792", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2655", "category_id": "67", "name": "패밀리마트 바카우케 아오노리 파래향 센베이 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:03.558657", "deleted_at": null,
    images: [{"product_image_id": "2639", "url": "https://ik.imagekit.io/oishidam/products/86442b8c-aaf8-4dee-a079-f8bc229b0d3f_9en-zOZPO.webp", "alt_text": "패밀리마트 바카우케 아오노리 파래향 센베이 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2641", "sku_code": "NPPIP-DEMO-1770252745", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2656", "category_id": "67", "name": "패밀리마트 포테토칩 진한 김소금맛 감자칩 대용량 125g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:04.56814", "deleted_at": null,
    images: [{"product_image_id": "2641", "url": "https://ik.imagekit.io/oishidam/products/5b62cbd4-8b85-45a5-86b9-3ed97ea32f20_4AhiT2uT0.webp", "alt_text": "패밀리마트 포테토칩 진한 김소금맛 감자칩 대용량 125g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2642", "sku_code": "NPPIP-DEMO-1770252582", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2657", "category_id": "67", "name": "패밀리마트 바삭한 캬라멜콘 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:04.521407", "deleted_at": null,
    images: [{"product_image_id": "2640", "url": "https://ik.imagekit.io/oishidam/products/5b3b4d40-0b5c-47a4-9eb2-9f2983f4a0c9_cWAgHarth.webp", "alt_text": "패밀리마트 바삭한 캬라멜콘 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2643", "sku_code": "NPPIP-DEMO-1770252691", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2658", "category_id": "67", "name": "패밀리마트 포테토칩 카타아게 소금맛 65g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:05.022589", "deleted_at": null,
    images: [{"product_image_id": "2642", "url": "https://ik.imagekit.io/oishidam/products/b4b16868-d995-4ac4-b9bb-840bda5c575a_XAKODNuuS.webp", "alt_text": "패밀리마트 포테토칩 카타아게 소금맛 65g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2644", "sku_code": "NPPIP-DEMO-1770252527", "variant_name": "기본", "option_values": {}, "price": 4050, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2659", "category_id": "67", "name": "패밀리마트 포테토칩 고소한 콘소메맛 감자칩 63g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:05.480473", "deleted_at": null,
    images: [{"product_image_id": "2643", "url": "https://ik.imagekit.io/oishidam/products/b20d4747-5195-4ea5-95ce-85ce97394b11_3RcUpkmLZ.webp", "alt_text": "패밀리마트 포테토칩 고소한 콘소메맛 감자칩 63g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2645", "sku_code": "NPPIP-DEMO-1770252412", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2660", "category_id": "67", "name": "패밀리마트 부드럽고 새콤달콤한 씨없는 말린 꿀 매실 25g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:06.221953", "deleted_at": null,
    images: [{"product_image_id": "2644", "url": "https://ik.imagekit.io/oishidam/products/f2463db8-69bf-458d-8011-47b221816914_y_3utsV0E.webp", "alt_text": "패밀리마트 부드럽고 새콤달콤한 씨없는 말린 꿀 매실 25g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2646", "sku_code": "NPPIP-DEMO-1770252338", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2661", "category_id": "67", "name": "패밀리마트 바삭바삭 6가지 치즈 콘스낵 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:06.42859", "deleted_at": null,
    images: [{"product_image_id": "2645", "url": "https://ik.imagekit.io/oishidam/products/ec15745b-ba77-4d45-b1ee-677cf6f0d704_vBx7hq-1q.webp", "alt_text": "패밀리마트 바삭바삭 6가지 치즈 콘스낵 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2647", "sku_code": "NPPIP-DEMO-1770252267", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2662", "category_id": "67", "name": "패밀리마트 오타후쿠 진한 소스 튀김 센베이 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:06.923916", "deleted_at": null,
    images: [{"product_image_id": "2646", "url": "https://ik.imagekit.io/oishidam/products/e33414a9-c2c3-476a-8dd3-9e64e56e5b36_MDQHmViav.webp", "alt_text": "패밀리마트 오타후쿠 진한 소스 튀김 센베이 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2648", "sku_code": "NPPIP-DEMO-1770251729", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2663", "category_id": "67", "name": "패밀리마트 새우 소금 튀김 센베이 43g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:07.323971", "deleted_at": null,
    images: [{"product_image_id": "2647", "url": "https://ik.imagekit.io/oishidam/products/99f79b7e-386a-4455-827c-f6111fcba412_XKwa9Y_dR.webp", "alt_text": "패밀리마트 새우 소금 튀김 센베이 43g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2649", "sku_code": "NPPIP-DEMO-1770251484", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2664", "category_id": "67", "name": "패밀리마트 통가리콘 소금맛 일본 꼬깔콘 37g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:08.165077", "deleted_at": null,
    images: [{"product_image_id": "2648", "url": "https://ik.imagekit.io/oishidam/products/6da3a5f9-b7cd-49ee-a854-0bcd36d987c0_sd54U_t5k.webp", "alt_text": "패밀리마트 통가리콘 소금맛 일본 꼬깔콘 37g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2650", "sku_code": "NPPIP-DEMO-1770251337", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2665", "category_id": "67", "name": "패밀리마트 참깨가 들어간 고마 센베이 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:08.572567", "deleted_at": null,
    images: [{"product_image_id": "2649", "url": "https://ik.imagekit.io/oishidam/products/89fd0090-057e-4103-b2a8-c579498f1310_ei9xNOKES.webp", "alt_text": "패밀리마트 참깨가 들어간 고마 센베이 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2651", "sku_code": "NPPIP-DEMO-1770251316", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2666", "category_id": "67", "name": "패밀리마트 얇게 구운 간장 센베이 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:08.789061", "deleted_at": null,
    images: [{"product_image_id": "2650", "url": "https://ik.imagekit.io/oishidam/products/0adc2a0d-8171-48a3-88e3-0a95d8e10ae4_9-AkvW0fk.webp", "alt_text": "패밀리마트 얇게 구운 간장 센베이 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2652", "sku_code": "NPPIP-DEMO-1770251147", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2667", "category_id": "67", "name": "패밀리마트 네가지 진한 치즈맛 크래커 42g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:09.262345", "deleted_at": null,
    images: [{"product_image_id": "2651", "url": "https://ik.imagekit.io/oishidam/products/c6cbd29b-4050-421e-858f-f66afd39b141_HIfqZZe9x.webp", "alt_text": "패밀리마트 네가지 진한 치즈맛 크래커 42g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2653", "sku_code": "NPPIP-DEMO-1770251068", "variant_name": "기본", "option_values": {}, "price": 3850, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2668", "category_id": "67", "name": "패밀리마트 에아리아루 감칠맛 간장마요맛 63g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:10.077849", "deleted_at": null,
    images: [{"product_image_id": "2652", "url": "https://ik.imagekit.io/oishidam/products/0ce124cc-4273-4c17-a40c-c8d8127560be_fHG4QOHLs.webp", "alt_text": "패밀리마트 에아리아루 감칠맛 간장마요맛 63g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2654", "sku_code": "NPPIP-DEMO-1770250937", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2669", "category_id": "67", "name": "패밀리마트 7가지 믹스 센베이 안주 46g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:10.434952", "deleted_at": null,
    images: [{"product_image_id": "2653", "url": "https://ik.imagekit.io/oishidam/products/bef190a4-81a3-4ba0-998b-022fdc99d7ca_0USwc-O92F.webp", "alt_text": "패밀리마트 7가지 믹스 센베이 안주 46g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2655", "sku_code": "NPPIP-DEMO-1770250892", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2670", "category_id": "67", "name": "패밀리마트 입에서 녹는 시미초코콘 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:10.66679", "deleted_at": null,
    images: [{"product_image_id": "2654", "url": "https://ik.imagekit.io/oishidam/products/ff731362-70de-4b22-8d4a-6e3f6366e088_HHvQoiWua.webp", "alt_text": "패밀리마트 입에서 녹는 시미초코콘 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2656", "sku_code": "NPPIP-DEMO-1770250728", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2671", "category_id": "67", "name": "패밀리마트 포테토칩 튀기지않고 바삭하게 구운 소금맛 감자칩 62g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:11.399975", "deleted_at": null,
    images: [{"product_image_id": "2655", "url": "https://ik.imagekit.io/oishidam/products/462a73f0-3abb-4e51-8982-11b3c0bff7d6_TF7k81G61.webp", "alt_text": "패밀리마트 포테토칩 튀기지않고 바삭하게 구운 소금맛 감자칩 62g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2657", "sku_code": "NPPIP-DEMO-1770250641", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2672", "category_id": "67", "name": "패밀리마트 16가지 곡물 감칠맛나는 간장 센베이 44g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:12.083689", "deleted_at": null,
    images: [{"product_image_id": "2656", "url": "https://ik.imagekit.io/oishidam/products/c2e5bb20-5aae-4e73-bc8f-06070a700017_yDd_1DXaM.webp", "alt_text": "패밀리마트 16가지 곡물 감칠맛나는 간장 센베이 44g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2658", "sku_code": "NPPIP-DEMO-1770250337", "variant_name": "기본", "option_values": {}, "price": 3650, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2673", "category_id": "67", "name": "패밀리마트 두 번 구운 간장 센베이 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:12.50408", "deleted_at": null,
    images: [{"product_image_id": "2657", "url": "https://ik.imagekit.io/oishidam/products/fb553ade-427a-4bf1-9338-b5f1ea33a7ab_KA2IK0nr5.webp", "alt_text": "패밀리마트 두 번 구운 간장 센베이 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2659", "sku_code": "NPPIP-DEMO-1770194033", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2674", "category_id": "67", "name": "패밀리마트 바삭한 로스트 피스타치오 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:12.861486", "deleted_at": null,
    images: [{"product_image_id": "2658", "url": "https://ik.imagekit.io/oishidam/products/a1ac1e90-c258-4df4-bbc3-2c8050a0fb8d_oiX8tpAbn.webp", "alt_text": "패밀리마트 바삭한 로스트 피스타치오 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2660", "sku_code": "NPPIP-DEMO-1770193281", "variant_name": "기본", "option_values": {}, "price": 7100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2675", "category_id": "67", "name": "패밀리마트 한 입 크기 폭신한 동물모양 카스텔라 35g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:13.500342", "deleted_at": null,
    images: [{"product_image_id": "2659", "url": "https://ik.imagekit.io/oishidam/products/6631758a-1fcc-4ab5-85c2-a5ea19255966_KUqBDxThL.webp", "alt_text": "패밀리마트 한 입 크기 폭신한 동물모양 카스텔라 35g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2661", "sku_code": "NPPIP-DEMO-1770193100", "variant_name": "기본", "option_values": {}, "price": 3550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2676", "category_id": "67", "name": "패밀리마트 블루치즈 캐슈넛 크루통 안주 50g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:14.200328", "deleted_at": null,
    images: [{"product_image_id": "2660", "url": "https://ik.imagekit.io/oishidam/products/362d84a0-12e2-4a72-a7be-723cd0e9a6b7_KcYNvyG1r.webp", "alt_text": "패밀리마트 블루치즈 캐슈넛 크루통 안주 50g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2662", "sku_code": "NPPIP-DEMO-1770193066", "variant_name": "기본", "option_values": {}, "price": 7000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2677", "category_id": "67", "name": "패밀리마트 세토우치산 멸치 사용 아몬드 안주 24g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:14.701448", "deleted_at": null,
    images: [{"product_image_id": "2661", "url": "https://ik.imagekit.io/oishidam/products/775abd63-b56c-48f6-90dd-f6faa21cc09f_s4SiTHBtR.webp", "alt_text": "패밀리마트 세토우치산 멸치 사용 아몬드 안주 24g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2663", "sku_code": "NPPIP-DEMO-1770192898", "variant_name": "기본", "option_values": {}, "price": 4100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2678", "category_id": "67", "name": "패밀리마트 부드러운 소프트 진미채 30g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:14.827344", "deleted_at": null,
    images: [{"product_image_id": "2662", "url": "https://ik.imagekit.io/oishidam/products/befcddb4-6659-42a8-b680-9c13b16cac6c_fdFGvg3LR.webp", "alt_text": "패밀리마트 부드러운 소프트 진미채 30g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2664", "sku_code": "NPPIP-DEMO-1770192588", "variant_name": "기본", "option_values": {}, "price": 7100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2679", "category_id": "67", "name": "패밀리마트 두툼한 훈제 오징어 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:15.664168", "deleted_at": null,
    images: [{"product_image_id": "2663", "url": "https://ik.imagekit.io/oishidam/products/b78e4a7b-14be-4142-b95b-0deb7af115d6_-68SqvJKh.webp", "alt_text": "패밀리마트 두툼한 훈제 오징어 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2665", "sku_code": "NPPIP-DEMO-1770192385", "variant_name": "기본", "option_values": {}, "price": 7100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2680", "category_id": "67", "name": "패밀리마트 바삭한 플레인 비스킷 140g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:16.160622", "deleted_at": null,
    images: [{"product_image_id": "2664", "url": "https://ik.imagekit.io/oishidam/products/308805fa-f7e7-43e2-b6e7-b264bbdbfdc3_uU__uBs8x.webp", "alt_text": "패밀리마트 바삭한 플레인 비스킷 140g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2666", "sku_code": "NPPIP-DEMO-1770189606", "variant_name": "기본", "option_values": {}, "price": 3550, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2681", "category_id": "67", "name": "패밀리마트 포테토칩 두껍게 썬 콘소메맛 감자칩 대용량 128g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:16.797436", "deleted_at": null,
    images: [{"product_image_id": "2666", "url": "https://ik.imagekit.io/oishidam/products/a59476bb-f432-4433-bbfa-16885c09756d_Y7camLPVw.webp", "alt_text": "패밀리마트 포테토칩 두껍게 썬 콘소메맛 감자칩 대용량 128g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2667", "sku_code": "NPPIP-DEMO-1770189299", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2682", "category_id": "67", "name": "패밀리마트 포테토칩 두껍게 썬 소금맛 감자칩 대용량 135g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:16.748476", "deleted_at": null,
    images: [{"product_image_id": "2665", "url": "https://ik.imagekit.io/oishidam/products/3d6805b3-4a6b-4a7f-9550-3d6a28e78446_VUt3HXQps.webp", "alt_text": "패밀리마트 포테토칩 두껍게 썬 소금맛 감자칩 대용량 135g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2668", "sku_code": "NPPIP-DEMO-1770189096", "variant_name": "기본", "option_values": {}, "price": 5450, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2683", "category_id": "67", "name": "패밀리마트 새콤달콤 우메보시 시트 22g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:17.603278", "deleted_at": null,
    images: [{"product_image_id": "2667", "url": "https://ik.imagekit.io/oishidam/products/49dee286-a794-4f72-b071-432c2a9f9493_xlKdKqifQ.webp", "alt_text": "패밀리마트 새콤달콤 우메보시 시트 22g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2669", "sku_code": "NPPIP-DEMO-1770188131", "variant_name": "기본", "option_values": {}, "price": 4400, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2684", "category_id": "67", "name": "패밀리마트 한 입 크기 초코칩 쿠키 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:18.086022", "deleted_at": null,
    images: [{"product_image_id": "2668", "url": "https://ik.imagekit.io/oishidam/products/64371e4f-f516-4667-b1c7-70a76bf8659f_js7XUAsDW.webp", "alt_text": "패밀리마트 한 입 크기 초코칩 쿠키 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2670", "sku_code": "NPPIP-DEMO-1770188036", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2685", "category_id": "67", "name": "패밀리마트 부드러운 2가지 소금맛 팝콘 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:18.738135", "deleted_at": null,
    images: [{"product_image_id": "2669", "url": "https://ik.imagekit.io/oishidam/products/98892543-ae30-4b07-8859-f531af24685e_ROM2MoGHZ.webp", "alt_text": "패밀리마트 부드러운 2가지 소금맛 팝콘 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2671", "sku_code": "NPPIP-DEMO-1770187631", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2686", "category_id": "67", "name": "패밀리마트 바삭바삭한 식감 리치 카라멜 팝콘 56g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:18.796807", "deleted_at": null,
    images: [{"product_image_id": "2670", "url": "https://ik.imagekit.io/oishidam/products/415421e9-4194-44b9-a43b-265cc2d3bc43_AcdlEBo5P.webp", "alt_text": "패밀리마트 바삭바삭한 식감 리치 카라멜 팝콘 56g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2672", "sku_code": "NPPIP-DEMO-1770187585", "variant_name": "기본", "option_values": {}, "price": 4250, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2687", "category_id": "67", "name": "패밀리마트 부드러운 미니 버터 쿠키 90g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:19.543428", "deleted_at": null,
    images: [{"product_image_id": "2671", "url": "https://ik.imagekit.io/oishidam/products/11505cae-9fd0-4c35-867f-b34df923b041_NStoIjo4MS.webp", "alt_text": "패밀리마트 부드러운 미니 버터 쿠키 90g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2673", "sku_code": "NPPIP-DEMO-1770186755", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2688", "category_id": "67", "name": "패밀리마트 얇게 구운 소금맛 센베이 75g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:20.089195", "deleted_at": null,
    images: [{"product_image_id": "2672", "url": "https://ik.imagekit.io/oishidam/products/bd49cf72-77f5-46b0-8faf-5109b8b2dfad_s28rUTCCM.webp", "alt_text": "패밀리마트 얇게 구운 소금맛 센베이 75g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2674", "sku_code": "NPPIP-DEMO-1770182807", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2689", "category_id": "67", "name": "패밀리마트 포테토칩 진한 노리시오 김소금맛 55g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:20.757793", "deleted_at": null,
    images: [{"product_image_id": "2673", "url": "https://ik.imagekit.io/oishidam/products/ba21e42d-8caa-44e5-82bc-e1595dd86341_v4MtG7Ckl.webp", "alt_text": "패밀리마트 포테토칩 진한 노리시오 김소금맛 55g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2675", "sku_code": "NPPIP-DEMO-1770182048", "variant_name": "기본", "option_values": {}, "price": 3950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2690", "category_id": "67", "name": "패밀리마트 또르띠아칩 스파이시 타코맛 81g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:20.835304", "deleted_at": null,
    images: [{"product_image_id": "2674", "url": "https://ik.imagekit.io/oishidam/products/3f9366e7-2e19-4bc3-ada9-f349cdfcc63a_L-cXXkEXa.webp", "alt_text": "패밀리마트 또르띠아칩 스파이시 타코맛 81g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2676", "sku_code": "NPPIP-DEMO-1770174985", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2691", "category_id": "87", "name": "칸로 밀크 목캔디 노도아메 목사탕 논슈가 72g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:21.271125", "deleted_at": null,
    images: [{"product_image_id": "2675", "url": "https://ik.imagekit.io/oishidam/products/12a2815a-46ee-4ff0-a11d-48ba816a68b9_Qrkxl6XhZ8.webp", "alt_text": "칸로 밀크 목캔디 노도아메 목사탕 논슈가 72g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2677", "sku_code": "NPPIP-DEMO-1769671265", "variant_name": "기본", "option_values": {}, "price": 4300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2692", "category_id": "75", "name": "아지노모토 쿡두 삼겹살 가지 볶음용 소스 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:22.026681", "deleted_at": null,
    images: [{"product_image_id": "2676", "url": "https://ik.imagekit.io/oishidam/products/2b0626a2-f730-42b5-ac70-04b76496e34e_Wdwq59NRN.webp", "alt_text": "아지노모토 쿡두 삼겹살 가지 볶음용 소스 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2678", "sku_code": "NPPIP-DEMO-1768285704", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2693", "category_id": "66", "name": "세븐일레븐 오가닉 맛밤 80g 3봉입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:22.916746", "deleted_at": null,
    images: [{"product_image_id": "2678", "url": "https://ik.imagekit.io/oishidam/products/c895d8d8-6003-4619-894a-dc46491ef28c_PBUwZZ5g3.webp", "alt_text": "세븐일레븐 오가닉 맛밤 80g 3봉입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2679", "sku_code": "NPPIP-DEMO-1768282354", "variant_name": "기본", "option_values": {}, "price": 8900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2694", "category_id": "79", "name": "부르봉 프레첼 쇼콜라 초콜릿 과자 53g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:22.762044", "deleted_at": null,
    images: [{"product_image_id": "2677", "url": "https://ik.imagekit.io/oishidam/products/e98b7635-939e-4937-a65b-580971973772_kJ7u8y23qp.webp", "alt_text": "부르봉 프레첼 쇼콜라 초콜릿 과자 53g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2680", "sku_code": "NPPIP-DEMO-1767842011", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2695", "category_id": "94", "name": "미즈칸 나베 쯔유 육수 미니팩 4봉입 2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:23.183886", "deleted_at": null,
    images: [{"product_image_id": "2679", "url": "https://ik.imagekit.io/oishidam/products/d1acde6a-939e-498e-ac32-b56bd3052849_oZURlPP6x.webp", "alt_text": "미즈칸 나베 쯔유 육수 미니팩 4봉입 2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2681", "sku_code": "NPPIP-DEMO-1767835828", "variant_name": "기본", "option_values": {}, "price": 7500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2696", "category_id": "79", "name": "토하토 포켓몬 스낵 딸기맛 23g 스티커 포함 일본 과자", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:23.708652", "deleted_at": null,
    images: [{"product_image_id": "2680", "url": "https://ik.imagekit.io/oishidam/products/905c2832-dd02-44e4-a52a-1e9b8c0c5e22_M71MO6oU9.webp", "alt_text": "토하토 포켓몬 스낵 딸기맛 23g 스티커 포함 일본 과자", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2682", "sku_code": "NPPIP-DEMO-1767682926", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2697", "category_id": "94", "name": "아지노모토 아지 판다 미원 70g 일본 조미료", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:25.009035", "deleted_at": null,
    images: [{"product_image_id": "2682", "url": "https://ik.imagekit.io/oishidam/products/ddf07ce3-5328-4fae-aed6-7fdb3912238c_1gFsn0yL-.webp", "alt_text": "아지노모토 아지 판다 미원 70g 일본 조미료", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2683", "sku_code": "NPPIP-DEMO-1767660297", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2698", "category_id": "89", "name": "롯데 프리미엄 가나 초콜릿 캬라멜밀크맛 70g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:24.893557", "deleted_at": null,
    images: [{"product_image_id": "2681", "url": "https://ik.imagekit.io/oishidam/products/7f8a7e75-a645-46e4-8f0e-fb8c1e8fada6_cMfstmobz.webp", "alt_text": "롯데 프리미엄 가나 초콜릿 캬라멜밀크맛 70g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2684", "sku_code": "NPPIP-DEMO-1758094443", "variant_name": "기본", "option_values": {}, "price": 4950, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2699", "category_id": "82", "name": "일본 도토루 포션 커피 블랙 저당 40개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:25.094716", "deleted_at": null,
    images: [{"product_image_id": "2683", "url": "https://ik.imagekit.io/oishidam/products/e8d5b0e9-86fe-4f2b-85c8-3f40461bf6da_EuS4eqD_H.webp", "alt_text": "일본 도토루 포션 커피 블랙 저당 40개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2685", "sku_code": "NPPIP-DEMO-1754640674", "variant_name": "기본", "option_values": {}, "price": 20500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2700", "category_id": "89", "name": "★세트할인★ 메이지 아몬드 초콜릿 10개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:25.628801", "deleted_at": null,
    images: [{"product_image_id": "2684", "url": "https://ik.imagekit.io/oishidam/products/36ee88e6-8481-4b88-ab91-cb78d9159a87_EHLSVMIh2.webp", "alt_text": "★세트할인★ 메이지 아몬드 초콜릿 10개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2686", "sku_code": "NPPIP-DEMO-1754547105", "variant_name": "기본", "option_values": {}, "price": 35000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2701", "category_id": "88", "name": "카바야 터프 구미 하드 젤리 그레이프 펀치 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:26.853409", "deleted_at": null,
    images: [{"product_image_id": "2685", "url": "https://ik.imagekit.io/oishidam/products/b6f7ccdd-a35f-4e53-a930-9818ee087d30_48_Dh3fDW.webp", "alt_text": "카바야 터프 구미 하드 젤리 그레이프 펀치 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2687", "sku_code": "NPPIP-DEMO-1754269584", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2702", "category_id": "79", "name": "카메다제과 쌀과자 센베이 해피탄 하피탄 96g 12개 세트", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:27.037117", "deleted_at": null,
    images: [{"product_image_id": "2686", "url": "https://ik.imagekit.io/oishidam/products/ab19a581-797d-46b8-b663-6480cf1937e9_j51kLCoZQ.webp", "alt_text": "카메다제과 쌀과자 센베이 해피탄 하피탄 96g 12개 세트", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2688", "sku_code": "NPPIP-DEMO-1751260092", "variant_name": "기본", "option_values": {}, "price": 31000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2703", "category_id": "75", "name": "훈도다이 와사비 오일 45g 강력한 고추냉이 오일", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:27.051543", "deleted_at": null,
    images: [{"product_image_id": "2687", "url": "https://ik.imagekit.io/oishidam/products/928317e8-0cb8-4c6c-99c0-341f454f1924_ICrp7TJUq.webp", "alt_text": "훈도다이 와사비 오일 45g 강력한 고추냉이 오일", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2689", "sku_code": "NPPIP-DEMO-1751245961", "variant_name": "기본", "option_values": {}, "price": 18000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2704", "category_id": "70", "name": "이치비키 아카카라 나베 일본 매운 전골 요리 분말소스 스틱형 4인분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:27.567147", "deleted_at": null,
    images: [{"product_image_id": "2688", "url": "https://ik.imagekit.io/oishidam/products/c8fb00e7-dbde-456b-8545-e7dceeab28f7_3-sfOMVTk.webp", "alt_text": "이치비키 아카카라 나베 일본 매운 전골 요리 분말소스 스틱형 4인분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2690", "sku_code": "NPPIP-DEMO-1745912658", "variant_name": "기본", "option_values": {}, "price": 7000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2705", "category_id": "70", "name": "이치비키 아카카라 나베 일본 매운 전골 요리 소스 3~4인분 3종 (1단계/3단계/5단계)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:28.760511", "deleted_at": null,
    images: [{"product_image_id": "2689", "url": "https://ik.imagekit.io/oishidam/products/6aafceb6-921d-4433-8355-77484c0949c3_Sg1qvBeIr.webp", "alt_text": "이치비키 아카카라 나베 일본 매운 전골 요리 소스 3~4인분 3종 (1단계/3단계/5단계)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2691", "sku_code": "NPPIP-DEMO-1745912297", "variant_name": "기본", "option_values": {}, "price": 8200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2706", "category_id": "94", "name": "아지노모토 나베 큐브 육수 7개입 6종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:28.929091", "deleted_at": null,
    images: [{"product_image_id": "2690", "url": "https://ik.imagekit.io/oishidam/products/822ace87-8fb5-4b6c-b78b-637efaf3fac6_R2kli_pQ7.webp", "alt_text": "아지노모토 나베 큐브 육수 7개입 6종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2692", "sku_code": "NPPIP-DEMO-1744610524", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2707", "category_id": "87", "name": "노벨 오토코우메 매실 사탕 80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:28.998264", "deleted_at": null,
    images: [{"product_image_id": "2691", "url": "https://ik.imagekit.io/oishidam/products/5e2cb285-8bb6-4266-ae7d-4547327de522_5mk0k2d8Q.webp", "alt_text": "노벨 오토코우메 매실 사탕 80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2693", "sku_code": "NPPIP-DEMO-1742890590", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2708", "category_id": "79", "name": "산코제과 유키노야도 일본 쌀과자 센베이 20매입2종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:29.444202", "deleted_at": null,
    images: [{"product_image_id": "2692", "url": "https://ik.imagekit.io/oishidam/products/ed7be3f2-0792-4689-bc28-ded01a0c8d97_LBV0TajBZe.webp", "alt_text": "산코제과 유키노야도 일본 쌀과자 센베이 20매입2종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2694", "sku_code": "NPPIP-DEMO-1739501336", "variant_name": "기본", "option_values": {}, "price": 4000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2709", "category_id": "87", "name": "파인 이에몬 말차 사탕 목캔디 60g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:30.746302", "deleted_at": null,
    images: [{"product_image_id": "2694", "url": "https://ik.imagekit.io/oishidam/products/0ec51522-473a-4ca9-ba85-37fa5b277f1e_GZq1myYz5.webp", "alt_text": "파인 이에몬 말차 사탕 목캔디 60g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2695", "sku_code": "NPPIP-DEMO-1737510122", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2710", "category_id": "84", "name": "아오하타 베르데 블루베리잼 버터 크림 4개입 휴대용 토스트 스프레드", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:30.582955", "deleted_at": null,
    images: [{"product_image_id": "2693", "url": "https://ik.imagekit.io/oishidam/products/eee1b997-0e27-4782-b6a3-00386a8f6fc3_soWPwN7gC.webp", "alt_text": "아오하타 베르데 블루베리잼 버터 크림 4개입 휴대용 토스트 스프레드", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2696", "sku_code": "NPPIP-DEMO-1737335593", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2711", "category_id": "84", "name": "아오하타 베르데 꿀 버터 크림 4개입 휴대용 핫케이크 시럽", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:30.8212", "deleted_at": null,
    images: [{"product_image_id": "2695", "url": "https://ik.imagekit.io/oishidam/products/84f54c16-9575-4f81-b454-18e71ef4da54_c4P_DsGM2.webp", "alt_text": "아오하타 베르데 꿀 버터 크림 4개입 휴대용 핫케이크 시럽", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2697", "sku_code": "NPPIP-DEMO-1737332536", "variant_name": "기본", "option_values": {}, "price": 3500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2712", "category_id": "94", "name": "나가타니엔 동결건조 분말타입 미소시루 3종", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:31.320833", "deleted_at": null,
    images: [{"product_image_id": "2696", "url": "https://ik.imagekit.io/oishidam/products/f7053425-57eb-4649-aa3c-e95432beecdb__XheE7CDNw.webp", "alt_text": "나가타니엔 동결건조 분말타입 미소시루 3종", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2698", "sku_code": "NPPIP-DEMO-1737009873", "variant_name": "기본", "option_values": {}, "price": 4500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2713", "category_id": "89", "name": "메이지 아폴로 개별포장 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:32.875921", "deleted_at": null,
    images: [{"product_image_id": "2699", "url": "https://ik.imagekit.io/oishidam/products/ac57847a-6030-4e5c-8f67-02f8d133eddf_DI0coL6nJ.webp", "alt_text": "메이지 아폴로 개별포장 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2699", "sku_code": "NPPIP-DEMO-1719466398", "variant_name": "기본", "option_values": {}, "price": 4800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2714", "category_id": "79", "name": "가루비 자가비 Jagabee 버터 간장 맛 40g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:32.435355", "deleted_at": null,
    images: [{"product_image_id": "2697", "url": "https://ik.imagekit.io/oishidam/products/eb3af52f-5344-4fde-a900-f7ef8eae5541_feJdQfFxK.webp", "alt_text": "가루비 자가비 Jagabee 버터 간장 맛 40g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2700", "sku_code": "NPPIP-DEMO-1660286158", "variant_name": "기본", "option_values": {}, "price": 2600, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2715", "category_id": "84", "name": "[S&B]본느마망 스트로베리 잼 750g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:32.575003", "deleted_at": null,
    images: [{"product_image_id": "2698", "url": "https://ik.imagekit.io/oishidam/products/dedfb49a-be9d-4a90-8e10-cdfadada6cf4_ALKIdbhDe.jpg", "alt_text": "[S&B]본느마망 스트로베리 잼 750g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2701", "sku_code": "NPPIP-DEMO-1637300297", "variant_name": "기본", "option_values": {}, "price": 19900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2716", "category_id": "75", "name": "[S&B]사이칸 홍고추(홀)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:33.261935", "deleted_at": null,
    images: [{"product_image_id": "2700", "url": "https://ik.imagekit.io/oishidam/products/d3cba7a4-9bd0-4e22-a827-91ae2744c5d3_VMCABeAxR.webp", "alt_text": "[S&B]사이칸 홍고추(홀)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2702", "sku_code": "NPPIP-DEMO-1637285426", "variant_name": "기본", "option_values": {}, "price": 2100, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2717", "category_id": "75", "name": "에스앤비 섞기만 하면 되는 스파게티 소스 생맛 명란젓", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:34.442909", "deleted_at": null,
    images: [{"product_image_id": "2701", "url": "https://ik.imagekit.io/oishidam/products/09bde5bb-f1e2-4b88-be09-2bf973f60c2d_avE3JSAKK.webp", "alt_text": "에스앤비 섞기만 하면 되는 스파게티 소스 생맛 명란젓", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2703", "sku_code": "NPPIP-DEMO-1637220873", "variant_name": "기본", "option_values": {}, "price": 2960, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2718", "category_id": "83", "name": "이토엔 오이오차 체지방을 줄여주는 이치방 츠마미 잎 1000 100g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:34.489454", "deleted_at": null,
    images: [{"product_image_id": "2702", "url": "https://ik.imagekit.io/oishidam/products/fe11479e-8c37-49e9-b01e-128adab24f81_L5SML4q7n.webp", "alt_text": "이토엔 오이오차 체지방을 줄여주는 이치방 츠마미 잎 1000 100g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2704", "sku_code": "NPPIP-DEMO-1635836149", "variant_name": "기본", "option_values": {}, "price": 19000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2719", "category_id": "87", "name": "[모리나가]in 태블릿 염분 플러스  80g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:34.785353", "deleted_at": null,
    images: [{"product_image_id": "2703", "url": "https://ik.imagekit.io/oishidam/products/392dc6d4-5109-4c9f-a087-9a4d294676dd_1JL4LOy_F.webp", "alt_text": "[모리나가]in 태블릿 염분 플러스  80g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2705", "sku_code": "NPPIP-DEMO-1635153934", "variant_name": "기본", "option_values": {}, "price": 3800, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2720", "category_id": "94", "name": "펄 스위트 과립봉입 200g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:35.221074", "deleted_at": null,
    images: [{"product_image_id": "2704", "url": "https://ik.imagekit.io/oishidam/products/4dffb177-e559-4253-a877-6769b2db2aca_FY5Dl_XXOf.webp", "alt_text": "펄 스위트 과립봉입 200g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2706", "sku_code": "NPPIP-DEMO-1630654714", "variant_name": "기본", "option_values": {}, "price": 13300, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2721", "category_id": "80", "name": "[ISHIYA]시로이코이비토 화이트 12개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:36.884437", "deleted_at": null,
    images: [{"product_image_id": "2707", "url": "https://ik.imagekit.io/oishidam/products/ff8040be-b231-4e8b-8c9f-09165df55bc8_xO1itTSiU.png", "alt_text": "[ISHIYA]시로이코이비토 화이트 12개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2707", "sku_code": "NPPIP-DEMO-1626329798", "variant_name": "기본", "option_values": {}, "price": 17000, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2722", "category_id": "89", "name": "메이지 하이 밀크 초콜릿 BOX (26매)", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:36.433077", "deleted_at": null,
    images: [{"product_image_id": "2705", "url": "https://ik.imagekit.io/oishidam/products/6f8bd713-ac18-4e3e-a034-497f515c0b27_ojXRAB5sM.webp", "alt_text": "메이지 하이 밀크 초콜릿 BOX (26매)", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2708", "sku_code": "NPPIP-DEMO-1624848602", "variant_name": "기본", "option_values": {}, "price": 6500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2723", "category_id": "72", "name": "닛신 호빵맨 라면 담백한 간장맛 컵라면", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:36.668879", "deleted_at": null,
    images: [{"product_image_id": "2706", "url": "https://ik.imagekit.io/oishidam/products/67de8e5c-11f7-478b-a94a-34149500c98c_W8goU7KqD.webp", "alt_text": "닛신 호빵맨 라면 담백한 간장맛 컵라면", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2709", "sku_code": "NPPIP-DEMO-1624522376", "variant_name": "기본", "option_values": {}, "price": 2500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2724", "category_id": "88", "name": "UHA미각당 구미서플리 환원형 코엔자임 Q10 20일분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:36.915978", "deleted_at": null,
    images: [{"product_image_id": "2708", "url": "https://ik.imagekit.io/oishidam/products/99523263-9906-4e7e-bbca-79086f397ac4_sSkWkbOCk3.webp", "alt_text": "UHA미각당 구미서플리 환원형 코엔자임 Q10 20일분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2710", "sku_code": "NPPIP-DEMO-1620111740", "variant_name": "기본", "option_values": {}, "price": 32900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2725", "category_id": "88", "name": "UHA미각당 구미서플리 루테인 30일분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:38.143966", "deleted_at": null,
    images: [{"product_image_id": "2709", "url": "https://ik.imagekit.io/oishidam/products/e190a109-8364-42c3-9d79-931681381cf1_ZyIQqM0Kz.webp", "alt_text": "UHA미각당 구미서플리 루테인 30일분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2711", "sku_code": "NPPIP-DEMO-1620111307", "variant_name": "기본", "option_values": {}, "price": 17900, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2726", "category_id": "88", "name": "UHA미각당 구미서플리 철 및 엽산 20일분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:38.40946", "deleted_at": null,
    images: [{"product_image_id": "2710", "url": "https://ik.imagekit.io/oishidam/products/f36ee6b2-3989-4231-a3a3-ef2ddca76c20_tbpV8rAPa.webp", "alt_text": "UHA미각당 구미서플리 철 및 엽산 20일분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2712", "sku_code": "NPPIP-DEMO-1620110777", "variant_name": "기본", "option_values": {}, "price": 9200, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2727", "category_id": "88", "name": "UHA미각당 구미서플리 비타민D3 20일분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:38.624038", "deleted_at": null,
    images: [{"product_image_id": "2712", "url": "https://ik.imagekit.io/oishidam/products/7d8311c2-26be-4951-87c0-493ecc4ccae5_pIe6wUK0t.webp", "alt_text": "UHA미각당 구미서플리 비타민D3 20일분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2713", "sku_code": "NPPIP-DEMO-1620110363", "variant_name": "기본", "option_values": {}, "price": 9500, "stock_quantity": 20, "is_active": true}],
  },
  {
    "product_id": "2728", "category_id": "88", "name": "UHA미각당 구미서플리 아연&마카 30일분", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:38.625624", "deleted_at": null,
    images: [{"product_image_id": "2711", "url": "https://ik.imagekit.io/oishidam/products/ed3f77f4-ee11-4a87-920a-9c6f6803f070_hog-6OA1k.webp", "alt_text": "UHA미각당 구미서플리 아연&마카 30일분", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2714", "sku_code": "NPPIP-DEMO-1620107214", "variant_name": "기본", "option_values": {}, "price": 15300, "stock_quantity": 4, "is_active": true}],
  },
  {
    "product_id": "2729", "category_id": "81", "name": "[AGF]블랜디®스틱 카페오레 칼로리하프 8개입", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:39.982179", "deleted_at": null,
    images: [{"product_image_id": "2713", "url": "https://ik.imagekit.io/oishidam/products/c11a7585-e9e7-4222-b702-2f37c5079680_Uydpfoj9i.webp", "alt_text": "[AGF]블랜디®스틱 카페오레 칼로리하프 8개입", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2715", "sku_code": "NPPIP-DEMO-1617851518", "variant_name": "기본", "option_values": {}, "price": 3300, "stock_quantity": 3, "is_active": true}],
  },
  {
    "product_id": "2730", "category_id": "88", "name": "오란지나 구미 젤리 72g", "description": "엔핍 식품 상품을 참고한 개발용 더미 상품입니다.", "sale_status": "ON_SALE", "published_at": "2026-11-11 11:21:40.094779", "deleted_at": null,
    images: [{"product_image_id": "2714", "url": "https://ik.imagekit.io/oishidam/products/9f544036-3b3a-4281-89b7-8dafaa5a1c2d_dUKJA7D66.webp", "alt_text": "오란지나 구미 젤리 72g", "is_primary": true, "sort_order": 0}],
    variants: [{"variant_id": "2716", "sku_code": "NPPIP-DEMO-1548323108", "variant_name": "기본", "option_values": {}, "price": 3000, "stock_quantity": 2, "is_active": true}],
  },
]

// 판매 순위 데이터가 없는 덤프에서는 최근 등록 상품을 기본 추천에 사용한다.
export const recommendedProductIds = products
  .filter((product) => product.sale_status === 'ON_SALE' && !product.deleted_at)
  .sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''))
  .slice(0, 3)
  .map((product) => product.product_id)
