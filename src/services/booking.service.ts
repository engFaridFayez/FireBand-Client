import api from "./api";

import type { Booking } from "@/types/booking";
import type { BookingPayload } from "@/types/booking";

export default class BookingService {
  static async create(data: BookingPayload) {
    const response = await api.post<Booking>("/bookings/", data);
    return response.data;
  }
}