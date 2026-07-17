<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

import { useRuleStore } from "@/stores/rule";

const ruleStore = useRuleStore();

const { rules, loading } = storeToRefs(ruleStore);

onMounted(async () => {
  await ruleStore.fetchRules();
});

async function deleteRule(id: number) {
  const result = await Swal.fire({
    title: "Delete Rule?",
    text: "You won't be able to undo this action.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await ruleStore.deleteRule(id);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Rule deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete Rule.",
    });
  }
}
</script>

<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-xl font-bold text-white sm:text-2xl">Rules</h1>

      <RouterLink
        :to="{ name: 'admin-rule-create' }"
        class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-400 sm:text-base"
      >
        Add Rule
      </RouterLink>
    </div>

    <div v-if="loading" class="py-10 text-center text-gray-300">Loading...</div>

    <div
      v-else-if="rules.length === 0"
      class="rounded-xl bg-[#171717] py-10 text-center text-gray-500"
    >
      No Rules Found.
    </div>

    <template v-else>
      <!-- Mobile: stacked cards -->
      <div class="grid gap-4 sm:hidden">
        <div
          v-for="rule in rules"
          :key="rule.id"
          class="rounded-xl bg-[#171717] p-4"
        >
          <div class="flex items-start justify-between gap-2">
            <p class="text-xs text-gray-500">#{{ rule.id }}</p>
            <p class="text-xs text-gray-500">Order: {{ rule.order }}</p>
          </div>

          <p class="mt-2 font-medium text-white">
            {{ rule.text }}
          </p>

          <p class="mt-1 text-sm text-gray-400">
            {{ rule.sub_category_name }}
          </p>

          <div class="mt-4 flex gap-2">
            <RouterLink
              :to="{ name: 'admin-rule-details', params: { id: rule.id } }"
              class="flex-1 rounded bg-slate-600 px-3 py-2 text-center text-sm hover:bg-slate-500"
            >
              View
            </RouterLink>

            <RouterLink
              :to="{ name: 'admin-rule-edit', params: { id: rule.id } }"
              class="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm hover:bg-blue-500"
            >
              Edit
            </RouterLink>

            <button
              @click="deleteRule(rule.id)"
              class="flex-1 rounded bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- sm and up: table -->
      <div class="hidden overflow-x-auto rounded-xl bg-[#171717] sm:block">
        <table class="w-full">
          <thead class="bg-[#222] text-gray-300">
            <tr>
              <th class="p-4 text-left">ID</th>
              <th class="p-4 text-left">Rule</th>
              <th class="p-4 text-left">Sub Category</th>
              <th class="p-4 text-left">Order</th>
              <th class="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="rule in rules"
              :key="rule.id"
              class="border-t border-gray-800"
            >
              <td class="p-4 text-white">
                {{ rule.id }}
              </td>

              <td class="p-4 text-white">
                {{ rule.text }}
              </td>

              <td class="p-4 text-gray-300">
                {{ rule.sub_category_name }}
              </td>

              <td class="p-4 text-gray-300">
                {{ rule.order }}
              </td>

              <td class="p-4">
                <div class="flex justify-center gap-3">
                  <RouterLink
                    :to="{
                      name: 'admin-rule-details',
                      params: { id: rule.id },
                    }"
                    class="rounded bg-slate-600 px-3 py-1 hover:bg-slate-500"
                  >
                    View
                  </RouterLink>

                  <RouterLink
                    :to="{ name: 'admin-rule-edit', params: { id: rule.id } }"
                    class="rounded bg-blue-600 px-3 py-1 hover:bg-blue-500"
                  >
                    Edit
                  </RouterLink>

                  <button
                    @click="deleteRule(rule.id)"
                    class="rounded bg-red-600 px-3 py-1 hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
