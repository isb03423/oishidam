export function openKakaoLogin(apiBaseUrl, { signal } = {}) {
  if (signal?.aborted) return Promise.reject(new DOMException('요청이 취소되었습니다.', 'AbortError'))
  if (!apiBaseUrl?.trim()) return Promise.reject(new Error('백엔드 주소를 설정해주세요.'))
  const url = new URL(apiBaseUrl, window.location.origin)
  url.pathname = url.pathname.replace(/\/+$/, '').replace(/\/api$/, '') + '/oauth2/authorization/kakao'
  url.search = ''
  url.hash = ''
  const popup = window.open('about:blank', '_blank', 'popup,width=480,height=700')
  if (!popup) return Promise.reject(new Error('카카오 로그인 팝업이 차단되었습니다. 팝업을 허용해주세요.'))

  return new Promise((resolve, reject) => {
    function cleanup() {
      window.removeEventListener('message', receive)
      signal?.removeEventListener('abort', abort)
      clearInterval(closedTimer)
      clearTimeout(timeout)
      popup.close()
    }
    function fail(error) {
      cleanup()
      reject(error)
    }
    function abort() {
      fail(new DOMException('요청이 취소되었습니다.', 'AbortError'))
    }
    function receive(event) {
      if (event.origin !== url.origin || event.source !== popup) return
      const data = event.data
      if (data?.type === 'oishidam-oauth-error') {
        fail(new Error('카카오 로그인에 실패했습니다. 다시 시도해주세요.'))
        return
      }
      if (data?.type !== 'oishidam-oauth-success') return
      if (typeof data.accessToken !== 'string' || !data.accessToken.trim()
        || typeof data.refreshToken !== 'string' || !data.refreshToken.trim()) {
        fail(new Error('카카오 로그인 응답에 필요한 인증 토큰이 없습니다.'))
        return
      }
      cleanup()
      resolve({ accessToken: data.accessToken.trim(), refreshToken: data.refreshToken.trim() })
    }
    const closedTimer = setInterval(() => {
      if (popup.closed) fail(new Error('카카오 로그인 창이 닫혔습니다. 다시 시도해주세요.'))
    }, 500)
    const timeout = setTimeout(() => fail(new Error('카카오 로그인 시간이 초과되었습니다. 다시 시도해주세요.')), 180000)
    window.addEventListener('message', receive)
    signal?.addEventListener('abort', abort, { once: true })
    try {
      popup.location.replace(url.href)
    } catch (error) {
      fail(error)
    }
  })
}
