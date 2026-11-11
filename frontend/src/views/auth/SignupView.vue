<script setup>
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../../assets/images/oishidam_logo.png'
import PolicyModal from '../../components/common/PolicyModal.vue'
import { signup } from '../../services/auth.js'
import { development } from '../../config/development.js'

const router = useRouter()
const mockEnabled = computed(() => import.meta.env.DEV && development.mockEnabled)
const form = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  gender: '',
  terms: false,
  privacy: false,
})
const touched = reactive({})
const submitted = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const pending = ref(false)
const requestError = ref('')
const openedPolicy = ref('')
let controller
let revision = 0
const currentYear = new Date().getFullYear()
const birthYears = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => currentYear - index)
const birthMonths = Array.from({ length: 12 }, (_, index) => index + 1)
const birthDays = computed(() => {
  const year = Number(form.birthYear)
  const month = Number(form.birthMonth)
  const lastDay = year && month ? new Date(year, month, 0).getDate() : 31
  return Array.from({ length: lastDay }, (_, index) => index + 1)
})
const birthDate = computed(() => {
  const selected = [form.birthYear, form.birthMonth, form.birthDay]
  if (!selected.some(Boolean)) return ''
  if (!selected.every(Boolean)) return null
  const year = Number(form.birthYear)
  const month = Number(form.birthMonth)
  const day = Number(form.birthDay)
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
})

const policies = {
  terms: {
    title: '이용약관',
    notice: '동의를 거부할 수 있으나, 필수 약관에 동의하지 않으면 회원가입을 할 수 없습니다.',
    paragraphs: [
      '제1조 (목적)\n이 약관은 오이시담이 제공하는 상품 조회 및 구매 관련 서비스의 이용 조건과 절차를 정하는 것을 목적으로 합니다.',
      '제2조 (회원의 의무)\n회원은 가입 정보와 주문 정보를 정확하게 입력해야 하며, 다른 사람의 정보를 사용하거나 서비스 운영을 방해해서는 안 됩니다.',
      '제3조 (서비스 이용)\n상품의 판매 상태와 재고는 주문 시점에 다시 확인됩니다. 주문, 결제, 배송 및 취소의 세부 기준은 서비스 정책과 관계 법령에 따릅니다.',
    ],
  },
  privacy: {
    title: '개인정보 수집 및 이용 동의',
    notice: '동의를 거부할 수 있으나, 필수 정보 수집 및 이용에 동의하지 않으면 회원가입을 할 수 없습니다.',
    paragraphs: [
      '수집 항목\n이메일 주소, 비밀번호, 이름, 휴대폰 번호·생년월일·성별(선택)',
      '이용 목적\n회원 식별, 서비스 제공, 주문 및 고객 문의 응대',
      '보유 기간\n회원 탈퇴 또는 수집·이용 목적 달성 시까지 보관합니다. 단, 관계 법령에 따라 보존이 필요한 정보는 해당 기간 동안 보관할 수 있습니다.',
      '동의를 거부할 수 있으나, 필수 정보 수집 및 이용에 동의하지 않으면 회원가입을 할 수 없습니다.',
    ],
  },
}

const errors = computed(() => ({
  email: !form.email.trim()
    ? '이메일(아이디)을 입력해주세요.'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ? '이메일 형식을 확인해주세요.'
      : '',
  password: !form.password
    ? '비밀번호를 입력해주세요.'
    : form.password.length < 8
      ? '비밀번호는 8자 이상 입력해주세요.'
      : '',
  passwordConfirm: !form.passwordConfirm
    ? '비밀번호 확인을 입력해주세요.'
    : form.password !== form.passwordConfirm
      ? '비밀번호가 일치하지 않습니다.'
      : '',
  name: !form.name.trim() ? '이름을 입력해주세요.' : '',
  phone: form.phone.trim() && !/^[0-9 -]{9,20}$/.test(form.phone.trim())
    ? '휴대폰 번호 형식을 확인해주세요.'
    : '',
  birthDate: mockEnabled.value && birthDate.value === null ? '생년월일은 연·월·일을 모두 선택해주세요.' : '',
  agreements: !form.terms || !form.privacy ? '필수 약관에 모두 동의해주세요.' : '',
}))

