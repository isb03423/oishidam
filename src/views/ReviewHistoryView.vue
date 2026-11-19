
<script setup>
import ReviewRating from '../components/common/ReviewRating.vue'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import ActivityFilters from '../components/ActivityFilters.vue'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import ReviewProduct from '../components/ReviewProduct.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import { createReview, deleteReview as deleteServerReview, getMyReviews, updateReview } from '../services/reviews.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'
import { exampleOrderProduct, getExampleOrders } from '../mocks/orders.js'

const eligible = ref([])
const written = ref([])
const counts = ref({ eligible: 0, written: 0 })
const page = ref(1)
const totalPages = ref(0)
const reload = ref(0)
const loading = ref(false)
const loadError = ref('')
const notice = ref('')
const busy = ref(false)
const isMock = computed(() => session.source === 'mock')
const tab = ref('eligible')
const editing = ref(null)
const content = ref('')
const rating = ref(null)
const draftImages = ref([])
const imageInput = ref(null)
const imageError = ref('')
const dragging = ref(false)
const dialog = ref(null)
const deleteDialog = ref(null)
const writtenHeading = ref(null)
const updating = ref(false)
const filters = computed(() => [
  { value: 'eligible', label: '작성 가능한 후기', count: isMock.value ? eligible.value.length : counts.value.eligible },
  { value: 'written', label: '작성한 후기', count: isMock.value ? written.value.length : counts.value.written },
])

watch(shoppingOwner, () => {
  closeEditor(true)
  eligible.value = written.value = []
  counts.value = { eligible: 0, written: 0 }
  page.value = 1
  tab.value = 'eligible'
  notice.value = ''
  busy.value = false
  if (isMock.value) {
    const formatter = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    eligible.value = getExampleOrders(new Date()).filter((order) => order.status === '배송완료').slice(0, 2).map((order) => {
      const delivered = new Date(order.date)
      delivered.setDate(delivered.getDate() + 2)
      const deadline = new Date(delivered)
      deadline.setDate(deadline.getDate() + 30)
      return { ...order.items[0], id: order.id, ordered: formatter.format(order.date), delivered: formatter.format(delivered), deadline: formatter.format(deadline) }
    })
    written.value = [
      { id: 'sample-review-1', ...exampleOrderProduct('bourbon'), content: '커피와 곁들이기 좋아요.' },
      { id: 'sample-review-2', ...exampleOrderProduct('jagarico'), content: '바삭해서 간식으로 먹기 좋았어요.' },
      { id: 'sample-review-3', ...exampleOrderProduct('pocky'), content: '딸기 향이 은은해서 좋았어요.' },
    ]
  }
}, { immediate: true })

watch([shoppingOwner, tab, page, reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  loadError.value = ''
  loading.value = false
  if (isMock.value || session.source !== 'api') return
  eligible.value = written.value = []
  totalPages.value = 0
  loading.value = true
  const selected = tab.value
  const other = selected === 'eligible' ? 'written' : 'eligible'
  try {
    const [result, otherList] = await Promise.all([
      getMyReviews(selected, page.value - 1, { signal: controller.signal }),
      getMyReviews(other, 0, { size: 1, signal: controller.signal }),
    ])
    if (controller.signal.aborted || revision !== getSessionRevision()) return
    if (page.value > 1 && page.value > result.totalPages) { page.value = Math.max(1, result.totalPages); return }
    if (selected === 'eligible') eligible.value = result.content
    else written.value = result.content
    counts.value = { [selected]: result.totalElements, [other]: otherList.totalElements }
    totalPages.value = result.totalPages
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) { loadError.value = failure.message; notice.value = failure.message }
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })

function addImages(files) {
  if (busy.value) return
  const errors = new Set()
  for (const file of files) {
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type) || !file.size) {
      errors.add('이미지 파일만 첨부할 수 있어요.')
      continue
    }
    if (file.size > 10 * 1024 * 1024) {
      errors.add('이미지는 한 장당 10MB까지 첨부할 수 있어요.')
      continue
    }
    if (draftImages.value.some(({ file: attached }) =>
      attached?.name === file.name && attached.size === file.size && attached.lastModified === file.lastModified)) continue
    if (draftImages.value.length >= 5) {
      errors.add('이미지는 최대 5장까지 첨부할 수 있어요.')
      break
    }
    draftImages.value.push({ file, url: URL.createObjectURL(file) })
  }
  imageError.value = [...errors].join(' ')
}

