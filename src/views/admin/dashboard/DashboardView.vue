<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();

const links = [
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
];
</script>

<template>
  <div class="flex min-h-screen bg-zinc-950 text-white">
    <!-- Sidebar -->
    <aside class="w-72 border-r border-zinc-800 bg-zinc-900">
      <div class="border-b border-zinc-800 p-6">
        <h1 class="text-2xl font-bold text-yellow-400">FireBand</h1>

        <p class="mt-1 text-sm text-gray-400">Admin Dashboard</p>
      </div>

      <nav class="space-y-2 p-4">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="flex items-center gap-3 rounded-xl px-4 py-3 transition"
          :class="
            route.path.startsWith(link.path) && link.path !== '/admin'
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
    <div class="flex flex-1 flex-col">
      <!-- Header -->
      <header
        class="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-8"
      >
        <h2 class="text-2xl font-semibold">Dashboard</h2>

        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="font-semibold">Admin</p>

            <p class="text-sm text-gray-400">Welcome Back 👋</p>
          </div>

          <img
            src="https://ui-avatars.com/api/?name=Admin"
            alt="Admin"
            class="h-12 w-12 rounded-full"
          />
        </div>
      </header>

      <!-- Pages -->
      <main class="flex-1 overflow-y-auto p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
