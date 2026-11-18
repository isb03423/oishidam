<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AdminIcon from './AdminIcon.vue'
import AdminSidebar from './AdminSidebar.vue'
import { adminNavigation } from '../../utils/adminNavigation.js'

defineProps({ section: { type: String, default: '' }, title: { type: String, required: true }, name: { type: String, default: '' }, demo: Boolean })
defineEmits(['sign-out'])
const route = useRoute()
const content = ref(null)
const initialTitle = document.title
watch(() => route.params.section, () => {
  document.title = `${adminNavigation.find(([id]) => id === (route.params.section || ''))?.[1] || '관리자'} | 오이시담 관리자`
  window.scrollTo({ top: 0, behavior: 'instant' })
  content.value?.focus({ preventScroll: true })
}, { immediate: true, flush: 'post' })
onBeforeUnmount(() => { document.title = initialTitle })
</script>

<template>
  <div class="admin-shell" :class="{ 'admin-workspace-shell': !!section && !['analytics', 'sentiments'].includes(section), 'admin-product-shell': section === 'products' }">
    <a href="#admin-content" class="admin-skip" @click.prevent="content?.focus()">본문으로 이동</a>
    <AdminSidebar :section="section" />
    <div class="admin-body">
      <header class="admin-topbar">
        <nav class="admin-breadcrumb" aria-label="현재 위치"><ol><li>관리자 센터</li><li><AdminIcon name="chevron" /><span aria-current="page">{{ title }}</span></li></ol></nav>
        <span v-if="demo" class="admin-demo-label">모의 데이터</span>
        <div class="admin-account"><span class="admin-avatar" aria-hidden="true">{{ name?.slice(0, 1) || '관' }}</span><span>{{ name || '관리자' }}<small>스토어 관리자</small></span></div>
        <button class="admin-signout" type="button" @click="$emit('sign-out')"><AdminIcon name="logout" /><span>로그아웃</span></button>
      </header>
      <div id="admin-content" ref="content" class="admin-content" tabindex="-1"><slot /></div>
    </div>
  </div>
</template>

<style src="../../styles/admin-ui.css"></style>
<style src="../../styles/admin-layout.css"></style>
