<template>
  <AlertDialog :message="session.restoreError" title="로그인 상태 확인" confirm-label="다시 시도" cancel-label="닫기" @confirm="reload" @close="setRestoreError('')" />
  <AlertDialog :message="wishError" title="찜 목록 안내" @close="wishError = ''" />
  <div v-if="!route.meta.hideLayout" class="site-shell">
    <Header />
    <div class="site-content">
      <RouterView />
    </div>
    <Footer />
  </div>

  <RouterView v-else />

  <DevelopmentPanel v-if="DevelopmentPanel" />
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import AlertDialog from './components/common/AlertDialog.vue'
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { session, setRestoreError } from './stores/session.js'
import { wishError } from './stores/wishlist.js'

const route = useRoute()
const reload = () => window.location.reload()

const DevelopmentPanel = import.meta.env.DEV && import.meta.env.VITE_DEVTOOLS_ENABLED === 'true'
  ? defineAsyncComponent(() => import('./components/development/DevelopmentPanel.vue'))
  : null
</script>

<style>
/* 콘텐츠가 짧아도 푸터가 화면 하단까지 밀려 내려가도록 하는 공통 레이아웃입니다. */
.site-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.site-content {
  flex: 1 0 auto;
}
</style>
