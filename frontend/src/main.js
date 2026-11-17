import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { restoreSession } from './services/auth.js'

// 레이아웃 계산과 기본 요소 리셋에 사용
import 'bulma/css/bulma.min.css'

// 오이시담 공통 CSS
import './styles/variables.css'
import './styles/global.css'

async function start() {
  await restoreSession()
  createApp(App).use(router).mount('#app')
}
start()
