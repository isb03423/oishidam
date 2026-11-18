<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminManagement from './AdminManagement.vue'
import AdminLiveManagement from './AdminLiveManagement.vue'
import AdminInquiries from './AdminInquiries.vue'
import AdminReviews from './AdminReviews.vue'
import AdminCustomerAnalytics from './AdminCustomerAnalytics.vue'
import AdminReviewAnalytics from './AdminReviewAnalytics.vue'
import AdminProductWorkspace from './AdminProductWorkspace.vue'
import AdminOverview from '../components/admin/AdminOverview.vue'
import AdminLayout from '../components/admin/AdminLayout.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import { adminNavigation } from '../utils/adminNavigation.js'
import { logout } from '../services/auth.js'
import { session } from '../stores/session.js'

const router = useRouter()
const route = useRoute()
const demo = computed(() => session.source === 'mock')
const logoutError = ref('')
const activeSection = computed(() => adminNavigation.find(([id]) => id === route.params.section) ?? adminNavigation[0])
watch(() => session.member?.role, (role) => {
  if (role !== 'ADMIN') router.replace({ name: 'Login' })
})

async function signOut() {
  logoutError.value = ''
  try {
    await logout()
    if (!session.member) await router.replace({ name: 'Login' })
  } catch {
    logoutError.value = '로그아웃하지 못했어요. 다시 시도해 주세요.'
  }
}
</script>

<template>
  <AdminLayout :section="activeSection[0]" :title="activeSection[1]" :name="session.member?.name" :demo="demo" @sign-out="signOut">
    <AdminProductWorkspace v-if="activeSection[0] === 'products'" />
    <AdminInquiries v-else-if="activeSection[0] === 'inquiries' && !demo" />
    <AdminReviews v-else-if="activeSection[0] === 'reviews' && !demo" />
    <AdminCustomerAnalytics v-else-if="activeSection[0] === 'analytics'" />
    <AdminReviewAnalytics v-else-if="activeSection[0] === 'sentiments'" />
    <AdminLiveManagement v-else-if="activeSection[0] && activeSection[0] !== 'analytics' && !demo" :key="activeSection[0]" :section="activeSection[0]" :title="activeSection[1]" />
    <AdminManagement v-else-if="activeSection[0]" :section="activeSection[0]" :title="activeSection[1]" />
    <AdminOverview v-else />
    <AlertDialog :message="logoutError" @close="logoutError = ''" />
  </AdminLayout>
</template>
