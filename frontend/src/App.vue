<template>
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
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const DevelopmentPanel = import.meta.env.DEV
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
