<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { useHomeStore } from "@/stores/home";
import { showPopup } from "@/lib/swal";

const router = useRouter();
const homeStore = useHomeStore();

const form = reactive({
  title: "",
  city: "",
  location: "",
  date: "",
  tag: "",
  image: null as File | null,
});

function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) return;

  form.image = target.files[0]!;
}


async function submit() {
  try {
    const data = new FormData();

    data.append("title", form.title);
    data.append("city", form.city);
    data.append("location", form.location);
    data.append("date", form.date);
    data.append("tag", form.tag);

    if (form.image) {
      data.append("image", form.image);
    }

    await homeStore.createShow(data);

    await showPopup("success", "Success", "Show created successfully.");

    router.push("/admin/shows");
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
  <section class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold">Create Show</h1>

      <p class="text-gray-500">Add a new show.</p>
    </div>

    <form
      class="space-y-5 rounded-xl border bg-amber-700 p-6 shadow-sm"
      @submit.prevent="submit"
    >
      <div>
        <label class="mb-2 block font-medium"> Title </label>

        <input
          v-model="form.title"
          type="text"
          class="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> City </label>

        <input
          v-model="form.city"
          type="text"
          class="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Location </label>

        <input
          v-model="form.location"
          type="text"
          class="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Date </label>

        <input
          v-model="form.date"
          type="date"
          class="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Tag </label>

        <input
          v-model="form.tag"
          type="text"
          class="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Image </label>

        <input
          type="file"
          accept="image/*"
          class="w-full rounded-lg border p-3"
          @change="handleImage"
          required
        />
      </div>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="rounded-lg border px-5 py-2"
          @click="$router.back()"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-white hover:bg-yellow-600"
        >
          Create
        </button>
      </div>
    </form>
  </section>
</template>
