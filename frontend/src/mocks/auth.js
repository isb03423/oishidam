import { getPasswordError } from '../services/passwordPolicy.js'

// 화면 개발 전용 계정. 실제 회원 비밀번호나 JWT를 사용하지 않습니다.
export const demoCredentials = { email: 'demo@oishidam.test', password: 'Oishi1234!' }

export const demoAdminCredentials = { email: 'admin@oishidam.test', password: 'OishiAdmin123!' }

const registeredMembers = new Map([
  [demoAdminCredentials.email, { member_id: 'demo-admin', email: demoAdminCredentials.email, name: '관리자', role: 'ADMIN', status: 'ACTIVE' }],
  [demoCredentials.email, { member_id: 'demo-customer', email: demoCredentials.email, phone: '010-1234-5678', birth_date: '1995-04-12', gender: 'FEMALE', joined_at: '2026-11-01', name: '오이', role: 'CUSTOMER', status: 'ACTIVE', cart_count: 0 }],
])

// 화면 개발용 로그인 검증 데이터입니다. 회원 응답에는 비밀번호를 포함하지 않습니다.
const registeredPasswords = new Map([
  [demoAdminCredentials.email, demoAdminCredentials.password],
  [demoCredentials.email, demoCredentials.password],
])

const withdrawnMembers = new Set()
const emailVerifications = new Map()

function consumeVerification(email, purpose, token) {
  const key = purpose + ':' + email
  const verification = emailVerifications.get(key)
  if (!verification?.token || verification.token !== token || verification.expiresAt <= Date.now()) {
    fail(400, 'INVALID_EMAIL_VERIFICATION', '이메일 인증이 만료되었거나 유효하지 않습니다. 다시 인증해주세요.')
  }
  emailVerifications.delete(key)
}

export function getMockCustomers() {
  return [...registeredMembers.values()]
    .filter((member) => member.role === 'CUSTOMER')
    .map(({ member_id, name, email, joined_at }) => ({
      id: member_id, name, email, joined_at,
      status: withdrawnMembers.has(member_id) ? 'WITHDRAWN' : 'ACTIVE',
    }))
}

export function getMockCustomerJoinDates() {
  return [...registeredMembers.values()]
    .filter((member) => member.role === 'CUSTOMER' && !withdrawnMembers.has(member.member_id))
    .map((member) => member.joined_at)
}

export function withdrawMockMember(memberId) {
  withdrawnMembers.add(memberId)
}

function fail(status, code, message) {
  const error = new Error(message)
  error.status = status
  error.code = code
  throw error
}

