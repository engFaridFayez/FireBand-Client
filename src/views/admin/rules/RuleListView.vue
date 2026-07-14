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
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">Rules</h1>

      <RouterLink
        :to="{ name: 'admin-rule-create' }"
        class="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition"
      >
        Add Rule
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center text-gray-300 py-10">Loading...</div>

    <div v-else class="overflow-x-auto rounded-xl bg-[#171717]">
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
                  :to="{ name: 'admin-rule-details', params: { id: rule.id } }"
                  class="px-3 py-1 rounded bg-slate-600 hover:bg-slate-500"
                >
                  View
                </RouterLink>

                <RouterLink
                  :to="{ name: 'admin-rule-edit', params: { id: rule.id } }"
                  class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500"
                >
                  Edit
                </RouterLink>

                <button
                  @click="deleteRule(rule.id)"
                  class="px-3 py-1 rounded bg-red-600 hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="rules.length === 0">
            <td colspan="5" class="text-center py-10 text-gray-500">
              No Rules Found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
