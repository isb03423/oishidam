<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

const props = defineProps({ items: { type: Array, default: () => [] }, anchor: { type: Object, default: null } })
const emit = defineEmits(['dismiss', 'pause', 'resume'])
const id = useId(), host = ref(null), stack = ref(null), announcement = ref('')
const fallback = ref(false), canNotify = ref(false), top = ref('10px'), right = ref('16px')
let observer
let seen = new Set()

function updatePosition() {
  if (!props.items.length) return
  const anchor = props.anchor?.$el || props.anchor
  const rect = (anchor || host.value)?.getBoundingClientRect()
  if (!rect) return
  top.value = `${Math.max(10, rect.bottom + (anchor ? 8 : 0))}px`
  const padding = anchor ? parseFloat(getComputedStyle(anchor).paddingInlineEnd) || 16 : 0
  right.value = `${Math.max(16, innerWidth - rect.right + padding)}px`
}
function observeAnchor() {
  observer?.disconnect()
  const anchor = props.anchor?.$el || props.anchor || host.value
  if (anchor && typeof ResizeObserver === 'function') {
    observer = new ResizeObserver(updatePosition)
    observer.observe(anchor)
  }
  updatePosition()
}
async function sync() {
  const added = props.items.filter(item => !seen.has(item.id))
  seen = new Set(props.items.map(item => item.id))
  if (!stack.value) return
  updatePosition()
  if (!fallback.value) {
    if (props.items.length && !stack.value.matches(':popover-open')) stack.value.showPopover()
    else if (!props.items.length && stack.value.matches(':popover-open')) stack.value.hidePopover()
  }
  await nextTick()
  if (!stack.value || !added.length) return
  const message = added.filter(item => props.items.some(current => current.id === item.id)).map(item => item.message).join(' ')
  if (message && canNotify.value) document.ariaNotify(message, { priority: 'normal' })
  else announcement.value = message
}
onMounted(() => {
  fallback.value = !Object.hasOwn(HTMLElement.prototype, 'popover')
  canNotify.value = typeof document.ariaNotify === 'function'
  window.addEventListener('scroll', updatePosition, { capture: true, passive: true })
  window.addEventListener('resize', updatePosition)
  observeAnchor()
  sync()
})
watch(() => props.items.map(item => item.id), sync, { flush: 'post' })
watch(() => props.anchor, observeAnchor, { flush: 'post' })
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})
</script>

<template>
  <div ref="host" class="notification-toast-anchor">
    <span v-if="!canNotify" class="sr-only" role="status">{{ announcement }}</span>
    <div :id="id" ref="stack" popover="manual" class="notification-toast-stack" :class="{ 'is-stacked': items.length >= 5, 'is-fallback-open': fallback && items.length }" :style="{ '--toast-top': top, '--toast-right': right }" :tabindex="items.length >= 5 ? 0 : undefined" role="region" aria-label="작업 결과 알림">
      <div v-for="(item, index) in items" :key="item.id" class="notification-toast-row" :class="{ 'is-deep': items.length - index > 5 }" :style="{ '--stack-depth': Math.min(items.length - index - 1, 4), '--stack-order': index }" @pointerenter="emit('pause', item.id)" @pointerleave="emit('resume', item.id)" @focusin="emit('pause', item.id)" @focusout="emit('resume', item.id)">
        <div class="notification-toast-row-inner">
          <div class="notification-toast-content" :class="item.type">
            <svg class="notification-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path v-if="item.type === 'warning' || item.type === 'error'" d="M12 7v6m0 3v1" /><path v-else-if="item.type === 'success'" d="m8 12 3 3 5-6" /><path v-else d="M12 10v7m0-11v1" /></svg>
            <p>{{ item.message }}</p>
            <button type="button" class="notification-toast-close" aria-label="알림 닫기" @click="emit('dismiss', item.id, true)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-toast-anchor { position: sticky; inset-block-start: 10px; z-index: 100; block-size: 0; }
.notification-toast-stack { display: none; position: fixed; inset: var(--toast-top, 10px) var(--toast-right, 16px) auto auto; margin: 0; padding: 0; border: 0; inline-size: min(360px, calc(100vw - 32px)); max-block-size: calc(100dvh - var(--toast-top, 10px) - 16px); overflow: visible; background: transparent; color: var(--color-text); font: inherit; }
.notification-toast-stack:is(:popover-open, .is-fallback-open) { display: grid; }
.notification-toast-content { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 12px 14px; border: 1px solid var(--color-primary); border-radius: 9px; background: #fff; color: var(--color-text); box-shadow: 0 8px 24px rgb(57 44 50 / 15%); font-size: var(--font-size-table); transition: transform 250ms ease; }
.notification-toast-content.success { background: #f1faec; border-color: #d7e8cd; color: #39702a; }
.notification-toast-content:is(.warning, .error) { background: #fff0f2; border-color: #f2d5dc; color: #9c4f63; }
.notification-toast-content.info { background: #f8f3fc; border-color: #e8ddee; color: #76617e; }
.notification-toast-row { display: grid; grid-template-rows: 1fr; position: relative; z-index: var(--stack-order); transition: grid-template-rows 250ms ease, margin-bottom 250ms ease, opacity 250ms ease; }
.notification-toast-row:not(:last-child) { margin-bottom: 6px; }
.notification-toast-row-inner { min-block-size: 0; }
.notification-toast-stack.is-stacked:not(:hover):not(:focus-within) .notification-toast-row:not(:last-child) { grid-template-rows: 0fr; }
.notification-toast-stack.is-stacked:not(:hover):not(:focus-within) .notification-toast-row.is-deep { margin-bottom: 0; opacity: 0; pointer-events: none; }
.notification-toast-stack.is-stacked:not(:hover):not(:focus-within) .notification-toast-content { transform: scale(calc(1 - var(--stack-depth) * .025)); }
.notification-toast-stack:is(:hover, :focus-within) { overflow-y: auto; }
.notification-toast-content p { flex: 1; min-inline-size: 0; margin: 0; color: var(--color-text); font-weight: 600; line-height: 1.65; overflow-wrap: anywhere; }
.notification-toast-icon { flex: none; inline-size: 18px; block-size: 18px; margin-block-start: 3px; }
.notification-toast-stack .notification-toast-close { flex: none; display: grid; place-items: center; min-block-size: 24px; inline-size: 24px; padding: 0; border: 0; background: transparent; color: var(--color-primary); cursor: pointer; }
.notification-toast-close svg { inline-size: 18px; block-size: 18px; }
.notification-toast-close:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .notification-toast-row, .notification-toast-content { transition: none; } }
</style>
