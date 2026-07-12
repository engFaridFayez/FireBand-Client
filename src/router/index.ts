import HomeView from '@/views/HomeView.vue'
import PricingView from '@/views/PricingView.vue'
import { createRouter, createWebHistory } from 'vue-router'
const LoginView = () => import("@/views/LoginView.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
})

export default router