function selectImages(event) {
  addImages(event.target.files)
  event.target.value = ''
}

function dropImages(event) {
  dragging.value = false
  addImages(event.dataTransfer.files)
}

function leaveDropZone(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) dragging.value = false
}

function revokeImages(images, retained = []) {
  for (const image of images) {
    if (image.url?.startsWith('blob:') && !retained.includes(image)) URL.revokeObjectURL(image.url)
  }
}

function removeImage(index) {
  if (busy.value) return
  revokeImages(draftImages.value.splice(index, 1), editing.value?.images)
  imageError.value = ''
}

onBeforeUnmount(() => {
  revokeImages(draftImages.value, editing.value?.images)
  for (const item of written.value) revokeImages(item.images ?? [])
})

function startReview(item, isUpdate = false) {
  if (busy.value || (!isMock.value && isUpdate && !item.editable)) return
  draftImages.value = isUpdate ? [...(item.images ?? [])] : []
  editing.value = item
  updating.value = isUpdate
  content.value = isUpdate ? item.content : ''
  rating.value = isUpdate ? item.rating ?? null : null
  dialog.value.showModal()
}

function closeEditor(force = false) {
  if (busy.value && force !== true) return
  dialog.value?.close()
  revokeImages(draftImages.value, editing.value?.images)
  draftImages.value = []
  imageError.value = ''
  dragging.value = false
  editing.value = null
  content.value = ''
  rating.value = null
  updating.value = false
}

async function saveReview() {
  const text = content.value.trim()
  const item = editing.value
  if (!item || !text || (!updating.value && rating.value == null) || busy.value) return
  if (!isMock.value) {
    const revision = getSessionRevision()
    busy.value = true
    try {
      if (updating.value) await updateReview(item.id, text, draftImages.value, rating.value ?? undefined)
      else await createReview(item.orderItemId, text, draftImages.value, rating.value ?? undefined)
      if (revision !== getSessionRevision()) return
      closeEditor(true)
      tab.value = 'written'
      page.value = 1
      reload.value++
      await nextTick()
      writtenHeading.value?.focus()
    } catch (failure) {
      if (revision === getSessionRevision()) notice.value = failure.message
    } finally {
      if (revision === getSessionRevision()) busy.value = false
    }
    return
  }
  const images = draftImages.value
  draftImages.value = []
  if (updating.value) {
    revokeImages(item.images ?? [], images)
    item.images = images
    item.content = text
    item.rating = rating.value
    closeEditor()
    return
  }
  written.value.unshift({ ...item, content: text, rating: rating.value, images })
  eligible.value = eligible.value.filter((row) => row.id !== item.id)
  closeEditor()
  tab.value = 'written'
  await nextTick()
  writtenHeading.value?.focus()
}

async function deleteReview(ids) {
  if (busy.value) return
  if (!isMock.value) {
    const revision = getSessionRevision()
    busy.value = true
    try {
      const results = await Promise.allSettled(ids.map(deleteServerReview))
      if (revision !== getSessionRevision()) return
      const failure = results.find((result) => result.status === 'rejected')
      if (failure) notice.value = failure.reason.message
      reload.value++
    } finally {
      if (revision === getSessionRevision()) busy.value = false
    }
    return
  }
  for (const item of written.value) {
    if (ids.includes(item.id)) revokeImages(item.images ?? [])
  }
  written.value = written.value.filter((item) => !ids.includes(item.id))
}
</script>

