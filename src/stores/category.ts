import { defineStore } from "pinia";
import { ref } from "vue";

import EventCategoryService from "@/services/eventCategory.service";

import type { EventCategory } from "@/types/eventCategory";
import type { SubCategory } from "@/types/subCategory";
import type { DurationOption } from "@/types/duration";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref<EventCategory[]>([]);

  const selectedCategory = ref<EventCategory | null>(null);
  const selectedSubCategory = ref<SubCategory | null>(null);
  const selectedDuration = ref<DurationOption | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCategories() {
    loading.value = true;
    error.value = null;

    try {
      categories.value = await EventCategoryService.getAll();
    } catch (err: any) {
      error.value = err?.response?.data?.detail || "Something went wrong.";
    } finally {
      loading.value = false;
    }
  }

  function setCategory(category: EventCategory | null) {
    selectedCategory.value = category;

    // Reset dependent selections
    selectedSubCategory.value = null;
    selectedDuration.value = null;
  }

  function setSubCategory(subCategory: SubCategory | null) {
    selectedSubCategory.value = subCategory;

    // Reset duration when sub category changes
    selectedDuration.value = null;
  }

  function setDuration(duration: DurationOption | null) {
    selectedDuration.value = duration;
  }

  return {
    categories,

    selectedCategory,
    selectedSubCategory,
    selectedDuration,

    loading,
    error,

    fetchCategories,

    setCategory,
    setSubCategory,
    setDuration,
  };
});