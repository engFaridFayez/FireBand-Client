<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useCategoryStore } from "@/stores/category";
import { useReelStore } from "@/stores/reel";

const route = useRoute();
const router = useRouter();

const reelStore = useReelStore();
const categoryStore = useCategoryStore();

const form = reactive({
  sub_category: "",
  title: "",
  platform: "youtube",
  embed_url: "",
  thumbnail: null as File | null,
  thumbnailPreview: "",
  order: 0,
  is_active: true,
});

const urlPlaceholder = computed(() => {
  switch (form.platform) {
    case "youtube":
      return "https://www.youtube.com/watch?v=xxxxxxxxxxx";

    case "facebook":
      return "https://www.facebook.com/share/r/xxxxxxxx/";

    default:
      return "https://...";
  }
});

onMounted(async () => {
  await categoryStore.fetchSubCategories();

  const id = Number(route.params.id);

  await reelStore.fetchReel(id);

  const reel = reelStore.selectedReel;

  if (!reel) return;

  form.sub_category = String(reel.sub_category.id);
  form.title = reel.title;
  form.platform = reel.platform;
  form.embed_url = reel.embed_url;
  form.thumbnailPreview = reel.thumbnail ?? "";
  form.order = reel.order;
  form.is_active = reel.is_active;
});

function handleThumbnail(event: Event) {
  const target = event.target as HTMLInputElement;

  const file = target.files?.[0];

  if (!file) return;

  form.thumbnail = file;
  form.thumbnailPreview = window.URL.createObjectURL(file);
}

async function submit() {
  const id = Number(route.params.id);

  const data = new FormData();

  data.append("sub_category", form.sub_category);
  data.append("title", form.title);
  data.append("platform", form.platform);
  data.append("embed_url", form.embed_url);
  data.append("order", String(form.order));
  data.append("is_active", String(form.is_active));

  if (form.thumbnail) {
    data.append("thumbnail", form.thumbnail);
  }

  try {
    await reelStore.updateReel(id, data);

    await Swal.fire({
      icon: "success",
      title: "Reel updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push({
      name: "reel-list",
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to update reel.",
    });
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl rounded-xl bg-amber-950 p-6 shadow">
    <h1 class="mb-6 text-2xl font-bold">Edit Reel</h1>

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
        <label class="mb-2 block font-medium"> Platform </label>

        <select v-model="form.platform" class="w-full rounded-lg border p-3">
          <option value="youtube">YouTube</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block font-medium"> Video URL </label>

        <input
          v-model="form.embed_url"
          type="url"
          class="w-full rounded-lg border p-3"
          :placeholder="urlPlaceholder"
          required
        />

        <p class="mt-2 text-sm text-gray-500">
          <template v-if="form.platform === 'youtube'">
            Paste any YouTube link (Watch, Shorts, or youtu.be).
          </template>

          <template v-else-if="form.platform === 'facebook'">
            Paste the Facebook Reel or Video URL.
          </template>
        </p>
      </div>

      <div v-if="form.thumbnailPreview">
        <label class="mb-2 block font-medium"> Current Thumbnail </label>

        <img
          :src="form.thumbnailPreview"
          class="h-40 rounded-lg border object-cover"
        />
      </div>

      <div>
        <label class="mb-2 block font-medium"> Change Thumbnail </label>

        <input type="file" accept="image/*" @change="handleThumbnail" />
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
