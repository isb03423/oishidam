<script setup>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import ProductCard from '../components/product/ProductCard.vue'
import { getRecommendations } from '../services/catalog.js'
import { session } from '../stores/session.js'

const memberName = computed(() => session.member?.name || '오이시담')
const recommended = reactive({ items: [] })
let controller

onMounted(async () => {
  controller = new AbortController()
  try {
    const response = await getRecommendations({ signal: controller.signal, limit: 3 })
    recommended.items = Array.isArray(response?.items) ? response.items.slice(0, 3) : []
  } catch {
    recommended.items = []
  }
})

onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <MyPageLayout icon="member"
    class="mypage-overview"
    title="마이페이지"
    description="나의 쇼핑 정보를 한눈에 확인하세요."
    stretch-content
  >
    <section class="member-welcome" aria-label="회원 안내">
      <div class="member-avatar" aria-hidden="true">
        <svg viewBox="0 0 48 48"><circle cx="24" cy="16" r="8" /><path d="M10 40c1.8-8.2 7-12.3 14-12.3S36.2 31.8 38 40" /></svg>
      </div>
      <div class="member-message">
        <h2>{{ memberName }}님, 안녕하세요.</h2>
        <p>지금까지 오이시담과 함께한 쇼핑을 확인해보세요.</p>
      </div>
    </section>

    <div class="mypage-dashboard">
      <article class="dashboard-card delivery-card">
        <h2>주문/배송현황</h2>
        <div class="delivery-progress" aria-label="주문 및 배송 진행 단계">
          <div class="delivery-step is-complete">
            <span class="delivery-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14v12H5zM9 8V6a3 3 0 0 1 6 0v2" /></svg></span>
            <span>주문 완료</span>
          </div>
          <span class="progress-line is-active"></span>
          <div class="delivery-step is-complete">
            <span class="delivery-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5 12 12l8-4.5M12 12v9" /></svg></span>
            <span>상품 준비</span>
          </div>
          <span class="progress-line is-active"></span>
          <div class="delivery-step is-active">
            <span class="delivery-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h12v10H3zM15 10h3l3 3v4h-6zM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg></span>
            <span>배송 중</span>
          </div>
          <span class="progress-line"></span>
          <div class="delivery-step">
            <span class="delivery-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 12 3 3 7-7" /></svg></span>
            <span>배송 완료</span>
          </div>
        </div>
        <p>주문번호: 12345678<br />상품명: [예시] 맛있는 유기농 오이 외 2건</p>
      </article>

      <article class="dashboard-card ai-card">
        <h2>
          AI 추천 컬렉션
          <svg class="ai-title-sparkles" viewBox="62 6 16 16" aria-hidden="true">
            <path d="M67 7.75C67.35 7.75 67.6 8 67.7 8.35L68.1 9.9L69.65 10.3C70 10.4 70.25 10.65 70.25 11C70.25 11.35 70 11.6 69.65 11.7L68.1 12.1L67.7 13.65C67.6 14 67.35 14.25 67 14.25C66.65 14.25 66.4 14 66.3 13.65L65.9 12.1L64.35 11.7C64 11.6 63.75 11.35 63.75 11C63.75 10.65 64 10.4 64.35 10.3L65.9 9.9L66.3 8.35C66.4 8 66.65 7.75 67 7.75Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M72.5 11.25C72.85 11.25 73.1 11.45 73.25 11.8L74.25 14.75L77.2 15.75C77.55 15.9 77.75 16.15 77.75 16.5C77.75 16.85 77.55 17.1 77.2 17.25L74.25 18.25L73.25 21.2C73.1 21.55 72.85 21.75 72.5 21.75C72.15 21.75 71.9 21.55 71.75 21.2L70.75 18.25L67.8 17.25C67.45 17.1 67.25 16.85 67.25 16.5C67.25 16.15 67.45 15.9 67.8 15.75L70.75 14.75L71.75 11.8C71.9 11.45 72.15 11.25 72.5 11.25ZM72.5 14.9L71.925 16.5L72.5 18.1L73.075 16.5L72.5 14.9Z" />
          </svg>
        </h2>
        <div class="recommendation-items" aria-label="추천 상품 예시">
          <ProductCard
            v-for="product in recommended.items"
            :key="product.product_id"
            :product="product"
          />
        </div>
      </article>

      <RouterLink :to="{ name: 'MyPageWishlist' }" class="dashboard-card wishlist-card">
        <h2>찜한 상품</h2>
        <div class="wishlist-items" aria-label="찜한 상품 예시">
          <div class="wishlist-item tone-cream"></div>
          <div class="wishlist-item tone-rose"></div>
          <div class="wishlist-item tone-beige"></div>
          <div class="wishlist-item tone-mint"></div>
          <div class="wishlist-item tone-rose"></div>
          <div class="wishlist-item tone-cream"></div>
        </div>
      </RouterLink>
    </div>

    <section class="activity-bar" aria-label="회원 활동 바로가기">
      <strong>활동 내역</strong>
      <button type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v12H8l-3 3V4Z" /><path d="M8 8h8M8 12h5" /></svg>
        후기 작성 가능 (N건)
      </button>
      <button type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10h10.6l2-7H7.2M9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg>
        장바구니 (N건)
      </button>
      <RouterLink :to="{ name: 'MyPageAddress' }">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
        배송지 관리
      </RouterLink>
      <button type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v12H9l-4 4V4Z" /><path d="M10 9a2 2 0 1 1 3.7 1c-.7.6-1.7 1-1.7 2M12 14h.01" /></svg>
        1:1 문의 내역
      </button>
    </section>
  </MyPageLayout>
