import axios from 'axios'
import { development } from '../config/development.js'

// API 명세 확정 전의 임시 연결 규약.
const baseURL = (import.meta.env.VITE_API_BASE_URL || '').trim()
const liveClient = axios.create({ baseURL, timeout: 10000 })
export async function apiRequest({ method = 'GET', path, params, data, signal, headers, mock = development.mockEnabled }) {
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
  const response = await liveClient.request({ method, url: path, params, data, signal, headers })
  if (response.data?.success === false) throw new Error(response.data.message || '요청에 실패했습니다.')
  if (response.data?.success === true && 'data' in response.data) return response.data.data
  return response.data
}
