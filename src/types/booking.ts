import type { DurationOption } from "./duration";
import type { EventCategory } from "./eventCategory";
import type { SubCategory } from "./subCategory";

export interface Booking {
  id: number;

  full_name: string;
  phone: string;
  email: string | null;

  event_date: string;
  event_time: string;

  location: string;

  category: EventCategory;
  sub_category: SubCategory;
  duration: DurationOption;

  custom_sub_category: string | null;

  team_members: number;

  notes: string;
}

export interface BookingPayload {
  full_name: string;
  phone: string;
  email: string;

  event_date: string;
  event_time: string;

  location: string;

  category: number;
  sub_category: number;
  duration: number;

  custom_sub_category: string;

  team_members: number;

  notes: string;
}

export interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;

  loading: boolean;
  error: string | null;
}