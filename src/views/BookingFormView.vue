<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useBookingStore } from "@/stores/booking";
import { useCategoryStore } from "@/stores/category";
import { showPopup } from "@/lib/swal";
import type { BookingPayload } from "@/types/booking";

const router = useRouter();

const bookingStore = useBookingStore();
const categoryStore = useCategoryStore();

const form = reactive<BookingPayload>({
  full_name: "",
  phone: "",
  email: "",

  event_date: "",
  event_time: "",

  location: "",

  category: 0,
  sub_category: 0,
  duration: 0,

  custom_sub_category: "",

  team_members: 1,

  notes: "",
});

const submitted = ref(false);

const categories = computed(() => categoryStore.categories);

const subCategories = computed(() =>
  categoryStore.subCategories.filter((item) => item.category === form.category),
);

const selectedSubCategory = computed(() =>
  categoryStore.subCategories.find((item) => item.id === form.sub_category),
);

const durations = computed(() => {
  return selectedSubCategory.value?.duration ?? [];
});

const showCustomSubCategory = computed(() => {
  return selectedSubCategory.value?.is_custom ?? false;
});

const rules = computed(() => {
  return selectedSubCategory.value?.rules ?? [];
});

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchCategories(),
    categoryStore.fetchSubCategories(),
  ]);
});

function changeCategory() {
  form.sub_category = 0;
  form.duration = 0;
  form.custom_sub_category = "";
}

function changeSubCategory() {
  form.duration = 0;

  if (!showCustomSubCategory.value) {
    form.custom_sub_category = "";
  }
}

// Lightweight progress indicator across the required fields, grouped by section.
const sectionCompletion = computed(() => {
  const contact = [form.full_name, form.phone].filter(Boolean).length;
  const performance = [
    form.category || null,
    form.sub_category || null,
    showCustomSubCategory.value ? form.custom_sub_category : "ok",
    form.duration || null,
  ].filter(Boolean).length;
  const event = [form.event_date, form.event_time, form.location].filter(
    Boolean,
  ).length;

  return {
    contact: contact / 2,
    performance: performance / 4,
    event: event / 3,
  };
});

const overallProgress = computed(() => {
  const values = Object.values(sectionCompletion.value);
  const total = values.reduce((sum, v) => sum + v, 0);
  return Math.round((total / values.length) * 100);
});

async function submitBooking() {
  try {
    await bookingStore.createBooking(form);

    submitted.value = true;

    await showPopup(
      "success",
      "Booking Sent",
      "Your booking request has been sent successfully. We will contact you soon.",
    );

    router.push("/");
  } catch (error: any) {
    let message: string | string[] = "Something went wrong. Please try again.";

    const errors = error.response?.data;

    if (errors) {
      const messages: string[] = [];

      Object.values(errors).forEach((value: any) => {
        if (Array.isArray(value)) {
          messages.push(...value);
        } else if (typeof value === "string") {
          messages.push(value);
        }
      });

      if (messages.length) {
        message = messages;
      }
    }

    await showPopup("error", "Booking Failed", message);
  }
}

// Shared Tailwind classes
const fieldClass =
  "w-full min-h-[50px] rounded-lg border border-white/[0.13] bg-white/[0.06] px-4 py-3 text-[#fff8ef] placeholder:text-[#b9b1aa] outline-none transition-colors duration-200 focus:border-[#ff4b12]/60 focus:bg-white/[0.09] disabled:opacity-50";

const selectClass = `${fieldClass} appearance-none pr-10 cursor-pointer`;
</script>

