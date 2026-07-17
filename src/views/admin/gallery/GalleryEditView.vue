<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useGalleryStore } from "@/stores/gallery";
import { useCategoryStore } from "@/stores/category";

const route = useRoute();
const router = useRouter();

const galleryStore = useGalleryStore();
const categoryStore = useCategoryStore();

const form = reactive({
  sub_category: "",
  title: "",
  image: null as File | null,
  imagePreview: "",
  order: 0,
  is_active: true,
});

onMounted(async () => {
  await categoryStore.fetchSubCategories();

  const id = Number(route.params.id);

  await galleryStore.fetchGalleryImage(id);

  const gallery = galleryStore.selectedGallery;

  if (!gallery) return;

  form.sub_category = String(
    typeof gallery.sub_category === "object"
      ? gallery.sub_category.id
      : gallery.sub_category,
  );

  form.title = gallery.title ?? "";
  form.order = gallery.order;
  form.is_active = gallery.is_active;
  form.imagePreview = gallery.image;
});

function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) return;

  form.image = target.files[0]!;
}

async function submit() {
  const id = Number(route.params.id);

  const data = new FormData();

  data.append("sub_category", form.sub_category);
  data.append("title", form.title);
  data.append("order", String(form.order));
  data.append("is_active", String(form.is_active));

  if (form.image) {
    data.append("image", form.image);
  }

  try {
    await galleryStore.updateGallery(id, data);

    await Swal.fire({
      icon: "success",
      title: "Gallery image updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push({ name: "gallery-list" });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to update image.",
    });
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl rounded-xl bg-amber-950 p-6 shadow">
    <h1 class="mb-6 text-2xl font-bold">Edit Gallery Image</h1>

    <form class="space-y-5" @submit.prevent="submit">
      <div>
        <label class="mb-2 block font-medium"> Sub Category </label>

        <select
          v-model="form.sub_category"
          class="w-full rounded-lg border p-3"
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
        <label class="mb-2 block font-medium"> Title </label>

        <input
          v-model="form.title"
          type="text"
          class="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Current Image </label>

        <img
          :src="form.imagePreview"
          class="h-48 rounded-lg border object-cover"
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Change Image </label>

        <input type="file" accept="image/*" @change="handleImage" />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Order </label>

        <input
          v-model.number="form.order"
          type="number"
          class="w-full rounded-lg border p-3"
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
          Save Changes
        </button>

        <button
          type="button"
          class="rounded-lg bg-gray-200 px-5 py-2"
          @click="router.back()"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
