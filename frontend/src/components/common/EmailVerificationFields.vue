<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { development } from '../../config/development.js'
import { checkSignupEmail, extendEmailCode, sendEmailCode, verifyEmailCode } from '../../services/auth.js'
import '../../styles/auth-fields.css'

const props = defineProps({
  purpose: { type: String, required: true },
  disabled: Boolean,
  emailError: { type: String, default: '' },
  showEmailError: Boolean,
})
const emit = defineEmits(['touch-email'])
const email = defineModel('email', { type: String, required: true })
const token = defineModel('token', { type: String, required: true })
const requested = defineModel('requested', { type: Boolean, default: false })
const id = useId()
const emailInput = ref(null)
const codeInput = ref(null)
const code = ref('')
const codeCursor = ref(0)
const sent = ref(false)
const cooldownSeconds = ref(0)
const remainingSeconds = ref(0)
const extensionGrant = ref('')
const extendedProof = ref('')
const pending = ref('')
const error = ref('')
const emailInputError = ref('')
const codeError = ref('')
const normalizedEmail = computed(() => email.value.trim().toLowerCase())
const isSignup = computed(() => props.purpose === 'SIGNUP')
const canReturnToCode = computed(() => !isSignup.value && !requested.value && sent.value)
const coolingDown = computed(() => cooldownSeconds.value > 0)
const expired = computed(() => sent.value && !token.value && remainingSeconds.value === 0)
const countdown = computed(() => {
  const minutes = String(Math.floor(remainingSeconds.value / 60)).padStart(2, '0')
  const seconds = String(remainingSeconds.value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
})
const visibleEmailError = computed(() => emailInputError.value || (props.showEmailError ? props.emailError : ''))
const feedbackError = computed(() => visibleEmailError.value || expired.value ? '' : codeError.value || error.value)
const hasCodeError = computed(() => Boolean(codeError.value && feedbackError.value))
const mockEnabled = computed(() => import.meta.env.DEV && development.mockEnabled)
let controller
let timer
let resendAt = 0
let expiresAt = 0

function clearVerification() {
  controller?.abort()
  clearInterval(timer)
  token.value = ''
  pending.value = ''
  error.value = ''
  emailInputError.value = ''
  codeError.value = ''
  requested.value = false
  sent.value = false
  code.value = ''
  cooldownSeconds.value = 0
  remainingSeconds.value = 0
  extensionGrant.value = ''
  extendedProof.value = ''
  resendAt = 0
  expiresAt = 0
}

watch([normalizedEmail, mockEnabled], clearVerification, { flush: 'sync' })
watch(token, (value, previous) => {
  if (!value && previous) {
    sent.value = false
    code.value = ''
    codeError.value = ''
    if (!isSignup.value && requested.value) focusCode()
  }
})
onBeforeUnmount(() => {
  controller?.abort()
  clearInterval(timer)
})

async function requestCode() {
  if (props.disabled || pending.value) return
  if (canReturnToCode.value) {
    requested.value = true
    await focusCode()
    return
  }
  if (coolingDown.value) return
  emit('touch-email')
  if (props.emailError || (emailInput.value && !emailInput.value.checkValidity())) {
    emailInputError.value = props.emailError ? '' : '이메일 주소를 확인해주세요.'
    emailInput.value?.focus()
    return
  }
  emailInputError.value = ''
  token.value = ''
  sent.value = false
  code.value = ''
  codeError.value = ''
  extensionGrant.value = ''
  extendedProof.value = ''
  expiresAt = 0
  updateTimers()
  const emailAddress = normalizedEmail.value
  await run('sending', async (signal) => {
    if (isSignup.value) {
      await checkSignupEmail({ email: emailAddress, signal })
      if (signal.aborted) return
      requested.value = true
      focusCode()
    }
    const result = await sendEmailCode({ email: emailAddress, purpose: props.purpose, signal })
    if (signal.aborted) return
    resendAt = performance.now() + 60_000
    expiresAt = windowDeadline(result) ?? performance.now() + 300_000
    extensionGrant.value = result?.extensionToken ?? ''
    startTimer()
    sent.value = true
    if (!isSignup.value) {
      requested.value = true
      focusCode()
    }
  })
}

function updateTimers() {
  const now = performance.now()
  cooldownSeconds.value = Math.max(0, Math.ceil((resendAt - now) / 1000))
  remainingSeconds.value = Math.max(0, Math.ceil((expiresAt - now) / 1000))
  if (!coolingDown.value && !remainingSeconds.value) clearInterval(timer)
}

function windowDeadline(result) {
  const deadline = Date.parse(result?.expiresAt)
  if (!Number.isFinite(deadline)) return null
  const serverTime = Date.parse(result.serverTime)
  return performance.now() + deadline - (Number.isFinite(serverTime) ? serverTime : Date.now())
}

function startTimer() {
  clearInterval(timer)
  updateTimers()
  if (coolingDown.value || remainingSeconds.value) timer = setInterval(updateTimers, 1000)
}

async function extendTime() {
  updateTimers()
  if (props.disabled || pending.value || !extensionGrant.value || expired.value) return
  await run('extending', async (signal) => {
    const result = await extendEmailCode({
      email: normalizedEmail.value, purpose: props.purpose, extensionToken: extensionGrant.value, signal,
    })
    if (signal.aborted) return
    const deadline = windowDeadline(result)
    if (!result?.extensionToken || deadline === null) throw new Error('연장된 인증 시간을 확인할 수 없습니다.')
    expiresAt = deadline
    extensionGrant.value = ''
    extendedProof.value = result.extensionToken
    startTimer()
  })
}

async function focusCode() {
  await nextTick()
  codeInput.value?.focus()
}

async function changeEmail() {
  requested.value = false
  codeError.value = ''
  await nextTick()
  emailInput.value?.focus()
}

function updateCode(event) {
  const input = event.target
  const digits = input.value.replace(/[^0-9]/g, '').slice(0, 6)
  if (code.value !== digits) codeError.value = ''
  code.value = digits
  if (input.value !== digits) {
    const cursor = input.value.slice(0, input.selectionStart).replace(/[^0-9]/g, '').length
    input.value = digits
    input.setSelectionRange(cursor, cursor)
  }
  syncCodeCursor(event)
}

function syncCodeCursor(event) {
  codeCursor.value = event.target.selectionStart ?? 0
}

function placeCodeCursor(event) {
  const input = event.target
  if (!isSignup.value && event.detail === 1 && input.selectionStart === input.selectionEnd) {
    const { left, width } = input.getBoundingClientRect()
    const cursor = Math.min(code.value.length, Math.max(0, Math.floor((event.clientX - left) * 6 / width)))
    input.setSelectionRange(cursor, cursor)
  }
  syncCodeCursor(event)
}

async function confirmCode() {
  updateTimers()
  if (props.disabled || pending.value || !sent.value || token.value || expired.value) return
  if (!/^[0-9]{6}$/.test(code.value)) {
    codeError.value = '인증번호 6자리를 입력해주세요.'
    codeInput.value?.focus()
    return
  }
  await run('verifying', async (signal) => {
    const result = await verifyEmailCode({
      email: normalizedEmail.value, purpose: props.purpose, code: code.value,
      extensionToken: extendedProof.value || undefined, signal,
    })
    if (signal.aborted) return
    if (!result?.verificationToken) throw new Error('이메일 인증 결과를 확인할 수 없습니다.')
    token.value = result.verificationToken
    expiresAt = 0
    updateTimers()
  })
}

async function run(action, execute) {
  const request = new AbortController()
  controller = request
  pending.value = action
  const feedback = action === 'verifying' ? codeError : error
  feedback.value = ''
  try {
    await execute(request.signal)
  } catch (failure) {
    if (request.signal.aborted) return
    if (action === 'sending' && (failure.code === 'EMAIL_ALREADY_EXISTS' || failure.code === 'PASSWORD_RESET_EMAIL_UNAVAILABLE')) {
      const hadCodeFocus = codeInput.value && document.activeElement === codeInput.value
      requested.value = false
      code.value = ''
      emailInputError.value = failure.message
      if (hadCodeFocus) {
        await nextTick()
        if (!request.signal.aborted) emailInput.value?.focus()
      }
    } else {
      feedback.value = failure.message || '잠시 후 다시 시도해주세요.'
    }
  } finally {
    if (controller === request && !request.signal.aborted) pending.value = ''
  }
}

function sendCodeOnEnter(event) {
  event.preventDefault()
  if (event.isComposing || event.keyCode === 229 || event.repeat) return
  requestCode()
}

function submitCode(event) {
  event.preventDefault()
  if (event.isComposing || event.keyCode === 229 || event.repeat) return
  confirmCode()
}
</script>

<template>
  <div class="email-verification" :class="{ 'email-verification--initial': !requested }">
    <div v-if="isSignup || !requested" class="verification-row">
      <div class="auth-field" :class="{ 'has-error': visibleEmailError }">
        <label :for="id + '-email'" class="auth-field-label">
          <span class="is-sr-only">{{ isSignup ? '이메일 (아이디)' : '이메일' }}</span>
          <svg class="auth-field-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
        </label>
        <input :id="id + '-email'" ref="emailInput" v-model.trim="email" name="email" type="email" autocomplete="email"
          :placeholder="isSignup ? '이메일 (아이디) *' : '이메일 주소'" maxlength="254" required :readonly="disabled"
          :aria-invalid="Boolean(visibleEmailError)" :aria-describedby="visibleEmailError ? id + '-email-error' : undefined"
          @blur="emit('touch-email')" @keydown.enter="sendCodeOnEnter" />
      </div>
      <button type="button" :disabled="disabled || Boolean(pending) || (coolingDown && !canReturnToCode)" @click="requestCode">
        {{ canReturnToCode ? '인증번호 입력' : token ? '다시 인증' : sent ? '재전송' : '인증번호 받기' }}
      </button>
    </div>
    <p v-if="visibleEmailError" :id="id + '-email-error'" class="auth-field-error" :role="emailInputError ? 'alert' : undefined">{{ visibleEmailError }}</p>
    <template v-if="requested">
      <div v-if="!isSignup" class="recovery-address">
        <span>{{ email }}</span>
        <button class="recovery-text-button" type="button" :disabled="disabled || pending === 'verifying'" @click="changeEmail">
          이메일 주소 변경
        </button>
      </div>
      <label v-if="!isSignup" :for="id + '-code'" class="is-sr-only">인증번호</label>
      <div :class="{ 'verification-row': isSignup }">
        <div :class="{
          'auth-field': isSignup, 'recovery-code': !isSignup, 'is-verified': token, 'has-error': hasCodeError,
        }">
          <label v-if="isSignup" :for="id + '-code'" class="auth-field-label">
            <span class="is-sr-only">인증번호</span>
            <svg class="auth-field-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4 8 20M16 4l-2 16M5 9h15M4 15h15" /></svg>
          </label>
          <input :id="id + '-code'" ref="codeInput" :value="code" type="text" name="code" inputmode="numeric"
            autocomplete="one-time-code" :placeholder="isSignup ? '인증번호 6자리' : undefined"
            :aria-invalid="hasCodeError" :aria-describedby="hasCodeError ? id + '-code-error' : id + '-status'"
            :disabled="disabled || Boolean(token)" :readonly="pending === 'verifying'"
            @input="updateCode" @keydown.enter="submitCode" @focus="syncCodeCursor" @keyup="syncCodeCursor"
            @select="syncCodeCursor" @click="placeCodeCursor" />
          <div v-if="!isSignup" class="recovery-cells" aria-hidden="true">
            <span v-for="index in 6" :key="index" :class="{ 'is-current': index === Math.min(codeCursor + 1, 6) }">
              {{ code[index - 1] }}
            </span>
          </div>
        </div>
        <button v-if="isSignup" type="button" :disabled="disabled || Boolean(pending) || !sent || Boolean(token) || expired" @click="confirmCode">
          {{ token ? '인증 완료' : pending === 'verifying' ? '확인 중…' : '인증 확인' }}
        </button>
      </div>
    </template>
    <div v-if="requested && sent && !token" class="verification-timer">
      <span role="timer">남은 시간 <strong>{{ countdown }}</strong></span>
      <button v-if="extensionGrant || extendedProof" class="recovery-text-button" type="button"
        :disabled="disabled || Boolean(pending) || expired || Boolean(extendedProof)" @click="extendTime">
        {{ pending === 'extending' ? '연장 중…' : extendedProof ? '연장 완료' : '시간 연장' }}
      </button>
    </div>
    <p :id="id + '-status'" class="verification-status" :class="{ 'verification-status--success': token }" role="status">
      <template v-if="!visibleEmailError && !feedbackError">
        <template v-if="token">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 3 3 5-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>이메일 인증이 완료되었습니다.</span>
        </template>
        <template v-else-if="pending === 'sending'">
          {{ !requested ? '이메일을 확인하는 중입니다.' : '인증번호를 보내는 중입니다.' }}
        </template>
        <template v-else-if="expired">입력 시간이 지났습니다. 인증번호를 다시 요청해주세요.</template>
        <template v-else-if="sent && (isSignup || mockEnabled)">
          <template v-if="isSignup">인증번호를 보냈습니다.</template>
          <template v-if="mockEnabled"> 개발용 인증번호는 123456입니다.</template>
        </template>
      </template>
    </p>
    <p v-if="feedbackError" :id="hasCodeError ? id + '-code-error' : undefined"
      class="verification-error" role="alert">{{ feedbackError }}</p>
    <template v-if="requested && !isSignup">
      <div class="recovery-actions">
        <button class="recovery-text-button" type="button" :disabled="disabled || Boolean(pending) || coolingDown" @click="requestCode">
          재전송<span v-if="coolingDown"> ({{ cooldownSeconds }}초)</span>
        </button>
        <button class="recovery-next" type="button" :disabled="disabled || Boolean(pending) || !sent || Boolean(token) || expired" @click="confirmCode">
          {{ pending === 'verifying' ? '확인 중…' : '다음' }}
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.email-verification {
  display: grid;
  gap: 8px;
  text-align: left;
}

