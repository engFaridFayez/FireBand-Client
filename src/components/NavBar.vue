<script setup lang="ts">
import logo from "@/assets/images/logo.png"
defineProps<{
  theme: 'dark' | 'light'
}>()

defineEmits<{
  toggleTheme: []
}>()
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="Fireband home">
      <span class="brand-mark">
        <img :src="logo" alt="" />
      </span>
      <span>
        <strong>Fireband</strong>
        <small>Live music collective</small>
      </span>
    </a>

    <nav class="nav-links" aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#shows">Shows</a>
      <div class="nav-menu">
        <a class="nav-menu-trigger" href="#music" aria-haspopup="true">
          Music
          <span aria-hidden="true">v</span>
        </a>
        <div class="nav-dropdown" aria-label="Music event types">
          <a href="#music">Weddings</a>
          <a href="#music">Parties</a>
          <a href="#music">Private evenings</a>
        </div>
      </div>
      <a href="#team">Band</a>
      <a href="#booking">Booking</a>
    </nav>

    <button
      class="theme-toggle"
      type="button"
      :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="$emit('toggleTheme')"
    >
      <span class="toggle-icon" aria-hidden="true">{{ theme === 'dark' ? 'L' : 'D' }}</span>
      <span>{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
    </button>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 16px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
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
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background:
    linear-gradient(135deg, #ff3d00, #ffb000 54%, #02d0ff);
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
