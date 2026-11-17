<script setup>
import { getPasswordError, passwordRequirements } from '../services/passwordPolicy.js'
import PhoneInput from '../components/common/PhoneInput.vue'
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { canChangePassword, canManageAccount, changePassword, clearPasswordProof, hasPasswordProof, loadProfile, saveProfile, verifyCurrentPassword } from '../services/account.js'
import { session } from '../stores/session.js'

const router = useRouter()
const fields = reactive({})
const securityStep = ref('summary')
const newPassword = ref('')
const confirmation = ref('')
const passwordMismatch = computed(() => Boolean(confirmation.value) && newPassword.value !== confirmation.value)
const profileRequest = new AbortController()
onMounted(async () => {
  if (session.source !== 'api') return
  busy.value = true
  try {
    await loadProfile(profileRequest.signal)
    if (!profileRequest.signal.aborted) reset()
  } catch (error) {
    if (!profileRequest.signal.aborted) profileMessage.value = error.message
  } finally {
    busy.value = false
  }
})
onBeforeUnmount(() => {
  profileRequest.abort()
  clearPasswordProof()
})

const password = ref('')
const showPassword = ref(false)
const passwordError = ref('')
const profileMessage = ref('')
const busy = ref(false)
const verifying = ref(false)

function reset() {
  const member = session.member
  Object.assign(fields, {
    name: member?.name ?? '',
    phone: member?.phone ?? '',
    birth_date: member?.birth_date ?? '',
    birth_year: member?.birth_year ?? '',
    gender: member?.gender || 'NONE',
  })
  profileMessage.value = ''
}

watch(() => session.member, (member) => {
  if (!member) router.replace({ name: 'Login' })
  reset()
}, { immediate: true })

async function submitProfile() {
  if (busy.value) return
  if (fields.phone && fields.phone !== session.member?.phone && !/^\d{3}-\d{4}-\d{4}$/.test(fields.phone)) {
    profileMessage.value = '휴대폰 번호 11자리를 입력해주세요.'
    return
  }
  busy.value = true
  try {
    await saveProfile(fields)
    reset()
    profileMessage.value = '회원정보를 수정했습니다.'
  } catch (error) {
    profileMessage.value = error.message
  } finally {
    busy.value = false
  }
}

function resetSecurity(step = 'summary') {
  clearPasswordProof()
  securityStep.value = step
  newPassword.value = confirmation.value = ''
  showPassword.value = false
  password.value = ''
  passwordError.value = ''
}

async function confirmIdentity() {
  if (verifying.value) return
  verifying.value = true
  passwordError.value = ''
  try {
    await verifyCurrentPassword(password.value)
    showPassword.value = false
    securityStep.value = 'change'
  } catch (error) {
    passwordError.value = error.message
  } finally {
    password.value = ''
    verifying.value = false
  }
}

async function submitPassword() {
  if (verifying.value || passwordMismatch.value) return
  passwordError.value = getPasswordError(newPassword.value, '새 비밀번호')
  if (passwordError.value) return
  verifying.value = true
  try {
    const live = session.source === 'api'
    await changePassword(newPassword.value, confirmation.value, live ? password.value : undefined)
    if (live) await router.replace({ name: 'Login', query: { password: 'changed' } })
    else resetSecurity('complete')
  } catch (error) {
    if (session.source === 'mock' && !hasPasswordProof()) resetSecurity('verify')
    passwordError.value = error.message
  } finally {
    password.value = ''
    verifying.value = false
  }
}
</script>

