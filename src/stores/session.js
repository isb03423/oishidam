import { computed, reactive, readonly, watch } from 'vue'
import { development } from '../config/development.js'

const storageKey = 'oishidam:mock-session:v1'
const apiStorageKey = 'oishidam:api-session:v1'
const state = reactive({ member: null, source: null, restoreError: '' })
export const session = readonly(state)
export const shoppingOwner = computed(() => session.member
  ? JSON.stringify([session.source, session.member.member_id])
  : 'guest')
let authTokens = null
let rememberLogin = false
let revision = 0

export function getSessionRevision() { return revision }

export function savedApiLogin() {
  for (const [storage, remember] of [['sessionStorage', false], ['localStorage', true]]) {
    try {
      const saved = JSON.parse(window[storage].getItem(apiStorageKey) ?? 'null')
      if (typeof saved?.refreshToken === 'string' && saved.refreshToken.trim()) return { refreshToken: saved.refreshToken, remember }
      window[storage].removeItem(apiStorageKey)
    } catch { /* 저장소 사용 불가 */ }
  }
  return null
}

export function updateAuthTokens(tokens, remember = rememberLogin) {
  authTokens = tokens
  rememberLogin = remember
  try {
    const storage = remember ? 'localStorage' : 'sessionStorage'
    window[storage].setItem(apiStorageKey, JSON.stringify({ refreshToken: tokens.refreshToken }))
    window[remember ? 'sessionStorage' : 'localStorage'].removeItem(apiStorageKey)
  } catch { /* 저장소 사용 불가 시 현재 탭의 메모리 인증을 유지한다. */ }
}

export function setRestoreError(message) {
  state.restoreError = message
}

export function getAuthTokens() {
  return authTokens
}

function removeSavedSession() {
  for (const storage of ['localStorage', 'sessionStorage']) {
    try {
      window[storage].removeItem(storageKey)
      window[storage].removeItem(apiStorageKey)
    } catch { /* 저장소 사용 불가 */ }
  }
}

export function clearSession() {
  revision++
  authTokens = null
  state.member = null
  state.source = null
  state.restoreError = ''
  rememberLogin = false
  removeSavedSession()
}

export function normalizeMember(member = {}) {
  return {
    member_id: member.memberId,
    name: member.name,
    email: member.email,
    phone: member.phone,
    birth_year: member.birthYear,
    gender: { M: 'MALE', F: 'FEMALE', 남성: 'MALE', 여성: 'FEMALE' }[member.gender] || 'NONE',
    role: { 관리자: 'ADMIN', '일반 회원': 'USER' }[member.role] || member.role,
    status: member.isActive === false ? 'INACTIVE' : 'ACTIVE',
  }
}

export function updateApiMember(member) {
  const updated = normalizeMember(member)
  if (state.source === 'api' && state.member?.member_id === updated.member_id) {
    Object.assign(state.member, updated, { phone: updated.phone ?? '', email: updated.email ?? null })
  }
}

export function setSession(member, { mock = false, remember = false, tokens = null } = {}) {
  if (!member?.member_id || !member.name || (mock && member.status !== 'ACTIVE')) throw new Error('로그인 응답을 확인해주세요.')
  revision++
  removeSavedSession()
  authTokens = tokens
  rememberLogin = remember
  state.restoreError = ''
  state.member = {
    member_id: member.member_id,
    name: member.name,
    email: member.email ?? null,
    phone: member.phone ?? '',
    birth_date: member.birth_date ?? '',
    birth_year: member.birth_year ?? null,
    gender: member.gender ?? '',
    joined_at: member.joined_at ?? '',
    role: member.role,
    status: member.status,
    cart_count: Number.isInteger(member.cart_count) && member.cart_count > 0 ? member.cart_count : 0,
  }
  state.source = mock ? 'mock' : 'api'
  if (!mock && tokens?.refreshToken) updateAuthTokens(tokens, remember)
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

export function updateMockProfile({ name, phone, birth_date, gender, joined_at }) {
  if (state.source !== 'mock' || !state.member) return
  Object.assign(state.member, { name, phone, birth_date, gender, joined_at })
  for (const storage of ['localStorage', 'sessionStorage']) {
    try {
      const saved = JSON.parse(window[storage].getItem(storageKey) || 'null')
      if (saved?.member?.member_id === state.member.member_id) {
        window[storage].setItem(storageKey, JSON.stringify({ ...saved, member: state.member }))
      }
    } catch { /* 저장소 사용 불가 */ }
  }
}
