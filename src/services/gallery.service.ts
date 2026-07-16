// services/gallery.service.ts
import api from "@/services/api";
import type { GalleryImage } from "@/types/home";

export default {
  async getGalleryImages(subCategoryId: number) {
    const { data } = await api.get<GalleryImage[]>("/gallery/", {
      params: { subcategory: subCategoryId },
    });
    return data;
  },
};