const isAllAgreed = computed({
  get: () => form.terms && form.privacy,
  set: (value) => {
    form.terms = value
    form.privacy = value
  },
})

function shouldShowError(field) {
  return Boolean(errors.value[field]) && (submitted.value || touched[field])
}

function touch(field) {
  touched[field] = true
}

function openPolicy(type) {
  openedPolicy.value = type
}

async function submit() {
  submitted.value = true
  requestError.value = ''
  if (Object.values(errors.value).some(Boolean) || pending.value) return

  const version = ++revision
  controller?.abort()
  controller = new AbortController()
  pending.value = true
  try {
    await signup({
      email: form.email,
      password: form.password,
      passwordConfirm: form.passwordConfirm,
      name: form.name,
      phone: form.phone,
      birthYear: form.birthYear,
      birthDate: birthDate.value || '',
      gender: form.gender,
      termsAgreed: form.terms,
      privacyAgreed: form.privacy,
      signal: controller.signal,
    })
    if (version === revision) await router.replace({ name: 'Login', query: { signup: 'complete' } })
  } catch (error) {
    if (version === revision && !controller.signal.aborted) {
      requestError.value = error.response?.data?.message || error.message || '회원가입을 완료하지 못했어요. 잠시 후 다시 시도해주세요.'
    }
  } finally {
    if (version === revision) pending.value = false
  }
}

watch(() => development.mockEnabled, () => {
  revision++
  controller?.abort()
  pending.value = false
  requestError.value = ''
})

onBeforeUnmount(() => {
  revision++
  controller?.abort()
})
</script>

