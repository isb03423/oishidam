<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReviewProduct from '../components/ReviewProduct.vue'
import placeholder from '../assets/images/favicon-mark.png'
import { development } from '../config/development.js'
import { categories } from '../data/categories.js'
import { getProduct } from '../services/catalog.js'
import { addVariantToCart, cartLine } from '../stores/cart.js'
import { startCheckout } from '../stores/checkout.js'
import { toggleWish, wishedIds } from '../stores/wishlist.js'

const tabs = [
  { id: 'details', label: '상품 상세정보' },
  { id: 'reviews', label: '상품 리뷰' },
  { id: 'inquiries', label: '상품 문의' },
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
const variantId = ref(null)
const quantity = ref(1)
const notice = ref('')
const cartAdded = ref(false)
const optionSelect = ref(null)
const formatter = new Intl.NumberFormat('ko-KR')
const won = (price) => Number.isFinite(price) ? `${formatter.format(price)}원` : '가격 확인 필요'

const category = computed(() => categories.find((item) => item.category_id === String(product.value?.category_id)))
const images = computed(() => (product.value?.images ?? []).filter((image) => image.url && !failedImages.value.has(image.url)))
const primaryImage = computed(() => images.value.find((image) => image.is_primary) ?? images.value[0])
const currentImage = computed(() => images.value.find((image) => image.url === selectedImage.value) ?? primaryImage.value)
const reviews = computed(() => development.mockEnabled ? product.value?.reviews ?? [] : [])
const averageRating = computed(() => reviews.value.length
  ? (reviews.value.reduce((sum, review) => sum + review.rating, 0) / reviews.value.length).toFixed(1)
  : null)
const reviewProduct = computed(() => ({
  name: product.value?.name,
  brand: product.value?.brand,
  imageUrl: primaryImage.value?.url,
}))
const variants = computed(() => (product.value?.variants ?? []).filter((variant) => variant.is_active))
const inStock = (variant) => variant.stock_quantity > 0
const soldOut = computed(() => product.value?.is_sold_out || (variants.value.length > 0 && !variants.value.some(inStock)))
const selected = computed(() => variants.value.find((variant) => variant.variant_id === variantId.value))
const maxQuantity = computed(() => soldOut.value ? 0 : selected.value?.stock_quantity ?? 0)
const canOrder = computed(() => !soldOut.value && variants.value.some(inStock))
const wished = computed(() => wishedIds.value.includes(product.value?.product_id))

watch(
  [() => route.params.productId, () => development.mockEnabled, () => development.scenario, retry],
  async ([id], _, onCleanup) => {
    if (!id) return
    const controller = new AbortController()
    onCleanup(() => controller.abort())
    status.value = 'loading'
    product.value = null
    tab.value = 'details'
    selectedImage.value = null
    failedImages.value.clear()
    variantId.value = null
    quantity.value = 1
    clearNotice()
    try {
      const detail = await getProduct(id, { signal: controller.signal })
      if (controller.signal.aborted) return
      product.value = detail
      if (variants.value.length === 1 && inStock(variants.value[0])) {
        variantId.value = variants.value[0].variant_id
      }
      status.value = detail ? 'ready' : 'missing'
    } catch (error) {
      if (!controller.signal.aborted) {
        status.value = error.status === 404 || error.code === 'PRODUCT_NOT_FOUND' ? 'missing' : 'failed'
      }
    }
  },
  { immediate: true },
)

function clearNotice() {
  notice.value = ''
  cartAdded.value = false
}

function changeOption() {
  quantity.value = 1
  clearNotice()
}

function changeQuantity(delta) {
  quantity.value = Math.min(maxQuantity.value, Math.max(1, quantity.value + delta))
  clearNotice()
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

function order(buyNow) {
  clearNotice()
  if (!selected.value) {
    notice.value = '상품 옵션을 선택해주세요.'
    optionSelect.value?.focus()
    return
  }
  if (buyNow) {
    if (!canOrder.value || !Number.isFinite(selected.value.price) || quantity.value > maxQuantity.value) return
    startCheckout([cartLine(product.value, selected.value, quantity.value)])
    router.push({ name: 'Checkout' })
    return
  }
  cartAdded.value = addVariantToCart(product.value, variantId.value, quantity.value)
  notice.value = cartAdded.value ? '장바구니에 담았어요.' : '장바구니에 담을 수 있는 재고 수량을 확인해주세요.'
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
          <p class="price">{{ won(selected?.price ?? product.min_price) }}</p>

          <dl class="stock">
            <dt>재고 현황</dt>
            <dd :class="{ 'sold-out': soldOut }">
              <template v-if="soldOut">품절</template>
              <template v-else-if="selected">재고 있음 ({{ maxQuantity }}개)</template>
              <template v-else-if="canOrder">옵션별 재고 확인</template>
              <template v-else>재고 정보 확인 필요</template>
            </dd>
          </dl>
          <p v-if="product.summary" class="description">{{ product.summary }}</p>

          <div class="purchase-fields">
            <div v-if="variants.length" class="field-row">
              <label for="product-option">옵션</label>
              <select id="product-option" ref="optionSelect" v-model="variantId" :disabled="soldOut" @change="changeOption">
                <option :value="null" disabled>옵션을 선택해주세요</option>
                <option v-for="variant in variants" :key="variant.variant_id" :value="variant.variant_id" :disabled="!inStock(variant)">
                  {{ variant.variant_name }} · {{ won(variant.price) }}{{ inStock(variant) ? '' : ' (품절)' }}
                </option>
              </select>
            </div>
            <div class="field-row">
              <span id="quantity-label">수량</span>
              <div class="quantity" role="group" aria-labelledby="quantity-label">
                <button type="button" aria-label="수량 줄이기" :disabled="!maxQuantity || quantity <= 1" @click="changeQuantity(-1)">−</button>
                <output aria-live="polite">{{ quantity }}</output>
                <button type="button" aria-label="수량 늘리기" :disabled="quantity >= maxQuantity" @click="changeQuantity(1)">+</button>
              </div>
            </div>
          </div>
          <div class="total"><span>선택 상품 총금액</span><strong>{{ selected ? won(selected.price * quantity) : '—' }}</strong></div>
          <div class="purchase-actions">
            <button type="button" class="action outline wish" :aria-pressed="wished" @click="toggleWish(product)">
              찜하기
            </button>
            <button type="button" class="action outline" :disabled="!canOrder" @click="order(false)">장바구니 담기</button>
            <button type="button" class="action primary" :disabled="!canOrder" @click="order(true)">바로 구매하기</button>
          </div>
          <p v-if="notice" class="notice" role="status">
            {{ notice }}
            <RouterLink v-if="cartAdded" :to="{ name: 'MyPageCart' }">장바구니 보기</RouterLink>
          </p>
        </section>
      </div>

      <div class="detail-tabs" role="tablist" aria-label="상품 정보">
        <button v-for="(item, index) in tabs" :id="`tab-${item.id}`" :key="item.id" type="button" role="tab" :aria-selected="tab === item.id" :tabindex="tab === item.id ? 0 : -1" :aria-controls="`panel-${item.id}`" @click="tab = item.id" @keydown="selectTab($event, index)">
          {{ item.label }}<template v-if="item.id === 'reviews' && development.mockEnabled"> ({{ reviews.length }})</template>
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
        <template v-if="development.mockEnabled">
          <div class="review-summary">
            <div>
              <span>평균 별점</span>
              <strong><span aria-hidden="true">★</span> {{ averageRating ?? '—' }}</strong>
              <span v-if="averageRating">/ 5</span>
            </div>
            <span>전체 리뷰 {{ reviews.length }}건</span>
          </div>

          <div v-if="reviews.length" class="review-list">
            <article v-for="review in reviews" :key="review.id" class="activity-panel review-card">
              <ReviewProduct :item="reviewProduct">
                <p>
                  <span class="review-stars" :aria-label="`5점 만점에 ${review.rating}점`">
                    <span aria-hidden="true">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
                  </span>
                  <time :datetime="review.date">{{ review.date }}</time>
                </p>
                <p class="review-copy">{{ review.content }}</p>
              </ReviewProduct>
              <div v-if="review.reply" class="review-reply">
                <strong>관리자 답변</strong>
                <p>{{ review.reply }}</p>
              </div>
            </article>
          </div>
          <p v-else class="activity-empty">아직 등록된 리뷰가 없어요.</p>
        </template>
        <p v-else>상품 리뷰 조회와 작성 기능을 준비 중이에요.</p>
      </section>
      <section v-show="tab === 'inquiries'" id="panel-inquiries" class="detail-panel" role="tabpanel" aria-labelledby="tab-inquiries" tabindex="0">
        <h2>상품 문의</h2>
        <p>상품별 문의 조회와 작성 기능을 준비 중이에요.</p>
        <button type="button" class="action outline" disabled>문의 작성</button>
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
</template>

<style scoped src="../styles/mypage-activity.css"></style>
<style scoped>
.detail-facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 18px 24px; margin-top: 24px; padding: 20px; border-radius: 10px; background: var(--color-background); }
.detail-facts dt { color: var(--color-primary); font-size: .875rem; font-weight: 700; }
.detail-facts dd { margin-top: 4px; }
.review-summary { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 18px; margin-bottom: 14px; padding: 14px 16px; border-radius: 10px; background: var(--color-background); }
.review-summary > div { display: flex; align-items: baseline; gap: 8px; }
.review-summary strong { color: var(--color-primary); font-size: 1.25rem; }
.review-list { display: grid; gap: 8px; }
.review-card { padding: 12px 14px; }
.review-stars { color: var(--color-primary); letter-spacing: .08em; }
.review-card .review-copy { color: var(--color-text); font-size: 13px; white-space: pre-wrap; }
.review-reply { margin-top: 10px; padding: 10px 12px; border-radius: 8px; background: var(--color-background); font-size: 13px; }
.review-reply strong { color: var(--color-secondary); }
.review-reply p { margin-top: 4px; }
.product-detail { padding: 26px 0 74px; }
.notice a { text-decoration: underline; }
.product-overview { display: grid; grid-template-columns: 1.04fr 1fr; align-items: start; gap: clamp(24px, 4vw, 42px); }
.gallery { display: grid; min-width: 0; gap: 14px; }
.gallery.has-thumbnails { grid-template-columns: 62px minmax(0, 1fr); }
.thumbnails { display: grid; gap: 10px; max-height: 450px; overflow: auto; padding: 2px; margin: 0; list-style: none; }
.thumbnails button { display: block; width: 100%; aspect-ratio: 1; padding: 3px; border: 1px solid var(--color-border); border-radius: 9px; background: var(--color-white); cursor: pointer; }
.thumbnails button[aria-pressed="true"] { border-color: var(--color-primary); }
.thumbnails img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 5px; }
.main-image { display: grid; place-items: center; overflow: hidden; aspect-ratio: 1; border-radius: 12px; background: var(--color-background); }
.main-image > img { display: block; width: 100%; height: 100%; min-height: 0; object-fit: contain; }
.image-placeholder { display: grid; justify-items: center; gap: 10px; color: var(--color-secondary); font-size: .875rem; }
.image-placeholder img { width: 54px; height: 54px; object-fit: contain; }
.category { display: inline-block; padding: 4px 10px; border-radius: 6px; background: var(--color-accent); color: var(--color-text); font-size: .8rem; font-weight: 600; }
.summary h1, .state-message h1 { margin: 8px 0 4px; color: var(--color-text); font-size: clamp(1.55rem, 3vw, 2rem); font-weight: 800; line-height: 1.3; overflow-wrap: anywhere; }
.summary h1 { font-size: clamp(1.25rem, 2.5vw, 1.5rem); }
.price { margin: 10px 0 15px; color: var(--color-primary); font-size: 1.25rem; font-weight: 700; }
.stock { display: flex; gap: 24px; border-block: 1px solid var(--color-border); padding: 12px 0; font-size: .9rem; }
.stock dd { color: var(--color-secondary); font-weight: 600; }
.stock .sold-out { color: var(--color-primary); }
.description { margin: 15px 0 0; white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.7; }
.purchase-fields { display: grid; gap: 10px; margin: 22px 0 16px; }
.field-row { display: grid; grid-template-columns: 48px minmax(0, 1fr); align-items: center; gap: 12px; font-size: .9rem; }
.field-row select, .quantity { min-height: 40px; border: 1px solid var(--color-border); border-radius: 8px; }
.field-row select { width: 100%; padding: 0 10px; background: var(--color-white); color: inherit; font: inherit; }
.quantity { display: grid; grid-template-columns: 38px 44px 38px; justify-self: start; align-items: stretch; overflow: hidden; text-align: center; }
.quantity button { border: 0; background: var(--color-background); color: var(--color-text); font: inherit; cursor: pointer; }
.quantity output { align-self: center; font-weight: 600; }
.total { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding-top: 14px; border-top: 1px solid var(--color-border); font-size: .9rem; }
.total strong { color: var(--color-primary); font-size: 1.25rem; }
.purchase-actions { display: grid; grid-template-columns: auto repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 14px; }
.action { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 8px 12px; border: 1px solid var(--color-primary); border-radius: 8px; font: inherit; font-weight: 700; text-align: center; cursor: pointer; }
.outline { background: var(--color-white); color: var(--color-primary); }
.wish[aria-pressed="true"] { background: var(--color-accent); }
.primary { background: var(--color-primary); color: var(--color-white); }
.action:disabled, .quantity button:disabled { opacity: .5; cursor: default; }
.notice { margin-top: 10px; color: var(--color-secondary); font-size: .875rem; }
.detail-tabs { display: flex; gap: 12px; margin-top: 38px; border-bottom: 1px solid var(--color-border); }
.detail-tabs button { padding: 12px clamp(8px, 3vw, 26px); border: 0; border-bottom: 3px solid transparent; background: var(--color-white); color: var(--color-secondary); font: inherit; font-size: .93rem; cursor: pointer; }
.detail-tabs button[aria-selected="true"] { border-color: var(--color-primary); color: var(--color-primary); font-weight: 700; }
.detail-panel { min-height: 160px; padding: 26px 0; }
.customs-guide { display: grid; gap: 0; max-width: 720px; }
.customs-guide > div { padding: 12px 0; border-bottom: 1px solid var(--color-border); }
.customs-guide dt { color: var(--color-primary); font-weight: 700; }
.customs-guide dd { margin: 4px 0 0; line-height: 1.65; }
.detail-panel .customs-link { margin-top: 18px; }
.detail-panel h2 { margin-bottom: 12px; font-size: 1.15rem; font-weight: 700; }
.detail-panel .action { margin-top: 12px; }
.state-message { padding: 78px 0; text-align: center; }
.state-message p { margin: 12px 0 22px; color: var(--color-secondary); }
.loading-text { margin-bottom: 16px; color: var(--color-secondary); font-size: .875rem; }
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
  .detail-tabs button { flex: 1; min-width: 0; padding-inline: 4px; font-size: .85rem; }
}
</style>
