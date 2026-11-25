<script setup>
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import AdminPageHeading from '../components/admin/AdminPageHeading.vue'
import AdminIcon from '../components/admin/AdminIcon.vue'
import AdminMemberDetail from '../components/admin/AdminMemberDetail.vue'
import AdminSegmentDonut, { customerSegmentPalette } from '../components/admin/AdminSegmentDonut.vue'
import Pagination from '../components/common/Pagination.vue'
import { activateAdminRow, activateAdminRowKey } from '../utils/adminRow.js'
import {
  getAdminCustomerAnalytics,
  getAdminCustomerAnalyticsMembers,
  getAdminCustomerAnalysisStatus,
  getAdminDetail,
  setAdminMemberStatus,
  startAdminCustomerAnalysis,
} from '../services/admin.js'
import {
  getSessionRevision,
  session,
  shoppingOwner,
} from '../stores/session.js'

const report = ref(null),
  loading = ref(false),
  error = ref(''),
  retry = ref(0)
const analysisRunning = ref(false), analysisError = ref('')
const customerList = ref(null), customerListLoading = ref(false), customerListError = ref(''), customerListRetry = ref(0)
const customerSegment = ref(''), customerPurchased = ref(''), customerSort = ref('AMOUNT'), customerPage = ref(0)
const customerSegmentBadgeStyles = customerSegmentPalette.map(({ swatch, surface, ink }) => ({
  '--customer-segment-swatch': swatch,
  '--customer-segment-surface': surface,
  '--customer-segment-ink': ink,
}))
let analysisController = null, analysisTimer = null
const id = useId()
const memberDialog = ref(null), memberId = ref(null), member = ref(null)
const memberLoading = ref(false), memberBusy = ref(false), memberError = ref(''), memberNotice = ref(''), memberRetry = ref(0)
let disposed = false

function openMember(value, row) {
  row.focus({ preventScroll: true })
  memberId.value = value
  memberDialog.value.showModal()
}
function clearMember() {
  memberId.value = null; member.value = null; memberError.value = memberNotice.value = ''
  memberLoading.value = memberBusy.value = false
}
watch(shoppingOwner, () => { memberDialog.value?.close(); clearMember() })
watch([memberId, shoppingOwner, memberRetry], async (_, __, onCleanup) => {
  const controller = new AbortController(), revision = getSessionRevision(), requestedId = memberId.value
  onCleanup(() => controller.abort())
  const valid = () => !controller.signal.aborted && revision === getSessionRevision() && requestedId === memberId.value
  member.value = null; memberError.value = memberNotice.value = ''; memberLoading.value = false
  if (requestedId == null || session.source !== 'api' || session.member?.role !== 'ADMIN') return
  memberLoading.value = true
  try {
    const result = await getAdminDetail('members', requestedId, controller.signal)
    if (valid()) member.value = result
  } catch (failure) {
    if (valid()) memberError.value = failure.message
  } finally {
    if (valid()) memberLoading.value = false
  }
})
async function toggleMemberStatus() {
  if (!member.value || memberBusy.value) return
  const requestedId = memberId.value, revision = getSessionRevision()
  const valid = () => !disposed && revision === getSessionRevision() && requestedId === memberId.value
  memberBusy.value = true; memberError.value = memberNotice.value = ''
  try {
    await setAdminMemberStatus(requestedId, !member.value.isActive)
    if (!valid()) return
    const result = await getAdminDetail('members', requestedId)
    if (valid()) { member.value = result; memberNotice.value = '이용 상태를 변경했습니다.' }
  } catch (failure) {
    if (valid()) memberError.value = failure.message
  } finally { if (valid()) memberBusy.value = false }
}
onBeforeUnmount(() => {
  disposed = true
  memberDialog.value?.close()
  clearAnalysisTracking()
})