<template>
  <MyPageLayout icon="review" title="마이 후기" description="구매한 상품의 후기를 작성하고 관리해보세요.">
    <div class="activity-content">
      <ActivityFilters v-model="tab" label="후기 목록" :options="filters" @update:model-value="page = 1" />
      <p v-if="loading" class="activity-empty" role="status">후기를 불러오고 있어요.</p>
      <p v-if="loadError" class="activity-empty">{{ loadError }} <button type="button" class="activity-button" @click="reload++">다시 시도</button></p>

      <div v-if="tab === 'eligible'" class="review-list">
        <article v-for="item in eligible" :key="item.id" class="activity-panel review-card">
          <ReviewProduct :item="item" />
          <div class="review-actions">
            <button type="button" class="activity-button review-secondary-button" :disabled="busy" @click="startReview(item)">후기 작성하기</button>
            <small class="activity-meta">작성 기한 {{ item.deadline }}까지</small>
          </div>
        </article>
        <p v-if="!loading && !loadError && !eligible.length" class="activity-empty" role="status">작성 가능한 후기가 없습니다.</p>
      </div>

      <section v-else ref="writtenHeading" class="review-list" aria-label="작성한 후기" tabindex="-1">
        <article v-for="item in written" :key="item.id" class="activity-panel written-review-card">
          <div class="written-review-product">
            <RouterLink :to="{ name: 'ProductDetail', params: { productId: item.product_id } }" class="written-product-photo" :aria-label="item.name + ' 상품 보기'">
              <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" loading="lazy" />
              <span v-else>이미지 없음</span>
            </RouterLink>
            <div class="written-product-info">
              <h2>{{ item.name }}</h2>
              <p class="written-order-dates"><span>주문일 {{ item.ordered || '—' }}</span><span>배송 완료 {{ item.delivered || '—' }}</span></p>
              <div class="written-review-rating"><ReviewRating :rating="item.rating" /><strong v-if="item.rating != null" aria-hidden="true">{{ Number(item.rating).toFixed(1) }}</strong></div>
            </div>
          </div>
          <p class="written-review-copy">{{ item.content }}</p>
            <ul v-if="item.images?.length" class="review-images written-review-images" aria-label="후기 첨부 이미지">
              <li v-for="image in item.images" :key="image.url">
                <img :src="image.url" :alt="image.file?.name || '후기 첨부 이미지'" loading="lazy" />
              </li>
            </ul>
          <div v-if="item.reply" class="written-review-reply">
            <div class="written-reply-heading">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 18 3 21v-6a8 8 0 1 1 4 3Z" /><path d="M7 10h2m2 0h2m2 0h2" /></svg>
              <strong>관리자 답변</strong><time v-if="item.replyDate">{{ item.replyDate }}</time>
            </div>
            <p>{{ item.reply }}</p>
          </div>
          <div class="review-actions review-actions--management written-review-footer">
            <small v-if="!isMock" class="activity-meta">{{ item.editable ? `수정·삭제 기한 ${item.editableUntil?.replace('T', ' ').slice(0, 16)}` : '수정·삭제 기한이 지났습니다.' }}</small>
            <button type="button" class="activity-button written-edit-button" :disabled="busy || (!isMock && !item.editable)" @click="startReview(item, true)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m16 3 5 5-12 12-6 1 1-6Z M13 6l5 5" /></svg>수정</button>
            <button type="button" class="activity-button written-delete-button" :disabled="busy || (!isMock && !item.editable)" @click="deleteDialog.open([item.id])"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 6h18 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7" /></svg>삭제</button>
          </div>
        </article>
        <p v-if="!loading && !loadError && !written.length" class="activity-empty" role="status">작성한 후기가 없습니다.</p>
      </section>
      <Pagination v-if="!isMock" v-model="page" :page-count="totalPages" :disabled="loading || busy" label="후기 목록 페이지" />
    </div>
  </MyPageLayout>

  <dialog ref="dialog" class="review-dialog" aria-labelledby="review-dialog-title" @cancel.self.prevent="closeEditor">
    <form class="activity-editor" @submit.prevent="saveReview">
      <header class="review-dialog-heading">
        <h2 id="review-dialog-title">{{ updating ? '후기 수정하기' : '후기 작성하기' }}</h2>
        <button type="button" class="review-close" aria-label="닫기" :disabled="busy" @click="closeEditor">×</button>
      </header>
      <div v-if="editing" class="activity-panel review-dialog-product"><ReviewProduct :item="editing" /></div>
      <div class="review-rating-panel">
        <fieldset class="review-rating" :disabled="busy">
          <legend class="review-rating-label">상품은 만족스러우셨나요?</legend>
          <div class="review-rating-options">
            <label v-for="score in 5" :key="score" :for="'review-rating-' + score" class="review-rating-option" :class="{ 'is-selected': score <= rating }">
              <input :id="'review-rating-' + score" v-model="rating" type="radio" name="review-rating" :value="score" :aria-label="score + '점'" :required="!updating" />
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9Z" />
              </svg>
            </label>
          </div>
          <p class="review-rating-value" aria-hidden="true">
            {{ rating ? rating + ' / 5' : '별을 눌러 평가해 주세요' }}
          </p>
        </fieldset>
      </div>
      <label class="activity-field">
        후기 내용
        <textarea v-model="content" maxlength="5000" required :disabled="busy" placeholder="상품 후기를 입력해 주세요."></textarea>
      </label>
      <fieldset class="review-attachments" :disabled="busy">
        <legend>후기 이미지</legend>
        <div
          class="review-drop-zone"
          :class="{ 'is-dragging': dragging }"
          @dragover.prevent="dragging = true"
          @dragleave="leaveDropZone"
          @drop.prevent="dropImages"
        >
          <p>이미지를 여기로 끌어다 놓으세요.</p>
          <button type="button" class="activity-button" aria-describedby="review-image-help" @click="imageInput.click()">파일 선택</button>
          <input ref="imageInput" type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple hidden @change="selectImages" />
        </div>
        <p id="review-image-help" class="review-image-help">최대 5장, 한 장당 10MB</p>
        <p v-if="imageError" class="review-image-error" role="alert">{{ imageError }}</p>
        <ul v-if="draftImages.length" class="review-images" aria-label="첨부할 이미지">
          <li v-for="(image, index) in draftImages" :key="image.url">
            <img :src="image.url" :alt="image.file?.name || '후기 첨부 이미지'" />
            <button type="button" :aria-label="(image.file?.name || '기존 이미지') + ' 첨부 제거'" @click="removeImage(index)">×</button>
          </li>
        </ul>
      </fieldset>
      <div class="activity-actions">
        <button type="button" class="activity-button" :disabled="busy" @click="closeEditor">취소</button>
        <button type="submit" class="activity-button is-primary" :disabled="busy">{{ busy ? '저장 중…' : updating ? '저장하기' : '등록하기' }}</button>
      </div>
    </form>
  </dialog>

  <DeleteConfirmationDialog ref="deleteDialog" description="작성한 후기를 삭제합니다." @confirm="deleteReview" />
  <AlertDialog :message="notice" @close="notice = ''" />
