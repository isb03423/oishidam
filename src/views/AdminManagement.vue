<script setup>
import { computed, ref, shallowRef, watch } from 'vue'
import { session } from '../stores/session.js'

const props = defineProps({ section: String, title: String })
const demo = computed(() => session.source === 'mock')
const source = shallowRef(null)
const error = ref('')
const query = ref('')
const editing = ref(null)
const entries = ref({})
const notice = ref('')
const storageKey = 'oishidam:admin-demo:v1'
const statuses = ['주문접수', '배송준비중', '배송중', '배송완료']
const date = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'short' })
const money = new Intl.NumberFormat('ko-KR')

if (import.meta.env.DEV && demo.value) {
  import('../mocks/adminManagement.js').then(({ getManagementData }) => {
    source.value = getManagementData()
    try { entries.value = JSON.parse(localStorage.getItem(storageKey) || '{}') ?? {} } catch {}
  }).catch(() => { error.value = '관리 데이터를 불러오지 못했어요.' })
}

const pages = {
  products: { columns: ['상품명', '카테고리', '판매 상태'], fields: [
    { key: 'name', label: '상품명' }, { key: 'category_id', label: '카테고리', options: () => data('categories').map((row) => [row.id, row.name]) },
    { key: 'sale_status', label: '판매 상태', options: [['ON_SALE', '판매 중'], ['HIDDEN', '판매 중지']] },
  ], cells: (row) => [row.name, data('categories').find((category) => category.id === row.category_id)?.name, row.sale_status === 'ON_SALE' ? '판매 중' : '판매 중지'] },
  categories: { columns: ['카테고리명', '상위 카테고리', '상태'], fields: [
    { key: 'name', label: '카테고리명' }, { key: 'is_active', label: '상태', options: [[true, '사용'], [false, '숨김']] },
  ], cells: (row) => [row.name, data('categories').find((category) => category.id === row.parent_id)?.name ?? '—', row.is_active ? '사용' : '숨김'] },
  inventory: { columns: ['상품', '옵션', '재고'], fields: [{ key: 'stock_quantity', label: '재고 수량', type: 'number' }],
    cells: (row) => [data('products').find((product) => product.id === row.product_id)?.name, row.variant_name, row.stock_quantity + '개'] },
  orders: { columns: ['주문번호', '주문일', '주문자', '금액', '상태'], fields: [
    { key: 'status', label: '주문 상태', options: (row) => statuses.slice(statuses.indexOf(row.status), statuses.indexOf(row.status) + 2).map((status) => [status, status]) },
  ], cells: (row) => [row.id, date.format(row.date), row.customer, money.format(row.total) + '원', row.status] },
  members: { columns: ['이름', '이메일', '가입일', '상태'], fields: [
    { key: 'note', label: '관리 메모', type: 'textarea', optional: true },
  ], cells: (row) => [row.name, row.email, row.joined_at, row.status === 'ACTIVE' ? '활성' : '탈퇴'] },
  inquiries: { columns: ['제목', '문의 내용', '답변'], fields: [{ key: 'answer', label: '답변', type: 'textarea' }],
    cells: (row) => [row.title, row.content, row.answer || '답변 대기'] },
  reviews: { columns: ['상품', '별점', '후기', '관리자 답변'], fields: [{ key: 'reply', label: '관리자 답변', type: 'textarea' }],
    cells: (row) => [data('products').find((product) => product.id === row.product_id)?.name, row.rating + ' / 5', row.content, row.reply || '—'] },
  analytics: { columns: ['세그먼트', '고객 수', '평균 방문', '평균 광고 클릭', '평균 체류'], fields: [],
    cells: (row) => [row.id, row.count + '명', row.visits + '회', row.clicks + '회', row.minutes + '분'] },
}

function data(section) {
  return (source.value?.[section] ?? []).map((row) => ({
    ...row, ...entries.value[section]?.[row.id],
  }))
}

const page = computed(() => pages[props.section])
const rows = computed(() => data(props.section).map((row) => ({ row, cells: page.value.cells(row) }))
  .filter(({ cells }) => cells.join(' ').toLowerCase().includes(query.value.trim().toLowerCase())))
watch(() => props.section, () => { query.value = ''; editing.value = null; notice.value = '' })