<template>
  <section
    class="relative isolate min-h-screen overflow-x-hidden bg-[#08070a] px-4 py-16 text-[#fff8ef] sm:py-24"
    style="
      background-image:
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
    "
  >
    <div class="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
      <!-- Left rail: intro + live summary -->
      <div class="lg:sticky lg:top-16 lg:self-start">
        <p class="mb-3 text-[0.78rem] font-black uppercase tracking-normal text-[#ff4b12]">
          {{ $t('booking-page.section1.title') }}
        </p>

        <h1
          class="mb-4 bg-[length:220%_100%] bg-clip-text text-4xl font-extrabold uppercase leading-[0.9] text-transparent sm:text-6xl lg:text-5xl"
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
            filter: drop-shadow(0 0 14px rgba(255, 75, 18, 0.32))
              drop-shadow(0 12px 32px rgba(0, 0, 0, 0.38));
          "
        >
          {{ $t('booking-page.section1.main-title') }}
        </h1>

        <p class="mb-8 max-w-md text-base leading-relaxed text-[#b9b1aa] sm:text-lg">
          {{ $t('booking-page.section1.content') }}
        </p>

        <!-- Progress -->
        <div class="mb-8 hidden max-w-sm rounded-lg border border-white/[0.1] bg-white/[0.04] p-5 lg:block">
          <div class="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-white/60">
            <span>{{ $t('booking-page.section1.progress.title') }}</span>
            <span class="text-[#ffb000]">{{ overallProgress }}%</span>
          </div>

          <div class="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              class="h-full rounded-full transition-[width] duration-300"
              :style="{
                width: overallProgress + '%',
                backgroundImage: 'linear-gradient(90deg, #8f1400, #ff4b12, #ffb000)',
              }"
            />
          </div>

          <ul class="grid gap-2 text-sm text-[#d8d2cb]">
            <li class="flex items-center gap-2">
              <span
                class="h-1.5 w-1.5 shrink-0 rounded-full"
                :class="sectionCompletion.contact >= 1 ? 'bg-[#ffb000]' : 'bg-white/20'"
              />
              {{ $t('booking-page.section1.progress.sub-1') }}
            </li>
            <li class="flex items-center gap-2">
              <span
                class="h-1.5 w-1.5 shrink-0 rounded-full"
                :class="sectionCompletion.performance >= 1 ? 'bg-[#ffb000]' : 'bg-white/20'"
              />
              {{ $t('booking-page.section1.progress.sub-2') }}
            </li>
            <li class="flex items-center gap-2">
              <span
                class="h-1.5 w-1.5 shrink-0 rounded-full"
                :class="sectionCompletion.event >= 1 ? 'bg-[#ffb000]' : 'bg-white/20'"
              />
              {{ $t('booking-page.section1.progress.sub-3') }}
            </li>
          </ul>
        </div>

        <div
          v-if="submitted"
          class="max-w-sm rounded-lg border border-[#ff4b12]/40 bg-white/[0.06] p-4 text-sm font-semibold text-[#ffb000]"
        >
          {{ $t('booking-page.success') }}
        </div>
      </div>

      <!-- Right: the form -->
      <form
        class="grid gap-8 rounded-lg border border-white/[0.13] bg-[#111014]/80 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.36)] sm:p-8"
        @submit.prevent="submitBooking"
      >
        <!-- Contact -->
        <fieldset class="grid gap-4">
          <legend class="mb-1 flex items-center gap-3 text-sm font-black uppercase tracking-wide text-white/80">
            <span
              class="h-4 w-1 rounded-full"
              style="background-image: linear-gradient(180deg, #ffb000, #ff4b12)"
            />
            {{ $t('booking-page.form.section-1.head') }}
          </legend>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="grid gap-2">
              <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-1.labels.full-name') }}</label>
              <input
                v-model="form.full_name"
                type="text"
                :placeholder="$t('booking-page.form.section-1.placeholders.full-name')"
                required
                :class="fieldClass"
              />
            </div>

            <div class="grid gap-2">
              <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-1.labels.phone') }}</label>
              <input
                v-model="form.phone"
                type="text"
                :placeholder="$t('booking-page.form.section-1.placeholders.phone')"
                required
                :class="fieldClass"
              />
            </div>
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-bold text-white/80">
              {{ $t('booking-page.form.section-1.labels.email') }}
              <span class="font-normal normal-case text-white/40">({{ $t('booking-page.form.section-1.labels.optional') }})</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              :placeholder="$t('booking-page.form.section-1.placeholders.email')"
              :class="fieldClass"
            />
          </div>
        </fieldset>

        <div class="h-px w-full bg-white/[0.08]" />

        <!-- Performance -->
        <fieldset class="grid gap-4">
          <legend class="mb-1 flex items-center gap-3 text-sm font-black uppercase tracking-wide text-white/80">
            <span
              class="h-4 w-1 rounded-full"
              style="background-image: linear-gradient(180deg, #ffb000, #ff4b12)"
            />
            {{ $t('booking-page.form.section-2.head') }}
          </legend>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="grid gap-2">
              <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-2.labels.event-category') }}</label>
              <div class="relative">
                <select
                  v-model.number="form.category"
                  required
                  :class="selectClass"
                  @change="changeCategory"
                >
                  <option :value="0" class="bg-[#111014]">{{ $t('booking-page.form.section-2.placeholders.event-category') }}</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    class="bg-[#111014]"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <svg
                  class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>

            <div class="grid gap-2">
              <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-2.labels.sub-category') }}</label>
              <div class="relative">
                <select
                  v-model.number="form.sub_category"
                  required
                  :class="selectClass"
                  @change="changeSubCategory"
                >
                  <option :value="0" class="bg-[#111014]">{{ $t('booking-page.form.section-2.placeholders.sub-category') }}</option>
                  <option
                    v-for="item in subCategories"
                    :key="item.id"
                    :value="item.id"
                    class="bg-[#111014]"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <svg
                  class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div v-if="showCustomSubCategory" class="grid gap-2">
            <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-2.labels.custom-sub-category') }}</label>
            <input
              v-model="form.custom_sub_category"
              type="text"
              :placeholder="$t('booking-page.form.section-2.placeholders.custom-sub-category')"
              :required="showCustomSubCategory"
              :class="fieldClass"
            />
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-2.labels.duration') }}</label>
            <div class="relative">
              <select v-model.number="form.duration" required :class="selectClass">
                <option :value="0" class="bg-[#111014]">{{ $t('booking-page.form.section-2.placeholders.duration') }}</option>
                <option
                  v-for="item in durations"
                  :key="item.id"
                  :value="item.id"
                  class="bg-[#111014]"
                >
                  {{ item.title }}
                </option>
              </select>
              <svg
                class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <div v-if="rules.length" class="grid gap-3 rounded-lg border border-[#ffb000]/20 bg-[#ffb000]/[0.05] p-4">
            <h3 class="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#ffb000]">
              {{ $t('booking-page.form.section-2.before-you-book') }}
            </h3>

            <div
              v-for="rule in rules"
              :key="rule.id"
              class="flex items-start gap-3"
            >
              <div
                class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-black"
                style="background-image: linear-gradient(135deg, #ffb000, #ff4b12)"
              >
                ✓
              </div>
              <p class="text-sm leading-relaxed text-[#d8d2cb]">
                {{ rule.text }}
              </p>
            </div>
          </div>
        </fieldset>

        <div class="h-px w-full bg-white/[0.08]" />

        <!-- Event details -->
        <fieldset class="grid gap-4">
          <legend class="mb-1 flex items-center gap-3 text-sm font-black uppercase tracking-wide text-white/80">
            <span
              class="h-4 w-1 rounded-full"
              style="background-image: linear-gradient(180deg, #ffb000, #ff4b12)"
            />
            {{ $t('booking-page.form.section-3.head') }}
          </legend>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="grid gap-2">
              <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-3.labels.event-date') }}</label>
              <input
                v-model="form.event_date"
                type="date"
                required
                :class="[fieldClass, 'accent-[#ff4b12] [color-scheme:dark]']"
              />
            </div>

            <div class="grid gap-2">
              <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-3.labels.event-time') }}</label>
              <input
                v-model="form.event_time"
                type="time"
                required
                :class="[fieldClass, 'accent-[#ff4b12] [color-scheme:dark]']"
              />
            </div>
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-3.labels.location') }}</label>
            <input
              v-model="form.location"
              type="text"
              :placeholder="$t('booking-page.form.section-3.placeholders.location')"
              required
              :class="fieldClass"
            />
          </div>

          <div class="grid gap-2 sm:max-w-[220px]">
            <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-3.labels.team-tembers') }}</label>
            <input
              v-model.number="form.team_members"
              type="number"
              min="1"
              :placeholder="$t('booking-page.form.section-3.labels.team-tembers')"
              required
              :class="fieldClass"
            />
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-bold text-white/80">{{ $t('booking-page.form.section-3.labels.notes') }}</label>
            <textarea
              v-model="form.notes"
              :placeholder="$t('booking-page.form.section-3.placeholders.notes')"
              rows="4"
              :class="[fieldClass, 'resize-none']"
            />
          </div>
        </fieldset>

        <button
          type="submit"
          :disabled="bookingStore.loading"
          class="mt-2 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-[#ffb000] to-[#ff4b12] px-6 font-black text-[#140a05] shadow-[0_18px_44px_rgba(255,75,18,0.32)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {{ bookingStore.loading ? $t('booking-page.form.button-loading') : $t('booking-page.form.button') }}
        </button>

        <div
          v-if="submitted"
          class="rounded-lg border border-[#ff4b12]/40 bg-white/[0.06] p-4 text-center font-semibold text-[#ffb000] lg:hidden"
        >
          {{ $t('booking-page.success') }}
        </div>
      </form>
    </div>
  </section>
</template>