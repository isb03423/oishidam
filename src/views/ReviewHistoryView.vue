
<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import ActivityFilters from '../components/ActivityFilters.vue'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import ReviewProduct from '../components/ReviewProduct.vue'
import { exampleOrderProduct, getExampleOrders } from '../mocks/orders.js'

const formatter = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
const examples = getExampleOrders(new Date()).filter((order) => order.status === '배송완료').slice(0, 2)
const eligible = ref(examples.map((order) => {
  const delivered = new Date(order.date)
  delivered.setDate(delivered.getDate() + 2)
  const deadline = new Date(delivered)
  deadline.setDate(deadline.getDate() + 30)
  return { ...order.items[0], id: order.id, ordered: formatter.format(order.date), delivered: formatter.format(delivered), deadline: deadline.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) }
}))
const written = ref([
  { id: 'sample-review-1', ...exampleOrderProduct('bourbon'), content: '커피와 곁들이기 좋아요.' },
  { id: 'sample-review-2', ...exampleOrderProduct('jagarico'), content: '바삭해서 간식으로 먹기 좋았어요.' },
  { id: 'sample-review-3', ...exampleOrderProduct('pocky'), content: '딸기 향이 은은해서 좋았어요.' },
])
const tab = ref('eligible')
const editing = ref(null)
const content = ref('')
const draftImages = ref([])
const imageInput = ref(null)
const imageError = ref('')
const dragging = ref(false)
const dialog = ref(null)
const deleteDialog = ref(null)
const writtenHeading = ref(null)
const updating = ref(false)
const filters = computed(() => [
  { value: 'eligible', label: '작성 가능한 후기', count: eligible.value.length },
  { value: 'written', label: '작성한 후기', count: written.value.length },
])

function addImages(files) {
  const errors = new Set()
  for (const file of files) {
    if (!file.type.startsWith('image/') || !file.size) {
      errors.add('이미지 파일만 첨부할 수 있어요.')
      continue
    }
    if (file.size > 10 * 1024 * 1024) {
      errors.add('이미지는 한 장당 10MB까지 첨부할 수 있어요.')
      continue
    }
    if (draftImages.value.some(({ file: attached }) =>
      attached.name === file.name && attached.size === file.size && attached.lastModified === file.lastModified)) continue
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
    if (!retained.includes(image)) URL.revokeObjectURL(image.url)
  }
}

function removeImage(index) {
  revokeImages(draftImages.value.splice(index, 1), editing.value?.images)
  imageError.value = ''
}

onBeforeUnmount(() => {
  revokeImages(draftImages.value, editing.value?.images)
  for (const item of written.value) revokeImages(item.images ?? [])
})

function startReview(item, isUpdate = false) {
  draftImages.value = isUpdate ? [...(item.images ?? [])] : []
  editing.value = item
  updating.value = isUpdate
  content.value = isUpdate ? item.content : ''
  dialog.value.showModal()
}

function closeEditor() {
  dialog.value.close()
  revokeImages(draftImages.value, editing.value?.images)
  draftImages.value = []
  imageError.value = ''
  dragging.value = false
  editing.value = null
  content.value = ''
  updating.value = false
}

async function saveReview() {
  const text = content.value.trim()
  const item = editing.value
  if (!item || !text) return
  const images = draftImages.value
  draftImages.value = []
  if (updating.value) {
    revokeImages(item.images ?? [], images)
    item.images = images
    item.content = text
    closeEditor()
    return
  }
  written.value.unshift({ ...item, content: text, images })
  eligible.value = eligible.value.filter((row) => row.id !== item.id)
  closeEditor()
  tab.value = 'written'
  await nextTick()
  writtenHeading.value?.focus()
}

function deleteReview(ids) {
  for (const item of written.value) {
    if (ids.includes(item.id)) revokeImages(item.images ?? [])
  }
  written.value = written.value.filter((item) => !ids.includes(item.id))
}
</script>

