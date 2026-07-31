<!-- views/Portfolio.vue -->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/category";

const router = useRouter();
const categoryStore = useCategoryStore();
const { categories, loading, error } = storeToRefs(categoryStore);

const expandedId = ref<number | null>(null);

function toggleCategory(id: number) {
  expandedId.value = expandedId.value === id ? null : id;
}
function goHome() {
  router.push("/");
}
function goToSubCategory(categoryId: number, subId: number) {
  router.push({
    name: "portfolio-subcategory",
    params: { categoryId, subId },
  });
}

onMounted(() => categoryStore.fetchCategories());
</script>

<template>
  <section class="portfolio">
    <div class="portfolio-inner">
      <header class="section-heading">
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
        <span class="eyebrow">Portfolio</span>
        <h1>Choose a collection</h1>
      </header>

      <div v-if="loading" class="category-grid">
        <div v-for="n in 6" :key="n" class="skeleton-card" />
      </div>

      <div v-else-if="error" class="state-card error-card">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="!categories.length" class="state-card">
        <p>No categories yet.</p>
      </div>

      <div v-else class="category-list">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-block"
        >
          <button
            class="category-row"
            type="button"
            :aria-expanded="expandedId === category.id"
            @click="toggleCategory(category.id)"
          >
            <div class="category-media">
              <img
                v-if="category.image"
                :src="category.image"
                :alt="category.name"
                loading="lazy"
              />
              <div v-else class="category-media-fallback" aria-hidden="true" />
            </div>
            <div class="category-text">
              <span class="category-name">{{ category.name }}</span>
              <p v-if="category.description" class="category-desc">
                {{ category.description }}
              </p>
            </div>
            <span
              class="category-chevron"
              :class="{ open: expandedId === category.id }"
              aria-hidden="true"
              >⌄</span
            >
          </button>

          <transition name="expand">
            <div v-if="expandedId === category.id" class="subcategory-grid">
              <template v-if="category.subcategories?.length">
                <button
                  v-for="sub in category.subcategories"
                  :key="sub.id"
                  class="subcategory-card"
                  type="button"
                  @click="goToSubCategory(category.id, sub.id)"
                >
                  <div class="subcategory-media">
                    <img
                      v-if="sub.image"
                      :src="sub.image"
                      :alt="sub.name"
                      loading="lazy"
                    />
                    <div
                      v-else
                      class="subcategory-media-fallback"
                      aria-hidden="true"
                    />
                    <div class="subcategory-overlay" />
                  </div>
                  <span class="subcategory-name">{{ sub.name }}</span>
                </button>
              </template>
              <p v-else class="state-card">No sub-categories yet.</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio {
  padding: clamp(2rem, 5vw, 4.5rem) clamp(1.25rem, 5vw, 3rem);
  background: #0c0c0d;
  min-height: 100vh;
}
.category-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.category-name {
  color: #f5f2ec;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.category-desc {
  margin: 0;
  color: #b8b4ab;
  font-size: 0.85rem;
  line-height: 1.4;
  /* clamp so a long description doesn't blow out the row */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.portfolio-inner {
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

.category-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-block {
  border: 1px solid #232326;
  border-radius: 14px;
  overflow: hidden;
  background: #131315;
}

.category-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.85rem 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.category-media {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: #1a1a1c;
}
.category-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.category-media-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2d, #17171a);
}

.category-name {
  flex: 1;
  color: #f5f2ec;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.category-chevron {
  color: #b8b4ab;
  font-size: 1.25rem;
  transition: transform 0.25s ease;
}
.category-chevron.open {
  transform: rotate(180deg);
}

.subcategory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
  padding: 0 1.25rem 1.25rem;
}

.subcategory-card {
  position: relative;
  display: flex;
  align-items: flex-end;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #1a1a1c;
  isolation: isolate;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.subcategory-card:hover,
.subcategory-card:focus-visible {
  transform: translateY(-4px);
}
.subcategory-media {
  position: absolute;
  inset: 0;
}
.subcategory-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  padding: 1rem;
  color: #f5f2ec;
  font-size: 0.95rem;
  font-weight: 600;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}
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

.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
