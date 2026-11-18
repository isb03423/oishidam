<script setup>
import { activateAdminRow, activateAdminRowKey } from '../utils/adminRow.js'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AlertDialog from '../components/common/AlertDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import DeleteConfirmationDialog from '../components/admin/AdminDeleteDialog.vue'
import AdminNotice from '../components/admin/AdminNotice.vue'
import AdminOrderDialog from '../components/admin/AdminOrderDialog.vue'
import AdminMemberDetail from '../components/admin/AdminMemberDetail.vue'
import AdminStockHistory from '../components/admin/AdminStockHistory.vue'
import AdminProductImages from '../components/admin/AdminProductImages.vue'
import AdminCategoryTree from '../components/admin/AdminCategoryTree.vue'
import AdminPageHeading from '../components/admin/AdminPageHeading.vue'
import AdminListPanel from '../components/admin/AdminListPanel.vue'
import AdminIcon from '../components/admin/AdminIcon.vue'
import { adminStatusTone } from '../utils/adminPresentation.js'
import { buildCategoryTree, filterCategoryTree, categoryParentOptions, findCategoryNode } from '../utils/categoryTree.js'
import * as api from '../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'
import { orderLabel, orderStatuses, saleStatuses, statusCode } from '../utils/adminStatus.js'

const props = defineProps({ section: { type: String, required: true }, title: { type: String, required: true } })
const route = useRoute()
const list = ref([])
const categories = ref([])
const total = ref(0)
const pages = ref(0)
const page = ref(0)
const query = ref('')
const keyword = ref('')
const status = ref(props.section === 'members' ? 'true' : '')
const from = ref('')
const to = ref('')
const productId = ref('')
const reload = ref(0)
const loading = ref(false)
const loadError = ref('')
const notice = ref('')
const successNotice = ref('')
const busy = ref(false)
const detailLoading = ref(false)
const selected = ref(null)
const editing = ref(null)
const note = ref('')
const targetStatus = ref('')
const deletion = ref(null)
const detailPanel = ref(null)
const orderDialog = ref(null)
const categoryTree = computed(() => buildCategoryTree(categories.value))
const filteredCategoryTree = computed(() => filterCategoryTree(categoryTree.value, keyword.value))
const parentOptions = computed(() => categoryParentOptions(categoryTree.value, editing.value?.categoryId))
let detailController
let generation = 0
let detailVersion = 0
let disposed = false
const stamp = (value) => value?.replace('T', ' ').slice(0, 16) ?? '—'
const won = (amount) => new Intl.NumberFormat('ko-KR').format(amount ?? 0) + '원'
const categoryName = (id) => categories.value.find((item) => item.categoryId === id)?.name ?? '—'
const rowId = (row) => row[({ products: 'productId', categories: 'categoryId', orders: 'orderId', members: 'memberId', inquiries: 'inquiryId', reviews: 'reviewId' })[props.section]]
const headings = { products: ['상품명', '카테고리', '가격', '재고', '판매 상태'], categories: ['카테고리명', '상위 카테고리', '순서', '상태'], orders: ['주문번호', '주문일', '주문자', '금액', '상태'], members: ['이름', '이메일', '권한', '상태', '가입일'], inquiries: ['문의 제목', '작성자', '작성일', '상태'], reviews: ['상품 ID', '작성자', '후기', '작성일', '관리자 답변'] }
const rows = computed(() => props.section === 'categories' ? list.value.filter((row) => row.name.toLowerCase().includes(keyword.value.toLowerCase())) : list.value)
const selectedId = computed(() => selected.value == null ? null : props.section === 'products' ? selected.value.product.productId : props.section === 'orders' ? selected.value.order.orderId : rowId(selected.value))
const currentProductStatus = computed(() => statusCode(selected.value?.product?.saleStatus, saleStatuses))
const statusOptions = computed(() => props.section === 'orders' ? orderStatuses : props.section === 'members' ? [['true', '활성화'], ['false', '비활성화']] : [])
const descriptions = { categories: '상품의 분류 체계와 노출 순서를 관리하세요.', products: '상품 정보부터 재고와 판매 상태까지 한곳에서 관리하세요.', orders: '주문과 결제 내역을 확인하고 배송 상태를 처리하세요.', members: '회원 정보와 계정 이용 상태를 확인하세요.' }
const searchLabels = { categories: '카테고리명', products: '상품명', orders: '주문번호·수령인', members: '회원명·이메일' }
const hasDetail = computed(() => Boolean(selected.value || editing.value))
const productPanel = ref('info')
let detailOpener
watch(hasDetail, async (visible) => {
  if (!visible) return
  detailOpener = document.activeElement
  productPanel.value = 'info'
  await nextTick()
  if (!detailPanel.value?.open) detailPanel.value?.showModal()
  detailPanel.value?.querySelector('h2')?.focus()
})
function dismissDetail() { closeDetail(); detailOpener?.isConnected && detailOpener.focus() }
async function focusStock() { productPanel.value = 'info'; await nextTick(); document.getElementById('admin-edit-stock')?.focus() }

