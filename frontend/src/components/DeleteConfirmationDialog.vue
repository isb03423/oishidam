<script setup>
import { ref } from 'vue'

defineProps({ description: { type: String, required: true } })
const emit = defineEmits(['confirm'])
const dialog = ref(null)
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
  <dialog ref="dialog" class="delete-dialog" aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
    <form method="dialog">
      <button class="delete-close" aria-label="닫기">×</button>
      <div class="delete-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" /></svg>
      </div>
      <h2 id="delete-dialog-title">정말로 삭제하시겠습니까?</h2>
      <p id="delete-dialog-description">{{ description }}</p>
      <div class="delete-actions">
        <button class="delete-cancel" autofocus>취소</button>
        <button class="delete-confirm" type="button" @click="confirm">삭제하기</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
.delete-dialog {
  position: fixed;
  inset: 0;
  width: min(440px, calc(100% - 32px));
  max-height: calc(100% - 32px);
  box-sizing: border-box;
  margin: auto;
  padding: 28px 24px 24px;
  border: 1px solid var(--color-primary);
  border-radius: 18px;
  background: #fff;
  color: var(--color-text);
  box-shadow: 0 16px 40px rgb(57 44 50 / 20%);
  text-align: center;
}

.delete-dialog::backdrop {
  background: rgb(32 24 28 / 55%);
}

.delete-close {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  font-size: 24px;
  cursor: pointer;
}

.delete-symbol {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-primary);
}

.delete-symbol svg {
  width: 28px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.delete-dialog h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.delete-dialog p {
  margin: 8px 0 20px;
  font-size: 14px;
}

.delete-actions {
  display: flex;
  gap: 8px;
}

.delete-actions button {
  flex: 1;
  min-height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
}

.delete-cancel { background: #fff; color: var(--color-primary); }
.delete-confirm { background: var(--color-primary); color: #fff; }

button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
</style>
