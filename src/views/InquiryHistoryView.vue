
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ActivityFilters from '../components/ActivityFilters.vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import { getExampleInquiries } from '../mocks/inquiries.js'
import { shoppingOwner } from '../stores/session.js'

const route = useRoute()
const router = useRouter()
const listRoute = { name: 'MyPageInquiries' }
const inquiries = ref([])
const filter = ref('all')
const expandedId = ref(null)
const title = ref('')
const content = ref('')
const dialog = ref(null)

watch(shoppingOwner, (owner) => {
  inquiries.value = getExampleInquiries(owner)
  filter.value = 'all'
  expandedId.value = null
}, { immediate: true })

onMounted(() => {
  if (route.name === 'MyPageInquiryWrite') dialog.value.showModal()
})

function closeInquiry() {
  dialog.value.close()
  title.value = ''
  content.value = ''
  if (route.name === 'MyPageInquiryWrite') router.replace(listRoute)
}

const pendingCount = computed(() => inquiries.value.filter((item) => !item.answer).length)
const filters = computed(() => [
  { value: 'all', label: '전체', count: inquiries.value.length },
  { value: 'pending', label: '답변 대기', count: pendingCount.value },
  { value: 'answered', label: '답변 완료', count: inquiries.value.length - pendingCount.value },
])
const visible = computed(() => inquiries.value.filter((item) =>
  filter.value === 'all' || Boolean(item.answer) === (filter.value === 'answered'),
))

watch(() => [route.name, route.query.inquiryId], ([name, id]) => {
  expandedId.value = name === listRoute.name && typeof id === 'string' ? id : null
}, { immediate: true })

function toggleInquiry(id) {
  expandedId.value = expandedId.value === id ? null : id
}

function submit() {
  if (!title.value.trim() || !content.value.trim()) return
  const id = 'Q-' + Date.now()
  const date = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul', dateStyle: 'short', timeStyle: 'short', hour12: false,
  }).format(new Date())
  inquiries.value.unshift({ id, title: title.value.trim(), content: content.value.trim(), date })
  filter.value = 'all'
  dialog.value.close()
  title.value = ''
  content.value = ''
  expandedId.value = id
  if (route.name === 'MyPageInquiryWrite') {
    router.replace({ ...listRoute, query: { inquiryId: id } })
  }
}
</script>

<template>
  <MyPageLayout icon="inquiry" title="문의 내역" description="작성한 문의와 관리자 답변을 확인할 수 있어요.">
    <div class="activity-content">
      <div class="inquiry-toolbar">
        <ActivityFilters v-model="filter" label="문의 상태" :options="filters" @update:model-value="expandedId = null" />
        <button type="button" class="activity-button is-primary inquiry-compose" aria-haspopup="dialog" @click="dialog.showModal()">문의하기</button>
      </div>
        <ul v-if="visible.length" class="inquiry-items">
          <li v-for="item in visible" :key="item.id">
            <button
              type="button"
              class="inquiry-row"
              :aria-expanded="expandedId === item.id"
              :aria-controls="`inquiry-panel-${item.id}`"
              @click="toggleInquiry(item.id)"
            >
              <span class="activity-badge" :class="{ 'is-complete': item.answer }">{{ item.answer ? '답변 완료' : '답변 대기' }}</span>
              <strong class="inquiry-title">{{ item.title }}</strong>
              <span class="activity-meta inquiry-date">{{ item.date }}</span>
              <span class="inquiry-chevron" aria-hidden="true">›</span>
            </button>
            <div v-show="expandedId === item.id" :id="`inquiry-panel-${item.id}`" class="inquiry-expanded">
              <article class="activity-panel inquiry-detail">
                <header class="inquiry-detail-meta">
                  <span class="activity-badge" :class="{ 'is-complete': item.answer }">{{ item.answer ? '답변 완료' : '답변 대기' }}</span>
                  <span class="activity-meta">{{ item.date }}</span>
                </header>
                <h2>{{ item.title }}</h2>
                <p class="activity-copy">{{ item.content }}</p>
              </article>
              <section class="activity-panel inquiry-answer" :aria-labelledby="`inquiry-answer-${item.id}`">
                <h2 :id="`inquiry-answer-${item.id}`">관리자 답변</h2>
                <p class="activity-copy">{{ item.answer || '아직 등록된 답변이 없습니다.' }}</p>
              </section>
            </div>
          </li>
        </ul>
        <p v-else class="activity-empty" role="status">해당하는 문의가 없습니다.</p>
    </div>
  </MyPageLayout>
  <dialog ref="dialog" class="inquiry-dialog" aria-labelledby="inquiry-dialog-title" @cancel.prevent="closeInquiry">
      <form class="activity-editor" @submit.prevent="submit">
        <header class="inquiry-dialog-heading">
          <h2 id="inquiry-dialog-title">1:1 문의 작성</h2>
          <button type="button" class="inquiry-close" aria-label="닫기" @click="closeInquiry">×</button>
        </header>
        <label class="activity-field">
          문의 제목
          <input v-model="title" maxlength="100" required placeholder="문의 제목을 입력해 주세요." />
        </label>
        <label class="activity-field">
          문의 내용
          <textarea v-model="content" maxlength="2000" required placeholder="문의 내용을 자세히 입력해 주세요."></textarea>
        </label>
        <div class="activity-actions">
          <button type="button" class="activity-button" @click="closeInquiry">취소</button>
          <button type="submit" class="activity-button is-primary" :disabled="!title.trim() || !content.trim()">등록하기</button>
        </div>
      </form>
  </dialog>
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
  font-size: 14px;
}

.inquiry-dialog::backdrop { background: rgb(57 44 50 / 50%); }
.inquiry-dialog-heading { display: flex; align-items: center; justify-content: space-between; }
.inquiry-dialog-heading h2 { font-size: 17px; font-weight: 700; }
.inquiry-close { border: 0; background: transparent; color: var(--color-primary); font-size: 24px; line-height: 1; cursor: pointer; }
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
.inquiry-row:focus-visible { background: var(--color-background); }
.inquiry-row:focus-visible { outline: 2px solid var(--color-primary); outline-offset: -2px; }
.inquiry-title,
.inquiry-detail h2 { overflow-wrap: anywhere; }
.inquiry-date { white-space: nowrap; }
.inquiry-chevron { color: var(--color-primary); font-size: 20px; line-height: 1; }
.inquiry-row[aria-expanded="true"] .inquiry-chevron { transform: rotate(90deg); }
.inquiry-expanded { display: grid; gap: 10px; padding: 0 16px 16px; }
.activity-badge {
  justify-self: start;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-text);
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}

.activity-badge.is-complete { background: #efe6f0; color: var(--color-secondary); }
.inquiry-detail,
.inquiry-answer { display: grid; gap: 10px; }
.inquiry-detail h2,
.inquiry-answer h2 { font-size: 16px; font-weight: 700; }
.inquiry-detail-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.inquiry-answer { border-color: transparent; background: var(--color-background); }

@media (max-width: 600px) {
  .inquiry-row { grid-template-columns: auto minmax(0, 1fr) 10px; gap: 4px 8px; padding-inline: 10px; }
  .inquiry-date { grid-column: 2; grid-row: 2; }
  .inquiry-chevron { grid-column: 3; grid-row: 1 / span 2; }
}
</style>
