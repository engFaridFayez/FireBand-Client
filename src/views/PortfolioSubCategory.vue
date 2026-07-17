<!-- views/PortfolioSubCategory.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import GalleryImageService from "@/services/gallery.service";
import ReelService from "@/services/reel.service";
import type { GalleryImage } from "@/types/home";
import type { Reel } from "@/types/home";
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/");
}

const props = defineProps<{ subId: string }>();
const route = useRoute();

const images = ref<GalleryImage[]>([]);
const reels = ref<Reel[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

/* ---------- Gallery lightbox with prev/next navigation ---------- */
const lightboxIndex = ref<number | null>(null);

const lightboxImage = computed(() =>
  lightboxIndex.value !== null ? images.value[lightboxIndex.value] : null,
);

function openLightbox(index: number) {
  lightboxIndex.value = index;
}

function closeLightbox() {
  lightboxIndex.value = null;
}

function nextImage() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length;
}

function prevImage() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + images.value.length) % images.value.length;
}

function onLightboxKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    nextImage();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    prevImage();
  } else if (e.key === "Escape") {
    closeLightbox();
  }
}

watch(lightboxIndex, (val) => {
  if (val !== null) {
    window.addEventListener("keydown", onLightboxKeydown);
    document.body.style.overflow = "hidden";
  } else {
    window.removeEventListener("keydown", onLightboxKeydown);
    // only release scroll lock if the reel modal isn't also open
    if (!reelModalOpen.value) document.body.style.overflow = "";
  }
});

/* ---------- Reel embed cleanup (strip platform chrome) ---------- */
function cleanEmbedUrl(url: string) {
  if (!url) return url;
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      u.searchParams.set("controls", "0");
      u.searchParams.set("modestbranding", "1");
      u.searchParams.set("rel", "0");
      u.searchParams.set("iv_load_policy", "3");
      u.searchParams.set("disablekb", "1");
      u.searchParams.set("playsinline", "1");
      u.searchParams.set("fs", "0");
      return u.toString();
    }

    if (u.hostname.includes("vimeo.com")) {
      u.searchParams.set("title", "0");
      u.searchParams.set("byline", "0");
      u.searchParams.set("portrait", "0");
      u.searchParams.set("controls", "0");
      return u.toString();
    }

    return url;
  } catch {
    return url;
  }
}

/* ---------- Reel TikTok-style feed modal ---------- */
const reelModalOpen = ref(false);
const activeReelIndex = ref(0);
const reelFeedRef = ref<HTMLElement | null>(null);
const reelItemEls = ref<(HTMLElement | null)[]>([]);
let reelObserver: IntersectionObserver | null = null;

function setReelItemRef(el: any, i: number) {
  reelItemEls.value[i] = el as HTMLElement | null;
}

// Only the active reel gets a real src — every other iframe is emptied,
// which unloads it and stops playback.
function reelSrc(i: number, embedUrl: string) {
  return i === activeReelIndex.value ? cleanEmbedUrl(embedUrl) : "";
}

function setupReelObserver() {
  reelObserver?.disconnect();

  reelObserver = new IntersectionObserver(
    (entries) => {
      // Pick whichever entry is most visible right now
      let best: IntersectionObserverEntry | null = null;
      for (const entry of entries) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      }
      if (best && best.isIntersecting) {
        const idx = reelItemEls.value.indexOf(best.target as HTMLElement);
        if (idx !== -1 && idx !== activeReelIndex.value) {
          activeReelIndex.value = idx;
        }
      }
    },
    {
      root: reelFeedRef.value,
      threshold: [0.6],
    },
  );

  reelItemEls.value.forEach((el) => {
    if (el) reelObserver!.observe(el);
  });
}

function openReel(index: number) {
  activeReelIndex.value = index;
  reelModalOpen.value = true;
  nextTick(() => {
    reelItemEls.value[index]?.scrollIntoView({ block: "start" });
    reelFeedRef.value?.focus();
    setupReelObserver();
  });
}

function closeReelModal() {
  reelModalOpen.value = false;
  reelObserver?.disconnect();
  reelObserver = null;
}

function scrollToReel(i: number) {
  if (i < 0 || i >= reels.value.length) return;
  reelItemEls.value[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  // activeReelIndex will also update via the observer once the scroll settles,
  // but we set it immediately so the src swap feels instant on keyboard nav
  activeReelIndex.value = i;
}

function nextReel() {
  scrollToReel(activeReelIndex.value + 1);
}

function prevReel() {
  scrollToReel(activeReelIndex.value - 1);
}

function onFeedKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    nextReel();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    prevReel();
  } else if (e.key === "Escape") {
    closeReelModal();
  }
}

// Lock background scroll while the reel feed is open
watch(reelModalOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    window.addEventListener("keydown", onFeedKeydown);
  } else {
    window.removeEventListener("keydown", onFeedKeydown);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", onFeedKeydown);
  window.removeEventListener("keydown", onLightboxKeydown);
  reelObserver?.disconnect();
  document.body.style.overflow = "";
});

