<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AdminIcon from './AdminIcon.vue'
import logo from '../../assets/images/oishidam_logo.png'
import { adminNavigation } from '../../utils/adminNavigation.js'

defineProps({ section: { type: String, default: '' } })
const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref(null)
const groups = [...new Set(adminNavigation.map(([, , group]) => group))]
watch(() => route.fullPath, () => { menuOpen.value = false })
function closeMenu() { menuOpen.value = false; menuButton.value?.focus() }
</script>

<template>
  <aside class="admin-sidebar" :class="{ 'is-open': menuOpen }" @keydown.esc="closeMenu">
    <div class="admin-brand">
      <RouterLink :to="{ name: 'AdminDashboard' }" aria-label="오이시담 관리자 대시보드"><span class="admin-logo"><img :src="logo" alt="오이시담" class="admin-logo-mark" /><img :src="logo" alt="" aria-hidden="true" class="admin-logo-wordmark" /></span></RouterLink>
      <button ref="menuButton" type="button" class="admin-menu-toggle" :aria-expanded="menuOpen" aria-controls="admin-navigation" @click="menuOpen = !menuOpen"><AdminIcon :name="menuOpen ? 'close' : 'menu'" /><span>{{ menuOpen ? '메뉴 닫기' : '메뉴 열기' }}</span></button>
    </div>
    <nav id="admin-navigation" aria-label="관리자 메뉴">
      <template v-for="group in groups" :key="group">
        <p class="admin-nav-group">{{ group }}</p>
        <ul><li v-for="[id, label] in adminNavigation.filter((item) => item[2] === group)" :key="id">
          <RouterLink :to="{ name: 'AdminDashboard', params: { section: id } }" :class="{ 'is-current': section === id }" :aria-current="section === id ? 'page' : undefined"><AdminIcon :name="id || 'dashboard'" /><span>{{ label }}</span><AdminIcon v-if="section === id" class="admin-nav-current" name="chevron" /></RouterLink>
        </li></ul>
      </template>
    </nav>
  </aside>
</template>
