<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logo from '../../assets/images/oishidam_logo.png'
import { login, loginWithKakao } from '../../services/auth.js'
import { development } from '../../config/development.js'

const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)
const pending = ref('')
const error = ref('')
const notice = ref('')
const mockEnabled = computed(() => import.meta.env.DEV && development.mockEnabled)
const demoHint = ref('')
if (route.query.signup === 'complete') notice.value = '회원가입이 완료되었습니다. 로그인해주세요.'
watch(() => route.query.password, (status) => {
  if (status === 'changed') notice.value = '비밀번호가 변경되었습니다. 다시 로그인해주세요.'
}, { immediate: true })
if (import.meta.env.DEV) {
  import('../../mocks/auth.js').then(({ demoCredentials }) => {
    demoHint.value = `테스트 계정: ${demoCredentials.email} / ${demoCredentials.password}`
  })
}
let controller
let revision = 0

async function submit(provider = 'email') {
  if (pending.value) return
  error.value = ''
  notice.value = ''
  if (provider === 'email' && !password.value.trim()) {
    error.value = '비밀번호를 입력해주세요.'
    return
  }
  const version = ++revision
  controller = new AbortController()
  pending.value = provider
  try {
    if (provider === 'kakao') await loginWithKakao({ remember: remember.value, signal: controller.signal })
    else await login({ email: email.value, password: password.value, remember: remember.value, signal: controller.signal })
    if (version === revision) {
      password.value = ''
      await router.replace({ name: 'Home' })
    }
  } catch (failure) {
    if (version === revision && !controller.signal.aborted) {
      error.value = failure.response?.data?.message || failure.message || '로그인하지 못했어요. 잠시 후 다시 시도해주세요.'
    }
  } finally {
    if (version === revision) pending.value = ''
  }
}

function showUpcoming(feature) {
  error.value = ''
  notice.value = `${feature} 화면은 준비 중입니다.`
}
watch(() => development.mockEnabled, () => {
  revision++
  controller?.abort()
  pending.value = ''
  password.value = ''
  error.value = ''
  notice.value = ''
})
onBeforeUnmount(() => {
  revision++
  controller?.abort()
})
</script>

<template>
  <main class="login-page">
    <section class="login-panel" aria-labelledby="login-title">
      <RouterLink class="login-logo" to="/" aria-label="오이시담 홈">
        <img :src="logo" alt="오이시담" />
      </RouterLink>
      <h1 id="login-title" class="login-title">로그인</h1>
      <p class="login-welcome">오이시담에 오신 것을 환영합니다.</p>

      <form class="login-form" :aria-busy="Boolean(pending)" @submit.prevent="submit('email')">
        <div class="login-field">
          <svg class="field-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
          <input v-model="email" type="email" maxlength="254" name="email" autocomplete="username" placeholder="이메일을 입력해주세요" aria-label="이메일" required :disabled="Boolean(pending)" />
        </div>
        <div class="login-field">
          <svg class="field-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></svg>
          <input v-model="password" :type="showPassword ? 'text' : 'password'" name="password" autocomplete="current-password" placeholder="비밀번호를 입력해주세요" aria-label="비밀번호" required :disabled="Boolean(pending)" />
          <button class="password-toggle" type="button" :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 표시'" :aria-pressed="showPassword" @click="showPassword = !showPassword">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path v-if="!showPassword" d="m3 3 18 18" /></svg>
          </button>
        </div>

        <div class="login-options">
          <label class="remember-login"><input v-model="remember" type="checkbox" :disabled="Boolean(pending)" /> 자동 로그인</label>
          <button class="login-text-button" type="button" @click="showUpcoming('비밀번호 찾기')">비밀번호 찾기</button>
        </div>
        <p v-if="error" class="login-error" role="alert">{{ error }}</p>
        <p v-if="notice" class="login-notice" role="status">{{ notice }}</p>
        <button class="login-submit" type="submit" :disabled="Boolean(pending)">{{ pending === 'email' ? '로그인 중…' : '로그인' }}</button>
      </form>

      <div class="login-divider"><span>또는 간편하게 로그인</span></div>
      <button class="kakao-login" type="button" :disabled="Boolean(pending)" @click="submit('kakao')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.3 4.8 6.6L5.6 22l5-3.4H12c5.5 0 10-3.5 10-7.8S17.5 3 12 3Z" /></svg>
        {{ pending === 'kakao' ? '카카오 로그인 중…' : '카카오로 계속하기' }}
      </button>

      <p class="login-signup">아직 회원이 아니신가요? <RouterLink class="login-text-button signup-button" to="/signup">회원가입 <span aria-hidden="true">›</span></RouterLink></p>
      <p v-if="mockEnabled" class="login-demo-note">개발용 로그인 · 실제 카카오 인증이 아닙니다.<br />{{ demoHint }}</p>
    </section>
  </main>
