import { defineStore } from "pinia";
import { ref } from "vue";

import CategoryService from "@/services/eventCategory.service";
import SubCategoryService from "@/services/subCategory.service";
import type { EventCategory } from "@/types/eventCategory";
import type { SubCategory } from "@/types/subCategory";

export const useCategoryStore = defineStore("category", () => {
  const subCategories = ref<SubCategory[]>([]);
  const selectedSubCategory = ref<SubCategory | null>(null);
  const categories = ref<EventCategory[]>([]);
  const selectedCategory = ref<EventCategory | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCategories() {
    loading.value = true;

    try {
      categories.value = await CategoryService.getCategories();
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchCategory(slug: string) {
    loading.value = true;

    try {
      selectedCategory.value = await CategoryService.getCategory(slug);
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createCategory(data: FormData) {
    loading.value = true;

    try {
      const category = await CategoryService.createCategory(data);
      categories.value.push(category);
      return category;
    } finally {
      loading.value = false;
    }
  }

  async function updateCategory(slug: string, data: FormData) {
    loading.value = true;

    try {
      const updated = await CategoryService.updateCategory(slug, data);

      const index = categories.value.findIndex(
        (c) => c.id === updated.id
      );

      if (index !== -1) {
        categories.value[index] = updated;
      }

      selectedCategory.value = updated;

      return updated;
    } finally {
      loading.value = false;
    }
  }

  async function deleteCategory(slug: string) {
    loading.value = true;

    try {
      await CategoryService.deleteCategory(slug);

      categories.value = categories.value.filter(
        (c) => c.slug !== slug
      );

      if (selectedCategory.value?.slug === slug) {
        selectedCategory.value = null;
      }
    } finally {
      loading.value = false;
    }
  }
  async function fetchSubCategories() {
    loading.value = true;
    error.value = null;

    try {
      subCategories.value = await SubCategoryService.getSubCategories();
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchSubCategory(slug: string) {
    loading.value = true;
    error.value = null;

    try {
      selectedSubCategory.value =
        await SubCategoryService.getSubCategory(slug);
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createSubCategory(data: FormData) {
    loading.value = true;
    error.value = null;

    try {
      const subCategory =
        await SubCategoryService.createSubCategory(data);

      subCategories.value.push(subCategory);

      return subCategory;
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateSubCategory(slug: string, data: FormData) {
    loading.value = true;
    error.value = null;

    try {
      const updated =
        await SubCategoryService.updateSubCategory(slug, data);

      const index = subCategories.value.findIndex(
        (s) => s.id === updated.id
      );

      if (index !== -1) {
        subCategories.value[index] = updated;
      }

      selectedSubCategory.value = updated;

      return updated;
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteSubCategory(slug: string) {
    loading.value = true;
    error.value = null;

    try {
      await SubCategoryService.deleteSubCategory(slug);

      subCategories.value = subCategories.value.filter(
        (s) => s.slug !== slug
      );

      if (selectedSubCategory.value?.slug === slug) {
        selectedSubCategory.value = null;
      }
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    selectedCategory,

    loading,
    error,

    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,

    subCategories,
    selectedSubCategory,

    fetchSubCategories,
    fetchSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
  };
});