import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import axios, { AxiosError } from 'axios'
import { createServer } from 'vite'

const previousAdapter = axios.defaults.adapter
let failure
axios.defaults.adapter = async () => { throw failure }
process.env.VITE_API_BASE_URL = 'http://localhost/api'
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); axios.defaults.adapter = previousAdapter })
const { apiRequest } = await vite.ssrLoadModule('/src/services/api.js')

test('연결 실패·시간 초과를 한글로 안내하고 요청 취소는 유지한다', async () => {
  for (const code of ['ERR_NETWORK', 'ECONNABORTED', 'ETIMEDOUT']) {
    failure = new AxiosError('Network Error', code)
    await assert.rejects(apiRequest({ path: '/auth/login', mock: false }), (error) => {
      assert.equal(error.message, '서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.')
      assert.equal(error.code, code)
      return true
    })
  }
  failure = new AxiosError('canceled', 'ERR_CANCELED')
  await assert.rejects(apiRequest({ path: '/auth/login', mock: false }), (error) => error === failure)
})
