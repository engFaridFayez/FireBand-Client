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
  <div class="p-4 sm:p-6">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-xl font-bold text-white sm:text-2xl">Sub Categories</h1>

      <RouterLink
        :to="{ name: 'admin-subcategory-create' }"
        class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-400 sm:text-base"
      >
        Add Sub Category
      </RouterLink>
    </div>

    <div v-if="loading" class="py-10 text-center text-gray-300">Loading...</div>

    <div
      v-else-if="subCategories.length === 0"
      class="rounded-xl bg-[#171717] py-10 text-center text-gray-500"
    >
      No Sub Categories Found.
    </div>

    <template v-else>
      <!-- Mobile: stacked cards -->
      <div class="grid gap-4 sm:hidden">
        <div
          v-for="subCategory in subCategories"
          :key="subCategory.id"
          class="rounded-xl bg-[#171717] p-4"
        >
          <div class="flex gap-4">
            <img
              :src="subCategory.image"
              :alt="subCategory.name"
              class="h-16 w-16 shrink-0 rounded-lg object-cover"
            />

            <div class="min-w-0">
              <p class="truncate font-semibold text-white">
                {{ subCategory.name }}
              </p>

              <p class="mt-1 line-clamp-2 text-sm text-gray-400">
                {{ subCategory.description }}
              </p>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <RouterLink
              :to="{
                name: 'admin-subcategory-details',
                params: { id: subCategory.id },
              }"
              class="flex-1 rounded bg-slate-600 px-3 py-2 text-center text-sm hover:bg-slate-500"
            >
              View
            </RouterLink>
            <RouterLink
              :to="{
                name: 'admin-subcategory-edit',
                params: { id: subCategory.id },
              }"
              class="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm hover:bg-blue-500"
            >
              Edit
            </RouterLink>

            <button
              @click="deleteSubCategory(subCategory.id)"
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
                  class="h-16 w-16 rounded-lg object-cover"
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
                    class="rounded bg-slate-600 px-3 py-1 hover:bg-slate-500"
                  >
                    View
                  </RouterLink>
                  <RouterLink
                    :to="{
                      name: 'admin-subcategory-edit',
                      params: { id: subCategory.id },
                    }"
                    class="rounded bg-blue-600 px-3 py-1 hover:bg-blue-500"
                  >
                    Edit
                  </RouterLink>

                  <button
                    @click="deleteSubCategory(subCategory.id)"
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
