import api from "./api";
import type { SubCategory } from "@/types/subCategory";

class SubCategoryService {
  async getSubCategories() {
    const res = await api.get<SubCategory[]>("/subcategories/");
    return res.data;
  }

  async getSubCategory(slug: string) {
    const res = await api.get<SubCategory>(`/subcategories/${slug}/`);
    return res.data;
  }

  async createSubCategory(data: FormData) {
    const res = await api.post<SubCategory>("/subcategories/", data);
    return res.data;
  }

  async updateSubCategory(slug: string, data: FormData) {
    const res = await api.patch<SubCategory>(`/subcategories/${slug}/`, data);
    return res.data;
  }

  async deleteSubCategory(slug: string) {
    await api.delete(`/subcategories/${slug}/`);
  }
}

export default new SubCategoryService();