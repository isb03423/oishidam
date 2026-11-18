<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import AdminPageHeading from '../components/admin/AdminPageHeading.vue'
import AdminIcon from '../components/admin/AdminIcon.vue'
import AdminSentimentBadge from '../components/admin/AdminSentimentBadge.vue'
import AdminListPanel from '../components/admin/AdminListPanel.vue'
import Pagination from '../components/common/Pagination.vue'
import NotificationToast from '../components/common/NotificationToast.vue'
import { useToasts } from '../composables/useToasts.js'
import { analyzeAdminPendingReviews, getAdminReviewAnalytics, getAdminSentimentProducts } from '../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'
import { reviewSentimentFilters } from '../utils/reviewSentiments.js'

const report = ref(null), loading = ref(false), error = ref(''), retry = ref(0), updatedAt = ref('')
const products = ref([]), productTotal = ref(0), productPages = ref(0), productPage = ref(0), productFilter = ref('')
const productsLoading = ref(false), productsError = ref(''), productRetry = ref(0)
const analysisRunning = ref(false)
const { toasts, showToast, dismissToast, pauseToast, resumeToast, clearToasts } = useToasts()
const analysisButton = ref(null), pageHeading = ref(null)
let analysisController = null

function clearAnalysis() {
  analysisController?.abort()
  analysisController = null
  analysisRunning.value = false
  clearToasts()
}
watch(shoppingOwner, clearAnalysis)
onBeforeUnmount(clearAnalysis)

function dismissAnalysisNotice(id, restoreFocus = false) {
  dismissToast(id)
  if (restoreFocus) analysisButton.value?.focus()
}

async function analyzePending() {
  if (analysisRunning.value || loading.value || session.source !== 'api' || session.member?.role !== 'ADMIN') return
  const controller = new AbortController(), revision = getSessionRevision()
  analysisController = controller
  const valid = () => analysisController === controller && !controller.signal.aborted && revision === getSessionRevision()
  analysisRunning.value = true
  try {
    const result = await analyzeAdminPendingReviews(controller.signal)
    if (!valid()) return
    showToast('success', result.analyzed
      ? `후기 ${number(result.analyzed)}건을 분석했습니다.${result.model === 'knu-sentilex' ? ' 문장 모델 대신 감성사전으로 분석했습니다.' : ''} 남은 대상이 있으면 다시 실행해 주세요.`
      : '이번 요청에서 추가로 분석한 후기가 없습니다.')
    retry.value++
  } catch (failure) {
    if (valid()) { showToast('error', failure.message); retry.value++ }
  } finally {
    if (valid()) { analysisRunning.value = false; analysisController = null }
  }
}
const productOrder = computed(() => productFilter.value
  ? reviewSentimentFilters.find(item => item.value === productFilter.value).label + ' 후기 많은 순'
  : '부정 후기 많은 순')
const sentiments = [
  ['VERY_POSITIVE', '#83bd87'],
  ['POSITIVE', '#a4df94'],
  ['NEUTRAL', '#f5dd88'],
  ['NEGATIVE', '#f4bc88'],
  ['VERY_NEGATIVE', '#ee9d95'],
]
const number = value => new Intl.NumberFormat('ko-KR').format(value ?? 0)
const rate = value => report.value?.analyzed ? value / report.value.analyzed * 100 : 0
const percent = value => report.value?.analyzed ? new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 }).format(rate(value)) + '%' : '—'
const distribution = computed(() => sentiments.map(([sentiment, color]) => ({
  sentiment, color, count: report.value?.distribution?.find(item => item.sentiment === sentiment)?.count ?? 0,
})))
const count = (...codes) => distribution.value.filter(item => codes.includes(item.sentiment)).reduce((sum, item) => sum + item.count, 0)
const metrics = computed(() => [
  ['전체 후기', report.value?.total], ['분석 완료', report.value?.analyzed],
  ['미분석', report.value?.pending], ['답변 대기 부정 후기', report.value?.negativeUnanswered],
])

