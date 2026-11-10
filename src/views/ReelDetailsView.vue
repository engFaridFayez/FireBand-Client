
<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useReelStore } from "@/stores/reel";
import { useHead } from "@unhead/vue";
const route = useRoute();
const reelStore = useReelStore();

const { selectedReel, loading, error } = storeToRefs(reelStore);

const seoReel = computed(() => {
  const reel = selectedReel.value;

  return reel?.slug === route.params.slug
    ? reel
    : null;
});

const seoTitle = computed(() => {
  return seoReel.value
    ? `${seoReel.value.title} - FireBand`
    : "FireBand";
});

const seoDescription = computed(() => {
  const reel = seoReel.value;

  if (!reel) return "شاهد فيديوهات وأغاني FireBand";

  return reel.description?.trim() ||
    `شاهد أداء FireBand لأغنية ${reel.title}${
      reel.artist ? ` من أغاني ${reel.artist}` : ""
    }.`;
});

const canonicalUrl = computed(() => {
  if (!seoReel.value) return null;

  return `${window.location.origin}/videos/${
    encodeURIComponent(seoReel.value.slug)
  }`;
});

useHead(() => ({
  title: seoTitle.value,

  htmlAttrs: {
    lang: "ar",
  },

  meta: [
    {
      name: "description",
      content: seoDescription.value,
    },
    {
      property: "og:title",
      content: seoTitle.value,
    },
    {
      property: "og:description",
      content: seoDescription.value,
    },
    {
      property: "og:type",
      content: "video.other",
    },
    {
      property: "og:site_name",
      content: "FireBand",
    },
    ...(canonicalUrl.value
      ? [{
          property: "og:url",
          content: canonicalUrl.value,
        }]
      : []),
    ...(seoReel.value?.thumbnail
      ? [{
          property: "og:image",
          content: seoReel.value.thumbnail,
        }]
      : []),
  ],

  link: canonicalUrl.value
    ? [{
        rel: "canonical",
        href: canonicalUrl.value,
      }]
    : [],
}));

watch(
  () => route.params.slug,
  (slug) => {
    if (typeof slug === "string") {
      reelStore.fetchReelBySlug(slug);
    }
  },
  { immediate: true }
);
</script>

<template>
  <main class="reel-details" dir="rtl">

    <div v-if="loading">
      جاري تحميل الأغنية...
    </div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else-if="selectedReel">

      <h1>
        {{ selectedReel.title }} - FireBand
      </h1>

      <p v-if="selectedReel.artist">
        الفنان الأصلي: {{ selectedReel.artist }}
      </p>

      <p v-if="selectedReel.description">
        {{ selectedReel.description }}
      </p>

      <div class="video-container">
        <iframe
          :src="selectedReel.embed_url"
          :title="selectedReel.title"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
        ></iframe>
      </div>

    </div>

  </main>
</template>

<style scoped>
.reel-details {
  max-width: 1100px;
  margin: 60px auto;
  padding: 24px;
}

.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-top: 24px;
}

.video-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
}
</style>
