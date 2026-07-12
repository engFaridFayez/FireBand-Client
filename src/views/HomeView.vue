<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import image1 from "@/assets/images/image1.jpg"
import image2 from "@/assets/images/image2.jpg"
import image3 from "@/assets/images/image3.jpg"
import image4 from "@/assets/images/image4.jpg"
import image5 from "@/assets/images/image5.jpg"
import image6 from "@/assets/images/image6.jpg"
import image7 from "@/assets/images/image7.jpg"
import { useAudioStore } from "@/stores/audio";

const audio = useAudioStore();
const theme = ref<'dark' | 'light'>('dark')

const galleryImages = [image1, image2, image3, image4, image5, image6]
let revealObserver: IntersectionObserver | null = null
const revealDelay = (index: number) => ({ '--reveal-delay': `${index * 120}ms` })

const shows = [
  { date: '28 Jun', city: 'Cairo', venue: 'Ember Hall', tag: 'Album night' },
  { date: '12 Jul', city: 'Alexandria', venue: 'North Stage', tag: 'Open air' },
  { date: '03 Aug', city: 'Giza', venue: 'Pulse Arena', tag: 'Late show' },
]

const members = [
  { name: 'Mira', role: 'Lead vocal', accent: 'Vox' },
  { name: 'Adam', role: 'Electric guitar', accent: 'Riff' },
  { name: 'Nour', role: 'Keys and synth', accent: 'Glow' },
  { name: 'Youssef', role: 'Drums', accent: 'Beat' },
]

onMounted(() => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18 },
  )

  document
    .querySelectorAll('.reveal, .reveal-card')
    .forEach((element) => revealObserver?.observe(element))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
})
</script>

