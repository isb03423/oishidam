let postcodeScript

export function loadPostcode() {
  if (window.kakao?.Postcode) return Promise.resolve()
  postcodeScript ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.onload = resolve
    script.onerror = () => {
      script.remove()
      postcodeScript = undefined
      reject(new Error('우편번호 검색을 불러오지 못했습니다.'))
    }
    document.head.append(script)
  })
  return postcodeScript
}
