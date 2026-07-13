import api from "./api";
import type { DurationOption } from "@/types/duration";

class DurationService {
  async getDurations() {
    const res = await api.get<DurationOption[]>("/durations/");
    return res.data;
  }

  async getDuration(id: number) {
    const res = await api.get<DurationOption>(`/durations/${id}/`);
    return res.data;
  }

  async createDuration(data: object) {
    const res = await api.post<DurationOption>("/durations/", data);
    return res.data;
  }

  async updateDuration(id: number, data: object) {
    const res = await api.patch<DurationOption>(`/durations/${id}/`, data);
    return res.data;
  }

  async deleteDuration(id: number) {
    await api.delete(`/durations/${id}/`);
  }
}

export default new DurationService();