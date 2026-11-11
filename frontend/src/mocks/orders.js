const examples = [
  [3, '0123', '배송중', [
    ['포키 딸기맛', 1, 6400, 'Pocky', 'berry'],
    ['킷캣 말차맛', 1, 7100, 'KitKat', 'matcha'],
    ['메이지 초콜릿', 1, 18900, 'meiji', 'cocoa'],
    ['칼비 감자칩', 1, 4500, 'Calbee', 'potato'],
    ['부르봉 쿠키', 1, 6500, 'Bourbon', 'cocoa'],
    ['가루비 자가리코', 1, 5200, 'Calbee', 'matcha'],
  ]],
  [11, '0456', '배송완료', [
    ['칼비 포테토칩 우스시오맛', 1, 4500, 'Calbee', 'potato'],
  ]],
  [16, '0789', '배송완료', [
    ['메이지 초콜릿', 1, 9500, 'meiji', 'cocoa'],
    ['킷캣 말차맛', 1, 9400, 'KitKat', 'matcha'],
  ]],
  [42, '0321', '배송완료', [
    ['포키 딸기맛', 2, 6400, 'Pocky', 'berry'],
  ]],
  [125, '0654', '배송완료', [
    ['칼비 포테토칩 우스시오맛', 2, 4500, 'Calbee', 'potato'],
  ]],
]

export function getExampleOrders(today) {
  return examples.map(([daysAgo, serial, status, products]) => {
    const date = new Date(today)
    date.setDate(date.getDate() - daysAgo)
    const dateParts = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map((part) => String(part).padStart(2, '0'))
    const items = products.map(([name, quantity, price, brand, tone]) => ({
      name, quantity, price, brand, tone,
    }))

    return {
      id: `ORD${dateParts.join('')}${serial}`,
      date,
      displayDate: dateParts.join('.'),
      status,
      items,
      quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }
  })
}
