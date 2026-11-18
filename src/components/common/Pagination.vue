<script setup>
import { RouterLink } from 'vue-router'
import { pageNumbers } from '../../utils/pageNumbers.js'

const page = defineModel({ type: Number, required: true })
defineProps({
  pageCount: { type: Number, required: true },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  pageLink: { type: Function, default: null },
})
</script>

<template>
  <nav v-if="pageCount > 1" class="list-pagination" :aria-label="label">
    <RouterLink v-if="pageLink && !disabled && page > 1" :to="pageLink(1)" aria-label="첫 페이지" aria-current-value="false">«</RouterLink>
    <button v-else type="button" aria-label="첫 페이지" :disabled="disabled || page <= 1" @click="page = 1">«</button>
    <RouterLink v-if="pageLink && !disabled && page > 1" :to="pageLink(page - 1)" aria-label="이전 페이지" aria-current-value="false">‹</RouterLink>
    <button v-else type="button" aria-label="이전 페이지" :disabled="disabled || page <= 1" @click="page--">‹</button>
    <template v-for="number in pageNumbers(page, pageCount)" :key="number">
      <span v-if="number === page" aria-current="page">{{ number }}</span>
      <RouterLink v-else-if="pageLink && !disabled" :to="pageLink(number)" :aria-label="`${number}페이지`" aria-current-value="false">{{ number }}</RouterLink>
      <button v-else type="button" :disabled="disabled" :aria-label="`${number}페이지`" @click="page = number">{{ number }}</button>
    </template>
    <RouterLink v-if="pageLink && !disabled && page < pageCount" :to="pageLink(page + 1)" aria-label="다음 페이지" aria-current-value="false">›</RouterLink>
    <button v-else type="button" aria-label="다음 페이지" :disabled="disabled || page >= pageCount" @click="page++">›</button>
    <RouterLink v-if="pageLink && !disabled && page < pageCount" :to="pageLink(pageCount)" aria-label="마지막 페이지" aria-current-value="false">»</RouterLink>
    <button v-else type="button" aria-label="마지막 페이지" :disabled="disabled || page >= pageCount" @click="page = pageCount">»</button>
  </nav>
</template>

<style scoped>
.list-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.list-pagination > :is(a, button, span) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex: none;
  box-sizing: border-box;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  font-size: var(--font-size-control);
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
}

.list-pagination > :is(a, button):not(:disabled) {
  cursor: pointer;
}

.list-pagination > :is(a, button):hover:not(:disabled),
.list-pagination > [aria-current='page'] {
  border-color: var(--color-primary);
}

.list-pagination > [aria-current='page'] {
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
}

.list-pagination > button:disabled {
  opacity: .45;
  cursor: default;
}
</style>