function filterProducts(value) { productFilter.value = value; productPage.value = 0 }
watch(shoppingOwner, () => { productFilter.value = ''; productPage.value = 0 }, { immediate: true })
watch([shoppingOwner, productFilter, productPage, retry, productRetry], async (_, __, onCleanup) => {
  const controller = new AbortController(), revision = getSessionRevision()
  onCleanup(() => controller.abort())
  products.value = []; productTotal.value = productPages.value = 0
  productsError.value = ''; productsLoading.value = false
  if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
  productsLoading.value = true
  try {
    const result = await getAdminSentimentProducts({ page: productPage.value, size: 10, sentiment: productFilter.value || undefined }, controller.signal)
    if (controller.signal.aborted || revision !== getSessionRevision()) return
    if (productPage.value > 0 && productPage.value >= result.totalPages) { productPage.value = Math.max(0, result.totalPages - 1); return }
    products.value = result.content; productTotal.value = result.totalElements; productPages.value = result.totalPages
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) productsError.value = failure.message
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) productsLoading.value = false
  }
}, { immediate: true })

watch([shoppingOwner, retry], async (_, __, onCleanup) => {
  const controller = new AbortController(), revision = getSessionRevision()
  onCleanup(() => controller.abort())
  report.value = null; error.value = ''; updatedAt.value = ''; loading.value = false
  if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
  loading.value = true
  try {
    const result = await getAdminReviewAnalytics(controller.signal)
    if (controller.signal.aborted || revision !== getSessionRevision()) return
    report.value = result
    updatedAt.value = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) error.value = failure.message
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })
</script>

