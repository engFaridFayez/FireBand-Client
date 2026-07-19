<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import { useAudioStore } from "@/stores/audio";
import harlem from "@/assets/audio/Harlem.mp3";
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/language";

const { locale } = useI18n();
const languageStore = useLanguageStore();
document.documentElement.lang = languageStore.locale
document.documentElement.dir = languageStore.locale === 'ar' ? 'rtl' : 'ltr'

watch(
  () => languageStore.locale,
  (value) => {
    locale.value = value;
  },
  { immediate: true }
);
const audioStore = useAudioStore();
const audioRef = ref<HTMLAudioElement | null>(null);

onMounted(() => {
  if (audioRef.value) {
    audioStore.setAudio(audioRef.value);

  }
});
</script>

<template>
  <audio
    ref="audioRef"
    :src="harlem"
    loop
    preload="auto"
  ></audio>

  <RouterView />
</template>

<style scoped>
[dir="rtl"] h1 {
  line-height: 1.35;
  padding-bottom: 0.08em;
  white-space: normal;
}
</style>