<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Eye, EyeOff } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

const showPassword = ref(false);

const loading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

async function login() {
  try {
    await authStore.login(username.value, password.value);
    router.push("/");
  } catch (err) {
    // handled in store
  }
}
</script>

<template>
  <main
    class="min-h-screen bg-[#08070a] flex items-center justify-center px-4 relative overflow-hidden"
  >
    <!-- Background -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,75,18,.25),transparent_45%)]"
    />

    <div
      class="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl"
    />

    <!-- Login Card -->
    <section
      class="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
    >
      <div class="mb-8 text-center">
        <span
          class="inline-flex rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400"
        >
          FIREBAND
        </span>

        <h1 class="mt-5 text-4xl font-black tracking-wide text-white">
          Admin Login
        </h1>

        <p class="mt-3 text-sm text-gray-400">
          Sign in to access the Fireband dashboard.
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="login">
        <!-- Username -->
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-300">
            Username
          </label>

          <input
            id="username"
            v-model="username"
            type="text"
            autocomplete="username"
            placeholder="Enter your username"
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-300">
            Password
          </label>

          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
              placeholder="Enter your password"
            />

            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-400"
              @click="showPassword = !showPassword"
            >
              <Eye v-if="!showPassword" class="h-5 w-5" />

              <EyeOff v-else class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Error -->
        <Transition name="fade">
          <div
            v-if="error"
            class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {{ error }}
          </div>
        </Transition>

        <!-- Login -->
        <button
          type="submit"
          :disabled="loading"
          class="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            v-if="loading"
            class="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />

            <path
              class="opacity-100"
              fill="currentColor"
              d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
            />
          </svg>

          <span v-else> Login </span>
        </button>
      </form>
    </section>
  </main>
</template>
