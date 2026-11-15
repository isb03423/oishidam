import { getAdminDashboard } from './adminDashboard.js'
import { getMockCustomers } from './auth.js'
import { categories, products } from './catalog.js'
import { getExampleInquiries } from './inquiries.js'
import { productReviews } from './productDetails.js'
import analytics from './adminSegments.json'

export function getManagementData() {
  return {
    products: products.map((product) => ({ ...product, id: product.product_id })),
    categories: categories.map((category) => ({ ...category, id: category.category_id })),
    inventory: products.flatMap((product) => product.variants.map((variant) => ({
      ...variant, id: variant.variant_id, product_id: product.product_id,
    }))),
    orders: getAdminDashboard(new Date()).orders.sort((a, b) => b.date - a.date),
    members: getMockCustomers(),
    inquiries: getExampleInquiries('admin-dashboard'),
    reviews: Object.entries(productReviews).flatMap(([product_id, reviews]) => reviews.map((review) => ({ ...review, product_id }))),
    analytics,
  }
}
