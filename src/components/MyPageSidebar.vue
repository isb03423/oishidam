<script setup>
import { RouterLink } from 'vue-router'

const shoppingMenus = [
  { id: 'orders', label: '주문/배송 조회', route: 'MyPageOrders' },
  { id: 'wishlist', label: '찜한 상품', route: 'MyPageWishlist' },
  { id: 'cart', label: '장바구니', route: 'MyPageCart' },
]

const accountMenus = [
  { id: 'profile', label: '내 정보 관리', route: 'MyPageProfile' },
  { id: 'address', label: '배송지 관리', route: 'MyPageAddress' },
  { id: 'withdraw', label: '회원 탈퇴', route: 'MyPageWithdraw' },
]
</script>

<template>
  <aside class="mypage-sidebar" aria-label="마이페이지 메뉴">
    <p class="sidebar-title"><RouterLink :to="{ name: 'MyPage' }">마이페이지</RouterLink></p>

    <nav>
      <section class="sidebar-section" aria-labelledby="shopping-menu-title">
        <h2 id="shopping-menu-title" class="sidebar-section-title">나의 쇼핑</h2>
        <ul class="sidebar-menu-list">
          <li v-for="item in shoppingMenus" :key="item.id">
            <component
              :is="item.route ? RouterLink : 'button'"
              :to="item.route ? { name: item.route } : undefined"
              :type="item.route ? undefined : 'button'"
              class="sidebar-menu-button"
            >
              <svg v-if="item.id === 'orders'" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h3l4 4v2h-7zM6 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /></svg>
              <svg v-else-if="item.id === 'wishlist'" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10h10.6l2-7H7.2M9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg>
              <span>{{ item.label }}</span>
            </component>
          </li>
        </ul>
      </section>

      <section class="sidebar-section" aria-labelledby="activity-menu-title">
        <h2 id="activity-menu-title" class="sidebar-section-title">나의 활동</h2>
        <ul class="sidebar-menu-list">
          <li>
            <RouterLink :to="{ name: 'MyPageReviews' }" class="sidebar-menu-button">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v12H9l-4 4V4ZM8 8h8m-8 4h6" /></svg>
              <span>마이 후기</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'MyPageInquiries' }" class="sidebar-menu-button">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8 8.5 8.5 0 0 1-3.5-.8L4 20l1.4-4A8 8 0 1 1 20 11Z" /></svg>
              <span>문의 내역</span>
            </RouterLink>
          </li>
        </ul>
      </section>

      <section class="sidebar-section" aria-labelledby="account-menu-title">
        <h2 id="account-menu-title" class="sidebar-section-title">나의 정보</h2>
        <ul class="sidebar-menu-list">
          <li v-for="item in accountMenus" :key="item.id">
            <component :is="item.route ? RouterLink : 'button'" :to="item.route ? { name: item.route } : undefined" :type="item.route ? undefined : 'button'" class="sidebar-menu-button">
              <svg v-if="item.id === 'profile'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg>
              <svg v-else-if="item.id === 'address'" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H5v18h9M10 12h11M18 8l4 4-4 4" /></svg>
              <span>{{ item.label }}</span>
            </component>
          </li>
        </ul>
      </section>
    </nav>
  </aside>
</template>

<style scoped src="../styles/sidebar.css"></style>