</template>

<style scoped>
/* 로그인 영역 · 흰 배경의 중앙 정렬 폼 */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 48px 24px;
  background: var(--color-white);
  color: var(--color-text);
}

.login-panel {
  width: min(100%, 352px);
  margin: 0 auto;
  text-align: center;
}

.login-logo {
  display: inline-block;
  margin-bottom: 16px;
}

.login-logo img {
  display: block;
  width: 160px;
  height: auto;
}

.login-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
}

.login-welcome {
  margin: 10px 0 28px;
  color: #8d7e85;
  font-size: 13px;
}

/* 이메일 · 비밀번호 입력 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-field {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #fff;
}

.login-field:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgb(156 79 99 / 8%);
}

.login-field input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 13px;
}

.login-field input::placeholder {
  color: #9b8e94;
}

.field-icon,
.password-toggle svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  fill: none;
  stroke: #8d7e85;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.password-toggle {
  display: grid;
  place-items: center;
  width: 28px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

/* 로그인 유지 · 비밀번호 찾기 */
.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 6px 0 12px;
  color: #8d7e85;
  font-size: 12px;
}

.remember-login {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}

.remember-login input {
  width: 14px;
  height: 14px;
  accent-color: var(--color-primary);
}

.login-text-button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-secondary);
  font: inherit;
  cursor: pointer;
}

/* 기본 로그인 · 카카오 간편로그인 */
.login-submit,
.kakao-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 46px;
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.login-submit {
  background: var(--color-primary);
  color: #fff;
}

.login-submit:hover:enabled {
  background: #874155;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 28px 0 20px;
  color: #9b8e94;
  font-size: 11px;
}

.login-divider::before,
.login-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.kakao-login {
  min-height: 40px;
  border: 1px solid var(--color-border);
  background: #fff;
  color: #191919;
  font-size: 13px;
  font-weight: 500;
}

.kakao-login:hover:enabled {
  background: #fffdf0;
}

.kakao-login svg {
  width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 4px;
  background: #fee500;
  fill: currentColor;
}

.login-page button:disabled {
  opacity: .65;
  cursor: wait;
}

.login-page button:focus-visible,
.login-logo:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

/* 안내 문구 */
.login-error,
.login-notice {
  margin: 0;
  text-align: left;
  font-size: 12px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.login-error {
  color: #b53951;
}

.login-notice {
  color: var(--color-secondary);
}

.login-signup {
  margin: 30px 0 0;
  color: #8d7e85;
  font-size: 12px;
}

.signup-button {
  margin-left: 12px;
  color: var(--color-text);
}

.login-demo-note {
  margin: 22px 0 0;
  color: #8d7e85;
  font-size: 11px;
  line-height: 1.8;
}

/* 모바일 · 화면 폭에 맞춰 여백 조정 */
@media (max-width: 600px) {
  .login-page {
    padding: 32px 24px;
  }
}
</style>