<template>
  <MyPageLayout icon="review" title="마이 후기" description="구매한 상품의 후기를 작성하고 관리해보세요.">
    <div class="activity-content">
      <ActivityFilters v-model="tab" label="후기 목록" :options="filters" />

      <div v-if="tab === 'eligible'" class="review-list">
        <article v-for="item in eligible" :key="item.id" class="activity-panel review-card">
          <ReviewProduct :item="item" />
          <div class="review-actions">
            <button type="button" class="activity-button review-secondary-button" @click="startReview(item)">후기 작성하기</button>
            <small class="activity-meta">작성 기한 {{ item.deadline }}까지</small>
          </div>
        </article>
        <p v-if="!eligible.length" class="activity-empty" role="status">작성 가능한 후기가 없습니다.</p>
      </div>

      <section v-else class="review-list" aria-labelledby="written-review-heading">
        <h2 id="written-review-heading" ref="writtenHeading" class="review-list-heading" tabindex="-1">작성한 후기 ({{ written.length }})</h2>
        <article v-for="item in written" :key="item.id" class="activity-panel review-card">
          <ReviewProduct :item="item">
            <p class="activity-copy review-copy">{{ item.content }}</p>
            <ul v-if="item.images?.length" class="review-images" aria-label="후기 첨부 이미지">
              <li v-for="image in item.images" :key="image.url">
                <img :src="image.url" :alt="image.file.name" loading="lazy" />
              </li>
            </ul>
          </ReviewProduct>
          <div class="review-actions review-actions--management">
            <button type="button" class="activity-button review-secondary-button" @click="startReview(item, true)">수정하기</button>
            <button type="button" class="activity-button" @click="deleteDialog.open([item.id])">삭제</button>
          </div>
        </article>
        <p v-if="!written.length" class="activity-empty" role="status">작성한 후기가 없습니다.</p>
      </section>
    </div>
  </MyPageLayout>

  <dialog ref="dialog" class="review-dialog" aria-labelledby="review-dialog-title" @cancel.self.prevent="closeEditor">
    <form class="activity-editor" @submit.prevent="saveReview">
      <header class="review-dialog-heading">
        <h2 id="review-dialog-title">{{ updating ? '후기 수정하기' : '후기 작성하기' }}</h2>
        <button type="button" class="review-close" aria-label="닫기" @click="closeEditor">×</button>
      </header>
      <div v-if="editing" class="activity-panel review-dialog-product"><ReviewProduct :item="editing" /></div>
      <label class="activity-field">
        후기 내용
        <textarea v-model="content" maxlength="5000" required placeholder="상품 후기를 입력해 주세요."></textarea>
      </label>
      <fieldset class="review-attachments">
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
          <input ref="imageInput" type="file" accept="image/*" multiple hidden @change="selectImages" />
        </div>
        <p id="review-image-help" class="review-image-help">최대 5장, 한 장당 10MB</p>
        <p v-if="imageError" class="review-image-error" role="alert">{{ imageError }}</p>
        <ul v-if="draftImages.length" class="review-images" aria-label="첨부할 이미지">
          <li v-for="(image, index) in draftImages" :key="image.url">
            <img :src="image.url" :alt="image.file.name" />
            <button type="button" :aria-label="image.file.name + ' 첨부 제거'" @click="removeImage(index)">×</button>
          </li>
        </ul>
      </fieldset>
      <div class="activity-actions">
        <button type="button" class="activity-button" @click="closeEditor">취소</button>
        <button type="submit" class="activity-button is-primary" :disabled="!content.trim()">{{ updating ? '저장하기' : '등록하기' }}</button>
      </div>
    </form>
  </dialog>

  <DeleteConfirmationDialog ref="deleteDialog" description="작성한 후기를 삭제합니다." @confirm="deleteReview" />
</template>

<style scoped src="../styles/mypage-activity.css"></style>
<style scoped>
.review-list { display: grid; gap: 8px; }
.review-list-heading { margin-bottom: 2px; color: var(--color-primary); font-size: 14px; font-weight: 700; }
.review-card { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 14px; padding: 12px 14px; }
.review-card .activity-button { min-height: 28px; border-radius: 999px; font-size: 12px; }
.review-card .review-secondary-button {
  border-color: var(--color-secondary);
  background: var(--color-secondary);
  color: var(--color-white);
}

.review-copy { font-size: 13px; }
.review-actions { display: grid; justify-items: end; gap: 5px; }
.review-actions--management { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
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
  font-size: 14px;
}

.review-dialog::backdrop { background: rgb(57 44 50 / 50%); }
.review-dialog-heading { display: flex; align-items: center; justify-content: space-between; }
.review-dialog-heading h2 { font-size: 17px; font-weight: 700; }
.review-close { border: 0; background: transparent; color: var(--color-primary); font-size: 24px; line-height: 1; cursor: pointer; }
.review-dialog textarea { resize: none; }
.review-dialog-product { padding: 10px; background: var(--color-background); }

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
.review-image-help, .review-image-error { margin-top: 6px; font-size: 12px; }
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
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 520px) {
  .review-card { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .review-actions { justify-items: start; }
  .review-actions--management { justify-content: flex-start; }
}
</style>
