import { defineStore } from "pinia";
import { ref } from "vue";

import DurationService from "@/services/duration.service";
import type { DurationOption } from "@/types/duration";

export const useDurationStore = defineStore("duration", () => {
    const durations = ref<DurationOption[]>([]);
    const selectedDuration = ref<DurationOption | null>(null);

    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchDurations() {
        loading.value = true;
        error.value = null;

        try {
            durations.value = await DurationService.getDurations();
        } catch (err: any) {
            error.value = err.response?.data?.detail || err.message;
        } finally {
            loading.value = false;
        }
    }

    async function fetchDuration(id: number) {
        loading.value = true;
        error.value = null;

        try {
            selectedDuration.value = await DurationService.getDuration(id);
        } catch (err: any) {
            error.value = err.response?.data?.detail || err.message;
        } finally {
            loading.value = false;
        }
    }

    async function createDuration(data: object) {
        loading.value = true;
        error.value = null;

        try {
            const duration = await DurationService.createDuration(data);
            durations.value.push(duration);
            return duration;
        } catch (err: any) {
            error.value = err.response?.data?.detail || err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function updateDuration(id: number, data: object) {
        loading.value = true;
        error.value = null;

        try {
            const updated = await DurationService.updateDuration(id, data);

            const index = durations.value.findIndex((d) => d.id === id);

            if (index !== -1) {
                durations.value[index] = updated;
            }

            selectedDuration.value = updated;

            return updated;
        } catch (err: any) {
            error.value = err.response?.data?.detail || err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function deleteDuration(id: number) {
        loading.value = true;
        error.value = null;

        try {
            await DurationService.deleteDuration(id);

            durations.value = durations.value.filter((d) => d.id !== id);

            if (selectedDuration.value?.id === id) {
                selectedDuration.value = null;
            }
        } catch (err: any) {
            error.value = err.response?.data?.detail || err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        durations,
        selectedDuration,

        loading,
        error,

        fetchDurations,
        fetchDuration,
        createDuration,
        updateDuration,
        deleteDuration,
    };
});