<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import AdminReplyDialog from '../components/admin/AdminReplyDialog.vue'
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
const retry = ref(0)
const loading = ref(false)
const error = ref('')
const notice = ref('')
const replyDialog = ref(null)
const filters = [{ value: '', label: '전체' }, { value: 'OPEN', label: '답변 대기' }, { value: 'ANSWERED', label: '답변 완료' }]
const resultLabel = computed(() => filters.find((item) => item.value === status.value)?.label ?? '전체')
const date = (value) => value?.slice(0, 10).replaceAll('-', '.') ?? '—'
const time = (value) => value?.slice(11, 16) ?? ''
watch(shoppingOwner, () => {
  items.value = []
  total.value = pages.value = page.value = 0
  status.value = query.value = keyword.value = notice.value = ''
}, { immediate: true })

watch([shoppingOwner, page, status, keyword, retry], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  loading.value = true
  error.value = ''
  try {
    if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
    const result = await getAdminList('inquiries', { page: page.value, size: 20, status: status.value || undefined, keyword: keyword.value || undefined }, controller.signal)
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

function search() { keyword.value = query.value.trim(); page.value = 0; retry.value++ }
function filter(value) { status.value = value; page.value = 0 }

async function open(id) {
  await nextTick()
  replyDialog.value?.open('inquiries', id)
}

watch(() => route.query.id, (id) => { if (typeof id === 'string' && /^\d+$/.test(id)) open(id) }, { immediate: true })
</script>

<template>
  <main class="inquiries-page">
    <header class="inquiries-heading">
      <div><h1>문의 관리</h1><p>고객의 문의를 확인하고 답변을 남겨주세요.</p></div>
    </header>

    <section class="inquiry-list" aria-label="고객 문의 목록">
      <div class="inquiry-toolbar">
        <nav class="inquiry-filters" aria-label="문의 상태">
          <button v-for="item in filters" :key="item.value" type="button" :class="{ 'is-active': status === item.value }" :aria-pressed="status === item.value" @click="filter(item.value)">{{ item.label }}</button>
        </nav>
        <form class="inquiry-search" role="search" @submit.prevent="search">
          <input v-model="query" type="search" maxlength="100" aria-label="문의 제목 검색" placeholder="문의 제목으로 검색" />
          <button type="submit" :disabled="loading">검색</button>
        </form>
      </div>
      <div class="inquiry-list-meta" aria-live="polite"><p>{{ resultLabel }} <strong>{{ total }}</strong>건<template v-if="keyword"> · ‘{{ keyword }}’ 검색 결과</template></p><span v-if="loading">불러오는 중…</span><span v-else>최근 등록순</span></div>
      <p v-if="error" class="inquiry-feedback">{{ error }} <button type="button" @click="retry++">다시 시도</button></p>
      <div class="inquiry-table-wrap" :aria-busy="loading">
        <table v-if="items.length" class="inquiry-table">
          <colgroup><col class="subject-col" /><col class="author-col" /><col class="date-col" /><col class="status-col" /><col class="action-col" /></colgroup>
          <thead><tr><th scope="col">문의 제목</th><th scope="col">작성자</th><th scope="col">작성일</th><th scope="col">답변 상태</th><th scope="col"><span class="sr-only">관리</span></th></tr></thead>
          <tbody><tr v-for="item in items" :key="item.inquiryId">
            <td class="inquiry-subject"><button type="button" aria-haspopup="dialog" @click="open(item.inquiryId)">{{ item.title }}</button></td>
            <td class="inquiry-author">{{ item.memberName || '이름 확인 중' }}</td>
            <td class="inquiry-date"><time :datetime="item.createdAt">{{ date(item.createdAt) }} {{ time(item.createdAt) }}</time></td>
            <td><span class="inquiry-status" :class="item.status === 'ANSWERED' ? 'is-answered' : 'is-pending'">{{ item.status === 'ANSWERED' ? '답변 완료' : '답변 대기' }}</span></td>
            <td class="inquiry-action"><button type="button" class="reply-button" aria-haspopup="dialog" :aria-label="`${item.title} ${item.status === 'ANSWERED' ? '답변 보기' : '답변하기'}`" @click="open(item.inquiryId)">{{ item.status === 'ANSWERED' ? '답변 보기' : '답변하기' }}</button></td>
          </tr></tbody>
        </table>
        <p v-else-if="!error" class="inquiry-empty" role="status">{{ loading ? '문의 내역을 불러오고 있어요.' : keyword ? '검색 조건에 맞는 문의가 없습니다.' : '아직 등록된 문의가 없습니다.' }}</p>
      </div>
      <Pagination :model-value="page + 1" :page-count="pages" :disabled="loading" label="문의 목록 페이지" @update:model-value="page = $event - 1" />
    </section>

    <AdminReplyDialog ref="replyDialog" @saved="retry++" />
    <AlertDialog :message="notice" @close="notice = ''" />
  </main>
</template>

<style scoped src="../styles/admin-inquiries.css"></style>
