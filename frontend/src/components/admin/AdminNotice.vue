<script setup>
import AdminIcon from './AdminIcon.vue'
defineProps({ message: { type: String, default: '' } })
defineEmits(['close'])
</script>
<template><div v-if="message" class="admin-notice"><p role="status">{{ message }}</p><button type="button" aria-label="완료 알림 닫기" @click="$emit('close')"><AdminIcon name="close" /></button></div></template>
<style scoped>
.admin-notice { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 14px; border: 1px solid var(--admin-line); border-radius: 6px; color: var(--admin-success); background: var(--admin-success-soft); }.admin-notice p { font-size: var(--font-size-table); line-height: 1.7; }.admin-notice button { flex: none; width: 30px; min-height: 30px; padding: 6px; border: 0; background: transparent; color: var(--admin-success); }.admin-notice svg { width: 16px; height: 16px; }
</style>
