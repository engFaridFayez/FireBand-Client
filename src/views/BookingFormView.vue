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

const durations = computed(() => {
  const selected = categoryStore.subCategories.find(
    (item) => item.id === form.sub_category,
  );

  return selected?.duration ?? [];
});

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchCategories(),
    categoryStore.fetchSubCategories(),
  ]);
});

async function changeCategory() {
  form.sub_category = 0;
  form.duration = 0;
}

function changeSubCategory() {
  form.duration = 0;
}

const selectedSubCategory = computed(() =>
  categoryStore.subCategories.find((item) => item.id === form.sub_category),
);

const showCustomSubCategory = computed(
  () => selectedSubCategory.value?.slug === "other",
);

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

// Shared Tailwind classes for form controls, kept in one place so every
// input/select/textarea stays visually consistent.
const fieldClass =
  "w-full min-h-[50px] rounded-lg border border-white/[0.13] bg-white/[0.06] px-4 py-3 text-[#fff8ef] placeholder:text-[#b9b1aa] outline-none transition-colors duration-200 focus:border-[#ff4b12]/60 focus:bg-white/[0.09] disabled:opacity-50";

const selectClass = `${fieldClass} appearance-none bg-[right_1rem_center] bg-no-repeat pr-10`;
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
    <div class="mx-auto w-full max-w-2xl">
      <p
        class="mb-3 text-[0.78rem] font-black uppercase tracking-normal text-[#ff4b12]"
      >
        Booking
      </p>

      <h1
        class="mb-4 bg-[length:220%_100%] bg-clip-text text-4xl font-extrabold uppercase leading-[0.9] text-transparent sm:text-6xl"
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
        Book Fireband
      </h1>

      <p
        class="mb-10 max-w-lg text-base leading-relaxed text-[#b9b1aa] sm:text-lg"
      >
        Reserve your date and let us bring the fire to your stage. Fill in the
        details below and we'll get back to you fast.
      </p>

      <form
        class="grid gap-4 rounded-lg border border-white/[0.13] bg-[#111014]/80 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.36)] sm:p-8"
        @submit.prevent="submitBooking"
      >
        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Full Name </label>

          <input
            v-model="form.full_name"
            type="text"
            placeholder="Full Name"
            required
            :class="fieldClass"
          />
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Phone </label>

          <input
            v-model="form.phone"
            type="text"
            placeholder="Phone"
            required
            :class="fieldClass"
          />
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Email </label>

          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            :class="fieldClass"
          />
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80">
            Event Category
          </label>

          <select
            v-model.number="form.category"
            required
            :class="selectClass"
            @change="changeCategory"
          >
            <option :value="0" class="bg-[#111014]">Select Category</option>

            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              class="bg-[#111014]"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Sub Category </label>

          <select
            v-model.number="form.sub_category"
            required
            :class="selectClass"
            @change="changeSubCategory"
          >
            <option :value="0" class="bg-[#111014]">Select Sub Category</option>

            <option
              v-for="item in subCategories"
              :key="item.id"
              :value="item.id"
              class="bg-[#111014]"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div v-if="showCustomSubCategory" class="grid gap-2">
          <label class="text-sm font-bold text-white/80">
            Custom Sub Category
          </label>

          <input
            v-model="form.custom_sub_category"
            type="text"
            placeholder="Custom Sub Category"
            :class="fieldClass"
          />
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Duration </label>

          <select v-model.number="form.duration" required :class="selectClass">
            <option :value="0" class="bg-[#111014]">Select Duration</option>

            <option
              v-for="item in durations"
              :key="item.id"
              :value="item.id"
              class="bg-[#111014]"
            >
              {{ item.title }}
            </option>
          </select>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="grid gap-2">
            <label class="text-sm font-bold text-white/80"> Event Date </label>

            <input
              v-model="form.event_date"
              type="date"
              required
              :class="[fieldClass, 'accent-[#ff4b12] [color-scheme:dark]']"
            />
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-bold text-white/80"> Event Time </label>

            <input
              v-model="form.event_time"
              type="time"
              required
              :class="[fieldClass, 'accent-[#ff4b12] [color-scheme:dark]']"
            />
          </div>
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Location </label>

          <input
            v-model="form.location"
            type="text"
            placeholder="Location"
            required
            :class="fieldClass"
          />
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Team Members </label>

          <input
            v-model.number="form.team_members"
            type="number"
            min="1"
            placeholder="Team Members"
            required
            :class="fieldClass"
          />
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-bold text-white/80"> Notes </label>

          <textarea
            v-model="form.notes"
            placeholder="Notes"
            rows="4"
            :class="[fieldClass, 'resize-none']"
          />
        </div>

        <button
          type="submit"
          :disabled="bookingStore.loading"
          class="mt-2 inline-flex min-h-[50px] items-center justify-center rounded-lg bg-gradient-to-br from-[#ffb000] to-[#ff4b12] px-6 font-black text-[#140a05] shadow-[0_18px_44px_rgba(255,75,18,0.32)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {{ bookingStore.loading ? "Sending..." : "Send Booking Request" }}
        </button>
      </form>

      <div
        v-if="submitted"
        class="mt-6 rounded-lg border border-[#ff4b12]/40 bg-white/[0.06] p-4 text-center font-semibold text-[#ffb000]"
      >
        Booking request sent successfully.
      </div>
    </div>
  </section>
</template>
