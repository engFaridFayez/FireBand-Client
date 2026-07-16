import api from "@/services/api";
import type { Reel } from "@/types/home";

export default {
  async getReels(subCategoryId: number) {
    const { data } = await api.get<Reel[]>("/reels/", {
      params: { subcategory: subCategoryId },
    });
    return data;
  },
};