<template>
  <MyPageLayout icon="member" title="내 정보 관리" stretch-content description="회원님의 소중한 정보를 안전하게 관리하세요.">
    <div class="profile-panels">
      <form class="profile-form" @submit.prevent="submitProfile">
        <section class="account-card profile-panel profile-basic" aria-labelledby="profile-basic-title">
          <header class="profile-panel-heading">
            <h2 id="profile-basic-title">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><circle cx="8" cy="10" r="2" /><path d="M5 16a3 3 0 0 1 6 0m3-7h5m-5 5h5" /></svg>
              기본 정보
            </h2>
            <p>회원정보를 확인하고 수정할 수 있어요.</p>
          </header>
          <div class="profile-card profile-fields">
            <div class="profile-row">
              <label for="profile-email">이메일(아이디)</label>
              <input id="profile-email" :value="session.member?.email || '등록 정보 없음'" readonly />
              <small>이메일(아이디)는 변경할 수 없습니다.</small>
            </div>
            <div class="profile-row">
              <label for="profile-name">이름</label>
              <input id="profile-name" v-model="fields.name" maxlength="100" autocomplete="name" required :readonly="!canManageAccount" />
            </div>
            <div class="profile-row">
              <label for="profile-phone">휴대폰 번호</label>
              <PhoneInput id="profile-phone" v-model="fields.phone" :readonly="!canManageAccount" />
            </div>
            <div class="profile-row">
              <label for="profile-birth">{{ session.source === 'api' ? '출생연도' : '생년월일' }}</label>
              <input v-if="session.source === 'api'" id="profile-birth" v-model.number="fields.birth_year" type="number" min="1900" max="2100" step="1" :required="session.member?.birth_year != null" />
              <input v-else id="profile-birth" v-model="fields.birth_date" type="date" min="1900-01-01" max="2100-12-31" autocomplete="bday" :readonly="!canManageAccount" />
            </div>
            <div class="profile-row">
              <label for="profile-gender">성별</label>
              <select id="profile-gender" v-model="fields.gender" :disabled="!canManageAccount">
                <option value="NONE" :disabled="session.source === 'api' && session.member?.gender !== 'NONE'">선택 안 함</option>
                <option value="FEMALE">여성</option>
                <option value="MALE">남성</option>
              </select>
            </div>
            <div class="profile-row">
              <label for="profile-joined">가입일</label>
              <input id="profile-joined" :value="session.member?.joined_at || '등록 정보 없음'" readonly />
            </div>
            <p v-if="!canManageAccount" class="account-message">이 계정의 정보 변경은 현재 지원되지 않습니다.</p>
            <p v-if="profileMessage" class="account-message" role="status">{{ profileMessage }}</p>
          </div>
          <div class="account-actions profile-save-actions">
            <button type="button" @click="reset">취소</button>
            <button class="account-primary" type="submit" :disabled="busy || !canManageAccount">정보 수정</button>
          </div>
        </section>
      </form>

      <section class="account-card profile-panel profile-security" aria-labelledby="profile-security-title">
        <header class="profile-panel-heading">
          <h2 id="profile-security-title">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></svg>
            계정 보안
          </h2>
          <p>계정을 더욱 안전하게 관리하세요.</p>
        </header>
        <div class="profile-security-body">
          <div v-if="securityStep === 'summary'" class="profile-security-content">
            <div class="profile-security-symbol" aria-hidden="true">
              <svg viewBox="0 0 156 72" aria-hidden="true">
                <path class="security-cloud" d="M2 68c3-9 12-16 22-16 4-10 12-17 22-17 7 0 13 3 17 8 5-10 14-15 24-15 11 0 20 6 24 16 10-3 20 1 24 9 9 1 16 7 19 15Z" />
                <path class="security-shield" d="M79 16c6 5 12 7 18 8v10c0 11-8 18-18 24-10-6-18-13-18-24V24c6-1 12-3 18-8Z" />
                <rect class="security-lock" x="74" y="34" width="10" height="10" rx="1.5" />
                <path class="security-lock" d="M76 34v-2.5a3 3 0 0 1 6 0V34m-3 4v2" />
                <path class="security-rays" d="m104 17 2-6m2 10 7-5m-5 10h6" />
              </svg>
            </div>
            <div class="profile-password-copy">
              <h3>비밀번호 변경</h3>
            <label v-if="session.source === 'api'">현재 비밀번호<input v-model="password" type="password" autocomplete="current-password" required /></label>
              <p>주기적인 비밀번호 변경으로<br />내 계정을 안전하게 보호하세요.</p>
            </div>
            <button class="account-primary profile-password-button" type="button" :disabled="!canChangePassword" @click="resetSecurity(session.source === 'api' ? 'change' : 'verify')">
              비밀번호 변경
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
            </button>
          </div>
          <form v-else-if="securityStep === 'verify'" class="profile-security-form" @submit.prevent="confirmIdentity">
        <div class="verify-symbol" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="4.5" y="10" width="15" height="12" rx="1.5" /><path d="M8 10V6a4 4 0 0 1 8 0v4" /></svg>
        </div>
        <h2 id="verify-title">본인 확인</h2>
        <p id="verify-description">비밀번호를 변경하려면<br />현재 비밀번호를 한 번 더 입력해주세요.</p>
        <div class="verify-password">
          <input v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" aria-label="현재 비밀번호" placeholder="현재 비밀번호" required :disabled="verifying" />
          <button class="verify-toggle" type="button" :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 표시'" @click="showPassword = !showPassword">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path v-if="!showPassword" d="m3 3 18 18" /></svg>
          </button>
        </div>
        <p v-if="passwordError" class="account-message" role="alert">{{ passwordError }}</p>
        <div class="account-actions">
          <button type="button" :disabled="verifying" @click="resetSecurity()">취소</button>
          <button class="account-primary" type="submit" :disabled="verifying">확인</button>
        </div>
      </form>
          <form v-else-if="securityStep === 'change'" class="profile-security-form password-card" @submit.prevent="submitPassword">
            <h3>비밀번호 변경</h3>
            <label v-if="session.source === 'api'">현재 비밀번호<input v-model="password" type="password" autocomplete="current-password" required /></label>
            <label>새 비밀번호<input v-model="newPassword" type="password" autocomplete="new-password" minlength="8" aria-describedby="profile-password-requirements" required /></label>
            <label>새 비밀번호 확인<input v-model="confirmation" type="password" autocomplete="new-password" minlength="8" required :aria-invalid="passwordMismatch || undefined" :aria-describedby="passwordMismatch ? 'profile-password-mismatch' : undefined" /></label>
            <p v-if="passwordMismatch" id="profile-password-mismatch" class="account-message password-mismatch" aria-live="polite">새 비밀번호가 일치하지 않습니다.</p>
            <small id="profile-password-requirements" class="password-requirements">{{ passwordRequirements }}</small>
            <p v-if="passwordError" class="account-message" role="alert">{{ passwordError }}</p>
            <div class="account-actions">
              <button type="button" :disabled="verifying" @click="resetSecurity()">취소</button>
              <button class="account-primary" type="submit" :disabled="verifying || passwordMismatch">변경</button>
            </div>
          </form>
          <div v-else class="profile-security-content">
            <p role="status">비밀번호를 변경했습니다.</p>
            <button class="account-primary" type="button" @click="resetSecurity()">확인</button>
          </div>
        </div>
      </section>
    </div>


  </MyPageLayout>
</template>

<style scoped src="../styles/account.css"></style>