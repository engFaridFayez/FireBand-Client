import api from "@/services/api";
import type { GalleryImage } from "@/types/home";

class GalleryService {
  async getGalleryImages(subCategoryId?: number) {
    const { data } = await api.get<GalleryImage[]>("/gallery/", {
      params: subCategoryId ? { subcategory: subCategoryId } : {},
    });

    return data;
  }

  async getGalleryImage(id: number) {
    const { data } = await api.get<GalleryImage>(`/gallery/${id}/`);
    return data;
  }

  async createGallery(formData: FormData) {
    const { data } = await api.post("/gallery/bulk/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  async updateGallery(id: number, formData: FormData) {
    const { data } = await api.put(`/gallery/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  async deleteGallery(id: number) {
    await api.delete(`/gallery/${id}/`);
  }
}

export default new GalleryService();