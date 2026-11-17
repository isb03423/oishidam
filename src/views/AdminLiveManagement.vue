<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import AdminStockHistory from '../components/admin/AdminStockHistory.vue'
import AdminProductImages from '../components/admin/AdminProductImages.vue'
import AdminCategoryTree from '../components/admin/AdminCategoryTree.vue'
import { buildCategoryTree, filterCategoryTree, categoryParentOptions, findCategoryNode } from '../utils/categoryTree.js'
import * as api from '../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'
import { nextOrderStatus, orderLabel, orderStatuses, saleStatuses, statusCode } from '../utils/adminStatus.js'

const props = defineProps({ section: { type: String, required: true }, title: { type: String, required: true } })
const route = useRoute()
const list = ref([])
const categories = ref([])
const total = ref(0)
const pages = ref(0)
const page = ref(0)
const query = ref('')
const keyword = ref('')
const status = ref('')
const from = ref('')
const to = ref('')
const productId = ref('')
const reload = ref(0)
const loading = ref(false)
const loadError = ref('')
const notice = ref('')
const busy = ref(false)
const detailLoading = ref(false)
const selected = ref(null)
const editing = ref(null)
const note = ref('')
const targetStatus = ref('')
const deletion = ref(null)
const detailPanel = ref(null)
const collapsedCategories = ref(new Set())
const categoryTree = computed(() => buildCategoryTree(categories.value))
const filteredCategoryTree = computed(() => filterCategoryTree(categoryTree.value, keyword.value))
const parentOptions = computed(() => categoryParentOptions(categoryTree.value, editing.value?.categoryId))
const allCategoriesExpanded = computed(() => categories.value.filter((node) => categories.value.some((child) => child.parentId === node.categoryId)).every((node) => !collapsedCategories.value.has(node.categoryId)))
let detailController
let generation = 0
let detailVersion = 0
let disposed = false
const stamp = (value) => value?.replace('T', ' ').slice(0, 16) ?? '—'
const won = (amount) => new Intl.NumberFormat('ko-KR').format(amount ?? 0) + '원'
const categoryName = (id) => categories.value.find((item) => item.categoryId === id)?.name ?? '—'
const rowId = (row) => row[({ products: 'productId', categories: 'categoryId', orders: 'orderId', members: 'memberId', inquiries: 'inquiryId', reviews: 'reviewId' })[props.section]]
const headings = { products: ['상품명', '카테고리', '가격', '재고', '판매 상태'], categories: ['카테고리명', '상위 카테고리', '순서', '상태'], orders: ['주문번호', '주문일', '주문자', '금액', '상태'], members: ['이름', '이메일', '가입일', '권한', '상태'], inquiries: ['문의 제목', '작성자', '작성일', '상태'], reviews: ['상품 ID', '작성자', '후기', '작성일', '관리자 답변'] }
const rows = computed(() => props.section === 'categories' ? list.value.filter((row) => row.name.toLowerCase().includes(keyword.value.toLowerCase())) : list.value)
const selectedId = computed(() => selected.value == null ? null : props.section === 'products' ? selected.value.product.productId : props.section === 'orders' ? selected.value.order.orderId : rowId(selected.value))
const nextStatus = computed(() => nextOrderStatus(selected.value?.order?.orderStatus))
const currentProductStatus = computed(() => statusCode(selected.value?.product?.saleStatus, saleStatuses))
const statusOptions = computed(() => props.section === 'orders' ? orderStatuses : props.section === 'members' ? [['true', '활성'], ['false', '비활성']] : [])

function cells(row) {
  switch (props.section) {
    case 'products': return [row.name, categoryName(row.categoryId), won(row.price), row.stockQuantity, saleStatuses.find(([code, label]) => code === row.saleStatus || label === row.saleStatus)?.[1] ?? row.saleStatus]
    case 'categories': return [row.name, row.parentId == null ? '최상위' : categoryName(row.parentId), row.sortOrder, row.isActive ? '사용' : '숨김']
    case 'orders': return [row.orderNumber, stamp(row.createdAt), row.memberName || '이름 확인 중', won(row.totalAmount), orderLabel(row.orderStatus)]
    case 'members': return [row.name, row.email ?? '—', stamp(row.createdAt), row.role === 'ADMIN' ? '관리자' : '회원', row.isActive ? '활성' : '비활성']
    case 'reviews': return [row.productId, row.memberName || '이름 확인 중', row.content, stamp(row.createdAt), row.answerContent || '답변 대기']
    default: return []
  }
}

