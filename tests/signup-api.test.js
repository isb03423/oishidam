import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer as createHttpServer } from 'node:http'
import { createServer } from 'vite'

const requests = []
const backend = createHttpServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const data = JSON.parse(Buffer.concat(chunks))
  requests.push({ method: req.method, url: req.url, data })
  const error = req.url !== '/api/auth/signup' ? null
    : !data.passwordConfirm ? 'passwordConfirm: 공백일 수 없습니다'
      : data.password !== data.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : null
  res.writeHead(error ? 400 : 201, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(error ? { code: 'PASSWORD_MISMATCH', message: error } : { data: { memberId: 7 } }))
})
await new Promise((resolve) => backend.listen(0, '127.0.0.1', resolve))
process.env.VITE_API_BASE_URL = `http://127.0.0.1:${backend.address().port}/api`
const vite = await createServer({ configFile: false, server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(async () => { await vite.close(); backend.closeAllConnections(); await new Promise((resolve) => backend.close(resolve)) })
const { signup, sendEmailCode, verifyEmailCode, resetPassword } = await vite.ssrLoadModule('/src/services/auth.js')

test('실제 회원가입 요청에도 입력한 비밀번호 확인을 필수 필드로 전달한다', async () => {
  const result = await signup({
    email: ' User01@Example.com ', verificationToken: 'verification-token', password: 'Pass1234!', passwordConfirm: 'Pass1234!',
    name: ' 사용자 ', phone: '010-4321-4321', birthYear: '2000', gender: 'FEMALE', termsAgreed: true, privacyAgreed: true,
  })
  assert.equal(result.memberId, 7)
  assert.deepEqual(requests[0], { method: 'POST', url: '/api/auth/signup', data: {
    email: 'user01@example.com', verificationToken: 'verification-token', password: 'Pass1234!', passwordConfirm: 'Pass1234!',
    name: '사용자', phone: '01043214321', birthYear: 2000, gender: 'F',
  } })
})

test('인증번호는 용도와 함께 전달하고 재설정은 인증 토큰과 새 비밀번호를 전달한다', async () => {
  const email = 'person@example.com'
  const purpose = 'PASSWORD_RESET'
  await sendEmailCode({ email, purpose })
  await verifyEmailCode({ email, purpose, code: '012345' })
  await resetPassword({ email, verificationToken: 'verification-token', newPassword: 'New-pass1!', passwordConfirm: 'New-pass1!' })
  assert.deepEqual(requests.slice(-3), [
    { method: 'POST', url: '/api/auth/email-verifications', data: { email, purpose } },
    { method: 'POST', url: '/api/auth/email-verifications/confirm', data: { email, purpose, code: '012345' } },
    { method: 'POST', url: '/api/auth/password-reset', data: {
      email, verificationToken: 'verification-token', newPassword: 'New-pass1!', passwordConfirm: 'New-pass1!',
    } },
  ])
})

test('확인 비밀번호를 임의로 덮어쓰지 않고 서버의 불일치 오류를 전달한다', async () => {
  await assert.rejects(signup({ email: 'test@example.com', password: 'Pass1234!', passwordConfirm: 'Different123!', name: '회원' }),
    (error) => error.status === 400 && error.message === '비밀번호가 일치하지 않습니다.')
  assert.equal(requests.at(-1).data.passwordConfirm, 'Different123!')
})
