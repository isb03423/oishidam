<script setup>
import { useId } from 'vue'

defineProps({ member: { type: Object, required: true }, busy: Boolean })
defineEmits(['toggle-status'])
const id = useId()
</script>

<template>
        <div class="member-profile"><div class="member-identity"><h3>{{ member.name }}</h3><span class="status-pill" data-tone="neutral">{{ member.role === 'ADMIN' ? '관리자' : '회원' }}</span></div><dl class="member-facts"><div class="member-email"><dt>이메일</dt><dd>{{ member.email || '—' }}</dd></div><div><dt>전화번호</dt><dd>{{ member.phone || '—' }}</dd></div><div><dt>출생연도</dt><dd>{{ member.birthYear || '—' }}</dd></div><div><dt>성별</dt><dd>{{ ({ M: '남성', F: '여성' })[member.gender] || member.gender || '—' }}</dd></div><div><dt>가입일</dt><dd>{{ member.createdAt?.replace('T', ' ').slice(0, 16) || '—' }}</dd></div></dl></div>
        <section class="member-status-section" :aria-labelledby="id + '-status-heading'"><div class="member-status-control"><div><h3 :id="id + '-status-heading'">이용 상태</h3><span class="status-pill" :data-tone="member.isActive ? 'success' : 'danger'">{{ member.isActive ? '활성화' : '비활성화' }}</span></div><button type="button" :class="member.isActive ? 'admin-danger' : 'admin-primary'" :disabled="busy" :aria-describedby="id + '-status-help'" @click="$emit('toggle-status')">{{ busy ? '변경 중…' : member.isActive ? '비활성화' : '활성화' }}</button></div><p :id="id + '-status-help'" class="meta">상태 변경 시 해당 회원의 기존 로그인은 해제됩니다.</p></section>
</template>

<style scoped>
.member-profile { padding: 22px 24px; }
.member-identity { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.member-identity h3 { font-size: 1.3125rem; font-weight: 700; overflow-wrap: anywhere; }
.member-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 24px; }
.member-facts > div { min-width: 0; }.member-facts .member-email { grid-column: 1 / -1; }
.member-facts dt { color: var(--admin-muted); font-size: var(--font-size-label); margin-bottom: 5px; }
.member-facts dd { margin: 0; color: var(--admin-ink); font-size: var(--font-size-body); line-height: 1.6; overflow-wrap: anywhere; }
.member-status-section { margin: 0; padding: 18px 24px; border-top: 1px solid var(--admin-line); background: var(--admin-subtle); }
.member-status-control { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.member-status-control > div { display: flex; align-items: center; gap: 12px; }
.member-status-control h3 { font-size: var(--font-size-table); }.member-status-control button { min-width: 100px; }
.member-status-section .meta { margin-top: 10px; color: var(--admin-muted); font-size: var(--font-size-label); line-height: 1.7; }
@media (max-width: 760px) {
  .member-profile { padding: 18px 16px; }.member-facts { gap: 16px; }.member-status-section { padding: 16px; }
  .member-status-control { gap: 10px; }.member-status-control > div { gap: 8px; }.member-status-control button { min-width: 88px; }
}
</style>
