<script setup>
defineProps({
  nodes: { type: Array, required: true },
  collapsed: { type: Set, required: true },
  selectedId: { type: Number, default: null },
  searching: Boolean,
  disabled: Boolean,
})
defineEmits(['select', 'add', 'toggle'])
</script>

<template>
  <ul class="category-tree">
    <li v-for="node in nodes" :key="node.categoryId" class="category-branch" :class="{ 'is-selected': selectedId === node.categoryId }">
      <details v-if="node.children.length" :open="searching || !collapsed.has(node.categoryId)" @toggle="$emit('toggle', node.categoryId, !$event.target.open)">
        <summary :aria-label="node.name + ' 하위 카테고리'">
          <svg class="node-folder" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3Z" /></svg>
          <span class="node-name">{{ node.name }}</span><small class="node-count" :aria-label="'하위 ' + node.children.length + '개'">{{ node.children.length }}</small><span v-if="!node.isActive" class="node-inactive">숨김</span>
        </summary>
        <AdminCategoryTree :nodes="node.children" :collapsed="collapsed" :selected-id="selectedId" :searching="searching" :disabled="disabled" @select="$emit('select', $event)" @add="$emit('add', $event)" @toggle="(id, closed) => $emit('toggle', id, closed)" />
      </details>
      <div v-else class="category-leaf">
        <span class="leaf-mark" aria-hidden="true"></span><svg class="node-folder" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3Z" /></svg><span class="node-name">{{ node.name }}</span><span v-if="!node.isActive" class="node-inactive">숨김</span>
      </div>
      <div class="node-actions">
        <button v-if="node.depth < 2" class="node-add" type="button" :disabled="disabled" :aria-label="node.name + ' 하위 추가'" :title="node.name + ' 하위 추가'" @click="$emit('add', node)"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg></button>
        <button type="button" :disabled="disabled" :aria-label="node.name + ' 편집'" @click="$emit('select', node.categoryId)">편집</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.category-tree { display: grid; gap: 2px; margin: 0; padding: 0; list-style: none; }
.category-branch { position: relative; min-width: 0; }
summary, .category-leaf { display: flex; align-items: center; gap: 8px; min-height: 44px; box-sizing: border-box; padding: 10px 88px 10px 10px; border-radius: 7px; color: #785765; }
summary { cursor: pointer; list-style: none; }
summary::-webkit-details-marker { display: none; }
summary::before { content: ''; width: 5px; height: 5px; flex: none; margin: 0 4px 0 1px; border-right: 1.5px solid #a58e99; border-bottom: 1.5px solid #a58e99; transform: rotate(-45deg); }
details[open] > summary::before { transform: rotate(45deg) translateY(-1px); }
.node-folder { width: 16px; height: 16px; flex: none; fill: #f7edf1; stroke: #b995a5; stroke-width: 1.4; stroke-linejoin: round; }
.node-name { min-width: 0; color: #6c515f; font-size: 13px; font-weight: 500; line-height: 1.6; overflow-wrap: anywhere; }
.node-count { flex: none; color: #826573; font-size: 10px; font-variant-numeric: tabular-nums; }
.node-inactive { padding: 2px 5px; border-radius: 4px; background: #f1edef; color: #77636f; font-size: 9px; white-space: nowrap; }
.node-actions { position: absolute; top: 7px; right: 6px; display: flex; gap: 3px; }
.node-actions button { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 30px; min-width: 28px; padding: 5px 7px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: #8a6476; font: inherit; font-size: 11px; line-height: 1.4; cursor: pointer; white-space: nowrap; }
.node-actions .node-add { width: 28px; padding: 6px; }.node-actions svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.5; }
.node-actions button:not(:disabled):hover { border-color: #ead5df; background: white; color: #9c4f63; }
.node-actions button:disabled { opacity: .5; cursor: default; }
:is(button, summary):focus-visible { outline: 2px solid #9c4f63; outline-offset: 1px; }
.category-branch > .category-leaf:hover, .category-branch > details > summary:hover { background: #faf5f7; }
.category-branch.is-selected > .category-leaf, .category-branch.is-selected > details > summary { background: #f4e5ec; }
.category-branch.is-selected > .category-leaf .node-name, .category-branch.is-selected > details > summary .node-name { color: #8d435b; font-weight: 700; }
.category-branch.is-selected > .node-actions button { color: #9c4f63; }
details > .category-tree { margin-left: 17px; padding-left: 8px; border-left: 1px solid #f0e4e9; }
.leaf-mark { width: 6px; flex: none; margin-right: 4px; }
@media (max-width: 540px) {
  summary, .category-leaf { padding-left: 6px; gap: 6px; }.node-name { font-size: 12px; }.node-folder { width: 14px; height: 14px; }details > .category-tree { margin-left: 10px; padding-left: 6px; }
}
</style>
