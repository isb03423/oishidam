<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import placeholder from '../assets/images/favicon-mark.png'
import { development } from '../config/development.js'
import { categories } from '../stores/categories.js'
import { getProduct } from '../services/catalog.js'
import { getProductReviews, getProductReviewSummary } from '../services/reviews.js'
import ReviewRating from '../components/common/ReviewRating.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import { addProductToCart, cartLine, cartBusy, cartLoading } from '../stores/cart.js'
import { startCheckout } from '../stores/checkout.js'
import { session } from '../stores/session.js'
import { toggleWish, wishedIds, wishBusy, wishLoading } from '../stores/wishlist.js'

const tabs = [
  { id: 'details', label: '상품 상세정보' },
  { id: 'reviews', label: '상품 후기' },
  { id: 'customs', label: '통관 안내' },
]
const route = useRoute()
const router = useRouter()
const product = ref(null)
const status = ref('loading')
const retry = ref(0)
const tab = ref('details')
const selectedImage = ref(null)
const failedImages = ref(new Set())
const quantity = ref(1)
const notice = ref('')
const cartDialog = ref(null)
const reviewDialog = ref(null)
const activeReview = ref(null)
const reviewImageIndex = ref(0)
const activeReviewImage = computed(() => activeReview.value?.images?.[reviewImageIndex.value])
const serverReviews = ref([])
const serverReviewSummary = ref(null)
const reviewPage = ref(1)
const reviewTotal = ref(null)
const reviewPages = ref(0)
const reviewLoading = ref(false)
const reviewError = ref('')
const reviewNotice = ref('')
const reviewRetry = ref(0)
const formatter = new Intl.NumberFormat('ko-KR')
const won = (price) => Number.isFinite(price) ? `${formatter.format(price)}원` : '가격 확인 필요'

const category = computed(() => categories.value.find((item) => item.category_id === String(product.value?.category_id)))
const images = computed(() => (product.value?.images ?? []).filter((image) => image.url && !failedImages.value.has(image.url)))
const primaryImage = computed(() => images.value.find((image) => image.is_primary) ?? images.value[0])
const currentImage = computed(() => images.value.find((image) => image.url === selectedImage.value) ?? primaryImage.value)
const reviews = computed(() => development.mockEnabled ? product.value?.reviews ?? [] : serverReviews.value)
const reviewCount = computed(() => development.mockEnabled ? reviews.value.length : reviewTotal.value)
const averageRating = computed(() => {
  if (!development.mockEnabled) return serverReviewSummary.value?.averageRating?.toFixed(1) ?? null
  const ratedReviews = reviews.value.filter((review) => Number.isInteger(review.rating))
  return ratedReviews.length
    ? (ratedReviews.reduce((sum, review) => sum + review.rating, 0) / ratedReviews.length).toFixed(1)
    : null
})
const soldOut = computed(() => product.value?.is_sold_out || !(product.value?.stock_quantity > 0))
const maxQuantity = computed(() => soldOut.value ? 0 : product.value?.stock_quantity ?? 0)
const lowStock = computed(() => maxQuantity.value > 0 && maxQuantity.value < 5)
const canOrder = computed(() => !soldOut.value && maxQuantity.value > 0)
const wished = computed(() => Boolean(session.member) && wishedIds.value.includes(product.value?.product_id))

watch(
  [() => route.params.productId, () => development.mockEnabled, () => development.scenario, retry],
  async ([id], _, onCleanup) => {
    if (!id) return
    const controller = new AbortController()
    onCleanup(() => controller.abort())
    status.value = 'loading'
    product.value = null
    reviewPage.value = 1
    activeReview.value = null
    reviewNotice.value = ''
    reviewDialog.value?.close()
    tab.value = 'details'
    selectedImage.value = null
    failedImages.value.clear()
    quantity.value = 1
    clearNotice()
    try {
      const [detail, summary] = await Promise.all([
        getProduct(id, { signal: controller.signal }),
        // 후기 집계 실패가 상품 정보 조회를 막지 않도록 한다.
        development.mockEnabled ? null : getProductReviewSummary(id, { signal: controller.signal }).catch(() => null),
      ])
      if (controller.signal.aborted) return
      product.value = detail
      serverReviewSummary.value = summary
      reviewTotal.value = summary?.reviewCount ?? null
      status.value = detail ? 'ready' : 'missing'
    } catch (error) {
      if (!controller.signal.aborted) {
        status.value = error.status === 404 || error.code === 'PRODUCT_NOT_FOUND' ? 'missing' : 'failed'
      }
    }
  },
  { immediate: true },
)

