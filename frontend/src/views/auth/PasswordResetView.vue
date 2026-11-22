<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../../assets/images/oishidam_logo.png'
import EmailVerificationFields from '../../components/common/EmailVerificationFields.vue'
import AuthPasswordField from '../../components/common/AuthPasswordField.vue'
import { development } from '../../config/development.js'
import { resetPassword } from '../../services/auth.js'
import { getPasswordError, passwordRequirements } from '../../services/passwordPolicy.js'

const router = useRouter()
const email = ref('')
const token = ref('')
const codeRequested = ref(false)
const password = ref('')
const firstPassword = ref(null)
const confirmation = ref('')
const pending = ref(false)
const error = ref('')
const invalidField = ref('')
const title = computed(() => token.value ? '새 비밀번호 설정' : codeRequested.value ? '인증번호를 입력해주세요' : '비밀번호 찾기')
let controller

watch(token, (verification) => {
  if (!verification) {
    password.value = ''
    confirmation.value = ''
    invalidField.value = ''
  } else {
    error.value = ''
    firstPassword.value?.focus()
  }
}, { flush: 'post' })
watch(() => development.mockEnabled, () => {
  controller?.abort()
  pending.value = false
  error.value = ''
})
onBeforeUnmount(() => controller?.abort())

function clearFieldError() {
  if (!invalidField.value) return
  invalidField.value = ''
  error.value = ''
}

async function submit() {
  if (!token.value || pending.value) return
  const passwordError = getPasswordError(password.value, '새 비밀번호')
  const mismatch = password.value !== confirmation.value
  invalidField.value = passwordError ? 'password' : mismatch ? 'confirmation' : ''
  error.value = passwordError || (mismatch ? '새 비밀번호 확인이 일치하지 않습니다.' : '')
  if (error.value) return

  const request = new AbortController()
  controller = request
  pending.value = true
  try {
    await resetPassword({
      email: email.value, verificationToken: token.value, newPassword: password.value,
      passwordConfirm: confirmation.value, signal: request.signal,
    })
    if (!request.signal.aborted) await router.replace({ name: 'Login', query: { password: 'changed' } })
  } catch (failure) {
    if (request.signal.aborted) return
    if (failure.code === 'INVALID_EMAIL_VERIFICATION') token.value = ''
    error.value = failure.message || '비밀번호를 변경하지 못했습니다.'
  } finally {
    if (!request.signal.aborted) pending.value = false
  }
}
</script>

<template>
  <main class="reset-page">
    <div class="reset-shell">
      <RouterLink class="reset-logo" :to="{ name: 'Home' }">
        <img :src="logo" alt="오이시담 홈" />
      </RouterLink>

      <section class="reset-panel" aria-labelledby="reset-title">
        <h1 id="reset-title">{{ title }}</h1>
        <p v-if="!token && !codeRequested" class="reset-intro">가입할 때 인증한 이메일 주소를 입력해주세요.</p>

        <form class="reset-form" :class="{ 'reset-form--code': codeRequested && !token }"
          aria-labelledby="reset-title" :aria-busy="pending" @submit.prevent="submit">
          <EmailVerificationFields v-show="!token" v-model:email="email" v-model:token="token" v-model:requested="codeRequested"
            purpose="PASSWORD_RESET" :disabled="pending" />
          <p v-if="token" id="reset-verified" class="reset-verified" role="status">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 3 3 5-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            이메일 인증이 완료되었습니다.
          </p>
          <fieldset v-if="token" :disabled="pending">
            <legend class="is-sr-only">새 비밀번호 설정</legend>
            <AuthPasswordField id="reset-password" ref="firstPassword" v-model="password" label="새 비밀번호" placeholder="새 비밀번호 *"
              :described-by="'reset-verified reset-password-rules' + (invalidField === 'password' ? ' reset-error' : '')"
              :invalid="invalidField === 'password'" :disabled="pending" @update:model-value="clearFieldError" />
            <small id="reset-password-rules">{{ passwordRequirements }}</small>
            <AuthPasswordField id="reset-confirmation" v-model="confirmation" label="새 비밀번호 확인" name="passwordConfirm"
              placeholder="새 비밀번호 확인 *" :described-by="invalidField === 'confirmation' ? 'reset-error' : undefined"
              :invalid="invalidField === 'confirmation'" :disabled="pending" @update:model-value="clearFieldError" />
            <button type="submit">{{ pending ? '변경 중…' : '비밀번호 변경' }}</button>
          </fieldset>
          <p v-if="error" id="reset-error" class="reset-error" role="alert">{{ error }}</p>
        </form>

        <footer class="reset-footer">
          <RouterLink class="reset-back" :to="{ name: 'Login' }">로그인으로 돌아가기</RouterLink>
        </footer>
      </section>
    </div>
  </main>
