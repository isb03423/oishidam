<script setup>
import { getPasswordError, passwordRequirements } from '../services/passwordPolicy.js'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { changePassword, clearPasswordProof } from '../services/account.js'

const router = useRouter()
const current = ref('')
const password = ref('')
const confirmation = ref('')
const passwordMismatch = computed(() => Boolean(confirmation.value) && password.value !== confirmation.value)
const errorMessage = ref('')
const pending = ref(false)
const complete = ref(false)

onBeforeUnmount(clearPasswordProof)

async function submit() {
  if (pending.value || passwordMismatch.value) return
  errorMessage.value = getPasswordError(password.value, '새 비밀번호')
  if (errorMessage.value) return
  pending.value = true
  try {
    await changePassword(password.value, confirmation.value, current.value)
    current.value = password.value = confirmation.value = ''
    complete.value = true
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <MyPageLayout icon="lock" title="비밀번호 변경" description="안전한 비밀번호로 회원정보를 보호하세요.">
    <section v-if="complete" class="account-card password-card">
      <p role="status">비밀번호를 변경했습니다.</p>
      <RouterLink :to="{ name: 'MyPageProfile' }">내 정보 관리로 돌아가기</RouterLink>
    </section>
    <form v-else class="account-card password-card" @submit.prevent="submit">
      <small id="password-requirements" class="password-requirements">{{ passwordRequirements }}</small>
      <label>현재 비밀번호<input v-model="current" type="password" autocomplete="current-password" required /></label>
      <label>새 비밀번호<input v-model="password" type="password" autocomplete="new-password" minlength="8" aria-describedby="password-requirements" required /></label>
      <label>새 비밀번호 확인<input v-model="confirmation" type="password" autocomplete="new-password" minlength="8" required :aria-invalid="passwordMismatch || undefined" :aria-describedby="passwordMismatch ? 'password-mismatch' : undefined" /></label>
      <p v-if="passwordMismatch" id="password-mismatch" class="account-message password-mismatch" aria-live="polite">새 비밀번호가 일치하지 않습니다.</p>
      <p v-if="errorMessage" class="account-message" role="alert">{{ errorMessage }}</p>
      <div class="account-actions">
        <button type="button" :disabled="pending" @click="router.push({ name: 'MyPageProfile' })">취소</button>
        <button class="account-primary" type="submit" :disabled="pending || passwordMismatch">확인</button>
      </div>
    </form>
  </MyPageLayout>
</template>

<style scoped src="../styles/account.css"></style>