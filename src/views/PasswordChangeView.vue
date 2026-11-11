<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { changePassword, clearPasswordProof } from '../services/account.js'

const router = useRouter()
const current = ref('')
const password = ref('')
const confirmation = ref('')
const errorMessage = ref('')
const pending = ref(false)
const complete = ref(false)

onBeforeUnmount(clearPasswordProof)

async function submit() {
  if (pending.value) return
  pending.value = true
  errorMessage.value = ''
  try {
    await changePassword(current.value, password.value, confirmation.value)
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
      <p>다른 사이트에서 사용하지 않은 비밀번호를 8자 이상 입력해주세요.</p>
      <label>현재 비밀번호<input v-model="current" type="password" autocomplete="current-password" required /></label>
      <label>새 비밀번호<input v-model="password" type="password" autocomplete="new-password" minlength="8" required /></label>
      <label>새 비밀번호 확인<input v-model="confirmation" type="password" autocomplete="new-password" minlength="8" required /></label>
      <p v-if="errorMessage" class="account-message" role="alert">{{ errorMessage }}</p>
      <div class="account-actions">
        <button type="button" :disabled="pending" @click="router.push({ name: 'MyPageProfile' })">취소</button>
        <button class="account-primary" type="submit" :disabled="pending">확인</button>
      </div>
    </form>
  </MyPageLayout>
</template>

<style scoped src="../styles/account.css"></style>