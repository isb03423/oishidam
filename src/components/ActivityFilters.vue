
<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
})
const selected = defineModel({ type: String, required: true })
</script>

<template>
  <nav class="activity-tabs" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="{ 'is-active': selected === option.value }"
      :aria-pressed="selected === option.value"
      @click="selected = option.value"
    >
      {{ option.label }} ({{ option.count }})
    </button>
  </nav>
</template>

<style scoped src="../styles/mypage-activity.css"></style>
