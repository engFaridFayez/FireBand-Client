<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useReelStore } from "@/stores/reel";

const router = useRouter();
const reelStore = useReelStore();

onMounted(() => {
  reelStore.fetchReels();
});

async function remove(id: number) {
  const result = await Swal.fire({
    title: "Delete Reel?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  await reelStore.deleteReel(id);

  Swal.fire({
    icon: "success",
    title: "Deleted",
    timer: 1500,
    showConfirmButton: false,
  });
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-bold sm:text-2xl">Reels</h1>
        <p class="text-sm text-gray-500 sm:text-base">
          Manage reels and videos.
        </p>
      </div>

      <button
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 sm:text-base"
        @click="router.push({ name: 'reel-create' })"
      >
        Add Reel
      </button>
    </div>

    <div
      v-if="!reelStore.reels.length"
      class="rounded-xl bg-amber-950 py-8 text-center text-gray-300 shadow"
    >
      No reels found.
    </div>

    <template v-else>
      <!-- Mobile: stacked cards -->
      <div class="grid gap-4 sm:hidden">
        <div
          v-for="reel in reelStore.reels"
          :key="reel.id"
          class="rounded-xl bg-amber-950 p-4 text-white shadow"
        >
          <div class="flex gap-4">
            <img
              v-if="reel.thumbnail"
              :src="reel.thumbnail"
              class="h-16 w-24 shrink-0 rounded object-cover"
            />

            <span
              v-else
              class="flex h-16 w-24 shrink-0 items-center justify-center rounded bg-zinc-800 text-center text-xs text-gray-400"
            >
              No Thumbnail
            </span>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <p class="truncate font-semibold">{{ reel.title }}</p>

                <span
                  class="shrink-0 rounded-full px-2 py-0.5 text-xs"
                  :class="
                    reel.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  "
                >
                  {{ reel.is_active ? "Active" : "Inactive" }}
                </span>
              </div>

              <p class="mt-1 text-sm text-zinc-300">
                {{ reel.sub_category.name }}
              </p>

              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span
                  class="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                >
                  {{ reel.platform_display }}
                </span>

                <span class="text-xs text-zinc-400"
                  >Order: {{ reel.order }}</span
                >
              </div>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <button
              class="flex-1 rounded bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
              @click="
                router.push({
                  name: 'reel-edit',
                  params: { id: reel.id },
                })
              "
            >
              Edit
            </button>

            <button
              class="flex-1 rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
              @click="remove(reel.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- sm and up: table -->
      <div
        class="hidden overflow-hidden rounded-xl bg-amber-950 shadow sm:block"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-900">
              <tr>
                <th class="px-4 py-3 text-left">Thumbnail</th>
                <th class="px-4 py-3 text-left">Title</th>
                <th class="px-4 py-3 text-left">Platform</th>
                <th class="px-4 py-3 text-left">Sub Category</th>
                <th class="px-4 py-3 text-left">Order</th>
                <th class="px-4 py-3 text-left">Status</th>
                <th class="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="reel in reelStore.reels"
                :key="reel.id"
                class="border-t"
              >
                <td class="px-4 py-3">
                  <img
                    v-if="reel.thumbnail"
                    :src="reel.thumbnail"
                    class="h-16 w-24 rounded object-cover"
                  />

                  <span v-else class="text-sm text-gray-400">
                    No Thumbnail
                  </span>
                </td>

                <td class="px-4 py-3">
                  {{ reel.title }}
                </td>

                <td class="px-4 py-3">
                  <span
                    class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
                  >
                    {{ reel.platform_display }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  {{ reel.sub_category.name }}
                </td>

                <td class="px-4 py-3">
                  {{ reel.order }}
                </td>

                <td class="px-4 py-3">
                  <span
                    class="rounded-full px-3 py-1 text-xs"
                    :class="
                      reel.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    "
                  >
                    {{ reel.is_active ? "Active" : "Inactive" }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <div class="flex justify-center gap-2">
                    <button
                      class="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      @click="
                        router.push({
                          name: 'reel-edit',
                          params: { id: reel.id },
                        })
                      "
                    >
                      Edit
                    </button>

                    <button
                      class="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      @click="remove(reel.id)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
