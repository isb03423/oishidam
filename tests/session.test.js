import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
  logLevel: 'silent',
})
after(() => server.close())
const { normalizeMember, setSession, clearSession, session } = await server.ssrLoadModule('/src/stores/session.js')

test('한글 enum 응답으로도 관리자 권한과 성별 선택을 유지한다', () => {
  const member = normalizeMember({ memberId: 1, name: '관리자', role: '관리자', gender: '여성' })
  setSession(member)
  assert.equal(session.member.role, 'ADMIN')
  assert.equal(session.member.gender, 'FEMALE')
  clearSession()
})

test('일반 회원과 남성 표시명을 기존 화면 값으로 변환한다', () => {
  const member = normalizeMember({ memberId: 2, name: '회원', role: '일반 회원', gender: '남성' })
  assert.equal(member.role, 'USER')
  assert.equal(member.gender, 'MALE')
})

test('기존 코드 응답과 선택하지 않은 성별도 처리한다', () => {
  const member = normalizeMember({ memberId: 3, name: '회원', role: 'ADMIN', gender: 'M' })
  assert.equal(member.role, 'ADMIN')
  assert.equal(member.gender, 'MALE')
  assert.equal(normalizeMember({ gender: null }).gender, 'NONE')
})
