<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategorySidebar from '../components/product/CategorySidebar.vue'
import ProductCard from '../components/product/ProductCard.vue'
import { development } from '../config/development.js'
import { categories, categoryGroups } from '../data/categories.js'
import { getProducts, getRecommendations } from '../services/catalog.js'

const route = useRoute()
const router = useRouter()
const products = ref([])
const total = ref()
const bestRanks = ref({})
const loading = ref(true)
const failed = ref(false)
const retry = ref(0)
const pageSize = 20
const categoryId = computed(() => typeof route.query.categoryId === 'string' ? route.query.categoryId : undefined)
const category = computed(() => categories.find((item) => item.category_id === categoryId.value))
const activeGroup = computed(() => categoryGroups.find((group) =>
  group.category_id === (category.value?.parent_id ?? category.value?.category_id),
))
const listType = computed(() => ['new', 'best'].includes(route.query.sort) ? route.query.sort : undefined)
const listDescription = computed(() => {
  if (listType.value === 'new') return '오이시담에 새로 들어온 일본 상품을 만나보세요.'
  if (listType.value === 'best') return '오이시담의 베스트 상품을 한곳에서 만나보세요.'
  return ''
})
const categoryLink = (id) => ({ name: 'Products', query: { categoryId: id, sort: listType.value } })
const priceSort = computed(() => ['price_asc', 'price_desc'].includes(route.query.order) ? route.query.order : '')
const defaultSortLabel = computed(() => {
  if (!development.mockEnabled) return '기본 정렬'
  return listType.value === 'best' ? '베스트순' : '최신순'
})
const countLabel = computed(() => {
  if (loading.value) return '상품을 불러오는 중'
  if (failed.value) return ''
  if (total.value != null) return '총 ' + total.value.toLocaleString('ko-KR') + '개 상품'
  return '현재 ' + products.value.length.toLocaleString('ko-KR') + '개 상품'
})

function changeOrder(event) {
  router.push({ name: 'Products', query: { ...route.query, order: event.target.value || undefined, page: undefined } })
}

function productBadge(product) {
  if (!development.mockEnabled) return ''
  if (listType.value === 'new') return 'NEW'
  const rank = listType.value === 'best' && bestRanks.value[product.product_id]
  return rank ? 'TOP ' + rank : ''
}
const keyword = computed(() => typeof route.query.keyword === 'string' ? route.query.keyword.trim() : '')
const recommended = computed(() => route.query.collection === 'recommended' || route.query.recommend === 'ai')
const page = computed(() => {
  const number = Number(route.query.page)
  return Number.isSafeInteger(number) && number > 0 ? number - 1 : 0
})
const title = computed(() => {
  if (listType.value === 'new') return '신상품'
  if (listType.value === 'best') return '베스트'
  if (category.value) return category.value.name
  if (keyword.value) return keyword.value + ' 검색 결과'
  if (route.query.recommend === 'ai') return 'AI 추천'
  if (recommended.value) return '추천 상품'
  return '전체 상품'
})
const hasNext = computed(() => total.value == null
  ? products.value.length === pageSize
  : (page.value + 1) * pageSize < total.value)
const pageLink = (index) => ({
  name: 'Products',
  query: { ...route.query, page: index ? String(index + 1) : undefined },
})

