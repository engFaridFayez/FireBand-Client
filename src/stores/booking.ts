import { defineStore } from "pinia";
import { ref } from "vue";

import BookingService from "@/services/booking.service";

import type { Booking, BookingPayload } from "@/types/booking";

export const useBookingStore = defineStore("booking", () => {
  const bookings = ref<Booking[]>([]);
  const selectedBooking = ref<Booking | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchBookings() {
    loading.value = true;
    error.value = null;

    try {
      bookings.value = await BookingService.getBookings();
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchBooking(id: number) {
    loading.value = true;
    error.value = null;

    try {
      selectedBooking.value = await BookingService.getBooking(id);
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createBooking(data: BookingPayload) {
    loading.value = true;
    error.value = null;

    try {
      const booking = await BookingService.createBooking(data);

      bookings.value.unshift(booking);

      return booking;
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateBooking(id: number, data: Partial<BookingPayload>) {
    loading.value = true;
    error.value = null;

    try {
      const updated = await BookingService.updateBooking(id, data);

      const index = bookings.value.findIndex((b) => b.id === id);

      if (index !== -1) {
        bookings.value[index] = updated;
      }

      selectedBooking.value = updated;

      return updated;
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteBooking(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await BookingService.deleteBooking(id);

      bookings.value = bookings.value.filter((b) => b.id !== id);

      if (selectedBooking.value?.id === id) {
        selectedBooking.value = null;
      }
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    bookings,
    selectedBooking,

    loading,
    error,

    fetchBookings,
    fetchBooking,

    createBooking,
    updateBooking,
    deleteBooking,
  };
});