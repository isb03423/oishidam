<script setup>
import { computed, inject, onBeforeUnmount, ref, useId, watch } from 'vue'
import AdminDeleteDialog from './AdminDeleteDialog.vue'
import { getSessionRevision } from '../../stores/session.js'

const props = defineProps({ productId: [Number, String], images: { type: Array, default: () => [] }, disabled: Boolean })
const emit = defineEmits(['busy', 'saved'])
const api = inject('adminProductApi'), id = useId(), mode = ref('file'), file = ref(null), input = ref(null)
const url = ref(''), alt = ref(''), preview = ref(''), busy = ref(false), error = ref(''), notice = ref(''), deletion = ref(null)
const savedUrl = ref(''), savedAlt = ref('')
const image = computed(() => props.images.find(item => item.isPrimary) || props.images[0])
const hasChanges = computed(() => Boolean(file.value) || url.value !== savedUrl.value || alt.value !== savedAlt.value)
let disposed = false
function reset() {
  file.value = null; url.value = image.value?.storageKey || ''; alt.value = image.value?.altText || ''; error.value = ''
  savedUrl.value = url.value; savedAlt.value = alt.value
  if (preview.value) URL.revokeObjectURL(preview.value)
  preview.value = ''; if (input.value) input.value.value = ''
}
watch(() => props.images, () => { if (!hasChanges.value) reset() })
reset()
onBeforeUnmount(() => { disposed = true; if (preview.value) URL.revokeObjectURL(preview.value) })
function choose(event) {
  const candidate = event.target.files[0]
  error.value = notice.value = ''
  if (preview.value) URL.revokeObjectURL(preview.value)
  preview.value = ''; file.value = null
  if (!candidate) return
  if (!candidate.size || candidate.size > 10 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(candidate.type)) {
    error.value = '10MB 이하의 JPEG, PNG, GIF 또는 WebP 이미지를 선택해 주세요.'; event.target.value = ''; return
  }
  file.value = candidate; preview.value = URL.createObjectURL(candidate)
}
async function change(action, message) {
  if (busy.value || props.disabled || !props.productId) return
  busy.value = true; emit('busy', true); error.value = notice.value = ''
  const revision = getSessionRevision()
  try {
    await action()
    if (disposed || revision !== getSessionRevision()) return
    const fresh = await api.value.getAdminDetail('products', props.productId)
    if (disposed || revision !== getSessionRevision()) return
    emit('saved', fresh.images)
    file.value = null; url.value = fresh.images[0]?.storageKey || ''; alt.value = fresh.images[0]?.altText || ''
    savedUrl.value = url.value; savedAlt.value = alt.value
    if (preview.value) URL.revokeObjectURL(preview.value)
    preview.value = ''; if (input.value) input.value.value = ''; notice.value = message
  } catch (failure) { if (!disposed && revision === getSessionRevision()) error.value = failure.message }
  finally { if (!disposed) { busy.value = false; emit('busy', false) } }
}
function save() {
  const data = { storageKey: url.value.trim(), altText: alt.value.trim(), sortOrder: 0, isPrimary: true }
  if (mode.value === 'file' && file.value) change(() => api.value.uploadAdminImage(props.productId, file.value, data), '대표 이미지를 저장했습니다.')
  else {
    if (!/^https:\/\//i.test(data.storageKey)) { error.value = 'HTTPS 이미지 주소를 입력하거나 이미지 파일을 선택해 주세요.'; return }
    change(() => api.value.saveAdminImage(props.productId, image.value?.imageId ?? null, data), '대표 이미지를 저장했습니다.')
  }
}
defineExpose({ hasChanges, reset })
</script>

<template>
  <section class="primary-image" aria-label="대표 이미지">
    <h3>대표 이미지</h3>
    <div class="primary-image-body"><div class="primary-image-preview"><img v-if="preview || image" :src="preview || image.storageKey" :alt="alt || '상품 대표 이미지'" /><span v-else>이미지 없음</span></div>
      <form class="primary-image-fields" @submit.prevent="save">
        <label :for="id + '-mode'">등록 방식<select :id="id + '-mode'" v-model="mode" :disabled="disabled || busy"><option value="file">파일 선택</option><option value="url">이미지 주소</option></select></label>
        <label v-if="mode === 'file'" :for="id + '-file'">이미지 파일<input :id="id + '-file'" ref="input" type="file" accept="image/jpeg,image/png,image/gif,image/webp" :disabled="disabled || busy" @change="choose" /></label>
        <label v-else :for="id + '-url'">이미지 주소<input :id="id + '-url'" v-model="url" type="url" maxlength="500" required :disabled="disabled || busy" /></label>
        <label :for="id + '-alt'">대체 텍스트<input :id="id + '-alt'" v-model="alt" maxlength="255" :disabled="disabled || busy" /></label>
        <p>대표 이미지 1장 · 최대 10MB<template v-if="!productId"> · 상품 등록 후 저장할 수 있습니다.</template></p>
        <div class="primary-image-actions"><button type="submit" :disabled="!productId || disabled || busy || !hasChanges">{{ busy ? '저장 중…' : '이미지 저장' }}</button><button v-if="image" type="button" :disabled="disabled || busy" @click="deletion.open(images.map(item => item.imageId))">이미지 삭제</button></div>
        <p v-if="error" class="primary-image-error" role="alert">{{ error }}</p><p v-else-if="notice" role="status">{{ notice }}</p>
      </form>
    </div>
    <AdminDeleteDialog ref="deletion" description="등록된 대표 이미지를 삭제합니다." @confirm="change(async () => { for (const item of images) await api.deleteAdminImage(productId, item.imageId) }, '대표 이미지를 삭제했습니다.')" />
  </section>
</template>

<style scoped>
.primary-image { padding-top: 20px; margin-top: 20px; border-top: 1px solid var(--admin-line); }h3 { font-size: var(--font-size-table); margin-bottom: 12px; }.primary-image-body { display: flex; align-items: start; gap: 18px; }.primary-image-preview { display: grid; place-items: center; width: 132px; height: 132px; flex: none; border: 1px solid var(--admin-line); border-radius: 6px; background: var(--admin-subtle); color: var(--admin-muted); font-size: var(--font-size-label); }.primary-image-preview img { width: 100%; height: 100%; object-fit: contain; border-radius: inherit; }.primary-image-fields { display: grid; grid-template-columns: minmax(100px, 1fr) minmax(0, 2fr); gap: 10px 14px; flex: 1; min-width: 0; }.primary-image-fields label { display: grid; gap: 5px; color: var(--admin-muted); font-size: var(--font-size-label); }.primary-image-fields label:nth-child(3) { grid-column: 1 / -1; }.primary-image-fields :is(input,select) { width: 100%; min-width: 0; font-size: var(--font-size-control); }.primary-image-fields input[type=file] { padding: 5px; }.primary-image-fields p { grid-column: 1 / -1; color: var(--admin-muted); font-size: var(--font-size-label); }.primary-image-fields .primary-image-error { color: var(--admin-danger); }.primary-image-actions { grid-column: 1 / -1; display: flex; gap: 8px; }
@media (max-width: 600px) { .primary-image-body { flex-direction: column; }.primary-image-fields { width: 100%; grid-template-columns: minmax(0,1fr); }.primary-image-fields :is(input,select) { font-size: var(--font-size-body); }.primary-image-fields label:nth-child(3) { grid-column: auto; } }
</style>