</template>

<style scoped src="../styles/mypage-activity.css"></style>
<style scoped>
.review-list { display: grid; gap: 8px; }
.review-card { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 14px; padding: 12px 14px; }
.review-card .activity-button { min-height: 28px; border-radius: 999px; font-size: var(--font-size-control); }
.review-card .review-secondary-button {
  border-color: var(--color-secondary);
  background: var(--color-secondary);
  color: var(--color-white);
}

.review-copy { font-size: var(--font-size-table); }
.review-actions { display: grid; justify-items: end; gap: 5px; }
.review-actions--management { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
.written-review-card { display: grid; gap: 16px; padding: 22px 24px; border: 1px solid #eadde5; border-radius: 18px; background: #fff; }
.written-review-product { display: grid; grid-template-columns: 112px minmax(0, 1fr); gap: 22px; align-items: start; }
.written-product-photo { display: grid; place-items: center; width: 112px; aspect-ratio: 1; overflow: hidden; border-radius: 10px; background: #fcf4f8; color: var(--color-secondary); font-size: 12px; }
.written-product-photo img { width: 100%; height: 100%; object-fit: cover; }
.written-product-info { min-width: 0; }
.written-product-info h2 { margin: 0 0 10px; font-size: 19px; font-weight: 750; line-height: 1.45; overflow-wrap: anywhere; }
.written-order-dates { display: flex; flex-wrap: wrap; gap: 6px 14px; margin: 0 0 12px; color: var(--color-secondary); font-size: 14px; }
.written-order-dates span + span { padding-left: 14px; border-left: 1px solid #deced7; }
.written-review-rating { display: flex; align-items: center; gap: 12px; color: #b43e63; }
.written-review-rating :deep(.review-rating-stars svg) { width: 23px; height: 23px; }
.written-review-rating :deep(.review-rating-display) { color: #b43e63; }
.written-review-rating :deep(.review-rating-display > span:last-child) { display: none; }
.written-review-rating > strong { font-size: 21px; font-weight: 700; }
.written-review-copy { margin: 0; font-size: 16px; line-height: 1.7; white-space: pre-wrap; overflow-wrap: anywhere; }
.written-review-images { gap: 12px; margin: 0; }
.written-review-images img { width: 88px; height: 88px; border-radius: 10px; }
.written-review-reply { padding: 14px 18px; border-radius: 12px; background: #f7f2f5; }
.written-reply-heading { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 15px; }
.written-reply-heading svg { width: 20px; height: 20px; color: #b43e63; }
.written-reply-heading strong { font-weight: 700; }
.written-reply-heading time { border-left: 1px solid #d9c8d2; padding-left: 12px; color: var(--color-secondary); font-size: 13px; }
.written-review-reply p { margin: 7px 0 0 32px; font-size: 15px; line-height: 1.65; white-space: pre-wrap; overflow-wrap: anywhere; }
.written-review-footer { align-items: center; gap: 10px; margin-top: 2px; padding-top: 16px; border-top: 1px solid #eee4eb; }
.written-review-footer .activity-meta { flex: 1 1 240px; font-size: 13px; color: var(--color-secondary); }
.written-review-footer .activity-button { gap: 7px; min-height: 38px; min-width: 88px; padding: 7px 16px; border-radius: 10px; font-size: 15px; font-weight: 650; }
.written-review-footer svg { width: 19px; height: 19px; }
.written-review-footer .written-edit-button { border-color: #af4665; background: #af4665; color: white; }
.written-review-footer .written-delete-button { border-color: #ba617d; color: #af4665; background: white; }
@media (max-width: 600px) {
  .written-review-card { padding: 16px; gap: 14px; }
  .written-review-product { grid-template-columns: 80px minmax(0, 1fr); gap: 14px; }
  .written-product-photo { width: 80px; }
  .written-product-info h2 { font-size: 16px; margin-bottom: 6px; }
  .written-order-dates { font-size: 12px; gap: 4px; margin-bottom: 6px; }
  .written-order-dates span + span { border: 0; padding: 0; }
  .written-review-rating :deep(.review-rating-stars svg) { width: 18px; height: 18px; }
  .written-review-rating > strong { font-size: 18px; }
  .written-review-footer .activity-meta { flex-basis: 100%; }
}
.review-dialog {
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

.review-dialog::backdrop { background: rgb(57 44 50 / 50%); }
.review-dialog-heading { display: flex; align-items: center; justify-content: space-between; }
.review-dialog-heading h2 { font-size: var(--font-size-section); font-weight: 700; }
.review-close { border: 0; background: transparent; color: var(--color-primary); font-size: 1.5rem; line-height: 1; cursor: pointer; }
.review-dialog textarea { resize: none; }
.review-dialog-product { padding: 10px; background: var(--color-background); }

.review-rating-panel {
  padding: 12px 8px;
  border-radius: 12px;
  background: #fdf5f6;
  text-align: center;
}
.review-rating {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.review-rating-label { width: 100%; margin: 0; padding: 0; color: #795e68; font-size: 14px; }
.review-rating-options { display: flex; justify-content: center; align-items: center; }
.review-rating-option {
  position: relative;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  color: #d3bec6;
  cursor: pointer;
}
.review-rating-option svg {
  width: 26px;
  height: 26px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linejoin: round;
}
.review-rating-option.is-selected { color: var(--color-primary); }
.review-rating-option.is-selected svg { fill: currentColor; }
.review-rating-option input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}
.review-rating-option:hover { color: var(--color-primary); }
.review-rating-option:focus-within { outline: 2px solid var(--color-primary); }
.review-rating:disabled .review-rating-option { cursor: default; opacity: .6; }
.review-rating-value { margin: 0; color: var(--color-primary); font-size: 14px; }

.review-attachments { min-width: 0; }
.review-attachments legend { margin-bottom: 6px; font-weight: 700; }
.review-drop-zone {
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 14px;
  border: 1px dashed var(--color-secondary);
  border-radius: 8px;
  text-align: center;
}
.review-drop-zone.is-dragging { border-color: var(--color-primary); background: var(--color-accent); }
.review-image-help, .review-image-error { margin-top: 6px; font-size: var(--font-size-label); }
.review-image-help { color: var(--color-secondary); }
.review-image-error { color: var(--color-primary); }
.review-images { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 0; padding: 0; list-style: none; }
.review-images li { position: relative; }
.review-images img { display: block; width: 64px; height: 64px; border-radius: 8px; object-fit: cover; }
.review-images button {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 26px;
  height: 26px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-section);
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 520px) {
  .review-card { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .review-actions { justify-items: start; }
  .review-actions--management { justify-content: flex-start; }
}
</style>
