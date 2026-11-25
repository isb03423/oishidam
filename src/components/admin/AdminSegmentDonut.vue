<script>
export const customerSegmentPalette = [
  { swatch: '#9fd5c5', surface: '#e7f4ef', ink: '#265c4e' },
  { swatch: '#aec8ed', surface: '#eaf1fb', ink: '#39597e' },
  { swatch: '#e7b8c9', surface: '#f8eaf0', ink: '#804158' },
  { swatch: '#f0d397', surface: '#fff3db', ink: '#79521e' },
  { swatch: '#cdbfe5', surface: '#f2edf8', ink: '#5d497d' },
]
</script>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ segments: { type: Array, required: true }, total: { type: Number, required: true } })
const hovered = ref(null), focused = ref(null), selected = ref(null)
const number = value => new Intl.NumberFormat('ko-KR').format(value)
const percentage = value => new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 }).format(value) + '%'
const slices = computed(() => {
  const counts = props.segments.map(item => Math.max(0, Number(item.members) || 0))
  const total = counts.reduce((sum, count) => sum + count, 0)
  let offset = 0
  return props.segments.map((item, index) => {
    const share = total ? counts[index] / total * 100 : 0
    const palette = customerSegmentPalette[item.segment] ?? customerSegmentPalette[index % customerSegmentPalette.length]
    const slice = { ...item, members: counts[index], share, start: offset, color: palette.swatch }
    offset += share
    return slice
  })
})
const activeIndex = computed(() => selected.value ?? hovered.value ?? focused.value)
const active = computed(() => slices.value[activeIndex.value] ?? null)
const label = item => `${item.segment_name}, ${number(item.members)}명, ${percentage(item.share)}`
function slicePath(item) {
  const point = (radius, share) => {
    const angle = share / 100 * Math.PI * 2 - Math.PI / 2
    return `${100 + radius * Math.cos(angle)},${100 + radius * Math.sin(angle)}`
  }
  const middle = item.start + item.share / 2, end = item.start + item.share
  return `M${point(97, item.start)} A97,97 0 0 1 ${point(97, middle)} A97,97 0 0 1 ${point(97, end)} L${point(63, end)} A63,63 0 0 0 ${point(63, middle)} A63,63 0 0 0 ${point(63, item.start)} Z`
}
function toggle(index) {
  if (selected.value === index) clear()
  else selected.value = index
}
function clear() { hovered.value = focused.value = selected.value = null }
watch(() => props.segments, clear)
</script>

<template>
  <div class="segment-composition" @pointerleave="hovered = null" @keydown.esc.stop="clear">
    <div class="segment-chart">
      <svg viewBox="0 0 200 200" class="segment-ring" role="group" aria-label="고객 유형별 비율">
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--admin-subtle)" stroke-width="34" />
        <template v-for="(item, index) in slices" :key="item.segment">
          <path v-if="item.share > 0" class="segment-slice" :class="{ 'is-active': activeIndex === index, 'is-muted': active && activeIndex !== index }"
            :d="slicePath(item)" :fill="item.color" stroke="none"
            role="button" tabindex="0" :aria-label="label(item)" :aria-pressed="selected === index"
            @pointerenter="hovered = index" @focus="focused = index" @blur="focused = null" @click="toggle(index)"
            @keydown.enter.prevent="toggle(index)" @keydown.space.prevent @keyup.space.prevent="toggle(index)" />
        </template>
      </svg>
      <div class="segment-center" aria-hidden="true">
        <span>{{ active?.segment_name || '전체 고객' }}</span>
        <strong>{{ number(active?.members ?? total) }}<small>명</small></strong>
        <span v-if="active">{{ percentage(active.share) }}</span>
      </div>
      <div v-if="active" class="segment-tooltip" aria-hidden="true">
        <strong>{{ active.segment_name }}</strong>
        <span>{{ number(active.members) }}명 · {{ percentage(active.share) }}</span>
      </div>
    </div>
    <ul class="segment-legend">
      <li v-for="(item, index) in slices" :key="item.segment">
        <button type="button" :class="{ 'is-active': activeIndex === index }" :aria-label="label(item)" :aria-pressed="selected === index"
          @pointerenter="hovered = index" @focus="focused = index" @blur="focused = null" @click="toggle(index)">
          <span class="segment-label"><i :style="{ background: item.color }" aria-hidden="true"></i>{{ item.segment_name }}</span>
          <span class="segment-value"><strong>{{ number(item.members) }}명</strong><small>{{ percentage(item.share) }}</small></span>
        </button>
      </li>
    </ul>
  </div>
  <p class="segment-help">유형을 선택하면 강조 표시를 유지합니다. 다시 선택하거나 Esc를 누르면 해제합니다.</p>
