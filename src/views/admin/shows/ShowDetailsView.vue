<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useHomeStore } from "@/stores/home";

const route = useRoute();
const router = useRouter();

const homeStore = useHomeStore();

const { show, loading } = storeToRefs(homeStore);

onMounted(async () => {
  await homeStore.getShowById(Number(route.params.id));
});

const currentShow = computed(() => show.value);

function goBack() {
  router.back();
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Show Details</h1>

        <p class="text-gray-500">View show information.</p>
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
      v-else-if="currentShow"
      class="overflow-hidden rounded-xl border border-zinc-500 bg-orange-600 shadow-sm"
    >
      <img
        :src="currentShow.image"
        :alt="currentShow.title"
        class="h-80 w-full object-cover"
      />

      <div class="grid gap-6 p-8 md:grid-cols-2">
        <div>
          <p class="text-sm text-gray-500">Title</p>

          <h3 class="font-semibold">
            {{ currentShow.title }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">City</p>

          <h3 class="font-semibold">
            {{ currentShow.city }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Location</p>

          <h3 class="font-semibold">
            {{ currentShow.location }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Date</p>

          <h3 class="font-semibold">
            {{ currentShow.date }}
          </h3>
        </div>

        <div class="md:col-span-2">
          <p class="text-sm text-gray-500">Tag</p>

          <span
            class="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700"
          >
            {{ currentShow.tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