function closeDetail() {
  detailController?.abort()
  detailVersion++
  selected.value = editing.value = null
  detailLoading.value = false
  note.value = targetStatus.value = ''
}

watch([() => props.section, shoppingOwner], () => {
  generation++
  closeDetail()
  list.value = []
  categories.value = []
  query.value = keyword.value = status.value = from.value = to.value = productId.value = notice.value = ''
  page.value = 0
  total.value = pages.value = 0
  busy.value = false
  collapsedCategories.value = new Set()
}, { immediate: true })

watch([() => props.section, shoppingOwner, page, () => props.section === 'categories' ? '' : keyword.value, status, from, to, productId, reload], async (_, __, onCleanup) => {
  const controller = new AbortController()
  const revision = getSessionRevision()
  const section = props.section
  const current = generation
  onCleanup(() => controller.abort())
  loading.value = true
  loadError.value = ''
  list.value = []
  try {
    if (session.source !== 'api' || session.member?.role !== 'ADMIN') return
    const params = { page: page.value, size: 20, keyword: keyword.value || undefined }
    if (section === 'orders') Object.assign(params, { orderStatus: status.value || undefined, from: from.value || undefined, to: to.value || undefined })
    if (section === 'members' && status.value) params.isActive = status.value === 'true'
    if (section === 'reviews') params.productId = productId.value || undefined
    const [result, categoryList] = await Promise.all([
      section === 'categories' ? api.getAdminCategories(controller.signal) : api.getAdminList(section, params, controller.signal),
      section === 'products' ? api.getAdminCategories(controller.signal) : Promise.resolve([]),
    ])
    if (controller.signal.aborted || revision !== getSessionRevision() || current !== generation) return
    if (section === 'categories') { list.value = categories.value = result; total.value = result.length; pages.value = 1 }
    else {
      if (page.value > 0 && page.value >= result.totalPages) { page.value = Math.max(0, result.totalPages - 1); return }
      list.value = result.content
      total.value = result.totalElements
      pages.value = result.totalPages
      categories.value = categoryList
    }
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) { loadError.value = failure.message; notice.value = failure.message }
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false
  }
}, { immediate: true })

function search() { keyword.value = query.value.trim(); page.value = 0; if (props.section !== 'categories') reload.value++ }
function applyFilter() { page.value = 0 }

async function open(id) {
  if (busy.value) return
  closeDetail()
  if (props.section === 'categories') {
    selected.value = list.value.find((row) => String(row.categoryId) === String(id))
    if (selected.value) { editing.value = { ...selected.value }; showCategoryEditor() }
    return
  }
  detailController = new AbortController()
  const signal = detailController.signal
  const revision = getSessionRevision()
  const current = ++detailVersion
  detailLoading.value = true
  try {
    const data = await api.getAdminDetail(props.section, id, signal)
    if (signal.aborted || revision !== getSessionRevision() || current !== detailVersion) return
    selected.value = data
    if (props.section === 'products') { editing.value = { ...data.product }; targetStatus.value = statusCode(data.product.saleStatus, saleStatuses) }
    if (props.section === 'members') targetStatus.value = String(data.isActive)
  } catch (failure) { if (!signal.aborted && revision === getSessionRevision()) notice.value = failure.message }
  finally { if (!signal.aborted && revision === getSessionRevision()) detailLoading.value = false }
}

watch([() => route.query.id, () => props.section], ([id]) => { if (typeof id === 'string' && /^\d+$/.test(id)) open(id) }, { immediate: true })

