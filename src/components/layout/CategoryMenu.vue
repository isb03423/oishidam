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
  <section id="site-category-menu" class="category-menu" aria-label="전체 카테고리">
    <div class="category-columns">
      <ul class="category-groups" aria-label="대분류">
        <li v-for="group in categoryGroups" :key="group.category_id">
          <button
            class="category-group"
            type="button"
            :aria-pressed="group === selectedGroup"
            aria-controls="category-subcategories"

            @pointerenter="previewCategory($event, group)"
            @click="selectedId = group.category_id"
          >
            <span>{{ group.name }}</span>
            <span class="category-chevron" aria-hidden="true">›</span>
          </button>
        </li>
      </ul>

      <ul
        id="category-subcategories"
        class="category-children"
        :aria-label="selectedGroup.name + ' 카테고리'"
      >
        <li>
          <RouterLink draggable="false" class="category-parent-link" :to="productsIn(selectedGroup)" @click="$emit('select')">
            {{ selectedGroup.name }} 전체
          </RouterLink>
        </li>
        <li v-for="child in selectedGroup.children" :key="child.category_id">
          <RouterLink draggable="false" :to="productsIn(child)" @click="$emit('select')">{{ child.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.category-menu {
  width: min(100%, 380px);
  border: 1px solid var(--color-border);
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  background: var(--color-white);
  box-shadow: 0 12px 30px #392c3226;
  user-select: none;
}

.category-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-height: 62vh;
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

.category-group {
  justify-content: space-between;
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.category-group[aria-pressed="true"] {
  background: var(--color-background);
  color: var(--color-primary);
  font-weight: 700;
}

.category-chevron {
  flex: none;
  font-size: 17px;
}

.category-children {
  border-left: 1px solid var(--color-border);
  background: #f8f6f7;
}

.category-children .category-parent-link {
  color: var(--color-primary);
  font-weight: 700;
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
