import { apiRequest } from './api.js'

export async function getProductReviews(productId, page = 0, { size = 10, signal } = {}) {
  const result = await apiRequest({ path: `/products/${encodeURIComponent(productId)}/reviews`, params: { page, size }, signal, mock: false })
  return {
    ...result,
    content: result.content.map((review) => ({
      id: String(review.reviewId), content: review.content, ...(review.rating != null ? { rating: review.rating } : {}), date: review.createdAt?.slice(0, 10),
      images: (review.imageUrls ?? []).map((url) => ({ url })), reply: review.answerContent,
    })),
  }
}

export function getProductReviewSummary(productId, { signal } = {}) {
  return apiRequest({ path: `/products/${encodeURIComponent(productId)}/reviews/summary`, signal, mock: false })
}

export async function getMyReviews(type, page = 0, { size = 10, signal } = {}) {
  const result = await apiRequest({ path: type === 'eligible' ? '/reviews/eligible' : '/reviews/mine', params: { page, size }, signal, authenticated: true, mock: false })
  return { ...result, content: result.content.map((item) => ({
    id: String(item.review?.reviewId ?? item.orderItemId), orderItemId: item.orderItemId,
    product_id: String(item.productId), name: item.productName, imageUrl: item.imageUrl,
    ordered: item.orderedAt?.slice(0, 10).replaceAll('-', '.'), delivered: item.deliveredAt?.slice(0, 10).replaceAll('-', '.'),
    deadline: item.writeDeadline?.replace('T', ' ').slice(0, 16), editable: item.editable,
    editableUntil: item.review?.editableUntil, content: item.review?.content ?? '', rating: item.review?.rating,
    images: (item.review?.imageUrls ?? []).map((url) => ({ url })), reply: item.review?.answerContent,
  })) }
}

export function createReview(orderItemId, content, images = [], rating) {
  let data = { content: content.trim(), rating }
  if (images.length) {
    data = new FormData()
    data.append('content', content.trim())
    if (rating != null) data.append('rating', String(rating))
    images.forEach((image) => data.append('files', image.file))
  }
  return apiRequest({ method: 'POST', path: `/orders/items/${encodeURIComponent(orderItemId)}/review`, data, timeout: images.length ? 180000 : undefined, authenticated: true, mock: false })
}

export function updateReview(reviewId, content, images, rating) {
  const data = new FormData()
  data.append('request', new Blob([JSON.stringify({ content: content.trim(), rating, retainedImageUrls: images.filter((image) => !image.file).map((image) => image.url) })], { type: 'application/json' }))
  images.filter((image) => image.file).forEach((image) => data.append('files', image.file))
  return apiRequest({ method: 'PATCH', path: `/reviews/${encodeURIComponent(reviewId)}`, data, timeout: 180000, authenticated: true, mock: false })
}

export function deleteReview(reviewId) {
  return apiRequest({ method: 'DELETE', path: `/reviews/${encodeURIComponent(reviewId)}`, authenticated: true, mock: false })
}
