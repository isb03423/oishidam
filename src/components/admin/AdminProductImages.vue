<script setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue'
import AlertDialog from '../common/AlertDialog.vue'
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue'
import { deleteAdminImage, getAdminDetail, saveAdminImage, uploadAdminImage } from '../../services/admin.js'
import { getSessionRevision, shoppingOwner } from '../../stores/session.js'

const props = defineProps({ productId: { type: [Number, String], required: true }, disabled: Boolean })
const emit = defineEmits(['busy'])
const images = ref([])
const loading = ref(false)
const busy = ref(false)
const notice = ref('')
const loadError = ref('')
const retry = ref(0)
const mode = ref('file')
const file = ref(null)
const fileInput = ref(null)
const deletion = ref(null)
const draft = reactive({ imageId: null, storageKey: '', altText: '', sortOrder: 0, isPrimary: false })
let version = 0
let disposed = false
onBeforeUnmount(() => { disposed = true; emit('busy', false) })

function reset() {
  Object.assign(draft, { imageId: null, storageKey: '', altText: '', sortOrder: images.value.length, isPrimary: images.value.length === 0 })
  mode.value = 'file'
  file.value = null
  if (fileInput.value) fileInput.value.value = ''
}

watch([() => props.productId, shoppingOwner, retry], async (_, __, onCleanup) => {
  const current = ++version
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  images.value = []
  loadError.value = ''
  loading.value = true
  try {
    const result = await getAdminDetail('products', props.productId, controller.signal)
    if (!controller.signal.aborted && current === version && revision === getSessionRevision()) { images.value = result.images; reset() }
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) { loadError.value = failure.message; notice.value = failure.message }
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })

function edit(image) {
  Object.assign(draft, image)
  mode.value = 'url'
  file.value = null
}

async function change(action) {
  if (busy.value || props.disabled) return
  const current = version
  const revision = getSessionRevision()
  busy.value = true
  emit('busy', true)
  try {
    await action()
    if (disposed || current !== version || revision !== getSessionRevision()) return
    const result = await getAdminDetail('products', props.productId)
    if (disposed || current !== version || revision !== getSessionRevision()) return
    images.value = result.images
    reset()
    notice.value = '이미지 변경을 저장했습니다.'
  } catch (failure) {
    if (!disposed && current === version && revision === getSessionRevision()) notice.value = failure.message
  } finally {
    if (!disposed && current === version && revision === getSessionRevision()) { busy.value = false; emit('busy', false) }
  }
}

function save() {
  if (!Number.isSafeInteger(draft.sortOrder) || draft.sortOrder < 0) { notice.value = '표시 순서를 확인해 주세요.'; return }
  const data = { storageKey: draft.storageKey.trim(), altText: draft.altText.trim(), sortOrder: draft.sortOrder, isPrimary: draft.isPrimary }
  if (draft.imageId == null && mode.value === 'file') {
    if (!file.value || !file.value.size || !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.value.type) || file.value.size > 10 * 1024 * 1024) {
      notice.value = '10MB 이하의 JPEG, PNG, GIF 또는 WebP 이미지를 선택해 주세요.'
      return
    }
    change(() => uploadAdminImage(props.productId, file.value, data))
  } else {
    if (!/^https:\/\//i.test(data.storageKey)) { notice.value = 'HTTPS 이미지 주소를 입력해 주세요.'; return }
    change(() => saveAdminImage(props.productId, draft.imageId, data))
  }
}
</script>

<template>
  <section aria-label="상품 이미지 관리">
    <h3>상품 이미지</h3>
    <p v-if="loading" role="status">이미지를 불러오는 중이에요.</p>
    <p v-if="loadError">{{ loadError }} <button type="button" :disabled="busy" @click="retry++">다시 시도</button></p>
    <ul v-if="images.length" class="images">
      <li v-for="image in images" :key="image.imageId">
        <img :src="image.storageKey" :alt="image.altText || '상품 이미지'" loading="lazy" />
        <span>{{ image.isPrimary ? '대표 이미지 · ' : '' }}순서 {{ image.sortOrder }}</span>
        <div class="actions"><button type="button" :disabled="busy || disabled" @click="edit(image)">수정</button><button type="button" :disabled="busy || disabled" @click="deletion.open([image.imageId])">삭제</button></div>
      </li>
    </ul>
    <form v-if="!loading && !loadError" class="editor" @submit.prevent="save">
      <h3>{{ draft.imageId == null ? '이미지 추가' : '이미지 수정' }}</h3>
      <label v-if="draft.imageId == null">등록 방식 <select v-model="mode" :disabled="busy || disabled"><option value="file">파일 업로드</option><option value="url">이미지 주소</option></select></label>
      <label v-if="draft.imageId == null && mode === 'file'">이미지 파일 <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/gif,image/webp" required :disabled="busy || disabled" @change="file = $event.target.files[0]" /></label>
      <label v-else>이미지 주소 <input v-model="draft.storageKey" type="url" maxlength="500" required :disabled="busy || disabled" /></label>
      <label>대체 텍스트 <input v-model="draft.altText" maxlength="255" :disabled="busy || disabled" /></label>
      <label>표시 순서 <input v-model.number="draft.sortOrder" type="number" min="0" max="2147483647" step="1" required :disabled="busy || disabled" /></label>
      <label class="check"><input v-model="draft.isPrimary" type="checkbox" :disabled="busy || disabled" /> 대표 이미지</label>
      <div class="actions"><button type="submit" :disabled="busy || disabled">{{ busy ? '저장 중…' : '이미지 저장' }}</button><button type="button" :disabled="busy || disabled" @click="reset">새 이미지 추가</button></div>
    </form>
    <DeleteConfirmationDialog ref="deletion" description="선택한 상품 이미지를 삭제합니다." @confirm="([id]) => change(() => deleteAdminImage(productId, id))" />
    <AlertDialog :message="notice" @close="notice = ''" />
  </section>
</template>

<style scoped src="../../styles/admin-management.css"></style>
