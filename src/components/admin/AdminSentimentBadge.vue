<script setup>
import { computed } from 'vue'

const props = defineProps({ sentiment: { type: String, default: null } })
const labels = {
  VERY_POSITIVE: '매우 긍정',
  POSITIVE: '긍정',
  NEUTRAL: '중립',
  NEGATIVE: '부정',
  VERY_NEGATIVE: '매우 부정',
}
const label = computed(() => Object.hasOwn(labels, props.sentiment) ? labels[props.sentiment] : null)
</script>

<template>
  <span class="admin-sentiment" :data-sentiment="label ? sentiment : undefined">
    <svg v-if="label" class="sentiment-face" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" class="sentiment-face-fill" />
      <path v-if="sentiment === 'VERY_NEGATIVE'" d="m7 8 3 3m0-3-3 3m7-3 3 3m0-3-3 3" />
      <g v-else class="sentiment-eyes"><circle cx="8" cy="9" r="1.2" /><circle cx="16" cy="9" r="1.2" /></g>
      <path v-if="sentiment === 'VERY_POSITIVE'" d="M6.5 13.5h11a5.5 5.5 0 0 1-11 0Z" class="sentiment-mouth-fill" />
      <path v-else-if="sentiment === 'POSITIVE'" d="M7 14q5 5 10 0" />
      <path v-else-if="sentiment === 'NEUTRAL'" d="M7 15h10" />
      <path v-else d="M7 17q5-6 10 0" />
    </svg>
    {{ label || '미분석' }}
  </span>
</template>

<style scoped>
.admin-sentiment { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 4px; background: var(--admin-subtle); color: var(--admin-muted); font-size: var(--font-size-label); font-weight: 500; line-height: 20px; white-space: nowrap; }
.admin-sentiment[data-sentiment='VERY_POSITIVE'] { --face: #58a85c; color: #204d28; background: #e7f3e8; }
.admin-sentiment[data-sentiment='POSITIVE'] { --face: #79dc70; color: #355d1c; background: #eff8e5; }
.admin-sentiment[data-sentiment='NEUTRAL'] { --face: #ffe371; color: #705600; background: #fff7d4; }
.admin-sentiment[data-sentiment='NEGATIVE'] { --face: #ffb76b; color: #7b410d; background: #fff0df; }
.admin-sentiment[data-sentiment='VERY_NEGATIVE'] { --face: #ff7466; color: #8b2720; background: #ffebe8; }
.sentiment-face { width: 20px; height: 20px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.sentiment-face-fill { fill: var(--face); stroke: none; }
.sentiment-eyes, .sentiment-mouth-fill { fill: currentColor; stroke: none; }
</style>
