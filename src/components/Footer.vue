<script setup lang="ts">
import { computed } from "vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());

const navLinks = computed(() => [
  { label: t("home-page.footer.section2.home"), href: "#home" },
  { label: t("home-page.footer.section2.about"), href: "#about" },
  { label: t("home-page.footer.section2.shows"), href: "#shows" },
  { label: t("home-page.footer.section2.band"), href: "#team" },
  { label: t("home-page.footer.section2.portfolio"), href: "#portfolio" },
  { label: t("home-page.footer.section2.booking"), href: "/booking" },
]);

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fire_band_2025/?hl=en",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@fire_band_2025",
    icon: "tiktok",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Fireband2",
    icon: "facebook",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@fireband",
    icon: "youtube",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/201028365789",
    icon: "whatsapp",
  },
];
</script>

<template>
  <footer
    class="relative isolate overflow-hidden bg-[#08070a] px-4 pt-16 text-[#fff8ef]"
    style="
      background-image:
        radial-gradient(
          circle at 10% 0%,
          rgba(255, 75, 18, 0.16),
          transparent 32%
        ),
        radial-gradient(
          circle at 90% 10%,
          rgba(0, 201, 255, 0.1),
          transparent 30%
        ),
        linear-gradient(180deg, #08070a 0%, #100c10 60%, #060508 100%);
    "
  >
    <!-- Ember divider -->
    <div
      class="absolute inset-x-0 top-0 h-px"
      style="
        background-image: linear-gradient(
          90deg,
          transparent 0%,
          #8f1400 20%,
          #ff4b12 45%,
          #ffb000 55%,
          #00c9ff 100%
        );
      "
    />

    <div class="mx-auto w-full max-w-5xl">
      <div class="grid gap-12 pb-12 sm:grid-cols-[1.3fr_1fr_1fr]">
        <!-- Brand -->
        <div>
          <p
            class="mb-3 text-[0.78rem] font-black uppercase tracking-normal text-[#ff4b12]"
          >
            {{ t("home-page.footer.section1.title") }}
          </p>

          <h2
            class="mb-4 bg-size-[220%_100%] bg-clip-text text-3xl font-extrabold uppercase leading-tight text-transparent"
            style="
              background-image: linear-gradient(
                100deg,
                #ff2f00 0%,
                #ffb000 28%,
                #fff1a8 42%,
                #ff4b12 58%,
                #8f1400 76%,
                #00c9ff 100%
              );
              filter: drop-shadow(0 0 12px rgba(255, 75, 18, 0.28));
            "
          >
            {{ t("home-page.footer.section1.main") }}
          </h2>

          <p class="max-w-xs text-sm leading-relaxed text-[#b9b1aa]">
            {{ t("home-page.footer.section1.content") }}
          </p>

          <!-- Social icons -->
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.13] bg-white/[0.05] text-[#fff8ef]/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-[#140a05]"
            >
              <span
                class="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style="
                  background-image: linear-gradient(135deg, #ffb000, #ff4b12);
                "
              />

              <svg
                v-if="social.icon === 'instagram'"
                class="relative h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
              </svg>

              <svg
                v-else-if="social.icon === 'tiktok'"
                class="relative h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M16.5 3c.3 1.9 1.6 3.4 3.5 3.7v2.6c-1.3 0-2.5-.4-3.5-1.1v6.4a5.7 5.7 0 1 1-5.7-5.7c.2 0 .5 0 .7.1v2.7a3 3 0 1 0 2.1 2.9V3h3z"
                />
              </svg>

              <svg
                v-else-if="social.icon === 'facebook'"
                class="relative h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.6-1.5h1.5V4.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.2v3H10.7V21h2.8z"
                />
              </svg>

              <svg
                v-else-if="social.icon === 'youtube'"
                class="relative h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M21.6 8.4a2.7 2.7 0 0 0-1.9-1.9C18 6 12 6 12 6s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 8.4 27.9 27.9 0 0 0 2 12a27.9 27.9 0 0 0 .4 3.6 2.7 2.7 0 0 0 1.9 1.9C6 18 12 18 12 18s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A27.9 27.9 0 0 0 22 12a27.9 27.9 0 0 0-.4-3.6ZM10 14.7V9.3L14.9 12 10 14.7Z"
                />
              </svg>

              <svg
                v-else-if="social.icon === 'whatsapp'"
                class="relative h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 0 1 6 11.2l-.3.5.9 2.6-2.7-.9-.5.3A7.2 7.2 0 1 1 12 4.8Zm-2.6 3.3c-.2 0-.4 0-.5.3-.2.3-.7.8-.7 2 0 1.1.8 2.2.9 2.4.1.1 1.6 2.6 4 3.5 2 .8 2.4.6 2.8.6.4 0 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.5-.3l-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.4-.5c.1-.2.1-.3 0-.5l-.7-1.6c-.1-.3-.3-.3-.5-.3h-.5Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h3
            class="mb-4 text-sm font-black uppercase tracking-wide text-white/80"
          >
            {{ t("home-page.footer.section2.title") }}
          </h3>

          <ul class="grid gap-3 text-sm text-[#b9b1aa]">
            <li v-for="link in navLinks" :key="link.label">
              <a
                :href="link.href"
                class="relative inline-block transition-colors duration-200 hover:text-[#ffb000]"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact / CTA -->
        <div>
          <h3
            class="mb-4 text-sm font-black uppercase tracking-wide text-white/80"
          >
            {{ t("home-page.footer.section3.title") }}
          </h3>

          <ul class="mb-6 grid gap-2 text-sm text-[#b9b1aa]">
            <li>
              <a
                href="mailto:hello@fireband.com"
                class="transition-colors duration-200 hover:text-[#ffb000]"
              >
                hello@fireband.com
              </a>
            </li>
            <li>
              <a
                href="tel:+10000000000"
                class="transition-colors duration-200 hover:text-[#ffb000]"
              >
                +1 (000) 000-0000
              </a>
            </li>
          </ul>

          <a
            href="/booking"
            class="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-gradient-to-br from-[#ffb000] to-[#ff4b12] px-5 text-sm font-black text-[#140a05] shadow-[0_14px_34px_rgba(255,75,18,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {{ t("home-page.footer.section3.button") }}
          </a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="flex flex-col items-center justify-center gap-4 border-t border-white/[0.08] py-6 text-center text-xs text-[#b9b1aa]/70"
      >
        <p>
          © {{ year }} Fireband. All rights reserved.
          <br />
          Website designed and developed by
          <a
            href="https://www.facebook.com/profile.php?id=61587219160997"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-[#ffb000] transition-colors duration-200 hover:text-[#ff4b12] hover:underline"
          >
            Eng/ Farid Fayez
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