const numbers = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 })
const number = (value) => (value == null ? '—' : numbers.format(value))
const money = (value) => (value == null ? '—' : number(value) + '원')
const percent = (value) => (value == null ? '—' : number(value) + '%')
const customerDate = (value) => value ? value.slice(0, 10).replaceAll('-', '.') : '—'
const summary = computed(() => report.value?.summary || {})
const hasData = computed(() => Number(summary.value.total_members) > 0)
function chartSource(key) {
  const source = report.value?.charts?.[key]?.image_base64
  return typeof source === 'string' &&
    source.startsWith('data:image/png;base64,')
    ? source
    : null
}
const cohortPeriods = computed(() =>
  [
    ...new Set(
      (report.value?.retention || []).flatMap((row) =>
        Object.keys(row).filter((key) => /^\d+$/.test(key)),
      ),
    ),
  ].sort((a, b) => Number(a) - Number(b)),
)
const metrics = computed(() => [
  ['전체 고객', number(summary.value.total_members) + '명', '일반 회원 기준'],
  ['구매 고객', number(summary.value.buyers) + '명', '1회 이상 구매'],
  [
    '재구매율',
    percent(summary.value.repurchase_rate),
    '2회 이상 구매 고객 ' + number(summary.value.repeat_buyers) + '명',
  ],
  [
    '최근 90일 구매 비율',
    percent(summary.value.retention_rate_90d),
    '구매 고객 중 최근 90일 내 구매',
  ],
  [
    '평균 구매 횟수',
    number(summary.value.avg_frequency) + '회',
    '구매 고객 기준',
  ],
  ['평균 누적 구매금액', money(summary.value.avg_monetary), '구매 고객 기준'],
])
const segmentRules = [
  ['신규 고객', '가입 후 30일 이내'],
  [
    '일반·우수 고객',
    '그 외 고객의 최근 구매일·구매 횟수·구매금액을 비교해 AI가 분류',
  ],
  ['저활동 고객', '가입 30일 초과, 구매 0~1회인 고객 중 이탈 위험이 아닌 고객'],
  [
    '이탈 위험 고객',
    '가입 30일 초과, 구매 이력이 있고 마지막 구매 후 90일 초과',
  ],
]
const analysisTime = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  dateStyle: 'medium',
  timeStyle: 'medium',
})
const updatedAt = computed(() => {
  const timestamp = Date.parse(report.value?.analyzed_at)
  return Number.isFinite(timestamp) ? analysisTime.format(timestamp) : ''
})

watch(shoppingOwner, () => {
  customerList.value = null
  customerSegment.value = customerPurchased.value = ''
  customerSort.value = 'AMOUNT'
  customerPage.value = 0
})
const analyzedAt = computed(() => report.value?.analyzed_at)
watch([analyzedAt, customerSegment, customerPurchased, customerSort], () => {
  customerPage.value = 0
})
watch(
  [shoppingOwner, analyzedAt, customerSegment, customerPurchased, customerSort, customerPage, customerListRetry],
  async (_, __, onCleanup) => {
    const controller = new AbortController(), revision = getSessionRevision()
    const valid = () => !controller.signal.aborted && revision === getSessionRevision()
    onCleanup(() => controller.abort())
    customerListError.value = ''
    customerListLoading.value = false
    if (!analyzedAt.value || !hasData.value || session.source !== 'api' || session.member?.role !== 'ADMIN') return
    customerListLoading.value = true
    try {
      const result = await getAdminCustomerAnalyticsMembers({
        segment: customerSegment.value === '' ? undefined : customerSegment.value,
        purchased: customerPurchased.value === '' ? undefined : customerPurchased.value,
        sort: customerSort.value,
        page: customerPage.value,
      }, controller.signal)
      if (!valid()) return
      customerList.value = result
      if (customerPage.value > 0 && customerPage.value >= result.totalPages) {
        customerPage.value = Math.max(0, result.totalPages - 1)
      }
    } catch (failure) {
      if (valid()) {
        customerList.value = null
        customerListError.value = failure.message
      }
    } finally {
      if (valid()) customerListLoading.value = false
    }
  },
)

watch(
  [shoppingOwner, retry],
  async ([owner], [previousOwner], onCleanup) => {
    const controller = new AbortController(), revision = getSessionRevision()
    const valid = () => !controller.signal.aborted && revision === getSessionRevision()
    onCleanup(() => controller.abort())
    if (owner !== previousOwner) report.value = null
    error.value = ''
    loading.value = false
    if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
    loading.value = true
    try {
      const result = await getAdminCustomerAnalytics(controller.signal)
      if (valid()) report.value = result
    } catch (failure) {
      if (valid()) error.value = failure.message
    } finally {
      if (valid()) loading.value = false
    }
  },
  { immediate: true },
)