</template>

<style scoped>
.mypage-overview {
  --mypage-title-size-adjustment: 1px;
}

.member-welcome {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 145px;
  overflow: hidden;
  border: 1px solid #f2dfe3;
  border-radius: 15px;
  background: #fff8f9;
}

.member-brand {
  align-self: stretch;
  display: flex;
  align-items: center;
  width: 145px;
  padding-left: 28px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #c98d99, #ad6477);
  color: #fff;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: .04em;
  line-height: 1.35;
  clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
}

.member-message {
  padding: 20px 24px;
}

.member-message p {
  margin: 0;
  color: #685f63;
  font-size: 14px;
}

.member-message h2 {
  margin: 8px 0 10px;
  color: #21191c;
  font-size: 25px;
  line-height: 1.2;
}

.member-message .member-type {
  font-weight: 500;
}

.member-grade {
  position: absolute;
  top: 22px;
  right: 24px;
  padding: 5px 10px;
  border-radius: 99px;
  background: #ca929c;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.mypage-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.summary-card {
  display: flex;
  align-items: center;
  min-height: 88px;
  gap: 14px;
  padding: 17px 18px;
  border: 1px solid #eee5e8;
  border-radius: 14px;
  background: #fff;
  box-sizing: border-box;
}

.summary-card svg {
  width: 29px;
  height: 29px;
  flex: 0 0 29px;
  fill: none;
  stroke: var(--color-text);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.summary-card div {
  flex: 1;
}

.summary-card p {
  margin: 0 0 4px;
  color: #5f5559;
  font-size: 13px;
  font-weight: 600;
}

.summary-card strong {
  color: #21191c;
  font-size: 24px;
  line-height: 1;
}

.summary-card > span {
  color: var(--color-text);
  font-size: 29px;
  font-weight: 300;
  line-height: 1;
}

/* 회원 안내 배너 */
.member-welcome {
  min-height: 124px;
  gap: 18px;
  padding: 18px 24px;
  box-sizing: border-box;
  border-color: #ead1d8;
  background: #f7e7eb;
}

.member-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  flex: 0 0 76px;
  border: 1px solid #e7cdd4;
  border-radius: 50%;
  background: #fff7f8;
  color: var(--color-primary);
}

.member-avatar svg {
  width: 45px;
  height: 45px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.1;
  stroke-linecap: round;
}

.member-message {
  min-width: 0;
  padding: 0;
}

.member-message h2 {
  margin: 0 0 10px;
  color: var(--color-primary);
  font-size: 23px;
}

.member-message p {
  color: var(--color-text);
}

.member-grade {
  top: 18px;
  background: var(--color-primary);
}

/* 배송·AI 추천·찜한 상품 대시보드 */
.mypage-dashboard {
  display: grid;
  grid-template-columns: 1.15fr 1.3fr .8fr;
  gap: 12px;
  margin-top: 12px;
}

.dashboard-card {
  min-height: 170px;
  padding: 14px;
  border: 1px solid #e6dadd;
  border-radius: 14px;
  background: #fff;
  box-sizing: border-box;
}

.dashboard-card h2 {
  margin: 0 0 10px;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
}

