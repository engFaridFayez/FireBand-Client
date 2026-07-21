<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  // Pass "light" if the rest of your app is toggled into light mode;
  // defaults to the dark fireband theme.
  theme: {
    type: String,
    default: "dark",
  },
});

const router = useRouter();

function goHome() {
  router.push({ name: "home" });
}

function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push({ name: "home" });
  }
}

// Scatter the embers so they don't all rise in lockstep.
const sparks = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 137.5) % 100}%`,
  delay: `${(i * 0.37) % 7.5}s`,
  duration: `${5.5 + ((i * 0.63) % 4)}s`,
}));
</script>

<template>
  <main
    class="fireband-page fireband-404"
    :data-theme="props.theme === 'light' ? 'light' : null"
  >
    <div class="spark-field" aria-hidden="true">
      <span
        v-for="(s, i) in sparks"
        :key="i"
        :style="{
          left: s.left,
          animationDelay: s.delay,
          animationDuration: s.duration,
        }"
      ></span>
    </div>

    <section class="error-stage reveal is-visible">
      <p class="eyebrow">Error 404 · Off the setlist</p>

      <h1 class="error-title">Page went dark</h1>

      <p class="error-lede">
        This one didn't make the lineup — the link's broken, the show's been
        moved, or the page never existed. Let's get you back to the stage.
      </p>

      <div class="hero-actions">
        <button type="button" class="primary-action" @click="goHome">
          Back to home
        </button>
      </div>

      <div class="error-code" aria-hidden="true">404</div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  color: var(--text);
  background:
    radial-gradient(
      circle at 12% 16%,
      rgba(255, 75, 18, 0.28),
      transparent 30%
    ),
    radial-gradient(
      circle at 92% 10%,
      rgba(0, 201, 255, 0.18),
      transparent 28%
    ),
    linear-gradient(135deg, #08070a 0%, #171019 47%, #060508 100%);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.fireband-page[data-theme="light"] {
  --bg: #fff8ef;
  --surface: #ffffff;
  --surface-strong: #fff0dc;
  --soft: rgba(9, 10, 14, 0.062);
  --line: rgba(20, 20, 24, 0.13);
  --text: #141014;
  --muted: #625b56;
  --shadow-soft: 0 20px 60px rgba(164, 91, 42, 0.18);
  background:
    radial-gradient(
      circle at 14% 10%,
      rgba(255, 176, 0, 0.32),
      transparent 28%
    ),
    radial-gradient(circle at 90% 16%, rgba(0, 201, 255, 0.2), transparent 28%),
    linear-gradient(135deg, #fff8ef 0%, #fff 45%, #f1fbff 100%);
}

/* ---------- rising embers ---------- */
.spark-field {
  position: absolute;
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
  background: radial-gradient(
    circle,
    #fff7cf 0 12%,
    var(--gold) 24%,
    var(--fire) 62%,
    transparent 72%
  );
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
  background: radial-gradient(
    circle,
    #ffffff 0 10%,
    #00c9ff 28%,
    #ffb000 58%,
    transparent 74%
  );
  box-shadow:
    0 0 14px rgba(0, 201, 255, 0.52),
    0 0 32px rgba(255, 176, 0, 0.36);
}

/* ---------- stage ---------- */
.error-stage {
  position: relative;
  z-index: 1;
  width: min(680px, calc(100% - 32px));
  padding: 44px clamp(20px, 5vw, 56px) 56px;
  text-align: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  box-shadow: var(--shadow-soft);
}

.eyebrow {
  margin: 0 0 14px;
  color: var(--fire);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.error-title {
  margin: 0 0 18px;
  font-size: clamp(2.4rem, 6.4vw, 4.4rem);
  line-height: 0.96;
  letter-spacing: 0;
  text-transform: uppercase;
  color: transparent;
  background:
    radial-gradient(circle at 14% 18%, #fff6c7 0 8%, transparent 22%),
    linear-gradient(
      100deg,
      #8f1400 76%,
      #00c9ff 100%
    );
  background-size: 220% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  filter: drop-shadow(0 0 14px rgba(255, 75, 18, 0.32))
    drop-shadow(0 12px 32px rgba(0, 0, 0, 0.38));
}

.error-lede {
  max-width: 46ch;
  margin: 0 auto 30px;
  color: var(--muted);
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  border-radius: 8px;
  border: none;
  font-weight: 900;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
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

.primary-action:hover,
.secondary-action:hover {
  transform: translateY(-3px);
}

.primary-action:focus-visible,
.secondary-action:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

/* faint watermark numeral behind the copy, echoes the stats-strip numerals
   from the rest of the site without competing with the headline */
.error-code {
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 950;
  line-height: 1;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px var(--line);
  opacity: 0.55;
}

@media (max-width: 480px) {
  .error-stage {
    padding: 36px 18px 44px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .primary-action,
  .secondary-action {
    width: 100%;
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

@keyframes title-fire {
  0%,
  100% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 12px rgba(255, 75, 18, 0.26))
      drop-shadow(0 12px 32px rgba(0, 0, 0, 0.34));
  }
  50% {
    background-position: 100% 50%;
    filter: drop-shadow(0 0 22px rgba(255, 176, 0, 0.38))
      drop-shadow(0 0 34px rgba(255, 75, 18, 0.22));
  }
}

@media (prefers-reduced-motion: reduce) {
  .fireband-404 *,
  .fireband-404 *::before,
  .fireband-404 *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
</style>