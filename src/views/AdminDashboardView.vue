<script setup>
import { computed, ref, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/images/oishidam_logo.png'
import { logout } from '../services/auth.js'
import { session } from '../stores/session.js'

const router = useRouter()
const demo = computed(() => session.source === 'mock')
const report = shallowRef(null)
const loadError = ref(false)
const logoutError = ref('')
const days = ref(7)
const today = new Date()
const statusLabels = [
  { name: '주문접수', label: '주문 접수', color: '#efacba' },
  { name: '배송준비중', label: '배송 준비 중', color: '#d7a5ba' },
  { name: '배송중', label: '배송 중', color: '#9f83a7' },
  { name: '배송완료', label: '배송 완료', color: '#a44f68' },
]
const navigation = ['대시보드', '상품 관리', '카테고리 관리', '재고 관리', '주문 관리', '회원 관리', '문의 관리', '리뷰 관리', '공지사항', 'FAQ 관리', '고객 분석 (AI)']
const formatter = new Intl.NumberFormat('ko-KR')
const won = (amount) => formatter.format(amount) + '원'
const dateFormat = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'short', timeStyle: 'short' })
const dayFormat = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
const dateKey = (date) => dayFormat.format(date)

if (import.meta.env.DEV && demo.value) {
  import('../mocks/adminDashboard.js').then(({ getAdminDashboard }) => {
    report.value = getAdminDashboard(today)
  }).catch(() => { loadError.value = true })
}

watch(() => session.member?.role, (role) => {
  if (role !== 'ADMIN') router.replace({ name: 'Login' })
})

const daily = computed(() => {
  const byDay = new Map()
  for (const order of report.value?.orders ?? []) {
    const day = dateKey(order.date)
    if (!byDay.has(day)) byDay.set(day, [])
    byDay.get(day).push(order)
  }
  return Array.from({ length: days.value }, (_, index) => {
    const date = new Date(today.getTime() - (days.value - index - 1) * 86400000)
    const key = dateKey(date)
    const orders = byDay.get(key) ?? []
    return { key, label: key.slice(5).replace('-', '/'), orders, sales: orders.reduce((sum, order) => sum + order.total, 0) }
  })
})
const orders = computed(() => daily.value.flatMap((day) => day.orders).sort((a, b) => b.date - a.date))
const sales = computed(() => daily.value.reduce((sum, day) => sum + day.sales, 0))
const newCustomers = computed(() => {
  const keys = new Set(daily.value.map((day) => day.key))
  return (report.value?.customerJoinDates ?? []).filter((date) => keys.has(date)).length
})
const maxSales = computed(() => Math.max(1, ...daily.value.map((day) => day.sales)))
const statuses = computed(() => statusLabels.map((status) => ({
  ...status, count: orders.value.filter((order) => order.status === status.name).length,
})))
const ring = computed(() => {
  if (!orders.value.length) return 'var(--color-accent)'
  let offset = 0
  const ranges = statuses.value.map(({ color, count }) => {
    const start = offset
    offset += 100 * count / orders.value.length
    return `${color} ${start}% ${offset}%`
  })
  return `conic-gradient(${ranges.join(', ')})`
})
const metrics = computed(() => [
  { label: '총 판매액', value: report.value ? won(sales.value) : '—' },
  { label: '신규 주문', value: report.value ? formatter.format(orders.value.length) + '건' : '—' },
  { label: '신규 회원', value: report.value ? formatter.format(newCustomers.value) + '명' : '—' },
  { label: '답변 대기 문의', value: report.value ? report.value.pendingInquiries.length + '건' : '—' },
])

async function signOut() {
  logoutError.value = ''
  try {
    await logout()
    if (!session.member) await router.replace({ name: 'Login' })
  } catch {
    logoutError.value = '로그아웃하지 못했어요. 다시 시도해 주세요.'
  }
}
</script>

