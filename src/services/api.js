import axios from 'axios'
import { development } from '../config/development.js'
import { clearSession, getAuthTokens, getSessionRevision, updateAuthTokens } from '../stores/session.js'

const apiHost = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '')
const baseURL = apiHost && (apiHost.endsWith('/api') ? apiHost : apiHost + '/api')
const liveClient = axios.create({ baseURL, timeout: 10000 })
let renewal = null

export function refreshAccessToken() {
  const previous = getAuthTokens()
  if (!previous?.refreshToken) return Promise.reject(new Error('다시 로그인해주세요.'))
  if (renewal?.tokens === previous) return renewal.promise
  const pending = { tokens: previous }
  pending.promise = (async () => {
    try {
      const response = await liveClient.post('/auth/refresh', { refreshToken: previous.refreshToken })
      const tokens = response.data?.data
      if (typeof tokens?.accessToken !== 'string' || !tokens.accessToken.trim() || typeof tokens.refreshToken !== 'string' || !tokens.refreshToken.trim()) throw new Error('토큰 재발급 응답을 확인해주세요.')
      if (getAuthTokens() !== previous) throw new Error('로그인 정보가 변경되었습니다.')
      const updated = { accessToken: tokens.accessToken.trim(), refreshToken: tokens.refreshToken.trim() }
      updateAuthTokens(updated)
      return updated
    } catch (error) {
      if ([400, 401, 403].includes(error.response?.status) && getAuthTokens() === previous) clearSession()
      throw error
    } finally {
      if (renewal === pending) renewal = null
    }
  })()
  renewal = pending
  return pending.promise
}

export async function apiRequest({ method = 'GET', path, params, data, signal, headers, timeout, authenticated = false, paginated = false, mock = development.mockEnabled, retryAuth = true }) {
  if (import.meta.env.DEV && mock) {
    const scenario = development.scenario
    const { handleMockRequest } = await import('../mocks/handleRequest.js')
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (signal?.aborted) throw new DOMException('요청이 취소되었습니다.', 'AbortError')
    return handleMockRequest({ method, path, params, data, scenario })
  }
  if (!baseURL) {
    const error = new Error('백엔드 주소가 없습니다. .env.local에 VITE_API_BASE_URL을 설정하고 개발 서버를 재시작하세요.')
    error.code = 'API_BASE_URL_MISSING'
    throw error
  }
  const credentials = authenticated ? getAuthTokens() : null
  const revision = getSessionRevision()
  const token = credentials?.accessToken
  if (authenticated && !token) throw new Error('다시 로그인해주세요.')

  try {
    const response = await liveClient.request({
      method, url: path, params, data, signal, timeout,
      headers: token ? { ...headers, Authorization: 'Bearer ' + token } : headers,
    })
    if (response.status === 204) return null
    const body = response.data
    if (!body || typeof body !== 'object' || !Object.hasOwn(body, 'data')) {
      throw new Error('API 응답 형식을 확인해주세요.')
    }
    return paginated ? { data: body.data, page: body.page } : body.data
  } catch (failure) {
    const { response } = failure
    if (!response) {
      if (failure.code === 'ERR_NETWORK' || failure.code === 'ECONNABORTED' || failure.code === 'ETIMEDOUT') {
        const error = new Error('서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.', { cause: failure })
        error.code = failure.code
        throw error
      }
      throw failure
    }
    if (response.status === 401 && authenticated && retryAuth && path !== '/auth/logout' && !signal?.aborted) {
      if (getSessionRevision() !== revision) throw new Error('로그인 정보가 변경되었습니다.')
      let current = getAuthTokens()
      if (current === credentials) current = await refreshAccessToken()
      if (!current || getAuthTokens() !== current) throw new Error('다시 로그인해주세요.')
      return apiRequest({ method, path, params, data, signal, headers, timeout, authenticated, paginated, mock, retryAuth: false })
    }
    if (response.status === 401 && authenticated && !retryAuth && getSessionRevision() === revision) clearSession()
    const error = new Error(response.data?.message || '요청에 실패했습니다.', { cause: failure })
    error.status = response.status
    error.code = response.data?.code
    error.details = response.data?.details
    throw error
  }
}
