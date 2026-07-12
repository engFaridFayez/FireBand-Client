import { defineStore } from "pinia";
import { ref } from "vue";

import BookingService from "@/services/booking.service";

import type { BookingPayload } from "@/types/booking";

export const useBookingStore = defineStore("booking", () => {
  const form = ref<BookingPayload>({
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

  const loading = ref(false);
  const success = ref(false);
  const errors = ref<Record<string, string[]>>({});

  async function createBooking() {
    loading.value = true;
    success.value = false;
    errors.value = {};

    try {
      await BookingService.create(form.value);
      success.value = true;
      resetForm();
    } catch (err: any) {
      errors.value = err.response?.data || {};
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function resetForm() {
    form.value = {
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
    };
  }

  return {
    form,

    loading,
    success,
    errors,

    createBooking,
    resetForm,
  };
});