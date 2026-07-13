import DashboardView from '@/views/admin/dashboard/DashboardView.vue';
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
    },
    {
      path: '/admin',
      component: DashboardView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: () =>
            import("@/views/admin/dashboard/HomeView.vue"),
        },

        // {
        //   path: "categories",
        //   name: "admin-categories",
        //   component: CategoryListView,
        // },

        // {
        //   path: "categories/create",
        //   name: "admin-category-create",
        //   component: CategoryCreateView,
        // },

        // {
        //   path: "categories/:slug",
        //   name: "admin-category-details",
        //   component: CategoryDetailsView,
        // },

        // {
        //   path: "categories/:slug/edit",
        //   name: "admin-category-edit",
        //   component: CategoryEditView,
        // },
      ],
    }
  ],
})

export default router