/* ---------- Data loading ---------- */
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
    reelItemEls.value = [];
  } catch (err: any) {
    error.value = err.response?.data?.detail || err.message;
  } finally {
    loading.value = false;
  }
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
        <button
          @click="goHome"
          class="cursor-pointer inline-flex items-center mb-5 gap-2 rounded-lg border border-amber-500 px-5 py-2.5 text-amber-400 transition hover:bg-amber-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>

          Back to Home
        </button>
        <header class="section-heading">
          <span class="eyebrow">Portfolio</span>
          <h1>Gallery</h1>
        </header>

        <div v-if="images.length" class="gallery-grid">
          <button
            v-for="(img, i) in images"
            :key="img.id"
            class="gallery-tile"
            type="button"
            @click="openLightbox(i)"
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
          <button
            v-for="(reel, i) in reels"
            :key="reel.id"
            class="reel-thumb-tile"
            type="button"
            @click="openReel(i)"
          >
            <img
              v-if="reel.thumbnail"
              :src="reel.thumbnail"
              :alt="reel.title"
              loading="lazy"
            />
            <span v-else class="reel-thumb-fallback" aria-hidden="true"
              >🎬</span
            >

            <span class="reel-thumb-play" aria-hidden="true">▶</span>

            <span v-if="reel.title" class="reel-thumb-caption">{{
              reel.title
            }}</span>
          </button>
        </div>
        <div v-else class="state-card">
          <p>No reels yet.</p>
        </div>
      </template>
    </div>

    <!-- Gallery Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxImage"
        class="lightbox-backdrop"
        @click="closeLightbox"
      >
        <button class="lightbox-close" type="button" @click="closeLightbox">
          &times;
        </button>

        <button
          v-if="images.length > 1"
          class="lightbox-nav lightbox-prev"
          type="button"
          aria-label="Previous image"
          @click.stop="prevImage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="m14 17l-5-5l5-5z" />
          </svg>
        </button>

        <img
          :src="lightboxImage.image"
          :alt="lightboxImage.title"
          class="lightbox-image"
          @click.stop
        />

        <button
          v-if="images.length > 1"
          class="lightbox-nav lightbox-next"
          type="button"
          aria-label="Next image"
          @click.stop="nextImage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M10 17V7l5 5z" />
          </svg>
        </button>
      </div>
    </Teleport>

    <!-- Reel feed modal (TikTok-style) -->
    <Teleport to="body">
      <div
        v-if="reelModalOpen"
        class="reel-modal-backdrop"
        @click.self="closeReelModal"
      >
        <button
          class="reel-modal-close"
          type="button"
          aria-label="Close reels"
          @click="closeReelModal"
        >
          &times;
        </button>

        <div
          ref="reelFeedRef"
          class="reel-feed"
          tabindex="0"
          role="group"
          aria-label="Reels feed, use arrow up and down keys to navigate"
          @keydown="onFeedKeydown"
          @click.stop
        >
          <div
            v-for="(reel, i) in reels"
            :key="reel.id"
            class="reel-feed-item"
            :ref="(el) => setReelItemRef(el, i)"
          >
            <iframe
              v-if="reelSrc(i, reel.embed_url)"
              :src="reelSrc(i, reel.embed_url)"
              :title="reel.title"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
            />
            <span v-if="reel.title" class="reel-feed-caption">{{
              reel.title
            }}</span>
          </div>
        </div>
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

/* ---------- Gallery ---------- */
.gallery-grid {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
}

.gallery-tile {
  position: relative;
  flex: 0 0 auto;
  width: clamp(220px, 22vw, 320px);
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #1a1a1c;
  scroll-snap-align: start;
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

/* Mobile: narrower tiles, captions always visible (no hover on touch) */
@media (max-width: 640px) {
  .gallery-tile {
    width: 72vw;
    max-width: 300px;
  }

  .gallery-tile-caption {
    opacity: 1;
  }
}

/* ---------- Reel thumbnails ---------- */
.reels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.reel-thumb-tile {
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: 14px;
  overflow: hidden;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #1a1a1c;
}

.reel-thumb-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.reel-thumb-tile:hover img {
  transform: scale(1.06);
}

.reel-thumb-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  color: #555;
}

.reel-thumb-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: #f5f2ec;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0.9;
  transition: opacity 0.25s ease;
}

.reel-thumb-tile:hover .reel-thumb-play {
  opacity: 1;
  background: rgba(0, 0, 0, 0.4);
}

.reel-thumb-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem 0.6rem;
  font-size: 0.8rem;
  color: #f5f2ec;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.75) 100%
  );
  text-align: left;
}

/* ---------- Skeletons ---------- */
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

/* ---------- States ---------- */
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

/* ---------- Gallery Lightbox ---------- */
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

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #f5f2ec;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.18);
}

.lightbox-prev {
  left: 1.5rem;
}

.lightbox-next {
  right: 1.5rem;
}

@media (max-width: 640px) {
  .lightbox-nav {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .lightbox-prev {
    left: 0.5rem;
  }

  .lightbox-next {
    right: 0.5rem;
  }
}

/* ---------- Reel feed modal (TikTok style) ---------- */
.reel-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem clamp(1rem, 4vw, 3rem);
}

.reel-modal-close {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 210;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  color: #f5f2ec;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
}

.reel-feed {
  position: relative;
  width: min(420px, 92vw);
  height: min(88vh, 760px);
  border-radius: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  background: #000;
  outline: none;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
  scrollbar-width: none;
}

.reel-feed::-webkit-scrollbar {
  display: none;
}

.reel-feed-item {
  position: relative;
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: #000;
}

.reel-feed-item iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.reel-feed-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem 1.1rem;
  font-size: 0.95rem;
  color: #f5f2ec;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.75) 100%
  );
  pointer-events: none;
}

/* Mobile: feed takes over almost the full screen, thin edge remains
   visible so tapping outside still closes it */
@media (max-width: 640px) {
  .reel-modal-backdrop {
    padding: 0.75rem;
  }

  .reel-feed {
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
}
</style>
