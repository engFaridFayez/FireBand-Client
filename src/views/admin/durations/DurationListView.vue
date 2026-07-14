<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

import { useDurationStore } from "@/stores/duration";

const durationStore = useDurationStore();

const { durations, loading } = storeToRefs(durationStore);

onMounted(async () => {
  await durationStore.fetchDurations();
});

async function deleteDuration(id: number) {
  const result = await Swal.fire({
    title: "Delete Duration?",
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
    await durationStore.deleteDuration(id);

    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Duration deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete duration.",
    });
  }
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Duration Options</h1>

      <RouterLink
        :to="{ name: 'admin-duration-create' }"
        class="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400"
      >
        Add Duration
      </RouterLink>
    </div>

    <div v-if="loading" class="py-10 text-center text-gray-300">Loading...</div>

    <div v-else class="overflow-x-auto rounded-xl bg-[#171717]">
      <table class="w-full">
        <thead class="bg-[#222] text-gray-300">
          <tr>
            <th class="p-4 text-left">ID</th>
            <th class="p-4 text-left">Title</th>
            <th class="p-4 text-left">Minutes</th>
            <th class="p-4 text-left">Sub Category</th>
            <th class="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="duration in durations"
            :key="duration.id"
            class="border-t border-gray-800"
          >
            <td class="p-4 text-white">
              {{ duration.id }}
            </td>

            <td class="p-4 text-white">
              {{ duration.title }}
            </td>

            <td class="p-4 text-gray-300">{{ duration.minutes }} min</td>

            <td class="p-4 text-gray-300">
              {{ duration.sub_category_name }}
            </td>

            <td class="p-4">
              <div class="flex justify-center gap-3">
                <RouterLink
                  :to="{
                    name: 'admin-duration-details',
                    params: { id: duration.id },
                  }"
                  class="rounded bg-slate-600 px-3 py-1 hover:bg-slate-500"
                >
                  View
                </RouterLink>

                <RouterLink
                  :to="{
                    name: 'admin-duration-edit',
                    params: { id: duration.id },
                  }"
                  class="rounded bg-blue-600 px-3 py-1 hover:bg-blue-500"
                >
                  Edit
                </RouterLink>

                <button
                  @click="deleteDuration(duration.id)"
                  class="rounded bg-red-600 px-3 py-1 hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="durations.length === 0">
            <td colspan="5" class="py-10 text-center text-gray-500">
              No Duration Options Found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
