<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useCategoryStore } from "@/stores/category";

const route = useRoute();

const categoryStore = useCategoryStore();

const { selectedCategory, loading } = storeToRefs(categoryStore);

onMounted(async () => {
  await categoryStore.fetchCategory(Number(route.params.id));
});
</script>

<template>
  <div v-if="loading" class="text-center py-20">Loading...</div>

  <div v-else-if="selectedCategory" class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">
          {{ selectedCategory.name }}
        </h1>

        <p class="mt-2 text-gray-400">Category Details</p>
      </div>

      <RouterLink
        :to="`/admin/categories/${selectedCategory.slug}/edit`"
        class="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
      >
        Edit Category
      </RouterLink>
    </div>

    <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <div class="grid gap-8 lg:grid-cols-2">
        <div>
          <img
            :src="selectedCategory.image"
            :alt="selectedCategory.name"
            class="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div class="space-y-6">
          <div>
            <p class="text-sm text-gray-500">Name</p>

            <h2 class="mt-1 text-xl font-semibold">
              {{ selectedCategory.name }}
            </h2>
          </div>

          <div>
            <p class="text-sm text-gray-500">Slug</p>

            <h2 class="mt-1 text-xl font-semibold">
              {{ selectedCategory.slug }}
            </h2>
          </div>

          <div>
            <p class="text-sm text-gray-500">Description</p>

            <p class="mt-2 leading-7 text-gray-300">
              {{ selectedCategory.description }}
            </p>
          </div>
          <p class="text-sm text-gray-500">Sub Categories</p>
          <div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="sub in selectedCategory.subcategories || []"
                :key="sub.id"
                class="rounded-full bg-zinc-800 px-4 py-2 text-sm"
              >
                {{ sub.name }}
              </span>

              <span
                v-if="!selectedCategory.subcategories?.length"
                class="text-gray-500"
              >
                No Sub Categories
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
