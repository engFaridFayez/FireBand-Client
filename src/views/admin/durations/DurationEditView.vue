<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useDurationStore } from "@/stores/duration";
import { useCategoryStore } from "@/stores/category";
import { showPopup } from "@/lib/swal";

const router = useRouter();
const route = useRoute();

const durationStore = useDurationStore();
const categoryStore = useCategoryStore();

const { selectedDuration } = storeToRefs(durationStore);
const { subCategories } = storeToRefs(categoryStore);

const form = reactive({
  title: "",
  minutes: 0,
  sub_category: "",
});

async function loadDuration() {
  await categoryStore.fetchSubCategories();
  await durationStore.fetchDuration(Number(route.params.id));

  if (!selectedDuration.value) return;

  form.title = selectedDuration.value.title;
  form.minutes = selectedDuration.value.minutes;
  form.sub_category = String(selectedDuration.value.sub_category);
}

async function submit() {
  try {
    const data = new FormData();

    data.append("title", form.title);
    data.append("minutes", String(form.minutes));
    data.append("sub_category", form.sub_category);

    await durationStore.updateDuration(Number(route.params.id), data);

    await showPopup("success", "Success", "Duration updated successfully.");

    router.push({
      name: "admin-durations",
    });
  } catch (error) {
    console.error(error);

    await showPopup("error", "Error", "Failed to update Duration.");
  }
}

onMounted(loadDuration);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-white mb-6">Edit Duration</h1>

    <form @submit.prevent="submit" class="space-y-5">
      <div>
        <label class="block mb-2 text-white"> Title </label>

        <input
          v-model="form.title"
          type="text"
          required
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        />
      </div>

      <div>
        <label class="block mb-2 text-white"> Minutes </label>

        <input
          v-model.number="form.minutes"
          type="number"
          min="1"
          required
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        />
      </div>

      <div>
        <label class="block mb-2 text-white"> Sub Category </label>

        <select
          v-model="form.sub_category"
          required
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        >
          <option
            v-for="subCategory in subCategories"
            :key="subCategory.id"
            :value="subCategory.id"
          >
            {{ subCategory.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="router.back()"
          class="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>
