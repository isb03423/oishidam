import { reactive, readonly } from 'vue'

const storageKey = 'oishidam:development:v1'
let saved = {}
if (import.meta.env.DEV) {
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {} } catch { /* 저장소가 없으면 기본값 */ }
}
const state = reactive({
  mockEnabled: import.meta.env.DEV && (typeof saved.mockEnabled === 'boolean' ? saved.mockEnabled : import.meta.env.VITE_MOCK_ENABLED !== 'false'),
  scenario: 'normal',
})
export const development = readonly(state)
export function setMockEnabled(enabled) {
  if (!import.meta.env.DEV) return
  state.mockEnabled = Boolean(enabled)
  try { localStorage.setItem(storageKey, JSON.stringify({ mockEnabled: state.mockEnabled })) } catch { /* 메모리에서만 유지 */ }
}
export function setMockScenario(scenario) {
  if (import.meta.env.DEV && ['normal', 'empty', 'error'].includes(scenario)) state.scenario = scenario
}
