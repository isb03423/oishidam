<script setup>
defineProps({
  rating: { type: Number, default: null },
})
</script>

<template>
  <span v-if="rating != null" class="review-rating-display" role="img" :aria-label="'5점 만점에 ' + rating + '점'">
    <span class="review-rating-stars" aria-hidden="true">
      <svg v-for="score in 5" :key="score" viewBox="0 0 24 24" :class="{ 'is-filled': score <= rating }">
        <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9Z" />
      </svg>
    </span>
    <span aria-hidden="true">{{ rating }} / 5</span>
  </span>
  <span v-else class="review-rating-unrated">미평가</span>
</template>

<style scoped>
.review-rating-display { display: inline-flex; align-items: center; gap: 6px; color: var(--color-primary); font-size: var(--font-size-label); font-variant-numeric: tabular-nums; white-space: nowrap; }
.review-rating-stars { display: inline-flex; gap: 1px; }
.review-rating-stars svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.5; }
.review-rating-stars .is-filled { fill: currentColor; }
.review-rating-unrated { color: var(--color-secondary); font-size: var(--font-size-label); white-space: nowrap; }
</style>
