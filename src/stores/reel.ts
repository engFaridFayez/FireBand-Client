import { defineStore } from "pinia";
import reelService from "@/services/reel.service";
import type { Reel } from "@/types/home";

export const useReelStore = defineStore("reel", {
  state: () => ({
    reels: [] as Reel[],
    selectedReel: null as Reel | null,

    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchReels(subCategoryId?: number) {
      this.loading = true;

      try {
        this.reels = await reelService.getReels(subCategoryId);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchReel(id: number) {
      this.loading = true;

      try {
        this.selectedReel = await reelService.getReel(id);
      } finally {
        this.loading = false;
      }
    },

    async createReel(formData: FormData) {
      await reelService.createReel(formData);
    },

    async updateReel(id: number, formData: FormData) {
      await reelService.updateReel(id, formData);
    },

    async deleteReel(id: number) {
      await reelService.deleteReel(id);

      this.reels = this.reels.filter(
        (item) => item.id !== id
      );
    },
  },
});