function clearAnalysisTracking() {
  analysisController?.abort()
  clearTimeout(analysisTimer)
  analysisController = analysisTimer = null
  analysisRunning.value = false
  analysisError.value = ''
}

async function trackAnalysis(start = false) {
  if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
  if (start && (loading.value || analysisRunning.value)) return

  analysisController?.abort()
  clearTimeout(analysisTimer)
  const controller = new AbortController(), revision = getSessionRevision()
  analysisController = controller
  const valid = () => analysisController === controller && !controller.signal.aborted && revision === getSessionRevision()
  const tracking = start || analysisRunning.value
  if (start) {
    analysisRunning.value = true
    analysisError.value = ''
  }

  try {
    const status = await (start ? startAdminCustomerAnalysis : getAdminCustomerAnalysisStatus)(controller.signal)
    if (!valid()) return
    analysisRunning.value = status === 'RUNNING'
    if (analysisRunning.value) {
      analysisTimer = setTimeout(trackAnalysis, 1500)
    } else if (tracking) {
      if (status === 'COMPLETED') retry.value++
      else analysisError.value = '고객 분석을 완료하지 못했습니다. 잠시 후 다시 실행해 주세요.'
    }
  } catch (failure) {
    if (valid()) {
      analysisRunning.value = false
      if (tracking) analysisError.value = failure.message
    }
  } finally {
    if (valid()) analysisController = null
  }
}

watch(shoppingOwner, () => {
  clearAnalysisTracking()
  trackAnalysis()
}, { immediate: true })
</script>

