<script setup>
import { computed, nextTick, onBeforeUnmount, provide, ref, shallowRef, useId, watch } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import AdminIcon from '../components/admin/AdminIcon.vue'
import AdminPrimaryImage from '../components/admin/AdminPrimaryImage.vue'
import AdminCategoryPicker from '../components/admin/AdminCategoryPicker.vue'
import AdminPageHeading from '../components/admin/AdminPageHeading.vue'
import AdminListPanel from '../components/admin/AdminListPanel.vue'
import { activateAdminRow } from '../utils/adminRow.js'
import AdminStockHistory from '../components/admin/AdminStockHistory.vue'
import AdminDeleteDialog from '../components/admin/AdminDeleteDialog.vue'
import Pagination from '../components/common/Pagination.vue'
import * as liveApi from '../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../stores/session.js'
import { saleStatuses, statusCode } from '../utils/adminStatus.js'
import { adminStatusTone } from '../utils/adminPresentation.js'

const props = defineProps({ modalOnly: Boolean })
const emit = defineEmits(['saved'])
const id = useId()
const route = useRoute()
const backend = shallowRef(null)
provide('adminProductApi', backend)
const list = ref([]), categories = ref([]), total = ref(0), pages = ref(0)
const page = ref(0), size = ref(10), query = ref(''), keyword = ref(''), reload = ref(0)
const filterStatus = ref('ON_SALE'), filterCategory = ref(''), stockComparison = ref('LT'), filterStock = ref('')
const appliedFilters = ref({ saleStatus: 'ON_SALE' }), filterError = ref(''), categoryPicker = ref(null)
const filterCategoryLabel = computed(() => filterCategory.value === '' ? '전체 카테고리' : categoryName(filterCategory.value))
const stockDraft = ref(0), stockEditor = ref(null)
const loading = ref(false), listError = ref(''), categoryError = ref('')
const selected = ref(null), draft = ref(null), targetStatus = ref(''), tab = ref('info')
const detailLoading = ref(false), detailError = ref(''), actionError = ref(''), notice = ref('')
const saving = ref(false), imagesBusy = ref(false)
const detailDialog = ref(null)
const detailHeading = ref(null), editor = ref(null), listRegion = ref(null), createButton = ref(null)
const deletion = ref(null), discardDialog = ref(null), imageEditor = ref(null), requestedId = ref(null)
const visited = ref(new Set())
let detailController, discardResolve, disposed = false
let detailVersion = 0, ownerVersion = 0, selectionOpener = null
const busy = computed(() => saving.value || imagesBusy.value)
const product = computed(() => selected.value?.product)
const hasDetail = computed(() => Boolean(draft.value || detailLoading.value || detailError.value))
const creating = computed(() => Boolean(draft.value && !product.value))
const fields = ['name', 'categoryId', 'price', 'description']
const formData = value => Object.fromEntries(fields.map(key => [key, value?.[key] ?? (key === 'price' ? 0 : '')]))
const dirty = computed(() => Boolean(draft.value && JSON.stringify(formData(draft.value)) !== JSON.stringify(formData(product.value))))
const statusDirty = computed(() => Boolean(product.value && targetStatus.value !== statusCode(product.value.saleStatus, saleStatuses)))
const stockDirty = computed(() => Boolean(draft.value && stockDraft.value !== (product.value?.stockQuantity ?? 0)))
const hasChanges = computed(() => dirty.value || statusDirty.value || stockDirty.value || Boolean(imageEditor.value?.hasChanges))
const statusLabel = value => saleStatuses.find(([code,label]) => value === code || value === label)?.[1] || value || '—'
const money = value => new Intl.NumberFormat('ko-KR').format(value ?? 0) + '원'
const categoryName = value => categories.value.find(item => String(item.categoryId) === String(value))?.name || '—'
const tabs = [['info', '기본 정보'], ['inventory', '재고']]
watch(hasDetail, async visible => {
  await nextTick()
  if (visible && detailDialog.value && !detailDialog.value.open) {
    detailDialog.value.showModal()
    detailHeading.value?.focus({ preventScroll: true })
  }
})


