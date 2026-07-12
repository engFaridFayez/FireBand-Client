<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/images/logo.png";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useAudioStore } from "@/stores/audio";

const audio = useAudioStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const scrolled = ref(false);
const menuOpen = ref(false);

const onScroll = () => {
  scrolled.value = window.scrollY > 60;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleLogout = () => {
  authStore.logout();
};

const { user } = storeToRefs(authStore);
defineProps<{
  theme: "dark" | "light";
}>();

defineEmits<{
  toggleTheme: [];
}>();

const scrollToSection = async (id: string) => {
  menuOpen.value = false;

  if (route.path !== "/") {
    await router.push("/");

    // wait for the home page to render before scrolling
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
onMounted(async () => {
  if (authStore.access) {
    await authStore.fetchUser();
  }
  await nextTick();
  window.dispatchEvent(new Event("resize"));
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header :class="['site-header', { 'site-header-scrolled': scrolled }]">
    <RouterLink class="brand" to="/" aria-label="Fireband home">
      <span class="brand-mark">
        <img :src="logo" alt="" />
      </span>
      <span>
        <strong>Fireband</strong>
        <small>Live music collective</small>
      </span>
    </RouterLink>

    <nav class="nav-links" aria-label="Main navigation">
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
        href="#booking"
        class="nav-link"
        @click.prevent="scrollToSection('shows')"
        >Shows</a
      >
      <a
        href="#booking"
        class="nav-link"
        @click.prevent="scrollToSection('team')"
        >Band</a
      >
      <div class="nav-menu">
        <button
          class="nav-menu-trigger"
          type="button"
          href="#music"
          aria-haspopup="true"
        >
          Music
          <span aria-hidden="true">v</span>
        </button>
        <div class="nav-dropdown" aria-label="Music event types">
          <RouterLink class="dropdown-link" :to="{ path: '/', hash: '#music' }"
            >Weddings</RouterLink
          >
          <RouterLink class="dropdown-link" :to="{ path: '/', hash: '#music' }"
            >Parties</RouterLink
          >
          <RouterLink class="dropdown-link" :to="{ path: '/', hash: '#music' }"
            >Private evenings</RouterLink
          >
        </div>
      </div>
      <RouterLink class="nav-link nav-primary" to="/pricing"
        >Booking</RouterLink
      >
      <div
        v-if="authStore.access && authStore.user"
        class="flex items-center gap-3"
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

      <div v-else>
        <RouterLink
          :to="{ name: 'login' }"
          class="rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
        >
          Login
        </RouterLink>
      </div>
    </nav>

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

  padding: 10px;

  border-radius: 12px;

  transition: all .3s ease;
}
.site-header {
    transition:
        top .3s,
        width .3s,
        padding .3s,
        background .3s,
        box-shadow .3s,
        backdrop-filter .3s;
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
.theme-toggle {
  min-height: 42px;
  border: 0;
  border-radius: 8px;
  color: var(--muted);
  background: transparent;
  font: inherit;
  text-decoration: none;
}

.nav-links a {
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  font-weight: 750;
}

.nav-menu {
  position: relative;
}

.nav-menu-trigger {
  gap: 6px;
}

.nav-menu-trigger span {
  font-size: 0.7rem;
  font-weight: 900;
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
.nav-menu:focus-within .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-links a:hover,
.theme-toggle:hover {
  color: var(--text);
  background: var(--soft);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 14px;
  border: 1px solid var(--line);
  cursor: pointer;
}

.toggle-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-weight: 900;
}

@media (max-width: 760px) {
  .site-header {
    top: 8px;
    width: min(100% - 16px, 1180px);
    flex-wrap: wrap;
    gap: 10px;
  }

  .nav-links {
    order: 3;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  .nav-links a,
  .nav-menu-trigger {
    justify-content: center;
    padding: 0 6px;
    font-size: 0.82rem;
  }

  .nav-menu {
    min-width: 0;
  }

  .nav-dropdown {
    right: 0;
    left: auto;
  }

  .brand small,
  .theme-toggle span:last-child {
    display: none;
  }
}
</style>
