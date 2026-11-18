<script setup>
defineProps({ name: { type: String, required: true } })
const paths = {
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  products: 'm12 3 9 5-9 5-9-5 9-5Zm-9 5v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5',
  categories: 'M4 4h6v6H4zM14 14h6v6h-6zM4 14h6v6H4zM14 4h6v6h-6z',
  orders: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 7h6M9 11h6M9 15h3',
  members: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  inquiries: 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z',
  reviews: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z',
  analytics: 'M3 3v18h18M7 14l4-4 4 3 6-7',
  sentiments: 'M4 4h16v12H9l-5 4V4ZM8 8h.01M16 8h.01M8 11q4 4 8 0',
  chevron: 'm9 5 7 7-7 7',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  plus: 'M12 5v14M5 12h14',
  search: 'M21 21l-4.4-4.4M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  logout: 'M9 21H4V3h5M9 12h12m-4-4 4 4-4 4',
  refresh: 'M20 7v5h-5M4 17v-5h5M6.1 6.1A8 8 0 0 1 20 12M4 12a8 8 0 0 0 13.9 5.9',
}
</script>

<template>
  <svg class="admin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name] || paths.dashboard" /></svg>
</template>

<style scoped>
.admin-icon { display: inline-block; width: 20px; height: 20px; flex: none; vertical-align: middle; }
</style>