function save() {
  const row = editing.value
  const values = {}
  for (const field of page.value.fields) {
    const value = row[field.key]
    values[field.key] = typeof value === 'string' ? value.trim() : value
    if (!field.optional && (values[field.key] === '' || values[field.key] == null)) return
    if (field.type === 'number' && (!Number.isSafeInteger(value) || value < 0)) return
  }
  const next = { ...entries.value, [props.section]: { ...entries.value[props.section], [row.id]: values } }
  try {
    localStorage.setItem(storageKey, JSON.stringify(next))
    entries.value = next
    editing.value = null
    notice.value = '저장했어요.'
  } catch {
    notice.value = '변경 사항을 저장하지 못했어요.'
  }
}
</script>

<template>
  <main class="management">
    <h1>{{ title }}</h1>
    <p v-if="!demo" class="card">관리자 API 연결 후 운영 데이터를 사용할 수 있어요.</p>
    <p v-else-if="error" class="card" role="alert">{{ error }}</p>
    <p v-else-if="!source" class="card" role="status">데이터를 불러오는 중이에요.</p>
    <section v-else class="card">
      <div class="toolbar">
        <p>{{ section === 'analytics' ? '고객 세그먼트 데이터 집계' : '모의 운영 데이터' }} · {{ rows.length }}건</p>
        <input v-model="query" type="search" aria-label="목록 검색" placeholder="목록 검색" />
      </div>
      <p v-if="notice" role="status">{{ notice }}</p>
      <form v-if="editing" class="editor" @submit.prevent="save">
        <h2>{{ editing.name || editing.title || editing.id }} 편집</h2>
        <label v-for="field in page.fields" :key="field.key">
          {{ field.label }}
          <select v-if="field.options" v-model="editing[field.key]" required>
            <option v-for="[value, label] in (typeof field.options === 'function' ? field.options(data(section).find((row) => row.id === editing.id)) : field.options)" :key="String(value)" :value="value">{{ label }}</option>
          </select>
          <textarea v-else-if="field.type === 'textarea'" v-model="editing[field.key]" :required="!field.optional" maxlength="1000" />
          <input v-else-if="field.type === 'number'" v-model.number="editing[field.key]" type="number" min="0" step="1" required />
          <input v-else v-model.trim="editing[field.key]" required maxlength="100" />
        </label>
        <div class="actions"><button type="submit">저장</button><button type="button" @click="editing = null">취소</button></div>
      </form>
      <div v-if="rows.length" class="scroll">
        <table>
          <thead><tr><th v-for="column in page.columns" :key="column" scope="col">{{ column }}</th><th v-if="page.fields.length" scope="col">관리</th></tr></thead>
          <tbody><tr v-for="{ row, cells } in rows" :key="row.id">
            <td v-for="(cell, index) in cells" :key="index">{{ cell }}</td>
            <td v-if="page.fields.length"><button type="button" @click="editing = { ...row }; notice = ''">편집</button></td>
          </tr></tbody>
        </table>
      </div>
      <p v-else class="empty">검색 결과가 없어요.</p>
    </section>
  </main>
</template>

<style scoped>
.management { display: grid; gap: 16px; padding: clamp(16px, 2vw, 28px); }
h1 { color: #592839; font-size: 1.85rem; font-weight: 800; }
h2 { font-weight: 700; }
.card { padding: 18px; border: 1px solid var(--color-border); border-radius: 14px; background: white; box-shadow: none; }
.toolbar, .actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.toolbar { justify-content: space-between; margin-bottom: 16px; }
.toolbar p, .empty { color: var(--color-secondary); }
.scroll { overflow-x: auto; }
table { width: 100%; }
th, td { padding: 10px; border-bottom: 1px solid var(--color-border); text-align: left; overflow-wrap: anywhere; }
th { background: var(--color-background); white-space: nowrap; }
input, select, textarea, button { padding: 7px 10px; border: 1px solid var(--color-border); border-radius: 8px; background: white; color: inherit; font: inherit; }
button { color: var(--color-primary); white-space: nowrap; cursor: pointer; }
button[type='submit'] { background: var(--color-primary); color: white; }
.editor { display: grid; gap: 10px; margin-block: 12px; padding: 14px; background: var(--color-background); border-radius: 10px; }
.editor label { display: grid; gap: 4px; }
</style>