function confirmDiscard() {
  if (session.member?.role !== 'ADMIN' || !hasChanges.value) return Promise.resolve(true)
  if (discardResolve) return Promise.resolve(false)
  discardDialog.value.showModal()
  return new Promise(resolve => { discardResolve = resolve })
}
function finishDiscard(accept) {
  discardDialog.value.close()
  const resolve = discardResolve
  discardResolve = null
  resolve?.(accept)
}
function resetDetail() {
  detailController?.abort(); detailVersion++
  selected.value = draft.value = null
  detailError.value = actionError.value = ''
  detailLoading.value = false
  targetStatus.value = ''
  stockDraft.value = 0
  visited.value = new Set()
}
async function closeDetail() {
  if (busy.value || !await confirmDiscard()) return
  resetDetail()
  await nextTick()
  if (selectionOpener?.isConnected) selectionOpener.focus({ preventScroll: true })
  else createButton.value?.focus({ preventScroll: true })
}
async function focusDetail() {
  await nextTick()
  detailHeading.value?.focus({ preventScroll: true })
}
async function openProduct(productId, opener = null) {
  if (!backend.value || busy.value || !await confirmDiscard()) return
  selectionOpener = opener || document.activeElement
  resetDetail()
  notice.value = ''
  requestedId.value = productId
  tab.value = 'info'
  detailLoading.value = true
  const controller = detailController = new AbortController()
  const version = detailVersion, revision = getSessionRevision()
  try {
    const result = await backend.value.getAdminDetail('products', productId, controller.signal)
    if (controller.signal.aborted || disposed || version !== detailVersion || revision !== getSessionRevision()) return
    selected.value = result
    draft.value = formData(result.product)
    targetStatus.value = statusCode(result.product.saleStatus, saleStatuses)
    stockDraft.value = result.product.stockQuantity
    await focusDetail()
  } catch (failure) {
    if (!controller.signal.aborted && revision === getSessionRevision()) detailError.value = failure.message
  } finally {
    if (!controller.signal.aborted && revision === getSessionRevision()) detailLoading.value = false
  }
}
async function createProduct() {
  if (busy.value || !await confirmDiscard()) return
  selectionOpener = createButton.value
  resetDetail()
  notice.value = ''
  tab.value = 'info'
  draft.value = formData(null)
  stockDraft.value = 0
  await nextTick()
  editor.value?.querySelector('input')?.focus({ preventScroll: true })
}
async function changeTab(key) { tab.value = key; visited.value.add(key); actionError.value = '' }
function setSaved(result) {
  selected.value = result
  draft.value = formData(result.product)
  targetStatus.value = statusCode(result.product.saleStatus, saleStatuses)
  stockDraft.value = result.product.stockQuantity
}
async function mutate(action, success, { deleted = false, created = false, scope = 'info' } = {}) {
  if (busy.value) return
  saving.value = true
  actionError.value = notice.value = ''
  const revision = getSessionRevision(), owner = ownerVersion, version = detailVersion
  const productId = product.value?.productId
  const pendingStatus = targetStatus.value, pendingStock = stockDraft.value, pendingDraft = { ...draft.value }
  const preserveDraft = dirty.value, preserveStock = stockDirty.value, preserveStatus = statusDirty.value
  const valid = () => !disposed && revision === getSessionRevision() && owner === ownerVersion && version === detailVersion
  try {
    const result = await action()
    if (!valid()) return
    if (deleted) resetDetail()
    else {
      const fresh = created ? result : await backend.value.getAdminDetail('products', productId)
      if (!valid()) return
      setSaved(fresh)
      if (!created) {
        if (scope !== 'info' && preserveDraft) draft.value = pendingDraft
        if (scope !== 'stock' && preserveStock) stockDraft.value = pendingStock
        if (scope !== 'status' && preserveStatus) targetStatus.value = pendingStatus
      }
    }
    notice.value = success
    emit('saved', success)
    reload.value++
  } catch (failure) {
    if (!valid()) return
    actionError.value = failure.message
    if (failure.code === 'STOCK_CHANGED' && productId != null) {
      try {
        const fresh = await backend.value.getAdminDetail('products', productId)
        if (valid()) { selected.value = fresh; stockDraft.value = fresh.product.stockQuantity; reload.value++ }
      } catch { /* 수정 중인 다른 입력과 원래 오류를 유지한다. */ }
    }
  } finally { if (!disposed && owner === ownerVersion) saving.value = false }
}
function save() {
  if (!editor.value?.checkValidity()) { tab.value = 'info'; nextTick(() => editor.value?.reportValidity()); return }
  const data = { ...formData(draft.value), stockQuantity: creating.value ? stockDraft.value : product.value.stockQuantity, name: draft.value.name.trim(), description: draft.value.description.trim() }
  if (!data.name || !data.description || !data.categoryId || !Number.isSafeInteger(data.price) || data.price < 0 || !Number.isSafeInteger(data.stockQuantity) || data.stockQuantity < 0 || data.stockQuantity > 2147483647) {
    actionError.value = '상품명, 설명, 카테고리와 0 이상의 정수 가격·재고를 확인해 주세요.'
    return
  }
  if (creating.value) mutate(() => backend.value.createAdminProduct(data), '상품을 등록했습니다. 판매 상태는 판매 준비입니다.', { created: true })
  else {
    data.expectedStockQuantity = product.value.stockQuantity
    mutate(() => backend.value.updateAdminProduct(product.value.productId, data), '상품 정보를 저장했습니다.')
  }
}
function saveStatus() {
  mutate(() => backend.value.setAdminProductStatus(product.value.productId, targetStatus.value), '판매 상태를 변경했습니다.', { scope: 'status' })
}
function saveStock() {
  if (!stockEditor.value?.reportValidity()) return
  if (!Number.isSafeInteger(stockDraft.value) || stockDraft.value < 0 || stockDraft.value > 2147483647) { actionError.value = '재고는 0 이상의 정수로 입력해 주세요.'; return }
  mutate(() => backend.value.setAdminProductStock(product.value.productId, stockDraft.value, product.value.stockQuantity), '재고 수량을 변경했습니다.', { scope: 'stock' })
}
async function resetDraft() {
  if (!await confirmDiscard()) return
  imageEditor.value?.reset(); draft.value = formData(product.value); stockDraft.value = product.value?.stockQuantity ?? 0
  targetStatus.value = statusCode(product.value?.saleStatus, saleStatuses); actionError.value = ''
}
async function search(reset = false) {
  if (busy.value) return
  if (reset) { query.value = ''; filterStatus.value = 'ON_SALE'; filterCategory.value = ''; filterStock.value = ''; stockComparison.value = 'LT' }
  filterError.value = ''
  if (filterStock.value !== '' && (!Number.isSafeInteger(filterStock.value) || filterStock.value < 0 || filterStock.value > 2147483647)) {
    filterError.value = '재고 수량은 0 이상의 정수로 입력해 주세요.'; return
  }
  keyword.value = query.value.trim()
  appliedFilters.value = { saleStatus: filterStatus.value || undefined, categoryId: filterCategory.value || undefined,
    stockQuantity: filterStock.value === '' ? undefined : filterStock.value,
    stockComparison: filterStock.value === '' ? undefined : stockComparison.value }
  page.value = 0; reload.value++
}
function changePage(value) { if (!busy.value) page.value = value - 1 }
function changeSize() { page.value = 0 }
async function retryCategories() {
  const owner = ownerVersion
  try {
    const result = await backend.value.getAdminCategories()
    if (!disposed && owner === ownerVersion) { categories.value = result; categoryError.value = '' }
  } catch (failure) { if (!disposed && owner === ownerVersion) categoryError.value = failure.message }
}

