import { apiRequest } from './api.js'
import { phoneDigits } from './phone.js'
import { development } from '../config/development.js'
import { clearSession, getAuthTokens, normalizeMember, session, setSession } from '../stores/session.js'

export async function login({ email, password, remember = false, signal }) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const normalizedEmail = email.trim().toLowerCase()
  const data = { email: normalizedEmail, password }
  const response = await apiRequest({ method: 'POST', path: '/auth/login', data, signal })
  if (signal?.aborted || mock !== (import.meta.env.DEV && development.mockEnabled)) throw new DOMException('요청이 취소되었습니다.', 'AbortError')
  if (mock) {
    setSession(response.member, { mock, remember })
    return response.member
  }

  const { accessToken, refreshToken } = response ?? {}
  if (typeof accessToken !== 'string' || !accessToken.trim() || typeof refreshToken !== 'string' || !refreshToken.trim()) {
    throw new Error('로그인 응답에 필요한 인증 토큰이 없습니다.')
  }
  const member = normalizeMember(response.member)
  setSession(member, { tokens: { accessToken: accessToken.trim(), refreshToken: refreshToken.trim() } })
  return member
}

export async function loginWithKakao({ remember = false, signal } = {}) {
  if (!(import.meta.env.DEV && development.mockEnabled)) {
    throw new Error('카카오 로그인은 인증 서버 연동 후 사용할 수 있습니다.')
  }
  const response = await apiRequest({ method: 'POST', path: '/auth/kakao', signal })
  if (signal?.aborted || !development.mockEnabled) throw new DOMException('요청이 취소되었습니다.', 'AbortError')
  setSession(response.member, { mock: true, remember })
  return response.member
}

const signupGenders = { MALE: 'M', FEMALE: 'F' }

export async function signup({ email, password, passwordConfirm, name, phone = '', birthDate = '', birthYear, gender = '', termsAgreed, privacyAgreed, signal }) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const data = { email: email.trim().toLowerCase(), password, name: name.trim() }
  const normalizedPhone = phoneDigits(phone)
  if (mock) {
    Object.assign(data, {
      passwordConfirm,
      phone: normalizedPhone,
      birth_date: birthDate,
      gender,
      terms_agreed: Boolean(termsAgreed),
      privacy_agreed: Boolean(privacyAgreed),
    })
  } else {
    if (normalizedPhone) data.phone = normalizedPhone
    if (birthYear) data.birthYear = Number(birthYear)
    if (signupGenders[gender]) data.gender = signupGenders[gender]
  }
  const response = await apiRequest({
    method: 'POST',
    path: '/auth/signup',
    data,
    signal,
  })
  if (signal?.aborted || mock !== (import.meta.env.DEV && development.mockEnabled)) throw new DOMException('요청이 취소되었습니다.', 'AbortError')
  return mock ? response.member : response
}

export async function logout() {
  const member = session.member
  const tokens = getAuthTokens()
  const data = tokens ? { refreshToken: tokens.refreshToken } : undefined
  await apiRequest({ method: 'POST', path: '/auth/logout', authenticated: session.source === 'api', data })
  if (session.member === member) clearSession()
}
