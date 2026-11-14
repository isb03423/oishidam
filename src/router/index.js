import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import { session } from '../stores/session.js'
import { hasPasswordProof } from '../services/account.js'

const requireInquiryLogin = () => session.member ? true : { name: 'Login' }
const inquiryView = () => import('../views/InquiryHistoryView.vue')

const routes = [
  // 사용자 메인
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/products/:productId',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetailView.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/CheckoutView.vue'),
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    meta: { hideLayout: true },
    beforeEnter: () => {
      if (!session.member) return { name: 'Login' }
      return session.member.role === 'ADMIN' ? true : { name: 'Home' }
    },
    component: () => import('../views/AdminDashboardView.vue'),
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
    path: '/mypage/reviews',
    name: 'MyPageReviews',
    component: () => import('../views/ReviewHistoryView.vue')
  },
  {
    path: '/mypage/inquiries',
    name: 'MyPageInquiries',
    beforeEnter: requireInquiryLogin,
    component: inquiryView
  },
  {
    path: '/mypage/inquiries/new',
    name: 'MyPageInquiryWrite',
    beforeEnter: requireInquiryLogin,
    component: inquiryView
  },
  {
    path: '/mypage/inquiries/:inquiryId',
    name: 'MyPageInquiryDetail',
    redirect: (to) => ({ name: 'MyPageInquiries', query: { inquiryId: to.params.inquiryId } })
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
    path: '/mypage/withdraw',
    name: 'MyPageWithdraw',
    beforeEnter: () => session.member ? true : { name: 'Login' },
    component: () => import('../views/WithdrawView.vue')
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
