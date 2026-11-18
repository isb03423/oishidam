<script setup>
import { activateAdminRow } from '../../utils/adminRow.js'
import AdminIcon from './AdminIcon.vue'

defineProps({ nodes: { type: Array, required: true }, selectedId: { type: Number, default: null }, disabled: Boolean })
defineEmits(['select', 'add'])
</script>

<template>
  <div class="category-groups">
    <div class="category-columns" aria-hidden="true"><span>상위 카테고리</span><span>하위 카테고리</span></div>
    <ul class="category-tree">
      <li v-for="node in nodes" :key="node.categoryId" class="category-group admin-clickable-row" @click="!disabled && activateAdminRow($event, () => $emit('select', node.categoryId))">
        <div class="category-parent"><button v-if="node.depth < 2" class="node-add" type="button" :disabled="disabled" :aria-label="node.name + ' 하위 추가'" :title="node.name + ' 하위 추가'" @click="$emit('add', node)"><AdminIcon name="plus" /></button><button class="node-select" :class="{ 'is-selected': selectedId === node.categoryId }" type="button" :disabled="disabled" :aria-label="node.name + ' 편집'" @click="$emit('select', node.categoryId)">{{ node.name }}<span v-if="!node.isActive" class="node-inactive">숨김</span></button><small>{{ node.children.length }}개</small></div>
        <ul class="category-children"><li v-for="child in node.children" :key="child.categoryId"><button class="node-select category-child" :class="{ 'is-selected': selectedId === child.categoryId }" type="button" :disabled="disabled" :aria-label="child.name + ' 편집'" @click="$emit('select', child.categoryId)">{{ child.name }}<span v-if="!child.isActive" class="node-inactive">숨김</span></button></li><li v-if="!node.children.length" class="category-no-child">—</li></ul>

      </li>
    </ul>
  </div>
</template>

<style scoped>
.category-groups { display: flex; flex-direction: column; min-height: 0; flex: 1; overflow: hidden; }
.category-columns,.category-group { display: grid; grid-template-columns: 240px minmax(0,1fr); align-items: center; gap: 16px; padding: 10px 24px; }
.category-columns { flex: none; background: var(--admin-subtle); color: var(--admin-muted); font-size: var(--font-size-label); font-weight: 600; border-block: 1px solid var(--admin-line); }
.category-columns > :first-child { padding-left: 55px; }.category-columns > :nth-child(2) { padding-left: 11px; }.category-tree { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--admin-strong-line) var(--admin-subtle); list-style: none; margin: 0; padding: 0; }
.category-group { min-height: 62px; border-bottom: 1px solid var(--admin-line); }.category-group:hover { background: var(--admin-subtle); }.category-parent { display: flex; align-items: center; gap: 8px; min-width: 0; }.category-parent small { margin-left: auto; color: var(--admin-muted); font-size: var(--font-size-label); white-space: nowrap; }
.category-children { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-width: 0; list-style: none; margin: 0; padding: 0; }
.category-group .node-select { display: inline-flex; align-items: center; justify-content: center; min-height: 36px; padding: 6px 10px; border: 1px solid transparent; background: transparent; color: var(--admin-ink); font-size: var(--font-size-control); line-height: 1.6; text-align: left; overflow-wrap: anywhere; }.category-parent .node-select { flex: none; white-space: nowrap; font-weight: var(--admin-list-primary-weight); }.category-group .category-child { border-color: var(--admin-line); background: var(--admin-surface); font-weight: 400; }.category-group .node-select:hover,.category-group .node-select.is-selected { border-color: var(--admin-brand); color: var(--admin-brand); background: var(--admin-brand-soft); }
.category-group .node-add { flex: none; width: 36px; min-width: 36px; height: 36px; min-height: 36px; padding: 8px; color: var(--admin-brand); border-color: var(--admin-line); }.node-add :deep(svg) { width: 14px; height: 14px; }.node-inactive { margin-left: 4px; color: var(--admin-muted); font-size: var(--font-size-label); font-weight: 400; }.category-no-child { color: var(--admin-muted); font-size: var(--font-size-label); }
@media(max-width:1100px) { .category-columns,.category-group { grid-template-columns: 240px minmax(0,1fr); gap: 12px; padding-inline: 16px; } }
@media(max-width:540px) { .category-columns { display: none; }.category-group { grid-template-columns: minmax(0,1fr); gap: 8px; }.category-children { grid-column: 1/-1; grid-row: 2; } }
@media(pointer:coarse) { .category-group .node-select,.category-group .node-add { min-height: 44px; }.category-group .node-add { width: 36px; } }
</style>
