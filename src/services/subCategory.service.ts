import api from "./api";
import type { SubCategory } from "@/types/subCategory";

export default class SubCategoryService {
  static async getAll() {
    const response = await api.get<SubCategory[]>("sub-categories/");
    return response.data;
  }

  static async getBySlug(slug: string) {
    const response = await api.get<SubCategory>(`sub-categories/${slug}/`);
    return response.data;
  }
}