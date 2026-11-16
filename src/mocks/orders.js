const exampleProducts = {
  pocky: { name: '포키 딸기맛', brand: 'Pocky', tone: 'berry', category_id: '80', price: 6400 },
  kitkat: { name: '킷캣 말차맛', brand: 'KitKat', tone: 'matcha', category_id: '89', price: 7100 },
  meiji: { name: '메이지 초콜릿', brand: 'meiji', tone: 'cocoa', category_id: '89', price: 9500 },
  'calbee-chips': { name: '칼비 감자칩', brand: 'Calbee', tone: 'potato', category_id: '79', price: 4500 },
  bourbon: { name: '부르봉 쿠키', brand: 'Bourbon', tone: 'cocoa', category_id: '80', price: 6500 },
  jagarico: { name: '가루비 자가리코', brand: 'Calbee', tone: 'matcha', category_id: '79', price: 5200 },
  'calbee-usushio': { name: '칼비 포테토칩 우스시오맛', brand: 'Calbee', tone: 'potato', category_id: '79', price: 4500 },
}

export function exampleOrderProduct(key) {
  const { name, brand, tone } = exampleProducts[key]
  return { product_id: 'example-order-' + key, name, brand, tone }
}

export function getExampleOrderProduct(productId) {
  const prefix = 'example-order-'
  if (typeof productId !== 'string' || !productId.startsWith(prefix)) return null
  const key = productId.slice(prefix.length)
  if (!Object.hasOwn(exampleProducts, key)) return null
  const { category_id, price } = exampleProducts[key]
  return {
    ...exampleOrderProduct(key),
    category_id,
    min_price: price,
    images: [],
    variants: [],
  }
}

const examples = [
  [3, '0123', '배송중', [
    ['pocky', 1, 6400],
    ['kitkat', 1, 7100],
    ['meiji', 1, 18900],
    ['calbee-chips', 1, 4500],
    ['bourbon', 1, 6500],
    ['jagarico', 1, 5200],
  ]],
  [11, '0456', '배송완료', [
    ['calbee-usushio', 1, 4500],
  ]],
  [16, '0789', '배송완료', [
    ['meiji', 1, 9500],
    ['kitkat', 1, 9400],
  ]],
  [42, '0321', '배송완료', [
    ['pocky', 2, 6400],
  ]],
  [125, '0654', '배송완료', [
    ['calbee-usushio', 2, 4500],
  ]],
]

export function getExampleOrders(today) {
  return examples.map(([daysAgo, serial, status, products]) => {
    const date = new Date(today)
    date.setDate(date.getDate() - daysAgo)
    const dateParts = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map((part) => String(part).padStart(2, '0'))
    const items = products.map(([key, quantity, price]) => ({
      ...exampleOrderProduct(key), quantity, price,
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
