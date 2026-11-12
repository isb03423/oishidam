export const passwordRequirements = '* 영문·숫자·특수문자 각 1자 이상 포함, 총 8자 이상'

export function getPasswordError(password, label = '비밀번호') {
  if (!password.trim()) return label + '를 입력해주세요.'
  if ([...password].length < 8) return label + '는 8자 이상 입력해주세요.'
  if (new TextEncoder().encode(password).length > 72) {
    return label + '는 UTF-8 기준 72바이트 이내로 입력해주세요.'
  }

  if (/[^\x21-\x7e]/.test(password)) return '비밀번호에는 영문, 숫자, ASCII 특수문자만 입력해주세요.'

  const hasLetter = /[a-z]/i.test(password)
  const hasDigit = /[0-9]/.test(password)
  const hasSymbol = /[\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]/.test(password)
  if (!hasLetter || !hasDigit || !hasSymbol) {
    return '영문, 숫자, 특수문자를 각각 1개 이상 포함해주세요.'
  }
  return ''
}
