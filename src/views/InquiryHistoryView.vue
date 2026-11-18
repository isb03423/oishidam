
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ActivityFilters from '../components/ActivityFilters.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import Pagination from '../components/common/Pagination.vue'
import { getExampleInquiries } from '../mocks/inquiries.js'
import { createInquiry, deleteInquiry, getInquiry, getMyInquiries } from '../services/inquiries.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'

const route = useRoute()
const router = useRouter()
const listRoute = { name: 'MyPageInquiries' }
const inquiries = ref([])
const filter = ref('all')
const page = ref(1)
const totalPages = ref(0)
const counts = ref({ pending: 0, answered: 0 })
const reload = ref(0)
const loading = ref(false)
const listError = ref('')
const expandedId = ref(null)
const detail = ref(null)
const detailLoading = ref(false)
const detailError = ref('')
const detailRetry = ref(0)
const title = ref('')
const content = ref('')
const saving = ref(false)
const deleting = ref(false)
const pendingDelete = ref(null)
const notice = ref('')
const dialog = ref(null)
const isMock = computed(() => session.source === 'mock')
const date = (value) => value?.slice(0, 16).replace('T', ' ').replaceAll('-', '.') ?? ''
const forView = (item) => ({ ...item, id: String(item.inquiryId), date: date(item.createdAt) })
const answered = (item) => isMock.value ? Boolean(item.answer) : item.status === 'ANSWERED'
const canDelete = computed(() => detail.value?.messages.every((message) => String(message.senderMemberId) === String(detail.value.memberId)) ?? false)

watch(shoppingOwner, () => {
  inquiries.value = []
  counts.value = { pending: 0, answered: 0 }
  filter.value = 'all'
  page.value = 1
  expandedId.value = null
  detail.value = null
  title.value = content.value = notice.value = ''
  dialog.value?.close()
  saving.value = deleting.value = false
  pendingDelete.value = null
}, { immediate: true })

watch([shoppingOwner, page, filter, reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  listError.value = ''
  loading.value = false
  if (isMock.value) { inquiries.value = getExampleInquiries(shoppingOwner.value); return }
  inquiries.value = []
  totalPages.value = 0
  if (session.source !== 'api') return
  loading.value = true
  try {
    const [result, pending, complete] = await Promise.all([
      getMyInquiries(page.value - 1, { status: filter.value === 'all' ? undefined : filter.value === 'pending' ? 'OPEN' : 'ANSWERED', signal: controller.signal }),
      getMyInquiries(0, { status: 'OPEN', size: 1, signal: controller.signal }),
      getMyInquiries(0, { status: 'ANSWERED', size: 1, signal: controller.signal }),
    ])
    if (controller.signal.aborted || revision !== getSessionRevision()) return
    if (page.value > 1 && page.value > result.totalPages) { page.value = Math.max(1, result.totalPages); return }
    inquiries.value = result.content.map(forView)
    totalPages.value = result.totalPages
    counts.value = { pending: pending.totalElements, answered: complete.totalElements }
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) { listError.value = failure.message; notice.value = failure.message }
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })

watch([shoppingOwner, expandedId, detailRetry], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  detail.value = null
  detailError.value = ''
  detailLoading.value = false
  if (!expandedId.value || isMock.value || session.source !== 'api') return
  detailLoading.value = true
  try {
    const result = await getInquiry(expandedId.value, { signal: controller.signal })
    if (!controller.signal.aborted && revision === getSessionRevision()) detail.value = forView(result)
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) { detailError.value = failure.message; notice.value = failure.message }
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) detailLoading.value = false
  }
})

onMounted(() => {
  if (route.name === 'MyPageInquiryWrite') dialog.value.showModal()
})
watch(() => route.name, (name) => {
  if (name === 'MyPageInquiryWrite') dialog.value?.showModal()
})
watch(() => [route.name, route.query.inquiryId], ([name, id]) => {
  expandedId.value = name === listRoute.name && typeof id === 'string' ? id : null
}, { immediate: true })

function closeInquiry() {
  if (saving.value) return
  dialog.value.close()
  title.value = content.value = ''
  if (route.name === 'MyPageInquiryWrite') router.replace(listRoute)
}

const pendingCount = computed(() => isMock.value ? inquiries.value.filter((item) => !item.answer).length : counts.value.pending)
const completeCount = computed(() => isMock.value ? inquiries.value.length - pendingCount.value : counts.value.answered)
const filters = computed(() => [
  { value: 'all', label: '전체', count: pendingCount.value + completeCount.value },
  { value: 'pending', label: '답변 대기', count: pendingCount.value },
  { value: 'answered', label: '답변 완료', count: completeCount.value },
])
const visible = computed(() => {
  if (isMock.value) return inquiries.value.filter((item) => filter.value === 'all' || Boolean(item.answer) === (filter.value === 'answered'))
  if (detail.value && expandedId.value === detail.value.id && !inquiries.value.some((item) => item.id === detail.value.id)) return [detail.value, ...inquiries.value]
  return inquiries.value
})