<template>
  <main class="admin-page admin-dashboard-page analytics-page sentiment-page" :aria-busy="loading">
    <AdminPageHeading ref="pageHeading" class="admin-page-heading-sticky" title="후기 감정분석" description="고객 후기의 감정 분포와 상품별 반응을 확인합니다.">
      <button ref="analysisButton" type="button" :disabled="analysisRunning || loading || session.source !== 'api'" :aria-busy="analysisRunning" @click="analyzePending"><AdminIcon name="refresh" />{{ analysisRunning ? '분석 중…' : '미분석 후기 분석' }}</button>
      <button type="button" :disabled="analysisRunning || loading || session.source !== 'api'" @click="retry++"><AdminIcon name="refresh" />{{ loading ? '불러오는 중…' : '현황 새로고침' }}</button>
    </AdminPageHeading>
    <div class="analytics-content">
      <p v-if="session.source !== 'api'" class="analytics-feedback">후기 감정분석은 실제 관리자 계정으로 로그인한 뒤 사용할 수 있습니다.</p>
      <p v-else-if="loading" class="analytics-feedback" role="status">후기 감정분석 결과를 불러오고 있습니다. 잠시만 기다려 주세요.</p>
      <p v-else-if="error" class="analytics-feedback is-error" role="alert">{{ error }} <button type="button" @click="retry++">다시 시도</button></p>
      <template v-else-if="report">
        <section class="analytics-summary" aria-labelledby="sentiment-summary-title">
          <div class="analytics-section-heading"><h2 id="sentiment-summary-title">후기 감정 요약</h2><span>{{ updatedAt }} 조회</span></div>
          <dl class="analytics-metrics sentiment-metrics"><div v-for="[label, value] in metrics" :key="label"><dt>{{ label }}</dt><dd>{{ number(value) }}<small>건</small></dd></div></dl>
          <p class="analytics-note">삭제되지 않은 전체 후기와 DB에 저장된 분석 결과 기준입니다. 미분석 후기는 감정 비율에서 제외합니다.</p>
        </section>

        <div class="sentiment-overview">
          <section aria-labelledby="sentiment-distribution-title">
            <div class="analytics-section-heading"><h2 id="sentiment-distribution-title">감정 분포</h2><span>분석 완료 {{ number(report.analyzed) }}건</span></div>
            <template v-if="report.analyzed">
              <div class="sentiment-bar" aria-hidden="true"><span v-for="item in distribution" :key="item.sentiment" :style="{ width: rate(item.count) + '%', background: item.color }"></span></div>
              <dl class="sentiment-distribution"><div v-for="item in distribution" :key="item.sentiment"><dt><AdminSentimentBadge :sentiment="item.sentiment" /></dt><dd><strong>{{ number(item.count) }}건</strong><span>{{ percent(item.count) }}</span></dd></div></dl>
            </template>
            <p v-else class="analytics-empty">아직 분석된 후기가 없습니다. 미분석 후기는 {{ number(report.pending) }}건입니다.</p>
          </section>
          <section class="sentiment-response" aria-labelledby="sentiment-response-title">
            <div class="analytics-section-heading"><h2 id="sentiment-response-title">고객 반응</h2></div>
            <dl class="sentiment-rates"><div><dt>긍정 비율<small>매우 긍정 + 긍정</small></dt><dd>{{ percent(count('VERY_POSITIVE', 'POSITIVE')) }}</dd></div><div><dt>부정 비율<small>부정 + 매우 부정</small></dt><dd>{{ percent(count('NEGATIVE', 'VERY_NEGATIVE')) }}</dd></div></dl>
            <p class="analytics-note">부정 후기 중 {{ number(report.negativeUnanswered) }}건이 답변을 기다리고 있습니다.</p>
            <RouterLink class="sentiment-review-link" :to="{ name: 'AdminDashboard', params: { section: 'reviews' }, query: { status: 'OPEN' } }">답변 대기 후기 보기<AdminIcon name="chevron" /></RouterLink>
          </section>
        </div>

        <section class="sentiment-products" aria-labelledby="sentiment-products-title">
          <div class="analytics-section-heading"><h2 id="sentiment-products-title">상품별 감정 현황</h2><span>{{ productOrder }}</span></div>
          <AdminListPanel :total="productTotal" :loading="productsLoading">
            <template #filters>
              <div class="sentiment-filter-bar" role="group" aria-label="상품 감정 필터">
                <button v-for="item in reviewSentimentFilters" :key="item.value" type="button" class="sentiment-filter-option" :aria-pressed="productFilter === item.value" aria-controls="sentiment-product-results" @click="filterProducts(item.value)">
                  <AdminSentimentBadge v-if="item.value" :sentiment="item.value" /><span v-else>전체</span>
                </button>
              </div>
              <p class="sentiment-filter-help">전체는 후기 없는 상품도 포함합니다. 상품명을 누르면 해당 조건의 후기를 확인할 수 있습니다.</p>
            </template>
            <template #actions><span>10개씩 표시</span></template>
            <p v-if="productsError" class="admin-list-feedback" role="alert">{{ productsError }} <button type="button" @click="productRetry++">다시 시도</button></p>
          <div id="sentiment-product-results" class="analytics-table-scroll sentiment-product-scroll" tabindex="-1" role="region" aria-labelledby="sentiment-products-title" :aria-busy="productsLoading">
            <table v-if="products.length" :aria-busy="productsLoading">
              <caption class="sr-only">{{ productOrder }} 상품별 전체 후기, 5단계 감정과 미분석 건수</caption>
              <thead><tr><th scope="col">상품명</th><th scope="col" class="numeric">전체 후기</th><th v-for="[code] in sentiments" :key="code" scope="col" class="sentiment-count"><AdminSentimentBadge :sentiment="code" /></th><th scope="col" class="sentiment-count">미분석</th></tr></thead>
              <tbody><tr v-for="product in products" :key="product.productId"><th scope="row"><RouterLink class="admin-list-preview" :title="product.productName" :to="{ name: 'AdminDashboard', params: { section: 'reviews' }, query: { productId: String(product.productId), sentiment: productFilter || undefined } }">{{ product.productName }}</RouterLink></th><td class="numeric">{{ number(product.total) }}건</td><td v-for="[code] in sentiments" :key="code" class="sentiment-count">{{ number(product.sentiments[code]) }}</td><td class="sentiment-count">{{ number(product.pending) }}</td></tr></tbody>
            </table>
            <p v-else-if="!productsError" class="sentiment-product-empty" role="status">{{ productsLoading ? '상품별 감정 현황을 불러오고 있습니다.' : productFilter ? '선택한 감정의 후기가 있는 상품이 없습니다.' : '등록된 상품이 없습니다.' }}</p>
          </div>
            <template #footer><Pagination :model-value="productPage + 1" :page-count="productPages" :disabled="productsLoading" label="상품별 감정 현황 페이지" @update:model-value="productPage = $event - 1" /></template>
          </AdminListPanel>
        </section>
      </template>
    </div>
    <NotificationToast :items="toasts" :anchor="pageHeading" @dismiss="dismissAnalysisNotice" @pause="pauseToast" @resume="resumeToast" />
  </main>