.verification-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }

button {
  min-width: 0;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-text);
  font: inherit;
}

button {
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-size: var(--font-size-control);
  font-weight: 650;
  cursor: pointer;
}

button:hover:enabled { background: var(--color-background); }
button:disabled { opacity: .55; cursor: default; }
button:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.verification-status, .verification-error { margin: 0; font-size: var(--font-size-label); line-height: 1.5; word-break: keep-all; }
.verification-status:empty { position: absolute; }
.verification-status--success {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid #d7e8cd;
  border-radius: 8px;
  background: #f1faec;
  color: #39702a;
  font-weight: 650;
}

.verification-status--success svg { flex-shrink: 0; }
.verification-error { color: #a12c49; }

.recovery-code { position: relative; }

.recovery-code input {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: text;
}

.recovery-cells {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(0.25rem, 1.5vw, 0.625rem);
}

.recovery-cells span {
  display: grid;
  place-items: center;
  min-inline-size: 0;
  block-size: clamp(2.75rem, 14vw, 3.5rem);
  border: 1px solid #a48d98;
  border-radius: 0.625rem;
  font-size: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.recovery-code:focus-within .is-current {
  border-color: var(--color-primary);
  box-shadow: inset 0 0 0 1px var(--color-primary);
}

.recovery-code.has-error .recovery-cells span { border-color: #b53951; }
.recovery-code.has-error:focus-within .is-current { box-shadow: inset 0 0 0 1px #b53951; }

.recovery-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-block-start: 0.5rem;
}

.recovery-actions .recovery-next { min-inline-size: 5.75rem; }

.recovery-address, .verification-timer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.25rem 0.875rem;
  font-size: var(--font-size-label);
}

.recovery-address { color: #6d555f; }
.recovery-address span { min-inline-size: 0; overflow-wrap: anywhere; }
.recovery-address button, .verification-timer button { font-size: inherit; }

.verification-timer {
  min-block-size: 2.75rem;
  padding-inline: 0.625rem;
  border-radius: 0.5rem;
  background: var(--color-background);
  font-variant-numeric: tabular-nums;
}

.verification-timer strong { color: #74384b; }

.recovery-text-button {
  padding: 0;
  border: 0;
  background: transparent;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.recovery-text-button:hover:enabled { background: transparent; color: var(--color-text); }
</style>
