<script setup>
import { ref, watch } from 'vue'
import { development, setMockEnabled, setMockScenario } from '../../config/development.js'
import { getProducts } from '../../services/catalog.js'

const open = ref(false)
const busy = ref(false)
const result = ref('')
let revision = 0
watch(() => [development.mockEnabled, development.scenario], () => {
  revision++
  busy.value = false
  result.value = ''
}, { flush: 'sync' })
async function checkProducts() {
  const current = ++revision
  busy.value = true
  result.value = ''
  try {
    const data = await getProducts()
    if (current === revision) result.value = JSON.stringify(data, null, 2)
  } catch (error) {
    if (current === revision) result.value = `${error.code || error.status || 'ERROR'}: ${error.message}`
  } finally {
    if (current === revision) busy.value = false
  }
}
</script>

<template>
  <aside class="development-panel" aria-label="개발 도구">
    <button class="dev-trigger" type="button" :aria-expanded="open" aria-controls="development-settings" @click="open = !open">
      개발 도구 · {{ development.mockEnabled ? 'MOCK' : 'API' }}
    </button>
    <section v-if="open" id="development-settings" class="dev-settings">
      <strong>개발용 데이터 설정</strong>
      <label class="dev-row">
        <input type="checkbox" :checked="development.mockEnabled" @change="setMockEnabled($event.target.checked)" />
        Mock 인증 사용
      </label>
      <p>{{ development.mockEnabled ? '가상 인증을 사용합니다.' : '인증은 백엔드로 요청합니다.' }} 상품은 개발용 데이터를 표시합니다.</p>
      <label class="dev-row">
        응답 상황
        <select :value="development.scenario" @change="setMockScenario($event.target.value)">
          <option value="normal">정상</option>
          <option value="empty">빈 목록</option>
          <option value="error">서버 오류</option>
        </select>
      </label>
      <button type="button" class="dev-check" :disabled="busy" @click="checkProducts">
        {{ busy ? '요청 중…' : '가상 상품 응답 확인' }}
      </button>
      <p>전환 후 화면을 새로고침하거나 데이터를 다시 조회하세요.</p>
      <pre v-if="result" aria-live="polite">{{ result }}</pre>
    </section>
  </aside>
</template>

<style scoped>
/* 개발 패널 고정 위치와 기본 글꼴 */
.development-panel {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1000;
  font: 13px/1.5 sans-serif;
  color: #392c32;
}

/* 패널 열기 · API 확인 버튼 */
.dev-trigger,
.dev-check {
  border: 0;
  border-radius: 8px;
  background: #392c32;
  color: white;
  padding: 9px 13px;
  cursor: pointer;
}

.dev-trigger {
  display: block;
  margin-left: auto;
}

/* 설정 패널 크기와 배경 */
.dev-settings {
  width: min(360px, calc(100vw - 32px));
  max-height: 70vh;
  overflow: auto;
  margin-top: 8px;
  padding: 16px;
  border: 1px solid #eadde1;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 24px #392c3220;
}

/* 설정 항목과 입력 요소 */
.dev-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
}

p {
  margin: 8px 0;
}

select {
  min-width: 100px;
  padding: 4px;
}

/* API 응답 출력 */
pre {
  margin-top: 12px;
  padding: 10px;
  max-height: 220px;
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  background: #fff7f8;
  font-size: 11px;
}

/* 요청 중 버튼 상태 */
button:disabled {
  opacity: .6;
  cursor: wait;
}
</style>
