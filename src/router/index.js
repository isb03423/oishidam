import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import { session } from '../stores/session.js'
import { hasPasswordProof } from '../services/account.js'

const routes = [
  // 사용자 메인
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    meta: { hideLayout: true },
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: { hideLayout: true },
    component: () => import('../views/auth/SignupView.vue')
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('../views/MyPageView.vue')
  },
  {
    path: '/mypage/orders',
    name: 'MyPageOrders',
    component: () => import('../views/OrderHistoryView.vue')
  },
  {
    path: '/mypage/orders/:orderId',
    name: 'MyPageOrderDetail',
    component: () => import('../views/OrderDetailView.vue')
  },
  {
    path: '/mypage/address',
    name: 'MyPageAddress',
    beforeEnter: () => session.member ? true : { name: 'Login' },
    component: () => import('../views/AddressView.vue')
  },
  {
    path: '/mypage/profile',
    name: 'MyPageProfile',
    beforeEnter: () => session.member ? true : { name: 'Login' },
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/mypage/profile/password',
    name: 'MyPagePassword',
    beforeEnter: () => hasPasswordProof() ? true : { name: 'MyPageProfile' },
    component: () => import('../views/PasswordChangeView.vue')
  },
  {
    path: '/mypage/cart',
    name: 'MyPageCart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/mypage/wishlist',
    name: 'MyPageWishlist',
    component: () => import('../views/WishlistView.vue')
  }

  // 앞으로 사용자·관리자 URL을 여기에 추가
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