<template>
  <div class="admin-shell">
    <aside class="sidebar">
      <img :src="logo" alt="오이시담" class="admin-logo">
      <nav aria-label="관리자 메뉴">
        <ul>
          <li v-for="(label, index) in navigation" :key="label">
            <RouterLink v-if="index === 0" :to="{ name: 'AdminDashboard' }">{{ label }}</RouterLink>
            <span v-else aria-disabled="true">{{ label }}</span>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="admin-body">
      <header class="topbar">
        <span>{{ session.member?.name }}</span>
        <button type="button" @click="signOut">로그아웃</button>
        <p v-if="logoutError" role="alert">{{ logoutError }}</p>
      </header>
      <main class="dashboard">
        <header class="page-heading">
          <div>
            <h1>대시보드</h1>
            <p>{{ demo ? '오이시담 운영 현황 · 모의 데이터' : '오이시담 운영 현황' }}</p>
          </div>
          <select v-model="days" aria-label="집계 기간" :disabled="!report">
            <option :value="7">최근 7일</option>
            <option :value="14">최근 14일</option>
            <option :value="30">최근 30일</option>
          </select>
        </header>

        <p v-if="loadError" class="dashboard-card" role="alert">모의 운영 데이터를 불러오지 못했어요.</p>
        <p v-else-if="!demo" class="dashboard-card">관리자 통계 및 주문 조회 API 연결을 준비 중이에요.</p>
        <p v-else-if="!report" class="dashboard-card" role="status">운영 데이터를 불러오는 중이에요.</p>

        <section class="metric-grid" aria-label="운영 지표">
          <article v-for="item in metrics" :key="item.label" class="dashboard-card metric">
            <h2>{{ item.label }}</h2>
            <strong>{{ item.value }}</strong>
            <small v-if="item.note">{{ item.note }}</small>
          </article>
        </section>

        <div class="chart-grid">
          <section class="dashboard-card" aria-labelledby="sales-heading">
            <h2 id="sales-heading">최근 {{ days }}일 판매 추이</h2>
            <p v-if="!report" class="empty">표시할 집계가 없어요.</p>
            <div v-else class="chart-scroll">
              <ul class="bars" :style="{ gridTemplateColumns: `repeat(${days}, minmax(30px, 1fr))` }">
                <li v-for="(day, index) in daily" :key="day.key">
                  <button type="button" class="bar-track" :aria-label="`${day.label} 판매액 ${won(day.sales)}, 주문 ${day.orders.length}건`">
                    <span class="bar" :style="{ height: `${100 * day.sales / maxSales}%` }"></span>
                    <span class="bar-value" :class="{ 'align-end': index > daily.length / 2 }" aria-hidden="true">{{ won(day.sales) }} · {{ day.orders.length }}건</span>
                  </button>
                  <small v-if="days <= 14 || index % 5 === 0 || index === daily.length - 1">{{ day.label }}</small>
                </li>
              </ul>
            </div>
          </section>
          <section class="dashboard-card" aria-labelledby="status-heading">
            <h2 id="status-heading">주문 상태 현황</h2>
            <div v-if="report" class="status-layout">
              <div class="ring" :style="{ background: ring }" aria-hidden="true"><span>총 주문<strong>{{ orders.length }}건</strong></span></div>
              <ul class="status-list" :aria-label="`총 주문 ${orders.length}건`">
                <li v-for="status in statuses" :key="status.name">
                  <i :style="{ background: status.color }"></i><span>{{ status.label }}</span><b>{{ status.count }}건</b>
                </li>
              </ul>
            </div>
            <p v-else class="empty">표시할 집계가 없어요.</p>
          </section>
        </div>

        <div class="bottom-grid">
          <section class="dashboard-card">
            <h2>운영 알림</h2>
            <ul v-if="report" class="alerts">
              <li><details><summary>재고 확인 상품 <strong>{{ report.stockAlerts.length }}개</strong></summary><p>{{ report.stockAlerts.join(', ') || '없음' }}</p></details></li>
              <li><details><summary>답변 대기 문의 <strong>{{ report.pendingInquiries.length }}건</strong></summary><p v-for="inquiry in report.pendingInquiries" :key="inquiry.id">{{ inquiry.title }}</p></details></li>
              <li><details><summary>답변이 없는 리뷰 <strong>{{ report.unansweredReviews.length }}건</strong></summary><p v-for="review in report.unansweredReviews" :key="review.id">{{ review.content }}</p></details></li>
            </ul>
            <p v-else class="empty">표시할 운영 알림이 없어요.</p>
          </section>
          <section class="dashboard-card">
            <h2>최근 주문 내역</h2>
            <div v-if="orders.length" class="order-scroll">
              <table>
                <thead><tr><th scope="col">주문번호</th><th scope="col">주문일시</th><th scope="col">주문자</th><th scope="col">주문금액</th><th scope="col">주문상태</th></tr></thead>
                <tbody><tr v-for="order in orders.slice(0, 5)" :key="order.id">
                  <td>{{ order.id }}</td><td>{{ dateFormat.format(order.date) }}</td><td>{{ order.customer }}</td><td>{{ won(order.total) }}</td>
                  <td><span class="badge" :class="order.status">{{ statusLabels.find((status) => status.name === order.status)?.label }}</span></td>
                </tr></tbody>
              </table>
            </div>
            <p v-else class="empty">표시할 주문이 없어요.</p>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-shell { display: grid; grid-template-columns: 210px minmax(0, 1fr); background: var(--color-background); min-height: 100dvh; }
