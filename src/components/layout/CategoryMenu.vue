<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { categoryGroups } from '../../data/categories.js'

defineEmits(['select'])

const route = useRoute()
const selectedId = ref()
const selectedGroup = computed(() => categoryGroups.find((group) =>
  group.category_id === selectedId.value,
) ?? categoryGroups.find((group) =>
  group.category_id === route.query.categoryId ||
  group.children.some((child) => child.category_id === route.query.categoryId),
) ?? categoryGroups[0])

const productsIn = (category) => ({
  name: 'Products',
  query: { categoryId: category.category_id },
})
function previewCategory(event, group) {
  if (event.pointerType === 'mouse') selectedId.value = group.category_id
}
</script>

<template>
  <section id="site-category-menu" class="category-menu" :class="{ 'has-children': selectedGroup.children.length }" aria-label="전체 카테고리">
    <div class="category-columns">
      <ul class="category-groups" aria-label="대분류">
        <li
          v-for="group in categoryGroups"
          :key="group.category_id"
          class="category-row"
          :class="{ 'is-previewed': group === selectedGroup }"
          @pointerenter="previewCategory($event, group)"
        >
          <RouterLink
            class="category-group"
            draggable="false"
            :to="productsIn(group)"
            @click="$emit('select')"
          >
            {{ group.name }}
          </RouterLink>
          <button
            v-if="group.children.length"
            class="category-chevron"
            type="button"
            :aria-label="group.name + ' 하위 분류 보기'"
            :aria-expanded="group === selectedGroup"
            :aria-controls="group === selectedGroup ? 'category-subcategories' : undefined"
            @click="selectedId = group.category_id"
          >
            <span aria-hidden="true">›</span>
          </button>
        </li>
      </ul>

      <ul
        v-if="selectedGroup.children.length"
        id="category-subcategories"
        class="category-children"
        :aria-label="selectedGroup.name + ' 카테고리'"
      >
        <li v-for="child in selectedGroup.children" :key="child.category_id">
          <RouterLink draggable="false" :to="productsIn(child)" @click="$emit('select')">{{ child.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.category-menu {
  width: min(100%, 190px);
  border: 1px solid var(--color-border);
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  background: var(--color-white);
  box-shadow: 0 12px 30px #392c3226;
  user-select: none;
}

.category-menu.has-children { width: min(100%, 380px); }

.category-columns {
  display: grid;
  max-height: 62vh;
}

.has-children .category-columns {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.category-groups,
.category-children {
  margin: 0;
  padding: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

.category-group,
.category-children a {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 8px 12px;
  color: var(--color-text);
  font-size: 14px;
  line-height: 1.4;
  overflow-wrap: anywhere;
  word-break: keep-all;
}

.category-row {
  display: flex;
}

.category-group {
  flex: 1;
  min-width: 0;
}

.category-row.is-previewed,
.category-row:hover {
  background: var(--color-background);
}

.category-row.is-previewed .category-group,
.category-row:hover .category-group {
  color: var(--color-primary);
  font-weight: 700;
}

.category-chevron {
  flex: 0 0 40px;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font-size: 17px;
  cursor: pointer;
}

.category-children {
  border-left: 1px solid var(--color-border);
  background: #f8f6f7;
}

.category-children a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -3px;
}
</style>
