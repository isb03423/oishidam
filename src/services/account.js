import { computed } from 'vue'
import { development } from '../config/development.js'
import { session, updateMockProfile } from '../stores/session.js'

let proof
export const canManageAccount = computed(() =>
  import.meta.env.DEV && development.mockEnabled && session.source === 'mock' && Boolean(session.member?.email),
)

async function mockAccount() {
  if (!canManageAccount.value) throw new Error('이 계정의 정보 변경은 현재 지원되지 않습니다.')
  const member = session.member
  const mock = await import('../mocks/auth.js')
  if (member !== session.member || !canManageAccount.value) throw new Error('다시 로그인해주세요.')
  return { member, mock }
}

export function hasPasswordProof() {
  return canManageAccount.value && proof?.member === session.member && proof.expires > Date.now()
}

export function clearPasswordProof() {
  proof = undefined
}

export async function verifyCurrentPassword(password) {
  clearPasswordProof()
  const { member, mock } = await mockAccount()
  mock.handleAuthRequest('/auth/login', { email: member.email, password })
  proof = { member, expires: Date.now() + 5 * 60 * 1000 }
}

export async function changePassword(currentPassword, newPassword, confirmation) {
  const { member, mock } = await mockAccount()
  if (!hasPasswordProof()) throw new Error('본인 확인이 만료되었습니다. 다시 확인해주세요.')
  mock.changeMockPassword(member.email, currentPassword, newPassword, confirmation)
  clearPasswordProof()
}

export async function saveProfile(fields) {
  const { member, mock } = await mockAccount()
  updateMockProfile(mock.updateMockMember(member.email, fields))
}