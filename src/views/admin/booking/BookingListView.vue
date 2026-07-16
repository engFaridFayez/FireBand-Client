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
        <h1 class="text-3xl font-bold">Bookings</h1>

        <p class="text-gray-500">All booking requests.</p>
      </div>
    </div>

    <div
      class="overflow-hidden rounded-xl border border-zinc-200 bg-amber-950 shadow-sm"
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
            <tr v-if="loading">
              <td colspan="8" class="py-8 text-center">Loading...</td>
            </tr>

            <tr v-else-if="!bookings.length">
              <td colspan="8" class="py-8 text-center">No bookings found.</td>
            </tr>

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
  </section>
</template>
