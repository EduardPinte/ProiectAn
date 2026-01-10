import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/pages/LogIn.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import CheckEmail from '@/pages/CheckEmail.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
import Home from '@/pages/Home.vue'
import SelectCar from '@/pages/SelectCar.vue'
import Maintain from '@/pages/Maintain.vue'
import History from '@/pages/History.vue'
import Profile from '@/pages/Profile.vue'
import SelectBMY from '@/pages/SelectBMY.vue'
import SearchVIN from '@/pages/SearchVIN.vue'
import SearchLicience from '@/pages/SearchLicience.vue'
import Result from '@/pages/Result.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUpPage },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/check-email', component: CheckEmail },
  { path: '/reset-password', component: ResetPassword },
  { path: '/home', component: Home },
  { path: '/select-car', component: SelectCar },
  { path: '/maintain', component: Maintain },
  { path: '/history', component: History },
  { path: '/profile', component: Profile },
  { path: '/selectBMY', component: SelectBMY },
  { path: '/searchVIN', component: SearchVIN },
  { path: '/searchLicense', component: SearchLicience, alias: '/searchLicensePlate' },
  { path: '/result', component: Result }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
