<script setup>
import AdminSentimentBadge from '../components/admin/AdminSentimentBadge.vue'
import ReviewRating from '../components/common/ReviewRating.vue'
import { activateAdminRow, activateAdminRowKey } from '../utils/adminRow.js'
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AdminNotice from '../components/admin/AdminNotice.vue'
import AdminReplyDialog from '../components/admin/AdminReplyDialog.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import AdminPageHeading from '../components/admin/AdminPageHeading.vue'
import AdminListPanel from '../components/admin/AdminListPanel.vue'
import AdminIcon from '../components/admin/AdminIcon.vue'
import { getAdminList } from '../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'
import { reviewSentimentFilters } from '../utils/reviewSentiments.js'

const route = useRoute()
const items = ref([])
const total = ref(0)
const pages = ref(0)
const page = ref(0)
const status = ref('')
const sentimentFilter = ref('')
const query = ref('')
const keyword = ref('')
const productQuery = ref('')
const productFilter = ref('')
const productParams = computed(() => /^\d+$/.test(productFilter.value) ? { productId: productFilter.value } : { productName: productFilter.value || undefined })
const retry = ref(0)
const loading = ref(false)
const error = ref('')
const notice = ref('')
const successNotice = ref('')
const replyDialog = ref(null)
const filters = [{ value: '', label: '전체' }, { value: 'OPEN', label: '답변 대기' }, { value: 'ANSWERED', label: '답변 완료' }]
const stamp = (value) => value?.replace('T', ' ').slice(0, 16).replaceAll('-', '.') ?? '—'

watch(shoppingOwner, () => {
  successNotice.value = ''
  items.value = []
  total.value = pages.value = page.value = 0
  status.value = query.value = keyword.value = productQuery.value = productFilter.value = notice.value = ''
  sentimentFilter.value = ''
}, { immediate: true })

watch([shoppingOwner, page, status, sentimentFilter, keyword, productFilter, retry], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  loading.value = true
  error.value = ''
  try {
    if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
    const result = await getAdminList('reviews', { page: page.value, size: 10, keyword: keyword.value || undefined, ...productParams.value, answered: status.value ? status.value === 'ANSWERED' : undefined, sentiment: sentimentFilter.value || undefined }, controller.signal)
    if (controller.signal.aborted || revision !== getSessionRevision()) return
    if (page.value > 0 && page.value >= result.totalPages) { page.value = Math.max(0, result.totalPages - 1); return }
    items.value = result.content
    total.value = result.totalElements
    pages.value = result.totalPages
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) { items.value = []; error.value = failure.message; notice.value = failure.message }
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })

function search() { keyword.value = query.value.trim(); productFilter.value = productQuery.value.trim(); page.value = 0; retry.value++ }
function filter(value) { status.value = value; page.value = 0 }
function filterSentiment(value) { sentimentFilter.value = value; page.value = 0 }
watch(() => route.query.sentiment, (value) => {
  filterSentiment(typeof value === 'string' && reviewSentimentFilters.some(item => item.value === value) ? value : '')
}, { immediate: true })
watch(() => route.query.status, (value) => { if (filters.some((item) => item.value === value)) filter(value) }, { immediate: true })
watch(() => route.query.productId, (value, previous) => {
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    productQuery.value = productFilter.value = value; page.value = 0
  } else if (previous) { productQuery.value = productFilter.value = ''; page.value = 0 }
}, { immediate: true })
async function open(id) { await nextTick(); replyDialog.value?.open('reviews', id) }
watch(() => route.query.id, (id) => { if (typeof id === 'string' && /^\d+$/.test(id)) open(id) }, { immediate: true })
</script>