watch([() => product.value?.product_id, tab, reviewPage, reviewRetry, () => development.mockEnabled], async ([id], _, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  reviewLoading.value = false
  reviewError.value = ''
  if (!id) { serverReviews.value = []; serverReviewSummary.value = null; reviewTotal.value = null; reviewPages.value = 0; return }
  if (development.mockEnabled || tab.value !== 'reviews') return
  reviewLoading.value = true
  serverReviews.value = []
  serverReviewSummary.value = null
  try {
    const [result, summary] = await Promise.all([
      getProductReviews(id, reviewPage.value - 1, { signal: controller.signal }),
      getProductReviewSummary(id, { signal: controller.signal }),
    ])
    if (controller.signal.aborted) return
    if (reviewPage.value > 1 && reviewPage.value > result.totalPages) { reviewPage.value = Math.max(1, result.totalPages); return }
    serverReviews.value = result.content
    serverReviewSummary.value = summary
    reviewTotal.value = result.totalElements
    reviewPages.value = result.totalPages
  } catch (failure) {
    if (!controller.signal.aborted) { reviewError.value = failure.message; reviewNotice.value = failure.message }
  } finally {
    if (!controller.signal.aborted) reviewLoading.value = false
  }
})

function clearNotice() {
  notice.value = ''
}

function changeQuantity(delta) {
  quantity.value = Math.min(maxQuantity.value, Math.max(1, quantity.value + delta))
  clearNotice()
}

function openReview(review) {
  reviewImageIndex.value = 0
  activeReview.value = review
  reviewDialog.value.showModal()
}

function selectTab(event, index) {
  const last = tabs.length - 1
  const next = {
    ArrowLeft: (index + last) % tabs.length,
    ArrowRight: (index + 1) % tabs.length,
    Home: 0,
    End: last,
  }[event.key]
  if (next === undefined) return
  event.preventDefault()
  tab.value = tabs[next].id
  event.currentTarget.parentElement.children[next].focus()
}

function toggleProductWish() {
  if (!session.member) {
    router.push({ name: 'Login' })
    return
  }
  toggleWish(product.value)
}

async function order(buyNow) {
  if (!session.member) {
    router.push({ name: 'Login' })
    return
  }

  clearNotice()
  if (buyNow) {
    if (!canOrder.value || !Number.isFinite(product.value.price) || quantity.value > maxQuantity.value) return
    startCheckout([cartLine(product.value, quantity.value)])
    router.push({ name: 'Checkout' })
    return
  }
  try {
    await addProductToCart(product.value, quantity.value)
    cartDialog.value.showModal()
  } catch (error) {
    notice.value = error.message
  }
}
</script>