watch(shoppingOwner, async (_, __, onCleanup) => {
  const controller = new AbortController(), version = ++ownerVersion
  onCleanup(() => controller.abort())
  resetDetail()
  backend.value = null; categories.value = []; categoryError.value = ''; notice.value = ''
  page.value = 0; query.value = keyword.value = ''; filterStatus.value = 'ON_SALE'; filterCategory.value = ''; filterStock.value = ''; stockComparison.value = 'LT'; appliedFilters.value = { saleStatus: 'ON_SALE' }; saving.value = imagesBusy.value = false
  try {
    const api = session.source === 'mock' && import.meta.env.DEV ? await import('../mocks/adminProductWorkspace.js') : liveApi
    if (controller.signal.aborted || version !== ownerVersion) return
    backend.value = api
    categories.value = await api.getAdminCategories(controller.signal)
  } catch (failure) { if (!controller.signal.aborted && version === ownerVersion) categoryError.value = failure.message }
}, { immediate: true })
watch([backend, page, size, keyword, appliedFilters, reload], async (_, __, onCleanup) => {
  const controller = new AbortController(), revision = getSessionRevision()
  onCleanup(() => controller.abort())
  listError.value = ''; list.value = []; total.value = pages.value = 0
  if (!backend.value || props.modalOnly) return
  loading.value = true
  try {
    const result = await backend.value.getAdminList('products', { page: page.value, size: size.value, keyword: keyword.value || undefined, ...appliedFilters.value }, controller.signal)
    if (controller.signal.aborted || disposed || revision !== getSessionRevision()) return
    list.value = result.content; total.value = result.totalElements; pages.value = result.totalPages
    if (page.value >= result.totalPages && page.value > 0) page.value = Math.max(0, result.totalPages - 1)
    await nextTick()
    if (listRegion.value) listRegion.value.scrollTop = 0
  } catch (failure) { if (!controller.signal.aborted && revision === getSessionRevision()) listError.value = failure.message }
  finally { if (!controller.signal.aborted && revision === getSessionRevision()) loading.value = false }
}, { immediate: true })
watch([backend, () => route.query.id], ([api, productId]) => { if (!props.modalOnly && api && typeof productId === 'string' && /^\d+$/.test(productId)) openProduct(productId) }, { immediate: true })
const allowNavigation = async () => session.member?.role !== 'ADMIN' || (!busy.value && await confirmDiscard())
onBeforeRouteLeave(allowNavigation)
onBeforeRouteUpdate(to => (!props.modalOnly && to.params.section === 'products') || allowNavigation())
function protectUnload(event) { if (hasChanges.value || busy.value) { event.preventDefault(); event.returnValue = '' } }
watch([hasChanges, busy], ([changes, working], _, onCleanup) => {
  if (!changes && !working) return
  window.addEventListener('beforeunload', protectUnload)
  onCleanup(() => window.removeEventListener('beforeunload', protectUnload))
})
defineExpose({ open: openProduct })
onBeforeUnmount(() => { disposed = true; detailController?.abort(); discardResolve?.(false) })
</script>

