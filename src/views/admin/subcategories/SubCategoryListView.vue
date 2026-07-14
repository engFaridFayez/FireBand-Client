<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

const categoryStore = useCategoryStore();

const { subCategories, loading } = storeToRefs(categoryStore);

onMounted(async () => {
  await categoryStore.fetchSubCategories();
});

async function deleteSubCategory(id: number) {
  const result = await Swal.fire({
    title: "Delete Sub Category?",
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
    await categoryStore.deleteSubCategory(id);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Sub Category deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete Sub Category.",
    });
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">Sub Categories</h1>

      <RouterLink
        :to="{ name: 'admin-subcategory-create' }"
        class="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition"
      >
        Add Sub Category
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center text-gray-300 py-10">Loading...</div>

    <div v-else class="overflow-x-auto rounded-xl bg-[#171717]">
      <table class="w-full">
        <thead class="bg-[#222] text-gray-300">
          <tr>
            <th class="p-4 text-left">Image</th>
            <th class="p-4 text-left">Name</th>
            <th class="p-4 text-left">Description</th>
            <th class="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="subCategory in subCategories"
            :key="subCategory.id"
            class="border-t border-gray-800"
          >
            <td class="p-4">
              <img
                :src="subCategory.image"
                :alt="subCategory.name"
                class="w-16 h-16 object-cover rounded-lg"
              />
            </td>

            <td class="p-4 text-white">
              {{ subCategory.name }}
            </td>

            <td class="p-4 text-gray-400">
              {{ subCategory.description }}
            </td>

            <td class="p-4">
              <div class="flex justify-center gap-3">
                <RouterLink
                  :to="{
                    name: 'admin-subcategory-details',
                    params: { id: subCategory.id },
                  }"
                  class="px-3 py-1 rounded bg-slate-600 hover:bg-slate-500"
                >
                  View
                </RouterLink>
                <RouterLink
                  :to="{
                    name: 'admin-subcategory-edit',
                    params: { id: subCategory.id },
                  }"
                  class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500"
                >
                  Edit
                </RouterLink>

                <button
                  @click="deleteSubCategory(subCategory.id)"
                  class="px-3 py-1 rounded bg-red-600 hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="subCategories.length === 0">
            <td colspan="4" class="text-center py-10 text-gray-500">
              No Sub Categories Found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