export function handleAuthRequest(path, data = {}) {
  if (path === '/auth/logout') return { success: true }
  if (path === '/auth/kakao') {
    if (withdrawnMembers.has('demo-kakao')) fail(401, 'INVALID_CREDENTIALS', '탈퇴한 계정입니다.')
    return { member: { member_id: 'demo-kakao', email: null, name: '카카오회원', role: 'CUSTOMER', status: 'ACTIVE', cart_count: 0 } }
  }
  const email = String(data.email || '').trim().toLowerCase()
  if (path === '/auth/signup/email-availability') {
    if (registeredMembers.has(email)) fail(409, 'EMAIL_ALREADY_EXISTS', '이미 사용 중인 이메일입니다.')
    return null
  }
  if (path === '/auth/email-verifications/extend') {
    const verification = emailVerifications.get((data.purpose ?? 'PASSWORD_RESET') + ':' + email)
    if (!verification?.requestToken || verification.requestToken !== data.extensionToken || verification.expiresAt <= Date.now()) {
      fail(400, 'INVALID_EMAIL_WINDOW', '인증 시간을 연장할 수 없습니다. 인증번호를 다시 요청해주세요.')
    }
    verification.extensionToken ??= globalThis.crypto.randomUUID()
    return { extensionToken: verification.extensionToken, expiresAt: new Date(verification.expiresAt + 300_000).toISOString(), serverTime: new Date().toISOString() }
  }
  if (path === '/auth/email-verifications' || path === '/auth/email-verifications/confirm') {
    const { purpose, code } = data
    const key = purpose + ':' + email
    const verification = emailVerifications.get(key)
    if (path.endsWith('/confirm')) {
      const extended = verification?.extensionToken && verification.extensionToken === data.extensionToken
      if (!verification || verification.token
          || verification.expiresAt + (extended ? 300_000 : 0) <= Date.now() || verification.attempts >= 5) {
        fail(400, 'INVALID_EMAIL_CODE', '인증번호가 올바르지 않거나 만료되었습니다.')
      }
      verification.attempts++
      if (code !== '123456') fail(400, 'INVALID_EMAIL_CODE', '인증번호가 올바르지 않습니다.')
      verification.token = globalThis.crypto.randomUUID()
      verification.expiresAt = Date.now() + 900_000
      return { verificationToken: verification.token }
    }
    if (purpose === 'SIGNUP' && registeredMembers.has(email)) fail(409, 'EMAIL_ALREADY_EXISTS', '이미 사용 중인 이메일입니다.')
    if (purpose === 'PASSWORD_RESET' && (!registeredPasswords.has(email) || withdrawnMembers.has(registeredMembers.get(email)?.member_id))) {
      fail(400, 'PASSWORD_RESET_EMAIL_UNAVAILABLE', '비밀번호를 재설정할 수 없는 이메일입니다. 가입할 때 사용한 이메일을 확인해주세요.')
    }
    const expiresAt = Date.now() + 300_000
    const requestToken = globalThis.crypto.randomUUID()
    emailVerifications.set(key, { expiresAt, attempts: 0, requestToken })
    return { extensionToken: requestToken, expiresAt: new Date(expiresAt).toISOString(), serverTime: new Date().toISOString() }
  }
  if (path === '/auth/password-reset') {
    validateNewPassword(data.newPassword, '새 비밀번호')
    if (data.newPassword !== data.passwordConfirm) fail(400, 'PASSWORD_MISMATCH', '새 비밀번호 확인이 일치하지 않습니다.')
    consumeVerification(email, 'PASSWORD_RESET', data.verificationToken)
    if (!registeredPasswords.has(email) || withdrawnMembers.has(registeredMembers.get(email)?.member_id)) {
      fail(400, 'INVALID_EMAIL_VERIFICATION', '이메일 인증이 만료되었거나 유효하지 않습니다.')
    }
    registeredPasswords.set(email, data.newPassword)
    return null
  }
  if (path === '/auth/signup') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'INVALID_EMAIL', '이메일 형식을 확인해주세요.')
    if (email.length > 254) fail(400, 'INVALID_EMAIL', '이메일은 254자 이내로 입력해주세요.')
    validateNewPassword(String(data.password || ''), '비밀번호')
    if (data.password !== data.passwordConfirm) fail(400, 'PASSWORD_MISMATCH', '비밀번호가 일치하지 않습니다.')
    validateMemberFields(String(data.name || ''), String(data.phone || ''))
    if (data.birth_date && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(String(data.birth_date))) fail(400, 'INVALID_BIRTH_DATE', '생년월일 형식을 확인해주세요.')
    if (data.gender && !['FEMALE', 'MALE', 'NONE'].includes(data.gender)) fail(400, 'INVALID_GENDER', '성별 선택값을 확인해주세요.')
    if (!data.terms_agreed || !data.privacy_agreed) fail(400, 'REQUIRED_AGREEMENT_MISSING', '필수 약관에 동의해주세요.')
    if (registeredMembers.has(email)) fail(409, 'EMAIL_ALREADY_EXISTS', '이미 사용 중인 이메일입니다.')
    consumeVerification(email, 'SIGNUP', data.verificationToken)
    const member = { member_id: `mock-member-${Date.now()}`, email, name: String(data.name).trim(), phone: data.phone || '', birth_date: data.birth_date || '', gender: data.gender || '', joined_at: new Date().toISOString().slice(0, 10), role: 'CUSTOMER', status: 'ACTIVE' }
    registeredMembers.set(email, member)
    registeredPasswords.set(email, String(data.password))
    return { member }
  }
  if (!registeredMembers.has(email) || registeredPasswords.get(email) !== String(data.password)) {
    const error = new Error('이메일 또는 비밀번호를 확인해주세요.')
    error.status = 401
    error.code = 'INVALID_CREDENTIALS'
    throw error
  }
  const member = registeredMembers.get(email)
  if (withdrawnMembers.has(member.member_id)) fail(401, 'INVALID_CREDENTIALS', '탈퇴한 계정입니다.')
  return { member }
}

function validateNewPassword(password, label) {
  const error = getPasswordError(password, label)
  if (error) fail(400, 'INVALID_PASSWORD', error)
}

function validateMemberFields(name, phone) {
  if (!name.trim()) fail(400, 'INVALID_NAME', '이름을 입력해주세요.')
  if (name.trim().length > 100) fail(400, 'INVALID_NAME', '이름은 100자 이내로 입력해주세요.')
  if (phone.trim().length > 30) fail(400, 'INVALID_PHONE', '휴대폰 번호는 30자 이내로 입력해주세요.')
}

export function changeMockPassword(email, newPassword, confirmation) {
  validateNewPassword(newPassword, '새 비밀번호')
  if (newPassword !== confirmation) fail(400, 'PASSWORD_MISMATCH', '새 비밀번호 확인이 일치하지 않습니다.')
  if (registeredPasswords.get(email) === newPassword) fail(400, 'SAME_PASSWORD', '현재 비밀번호와 다른 비밀번호를 입력해주세요.')
  registeredPasswords.set(email, newPassword)
  emailVerifications.delete('PASSWORD_RESET:' + email)
}

export function updateMockMember(email, { name, phone, birth_date, gender }) {
  const member = registeredMembers.get(email)
  if (!member) fail(404, 'MEMBER_NOT_FOUND', '회원 정보를 찾을 수 없습니다.')
  validateMemberFields(name, phone)
  if (birth_date && !/^(?:19\d{2}|20\d{2}|2100)-\d{2}-\d{2}$/.test(birth_date)) {
    fail(400, 'INVALID_BIRTH_DATE', '생년월일은 1900년부터 2100년까지 입력해주세요.')
  }
  Object.assign(member, { name: name.trim(), phone: phone.trim(), birth_date, gender })
  return member
}
