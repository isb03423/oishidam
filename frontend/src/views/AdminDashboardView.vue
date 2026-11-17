<script setup>
import { computed, ref, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminManagement from './AdminManagement.vue'
import AdminLiveManagement from './AdminLiveManagement.vue'
import AdminInquiries from './AdminInquiries.vue'
import AdminReviews from './AdminReviews.vue'
import AdminReplyDialog from '../components/admin/AdminReplyDialog.vue'
import AlertDialog from '../components/common/AlertDialog.vue'
import { getAdminOperations } from '../services/admin.js'
import { orderLabel, orderStatuses } from '../utils/adminStatus.js'
import logo from '../assets/images/oishidam_logo.png'
import { logout } from '../services/auth.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'

const router = useRouter()
const demo = computed(() => session.source === 'mock')
const report = shallowRef(null)
const loadError = ref('')
const loading = ref(false)
const reload = ref(0)
const notice = ref('')
const logoutError = ref('')
const days = ref(7)
const operationTab = ref(null)
const replyDialog = ref(null)
const today = new Date()
const statusLabels = [
  { name: '주문접수', label: '주문 접수', color: '#efacba' },
  { name: '배송준비중', label: '배송 준비 중', color: '#d7a5ba' },
  { name: '배송중', label: '배송 중', color: '#9f83a7' },
  { name: '배송완료', label: '배송 완료', color: '#a44f68' },
]
const navigation = [["","대시보드"],["categories","카테고리 관리"],["products","상품·재고 관리"],["orders","주문 관리"],["members","회원 관리"],["inquiries","문의 관리"],["reviews","후기 관리"],["analytics","고객 분석 (AI)"]]
const route = useRoute()
const activeSection = computed(() => navigation.find(([id]) => id === route.params.section) ?? navigation[0])
const formatter = new Intl.NumberFormat('ko-KR')
const won = (amount) => formatter.format(amount) + '원'
const dateFormat = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'short', timeStyle: 'short' })
const dayFormat = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
const dateKey = (date) => dayFormat.format(date)

watch([shoppingOwner, days, () => activeSection.value[0], reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  report.value = null
  loadError.value = notice.value = ''
  loading.value = false
  if (activeSection.value[0] || session.member?.role !== 'ADMIN') return
  loading.value = true
  try {
    const result = import.meta.env.DEV && demo.value
      ? (await import('../mocks/adminDashboard.js')).getAdminDashboard(today)
      : await getAdminOperations(days.value, controller.signal)
    if (!controller.signal.aborted && revision === getSessionRevision()) report.value = result
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) { loadError.value = failure.message; notice.value = failure.message }
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })

watch(() => session.member?.role, (role) => {
  if (role !== 'ADMIN') router.replace({ name: 'Login' })
})

const daily = computed(() => {
  if (!demo.value) return (report.value?.daily ?? []).map((day) => ({ key: day.date, label: day.date.slice(5).replace('-', '/'), sales: day.sales, orderCount: day.orderCount }))
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
    return { key, label: key.slice(5).replace('-', '/'), orders, orderCount: orders.length, sales: orders.reduce((sum, order) => sum + order.total, 0) }
  })
})
const orders = computed(() => demo.value
  ? daily.value.flatMap((day) => day.orders).sort((a, b) => b.date - a.date)
  : (report.value?.recentOrders ?? []).map((order) => ({ id: order.orderNumber, orderId: order.orderId, date: new Date(order.createdAt + '+09:00'), customer: order.customer, total: order.totalAmount, status: order.orderStatus })))
