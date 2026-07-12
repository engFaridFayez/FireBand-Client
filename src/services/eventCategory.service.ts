import api from "./api";
import type { EventCategory } from "@/types/eventCategory";

export default class EventCategoryService {
  static async getAll() {
    const response = await api.get<EventCategory[]>("categories/");
    return response.data;
  }

  static async getBySlug(slug: string) {
    const response = await api.get<EventCategory>(`categories/${slug}/`);
    return response.data;
  }
}