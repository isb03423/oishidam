import { apiRequest, refreshAccessToken } from './api.js'
import { phoneDigits } from './phone.js'
import { openKakaoLogin } from './kakao.js'
import { development } from '../config/development.js'
import { clearSession, getAuthTokens, getSessionRevision, normalizeMember, savedApiLogin, session, setSession, setRestoreError, updateAuthTokens } from '../stores/session.js'

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
  setSession(member, { remember, tokens: { accessToken: accessToken.trim(), refreshToken: refreshToken.trim() } })
  return member
}

export async function loginWithKakao({ remember = false, signal } = {}) {
  if (!(import.meta.env.DEV && development.mockEnabled)) {
    const tokens = await openKakaoLogin(import.meta.env.VITE_API_BASE_URL, { signal })
    const response = await apiRequest({
      path: '/members/me', signal, mock: false,
      headers: { Authorization: 'Bearer ' + tokens.accessToken },
    })
    if (signal?.aborted || (import.meta.env.DEV && development.mockEnabled)) {
      throw new DOMException('요청이 취소되었습니다.', 'AbortError')
    }
    const member = normalizeMember(response)
    setSession(member, { remember, tokens })
    return member
  }
  const response = await apiRequest({ method: 'POST', path: '/auth/kakao', signal })
  if (signal?.aborted || !development.mockEnabled) throw new DOMException('요청이 취소되었습니다.', 'AbortError')
  setSession(response.member, { mock: true, remember })
  return response.member
}

const signupGenders = { MALE: 'M', FEMALE: 'F' }

export async function signup({ email, password, passwordConfirm, name, phone = '', birthDate = '', birthYear, gender = '', termsAgreed, privacyAgreed, signal }) {
  const mock = import.meta.env.DEV && development.mockEnabled
  const data = { email: email.trim().toLowerCase(), password, passwordConfirm, name: name.trim() }
  const normalizedPhone = phoneDigits(phone)
  if (mock) {
    Object.assign(data, {
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
  async function send() {
    const tokens = getAuthTokens()
    const data = tokens ? { refreshToken: tokens.refreshToken } : undefined
    return apiRequest({ method: 'POST', path: '/auth/logout', authenticated: session.source === 'api', data })
  }
  try { await send() } catch (error) {
    if (error.status !== 401 || session.member !== member) throw error
    await refreshAccessToken()
    await send()
  }
  if (session.member === member) clearSession()
}

export async function restoreSession() {
  if (import.meta.env.DEV && development.mockEnabled) return
  const saved = savedApiLogin()
  if (!saved) return
  updateAuthTokens({ refreshToken: saved.refreshToken }, saved.remember)
  const revision = getSessionRevision()
  let tokens
  try {
    tokens = await refreshAccessToken()
    if (getSessionRevision() !== revision) return
    const response = await apiRequest({ path: '/members/me', authenticated: true, mock: false, retryAuth: false })
    if (getAuthTokens() !== tokens) return
    setSession(normalizeMember(response), { tokens, remember: saved.remember })
  } catch (error) {
    if (getSessionRevision() === revision && getAuthTokens() && (!tokens || getAuthTokens() === tokens)) {
      setRestoreError('로그인 상태를 확인하지 못했습니다. 서버 연결을 확인하고 다시 시도해주세요.')
    }
  }
}
