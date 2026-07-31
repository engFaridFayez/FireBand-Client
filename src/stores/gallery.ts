import { defineStore } from "pinia";
import galleryService from "@/services/gallery.service";
import type { GalleryImage } from "@/types/home";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    galleryImages: [] as GalleryImage[],
    selectedGallery: null as GalleryImage | null,
    loading: false,
    error: null as string | null,
    page: 1,
    pageSize: 12,
    count: 0,
    hasNext: false,
    hasPrevious: false,
  }),

  getters: {
    totalPages: (state) => Math.max(1, Math.ceil(state.count / state.pageSize)),
  },

  actions: {
    async fetchGalleryImages(subCategoryId?: number, page = 1) {
      this.loading = true;
      this.error = null;

      try {
        const data = await galleryService.getGalleryImages(subCategoryId, page, this.pageSize);
        this.galleryImages = data.results;
        this.count = data.count;
        this.hasNext = !!data.next;
        this.hasPrevious = !!data.previous;
        this.page = page;
      } catch (error: any) {
        this.error = error.response?.data?.detail || error.message;
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
      this.galleryImages = this.galleryImages.filter((item) => item.id !== id);
    },
  },
});