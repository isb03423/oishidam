import { getPasswordError } from '../services/passwordPolicy.js'

// 화면 개발 전용 계정. 실제 회원 비밀번호나 JWT를 사용하지 않습니다.
export const demoCredentials = { email: 'demo@oishidam.test', password: 'Oishi1234!' }

const registeredMembers = new Map([
  [demoCredentials.email, { member_id: 'demo-customer', email: demoCredentials.email, phone: '010-1234-5678', birth_date: '1995-04-12', gender: 'FEMALE', joined_at: '2026-11-01', name: '오이', role: 'CUSTOMER', status: 'ACTIVE', cart_count: 0 }],
])

// 화면 개발용 로그인 검증 데이터입니다. 회원 응답에는 비밀번호를 포함하지 않습니다.
const registeredPasswords = new Map([
  [demoCredentials.email, demoCredentials.password],
])

function fail(status, code, message) {
  const error = new Error(message)
  error.status = status
  error.code = code
  throw error
}

export function handleAuthRequest(path, data = {}) {
  if (path === '/auth/logout') return { success: true }
  if (path === '/auth/kakao') {
    return { member: { member_id: 'demo-kakao', email: null, name: '카카오회원', role: 'CUSTOMER', status: 'ACTIVE', cart_count: 0 } }
  }
  const email = String(data.email || '').trim().toLowerCase()
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
  return { member: registeredMembers.get(email) }
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