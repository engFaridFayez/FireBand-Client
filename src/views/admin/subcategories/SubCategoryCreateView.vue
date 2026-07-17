<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { showPopup } from "@/lib/swal";

const router = useRouter();
const categoryStore = useCategoryStore();

const { categories } = storeToRefs(categoryStore);

const form = reactive({
  name: "",
  description: "",
  category: "",
  min_members: 5,
  max_members: 40,
  image: null as File | null,
  is_custom: false,
});

function handleImage(event: Event) {
  const target = event.target as HTMLInputElement;

  const file = target.files?.item(0);

  if (!file) return;

  form.image = file;
}

function validate(): string[] {
  const errors: string[] = [];

  if (!form.name.trim()) errors.push("Name is required.");
  if (!form.description.trim()) errors.push("Description is required.");
  if (!form.category) errors.push("Category is required.");
  if (
    form.min_members === null ||
    form.min_members === undefined ||
    Number.isNaN(form.min_members)
  ) {
    errors.push("Min Members is required.");
  } else if (form.min_members < 1) {
    errors.push("Min Members must be at least 1.");
  }
  if (
    form.max_members === null ||
    form.max_members === undefined ||
    Number.isNaN(form.max_members)
  ) {
    errors.push("Max Members is required.");
  } else if (form.max_members < 1) {
    errors.push("Max Members must be at least 1.");
  }
  if (
    typeof form.min_members === "number" &&
    typeof form.max_members === "number" &&
    form.min_members > form.max_members
  ) {
    errors.push("Min Members cannot be greater than Max Members.");
  }
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
    data.append("category", form.category);
    data.append("min_members", String(form.min_members));
    data.append("max_members", String(form.max_members));
    data.append("is_custom", String(form.is_custom));

    if (form.image) {
      data.append("image", form.image);
    }

    await categoryStore.createSubCategory(data);

    await showPopup("success", "Success", "Sub Category created successfully.");

    router.push("/admin/sub-categories");
  } catch (error) {
    console.error(error);

    await showPopup("error", "Error", "Failed to create Sub Category.");
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-white mb-6">Add Sub Category</h1>

    <form @submit.prevent="submit" class="space-y-5">
      <div>
        <label class="block mb-2 text-white"> Name </label>

        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        />
      </div>

      <div>
        <label class="block mb-2 text-white"> Description </label>

        <textarea
          v-model="form.description"
          rows="4"
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        />
      </div>

      <div>
        <label class="block mb-2 text-white"> Category </label>

        <select
          v-model="form.category"
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        >
          <option disabled value="">Select Category</option>

          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 text-white"> Min Members </label>

          <input
            v-model.number="form.min_members"
            type="number"
            min="1"
            class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
          />
        </div>

        <div>
          <label class="block mb-2 text-white"> Max Members </label>

          <input
            v-model.number="form.max_members"
            type="number"
            min="1"
            class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
          />
        </div>
      </div>

      <div>
        <label class="block mb-2 text-white"> Image </label>

        <input
          type="file"
          accept="image/*"
          @change="handleImage"
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        />
      </div>
      <div class="flex items-center gap-3">
        <input
          id="is_custom"
          v-model="form.is_custom"
          type="checkbox"
          class="h-4 w-4 rounded border-zinc-600 text-yellow-500 focus:ring-yellow-500"
        />

        <label for="is_custom" class="text-sm text-white">
          Allow custom sub category
        </label>
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
          Create
        </button>
      </div>
    </form>
  </div>
</template>