watch(
  () => [route.query, development.mockEnabled, development.scenario, retry.value],
  async (_, __, onCleanup) => {
    const controller = new AbortController()
    onCleanup(() => controller.abort())
    loading.value = true
    failed.value = false
    try {
      const options = { signal: controller.signal }
      const response = recommended.value
        ? await getRecommendations(options)
        : await getProducts({
          categoryId: categoryId.value,
          keyword: keyword.value || undefined,
          sort: development.mockEnabled ? priceSort.value || undefined : undefined,
          previewBest: listType.value === 'best',
          page: page.value,
          size: pageSize,
        }, options)
      if (controller.signal.aborted) return
      if (!Array.isArray(response?.items)) throw new Error('상품 응답 형식 오류')
      products.value = response.items
      total.value = response.total
      bestRanks.value = response.bestRanks ?? {}
    } catch {
      if (!controller.signal.aborted) failed.value = true
    } finally {
      if (!controller.signal.aborted) loading.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <main class="site-container products-page">
    <CategorySidebar
      :active-group-id="activeGroup?.category_id"
      :sort="listType"
    />
    <section class="products-content" aria-labelledby="products-title" :aria-busy="loading">
      <h1 id="products-title">{{ title }}</h1>
      <p v-if="listDescription" class="list-description">{{ listDescription }}</p>
      <nav v-if="activeGroup?.children.length" class="category-filters" aria-label="소분류">
        <RouterLink
          v-for="option in [activeGroup, ...activeGroup.children]"
          :key="option.category_id"
          :to="categoryLink(option.category_id)"
          :class="{ 'is-selected': option.category_id === categoryId }"
          :aria-current="option.category_id === categoryId ? 'page' : null"
        >
          {{ option === activeGroup ? '전체' : option.name }}
        </RouterLink>
      </nav>
      <p v-if="listType && !development.mockEnabled" class="catalog-note">
        현재 서버의 기본 상품 목록을 표시합니다.
      </p>
      <div v-if="!recommended" class="catalog-toolbar">
        <span class="catalog-count" aria-live="polite">{{ countLabel }}</span>
        <label>
          <span class="is-sr-only">상품 정렬</span>
          <select
            :value="development.mockEnabled ? priceSort : ''"
            :disabled="!development.mockEnabled"
            @change="changeOrder"
          >
            <option value="">{{ defaultSortLabel }}</option>
            <option v-if="development.mockEnabled" value="price_asc">낮은 가격순</option>
            <option v-if="development.mockEnabled" value="price_desc">높은 가격순</option>
          </select>
        </label>
      </div>
      <p v-if="loading" class="products-state" role="status">상품을 불러오는 중이에요.</p>
      <div v-else-if="failed" class="products-state" role="status">
        <p>상품을 불러오지 못했어요.</p>
        <button type="button" @click="retry++">다시 시도</button>
      </div>
      <p v-else-if="!products.length" class="products-state" role="status">등록된 상품이 없어요.</p>
      <div v-else class="products-grid">
        <ProductCard v-for="product in products" :key="product.product_id" :product="product" :badge="productBadge(product)" />
      </div>
      <nav v-if="!loading && !failed && !recommended && (page > 0 || hasNext)" class="product-pages" aria-label="상품 목록 페이지">
        <RouterLink v-if="page > 0" :to="pageLink(page - 1)">이전</RouterLink>
        <span aria-current="page">{{ page + 1 }}</span>
        <RouterLink v-if="hasNext" :to="pageLink(page + 1)">다음</RouterLink>
      </nav>
    </section>
  </main>
</template>

<style scoped>
.products-page {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  min-height: 50vh;
  padding-block: 24px 64px;
}

#products-title {
  margin: 0 0 12px;
  font-size: clamp(19px, 2.2vw, 22px);
  font-weight: 700;
  line-height: 1.3;
}

.list-description,
.catalog-note {
  margin: -4px 0 14px;
  color: var(--color-secondary);
  font-size: 13px;
}

.catalog-note {
  margin-top: 0;
}

.catalog-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.catalog-count {
  color: var(--color-secondary);
  font-size: 13px;
}

.catalog-toolbar select {
  min-height: 26px;
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-white);
  color: var(--color-text);
  font-size: 13px;
}

.catalog-toolbar select:disabled {
  opacity: .65;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.category-filters a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 4px 11px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
  font-size: 13px;
}

.category-filters a:hover,
.category-filters a:focus-visible {
  border-color: var(--color-primary);
}

.category-filters a.is-selected {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-white);
  font-weight: 700;
}

@media (max-width: 680px) {
  .products-page {
    grid-template-columns: minmax(0, 1fr);
    padding-block-start: 24px;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px 14px;
}

.products-state {
  padding: 36px 16px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  color: var(--color-secondary);
  text-align: center;
}

.products-state button,
.product-pages a {
  display: inline-block;
  padding: 6px 13px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background: var(--color-white);
  color: var(--color-primary);
  cursor: pointer;
}

.products-state button {
  margin-top: 10px;
}

.product-pages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 850px) {
  .products-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 460px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
