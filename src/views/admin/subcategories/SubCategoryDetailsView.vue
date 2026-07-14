<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useCategoryStore } from "@/stores/category";

const router = useRouter();
const route = useRoute();

const categoryStore = useCategoryStore();

const { selectedSubCategory, loading } = storeToRefs(categoryStore);

onMounted(async () => {
  await categoryStore.fetchSubCategory(Number(route.params.id));
});
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-96 text-white text-lg"
  >
    Loading...
  </div>

  <div v-else-if="selectedSubCategory" class="max-w-6xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">
          {{ selectedSubCategory.name }}
        </h1>

        <p class="text-gray-400 mt-1">Sub Category Details</p>
      </div>

      <button
        @click="router.back()"
        class="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition"
      >
        Back
      </button>
    </div>

    <!-- Image + Info -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Image -->
      <div class="lg:col-span-1">
        <img
          v-if="selectedSubCategory.image"
          :src="selectedSubCategory.image"
          :alt="selectedSubCategory.name"
          class="w-full h-96 object-cover rounded-xl border border-zinc-800"
        />

        <div
          v-else
          class="w-full h-96 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-gray-500"
        >
          No Image
        </div>
      </div>

      <!-- Information -->
      <div
        class="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 p-6"
      >
        <h2 class="text-xl font-semibold text-white mb-6">Information</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-gray-400 text-sm mb-1">Name</p>

            <p class="text-white text-lg">
              {{ selectedSubCategory.name }}
            </p>
          </div>

          <div>
            <p class="text-gray-400 text-sm mb-1">Members</p>

            <p class="text-white text-lg">
              {{ selectedSubCategory.min_members }}
              -
              {{ selectedSubCategory.max_members }}
            </p>
          </div>

          <div class="md:col-span-2">
            <p class="text-gray-400 text-sm mb-1">Description</p>

            <p class="text-gray-300 leading-7">
              {{
                selectedSubCategory.description || "No description available."
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Rules -->
    <div class="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-semibold text-white">Rules</h2>

        <span class="text-sm text-gray-400">
          {{ selectedSubCategory.rules.length }} Rule(s)
        </span>
      </div>

      <div v-if="selectedSubCategory.rules.length" class="space-y-3">
        <div
          v-for="rule in selectedSubCategory.rules"
          :key="rule.id"
          class="rounded-lg bg-zinc-800 p-4 text-gray-300"
        >
          {{ rule.text }}
        </div>
      </div>

      <div v-else class="text-center py-8 text-gray-500">No Rules Found</div>
    </div>

    <!-- Duration Options -->
    <div class="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-semibold text-white">Duration Options</h2>

        <span class="text-sm text-gray-400">
          {{ selectedSubCategory.duration.length }} Option(s)
        </span>
      </div>

      <div v-if="selectedSubCategory.duration.length" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-zinc-700">
              <th class="py-3 text-left text-gray-300">Title</th>

              <th class="py-3 text-left text-gray-300">Minutes</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="duration in selectedSubCategory.duration"
              :key="duration.id"
              class="border-b border-zinc-800 hover:bg-zinc-800 transition"
            >
              <td class="py-4 text-white">
                {{ duration.title }}
              </td>

              <td class="py-4 text-gray-300">{{ duration.minutes }} min</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center py-8 text-gray-500">
        No Duration Options Found
      </div>
    </div>
  </div>
</template>
