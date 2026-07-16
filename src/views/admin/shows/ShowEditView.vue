<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useHomeStore } from "@/stores/home";
import { showPopup } from "@/lib/swal";

const route = useRoute();
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

const currentImage = reactive({
  url: "",
});

onMounted(async () => {
  try {
    await homeStore.getShowById(Number(route.params.id));

    if (!homeStore.show) return;

    form.title = homeStore.show.title;
    form.city = homeStore.show.city;
    form.location = homeStore.show.location;
    form.date = homeStore.show.date;
    form.tag = homeStore.show.tag;

    currentImage.url = homeStore.show.image;
  } catch {
    router.push("/dashboard/shows");
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

    data.append("title", form.title);
    data.append("city", form.city);
    data.append("location", form.location);
    data.append("date", form.date);
    data.append("tag", form.tag);

    if (form.image) {
      data.append("image", form.image);
    }

    await homeStore.editShow(Number(route.params.id), data);

    await showPopup("success", "Updated", "Show updated successfully.");

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
      <h1 class="text-3xl font-bold">Edit Show</h1>

      <p class="text-gray-500">Update show information.</p>
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

      <div v-if="currentImage.url">
        <label class="mb-2 block font-medium"> Current Image </label>

        <img
          :src="currentImage.url"
          class="h-40 rounded-lg border object-cover"
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> New Image </label>

        <input
          type="file"
          accept="image/*"
          class="w-full rounded-lg border p-3"
          @change="handleImage"
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
          Save Changes
        </button>
      </div>
    </form>
  </section>
</template>
