<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue'
import { useAudioStore } from './stores/audio';
const harlem = new URL("@/assets/audio/Harlem.mp3", import.meta.url).href;
const audioStore = useAudioStore();
const audioRef = ref<HTMLAudioElement | null>(null);

onMounted(() => {
  audioStore.setAudio(audioRef.value);
});
</script>

<template>
    <audio ref="audioRef" loop preload="none">
      <source :src="harlem" type="audio/mpeg" />
    </audio>
  <RouterView />
</template>

<style scoped></style>
