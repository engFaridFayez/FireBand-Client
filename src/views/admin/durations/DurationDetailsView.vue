<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { storeToRefs } from "pinia";

import { useDurationStore } from "@/stores/duration";

const router = useRouter();
const route = useRoute();

const durationStore = useDurationStore();

const { selectedDuration, loading } = storeToRefs(durationStore);

onMounted(async () => {
  await durationStore.fetchDuration(Number(route.params.id));
});
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-96 text-white text-lg"
  >
    Loading...
  </div>

  <div v-else-if="selectedDuration" class="max-w-5xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Duration Details</h1>

        <p class="mt-1 text-gray-400">
          {{ selectedDuration.title }}
        </p>
      </div>

      <button
        @click="router.back()"
        class="rounded-lg bg-zinc-700 px-5 py-2 text-white hover:bg-zinc-600"
      >
        Back
      </button>
    </div>

    <!-- Information -->
    <div class="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 class="mb-6 text-xl font-semibold text-white">Information</h2>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p class="mb-1 text-sm text-gray-400">ID</p>

          <p class="text-lg text-white">
            {{ selectedDuration.id }}
          </p>
        </div>

        <div>
          <p class="mb-1 text-sm text-gray-400">Title</p>

          <p class="text-lg text-white">
            {{ selectedDuration.title }}
          </p>
        </div>

        <div>
          <p class="mb-1 text-sm text-gray-400">Minutes</p>

          <p class="text-lg text-white">
            {{ selectedDuration.minutes }} Minutes
          </p>
        </div>

        <div>
          <p class="mb-1 text-sm text-gray-400">Sub Category</p>

          <p class="text-lg text-white">
            {{ selectedDuration.sub_category_name }}
          </p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3">
      <RouterLink
        :to="{
          name: 'admin-duration-edit',
          params: { id: selectedDuration.id },
        }"
        class="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-500"
      >
        Edit
      </RouterLink>

      <button
        @click="router.back()"
        class="rounded-lg bg-zinc-700 px-5 py-2 text-white hover:bg-zinc-600"
      >
        Back
      </button>
    </div>
  </div>
</template>
