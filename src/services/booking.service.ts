import api from "./api";

import type { Booking, BookingPayload } from "@/types/booking";

class BookingService {
  async getBookings() {
    const res = await api.get<Booking[]>("/bookings/");
    return res.data;
  }

  async getBooking(id: number) {
    const res = await api.get<Booking>(`/bookings/${id}/`);
    return res.data;
  }

  async createBooking(data: BookingPayload) {
    const res = await api.post<Booking>("/bookings/", data);
    return res.data;
  }

  async updateBooking(id: number, data: Partial<BookingPayload>) {
    const res = await api.patch<Booking>(`/bookings/${id}/`, data);
    return res.data;
  }

  async deleteBooking(id: number) {
    await api.delete(`/bookings/${id}/`);
  }
}

export default new BookingService();