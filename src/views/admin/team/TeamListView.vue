<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useHomeStore } from "@/stores/home";
import { showPopup } from "@/lib/swal";

const router = useRouter();

const homeStore = useHomeStore();

const { team, loading } = storeToRefs(homeStore);

onMounted(async () => {
  await homeStore.getAllTeam();
});

function createMember() {
  router.push("/admin/team/create");
}

function editMember(id: number) {
  router.push(`/admin/team/${id}/edit/`);
}

function showDetails(id: number) {
  router.push(`/admin/team/${id}`);
}

async function deleteMember(id: number) {
  const result = await Swal.fire({
    icon: "warning",
    title: "Delete Team Member",
    text: "Are you sure you want to delete this team member?",

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
    await homeStore.deleteTeamMember(id);

    await showPopup("success", "Deleted", "Team member deleted successfully.");
  } catch (error: any) {
    await showPopup(
      "error",
      "Error",
      error.response?.data?.detail ?? "Something went wrong.",
    );
  }
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Team Members</h1>

        <p class="text-gray-500">Manage all team members.</p>
      </div>

      <button
        class="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-amber-950 transition hover:bg-yellow-600"
        @click="createMember"
      >
        Add Member
      </button>
    </div>

    <div
      class="overflow-hidden rounded-xl border border-zinc-200 bg-amber-950 shadow-sm"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-zinc-500">
            <tr>
              <th class="px-4 py-3 text-left">Image</th>

              <th class="px-4 py-3 text-left">Name</th>

              <th class="px-4 py-3 text-left">Role</th>

              <th class="px-4 py-3 text-left">Accent</th>

              <th class="px-4 py-3 text-center">Order</th>

              <th class="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="py-8 text-center">Loading...</td>
            </tr>

            <tr v-else-if="!team.length">
              <td colspan="6" class="py-8 text-center">
                No team members found.
              </td>
            </tr>

            <tr v-for="member in team" :key="member.id" class="border-t">
              <td class="px-4 py-4">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="h-16 w-16 rounded-full object-cover"
                />
              </td>

              <td class="px-4 py-4">
                {{ member.name }}
              </td>

              <td class="px-4 py-4">
                {{ member.role }}
              </td>

              <td class="px-4 py-4">
                {{ member.accent }}
              </td>

              <td class="px-4 py-4 text-center">
                {{ member.order }}
              </td>

              <td class="px-4 py-4">
                <div class="flex justify-center gap-2">
                  <button
                    class="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    @click="showDetails(member.id)"
                  >
                    Details
                  </button>

                  <button
                    class="rounded bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
                    @click="editMember(member.id)"
                  >
                    Edit
                  </button>

                  <button
                    class="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                    @click="deleteMember(member.id)"
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
  </section>
</template>
