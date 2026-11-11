<script setup>
import { onBeforeUnmount, reactive, watch } from 'vue'
import MainBanner from '../../components/home/MainBanner.vue'
import ProductSection from '../../components/product/ProductSection.vue'
import matchaImage from '../../assets/images/banners/matcha-collection-safe-oishidam.png'
import { getProducts, getRecommendations } from '../../services/catalog.js'
import { development } from '../../config/development.js'

// 추가 배너는 같은 형식으로 등록하면 슬라이드 버튼과 페이지 수에 반영됩니다.
const banners = [
  {
    id: 'matcha-collection',
    eyebrow: 'MATCHA COLLECTION',
    title: '말차의 매력에\n푹 빠지는 시간',
    description: '쌉싸름하고 달콤한 말차 간식만 모았어요.',
    buttonLabel: '말차 간식 보기',
    image: matchaImage,
    imageAlt: '말차 롤케이크와 초콜릿, 도라야키와 말차가 놓인 접시',
    to: { path: '/products', query: { keyword: '말차' } },
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
    loadSection(recommended, () => getRecommendations({ signal })),
    loadSection(arrivals, () => getProducts({ sort: 'new', size: 3 }, { signal })),
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