</template>

<style scoped src="../styles/admin-customer-analytics.css"></style>
<style scoped>
.sentiment-page { min-inline-size: 0; }
.sentiment-page .sentiment-metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.sentiment-metrics dd small { display: inline; margin-inline-start: 5px; }
.sentiment-overview { display: grid; grid-template-columns: minmax(0, 1.8fr) minmax(260px, 1fr); gap: 32px; }
.sentiment-overview > * { min-inline-size: 0; }
.sentiment-bar { display: flex; block-size: 32px; overflow: hidden; border-radius: 4px; margin-block: 24px; }
.sentiment-bar > span { flex: none; }
.sentiment-distribution { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px 10px; }
.sentiment-distribution dd { display: grid; gap: 4px; margin: 12px 0 0; font-size: var(--font-size-table); font-variant-numeric: tabular-nums; }
.sentiment-distribution dd strong { font-weight: 600; }.sentiment-distribution dd span { color: var(--admin-muted); }
.sentiment-response { padding-inline-start: 32px; border-inline-start: 1px solid var(--admin-line); }
.sentiment-rates { display: grid; gap: 16px; }.sentiment-rates > div { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.sentiment-rates dt { font-size: var(--font-size-table); }.sentiment-rates dt small { display: block; color: var(--admin-muted); font-size: var(--font-size-label); }
.sentiment-rates dd { margin: 0; font-size: 1.5rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.sentiment-review-link { display: inline-flex; align-items: center; gap: 4px; margin-block-start: 12px; color: var(--admin-brand); font-size: var(--font-size-table); }.sentiment-review-link .admin-icon { inline-size: 14px; block-size: 14px; }
.sentiment-products { padding-block-start: 24px; border-block-start: 1px solid var(--admin-line); }
.sentiment-page :deep(.admin-list-toolbar) { flex-direction: column; align-items: stretch; gap: 12px; }
.sentiment-filter-bar { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 8px; }
.sentiment-page .sentiment-filter-option { display: flex; align-items: center; justify-content: center; min-block-size: 44px; padding: 9px 12px; border-color: var(--admin-line); color: var(--admin-ink); font-size: var(--font-size-table); font-weight: 500; white-space: nowrap; }
.sentiment-page .sentiment-filter-option:hover { background: var(--admin-subtle); }
.sentiment-page .sentiment-filter-option:is([aria-pressed='true'], :focus-visible) { border-color: var(--admin-brand); background: var(--admin-brand-soft); }
.sentiment-filter-option :deep(.admin-sentiment) { padding: 0; background: transparent; font-size: inherit; }
.sentiment-filter-help { color: var(--admin-muted); font-size: var(--font-size-label); }
.sentiment-product-empty { padding: 36px 24px; text-align: center; color: var(--admin-muted); font-size: var(--font-size-table); }
.sentiment-page .sentiment-product-scroll { max-block-size: none; container-type: inline-size; }
.sentiment-products table { min-inline-size: 960px; }.sentiment-products tbody th { min-inline-size: 240px; max-inline-size: 360px; white-space: nowrap; font-weight: var(--admin-list-primary-weight); }
.sentiment-products tbody th .admin-list-preview { max-inline-size: 360px; }
.sentiment-page .sentiment-count { text-align: center; }.sentiment-products a { color: var(--admin-ink); }.sentiment-products a:hover { color: var(--admin-brand); }
.sentiment-page a:focus-visible { outline: 2px solid var(--admin-brand); outline-offset: -2px; }
@media (max-width: 1100px) { .sentiment-overview { grid-template-columns: minmax(0, 1fr); }.sentiment-response { padding: 24px 0 0; border-inline-start: 0; border-block-start: 1px solid var(--admin-line); } }
@media (max-width: 1200px) { .sentiment-filter-bar { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
@media (max-width: 600px) { .sentiment-page .sentiment-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }.sentiment-distribution { grid-template-columns: repeat(3, minmax(0, 1fr)); }.sentiment-overview { gap: 24px; } }
@media (max-width: 600px) { .sentiment-filter-bar { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
