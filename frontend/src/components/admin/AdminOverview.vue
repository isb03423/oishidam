<script setup>
import { activateAdminRow, activateAdminRowKey } from '../../utils/adminRow.js'
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import AdminIcon from './AdminIcon.vue'
import AdminPageHeading from './AdminPageHeading.vue'
import AdminSentimentBadge from './AdminSentimentBadge.vue'
import AdminReplyDialog from './AdminReplyDialog.vue'
import AdminOrderDialog from './AdminOrderDialog.vue'
import AdminProductWorkspace from '../../views/AdminProductWorkspace.vue'
import AdminNotice from './AdminNotice.vue'
import Pagination from '../common/Pagination.vue'
import { fulfillmentStages as exampleStages, overviewPeriods, priorityTasks, stockWatch as exampleStock } from '../../data/adminOverview.js'
import { getAdminList, getAdminOperations, getAdminStockAlerts } from '../../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../../stores/session.js'
import { chartIndex, dateOffset, dateRangeError, overviewSales, overviewTasks } from '../../utils/adminOverview.js'
import { adminStatusTone } from '../../utils/adminPresentation.js'

const id = useId()
const live = computed(() => session.source === 'api')
const selectedPeriod = ref('week')
const selectedKind = ref('orders')
const selectedStage = ref('')
const expandedTask = ref('')
const currentPage = ref(1)
const pageSize = 5
const stockPageSize = ref(4)
const stockTable = ref(null)
const stockHeader = ref(null)
const orderDialog = ref(null)
const productDialog = ref(null)
const completion = ref('')
const reload = ref(0)
const report = ref(null)
const orderLists = ref({})
const replyLists = ref({})
let measureStockRows = () => {}
const stockReport = ref(null)
const stockPage = ref(1)
const stockLoading = ref(false)
const stockTip = ref(null)
const stockTipElement = ref(null)
let stockTipTimer
const loading = ref(false)
const workLoading = ref(false)
const error = ref('')
const workError = ref('')
const stockError = ref('')
const replyDialog = ref(null)
const activePoint = ref(null)
const periods = [{ key: 'today', label: '오늘', days: 1 }, { key: 'week', label: '7일', days: 7 }, { key: 'month', label: '30일', days: 30 }]
const storeToday = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date())
const today = ref(storeToday())
const rangeFrom = ref(dateOffset(today.value, -6))
const rangeTo = ref(today.value)
const customRange = ref(null)
const rangeOpen = ref(false)
const rangeError = ref('')
const rangeForm = ref(null)
const rangeButton = ref(null)
const rangePanel = ref(null)
const nativePopover = 'popover' in HTMLElement.prototype
const queryPeriod = computed(() => selectedPeriod.value === 'custom' ? customRange.value : { days: periods.find(item => item.key === selectedPeriod.value).days })

function choosePeriod(key) {
  selectedPeriod.value = key
  closeRange()
  rangeError.value = ''
  rangeTo.value = storeToday()
  rangeFrom.value = dateOffset(rangeTo.value, 1 - periods.find(item => item.key === key).days)
}
async function applyRange() {
  today.value = storeToday()
  rangeError.value = dateRangeError(rangeFrom.value, rangeTo.value, today.value)
  if (rangeError.value) { rangeForm.value.querySelector('input').focus(); return }
  customRange.value = { from: rangeFrom.value, to: rangeTo.value }
  selectedPeriod.value = 'custom'
  closeRange()
  await nextTick()
  rangeButton.value.focus()
}
function closeRange() {
  if (nativePopover) rangePanel.value?.hidePopover()
  rangeOpen.value = false
}
watch(rangeOpen, (open, _, onCleanup) => {
  if (!open || nativePopover) return
  const dismiss = event => { if (!rangePanel.value.contains(event.target) && !rangeButton.value.contains(event.target)) closeRange() }
  const escape = event => { if (event.key === 'Escape') { closeRange(); rangeButton.value.focus() } }
  document.addEventListener('pointerdown', dismiss)
  document.addEventListener('keydown', escape)
  onCleanup(() => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape) })
})
function refresh() { today.value = storeToday(); reload.value++ }

watch([shoppingOwner, queryPeriod, reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  report.value = null
  error.value = ''
  activePoint.value = null
  loading.value = false
  if (!live.value || session.member?.role !== 'ADMIN') return
  loading.value = true
  try {
    const result = await getAdminOperations(queryPeriod.value, controller.signal)
    if (controller.signal.aborted || revision !== getSessionRevision()) return
    report.value = result

  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) error.value = failure.message
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })

