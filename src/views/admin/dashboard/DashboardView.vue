<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const sidebarOpen = ref(false);

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/admin",
    icon: "🏠",
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: "🎵",
  },
  {
    name: "Sub Categories",
    path: "/admin/sub-categories",
    icon: "📂",
  },
  {
    name: "Rules",
    path: "/admin/rules",
    icon: "📜",
  },
  {
    name: "Durations",
    path: "/admin/durations",
    icon: "⏱️",
  },
  {
    name: "Bookings",
    path: "/admin/bookings",
    icon: "📅",
  },
  {
    name: "Shows",
    path: "/admin/shows",
    icon: "🎤",
  },
  {
    name: "Team",
    path: "/admin/team",
    icon: "👥",
  },
  {
    name: "FireBand Gallery",
    path: "/admin/gallery",
    icon: "👥",
  },
  {
    name: "FireBand Reels",
    path: "/admin/reels",
    icon: "👥",
  },
];

const closeSidebar = () => {
  sidebarOpen.value = false;
};

// Auto-close the drawer whenever the route changes (link clicked)
watch(
  () => route.path,
  () => {
    sidebarOpen.value = false;
  },
);
</script>

<template>
  <div class="flex min-h-screen bg-zinc-950 text-white">
    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
      @click="closeSidebar"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 w-72 shrink-0 border-r border-zinc-800 bg-zinc-900 transition-transform duration-300 lg:static lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between border-b border-zinc-800 p-6">
        <div>
          <h1 class="text-2xl font-bold text-yellow-400">FireBand</h1>

          <p class="mt-1 text-sm text-gray-400">Admin Dashboard</p>
        </div>

        <button
          type="button"
          class="rounded-lg p-2 text-gray-400 hover:bg-zinc-800 hover:text-white lg:hidden"
          aria-label="Close menu"
          @click="closeSidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
      </div>

      <nav class="h-[calc(100%-96px)] space-y-2 overflow-y-auto p-4">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="flex items-center gap-3 rounded-xl px-4 py-3 transition"
          :class="
            link.path === '/'
              ? route.path === '/'
                ? 'bg-yellow-500 text-black'
                : 'hover:bg-zinc-800'
              : route.path.startsWith(link.path) && link.path !== '/admin'
                ? 'bg-yellow-500 text-black'
                : route.path === '/admin' && link.path === '/admin'
                  ? 'bg-yellow-500 text-black'
                  : 'hover:bg-zinc-800'
          "
        >
          <span class="text-xl">
            {{ link.icon }}
          </span>

          <span>
            {{ link.name }}
          </span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Content -->
    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Header -->
      <header
        class="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 sm:h-20 sm:px-8"
      >
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="rounded-lg p-2 text-gray-400 hover:bg-zinc-800 hover:text-white lg:hidden"
            aria-label="Open menu"
            @click="sidebarOpen = true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h2 class="text-lg font-semibold sm:text-2xl">Dashboard</h2>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <div class="hidden text-right sm:block">
            <p class="font-semibold">Admin</p>

            <p class="text-sm text-gray-400">Welcome Back 👋</p>
          </div>

          <img
            src="https://ui-avatars.com/api/?name=Admin"
            alt="Admin"
            class="h-10 w-10 rounded-full sm:h-12 sm:w-12"
          />
        </div>
      </header>

      <!-- Pages -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>