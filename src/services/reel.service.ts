import api from "@/services/api";
import type { Reel } from "@/types/home";

class ReelService {
  async getReels(subCategoryId?: number) {
    const { data } = await api.get<Reel[]>("/reels/", {
      params: subCategoryId ? { subcategory: subCategoryId } : {},
    });

    return data;
  }

  async getReel(id: number) {
    const { data } = await api.get<Reel>(`/reels/${id}/`);
    return data;
  }

  async createReel(formData: FormData) {
    const { data } = await api.post("/reels/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  async updateReel(id: number, formData: FormData) {
    const { data } = await api.patch(`/reels/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  async deleteReel(id: number) {
    await api.delete(`/reels/${id}/`);
  }
}

export default new ReelService();