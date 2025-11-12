import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/pages/LogIn.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import CheckEmail from '@/pages/CheckEmail.vue'
import ResetPassword from '@/pages/ResetPassword.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUpPage },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/check-email', component: CheckEmail },
  { path: '/reset-password', component: ResetPassword }
]

const router = createRouter({
  history: createWebHistory('/MyProject/'),
  routes
})

export default router