<template>
  <main class="fireband-page" :data-theme="theme" id="home">
    <div class="spark-field" aria-hidden="true">
      <span
        v-for="spark in 32"
        :key="spark"
        :style="{
          left: `${(spark * 37) % 100}%`,
          animationDelay: `-${spark * 0.76}s`,
          animationDuration: `${18 + spark * 0.45}s`,
        }"
      ></span>
    </div>

    <NavBar :theme="theme" @toggle-theme="theme = theme === 'dark' ? 'light' : 'dark'" />

    <section class="hero-section" id="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Public debut season 2026</p>
        <h1 id="hero-title">Fireband</h1>
        <p class="hero-lede">
          A live band built for bright choruses, electric drums, and rooms that move together.
        </p>

        <div class="hero-actions">
          <a class="primary-action" href="#booking">Book the band</a>
          <button class="secondary-action" @click="audio.play">Hear the sound</button>
        </div>

        <div class="stats-strip" aria-label="Fireband highlights">
          <span class="reveal-card reveal-up" style="--reveal-delay: 80ms"><strong>4</strong> performers</span>
          <span class="reveal-card reveal-up" style="--reveal-delay: 180ms"><strong>18</strong> songs</span>
          <span class="reveal-card reveal-up" style="--reveal-delay: 280ms"><strong>90</strong> min set</span>
        </div>
      </div>

      <figure class="hero-gallery" aria-label="Fireband animated photo gallery">
        <div
          v-for="(image, index) in galleryImages"
          :key="image"
          class="gallery-card"
          :style="{ animationDelay: `${index === 0 ? 0 : -(12 - index * 2)}s` }"
        >
          <img :src="image" :alt="`Fireband performance photo ${index + 1}`" />
        </div>
      </figure>
    </section>

    <section class="about-section reveal reveal-up" id="about" aria-labelledby="about-title">
      <figure class="about-image">
        <img :src="image7" alt="Fireband live performance atmosphere" />
      </figure>

      <div class="about-copy">
        <p class="eyebrow">About Fireband</p>
        <h2 id="about-title">A public show made to feel close, loud, and unforgettable.</h2>
        <p>
          Fireband blends rock drive, pop melodies, and glowing synth textures into a live set built
          for festivals, private events, and headline nights. Every song is arranged for movement:
          big vocal moments, sharp guitar lines, deep drums, and a crowd-first stage presence.
        </p>
      </div>
    </section>

    <section class="section-panel music-panel reveal reveal-left" id="music" aria-labelledby="music-title">
      <div>
        <p class="eyebrow">Signature sound</p>
        <h2 id="music-title">Rock energy, pop hooks, stage-fire rhythm.</h2>
      </div>
      <div class="track-list">
        <article class="reveal-card reveal-left" style="--reveal-delay: 80ms">
          <span>01</span>
          <strong>Burn The Night</strong>
          <small>Festival opener</small>
        </article>
        <article class="reveal-card reveal-left" style="--reveal-delay: 180ms">
          <span>02</span>
          <strong>Neon Pulse</strong>
          <small>Synth-rock single</small>
        </article>
        <article class="reveal-card reveal-left" style="--reveal-delay: 280ms">
          <span>03</span>
          <strong>Ashes To Gold</strong>
          <small>Big final chorus</small>
        </article>
      </div>
    </section>

    <section class="show-grid reveal reveal-right" id="shows" aria-labelledby="shows-title">
      <div class="section-heading">
        <p class="eyebrow">Upcoming shows</p>
        <h2 id="shows-title">Catch the next spark.</h2>
      </div>

      <article
        v-for="(show, index) in shows"
        :key="show.date"
        class="show-card reveal-card reveal-up"
        :style="revealDelay(index)"
      >
        <time>{{ show.date }}</time>
        <div>
          <strong>{{ show.city }}</strong>
          <span>{{ show.venue }}</span>
        </div>
        <p>{{ show.tag }}</p>
      </article>
    </section>

    <section class="team-section reveal reveal-up" id="team" aria-labelledby="team-title">
      <div class="section-heading">
        <p class="eyebrow">The team</p>
        <h2 id="team-title">Four musicians. One loud heartbeat.</h2>
      </div>

      <div class="member-grid">
        <article
          v-for="(member, index) in members"
          :key="member.name"
          class="member-card reveal-card reveal-up"
          :style="revealDelay(index)"
        >
          <span>{{ member.accent }}</span>
          <strong>{{ member.name }}</strong>
          <small>{{ member.role }}</small>
        </article>
      </div>
    </section>

    <section class="booking-band reveal reveal-down" id="booking" aria-labelledby="booking-title">
      <div>
        <p class="eyebrow">Booking</p>
        <h2 id="booking-title">Bring Fireband to the stage.</h2>
      </div>
      <a class="primary-action" href="mailto:booking@fireband.show">booking@fireband.show</a>
    </section>
  </main>
</template>

<style scoped>
.fireband-page {
  --bg: #08070a;
  --surface: #111014;
  --surface-strong: #19161f;
  --soft: rgba(255, 255, 255, 0.075);
  --line: rgba(255, 255, 255, 0.13);
  --text: #fff8ef;
  --muted: #b9b1aa;
  --fire: #ff4b12;
  --gold: #ffb000;
  --cyan: #00c9ff;
  --rose: #ff2f6d;
  --shadow-soft: 0 22px 70px rgba(0, 0, 0, 0.36);
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--text);
  background:
    radial-gradient(circle at 12% 16%, rgba(255, 75, 18, 0.28), transparent 30%),
    radial-gradient(circle at 92% 10%, rgba(0, 201, 255, 0.18), transparent 28%),
    linear-gradient(135deg, #08070a 0%, #171019 47%, #060508 100%);
}

