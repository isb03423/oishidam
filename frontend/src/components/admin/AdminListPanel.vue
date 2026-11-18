<script setup>
defineProps({
  total: { type: Number, required: true },
  title: { type: String, default: '전체' },
  unit: { type: String, default: '건' },
  loading: Boolean,
})
</script>

<template>
  <section class="admin-list-panel">
    <div v-if="$slots.filters" class="admin-list-toolbar"><slot name="filters" /></div>
    <div class="admin-list-heading" aria-live="polite">
      <h2 class="admin-list-summary">{{ title }} <span class="admin-list-summary-count">{{ loading ? '조회 중' : total.toLocaleString('ko-KR') + unit }}</span></h2>
      <div v-if="$slots.actions" class="admin-list-heading-actions"><slot name="actions" /></div>
    </div>
    <slot />
    <footer v-if="$slots.footer" class="admin-list-footer"><slot name="footer" /></footer>
  </section>
</template>