function create(parent = null) {
  if (busy.value) return
  if (parent && parent.depth >= 2) { notice.value = '카테고리는 상·중 2단계까지만 등록할 수 있어요.'; return }
  closeDetail()
  editing.value = props.section === 'products'
    ? { categoryId: '', name: '', description: '', brand: '', price: 0, stockQuantity: 0 }
    : { parentId: parent?.categoryId ?? null, name: '', sortOrder: Math.min(2147483647, Math.max(-1, ...categories.value.filter((node) => node.parentId === (parent?.categoryId ?? null)).map((node) => node.sortOrder)) + 1), isActive: true }
  if (parent) collapsedCategories.value.delete(parent.categoryId)
  if (props.section === 'categories') showCategoryEditor()
}

async function showCategoryEditor() {
  await nextTick()
  if (window.matchMedia('(max-width: 1100px)').matches) detailPanel.value?.scrollIntoView({ block: 'start', behavior: 'instant' })
  detailPanel.value?.querySelector('input')?.focus({ preventScroll: true })
}

async function mutate(action, { refreshDetail = true, done } = {}) {
  if (busy.value) return
  const revision = getSessionRevision()
  const current = generation
  const id = selectedId.value
  const section = props.section
  busy.value = true
  const valid = () => !disposed && revision === getSessionRevision() && current === generation
  try {
    const result = await action()
    if (!valid()) return
    done?.(result)
    if (refreshDetail && id != null) {
      const detail = section === 'categories' ? result : await api.getAdminDetail(section, id)
      if (!valid()) return
      selected.value = detail
      if (section === 'products') { editing.value = { ...detail.product }; targetStatus.value = statusCode(detail.product.saleStatus, saleStatuses) }
      if (section === 'categories') editing.value = { ...detail }
    }
    reload.value++
    notice.value = '저장했습니다.'
  } catch (failure) {
    if (valid()) {
      notice.value = failure.message
      if (failure.code === 'STOCK_CHANGED' && section === 'products' && id != null) {
        try {
          const detail = await api.getAdminDetail(section, id)
          if (valid()) { selected.value = detail; editing.value = { ...detail.product }; reload.value++ }
        } catch { /* 원래 저장 오류를 유지하고 상세 재조회를 허용한다. */ }
      }
    }
  }
  finally { if (valid()) busy.value = false }
}

function save() {
  const draft = editing.value
  if (!draft || !draft.name.trim()) return
  if (props.section === 'categories') {
    if (draft.parentId != null && !parentOptions.value.some((option) => option.categoryId === draft.parentId)) { notice.value = '상위 분류를 확인해 주세요. 카테고리는 상·중 2단계까지만 등록할 수 있어요.'; return }
    const data = { parentId: draft.parentId, name: draft.name.trim(), sortOrder: draft.sortOrder, isActive: draft.isActive }
    mutate(() => draft.categoryId == null ? api.createAdminCategory(data) : api.updateAdminCategory(draft.categoryId, data), { refreshDetail: draft.categoryId != null, done: (result) => { selected.value = result; editing.value = { ...result } } })
  } else {
    if (!draft.description.trim() || !draft.categoryId || !Number.isSafeInteger(draft.price) || draft.price < 0 || !Number.isSafeInteger(draft.stockQuantity) || draft.stockQuantity < 0 || draft.stockQuantity > 2147483647) { notice.value = '상품의 필수 정보, 가격과 재고 수량을 확인해 주세요.'; return }
    const data = { categoryId: draft.categoryId, name: draft.name.trim(), description: draft.description.trim(), brand: draft.brand?.trim() || null, price: draft.price, stockQuantity: draft.stockQuantity }
    if (draft.productId != null) data.expectedStockQuantity = selected.value.product.stockQuantity
    mutate(() => draft.productId == null ? api.createAdminProduct(data) : api.updateAdminProduct(draft.productId, data), { refreshDetail: draft.productId != null, done: (result) => { if (draft.productId == null) { selected.value = result; editing.value = { ...result.product }; targetStatus.value = statusCode(result.product.saleStatus, saleStatuses) } } })
  }
}

function remove([id]) {
  mutate(() => props.section === 'products' ? api.deleteAdminProduct(id) : api.deleteAdminCategory(id), { refreshDetail: false, done: closeDetail })
}

onBeforeUnmount(() => { disposed = true; detailController?.abort(); generation++ })
</script>