.fireband-page[data-theme='light'] {
  --bg: #fff8ef;
  --surface: #ffffff;
  --surface-strong: #fff0dc;
  --soft: rgba(9, 10, 14, 0.062);
  --line: rgba(20, 20, 24, 0.13);
  --text: #141014;
  --muted: #625b56;
  --shadow-soft: 0 20px 60px rgba(164, 91, 42, 0.18);
  background:
    radial-gradient(circle at 14% 10%, rgba(255, 176, 0, 0.32), transparent 28%),
    radial-gradient(circle at 90% 16%, rgba(0, 201, 255, 0.2), transparent 28%),
    linear-gradient(135deg, #fff8ef 0%, #fff 45%, #f1fbff 100%);
}

.spark-field {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.spark-field span {
  position: absolute;
  bottom: -12vh;
  width: clamp(4px, 0.65vw, 9px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, #fff7cf 0 12%, var(--gold) 24%, var(--fire) 62%, transparent 72%);
  box-shadow:
    0 0 16px rgba(255, 176, 0, 0.72),
    0 0 34px rgba(255, 75, 18, 0.42);
  opacity: 0;
  transform: translate3d(0, 0, 0) scale(0.6);
  animation-name: spark-rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.spark-field span:nth-child(4n) {
  width: clamp(3px, 0.48vw, 7px);
}

.spark-field span:nth-child(4n + 1) {
  width: clamp(5px, 0.72vw, 10px);
}

.spark-field span:nth-child(5n) {
  background: radial-gradient(circle, #ffffff 0 10%, #00c9ff 28%, #ffb000 58%, transparent 74%);
  box-shadow:
    0 0 14px rgba(0, 201, 255, 0.52),
    0 0 32px rgba(255, 176, 0, 0.36);
}

.hero-section,
.about-section,
.section-panel,
.show-grid,
.team-section,
.booking-band {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.reveal {
  opacity: 0;
  transition:
    opacity 760ms ease,
    transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.reveal-card {
  opacity: 0;
  transition:
    opacity 680ms ease var(--reveal-delay, 0ms),
    transform 680ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}

.reveal-up {
  transform: translateY(46px);
}

.reveal-down {
  transform: translateY(-42px);
}

.reveal-left {
  transform: translateX(-54px);
}

.reveal-right {
  transform: translateX(54px);
}

.reveal.is-visible,
.reveal-card.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.92fr);
  align-items: center;
  gap: clamp(28px, 4vw, 56px);
  min-height: calc(100vh - 74px);
  padding: 72px 0 48px;
  animation: section-rise 800ms ease both;
  margin-top: 25px;
}

.hero-copy {
  position: relative;
  z-index: 2;
  min-width: 0;
  animation: copy-glow 7s ease-in-out infinite;
}

.eyebrow {
  margin: 0 0 14px;
  color: var(--fire);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  max-width: 100%;
  font-size: clamp(3.5rem, 7.6vw, 7.2rem);
  line-height: 0.82;
  letter-spacing: 0;
  text-transform: uppercase;
  white-space: nowrap;
  color: transparent;
  background:
    radial-gradient(circle at 14% 18%, #fff6c7 0 8%, transparent 22%),
    linear-gradient(100deg, #ff2f00 0%, #ffb000 28%, #fff1a8 42%, #ff4b12 58%, #8f1400 76%, #00c9ff 100%);
  background-size: 220% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  filter:
    drop-shadow(0 0 14px rgba(255, 75, 18, 0.32))
    drop-shadow(0 12px 32px rgba(0, 0, 0, 0.38));
  animation: title-fire 4.5s ease-in-out infinite;
}

h2 {
  margin-bottom: 0;
  font-size: clamp(2rem, 5vw, 4.8rem);
  line-height: 0.95;
  letter-spacing: 0;
}

.hero-lede {
  max-width: 620px;
  color: var(--muted);
  font-size: clamp(1.05rem, 2vw, 1.45rem);
  line-height: 1.55;
}

.hero-actions,
.booking-band {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 20px;
  border-radius: 8px;
  font-weight: 900;
  text-decoration: none;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.primary-action:hover,
.secondary-action:hover {
  transform: translateY(-3px);
}

.primary-action {
  color: #140a05;
  background: linear-gradient(135deg, var(--gold), var(--fire));
  box-shadow: 0 18px 44px rgba(255, 75, 18, 0.32);
}

.secondary-action {
  color: var(--text);
  border: 1px solid var(--line);
  background: var(--soft);
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  max-width: 520px;
  margin-top: 34px;
}

.stats-strip span {
  min-height: 84px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 72%, transparent);
}

.stats-strip strong {
  display: block;
  font-size: 2rem;
}

.hero-gallery {
  position: relative;
  z-index: 1;
  min-width: 0;
  width: 100%;
  min-height: 430px;
  aspect-ratio: 1.18;
  margin: 0;
  transform-style: preserve-3d;
  perspective: 1200px;
  animation: image-float 6.5s ease-in-out infinite;
}

.hero-gallery::before {
  position: absolute;
  inset: 8% 2% -4%;
  content: '';
  border-radius: 8px;
  background:
    radial-gradient(circle at 28% 30%, rgba(255, 176, 0, 0.34), transparent 34%),
    radial-gradient(circle at 72% 60%, rgba(0, 201, 255, 0.24), transparent 34%);
  filter: blur(24px);
}

.hero-gallery::after {
  position: absolute;
  inset: auto 8% 8% 8%;
  height: 16px;
  content: '';
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--fire), var(--gold), var(--cyan), transparent);
  filter: blur(12px);
  opacity: 0.82;
  animation: ember-pulse 3.6s ease-in-out infinite;
}

.gallery-card {
  position: absolute;
  top: 7%;
  bottom: 7%;
  left: 14%;
  width: 72%;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  opacity: 0;
  transform: translate3d(0, 0, -220px) scale(0.7);
  transform-origin: center;
  animation: gallery-swap 12s ease-in-out infinite;
  will-change: transform, opacity;
}

.gallery-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-card::after {
  position: absolute;
  inset: 0;
  content: '';
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.34)),
    radial-gradient(circle at 18% 18%, rgba(255, 176, 0, 0.26), transparent 28%);
  pointer-events: none;
}

.about-section {
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(22px, 4vw, 52px);
  margin-top: 28px;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  box-shadow: var(--shadow-soft);
}

.about-image {
  position: relative;
  object-fit: cover;
  min-height: 430px;
  margin: 0;
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
}

.about-image::after {
  position: absolute;
  inset: 0;
  content: '';
  background:
    linear-gradient(180deg, transparent 46%, rgba(0, 0, 0, 0.48)),
    radial-gradient(circle at 18% 18%, rgba(255, 176, 0, 0.22), transparent 30%);
  pointer-events: none;
}

.about-image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  transform: scale(1.02);
}

.about-copy p:not(.eyebrow) {
  max-width: 620px;
  margin: 22px 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.6vw, 1.18rem);
  line-height: 1.75;
}

.section-panel,
.team-section,
.booking-band {
  margin-top: 28px;
}

.section-panel,
.booking-band {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1fr);
  gap: 24px;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  box-shadow: var(--shadow-soft);
}

