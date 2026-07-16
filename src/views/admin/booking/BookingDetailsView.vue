<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useBookingStore } from "@/stores/booking";

const route = useRoute();
const router = useRouter();

const bookingStore = useBookingStore();

const { selectedBooking, loading } = storeToRefs(bookingStore);

onMounted(async () => {
  await bookingStore.fetchBooking(Number(route.params.id));
});

const booking = computed(() => selectedBooking.value);

function goBack() {
  router.back();
}
const formattedDate = computed(() => {
  if (!booking.value) return "";

  return new Date(booking.value.event_date).toLocaleDateString();
});

const formattedTime = computed(() => {
  if (!booking.value) return "";

  return booking.value.event_time.slice(0, 5);
});
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Booking Details</h1>

        <p class="text-gray-500">View booking information.</p>
      </div>

      <button
        class="rounded-lg bg-zinc-800 px-5 py-2 text-white transition hover:bg-zinc-700"
        @click="goBack"
      >
        Back
      </button>
    </div>

    <div v-if="loading" class="rounded-xl border bg-white p-8 text-center">
      Loading...
    </div>

    <div
      v-else-if="booking"
      class="rounded-xl border border-zinc-200 bg-amber-950 p-8 shadow-sm"
    >
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <p class="text-sm text-gray-500">Full Name</p>

          <h3 class="font-semibold">
            {{ booking.full_name }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Phone</p>

          <h3 class="font-semibold">
            {{ booking.phone }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Email</p>

          <h3 class="font-semibold">
            {{ booking.email || "-" }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Category</p>

          <h3 class="font-semibold">
            {{ booking.category.name }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Sub Category</p>

          <h3 class="font-semibold">
            {{ booking.sub_category.name }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Duration</p>

          <h3 class="font-semibold">
            {{ booking.duration.title }}
            ({{ booking.duration.minutes }} min)
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Event Date</p>

          <h3 class="font-semibold">
            {{ formattedDate }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Event Time</p>

          <h3 class="font-semibold">
            {{ formattedTime }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Team Members</p>

          <h3 class="font-semibold">
            {{ booking.team_members }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Location</p>

          <h3 class="font-semibold">
            {{ booking.location }}
          </h3>
        </div>

        <div v-if="booking.custom_sub_category" class="md:col-span-2">
          <p class="text-sm text-gray-500">Custom Sub Category</p>

          <h3 class="font-semibold">
            {{ booking.custom_sub_category }}
          </h3>
        </div>

        <div class="md:col-span-2">
          <p class="text-sm text-gray-500">Notes</p>

          <div class="mt-2 rounded-lg bg-zinc-900 p-4 whitespace-pre-wrap">
            {{ booking.notes || "No notes." }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
