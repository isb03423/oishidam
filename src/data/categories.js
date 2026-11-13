// 활성 카테고리 스냅샷 · oishidam-full-20261113-184521.sql
export const categories = [
  { category_id: '64', parent_id: null, name: '편의점', sort_order: 1, is_active: true },
  { category_id: '65', parent_id: '64', name: '로손', sort_order: 1, is_active: true },
  { category_id: '66', parent_id: '64', name: '세븐일레븐', sort_order: 2, is_active: true },
  { category_id: '67', parent_id: '64', name: '패밀리마트', sort_order: 3, is_active: true },
  { category_id: '68', parent_id: null, name: '간편조리식품', sort_order: 2, is_active: true },
  { category_id: '69', parent_id: '68', name: '카레·짜장', sort_order: 1, is_active: true },
  { category_id: '70', parent_id: '68', name: '즉석국·스프', sort_order: 2, is_active: true },
  { category_id: '71', parent_id: null, name: '라면·면류', sort_order: 3, is_active: true },
  { category_id: '72', parent_id: '71', name: '컵라면', sort_order: 1, is_active: true },
  { category_id: '73', parent_id: '71', name: '봉지라면', sort_order: 2, is_active: true },
  { category_id: '74', parent_id: '71', name: '기타 면', sort_order: 3, is_active: true },
  { category_id: '75', parent_id: null, name: '소스·드레싱', sort_order: 4, is_active: true },
  { category_id: '76', parent_id: null, name: '스낵·과자', sort_order: 5, is_active: true },
  { category_id: '77', parent_id: '76', name: '가공안주류', sort_order: 1, is_active: true },
  { category_id: '78', parent_id: '76', name: '시리얼', sort_order: 2, is_active: true },
  { category_id: '79', parent_id: '76', name: '일반스낵', sort_order: 3, is_active: true },
  { category_id: '80', parent_id: '76', name: '쿠키·비스킷', sort_order: 4, is_active: true },
  { category_id: '81', parent_id: null, name: '음료', sort_order: 6, is_active: true },
  { category_id: '82', parent_id: '81', name: '커피', sort_order: 1, is_active: true },
  { category_id: '83', parent_id: '81', name: '차류', sort_order: 2, is_active: true },
  { category_id: '84', parent_id: null, name: '잼·시럽·스프레드', sort_order: 7, is_active: true },
  { category_id: '85', parent_id: null, name: '젤리·사탕·초콜릿', sort_order: 8, is_active: true },
  { category_id: '86', parent_id: '85', name: '껌', sort_order: 1, is_active: true },
  { category_id: '87', parent_id: '85', name: '사탕', sort_order: 2, is_active: true },
  { category_id: '88', parent_id: '85', name: '젤리', sort_order: 3, is_active: true },
  { category_id: '89', parent_id: '85', name: '초콜릿', sort_order: 4, is_active: true },
  { category_id: '90', parent_id: '85', name: '캬라멜', sort_order: 5, is_active: true },
  { category_id: '91', parent_id: '85', name: '푸딩', sort_order: 6, is_active: true },
  { category_id: '92', parent_id: null, name: '조미료', sort_order: 9, is_active: true },
  { category_id: '93', parent_id: '92', name: '후리가케', sort_order: 1, is_active: true },
  { category_id: '94', parent_id: '92', name: '기타 조미료', sort_order: 2, is_active: true },
]

export const categoryGroups = categories
  .filter((category) => category.parent_id === null)
  .sort((a, b) => a.sort_order - b.sort_order)
  .map((category) => ({
    ...category,
    children: categories
      .filter((child) => child.parent_id === category.category_id)
      .sort((a, b) => a.sort_order - b.sort_order),
  }))
