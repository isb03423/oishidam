<script setup>
import { categoryGroups } from '../../data/categories.js'

defineProps({
  sort: { type: String, default: undefined },
  activeGroupId: { type: String, default: '' },
})
</script>

<template>
  <aside class="mypage-sidebar category-sidebar" aria-labelledby="catalog-sidebar-title">
    <h2 id="catalog-sidebar-title" class="sidebar-title">카테고리</h2>
    <nav aria-labelledby="catalog-sidebar-title">
      <ul class="sidebar-menu-list">
        <li v-for="group in categoryGroups" :key="group.category_id">
          <RouterLink
            :to="{ name: 'Products', query: { categoryId: group.category_id, sort } }"
            class="sidebar-menu-button"
            :class="{ 'router-link-exact-active': activeGroupId === group.category_id }"
            exact-active-class="catalog-route-match"
            :aria-current="activeGroupId === group.category_id ? 'true' : null"
          >
            <span>{{ group.name }}</span>
            <span aria-hidden="true">›</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped src="../../styles/sidebar.css"></style>

<style scoped>
.category-sidebar {
  width: 100%;
}

.category-sidebar .sidebar-menu-button {
  position: relative;
  justify-content: space-between;
  min-height: 42px;
  padding: 7px 8px 7px 0;
  border-radius: 0;
}

.category-sidebar .sidebar-menu-button.router-link-exact-active {
  font-weight: 700;
}

.category-sidebar .sidebar-menu-button.router-link-exact-active::before {
  position: absolute;
  inset-block: 0;
  inset-inline-start: -7px;
  width: 3px;
  background: var(--color-primary);
  content: '';
}

@media (max-width: 680px) {
  .category-sidebar .sidebar-menu-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
