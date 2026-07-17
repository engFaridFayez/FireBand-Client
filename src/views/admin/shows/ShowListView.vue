<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useHomeStore } from "@/stores/home";
import { showPopup } from "@/lib/swal";

const router = useRouter();

const homeStore = useHomeStore();

const { shows, loading } = storeToRefs(homeStore);

onMounted(async () => {
  await homeStore.getAllShows();
});

function createShow() {
  router.push("/admin/shows/create");
}

function editShow(id: number) {
  router.push(`/admin/shows/${id}/edit`);
}

function showDetails(id: number) {
  router.push(`/admin/shows/${id}`);
}

async function deleteShow(id: number) {
  const result = await Swal.fire({
    icon: "warning",
    title: "Delete Show",
    text: "Are you sure you want to delete this show?",

    showCancelButton: true,

    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",

    background: "#15111f",
    color: "#fff",
  });

  if (!result.isConfirmed) return;

  try {
    await homeStore.deleteShow(id);

    await showPopup(
      "success",
      "Deleted",
      "Show deleted successfully."
    );
  } catch (error: any) {
    await showPopup(
      "error",
      "Error",
      error.response?.data?.detail ??
        "Something went wrong."
    );
  }
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold sm:text-3xl">Shows</h1>

        <p class="text-sm text-gray-500 sm:text-base">Manage all shows.</p>
      </div>

      <button
        class="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600 sm:px-5 sm:text-base"
        @click="createShow"
      >
        Add Show
      </button>
    </div>

    <!-- Loading / empty states (shared) -->
    <div
      v-if="loading"
      class="rounded-xl border border-zinc-200 bg-amber-950 py-8 text-center text-white"
    >
      Loading...
    </div>

    <div
      v-else-if="!shows.length"
      class="rounded-xl border border-zinc-200 bg-amber-950 py-8 text-center text-white"
    >
      No shows found.
    </div>

    <template v-else>
      <!-- Mobile: stacked cards -->
      <div class="grid gap-4 sm:hidden">
        <div
          v-for="show in shows"
          :key="show.id"
          class="rounded-xl border border-zinc-200 bg-amber-950 p-4 text-white shadow-sm"
        >
          <div class="flex gap-4">
            <img
              :src="show.image"
              :alt="show.title"
              class="h-16 w-24 shrink-0 rounded-lg object-cover"
            />

            <div class="min-w-0">
              <p class="truncate font-semibold">{{ show.title }}</p>
              <p class="text-sm text-zinc-300">{{ show.city }} — {{ show.location }}</p>
              <p class="mt-1 text-sm text-zinc-400">{{ show.date }}</p>
              <span
                v-if="show.tag"
                class="mt-2 inline-block rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
              >
                {{ show.tag }}
              </span>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <button
              class="flex-1 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              @click="showDetails(show.id)"
            >
              Details
            </button>

            <button
              class="flex-1 rounded bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
              @click="editShow(show.id)"
            >
              Edit
            </button>

            <button
              class="flex-1 rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              @click="deleteShow(show.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- sm and up: table -->
      <div
        class="hidden overflow-hidden rounded-xl border border-zinc-200 bg-amber-950 shadow-sm sm:block"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-zinc-500">
              <tr>
                <th class="px-4 py-3 text-left">Image</th>

                <th class="px-4 py-3 text-left">Title</th>

                <th class="px-4 py-3 text-left">City</th>

                <th class="px-4 py-3 text-left">Location</th>

                <th class="px-4 py-3 text-left">Date</th>

                <th class="px-4 py-3 text-left">Tag</th>

                <th class="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="show in shows" :key="show.id" class="border-t">
                <td class="px-4 py-4">
                  <img
                    :src="show.image"
                    :alt="show.title"
                    class="h-16 w-24 rounded-lg object-cover"
                  />
                </td>

                <td class="px-4 py-4">
                  {{ show.title }}
                </td>

                <td class="px-4 py-4">
                  {{ show.city }}
                </td>

                <td class="px-4 py-4">
                  {{ show.location }}
                </td>

                <td class="px-4 py-4">
                  {{ show.date }}
                </td>

                <td class="px-4 py-4">
                  {{ show.tag }}
                </td>

                <td class="px-4 py-4">
                  <div class="flex justify-center gap-2">
                    <button
                      class="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      @click="showDetails(show.id)"
                    >
                      Details
                    </button>

                    <button
                      class="rounded bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
                      @click="editShow(show.id)"
                    >
                      Edit
                    </button>

                    <button
                      class="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                      @click="deleteShow(show.id)"
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
  </section>
</template>