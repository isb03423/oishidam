<script setup>
import { useRoute } from 'vue-router'
import logo from '../assets/images/oishidam_logo.png'
import { session } from '../stores/session.js'

const route = useRoute()
</script>

<template>
  <main class="access-page">
    <section class="access-panel" aria-labelledby="access-title">
      <RouterLink :to="{ name: 'Home' }" class="logo" aria-label="오이시담 홈">
        <img :src="logo" alt="오이시담" />
      </RouterLink>
      <div v-if="route.name === 'NotFound'" class="icon not-found-icon" aria-hidden="true">404</div>
      <div v-else class="icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="10" y="21" width="28" height="21" rx="5" />
          <path d="M16 21v-6a8 8 0 0 1 16 0v6M24 29v5" />
        </svg>
      </div>
      <p class="eyebrow">{{ route.name === 'NotFound' ? 'PAGE NOT FOUND' : 'ACCESS RESTRICTED' }}</p>
      <h1 id="access-title">{{ route.name === 'NotFound' ? '페이지를 찾을 수 없습니다' : '접근 권한이 없습니다' }}</h1>
      <p class="description">{{ route.name === 'NotFound' ? '주소가 잘못되었거나 페이지가 이동되었을 수 있습니다.' : route.query.reason === 'admin' ? '관리자만 이용할 수 있는 페이지입니다.' : '이 페이지를 이용하려면 로그인이 필요합니다.' }}</p>
      <div class="actions">
        <RouterLink v-if="route.name !== 'NotFound' && !session.member" :to="{ name: 'Login' }" class="button primary">로그인하기</RouterLink>
        <RouterLink :to="{ name: 'Home' }" :class="['button', route.name === 'NotFound' ? 'primary' : 'secondary']">홈으로 가기</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.access-page { display: grid; min-height: 100vh; min-height: 100svh; place-items: center; padding: 40px 24px; background: var(--color-background); color: var(--color-text); }
.access-panel { width: min(100%, 440px); padding: 48px 40px; border: 1px solid var(--color-border); border-radius: 20px; background: var(--color-white); text-align: center; box-shadow: 0 16px 48px rgb(99 54 68 / 7%); }
.logo { display: inline-block; }
.logo img { display: block; width: 150px; height: auto; }
.icon { display: grid; width: 80px; height: 80px; place-items: center; margin: 38px auto 24px; border-radius: 50%; background: var(--color-background); color: var(--color-primary); }
.not-found-icon { font-size: 24px; font-weight: 800; }
.icon svg { width: 40px; height: 40px; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.eyebrow { margin: 0 0 10px; color: var(--color-primary); font-size: 11px; font-weight: 700; letter-spacing: .13em; }
h1 { margin: 0; font-size: 25px; font-weight: 700; }
.description { margin: 12px 0 30px; color: #766970; font-size: 15px; line-height: 1.6; word-break: keep-all; }
.actions { display: grid; gap: 10px; }
.button { display: flex; min-height: 48px; align-items: center; justify-content: center; border: 1px solid var(--color-primary); border-radius: 8px; font-size: 15px; font-weight: 700; }
.primary { background: var(--color-primary); color: white; }
.secondary { background: white; color: var(--color-primary); }
.button:hover { opacity: .85; }
.button:focus-visible, .logo:focus-visible { outline: 3px solid var(--color-secondary); outline-offset: 3px; }
@media (max-width: 480px) { .access-panel { padding: 40px 24px; } }
</style>
