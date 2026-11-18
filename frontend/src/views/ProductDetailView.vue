<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import placeholder from '../assets/images/favicon-mark.png'
import { development } from '../config/development.js'
import { categories } from '../data/categories.js'
import { getProduct } from '../services/catalog.js'
import { getProductReviews } from '../services/reviews.js'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import { addProductToCart, cartLine, cartBusy, cartLoading } from '../stores/cart.js'
import { startCheckout } from '../stores/checkout.js'
import { session } from '../stores/session.js'
import { toggleWish, wishedIds, wishBusy, wishLoading } from '../stores/wishlist.js'

const tabs = [
  { id: 'details', label: '상품 상세정보' },
  { id: 'reviews', label: '상품 리뷰' },
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
const serverReviews = ref([])
const reviewPage = ref(1)
const reviewTotal = ref(null)
const reviewPages = ref(0)
const reviewLoading = ref(false)
const reviewError = ref('')
const reviewNotice = ref('')
const reviewRetry = ref(0)
const formatter = new Intl.NumberFormat('ko-KR')
const won = (price) => Number.isFinite(price) ? `${formatter.format(price)}원` : '가격 확인 필요'

const category = computed(() => categories.find((item) => item.category_id === String(product.value?.category_id)))
const images = computed(() => (product.value?.images ?? []).filter((image) => image.url && !failedImages.value.has(image.url)))
const primaryImage = computed(() => images.value.find((image) => image.is_primary) ?? images.value[0])
const currentImage = computed(() => images.value.find((image) => image.url === selectedImage.value) ?? primaryImage.value)
const reviews = computed(() => development.mockEnabled ? product.value?.reviews ?? [] : serverReviews.value)
const reviewCount = computed(() => development.mockEnabled ? reviews.value.length : reviewTotal.value)
const averageRating = computed(() => {
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
      const detail = await getProduct(id, { signal: controller.signal })
      if (controller.signal.aborted) return
      product.value = detail
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
  if (!id) { serverReviews.value = []; reviewTotal.value = null; reviewPages.value = 0; return }
  if (development.mockEnabled || tab.value !== 'reviews') return
  reviewLoading.value = true
  serverReviews.value = []
  try {
    const result = await getProductReviews(id, reviewPage.value - 1, { signal: controller.signal })
    if (controller.signal.aborted) return
    if (reviewPage.value > 1 && reviewPage.value > result.totalPages) { reviewPage.value = Math.max(1, result.totalPages); return }
    serverReviews.value = result.content
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
        <h2>상품 리뷰</h2>
          <div class="review-summary">
            <div v-if="development.mockEnabled">
              <span>평균 별점</span>
              <strong><span aria-hidden="true">★</span> {{ averageRating ?? '—' }}</strong>
              <span v-if="averageRating">/ 5</span>
            </div>
            <span v-if="reviewCount != null">전체 리뷰 {{ reviewCount }}건</span>
          </div>

          <p v-if="reviewLoading" class="activity-empty" role="status">리뷰를 불러오고 있어요.</p>
          <p v-if="reviewError" class="activity-empty">{{ reviewError }} <button type="button" class="action outline" @click="reviewRetry++">다시 시도</button></p>
          <div v-if="reviews.length" class="review-list">
            <article v-for="review in reviews" :key="review.id" class="activity-panel review-entry">
              <button type="button" class="review-card" aria-haspopup="dialog" @click="openReview(review)">
                <span class="review-main">
                  <strong class="review-product-name">{{ product.name }}</strong>
                  <span class="review-meta">
                    <span v-if="review.rating != null" class="review-stars" :aria-label="`5점 만점에 ${review.rating}점`">
                      <span aria-hidden="true">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
                    </span>
                    <time :datetime="review.date">{{ review.date }}</time>
                  </span>
                  <span class="review-copy">{{ review.content }}</span>
                </span>
                <span v-if="review.images?.length" class="review-preview">
                  <img :src="review.images[0].url" alt="" loading="lazy" />
                  <span>첨부 {{ review.images.length }}장</span>
                </span>
                <span v-if="review.reply" class="review-reply">
                  <strong>관리자 답변</strong>
                  <span>{{ review.reply }}</span>
                </span>
              </button>
            </article>
          </div>
          <p v-else-if="!reviewLoading && !reviewError" class="activity-empty">아직 등록된 리뷰가 없어요.</p>
          <Pagination v-if="!development.mockEnabled" v-model="reviewPage" :page-count="reviewPages" :disabled="reviewLoading" label="상품 리뷰 페이지" />
          <dialog ref="reviewDialog" class="review-dialog" aria-labelledby="review-dialog-title">
            <header class="review-dialog-header">
              <h2 id="review-dialog-title">상품 리뷰 상세</h2>
              <form method="dialog">
                <button type="submit" class="action outline" autofocus>닫기</button>
              </form>
            </header>
            <div v-if="activeReview" class="review-main">
              <strong class="review-product-name">{{ product.name }}</strong>
              <p class="review-meta">
                <span v-if="activeReview.rating != null" class="review-stars" :aria-label="`5점 만점에 ${activeReview.rating}점`">
                  <span aria-hidden="true">{{ '★'.repeat(activeReview.rating) }}{{ '☆'.repeat(5 - activeReview.rating) }}</span>
                </span>
                <time :datetime="activeReview.date">{{ activeReview.date }}</time>
              </p>
              <p class="review-copy">{{ activeReview.content }}</p>
              <ul v-if="activeReview.images?.length" class="review-gallery" aria-label="후기 첨부 이미지">
                <li v-for="(image, index) in activeReview.images" :key="index">
                  <img :src="image.url" :alt="image.altText || `후기 첨부 이미지 ${index + 1}`" loading="lazy" />
                </li>
              </ul>
              <div v-if="activeReview.reply" class="review-reply">
                <strong>관리자 답변</strong>
                <p>{{ activeReview.reply }}</p>
              </div>
            </div>
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
.review-summary { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 18px; margin-bottom: 14px; padding: 14px 16px; border-radius: 10px; background: var(--color-background); }
.review-summary > div { display: flex; align-items: baseline; gap: 8px; }
.review-summary strong { color: var(--color-primary); font-size: 1.25rem; }
.review-list { display: grid; gap: 8px; }
.review-entry { padding: 0; }
.review-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px 16px;
  width: 100%;
  padding: 14px;
  border: 0;
  border-radius: inherit;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.review-card:hover { background: var(--color-background); }
.review-card:focus-visible { outline: 2px solid var(--color-primary); outline-offset: -2px; }
.review-main { display: grid; gap: 6px; min-width: 0; }
.review-card .review-main { align-content: start; }
.review-product-name { font-weight: 700; overflow-wrap: anywhere; }
.review-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; color: var(--color-secondary); font-size: var(--font-size-label); }
.review-stars { color: var(--color-primary); letter-spacing: .08em; }
.review-copy { color: var(--color-text); font-size: var(--font-size-body); white-space: pre-wrap; overflow-wrap: anywhere; }
.review-preview {
  position: relative;
  align-self: start;
  width: clamp(76px, 18vw, 144px);
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
.review-dialog {
  position: fixed;
  inset: 0;
  width: min(680px, calc(100% - 32px));
  max-height: calc(100% - 32px);
  margin: auto;
  padding: clamp(16px, 4vw, 24px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-white);
  color: var(--color-text);
  box-shadow: 0 16px 40px rgb(57 44 50 / 20%);
}
.review-dialog::backdrop { background: rgb(32 24 28 / 55%); }
.review-dialog-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; }
.review-dialog .review-dialog-header h2 { margin: 0; }
.review-dialog .review-dialog-header .action { margin: 0; }
.review-gallery { display: grid; gap: 8px; margin: 8px 0; }
.review-gallery img { display: block; width: 100%; max-height: 65vh; object-fit: contain; background: var(--color-background); border-radius: 8px; }
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
