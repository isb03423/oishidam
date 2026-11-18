<script setup>
import { computed, ref, useId } from 'vue'
import AdminIcon from './AdminIcon.vue'

const props = defineProps({ categories: { type: Array, required: true } })
const emit = defineEmits(['select'])
const id = useId(), dialog = ref(null), query = ref(''), selected = ref('')
const options = computed(() => {
  const walk = (parentId, path = []) => props.categories.filter(item => String(item.parentId ?? '') === String(parentId))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.categoryId - b.categoryId)
    .flatMap(item => [{ ...item, depth: path.length, path: [...path, item.name].join(' › ') }, ...walk(item.categoryId, [...path, item.name])])
  return walk('').filter(item => item.path.toLocaleLowerCase('ko-KR').includes(query.value.trim().toLocaleLowerCase('ko-KR')))
})
function open(value) { selected.value = value; query.value = ''; dialog.value.showModal() }
function apply() { emit('select', selected.value); dialog.value.close() }
defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="category-picker" :aria-labelledby="id + '-heading'">
    <header><h2 :id="id + '-heading'">카테고리 선택</h2><button type="button" aria-label="카테고리 선택 닫기" @click="dialog.close()"><AdminIcon name="close" /></button></header>
    <div class="category-picker-search"><label :for="id + '-query'">카테고리 검색</label><input :id="id + '-query'" v-model="query" type="search" placeholder="카테고리명 입력" autofocus /><p>상위 카테고리를 선택하면 하위 상품도 함께 조회합니다.</p></div>
    <div class="category-picker-options" role="group" aria-label="검색할 카테고리">
      <button type="button" :aria-pressed="selected === ''" @click="selected = ''" @dblclick="selected = ''; apply()"><span>전체 카테고리</span><span v-if="selected === ''">선택</span></button>
      <button v-for="item in options" :key="item.categoryId" type="button" :style="{ paddingInlineStart: 16 + item.depth * 20 + 'px' }" :title="item.path" :aria-pressed="String(selected) === String(item.categoryId)" @click="selected = item.categoryId" @dblclick="selected = item.categoryId; apply()"><span>{{ item.name }}<small v-if="!item.isActive">숨김</small></span><span v-if="String(selected) === String(item.categoryId)">선택</span></button>
      <p v-if="!options.length" class="category-picker-empty">일치하는 카테고리가 없습니다.</p>
    </div>
    <footer><button type="button" @click="dialog.close()">취소</button><button type="button" class="admin-primary" @click="apply">선택 적용</button></footer>
  </dialog>
</template>

<style scoped>
.category-picker { width: min(460px, calc(100% - 24px)); max-width: none; max-height: calc(100dvh - 32px); padding: 0; border: 1px solid var(--admin-line); border-radius: 8px; color: var(--admin-ink); background: white; overscroll-behavior: contain; }
.category-picker[open] { display: flex; flex-direction: column; }
.category-picker::backdrop { background: rgb(25 31 42 / 42%); overflow: hidden; overscroll-behavior: contain; }
header { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid var(--admin-line); }h2 { font-size: var(--font-size-section); }header button { padding: 4px; min-height: 32px; border: 0; }header svg { width: 18px; height: 18px; }
.category-picker-search { padding: 16px 18px; }.category-picker-search label { display: block; margin-bottom: 6px; font-size: var(--font-size-label); font-weight: 600; }.category-picker-search input { width: 100%; }.category-picker-search p { margin-top: 8px; font-size: var(--font-size-label); color: var(--admin-muted); }
.category-picker-options { min-height: 0; max-height: 340px; overflow: auto; border-block: 1px solid var(--admin-line); scrollbar-width: thin; }.category-picker-options button { display: flex; justify-content: space-between; width: 100%; min-height: 40px; border: 0; border-radius: 0; padding: 9px 16px; font-weight: 400; }.category-picker-options button[aria-pressed='true'] { background: var(--admin-brand-soft); color: var(--admin-brand); font-weight: 600; }.category-picker-options small { margin-left: 8px; font-size: var(--font-size-caption); color: var(--admin-muted); }.category-picker-options button > span:last-child:not(:first-child) { font-size: var(--font-size-control); }.category-picker-empty { padding: 24px; text-align: center; font-size: var(--font-size-table); color: var(--admin-muted); }
footer { display: flex; justify-content: end; gap: 8px; padding: 12px 18px; }
</style>