<template>
  <component :is="modalOnly ? 'div' : 'main'" class="product-workspace" :class="{ 'admin-page': !modalOnly, 'pw-modal-host': modalOnly }"><template v-if="!modalOnly">
    <AdminPageHeading class="pw-heading" title="상품·재고 관리" description="상품 정보와 판매·재고 상태를 관리합니다.">
      <button ref="createButton" type="button" class="admin-primary" :disabled="!backend || busy || !!categoryError" @click="createProduct"><AdminIcon name="plus" />상품 등록</button>
    </AdminPageHeading>
    <p v-if="categoryError" class="pw-feedback is-error" role="alert">카테고리를 불러오지 못했습니다. {{ categoryError }} <button type="button" @click="retryCategories">다시 조회</button></p>
    <p v-if="notice && !hasDetail" class="pw-page-notice" role="status">{{ notice }}</p>
    <AdminListPanel :total="total" :loading="loading" aria-label="상품 목록">
      <template #filters>
      <form class="pw-search" role="search" aria-label="상품 조회" @submit.prevent="search()">
        <label class="pw-filter" :for="id + '-filter-status'">판매 상태<select :id="id + '-filter-status'" v-model="filterStatus" aria-label="판매 상태" :disabled="busy"><option value="">전체</option><option v-for="[key,label] in saleStatuses" :key="key" :value="key">{{ label }}</option></select></label>
        <div class="pw-filter pw-filter-category"><span :id="id + '-filter-category'">카테고리</span><button type="button" aria-haspopup="dialog" :aria-labelledby="id + '-filter-category ' + id + '-category-value'" :title="filterCategoryLabel" :disabled="busy || !!categoryError" @click="categoryPicker.open(filterCategory)"><span :id="id + '-category-value'">{{ filterCategoryLabel }}</span><AdminIcon name="chevron" /></button></div>
        <div class="pw-filter pw-filter-stock"><label :for="id + '-filter-stock'">재고 수량</label><div><input :id="id + '-filter-stock'" v-model.number="filterStock" type="number" min="0" max="2147483647" step="1" placeholder="수량" :disabled="busy" /><select v-model="stockComparison" aria-label="재고 비교 조건" :disabled="busy"><option value="GT">초과</option><option value="LT">미만</option><option value="EQ">같음</option></select></div></div>
        <label class="pw-filter pw-filter-name" :for="id + '-search'">상품명
          <div class="pw-search-input"><AdminIcon name="search" /><input :id="id + '-search'" v-model="query" type="search" maxlength="100" placeholder="상품명 입력" :disabled="busy" /></div>
        </label>
        <div class="pw-search-actions"><button type="submit" class="admin-primary" :disabled="loading || busy"><AdminIcon name="search" />조회</button><button type="button" :disabled="loading || busy" @click="search(true)">초기화</button></div>
        <p v-if="filterError" class="pw-filter-error" role="alert">{{ filterError }}</p>
      </form>
      </template>
      <template #actions><span class="pw-sort">최근 등록순</span><label :for="id + '-size'" class="sr-only">페이지당 상품 수</label><select :id="id + '-size'" v-model.number="size" :disabled="loading || busy" @change="changeSize"><option :value="10">10개씩</option><option :value="20">20개씩</option><option :value="50">50개씩</option></select></template>
      <div ref="listRegion" class="admin-list-scroll pw-table-region" tabindex="-1" role="region" aria-label="상품 목록" :aria-busy="loading">
        <table v-if="list.length" class="admin-list-table pw-table"><caption class="sr-only">상품 목록. 행을 선택하면 상품 편집 모달이 열립니다.</caption><colgroup><col class="pw-name-col"><col class="pw-category-col"><col class="pw-price-col"><col class="pw-stock-col"><col class="pw-status-col"><col class="pw-action-col"></colgroup>
          <thead><tr><th scope="col">상품명</th><th scope="col" class="pw-category">카테고리</th><th scope="col" class="numeric">판매가</th><th scope="col" class="numeric">재고</th><th scope="col">판매 상태</th><th scope="col"><span class="sr-only">선택</span></th></tr></thead>
          <tbody><tr v-for="row in list" :key="row.productId" class="admin-clickable-row" :class="{ 'is-selected': String(product?.productId) === String(row.productId) }" @click="!busy && activateAdminRow($event, () => openProduct(row.productId, $event.currentTarget.querySelector('button')))">
            <th scope="row"><button type="button" class="pw-product-name" :title="row.name" :disabled="busy" aria-haspopup="dialog" :aria-pressed="String(product?.productId) === String(row.productId)" @click="openProduct(row.productId, $event.currentTarget)">{{ row.name }}</button></th>
            <td class="pw-category">{{ categoryName(row.categoryId) }}</td><td class="numeric" data-label="판매가">{{ money(row.price) }}</td><td class="numeric" data-label="재고"><span class="pw-stock" :data-low="row.stockQuantity <= 5">{{ row.stockQuantity === 0 ? '품절' : row.stockQuantity.toLocaleString('ko-KR') + '개' }}</span></td><td data-label="판매 상태"><span class="status-pill" :data-tone="adminStatusTone(statusLabel(row.saleStatus))">{{ statusLabel(row.saleStatus) }}</span></td><td><AdminIcon name="chevron" /></td>
          </tr></tbody>
        </table>
        <div v-else class="pw-list-empty"><p v-if="loading" role="status">상품을 불러오는 중입니다.</p><template v-else-if="listError"><h3>상품을 불러오지 못했습니다</h3><p role="alert">{{ listError }}</p><button type="button" @click="reload++">다시 조회</button></template><template v-else><h3>조건에 맞는 상품이 없습니다</h3><p>검색 조건을 변경하거나 상품을 등록해 주세요.</p><button type="button" @click="search(true)">검색 초기화</button></template></div>
      </div>
      <template #footer><span>{{ total ? (page * size + 1) + '–' + Math.min((page + 1) * size, total) + ' / ' + total.toLocaleString('ko-KR') + '건' : '0건' }}</span><Pagination :model-value="page + 1" :page-count="pages" :disabled="loading || busy" label="상품 목록 페이지" @update:model-value="changePage" /></template>
    </AdminListPanel>
    </template>
    <AdminCategoryPicker ref="categoryPicker" :categories="categories" @select="filterCategory = $event" />
    <dialog v-if="hasDetail" ref="detailDialog" class="pw-detail" @cancel.prevent="closeDetail" :aria-labelledby="id + '-detail-heading'" :aria-busy="detailLoading">
      <header class="pw-detail-heading"><div class="pw-detail-title"><h2 :id="id + '-detail-heading'" ref="detailHeading" tabindex="-1">{{ creating ? '새 상품 등록' : product?.name || '상품 상세' }}</h2><span v-if="hasChanges" class="pw-unsaved">저장 전</span></div><button type="button" aria-label="선택 상품 닫기" :disabled="busy" @click="closeDetail"><AdminIcon name="close" /><span>닫기</span></button></header>
      <p v-if="modalOnly && categoryError" class="pw-feedback is-error" role="alert">카테고리를 불러오지 못했습니다. {{ categoryError }} <button type="button" @click="retryCategories">다시 조회</button></p>
      <div v-if="detailLoading" class="pw-detail-loading" role="status">상품 정보를 불러오는 중입니다.</div><p v-else-if="detailError" class="pw-feedback is-error" role="alert">{{ detailError }}<button type="button" @click="openProduct(requestedId)">다시 조회</button></p>
      <template v-else-if="draft">
        <div class="pw-detail-toolbar"><div class="pw-tabs" role="group" aria-label="선택 상품 관리"><button v-for="[key,label] in tabs" :key="key" type="button" :aria-pressed="tab === key" :disabled="busy" @click="changeTab(key)">{{ label }}</button></div></div>
        <div class="pw-detail-scroll" tabindex="-1" role="region" aria-label="상품 편집 내용">
          <p v-if="notice" class="pw-modal-notice" role="status">{{ notice }}</p><p v-if="actionError" class="pw-feedback is-error" role="alert">{{ actionError }}</p>
          <div v-show="tab === 'info'">
            <form v-if="product" :id="id + '-status-editor'" aria-label="판매 상태 변경" @submit.prevent="saveStatus"></form>
            <form :id="id + '-editor'" ref="editor" class="pw-editor" @submit.prevent="save">
              <div class="pw-info-fields">
                <label class="pw-field pw-field-name" :for="id + '-name'">상품명 (필수)<input :id="id + '-name'" v-model="draft.name" name="name" maxlength="200" required :disabled="busy" /></label>
                <label class="pw-field" :for="id + '-category'">카테고리 (필수)<select :id="id + '-category'" v-model="draft.categoryId" name="categoryId" required :disabled="busy"><option value="" disabled>카테고리 선택</option><option v-for="item in categories" :key="item.categoryId" :value="item.categoryId">{{ item.name }}{{ item.isActive ? '' : ' (숨김)' }}</option></select></label>
                <label class="pw-field" :for="id + '-price'">판매가 · 원 (필수)<input :id="id + '-price'" v-model.number="draft.price" name="price" type="number" min="0" max="99999999999999" step="1" required :disabled="busy" /></label>
                <div v-if="product" class="pw-status-form"><label class="pw-field" :for="id + '-status'">판매 상태<select :id="id + '-status'" v-model="targetStatus" :form="id + '-status-editor'" :disabled="busy"><option v-for="[key,label] in saleStatuses" :key="key" :value="key">{{ label }}</option></select></label><button type="submit" :form="id + '-status-editor'" :disabled="busy || !statusDirty">판매 상태 변경</button></div>
              </div>
              <label class="pw-field pw-description" :for="id + '-description'">상품 설명 (필수)<textarea :id="id + '-description'" v-model="draft.description" name="description" required :disabled="busy"></textarea></label>
            </form>
            <p v-if="!product" class="pw-create-note">새 상품은 판매 준비 상태로 등록됩니다.</p>
            <AdminPrimaryImage ref="imageEditor" :product-id="product?.productId" :images="selected?.images || []" :disabled="saving" @busy="imagesBusy = $event" @saved="selected.images = $event" />
          </div>
          <div v-show="tab === 'inventory'" class="pw-inventory">
            <form ref="stockEditor" class="pw-stock-form" @submit.prevent="product && saveStock()"><label class="pw-field" :for="id + '-stock'">재고 수량 · 개<input :id="id + '-stock'" v-model.number="stockDraft" name="stockQuantity" type="number" min="0" max="2147483647" step="1" required :disabled="busy" /></label><button v-if="product" type="submit" :disabled="busy || !stockDirty">재고 수량 저장</button><p v-else>입력한 수량은 상품 등록 시 저장됩니다.</p></form>
            <AdminStockHistory v-if="product && visited.has('inventory')" :key="product.productId" :product-id="product.productId" :stock-quantity="product.stockQuantity" />
          </div>
        </div>
        <footer class="pw-detail-actions"><button v-if="product" type="button" class="pw-delete" :disabled="busy" @click="deletion.open([product.productId])">상품 삭제</button><span v-else class="pw-create-note">필수 정보를 입력해 주세요.</span><div><button type="button" :disabled="busy || !hasChanges" @click="resetDraft">변경 되돌리기</button><button v-if="tab === 'info' || creating" type="button" class="admin-primary" :disabled="busy || (!dirty && !creating) || !!categoryError" @click="save">{{ saving ? '저장 중…' : creating ? '상품 등록' : '변경사항 저장' }}</button></div></footer>
      </template>
    </dialog>
    <AdminDeleteDialog ref="deletion" description="상품을 삭제합니다. 기존 주문 내역은 유지됩니다." @confirm="([productId]) => mutate(() => backend.deleteAdminProduct(productId), '상품을 삭제했습니다.', { deleted: true })" />
    <dialog ref="discardDialog" class="delete-dialog pw-discard" :aria-labelledby="id + '-discard-title'" :aria-describedby="id + '-discard-message'" @cancel.prevent="finishDiscard(false)"><h2 :id="id + '-discard-title'">변경사항을 버리시겠습니까?</h2><p :id="id + '-discard-message'">저장하지 않은 상품 정보, 재고, 판매 상태 또는 이미지 변경이 있습니다.</p><div class="delete-actions"><button type="button" autofocus @click="finishDiscard(false)">계속 수정</button><button type="button" class="delete-confirm" @click="finishDiscard(true)">버리고 이동</button></div></dialog>
  </component>
</template>

<style scoped src="../styles/admin-product-workspace.css"></style>
