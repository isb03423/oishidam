<template>
  <header class="site-header">
    <!-- 상단 헤더 -->
    <div class="header-top">
      <!-- 계정 글씨 메뉴: header-top 내부 상단 우측 -->
      <div class="header-container header-account-bar-inner">
        <!-- 회원명 영역은 항상 확보해 로그인 전후 메뉴 기준선을 고정합니다. -->
        <div class="account-actions">
          <template v-if="session.member">
            <span class="text-link member-name">{{ session.member.name }}님</span>
            <div class="member-actions">
              <span class="action-divider" aria-hidden="true"></span>
              <button class="text-link logout-button" type="button" :disabled="loggingOut" @click="handleLogout">로그아웃</button>
              <span class="action-divider" aria-hidden="true"></span>
              <RouterLink to="/mypage" class="text-link">마이페이지</RouterLink>
            </div>
          </template>

          <template v-else>
            <span class="member-name-placeholder" aria-hidden="true"></span>
            <div class="guest-actions">
              <RouterLink to="/login" class="text-link">로그인</RouterLink>
              <span class="action-divider" aria-hidden="true"></span>
              <RouterLink to="/signup" class="text-link">회원가입</RouterLink>
            </div>
          </template>
        </div>
      </div>

      <div class="header-container header-top-inner">

        <!-- 로고 -->
        <RouterLink to="/" class="header-logo">
          <img :src="logo" alt="오이시담 로고" />
        </RouterLink>

        <!-- 검색창 -->
        <form class="header-search" @submit.prevent="searchProducts">
          <input
            v-model="keyword"
            type="search"
            placeholder="원하시는 상품을 검색해보세요!"
            aria-label="상품 검색"
          />

          <button type="submit" aria-label="검색">
            <svg viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.8">
              <circle cx="10.8" cy="10.8" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>
        </form>

        <!-- 우측 메뉴 -->
        <div class="header-actions">
          <div class="header-icon-group">
            <!-- 찜하기 -->
            <button
              type="button"
              class="icon-button"
              :class="{ 'is-guest': !session.member }"
              :aria-label="session.member ? '찜한 상품' : '로그인 후 이용 가능한 찜한 상품'"
              :aria-disabled="!session.member"
              :title="session.member ? '찜한 상품' : '로그인 후 이용할 수 있습니다.'"
              @click="requireLogin({ name: 'MyPageWishlist' })"
            >
              <svg viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"
                />
              </svg>
            </button>

            <!-- 장바구니 -->
            <button
              type="button"
              class="icon-button cart-button"
              :class="{ 'is-guest': !session.member }"
              :aria-label="session.member ? '장바구니' : '로그인 후 이용 가능한 장바구니'"
              :aria-disabled="!session.member"
              :title="session.member ? '장바구니' : '로그인 후 이용할 수 있습니다.'"
              @click="requireLogin"
            >
              <img
                :src="cartIcon"
                class="cart-icon"
                alt=""
              />

              <span v-if="cartCount > 0" class="cart-count">
                {{ cartCount }}
              </span>
            </button>
          </div>
        </div>

      </div>
      <p v-if="logoutError" class="logout-error header-container" role="alert">{{ logoutError }}</p>
    </div>

    <!-- 하단 내비게이션 -->
    <nav class="header-nav" aria-label="주요 메뉴">
      <div class="header-container nav-inner">

        <!-- 전체 카테고리 -->
        <RouterLink to="/products" class="nav-category">
          <svg class="hamburger" viewBox="0 0 22 14" aria-hidden="true">
            <path d="M0 1H22 M0 7H22 M0 13H22" />
          </svg>
          전체 카테고리
        </RouterLink>

        <RouterLink
          v-if="session.member"
          :to="{ path: '/products', query: { recommend: 'ai' } }"
          class="nav-link ai-recommend-link"
        >
          <span>AI 추천</span>
          <svg class="ai-recommend-sparkles" viewBox="62 6 16 16" aria-hidden="true">
            <path d="M67 7.75C67.35 7.75 67.6 8 67.7 8.35L68.1 9.9L69.65 10.3C70 10.4 70.25 10.65 70.25 11C70.25 11.35 70 11.6 69.65 11.7L68.1 12.1L67.7 13.65C67.6 14 67.35 14.25 67 14.25C66.65 14.25 66.4 14 66.3 13.65L65.9 12.1L64.35 11.7C64 11.6 63.75 11.35 63.75 11C63.75 10.65 64 10.4 64.35 10.3L65.9 9.9L66.3 8.35C66.4 8 66.65 7.75 67 7.75Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M72.5 11.25C72.85 11.25 73.1 11.45 73.25 11.8L74.25 14.75L77.2 15.75C77.55 15.9 77.75 16.15 77.75 16.5C77.75 16.85 77.55 17.1 77.2 17.25L74.25 18.25L73.25 21.2C73.1 21.55 72.85 21.75 72.5 21.75C72.15 21.75 71.9 21.55 71.75 21.2L70.75 18.25L67.8 17.25C67.45 17.1 67.25 16.85 67.25 16.5C67.25 16.15 67.45 15.9 67.8 15.75L70.75 14.75L71.75 11.8C71.9 11.45 72.15 11.25 72.5 11.25ZM72.5 14.9L71.925 16.5L72.5 18.1L73.075 16.5L72.5 14.9Z" />
          </svg>
        </RouterLink>

        <RouterLink
          :to="{ path: '/products', query: { sort: 'new' } }"
          class="nav-link"
        >
          신상품
        </RouterLink>

        <RouterLink
          :to="{ path: '/products', query: { sort: 'best' } }"
          class="nav-link"
        >
          베스트
        </RouterLink>

        <RouterLink to="/inquiries" class="nav-link">
          1:1 문의
        </RouterLink>

      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../../assets/images/oishidam_logo.png'
