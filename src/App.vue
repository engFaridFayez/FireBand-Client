<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onBeforeUnmount, onMounted, ref } from 'vue'
import harlem from '@/assets/audio/Harlem.mp3'

const audioRef = ref<HTMLAudioElement | null>(null)

const playAudio = async () => {
  const audio = audioRef.value

  if (!audio) return

  audio.muted = false
  audio.volume = 1

  try {
    await audio.play()
  } catch {
    window.addEventListener('click', playAudio, { once: true })
    window.addEventListener('keydown', playAudio, { once: true })
  }
}

onMounted(() => {
  playAudio()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', playAudio)
  window.removeEventListener('keydown', playAudio)
})
</script>

<template>
  <audio ref="audioRef" hidden autoplay loop :muted="false">
    <source :src="harlem" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <RouterView />
</template>

<style scoped></style>
