<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useGalleryStore } from "@/stores/gallery";
import { useCategoryStore } from "@/stores/category";

const router = useRouter();

const galleryStore = useGalleryStore();
const categoryStore = useCategoryStore();

const form = reactive({
  sub_category: "",
  title: "",
  images: [] as File[],
  is_active: true,
});

onMounted(async () => {
  await categoryStore.fetchSubCategories();
});

function handleImages(event: Event) {
  const target = event.target as HTMLInputElement;

  if (!target.files) return;

  form.images = Array.from(target.files);
}

async function submit() {
  if (!form.sub_category) {
    return Swal.fire({
      icon: "warning",
      title: "Sub Category Required",
    });
  }

  if (!form.images.length) {
    return Swal.fire({
      icon: "warning",
      title: "Please select at least one image.",
    });
  }

  const data = new FormData();

  data.append("sub_category", form.sub_category);

  if (form.title.trim()) {
    data.append("title", form.title);
  }

  data.append("is_active", String(form.is_active));

  form.images.forEach((image) => {
    data.append("images", image);
  });

  try {
    await galleryStore.createGallery(data);

    await Swal.fire({
      icon: "success",
      title: "Images uploaded successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push({ name: "gallery-list" });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Upload failed.",
    });
  }
}
function previewImage(file: File) {
  return window.URL.createObjectURL(file);
}
</script>

<template>
  <div class="mx-auto max-w-3xl rounded-xl bg-amber-950 p-6 shadow">
    <h1 class="mb-6 text-2xl font-bold">Bulk Upload Gallery Images</h1>

    <form class="space-y-5" @submit.prevent="submit">
      <div>
        <label class="mb-2 block font-medium"> Sub Category </label>

        <select
          v-model="form.sub_category"
          class="w-full rounded-lg border p-3 bg-gray-700"
          required
        >
          <option value="">Select Sub Category</option>

          <option
            v-for="item in categoryStore.subCategories"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="mb-2 block font-medium"> Title (Optional) </label>

        <input
          v-model="form.title"
          type="text"
          class="w-full rounded-lg border p-3"
          placeholder="Gallery title"
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Images </label>

        <input type="file" multiple accept="image/*" @change="handleImages" />

        <p class="mt-2 text-sm text-gray-500">
          {{ form.images.length }} image(s) selected
        </p>
      </div>

      <div
        v-if="form.images.length"
        class="grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        <img
          v-for="(image, index) in form.images"
          :key="index"
          :src="previewImage(image)"
          class="h-28 w-full rounded-lg border object-cover"
        />
      </div>

      <div class="flex items-center gap-2">
        <input id="active" v-model="form.is_active" type="checkbox" />

        <label for="active"> Active </label>
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          class="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Upload
        </button>

        <button
          type="button"
          class="rounded-lg bg-black px-5 py-2"
          @click="router.back()"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