<template>
  <main class="admin-page inquiries-page reviews-page">
    <AdminPageHeading title="후기 관리" description="상품 후기와 첨부 사진을 확인하고 답변을 관리하세요." />
    <AdminNotice :message="successNotice" @close="successNotice = ''" />
    <AdminListPanel :total="total" :loading="loading" aria-label="고객 후기 목록">
      <template #filters>
        <label class="inquiry-status-filter" for="admin-review-status"><span>답변 상태</span><select id="admin-review-status" :value="status" @change="filter($event.target.value)"><option v-for="item in filters" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
        <label class="inquiry-status-filter" for="admin-review-sentiment"><span>감정</span><select id="admin-review-sentiment" :value="sentimentFilter" @change="filterSentiment($event.target.value)"><option v-for="item in reviewSentimentFilters" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
        <form class="inquiry-search" role="search" @submit.prevent="search"><label class="product-id-field" for="admin-review-product"><span>상품 ID·상품명</span><input id="admin-review-product" v-model="productQuery" type="search" maxlength="100" placeholder="상품 ID 또는 상품명" /></label><label for="admin-review-search"><span>후기 내용</span><input id="admin-review-search" v-model="query" type="search" maxlength="100" placeholder="검색어를 입력하세요" /></label><button type="submit" :disabled="loading"><AdminIcon name="search" />검색</button></form>
      </template>
      <template #actions><span>{{ loading ? '불러오는 중…' : keyword ? `‘${keyword}’ 검색 결과` : '최근 등록순' }}</span></template>
      <p v-if="error" class="admin-list-feedback" role="alert">{{ error }} <button type="button" @click="retry++">다시 시도</button></p>
      <div class="admin-list-scroll inquiry-table-wrap" tabindex="-1" role="region" aria-label="고객 후기 표" :aria-busy="loading">
        <table v-if="items.length" class="admin-list-table inquiry-table">
          <caption class="sr-only">상품명, 후기 내용, 별점, 감정과 답변 상태</caption><colgroup><col class="product-col" /><col class="subject-col" /><col class="rating-col" /><col class="sentiment-col" /><col class="status-col" /><col class="author-col" /><col class="date-col" /></colgroup>
          <thead><tr><th scope="col">상품명</th><th scope="col">후기 내용</th><th scope="col" class="status-cell">별점</th><th scope="col" class="status-cell">감정</th><th scope="col" class="status-cell">답변 상태</th><th scope="col">작성자</th><th scope="col">작성일</th></tr></thead>
          <tbody><tr v-for="item in items" :key="item.reviewId" class="admin-clickable-row" tabindex="0" aria-haspopup="dialog" @keydown="activateAdminRowKey($event, () => open(item.reviewId))" @click="activateAdminRow($event, () => open(item.reviewId))">
            <td><strong class="review-product-name" :title="item.productName">{{ item.productName || '—' }}</strong></td>
            <td class="inquiry-subject"><span class="admin-list-preview" :title="item.content">{{ item.content }}</span><small v-if="item.imageUrls?.length" class="review-photo-count">사진 {{ item.imageUrls.length }}</small></td>
            <td class="status-cell"><ReviewRating :rating="item.rating" /></td>
            <td class="status-cell"><AdminSentimentBadge :sentiment="item.sentiment" /></td>
            <td class="status-cell"><span class="inquiry-status" :class="item.answerContent ? 'is-answered' : 'is-pending'">{{ item.answerContent ? '답변 완료' : '답변 대기' }}</span></td>
            <td class="inquiry-author">{{ item.memberName || '이름 확인 중' }}</td><td class="inquiry-date"><time :datetime="item.createdAt">{{ stamp(item.createdAt) }}</time></td>
          </tr></tbody>
        </table>
        <p v-else-if="!error" class="inquiry-empty" role="status">{{ loading ? '후기 내역을 불러오고 있어요.' : keyword || status || productFilter || sentimentFilter ? '검색 조건에 맞는 후기가 없습니다.' : '아직 등록된 후기가 없습니다.' }}</p>
      </div>
      <template #footer>
        <Pagination :model-value="page + 1" :page-count="pages" :disabled="loading" label="후기 목록 페이지" @update:model-value="page = $event - 1" />
      </template>
    </AdminListPanel>
    <AdminReplyDialog ref="replyDialog" @saved="retry++; successNotice = '답변을 등록했습니다.'" />
    <AlertDialog :message="notice" @close="notice = ''" />
  </main>
</template>

<style scoped src="../styles/admin-inquiries.css"></style>
<style scoped>
.product-col { width: 26%; }
.review-product-name { display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--admin-ink); font-size: var(--font-size-table); font-weight: var(--admin-list-primary-weight); line-height: 1.7; }
.review-photo-count { display: inline-block; margin-top: 6px; color: var(--admin-info); font-size: var(--font-size-label); }
.sentiment-col { width: 118px; }
.rating-col { width: 126px; }
.reviews-page .inquiry-table { min-width: 1120px; }
</style>
