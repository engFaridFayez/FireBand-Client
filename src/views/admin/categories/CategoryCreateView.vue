<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { useCategoryStore } from "@/stores/category";
import { showPopup } from "@/lib/swal";

const router = useRouter();
const categoryStore = useCategoryStore();

const form = reactive({
  name: "",
  description: "",
  image: null as File | null,
});

function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) return;

  form.image = target.files[0]!;
}

function validate(): string[] {
  const errors: string[] = [];

  if (!form.name.trim()) errors.push("Name is required.");
  if (!form.description.trim()) errors.push("Description is required.");
  if (!form.image) errors.push("Image is required.");

  return errors;
}

async function submit() {
  const errors = validate();

  if (errors.length > 0) {
    await showPopup("error", "Missing Fields", errors);
    return;
  }

  try {
    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);

    if (form.image) {
      data.append("image", form.image);
    }

    await categoryStore.createCategory(data);

    await showPopup("success", "Success", "Category created successfully.");

    await router.push("/admin");
  } catch (error) {
    console.error(error);

    await showPopup("error", "Error", "Failed to create Category.");
  }
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Create Category</h1>

      <p class="mt-2 text-gray-400">Add a new event category.</p>
    </div>

    <form
      class="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
      @submit.prevent="submit"
    >
      <div>
        <label class="mb-2 block"> Name </label>

        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-yellow-500"
        />
      </div>

      <div>
        <label class="mb-2 block"> Description </label>

        <textarea
          v-model="form.description"
          rows="5"
          class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-yellow-500"
        />
      </div>

      <div>
        <label class="mb-2 block"> Image </label>

        <input type="file" accept="image/*" @change="handleImage" />
      </div>

      <div class="flex gap-4">
        <button
          type="submit"
          class="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Create
        </button>

        <RouterLink
          to="/admin/categories"
          class="rounded-lg bg-zinc-800 px-6 py-3 transition hover:bg-zinc-700"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </div>
</template>