watch([shoppingOwner, reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  orderLists.value = {}
  replyLists.value = {}
  workError.value = ''
  currentPage.value = 1
  expandedTask.value = ''
  workLoading.value = false
  if (!live.value || session.member?.role !== 'ADMIN') return
  workLoading.value = true
  try {
    const lists = await Promise.all([...exampleStages.map(stage => getAdminList('orders', { orderStatus: stage.key, page: 0, size: 10 }, controller.signal)), getAdminList('inquiries', { status: 'OPEN', page: 0, size: 10 }, controller.signal), getAdminList('reviews', { answered: false, page: 0, size: 10 }, controller.signal)])
    if (!controller.signal.aborted && revision === getSessionRevision()) {
      orderLists.value = Object.fromEntries(exampleStages.map((stage, index) => [stage.key, lists[index]]))
      replyLists.value = { inquiries: lists[exampleStages.length], reviews: lists[exampleStages.length + 1] }
    }
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) workError.value = failure.message
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) workLoading.value = false
  }
}, { immediate: true })

watch([shoppingOwner, stockPage, stockPageSize, reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  onCleanup(() => controller.abort())
  stockError.value = ''
  stockLoading.value = false
  if (!live.value || session.member?.role !== 'ADMIN') return
  stockLoading.value = true
  try {
    const result = await getAdminStockAlerts({ page: stockPage.value - 1, size: stockPageSize.value }, controller.signal)
    if (controller.signal.aborted || revision !== getSessionRevision()) return
    stockReport.value = result
    stockPage.value = Math.max(1, Math.min(stockPage.value, result.totalPages))
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) stockError.value = failure.message
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) stockLoading.value = false
  }
}, { immediate: true })
watch(shoppingOwner, () => { stockPage.value = 1; stockReport.value = null; completion.value = '' })
watch(stockPageSize, () => { stockPage.value = 1 })
watch([stockTable, stockHeader], ([region, head], _, onCleanup) => {
  if (!region || !head) return
  let frame
  const measure = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      const rowHeight = region.querySelector('tbody tr')?.getBoundingClientRect().height || 44
      stockPageSize.value = Math.max(1, Math.min(100, Math.floor((region.clientHeight - head.getBoundingClientRect().height) / rowHeight)))
    })
  }
  measureStockRows = measure
  const observer = new ResizeObserver(measure)
  observer.observe(region); observer.observe(head); measure()
  onCleanup(() => { observer.disconnect(); cancelAnimationFrame(frame); measureStockRows = () => {} })
}, { flush: 'post' })

const period = computed(() => {
  if (live.value) return { label: periods.find(item => item.key === selectedPeriod.value)?.label || '선택 기간', ...(report.value ? overviewSales(report.value) : { range: '', labels: [], dates: [], current: [], previous: [], dailyOrders: [], unit: '일별 판매액' }) }
  if (selectedPeriod.value !== 'custom') return overviewPeriods.find(item => item.key === selectedPeriod.value)
  const example = overviewPeriods.find(item => item.key === 'month')
  const indices = example.labels.map((label, index) => ({ date: '2026-' + label.replace('.', '-'), index })).filter(item => item.date >= customRange.value.from && item.date <= customRange.value.to)
  return { label: '선택 기간', range: `${customRange.value.from} – ${customRange.value.to}`, unit: '일별 판매액', labels: indices.map(item => item.date.slice(5).replace('-', '.')), dates: indices.map(item => item.date), current: indices.map(item => example.current[item.index]), previous: [] }
})
const displayedRange = computed(() => period.value.range || (selectedPeriod.value === 'custom' ? `${customRange.value.from} – ${customRange.value.to}` : `${dateOffset(today.value, 1 - queryPeriod.value.days)} – ${today.value}`))
const total = computed(() => live.value ? period.value.sales : period.value.current.reduce((sum, amount) => sum + amount, 0))
const previousTotal = computed(() => period.value.previousSales ?? period.value.previous.reduce((sum, amount) => sum + amount, 0))
const growth = computed(() => previousTotal.value ? (total.value - previousTotal.value) / previousTotal.value * 100 : null)
const ceiling = computed(() => Math.max(10000, Math.ceil(Math.max(0, ...period.value.current, ...period.value.previous) / 10000) * 10000))
const numbers = new Intl.NumberFormat('ko-KR')
const money = amount => amount == null ? '—' : numbers.format(amount) + '원'
const points = values => values.map((value, index) => `${values.length === 1 ? 500 : index * 1000 / (values.length - 1)},${200 - value / ceiling.value * 184}`).join(' ')
const xLabels = computed(() => period.value.labels.map((label, index) => ({ label, index })).filter(({ index }) => period.value.labels.length <= 7 || index % (period.value.hourly ? 3 : 5) === 0 || index === period.value.labels.length - 1))
const filters = [{ key: 'orders', label: '주문' }, { key: 'inquiries', label: '고객 문의' }, { key: 'reviews', label: '후기' }]
const sourceTasks = computed(() => live.value ? overviewTasks(report.value, orderLists.value, replyLists.value) : priorityTasks)
const taskColumns = computed(() => selectedKind.value === 'orders'
  ? [['reference', '주문번호'], ['quantity', '상품 수'], ['amount', '결제금액'], ['state', '주문 상태'], ['customer', '주문자'], ['age', '주문일']]
  : selectedKind.value === 'inquiries' ? [['reference', '문의번호'], ['title', '문의 제목'], ['state', '답변 상태'], ['customer', '작성자'], ['age', '등록일']]
  : [['reference', '후기번호'], ['title', '후기 내용'], ['sentiment', '감정'], ['state', '답변 상태'], ['customer', '작성자'], ['age', '등록일']])
