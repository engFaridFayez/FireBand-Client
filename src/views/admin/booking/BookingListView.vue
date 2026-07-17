<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useBookingStore } from "@/stores/booking";

import { showPopup } from "@/lib/swal"; // عدل المسار عندك

const router = useRouter();

const bookingStore = useBookingStore();

const { bookings, loading } = storeToRefs(bookingStore);

onMounted(async () => {
  await bookingStore.fetchBookings();
});

async function removeBooking(id: number) {
  const result = await showPopup(
    "warning",
    "Delete Booking",
    "Are you sure you want to delete this booking?",
    {
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    },
  );

  if (!result.isConfirmed) return;

  try {
    await bookingStore.deleteBooking(id);

    await showPopup("success", "Deleted", "Booking deleted successfully.");
  } catch (error: any) {
    await showPopup(
      "error",
      "Error",
      error.response?.data?.detail ?? "Something went wrong.",
    );
  }
}

function openDetails(id: number) {
  router.push(`/admin/bookings/${id}`);
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold sm:text-3xl">Bookings</h1>

        <p class="text-sm text-gray-500 sm:text-base">All booking requests.</p>
      </div>
    </div>

    <!-- Loading / empty states (shared) -->
    <div
      v-if="loading"
      class="rounded-xl border border-zinc-200 bg-amber-950 py-8 text-center text-white"
    >
      Loading...
    </div>

    <div
      v-else-if="!bookings.length"
      class="rounded-xl border border-zinc-200 bg-amber-950 py-8 text-center text-white"
    >
      No bookings found.
    </div>

    <template v-else>
      <!-- Mobile: stacked cards -->
      <div class="grid gap-4 sm:hidden">
        <div
          v-for="(booking, index) in bookings"
          :key="booking.id"
          class="rounded-xl border border-zinc-200 bg-amber-950 p-4 text-white shadow-sm"
        >
          <div class="mb-3 flex items-start justify-between gap-2">
            <div>
              <p class="text-xs text-zinc-400">#{{ index + 1 }}</p>
              <p class="font-semibold">{{ booking.full_name }}</p>
              <p class="text-sm text-zinc-300">{{ booking.phone }}</p>
            </div>
          </div>

          <dl class="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
            <div>
              <dt class="text-xs text-zinc-400">Category</dt>
              <dd>{{ booking.category.name }}</dd>
            </div>

            <div>
              <dt class="text-xs text-zinc-400">Sub Category</dt>
              <dd>{{ booking.sub_category.name }}</dd>
            </div>

            <div>
              <dt class="text-xs text-zinc-400">Date</dt>
              <dd>{{ booking.event_date }}</dd>
            </div>

            <div>
              <dt class="text-xs text-zinc-400">Time</dt>
              <dd>{{ booking.event_time }}</dd>
            </div>
          </dl>

          <div class="mt-4 flex gap-2">
            <button
              class="flex-1 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              @click="openDetails(booking.id)"
            >
              Details
            </button>

            <button
              class="flex-1 rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              @click="removeBooking(booking.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- sm and up: table -->
      <div
        class="hidden overflow-hidden rounded-xl border border-zinc-200 bg-amber-950 shadow-sm sm:block"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-zinc-500 text-left">
              <tr>
                <th class="px-4 py-3">#</th>

                <th class="px-4 py-3">Full Name</th>

                <th class="px-4 py-3">Phone</th>

                <th class="px-4 py-3">Category</th>

                <th class="px-4 py-3">Sub Category</th>

                <th class="px-4 py-3">Date</th>

                <th class="px-4 py-3">Time</th>

                <th class="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(booking, index) in bookings"
                :key="booking.id"
                class="border-t"
              >
                <td class="px-4 py-4">
                  {{ index + 1 }}
                </td>

                <td class="px-4 py-4">
                  {{ booking.full_name }}
                </td>

                <td class="px-4 py-4">
                  {{ booking.phone }}
                </td>

                <td class="px-4 py-4">
                  {{ booking.category.name }}
                </td>

                <td class="px-4 py-4">
                  {{ booking.sub_category.name }}
                </td>

                <td class="px-4 py-4">
                  {{ booking.event_date }}
                </td>

                <td class="px-4 py-4">
                  {{ booking.event_time }}
                </td>

                <td class="px-4 py-4">
                  <div class="flex justify-center gap-2">
                    <button
                      class="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      @click="openDetails(booking.id)"
                    >
                      Details
                    </button>

                    <button
                      class="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                      @click="removeBooking(booking.id)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </section>
</template>
