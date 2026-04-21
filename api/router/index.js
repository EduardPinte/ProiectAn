import { createRouter, createWebHistory } from 'vue-router'

// Auth Pages
import LogIn from '@/pages/auth/LogIn.vue'
import SignUpPage from '@/pages/auth/SignUp.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import CheckEmail from '@/pages/auth/CheckEmail.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'

// Main Pages
import Home from '@/pages/Home.vue'

// Search Pages
import SelectCar from '@/pages/search/SelectCar.vue'
import SelectBMY from '@/pages/search/SelectBMY.vue'
import SearchVIN from '@/pages/search/SearchVIN.vue'
import SearchLicense from '@/pages/search/SearchLicense.vue'

// Results Pages
import ResultPage from '@/pages/results/ResultPage.vue'
import History from '@/pages/results/History.vue'

// User Pages
import Profile from '@/pages/user/Profile.vue'
import Maintain from '@/pages/user/Maintain.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUpPage },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/check-email', component: CheckEmail },
  { path: '/reset-password', component: ResetPassword },
  
  { path: '/home', component: Home },
  { path: '/select-car', component: SelectCar },
  { path: '/selectBMY', component: SelectBMY },
  { path: '/searchVIN', component: SearchVIN },
  { path: '/searchLicense', component: SearchLicense, alias: '/searchLicensePlate' },
  { path: '/result', component: ResultPage },
  { path: '/history', component: History },
  { path: '/profile', component: Profile },
  { path: '/maintain', component: Maintain }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
