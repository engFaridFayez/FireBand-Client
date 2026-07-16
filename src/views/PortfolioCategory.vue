<!-- views/PortfolioCategory.vue -->
<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";

const props = defineProps<{ id: string }>();
const route = useRoute();
const categoryStore = useCategoryStore();
const { subCategories, loading, error } = storeToRefs(categoryStore);

const load = (id: string) => {
  categoryStore.fetchSubCategoriesByCategory(Number(id));
};

onMounted(() => load(props.id));

watch(
  () => route.params.id,
  (newId) => {
    if (newId) load(newId as string);
  },
);
</script>

<template>
  <section class="portfolio-category">
    <div class="portfolio-category-inner">
      <header class="section-heading">
        <span class="eyebrow">Portfolio</span>
        <h1>Choose a collection</h1>
      </header>

      <!-- Loading skeleton -->
      <div v-if="loading" class="subcategory-grid">
        <div v-for="n in 6" :key="n" class="skeleton-card" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="state-card error-card">
        <p>{{ error }}</p>
      </div>

      <!-- Empty -->
      <div v-else-if="!subCategories.length" class="state-card">
        <p>No sub-categories yet.</p>
      </div>

      <!-- Content -->
      <div v-else class="subcategory-grid">
        <RouterLink
          v-for="sub in subCategories"
          :key="sub.id"
          class="subcategory-card"
          :to="{
            name: 'portfolio-subcategory',
            params: { categoryId: props.id, subId: sub.id },
          }"
        >
          <div class="subcategory-media">
            <img
              v-if="sub.image"
              :src="sub.image"
              :alt="sub.name"
              loading="lazy"
            />
            <div v-else class="subcategory-media-fallback" aria-hidden="true" />
            <div class="subcategory-overlay" />
          </div>
          <span class="subcategory-name">{{ sub.name }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-category {
  padding: clamp(2rem, 5vw, 4.5rem) clamp(1.25rem, 5vw, 3rem);
  background: #0c0c0d;
  min-height: 100vh;
}

.portfolio-category-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.section-heading {
  margin-bottom: clamp(2rem, 4vw, 3rem);
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
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  color: #f5f2ec;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
}

.subcategory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.subcategory-card {
  position: relative;
  display: flex;
  align-items: flex-end;
  aspect-ratio: 4 / 5;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  background: #1a1a1c;
  isolation: isolate;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.subcategory-card:hover,
.subcategory-card:focus-visible {
  transform: translateY(-6px);
}

.subcategory-media {
  position: absolute;
  inset: 0;
}

.subcategory-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.subcategory-card:hover .subcategory-media img {
  transform: scale(1.06);
}

.subcategory-media-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2d, #17171a);
}

.subcategory-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.85) 100%
  );
}

.subcategory-name {
  position: relative;
  z-index: 1;
  padding: 1.25rem;
  color: #f5f2ec;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

/* Skeleton loading state */
.skeleton-card {
  aspect-ratio: 4 / 5;
  border-radius: 14px;
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

.state-card {
  padding: 3rem;
  text-align: center;
  color: #b8b4ab;
  border: 1px dashed #333335;
  border-radius: 14px;
}

.error-card {
  color: #e07a5f;
  border-color: rgba(224, 122, 95, 0.35);
}
</style>
