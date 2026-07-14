import api from "./api";
import type { EventCategory } from "@/types/eventCategory";

class CategoryService {
  async getCategories() {
    const res = await api.get<EventCategory[]>("/categories/");
    return res.data;
  }

  async getCategory(id: number) {
    const res = await api.get<EventCategory>(`/categories/${id}/`);
    return res.data;
  }

  async createCategory(data: FormData) {
    const res = await api.post<EventCategory>("/categories/", data);
    return res.data;
  }

  async updateCategory(id: number, data: FormData) {
    const res = await api.patch<EventCategory>(`/categories/${id}/`, data);
    return res.data;
  }

  async deleteCategory(id: number) {
    await api.delete(`/categories/${id}/`);
  }
}

export default new CategoryService();