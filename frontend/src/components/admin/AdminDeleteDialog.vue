<script setup>
import { ref, useId } from 'vue'
import AdminIcon from './AdminIcon.vue'

defineProps({ description: { type: String, required: true } })
const emit = defineEmits(['confirm'])
const dialog = ref(null)
const id = useId()
let pendingIds = []
function open(ids) {
  if (!ids.length) return
  pendingIds = [...ids]
  dialog.value.showModal()
}
function confirm() {
  const ids = pendingIds
  dialog.value.close()
  emit('confirm', ids)
}
defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="delete-dialog" :aria-labelledby="id + '-title'" :aria-describedby="id + '-description'">
    <form method="dialog">
      <button class="delete-close" aria-label="닫기"><AdminIcon name="close" /></button>
      <h2 :id="id + '-title'">삭제하시겠습니까?</h2>
      <p :id="id + '-description'">{{ description }}</p>
      <div class="delete-actions"><button class="delete-cancel" autofocus>취소</button><button class="delete-confirm" type="button" @click="confirm">삭제하기</button></div>
    </form>
  </dialog>
</template>