<template>
  <main class="admin-page admin-dashboard-page analytics-page" :aria-busy="loading && !report">
    <AdminPageHeading class="admin-page-heading-sticky"
      title="AI 고객 분석"
      description="고객의 구매 패턴을 분석해 고객 유형과 재구매 흐름을 확인합니다."
    >
      <button
        type="button"
        :disabled="loading || analysisRunning || session.source !== 'api'"
        :aria-busy="analysisRunning"
        @click="trackAnalysis(true)"
      >
        <AdminIcon name="refresh" />{{ analysisRunning ? '고객 분석 중…' : report ? '고객 분석 다시 실행' : '고객 분석 실행' }}
      </button>
    </AdminPageHeading>
    <div class="analytics-content">
      <p v-if="session.source === 'api' && (error || analysisError)" class="analytics-feedback is-error" role="alert">
        {{ error || analysisError }} <button v-if="error" type="button" @click="retry++">다시 조회</button>
      </p>
      <p v-if="session.source !== 'api'" class="analytics-feedback">
        AI 고객 분석은 실제 관리자 계정으로 로그인한 뒤 사용할 수 있습니다.
      </p>
      <p v-else-if="loading && !report" class="analytics-feedback" role="status">
        저장된 고객 분석 결과를 불러오고 있습니다.
      </p>
      <p v-else-if="!report && !error" class="analytics-feedback">
        {{ analysisRunning ? '첫 고객 분석을 진행하고 있습니다.' : '저장된 고객 분석 결과가 없습니다. 고객 분석을 실행해 주세요.' }}
      </p>
      <p v-else-if="report && !hasData" class="analytics-feedback">
        분석할 고객 데이터가 없습니다.
        <time v-if="updatedAt" :datetime="report.analyzed_at">마지막 분석 {{ updatedAt }}</time>
      </p>
      <template v-else-if="hasData">
        <section
          class="analytics-summary"
          aria-labelledby="analytics-summary-title"
        >
          <div class="analytics-section-heading">
            <h2 id="analytics-summary-title">고객 구매 요약</h2>
            <time v-if="updatedAt" :datetime="report.analyzed_at">마지막 분석 {{ updatedAt }}</time>
          </div>
          <dl class="analytics-metrics">
            <div v-for="[label, value, note] in metrics" :key="label">
              <dt>{{ label }}</dt>
              <dd>
                {{ value }}<small>{{ note }}</small>
              </dd>
            </div>
          </dl>
          <p class="analytics-note">
            전체 구매 이력 기준입니다. 최근 구매일·구매 횟수·누적
            구매금액(RFM)으로 고객 유형을 분류합니다.
          </p>
        </section>
        <div class="analytics-main-grid">
          <figure v-if="chartSource('segments')" class="analytics-distribution">
            <figcaption>
              고객 구매 분포<small
                >구매 횟수와 누적 구매금액으로 보는 고객 유형</small
              >
            </figcaption>
            <img
              :src="chartSource('segments')"
              alt="구매 횟수와 누적 구매금액별 고객 분포. 유형별 집계는 옆의 고객 유형 구성에서 확인할 수 있습니다."
              width="990"
              height="550"
              decoding="async"
            />
          </figure>
          <section
            class="analytics-segments"
            aria-labelledby="analytics-segments-title"
          >
            <div class="analytics-section-heading">
              <h2 id="analytics-segments-title">고객 유형 구성</h2>
              <span>총 {{ number(summary.total_members) }}명</span>
            </div>
            <AdminSegmentDonut :segments="report.segments || []" :total="Number(summary.total_members)" />
            <details class="analytics-segment-details">
              <summary>유형별 구매 통계 보기</summary>
              <div
                class="analytics-table-scroll"
                tabindex="-1"
                role="region"
                aria-label="고객 유형별 현황 표"
              >
                <table>
                  <caption class="sr-only">
                    고객 유형별 인원, 평균 구매 횟수, 평균 누적 구매금액과 최근
                    구매 경과일
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">고객 유형</th>
                      <th scope="col" class="numeric">고객 수</th>
                      <th scope="col" class="numeric">평균 구매 횟수</th>
                      <th scope="col" class="numeric">평균 누적 구매금액</th>
                      <th scope="col" class="numeric">최근 구매 경과일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in report.segments" :key="item.segment">
                      <th scope="row">{{ item.segment_name }}</th>
                      <td class="numeric">{{ number(item.members) }}명</td>
                      <td class="numeric">
                        {{
                          item.avg_frequency == null
                            ? '—'
                            : number(item.avg_frequency) + '회'
                        }}
                      </td>
                      <td class="numeric">{{ money(item.avg_monetary) }}</td>
                      <td class="numeric">
                        {{
                          item.avg_recency == null
                            ? '—'
                            : number(item.avg_recency) + '일'
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details class="analytics-rules">
              <summary>고객 유형 분류 기준</summary>
              <dl>
                <div v-for="[label, rule] in segmentRules" :key="label">
                  <dt>{{ label }}</dt>
                  <dd>{{ rule }}</dd>
                </div>
              </dl>
              <p>
                구매 이력이 없는 고객의 경과일은 분석에서 999일로 처리합니다.
              </p>
            </details>
          </section>
        </div>
        <div class="analytics-chart-grid">
          <figure v-if="chartSource('segment_value')">
            <figcaption>고객 유형별 평균 구매금액</figcaption>
            <img
              :src="chartSource('segment_value')"
              alt="고객 유형별 평균 누적 구매금액. 상세 수치는 유형별 구매 통계 보기에서 확인할 수 있습니다."
              width="990"
              height="495"
              decoding="async"
            />
          </figure>
          <figure v-if="chartSource('retention')">
            <figcaption>첫 구매 이후 월별 재구매</figcaption>
            <img
              :src="chartSource('retention')"
              alt="첫 구매 월별 재구매율 히트맵. 상세 수치는 아래의 리텐션 상세 수치에서 확인할 수 있습니다."
              width="990"
              height="495"
              decoding="async"
            />
          </figure>
        </div>
        <section class="analytics-list" aria-labelledby="analytics-customer-list-title" :aria-busy="customerListLoading">
          <div class="analytics-section-heading analytics-list-heading">
            <div class="analytics-list-title">
              <h2 id="analytics-customer-list-title">고객 목록</h2>
              <span v-if="customerList?.available && !customerListLoading" role="status">{{ number(customerList.totalElements) }}명</span>
            </div>
            <div class="analytics-list-filters">
              <label :for="id + '-customer-segment'">
                고객 유형
                <select :id="id + '-customer-segment'" v-model="customerSegment" :disabled="customerList?.available === false">
                  <option value="">전체 유형</option>
                  <option v-for="item in report.segments" :key="item.segment" :value="item.segment">{{ item.segment_name }}</option>
                </select>
              </label>
              <label :for="id + '-customer-purchased'">
                구매 여부
                <select :id="id + '-customer-purchased'" v-model="customerPurchased" :disabled="customerList?.available === false">
                  <option value="">전체</option>
                  <option :value="true">구매 경험 있음</option>
                  <option :value="false">미구매</option>
                </select>
              </label>
              <label :for="id + '-customer-sort'">
                정렬
                <select :id="id + '-customer-sort'" v-model="customerSort" :disabled="customerList?.available === false">
                  <option value="AMOUNT">누적 구매금액순</option>
                  <option value="FREQUENCY">구매 횟수순</option>
                  <option value="JOINED">가입 최신순</option>
                  <option value="INACTIVE">마지막 구매 오래된 순</option>
                </select>
              </label>
            </div>
          </div>
          <p v-if="customerListLoading" class="analytics-empty" role="status">고객 목록을 불러오고 있습니다.</p>
          <p v-else-if="customerListError" class="analytics-feedback is-error" role="alert">
            {{ customerListError }}
            <button type="button" @click="customerListRetry++">다시 조회</button>
          </p>
          <p v-else-if="customerList?.available === false" class="analytics-empty">
            {{ analysisRunning ? '고객 목록을 생성하고 있습니다.' : '고객 분석을 다시 실행하면 전체 고객 목록을 확인할 수 있습니다.' }}
          </p>
          <div
            v-else-if="customerList?.content.length"
            class="analytics-table-scroll analytics-customer-table"
            tabindex="0"
            role="region"
            aria-label="고객 목록 표"
          >
            <table role="table">
              <caption class="sr-only">분석 고객별 유형, 가입일과 구매 현황</caption>
              <colgroup>
                <col class="analytics-column-name" />
                <col class="analytics-column-segment" />
                <col class="analytics-column-joined" />
                <col class="analytics-column-last-order" />
                <col class="analytics-column-frequency" />
                <col class="analytics-column-amount" />
                <col class="analytics-column-average" />
              </colgroup>
              <thead role="rowgroup">
                <tr role="row">
                  <th scope="col" role="columnheader">고객명</th>
                  <th scope="col" role="columnheader">고객 유형</th>
                  <th scope="col" role="columnheader">가입일</th>
                  <th scope="col" role="columnheader">마지막 구매일</th>
                  <th scope="col" role="columnheader" class="numeric">구매 횟수</th>
                  <th scope="col" role="columnheader" class="numeric">누적 구매금액</th>
                  <th scope="col" role="columnheader" class="numeric">주문당 평균금액</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                <tr
                  v-for="item in customerList.content"
                  :key="item.memberId"
                  class="admin-clickable-row analytics-customer-row"
                  role="row"
                  tabindex="0"
                  aria-haspopup="dialog"
                  :aria-label="(item.name || '회원 ' + item.memberId) + ' 회원 상세 보기'"
                  @click="activateAdminRow($event, () => openMember(item.memberId, $event.currentTarget))"
                  @keydown="activateAdminRowKey($event, () => openMember(item.memberId, $event.currentTarget))"
                >
                  <th scope="row" role="rowheader">{{ item.name || '회원 #' + item.memberId }}</th>
                  <td role="cell">
                    <span class="analytics-cell-label" aria-hidden="true">고객 유형</span>
                    <span class="status-pill analytics-customer-segment" :style="customerSegmentBadgeStyles[item.segment]">
                      {{ item.segmentName }}
                    </span>
                  </td>
                  <td role="cell"><span class="analytics-cell-label" aria-hidden="true">가입일</span>{{ customerDate(item.joinedAt) }}</td>
                  <td role="cell"><span class="analytics-cell-label" aria-hidden="true">마지막 구매일</span>{{ item.lastOrderAt ? customerDate(item.lastOrderAt) : '구매 이력 없음' }}</td>
                  <td role="cell" class="numeric"><span class="analytics-cell-label" aria-hidden="true">구매 횟수</span>{{ number(item.frequency) }}회</td>
                  <td role="cell" class="numeric"><span class="analytics-cell-label" aria-hidden="true">누적 구매금액</span>{{ money(item.monetary) }}</td>
                  <td role="cell" class="numeric"><span class="analytics-cell-label" aria-hidden="true">주문당 평균금액</span>{{ money(item.avgOrderValue) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else-if="customerList?.available" class="analytics-empty">조건에 맞는 고객이 없습니다.</p>
          <Pagination
            v-if="customerList?.available"
            :model-value="customerPage + 1"
            :page-count="customerList.totalPages"
            :disabled="customerListLoading"
            label="고객 목록 페이지"
            @update:model-value="customerPage = $event - 1"
          />
        </section>
        <div class="analytics-additional-details" role="group" aria-label="추가 분석">
          <details class="analytics-cohort-details">
            <summary>첫 구매 월별 리텐션 상세 수치</summary>
            <p class="analytics-note">
              첫 구매 월 고객 중 해당 월에 다시 구매한 비율입니다.
            </p>
            <div
              v-if="report.retention.length"
              class="analytics-table-scroll"
              tabindex="-1"
              role="region"
              aria-label="첫 구매 월별 리텐션 표"
            >
              <table>
                <caption class="sr-only">
                  첫 구매 월별로 경과 개월에 따른 재구매율. 미도래 기간은 대시로
                  표시합니다.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">첫 구매 월</th>
                    <th
                      v-for="period in cohortPeriods"
                      :key="period"
                      scope="col"
                      class="numeric"
                    >
                      {{
                        Number(period) === 0 ? '첫 구매 월' : period + '개월 후'
                      }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in report.retention" :key="item.cohort_month">
                    <th scope="row">{{ item.cohort_month }}</th>
                    <td
                      v-for="period in cohortPeriods"
                      :key="period"
                      class="numeric"
                    >
                      {{ percent(item[period]) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="analytics-empty">
              리텐션을 분석할 구매 이력이 없습니다.
            </p>
            <p class="analytics-note">
              —는 아직 도래하지 않은 기간입니다. 0%는 해당 기간에 재구매한 고객이
              없다는 뜻입니다.
            </p>
          </details>
          <details class="analytics-age-details">
            <summary>연령대별 구매 현황</summary>
            <div
              class="analytics-table-scroll"
              tabindex="-1"
              role="region"
              aria-label="연령대별 구매 현황 표"
            >
              <table>
                <caption class="sr-only">연령대별 고객 수와 평균 누적 구매금액</caption>
                <thead>
                  <tr>
                    <th scope="col">연령대</th>
                    <th scope="col" class="numeric">고객 수</th>
                    <th scope="col" class="numeric">평균 누적 구매금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in report.by_age_band" :key="item.age_band">
                    <th scope="row">{{ item.age_band }}</th>
                    <td class="numeric">{{ number(item.members) }}명</td>
                    <td class="numeric">{{ money(item.monetary) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="analytics-note">
              출생 연도 기준이며 정보가 없으면 미상으로 표시합니다. 평균에는 미구매 고객이 포함됩니다.
            </p>
          </details>
        </div>
      </template>
    </div>
    <dialog ref="memberDialog" class="analytics-member-dialog" :aria-labelledby="id + '-member-title'" @close="clearMember" @cancel="memberBusy && $event.preventDefault()">
      <header class="analytics-member-heading"><h2 :id="id + '-member-title'" tabindex="-1" autofocus>회원 상세</h2><button type="button" :disabled="memberBusy" @click="memberDialog.close()"><AdminIcon name="close" />닫기</button></header>
      <p v-if="memberLoading" class="analytics-member-feedback" role="status">회원 정보를 불러오는 중입니다.</p>
      <p v-if="memberError" class="analytics-member-feedback is-error" role="alert">{{ memberError }}<button v-if="!member" type="button" @click="memberRetry++">다시 시도</button></p>
      <p v-if="memberNotice" class="analytics-member-feedback" role="status">{{ memberNotice }}</p>
      <AdminMemberDetail v-if="member" :member="member" :busy="memberBusy" @toggle-status="toggleMemberStatus" />
    </dialog>
  </main>
</template>

<style scoped src="../styles/admin-customer-analytics.css"></style>
