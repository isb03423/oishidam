<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import { withdrawMember } from '../services/account.js'

const router = useRouter()
const acknowledged = ref(false)
const dialog = ref(null)
const submitting = ref(false)
const error = ref('')

function openConfirmation() {
  if (!acknowledged.value || submitting.value) return
  error.value = ''
  dialog.value.showModal()
}

function closeConfirmation() {
  if (!submitting.value) dialog.value.close()
}

async function confirmWithdrawal() {
  if (!acknowledged.value || submitting.value || !dialog.value.open) return
  submitting.value = true
  error.value = ''
  try {
    const signedOut = await withdrawMember()
    dialog.value.close()
    if (signedOut) await router.replace({ name: 'Home' })
  } catch (failure) {
    error.value = failure.message || '회원 탈퇴를 처리하지 못했습니다. 다시 시도해 주세요.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <MyPageLayout icon="withdraw" title="회원 탈퇴" description="오이시담을 떠나시기 전에 아래 내용을 확인해 주세요.">
    <section class="activity-panel withdraw-panel" aria-labelledby="withdraw-heading">
      <header class="withdraw-intro">
        <img src="../assets/icons/cart-box-empty.svg" alt="" />
        <h2 id="withdraw-heading">정말 탈퇴하시겠어요?</h2>
        <p>회원 탈퇴 후에는 계정을 복구할 수 없습니다.</p>
      </header>

      <section class="withdraw-notice" aria-labelledby="withdraw-notice-heading">
        <h3 id="withdraw-notice-heading">탈퇴 전 확인 사항</h3>
        <ul>
          <li>탈퇴하면 이 계정으로 다시 로그인할 수 없습니다.</li>
          <li>회원 정보와 서비스 이용 기록은 개인정보 처리방침에 따라 처리됩니다.</li>
          <li>진행 중인 주문이나 1:1 문의가 있다면 먼저 확인해 주세요.</li>
        </ul>
      </section>

      <label class="withdraw-agreement">
        <input v-model="acknowledged" type="checkbox" />
        회원 탈퇴 안내 사항을 확인했습니다.
      </label>
      <div class="activity-actions">
        <RouterLink :to="{ name: 'MyPage' }" class="activity-button">취소</RouterLink>
        <button type="button" class="activity-button is-primary" :disabled="!acknowledged" aria-haspopup="dialog" @click="openConfirmation">회원 탈퇴</button>
      </div>
    </section>
  </MyPageLayout>

  <dialog ref="dialog" class="withdraw-dialog" aria-labelledby="withdraw-dialog-title" aria-describedby="withdraw-dialog-copy" @cancel.prevent="closeConfirmation">
    <header class="withdraw-dialog-heading">
      <h2 id="withdraw-dialog-title">회원 탈퇴 확인</h2>
      <button type="button" class="withdraw-close" aria-label="닫기" :disabled="submitting" @click="closeConfirmation">×</button>
    </header>
    <div class="withdraw-dialog-message">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.5 4.8a1.7 1.7 0 0 1 3 0l7.5 13a1.7 1.7 0 0 1-1.5 2.5h-15A1.7 1.7 0 0 1 3 17.8l7.5-13ZM12 9v4m0 3h.01" />
      </svg>
      <strong>정말로 회원 탈퇴하시겠습니까?</strong>
      <p id="withdraw-dialog-copy">탈퇴 후에는 계정을 복구할 수 없습니다.</p>
    </div>
    <p v-if="error" class="withdraw-error" role="alert">{{ error }}</p>
    <div class="activity-actions" :aria-busy="submitting">
      <button type="button" class="activity-button" autofocus :disabled="submitting" @click="closeConfirmation">취소</button>
      <button type="button" class="activity-button is-primary" :disabled="submitting" @click="confirmWithdrawal">{{ submitting ? '처리 중…' : '탈퇴하기' }}</button>
    </div>
  </dialog>
</template>

<style scoped src="../styles/mypage-activity.css"></style>
<style scoped>
.withdraw-panel {
  display: grid;
  gap: 18px;
  padding: clamp(16px, 3vw, 26px);
  font-size: 14px;
}

.withdraw-intro { display: grid; justify-items: center; gap: 6px; padding-block: 8px; text-align: center; }
.withdraw-intro img { width: 64px; height: 64px; padding: 10px; border-radius: 50%; background: var(--color-background); }
.withdraw-intro h2 { font-size: 22px; font-weight: 700; }
.withdraw-notice { display: grid; gap: 10px; padding: 16px; border-radius: 10px; background: var(--color-background); }
.withdraw-notice h3 { color: var(--color-primary); font-weight: 700; }
.withdraw-notice ul { display: grid; gap: 8px; padding-inline-start: 20px; list-style: disc; }
.withdraw-notice li::marker { color: var(--color-primary); }
.withdraw-agreement { display: flex; align-items: center; gap: 8px; width: fit-content; font-weight: 650; cursor: pointer; }
.withdraw-agreement input { width: 16px; height: 16px; flex: none; accent-color: var(--color-primary); }

.withdraw-dialog {
  position: fixed;
  inset: 0;
  width: min(420px, calc(100% - 32px));
  max-height: calc(100% - 32px);
  margin: auto;
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-white);
  color: var(--color-text);
  font-size: 14px;
}

.withdraw-dialog::backdrop { background: rgb(57 44 50 / 50%); }
.withdraw-dialog-heading { display: flex; align-items: center; justify-content: space-between; }
.withdraw-dialog-heading h2 { font-size: 17px; font-weight: 700; }
.withdraw-close { border: 0; background: transparent; color: var(--color-primary); font-size: 24px; line-height: 1; cursor: pointer; }
.withdraw-dialog-message { display: grid; justify-items: center; gap: 9px; padding: 18px 0 24px; text-align: center; }
.withdraw-dialog-message svg { width: 50px; height: 50px; padding: 10px; border-radius: 50%; background: var(--color-background); fill: none; stroke: var(--color-primary); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.withdraw-dialog-message strong { font-size: 16px; }
.withdraw-error { margin-bottom: 12px; color: var(--color-primary); }
</style>
