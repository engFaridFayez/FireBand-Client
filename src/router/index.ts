import { createRouter, createWebHistory } from "vue-router";

// Public Views
const HomeView = () => import("@/views/HomeView.vue");
const PricingView = () => import("@/views/PricingView.vue");
const LoginView = () => import("@/views/LoginView.vue");
const BookingFormView = () => import("@/views/BookingFormView.vue")

// Admin Layout
const DashboardView = () =>
  import("@/views/admin/dashboard/DashboardView.vue");

// Dashboard
const AdminHomeView = () =>
  import("@/views/admin/dashboard/HomeView.vue");

// Categories
const CategoryListView = () =>
  import("@/views/admin/categories/CategoryListView.vue");
const CategoryCreateView = () =>
  import("@/views/admin/categories/CategoryCreateView.vue");
const CategoryDetailsView = () =>
  import("@/views/admin/categories/CategoryDetailsView.vue");
const CategoryEditView = () =>
  import("@/views/admin/categories/CategoryEditView.vue");

// SubCategories
const SubCategoryListView = () =>
  import("@/views/admin/subcategories/SubCategoryListView.vue")
const SubCategoryCreateView = () =>
  import("@/views/admin/subcategories/SubCategoryCreateView.vue")
const SubCategoryDetailsView = () =>
  import("@/views/admin/subcategories/SubCategoryDetailsView.vue")
const SubCategoryEditView = () =>
  import("@/views/admin/subcategories/SubCategoryEditView.vue")

// Rules
const RuleListView = () =>
  import("@/views/admin/rules/RuleListView.vue")
const RuleCreateView = () =>
  import("@/views/admin/rules/RuleCreateView.vue")
const RuleDetailsView = () =>
  import("@/views/admin/rules/RuleDetailsView.vue")
const RuleEditView = () =>
  import("@/views/admin/rules/RuleEditView.vue")

// Duration
const DuraionListView = () =>
  import("@/views/admin/durations/DurationListView.vue")
const DuraionCreateView = () =>
  import("@/views/admin/durations/DuraionCreateView.vue")
const DuraionDetailsView = () =>
  import("@/views/admin/durations/DurationDetailsView.vue")
const DuraionEditView = () =>
  import("@/views/admin/durations/DurationEditView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // ==========================
    // Public Routes
    // ==========================

    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/pricing",
      name: "pricing",
      component: PricingView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path:"/booking",
      name:"booking",
      component:BookingFormView
    },

    // ==========================
    // Admin Routes
    // ==========================

    {
      path: "/admin",
      component: DashboardView,

      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },

      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: AdminHomeView,
          meta: {
            title: "Dashboard",
          },
        },

        // Categories

        {
          path: "categories",
          name: "admin-categories",
          component: CategoryListView,
          meta: {
            title: "Categories",
          },
        },

        {
          path: "categories/create",
          name: "admin-category-create",
          component: CategoryCreateView,
        },

        {
          path: "categories/:id",
          name: "admin-category-details",
          component: CategoryDetailsView,
        },

        {
          path: "categories/:id/edit",
          name: "admin-category-edit",
          component: CategoryEditView,
        },

        // SubCategories
        {
          path: "sub-categories",
          name: "admin-subcategories",
          component: SubCategoryListView,
        },
        {
          path: "sub-categories/create",
          name: "admin-subcategory-create",
          component: SubCategoryCreateView,
        },
        {
          path: "sub-categories/:id/edit",
          name: "admin-subcategory-edit",
          component: SubCategoryEditView,
        },
        {
          path: "sub-categories/:id",
          name: "admin-subcategory-details",
          component: SubCategoryDetailsView
        },
        // Rules
        {
          path: "rules",
          name: "admin-rules",
          component: RuleListView,
          meta: {
            title: "Rules",
          },
        },
        {
          path: "rules/create",
          name: "admin-rule-create",
          component: RuleCreateView,
        },
        {
          path: "rules/:id",
          name: "admin-rule-details",
          component: RuleDetailsView,
        },
        {
          path: "rules/:id/edit",
          name: "admin-rule-edit",
          component: RuleEditView,
        },

        // Duration
        {
          path: "durations",
          name: "admin-durations",
          component: DuraionListView,
        },
        {
          path: "durations/create",
          name: "admin-duration-create",
          component: DuraionCreateView,
        },
        {
          path: "durations/:id",
          name: "admin-duration-details",
          component: DuraionDetailsView,
        },
        {
          path: "durations/:id/edit",
          name: "admin-duration-edit",
          component: DuraionEditView,
        },

      ],
    },

    // ==========================
    // 404
    // ==========================

    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],

  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;