<template>
  <main class="management" :class="{ 'category-management': section === 'categories', 'has-category-editor': section === 'categories' && editing }">
    <header class="management-heading"><h1>{{ title }}</h1><p>{{ ({ categories: '상품 분류와 노출 순서를 관리하세요.', products: '상품 정보, 재고 수량과 판매 상태를 한곳에서 관리하세요.', orders: '주문 내역을 확인하고 배송을 진행하세요.', members: '회원 정보와 이용 상태를 확인하세요.', reviews: '고객의 후기를 확인하고 답변을 남겨 주세요.' })[section] }}</p></header>
    <section class="card list-card">
      <div v-if="section === 'categories'" class="category-panel-heading"><div><span class="category-eyebrow">상품 분류</span><h2>카테고리 구조</h2></div><span class="category-total">{{ total }}개</span></div>
      <form class="toolbar" @submit.prevent="search">
        <p v-if="section !== 'categories'" class="list-total">전체 <strong>{{ total }}</strong>건</p>
        <div class="actions"><input v-model="query" type="search" maxlength="100" aria-label="목록 검색" :placeholder="section === 'orders' ? '주문번호·수령인 검색' : section === 'reviews' ? '후기 내용 검색' : '목록 검색'" /><button type="submit" :disabled="loading">검색</button>
          <button v-if="section === 'products' || section === 'categories'" type="button" :disabled="busy || loading" @click="create()">{{ section === 'products' ? '상품 등록' : '최상위 등록' }}</button></div>
      </form>
      <div v-if="statusOptions.length || section === 'reviews'" class="actions list-filters">
        <select v-if="statusOptions.length" v-model="status" aria-label="상태 필터" @change="applyFilter"><option value="">전체 상태</option><option v-for="[value, label] in statusOptions" :key="value" :value="value">{{ label }}</option></select>
        <template v-if="section === 'orders'"><label>시작일 <input v-model="from" type="date" @change="applyFilter" /></label><label>종료일 <input v-model="to" type="date" @change="applyFilter" /></label></template>
        <label v-if="section === 'reviews'">상품 ID <input v-model="productId" type="number" min="1" step="1" @change="applyFilter" /></label>
      </div>
      <p v-if="loading" role="status">데이터를 불러오는 중이에요.</p>
      <p v-if="loadError">{{ loadError }} <button type="button" @click="reload++">다시 시도</button></p>
      <template v-if="section === 'categories' && categories.length">
        <div class="category-tree-toolbar"><p>{{ keyword ? '검색 결과 · 상위 경로 포함' : '표시 순서대로 정렬됩니다.' }}</p><button type="button" :disabled="!!keyword" :aria-expanded="allCategoriesExpanded" @click="collapsedCategories = allCategoriesExpanded ? new Set(categories.map((node) => node.categoryId)) : new Set()">{{ allCategoriesExpanded ? '전체 접기' : '전체 펼치기' }}</button></div>
        <AdminCategoryTree v-if="filteredCategoryTree.length" :nodes="filteredCategoryTree" :collapsed="collapsedCategories" :selected-id="selectedId" :searching="!!keyword" :disabled="busy || detailLoading" @select="open" @add="create" @toggle="(id, closed) => closed ? collapsedCategories.add(id) : collapsedCategories.delete(id)" />
        <p v-else class="empty">검색 결과가 없어요.</p>
      </template>
      <div v-else-if="section !== 'categories' && rows.length" class="scroll" tabindex="0" role="region" :aria-label="title + ' 목록'"><table class="data-table">
        <thead><tr><th v-for="heading in headings[section]" :key="heading" scope="col">{{ heading }}</th><th scope="col">관리</th></tr></thead>
        <tbody><tr v-for="row in rows" :key="rowId(row)"><td v-for="(cell, index) in cells(row)" :key="index" :data-label="headings[section][index]" :class="{ 'nowrap': ['주문번호', '주문일', '가입일', '작성일', '가격', '금액'].includes(headings[section][index]) }"><span :class="{ 'status-pill': ['상태', '판매 상태', '권한'].includes(headings[section][index]) }">{{ cell }}</span></td><td data-label="관리" class="row-action"><button type="button" :disabled="busy || detailLoading" @click="open(rowId(row))">{{ section === 'categories' ? '편집' : '상세·관리' }}</button></td></tr></tbody>
      </table></div>
      <p v-else-if="!loading && !loadError" class="empty">검색 결과가 없어요.</p>
      <Pagination v-if="section !== 'categories'" :model-value="page + 1" :page-count="pages" :disabled="loading" label="관리 목록 페이지" @update:model-value="page = $event - 1" />
    </section>
    <section v-if="section === 'categories' && !editing" class="card category-placeholder"><span class="category-eyebrow">카테고리 상세</span><h2>분류를 선택해 주세요.</h2><p>목록의 편집 버튼을 누르면 이름, 상위 분류와 표시 순서를 변경할 수 있어요.</p><div class="category-placeholder-hint"><strong>새로운 분류를 추가하려면</strong><p>분류 옆의 + 버튼으로 하위 카테고리를 추가하세요.</p></div><button type="button" :disabled="loading || busy" @click="create()">최상위 카테고리 등록</button></section>
    <p v-if="detailLoading" class="card" role="status">상세 정보를 불러오는 중이에요.</p>
    <section v-if="selected || editing" ref="detailPanel" class="card detail-card" aria-label="상세 관리">
      <div class="toolbar"><div><span v-if="section === 'categories'" class="category-eyebrow">{{ selected ? '카테고리 편집' : '새 카테고리' }}</span><h2>{{ section === 'products' ? (selected ? '상품 편집' : '상품 등록') : section === 'categories' ? (selected ? selected.name : editing.parentId ? '하위 카테고리 추가' : '최상위 카테고리 추가') : '상세 정보' }}</h2></div><button type="button" :disabled="busy" @click="closeDetail">닫기</button></div>
      <form v-if="editing" class="editor" @submit.prevent="save">
        <label>이름 <input v-model="editing.name" :maxlength="section === 'products' ? 200 : 100" required :disabled="busy" /></label>
        <template v-if="section === 'categories'">
          <label>상위 카테고리 <select v-model="editing.parentId" aria-label="상위 카테고리" :disabled="busy"><option :value="null">최상위</option><option v-for="category in parentOptions" :key="category.categoryId" :value="category.categoryId">{{ category.label }}</option></select></label>
          <p class="meta">{{ ['상분류', '중분류'][(findCategoryNode(categoryTree, editing.parentId)?.depth ?? 0)] }} · 상·중 2단계까지 등록할 수 있어요.</p>
          <label>표시 순서 <input v-model.number="editing.sortOrder" type="number" min="0" max="2147483647" step="1" required :disabled="busy" /></label>
          <label class="check"><input v-model="editing.isActive" type="checkbox" :disabled="busy" /> 사용</label>
        </template>
        <template v-else>
          <label>카테고리 <select v-model="editing.categoryId" required :disabled="busy"><option disabled value="">선택해 주세요</option><option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">{{ category.name }}{{ category.isActive ? '' : ' (숨김)' }}</option></select></label>
          <label>상품 설명 <textarea v-model="editing.description" required :disabled="busy"></textarea></label>
          <label>브랜드 <input v-model="editing.brand" maxlength="100" :disabled="busy" /></label>
          <label>가격 <input v-model.number="editing.price" type="number" min="0" max="99999999999999" step="1" required :disabled="busy" /></label>
          <label>재고 수량 <input v-model.number="editing.stockQuantity" type="number" min="0" max="2147483647" step="1" required :disabled="busy" /></label>
        </template>
        <div class="actions"><button type="submit" :disabled="busy">{{ busy ? '저장 중…' : '저장' }}</button><button v-if="selected" type="button" :disabled="busy" @click="deletion.open([selectedId])">삭제</button></div>
      </form>
      <template v-if="section === 'products' && selected">
        <form class="editor" @submit.prevent="mutate(() => api.setAdminProductStatus(selectedId, targetStatus))"><label>판매 상태 <select v-model="targetStatus" :disabled="busy"><option v-for="[value, label] in saleStatuses" :key="value" :value="value">{{ label }}</option></select></label><button type="submit" :disabled="busy || targetStatus === currentProductStatus">판매 상태 변경</button></form>
        <AdminStockHistory :key="selectedId" :product-id="selectedId" :stock-quantity="selected.product.stockQuantity" />
        <AdminProductImages :key="selectedId" :product-id="selectedId" :disabled="busy" @busy="busy = $event" />
      </template>
      <template v-if="section === 'orders' && selected">
        <dl class="detail-grid"><div><dt>주문번호</dt><dd>{{ selected.order.orderNumber }}</dd></div><div><dt>주문자</dt><dd>{{ selected.memberName || '이름 확인 중' }}</dd></div><div><dt>현재 상태</dt><dd>{{ orderLabel(selected.order.orderStatus) }}</dd></div><div><dt>결제 금액</dt><dd>{{ won(selected.order.totalAmount) }}</dd></div><div><dt>결제일</dt><dd>{{ stamp(selected.order.paidAt) }}</dd></div>
          <div><dt>수령인</dt><dd>{{ selected.order.recipient.recipientName }} / {{ selected.order.recipient.recipientPhone }}</dd></div><div><dt>배송지</dt><dd>({{ selected.order.recipient.postalCode }}) {{ selected.order.recipient.addressLine1 }} {{ selected.order.recipient.addressLine2 }}</dd></div><div><dt>통관번호</dt><dd>{{ selected.order.recipient.customsCode || '—' }}</dd></div><div><dt>배송 요청</dt><dd>{{ selected.order.recipient.deliveryMemo || '—' }}</dd></div></dl>
        <div class="scroll" tabindex="0" role="region" aria-label="주문 상품"><table><thead><tr><th>상품</th><th>수량</th><th>단가</th></tr></thead><tbody><tr v-for="item in selected.order.items" :key="item.orderItemId"><td>{{ item.productName }}</td><td>{{ item.quantity }}</td><td>{{ won(item.unitPrice) }}</td></tr></tbody></table></div>
        <form v-if="nextStatus" class="editor" @submit.prevent="mutate(() => api.setAdminOrderStatus(selectedId, nextStatus, note))"><p>{{ orderLabel(selected.order.orderStatus) }} → {{ orderLabel(nextStatus) }}</p><label>처리 메모 <input v-model="note" maxlength="255" :disabled="busy" /></label><button type="submit" :disabled="busy">{{ orderLabel(nextStatus) }}으로 변경</button></form>
        <h3>상태 변경 이력</h3><ul><li v-for="history in selected.statusHistories" :key="history.historyId" class="message">{{ stamp(history.createdAt) }} · {{ orderLabel(history.newStatus) }}<p v-if="history.note" class="copy">{{ history.note }}</p></li></ul>
      </template>
      <template v-if="section === 'members' && selected">
        <dl class="detail-grid"><div><dt>이름</dt><dd>{{ selected.name }}</dd></div><div><dt>이메일</dt><dd>{{ selected.email || '—' }}</dd></div><div><dt>전화번호</dt><dd>{{ selected.phone || '—' }}</dd></div><div><dt>출생연도</dt><dd>{{ selected.birthYear || '—' }}</dd></div><div><dt>성별</dt><dd>{{ ({ M: '남성', F: '여성' })[selected.gender] || selected.gender || '—' }}</dd></div><div><dt>가입일</dt><dd>{{ stamp(selected.createdAt) }}</dd></div></dl>
        <form class="editor" @submit.prevent="mutate(() => api.setAdminMemberStatus(selectedId, targetStatus === 'true'))"><label>이용 상태 <select v-model="targetStatus" :disabled="busy"><option value="true">활성</option><option value="false">비활성</option></select></label><p class="meta">상태 변경 시 해당 회원의 기존 로그인은 해제됩니다.</p><button type="submit" :disabled="busy || targetStatus === String(selected.isActive)">이용 상태 변경</button></form>
      </template>

    </section>
    <DeleteConfirmationDialog ref="deletion" :description="section === 'products' ? '상품을 삭제합니다. 기존 주문 내역은 유지됩니다.' : '카테고리를 삭제합니다. 하위 분류나 연결된 상품이 있으면 삭제되지 않습니다.'" @confirm="remove" />
    <AlertDialog :message="notice" @close="notice = ''" />
  </main>
</template>

<style scoped src="../styles/admin-management.css"></style>
