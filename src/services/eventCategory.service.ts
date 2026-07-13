import api from "./api";
import type { EventCategory } from "@/types/eventCategory";

class CategoryService {
  async getCategories() {
    const res = await api.get<EventCategory[]>("/categories/");
    return res.data;
  }

  async getCategory(slug: string) {
    const res = await api.get<EventCategory>(`/categories/${slug}/`);
    return res.data;
  }

  async createCategory(data: FormData) {
    const res = await api.post<EventCategory>("/categories/", data);
    return res.data;
  }

  async updateCategory(slug: string, data: FormData) {
    const res = await api.patch<EventCategory>(`/categories/${slug}/`, data);
    return res.data;
  }

  async deleteCategory(slug: string) {
    await api.delete(`/categories/${slug}/`);
  }
}

export default new CategoryService();