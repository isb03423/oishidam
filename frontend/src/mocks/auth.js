// 화면 개발 전용 계정. 실제 회원 비밀번호나 JWT를 사용하지 않습니다.
export const demoCredentials = { email: 'demo@oishidam.test', password: 'Oishi1234!' }

const registeredMembers = new Map([
  [demoCredentials.email, { member_id: 'demo-customer', email: demoCredentials.email, name: '오이', role: 'CUSTOMER', status: 'ACTIVE', cart_count: 0 }],
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
    if (String(data.password || '').length < 8) fail(400, 'INVALID_PASSWORD', '비밀번호는 8자 이상 입력해주세요.')
    if (!String(data.name || '').trim()) fail(400, 'INVALID_NAME', '이름을 입력해주세요.')
    if (data.birth_date && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(String(data.birth_date))) fail(400, 'INVALID_BIRTH_DATE', '생년월일 형식을 확인해주세요.')
    if (data.gender && !['FEMALE', 'MALE', 'NONE'].includes(data.gender)) fail(400, 'INVALID_GENDER', '성별 선택값을 확인해주세요.')
    if (!data.terms_agreed || !data.privacy_agreed) fail(400, 'REQUIRED_AGREEMENT_MISSING', '필수 약관에 동의해주세요.')
    if (registeredMembers.has(email)) fail(409, 'EMAIL_ALREADY_EXISTS', '이미 사용 중인 이메일입니다.')
    const member = { member_id: `mock-member-${Date.now()}`, email, name: String(data.name).trim(), role: 'CUSTOMER', status: 'ACTIVE' }
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
