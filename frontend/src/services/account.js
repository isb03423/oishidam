import { computed } from 'vue'
import { phoneDigits } from './phone.js'
import { apiRequest } from './api.js'
import { development } from '../config/development.js'
import { clearSession, session, updateApiMember, updateMockProfile } from '../stores/session.js'

let proof
export const canManageAccount = computed(() =>
  session.source === 'api' || (import.meta.env.DEV && development.mockEnabled && session.source === 'mock'),
)

export const canChangePassword = computed(() => canManageAccount.value && Boolean(session.member?.email))

async function mockAccount() {
  if (session.source !== 'mock' || !canChangePassword.value) throw new Error('이 계정의 정보 변경은 현재 지원되지 않습니다.')
  const member = session.member
  const mock = await import('../mocks/auth.js')
  if (member !== session.member || !canManageAccount.value) throw new Error('다시 로그인해주세요.')
  return { member, mock }
}

export function hasPasswordProof() {
  return session.source === 'mock' && proof?.member === session.member && proof.expires > Date.now()
}

export function clearPasswordProof() {
  proof = undefined
}

export async function verifyCurrentPassword(password) {
  clearPasswordProof()
  if (!password.trim()) throw new Error('현재 비밀번호를 입력해주세요.')
  const { member, mock } = await mockAccount()
  mock.handleAuthRequest('/auth/login', { email: member.email, password })
  proof = { member, expires: Date.now() + 5 * 60 * 1000 }
}

export async function changePassword(newPassword, confirmation, currentPassword) {
  if (session.source === 'api') {
    if (newPassword !== confirmation) throw new Error('새 비밀번호가 일치하지 않습니다.')
    if (!currentPassword?.trim()) throw new Error('현재 비밀번호를 입력해주세요.')
    const member = session.member
    await apiRequest({
      method: 'PUT', path: '/members/me/password', authenticated: true, mock: false,
      data: { currentPassword, newPassword },
    })
    if (session.member === member) clearSession()
    return
  }
  const { member, mock } = await mockAccount()
  if (!hasPasswordProof()) throw new Error('본인 확인이 만료되었습니다. 다시 확인해주세요.')
  if (currentPassword !== undefined) {
    if (!currentPassword.trim()) throw new Error('현재 비밀번호를 입력해주세요.')
    mock.handleAuthRequest('/auth/login', { email: member.email, password: currentPassword })
  }
  mock.changeMockPassword(member.email, newPassword, confirmation)
  clearPasswordProof()
}

export async function loadProfile(signal) {
  if (session.source !== 'api') return
  const member = session.member
  const data = await apiRequest({ path: '/members/me', authenticated: true, mock: false, signal })
  if (session.member === member && !signal?.aborted) updateApiMember(data)
}

export async function saveProfile(fields) {
  if (session.source === 'api') {
    const member = session.member
    const data = {}
    const name = fields.name.trim()
    const phone = phoneDigits(fields.phone)
    if (!name) throw new Error('이름을 입력해주세요.')
    if (name !== member.name) data.name = name
    if (phone !== (member.phone ?? '')) data.phone = phone
    if (fields.birth_year !== (member.birth_year ?? '') && fields.birth_year !== '') data.birthYear = Number(fields.birth_year)
    const gender = { MALE: 'M', FEMALE: 'F' }[fields.gender]
    if (gender && fields.gender !== member.gender) data.gender = gender
    if (!Object.keys(data).length) return
    const updated = await apiRequest({ path: '/members/me', method: 'PATCH', authenticated: true, mock: false, data })
    if (session.member === member) updateApiMember(updated)
    return
  }
  const { member, mock } = await mockAccount()
  updateMockProfile(mock.updateMockMember(member.email, { ...fields, phone: phoneDigits(fields.phone) }))
}
export async function withdrawMember() {
  const member = session.member
  if (!member || !canManageAccount.value) throw new Error('다시 로그인해주세요.')
  if (session.source === 'api') {
    await apiRequest({ method: 'DELETE', path: '/members/me', authenticated: true, mock: false })
  } else {
    const mock = await import('../mocks/auth.js')
    if (session.member !== member) throw new Error('다시 로그인해주세요.')
    mock.withdrawMockMember(member.member_id)
  }
  if (session.member !== member) return false
  clearPasswordProof()
  clearSession()
  return true
}
