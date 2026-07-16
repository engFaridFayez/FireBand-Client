<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useHomeStore } from "@/stores/home";

const route = useRoute();
const router = useRouter();

const homeStore = useHomeStore();

onMounted(async () => {
  try {
    await homeStore.getTeamMemberById(Number(route.params.id));
  } catch {
    router.push("/dashboard/team");
  }
});
</script>
<template>
  <section v-if="homeStore.teamMember" class="mx-auto max-w-5xl space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <p
          class="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffb000]"
        >
          Dashboard
        </p>

        <h1 class="mt-2 text-4xl font-black text-white">Team Member Details</h1>

        <p class="mt-2 text-zinc-400">View team member information.</p>
      </div>

      <button
        class="rounded-lg border border-white/10 bg-[#1b1a21] px-6 py-3 font-semibold text-white transition hover:bg-[#25242c]"
        @click="$router.back()"
      >
        Back
      </button>
    </div>

    <div
      class="overflow-hidden rounded-2xl border border-white/10 bg-[#111014] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      <img
        :src="homeStore.teamMember.image"
        :alt="homeStore.teamMember.name"
        class="h-full w-70 object-cover"
      />

      <div class="grid gap-6 p-8 md:grid-cols-2">
        <div>
          <p class="mb-2 text-xs uppercase tracking-widest text-zinc-500">
            Name
          </p>

          <p class="text-lg font-semibold text-white">
            {{ homeStore.teamMember.name }}
          </p>
        </div>

        <div>
          <p class="mb-2 text-xs uppercase tracking-widest text-zinc-500">
            Role
          </p>

          <p class="text-lg font-semibold text-white">
            {{ homeStore.teamMember.role }}
          </p>
        </div>

        <div>
          <p class="mb-2 text-xs uppercase tracking-widest text-zinc-500">
            Accent
          </p>

          <span
            class="inline-flex rounded-full bg-gradient-to-r from-[#ffb000] to-[#ff4b12] px-4 py-2 font-bold text-[#140a05]"
          >
            {{ homeStore.teamMember.accent }}
          </span>
        </div>

        <div>
          <p class="mb-2 text-xs uppercase tracking-widest text-zinc-500">
            Display Order
          </p>

          <p class="text-lg font-semibold text-white">
            {{ homeStore.teamMember.order }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <div v-else class="flex h-[60vh] items-center justify-center text-zinc-400">
    Loading...
  </div>
</template>
