export function phoneDigits(phone = '') {
  return phone.replace(/\D/g, '')
}

export function formatPhone(phone = '') {
  const digits = phoneDigits(phone)
  return digits.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')
}
