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

  async function fetchCategory(id: number) {
    loading.value = true;

    try {
      selectedCategory.value = await CategoryService.getCategory(id);
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

  async function updateCategory(id: number, data: FormData) {
    loading.value = true;

    try {
      const updated = await CategoryService.updateCategory(id, data);

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

  async function deleteCategory(id: number) {
    loading.value = true;

    try {
      await CategoryService.deleteCategory(id);

      categories.value = categories.value.filter(
        (c) => c.id !== id
      );

      if (selectedCategory.value?.id === id) {
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

  async function fetchSubCategory(id: number) {
    loading.value = true;
    error.value = null;

    try {
      selectedSubCategory.value =
        await SubCategoryService.getSubCategory(id);
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

  async function updateSubCategory(id: number, data: FormData) {
    loading.value = true;
    error.value = null;

    try {
      const updated =
        await SubCategoryService.updateSubCategory(id, data);

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

  async function deleteSubCategory(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await SubCategoryService.deleteSubCategory(id);

      subCategories.value = subCategories.value.filter(
        (s) => s.id !== id
      );

      if (selectedSubCategory.value?.id === id) {
        selectedSubCategory.value = null;
      }
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }


  // stores/category.ts — add this action
  async function fetchSubCategoriesByCategory(categoryId: number) {
    loading.value = true;
    error.value = null;

    try {
      subCategories.value =
        await SubCategoryService.getSubCategoriesByCategory(categoryId);
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
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
    fetchSubCategoriesByCategory
  };
});