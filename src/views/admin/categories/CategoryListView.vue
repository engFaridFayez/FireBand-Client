<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

import { useCategoryStore } from "@/stores/category";
import { showPopup } from "@/lib/swal";

const categoryStore = useCategoryStore();

const { categories, loading } = storeToRefs(categoryStore);

onMounted(() => {
  categoryStore.fetchCategories();
});

async function deleteCategory(id: number) {
  const result = await showPopup(
    "warning",
    "Delete Category",
    "Are you sure you want to delete this category?",
    {
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    }
  );

  if (!result.isConfirmed) return;

  try {
    await categoryStore.deleteCategory(id);

    await showPopup(
      "success",
      "Deleted",
      "Category deleted successfully."
    );
  } catch (error: any) {
    await showPopup(
      "error",
      "Error",
      error.response?.data?.detail ?? "Something went wrong."
    );
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Categories</h1>

        <p class="mt-1 text-gray-400">Manage all event categories.</p>
      </div>

      <RouterLink
        :to="{ name: 'admin-category-create' }"
        class="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
      >
        + Add Category
      </RouterLink>
    </div>

    <div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <table class="w-full">
        <thead class="bg-zinc-800">
          <tr>
            <th class="px-6 py-4 text-left">Image</th>

            <th class="px-6 py-4 text-left">Name</th>

            <th class="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="py-8 text-center">Loading...</td>
          </tr>

          <tr
            v-for="category in categories"
            :key="category.id"
            class="border-t border-zinc-800"
          >
            <td class="px-6 py-4">
              <img
                :src="category.image"
                :alt="category.name"
                class="h-16 w-16 rounded-lg object-cover"
              />
            </td>

            <td class="px-6 py-4">
              {{ category.name }}
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center gap-3">
                <RouterLink
                  :to="`/admin/categories/${category.id}`"
                  class="rounded bg-blue-600 px-3 py-2 text-sm"
                >
                  View
                </RouterLink>

                <RouterLink
                  v-if="category.id"
                  :to="{
                    name: 'admin-category-edit',
                    params: { id: category.id },
                  }"
                  class="rounded bg-green-600 px-3 py-2 text-sm"
                >
                  Edit
                </RouterLink>

                <button
                  class="rounded bg-red-600 px-3 py-2 text-sm"
                  @click="deleteCategory(category.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="!loading && categories.length === 0">
            <td colspan="4" class="py-8 text-center text-gray-500">
              No Categories Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