<template>
  <main class="site-container product-detail" :aria-busy="status === 'loading'">
    <div v-if="status === 'loading'" class="state-shell">
      <p role="status" class="loading-text">상품 정보를 불러오는 중이에요.</p>
      <div class="product-overview" aria-hidden="true">
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton-lines">
          <div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>
        </div>
      </div>
    </div>

    <div v-else-if="status !== 'ready'" class="state-message">
      <template v-if="status === 'missing'">
        <h1>해당 상품을 찾을 수 없어요</h1>
        <p>상품이 삭제되었거나 판매가 종료됐을 수 있어요.</p>
        <RouterLink class="action outline" :to="{ name: 'Products' }">상품 목록으로 돌아가기</RouterLink>
      </template>
      <template v-else>
        <h1>상품 정보를 불러오지 못했어요</h1>
        <p>잠시 후 다시 시도해주세요.</p>
        <button type="button" class="action primary" @click="retry++">다시 시도하기</button>
      </template>
    </div>

    <template v-else>
      <div class="product-overview">
        <div class="gallery" :class="{ 'has-thumbnails': images.length > 1 }">
          <ul v-if="images.length > 1" class="thumbnails" aria-label="상품 이미지 목록">
            <li v-for="(image, index) in images" :key="index">
              <button type="button" :aria-pressed="image.url === currentImage?.url" :aria-label="`상품 이미지 ${index + 1} 보기`" @click="selectedImage = image.url">
                <img :src="image.url" alt="" @error="failedImages.add(image.url)" />
              </button>
            </li>
          </ul>
          <div class="main-image">
            <img v-if="currentImage" :key="currentImage.url" :src="currentImage.url" :alt="currentImage.alt_text || product.name" @error="failedImages.add(currentImage.url)" />
            <div v-else class="image-placeholder">
              <img :src="placeholder" alt="" />
              <span>이미지 준비 중</span>
            </div>
          </div>
        </div>

        <section class="summary" aria-labelledby="product-title">
          <span v-if="category" class="category">{{ category.name }}</span>
          <h1 id="product-title">{{ product.name }}</h1>
          <p class="price">{{ won(product.price) }}</p>

          <p v-if="soldOut" class="stock-badge" role="status">품절</p>
          <p v-if="product.summary" class="description">{{ product.summary }}</p>

          <div class="purchase-fields">
            <div class="field-row">
              <span id="quantity-label">수량</span>
              <div class="quantity-row">
                <div class="quantity" role="group" aria-labelledby="quantity-label">
                  <button type="button" aria-label="수량 줄이기" :disabled="!maxQuantity || quantity <= 1" @click="changeQuantity(-1)">−</button>
                  <output aria-live="polite">{{ quantity }}</output>
                  <button type="button" aria-label="수량 늘리기" :disabled="quantity >= maxQuantity" @click="changeQuantity(1)">+</button>
                </div>
                <span v-if="lowStock" class="stock-remaining">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5 12 12l8-4.5M12 12v9" />
                  </svg>
                  단 {{ maxQuantity }}개 남음
                </span>
              </div>
            </div>
          </div>
          <div class="total"><span>선택 상품 총금액</span><strong>{{ won(product.price * quantity) }}</strong></div>
          <p v-if="lowStock" class="stock-notice" role="status">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5 12 12l8-4.5M12 12v9" />
            </svg>
            <span>품절 임박 · 구매 전 재고를 확인해 주세요</span>
          </p>
          <div class="purchase-actions">
            <button type="button" class="action outline wish" :aria-pressed="wished" :disabled="wishBusy || wishLoading" @click="toggleProductWish">
              찜하기
            </button>
            <button type="button" class="action outline" :disabled="!canOrder || cartBusy || cartLoading" :aria-haspopup="session.member ? 'dialog' : undefined" @click="order(false)">장바구니 담기</button>
            <button type="button" class="action primary" :disabled="!canOrder || cartBusy || cartLoading" @click="order(true)">바로 구매하기</button>
          </div>
          <p v-if="notice" class="notice" role="status">{{ notice }}</p>
          <dialog ref="cartDialog" class="cart-dialog" aria-labelledby="cart-dialog-title">
            <h2 id="cart-dialog-title">장바구니에 담았어요.</h2>
            <form method="dialog" class="cart-dialog-actions">
              <button type="submit" class="action outline" autofocus>닫기</button>
              <RouterLink class="action primary" :to="{ name: 'MyPageCart' }" @click="cartDialog.close()">장바구니 보기</RouterLink>
            </form>
          </dialog>
        </section>
      </div>

      <div class="detail-tabs" role="tablist" aria-label="상품 정보">
        <button v-for="(item, index) in tabs" :id="`tab-${item.id}`" :key="item.id" type="button" role="tab" :aria-selected="tab === item.id" :tabindex="tab === item.id ? 0 : -1" :aria-controls="`panel-${item.id}`" @click="tab = item.id" @keydown="selectTab($event, index)">
          {{ item.label }}<template v-if="item.id === 'reviews' && reviewCount != null"> ({{ reviewCount }})</template>
        </button>
      </div>
      <section v-show="tab === 'details'" id="panel-details" class="detail-panel" role="tabpanel" aria-labelledby="tab-details" tabindex="0">
        <h2>상품 상세정보</h2>
        <p v-if="product.description" class="description">{{ product.description }}</p>
        <p v-else>등록된 상품 상세정보가 없어요.</p>
        <dl v-if="development.mockEnabled && product.facts" class="detail-facts">
          <div v-for="(value, label) in product.facts" :key="label">
            <dt>{{ label }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </section>
      <section v-show="tab === 'reviews'" id="panel-reviews" class="detail-panel" role="tabpanel" aria-labelledby="tab-reviews" tabindex="0">
        <h2>상품 후기</h2>
          <div class="review-summary">
            <div>
              <span>평균 별점</span>
              <strong>{{ averageRating ?? '—' }}</strong>
              <span v-if="averageRating">/ 5</span>
            </div>
            <span v-if="reviewCount != null">전체 후기 {{ reviewCount }}건</span>
          </div>

          <p v-if="reviewLoading" class="activity-empty" role="status">후기를 불러오고 있어요.</p>
          <p v-if="reviewError" class="activity-empty">{{ reviewError }} <button type="button" class="action outline" @click="reviewRetry++">다시 시도</button></p>
          <div v-if="reviews.length" class="review-list">
            <article v-for="review in reviews" :key="review.id" class="activity-panel review-entry">
              <button type="button" class="review-card" :class="{ 'has-photo': review.images?.length }" aria-haspopup="dialog" aria-label="구매 후기 상세 보기" @click="openReview(review)">
                <span v-if="review.images?.length" class="review-preview">
                  <img :src="review.images[0].url" :alt="review.images[0].altText || '구매 후기 사진'" loading="lazy" />
                  <span v-if="review.images.length > 1">+{{ review.images.length - 1 }}</span>
                </span>
                <span class="review-main">
                  <span class="review-heading">
                    <strong class="review-author">{{ review.authorName || '구매 회원' }}</strong>
                    <span class="review-score"><ReviewRating :rating="review.rating" /><span v-if="review.rating != null" class="review-score-number" aria-hidden="true">{{ Number(review.rating).toFixed(1) }}</span></span>
                    <span class="review-purchase-meta">
                      <time :datetime="review.date">{{ review.date?.replaceAll('-', '.') }}</time>
                      <span class="review-buyer-badge">구매자</span>
                      <span class="review-more" aria-hidden="true">⋮</span>
                    </span>
                  </span>
                  <span class="review-copy">{{ review.content }}</span>
                  <span v-if="review.reply" class="review-reply review-card-reply">
                    <svg class="review-reply-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 18 3 21v-6a8 8 0 1 1 4 3Z" /><circle cx="8" cy="10" r=".8" fill="currentColor" /><circle cx="12" cy="10" r=".8" fill="currentColor" /><circle cx="16" cy="10" r=".8" fill="currentColor" /></svg>
                    <span class="review-reply-body">
                      <span class="review-reply-heading"><strong>오이시담 관리자</strong><time v-if="review.replyDate" :datetime="review.replyDate">{{ review.replyDate.replaceAll('-', '.') }}</time></span>
                      <span class="review-reply-copy">{{ review.reply }}</span>
                    </span>
                  </span>
                </span>
              </button>
            </article>
          </div>
          <p v-else-if="!reviewLoading && !reviewError" class="activity-empty">아직 등록된 후기가 없어요.</p>
          <Pagination v-if="!development.mockEnabled" v-model="reviewPage" :page-count="reviewPages" :disabled="reviewLoading" label="상품 후기 페이지" />
          <dialog ref="reviewDialog" class="review-dialog" aria-labelledby="review-dialog-title">
            <header class="review-dialog-header">
              <h2 id="review-dialog-title">상품 후기 상세</h2>
              <form method="dialog">
                <button type="submit" class="review-dialog-close" aria-label="후기 상세 닫기" autofocus>×</button>
              </form>
            </header>
            <div v-if="activeReview" class="review-dialog-body">
              <div class="review-dialog-product">
                <img v-if="primaryImage" :src="primaryImage.url" :alt="product.name" />
                <div>
                  <strong class="review-product-name">{{ product.name }}</strong>
                  <div class="review-dialog-meta">
                    <ReviewRating :rating="activeReview.rating" />
                    <time :datetime="activeReview.date">{{ activeReview.date?.replaceAll('-', '.') }}</time>
                  </div>
                  <span class="review-dialog-author">{{ activeReview.authorName || '구매 회원' }}</span>
                </div>
              </div>
              <p class="review-copy">{{ activeReview.content }}</p>
              <div v-if="activeReviewImage" class="review-dialog-gallery" role="region" aria-label="후기 첨부 사진">
                <div class="review-dialog-slide">
                  <img :src="activeReviewImage.url" :alt="activeReviewImage.altText || `후기 첨부 사진 ${reviewImageIndex + 1}`" />
                  <button type="button" class="review-image-arrow previous" aria-label="이전 사진" :disabled="activeReview.images.length < 2" @click="reviewImageIndex = (reviewImageIndex - 1 + activeReview.images.length) % activeReview.images.length">‹</button>
                  <button type="button" class="review-image-arrow next" aria-label="다음 사진" :disabled="activeReview.images.length < 2" @click="reviewImageIndex = (reviewImageIndex + 1) % activeReview.images.length">›</button>
                </div>
                <p class="review-image-count" aria-live="polite">{{ reviewImageIndex + 1 }} / {{ activeReview.images.length }}</p>
              </div>
              <div v-if="activeReview.reply" class="review-dialog-reply">
                <div class="review-reply-heading">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 18 3 21v-6a8 8 0 1 1 4 3Z" /><path d="M7 10h2m2 0h2m2 0h2" /></svg>
                  <strong>오이시담 관리자 답변</strong>
                  <time v-if="activeReview.replyDate" :datetime="activeReview.replyDate">{{ activeReview.replyDate.replaceAll('-', '.') }}</time>
                </div>
                <p>{{ activeReview.reply }}</p>
              </div>
            </div>
            <footer class="review-dialog-footer"><form method="dialog"><button type="submit" class="review-dialog-confirm">확인</button></form></footer>
          </dialog>
      </section>
      <section v-show="tab === 'customs'" id="panel-customs" class="detail-panel" role="tabpanel" aria-labelledby="tab-customs" tabindex="0">
        <h2>해외배송 통관 안내</h2>
        <dl class="customs-guide">
          <div>
            <dt>개인통관고유부호</dt>
            <dd>해외에서 개인 물품을 받을 때 세관이 수입자를 확인하는 데 사용하는 부호예요.</dd>
          </div>
          <div>
            <dt>수령인 정보</dt>
            <dd>주문자와 받는 분이 다르면 실제 수령인의 개인통관고유부호, 이름, 연락처를 사용해 주세요. 배송지 우편번호도 관세청에 등록한 주소와 일치하는지 확인해 주세요. 정보가 다르면 통관과 배송이 늦어질 수 있어요.</dd>
          </div>
          <div>
            <dt>관세·부가세</dt>
            <dd>주문 금액과 상품 종류에 따라 관세나 부가세가 발생할 수 있어요.</dd>
          </div>
        </dl>
        <a class="action outline customs-link" href="https://www.customs.go.kr/kcs/ad/cntnts/cntntsView.do?cntntsId=10220&amp;mi=10220" target="_blank" rel="noopener noreferrer">관세청 발급·조회 안내</a>
      </section>
    </template>
  </main>
  <AlertDialog :message="reviewNotice" @close="reviewNotice = ''" />
</template>

<style scoped src="../styles/mypage-activity.css"></style>
<style scoped>
.detail-facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 18px 24px; margin-top: 24px; padding: 20px; border-radius: 10px; background: var(--color-background); }
.detail-facts dt { color: var(--color-primary); font-size: var(--font-size-body); font-weight: 700; }
.detail-facts dd { margin-top: 4px; }
.review-summary { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 18px; margin-bottom: 12px; padding: 10px 16px; border-radius: 10px; background: var(--color-background); font-size: 14px; }
.review-summary > div { display: flex; align-items: baseline; gap: 8px; }
.review-summary strong { color: var(--color-primary); font-size: 1.25rem; }
.review-list { display: grid; gap: 14px; }
.review-entry { padding: 0; border: 1px solid #eee5e9; border-radius: 12px; background: var(--color-white); overflow: hidden; }
.review-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  width: 100%;
  padding: 12px 18px;
  border: 0;
  border-radius: inherit;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.review-card.has-photo { grid-template-columns: 128px minmax(0, 1fr); }
.review-card:hover { background: #fffcfd; }
.review-card:focus-visible { outline: 2px solid var(--color-primary); outline-offset: -2px; }
.review-main { display: grid; gap: 6px; min-width: 0; }
.review-card .review-main { align-content: start; gap: 5px; }
.review-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 20px; min-height: 24px; }
.review-author { color: var(--color-text); font-size: 16px; font-weight: 700; }
.review-score { display: inline-flex; align-items: center; gap: 12px; }
.review-score :deep(.review-rating-stars svg) { width: 15px; height: 15px; }
.review-score :deep(.review-rating-display > span:last-child) { display: none; }
.review-score-number { font-size: 15px; color: var(--color-secondary); }
.review-purchase-meta { display: inline-flex; align-items: center; gap: 14px; margin-left: auto; color: var(--color-secondary); font-size: 13px; }
.review-buyer-badge { padding: 3px 10px; border-radius: 999px; color: #ad627c; background: #faf0f4; font-size: 12px; }
.review-more { font-size: 24px; line-height: 1; color: #8c8189; }
.review-card .review-copy { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; max-width: 68ch; font-size: 16px; line-height: 1.6; color: #696773; word-break: normal; overflow-wrap: break-word; }
.review-product-name { font-weight: 700; overflow-wrap: anywhere; }
.review-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; color: var(--color-secondary); font-size: var(--font-size-label); }
.review-stars { color: var(--color-primary); letter-spacing: .08em; }
.review-copy { color: var(--color-text); font-size: var(--font-size-body); white-space: pre-wrap; overflow-wrap: anywhere; }
.review-preview {
  position: relative;
  align-self: start;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  background: var(--color-background);
}
.review-preview img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
.review-preview > span {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 3px 7px;
  border-radius: 6px 0 0;
  background: rgb(32 24 28 / 80%);
  color: #fff;
  font-size: var(--font-size-label);
}
.review-reply { display: grid; grid-column: 1 / -1; gap: 4px; padding: 10px 12px; border-radius: 8px; background: var(--color-background); font-size: var(--font-size-table); overflow-wrap: anywhere; }
.review-reply strong { color: var(--color-secondary); }
.review-card-reply { grid-template-columns: 18px minmax(0, 1fr); gap: 10px; margin-top: 6px; padding: 10px 12px; border-radius: 10px; background: #fbf5f8; font-size: 15px; line-height: 1.5; }
.review-reply-icon { width: 18px; height: 18px; margin-top: 2px; color: var(--color-primary); }
.review-reply-body { display: grid; gap: 4px; min-width: 0; color: #696773; white-space: pre-wrap; }
.review-reply-heading { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; }
.review-reply-heading strong { color: var(--color-text); font-weight: 700; }
.review-reply-heading time { padding-left: 14px; border-left: 1px solid #e6dce2; color: #98909c; font-size: 13px; line-height: 1; }
.review-card-reply .review-reply-heading strong { font-size: 14px; }
.review-reply-copy { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; max-width: 72ch; }
@media (max-width: 680px) {
  .review-card { padding: 14px; gap: 12px; }
  .review-card.has-photo { grid-template-columns: 80px minmax(0, 1fr); }
  .review-heading { gap: 6px 10px; }
  .review-author { font-size: 16px; }
  .review-purchase-meta { width: 100%; margin-left: 0; gap: 8px; }
  .review-more { margin-left: auto; }
  .review-card-reply { padding: 12px; gap: 8px; }
}
@media (max-width: 420px) {
  .review-card.has-photo { grid-template-columns: minmax(0, 1fr); }
  .review-preview { width: 96px; }
}
.review-dialog {
  position: fixed;
  inset: 0;
  width: min(540px, calc(100% - 24px));
  max-height: min(760px, calc(100dvh - 32px));
  margin: auto;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-white);
  color: var(--color-text);
  box-shadow: 0 16px 40px rgb(57 44 50 / 20%);
}
.review-dialog[open] { display: flex; flex-direction: column; overflow: hidden; }
.review-dialog::backdrop { background: rgb(51 35 45 / 25%); backdrop-filter: blur(3px); }
.review-dialog-header { display: flex; flex: 0 0 auto; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 20px; border-bottom: 1px solid #f0e5eb; background: #fcf5f8; }
.review-dialog .review-dialog-header h2 { margin: 0; font-size: 18px; font-weight: 700; }
.review-dialog-close { display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 0; background: transparent; color: var(--color-text); font-size: 25px; line-height: 1; cursor: pointer; }
.review-dialog-body { min-height: 0; overflow-y: auto; padding: 20px; overscroll-behavior: contain; }
.review-dialog-product { display: flex; align-items: start; gap: 12px; margin-bottom: 14px; }
.review-dialog-product > img { flex: 0 0 auto; width: 52px; height: 52px; border-radius: 5px; object-fit: cover; background: var(--color-background); }
.review-dialog-product > div { min-width: 0; }
.review-dialog-product .review-product-name { display: block; font-size: 16px; line-height: 1.5; }
.review-dialog-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.review-dialog-meta :deep(.review-rating-display > span:last-child) { display: none; }
.review-dialog-meta :deep(.review-rating-stars svg) { width: 15px; height: 15px; }
.review-dialog-meta time, .review-dialog-author { font-size: 13px; color: #8b808c; }
.review-dialog-author { display: block; margin-top: 2px; }
.review-dialog-body > .review-copy { margin: 0 0 16px; font-size: 16px; line-height: 1.7; }
.review-dialog-slide { position: relative; display: grid; place-items: center; height: clamp(170px, 36dvh, 280px); overflow: hidden; border-radius: 7px; background: #fdf6f9; }
.review-dialog-slide > img { display: block; width: 100%; height: 100%; min-height: 0; object-fit: contain; }
.review-image-arrow { position: absolute; top: 50%; transform: translateY(-50%); display: grid; place-items: center; width: 28px; height: 28px; padding: 0 0 2px; border: 1px solid #f1e4e9; border-radius: 50%; background: rgb(255 255 255 / 95%); color: var(--color-primary); font-size: 25px; line-height: 1; cursor: pointer; box-shadow: 0 2px 6px #392c3210; }
.review-image-arrow.previous { left: 8px; }
.review-image-arrow.next { right: 8px; }
.review-image-arrow:disabled { opacity: .45; cursor: default; }
.review-image-count { margin: 7px 0 14px; color: #8b808c; font-size: 11px; text-align: center; }
.review-dialog-reply { padding: 14px; border-radius: 7px; background: #fbf0f5; }
.review-dialog-reply .review-reply-heading { gap: 6px 8px; font-size: 14px; }
.review-dialog-reply svg { width: 15px; height: 15px; color: var(--color-primary); }
.review-dialog-reply time { padding-left: 8px; font-size: 13px; }
.review-dialog-reply p { margin: 6px 0 0 23px; font-size: 15px; line-height: 1.65; white-space: pre-wrap; overflow-wrap: anywhere; }
.review-dialog-footer { flex: 0 0 auto; display: flex; justify-content: flex-end; padding: 12px 16px; border-top: 1px solid #f0e5eb; background: #fffcfd; }
.review-dialog-confirm { min-width: 100px; padding: 8px 20px; border: 0; border-radius: 8px; background: #b7476a; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; }
.review-dialog button:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; }
.product-detail { padding: 26px 0 74px; }
.cart-dialog {
  position: fixed;
  inset: 0;
  width: min(380px, calc(100% - 32px));
  margin: auto;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-white);
  color: var(--color-text);
  box-shadow: 0 16px 40px rgb(57 44 50 / 20%);
  text-align: center;
}
.cart-dialog::backdrop { background: rgb(32 24 28 / 55%); }
.cart-dialog h2 { font-size: var(--font-size-section); font-weight: 700; }
.cart-dialog-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 20px; }
.cart-dialog-actions > * { flex: 1 1 auto; }
.product-overview { display: grid; grid-template-columns: 1.04fr 1fr; align-items: start; gap: clamp(24px, 4vw, 42px); }
.gallery { display: grid; min-width: 0; gap: 14px; }
.gallery.has-thumbnails { grid-template-columns: 62px minmax(0, 1fr); }
.thumbnails { display: grid; gap: 10px; max-height: 450px; overflow: auto; padding: 2px; margin: 0; list-style: none; }
.thumbnails button { display: block; width: 100%; aspect-ratio: 1; padding: 3px; border: 1px solid var(--color-border); border-radius: 9px; background: var(--color-white); cursor: pointer; }
.thumbnails button[aria-pressed="true"] { border-color: var(--color-primary); }
.thumbnails img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 5px; }
.main-image { display: grid; place-items: center; overflow: hidden; aspect-ratio: 1; border-radius: 12px; background: var(--color-background); }
.main-image > img { display: block; width: 100%; height: 100%; min-height: 0; object-fit: contain; }
.image-placeholder { display: grid; justify-items: center; gap: 10px; color: var(--color-secondary); font-size: var(--font-size-label); }
.image-placeholder img { width: 54px; height: 54px; object-fit: contain; }
.category { display: inline-block; padding: 4px 10px; border-radius: 6px; background: var(--color-accent); color: var(--color-text); font-size: var(--font-size-table); font-weight: 600; }
.summary h1, .state-message h1 { margin: 8px 0 4px; color: var(--color-text); font-size: clamp(1.5rem, 3vw, 1.75rem); font-weight: 800; line-height: 1.3; overflow-wrap: anywhere; }
.summary h1 { font-size: clamp(1.5rem, 3vw, 1.75rem); }
.price { margin: 10px 0 15px; color: var(--color-primary); font-size: 1.25rem; font-weight: 700; }
.stock-badge {
  display: inline-block;
  padding: 4px 9px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-background);
  color: var(--color-primary);
  font-size: var(--font-size-label);
  font-weight: 700;
}
.description { margin: 15px 0 0; white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.7; }
.purchase-fields { display: grid; gap: 10px; margin: 22px 0 16px; }
.field-row { display: grid; grid-template-columns: 48px minmax(0, 1fr); align-items: center; gap: 12px; font-size: var(--font-size-body); }
.field-row select, .quantity { min-height: 40px; border: 1px solid var(--color-border); border-radius: 8px; }
.field-row select { width: 100%; padding: 0 10px; background: var(--color-white); color: inherit; font: inherit; font-size: var(--font-size-control); }
.quantity { display: grid; grid-template-columns: 38px 44px 38px; justify-self: start; align-items: stretch; overflow: hidden; text-align: center; }
.quantity button { border: 0; background: var(--color-background); color: var(--color-text); font: inherit; font-size: var(--font-size-control); cursor: pointer; }
.quantity output { align-self: center; font-weight: 600; }
.total { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding-top: 14px; border-top: 1px solid var(--color-border); font-size: var(--font-size-body); }
.total strong { color: var(--color-primary); font-size: 1.25rem; }
.quantity-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
.stock-remaining {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border-radius: 999px;
  background: #f7e7eb;
  color: #8b354e;
  font-size: var(--font-size-table);
  font-weight: 700;
  white-space: nowrap;
}
.stock-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 14px 12px;
  border-radius: 8px;
  background: #f7e7eb;
  color: #8b354e;
  font-size: var(--font-size-body);
}
.stock-remaining svg,
.stock-notice svg {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.purchase-actions { display: grid; grid-template-columns: auto repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 14px; }
.action { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 8px 12px; border: 1px solid var(--color-primary); border-radius: 8px; font: inherit; font-size: var(--font-size-control); font-weight: 700; text-align: center; cursor: pointer; }
.outline { background: var(--color-white); color: var(--color-primary); }
.wish[aria-pressed="true"] { background: var(--color-accent); }
.primary { background: var(--color-primary); color: var(--color-white); }
.action:disabled, .quantity button:disabled { opacity: .5; cursor: default; }
.notice { margin-top: 10px; color: var(--color-secondary); font-size: var(--font-size-body); }
.detail-tabs { display: flex; gap: 12px; margin-top: 38px; border-bottom: 1px solid var(--color-border); }
.detail-tabs button { padding: 12px clamp(8px, 3vw, 26px); border: 0; border-bottom: 3px solid transparent; background: var(--color-white); color: var(--color-secondary); font: inherit; font-size: var(--font-size-control); cursor: pointer; }
.detail-tabs button[aria-selected="true"] { border-color: var(--color-primary); color: var(--color-primary); font-weight: 700; }
.detail-panel { min-height: 160px; padding: 26px 0; }
.customs-guide { display: grid; gap: 0; max-width: 720px; }
.customs-guide > div { padding: 12px 0; border-bottom: 1px solid var(--color-border); }
.customs-guide dt { color: var(--color-primary); font-weight: 700; }
.customs-guide dd { margin: 4px 0 0; line-height: 1.65; }
.detail-panel .customs-link { margin-top: 18px; }
.detail-panel h2 { margin-bottom: 12px; font-size: var(--font-size-section); font-weight: 700; }
.detail-panel .action { margin-top: 12px; }
.state-message { padding: 78px 0; text-align: center; }
.state-message p { margin: 12px 0 22px; color: var(--color-secondary); }
.loading-text { margin-bottom: 16px; color: var(--color-secondary); font-size: var(--font-size-body); }
.skeleton { border-radius: 10px; background: var(--color-accent); animation: pulse 1.5s ease-in-out infinite alternate; }
.skeleton-image { aspect-ratio: 1; }
.skeleton-lines { display: grid; gap: 16px; padding-top: 12px; }
.skeleton-lines div { height: 18px; }
.skeleton-lines div:first-child { width: 55%; height: 32px; }
.skeleton-lines div:last-child { width: 72%; }
@keyframes pulse { from { opacity: .38; } to { opacity: .75; } }
@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; } }
@media (max-width: 680px) {
  .product-overview { grid-template-columns: 1fr; }
  .gallery.has-thumbnails { grid-template-columns: minmax(0, 1fr); }
  .thumbnails { grid-row: 2; display: flex; }
  .thumbnails li { flex: 0 0 54px; }
  .detail-tabs { gap: 0; }
  .detail-tabs button { flex: 1; min-width: 0; padding-inline: 4px; font-size: var(--font-size-control); }
}
</style>