const tasks = computed(() => sourceTasks.value.filter(item => (selectedKind.value === item.kind) && (!selectedStage.value || selectedStage.value === item.stage)).sort((a, b) => Number(Boolean(b.urgent)) - Number(Boolean(a.urgent))))
const stages = computed(() => live.value ? exampleStages.map(stage => ({ ...stage, count: orderLists.value[stage.key]?.totalElements ?? null })) : exampleStages)
const stageLabel = computed(() => stages.value.find(item => item.key === selectedStage.value)?.label)
const visibleTasks = computed(() => tasks.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
const taskState = task => task.state || (task.kind === 'orders' ? exampleStages.find(stage => stage.key === task.stage)?.label || '—' : '답변 대기')
const taskPages = computed(() => Math.ceil(tasks.value.length / pageSize))
const ordersInProgress = computed(() => live.value && !Object.keys(orderLists.value).length ? null : stages.value.reduce((sum, stage) => sum + stage.count, 0))
const urgentCount = computed(() => sourceTasks.value.filter(item => item.urgent).length)
const stockWatch = computed(() => live.value ? (stockReport.value?.content ?? []).map(item => ({ ...item, sku: String(item.id), itemId: item.id })) : exampleStock.slice((stockPage.value - 1) * stockPageSize.value, stockPage.value * stockPageSize.value))
const stockCount = computed(() => live.value ? stockReport.value?.totalElements : exampleStock.length)
const stockPages = computed(() => live.value ? stockReport.value?.totalPages ?? 0 : Math.ceil(exampleStock.length / stockPageSize.value))
const soldOutCount = computed(() => live.value ? stockReport.value?.soldOutCount : exampleStock.filter(item => item.quantity === 0).length)
const lowStockCount = computed(() => live.value ? stockReport.value?.lowStockCount : exampleStock.filter(item => item.quantity > 0).length)
const refreshing = computed(() => loading.value || workLoading.value || stockLoading.value)
function keepStockName() { clearTimeout(stockTipTimer) }
function closeStockName() { clearTimeout(stockTipTimer); stockTip.value = null }
function delayCloseStockName() {
  if (stockTip.value?.trigger.matches(':hover, :focus-visible')) return
  clearTimeout(stockTipTimer)
  stockTipTimer = setTimeout(closeStockName, 150)
}
async function showStockName(event, name) {
  const trigger = event.currentTarget
  clearTimeout(stockTipTimer)
  if (trigger.scrollWidth <= trigger.clientWidth) { closeStockName(); return }
  const bounds = trigger.getBoundingClientRect()
  stockTip.value = { name, trigger, left: Math.max(12, Math.min(bounds.left, innerWidth - Math.min(320, innerWidth - 24) - 12)), top: bounds.bottom + 8 }
  await nextTick()
  if (stockTip.value?.trigger !== trigger) return
  const tip = stockTipElement.value.getBoundingClientRect()
  if (tip.bottom > innerHeight - 12) stockTip.value.top = Math.max(12, bounds.top - tip.height - 8)
}
watch(stockTip, (tip, _, onCleanup) => {
  if (!tip) return
  const escape = event => { if (event.key === 'Escape') closeStockName() }
  document.addEventListener('keydown', escape)
  window.addEventListener('scroll', closeStockName, true)
  window.addEventListener('resize', closeStockName)
  onCleanup(() => { document.removeEventListener('keydown', escape); window.removeEventListener('scroll', closeStockName, true); window.removeEventListener('resize', closeStockName) })
})
watch(stockWatch, () => { closeStockName(); nextTick(() => measureStockRows()) })
onBeforeUnmount(() => clearTimeout(stockTipTimer))

function countKind(key) {
  if (!live.value) return sourceTasks.value.filter(item => item.kind === key).length
  const counts = { orders: ordersInProgress.value, inquiries: report.value?.pendingInquiryCount, reviews: report.value?.unansweredReviewCount }
  return counts[key] ?? '—'
}
function filterKind(key) { selectedKind.value = key; selectedStage.value = ''; expandedTask.value = ''; currentPage.value = 1 }
function filterStage(key) { selectedKind.value = 'orders'; selectedStage.value = selectedStage.value === key ? '' : key; expandedTask.value = ''; currentPage.value = 1 }
function openTask(task) {
  if (!live.value) { expandedTask.value = expandedTask.value === task.id ? '' : task.id; return }
  closeStockName()
  if (task.kind === 'orders') orderDialog.value.open(task.itemId)
  else replyDialog.value.open(task.kind, task.itemId)
}
function savedReply(result) {
  completion.value = `${result.kind === 'inquiries' ? '문의' : '후기'} #${result.id} 답변을 등록했습니다.`
  reload.value++
}
function savedProduct(message) { completion.value = message; reload.value++ }

function pointX(index) { return period.value.current.length < 2 ? 50 : index * 100 / (period.value.current.length - 1) }
function inspectPoint(event) {
  if (event.target.closest('.overview-chart-tooltip')) return
  const bounds = event.currentTarget.getBoundingClientRect()
  activePoint.value = chartIndex(event.clientX, bounds.left, bounds.width, period.value.current.length)
}
function stepPoint(event) {
  const count = period.value.current.length
  if (!count) return
  const next = { ArrowRight: Math.min(count - 1, (activePoint.value ?? -1) + 1), ArrowLeft: Math.max(0, (activePoint.value ?? 1) - 1), Home: 0, End: count - 1 }[event.key]
  if (next == null) return
  event.preventDefault()
  activePoint.value = next
}
watch(selectedPeriod, () => { activePoint.value = null })
watch(taskPages, count => { currentPage.value = Math.max(1, Math.min(currentPage.value, count)) })
</script>

<template>
  <main class="admin-page admin-dashboard-page overview">
    <AdminPageHeading class="admin-page-heading-sticky" title="운영 대시보드" description="스토어의 흐름을 읽고, 필요한 업무부터 처리하세요.">
      <button type="button" class="overview-refresh button is-small" :disabled="refreshing" @click="refresh"><AdminIcon name="refresh" />{{ refreshing ? '불러오는 중…' : '새로고침' }}</button>
    </AdminPageHeading>
    <AdminNotice class="overview-completion" :message="completion" @close="completion = ''" />
    <p v-if="error || workError" class="overview-error" role="alert">{{ [error, workError].filter(Boolean).join(' / ') }}<button type="button" :disabled="refreshing" @click="reload++">다시 시도</button></p>
    <p v-if="refreshing" class="overview-loading" role="status">운영 데이터를 불러오는 중입니다.</p>

    <section class="overview-fulfillment" :aria-labelledby="id + '-fulfillment'">
      <div class="overview-section-heading"><div class="overview-section-title"><h2 :id="id + '-fulfillment'">주문 처리 현황</h2><span>전체 기간 기준</span></div><RouterLink class="overview-text-link" :to="{ name: 'AdminDashboard', params: { section: 'orders' } }">주문 관리<AdminIcon name="chevron" /></RouterLink></div>
      <div class="overview-order-strip">
        <div class="overview-order-total"><span>처리 중</span><strong>{{ ordersInProgress == null ? '—' : numbers.format(ordersInProgress) }}<small>건</small></strong></div>
        <ol class="overview-stages">
          <li v-for="stage in stages" :key="stage.key">
            <button type="button" :aria-pressed="selectedStage === stage.key" :aria-controls="id + '-task-list'" @click="filterStage(stage.key)">
              <span class="overview-stage-label">{{ stage.label }}</span>
              <strong class="overview-stage-count">{{ stage.count == null ? '—' : numbers.format(stage.count) }}<small>건</small></strong>
            </button>
          </li>
        </ol>
      </div>
    </section>

    <div class="overview-workspace">
      <section class="overview-tasks" :aria-labelledby="id + '-tasks'">
        <div class="overview-section-heading"><div class="overview-section-title"><h2 :id="id + '-tasks'">확인이 필요한 업무</h2><span v-if="urgentCount" class="overview-urgent-summary">긴급 {{ urgentCount }}건</span></div><span class="overview-section-note">{{ live ? '상태별 최근 최대 10건' : '최근 업무' }}</span></div>
        <div class="overview-task-filters" role="group" aria-label="업무 종류"><button v-for="filter in filters" :key="filter.key" type="button" :aria-pressed="selectedKind === filter.key" @click="filterKind(filter.key)">{{ filter.label }}<span>{{ countKind(filter.key) }}</span></button></div>
        <div v-if="selectedStage" class="overview-applied-filter"><span>{{ stageLabel }} 관련 업무</span><button type="button" aria-label="주문 단계 필터 해제" @click="filterStage(selectedStage)"><AdminIcon name="close" /></button></div>
        <div :id="id + '-task-list'" class="overview-task-results" aria-live="polite">
          <table v-if="visibleTasks.length" class="overview-task-table" :class="'task-grid-' + selectedKind"><caption class="sr-only">확인이 필요한 주문, 문의, 후기 업무</caption><colgroup><col v-for="[key] in taskColumns" :key="key" :class="'task-column-' + key" /></colgroup><thead><tr><th v-for="[key, label] in taskColumns" :key="key" scope="col" :class="{ numeric: ['quantity', 'amount'].includes(key), 'status-cell': ['sentiment', 'state'].includes(key) }">{{ label }}</th><th scope="col" class="task-open-column"><span class="sr-only">상세</span></th></tr></thead><tbody><template v-for="task in visibleTasks" :key="task.id"><tr class="overview-task-row admin-clickable-row" tabindex="0" :aria-haspopup="live ? 'dialog' : undefined" :aria-expanded="live ? undefined : expandedTask === task.id" :aria-controls="live ? undefined : `${id}-${task.id}`" @click="activateAdminRow($event, () => openTask(task))" @keydown="activateAdminRowKey($event, () => openTask(task))"><td v-for="[key, label] in taskColumns" :key="key" :data-label="label" :class="{ numeric: ['quantity', 'amount'].includes(key), 'status-cell': ['sentiment', 'state'].includes(key) }"><span v-if="key === 'label'" class="overview-task-kind" :data-kind="task.kind">{{ task.label }}</span><AdminSentimentBadge v-else-if="key === 'sentiment'" :sentiment="task.sentiment" /><span v-else-if="key === 'state'" :class="task.kind === 'orders' ? 'status-pill task-state' : ['inquiry-status', task.state === '답변 완료' ? 'is-answered' : 'is-pending']" :data-tone="task.kind === 'orders' ? adminStatusTone(taskState(task)) : undefined">{{ taskState(task) }}</span><span v-else-if="key === 'quantity'" class="task-field">{{ task.quantity == null ? '—' : numbers.format(task.quantity) + '개' }}</span><span v-else-if="key === 'amount'" class="task-field">{{ money(task.amount) }}</span><time v-else-if="key === 'age'" class="overview-task-age">{{ task.age || '—' }}</time><span v-else class="task-field" :class="'task-field-' + key" :title="key === 'title' ? task.title : undefined">{{ key === 'customer' ? task.customer || (!live ? task.name : '—') : task[key] }}</span></td><td class="task-open-column"><span class="overview-expand-button" aria-hidden="true"><AdminIcon :name="expandedTask === task.id ? 'close' : 'chevron'" /></span></td></tr><tr v-if="!live && expandedTask === task.id" class="overview-example-detail"><td :colspan="taskColumns.length + 1"><div :id="`${id}-${task.id}`" class="overview-task-detail"><p>{{ task.description }}</p><span>{{ task.detail }}</span></div></td></tr></template></tbody></table>
          <p v-if="!tasks.length" class="overview-empty">{{ refreshing ? '업무를 불러오는 중입니다.' : error || workError ? '업무를 불러오지 못했습니다.' : '현재 조건에서 처리할 업무가 없습니다.' }}</p>
        </div>
        <div class="overview-task-pager"><p>{{ live ? '불러온' : '전체' }} <strong>{{ tasks.length }}</strong>건<template v-if="tasks.length"><span>{{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, tasks.length) }} 표시</span></template></p><Pagination :model-value="currentPage" :page-count="taskPages" label="대시보드 업무 페이지" @update:model-value="currentPage = $event; expandedTask = ''" /></div>
      </section>

      <section class="overview-stock" :aria-labelledby="id + '-stock'">
        <div class="overview-section-heading"><div class="overview-section-title"><h2 :id="id + '-stock'">재고 알림</h2><span>재고 5개 이하</span></div><RouterLink class="overview-text-link" :to="{ name: 'AdminDashboard', params: { section: 'products' } }">상품 관리<AdminIcon name="chevron" /></RouterLink></div>
        <dl v-if="stockCount > 0" class="overview-stock-summary"><div><dt>품절</dt><dd>{{ soldOutCount }}<small>개</small></dd></div><div><dt>재고 부족</dt><dd>{{ lowStockCount }}<small>개</small></dd></div></dl>
        <div v-show="stockCount !== 0" ref="stockTable" class="overview-stock-table" :aria-busy="stockLoading" tabindex="-1" role="region" :aria-labelledby="id + '-stock'">
          <table class="table is-fullwidth"><caption class="sr-only">재고 5개 이하 판매 상품</caption><colgroup><col><col class="overview-stock-count-column"></colgroup>
            <thead ref="stockHeader"><tr><th scope="col">상품</th><th scope="col" class="has-text-right">현재 재고</th></tr></thead>
            <tbody><tr v-for="product in stockWatch" :key="product.sku" :class="{ 'admin-clickable-row': live }" @click="live && !stockLoading && activateAdminRow($event, () => productDialog.open(product.itemId))"><th scope="row">
              <button v-if="live" type="button" class="overview-stock-name" :disabled="stockLoading" aria-haspopup="dialog" @click="closeStockName(); productDialog.open(product.itemId, $event.currentTarget)" @pointerenter="showStockName($event, product.name)" @pointerleave="delayCloseStockName" @focus="showStockName($event, product.name)" @blur="delayCloseStockName">{{ product.name }}</button>
              <strong v-else class="overview-stock-name" tabindex="0" @pointerenter="showStockName($event, product.name)" @pointerleave="delayCloseStockName" @focus="showStockName($event, product.name)" @blur="delayCloseStockName">{{ product.name }}</strong>
            </th><td class="has-text-right"><span class="overview-stock-quantity" :class="{ 'is-sold-out': product.quantity === 0 }">{{ product.quantity === null ? '수량 확인 필요' : product.quantity ? product.quantity + '개' : '품절' }}</span></td></tr></tbody>
          </table>
        </div>
        <p v-if="!stockWatch.length" class="overview-empty">{{ stockLoading ? '재고 알림을 불러오는 중입니다.' : stockError ? '재고 알림을 불러오지 못했습니다.' : '재고 확인이 필요한 상품이 없습니다.' }}</p>
        <p v-if="stockError" class="overview-error" role="alert">{{ stockError }}<button type="button" :disabled="stockLoading" @click="reload++">다시 시도</button></p>
        <div v-if="stockCount > 0" class="overview-task-pager overview-stock-pager"><p>전체 <strong>{{ numbers.format(stockCount) }}</strong>개<span>{{ (stockPage - 1) * stockPageSize + 1 }}–{{ Math.min(stockPage * stockPageSize, stockCount) }} 표시</span></p><Pagination :model-value="stockPage" :page-count="stockPages" :disabled="stockLoading" label="대시보드 재고 알림 페이지" @update:model-value="stockPage = $event" /></div>
      </section>
    </div>

    <section class="overview-performance" :aria-labelledby="id + '-performance'">
      <div class="overview-section-heading">
        <div class="overview-section-title"><h2 :id="id + '-performance'">판매 실적</h2></div>
        <div class="overview-period-controls"><span class="overview-selected-range">{{ displayedRange }}</span><div class="overview-period buttons has-addons" role="group" aria-label="판매 실적 조회 기간"><button v-for="item in periods" :key="item.key" type="button" class="button is-small" :aria-pressed="selectedPeriod === item.key" @click="choosePeriod(item.key)">{{ item.label }}</button><button ref="rangeButton" type="button" class="button is-small" :aria-pressed="selectedPeriod === 'custom'" :aria-expanded="rangeOpen" :aria-controls="id + '-date-range'" :popovertarget="nativePopover ? id + '-date-range' : undefined" @click="today = storeToday(); rangeError = ''; !nativePopover && (rangeOpen = !rangeOpen)">기간 선택</button></div></div>
      </div>
      <div :id="id + '-date-range'" ref="rangePanel" class="overview-range-panel" :popover="nativePopover ? 'auto' : undefined" :hidden="!nativePopover && !rangeOpen" @toggle="rangeOpen = $event.newState === 'open'">
        <form ref="rangeForm" aria-label="판매 실적 날짜 선택" @submit.prevent="applyRange">
          <div class="overview-range-heading"><strong>조회 기간</strong><span>최대 31일</span></div>
          <div class="overview-range-fields">
            <div><label :for="id + '-from'">시작일</label><input :id="id + '-from'" v-model="rangeFrom" class="input" name="from" type="date" :max="today" required :aria-invalid="Boolean(rangeError)" :aria-describedby="id + '-range-help'" @input="rangeError = ''"></div>
            <span aria-hidden="true">–</span>
            <div><label :for="id + '-to'">종료일</label><input :id="id + '-to'" v-model="rangeTo" class="input" name="to" type="date" :max="today" required :aria-invalid="Boolean(rangeError)" :aria-describedby="id + '-range-help'" @input="rangeError = ''"></div>
          </div>
          <p :id="id + '-range-help'" class="overview-range-help" :class="{ 'is-error': rangeError }" role="status">{{ rangeError || '시작일과 종료일을 포함한 기간입니다.' }}</p>
          <div class="overview-range-actions"><button type="button" class="button is-small" @click="closeRange(); rangeButton.focus()">취소</button><button type="submit" class="button is-small overview-range-apply">적용</button></div>
        </form>
      </div>

      <div class="overview-sales-summary" aria-live="polite" aria-atomic="true">
        <div class="overview-sales-total"><strong>{{ money(total) }}</strong><p v-if="growth !== null"><span class="overview-growth">{{ growth >= 0 ? '+' : '' }}{{ growth?.toFixed(1) }}%</span>{{ period.compare }} 대비</p></div>
        <dl class="overview-secondary-metrics"><div><dt>신규 주문</dt><dd>{{ period.orders == null ? '—' : numbers.format(period.orders) }}<small>건</small></dd></div><div><dt>{{ live ? '취소 완료' : '취소·환불' }}</dt><dd>{{ period.cancellations == null ? '—' : numbers.format(period.cancellations) }}<small>건</small></dd></div><div><dt>신규 회원</dt><dd>{{ period.customers == null ? '—' : numbers.format(period.customers) }}<small>명</small></dd></div></dl>
      </div>

      <figure class="overview-chart" :aria-labelledby="id + '-chart-caption'">
        <figcaption :id="id + '-chart-caption'"><span><span class="sr-only">판매 추이</span><small>단위: 만 원</small></span><span v-if="period.previous.length" class="overview-chart-legend"><span><i class="current-series"></i>선택 기간</span><span><i class="previous-series"></i>{{ period.compare }}</span></span></figcaption>
        <div class="overview-plot">
          <div class="overview-y-axis" aria-hidden="true"><span v-for="fraction in [1, .75, .5, .25, 0]" :key="fraction">{{ numbers.format(ceiling * fraction / 10000) }}</span></div>
          <div class="overview-chart-area">
            <div v-if="period.current.length" class="overview-chart-interaction" tabindex="0" role="group" aria-label="판매 추이. 좌우 방향키로 날짜별 금액 확인" :aria-describedby="activePoint !== null ? id + '-chart-tooltip' : undefined" @pointermove="inspectPoint" @pointerleave="event => { if (event.currentTarget !== event.currentTarget.ownerDocument.activeElement) activePoint = null }" @focus="activePoint = 0" @blur="activePoint = null" @keydown="stepPoint" @keydown.esc="activePoint = null" @pointerdown="inspectPoint">
              <svg viewBox="0 0 1000 200" preserveAspectRatio="none" role="img" :aria-label="`${period.label} ${period.unit}. 판매액 ${money(total)}. 날짜별 값은 그래프 또는 상세 수치에서 확인하세요.`"><g class="overview-chart-grid" aria-hidden="true"><line v-for="fraction in [0, .25, .5, .75, 1]" :key="fraction" x1="0" x2="1000" :y1="200 - fraction * 184" :y2="200 - fraction * 184" /></g><polyline v-if="period.previous.length" class="overview-line previous-line" :points="points(period.previous)" /><polyline class="overview-line current-line" :points="points(period.current)" /></svg>
              <span v-if="period.previous.length === 1" class="overview-chart-dot previous-dot" :style="{ left: '50%', top: (100 - period.previous[0] / ceiling * 92) + '%' }" aria-hidden="true"></span>
              <span v-if="period.current.length === 1 && activePoint === null" class="overview-chart-dot" :style="{ left: '50%', top: (100 - period.current[0] / ceiling * 92) + '%' }" aria-hidden="true"></span>
              <template v-if="activePoint !== null && activePoint < period.current.length"><span class="overview-chart-guide" :style="{ left: pointX(activePoint) + '%' }" aria-hidden="true"></span><span class="overview-chart-dot" :style="{ left: pointX(activePoint) + '%', top: (100 - period.current[activePoint] / ceiling * 92) + '%' }" aria-hidden="true"></span><div :id="id + '-chart-tooltip'" class="overview-chart-tooltip" :class="{ 'align-end': pointX(activePoint) > 50 }" :style="{ left: pointX(activePoint) + '%' }" role="tooltip"><strong>{{ period.dates?.[activePoint] || period.labels[activePoint] }}</strong><span>판매액 <b>{{ money(period.current[activePoint]) }}</b></span><span v-if="live">신규 주문 <b>{{ numbers.format(period.dailyOrders[activePoint]) }}건</b></span><span v-if="period.previous.length">{{ period.previousDates?.[activePoint] || period.compare }} <b>{{ money(period.previous[activePoint]) }}</b></span></div></template>
            </div>
            <p v-else class="overview-chart-empty">{{ loading ? '판매 데이터를 불러오는 중입니다.' : error ? '판매 데이터를 불러오지 못했습니다.' : '표시할 판매 데이터가 없습니다.' }}</p>
            <div class="overview-x-axis" aria-hidden="true"><span v-for="tick in xLabels" :key="tick.index" :style="{ left: `${period.labels.length < 2 ? 50 : tick.index * 100 / (period.labels.length - 1)}%` }">{{ tick.label }}</span></div>
          </div>
        </div>
      </figure>
      <details class="overview-chart-details"><summary>상세 수치</summary><div class="overview-chart-table" tabindex="-1" role="region" aria-label="기간별 결제금액 표"><table class="table is-fullwidth"><caption class="sr-only">{{ period.label }} 결제금액</caption><thead><tr><th scope="col">일시</th><th scope="col" class="has-text-right">선택 기간</th><th v-if="period.previous.length" scope="col" class="has-text-right">{{ period.compare }}</th><th v-if="live" scope="col" class="has-text-right">신규 주문</th></tr></thead><tbody><tr v-for="(label, index) in period.labels" :key="label"><th scope="row">{{ label }}</th><td class="has-text-right">{{ money(period.current[index]) }}</td><td v-if="period.previous.length" class="has-text-right">{{ period.previousDates?.[index] }} {{ money(period.previous[index]) }}</td><td v-if="live" class="has-text-right">{{ numbers.format(period.dailyOrders[index]) }}건</td></tr></tbody></table></div></details>
    </section>

    <p v-if="live" class="overview-data-note">회색 점선은 직전 동일 기간의 판매액입니다. 판매액은 결제일, 신규 주문·취소 완료 건수는 주문 생성일 기준입니다. 업무 목록은 상태별 최근 최대 10건을 표시하며 전체 건수와 다를 수 있습니다.</p>
    <div v-if="stockTip" ref="stockTipElement" class="overview-stock-tooltip" :style="{ left: stockTip.left + 'px', top: stockTip.top + 'px' }" role="tooltip" aria-hidden="true" @pointerenter="keepStockName" @pointerleave="delayCloseStockName">{{ stockTip.name }}</div>
    <AdminReplyDialog v-if="live" ref="replyDialog" @saved="savedReply" />
    <AdminOrderDialog v-if="live" ref="orderDialog" @saved="completion = $event; reload++" />
    <AdminProductWorkspace v-if="live" ref="productDialog" modal-only @saved="savedProduct" />
    <p v-if="!live" class="overview-preview-note">화면 검토를 위한 예시 데이터입니다. 실제 스토어의 운영 정보와는 관계없습니다.</p>
  </main>
</template>

<style scoped src="../../styles/admin-dashboard.css"></style>
