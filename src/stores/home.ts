import { defineStore } from "pinia";
import { HomeService } from "@/services/home.service";
import type { Show, Team } from "@/types/home";

export const useHomeStore = defineStore("home", {
    state: () => ({
        shows: [] as Show[],
        show: null as Show | null,

        team: [] as Team[],
        teamMember: null as Team | null,

        loading: false,
        error: null as string | null,
    }),

    actions: {
        // =========================
        // Shows
        // =========================

        async getAllShows() {
            this.loading = true;
            this.error = null;

            try {
                const response = await HomeService.getAllShows();
                this.shows = response.data;
            } catch (error: any) {
                this.error =
                    error?.response?.data?.detail || "Failed to fetch shows.";
            } finally {
                this.loading = false;
            }
        },

        async getShowById(id: number) {
            this.loading = true;
            this.error = null;

            try {
                const response = await HomeService.getShowById(id);
                this.show = response.data;
            } catch (error: any) {
                this.error =
                    error?.response?.data?.detail || "Failed to fetch show.";
            } finally {
                this.loading = false;
            }
        },

        async createShow(data: FormData) {
            const response = await HomeService.createShow(data);

            this.shows.push(response.data);

            return response;
        },

        async editShow(id: number, data: FormData) {
            const response = await HomeService.editShow(id, data);

            const index = this.shows.findIndex((show) => show.id === id);

            if (index !== -1) {
                this.shows[index] = response.data;
            }

            if (this.show?.id === id) {
                this.show = response.data;
            }

            return response;
        },

        async deleteShow(id: number) {
            await HomeService.deleteShow(id);

            this.shows = this.shows.filter(show => show.id !== id);

            if (this.show?.id === id) {
                this.show = null;
            }
        },

        // =========================
        // Team
        // =========================

        async getAllTeam() {
            this.loading = true;
            this.error = null;

            try {
                const response = await HomeService.getAllTeam();
                this.team = response.data;
            } catch (error: any) {
                this.error =
                    error?.response?.data?.detail || "Failed to fetch team.";
            } finally {
                this.loading = false;
            }
        },

        async getTeamMemberById(id: number) {
            this.loading = true;
            this.error = null;

            try {
                const response = await HomeService.getTeamMemberById(id);
                this.teamMember = response.data;
            } catch (error: any) {
                this.error =
                    error?.response?.data?.detail || "Failed to fetch team member.";
            } finally {
                this.loading = false;
            }
        },

        async createTeamMember(data: FormData) {
            const response = await HomeService.createTeamMember(data);

            this.team.push(response.data);

            return response;
        },

        async editTeamMember(id: number, data: FormData) {
            const response = await HomeService.editTeamMember(id, data);

            const index = this.team.findIndex((member) => member.id === id);

            if (index !== -1) {
                this.team[index] = response.data;
            }

            if (this.teamMember?.id === id) {
                this.teamMember = response.data;
            }

            return response;
        },

        async deleteTeamMember(id: number) {
            await HomeService.deleteTeamMember(id);

            this.team = this.team.filter(member => member.id !== id);

            if (this.teamMember?.id === id) {
                this.teamMember = null;
            }
        },
    },
});