.delivery-progress {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 6px 0 10px;
}

.delivery-card {
  display: flex;
  flex-direction: column;
}

.delivery-step {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #807579;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
}

.delivery-icon {
  display: grid;
  width: 25px;
  height: 25px;
  place-items: center;
  border: 1px solid #cfc3c7;
  border-radius: 50%;
  background: #fff;
}

.delivery-icon svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.delivery-step.is-complete,
.delivery-step.is-active {
  color: var(--color-primary);
}

.delivery-step.is-complete .delivery-icon,
.delivery-step.is-active .delivery-icon {
  border-color: var(--color-primary);
}

.delivery-step.is-active .delivery-icon {
  background: var(--color-primary);
  color: #fff;
}

.progress-line {
  align-self: flex-start;
  height: 1px;
  flex: 1;
  margin-top: 12px;
  background: #d8cdd0;
}

.progress-line.is-active {
  background: var(--color-primary);
}

.delivery-card > p {
  margin: auto 0 0;
  padding: 9px 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #fff;
  color: var(--color-text);
  font-size: 11px;
  line-height: 1.5;
  text-align: left;
}

.ai-card {
  border-radius: 16px;
  background: var(--ai-recommend-background);
  color: #fff;
}

.ai-card h2 {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 5px;
  color: inherit;
}

.ai-title-sparkles {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.recommendation-items {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
}

.recommendation-items :deep(.product-card) {
  border-radius: 9px;
}

.recommendation-items :deep(.product-image) {
  padding: 8px;
}

.recommendation-items :deep(.product-wish) {
  display: none;
}

.recommendation-items :deep(.product-info) {
  padding: 6px;
}

.recommendation-items :deep(.product-name) {
  margin-bottom: 2px;
  font-size: 10px;
  -webkit-line-clamp: 1;
}

.recommendation-items :deep(.product-price) {
  font-size: 11px;
}

.recommendation-item {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 104px;
  overflow: hidden;
  padding: 7px;
  border-radius: 9px;
  color: var(--color-text);
  font-size: 10px;
  line-height: 1.3;
  box-sizing: border-box;
}

.recommendation-item::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 50%;
  width: 42px;
  height: 47px;
  border: 2px solid rgba(57, 44, 50, .46);
  border-radius: 18px 18px 10px 10px;
  transform: translateX(-50%);
}

.recommendation-item span {
  position: relative;
  z-index: 1;
  padding: 3px 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, .8);
}

.tone-cream { background: #e8dfcf; }
.tone-rose { background: #e9d3d4; }
.tone-mint { background: #dce7df; }
.tone-beige { background: #e8ded5; }

.wishlist-items {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 5px;
}

.wishlist-card {
  display: flex;
  flex-direction: column;
}

.wishlist-item {
  min-height: 0;
  border-radius: 5px;
}

.wishlist-item::after {
  content: '';
  display: block;
  width: 60%;
  height: 70%;
  margin: 8px auto 0;
  border: 1px solid rgba(57, 44, 50, .25);
  border-radius: 50% 50% 8px 8px;
}

.activity-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 12px 14px;
  border: 1px solid #ded1d5;
  border-radius: 13px;
  background: #fff;
}

.activity-bar strong {
  margin-right: 0;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 500;
}

.activity-bar :is(button, a) {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.activity-bar :is(button, a) + :is(button, a) {
  margin-left: 0;
}

.activity-bar svg {
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.activity-bar :is(button, a):hover {
  color: var(--color-primary);
}

@media (min-width: 861px) {
  .mypage-dashboard {
    margin-bottom: 12px;
  }

  .activity-bar {
    margin-top: auto;
  }
}

@media (max-width: 860px) {
  .mypage-summary {
    grid-template-columns: 1fr;
  }

  .mypage-dashboard {
    grid-template-columns: 1fr;
  }

  .activity-bar {
    flex-wrap: wrap;
    gap: 12px 18px;
  }

  .activity-bar strong {
    margin-right: 0;
  }

  .activity-bar :is(button, a) + :is(button, a) {
    margin-left: 0;
  }
}

@media (max-width: 720px) {
  .member-brand {
    display: none;
  }

  .member-message {
    padding: 24px 20px;
  }

  .member-message h2 {
    font-size: 21px;
  }

  .member-grade {
    top: 16px;
    right: 16px;
  }
}
</style>
