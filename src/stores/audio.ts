// stores/audio.ts

import { defineStore } from "pinia";
import { ref } from "vue";

export const useAudioStore = defineStore("audio", () => {
  const audio = ref<HTMLAudioElement | null>(null);
  const isPlaying = ref(false);

  function setAudio(el: HTMLAudioElement | null) {
    audio.value = el;
  }

  async function play() {
    if (!audio.value) return;

    try {
      await audio.value.play();
      isPlaying.value = true;
    } catch (err) {
      console.error("Audio Error:", err);
    }
  }

  function pause() {
    if (!audio.value) return;

    audio.value.pause();
    isPlaying.value = false;
  }

  async function toggle() {
    if (!audio.value) return;

    if (isPlaying.value) {
      pause();
    } else {
      await play();
    }
  }

  return {
    isPlaying,
    setAudio,
    play,
    pause,
    toggle,
  };
});