<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AdminReplyDialog from '../components/admin/AdminReplyDialog.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import { getAdminList } from '../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'

const route = useRoute()
const items = ref([])
const total = ref(0)
const pages = ref(0)
const page = ref(0)
const status = ref('')
const query = ref('')
const keyword = ref('')
const productQuery = ref('')
const productId = ref('')
const retry = ref(0)
const loading = ref(false)
const error = ref('')
const notice = ref('')
const replyDialog = ref(null)
const filters = [{ value: '', label: '전체' }, { value: 'OPEN', label: '답변 대기' }, { value: 'ANSWERED', label: '답변 완료' }]
const resultLabel = computed(() => filters.find((item) => item.value === status.value)?.label ?? '전체')
const stamp = (value) => value?.replace('T', ' ').slice(0, 16).replaceAll('-', '.') ?? '—'

watch(shoppingOwner, () => {
  items.value = []
  total.value = pages.value = page.value = 0
  status.value = query.value = keyword.value = productQuery.value = productId.value = notice.value = ''
}, { immediate: true })

watch([shoppingOwner, page, status, keyword, productId, retry], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  loading.value = true
  error.value = ''
  try {
    if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
    const result = await getAdminList('reviews', { page: page.value, size: 20, keyword: keyword.value || undefined, productId: productId.value || undefined, answered: status.value ? status.value === 'ANSWERED' : undefined }, controller.signal)
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

function search() { keyword.value = query.value.trim(); productId.value = productQuery.value; page.value = 0; retry.value++ }
function filter(value) { status.value = value; page.value = 0 }
async function open(id) { await nextTick(); replyDialog.value?.open('reviews', id) }
watch(() => route.query.id, (id) => { if (typeof id === 'string' && /^\d+$/.test(id)) open(id) }, { immediate: true })
</script>

<template>
  <main class="inquiries-page reviews-page">
    <header class="inquiries-heading"><h1>후기 관리</h1><p>고객의 후기를 확인하고 답변을 남겨주세요.</p></header>
    <section class="inquiry-list" aria-label="고객 후기 목록">
      <div class="inquiry-toolbar">
        <nav class="inquiry-filters" aria-label="후기 답변 상태"><button v-for="item in filters" :key="item.value" type="button" :class="{ 'is-active': status === item.value }" :aria-pressed="status === item.value" @click="filter(item.value)">{{ item.label }}</button></nav>
        <form class="inquiry-search" role="search" @submit.prevent="search"><input v-model.number="productQuery" type="number" min="1" step="1" aria-label="상품 ID" placeholder="상품 ID" /><input v-model="query" type="search" maxlength="100" aria-label="후기 내용 검색" placeholder="후기 내용으로 검색" /><button type="submit" :disabled="loading">검색</button></form>
      </div>
      <div class="inquiry-list-meta" aria-live="polite"><p>{{ resultLabel }} <strong>{{ total }}</strong>건<template v-if="keyword"> · ‘{{ keyword }}’ 검색 결과</template></p><span>{{ loading ? '불러오는 중…' : '최근 등록순' }}</span></div>
      <p v-if="error" class="inquiry-feedback">{{ error }} <button type="button" @click="retry++">다시 시도</button></p>
      <div class="inquiry-table-wrap" :aria-busy="loading">
        <table v-if="items.length" class="inquiry-table">
          <colgroup><col class="subject-col" /><col class="author-col" /><col class="date-col" /><col class="status-col" /><col class="action-col" /></colgroup>
          <thead><tr><th scope="col">후기 내용</th><th scope="col">작성자</th><th scope="col">작성일</th><th scope="col">답변 상태</th><th scope="col"><span class="sr-only">관리</span></th></tr></thead>
          <tbody><tr v-for="item in items" :key="item.reviewId">
            <td class="inquiry-subject"><button type="button" aria-haspopup="dialog" @click="open(item.reviewId)"><strong v-if="item.productName" class="review-product-name">{{ item.productName }}</strong><span class="review-snippet">{{ item.content }}</span></button><small v-if="item.imageUrls?.length" class="review-photo-count">사진 {{ item.imageUrls.length }}</small></td>
            <td class="inquiry-author">{{ item.memberName || '이름 확인 중' }}</td><td class="inquiry-date"><time :datetime="item.createdAt">{{ stamp(item.createdAt) }}</time></td>
            <td><span class="inquiry-status" :class="item.answerContent ? 'is-answered' : 'is-pending'">{{ item.answerContent ? '답변 완료' : '답변 대기' }}</span></td>
            <td class="inquiry-action"><button type="button" class="reply-button" aria-haspopup="dialog" :aria-label="item.content + (item.answerContent ? ' 답변 수정' : ' 답변하기')" @click="open(item.reviewId)">{{ item.answerContent ? '답변 수정' : '답변하기' }}</button></td>
          </tr></tbody>
        </table>
        <p v-else-if="!error" class="inquiry-empty" role="status">{{ loading ? '후기 내역을 불러오고 있어요.' : keyword || status || productId ? '검색 조건에 맞는 후기가 없습니다.' : '아직 등록된 후기가 없습니다.' }}</p>
      </div>
      <Pagination :model-value="page + 1" :page-count="pages" :disabled="loading" label="후기 목록 페이지" @update:model-value="page = $event - 1" />
    </section>
    <AdminReplyDialog ref="replyDialog" @saved="retry++" />
    <AlertDialog :message="notice" @close="notice = ''" />
  </main>
</template>

<style scoped src="../styles/admin-inquiries.css"></style>
<style scoped>
.reviews-page .inquiry-search input[type='number'] { width: 90px; flex: none; }
.review-product-name { display: block; margin-bottom: 6px; color: #684554; font-size: 12px; font-weight: 650; }
.review-snippet { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; color: #806876; font-size: 13px; font-weight: 400; line-height: 1.7; }
.review-photo-count { display: inline-block; margin-top: 8px; color: #a17c8e; font-size: 10px; }
</style>