function cells(row) {
  switch (props.section) {
    case 'products': return [row.name, categoryName(row.categoryId), won(row.price), row.stockQuantity, saleStatuses.find(([code, label]) => code === row.saleStatus || label === row.saleStatus)?.[1] ?? row.saleStatus]
    case 'categories': return [row.name, row.parentId == null ? '최상위' : categoryName(row.parentId), row.sortOrder, row.isActive ? '사용' : '숨김']
    case 'orders': return [row.orderNumber, stamp(row.createdAt), row.memberName || '이름 확인 중', won(row.totalAmount), orderLabel(row.orderStatus)]
    case 'members': return [row.name, row.email ?? '—', row.role === 'ADMIN' ? '관리자' : '회원', row.isActive ? '활성' : '비활성', stamp(row.createdAt)]
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
  query.value = keyword.value = from.value = to.value = productId.value = notice.value = ''
  successNotice.value = ''
  status.value = props.section === 'members' ? 'true' : ''
  page.value = 0
  total.value = pages.value = 0
  busy.value = false
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
    const params = { page: page.value, size: 10, keyword: keyword.value || undefined }
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
  if (props.section === 'orders') { await nextTick(); orderDialog.value?.open(id); return }
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
  } catch (failure) { if (!signal.aborted && revision === getSessionRevision()) notice.value = failure.message }
  finally { if (!signal.aborted && revision === getSessionRevision()) detailLoading.value = false }
}

watch([() => route.query.id, () => props.section], ([id]) => { if (typeof id === 'string' && /^\d+$/.test(id)) open(id) }, { immediate: true })

function create(parent = null) {
  if (busy.value) return
  if (parent && parent.depth >= 2) { notice.value = '카테고리는 상·중 2단계까지만 등록할 수 있어요.'; return }
  closeDetail()
  editing.value = props.section === 'products'
    ? { categoryId: '', name: '', description: '', price: 0, stockQuantity: 0 }
    : { parentId: parent?.categoryId ?? null, name: '', sortOrder: Math.min(2147483647, Math.max(-1, ...categories.value.filter((node) => node.parentId === (parent?.categoryId ?? null)).map((node) => node.sortOrder)) + 1), isActive: true }
  if (props.section === 'categories') showCategoryEditor()
}

