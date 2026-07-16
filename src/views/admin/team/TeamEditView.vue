<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useHomeStore } from "@/stores/home";
import { showPopup } from "@/lib/swal";

const route = useRoute();
const router = useRouter();

const homeStore = useHomeStore();

const preview = ref("");
const currentImage = ref("");

const form = reactive({
  name: "",
  role: "",
  accent: "",
  order: 1,
  image: null as File | null,
});

const labelClass =
  "mb-2 block text-sm font-semibold uppercase tracking-wide text-zinc-300";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-[#1b1a21] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-[#ffb000] focus:ring-2 focus:ring-[#ffb000]/20";

const fileClass =
  "w-full rounded-lg border border-dashed border-white/20 bg-[#1b1a21] px-4 py-3 text-zinc-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#ffb000] file:px-4 file:py-2 file:font-semibold file:text-[#140a05] hover:file:bg-[#ff9800]";

onMounted(async () => {
  try {
    await homeStore.getTeamMemberById(Number(route.params.id));

    if (!homeStore.teamMember) return;

    form.name = homeStore.teamMember.name;
    form.role = homeStore.teamMember.role;
    form.accent = homeStore.teamMember.accent;
    form.order = homeStore.teamMember.order;

    currentImage.value = homeStore.teamMember.image;
  } catch {
    router.push("/dashboard/team");
  }
});

function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) return;

  form.image = target.files[0]!;
}

async function submit() {
  try {
    const data = new FormData();

    data.append("name", form.name);
    data.append("role", form.role);
    data.append("accent", form.accent);
    data.append("order", String(form.order));

    if (form.image) {
      data.append("image", form.image);
    }

    await homeStore.editTeamMember(Number(route.params.id), data);

    await showPopup("success", "Updated", "Team member updated successfully.");

    router.push("/admin/team");
  } catch (error: any) {
    const errors = error.response?.data;

    let message: string | string[] = "Something went wrong.";

    if (errors) {
      const list: string[] = [];

      Object.values(errors).forEach((value: any) => {
        if (Array.isArray(value)) {
          list.push(...value);
        } else if (typeof value === "string") {
          list.push(value);
        }
      });

      if (list.length) {
        message = list;
      }
    }

    await showPopup("error", "Error", message);
  }
}
</script>
<template>
  <section class="mx-auto max-w-5xl space-y-8">
    <div>
      <p
        class="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffb000]"
      >
        Dashboard
      </p>

      <h1 class="mt-2 text-4xl font-black text-white">Edit Team Member</h1>

      <p class="mt-2 text-zinc-400">Update this team member information.</p>
    </div>

    <form
      class="space-y-6 rounded-2xl border border-white/10 bg-[#111014] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      @submit.prevent="submit"
    >
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label :class="labelClass"> Name </label>

          <input v-model="form.name" type="text" :class="fieldClass" required />
        </div>

        <div>
          <label :class="labelClass"> Role </label>

          <input v-model="form.role" type="text" :class="fieldClass" required />
        </div>

        <div>
          <label :class="labelClass"> Accent </label>

          <input
            v-model="form.accent"
            type="text"
            :class="fieldClass"
            required
          />
        </div>

        <div>
          <label :class="labelClass"> Display Order </label>

          <input
            v-model.number="form.order"
            type="number"
            min="1"
            :class="fieldClass"
            required
          />
        </div>
      </div>

      <div v-if="currentImage">
        <label :class="labelClass"> Current Image </label>

        <img
          :src="currentImage"
          alt="Current Image"
          class="h-full w-70 rounded-xl border border-white/10 object-cover"
        />
      </div>

      <div>
        <label :class="labelClass"> Change Image </label>

        <input
          type="file"
          accept="image/*"
          :class="fileClass"
          @change="handleImage"
        />
      </div>

      <div v-if="preview">
        <label :class="labelClass"> New Image Preview </label>

        <img
          :src="preview"
          alt="Preview"
          class="h-72 w-full rounded-xl border border-white/10 object-cover"
        />
      </div>

      <div class="flex justify-end gap-4">
        <button
          type="button"
          class="rounded-lg border border-white/10 bg-[#1b1a21] px-6 py-3 font-semibold text-white transition hover:bg-[#25242c]"
          @click="$router.back()"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="rounded-lg bg-gradient-to-r from-[#ffb000] to-[#ff4b12] px-8 py-3 font-bold text-[#140a05] shadow-lg transition duration-300 hover:scale-[1.02]"
        >
          Save Changes
        </button>
      </div>
    </form>
  </section>
</template>
