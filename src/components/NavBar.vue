<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/images/logo.png";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useAudioStore } from "@/stores/audio";
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore();

const { categories } = storeToRefs(categoryStore);

const audio = useAudioStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const scrolled = ref(false);
const menuOpen = ref(false);
const musicMenuOpen = ref(false);
const headerRef = ref<HTMLElement | null>(null);

const onScroll = () => {
  scrolled.value = window.scrollY > 60;
};

const updateHeaderHeight = () => {
  if (!headerRef.value) return;
  const height = headerRef.value.getBoundingClientRect().height;
  document.documentElement.style.setProperty(
    "--site-header-height",
    `${height}px`,
  );
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (!menuOpen.value) musicMenuOpen.value = false;
};

const closeMenu = () => {
  menuOpen.value = false;
  musicMenuOpen.value = false;
};

const toggleMusicMenu = () => {
  musicMenuOpen.value = !musicMenuOpen.value;
};

const handleLogout = () => {
  authStore.logout();
  closeMenu();
};

const { user } = storeToRefs(authStore);
defineProps<{
  theme: "dark" | "light";
}>();

defineEmits<{
  toggleTheme: [];
}>();

const scrollToSection = async (id: string) => {
  closeMenu();

  if (route.path !== "/") {
    await router.push("/");

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
const onResize = () => {
  updateHeaderHeight();
};

onMounted(async () => {
  if (authStore.access) {
    await authStore.fetchUser();
  }
  await nextTick();
  await categoryStore.fetchCategories();
  updateHeaderHeight();
  window.dispatchEvent(new Event("resize"));
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onResize);

  const logoImg = headerRef.value?.querySelector("img");
  logoImg?.addEventListener("load", updateHeaderHeight);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <header
    ref="headerRef"
    :class="['site-header', { 'site-header-scrolled': scrolled }]"
  >
    <RouterLink
      class="brand"
      to="/"
      aria-label="Fireband home"
      @click="closeMenu"
    >
      <span class="brand-mark">
        <img :src="logo" alt="" />
      </span>
      <span>
        <strong>Fireband</strong>
        <small>Live music collective</small>
      </span>
    </RouterLink>

    <nav
      id="primary-navigation"
      class="nav-links"
      :class="{ 'nav-links-open': menuOpen }"
      aria-label="Main navigation"
    >
      <a href="#hero" class="nav-link" @click.prevent="scrollToSection('hero')"
        >Home</a
      >
      <a
        href="#about"
        class="nav-link"
        @click.prevent="scrollToSection('about')"
        >About</a
      >
      <a
        href="#shows"
        class="nav-link"
        @click.prevent="scrollToSection('shows')"
        >Shows</a
      >
      <a href="#team" class="nav-link" @click.prevent="scrollToSection('team')"
        >Band</a
      >
      <div class="nav-menu" :class="{ 'is-open': musicMenuOpen }">
        <button
          class="nav-menu-trigger"
          type="button"
          aria-haspopup="true"
          :aria-expanded="musicMenuOpen"
          @click="toggleMusicMenu"
        >
          Portfolio
          <span aria-hidden="true">v</span>
        </button>
        <div class="nav-dropdown" aria-label="Music event types">
          <RouterLink
            v-for="category in categories"
            :key="category.id"
            class="dropdown-link"
            :to="{
              name: 'portfolio-category',
              params: {
                id: category.id,
              },
            }"
            @click="closeMenu"
          >
            {{ category.name }}
          </RouterLink>
        </div>
      </div>
      <RouterLink class="nav-link nav-primary" to="/booking" @click="closeMenu"
        >Booking</RouterLink
      >
      <div
        v-if="authStore.access && authStore.user"
        class="account-block flex flex-wrap items-center gap-3"
      >
        <div
          class="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 backdrop-blur-md"
        >
          <span class="text-sm font-medium text-orange-300">
            Hello,
            <span class="font-bold text-white">
              {{ authStore.user.username }}
            </span>
          </span>
        </div>

        <RouterLink
          v-if="authStore.user.is_staff"
          to="/admin"
          class="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-300 transition-all duration-300 hover:bg-yellow-500 hover:text-black"
          @click="closeMenu"
        >
          Dashboard
        </RouterLink>

        <button
          @click="handleLogout"
          class="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </div>

      <div v-else class="account-block">
        <RouterLink
          :to="{ name: 'login' }"
          class="rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
          @click="closeMenu"
        >
          Login
        </RouterLink>
      </div>
    </nav>

    <div class="header-actions">
      <button
        class="audio-toggle"
        type="button"
        :aria-label="audio.isPlaying ? 'Mute music' : 'Play music'"
        @click="audio.toggle"
      >
        <svg
          v-if="audio.isPlaying"
          xmlns="http://www.w3.org/2000/svg"
          width="1.3em"
          height="1.3em"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" d="M6 18V6h12v12z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="1.3em"
          height="1.3em"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="currentColor"
            fill-opacity="0"
            stroke="currentColor"
            stroke-dasharray="38"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 6l10 6l-10 6Z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.5s"
              values="38;0"
            />
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.5s"
              dur="0.4s"
              to="1"
            />
          </path>
        </svg>
      </button>

      <button
        class="theme-toggle"
        type="button"
        :aria-label="
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        "
        @click="$emit('toggleTheme')"
      >
        <span class="toggle-icon" aria-hidden="true">{{
          theme === "dark" ? "L" : "D"
        }}</span>
        <span>{{ theme === "dark" ? "Light" : "Dark" }}</span>
      </button>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="menu-icon" :class="{ 'is-open': menuOpen }">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>

    <div
      v-if="menuOpen"
      class="nav-backdrop"
      @click="closeMenu"
      aria-hidden="true"
    ></div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);

  z-index: 1000;

  width: min(1180px, calc(100% - 32px));

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  padding: 10px;

  border-radius: 12px;

  transition: all 0.3s ease;
}
.site-header {
  transition:
    top 0.3s,
    width 0.3s,
    padding 0.3s,
    background 0.3s,
    box-shadow 0.3s,
    backdrop-filter 0.3s;
}
.site-header-scrolled {
  top: 12px;

  background: color-mix(in srgb, var(--surface) 90%, transparent);

  backdrop-filter: blur(18px);

  border: 1px solid var(--line);

  box-shadow: var(--shadow-soft);
}

