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
  <!-- ============================================================
       ROOT PAGE
       Dark: deep near-black + fire/cyan radials
       Light: warm cream + gold/cyan radials
  ============================================================ -->
  <main
    class="fireband-page relative isolate min-h-screen overflow-x-hidden text-[var(--text)] [animation:section-rise_800ms_ease_both]"
    :data-theme="theme"
    id="home"
  >

    <!-- ── Spark field ────────────────────────────────────────── -->
    <div class="spark-field fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <span
        v-for="spark in 32"
        :key="spark"
        class="spark-dot absolute bottom-[-12vh] rounded-full opacity-0"
        :style="{
          left: `${(spark * 37) % 100}%`,
          animationDelay: `-${spark * 0.76}s`,
          animationDuration: `${18 + spark * 0.45}s`,
        }"
      ></span>
    </div>

    <NavBar :theme="theme" @toggle-theme="theme = theme === 'dark' ? 'light' : 'dark'" />

    <!-- ============================================================
         HERO
    ============================================================ -->
    <section
      class="relative z-[1] w-[min(1180px,calc(100%-32px))] mx-auto
             grid grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] items-center
             gap-[clamp(28px,4vw,56px)] min-h-[calc(100vh-74px)] pt-[72px] pb-12
             max-[1100px]:grid-cols-1 max-[620px]:w-[min(calc(100%-16px),1180px)]
             max-[620px]:gap-6 max-[620px]:pt-[42px]
             [animation:section-rise_800ms_ease_both]"
      aria-labelledby="hero-title"
    >
      <!-- Copy -->
      <div
        class="hero-copy relative z-[2] min-w-0 [animation:copy-glow_7s_ease-in-out_infinite]
               max-[1100px]:order-1"
      >
        <p class="mt-0 mb-[14px] text-[var(--fire)] text-[0.78rem] font-black uppercase tracking-normal">
          Public debut season 2026
        </p>

        <h1
          class="hero-title mt-0 mb-[18px] max-w-full leading-[0.82] tracking-normal uppercase
                 whitespace-nowrap text-transparent bg-clip-text
                 [font-size:clamp(3.5rem,7.6vw,7.2rem)]
                 [background-image:radial-gradient(circle_at_14%_18%,#fff6c7_0_8%,transparent_22%),linear-gradient(100deg,#ff2f00_0%,#ffb000_28%,#fff1a8_42%,#ff4b12_58%,#8f1400_76%,#00c9ff_100%)]
                 [background-size:220%_100%]
                 [filter:drop-shadow(0_0_14px_rgba(255,75,18,0.32))_drop-shadow(0_12px_32px_rgba(0,0,0,0.38))]
                 [animation:title-fire_4.5s_ease-in-out_infinite]
                 min-[1101px]:[font-size:clamp(3.5rem,7.1vw,6.8rem)]
                 max-[1100px]:[font-size:clamp(3.8rem,14vw,8.4rem)]
                 max-[620px]:[font-size:clamp(3.1rem,17vw,6rem)]"
          id="hero-title"
        >Fireband</h1>

        <p class="mt-0 max-w-[620px] text-[var(--muted)] [font-size:clamp(1.05rem,2vw,1.45rem)] leading-[1.55]">
          A live band built for bright choruses, electric drums, and rooms that move together.
        </p>

        <div class="flex flex-wrap items-center gap-3 max-[620px]:w-full">
          <a
            class="inline-flex items-center justify-center min-h-[50px] px-5 rounded-[8px]
                   font-black no-underline transition-[transform,box-shadow] duration-[180ms] ease-[ease]
                   text-[#140a05] bg-gradient-to-br from-[var(--gold)] to-[var(--fire)]
                   shadow-[0_18px_44px_rgba(255,75,18,0.32)]
                   hover:-translate-y-[3px]
                   max-[620px]:w-full"
            href="#booking"
          >Book the band</a>
          <a
            class="inline-flex items-center justify-center min-h-[50px] px-5 rounded-[8px]
                   font-black no-underline transition-[transform,border-color,background] duration-[180ms] ease-[ease]
                   text-[var(--text)] border border-[var(--line)] bg-[var(--soft)]
                   hover:-translate-y-[3px]
                   max-[620px]:w-full"
            href="#music"
          >Hear the sound</a>
        </div>

        <!-- Stats strip -->
        <div
          class="grid grid-cols-3 gap-2 max-w-[520px] mt-[34px]
                 max-[620px]:grid-cols-1"
          aria-label="Fireband highlights"
        >
          <span
            class="reveal-card reveal-up min-h-[84px] p-4 border border-[var(--line)] rounded-[8px]
                   bg-[color-mix(in_srgb,var(--surface)_72%,transparent)]"
            style="--reveal-delay: 80ms"
          ><strong class="block text-[2rem]">4</strong> performers</span>
          <span
            class="reveal-card reveal-up min-h-[84px] p-4 border border-[var(--line)] rounded-[8px]
                   bg-[color-mix(in_srgb,var(--surface)_72%,transparent)]"
            style="--reveal-delay: 180ms"
          ><strong class="block text-[2rem]">18</strong> songs</span>
          <span
            class="reveal-card reveal-up min-h-[84px] p-4 border border-[var(--line)] rounded-[8px]
                   bg-[color-mix(in_srgb,var(--surface)_72%,transparent)]"
            style="--reveal-delay: 280ms"
          ><strong class="block text-[2rem]">90</strong> min set</span>
        </div>
      </div>

      <!-- Gallery -->
      <figure
        class="hero-gallery relative z-[1] min-w-0 w-full min-h-[430px] aspect-[1.18] m-0
               [transform-style:preserve-3d] [perspective:1200px]
               [animation:image-float_6.5s_ease-in-out_infinite]
               max-[1100px]:order-2 max-[1100px]:max-w-[680px] max-[1100px]:mx-auto
               min-[1101px]:justify-self-end min-[1101px]:w-[min(100%,520px)]
               max-[620px]:min-h-[310px]"
        aria-label="Fireband animated photo gallery"
      >
        <!-- glow blob behind gallery -->
        <span
          class="absolute inset-[8%_2%_-4%_2%] rounded-[8px]
                 [background:radial-gradient(circle_at_28%_30%,rgba(255,176,0,0.34),transparent_34%),radial-gradient(circle_at_72%_60%,rgba(0,201,255,0.24),transparent_34%)]
                 blur-[24px] pointer-events-none"
          aria-hidden="true"
        ></span>
        <!-- ember line -->
        <span
          class="absolute bottom-[8%] left-[8%] right-[8%] h-[16px] rounded-full
                 [background:linear-gradient(90deg,transparent,var(--fire),var(--gold),var(--cyan),transparent)]
                 blur-[12px] opacity-[0.82]
                 [animation:ember-pulse_3.6s_ease-in-out_infinite] pointer-events-none"
          aria-hidden="true"
        ></span>

        <div
          v-for="(image, index) in galleryImages"
          :key="image"
          class="gallery-card absolute top-[7%] bottom-[7%] left-[14%] w-[72%]
                 border border-[var(--line)] rounded-[8px] overflow-hidden bg-[var(--surface)]
                 shadow-[var(--shadow-soft)] opacity-0
                 [transform:translate3d(0,0,-220px)_scale(0.7)] [transform-origin:center]
                 [animation:gallery-swap_12s_ease-in-out_infinite] will-change-[transform,opacity]"
          :style="{ animationDelay: `${index === 0 ? 0 : -(12 - index * 2)}s` }"
        >
          <img class="block w-full h-full object-cover" :src="image" :alt="`Fireband performance photo ${index + 1}`" />
          <!-- overlay -->
          <span
            class="absolute inset-0 pointer-events-none
                   [background:linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.34)),radial-gradient(circle_at_18%_18%,rgba(255,176,0,0.26),transparent_28%)]"
            aria-hidden="true"
          ></span>
        </div>
      </figure>
    </section>

    <!-- ============================================================
         ABOUT
    ============================================================ -->
    <section
      class="reveal reveal-up relative z-[1] w-[min(1180px,calc(100%-32px))] mx-auto mt-7
             grid grid-cols-[minmax(280px,0.85fr)_minmax(0,1fr)] items-center
             gap-[clamp(22px,4vw,52px)] p-[26px]
             border border-[var(--line)] rounded-[8px]
             bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] shadow-[var(--shadow-soft)]
             max-[1100px]:grid-cols-1
             max-[620px]:w-[min(calc(100%-16px),1180px)] max-[620px]:p-[18px]"
      id="about"
      aria-labelledby="about-title"
    >
      <figure
        class="relative object-cover min-h-[430px] m-0 rounded-[8px] overflow-hidden bg-[var(--surface)]
               max-[1100px]:min-h-[360px] max-[620px]:min-h-[280px]"
      >
        <img
          class="block w-full h-full min-h-[inherit] object-cover scale-[1.02]"
          :src="image7"
          alt="Fireband live performance atmosphere"
        />
        <span
          class="absolute inset-0 pointer-events-none
                 [background:linear-gradient(180deg,transparent_46%,rgba(0,0,0,0.48)),radial-gradient(circle_at_18%_18%,rgba(255,176,0,0.22),transparent_30%)]"
          aria-hidden="true"
        ></span>
      </figure>

      <div class="about-copy">
        <p class="mt-0 mb-[14px] text-[var(--fire)] text-[0.78rem] font-black uppercase">About Fireband</p>
        <h2
          class="mt-0 mb-0 leading-[0.95] tracking-normal [font-size:clamp(2rem,5vw,4.8rem)]"
          id="about-title"
        >A public show made to feel close, loud, and unforgettable.</h2>
        <p class="max-w-[620px] mt-[22px] mb-0 text-[var(--muted)] [font-size:clamp(1rem,1.6vw,1.18rem)] leading-[1.75]">
          Fireband blends rock drive, pop melodies, and glowing synth textures into a live set built
          for festivals, private events, and headline nights. Every song is arranged for movement:
          big vocal moments, sharp guitar lines, deep drums, and a crowd-first stage presence.
        </p>
      </div>
    </section>

    <!-- ============================================================
         MUSIC
    ============================================================ -->
    <section
      class="reveal reveal-left relative z-[1] w-[min(1180px,calc(100%-32px))] mx-auto mt-7
             grid grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)] gap-6 p-[26px]
             border border-[var(--line)] rounded-[8px]
             bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] shadow-[var(--shadow-soft)]
             max-[1100px]:grid-cols-1
             max-[620px]:w-[min(calc(100%-16px),1180px)] max-[620px]:p-[18px]"
      id="music"
      aria-labelledby="music-title"
    >
      <div>
        <p class="mt-0 mb-[14px] text-[var(--fire)] text-[0.78rem] font-black uppercase">Signature sound</p>
        <h2
          class="mt-0 mb-0 leading-[0.95] tracking-normal [font-size:clamp(2rem,5vw,4.8rem)]"
          id="music-title"
        >Rock energy, pop hooks, stage-fire rhythm.</h2>
      </div>

      <div class="grid gap-[10px]">
        <article
          class="reveal-card reveal-left grid grid-cols-[52px_1fr] gap-y-1 gap-x-[14px] items-center p-4
                 border border-[var(--line)] rounded-[8px] bg-[var(--soft)]
                 transition-[transform,border-color,background] duration-200 ease-[ease]
                 hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--fire)_42%,var(--line))]
                 hover:bg-[color-mix(in_srgb,var(--soft)_82%,var(--fire))]"
          style="--reveal-delay: 80ms"
        >
          <span class="row-span-2 text-[var(--fire)] font-black">01</span>
          <strong>Burn The Night</strong>
          <small class="text-[var(--muted)]">Festival opener</small>
        </article>
        <article
          class="reveal-card reveal-left grid grid-cols-[52px_1fr] gap-y-1 gap-x-[14px] items-center p-4
                 border border-[var(--line)] rounded-[8px] bg-[var(--soft)]
                 transition-[transform,border-color,background] duration-200 ease-[ease]
                 hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--fire)_42%,var(--line))]
                 hover:bg-[color-mix(in_srgb,var(--soft)_82%,var(--fire))]"
          style="--reveal-delay: 180ms"
        >
          <span class="row-span-2 text-[var(--fire)] font-black">02</span>
          <strong>Neon Pulse</strong>
          <small class="text-[var(--muted)]">Synth-rock single</small>
        </article>
        <article
          class="reveal-card reveal-left grid grid-cols-[52px_1fr] gap-y-1 gap-x-[14px] items-center p-4
                 border border-[var(--line)] rounded-[8px] bg-[var(--soft)]
                 transition-[transform,border-color,background] duration-200 ease-[ease]
                 hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--fire)_42%,var(--line))]
                 hover:bg-[color-mix(in_srgb,var(--soft)_82%,var(--fire))]"
          style="--reveal-delay: 280ms"
        >
          <span class="row-span-2 text-[var(--fire)] font-black">03</span>
          <strong>Ashes To Gold</strong>
          <small class="text-[var(--muted)]">Big final chorus</small>
        </article>
      </div>
    </section>

    <!-- ============================================================
         SHOWS
    ============================================================ -->
    <section
      class="reveal reveal-right relative z-[1] w-[min(1180px,calc(100%-32px))] mx-auto mt-[74px]
             grid grid-cols-3 gap-[14px]
             max-[1100px]:grid-cols-2
             max-[620px]:w-[min(calc(100%-16px),1180px)] max-[620px]:grid-cols-1"
      id="shows"
      aria-labelledby="shows-title"
    >
      <div class="col-span-full mb-[18px]">
        <p class="mt-0 mb-[14px] text-[var(--fire)] text-[0.78rem] font-black uppercase">Upcoming shows</p>
        <h2
          class="mt-0 mb-0 leading-[0.95] tracking-normal [font-size:clamp(2rem,5vw,4.8rem)]"
          id="shows-title"
        >Catch the next spark.</h2>
      </div>

      <article
        v-for="(show, index) in shows"
        :key="show.date"
        class="reveal-card reveal-up grid grid-cols-[88px_1fr] gap-[18px] min-h-[150px] p-[18px]
               border border-[var(--line)] rounded-[8px] bg-[var(--soft)]
               transition-[transform,border-color,background] duration-200 ease-[ease]
               hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--fire)_42%,var(--line))]
               hover:bg-[color-mix(in_srgb,var(--soft)_82%,var(--fire))]"
        :style="revealDelay(index)"
      >
        <time class="text-[var(--gold)] text-[1.5rem] font-[950] leading-[0.95]">{{ show.date }}</time>
        <div>
          <strong class="block">{{ show.city }}</strong>
          <span class="block text-[var(--muted)]">{{ show.venue }}</span>
        </div>
        <p class="col-span-full self-end m-0 font-[850]">{{ show.tag }}</p>
      </article>
    </section>

    <!-- ============================================================
         TEAM
    ============================================================ -->
    <section
      class="reveal reveal-up relative z-[1] w-[min(1180px,calc(100%-32px))] mx-auto mt-7
             max-[620px]:w-[min(calc(100%-16px),1180px)]"
      id="team"
      aria-labelledby="team-title"
    >
      <div class="mb-[18px]">
        <p class="mt-0 mb-[14px] text-[var(--fire)] text-[0.78rem] font-black uppercase">The team</p>
        <h2
          class="mt-0 mb-0 leading-[0.95] tracking-normal [font-size:clamp(2rem,5vw,4.8rem)]"
          id="team-title"
        >Four musicians. One loud heartbeat.</h2>
      </div>

      <div
        class="grid grid-cols-4 gap-3
               max-[1100px]:grid-cols-2 max-[620px]:grid-cols-1"
      >
        <article
          v-for="(member, index) in members"
          :key="member.name"
          class="reveal-card reveal-up min-h-[220px] p-[18px] rounded-[8px]
                 border border-[var(--line)]
                 [background:linear-gradient(180deg,transparent,rgba(255,75,18,0.14)),var(--soft)]
                 transition-[transform,border-color,background] duration-200 ease-[ease]
                 hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--fire)_42%,var(--line))]
                 hover:bg-[color-mix(in_srgb,var(--soft)_82%,var(--fire))]"
          :style="revealDelay(index)"
        >
          <span
            class="grid place-items-center w-16 h-16 mb-[72px] rounded-[8px]
                   text-[#130905] text-[0.8rem] font-[950]
                   bg-gradient-to-br from-[var(--gold)] to-[var(--cyan)]"
          >{{ member.accent }}</span>
          <strong class="block text-[1.4rem]">{{ member.name }}</strong>
          <small class="block text-[var(--muted)]">{{ member.role }}</small>
        </article>
      </div>
    </section>

    <!-- ============================================================
         BOOKING
    ============================================================ -->
    <section
      class="reveal reveal-down relative z-[1] w-[min(1180px,calc(100%-32px))] mx-auto mt-7 mb-[42px]
             flex flex-wrap items-center gap-3 justify-between p-[26px]
             border border-[var(--line)] rounded-[8px]
             bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] shadow-[var(--shadow-soft)]
             max-[620px]:w-[min(calc(100%-16px),1180px)] max-[620px]:p-[18px]"
      id="booking"
      aria-labelledby="booking-title"
    >
      <div>
        <p class="mt-0 mb-[14px] text-[var(--fire)] text-[0.78rem] font-black uppercase">Booking</p>
        <h2
          class="mt-0 mb-0 leading-[0.95] tracking-normal [font-size:clamp(2rem,5vw,4.8rem)]"
          id="booking-title"
        >Bring Fireband to the stage.</h2>
      </div>
      <a
        class="inline-flex items-center justify-center min-h-[50px] px-5 rounded-[8px]
               font-black no-underline transition-[transform,box-shadow] duration-[180ms] ease-[ease]
               text-[#140a05] bg-gradient-to-br from-[var(--gold)] to-[var(--fire)]
               shadow-[0_18px_44px_rgba(255,75,18,0.32)]
               hover:-translate-y-[3px]"
        href="mailto:booking@fireband.show"
      >booking@fireband.show</a>
    </section>
  </main>
</template>

<style>
/* ── CSS custom properties (theme tokens) ───────────────────────── */
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

/* ── Spark dot styles (size variants) ───────────────────────────── */
.spark-dot {
  width: clamp(4px, 0.65vw, 9px);
  aspect-ratio: 1;
  background: radial-gradient(circle, #fff7cf 0 12%, var(--gold) 24%, var(--fire) 62%, transparent 72%);
  box-shadow:
    0 0 16px rgba(255, 176, 0, 0.72),
    0 0 34px rgba(255, 75, 18, 0.42);
  transform: translate3d(0, 0, 0) scale(0.6);
  animation-name: spark-rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.spark-dot:nth-child(4n)   { width: clamp(3px, 0.48vw, 7px); }
.spark-dot:nth-child(4n+1) { width: clamp(5px, 0.72vw, 10px); }
.spark-dot:nth-child(5n) {
  background: radial-gradient(circle, #ffffff 0 10%, #00c9ff 28%, #ffb000 58%, transparent 74%);
  box-shadow:
    0 0 14px rgba(0, 201, 255, 0.52),
    0 0 32px rgba(255, 176, 0, 0.36);
}

/* ── Scroll-reveal states ───────────────────────────────────────── */
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

.reveal-up   { transform: translateY(46px); }
.reveal-down { transform: translateY(-42px); }
.reveal-left { transform: translateX(-54px); }
.reveal-right{ transform: translateX(54px); }

.reveal.is-visible,
.reveal-card.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* ── Global resets ──────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-width: 320px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* ── Keyframe animations ────────────────────────────────────────── */
@keyframes spark-rise {
  0% {
    opacity: 0;
    transform: translate3d(-12px, 0, 0) scale(0.35) rotate(0deg);
  }
  12% { opacity: 0.85; }
  55% { opacity: 0.58; }
  100% {
    opacity: 0;
    transform: translate3d(34px, -118vh, 0) scale(1.1) rotate(180deg);
  }
}

@keyframes image-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

@keyframes gallery-swap {
  0%, 12.5% {
    opacity: 1;
    transform: translate3d(0, 0, 80px) rotateY(0deg) rotateZ(0deg) scale(1);
    z-index: 5;
  }
  16.666%, 29.166% {
    opacity: 0.78;
    transform: translate3d(-42%, 22px, -80px) rotateY(18deg) rotateZ(-4deg) scale(0.82);
    z-index: 3;
  }
  33.333%, 79.166% {
    opacity: 0;
    transform: translate3d(-74%, 34px, -240px) rotateY(26deg) rotateZ(-7deg) scale(0.64);
    z-index: 1;
  }
  83.333%, 95.833% {
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
  0%, 100% {
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
  0%, 100% { opacity: 0.56; transform: scaleX(0.86); }
  50%       { opacity: 1;    transform: scaleX(1); }
}

@keyframes section-rise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes card-enter {
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes copy-glow {
  0%, 100% { filter: drop-shadow(0 0 0 rgba(255, 176, 0, 0)); }
  50%       { filter: drop-shadow(0 0 18px rgba(255, 75, 18, 0.14)); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
</style>