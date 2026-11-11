<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
  paragraphs: { type: Array, default: () => [] },
  notice: { type: String, default: '' },
})
const emit = defineEmits(['close'])
const closeButton = ref(null)
let previouslyFocused

function close() {
  emit('close')
}

function handleKeydown(event) {
  if (event.key === 'Escape') close()
}

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    previouslyFocused = document.activeElement
    await nextTick()
    closeButton.value?.focus()
  } else {
    previouslyFocused?.focus?.()
  }
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="policy-backdrop" @mousedown.self="close">
      <section class="policy-modal" role="dialog" aria-modal="true" :aria-label="title" @keydown="handleKeydown">
        <header class="policy-modal-header">
          <h2>{{ title }}</h2>
          <button ref="closeButton" type="button" aria-label="약관 창 닫기" @click="close">×</button>
        </header>
        <div class="policy-modal-body">
          <div class="policy-modal-content">
            <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
          <p v-if="notice" class="policy-modal-notice">{{ notice }}</p>
        </div>
        <footer class="policy-modal-footer">
          <button type="button" @click="close">확인</button>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.policy-backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(57 44 50 / 48%);
}

.policy-modal {
  width: min(100%, 360px);
  max-height: min(610px, calc(100svh - 48px));
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 70%);
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 18px 48px rgb(57 44 50 / 30%);
  color: var(--color-text);
}

.policy-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 14px;
  border-bottom: 1px solid var(--color-border);
}

.policy-modal-header h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

.policy-modal-header button {
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #62555b;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.policy-modal-header button:hover { background: var(--color-background); }

.policy-modal-body { padding: 9px 12px 10px; }
.policy-modal-content {
  max-height: min(286px, calc(100svh - 290px));
  overflow-y: auto;
  padding: 12px 11px;
  border: 1px solid #ece4e7;
  border-radius: 7px;
  background: #fff;
  color: #51444a;
  font-size: 11px;
  line-height: 1.62;
  white-space: pre-line;
}

.policy-modal-content p { margin: 0 0 13px; }
.policy-modal-content p:last-child { margin-bottom: 0; }

.policy-modal-notice {
  margin: 10px 0 0;
  padding: 11px 12px;
  border-radius: 8px;
  background: var(--color-background);
  color: #62555b;
  font-size: 11px;
  line-height: 1.55;
}

.policy-modal-footer {
  padding: 0 12px 12px;
}

.policy-modal-footer button {
  width: 100%;
  height: 34px;
  border: 0;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.policy-modal button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