async function showCategoryEditor() {
  await nextTick()
  if (detailPanel.value && !detailPanel.value.open) detailPanel.value.showModal()
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
    const data = { categoryId: draft.categoryId, name: draft.name.trim(), description: draft.description.trim(), price: draft.price, stockQuantity: draft.stockQuantity }
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
  <main class="admin-page management" :class="{ 'category-management': section === 'categories' }">
    <AdminPageHeading :title="title" :description="descriptions[section]">
      <button v-if="section === 'products' || section === 'categories'" class="admin-primary" type="button" :disabled="busy || loading" @click="create()"><AdminIcon name="plus" />{{ section === 'products' ? '상품 등록' : '카테고리 등록' }}</button>
    </AdminPageHeading>
    <AdminNotice :message="successNotice" @close="successNotice = ''" />
    <AdminListPanel :total="total" :title="section === 'categories' ? '카테고리 구조' : '전체'" :unit="section === 'categories' ? '개' : '건'" :loading="loading" :aria-label="title + ' 목록'">
      <template #filters>
      <form class="admin-search-bar" role="search" @submit.prevent="search">
        <label v-if="statusOptions.length" class="member-status-filter" :for="section === 'members' ? 'admin-member-status-filter' : 'admin-status-filter'"><span>{{ section === 'orders' ? '주문 상태' : '이용 상태' }}</span><select :id="section === 'members' ? 'admin-member-status-filter' : 'admin-status-filter'" v-model="status" @change="applyFilter"><option value="">전체</option><option v-for="[value, label] in statusOptions" :key="value" :value="value">{{ label }}</option></select></label>
        <template v-if="section === 'orders'"><label class="search-date" for="admin-date-from"><span>시작일</span><input id="admin-date-from" v-model="from" type="date" @change="applyFilter" /></label><span class="date-separator" aria-hidden="true">—</span><label class="search-date" for="admin-date-to"><span>종료일</span><input id="admin-date-to" v-model="to" type="date" @change="applyFilter" /></label></template>
        <label class="search-field" :for="'admin-search-' + section"><span>{{ searchLabels[section] || '검색어' }}</span><input :id="'admin-search-' + section" v-model="query" type="search" maxlength="100" :placeholder="`${searchLabels[section] || '검색어'} 입력`" /></label>
        <button type="submit" :disabled="loading"><AdminIcon name="search" />검색</button>
      </form>
      </template>
      <template #actions><p v-if="keyword">‘{{ keyword }}’ 검색 결과</p><p v-else-if="section !== 'categories'">최근 등록순</p></template>
      <p v-if="loading" class="admin-list-feedback" role="status">데이터를 불러오는 중입니다.</p>
      <p v-if="loadError" class="admin-list-feedback" role="alert">{{ loadError }} <button type="button" @click="reload++">다시 시도</button></p>
      <template v-if="section === 'categories' && categories.length">
        <AdminCategoryTree v-if="filteredCategoryTree.length" :nodes="filteredCategoryTree" :selected-id="selectedId" :disabled="busy || detailLoading" @select="open" @add="create" />
        <p v-else class="empty">검색 결과가 없어요.</p>
      </template>
      <div v-else-if="section !== 'categories' && rows.length" class="admin-list-scroll" tabindex="-1" role="region" :aria-label="title + ' 목록'"><table class="admin-list-table data-table">
        <caption class="sr-only">{{ title }} 목록</caption><thead><tr><th v-for="heading in headings[section]" :key="heading" scope="col" :class="{ numeric: ['가격', '재고', '금액'].includes(heading), 'status-cell': ['상태', '판매 상태', '권한'].includes(heading) }">{{ heading }}</th></tr></thead>
        <tbody><tr v-for="row in rows" :key="rowId(row)" class="admin-clickable-row" tabindex="0" aria-haspopup="dialog" :aria-label="`${row.name || row.orderNumber || rowId(row)} 상세 보기`" @keydown="!busy && !detailLoading && activateAdminRowKey($event, () => open(rowId(row)))" @click="!busy && !detailLoading && activateAdminRow($event, () => open(rowId(row)))" :class="{ 'is-selected': selectedId === rowId(row) }"><td v-for="(cell, index) in cells(row)" :key="index" :data-label="headings[section][index]" :class="{ 'nowrap': ['주문번호', '주문일', '가입일', '작성일'].includes(headings[section][index]), numeric: ['가격', '재고', '금액'].includes(headings[section][index]), 'status-cell': ['상태', '판매 상태', '권한'].includes(headings[section][index]) }"><span :class="{ 'status-pill': ['상태', '판매 상태', '권한'].includes(headings[section][index]) }" :data-tone="adminStatusTone(cell)">{{ cell }}</span></td></tr></tbody>
      </table></div>
      <p v-else-if="!loading && !loadError" class="empty">{{ keyword || status || from || to ? '검색 조건에 맞는 결과가 없습니다. 검색어나 필터를 변경해 주세요.' : '아직 등록된 내역이 없습니다.' }}</p>
      <template v-if="section !== 'categories'" #footer>
        <Pagination :model-value="page + 1" :page-count="pages" :disabled="loading" label="관리 목록 페이지" @update:model-value="page = $event - 1" />
      </template>
    </AdminListPanel>
    <p v-if="detailLoading" class="admin-feedback" role="status">상세 정보를 불러오는 중입니다.</p>
    <dialog v-if="selected || editing" ref="detailPanel" class="detail-card admin-detail-dialog" :class="{ 'is-member-dialog': section === 'members' }" aria-labelledby="admin-detail-heading" @cancel.prevent="!busy && dismissDetail()">
      <div class="toolbar detail-heading"><div><h2 id="admin-detail-heading" tabindex="-1">{{ section === 'products' ? (selected ? '상품 편집' : '상품 등록') : section === 'categories' ? (selected ? selected.name : editing.parentId ? '하위 카테고리 추가' : '최상위 카테고리 추가') : section === 'orders' ? '주문 상세' : '회원 상세' }}</h2><p v-if="selected && !['categories', 'members'].includes(section)" class="detail-context">{{ section === 'products' ? selected.product.name : section === 'orders' ? selected.order.orderNumber : selected.name }}</p></div><button type="button" :disabled="busy" @click="dismissDetail"><AdminIcon name="close" />닫기</button></div>
      <nav v-if="section === 'products' && selected" class="detail-sections" aria-label="상품 관리 영역"><button v-for="[key, label] in [['info', '기본 정보'], ['inventory', '재고·판매 상태'], ['images', '상품 이미지']]" :key="key" type="button" :aria-pressed="productPanel === key" @click="productPanel = key">{{ label }}</button></nav>
      <form v-if="editing" v-show="section !== 'products' || productPanel === 'info'" class="editor" @submit.prevent="save">
        <label for="admin-edit-name">{{ section === 'products' ? '상품명' : '카테고리명' }} (필수)<input id="admin-edit-name" v-model="editing.name" :maxlength="section === 'products' ? 200 : 100" required :disabled="busy" /></label>
        <template v-if="section === 'categories'">
          <label>상위 카테고리 <select v-model="editing.parentId" aria-label="상위 카테고리" :disabled="busy"><option :value="null">최상위</option><option v-for="category in parentOptions" :key="category.categoryId" :value="category.categoryId">{{ category.label }}</option></select></label>
          <p class="meta">{{ ['상분류', '중분류'][(findCategoryNode(categoryTree, editing.parentId)?.depth ?? 0)] }} · 상·중 2단계까지 등록할 수 있어요.</p>
          <label>표시 순서 <input v-model.number="editing.sortOrder" type="number" min="0" max="2147483647" step="1" required :disabled="busy" /></label>
          <label class="check"><input v-model="editing.isActive" type="checkbox" :disabled="busy" /> 사용</label>
        </template>
        <template v-else>
          <label>카테고리 <select v-model="editing.categoryId" required :disabled="busy"><option disabled value="">선택해 주세요</option><option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">{{ category.name }}{{ category.isActive ? '' : ' (숨김)' }}</option></select></label>
          <label>상품 설명 <textarea v-model="editing.description" required :disabled="busy"></textarea></label>
          <label>가격 <input v-model.number="editing.price" type="number" min="0" max="99999999999999" step="1" required :disabled="busy" /></label>
          <label for="admin-edit-stock">재고 수량 <input id="admin-edit-stock" v-model.number="editing.stockQuantity" type="number" min="0" max="2147483647" step="1" required :disabled="busy" /></label>
        </template>
        <div class="actions"><button v-if="selected" class="admin-danger" type="button" :disabled="busy" @click="deletion.open([selectedId])">삭제</button><button type="submit" :disabled="busy">{{ busy ? '저장 중…' : '변경사항 저장' }}</button></div>
      </form>
      <template v-if="section === 'products' && selected">
        <section v-show="productPanel === 'inventory'" class="inventory-section">
        <div class="stock-overview"><div><span>현재 재고</span><strong>{{ selected.product.stockQuantity.toLocaleString('ko-KR') }}<small>개</small></strong></div><button type="button" :disabled="busy" @click="focusStock">재고 수량 수정</button></div>
        <form class="editor" @submit.prevent="mutate(() => api.setAdminProductStatus(selectedId, targetStatus))"><label>판매 상태 <select v-model="targetStatus" :disabled="busy"><option v-for="[value, label] in saleStatuses" :key="value" :value="value">{{ label }}</option></select></label><button type="submit" :disabled="busy || targetStatus === currentProductStatus">판매 상태 변경</button></form>
        <AdminStockHistory :key="selectedId" :product-id="selectedId" :stock-quantity="selected.product.stockQuantity" />
        </section>
        <AdminProductImages v-show="productPanel === 'images'" :key="selectedId" :product-id="selectedId" :disabled="busy" @busy="busy = $event" />
      </template>

      <AdminMemberDetail v-if="section === 'members' && selected" :member="selected" :busy="busy" @toggle-status="mutate(() => api.setAdminMemberStatus(selectedId, !selected.isActive))" />

    </dialog>
    <AdminOrderDialog v-if="section === 'orders'" ref="orderDialog" @saved="successNotice = $event; reload++" />
    <DeleteConfirmationDialog ref="deletion" :description="section === 'products' ? '상품을 삭제합니다. 기존 주문 내역은 유지됩니다.' : '카테고리를 삭제합니다. 하위 분류나 연결된 상품이 있으면 삭제되지 않습니다.'" @confirm="remove" />
    <AlertDialog :message="notice" @close="notice = ''" />
  </main>
</template>

<style scoped src="../styles/admin-management.css"></style>
