<script setup>
import { useId } from 'vue'
import AdminIcon from './AdminIcon.vue'

defineProps({
  nodes: { type: Array, required: true },
  selected: { type: [Number, String], required: true },
  collapsed: { type: Set, required: true },
})
defineEmits(['select', 'apply', 'toggle'])
const id = useId()
</script>

<template>
  <ul class="category-picker-list" role="list">
    <li v-for="node in nodes" :key="node.categoryId">
      <div class="category-picker-row">
        <button
          type="button"
          class="category-picker-choice"
          :title="node.path"
          :aria-label="node.path + (node.isActive ? '' : ' 숨김')"
          :aria-pressed="String(selected) === String(node.categoryId)"
          @click="$emit('select', node.categoryId)"
          @dblclick="$emit('apply', node.categoryId)"
        >
          <span>{{ node.name }}<small v-if="!node.isActive">숨김</small></span>
          <span v-if="String(selected) === String(node.categoryId)" aria-hidden="true">선택</span>
        </button>
        <button
          v-if="node.children.length"
          type="button"
          class="category-picker-toggle"
          :aria-label="node.path + ' 하위 카테고리'"
          :aria-controls="id + '-children-' + node.categoryId"
          :aria-expanded="!collapsed.has(node.categoryId)"
          @click="$emit('toggle', node.categoryId)"
        >
          <AdminIcon name="chevron" />
        </button>
      </div>
      <AdminCategoryPickerList
        v-if="node.children.length"
        v-show="!collapsed.has(node.categoryId)"
        :id="id + '-children-' + node.categoryId"
        :nodes="node.children"
        :selected="selected"
        :collapsed="collapsed"
        @select="$emit('select', $event)"
        @apply="$emit('apply', $event)"
        @toggle="$emit('toggle', $event)"
      />
    </li>
  </ul>
</template>

<style scoped>
.category-picker-list { list-style: none; margin: 0; padding: 0; }
.category-picker-list .category-picker-list { margin-inline-start: 22px; border-inline-start: 1px solid var(--admin-line); }
.category-picker-row { display: flex; }
.category-picker-row > .category-picker-choice { min-width: 0; }
.category-picker-row > .category-picker-toggle { flex: 0 0 44px; min-height: 40px; padding: 0; border: 0; border-radius: 0; background: transparent; color: var(--admin-muted); }
.category-picker-row > .category-picker-toggle:hover { background: var(--admin-subtle); color: var(--admin-ink); }
.category-picker-toggle:focus-visible { outline: 2px solid var(--admin-brand); outline-offset: -2px; }
.category-picker-toggle svg { width: 14px; height: 14px; }
.category-picker-toggle[aria-expanded='true'] svg { transform: rotate(90deg); }
</style>
