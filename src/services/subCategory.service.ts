import api from "./api";
import type { SubCategory } from "@/types/subCategory";

class SubCategoryService {
  async getSubCategories() {
    const res = await api.get<SubCategory[]>("/subcategories/");
    return res.data;
  }

  async getSubCategory(id: number) {
    const res = await api.get<SubCategory>(`/subcategories/${id}/`);
    return res.data;
  }

  async createSubCategory(data: FormData) {
    const res = await api.post<SubCategory>("/subcategories/", data);
    return res.data;
  }

  async updateSubCategory(id: number, data: FormData) {
    const res = await api.patch<SubCategory>(`/subcategories/${id}/`, data);
    return res.data;
  }

  async deleteSubCategory(id: number) {
    await api.delete(`/subcategories/${id}/`);
  }
}

export default new SubCategoryService();