function changeFilter() {
  page.value = 1
  expandedId.value = null
}
function toggleInquiry(id) {
  expandedId.value = expandedId.value === id ? null : id
}

async function submit() {
  if (saving.value || !title.value.trim() || !content.value.trim()) return
  const revision = getSessionRevision()
  saving.value = true
  try {
    let created
    if (isMock.value) {
      created = { id: 'Q-' + Date.now(), title: title.value.trim(), content: content.value.trim(), date: date(new Date().toISOString()) }
      inquiries.value.unshift(created)
    } else {
      created = forView(await createInquiry({ title: title.value, content: content.value }))
    }
    if (revision !== getSessionRevision()) return
    dialog.value.close()
    title.value = content.value = ''
    filter.value = 'all'
    page.value = 1
    expandedId.value = created.id
    if (!isMock.value) reload.value++
    if (route.name === 'MyPageInquiryWrite') router.replace({ ...listRoute, query: { inquiryId: created.id } })
  } catch (failure) {
    if (revision === getSessionRevision()) notice.value = failure.message
  } finally {
    if (revision === getSessionRevision()) saving.value = false
  }
}

async function removeInquiry() {
  const item = pendingDelete.value
  if (!item || deleting.value) return
  const revision = getSessionRevision()
  pendingDelete.value = null
  deleting.value = true
  try {
    if (!isMock.value) await deleteInquiry(item.id)
    if (revision !== getSessionRevision()) return
    const index = inquiries.value.findIndex((inquiry) => inquiry.id === item.id)
    if (index !== -1) inquiries.value.splice(index, 1)
    if (expandedId.value === item.id) { expandedId.value = null; detail.value = null }
    if (route.query.inquiryId === item.id) router.replace(listRoute)
    if (!isMock.value) reload.value++
  } catch (failure) {
    if (revision === getSessionRevision()) {
      notice.value = failure.message
      if (failure.status === 409) detailRetry.value++
    }
  } finally {
    if (revision === getSessionRevision()) deleting.value = false
  }
}
</script>

<template>
  <MyPageLayout icon="inquiry" title="문의 내역" description="작성한 문의와 관리자 답변을 확인할 수 있어요.">
    <div class="activity-content">
      <div class="inquiry-toolbar">
        <ActivityFilters v-model="filter" label="문의 상태" :options="filters" @update:model-value="changeFilter" />
        <button type="button" class="activity-button is-primary inquiry-compose" aria-haspopup="dialog" @click="dialog.showModal()">문의하기</button>
      </div>
        <p v-if="loading" class="activity-empty" role="status">문의 내역을 불러오고 있어요.</p>
        <p v-if="listError" class="activity-empty">{{ listError }} <button type="button" class="activity-button" @click="reload++">다시 시도</button></p>
        <p v-if="detailError" class="activity-empty">{{ detailError }} <button type="button" class="activity-button" @click="detailRetry++">다시 시도</button></p>
        <ul v-if="visible.length" class="inquiry-items">
          <li v-for="item in visible" :key="item.id">
            <button
              type="button"
              class="inquiry-row"
              :aria-expanded="expandedId === item.id"
              :aria-controls="`inquiry-panel-${item.id}`"
              @click="toggleInquiry(item.id)"
            >
              <span class="activity-badge" :class="{ 'is-complete': answered(item) }">{{ answered(item) ? '답변 완료' : '답변 대기' }}</span>
              <strong class="inquiry-title">{{ item.title }}</strong>
              <span class="activity-meta inquiry-date">{{ item.date }}</span>
              <span class="inquiry-chevron" aria-hidden="true">›</span>
            </button>
            <div v-show="expandedId === item.id" :id="`inquiry-panel-${item.id}`" class="inquiry-expanded">
              <p v-if="detailLoading" role="status">문의 내용을 불러오고 있어요.</p>
              <template v-if="!isMock && detail?.id === item.id">
                <article v-for="message in detail.messages" :key="message.messageId" class="activity-panel"
                  :class="String(message.senderMemberId) === String(detail.memberId) ? 'inquiry-detail' : 'inquiry-answer'">
                  <header class="inquiry-detail-meta">
                    <h2 class="activity-badge">{{ String(message.senderMemberId) === String(detail.memberId) ? '문의 내용' : '관리자 답변' }}</h2>
                    <time class="activity-meta" :datetime="message.createdAt">{{ date(message.createdAt) }}</time>
                  </header>
                  <p class="activity-copy">{{ message.content }}</p>
                </article>
                <div v-if="canDelete" class="activity-actions">
                  <button type="button" class="activity-button" :disabled="deleting" @click="pendingDelete = item">{{ deleting ? '삭제 중…' : '문의 삭제' }}</button>
                </div>
              </template>
              <article v-if="isMock" class="activity-panel inquiry-detail">
                <header class="inquiry-detail-meta">
                  <h2 class="activity-badge">문의 내용</h2>
                  <span class="activity-meta">{{ item.date }}</span>
                </header>
                <p class="activity-copy">{{ item.content }}</p>
              </article>
              <section v-if="isMock && item.answer" class="activity-panel inquiry-answer" :aria-labelledby="`inquiry-answer-${item.id}`">
                <h2 class="activity-badge" :id="`inquiry-answer-${item.id}`">관리자 답변</h2>
                <p class="activity-copy">{{ item.answer }}</p>
              </section>
              <div v-if="isMock && !item.answer" class="activity-actions">
                <button type="button" class="activity-button" :disabled="deleting" @click="pendingDelete = item">문의 삭제</button>
              </div>
            </div>
          </li>
        </ul>
        <p v-else-if="!loading && !listError" class="activity-empty" role="status">해당하는 문의가 없습니다.</p>
        <Pagination v-if="!isMock" v-model="page" :page-count="totalPages" :disabled="loading" label="문의 목록 페이지" @update:model-value="expandedId = null" />
    </div>
  </MyPageLayout>
  <dialog ref="dialog" class="inquiry-dialog" aria-labelledby="inquiry-dialog-title" @cancel.prevent="closeInquiry">
      <form class="activity-editor" @submit.prevent="submit">
        <header class="inquiry-dialog-heading">
          <h2 id="inquiry-dialog-title">1:1 문의 작성</h2>
          <button type="button" class="inquiry-close" aria-label="닫기" :disabled="saving" @click="closeInquiry">×</button>
        </header>
        <label class="activity-field">
          문의 제목
          <input v-model="title" maxlength="200" required :disabled="saving" placeholder="문의 제목을 입력해 주세요." />
        </label>
        <label class="activity-field">
          문의 내용
          <textarea v-model="content" maxlength="5000" required :disabled="saving" placeholder="문의 내용을 자세히 입력해 주세요."></textarea>
        </label>
        <div class="activity-actions">
          <button type="button" class="activity-button" :disabled="saving" @click="closeInquiry">취소</button>
          <button type="submit" class="activity-button is-primary" :disabled="saving || !title.trim() || !content.trim()">{{ saving ? '등록 중…' : '등록하기' }}</button>
        </div>
      </form>
  </dialog>
  <AlertDialog :message="notice" @close="notice = ''" />
  <AlertDialog :message="pendingDelete ? '문의를 삭제할까요?' : ''" title="문의 삭제" confirm-label="삭제" cancel-label="취소" @confirm="removeInquiry" @close="pendingDelete = null" />