const orderCount = computed(() => demo.value ? orders.value.length : report.value?.orderCount ?? 0)
const sales = computed(() => demo.value ? daily.value.reduce((sum, day) => sum + day.sales, 0) : report.value?.sales ?? 0)
const newCustomers = computed(() => {
  if (!demo.value) return report.value?.newCustomers ?? 0
  const keys = new Set(daily.value.map((day) => day.key))
  return (report.value?.customerJoinDates ?? []).filter((date) => keys.has(date)).length
})
const maxSales = computed(() => Math.max(1, ...daily.value.map((day) => day.sales)))
const statuses = computed(() => {
  if (demo.value) return statusLabels.map((status) => ({ ...status, count: orders.value.filter((order) => order.status === status.name).length }))
  const colors = ['#d1a7b8', '#b5a5c8', '#b47787', '#efacba', '#d7a5ba', '#9f83a7', '#9588b5', '#ad88a4', '#a44f68', '#cba59a', '#a59ca1']
  return (report.value?.statuses ?? []).map((status) => ({ name: status.status, label: orderLabel(status.status), count: status.count, color: colors[Math.max(0, orderStatuses.findIndex(([code]) => code === status.status))] }))
})
const stockAlertCount = computed(() => demo.value ? report.value?.stockAlerts.length ?? 0 : report.value?.stockAlertCount ?? 0)
const pendingCount = computed(() => demo.value ? report.value?.pendingInquiries.length ?? 0 : report.value?.pendingInquiryCount ?? 0)
const reviewCount = computed(() => demo.value ? report.value?.unansweredReviews.length ?? 0 : report.value?.unansweredReviewCount ?? 0)
const ring = computed(() => {
  if (!orderCount.value) return 'var(--color-accent)'
  let offset = 0
  const ranges = statuses.value.map(({ color, count }) => {
    const start = offset
    offset += 100 * count / orderCount.value
    return `${color} ${start}% ${offset}%`
  })
  return `conic-gradient(${ranges.join(', ')})`
})
const metrics = computed(() => [
  { label: '총 판매액', value: report.value ? won(sales.value) : '—' },
  { label: '신규 주문', value: report.value ? formatter.format(orderCount.value) + '건' : '—' },
  { label: '신규 회원', value: report.value ? formatter.format(newCustomers.value) + '명' : '—' },
  { label: '답변 대기 문의', value: report.value ? pendingCount.value + '건' : '—' },
])
const operationAlerts = computed(() => [
  { key: 'stock', column: '상품명', status: '재고 확인 필요', action: '재고 수정', title: '재고 확인 상품', count: stockAlertCount.value, unit: '개', section: 'products', empty: '재고 확인이 필요한 상품이 없어요.', items: demo.value ? (report.value?.stockAlerts ?? []).map((text, id) => ({ id, text })) : report.value?.stockAlerts ?? [] },
  { key: 'inquiries', column: '문의 제목', status: '답변 대기', action: '답변하기', title: '답변 대기 문의', count: pendingCount.value, unit: '건', section: 'inquiries', empty: '답변을 기다리는 문의가 없어요.', items: (report.value?.pendingInquiries ?? []).map((item) => ({ id: item.id, text: demo.value ? item.title : item.text })) },
  { key: 'reviews', column: '후기 내용', status: '답변 대기', action: '답변하기', title: '미답변 후기', count: reviewCount.value, unit: '건', section: 'reviews', empty: '답변을 기다리는 후기가 없어요.', items: (report.value?.unansweredReviews ?? []).map((item) => ({ id: item.id, text: demo.value ? item.content : item.text })) },
])

const activeOperation = computed(() => operationAlerts.value.find((item) => item.key === operationTab.value) ?? operationAlerts.value.find((item) => item.count > 0) ?? operationAlerts.value[0])

function activateOperation(index, event, focus = false) {
  operationTab.value = operationAlerts.value[index].key
  const list = event.currentTarget.closest('[role="tablist"]')
  const tab = list.querySelectorAll('[role="tab"]')[index]
  if (focus) tab.focus({ preventScroll: true })
  const bounds = list.getBoundingClientRect()
  const item = tab.getBoundingClientRect()
  if (item.left < bounds.left) list.scrollLeft -= bounds.left - item.left
  else if (item.right > bounds.right) list.scrollLeft += item.right - bounds.right
}

function operationTabKey(index, event) {
  const count = operationAlerts.value.length
  const target = { ArrowRight: (index + 1) % count, ArrowLeft: (index + count - 1) % count, Home: 0, End: count - 1 }[event.key]
  if (target == null) return
  event.preventDefault()
  activateOperation(target, event, true)
}

