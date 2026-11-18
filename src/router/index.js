import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import { session } from '../stores/session.js'
import { hasPasswordProof } from '../services/account.js'
import { accessRedirect } from './access.js'

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
    path: '/payment/success', name: 'PaymentSuccess',
    component: () => import('../views/PaymentResultView.vue'),
  },
  {
    path: '/payment/fail', name: 'PaymentFail',
    component: () => import('../views/PaymentResultView.vue'),
  },
  {
    path: '/admin/inventory',
    redirect: (to) => ({ name: 'AdminDashboard', params: { section: 'products' }, query: to.query, hash: to.hash }),
  },
  {
    path: '/admin/:section(products|categories|orders|members|inquiries|reviews|analytics|sentiments)?',
    name: 'AdminDashboard',
    meta: { hideLayout: true },
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
    component: inquiryView
  },
  {
    path: '/mypage/inquiries/new',
    name: 'MyPageInquiryWrite',
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
    component: () => import('../views/AddressView.vue')
  },
  {
    path: '/mypage/profile',
    name: 'MyPageProfile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/mypage/withdraw',
    name: 'MyPageWithdraw',
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
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    meta: { hideLayout: true },
    component: () => import('../views/AccessDeniedView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { hideLayout: true },
    component: () => import('../views/AccessDeniedView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => accessRedirect(to, from, session.member))

export default router