import cartIcon from '../../assets/icons/cart-box-empty.svg'
import { session } from '../../stores/session.js'
import { cartCount } from '../../stores/cart.js'
import { logout } from '../../services/auth.js'

const router = useRouter()
const loggingOut = ref(false)
const logoutError = ref('')

async function handleLogout() {
  if (loggingOut.value) return
  loggingOut.value = true
  logoutError.value = ''
  try {
    await logout()
  } catch {
    logoutError.value = '로그아웃하지 못했습니다. 잠시 후 다시 시도해주세요.'
  } finally {
    loggingOut.value = false
  }
}

// 검색어
const keyword = ref('')

// Mock 응답의 장바구니 수량입니다. 실제 API 연동 시 동일한 필드로 교체합니다.

// 상품 검색
function searchProducts() {
  const searchKeyword = keyword.value.trim()

  if (!searchKeyword) return

  router.push({
    path: '/products',
    query: {
      keyword: searchKeyword
    }
  })
}

// 비회원만 로그인 화면으로 안내합니다.
// 회원용 장바구니 페이지는 구현 전까지 현재 화면을 유지합니다.
function requireLogin(memberRoute) {
  if (session.member) {
    if (memberRoute) router.push(memberRoute)
    return
  }

  router.push({ name: 'Login' })
}
</script>

<style scoped>
.site-header {
  width: 100%;
  background: #ffffff;
  color: var(--color-text, #392C32);
}

/* 공통 너비 */
.header-container {
  width: min(100% - 80px, 1020px);
  margin: 0 auto;
}

/* 상단 */
.header-top {
  position: relative;
  border-bottom: 1px solid #f3edf0;
}

/* 계정 메뉴는 검색창·아이콘 줄의 위에서 우측 기준선에 맞춥니다. */
.header-account-bar-inner {
  position: absolute;
  top: 10px;
  left: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  transform: translateX(-50%);
  z-index: 1;
}

.header-top-inner {
  min-height: 120px;
  display: grid;
  grid-template-columns: minmax(135px, 1fr) minmax(0, 380px) minmax(220px, 1fr);
  align-items: center;
  gap: 32px;
}

/* 상단 글씨 메뉴와 분리해 본문 요소만 살짝 아래로 이동합니다. */
@media (min-width: 651px) {
  .header-logo {
    transform: translateY(7px);
  }

  .header-search {
    transform: translateY(10px);
  }

  .header-actions {
    transform: translateY(8px);
  }
}

/* 로고 */
.header-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-logo img {
  width: 135px;
  height: auto;
  display: block;
  transform: translateX(-6px);
}

/* 검색 */
.header-search {
  width: 380px;
  max-width: 100%;
  height: 40px;
  border: 1px solid #D9A8B6;
  background: #fffafb;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.header-search:focus-within {
  border-color: var(--color-primary, #9C4F63);
}

.header-search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text, #392C32);
  font-size: 15px;
}

.header-search input::placeholder {
  color: #929092;
}

.header-search button {
  border: 0;
  background: transparent;
  color: var(--color-primary, #9C4F63);
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
}

.header-search button svg {
  width: 20px;
  height: 20px;
}

/* 우측 메뉴 */
.header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 220px;
  margin-left: auto;
  white-space: nowrap;
}

.header-icon-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.text-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text, #392C32);
}