<template>
  <main class="signup-page">
    <section class="signup-panel" aria-labelledby="signup-title">
      <RouterLink class="signup-logo" to="/" aria-label="오이시담 홈">
        <img :src="logo" alt="오이시담" />
      </RouterLink>
      <h1 id="signup-title" class="signup-title">회원가입</h1>
      <p class="signup-welcome">간단한 정보 입력으로 오이시담 회원이 되어보세요.</p>

      <form class="signup-form" :aria-busy="pending" novalidate @submit.prevent="submit">
        <label class="signup-field" :class="{ 'has-error': shouldShowError('email') }">
          <svg class="field-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
          <input v-model="form.email" type="email" name="email" autocomplete="email" placeholder="이메일 (아이디) *" aria-label="이메일 아이디" :aria-invalid="shouldShowError('email')" :disabled="pending" @blur="touch('email')" />
        </label>
        <p v-if="shouldShowError('email')" class="field-error">{{ errors.email }}</p>

        <label class="signup-field" :class="{ 'has-error': shouldShowError('password') }">
          <svg class="field-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></svg>
          <input v-model="form.password" :type="showPassword ? 'text' : 'password'" name="password" autocomplete="new-password" placeholder="비밀번호 *" aria-label="비밀번호" :aria-invalid="shouldShowError('password')" :disabled="pending" @blur="touch('password')" />
          <button class="password-toggle" type="button" :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 표시'" @click="showPassword = !showPassword"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path v-if="!showPassword" d="m3 3 18 18" /></svg></button>
        </label>
        <p v-if="shouldShowError('password')" class="field-error">{{ errors.password }}</p>

        <label class="signup-field" :class="{ 'has-error': shouldShowError('passwordConfirm') }">
          <svg class="field-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></svg>
          <input v-model="form.passwordConfirm" :type="showPasswordConfirm ? 'text' : 'password'" name="passwordConfirm" autocomplete="new-password" placeholder="비밀번호 확인 *" aria-label="비밀번호 확인" :aria-invalid="shouldShowError('passwordConfirm')" :disabled="pending" @blur="touch('passwordConfirm')" />
          <button class="password-toggle" type="button" :aria-label="showPasswordConfirm ? '비밀번호 확인 숨기기' : '비밀번호 확인 표시'" @click="showPasswordConfirm = !showPasswordConfirm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path v-if="!showPasswordConfirm" d="m3 3 18 18" /></svg></button>
        </label>
        <p v-if="shouldShowError('passwordConfirm')" class="field-error">{{ errors.passwordConfirm }}</p>

        <label class="signup-field" :class="{ 'has-error': shouldShowError('name') }">
          <svg class="field-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
          <input v-model="form.name" type="text" name="name" autocomplete="name" placeholder="이름 *" aria-label="이름" :aria-invalid="shouldShowError('name')" :disabled="pending" @blur="touch('name')" />
        </label>
        <p v-if="shouldShowError('name')" class="field-error">{{ errors.name }}</p>

        <label class="signup-field" :class="{ 'has-error': shouldShowError('phone') }">
          <svg class="field-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4.3 5.6 5.5c-.8.4-1.1 1.3-.8 2.1 2.1 5.6 5.9 9.4 11.5 11.5.8.3 1.7 0 2.1-.8l1.2-2.6-4-2-1.2 1.8c-2.2-1.1-4-2.9-5.1-5.1l1.8-1.2-2-4Z" /></svg>
          <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="휴대폰 번호 (선택)" aria-label="휴대폰 번호 선택" :aria-invalid="shouldShowError('phone')" :disabled="pending" @blur="touch('phone')" />
        </label>
        <p v-if="shouldShowError('phone')" class="field-error">{{ errors.phone }}</p>

        <div class="optional-profile" :class="{ 'has-error': shouldShowError('birthDate') }">
          <div class="optional-profile-heading">
            <strong>{{ mockEnabled ? '생년월일' : '출생연도' }}</strong><span>(선택)</span>
          </div>
          <div class="birth-selects">
            <select v-model="form.birthYear" aria-label="출생연도" :disabled="pending" @change="touch('birthDate')">
              <option value="">출생연도</option>
              <option v-for="year in birthYears" :key="year" :value="String(year)">{{ year }}년</option>
            </select>
            <select v-if="mockEnabled" v-model="form.birthMonth" aria-label="출생월" :disabled="pending" @change="touch('birthDate')">
              <option value="">월</option>
              <option v-for="month in birthMonths" :key="month" :value="String(month)">{{ month }}월</option>
            </select>
            <select v-if="mockEnabled" v-model="form.birthDay" aria-label="출생일" :disabled="pending" @change="touch('birthDate')">
              <option value="">일</option>
              <option v-for="day in birthDays" :key="day" :value="String(day)">{{ day }}일</option>
            </select>
          </div>
          <p class="optional-profile-hint">입력하시면 연령대별 맞춤 추천에 활용됩니다.</p>
          <p v-if="shouldShowError('birthDate')" class="field-error">{{ errors.birthDate }}</p>
        </div>

        <div class="optional-profile gender-profile">
          <p class="optional-profile-heading"><strong>성별</strong><span>(선택)</span></p>
          <div class="gender-options">
            <label><input v-model="form.gender" type="radio" name="gender" value="FEMALE" :disabled="pending" /> 여성</label>
            <label><input v-model="form.gender" type="radio" name="gender" value="MALE" :disabled="pending" /> 남성</label>
            <label><input v-model="form.gender" type="radio" name="gender" value="NONE" :disabled="pending" /> 선택 안 함</label>
          </div>
        </div>

        <div class="agreements">
          <label class="all-agreement"><input v-model="isAllAgreed" type="checkbox" :disabled="pending" /> 전체 동의하기</label>
          <div class="agreement-list">
            <label><input v-model="form.terms" type="checkbox" :disabled="pending" @change="touch('agreements')" /> <span>(필수) 이용약관에 동의합니다.</span></label>
            <button type="button" @click="openPolicy('terms')">보기 <span aria-hidden="true">›</span></button>
            <label><input v-model="form.privacy" type="checkbox" :disabled="pending" @change="touch('agreements')" /> <span>(필수) 개인정보 수집 및 이용에 동의합니다.</span></label>
            <button type="button" @click="openPolicy('privacy')">보기 <span aria-hidden="true">›</span></button>
          </div>
          <p v-if="shouldShowError('agreements')" class="field-error">{{ errors.agreements }}</p>
        </div>

        <p v-if="requestError" class="signup-request-error" role="alert">{{ requestError }}</p>
        <button class="signup-submit" type="submit" :disabled="pending">{{ pending ? '가입 처리 중…' : '회원가입' }}</button>
      </form>

      <p class="signup-login">이미 회원이신가요? <RouterLink to="/login">로그인 <span aria-hidden="true">›</span></RouterLink></p>
    </section>

    <PolicyModal
      :open="Boolean(openedPolicy)"
      :title="openedPolicy ? policies[openedPolicy].title : ''"
      :paragraphs="openedPolicy ? policies[openedPolicy].paragraphs : []"
      :notice="openedPolicy ? policies[openedPolicy].notice : ''"
      @close="openedPolicy = ''"
    />
  </main>
