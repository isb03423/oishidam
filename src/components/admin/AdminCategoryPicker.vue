<script setup>
import { computed, nextTick, reactive, ref, useId, watch } from 'vue'
import { filterCategoryTree } from '../../utils/categoryTree.js'
import AdminIcon from './AdminIcon.vue'
import AdminCategoryPickerList from './AdminCategoryPickerList.vue'

const props = defineProps({ categories: { type: Array, required: true }, forProduct: Boolean })
const emit = defineEmits(['select'])
const id = useId(), dialog = ref(null), list = ref(null), query = ref(''), selected = ref('')
const collapsedBranches = reactive(new Set())
const collapsedSearchBranches = reactive(new Set())
const searchTerm = computed(() => query.value.trim())
const collapsed = computed(() => searchTerm.value ? collapsedSearchBranches : collapsedBranches)
const options = computed(() => filterCategoryTree(props.categories, searchTerm.value, true))
const branches = computed(() => branchIds(options.value))
const hasCollapsedBranches = computed(() => branches.value.some(categoryId => collapsed.value.has(categoryId)))
watch(searchTerm, () => collapsedSearchBranches.clear())

function branchIds(nodes) {
  return nodes.flatMap(node => node.children.length ? [node.categoryId, ...branchIds(node.children)] : [])
}
function toggleAllBranches() {
  if (hasCollapsedBranches.value) collapsed.value.clear()
  else for (const categoryId of branches.value) collapsed.value.add(categoryId)
}
function toggleBranch(categoryId) {
  if (collapsed.value.has(categoryId)) collapsed.value.delete(categoryId)
  else collapsed.value.add(categoryId)
}
function selectCategory(categoryId) {
  selected.value = categoryId
  collapsed.value.delete(categoryId)
}
async function open(value) {
  selected.value = value
  query.value = ''
  collapsedBranches.clear()
  dialog.value.showModal()
  await nextTick()
  if (!dialog.value?.open) return
  list.value.scrollTop = 0
  list.value.querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: 'nearest' })
}
function apply(value) { emit('select', value); dialog.value.close() }
defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="category-picker" :aria-labelledby="id + '-heading'">
    <header>
      <h2 :id="id + '-heading'">카테고리 선택</h2>
      <button class="category-picker-close" type="button" aria-label="카테고리 선택 닫기" @click="dialog.close()"><AdminIcon name="close" /></button>
    </header>
    <div class="category-picker-search">
      <label :for="id + '-query'">카테고리 검색</label>
      <input :id="id + '-query'" v-model="query" type="search" placeholder="카테고리명 입력" autofocus />
      <div class="category-picker-search-actions">
        <p>{{ forProduct ? '상품을 분류할 상위 또는 하위 카테고리를 선택해 주세요.' : '상위 카테고리를 선택하면 하위 상품도 함께 조회합니다.' }}</p>
        <button v-if="branches.length" type="button" :aria-controls="id + '-options'" @click="toggleAllBranches">
          {{ hasCollapsedBranches ? '모두 펼치기' : '모두 접기' }}
        </button>
      </div>
    </div>
    <div :id="id + '-options'" ref="list" class="category-picker-options" role="group" :aria-label="forProduct ? '상품을 분류할 카테고리' : '검색할 카테고리'">
      <button v-if="!forProduct" class="category-picker-choice" type="button" :aria-pressed="selected === ''" @click="selected = ''" @dblclick="apply('')"><span>전체 카테고리</span><span v-if="selected === ''" aria-hidden="true">선택</span></button>
      <AdminCategoryPickerList v-if="options.length" :nodes="options" :selected="selected" :collapsed="collapsed" @select="selectCategory" @apply="apply" @toggle="toggleBranch" />
      <p v-if="!options.length" class="category-picker-empty">일치하는 카테고리가 없습니다.</p>
    </div>
    <footer><button type="button" @click="dialog.close()">취소</button><button type="button" class="admin-primary" :disabled="forProduct && selected === ''" @click="apply(selected)">선택 적용</button></footer>
  </dialog>
</template>

<style scoped>
.category-picker { width: min(460px, calc(100% - 24px)); max-width: none; max-height: calc(100dvh - 32px); padding: 0; border: 1px solid var(--admin-line); border-radius: 8px; color: var(--admin-ink); background: white; overscroll-behavior: contain; }
.category-picker[open] { display: flex; flex-direction: column; }
.category-picker::backdrop { background: rgb(25 31 42 / 42%); overflow: hidden; overscroll-behavior: contain; }
header { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 14px 18px; border-bottom: 1px solid var(--admin-line); }
h2 { font-size: var(--font-size-section); }
.category-picker-close { min-height: 32px; padding: 4px; border: 0; }
header svg { width: 18px; height: 18px; }
.category-picker-search { padding: 16px 18px; }.category-picker-search label { display: block; margin-bottom: 6px; font-size: var(--font-size-label); font-weight: 600; }.category-picker-search input { width: 100%; }
.category-picker-search-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-block-start: 8px; }
.category-picker-search-actions p { font-size: var(--font-size-label); color: var(--admin-muted); }
.category-picker-search-actions button { flex: none; min-height: 32px; padding: 4px 8px; line-height: 1.3; white-space: nowrap; }
.category-picker-options { min-height: 0; max-height: 340px; overflow: auto; border-block: 1px solid var(--admin-line); scrollbar-width: thin; }
.category-picker-options :deep(.category-picker-choice) { display: flex; justify-content: space-between; gap: 8px; width: 100%; min-height: 40px; border: 0; border-radius: 0; padding: 9px 16px; font-weight: 400; text-align: start; overflow-wrap: anywhere; }
.category-picker-options :deep(.category-picker-choice[aria-pressed='true']) { background: var(--admin-brand-soft); color: var(--admin-brand); font-weight: 600; }
.category-picker-options :deep(.category-picker-choice:focus-visible) { outline-offset: -2px; }
.category-picker-options :deep(small) { margin-inline-start: 8px; font-size: var(--font-size-caption); color: var(--admin-muted); }
.category-picker-options :deep(.category-picker-choice > span + span) { flex: none; font-size: var(--font-size-control); }
.category-picker-empty { padding: 24px; text-align: center; font-size: var(--font-size-table); color: var(--admin-muted); }
footer { display: flex; justify-content: end; gap: 8px; padding: 12px 18px; }
</style>
