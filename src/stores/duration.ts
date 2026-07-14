import { defineStore } from "pinia";
import { ref } from "vue";

import DurationService from "@/services/duration.service";
import type { DurationOption } from "@/types/duration";

export const useDurationStore = defineStore("duration", () => {
    const durations = ref<DurationOption[]>([]);
    const selectedDuration = ref<DurationOption | null>(null);

    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchDurations(subCategoryId?: number) {
        loading.value = true;

        try {

            const data = await DurationService.getDurations();


            if (subCategoryId) {

                durations.value = data.filter(
                    (item) =>
                        item.sub_category === subCategoryId
                );

            } else {

                durations.value = data;

            }


        } finally {
            loading.value = false;
        }
    }

    async function fetchDuration(id: number) {
        loading.value = true;

        try {
            selectedDuration.value =
                await DurationService.getDuration(id);
        } finally {
            loading.value = false;
        }
    }

    async function createDuration(data: FormData) {
        const duration =
            await DurationService.createDuration(data);

        durations.value.push(duration);

        return duration;
    }

    async function updateDuration(
        id: number,
        data: FormData
    ) {
        const updated =
            await DurationService.updateDuration(id, data);

        const index = durations.value.findIndex(
            (d) => d.id === updated.id
        );

        if (index !== -1) {
            durations.value[index] = updated;
        }

        selectedDuration.value = updated;

        return updated;
    }

    async function deleteDuration(id: number) {
        await DurationService.deleteDuration(id);

        durations.value = durations.value.filter(
            (d) => d.id !== id
        );

        if (selectedDuration.value?.id === id) {
            selectedDuration.value = null;
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