.brand {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  gap: 10px;
  color: var(--text);
  text-decoration: none;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background: linear-gradient(135deg, #ff3d00, #ffb000 54%, #02d0ff);
  box-shadow: 0 14px 34px rgba(255, 73, 13, 0.32);
  overflow: hidden;
  flex-shrink: 0;
}

.brand-mark img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 1rem;
  letter-spacing: 0;
}

.brand small {
  margin-top: 2px;
  color: var(--muted);
  font-size: 0.72rem;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-links a,
.theme-toggle,
.audio-toggle,
.account-pill {
  min-height: 42px;
  border: 0;
  border-radius: 8px;
  color: var(--muted);
  background: transparent;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.nav-links a {
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  font-weight: 750;
  white-space: nowrap;
}

.nav-menu {
  position: relative;
}

.nav-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 42px;
  padding: 0 14px;
  border: 0;
  border-radius: 8px;
  color: var(--muted);
  background: transparent;
  font: inherit;
  font-weight: 750;
  cursor: pointer;
}

.nav-menu-trigger span {
  font-size: 0.7rem;
  font-weight: 900;
  transition: transform 160ms ease;
}

.nav-menu.is-open .nav-menu-trigger span {
  transform: rotate(180deg);
}

.nav-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 190px;
  padding: 6px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition:
    opacity 160ms ease,
    transform 160ms ease,
    visibility 160ms ease;
}

.nav-dropdown a {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding: 0 12px;
  white-space: nowrap;
}

.nav-menu:hover .nav-dropdown,
.nav-menu:focus-within .nav-dropdown,
.nav-menu.is-open .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-links a:hover,
.theme-toggle:hover,
.audio-toggle:hover,
.account-pill:hover {
  color: var(--text);
  background: var(--soft);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 14px;
  border: 1px solid var(--line);
  cursor: pointer;
  flex-shrink: 0;
}

.audio-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid var(--line);
  cursor: pointer;
  flex-shrink: 0;
}

.toggle-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-weight: 900;
}

/* Hamburger menu button — hidden on wide screens, shown once nav links
   would no longer comfortably fit in the header. */
.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--soft);
  cursor: pointer;
}

.menu-icon {
  position: relative;
  width: 18px;
  height: 13px;
}

.menu-icon span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--text);
  transition:
    transform 220ms ease,
    opacity 220ms ease,
    top 220ms ease;
}

.menu-icon span:nth-child(1) {
  top: 0;
}

.menu-icon span:nth-child(2) {
  top: 5.5px;
}

.menu-icon span:nth-child(3) {
  top: 11px;
}

.menu-icon.is-open span:nth-child(1) {
  top: 5.5px;
  transform: rotate(45deg);
}

.menu-icon.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.is-open span:nth-child(3) {
  top: 5.5px;
  transform: rotate(-45deg);
}

.account-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-backdrop {
  display: none;
}

/* ---------- Responsive breakpoints ---------- */

/* Tablet and below: switch to the hamburger menu */
@media (max-width: 900px) {
  .menu-toggle {
    display: inline-flex;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    z-index: 999;

    flex-direction: column;
    align-items: stretch;
    gap: 4px;

    max-height: calc(100vh - 110px);
    overflow-y: auto;

    padding: 12px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: color-mix(in srgb, var(--surface) 95%, transparent);
    backdrop-filter: blur(18px);
    box-shadow: var(--shadow-soft);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-8px);
    transition:
      opacity 220ms ease,
      transform 220ms ease,
      visibility 220ms ease;
  }

  .nav-links-open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }

  .nav-links a,
  .nav-menu-trigger {
    width: 100%;
    padding: 12px 14px;
  }

  .nav-menu {
    width: 100%;
  }

  .nav-dropdown {
    position: static;
    display: none;
    margin-top: 2px;
    width: 100%;
    border: 0;
    box-shadow: none;
    background: var(--soft);
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .nav-menu.is-open .nav-dropdown {
    display: block;
  }

  .account-block {
    flex-wrap: wrap;
    width: 100%;
    padding-top: 6px;
    border-top: 1px solid var(--line);
    margin-top: 6px;
  }

  .nav-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(2px);
  }
}

@media (max-width: 480px) {
  .brand small {
    display: none;
  }

  .brand-mark {
    width: 56px;
    height: 56px;
  }

  .theme-toggle span:last-child {
    display: none;
  }

  .theme-toggle {
    padding: 0 10px;
  }

  .site-header {
    padding: 8px;
  }
}
</style>
