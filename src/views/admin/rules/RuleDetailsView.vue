<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useRuleStore } from "@/stores/rule";

const router = useRouter();
const route = useRoute();

const ruleStore = useRuleStore();

const { selectedRule, loading } = storeToRefs(ruleStore);

onMounted(async () => {
  await ruleStore.fetchRule(Number(route.params.id));
});
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-96 text-white text-lg"
  >
    Loading...
  </div>

  <div v-else-if="selectedRule" class="max-w-5xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Rule Details</h1>

        <p class="text-gray-400 mt-1">
          {{ selectedRule.sub_category_name }}
        </p>
      </div>

      <button
        @click="router.back()"
        class="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition"
      >
        Back
      </button>
    </div>

    <!-- Information -->
    <div class="bg-zinc-900 rounded-xl border border-zinc-800 p-6 space-y-6">
      <h2 class="text-xl font-semibold text-white">Information</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <p class="text-gray-400 text-sm mb-1">Order</p>

          <p class="text-white text-lg">
            {{ selectedRule.order }}
          </p>
        </div>

        <div class="md:col-span-2">
          <p class="text-gray-400 text-sm mb-1">Sub Category</p>

          <p class="text-white text-lg">
            {{ selectedRule.sub_category_name }}
          </p>
        </div>

        <div class="md:col-span-2">
          <p class="text-gray-400 text-sm mb-2">Rule Text</p>

          <div class="bg-zinc-800 rounded-lg p-4 text-gray-300 leading-7">
            {{ selectedRule.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3">
      <RouterLink
        :to="{
          name: 'admin-rule-edit',
          params: { id: selectedRule.id },
        }"
        class="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        Edit
      </RouterLink>

      <button
        @click="router.back()"
        class="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white"
      >
        Back
      </button>
    </div>
  </div>
</template>
