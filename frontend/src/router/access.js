import { START_LOCATION } from 'vue-router'

export function accessDeniedReason(to, member) {
  if (to.name === 'NotFound') return ''
  const admin = to.name === 'AdminDashboard'
  const memberPage = to.path === '/mypage' || to.path.startsWith('/mypage/') || to.name === 'Checkout'
  const aiRecommendations = to.name === 'Products' && to.query?.recommend === 'ai'
  if ((admin || memberPage || aiRecommendations) && !member) return 'login'
  if (admin && member.role !== 'ADMIN') return 'admin'
  return ''
}

export function accessRedirect(to, from, member) {
  const reason = accessDeniedReason(to, member)
  if (!reason) return
  if (reason === 'login' && from !== START_LOCATION) return { name: 'Login' }
  return { name: 'AccessDenied', query: { reason } }
}
