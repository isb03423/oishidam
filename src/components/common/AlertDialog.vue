<script setup>
import { onMounted, ref, useId, watch } from 'vue'

const props = defineProps({ message: { type: String, default: '' }, title: { type: String, default: '안내' }, confirmLabel: { type: String, default: '확인' }, cancelLabel: { type: String, default: '' } })
const emit = defineEmits(['confirm', 'close'])
const dialog = ref(null)
const id = useId()
function sync() {
  if (props.message && !dialog.value?.open) dialog.value?.showModal()
  else if (!props.message && dialog.value?.open) dialog.value.close()
}
function confirm() {
  dialog.value.close()
  emit('confirm')
}
onMounted(sync)
watch(() => props.message, sync, { flush: 'post' })
</script>

<template>
  <dialog ref="dialog" class="alert-dialog" role="alertdialog" :aria-labelledby="id + '-title'" :aria-describedby="id + '-message'" @close="emit('close')">
    <h2 :id="id + '-title'">{{ title }}</h2>
    <p :id="id + '-message'">{{ message }}</p>
    <div class="alert-actions">
      <button v-if="cancelLabel" type="button" @click="dialog.close()">{{ cancelLabel }}</button>
      <button class="alert-confirm" type="button" autofocus @click="confirm">{{ confirmLabel }}</button>
    </div>
  </dialog>
</template>

<style scoped>
.alert-dialog { position: fixed; inset: 0; width: min(400px, calc(100% - 32px)); max-height: calc(100dvh - 32px); box-sizing: border-box; margin: auto; padding: 28px 24px 22px; overflow: auto; border: 1px solid var(--color-border); border-radius: 16px; background: var(--color-white); color: var(--color-text); box-shadow: 0 16px 40px rgb(57 44 50 / 20%); text-align: center; }
.alert-dialog::backdrop { background: rgb(32 24 28 / 45%); }
.alert-dialog h2 { margin: 0; font-size: 20px; font-weight: 800; }
.alert-dialog p { margin: 16px 0 24px; line-height: 1.65; white-space: pre-line; overflow-wrap: anywhere; }
.alert-actions { display: flex; justify-content: center; gap: 8px; }
.alert-actions button { min-width: 90px; min-height: 40px; padding: 8px 18px; border: 1px solid var(--color-primary); border-radius: 8px; background: var(--color-white); color: var(--color-primary); font: inherit; font-weight: 700; cursor: pointer; }
.alert-actions .alert-confirm { background: var(--color-primary); color: var(--color-white); }
</style>
