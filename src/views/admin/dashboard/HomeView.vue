<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useBookingStore } from "@/stores/booking";
import { useCategoryStore } from "@/stores/category";
import { useHomeStore } from "@/stores/home";

const bookingStore = useBookingStore();
const categoryStore = useCategoryStore();
const homeStore = useHomeStore();

const stats = computed(() => [
  {
    title: "Bookings",
    value: bookingStore.bookings.length,
    icon: "📅",
  },
  {
    title: "Categories",
    value: categoryStore.categories.length,
    icon: "🎵",
  },
  {
    title: "Shows",
    value: homeStore.shows.length,
    icon: "🎤",
  },
  {
    title: "Team Members",
    value: homeStore.team.length,
    icon: "👥",
  },
]);

const recentBookings = computed(() => bookingStore.bookings.slice(0, 5));

onMounted(async () => {
  await bookingStore.fetchBookings();
  await categoryStore.fetchCategories();
  await homeStore.getAllShows();
  await homeStore.getAllTeam();
});
</script>

<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Welcome -->
    <section>
      <h1 class="text-2xl font-bold text-white sm:text-3xl">Welcome Back 👋</h1>

      <p class="mt-2 text-sm text-gray-400 sm:text-base">
        Here's a quick overview of your FireBand dashboard.
      </p>
    </section>

    <!-- Stats -->
    <section
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
    >
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-yellow-500 sm:p-6"
      >
        <div class="flex items-center justify-between">
          <span class="text-3xl sm:text-4xl">
            {{ stat.icon }}
          </span>

          <span class="text-2xl font-bold text-yellow-400 sm:text-3xl">
            {{ stat.value }}
          </span>
        </div>

        <h3 class="mt-4 text-base font-semibold sm:mt-6 sm:text-lg">
          {{ stat.title }}
        </h3>
      </div>
    </section>

    <!-- Content -->
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Recent Bookings -->
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
        <div class="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h2 class="text-lg font-semibold sm:text-xl">Recent Bookings</h2>

          <RouterLink
            to="/admin/bookings"
            class="text-sm text-yellow-400 hover:underline"
          >
            View All
          </RouterLink>
        </div>

        <div v-if="recentBookings.length" class="space-y-3">
          <div
            v-for="booking in recentBookings"
            :key="booking.id"
            class="flex items-center justify-between rounded-lg border border-zinc-800 p-3"
          >
            <div>
              <p class="font-semibold">
                {{ booking.full_name }}
              </p>

              <p class="text-sm text-zinc-400">
                {{ booking.category.name }}
              </p>
            </div>

            <span class="text-xs text-zinc-500">
              {{ booking.event_date }}
            </span>
          </div>
        </div>

        <div
          v-else
          class="flex h-48 items-center justify-center rounded-xl border border-dashed border-zinc-700 text-gray-500"
        >
          No bookings yet.
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
        <h2 class="mb-6 text-lg font-semibold sm:text-xl">Quick Actions</h2>

        <div class="grid gap-3 sm:gap-4">
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
