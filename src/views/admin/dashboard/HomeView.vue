<script setup lang="ts">
const stats = [
  {
    title: "Bookings",
    value: 0,
    icon: "📅",
  },
  {
    title: "Categories",
    value: 0,
    icon: "🎵",
  },
  {
    title: "Shows",
    value: 0,
    icon: "🎤",
  },
  {
    title: "Team Members",
    value: 0,
    icon: "👥",
  },
];
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome -->
    <section>
      <h1 class="text-3xl font-bold text-white">Welcome Back 👋</h1>

      <p class="mt-2 text-gray-400">
        Here's a quick overview of your FireBand dashboard.
      </p>
    </section>

    <!-- Stats -->
    <section class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-yellow-500"
      >
        <div class="flex items-center justify-between">
          <span class="text-4xl">
            {{ stat.icon }}
          </span>

          <span class="text-3xl font-bold text-yellow-400">
            {{ stat.value }}
          </span>
        </div>

        <h3 class="mt-6 text-lg font-semibold">
          {{ stat.title }}
        </h3>
      </div>
    </section>

    <!-- Content -->
    <section class="grid gap-6 lg:grid-cols-2">
      <!-- Recent Bookings -->
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Recent Bookings</h2>

          <RouterLink
            to="/admin/bookings"
            class="text-sm text-yellow-400 hover:underline"
          >
            View All
          </RouterLink>
        </div>

        <div
          class="flex h-64 items-center justify-center rounded-xl border border-dashed border-zinc-700 text-gray-500"
        >
          No bookings yet.
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 class="mb-6 text-xl font-semibold">Quick Actions</h2>

        <div class="grid gap-4">
          <RouterLink
            to="/admin/categories/create"
            class="rounded-xl bg-yellow-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-yellow-400"
          >
            + Add Category
          </RouterLink>

          <RouterLink
            to="/admin/subcategories/create"
            class="rounded-xl bg-zinc-800 px-5 py-3 text-center transition hover:bg-zinc-700"
          >
            + Add Sub Category
          </RouterLink>

          <RouterLink
            to="/admin/shows/create"
            class="rounded-xl bg-zinc-800 px-5 py-3 text-center transition hover:bg-zinc-700"
          >
            + Add Show
          </RouterLink>

          <RouterLink
            to="/admin/team/create"
            class="rounded-xl bg-zinc-800 px-5 py-3 text-center transition hover:bg-zinc-700"
          >
            + Add Team Member
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