</template>

<style scoped>
.segment-composition { display: grid; grid-template-columns: minmax(120px, .8fr) minmax(0, 1fr); align-items: center; gap: 24px; }
.segment-chart { position: relative; inline-size: 100%; max-inline-size: 220px; aspect-ratio: 1; justify-self: center; }
.segment-ring { display: block; inline-size: 100%; overflow: visible; }
.segment-slice { cursor: pointer; transition: opacity 140ms ease-out; }
.segment-slice.is-muted { opacity: .35; }
.segment-center { position: absolute; inset: 23%; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }
.segment-center > span { color: var(--admin-muted); font-size: var(--font-size-table); text-align: center; }
.segment-center > strong { color: var(--admin-ink); font-size: var(--font-size-title); font-weight: 700; font-variant-numeric: tabular-nums; white-space: nowrap; }
.segment-center small { margin-inline-start: 3px; font-size: var(--font-size-table); font-weight: 400; }
.segment-tooltip { position: absolute; inset-block-start: calc(100% + 8px); inset-inline: 0; z-index: 2; display: grid; justify-items: center; gap: 3px; padding: 10px 12px; border: 1px solid var(--admin-line); border-radius: 6px; color: var(--admin-ink); background: var(--admin-surface); font-size: var(--font-size-table); box-shadow: 0 6px 18px rgb(36 45 58 / 12%); pointer-events: none; }
.segment-legend { display: grid; min-inline-size: 0; }
.segment-legend li + li { border-block-start: 1px solid var(--admin-line); }
.segment-legend button { display: flex; align-items: center; justify-content: space-between; gap: 8px; inline-size: 100%; padding: 10px 8px; border: 0; border-radius: 4px; background: transparent; font-size: var(--font-size-table); font-weight: 400; text-align: start; }
.segment-composition .segment-legend button:is(:hover, :focus-visible, .is-active) { border-color: transparent; background: transparent; box-shadow: none; }
.segment-composition .segment-legend button.is-active { background: var(--admin-brand-soft); }
.segment-legend button.is-active .segment-label { color: var(--admin-brand); font-weight: 500; }
.segment-label { display: flex; align-items: center; gap: 8px; color: var(--admin-ink); }
.segment-label i { inline-size: 12px; block-size: 12px; flex: none; border-radius: 50%; }
.segment-value { display: grid; justify-items: end; font-variant-numeric: tabular-nums; white-space: nowrap; }
.segment-value strong { font-weight: 600; }
.segment-value small { color: var(--admin-muted); font-size: var(--font-size-label); }
.segment-help { margin-block-start: 18px; color: var(--admin-muted); font-size: var(--font-size-label); line-height: 1.6; }
@media (max-width: 420px) { .segment-composition { grid-template-columns: minmax(0, 1fr); gap: 28px; }.segment-chart { inline-size: 180px; }.segment-tooltip { inset-block-start: auto; inset-block-end: 0; }.segment-legend { inline-size: 100%; } }
@media (prefers-reduced-motion: reduce) { .segment-slice { transition: none; } }
@media (pointer: coarse) { .segment-legend button { min-block-size: 44px; } }
</style>
