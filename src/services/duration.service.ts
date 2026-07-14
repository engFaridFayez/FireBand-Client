import api from "./api";
import type { DurationOption } from "@/types/duration";

class DurationService {
  async getDurations(): Promise<DurationOption[]> {
    const { data } = await api.get("/durations/");
    return data;
  }

  async getDuration(id: number): Promise<DurationOption> {
    const { data } = await api.get(`/durations/${id}/`);
    return data;
  }

  async createDuration(data: FormData): Promise<DurationOption> {
    const response = await api.post("/durations/", data);
    return response.data;
  }

  async updateDuration(
    id: number,
    data: FormData
  ): Promise<DurationOption> {
    const response = await api.put(`/durations/${id}/`, data);
    return response.data;
  }

  async deleteDuration(id: number): Promise<void> {
    await api.delete(`/durations/${id}/`);
  }
}

export default new DurationService();