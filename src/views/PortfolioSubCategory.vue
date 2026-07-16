<!-- views/PortfolioSubCategory.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import GalleryImageService from "@/services/gallery.service";
import ReelService from "@/services/reel.service";
import type { GalleryImage } from "@/types/home";
import type { Reel } from "@/types/home";

const props = defineProps<{ subId: string }>();
const route = useRoute();

const images = ref<GalleryImage[]>([]);
const reels = ref<Reel[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const lightboxImage = ref<GalleryImage | null>(null);

const load = async (subId: string) => {
  loading.value = true;
  error.value = null;

  try {
    const [imgData, reelData] = await Promise.all([
      GalleryImageService.getGalleryImages(Number(subId)),
      ReelService.getReels(Number(subId)),
    ]);
    images.value = imgData;
    reels.value = reelData;
  } catch (err: any) {
    error.value = err.response?.data?.detail || err.message;
  } finally {
    loading.value = false;
  }
};

const openLightbox = (img: GalleryImage) => {
  lightboxImage.value = img;
};

const closeLightbox = () => {
  lightboxImage.value = null;
};

onMounted(() => load(props.subId));

watch(
  () => route.params.subId,
  (newId) => {
    if (newId) load(newId as string);
  },
);
</script>

<template>
  <section class="portfolio-subcategory">
    <div class="portfolio-subcategory-inner">
      <!-- Loading -->
      <template v-if="loading">
        <header class="section-heading">
          <span class="eyebrow">Portfolio</span>
          <h1>Loading gallery…</h1>
        </header>
        <div class="gallery-grid">
          <div v-for="n in 8" :key="n" class="skeleton-tile" />
        </div>
      </template>

      <!-- Error -->
      <div v-else-if="error" class="state-card error-card">
        <p>{{ error }}</p>
      </div>

      <template v-else>
        <!-- Gallery -->
        <header class="section-heading">
          <span class="eyebrow">Portfolio</span>
          <h1>Gallery</h1>
        </header>

        <div v-if="images.length" class="gallery-grid">
          <button
            v-for="img in images"
            :key="img.id"
            class="gallery-tile"
            type="button"
            @click="openLightbox(img)"
          >
            <img :src="img.image" :alt="img.title" loading="lazy" />
            <span v-if="img.title" class="gallery-tile-caption">{{
              img.title
            }}</span>
          </button>
        </div>
        <div v-else class="state-card">
          <p>No images yet.</p>
        </div>

        <!-- Reels -->
        <header class="section-heading reels-heading">
          <span class="eyebrow">Portfolio</span>
          <h1>Reels</h1>
        </header>

        <div v-if="reels.length" class="reels-grid">
          <div v-for="reel in reels" :key="reel.id" class="reel-card">
            <iframe
              :src="reel.embed_url"
              :title="reel.title"
              allowfullscreen
              loading="lazy"
            />
            <span v-if="reel.title" class="reel-caption">{{ reel.title }}</span>
          </div>
        </div>
        <div v-else class="state-card">
          <p>No reels yet.</p>
        </div>
      </template>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxImage"
        class="lightbox-backdrop"
        @click="closeLightbox"
      >
        <button class="lightbox-close" type="button" @click="closeLightbox">
          &times;
        </button>
        <img
          :src="lightboxImage.image"
          :alt="lightboxImage.title"
          class="lightbox-image"
          @click.stop
        />
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.portfolio-subcategory {
  padding: clamp(2rem, 5vw, 4.5rem) clamp(1.25rem, 5vw, 3rem);
  background: #0c0c0d;
  min-height: 100vh;
}

.portfolio-subcategory-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.section-heading {
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
}

.reels-heading {
  margin-top: clamp(3rem, 6vw, 5rem);
}

.eyebrow {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #e0a63e;
  margin-bottom: 0.5rem;
}

.section-heading h1 {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  color: #f5f2ec;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.gallery-tile {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #1a1a1c;
}

.gallery-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-tile:hover img {
  transform: scale(1.08);
}

.gallery-tile-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.6rem 0.75rem;
  font-size: 0.85rem;
  color: #f5f2ec;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.75) 100%
  );
  text-align: left;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.gallery-tile:hover .gallery-tile-caption {
  opacity: 1;
}

/* Reels */
.reels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.reel-card {
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1c;
}

.reel-card iframe {
  width: 100%;
  aspect-ratio: 9 / 16;
  border: none;
  display: block;
}

.reel-caption {
  display: block;
  padding: 0.65rem 0.85rem;
  font-size: 0.9rem;
  color: #b8b4ab;
}

/* Skeletons */
.skeleton-tile {
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  background: linear-gradient(100deg, #1a1a1c 30%, #232326 45%, #1a1a1c 60%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 150% 0;
  }
  100% {
    background-position: -50% 0;
  }
}

/* States */
.state-card {
  padding: 3rem;
  text-align: center;
  color: #b8b4ab;
  border: 1px dashed #333335;
  border-radius: 14px;
  margin-bottom: 1rem;
}

.error-card {
  color: #e07a5f;
  border-color: rgba(224, 122, 95, 0.35);
}

/* Lightbox */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 2rem;
}

.lightbox-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #f5f2ec;
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
}
</style>
