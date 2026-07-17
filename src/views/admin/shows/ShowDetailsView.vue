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
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold sm:text-3xl">Show Details</h1>

        <p class="text-sm text-gray-500 sm:text-base">View show information.</p>
      </div>

      <button
        class="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white transition hover:bg-zinc-700 sm:px-5 sm:text-base"
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
        class="h-48 w-full object-cover sm:h-64 md:h-80"
      />

      <div class="grid gap-6 p-5 sm:p-8 md:grid-cols-2">
        <div>
          <p class="text-sm text-gray-500">Title</p>

          <h3 class="font-semibold break-words">
            {{ currentShow.title }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">City</p>

          <h3 class="font-semibold break-words">
            {{ currentShow.city }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Location</p>

          <h3 class="font-semibold break-words">
            {{ currentShow.location }}
          </h3>
        </div>

        <div>
          <p class="text-sm text-gray-500">Date</p>

          <h3 class="font-semibold break-words">
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