</template>

<style scoped src="../styles/mypage-activity.css"></style>
<style scoped>
.inquiry-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.inquiry-compose { margin-inline-start: auto; }

.inquiry-dialog {
  position: fixed;
  inset: 0;
  width: min(450px, calc(100% - 32px));
  max-height: calc(100% - 32px);
  margin: auto;
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-body);
}

.inquiry-dialog::backdrop { background: rgb(57 44 50 / 50%); }
.inquiry-dialog-heading { display: flex; align-items: center; justify-content: space-between; }
.inquiry-dialog-heading h2 { font-size: var(--font-size-section); font-weight: 700; }
.inquiry-close { border: 0; background: transparent; color: var(--color-primary); font-size: 1.5rem; line-height: 1; cursor: pointer; }
.inquiry-dialog textarea { resize: none; }
.inquiry-items {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.inquiry-items li + li { border-top: 1px solid var(--color-border); }
.inquiry-row {
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr) auto 10px;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 62px;
  padding: 12px 16px;
  border: 0;
  background: transparent;
  text-align: start;
  cursor: pointer;
  color: var(--color-text);
}

.inquiry-row:hover,
.inquiry-row:focus-visible { background: var(--color-white); }
.inquiry-row:focus-visible { outline: 2px solid var(--color-primary); outline-offset: -2px; }
.inquiry-title { overflow-wrap: anywhere; }
.inquiry-date { white-space: nowrap; }
.inquiry-chevron { color: var(--color-primary); font-size: 1.25rem; line-height: 1; }
.inquiry-row[aria-expanded="true"] .inquiry-chevron { transform: rotate(90deg); }
.inquiry-expanded { display: grid; gap: 10px; padding: 0 16px 16px; }
.activity-badge {
  justify-self: start;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-text);
  font-size: var(--font-size-label);
  font-weight: 650;
  white-space: nowrap;
}

.activity-badge.is-complete { background: #efe6f0; color: var(--color-secondary); }
.inquiry-detail,
.inquiry-answer { display: grid; gap: 10px; }
.inquiry-detail-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.inquiry-detail { border-color: #dde2f1; background: #f2f2fa; }
.inquiry-detail .activity-badge { background: #cfd8ea; color: #284368; }
.inquiry-answer { border-color: #dce7de; background: #f1f5f1; }
.inquiry-answer .activity-badge { background: #c5ddc8; color: #2e5238; }

@media (max-width: 600px) {
  .inquiry-row { grid-template-columns: auto minmax(0, 1fr) 10px; gap: 4px 8px; padding-inline: 10px; }
  .inquiry-date { grid-column: 2; grid-row: 2; }
  .inquiry-chevron { grid-column: 3; grid-row: 1 / span 2; }
}
</style>
