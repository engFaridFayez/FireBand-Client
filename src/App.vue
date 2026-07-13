<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import { useAudioStore } from "@/stores/audio";
import harlem from "@/assets/audio/Harlem.mp3";

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
</style>