import { computed, reactive, readonly, watch } from 'vue'
import { development } from '../config/development.js'

const storageKey = 'oishidam:mock-session:v1'
const state = reactive({ member: null, source: null })
export const session = readonly(state)
export const shoppingOwner = computed(() => session.member
  ? JSON.stringify([session.source, session.member.member_id])
  : 'guest')
let authTokens = null

export function getAuthTokens() {
  return authTokens
}

function removeSavedSession() {
  for (const storage of ['localStorage', 'sessionStorage']) {
    try { window[storage].removeItem(storageKey) } catch { /* 저장소 사용 불가 */ }
  }
}

export function clearSession() {
  authTokens = null
  state.member = null
  state.source = null
  removeSavedSession()
}

export function setSession(member, { mock = false, remember = false, tokens = null } = {}) {
  if (!member?.member_id || !member.name || (mock && member.status !== 'ACTIVE')) throw new Error('로그인 응답을 확인해주세요.')
  removeSavedSession()
  authTokens = tokens
  state.member = {
    member_id: member.member_id,
    name: member.name,
    email: member.email ?? null,
    role: member.role,
    status: member.status,
    cart_count: Number.isInteger(member.cart_count) && member.cart_count > 0 ? member.cart_count : 0,
  }
  state.source = mock ? 'mock' : 'api'
  // 실제 인증 유지 정책은 서버 연동 시 확정. 브라우저에는 mock 프로필만 저장.
  if (mock && import.meta.env.DEV) {
    try {
      const storage = remember ? localStorage : sessionStorage
      storage.setItem(storageKey, JSON.stringify({ member: state.member, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 }))
    } catch { /* 메모리에서만 로그인 상태 유지 */ }
  }
}

if (import.meta.env.DEV && development.mockEnabled) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey) || 'null')
    if (saved?.expiresAt > Date.now() && saved.member?.member_id && saved.member?.name && saved.member?.status === 'ACTIVE') {
      state.member = saved.member
      state.source = 'mock'
    } else removeSavedSession()
  } catch { removeSavedSession() }
}

// Mock 프로필을 실제 서버 인증으로 착각하지 않도록 모드 전환 시 초기화.
watch(() => development.mockEnabled, clearSession, { flush: 'sync' })
