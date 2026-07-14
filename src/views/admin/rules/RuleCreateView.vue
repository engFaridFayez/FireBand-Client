<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useRuleStore } from "@/stores/rule";
import { useCategoryStore } from "@/stores/category";
import { showPopup } from "@/lib/swal";

const router = useRouter();

const ruleStore = useRuleStore();
const categoryStore = useCategoryStore();

const { subCategories } = storeToRefs(categoryStore);

const form = reactive({
  text: "",
  order: 0,
  sub_category: "",
});

onMounted(async () => {
  await categoryStore.fetchSubCategories();
});

async function submit() {
  try {
    const data = new FormData();

    data.append("text", form.text);
    data.append("order", String(form.order));
    data.append("sub_category", form.sub_category);

    await ruleStore.createRule(data);

    await showPopup("success", "Success", "Rule created successfully.");

    router.push({
      name: "admin-rules",
    });
  } catch (error) {
    console.error(error);

    await showPopup("error", "Error", "Failed to create Rule.");
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-white mb-6">Add Rule</h1>

    <form @submit.prevent="submit" class="space-y-5">
      <div>
        <label class="block mb-2 text-white"> Rule </label>

        <textarea
          v-model="form.text"
          rows="4"
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
          <option disabled value="">Select Sub Category</option>

          <option
            v-for="subCategory in subCategories"
            :key="subCategory.id"
            :value="subCategory.id"
          >
            {{ subCategory.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block mb-2 text-white"> Order </label>

        <input
          v-model.number="form.order"
          type="number"
          min="0"
          class="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
        />
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