</template>

<style scoped>
/* 페이지 · 로고 · 제목 */
.signup-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 48px 24px;
  background: var(--color-white);
  color: var(--color-text);
}

.signup-panel {
  width: min(100%, 352px);
  margin: 0 auto;
  text-align: center;
}

.signup-logo {
  display: inline-block;
  margin-bottom: 14px;
}

.signup-logo img {
  display: block;
  width: 160px;
  height: auto;
}

.signup-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
}

.signup-welcome {
  margin: 10px 0 24px;
  color: #8d7e85;
  font-size: 13px;
}

/* 필수 입력 필드 */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.signup-field {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #fff;
}

.signup-field:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgb(156 79 99 / 8%);
}

.signup-field.has-error {
  border-color: #b53951;
}

.signup-field input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 13px;
}

.signup-field input::placeholder {
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

.field-error {
  margin: -2px 2px 2px;
  color: #b53951;
  font-size: 11px;
  line-height: 1.4;
}

/* 선택 프로필 정보 · 생년월일과 성별 */
.optional-profile {
  padding: 12px;
  border: 0;
  border-radius: 10px;
  background: var(--color-background);
  text-align: left;
}

.optional-profile.has-error {
  box-shadow: 0 0 0 1px #b53951;
}

.optional-profile-heading {
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin: 0 0 9px;
  padding: 0;
  border: 0;
  color: var(--color-text);
  font-size: 13px;
}

.optional-profile-heading span {
  color: #8d7e85;
  font-size: 12px;
  font-weight: 400;
}

.birth-selects {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 6px;
}

.birth-selects select {
  width: 100%;
  height: 36px;
  padding: 0 8px;
  border: 1px solid var(--color-border);
  border-radius: 7px;
  outline: 0;
  background: #fff;
  color: var(--color-text);
  font: inherit;
  font-size: 12px;
}

.birth-selects select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgb(156 79 99 / 8%);
}

.optional-profile-hint {
  margin: 8px 0 0;
  color: #82767c;
  font-size: 11px;
  line-height: 1.4;
}

.optional-profile .field-error {
  margin: 7px 0 0;
}

.gender-profile {
  min-inline-size: 0;
}

.gender-options {
  display: flex;
  align-items: center;
  gap: 24px;
  color: #62555b;
  font-size: 13px;
}

.gender-options label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}

.gender-options input {
  width: 15px;
  height: 15px;
  margin: 0;
  accent-color: var(--color-primary);
}

/* 필수 약관 동의 */
.agreements {
  margin-top: 10px;
  padding-top: 2px;
}

.all-agreement {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0 13px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.agreements input {
  width: 14px;
  height: 14px;
  margin: 0;
  accent-color: var(--color-primary);
}

.agreement-list {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  row-gap: 13px;
  align-items: center;
  padding: 15px 0 2px;
  color: #685960;
  font-size: 12px;
}

.agreement-list label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.agreement-list button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-secondary);
  font: inherit;
  cursor: pointer;
}

.agreement-list button:hover {
  color: var(--color-primary);
}

/* 가입 제출 · 화면 이동 링크 */
.signup-request-error {
  margin: 4px 0 0;
  color: #b53951;
  font-size: 12px;
  line-height: 1.5;
}

.signup-submit {
  width: 100%;
  min-height: 46px;
  margin-top: 12px;
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.signup-submit:hover:enabled {
  background: #874155;
}

.signup-submit:disabled {
  opacity: .65;
  cursor: wait;
}

.signup-login {
  margin: 28px 0 0;
  color: #8d7e85;
  font-size: 12px;
}

.signup-login a {
  margin-left: 12px;
  color: var(--color-text);
}

.signup-page button:focus-visible,
.signup-logo:focus-visible,
.signup-login a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* 모바일 · 긴 가입 폼이 위에서부터 자연스럽게 표시되도록 조정 */
@media (max-width: 600px) {
  .signup-page {
    align-items: flex-start;
    padding: 38px 24px;
  }
}
</style>
