<script setup>
import { activateAdminRow, activateAdminRowKey } from '../utils/adminRow.js'
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import AdminNotice from '../components/admin/AdminNotice.vue'
import AdminReplyDialog from '../components/admin/AdminReplyDialog.vue'
import AdminPageHeading from '../components/admin/AdminPageHeading.vue'
import AdminListPanel from '../components/admin/AdminListPanel.vue'
import AdminIcon from '../components/admin/AdminIcon.vue'
import { getAdminList } from '../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'

const route = useRoute()
const defaultStatus = 'OPEN'
const items = ref([])
const total = ref(0)
const pages = ref(0)
const page = ref(0)
const status = ref(defaultStatus)
const query = ref('')
const keyword = ref('')
const retry = ref(0)
const loading = ref(false)
const error = ref('')
const notice = ref('')
const successNotice = ref('')
const replyDialog = ref(null)
const filters = [{ value: '', label: '전체' }, { value: 'OPEN', label: '답변 대기' }, { value: 'ANSWERED', label: '답변 완료' }]
const date = (value) => value?.slice(0, 10).replaceAll('-', '.') ?? '—'
const time = (value) => value?.slice(11, 16) ?? ''
watch(shoppingOwner, () => {
  successNotice.value = ''
  items.value = []
  total.value = pages.value = page.value = 0
  filterFromRoute(route.query.status)
  query.value = keyword.value = notice.value = ''
}, { immediate: true })

watch([shoppingOwner, page, status, keyword, retry], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  loading.value = true
  error.value = ''
  try {
    if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
    const result = await getAdminList('inquiries', { page: page.value, size: 10, status: status.value || undefined, keyword: keyword.value || undefined }, controller.signal)
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
function filterFromRoute(value) { filter(filters.some(item => item.value === value) ? value : defaultStatus) }
watch(() => route.query.status, filterFromRoute)

async function open(id) {
  await nextTick()
  replyDialog.value?.open('inquiries', id)
}

watch(() => route.query.id, (id) => { if (typeof id === 'string' && /^\d+$/.test(id)) open(id) }, { immediate: true })
</script>

<template>
  <main class="admin-page inquiries-page">
    <AdminPageHeading title="문의 관리" description="문의 내용을 확인하고 고객에게 답변하세요." />

    <AdminNotice :message="successNotice" @close="successNotice = ''" />
    <AdminListPanel :total="total" :loading="loading" aria-label="고객 문의 목록">
      <template #filters>
        <label class="inquiry-status-filter" for="admin-inquiry-status"><span>답변 상태</span><select id="admin-inquiry-status" :value="status" @change="filter($event.target.value)"><option v-for="item in filters" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
        <form class="inquiry-search" role="search" @submit.prevent="search">
          <label for="admin-inquiry-search"><span>문의 제목</span><input id="admin-inquiry-search" v-model="query" type="search" maxlength="100" placeholder="검색어를 입력하세요" /></label>
          <button type="submit" :disabled="loading"><AdminIcon name="search" />검색</button>
        </form>
      </template>
      <template #actions><span>{{ loading ? '불러오는 중…' : keyword ? `‘${keyword}’ 검색 결과` : '최근 등록순' }}</span></template>
      <p v-if="error" class="admin-list-feedback" role="alert">{{ error }} <button type="button" @click="retry++">다시 시도</button></p>
      <div class="admin-list-scroll inquiry-table-wrap" tabindex="-1" role="region" aria-label="고객 문의 표" :aria-busy="loading">
        <table v-if="items.length" class="admin-list-table inquiry-table">
          <caption class="sr-only">고객 문의 제목, 내용과 답변 상태</caption><colgroup><col class="inquiry-title-col" /><col class="subject-col" /><col class="status-col" /><col class="author-col" /><col class="date-col" /></colgroup>
          <thead><tr><th scope="col">문의 제목</th><th scope="col">문의 내용</th><th scope="col" class="status-cell">답변 상태</th><th scope="col">작성자</th><th scope="col">작성일</th></tr></thead>
          <tbody><tr v-for="item in items" :key="item.inquiryId" class="admin-clickable-row" tabindex="0" aria-haspopup="dialog" @keydown="activateAdminRowKey($event, () => open(item.inquiryId))" @click="activateAdminRow($event, () => open(item.inquiryId))">
            <td class="inquiry-subject"><strong class="admin-list-preview" :title="item.title">{{ item.title }}</strong></td>
            <td><span class="admin-list-preview" :title="item.content">{{ item.content || '—' }}</span></td>
            <td class="status-cell"><span class="inquiry-status" :class="item.status === 'ANSWERED' ? 'is-answered' : 'is-pending'">{{ item.status === 'ANSWERED' ? '답변 완료' : '답변 대기' }}</span></td>
            <td class="inquiry-author">{{ item.memberName || '이름 확인 중' }}</td>
            <td class="inquiry-date"><time :datetime="item.createdAt">{{ date(item.createdAt) }} {{ time(item.createdAt) }}</time></td>

          </tr></tbody>
        </table>
        <p v-else-if="!error" class="inquiry-empty" role="status">{{ loading ? '문의 내역을 불러오고 있어요.' : keyword || status ? '검색 조건에 맞는 문의가 없습니다.' : '아직 등록된 문의가 없습니다.' }}</p>
      </div>
      <template #footer>
        <Pagination :model-value="page + 1" :page-count="pages" :disabled="loading" label="문의 목록 페이지" @update:model-value="page = $event - 1" />
      </template>
    </AdminListPanel>

    <AdminReplyDialog ref="replyDialog" @saved="retry++; successNotice = '답변을 등록했습니다.'" />
    <AlertDialog :message="notice" @close="notice = ''" />
  </main>
</template>

<style scoped src="../styles/admin-inquiries.css"></style>