</template>

<style scoped>
.reset-page {
  --reset-rose: #74384b;
  --reset-rose-hover: #622e40;
  --reset-muted: #6d555f;
  display: grid;
  place-items: center;
  align-items: safe center;
  min-block-size: 100vh;
  min-block-size: 100svh;
  padding: 1.5rem 1rem;
  background: #fffafb;
  color: var(--color-text);
}

.reset-shell { inline-size: min(100%, 28.5rem); }

.reset-logo {
  display: block;
  inline-size: fit-content;
  margin: 0 auto 0.75rem;
}

.reset-logo img { display: block; inline-size: 9.5rem; }

.reset-panel {
  padding: 1.75rem 1.25rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-white);
}

h1 {
  margin: 0;
  font-size: var(--font-size-title);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.035em;
  word-break: keep-all;
}

.reset-intro {
  margin: 0.5rem 0 0;
  color: var(--reset-muted);
  font-size: var(--font-size-table);
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.reset-form { margin-block-start: 1.5rem; }
.reset-form--code { margin-block-start: 0.25rem; }

.reset-form :deep(.email-verification--initial .verification-row) {
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
}

.reset-verified {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1.125rem;
  padding: 0.5rem 0.625rem;
  border: 1px solid #d7e8cd;
  border-radius: 0.5rem;
  background: #f1faec;
  color: #39702a;
  font-size: var(--font-size-label);
  font-weight: 650;
}

.reset-verified svg { flex: none; }

fieldset {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  border: 0;
  min-inline-size: 0;
}

small { margin-block-end: 0.25rem; color: var(--reset-muted); font-size: var(--font-size-label); line-height: 1.5; }

button,
.reset-form :deep(.email-verification--initial .verification-row > button),
.reset-form :deep(.recovery-next) {
  min-block-size: 2.75rem;
  padding: 0 0.75rem;
  border: 1px solid var(--reset-rose);
  border-radius: 0.5rem;
  background: var(--reset-rose);
  color: var(--color-white);
  font: inherit;
  font-size: var(--font-size-control);
  font-weight: 700;
  cursor: pointer;
}

button { margin-block-start: 0.5rem; }
button:hover:enabled,
.reset-form :deep(.email-verification--initial .verification-row > button:hover:enabled),
.reset-form :deep(.recovery-next:hover:enabled) {
  background: var(--reset-rose-hover);
}

button:disabled { opacity: .65; cursor: default; }

button:focus-visible, a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.reset-error {
  margin: 0.875rem 0 0;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  background: var(--color-background);
  color: #a12c49;
  font-size: var(--font-size-label);
}

.reset-footer {
  margin-block-start: 1.5rem;
  padding-block-start: 0.25rem;
  border-block-start: 1px solid var(--color-border);
  text-align: center;
}

.reset-back {
  display: inline-flex;
  align-items: center;
  min-block-size: 2.75rem;
  color: var(--reset-rose);
  font-size: var(--font-size-label);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.reset-back:hover { color: var(--reset-rose-hover); }

@media (min-width: 32rem) {
  .reset-page { padding-block: 3rem; }
  .reset-panel { padding: 2rem 2.125rem 0.75rem; }
}
</style>