function openOperationReply(item) {
  operationTab.value = activeOperation.value.key
  replyDialog.value?.open(activeOperation.value.section, item.id)
}

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
      <div class="admin-brand"><img :src="logo" alt="오이시담" class="admin-logo"><span>관리자 센터</span></div>
      <nav aria-label="관리자 메뉴">
        <ul>
          <li v-for="[id, label] in navigation" :key="id">
            <RouterLink :to="{ name: 'AdminDashboard', params: { section: id } }" :class="{ 'is-current': activeSection[0] === id }">{{ label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="admin-body">
      <header class="topbar">
        <p class="admin-breadcrumb">관리자 센터 <span aria-hidden="true">/</span> <strong>{{ activeSection[1] }}</strong></p>
        <span class="admin-account">{{ session.member?.name }}<small>관리자</small></span>
        <button type="button" @click="signOut">로그아웃</button>
        <p v-if="logoutError" role="alert">{{ logoutError }}</p>
      </header>
      <AdminInquiries v-if="activeSection[0] === 'inquiries' && !demo" />
      <AdminReviews v-else-if="activeSection[0] === 'reviews' && !demo" />
      <AdminLiveManagement v-else-if="activeSection[0] && activeSection[0] !== 'analytics' && !demo" :key="activeSection[0]" :section="activeSection[0]" :title="activeSection[1]" />
      <AdminManagement v-else-if="activeSection[0]" :section="activeSection[0]" :title="activeSection[1]" />
      <main v-else class="dashboard">
        <header class="page-heading">
          <div>
            <h1>대시보드</h1>
            <p>{{ demo ? '오이시담 운영 현황 · 모의 데이터' : '오이시담 운영 현황' }}</p>
          </div>
          <select v-model="days" class="dashboard-period" aria-label="집계 기간" :disabled="loading">
            <option :value="7">최근 7일</option>
            <option :value="14">최근 14일</option>
            <option :value="30">최근 30일</option>
          </select>
        </header>

        <p v-if="loadError" class="dashboard-card">{{ loadError }} <button type="button" @click="reload++">다시 시도</button></p>
        <p v-else-if="loading" class="dashboard-card" role="status">운영 데이터를 불러오는 중이에요.</p>

        <section class="metric-grid" aria-label="운영 지표">
          <article v-for="item in metrics" :key="item.label" class="dashboard-card metric">
            <h2>{{ item.label }}</h2>
            <strong>{{ item.value }}</strong>
            <small v-if="item.note">{{ item.note }}</small>
          </article>
        </section>

        <div class="chart-grid">
          <section class="dashboard-card" aria-labelledby="sales-heading">
            <div class="card-heading"><h2 id="sales-heading">판매 추이</h2><span>최근 {{ days }}일 · 원</span></div>
            <p v-if="!report" class="empty">표시할 집계가 없어요.</p>
            <div v-else class="chart-scroll">
              <ul class="bars" :style="{ gridTemplateColumns: `repeat(${days}, minmax(30px, 1fr))` }">
                <li v-for="(day, index) in daily" :key="day.key">
                  <button type="button" class="bar-track" :aria-label="`${day.label} 판매액 ${won(day.sales)}, 주문 ${day.orderCount}건`">
                    <span class="bar" :style="{ height: `${100 * day.sales / maxSales}%` }"></span>
                    <span class="bar-value" :class="{ 'align-end': index > daily.length / 2 }" aria-hidden="true">{{ won(day.sales) }} · {{ day.orderCount }}건</span>
                  </button>
                  <small v-if="days <= 14 || index % 5 === 0 || index === daily.length - 1">{{ day.label }}</small>
                </li>
              </ul>
            </div>
          </section>
          <section class="dashboard-card" aria-labelledby="status-heading">
            <h2 id="status-heading">주문 상태 현황</h2>
            <div v-if="report" class="status-layout">
              <div class="ring" :style="{ background: ring }" aria-hidden="true"><span>총 주문<strong>{{ orderCount }}건</strong></span></div>
              <ul class="status-list" :aria-label="`총 주문 ${orderCount}건`">
                <li v-for="status in statuses" :key="status.name">
                  <i :style="{ background: status.color }"></i><span>{{ status.label }}</span><b>{{ status.count }}건</b>
                </li>
              </ul>
            </div>
            <p v-else class="empty">표시할 집계가 없어요.</p>
          </section>
        </div>

        <div class="bottom-grid">
          <section class="dashboard-card operations" aria-labelledby="operations-heading">
            <div class="card-heading"><h2 id="operations-heading">운영 알림</h2><span>확인이 필요한 항목을 모았어요.</span></div>
            <div v-if="report" class="operation-workspace">
              <div class="operation-tabs" role="tablist" aria-label="운영 알림 종류">
                <button v-for="(alert, index) in operationAlerts" :id="'operation-tab-' + alert.key" :key="alert.key" type="button" role="tab" :aria-selected="activeOperation.key === alert.key" :tabindex="activeOperation.key === alert.key ? 0 : -1" @click="activateOperation(index, $event)" @keydown="operationTabKey(index, $event)">{{ alert.title }}<span class="operation-tab-count">{{ alert.count.toLocaleString('ko-KR') }}{{ alert.unit }}</span></button>
              </div>
              <section role="tabpanel" :aria-labelledby="'operation-tab-' + activeOperation.key">
                <div class="operation-table-heading"><p>전체 <strong>{{ activeOperation.count.toLocaleString('ko-KR') }}</strong>{{ activeOperation.unit }}<span v-if="activeOperation.count > activeOperation.items.length"> · 최근 {{ activeOperation.items.length }}{{ activeOperation.unit }} 표시</span></p><RouterLink :to="{ name: 'AdminDashboard', params: { section: activeOperation.section } }">전체 보기 <span aria-hidden="true">→</span></RouterLink></div>
                <div class="operation-table-region" tabindex="0" role="region" :aria-label="activeOperation.title + ' 목록'">
                  <table class="operation-table">
                    <thead><tr><th scope="col">번호</th><th scope="col">{{ activeOperation.column }}</th><th scope="col">상태</th><th scope="col">관리</th></tr></thead>
                    <tbody v-if="activeOperation.items.length"><tr v-for="(item, index) in activeOperation.items" :key="activeOperation.key + '-' + item.id">
                      <td class="operation-number">{{ index + 1 }}</td><td class="operation-text"><span v-if="demo">{{ item.text }}</span><RouterLink v-else-if="activeOperation.key === 'stock'" :to="{ name: 'AdminDashboard', params: { section: activeOperation.section }, query: { id: item.id } }" :title="item.text">{{ item.text }}</RouterLink><button v-else type="button" aria-haspopup="dialog" :title="item.text" @click="openOperationReply(item)">{{ item.text }}</button></td><td><span class="badge">{{ activeOperation.status }}</span></td><td><span v-if="demo">{{ activeOperation.action }}</span><RouterLink v-else-if="activeOperation.key === 'stock'" class="operation-row-action" :to="{ name: 'AdminDashboard', params: { section: activeOperation.section }, query: { id: item.id } }" :aria-label="item.text + ' ' + activeOperation.action">{{ activeOperation.action }}</RouterLink><button v-else type="button" class="operation-row-action" aria-haspopup="dialog" :aria-label="item.text + ' 답변하기'" @click="openOperationReply(item)">답변하기</button></td>
                    </tr></tbody>
                    <tbody v-else><tr><td colspan="4" class="operation-table-empty">{{ activeOperation.empty }}</td></tr></tbody>
                  </table>
                </div>
              </section>
            </div>
            <p v-else class="empty">표시할 운영 알림이 없어요.</p>
          </section>
          <section class="dashboard-card">
            <div class="card-heading"><h2>최근 주문 내역</h2><RouterLink :to="{ name: 'AdminDashboard', params: { section: 'orders' } }">전체 보기 <span aria-hidden="true">→</span></RouterLink></div>
            <div v-if="orders.length" class="order-scroll" tabindex="0" role="region" aria-label="최근 주문 내역">
              <table>
                <thead><tr><th scope="col">주문번호</th><th scope="col">주문일시</th><th scope="col">주문자</th><th scope="col">주문금액</th><th scope="col">주문상태</th></tr></thead>
                <tbody><tr v-for="order in orders.slice(0, 5)" :key="order.id">
                  <td><template v-if="demo">{{ order.id }}</template><RouterLink v-else :to="{ name: 'AdminDashboard', params: { section: 'orders' }, query: { id: order.orderId } }">{{ order.id }}</RouterLink></td><td>{{ dateFormat.format(order.date) }}</td><td>{{ order.customer }}</td><td>{{ won(order.total) }}</td>
                  <td><span class="badge" :class="order.status">{{ demo ? statusLabels.find((status) => status.name === order.status)?.label : orderLabel(order.status) }}</span></td>
                </tr></tbody>
              </table>
            </div>
            <p v-else class="empty">표시할 주문이 없어요.</p>
          </section>
        </div>
      </main>
    </div>
  </div>
  <AdminReplyDialog v-if="!demo" ref="replyDialog" @saved="reload++" />
  <AlertDialog :message="notice || logoutError" @close="notice = logoutError = ''" />
</template>

<style scoped src="../styles/admin-dashboard.css"></style>