/* 비회원과 회원 상태에서 같은 폭을 쓰는 계정 메뉴 영역 */
.account-actions {
  display: grid;
  grid-template-columns: minmax(52px, max-content) max-content;
  align-items: center;
  justify-content: end;
  width: max-content;
  min-width: 172px;
  white-space: nowrap;
}

.member-name,
.member-name-placeholder {
  grid-column: 1;
}

.member-name {
  font-size: 13px;
  font-weight: 400;
}

.member-actions,
.guest-actions {
  grid-column: 2;
}

/* 로그인·구분선·회원가입의 동일 간격 */
.member-actions,
.guest-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.member-actions .text-link,
.guest-actions .text-link {
  font-size: 13px;
  font-weight: 400;
}

.text-link:hover,
.nav-link:hover {
  color: var(--color-primary, #9C4F63);
}

.logout-button {
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  cursor: pointer;
}

.logout-button:disabled {
  opacity: .6;
  cursor: wait;
}

.logout-error {
  padding-bottom: 12px;
  color: #b53951;
  font-size: 12px;
}

.action-divider {
  width: 1px;
  height: 15px;
  flex: 0 0 1px;
  background: #b9afb3;
}


.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 38px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary, #9C4F63);
}

.icon-button svg {
  width: 24px;
  height: 24px;
}

/* 장바구니 버튼 · 크기와 색상 */
.cart-button {
  color: var(--color-text, #392C32);
  width: 42px;
  height: 42px;
  margin-right: -4px;
}

/* 장바구니 수량 배지 */
.cart-count {
  position: absolute;
  top: 0;
  right: -7px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-secondary, #76617E);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

/* 장바구니 SVG 이미지 크기 */
.cart-icon {
  display: block;
  width: 34px;
  height: 34px;
  transform: translateY(-2px);
}

/* 하단 메뉴 */
.header-nav {
  border-bottom: 1px solid #eee8eb;
}

.nav-inner {
  padding-left: 0;
  min-height: 47px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-category,
.nav-link {
  display: inline-flex;
  align-items: center;
  color: var(--color-text, #392C32);
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
}

/* 신상품 · 베스트 · 문의 메뉴의 글자 크기와 굵기 */
.nav-link {
  font-size: 15px;
  font-weight: 500;
}

/* 로그인 회원에게만 노출되는 추천 메뉴 */
.ai-recommend-link {
  gap: 5px;
  padding: 4px 11px 4px 12px;
  border-radius: 999px;
  background: var(--ai-recommend-background);
  color: #fff;
}

.ai-recommend-link:hover {
  color: #fff;
}

.ai-recommend-sparkles {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.nav-category {
  gap: 14px;
  margin-right: 0;
}

.hamburger {
  display: block;
  width: 22px;
  height: 14px;
  flex-shrink: 0;
  transform: translateY(1px);
  fill: none;
  stroke: var(--color-text, #392C32);
  stroke-width: 2;
}

/* 반응형 · 태블릿과 작은 PC (1100px 이하) */
@media (max-width: 1100px) {
  .header-container {
    width: calc(100% - 40px);
  }

  .header-top-inner {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    padding: 20px 0;
  }

  .header-search {
    flex: 1;
    width: auto;
  }

  .header-actions {
    gap: 12px;
  }

  .nav-inner {
    gap: 36px;
    overflow-x: auto;
  }

  .nav-category {
    margin-right: 0;
  }
}

/* 반응형 · 모바일 (650px 이하) */
@media (max-width: 650px) {
  .header-icon-group {
    gap: 10px;
  }

  .header-search {
    order: 3;
    flex-basis: 100%;
  }

  .nav-inner {
    gap: 28px;
  }

  .nav-category {
    margin-right: 0;
  }

  .nav-category,
  .nav-link {
    font-size: 13px;
  }
}
</style>
