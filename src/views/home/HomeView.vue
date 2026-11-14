<script setup>
import { onBeforeUnmount, reactive, watch } from 'vue'
import MainBanner from '../../components/home/MainBanner.vue'
import ProductSection from '../../components/product/ProductSection.vue'
import snacksImage from '../../assets/images/banners/snacks.png'
import drinksImage from '../../assets/images/banners/drinks.png'
import sweetsImage from '../../assets/images/banners/sweets.png'
import { getProducts, getRecommendations } from '../../services/catalog.js'
import { development } from '../../config/development.js'

// 추가 배너는 같은 형식으로 등록하면 슬라이드 버튼과 페이지 수에 반영됩니다.
const banners = [
  {
    id: 'snacks',
    title: "일본 과자와 함께\n달콤한 간식 시간",
    description: '바삭한 버터 쿠키부터 폭신한 도라야키까지.',
    buttonLabel: '스낵·과자 보기',
    image: snacksImage,
    imageAlt: '버터 쿠키와 단팥 도라야키',
    to: { name: 'Products', query: { categoryId: '76' } },
  },
  {
    id: 'drinks',
    title: "톡 쏘는 한 모금,\n향긋한 복숭아",
    description: '복숭아 탄산음료와 함께 일본 음료를 만나보세요.',
    buttonLabel: '음료 보기',
    image: drinksImage,
    imageAlt: '얼음과 복숭아 조각을 넣은 탄산음료',
    to: { name: 'Products', query: { categoryId: '81' } },
  },
  {
    id: 'sweets',
    title: "한입에 즐기는\n일본의 달콤한 맛",
    description: '상큼한 딸기 초콜릿과 고소한 호지차 초콜릿.',
    buttonLabel: '젤리·사탕·초콜릿 보기',
    image: sweetsImage,
    imageAlt: '딸기와 호지차 초콜릿 조각',
    to: { name: 'Products', query: { categoryId: '85' } },
  },
]

const recommended = reactive({ items: [], loading: true, error: '' })
const arrivals = reactive({ items: [], loading: true, error: '' })
let requestVersion = 0
let controller
async function loadProducts() {
  const version = ++requestVersion
  controller?.abort()
  controller = new AbortController()
  const signal = controller.signal
  async function loadSection(state, request) {
    state.loading = true
    state.error = ''
    state.items = []
    try {
      const response = await request()
      if (!Array.isArray(response?.items)) throw new Error('상품 응답 형식을 확인해주세요.')
      if (version === requestVersion) state.items = response.items.slice(0, 3)
    } catch (error) {
      if (version === requestVersion && !signal.aborted) state.error = error.message
    } finally {
      if (version === requestVersion) state.loading = false
    }
  }
  await Promise.all([
    loadSection(recommended, () => getRecommendations({ signal, limit: 3 })),
    loadSection(arrivals, () => getProducts({ sort: development.mockEnabled ? 'new' : undefined, size: 3 }, { signal })),
  ])
}
watch(() => [development.mockEnabled, development.scenario], loadProducts, { immediate: true })
onBeforeUnmount(() => {
  requestVersion++
  controller?.abort()
})
</script>

<template>
  <main class="home-page">
    <MainBanner :slides="banners" />
    <div class="home-products site-container">
      <ProductSection
        id="just-arrived"
        title="JUST ARRIVED"
        subtitle="지금 막 도착한 일본의 새로운 아이템"
        :more-to="{ path: '/products', query: { sort: 'new' } }"
        :products="arrivals.items"
        :loading="arrivals.loading"
        :error="arrivals.error"
        @retry="loadProducts"
      />
      <ProductSection
        id="picks-for-you"
        title="PICKS FOR YOU"
        subtitle="지금 가장 사랑받는 일본 직구 아이템"
        :more-to="{ path: '/products', query: { collection: 'recommended' } }"
        :products="recommended.items"
        :loading="recommended.loading"
        :error="recommended.error"
        @retry="loadProducts"
      />
    </div>
  </main>
</template>

<style scoped>
/* PC · 왼쪽 신상품, 오른쪽 추천 상품 */
.home-products {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 48px;
  padding-top: 44px;
  padding-bottom: 64px;
}

/* 데스크톱 · 신상품과 추천상품을 가르는 연한 세로선 */
.home-products::after {
  content: '';
  position: absolute;
  top: 44px;
  bottom: 64px;
  left: 50%;
  width: 1px;
  background: var(--color-border);
  pointer-events: none;
}

/* 데스크톱 · 헤더 로고 시작선과 장바구니 끝선에 맞춤 */
@media (min-width: 1101px) {
  .home-products {
    width: min(100% - 80px, 1020px);
  }
}

/* 태블릿과 모바일 · 섹션을 세로로 배치 */
@media (max-width: 1000px) {
  .home-products {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
    padding-top: 32px;
    padding-bottom: 40px;
  }

  .home-products::after {
    display: none;
  }
}
</style>