.track-list {
  display: grid;
  gap: 10px;
}

.track-list article,
.show-card,
.member-card {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--soft);
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    background 200ms ease;
}

.track-list article:hover,
.show-card:hover,
.member-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--fire) 42%, var(--line));
  background: color-mix(in srgb, var(--soft) 82%, var(--fire));
}

.track-list article {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 4px 14px;
  align-items: center;
  padding: 16px;
}

.track-list span {
  grid-row: span 2;
  color: var(--fire);
  font-weight: 900;
}

.track-list small,
.show-card span,
.member-card small {
  color: var(--muted);
}

.section-heading {
  margin-bottom: 18px;
}

.show-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 74px;
}

.show-grid .section-heading {
  grid-column: 1 / -1;
}

.show-card {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 18px;
  min-height: 150px;
  padding: 18px;
}

.show-card time {
  color: var(--gold);
  font-size: 1.5rem;
  font-weight: 950;
  line-height: 0.95;
}

.show-card strong,
.show-card span {
  display: block;
}

.show-card p {
  grid-column: 1 / -1;
  align-self: end;
  margin: 0;
  font-weight: 850;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.member-card {
  min-height: 220px;
  padding: 18px;
  background:
    linear-gradient(180deg, transparent, rgba(255, 75, 18, 0.14)),
    var(--soft);
}

.member-card span {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 72px;
  border-radius: 8px;
  color: #130905;
  font-size: 0.8rem;
  font-weight: 950;
  background: linear-gradient(135deg, var(--gold), var(--cyan));
}

.member-card strong,
.member-card small {
  display: block;
}

.member-card strong {
  font-size: 1.4rem;
}

.booking-band {
  align-items: center;
  justify-content: space-between;
  margin-bottom: 42px;
}

:global(*) {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

@media (max-width: 1100px) {
  .hero-section,
  .about-section,
  .section-panel,
  .booking-band {
    grid-template-columns: 1fr;
  }

  .hero-copy { order: 1; }
  .hero-gallery { order: 2; }

  .hero-section {
    min-height: auto;
    padding-top: 54px;
  }

  h1 {
    font-size: clamp(3.8rem, 14vw, 8.4rem);
  }

  .hero-gallery {
    max-width: 680px;
    margin-inline: auto;
  }

  .about-image {
    min-height: 360px;
  }

  .show-grid,
  .member-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1101px) {
  h1 {
    font-size: clamp(3.5rem, 7.1vw, 6.8rem);
  }

  .hero-gallery {
    justify-self: end;
    width: min(100%, 520px);
  }
}

@media (max-width: 620px) {
  .hero-section,
  .about-section,
  .section-panel,
  .show-grid,
  .team-section,
  .booking-band {
    width: min(100% - 16px, 1180px);
  }

  .hero-section {
    gap: 24px;
    padding-top: 42px;
  }

  h1 {
    font-size: clamp(3.1rem, 17vw, 6rem);
  }

  .stats-strip,
  .show-grid,
  .member-grid {
    grid-template-columns: 1fr;
  }

  .section-panel,
  .about-section,
  .booking-band {
    padding: 18px;
  }

  .about-image {
    min-height: 280px;
  }

  .hero-actions {
    width: 100%;
  }

  .primary-action,
  .secondary-action {
    width: 100%;
  }

  .hero-gallery {
    min-height: 310px;
  }
}

@keyframes spark-rise {
  0% {
    opacity: 0;
    transform: translate3d(-12px, 0, 0) scale(0.35) rotate(0deg);
  }

  12% {
    opacity: 0.85;
  }

  55% {
    opacity: 0.58;
  }

  100% {
    opacity: 0;
    transform: translate3d(34px, -118vh, 0) scale(1.1) rotate(180deg);
  }
}

@keyframes image-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

@keyframes gallery-swap {
  0%,
  12.5% {
    opacity: 1;
    transform: translate3d(0, 0, 80px) rotateY(0deg) rotateZ(0deg) scale(1);
    z-index: 5;
  }

  16.666%,
  29.166% {
    opacity: 0.78;
    transform: translate3d(-42%, 22px, -80px) rotateY(18deg) rotateZ(-4deg) scale(0.82);
    z-index: 3;
  }

  33.333%,
  79.166% {
    opacity: 0;
    transform: translate3d(-74%, 34px, -240px) rotateY(26deg) rotateZ(-7deg) scale(0.64);
    z-index: 1;
  }

  83.333%,
  95.833% {
    opacity: 0.78;
    transform: translate3d(42%, 22px, -80px) rotateY(-18deg) rotateZ(4deg) scale(0.82);
    z-index: 3;
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 80px) rotateY(0deg) rotateZ(0deg) scale(1);
    z-index: 5;
  }
}

@keyframes title-fire {
  0%,
  100% {
    background-position: 0% 50%;
    filter:
      drop-shadow(0 0 12px rgba(255, 75, 18, 0.26))
      drop-shadow(0 12px 32px rgba(0, 0, 0, 0.34));
  }

  50% {
    background-position: 100% 50%;
    filter:
      drop-shadow(0 0 22px rgba(255, 176, 0, 0.38))
      drop-shadow(0 0 34px rgba(255, 75, 18, 0.22));
  }
}

@keyframes ember-pulse {
  0%,
  100% {
    opacity: 0.56;
    transform: scaleX(0.86);
  }

  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes section-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes copy-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(255, 176, 0, 0));
  }

  50% {
    filter: drop-shadow(0 0 18px rgba(255, 75, 18, 0.14));
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
</style>
