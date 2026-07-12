import api from "./api";
import type { DurationOption } from "@/types/duration";

export default class DurationService {
  static async getAll() {
    const response = await api.get<DurationOption[]>("/durations/");
    return response.data;
  }
}