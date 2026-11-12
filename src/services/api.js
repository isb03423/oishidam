import axios from 'axios'
import { development } from '../config/development.js'
import { getAuthTokens } from '../stores/session.js'

const apiHost = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '')
const baseURL = apiHost && (apiHost.endsWith('/api') ? apiHost : apiHost + '/api')
const liveClient = axios.create({ baseURL, timeout: 10000 })
export async function apiRequest({ method = 'GET', path, params, data, signal, headers, authenticated = false, paginated = false, mock = development.mockEnabled }) {
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
  const token = authenticated ? getAuthTokens()?.accessToken : null
  if (authenticated && !token) throw new Error('다시 로그인해주세요.')

  try {
    const response = await liveClient.request({
      method, url: path, params, data, signal,
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
    if (!response) throw failure
    const error = new Error(response.data?.message || '요청에 실패했습니다.', { cause: failure })
    error.status = response.status
    error.code = response.data?.code
    error.details = response.data?.details
    throw error
  }
}