.sidebar { background: linear-gradient(165deg, #75394b, #915268); color: var(--color-white); padding: 24px 12px; }
.admin-logo { display: block; width: 145px; margin: 0 auto 28px; padding: 8px 10px; border-radius: 10px; background: var(--color-white); }
.sidebar ul { display: grid; gap: 4px; }
.sidebar a, .sidebar li > span { display: block; padding: 10px 14px; border-radius: 8px; }
.sidebar a { background: rgb(255 255 255 / 22%); color: inherit; font-weight: 700; }
.sidebar [aria-disabled] { color: #f1dce4; }
.topbar { display: flex; justify-content: flex-end; align-items: center; gap: 12px; min-height: 58px; padding: 10px 24px; border-bottom: 1px solid var(--color-border); background: var(--color-white); }
.topbar button, select { border: 1px solid var(--color-border); border-radius: 8px; padding: 7px 10px; background: var(--color-white); color: var(--color-text); font: inherit; }
.topbar button { cursor: pointer; }
.dashboard { display: grid; gap: 16px; padding: clamp(16px, 2vw, 28px); }
.page-heading { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; }
h1 { font-size: 1.85rem; color: #592839; font-weight: 800; }
.page-heading p, .empty, small { color: var(--color-secondary); }
h2 { font-weight: 750; font-size: 1.07rem; color: #592839; }
.metric-grid, .chart-grid, .bottom-grid { display: grid; align-items: stretch; gap: 14px; }
.metric-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.chart-grid { grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); }
.bottom-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr); }
.dashboard-card { min-width: 0; padding: 16px; border: 1px solid var(--color-border); border-radius: 14px; background: var(--color-white); }
.metric { display: grid; align-content: start; gap: 5px; background: linear-gradient(145deg, white 48%, #f9ebf0); }
.metric strong { font-size: clamp(1.1rem, 2vw, 1.65rem); color: var(--color-primary); overflow-wrap: anywhere; }
.chart-scroll, .order-scroll { overflow: auto; }
.bars { display: grid; gap: 7px; min-width: max-content; padding-top: 14px; }
.bars li { display: grid; grid-template-rows: 138px 22px; text-align: center; }
.bar-track { position: relative; display: flex; align-items: end; justify-content: center; padding-inline: 3px; border: 0; border-bottom: 1px solid var(--color-border); background: repeating-linear-gradient(to top, transparent 0 32px, var(--color-background) 32px 34px); }
.bar { display: block; width: min(88%, 46px); border-radius: 6px 6px 0 0; background: linear-gradient(var(--color-primary), var(--color-accent)); }
.bar-value { display: none; position: absolute; z-index: 1; top: 0; left: 0; padding: 4px 8px; border-radius: 6px; background: #592839; color: white; white-space: nowrap; font-size: .78rem; }
.bar-value.align-end { right: 0; left: auto; }
.bar-track:hover .bar-value, .bar-track:focus-visible .bar-value { display: block; }
.status-layout { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-top: 20px; }
.ring { display: grid; place-items: center; width: 134px; aspect-ratio: 1; border-radius: 50%; }
.ring span { display: grid; place-content: center; width: 64%; aspect-ratio: 1; border-radius: 50%; background: white; text-align: center; font-size: .83rem; }
.ring strong { font-size: 1.12rem; }
.status-list { flex: 1; min-width: 137px; }
.status-list li { display: grid; grid-template-columns: 9px 1fr auto; align-items: center; gap: 8px; padding-block: 4px; font-size: .87rem; }
.status-list i { height: 9px; border-radius: 3px; }
.alerts, table, .empty { margin-top: 14px; }
.alerts { display: grid; gap: 7px; }
.alerts li { padding: 9px 12px; border-radius: 8px; background: var(--color-background); }
.alerts summary { cursor: pointer; }
.alerts p { margin-top: 4px; color: var(--color-secondary); }
table { width: 100%; border-collapse: collapse; font-size: .83rem; white-space: nowrap; }
th, td { padding: 8px; border-bottom: 1px solid var(--color-border); text-align: left; }
th { background: var(--color-background); }
.badge { padding: 3px 8px; border-radius: 20px; background: var(--color-accent); }
.배송중 { background: #e0e5f5; }
.배송준비중 { background: #faedcf; }
.배송완료 { background: #e1f0e0; }
@media (max-width: 980px) { .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .chart-grid, .bottom-grid { grid-template-columns: 1fr; } }
@media (max-width: 650px) { .admin-shell { grid-template-columns: 1fr; } .sidebar { padding: 12px; } .admin-logo { margin: 0 0 8px; width: 110px; } .sidebar ul { display: flex; overflow-x: auto; white-space: nowrap; } }
</style>
