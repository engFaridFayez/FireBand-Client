import { defineStore } from "pinia";
import galleryService from "@/services/gallery.service";
import type { GalleryImage } from "@/types/home";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    galleryImages: [] as GalleryImage[],
    selectedGallery: null as GalleryImage | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchGalleryImages(subCategoryId?: number) {
      this.loading = true;

      try {
        this.galleryImages = await galleryService.getGalleryImages(subCategoryId);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchGalleryImage(id: number) {
      this.loading = true;

      try {
        this.selectedGallery = await galleryService.getGalleryImage(id);
      } finally {
        this.loading = false;
      }
    },

    async createGallery(formData: FormData) {
      await galleryService.createGallery(formData);
    },

    async updateGallery(id: number, formData: FormData) {
      await galleryService.updateGallery(id, formData);
    },

    async deleteGallery(id: number) {
      await galleryService.deleteGallery(id);

      this.galleryImages = this.galleryImages.filter(
        (item) => item.id !== id
      );
    },
  },
});